import {Component, ViewChild} from '@angular/core';
import {
  Platform, AlertController, Content, IonicPage, NavController, NavParams, PopoverController, ModalController} from 'ionic-angular';

import {sortArray, sortNumberArray, Utils} from "../../shared/utils";

import {DatePipe} from "@angular/common";
import {Keyboard} from "@ionic-native/keyboard";
import {CSHSearchResultModel} from "../../shared/model/csh/cshsearchresult.model";
import {CSHSearchReqModel} from "../../shared/model/csh/cshsearchreq.model";
import {CshServiceProvider} from "../../providers/webservices/cshservice";
import {CSHSearchResultListModel} from "../../shared/model/csh/cshsearchresult-list.model";
import {VesselloaddischargesummarysortPage} from "../vesselloaddischargesummarysort/vesselloaddischargesummarysort";
import {VesselloaddischargesummaryfilterPage} from "../vesselloaddischargesummaryfilter/vesselloaddischargesummaryfilter";
import {CSHSortModal} from "../../shared/model/csh/cshSortModal";
import {CshsortPage} from "../cshsort/cshsort";
import {CshfilterPage} from "../cshfilter/cshfilter";
import {CSHCreateEditPage} from "../cshdetailscreateandedit/cshdetailscreateandedit";
import {CshSummaryPage} from "../csh-summary/csh-summary";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {SecurityUtility} from "../../shared/securityutility";
import {CSHDetailsPage} from "../cshdetailsview/cshdetailsview";
import {CSHSearchByIDResultModel} from "../../shared/model/csh/cshsearchbyidresult.model";
import {CSHCancelContainerDetails} from "../../shared/model/csh/cancelcontainerdetails.model";
import { CSHSearchByIDReqModel } from '../../shared/model/csh/cshsearchbyidreq.model';
/**
 * Generated class for the CSHResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cshresults',
  templateUrl: 'cshresults.html',
  providers: [Utils,CSHSearchReqModel,CSHSearchResultListModel,CshServiceProvider,CSHSortModal,SecurityUtility]
})
export class CSHResultsPage {
  cshSearchResult: CSHSearchResultModel[];
  createdFromDate:any;
  createdToDate:any;
  resultCount:any;
  selectedTitle: string;
  ascending: boolean = true;
  lengthofmainarray: number = 0;
  left: any;
  right: any;
  public alertHeadding: string;
  public no_data_filter: string;
  public ok_text: string;
  canCancelArg:boolean = false;
  editHiddenStatus:boolean = false;
  cancelHiddenStatus:boolean = false;
  public unregisterBackButtonAction: any;
  cshItemStatus: any;
  canCreateBool: boolean = false;
  canCancelBool: boolean = false;
  cshCancelContainerDetailsModel: CSHCancelContainerDetails;
  cshIdSearchResult:CSHSearchByIDResultModel;
  length1 :number
  length2 :number
  length3 :number
  @ViewChild(Content) content: Content;

  constructor(public keyboard: Keyboard,
              public platform: Platform,
              public navCtrl: NavController,
              public navParams: NavParams,
              public datepipe: DatePipe,
              public utils: Utils,
              public cshRequestModal: CSHSearchReqModel,
              public cshServiceProvider: CshServiceProvider,
              public cshSearchResultListModal: CSHSearchResultListModel,
              public securityUtility: SecurityUtility,
              public cshSearch_Modal: CSHSearchReqModel,
              public cshSortModal: CSHSortModal,
              public alertCtrl: AlertController) {

    this.selectedTitle = "cshRequestNo";
    this.canCreateBool = this.canCreate();
    this.canCancelBool = this.canCancel();
    this.length1 = 0
    this.length2 = 0
    this.length3 = 0
  }

  ionViewWillEnter() {
    this.loadDefaultValues();
    this.cshSearchResult = new Array<CSHSearchResultModel>();
    this.searchCshResult();
  }

  keyboardClose() {
    this.keyboard.close();
  }


  getStatusIcon(s) {

    switch (s.requestStatus) {
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
      default :
        return "assets/img/pending.svg";
    }
  }

  getStyle(s) {
    return '#808080';
  }

  getStatus(status : string) {
    if(status == "YettoArrive") {
      status = "Yet to Arrive";
    }
    return status;
  }
  navigateToSort() {
    this.cshSortModal.fromSort = false;
    this.navCtrl.push(CshsortPage,{sortModal: this.cshSortModal});
  }

  navigateToFilter() {
    this.cshSortModal.fromSort = false;
   // this.cshRequestModal.fromFilter = false;
    this.navCtrl.push(CshfilterPage, {Request: this.cshRequestModal});
  }

  private loadDefaultValues() {
    if(this.cshRequestModal.fromFilter == false) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
      this.createdToDate = new Date().toISOString();
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
      this.cshRequestModal.cshNoSearch = "";
      this.cshRequestModal.rotationNumberSearch = "";
      this.cshRequestModal.vesselNameSearch = "";
      this.cshRequestModal.containerNoSearch = "";
      this.cshRequestModal.createdFrmDate = this.createdFromDate;
      this.cshRequestModal.createdToDate = this.createdToDate;
      this.cshRequestModal.berthBookingStatus = "ALL";
    } else {
      this.cshSearch_Modal = Object.assign({}, this.cshRequestModal);
    }

  }

  private searchCshResult() {
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.no_data_filter = this.utils.getLocaleString("vesselsearchalert");
    this.ok_text = this.utils.getLocaleString("ok_text");
    if (null != this.cshSearch_Modal.cshNoSearch && this.cshSearch_Modal.cshNoSearch.length > 0) {
      this.cshSearch_Modal.rotationNumberSearch = "";
      this.cshSearch_Modal.vesselNameSearch = "";
      this.cshSearch_Modal.containerNoSearch = "";
      this.cshSearch_Modal.createdFrmDate = "";
      this.cshSearch_Modal.createdToDate = "";
      this.cshSearch_Modal.berthBookingStatus = "";
      this.cshSearch_Modal.fromFilter = true;
    }
    this.cshServiceProvider.cshSearchAll(this.cshSearch_Modal).subscribe(response => {
      this.cshSearchResultListModal = <CSHSearchResultListModel>response;
      this.cshSearchResult = this.cshSearchResultListModal.list;
      this.resultCount = this.cshSearchResult.length;

      if (this.cshSortModal.sortOption && this.cshSearchResult) {
        this.selectedTitle = this.cshSortModal.sortOption ? this.cshSortModal.sortOption : '';
        this.ascending = this.cshSortModal.sortOrder != null ? this.cshSortModal.sortOrder : true;

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
      if (this.selectedTitle === 'cshRequestNo') {
        this.cshSearchResult = sortNumberArray(this.cshSearchResult, "cshNo",this.ascending);
      }
      if (this.selectedTitle === 'rotationno') {
        this.cshSearchResult = sortNumberArray(this.cshSearchResult, "rotationNumber",this.ascending);
      }
      if (this.selectedTitle === 'vesselName') {
        this.cshSearchResult = sortArray(this.cshSearchResult, "vesselName",this.ascending);
      }

      else if (this.selectedTitle === 'eta') {
        this.cshSearchResult = this.sortDateArray(this.cshSearchResult, "etaSearch");
      }

      else if (this.selectedTitle == 'cshRequestCutOffTime') {
        this.cshSearchResult = this.sortDateArray(this.cshSearchResult, "requestCutOffTime");
      }

      else if (this.selectedTitle === 'createdDate') {
        this.cshSearchResult = this.sortDateArray(this.cshSearchResult, "createdDate");
      }

      else if (this.selectedTitle === 'createdBy') {
        this.cshSearchResult = this.sortDateArray(this.cshSearchResult, "createdBy");
      }
      else if (this.selectedTitle === 'cshRequestStatus') {
        this.cshSearchResult = sortArray(this.cshSearchResult, "requestStatus",this.ascending);
      }
      this.lengthofmainarray = this.cshSearchResult.length;
    }
  }

  sortDateArray(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      this.left = "";
      this.right = "";
      if (null != a[args] && "" != a[args]) {
        this.left = new Date(this.transform(a[args]));
      }
      if (null != b[args] && "" != b[args]) {
        this.right = new Date(this.transform(b[args]));
      }
      return this.ascending ? this.left - this.right : this.right - this.left;
    });
    return array;
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
  openCSHCreate() {
    this.navCtrl.push(CSHCreateEditPage,{filter: this.cshSearch_Modal,mode:'create'});
  }

  //For going to the csh details page
  showCshDetails(index:any)
  {
    let searchByIDReqModel = new CSHSearchByIDReqModel();
    let cshIdSearchResult = new CSHSearchByIDResultModel();
    searchByIDReqModel.cshNo=this.cshSearchResult[index].cshNo;
    // this.cshServiceProvider.getSearchByIdDetails(searchByIDReqModel).subscribe(response=> {
    //   cshIdSearchResult = <CSHSearchByIDResultModel>response;
    //   if(cshIdSearchResult){
    //     this.length1 = cshIdSearchResult.cshHazardousContainer.length;
    //     this.length2 = cshIdSearchResult.cshOOGContainer.length;
    //     this.length3 = cshIdSearchResult.cshSpecialHandling.length;
    //   }
      this.navCtrl.push(CshSummaryPage, {
        filter: this.cshSearch_Modal,
        cshSearchResult: this.cshSearchResult[index],
        cshItemStatus:this.cshSearchResult[index].requestStatus,
        cshCanCancel:this.cshSearchResult[index].canCancel,
        cshCanApprove:this.cshSearchResult[index].canApprove,
        cshCanAmend:this.cshSearchResult[index].canAmend,
        cshNo :  searchByIDReqModel.cshNo
      });
    // } ,error =>{
    //   console.log(error);
    // });


  }
//Modified to check if the user have permission to create truck
  canCreate() {
    if (this.securityUtility.canAmend(this.securityUtility.CSH_REGISTRATION) == true) {
      return false;
    } else {
      return true;
    }
  }

  canCancel() {
    if (this.securityUtility.canCancel(this.securityUtility.CSH_REGISTRATION) == true) {
      return false;
    } else {
      return true;
    }
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
      fromPage: "CshSearchResult"
    });
  }
  goview(s) {
    console.log("clicked on View");
    this.navCtrl.push(CSHDetailsPage, {cshNo: s.cshNo,
      regStatus: s.requestStatus});
  }

  goedit(s) {
    this.navCtrl.push(CSHCreateEditPage, {cshNo: s.cshNo,
      mode: 'edit',regStatus:s.requestStatus});
  }

  goCancelCsh(selectContainer) {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      subTitle: 'This action will cancel the CSH registration. Do you want to proceed?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.cshCancelContainerDetailsModel = new CSHCancelContainerDetails();
            this.cshCancelContainerDetailsModel.cshNo=  selectContainer.cshNo;
            this.cshCancelContainerDetailsModel.requestStatus= selectContainer.requestStatus;
            this.cshServiceProvider.cancelContainerDetails(this.cshCancelContainerDetailsModel).subscribe(response=> {
              this.cshIdSearchResult = <CSHSearchByIDResultModel>response;
              if(this.cshIdSearchResult.requestStatus=='Cancelled') {
                this.cshSearchResult = new Array<CSHSearchResultModel>();
                this.searchCshResult();
              }
              alert.dismiss();
            } ,error =>{
              console.log(error);
              alert.dismiss();
            });
            alert.dismiss();
          },
        },
        {
          text: 'Cancel',
          handler: () => {
            alert.dismiss();
          },
        }],
        enableBackdropDismiss: false
    });
    alert.present();
  }

  cancelHidden(selectedContainer) {
    if(!this.isAdminUser(selectedContainer)) {
      if (this.canCancelBool == false) {
        if (selectedContainer.requestStatus == "Submitted") {
          return false;
        } else if (selectedContainer.requestStatus == "Pending" || selectedContainer.requestStatus == "Cancelled") {
          return true;
        } else if (selectedContainer.requestStatus == "Approved") {
          if (selectedContainer.amendRequestStatus == "Approved" || selectedContainer.amendRequestStatus == "Rejected" ||
            selectedContainer.amendRequestStatus == "Cancelled") {
            return false;
          } else {
            return true;
          }
        } else if (selectedContainer.requestStatus == "Rejected") {
          if (selectedContainer.amendRequestStatus == "Rejected" || selectedContainer.amendRequestStatus == "Cancelled"){
            return false;
          } else {
            return true;
          }
        }
      } else {
        return true;
      }
    } else {
        return true;
    }
  }
  editHidden(selectedContainer) {
    if(!this.isAdminUser(selectedContainer)) {
      if (selectedContainer.canAmend == false) {
        return true;
      } else if (this.canCreateBool == false) {
        if (selectedContainer.requestStatus == "Submitted") {
          return false;
        } else if (selectedContainer.requestStatus == "Pending" || selectedContainer.requestStatus == "Cancelled") {
          return true;
        } else if (selectedContainer.requestStatus == "Approved") {
          if (selectedContainer.amendRequestStatus == "Approved" || selectedContainer.amendRequestStatus == "Rejected" ||
            selectedContainer.amendRequestStatus == "Cancelled") {
            return false;
          } else {
            return true;
          }
        } else if (selectedContainer.requestStatus == "Rejected") {
          if (selectedContainer.amendRequestStatus == "Rejected" || selectedContainer.amendRequestStatus == "Cancelled") {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return true;
      }
    } else { //Else for if not admin user
      return true;
    }
  }
  hideCreate(): boolean {
    if (this.securityUtility.canAmend(this.securityUtility.CSH_REGISTRATION) == true) {
      return true;
    } else {
      return false;
    }
  }
}
