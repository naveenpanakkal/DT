import { Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController, NavParams, Platform,Alert} from 'ionic-angular';
import {CSHSearchResultModel} from "../../shared/model/csh/cshsearchresult.model";
import {CSHDetailsPage} from "../cshdetailsview/cshdetailsview";
import {CshHistoryPage} from "../cshhistory/cshhistory";
import {CSHSearchByIDResultModel}from "../../shared/model/csh/cshsearchbyidresult.model";
import {CSHCountDetailsModel}from "../../shared/model/csh/cshcountdetails.model";
import {Utils} from "../../shared/utils";
import {CSHCancelContainerDetails} from "../../shared/model/csh/cancelcontainerdetails.model";
import {CshServiceProvider} from "../../providers/webservices/cshservice";
import {CSHSearchByIDReqModel} from "../../shared/model/csh/cshsearchbyidreq.model";
import {CSHResultsPage} from "../cshresults/cshresults";
import {BerthSearchViewPage} from "../berthsearchview/berthsearchview";
import {CSHSearchReqModel} from "../../shared/model/csh/cshsearchreq.model";
import {CSHCreateEditPage} from "../cshdetailscreateandedit/cshdetailscreateandedit";
import {VoyagedetailsPage} from "../voyagedetails/voyagedetails";
import { CSHHazardousContainerModel } from '../../shared/model/csh/cshhazardouscontainer.model';
import { CSHOOGContainerModel } from '../../shared/model/csh/cshoogcontainer.model';
import { CSHSpecialHandlingModel } from '../../shared/model/csh/cshspecialhandling.model';
/**
 * Generated class for the CshSummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-csh-summary',
  templateUrl: 'csh-summary.html',
  providers: [CSHSearchResultModel,Utils,CshServiceProvider,CSHSearchReqModel]
})
export class CshSummaryPage {
  @ViewChild('navbar') navBar: Navbar;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;
  cshReqNo:any;
  rotationNo:any;
  mode:any;
  cshEtaDate:any;
  cshStatus:any;
  alert:Alert;
  cshReqCutTime:any;
  cshCreatedBy:any;
  cshCreatedDate:any;
  popupStatus:boolean = false;
  editHiddenStatus:boolean = false;
  cancelHiddenStatus:boolean = false;
  fromCreate:boolean=false;
  cshSearchByIDResultModel:CSHSearchByIDResultModel;
  cshCountDetailsModel:CSHCountDetailsModel[];
  vesselName:any;
  notificationMessage: string;
  cshCancelContainerDetailsModel: CSHCancelContainerDetails;
  cshIdSearchResult:CSHSearchByIDResultModel;
  canCancelArg:boolean;
  canAmendArg:boolean;
  canApproveArg:boolean;
  cshItemStatus:any;
  hazardousContainerlength: number
  oogContainerlength : number
  shContainerlength : number
  length1 :number
  length2 :number
  length3 :number
  showloading:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController,
              public cshServiceProvider: CshServiceProvider,
              public cshSearchResult : CSHSearchResultModel,
              public customFilter:CSHSearchReqModel,
   public platform: Platform,public utils: Utils){
    this.mode=this.navParams.get('mode');
    this.fromCreate= this.navParams.get('fromCreate');
    this.customFilter = this.navParams.get('filter');
    this.hazardousContainerlength=0;
    this.oogContainerlength=0;
    this.shContainerlength=0;
    if(this.fromCreate){
      this.cshSearchByIDResultModel=this.navParams.get('cshSearchByIDResultModel');
      this.cshReqNo = this.cshSearchByIDResultModel.cshNo;
      this.rotationNo = this.cshSearchByIDResultModel.rotationNumber;
      this.vesselName=this.cshSearchByIDResultModel.vesselName;
      this.cshEtaDate=this.cshSearchByIDResultModel.eta.concat(" GST");
      this.cshCountDetailsModel = this.cshSearchByIDResultModel.cshCountDetls;
      this.cshStatus = this.cshSearchByIDResultModel.requestStatus;
      if(this.mode != null && this.mode == "create") {
        this.notificationMessage = this.utils.getLocaleString("csh_created_successfully");
      }else if(this.mode != null && this.mode == "edit"){
        this.notificationMessage = this.utils.getLocaleString("csh_amended_successfully");
      }
    }else{
      let searchByIDReqModel = new CSHSearchByIDReqModel();
      let cshIdSearchResult = new CSHSearchByIDResultModel();
      searchByIDReqModel.cshNo=this.navParams.get('cshNo');
      this.cshServiceProvider.getSearchByIdDetails(searchByIDReqModel,this.showloading).subscribe(response=> {
        cshIdSearchResult = <CSHSearchByIDResultModel>response;
        if(cshIdSearchResult){
          this.checkAllSelected(cshIdSearchResult.cshHazardousContainer,'HazardousContainer');
          this.checkAllSelected(cshIdSearchResult.cshOOGContainer,'OOGContainer');
          this.checkAllSelected(cshIdSearchResult.cshSpecialHandling,'SpecialHandling');
        }
      } ,error =>{
        console.log(error);
      });
      this.cshItemStatus = this.navParams.get('cshItemStatus');
      this.cshSearchResult = this.navParams.get('cshSearchResult');
      this.cshReqNo = this.cshSearchResult.cshNo;
      this.rotationNo = this.cshSearchResult.rotationNumber;
      this.cshEtaDate = this.cshSearchResult.etaSearch;
      this.cshStatus = this.cshSearchResult.requestStatus;
      this.cshReqCutTime = this.cshSearchResult.requestCutOffTime;
      this.canCancelArg = this.cshSearchResult.canCancel;
      this.canAmendArg = this.cshSearchResult.canAmend;
      this.canApproveArg = this.cshSearchResult.canApprove;
      this.vesselName=this.cshSearchResult.vesselName;
      this.cshCreatedDate=this.cshSearchResult.createdDate;
      this.cshCreatedBy=this.cshSearchResult.createdBy;
    }
    //this.showCancelButton();
  }
  ionViewWillEnter()
  {
    this.getSearchResult();
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
    this.navigateBack();
    }
  }

  ionViewDidLoad() {

   }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  navigateBack() {
    if(this.popupStatus == false) {
      this.navCtrl.popTo(this.navCtrl.getByIndex(1));
    }
    else{
      this.alert.dismiss();
      this.popupStatus = false;
    }
   /* if (this.fromCreate) {
      //this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 2));

    } else {
      this.navCtrl.pop();
    }*/
  }

  initializeBackButtonCustomHandler(): void {
    var backEvent = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      backEvent.navigateBack();
    }, 101);
  }
  editCsh()
  {
     this.navCtrl.push(CSHCreateEditPage, {fromHistory: false,cshNo: this.cshSearchResult.cshNo,
      mode: 'edit',regStatus: this.cshSearchResult.requestStatus});
  }


  viewCsh()
  {
    console.log("clicked on View");
    this.navCtrl.push(CSHDetailsPage, {cshNo: this.cshSearchResult.cshNo,
      filter: this.customFilter,
      regStatus: this.cshSearchResult.requestStatus});
  }

  seehistory()
  {
    console.log("clicked on history");
    this.navCtrl.push(CshHistoryPage, {
      reqestNo: this.cshReqNo,
      filter: this.customFilter,
      regStatus: this.cshSearchResult.requestStatus,
      cshItemStatus: this.cshItemStatus,
      cancancel:this.canCancelArg,
      canamend:this.canAmendArg,
      canapprove:this.canApproveArg
  });

  }

  isFromCshDetails()
  {
    return false;
  }

  getStatusIcon(vstatus) {

    switch (vstatus) {
      case 'Approved':
        return "assets/img/approved.svg";
      case 'Rejected':
        return "assets/img/rejected.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Submitted':
        return "assets/img/submitted.svg";
      case 'Suspended':
        return "assets/img/suspended.svg";
    }
  }

  getStyle() {
    return '#808080';
  }
  cancelCsh(){
    this.popupStatus = true;
    this.alert = this.alertCtrl.create({
      title: 'Confirm',
      subTitle: 'This action will cancel the CSH registration. Do you want to proceed?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.popupStatus = false;
            this.cshCancelContainerDetailsModel = new CSHCancelContainerDetails();
            this.cshCancelContainerDetailsModel.cshNo=  this.cshReqNo;
            this.cshCancelContainerDetailsModel.requestStatus= this.cshSearchResult.requestStatus;
            this.cshServiceProvider.cancelContainerDetails(this.cshCancelContainerDetailsModel).subscribe(response=> {
              this.cshIdSearchResult = <CSHSearchByIDResultModel>response;
              if(this.cshIdSearchResult.requestStatus=='Cancelled') {
                // this.navCtrl.push(CSHResultsPage,
                //   {
                //     filter: this.customFilter
                //   });
                this.navigateBack()
              }
              this.alert.dismiss();
              this.popupStatus = false;
            } ,error =>{
              console.log(error);
              this.alert.dismiss();
              this.popupStatus = false;
            });
            this.alert.dismiss();
            this.popupStatus = false;
          },
        },
        {
          text: 'Cancel',
          handler: () => {
            this.alert.dismiss();
            this.popupStatus = false;
          },
        }]
    });
    this.alert.present();
  }

  getSearchResult() {
    this.showloading=true;
     let currentSearchID = new CSHSearchByIDReqModel();
    currentSearchID.cshNo = this.cshReqNo;
    //this.editHiddenStatus = false;
    this.cshServiceProvider.getSearchByIdDetails(currentSearchID,this.showloading).subscribe(response=> {
      this.cshIdSearchResult = <CSHSearchByIDResultModel>response;
      this.cshStatus = this.cshIdSearchResult.requestStatus;
      this.showCancelButton();
      this.showEditButton();
    } ,error =>{
    });
  }
  showCancelButton():boolean {
    this.cancelHiddenStatus = false;
    if(!this.canApproveArg) {
      if (this.cshIdSearchResult == null || this.cshIdSearchResult == undefined) {
        return false;
      }
      if (this.cshItemStatus == 'Pending' && this.cshIdSearchResult.amendRequestStatus == 'Pending') {
        this.cancelHiddenStatus = true;
      } else if (this.cshItemStatus == 'Rejected' && this.cshIdSearchResult.amendRequestStatus == 'Submitted') {
        this.cancelHiddenStatus = true;
      } else if (this.cshItemStatus == 'Rejected' && this.cshIdSearchResult.amendRequestStatus == 'Pending') {
        this.cancelHiddenStatus = true;
      } else if (this.cshItemStatus == 'Cancelled' && this.cshIdSearchResult.amendRequestStatus == 'Cancelled') {
        this.cancelHiddenStatus = true;
      } else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Submitted') {
        this.cancelHiddenStatus = true;
      } else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Pending') {
        this.cancelHiddenStatus = true;
      }
    }else {
      this.cancelHiddenStatus = true;
    }
    return this.cancelHiddenStatus;
  }
  showEditButton():boolean {
    if (!this.canApproveArg) {
      if (this.cshIdSearchResult == null || this.cshIdSearchResult == undefined) {
        return false;
      }
      if (this.cshItemStatus == 'Pending' && this.cshIdSearchResult.amendRequestStatus == 'Pending') {
        this.editHiddenStatus = true;
      } else if (this.cshItemStatus == 'Rejected' && this.cshIdSearchResult.amendRequestStatus == 'Submitted') {
        this.editHiddenStatus = true;
      } else if (this.cshItemStatus == 'Rejected' && this.cshIdSearchResult.amendRequestStatus == 'Pending') {
        this.editHiddenStatus = true;
      } else if (this.cshItemStatus == 'Cancelled' && this.cshIdSearchResult.amendRequestStatus == 'Cancelled') {
        this.editHiddenStatus = true;
      } else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Submitted') {
        this.editHiddenStatus = true;
      } else if (this.cshItemStatus == 'Approved' && this.cshIdSearchResult.amendRequestStatus == 'Pending') {
        this.editHiddenStatus = true;
      }
    } else {
      this.editHiddenStatus = true;
    }
    return this.cancelHiddenStatus;
  }
  showInfoPopup() {
    let clientCode = localStorage.getItem('CLIENT_CODE');
    this.navCtrl.push(VoyagedetailsPage, {
      sel_rotationNo: this.rotationNo,
      sel_sameUser: clientCode,
      isOpenService: true
    });
  }
   checkAllSelected(obj:any,instance)
  {
   
    if(instance == 'HazardousContainer') {
      for(let i=0;i<obj.length;i++){
        if(obj[i].isSelected== "Y"){
          this.hazardousContainerlength++
        }
      }
    } else if(instance == 'CountDetls') {
    } else if(instance == 'OOGContainer') {
      for(let i=0;i<obj.length;i++){
        if(obj[i].isSelected== "Y"){
          this.oogContainerlength++
        }
      }
    }else if(instance == 'SpecialHandling') {
      for(let i=0;i<obj.length;i++){
        if(obj[i].isSelected== "Y"){
          this.shContainerlength++
        }
      }
    }
  }
}
