import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {SecurityUtility} from "../../shared/securityutility";
import {Utils} from "../../shared/utils";
import {RBSearchResultModel} from "../../shared/model/rb/rbsearchresult.model";
import {RBSearchResultRequestModel} from "../../shared/model/rb/rbsearchresultrequest.model";
import {RBSearchByIDResultModel} from "../../shared/model/rb/rbsearchbyidresult.model";
import {RBSearchByIDReqModel} from "../../shared/model/rb/rbsearchbyidreq.model";
import {RBhistoryPage} from "../rbhistory/rbhistory";
import {RBviewPage} from "../rbview/rbview";
import {RBServiceProvider} from "../../providers/webservices/rbservices";
import {RBCancelRequestModal} from "../../shared/model/rb/rbcancelrequest.modal";
import {RBCancelContainerComponent} from "../../components/rbmodelpage/rb-cancel-container/rb-cancel-container";
import {RBcreatePage} from "../rbcreate/rbcreate";

/**
 * Generated class for the RbsummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-RBsummary',
  templateUrl: 'rbsummary.html',
  providers: [RBSearchResultModel,RBServiceProvider,RBSearchResultRequestModel,RBCancelRequestModal,SecurityUtility, Utils]
})
export class RBsummaryPage {
  @ViewChild('navbar') navBar: Navbar;
  rbRequestNo: number;
  requestId:number
  customerRefNo: string;
  reqType:string;
  createdDate:string;
  reqStatus:string;
  serviceStatus:string;
  fromCreate:boolean=false;
  rbItemStatus:any;
  notificationMessage: string;
  public unregisterBackButtonAction: any;
  rbSearchByIDResultModel:RBSearchByIDResultModel;
  rbIdSearchResult:RBSearchByIDResultModel;
  cancelHiddenStatus:boolean = false;
  canApproveArg:boolean;
  canCancelArg:boolean;
  canAmendArg:boolean;
  editHiddenStatus:boolean = false;
  alertButtonDismiss: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public alertCtrl: AlertController,
              public rbServiceProvider: RBServiceProvider,
              public rbSearchResult: RBSearchResultModel,
              public customFilter:RBSearchResultRequestModel,
              public platform: Platform, public utils: Utils) {
    this.fromCreate= this.navParams.get('fromCreate');
    this.customFilter = this.navParams.get('filter');
    if(this.fromCreate){
      this.rbSearchByIDResultModel=this.navParams.get('rbSearchByIDResultModel');
      this.rbRequestNo = this.rbSearchByIDResultModel.rsbId;
      this.requestId = this.rbSearchByIDResultModel.rsbReqId;
      this.customerRefNo = this.rbSearchByIDResultModel.cusReferenceNo;
      this.reqType=this.rbSearchByIDResultModel.requestType;
      this.createdDate=this.rbSearchByIDResultModel.createdDate;
      this.reqStatus = this.rbSearchByIDResultModel.resourceBookingStatus;
      this.serviceStatus = this.rbSearchByIDResultModel.serviceStatus;
      this.notificationMessage = this.utils.getLocaleString("csh_created_successfully");
    }else{
      this.rbItemStatus = this.navParams.get('rbItemStatus');
      this.rbSearchResult = this.navParams.get('rbSearchResult');
      this.rbRequestNo = this.rbSearchResult.rsbId;
      this.requestId=this.rbSearchResult.requestId;
      this.customerRefNo = this.rbSearchResult.cusReferenceNo;
      this.reqType = this.rbSearchResult.requestType;
      this.createdDate = this.rbSearchResult.createdDate;
      this.reqStatus = this.rbSearchResult.resourceBookingStatus;
      this.serviceStatus = this.rbSearchResult.serviceStatus;
      this.canCancelArg = this.rbSearchResult.canCancel;
      this.canAmendArg = this.rbSearchResult.canAmend;
      this.canApproveArg = this.rbSearchResult.canApprove;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RbsummaryPage');
  }
  ionViewWillEnter()
  {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.navigateBack();
    }
    this.getSearchResult();
  }
  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      _this.navigateBack();
    }, 101);
  }
  navigateBack() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  }
  getSearchResult() {
    let currentSearchID = new RBSearchByIDReqModel();
    currentSearchID.rsbId = this.rbRequestNo.toString();
    this.rbServiceProvider.getSearchById(currentSearchID).subscribe(response=> {
      this.rbIdSearchResult = <RBSearchByIDResultModel>response;
      this.reqStatus = this.rbIdSearchResult.resourceBookingStatus;
      this.showCancelButton();
      this.showEditButton();
    } ,error =>{
    });
  }
  showEditButton():boolean {
    this.editHiddenStatus = false;
    if (!this.canApproveArg) {
      if (this.rbIdSearchResult == null || this.rbIdSearchResult == undefined) {
        return false;
      }

      if(this.rbItemStatus.status == "Approved") {
        if(this.rbIdSearchResult.amendRequestStatus == "Approved" || this.rbIdSearchResult.amendRequestStatus == "Rejected"
          || this.rbIdSearchResult.amendRequestStatus == "Cancelled") {
          this.editHiddenStatus = true;
        } else {
          this.editHiddenStatus = false;
        }
      }

      if(this.rbItemStatus.status == "Submitted") {
        if(this.rbIdSearchResult.amendRequestStatus == "Submitted") {
          this.editHiddenStatus = true;
        }
      }

      if(this.rbItemStatus.status == "Rejected") {
        if(this.rbIdSearchResult.amendRequestStatus == "Cancelled" || this.rbIdSearchResult.amendRequestStatus == "Rejected") {
          this.editHiddenStatus = true;
        } else {
          this.editHiddenStatus = false;
        }
      }
      if(this.rbItemStatus.status == "Pending") {
        if(this.rbIdSearchResult.amendRequestStatus == "Pending") {
          this.editHiddenStatus = false;
        }
      }

      if(this.rbItemStatus.status == "Cancelled") {
        if(this.rbIdSearchResult.amendRequestStatus == "Cancelled") {
          this.editHiddenStatus = false;
        } else {
          this.editHiddenStatus = false;
        }
      }
      if(null == this.rbIdSearchResult.serviceStatus || "" == this.rbIdSearchResult.serviceStatus) {
        this.editHiddenStatus = true;
      } else {
        this.editHiddenStatus = false;
      }

      } else if((localStorage.getItem('LOGGEDINUSER').toLowerCase() == "toadmin")&& this.rbItemStatus == "Approved" ) {

      if(this.rbIdSearchResult.amendRequestStatus == "Approved" ||
        this.rbIdSearchResult.amendRequestStatus == "Rejected" ||
        this.rbIdSearchResult.amendRequestStatus == "Cancelled") {
        if (this.rbIdSearchResult.serviceStatus.toLocaleLowerCase() == 'work in progress') {
          this.editHiddenStatus = true;
        } else {
          this.editHiddenStatus = false;
        }
      } else {
        this.editHiddenStatus = false;
      }
    }
    return this.editHiddenStatus;
  }

  showCancelButton():boolean {
    this.cancelHiddenStatus = false;
    if (!this.canApproveArg) {
      if (this.rbIdSearchResult == null || this.rbIdSearchResult == undefined) {
        return false;
      }
      if(this.rbItemStatus.status == "Approved") {
        if(this.rbIdSearchResult.amendRequestStatus == "Approved" || this.rbIdSearchResult.amendRequestStatus == "Rejected"
          || this.rbIdSearchResult.amendRequestStatus == "Cancelled") {
          this.cancelHiddenStatus = true;
        } else {
          this.cancelHiddenStatus = false;
        }
      }

      if(this.rbItemStatus.status == "Submitted") {
        if(this.rbIdSearchResult.amendRequestStatus == "Submitted") {
          this.cancelHiddenStatus = true;
        } else {
          this.cancelHiddenStatus = false;
        }
      }

      if(this.rbItemStatus.status == "Rejected") {
        if(this.rbIdSearchResult.amendRequestStatus == "Rejected" || this.rbIdSearchResult.amendRequestStatus == "Cancelled") {
          this.cancelHiddenStatus = true;
        } else {
          this.cancelHiddenStatus = false;
        }
      }
      if(this.rbItemStatus.status == "Pending") {
        if(this.rbIdSearchResult.amendRequestStatus == "Pending") {
          this.cancelHiddenStatus = false;
        }
      }

      if(this.rbItemStatus.status == "Cancelled") {
        if(this.rbIdSearchResult.amendRequestStatus == "Cancelled") {
          this.cancelHiddenStatus = false;
        } else {
          this.cancelHiddenStatus = true;
        }
      }
      if(null == this.rbIdSearchResult.serviceStatus ||"" == this.rbIdSearchResult.serviceStatus || 'Declined'== this.rbIdSearchResult.serviceStatus) {
        this.cancelHiddenStatus = true;
      } else {
        this.cancelHiddenStatus = false;
      }
    } else if(localStorage.getItem('LOGGEDINUSER').toLowerCase() == "toadmin") {
      this.cancelHiddenStatus = false;
    }
    return this.cancelHiddenStatus;
  }



  getStatusIcon(RBstatus) {

    switch (RBstatus) {
      case 'Submitted':
        return "assets/img/submitted.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Approved':
        return "assets/img/approved.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Rejected':
        return "assets/img/rejected.svg";
    }
  }
  getStyle() {
    return '#808080';
  }

  viewRB(){
    this.navCtrl.push(RBviewPage, {rsbId: this.rbSearchResult.rsbId,
      filter: this.customFilter,
      requestType: this.rbSearchResult.requestType,
      regStatus: this.rbSearchResult.resourceBookingStatus});
  }

  editRB(){
    this.navCtrl.push(RBcreatePage, {rsbId: this.rbSearchResult.rsbId, mode:'edit',fromHistory: false});
  }

  cancelRB() {
    this.navCtrl.push(RBCancelContainerComponent, {rsbId: this.rbRequestNo,
      resourceBookingStatus: this.reqStatus, fromHistory: false});
  }

  seeHistory() {
    this.navCtrl.push(RBhistoryPage, {
      rsbId: this.rbRequestNo,
      requestId: this.requestId,
      filter: this.customFilter,
      regStatus: this.rbSearchResult.resourceBookingStatus,
      requestType: this.rbSearchResult.requestType,
      cancancel:this.canCancelArg,
      canamend:this.canAmendArg,
      canapprove:this.rbSearchResult.canApprove});
  }

  printDoc() {
    let args = new Map();
    args.set("rbRequestNo", this.rbSearchResult.rsbId.toString());
    args.set("exportType", "pdf");
    //this.rbServiceProvider.printTA(args);
  }

  isFromRbDetails()
  {
    return false;
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: this.alertButtonDismiss,
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    alert.present();
  }
}
