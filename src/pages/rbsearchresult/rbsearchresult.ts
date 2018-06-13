import {Component, ViewChild} from '@angular/core';
import {Keyboard} from "@ionic-native/keyboard";
import {AlertController, Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {sortArray, sortNumberArray, Utils} from "../../shared/utils";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DatePipe} from "@angular/common";
import {RBSearchResultModel} from "../../shared/model/rb/rbsearchresult.model";
import {RBSearchResultListModel} from "../../shared/model/rb/rbsearchresult-list.model";
import {RBSearchResultRequestModel} from "../../shared/model/rb/rbsearchresultrequest.model";
import {RBServiceProvider} from "../../providers/webservices/rbservices";
import {RBcreatePage} from "../rbcreate/rbcreate";
import {RBsummaryPage} from "../rbsummary/rbsummary";
import {RBfilterPage} from "../rbfilter/rbfilter";
import {RBsortPage} from "../rbsort/rbsort";
import {RBSortModal} from "../../shared/model/rb/rbSortModal";
import {SecurityUtility} from "../../shared/securityutility";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {RBviewPage} from "../rbview/rbview";
import {RBCancelContainerComponent} from "../../components/rbmodelpage/rb-cancel-container/rb-cancel-container";
/**
 * Generated class for the RbsearchresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-RBsearchresult',
  templateUrl: 'rbsearchresult.html',
  providers: [Utils,RBSearchResultRequestModel,RBSearchResultListModel,RBServiceProvider,RBSortModal,SecurityUtility]
})
export class RBsearchresultPage {

  @ViewChild(Content) content: Content;

  public searchResults: RBSearchResultModel[];
  createdFromDate: any;
  createdToDate: any;
  public alertHeadding: string;
  public no_data_filter: string;
  public ok_text: string;
  resultCount:any;
  ascending: boolean = false;
  selectedTitle: string;
  left: any;
  right: any;
  lengthofmainarray: number = 0;
  canCreateBool: boolean = false;
  canCancelBool: boolean = false;

  constructor(public keyboard: Keyboard,
              public navCtrl: NavController,
              public navParams: NavParams,
              public datepipe: DatePipe,
              public utils: Utils,
              public rbRequestModel: RBSearchResultRequestModel,
              public rbSearchResultListModel: RBSearchResultListModel,
              public rbSearch_Modal: RBSearchResultRequestModel,
              public rbServiceProvider: RBServiceProvider,
              public rbSortModal: RBSortModal,
              public alertCtrl: AlertController,
              public securityUtility: SecurityUtility,
              private commonServices: CommonservicesProvider,) {
    this.selectedTitle = "rb_requestno";
    this.canCreateBool = this.canCreate();
    this.canCancelBool = this.canCancel();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad rbsearchresultPage');
  }

  ionViewWillEnter() {
    this.loadDefaultValues();
    this.searchResults = new Array<RBSearchResultModel>();
    this.searchRbResult();
  }

  getStatusIcon(s) {

    switch (s.resourceBookingStatus) {
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

  private loadDefaultValues() {
    if(this.rbRequestModel.fromFilter == false) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
      this.createdToDate = new Date().toISOString();
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy H:mm');
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy H:mm');
      this.rbRequestModel.resReqNoSrch = "";
      this.rbRequestModel.cusRefNoSrch = "";
      this.rbRequestModel.requestTypeSrch = "";
      this.rbRequestModel.spTypeSrch = "";
      this.rbRequestModel.locationSrch = "";
      this.rbRequestModel.spNameSrch = "";
      this.rbRequestModel.terminalConSrch = "";
      this.rbRequestModel.searchBySrch = "";
      this.rbRequestModel.containerNoSrch = "";
      this.rbRequestModel.caNoSrch = "";
      this.rbRequestModel.doNoSrch = "";
      this.rbRequestModel.crNoSrch = "";
      this.rbRequestModel.rotationNoSrch = "";
      this.rbRequestModel.vesselNameSrch = "";
      this.rbRequestModel.terminalSrch = "";
      this.rbRequestModel.resourceBookingStatusSrch = "All";
      this.rbRequestModel.serviceStatusSrch = "";
      this.rbRequestModel.fromDateSrch = this.createdFromDate;
      this.rbRequestModel.todateSrch = this.createdToDate;
    } else {
      this.rbSearch_Modal = Object.assign({}, this.rbRequestModel);
    }
  }

  private searchRbResult() {
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.no_data_filter = this.utils.getLocaleString("vesselsearchalert");
    this.ok_text = this.utils.getLocaleString("ok_text");
    if (null != this.rbSearch_Modal.resReqNoSrch && this.rbSearch_Modal.resReqNoSrch.length > 0) {
      this.rbSearch_Modal.cusRefNoSrch = "";
      this.rbSearch_Modal.requestTypeSrch = "";
      this.rbSearch_Modal.spTypeSrch = "";
      this.rbSearch_Modal.locationSrch = "";
      this.rbSearch_Modal.spNameSrch = "";
      this.rbSearch_Modal.terminalConSrch = "";
      this.rbSearch_Modal.searchBySrch = "";
      this.rbSearch_Modal.containerNoSrch = "";
      this.rbSearch_Modal.caNoSrch = "";
      this.rbSearch_Modal.doNoSrch = "";
      this.rbSearch_Modal.crNoSrch = "";
      this.rbSearch_Modal.rotationNoSrch = "";
      this.rbSearch_Modal.vesselNameSrch = "";
      this.rbSearch_Modal.terminalSrch = "";
      this.rbSearch_Modal.resourceBookingStatusSrch = "All";
      this.rbSearch_Modal.serviceStatusSrch = "";
      this.rbSearch_Modal.fromDateSrch = "";
      this.rbSearch_Modal.todateSrch = "";
      this.rbSearch_Modal.fromFilter = true;
    }
    this.rbServiceProvider.rbSearchAll(this.rbSearch_Modal).subscribe(response => {
      this.rbSearchResultListModel = <RBSearchResultListModel>response;
      this.searchResults = this.rbSearchResultListModel.list;
      this.resultCount = this.searchResults.length;

      if (this.rbSortModal.sortOption && this.searchResults) {
        this.selectedTitle = this.rbSortModal.sortOption ? this.rbSortModal.sortOption : '';
        this.ascending = this.rbSortModal.sortOrder != null ? this.rbSortModal.sortOrder : true;

      } else {
        this.ascending = false;
      }
      this.asc();
      this.content.scrollToTop(0);
      if (null != this.resultCount && this.resultCount == 0) {
        const alert = this.alertCtrl.create({
          title: this.alertHeadding,
          subTitle: this.no_data_filter,
          buttons: [this.ok_text]
        });
        alert.present();
      }
    });
  }

  asc() {
    if (this.selectedTitle != "") {
      if (this.selectedTitle === 'rb_requestno') {
        this.searchResults = sortNumberArray(this.searchResults, "rsbId",this.ascending);
      }
      if (this.selectedTitle === 'rb_customerref') {
        this.searchResults = sortNumberArray(this.searchResults, "cusReferenceNo",this.ascending);
      }
      if (this.selectedTitle === 'rb_requesttype') {
        this.searchResults = sortArray(this.searchResults, "requestType",this.ascending);
      }

      else if (this.selectedTitle === 'createdDate') {
        this.searchResults = this.sortDateArray(this.searchResults, "createdDate");
      }

      else if (this.selectedTitle == 'requestStatus') {
        this.searchResults = sortArray(this.searchResults, "resourceBookingStatus",this.ascending);

      }
      else if (this.selectedTitle == 'rb_servicestatus') {
        this.searchResults = sortArray(this.searchResults, "serviceStatus",this.ascending);

      }
      this.lengthofmainarray = this.searchResults.length;
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }

  sortDateArray(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      this.left = new Date(this.transformwithTime(a[args]));
      this.right = new Date(this.transformwithTime(b[args]));
      return this.ascending ? this.left - this.right : this.right - this.left;
    });
    return array;
  }

  transform(value: string): Date {
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1])
    );
    return dateObject;
  }
  transformwithTime(value: string): Date {
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1]),
      (+dateArray[4]),
      (+dateArray[5]));
    return dateObject;
  }

  canCreate() {
    if (this.securityUtility.canAmend(this.securityUtility.RESOURCE_BOOKING) == true) {
      return false;
    } else {
      return true;
    }
  }

  canCancel() {
    if (this.securityUtility.canCancel(this.securityUtility.RESOURCE_BOOKING) == true) {
      return false;
    } else {
      return true;
    }
  }

  getStyle() {
    return '#808080';
  }

  navigateToSort() {
    this.rbSortModal.fromSort = false;
    this.navCtrl.push(RBsortPage,{sortModal: this.rbSortModal});
  }

  navigateToFilter() {
    this.rbSortModal.fromSort = false;
    this.navCtrl.push(RBfilterPage, {Request: this.rbRequestModel});
  }

  openRBCreate() {
    this.navCtrl.push(RBcreatePage,{mode:'create'});
  }

  showdetails(index:any) {
    this.navCtrl.push(RBsummaryPage, {
      filter: this.rbSearch_Modal,
      rbSearchResult: this.searchResults[index],
      rbItemStatus:this.searchResults[index].resourceBookingStatus,
      rbCanCancel:this.searchResults[index].canCancel,
      rbCanApprove:this.searchResults[index].canApprove,
      rbCanAmend:this.searchResults[index].canAmend
    });
  }
  isAdminUser(selectedContainer) {
    if (selectedContainer.canApprove == true) {
      return true;
    } else {
      return false;
    }
  }

  hideApproveButton(s) {
    if (s.approverButton == true && s.canApprove == true) {
      return false;
    } else {
      return true;
    }
  }

  gotoapprove(s) {
    this.navCtrl.push(ExecuteactionPage, {
      workFlowId: s.wrkflwId,
      requestNo: s.cshNo,
      fromPage: "RBsearchResults"
    });
  }
  goview(s) {
    console.log("clicked on View");
    this.navCtrl.push(RBviewPage, {rsbId: s.rsbId,
      filter: this.rbSearch_Modal,
      requestType: s.requestType,
      regStatus: s.resourceBookingStatus,
      });
  }

  goedit(s) {
    this.navCtrl.push(RBcreatePage, {rsbId: s.rsbId,
      mode: 'edit',fromHistory: false});
  }

  goCancelRb(selectContainer) {
    this.navCtrl.push(RBCancelContainerComponent, {rsbId: selectContainer.rsbId,
      resourceBookingStatus: selectContainer.resourceBookingStatus});
  }

  cancelHidden(selectedContainer):boolean {

    let cancelStatus: boolean = false;

    if (!selectedContainer.canApprove) {

      if(selectedContainer.resourceBookingStatus == "Approved") {
        if(selectedContainer.amendRequestStatus == "Approved" || selectedContainer.amendRequestStatus == "Rejected" || selectedContainer.amendRequestStatus == "Cancelled") {
          cancelStatus = true;
        } else {
          cancelStatus = false;
        }
      }

      if(selectedContainer.resourceBookingStatus == "Submitted") {
        if(selectedContainer.amendRequestStatus == "Submitted") {
          cancelStatus = true;
        }
      }

      if(selectedContainer.resourceBookingStatus == "Rejected") {
        if(selectedContainer.amendRequestStatus == "Rejected" || selectedContainer.amendRequestStatus == "Cancelled") {
          cancelStatus = true;
        } else {
          cancelStatus = false;
        }
      }
      if (null == selectedContainer.serviceStatus || selectedContainer.serviceStatus == '') {
        cancelStatus = true;
      } else {
        cancelStatus = false;
      }

    } else if(localStorage.getItem('LOGGEDINUSER').toLowerCase() == "toadmin") {

  //    if(selectedContainer.amendRequestStatus == "Submitted" || selectedContainer.amendRequestStatus == "Pending") {
        cancelStatus = false;
      // } else {
      //   cancelStatus = true;
      // }
    }
    return cancelStatus;
  }

  showEditButton(selectedContainer){
    let editStatus : boolean = false;
    if (!selectedContainer.canApprove) {

      if(selectedContainer.resourceBookingStatus == "Approved") {
        if(selectedContainer.amendRequestStatus == "Approved" || selectedContainer.amendRequestStatus == "Rejected" || selectedContainer.amendRequestStatus == "Cancelled") {
          editStatus =  true;
        } else {
          editStatus =   false;
        }
      }

      if(selectedContainer.resourceBookingStatus == "Submitted") {
        if(selectedContainer.amendRequestStatus == "Submitted") {
          editStatus = true;
        } else {
          editStatus = false;
        }
      }

      if(selectedContainer.resourceBookingStatus == "Rejected") {
        if(selectedContainer.amendRequestStatus == "Rejected" || selectedContainer.amendRequestStatus == "Cancelled") {
          editStatus = true;
        } else {
          editStatus = false;
        }
      }
      if (null == selectedContainer.serviceStatus
        ||selectedContainer.serviceStatus == 'Declined'
        ||selectedContainer.serviceStatus == '') {
        editStatus = true;
      } else {
        editStatus = false;
      }

    } else if((localStorage.getItem('LOGGEDINUSER').toLowerCase() == "toadmin")&& selectedContainer.resourceBookingStatus == "Approved" ) {

      if(selectedContainer.amendRequestStatus == "Approved" ||
        selectedContainer.amendRequestStatus == "Rejected" ||
        selectedContainer.amendRequestStatus == "Cancelled") {
        if(selectedContainer.serviceStatus.toLocaleLowerCase() == 'work in progress') {
          editStatus =  true;
        } else {
          editStatus = false;
        }
      } else {
        editStatus =  true;
      }
    }
    return editStatus;
  }


   hideCreate(): boolean {
    if (this.securityUtility.canCreate(this.securityUtility.RESOURCE_BOOKING) == true) {
      return true;
    } else {
      return false;
    }
  }
}
