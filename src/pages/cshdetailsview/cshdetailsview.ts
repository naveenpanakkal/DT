import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
  Slides,
  ViewController, Navbar, Content
} from 'ionic-angular';

import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {CshServiceProvider} from "../../providers/webservices/cshservice";
import {CSHSearchByIDReqModel} from "../../shared/model/csh/cshsearchbyidreq.model";
import {CSHSearchByIDResultModel} from "../../shared/model/csh/cshsearchbyidresult.model";
import {CSHBaseInfoAttachModel} from "../../shared/model/csh/cshbaseinfoattach.model";
import {CSHHazardousContainerModel} from "../../shared/model/csh/cshhazardouscontainer.model";
import {CSHCountDetailsModel} from "../../shared/model/csh/cshcountdetails.model";
import {CSHOOGContainerModel} from "../../shared/model/csh/cshoogcontainer.model";
import {CSHSpecialHandlingModel} from "../../shared/model/csh/cshspecialhandling.model";
import {VldsLoadListModel} from "../../shared/model/VLDS/vldsloadlist.model";
import {WorkflowPage} from "../workflow/workflow";
import {CSHDetailHistoryReqModel} from "../../shared/model/csh/cshdetailfromhistory";
import {CshCmpModelComponent} from "../../components/cshModelPages/csh-cmp-model/csh-cmp-model";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {CshHistoryPage} from "../cshhistory/cshhistory";
import {CSHCreateEditPage} from "../cshdetailscreateandedit/cshdetailscreateandedit";
import {LoginPage} from "../login/login";
import {CSHCancelContainerDetails} from "../../shared/model/csh/cancelcontainerdetails.model";
import {VoyagedetailsPage} from "../voyagedetails/voyagedetails";
import {BerthSearchViewPage} from "../berthsearchview/berthsearchview";
import {CSHResultsPage} from "../cshresults/cshresults";
import {CSHSearchReqModel} from "../../shared/model/csh/cshsearchreq.model";


/**CSHViewModel
 * Generated class for the CSHDetailsView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cshdetailsview',
  templateUrl: 'cshdetailsview.html',
  providers: [Utils,CshServiceProvider,CSHSearchByIDResultModel,CSHHazardousContainerModel,CSHBaseInfoAttachModel,
    CSHCountDetailsModel,CSHOOGContainerModel,CSHSpecialHandlingModel,CSHCancelContainerDetails,CSHSearchReqModel]
})
export class CSHDetailsPage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }
  @ViewChild(Slides) slides: Slides;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false, false];
  public cshIdSearchResult:CSHSearchByIDResultModel;
  public cshBaseInfoAttach:CSHBaseInfoAttachModel[] = [];
  public cshCountDetls:CSHCountDetailsModel[] = [];
  public cshHazardousContainer:CSHHazardousContainerModel[] = [];
  public cshOOGContainer:CSHOOGContainerModel[] = [];
  public cshSpecialHandling:CSHSpecialHandlingModel[] = [];
  editHiddenStatus:boolean = false;
  cancelHiddenStatus:boolean = false;
  canCancelArg:boolean;
  public showRightSlideNav: boolean;
  public dropDown:any;
  currentSearchID:CSHSearchByIDReqModel = new CSHSearchByIDReqModel();
  cshDetailHistoryModal = new CSHDetailHistoryReqModel();
  fromHistory: boolean = false;
  regStatus: string;
  alertHeadding: string;
  cshCancelContainerDetailsModel: CSHCancelContainerDetails;
  cshItemStatus:any;
  canCancel:boolean;
  canAmend:boolean;
  canApprove:boolean;
  public cat_map:Map<string,string>;
  public subcat_map:Map<string,string>;
  public cat_attachments:Map<string,string>;
  counthazard : number
  countOOG: number
  countSH: number
  issearchbyIDsuccess:boolean=true;
  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController,
              public cshServiceProvider: CshServiceProvider,
              public utils: Utils,
              public customFilter:CSHSearchReqModel,
              public keyboard: Keyboard, private viewCtrl: ViewController) {
    this.resetShowTabs(0);
    this.customFilter = this.navParams.get('filter');
    this.currentSearchID.cshNo = this.navParams.get('cshNo');
    this.regStatus = this.navParams.get('regStatus');
    this.cshDetailHistoryModal.cshRequestNo = this.navParams.get('cshNo');
    if(this.navParams.get('fromHistory')) {
      this.fromHistory = this.navParams.get('fromHistory');
      this.cshItemStatus = this.navParams.get('cshItemStatus');
      this.canCancel= navParams.get('cancancel');
      this.canAmend= navParams.get('canamend');
      this.canApprove= navParams.get('canapprove');
    }
    this.tabs = ['Base information', 'Hazardous Containers', 'OOG Container Details', 'Special Handling', 'Attachments'];
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.dropDown=false;
    this.showRightButton = this.tabs.length > 2;
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.cat_map = new Map<string,string>();
    this.subcat_map = new Map<string,string>();
    this.cat_attachments = new Map<string,string>();
    this.cat_map.set("DMG","Damage");
    this.cat_map.set("HD","Heavy Duty");
    this.cat_map.set("OTH","Others");

    this.subcat_map.set("DMG_Top","Top Damaged");
    this.subcat_map.set("DMG_BOTTAM","Bottom Damaged");
    this.subcat_map.set("HEAVY_DUTY","Yacht");
    this.subcat_map.set("Oth","Others");

    this.cat_attachments.set("HAZARDOUS","Hazardous");
    this.cat_attachments.set("OOG","Oog");
    this.cat_attachments.set("SPECIAL HANDLING","Special Handling");

    this.counthazard=0
    this.countOOG=0
    this.countSH=0
  }

  public filterTabs(tab: string): void {
    if(this.selectedTab != tab){
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === 'Base information') {
      this.resetShowTabs(0);
    } else if (tab === 'Hazardous Containers') {
      this.resetShowTabs(1);
    } else if (tab === 'OOG Container Details') {
      this.resetShowTabs(2);
    } else if (tab === 'Special Handling') {
      this.resetShowTabs(3);
    } else if (tab === 'Attachments') {
      this.resetShowTabs(4);
    }
    this.selectedTab = tab;
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
  ionViewWillEnter() {
    this.counthazard=0
    this.countOOG=0
    this.countSH=0
    this.sendearchByIdRequest(this.currentSearchID);
  }
  ionViewDidEnter()
  {

  }
  ionViewWillLeave() {
  }
  ionViewDidLoad() {
  }
  selectedTabsIndex=0;
  openSelecedTab(selectedIndex)
  {
    //(this.detailsArray.dropDownSelected=='true')? detailsArray.dropDownSelected='false':detailsArray.dropDownSelected='true';
    if(this.selectedTabsIndex != selectedIndex)
    {
      this.selectedTabsIndex = selectedIndex;
    }else{
      this.selectedTabsIndex = -1;
    }
  }
  sendearchByIdRequest(currentSearchID:any){
    if(this.fromHistory) {
      currentSearchID = this.cshDetailHistoryModal;
    } else {
      currentSearchID = this.currentSearchID;
    }
    this.cshServiceProvider.getSearchByIdDetails(currentSearchID,true).subscribe(response=> {
      this.cshIdSearchResult = <CSHSearchByIDResultModel>response;
      if(!this.cshIdSearchResult){
        this.issearchbyIDsuccess=false;
      }
      this.showCancelButton();
      this.showEditButton();
      this.cshBaseInfoAttach = this.cshIdSearchResult.cshBaseInfoAttach;
      this.cshHazardousContainer = this.cshIdSearchResult.cshHazardousContainer;
      this.checkAllSelected(this.cshHazardousContainer,'HazardousContainer');
      this.cshCountDetls = this.cshIdSearchResult.cshCountDetls;
      this.checkAllSelected(this.cshCountDetls,'CountDetls');
      this.cshOOGContainer = this.cshIdSearchResult.cshOOGContainer;
      this.checkAllSelected(this.cshOOGContainer,'OOGContainer');
      this.cshSpecialHandling = this.cshIdSearchResult.cshSpecialHandling;
      this.checkAllSelected(this.cshSpecialHandling,'SpecialHandling');
    },error =>{
        this.issearchbyIDsuccess=false;
    });

  }

  // Method that to check data is availbale in the discharge,restow,Load and summary pages
  checkListIsNotEmpty(obj:any){
    if(obj === null|| obj === 'undefined' || obj === undefined)
    {
      return true;
    }
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length === 0;
  }

  isHazardousContainerAllSelected:boolean=true;
  isCountDetlsAllSelected:boolean=true;
  isOOGContainerAllSelected:boolean=true;
  isSpecialHandlingAllSelected:boolean=true;
  checkAllSelected(obj:any,instance)
  {
    let currentItemVal = true;
    for(let i=0;i<obj.length;i++){
      if(obj[i].isSelected!== "Y"){
        currentItemVal = false;
      }
    }
    if(instance == 'HazardousContainer') {
      this.isHazardousContainerAllSelected = currentItemVal;
      for(let i=0;i<obj.length;i++){
        if(obj[i].isSelected== "Y"){
          this.counthazard++
        }
      }
    } else if(instance == 'CountDetls') {
      this.isCountDetlsAllSelected = currentItemVal;
    } else if(instance == 'OOGContainer') {
      for(let i=0;i<obj.length;i++){
        if(obj[i].isSelected== "Y"){
          this.countOOG++
        }
      }
      this.isOOGContainerAllSelected = currentItemVal;
    }else if(instance == 'SpecialHandling') {
      for(let i=0;i<obj.length;i++){
        if(obj[i].isSelected== "Y"){
          this.countSH++
        }
      }
      this.isSpecialHandlingAllSelected = currentItemVal;
    }
  }


  getAttachment(attachment: CSHBaseInfoAttachModel) {
    this.cshServiceProvider.openAttachment(attachment);
  }
  seeWorkFlow() {
    this.navCtrl.push(WorkflowPage, {
      "requestID": this.cshIdSearchResult.cshRequestNo,
      "workflowId": this.cshIdSearchResult.wrkflwId,
      "WFModule": "csh"
    });
  }

  seeComparison(index: any)
  {
    let opencshCompareModel = this.modalCtrl.create(CshCmpModelComponent, {
      cshNo: this.cshIdSearchResult.cshNo,
      cshRequestNo: this.cshDetailHistoryModal.cshRequestNo
    });
    /*opencshCompareModel.onDidDismiss(data => {
      if (null != data) {
        this.containerDetailsArray[index].imdgDetailsSOs = data;
      }
    });*/
    opencshCompareModel.present();
  }
  loadAction() {
    if (this.cshIdSearchResult && this.cshIdSearchResult.approverButton && this.cshIdSearchResult.wrkflwId) {
      return false;
    } else {
      return true;
    }
  }
  seeAction() {
    this.navCtrl.push(ExecuteactionPage,{workFlowId: this.cshIdSearchResult.wrkflwId,
      requestNo: this.cshIdSearchResult.cshRequestNo,
      fromPage: "csh",})
  }
  seehistory()
  {
    console.log("clicked on history");
    this.navCtrl.push(CshHistoryPage, {
      reqestNo: this.cshIdSearchResult.cshRequestNo,
      regStatus: this.regStatus,
      cshItemStatus:this.cshItemStatus
    });
  }

  editCsh()
  {
    console.log("clicked on history");
    this.navCtrl.push(CSHCreateEditPage, {
      fromHistory: true,
      cshNo: this.cshIdSearchResult.cshRequestNo,
      mode: 'edit',
      regStatus: this.regStatus
    });

  }

  buttonStatus() {
    if (this.fromHistory) {
      return false;
    } else {
      return true;
    }
  }

  hideCompare() {
    if(this.fromHistory) {
      if (this.regStatus && this.regStatus == "Approved" && this.cshIdSearchResult &&
        (this.cshIdSearchResult.amendRequestStatus != "Approved") &&
        this.cshIdSearchResult.amendRequestStatus != "Cancelled") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  workflowStatus() {
    if (this.fromHistory) {
      return false;
    } else {
      return true;
    }
  }

  showInfoPopup() {
    let clientCode = localStorage.getItem('CLIENT_CODE');
    this.navCtrl.push(VoyagedetailsPage, {
      sel_rotationNo: this.cshIdSearchResult.rotationNumber,
      sel_sameUser: clientCode,
      isOpenService: true
    });
  }

  cshCancel(){
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      subTitle: 'This action will cancel the CSH registration. Do you want to proceed?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.cshCancelContainerDetailsModel = new CSHCancelContainerDetails();
            this.cshCancelContainerDetailsModel.cshRequestNo= this.cshIdSearchResult.cshRequestNo;
            this.cshCancelContainerDetailsModel.requestStatus= this.cshIdSearchResult.requestStatus;
            this.cshServiceProvider.cancelContainerDetails(this.cshCancelContainerDetailsModel).subscribe(response=> {
              this.cshIdSearchResult = <CSHSearchByIDResultModel>response;
               if(this.cshIdSearchResult.requestStatus=='Cancelled') {
                 this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 3));
              //   this.navCtrl.push(CSHResultsPage,
              //     {
              //       filter: this.customFilter
              //     });
               }
              alert.dismiss();
            } ,error =>{
              console.log(error);
              alert.dismiss();
            });
          },
        },
        {
          text: 'Cancel',
          handler: () => {
            alert.dismiss();
          },
        }]
    });
    alert.present();
  }

 showCancelButton():boolean {
   // if(this.canCancelArg != null || this.canCancelArg != undefined)
   // {
   //   return this.canCancelArg
   // }
   this.cancelHiddenStatus = false;
   if(!this.canApprove) {
/*     if (this.cshItemStatus == 'Rejected' && this.cshIdSearchResult.amendRequestStatus == 'Rejected') {
       this.cancelHiddenStatus = true;
     } else */

    if (this.cshItemStatus == 'Rejected' && this.cshIdSearchResult.amendRequestStatus == 'Cancelled') {
       this.cancelHiddenStatus = true;
     } else if (this.cshItemStatus == 'Cancelled') {
       this.cancelHiddenStatus = true;
     } else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Approved') {
       this.cancelHiddenStatus = true;
     }
/*     else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Rejected') {
       this.cancelHiddenStatus = true;
     } */
     else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Cancelled') {
       this.cancelHiddenStatus = true;
     }
   } else {
     this.cancelHiddenStatus = true;
   }
   return this.cancelHiddenStatus;
 }
  showEditButton():boolean {
    // if(this.canCancelArg != null || this.canCancelArg != undefined)
    // {
    //   return this.canCancelArg
    // }.
    if(!this.canApprove) {
      this.editHiddenStatus = false;
      if (this.cshItemStatus == 'Pending' && this.cshIdSearchResult.amendRequestStatus == 'Pending') {
        this.editHiddenStatus = true;
      } else if (this.cshItemStatus == 'Rejected' && this.cshIdSearchResult.amendRequestStatus == 'Pending') {
        this.editHiddenStatus = true;
      } else if (this.cshItemStatus == 'Rejected' && this.cshIdSearchResult.amendRequestStatus == 'Cancelled') {
        this.editHiddenStatus = true;
      }
  /*    else if (this.cshItemStatus == 'Rejected' && this.cshIdSearchResult.amendRequestStatus == 'Rejected') {
        this.editHiddenStatus = true;
      } */
      else if (this.cshItemStatus == 'Cancelled') {
        this.editHiddenStatus = true;
      }/* else if (this.cshItemStatus == 'Cancelled' && this.cshIdSearchResult.amendRequestStatus == 'Approved') {
        this.editHiddenStatus = true;
      } else if (this.cshItemStatus == 'Cancelled' && this.cshIdSearchResult.amendRequestStatus == 'Rejected') {
        this.editHiddenStatus = true;
      }*/ else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Approved') {
        this.editHiddenStatus = true;
      } else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Pending') {
        this.editHiddenStatus = true;
      }
/*      else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Rejected') {
        this.editHiddenStatus = true;
      } */
      else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Cancelled') {
        this.editHiddenStatus = true;
      }
    } else {
      this.editHiddenStatus = true;
    }
    return this.editHiddenStatus;
  }
}
