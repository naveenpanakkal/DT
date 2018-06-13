import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, FabContainer, IonicPage, NavController, NavParams,ModalController} from 'ionic-angular';
import {Keyboard} from "@ionic-native/keyboard";
import {sortArray, sortNumberArray, Utils, sortDateWithTimeArray} from "../../../shared/utils";
import {DatePipe} from "@angular/common";
import {SecurityUtility} from "../../../shared/securityutility";
import {SsrFilter} from "../ssr-filter/ssrfilter";
import {SsrsortPage} from "../ssr-sort/ssrsort";
import {SsrsummaryPage} from "../ssr-summary/ssrsummary";
import {SsrHistoryPage} from "../ssr-history/ssrhistory";
import {SsrServiceProvider} from "../../../providers/webservices/ssrservices";
import {SSRSearchRequest} from "../../../shared/model/ssr/ssrsearchrequest.model";
import {SSRSearchResult} from "../../../shared/model/ssr/ssrsearchresult.model";
import {SSRSearchList} from "../../../shared/model/ssr/ssrsearchresult.model";
import {SsrEditPage} from "../ssr-edit/ssredit";
import {SsrViewPage} from "../ssr-view/ssrview";
import {SortModel} from "../../../shared/model/sort.model";
import {SsrCreatePage} from "../ssr-create/ssrcreate";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import { ServiceProviderMasterReqModel } from '../../../shared/model/ssr/serviceprovidermasterreq.model';
import {ServiceProviderMasterResponseModel} from '../../../shared/model/ssr/serviceprovidermasterresponse.model';
import {ExecuteactionPage} from "../../executeaction/executeaction";
import {SsrCancelContainerComponent} from "../../../components/ssrmodelpage/ssr-cancel-container/ssr-cancel-container";
/**
 * Generated class for the SSRSearchresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ssrsearchresult',
  templateUrl: 'ssrsearchresult.html',
  providers: [Utils,SecurityUtility,SsrServiceProvider,SSRSearchRequest,SSRSearchList,SortModel]
})
export class SsrSearchResultPage {
  @ViewChild(Content) content: Content;
  ssrSearchResult:SSRSearchResult[];
  createdFromDate:any;
  createdToDate:any;
  resultCount:any;
  selectedTitle: string;
  ascending: boolean = true;
  lengthofmainarray: number = 0;
  left: any;
  right: any;
  alertHeadding: string;
  no_data_filter: string;
  ok_text: string;
  ssrFromDate: any;
  ssrToDate: any;
  canAmendBool: boolean = false;
  canCancelBool: boolean = false;
  public definedSetListModel: DefinedsetresListModel[];
  public serviceProviderMasterResponseModel: ServiceProviderMasterResponseModel[];
  public serviceProvideMasterList: DefinedSetResModel[];
  public serviceStatusList: DefinedSetResModel[];
  public cshSearchStatusList: DefinedSetResModel[];
  public ssrServiceStatusList: DefinedSetResModel[];
  public serviceCategoryList: DefinedSetResModel[];
  public containerSearchByList: DefinedSetResModel[];
  constructor(public keyboard: Keyboard,
              public navCtrl: NavController, public navParams: NavParams,
              public datepipe: DatePipe, public securityUtility: SecurityUtility,
              public utils: Utils,public ssrServiceProvider:SsrServiceProvider,
              public alertCtrl: AlertController,public ssrSearchRequest:SSRSearchRequest,
              public ssrSearchList:SSRSearchList,public ssrSortModel: SortModel,
              private commonServices: CommonservicesProvider,public modalCtrl: ModalController) {

               this.selectedTitle = 'ssrRequestNoSrch';
               this.canAmendBool = this.canAmend();
               this.canCancelBool = this.canCancel();
          }

    ionViewWillEnter() {
    this.loadDefaultValues();
    this.ssrSearchResult = new Array<SSRSearchResult>();
    this.searchSSRResult();
    if(!this.ssrSearchRequest.fromFilter || this.ssrSearchRequest.fromFilter == undefined) {
      this.getDefinedSet();
      this.getSsrMasterResponse();
    }
  }
 setDates(){
    this.ssrFromDate=new Date();
    this.ssrFromDate= new Date( this.ssrFromDate.getTime() -
                  this.ssrFromDate.getTimezoneOffset()*60000);
    this.ssrFromDate.setDate(this.ssrFromDate.getDate() - 7);
    this.ssrFromDate= this.ssrFromDate.toISOString();
    this.ssrSearchRequest.createdFrmDate= this.datepipe.transform(this.ssrFromDate.split("T")[0], 'dd/MM/yyyy');
    this.ssrFromDate=this.ssrFromDate.split("T")[1];
    this.ssrFromDate=this.ssrFromDate.substr(0,this.ssrFromDate.lastIndexOf(':'));
    this.ssrSearchRequest.createdFrmDate=this.ssrSearchRequest.createdFrmDate+" "+this.ssrFromDate;
    this.ssrToDate = new Date();
    this.ssrToDate= new Date( this.ssrToDate.getTime() -
                  this.ssrToDate.getTimezoneOffset()*60000);
    this.ssrToDate= this.ssrToDate.toISOString();
    this.ssrSearchRequest.createdToDate= this.datepipe.transform(this.ssrToDate.split("T")[0], 'dd/MM/yyyy');
    this.ssrToDate=this.ssrToDate.split("T")[1];
    this.ssrToDate=this.ssrToDate.substr(0,this.ssrToDate.lastIndexOf(':'));
    this.ssrSearchRequest.createdToDate= this.ssrSearchRequest.createdToDate+" "+this.ssrToDate;
  }
  private loadDefaultValues() {
    if(this.ssrSearchRequest.fromFilter == false || this.ssrSearchRequest.fromFilter == undefined) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
      this.createdToDate = new Date().toISOString();
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy H:mm');
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy H:mm');
      this.ssrSearchRequest.ssrRequestNoSrch = "";
      this.ssrSearchRequest.cusRefNoSrch = "";
      this.ssrSearchRequest.spTypeSrch = "";
      this.ssrSearchRequest.locationSrch = "";
      this.ssrSearchRequest.spNameSrch = "";
      this.ssrSearchRequest.terminalSrch = "";
      this.ssrSearchRequest.serviceCategorySrch = "";
      this.ssrSearchRequest.specialServiceSrch = "";
      this.ssrSearchRequest.rotationNumber = "";
      this.ssrSearchRequest.doNoSrch = "";
      this.ssrSearchRequest.crNoSrch = "";
      this.ssrSearchRequest.requestStatusSrch = "";
      this.ssrSearchRequest.serviceStatusSrch = "";

      this.ssrSearchRequest.createdFrmDate = this.createdFromDate;
      this.ssrSearchRequest.createdToDate = this.createdToDate;
    } else {
      this.ssrSearchRequest = Object.assign({}, this.ssrSearchRequest);
    }
  }
  private searchSSRResult() {
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.no_data_filter = this.utils.getLocaleString("vesselsearchalert");
    this.ok_text = this.utils.getLocaleString("ok_text");
    if (null != this.ssrSearchRequest.ssrRequestNoSrch && this.ssrSearchRequest.ssrRequestNoSrch.length > 0) {
      this.ssrSearchRequest.cusRefNoSrch = "";
      this.ssrSearchRequest.spTypeSrch = "";
      this.ssrSearchRequest.locationSrch = "";
      this.ssrSearchRequest.spNameSrch = "";
      this.ssrSearchRequest.terminalSrch = "";
      this.ssrSearchRequest.serviceCategorySrch = "";
      this.ssrSearchRequest.specialServiceSrch = "";
      this.ssrSearchRequest.rotationNumber = "";
      this.ssrSearchRequest.searchBySrch = "";
      this.ssrSearchRequest.containerNoSrch = "";
      this.ssrSearchRequest.caNoSrch = "";
      this.ssrSearchRequest.doNoSrch = "";
      this.ssrSearchRequest.crNoSrch = "";
      this.ssrSearchRequest.requestStatusSrch = "";
      this.ssrSearchRequest.serviceStatusSrch = "";
      this.ssrSearchRequest.createdFrmDate = "";
      this.ssrSearchRequest.createdToDate = "";
      this.ssrSearchRequest.fromFilter = true;
      //this.setDates();
    }
    this.ssrServiceProvider.searchSsr(this.ssrSearchRequest).subscribe(response => {
    this.ssrSearchList = <SSRSearchList>response;
    this.ssrSearchResult = this.ssrSearchList.list;
    if (this.ssrSortModel && this.ssrSortModel.sortOption) {
        this.selectedTitle = this.ssrSortModel.sortOption ? this.ssrSortModel.sortOption : '';
        this.ascending = this.ssrSortModel.sortOrder != null ? this.ssrSortModel.sortOrder : true;

      } else {
        this.ascending = false;
      }
      this.asc();
      this.content.scrollToTop(0);
      if (null != this.ssrSearchResult.length && this.ssrSearchResult.length == 0) {
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
      if (this.selectedTitle === 'ssrRequestNoSrch') {
        this.ssrSearchResult = sortNumberArray(this.ssrSearchResult, "ssrRequestNo",this.ascending);
      }
      if (this.selectedTitle === 'cusRefNoSrch') {
        this.ssrSearchResult = sortArray(this.ssrSearchResult, "cusReferenceNo",this.ascending);
      }
      if (this.selectedTitle === 'specialServiceSrch') {
        this.ssrSearchResult = sortArray(this.ssrSearchResult, "specialServiceTypeName",this.ascending);
      }

      else if (this.selectedTitle === 'spNameSrch') {
        this.ssrSearchResult = sortArray(this.ssrSearchResult, "spName",this.ascending);
      }

      else if (this.selectedTitle == 'spTypeSrch') {
        this.ssrSearchResult = sortArray(this.ssrSearchResult, "spType",this.ascending);
      }

      else if (this.selectedTitle === 'createdFrmDate') {
        this.ssrSearchResult = this.sortDateArray(this.ssrSearchResult, "createdDate");
      }
      else if (this.selectedTitle === 'requestStatusSrch') {
        this.ssrSearchResult = sortArray(this.ssrSearchResult, "requestStatus",this.ascending);
      }
       else if (this.selectedTitle === 'serviceStatusSrch') {
        this.ssrSearchResult = sortArray(this.ssrSearchResult, "serviceStatus",this.ascending);
      }
      this.lengthofmainarray = this.ssrSearchResult.length;
    }
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
    getStyle() {
    return '#808080';
  }
  showSummarydetails(index:any){
    this.navCtrl.push(SsrsummaryPage, {
        ssrSearchResult: this.ssrSearchResult[index],
      });
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
      default :
        return "assets/img/pending.svg";
    }
  }
  getSsrMasterResponse() {
    let serviceProviderMasterReqModel =  new ServiceProviderMasterReqModel();
    serviceProviderMasterReqModel .userName = localStorage.getItem('LOGGEDINUSER');
    this.ssrServiceProvider.getSSRMasterResponse(serviceProviderMasterReqModel)
      .subscribe(responseArray =>{
        this.serviceProviderMasterResponseModel = <ServiceProviderMasterResponseModel[]>responseArray;
      })
  }
  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['SERVICE_STATUS',  'CSH_SEARCH_STATUS',
      'SERVICE_PROVIDER_MASTER', 'SSR_SERVICE_STATUS' , 'SERVICE_CATEGORY', 'CONTAINER_SEARCH_BY'];
    definedSetReqModel.lang = 'en';
    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {

            if (this.definedSetListModel[i].definedSetName == 'SERVICE_STATUS') {
              this.serviceStatusList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'CSH_SEARCH_STATUS') {
              this.cshSearchStatusList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'SERVICE_PROVIDER_MASTER' && i==0) {
              this.serviceProvideMasterList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'SSR_SERVICE_STATUS') {
              this.ssrServiceStatusList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'SERVICE_CATEGORY') {
              this.serviceCategoryList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'CONTAINER_SEARCH_BY') {
              this.containerSearchByList = this.definedSetListModel[i].definedSetValues;
            }

          }
        },
        error => {
          //Show error message
        });
  }
  canAmend() {
    if (this.securityUtility.canAmend(this.securityUtility.SSR_REGISTRATION)) {
      return true;
    } else {
      return false;
    }
  }

  canCancel() {
    if (this.securityUtility.canCancel(this.securityUtility.SSR_REGISTRATION)) {
      return true;
    } else {
      return false;
    }
  }

  isAdminUser(selectedContainer) {
    if (selectedContainer.canApprove == true) {
      return true;
    } else {
      return false;
    }
  }
   gotoApprove(ssr) {
    this.navCtrl.push(ExecuteactionPage, {
      workFlowId: ssr.wrkflwId,
      requestNo: ssr.ssrRequestNo,
      fromPage: "SSRsearchResults"
    });
  }
  gotoView(ssr) {
   this.navCtrl.push(SsrViewPage,{ssrrequestno:ssr.ssrRequestNo});
  }

  gotoEdit(ssr) {
    this.navCtrl.push(SsrEditPage,{mode: 'edit',ssrrequestno:ssr.ssrRequestNo});
  }
  gotoCreate() {
    this.navCtrl.push(SsrCreatePage,{mode: 'create'});
  }
  gotoCancel(ssr) {
    let profileModal = this.modalCtrl.create(SsrCancelContainerComponent,  {
      requeststatus:ssr.requestStatus,
      ssrreqno:ssr.ssrRequestNo,
      fromHistory:false,
    });
    profileModal.present();
  }
  
  cancelHidden(selectedContainer) {
    if(!selectedContainer.approverButton && this.canCancelBool) {
      if(selectedContainer.serviceStatus=="Completed" ||selectedContainer.serviceStatus=="Declined"||
          selectedContainer.serviceStatus=="Work In Progress"){
          return true;
        }else if (selectedContainer.requestStatus == "Submitted") {
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
  }
  editHidden(selectedContainer) {
    if(this.canAmendBool){
     if (selectedContainer.requestStatus == "Submitted") {
          return false;
        } else if (selectedContainer.requestStatus == "Pending" || selectedContainer.requestStatus == "Cancelled") {
          return true;
        } else if (selectedContainer.requestStatus == "Approved") {
          if ((selectedContainer.amendRequestStatus == "Approved" || selectedContainer.amendRequestStatus == "Rejected" ||
            selectedContainer.amendRequestStatus == "Cancelled")&& 
            (selectedContainer.serviceStatus=="Declined"||selectedContainer.serviceStatus==""
            ||selectedContainer.serviceStatus==null)) {
            return false;
           }
           //else if(selectedContainer.appoverEditFlag=='Y'&& (selectedContainer.serviceStatus=="Work In Progress"
          // ||selectedContainer.serviceStatus=="Declined")){
          //  return false;
          // } 
            else {
            return true;
          }
        } else if (selectedContainer.requestStatus == "Rejected") {
          if (selectedContainer.amendRequestStatus == "Rejected" || selectedContainer.amendRequestStatus == "Cancelled") {
            return false;
          } else {
            return true;
          }
        }
    }else if(selectedContainer.appoverEditFlag=='Y' && selectedContainer.requestStatus == "Approved"
      && (selectedContainer.serviceStatus!="Completed")){
        return false;
      } else {
        return true;
      }
  }
   navigateToSort() {
     this.ssrSortModel.fromSort = false;
     this.navCtrl.push(SsrsortPage,{sortModal: this.ssrSortModel});
  }

  navigateToFilter() {
    this.navCtrl.push(SsrFilter, {
      Request: this.ssrSearchRequest,
      spTypeList:this.serviceProvideMasterList,
      serviceCategoryList:this.serviceCategoryList,
      searchByList:this.containerSearchByList,
      serviceStatusList:this.ssrServiceStatusList,
      requestStatusList:this.cshSearchStatusList,
      serviceProviderMasterResponse:this.serviceProviderMasterResponseModel
    });
  }
}
