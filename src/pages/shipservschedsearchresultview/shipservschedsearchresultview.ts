import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {sortArray, sortDateArray, sortNumberArray, Utils} from "../../shared/utils";
import {ShipServSchedSearchFilterPage} from "../shipservschedsearchfilter/shipservschedsearchfilter";
import {ShipServSchedSearchModel} from "../../shared/model/shipservsched/ssssearch.model";
import {ShipServSchedSummaryViewPage} from "../shipservschedsummaryview/shipservschedsummaryview";
import {ShipServSchedSummaryResultModel} from "../../shared/model/shipservsched/ssssearchsummaryresult.model";
import {SSSServiceProvider} from "../../providers/webservices/sssservices";
import {ShipServSchedSummaryResultListModel} from "../../shared/model/shipservsched/ssssearchsummaryresultlist.model";
import {ShipServSchedSortModel} from "../../shared/model/shipservsched/sssSort.model";
import {ShipServSchedSearchSortPage} from "../shipservschedsearchsort/shipservschedsearchsort";
import {ShipServSchedDetailViewPage} from "../shipservscheddetailview/shipservscheddetailview";
import {ShipServSchedSearchCriteria} from "../../shared/model/shipservsched/ssssearchcriteria.model";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {DatePipe} from "@angular/common";
import {ShipServSchedSearchDetailResultModel} from "../../shared/model/shipservsched/ssssearchdetailresult.model";


/**
 * Generated class for the ShipServSchedSearchResultViewPage page.
 *
 * Page for displaying the search results of Shipping Service Schedule
 */
@IonicPage()
@Component({
  selector: 'page-shipservschedsearchresultview',
  templateUrl: 'shipservschedsearchresultview.html',
  providers: [Utils, ShipServSchedSummaryResultModel, SSSServiceProvider, ShipServSchedSearchModel, ShipServSchedSummaryResultListModel, ShipServSchedSortModel]
})
export class ShipServSchedSearchResultViewPage {

  searchResults: ShipServSchedSummaryResultModel[];
  searchResultItem: ShipServSchedSummaryResultModel;
  resultCount: number;
  sortOption: string;
  ascending: boolean;
  fromPage: string;
  already_done_msg:string;
  actionDone:string;
  left:any;
  right:any;

  createdDateFrom:any;
  createdDateTo:any;

  searchForViewDetails: ShipServSchedSearchModel;
  allCriteriaSelected: boolean;
  searchCriteriaList: ShipServSchedSearchCriteria[];
  approveHeader:string;
  hideApprove:boolean;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public translate: TranslateService,
              public utils: Utils,
              public datepipe: DatePipe,
              public sssServiceProvider: SSSServiceProvider,
              public searchReqModel: ShipServSchedSearchModel,
              public util: Utils,
              public searchResultListModel: ShipServSchedSummaryResultListModel,
              public alertCtrl: AlertController,
              public sortModel: ShipServSchedSortModel,
              ) {

    translate.setDefaultLang('en');
    translate.use('en');

    this.allCriteriaSelected = false;
    this.already_done_msg = this.util.getLocaleString('action_already_done');
    this.sortModel.sortOption = 'sssNoSummary';
    this.sortModel.sortOrder = false;

    this.searchCriteriaList = [];
    this.resultCount = 0;
    this.approveHeader = this.utils.getLocaleString('sssApproveHeader');
    this.initRequest();
  }

  ionViewWillEnter() {
    this.fetchShipServiceSchedules();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShipServSchedSearchResultViewPage');
  }

  initRequest() {
    this.searchReqModel.status = 'All';
    this.searchReqModel.shippingServiceScheduleNoSearch = '';
    this.searchReqModel.vesselNameSearch = '';
    this.createdDateFrom = new Date();
    this.createdDateTo = new Date();
    this.createdDateFrom.setDate(this.createdDateTo.getDate() - 7);
    this.searchReqModel.startDateSearch = this.datepipe.transform(this.createdDateFrom, 'dd/MM/yyyy');
    this.searchReqModel.endDateSearch = this.datepipe.transform(this.createdDateTo, 'dd/MM/yyyy');
    this.searchReqModel.role = 'All';
    this.searchReqModel.spNameSearch = '';
    this.searchReqModel.agentReferenceNoSearch = '';
    this.searchReqModel.locationSearch = '';
    this.searchReqModel.shippingServiceNameSearch = '';
    this.searchReqModel.shippingServiceCodeSearch = '';
  }

  fetchShipServiceSchedules() {
    console.log("in fetchShipServiceSchedules");
    //fetch the shipping service schedule details via service.
    let  searchRequestModel = new ShipServSchedSearchModel();
    if(this.searchReqModel.shippingServiceScheduleNoSearch != "")
    {
      searchRequestModel.shippingServiceScheduleNoSearch = this.searchReqModel.shippingServiceScheduleNoSearch;
    } else
    {
      searchRequestModel = Object.assign({}, this.searchReqModel)
    }
    this.sssServiceProvider.sssSearchAll(searchRequestModel).subscribe(response => {
      this.searchResultListModel = <ShipServSchedSummaryResultListModel> response;
      this.searchResults = this.searchResultListModel.list;
      this.resultCount = this.searchResults.length;

      if (this.resultCount == 0) {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'No data for current filter',
          buttons: ['OK']
        });
        alert.present();
      } else {
        if (null != this.searchResults) {
          this.sortOption = this.sortModel.sortOption ? this.sortModel.sortOption : 'sssNoSummary';
          this.ascending = this.sortModel.sortOrder != null ? this.sortModel.sortOrder : false;
          this.sortFetchedData();
        }
        this.content.scrollToTop(0);
      }

    }, error => {
      if (this.sortModel.fromPage == 'sort') {
        const alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: error[0].message,
          buttons: ['OK']
        });
        alert.present();
      }
    });
  }

  getStyle(s) {
    return '#808080';
  }

  getStatusIcon(s) {
    switch (s.statusSummary) {
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
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  navigateToFilter() {
    this.navCtrl.push(ShipServSchedSearchFilterPage,
      {
        sssSearchModel: this.searchReqModel
      });
  }

  navigateToSort() {
    this.navCtrl.push(ShipServSchedSearchSortPage, {sssSortModel: this.sortModel});
  }

  navigateToDetails(s) {
    this.searchForViewDetails = new ShipServSchedSearchModel();
    this.searchForViewDetails.shippingServiceScheduleNoSearch = s.sssNoSummary;
    this.navCtrl.push(ShipServSchedDetailViewPage, {sssSearchModel: this.searchForViewDetails})
  }

  navigateToDownload(mode:string) {
    let args = new Map<string,string>();
    let  downloadRequestModel = new ShipServSchedSearchModel();
    if(this.searchReqModel.shippingServiceScheduleNoSearch != "")
    {
      downloadRequestModel.shippingServiceScheduleNoSearch = this.searchReqModel.shippingServiceScheduleNoSearch;
    } else
    {
      downloadRequestModel = Object.assign({}, this.searchReqModel)
    }
    args.set("shippingServiceScheduleNoSearch", downloadRequestModel.shippingServiceScheduleNoSearch);
    args.set("agentReferenceNoSearch", downloadRequestModel.agentReferenceNoSearch);
    args.set("startDateSearch", downloadRequestModel.startDateSearch);
    args.set("endDateSearch", downloadRequestModel.endDateSearch);
    args.set("shippingServiceCodeSearch", downloadRequestModel.shippingServiceCodeSearch);
    args.set("shippingServiceNameSearch", downloadRequestModel.shippingServiceNameSearch);
    args.set("status", downloadRequestModel.status);
    args.set("locationSearch", downloadRequestModel.locationSearch);
    args.set("spNameSearch", downloadRequestModel.spNameSearch);
    args.set("terminalSearch", "");
    args.set("role", downloadRequestModel.role);
    this.sssServiceProvider.download(args,mode);
  }

  sortFetchedData() {
    if (this.sortOption != "") {
      if (this.sortOption === 'sssNoSummary') {
        this.searchResults = sortNumberArray(this.searchResults, "sssNoSummary", this.ascending);
      }
      if (this.sortOption === 'agentReferenceNoSummary') {
        this.searchResults = sortArray(this.searchResults, "agentReferenceNoSummary", this.ascending);
      }
      else if (this.sortOption == 'shippingServiceCodeSummary') {
        this.searchResults = sortArray(this.searchResults, "shippingServiceCodeSummary", this.ascending);
      }
      else if (this.sortOption == 'shippingServiceNameSummary') {
        this.searchResults = sortArray(this.searchResults, "shippingServiceNameSummary", this.ascending);
      }
      else if (this.sortOption === 'location') {
        this.searchResults = sortArray(this.searchResults, "location", this.ascending);
      }
      else if (this.sortOption === 'role') {
        this.searchResults = sortArray(this.searchResults, "role", this.ascending);
      }
      else if (this.sortOption === 'leaderLine') {
        this.searchResults = sortArray(this.searchResults, "leaderLine", this.ascending);
      }
      else if (this.sortOption === 'validityDateSummary') {
        this.searchResults = sortDateArray(this.searchResults, "validityDateSummary", this.ascending);
      }
      else if (this.sortOption === 'statusSummary') {
        this.searchResults = sortArray(this.searchResults, "statusSummary", this.ascending);
      }
      else if (this.sortOption === 'vesselName') {
        this.searchResults = sortArray(this.searchResults, "vesselName", this.ascending);
      }
    }
  }

  navigateToSummary(s) {
    this.searchResultItem = s;
    this.navCtrl.push(ShipServSchedSummaryViewPage, {sssItem: this.searchResultItem,sssSearchModel: this.searchReqModel})
  }

/*  sortDateArray(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      this.left = "";
      this.right = "";
      if (null != a[args] && "" != a[args]) {
        this.left = new Date(this.transformwithTime(a[args]));
      }
      if (null != b[args] && "" != b[args]) {
        this.right = new Date(this.transformwithTime(b[args]));
      }
      return this.ascending ? this.left - this.right : this.right - this.left;
    });
    return array;
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
  }*/

  goToApprove(s) {
    /*this.navCtrl.push(ExecuteactionPage, {
      workFlowId: s.wrkflwId,
      requestNo: s.requestNo,
      fromPage: "sssResultPage",
      header:this.approveHeader
    });*/
    this.sssServiceProvider.sssIsApproved(s)
      .subscribe(response =>{
        if(response)
        {
          this.navCtrl.push(ExecuteactionPage, {
            workFlowId: s.wrkflwId,
            requestNo: s.requestNo,
            fromPage: "sssResultPage",
            header:this.approveHeader
          });
        } else {
          this.actionDone = this.already_done_msg;
          this.presentAlert();
        }
      });
  }
  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: this.actionDone,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //this.navigateToView();
          },
        }],
      enableBackdropDismiss: false
    });
    alert.present();
  }
  hideApproveButton(s:ShipServSchedSummaryResultModel) {
    this.hideApprove = true;
    if (s.statusSummary != 'Cancelled') {
      this.hideApprove = !s.approveStatus;
    }
    return this.hideApprove;
  }

}
