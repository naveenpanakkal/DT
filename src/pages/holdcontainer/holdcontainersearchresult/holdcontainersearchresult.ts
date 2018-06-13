import {Component, ViewChild} from '@angular/core';
import {Keyboard} from "@ionic-native/keyboard";
import {AlertController, Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {sortArray, sortDateWithTimeArray, sortNumberArray, Utils} from "../../../shared/utils";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {DatePipe} from "@angular/common";
import {SecurityUtility} from "../../../shared/securityutility";
import {ExecuteactionPage} from "../../executeaction/executeaction";
import {HoldContainerSortPage} from "../holdcontainersort/holdcontainersort";
import {HoldContainerFilter} from "../holdcontainerfilter/holdcontainerfilter";
import {HoldContainerSummaryPage} from "../holdcontainersummery/holdcontainersummary";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {HoldContainerSearchSORequest} from "../../../shared/model/hnrc/holdcontainersearchsorequest.model";
import {
  HoldContainerSrchResultListSO,
  HoldContainerSrchResultSO
} from "../../../shared/model/hnrc/holdcontainersrchresultlistso.model";
import {SortModel} from "../../../shared/model/sort.model";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {HoldContainerSO} from "../../../shared/model/hnrc/holdcontainerso.model";
import {HoldContainerEditandView} from "../holdcontainerEditandView/holdcontainerEditandView";
import {HoldContainerCreatePage} from "../holdcontainercreate/holdcontainercreate";
import {UserDataModel} from "../../../shared/model/userdata.model";

/**
 * Generated class for the RbsearchresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-holdcontainersearchresult',
  templateUrl: 'holdcontainersearchresult.html',
  providers: [Utils, SortModel, HoldContainerSO, SecurityUtility]
})

export class HoldContainerSearchresultPage {

  @ViewChild(Content) content: Content;

  public searchResults: HoldContainerSrchResultSO[] = [];
  public holdContainerRequest : HoldContainerSearchSORequest = new HoldContainerSearchSORequest();
  createdFromDate: any;
  createdToDate: any;

  public alertHeadding: string;
  public no_data_filter: string;
  public ok_text: string;
  resultCount: any;
  ascending: boolean = false;
  selectedTitle: string;
  canCancel: boolean;
  canAmend: boolean;
  ResultScreen:any;
  canCreate: boolean;
  lengthofmainarray: number = 0;
  confirmBox: string = 'ATTENTION';
  confirmBoxTitle: string = 'CONFIRM BOX';
  alertButtonOk: string;
  cancelMessage: string;
  cancelConfirmedMessage: string;
  cancelApproveMessage:string;
  cancelActiveMessage: string;
  ExpiredMessage: string;
  cancelledMessage: string;
  alerttitle: string;
  alertButtonCancel: string;

  public  holdActionDataLst: DefinedsetresListModel[] = [];
          designationTypeDataLst : DefinedsetresListModel[] = [];
          containerCategoryDataLst : DefinedsetresListModel[] = [];
          statusDataLst : DefinedsetresListModel[] = [];
          locationDataLst : any;
          spNameDataLst : any;

  constructor(public keyboard: Keyboard,
              public navCtrl: NavController,
              public navParams: NavParams,
              public datepipe: DatePipe,
              public utils: Utils,
              public hldSortModel: SortModel,
              public alertCtrl: AlertController,
              public responseModel: HoldContainerSO,
              public hrcservicesProvider : HrcservicesProvider,
              public securityUtility: SecurityUtility,
              private commonServices: CommonservicesProvider) {
    this.cancelMessage = this.utils.getLocaleString("hold_cancel_message");
    this.cancelApproveMessage = this.utils.getLocaleString("hold_cancel_message");
    this.cancelActiveMessage = this.utils.getLocaleString("hold_cancel_active_message");
    this.ExpiredMessage = this.utils.getLocaleString("hold_cancel_expired_message");
    this.cancelledMessage = this.utils.getLocaleString("hold_cancel_cancelled_message");
    this.alertButtonOk = this.utils.getLocaleString("gen_ok_text");
    this.alertButtonCancel = this.utils.getLocaleString("gen_cancel");
    this.alerttitle = this.utils.getLocaleString("gen_alert");
    this.selectedTitle = "chholdrequestno";
    this.fetchDefineSet();
    this.getLocation();
    this.getSpName();
  }

  ionViewDidLoad() {
  //Invoke when page is getting loaded
  }

  ionViewWillEnter() {
    this.loadDefaultValues();
    this.disableFields();
    this.searchResults = new Array<HoldContainerSrchResultSO>();
    this.searchHoldResults();
  }

  getStatusIcon(s) {

    switch (s.holdStatus) {
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
      case 'Expired':
        return "assets/img/expired.svg";
      case 'Active':
        return "assets/img/active.svg";
    }
  }

  private loadDefaultValues() {
    if(this.holdContainerRequest == undefined){
      this.holdContainerRequest.searchDesignation = "All";
    }
  }

  disableFields() {
    if (this.securityUtility.canCancel(this.securityUtility.HOLD_RELEASE_CONTAINER) == true) {
      this.canCancel = true;
    } else {
      this.canCancel = false;
    }

    if (this.securityUtility.canAmend(this.securityUtility.HOLD_RELEASE_CONTAINER) == true) {
      this.canAmend = true;
    } else {
      this.canAmend = false;
    }
    if (this.securityUtility.canCreate(this.securityUtility.HOLD_RELEASE_CONTAINER) == true) {
      this.canCreate = true;
    } else {
      this.canCreate = false;
    }
  }

  private searchHoldResults() {
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.no_data_filter = this.utils.getLocaleString("vesselsearchalert");
    this.ok_text = this.utils.getLocaleString("ok_text");

    this.hrcservicesProvider.getSearch(this.holdContainerRequest, true).subscribe(response => {
        let holdContainerSrchResultList: HoldContainerSrchResultListSO = <HoldContainerSrchResultListSO>response;
        this.searchResults = holdContainerSrchResultList.list;
        this.resultCount = this.searchResults.length;

        if (this.hldSortModel.sortOption && this.searchResults) {
          this.selectedTitle = this.hldSortModel.sortOption ? this.hldSortModel.sortOption : '';
          this.ascending = this.hldSortModel.sortOrder != null ? this.hldSortModel.sortOrder : true;
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
      if (this.selectedTitle === 'chholdrequestno') {
        this.searchResults = sortNumberArray(this.searchResults, "holdRequestNo", this.ascending);

      } else if (this.selectedTitle === 'chreferenceno') {
        this.searchResults = sortArray(this.searchResults, "referenceNo", this.ascending);

      } else if (this.selectedTitle === 'chdesignation') {
        this.searchResults = sortArray(this.searchResults, "designation", this.ascending);

      } else if (this.selectedTitle === 'chcontainercategory') {
        this.searchResults = sortArray(this.searchResults, "containerCategory", this.ascending);

      } else if (this.selectedTitle === 'chholdaction') {
        this.searchResults = sortArray(this.searchResults, "holdAction", this.ascending);

      } else if (this.selectedTitle == 'chholdenddateandtime') {
        this.searchResults = sortDateWithTimeArray(this.searchResults, "holdendDateTime", this.ascending);

      } else if (this.selectedTitle == 'chstatus') {
        this.searchResults = sortArray(this.searchResults, "holdStatus", this.ascending);
      }
      this.lengthofmainarray = this.searchResults.length;
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }


  hideCancel(status: string) {
    if (this.canCancel == false) {
      return true;
    }
    if (status == "Cancelled" || status == "Expired") {
      return true;
    } else {
      return false;
    }
  }

  hideEdit(status: string) {
    if (this.canAmend == false) {
      return true;
    }
    if ((status == "Cancelled" || status == "Expired")) {
      return true;
    } else {
      return false;
    }
  }

  getStyle() {
    return '#808080';
  }

  navigateToSort() {
    this.hldSortModel.fromSort = true;
    this.navCtrl.push(HoldContainerSortPage, {sortModal: this.hldSortModel});
  }

  navigateToFilter() {
    this.hldSortModel.fromSort = false;
    this.navCtrl.push(HoldContainerFilter, {
      Request: this.holdContainerRequest,
      HoldAction:this.holdActionDataLst,
      Designation:this.designationTypeDataLst,
      ContainerCategory:this.containerCategoryDataLst,
      Status:this.statusDataLst,
      Location:this.locationDataLst,
      SpName:this.spNameDataLst
    });
  }


  openContainerHoldCreate() {
    this.navCtrl.push(HoldContainerCreatePage);
  }

  showdetails(selResource) {
    this.navCtrl.push(HoldContainerSummaryPage, {
      selResource: selResource,
      containerCategoryList: this.containerCategoryDataLst
    });
  }

  isAdminUser(selectedContainer) {
    if (selectedContainer.canApprove == true) {
      return true;
    } else {
      return false;
    }
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    alert.present();
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
    this.navCtrl.push(HoldContainerEditandView, {
      holdRequestNo: s.holdRequestNo,
      isView:true,
      fromHistory: false
    });
  }

  goedit(s) {
    this.navCtrl.push(HoldContainerEditandView, {
      holdRequestNo: s.holdRequestNo,
      isView:false,
      fromHistory: false
    });
  }

  goCancelHC(selectContainer) {
    if (selectContainer.holdStatus == "Approved") {
      this.cancelMessage = this.cancelApproveMessage;
      this.cancelConfirmedMessage = this.cancelledMessage;
    }
    else if (selectContainer.holdStatus == "Active") {
      this.cancelMessage = this.cancelActiveMessage;
      this.cancelConfirmedMessage = this.ExpiredMessage;
    }
    let alert = this.alertCtrl.create({
      title: this.confirmBoxTitle,
      subTitle: this.cancelMessage,
      buttons: [
        {
          text: this.alertButtonOk,
          handler: () => {

            this.hrcservicesProvider.deleteByID(selectContainer)
              .subscribe(response => {
                  this.responseModel = <HoldContainerSO>response;
                  if (this.responseModel.holdStatus == "Cancelled"||this.responseModel.holdStatus == "Expired") {
                    this.presentAlert('Confirm', this.cancelConfirmedMessage);
                    this.searchResults = new Array<HoldContainerSrchResultSO>();
                    this.searchHoldResults();
                  }
                },
                error => {
                  this.presentAlert(this.alerttitle, error[0].message);
                });
          }
        }, {
          text: this.alertButtonCancel,
          handler: () => {
          },
        }]

    });
    alert.present();

  }


  hideCreate(){
    if (this.securityUtility.canAmend(this.securityUtility.HOLD_RELEASE_CONTAINER) == true) {
      return true;
    } else {
      return false;
    }
  }

  // Fetching data for population
  fetchDefineSet(){
    let reqObj=new DefinedSetReqModel();
    reqObj.definedSetNames=["HRC_HOLD_ACTION","HRC_CONTAINER_CATEGORY","HRC_DESIGNATION_TYPE","HRC_STATUS"];
    reqObj.lang="en";

    this.commonServices.getDefinedSet(reqObj).subscribe(
      (response)=>{
        let responseObj=<DefinedsetresListModel[]>response;
        this.holdActionDataLst = this.getFormattedResponseValue(responseObj,"definedSetName","definedSetValues","HRC_HOLD_ACTION");
        this.containerCategoryDataLst = this.getFormattedResponseValue(responseObj,"definedSetName","definedSetValues","HRC_CONTAINER_CATEGORY");
        this.designationTypeDataLst = this.getFormattedResponseValue(responseObj,"definedSetName","definedSetValues","HRC_DESIGNATION_TYPE");
        this.statusDataLst = this.getFormattedResponseValue(responseObj,"definedSetName","definedSetValues","HRC_STATUS");
      }
    )
  }

  //Response formatter Utility
  getFormattedResponseValue(responseObj,inPropName:string,outPropName:string,formatKey:string){
    for(let respInst of responseObj){
      if(respInst[inPropName] === formatKey){
        return respInst[outPropName];
      }
    }
  }

  getLocation(){
    let loc: UserDataModel= new UserDataModel();
    loc.userName = localStorage.getItem('LOGGEDINUSER');
    this.hrcservicesProvider.getLocationMaster(loc,false).subscribe((response)=>{
      this.locationDataLst = response.locationMasterList;
    })
  }

  getSpName()
  {
    let reqObj=new HoldContainerSO();
    this.hrcservicesProvider.getSpNameMaster(reqObj,false).subscribe((response)=>{
      this.spNameDataLst = response.spNameMasterList;
    })
  }

}
