import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, ModalController, Navbar, NavController, NavParams, Slides,
  Platform, AlertController,ViewController} from 'ionic-angular';
  import {RBServiceProvider} from "../../providers/webservices/rbservices";
  import {RBSearchByIDResultModel} from "../../shared/model/rb/rbsearchbyidresult.model";
import {RBSearchResultRequestModel} from "../../shared/model/rb/rbsearchresultrequest.model";
import {RBSearchByIDReqModel} from "../../shared/model/rb/rbsearchbyidreq.model";
import {RBHistoryRequestModal} from "../../shared/model/rb/rbhistoryrequest.modal";
import {RBAttachmentDetailsModel} from "../../shared/model/rb/rbsearchbyidresult.model";
import {RBcreatePage} from "../rbcreate/rbcreate";
import {WorkflowPage} from "../workflow/workflow";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {RBCancelRequestModal} from "../../shared/model/rb/rbcancelrequest.modal";
import {RBCancelContainerComponent} from "../../components/rbmodelpage/rb-cancel-container/rb-cancel-container";
/**
 * Generated class for the RbviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-RBview',
  templateUrl: 'rbview.html',
  providers: [Utils,RBServiceProvider,RBSearchByIDResultModel,RBSearchResultRequestModel,RBSearchByIDReqModel,
    RBAttachmentDetailsModel,RBCancelRequestModal]
})
export class RBviewPage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  headerTitle: string;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }
  public unregisterBackButtonAction: any;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;
  regStatus: string;
  fromCreate: boolean = false;
  fromEdit:boolean=false;
  editfromHistory:boolean=false;
  currentSearchID:RBSearchByIDReqModel = new RBSearchByIDReqModel();
  public rbIdSearchResult:RBSearchByIDResultModel;
  rbDetailHistoryModal = new RBHistoryRequestModal();
  containerFlag: boolean = false;
  cancelFlag: boolean = false;
  vesselflag: boolean = false;
  requestType:string;
  moveTypeOut: any;
  fromHistory: boolean = false;
  canCancel:boolean;
  canAmend:boolean;
  canApprove:boolean;
  public dropDown:any;
  alertHeadding: string;
  editHiddenStatus:boolean = false;
  cancelHiddenStatus:boolean = false;
  showServiceFlag:boolean = false;
  showServiceProvided:boolean = false;
  showremarksSP:boolean = false;
  @ViewChild(Slides) slides: Slides;

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController,
              public rbServiceProvider: RBServiceProvider,
              public utils: Utils,
              public customFilter:RBSearchResultRequestModel,
              public keyboard: Keyboard, private viewCtrl: ViewController) {

    this.customFilter = this.navParams.get('filter');
    this.currentSearchID.rsbId = this.navParams.get('rsbId');
    this.currentSearchID.rsbReqId = this.navParams.get('rsbReqId');
    this.requestType = this.navParams.get('requestType');
    this.regStatus = this.navParams.get('regStatus');
    this.fromCreate = this.navParams.get('fromCreate');
    this.fromEdit = this.navParams.get('fromEdit');
    this.editfromHistory = this.navParams.get('editfromHistory');
    this.rbDetailHistoryModal.rsbId = this.navParams.get('rsbId');
    this.rbDetailHistoryModal.rsbReqId = this.navParams.get('requestId');
    if(this.navParams.get('fromHistory')) {
      this.fromHistory = this.navParams.get('fromHistory');
      this.canCancel= navParams.get('cancancel');
      this.canAmend= navParams.get('canamend');
      this.canApprove= navParams.get('canapprove');
    }
    this.resetShowTabs(0);
    this.hideshowfields();
    this.showCancelRemarks();
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;
    this.dropDown=false;
    this.alertHeadding = this.utils.getLocaleString("alert");
  }

  ionViewDidLoad() {
  this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
        this.navigateBack();
    }
  }

  ionViewWillEnter() {
      this.sendearchByIdRequest();
  }
ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }
  getStyle() {
    return '#808080';
  }

  hideshowfields() {
    if(this.requestType == 'Container')
    {
      this.tabs = [
        this.utils.getLocaleString("rb_tab1"),
        this.utils.getLocaleString("rb_tab3"),
        this.utils.getLocaleString("rb_tab4"),
        this.utils.getLocaleString("rb_tab5"),
      ];
      this.containerFlag = true;
    }
    else if(this.requestType == 'Vessel'){
      this.tabs = [
        this.utils.getLocaleString("rb_tab1"),
        this.utils.getLocaleString("rb_tab2"),
        this.utils.getLocaleString("rb_tab4"),
        this.utils.getLocaleString("rb_tab5"),
      ];
      this.vesselflag = true;
    }
    if(this.fromCreate||this.fromEdit)
    {
      this.tabs.splice((this.tabs.length-1),1)
    }
  }
  showCancelRemarks()
  {
    if(this.regStatus == 'Cancelled')
    {
      this.cancelFlag = true;
    }
  }

  public filterTabs(tab: string): void {
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === "General Information") {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
    } else if (tab === "Vessel Information") {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
    } else if (tab === "Container Details") {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
    }else if (tab === "Resource Booking") {
      this.resetShowTabs(2);
      this.slides.slideTo(2, 500);
    } else if (tab === "Attachments") {
      this.resetShowTabs(3);
      this.slides.slideTo(3, 500);
    }
    this.selectedTab = tab;

  }

  // Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();

  }

  sendearchByIdRequest(){
    if(this.fromHistory) {
      this.rbServiceProvider.getSearchByReqId(this.currentSearchID).subscribe(response=> {
        this.rbIdSearchResult = <RBSearchByIDResultModel>response;
        this.showServiceStatus();
        this.updatecharges();
        this.showCancelButton();
        this.showEditButton();
      },error =>{

      });
    } else {
      this.rbServiceProvider.getSearchById(this.currentSearchID).subscribe(response=> {
        this.rbIdSearchResult = <RBSearchByIDResultModel>response;
        this.showServiceStatus();
        this.updatecharges();
        this.showCancelButton();
        this.showEditButton();
      },error =>{

      });
    }
  }
  showServiceStatus()
  {
    if(this.rbIdSearchResult.serviceStatus != "" &&
      this.rbIdSearchResult.serviceStatus != null)
    {
      this.showServiceFlag = true;
    }
    if(this.rbIdSearchResult.serviceStatus && this.rbIdSearchResult.serviceStatus == "Completed"){
      this.showServiceProvided = true;
    }
    if(this.rbIdSearchResult.serviceStatus &&
      this.rbIdSearchResult.serviceStatus == "Completed" || this.rbIdSearchResult.serviceStatus == 'Declined') {
      this.showremarksSP = true;
    } else {
      this.showremarksSP = false;
      this.showServiceProvided = false;
    }

    // if(this.rbIdSearchResult.serviceProvidedOn != "" &&
    //    this.rbIdSearchResult.serviceProvidedOn != null)
    // {
    //   this.showServiceProvided = true;
    //   this.showremarksSP = true;
    // }

  }
 updatecharges(){
   this.rbIdSearchResult.totalCharges=Number(this.rbIdSearchResult.totalCharges+ this.rbIdSearchResult.perRequestCharges).toFixed(3);
   for(let i=0;i < this.rbIdSearchResult.rsbResources.length;i++){
       this.rbIdSearchResult.rsbResources[i].sumCharges=Number(this.rbIdSearchResult.rsbResources[i].sumCharges).toFixed(3);
   }
}
  // Method that to check data is availbale in the discharge,restow,Load and summary pages
  checkListIsNotEmpty(obj:any){
    if(obj === null|| obj === 'undefined' || obj === undefined)
    {
      return true;
    }
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length === 0;
  }

  resetShowTabs(val: number) {
    for (let i = 0; i < this.showTabs.length; i++) {
      if (val == i) {
        this.showTabs[i] = true;
      } else {
        this.showTabs[i] = false;
      }
    }
  }

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  showEditButton():boolean {
    if(this.rbIdSearchResult.approver !== "Y") {
      this.editHiddenStatus = false;
      if (this.regStatus == 'Submitted') {
        if(this.rbIdSearchResult.amendRequestStatus == 'Submitted') {
          this.editHiddenStatus = true;
        } else {
          this.editHiddenStatus = false;
        }
      }

      if (this.regStatus == 'Rejected') {
        if(this.rbIdSearchResult.amendRequestStatus == 'Submitted') {
          this.editHiddenStatus = true;
        } else {
          this.editHiddenStatus = false;
        }
      }

      if (this.regStatus == 'Approved') {
        if(this.rbIdSearchResult.amendRequestStatus == 'Submitted') {
          this.editHiddenStatus = true;
        } else {
          this.editHiddenStatus = false;
        }
      }
     if (this.rbIdSearchResult.serviceStatus == 'Work in Progress' || this.rbIdSearchResult.serviceStatus == 'Declined'
        ||this.rbIdSearchResult.serviceStatus == 'Completed') {
        this.editHiddenStatus = false;
      }
    }
    else if(this.rbIdSearchResult.approver == "Y")
    {
        this.editHiddenStatus = true;
    }
    return this.editHiddenStatus;
  }


  showCancelButton():boolean {
    this.cancelHiddenStatus = false;
    if(this.rbIdSearchResult.approver !== "Y") {

      if (this.regStatus == 'Submitted') {
        if(this.rbIdSearchResult.amendRequestStatus == 'Submitted') {
          this.cancelHiddenStatus = true;
        } else {
          this.cancelHiddenStatus = false;
        }
      }

      if (this.regStatus == 'Pending') {
        if(this.rbIdSearchResult.amendRequestStatus == 'Pending') {
          this.cancelHiddenStatus = true;
        } else {
          this.cancelHiddenStatus = false;
        }
      }

      if (this.regStatus == 'Rejected' || this.regStatus == 'Approved') {
        if(this.rbIdSearchResult.amendRequestStatus == 'Submitted' || this.rbIdSearchResult.amendRequestStatus == 'Pending') {
          this.cancelHiddenStatus = true;
        } else {
          this.cancelHiddenStatus = false;
        }
      }

      if (this.rbIdSearchResult.serviceStatus == 'Work in Progress' || this.rbIdSearchResult.serviceStatus == 'Declined'
        ||this.rbIdSearchResult.serviceStatus == 'Completed') {
        this.cancelHiddenStatus = false;
      }
    }
    else {
      this.cancelHiddenStatus = false;
    }
    return this.cancelHiddenStatus;
  }



  editRsb()
  {
    console.log("clicked on history");
    this.navCtrl.push(RBcreatePage, {
      fromHistory: true,
      requestType: this.rbIdSearchResult.requestType,
      rsbReqId: this.rbIdSearchResult.rsbReqId,
      mode: 'edit'
    });

  }

  rsbCancel(){
    this.navCtrl.push(RBCancelContainerComponent, {rsbId: this.rbIdSearchResult.rsbReqId,
      resourceBookingStatus: this.regStatus, fromHistory: true});
  }
  workflowStatus() {
    if (this.fromHistory) {
      return false;
    } else {
      return true;
    }
  }
  seeWorkFlow() {
    this.navCtrl.push(WorkflowPage, {
      requestID: this.rbIdSearchResult.rsbId,
      "workflowId": this.rbIdSearchResult.wrkflwId,
      "WFModule": "rsb"
    });
  }
  loadAction() {
    if (this.rbIdSearchResult && this.rbIdSearchResult.approveStatus && this.rbIdSearchResult.wrkflwId) {
      return false;
    } else {
      return true;
    }
  }
  seeAction() {
    this.navCtrl.push(ExecuteactionPage,{
      workFlowId: this.rbIdSearchResult.wrkflwId,
      rsbId: this.rbIdSearchResult.rsbId,
      fromPage: "RB",
    })
  }
  getAttachment(attachment: RBAttachmentDetailsModel) {
    this.rbServiceProvider.openAttachment(attachment);
  }
  navigateBack() {
   if (this.editfromHistory && this.fromEdit) {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4));
      }else if (this.fromCreate || this.fromEdit ) {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 2));
    } else {
      this.navCtrl.pop();
    }
  }
  buttonStatus() {
    if (this.fromHistory) {
      return false;
    } else {
      return true;
    }
  }
  viewstatus() {
    if (this.fromCreate||this.fromEdit) {
      return true;
    } else {
      return false;
    }
  }

   initializeBackButtonCustomHandler(): void {
    var backEvent = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      backEvent.navigateBack();
    }, 101);
  }
}
