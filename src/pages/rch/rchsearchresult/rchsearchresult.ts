import {Component, ViewChild, Injectable} from '@angular/core';
import {Keyboard} from "@ionic-native/keyboard";
import {AlertController, Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {sortArray, sortNumberArray, Utils} from "../../../shared/utils";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {DatePipe} from "@angular/common";
import {RBSearchResultListModel} from "../../../shared/model/rb/rbsearchresult-list.model";
import {SortModel} from "../../../shared/model/sort.model";
import {SecurityUtility} from "../../../shared/securityutility";
import {RCHFilter} from "../rchfilter/rchfilter";
import {RCHsortPage} from "../rchsort/rchsort";
import {RCHsummaryPage} from "../rchsummary/rchsummary";
import {ReleaseContainerSearchSO} from "../../../shared/model/hnrc/releasecontainersearch.model";
import {
  ContainerHoldDetailsSO,
  ReleaseContainerSrchListSO
} from "../../../shared/model/hnrc/releasecontainersrch.model";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {RCHviewPage} from "../rchview/rchview";
import {RCHReleaseviewPage} from "../rchrelease/rchrelease";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {UserDataModel} from "../../../shared/model/userdata.model";

@IonicPage()
@Component({
  selector: 'page-RCHsearchresultPage',
  templateUrl: 'rchsearchresult.html',
  providers: [Utils, ReleaseContainerSearchSO, HrcservicesProvider,
    ReleaseContainerSrchListSO, RBSearchResultListModel,
    ContainerHoldDetailsSO, SortModel, SecurityUtility],

})

export class RCHsearchresultPage {

  @ViewChild(Content) content: Content;

  public searchResults: ContainerHoldDetailsSO[];
  public multipleReleaseItems: ContainerHoldDetailsSO[];
  createdFromDate: any;
  createdToDate: any;
  public alertHeadding: string;
  public no_data_filter: string;
  public ok_text: string;
  ascending: boolean = false;
  selectedTitle: string;
  left: any;
  right: any;
  items = [];
  lengthofmainarray: number = 0;
  holdReleaseNo: number;
  fromHoldContainer: boolean = false;
  advSearchBy: string;
  isMultiSelect: boolean = false;
  enableReleaseForUser: boolean = false;

  public holdActionDataLst: DefinedsetresListModel[] = [];
  designationTypeDataLst: DefinedsetresListModel[] = [];
  containerCategoryDataLst: DefinedsetresListModel[] = [];
  statusDataLst: DefinedsetresListModel[] = [];
  locationDataLst: any;
  spNameDataLst: any;
  releaseByDataLst: any;
  lazyItemList: any = [];
  totalResultCount: number = 0;
  currentResultCount: number = 0;
  SelectedItems: any = [];

  private resultConfig = [{
    "data": 0,
    "name": "",
    "searchable": true,
    "orderable": false,
    "search": {"value": "", "regex": false}
  }, {
    "data": "containerNo",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "isoCode",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "holdRequestNo",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "referenceNo",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "holdType",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "holdAction",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "autoReleaseDateTime",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "holdStatus",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "holdBy",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "holdReason",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "rotationNumber",
    "name": "",
    "searchable": true,
    "orderable": true,
    "search": {"value": "", "regex": false}
  }, {
    "data": "addDtlsView",
    "name": "",
    "searchable": true,
    "orderable": false,
    "search": {"value": "", "regex": false}
  }];

  constructor(public keyboard: Keyboard,
              public navCtrl: NavController,
              public navParams: NavParams,
              public datepipe: DatePipe,
              public utils: Utils,
              public hnrcRequestModel: ReleaseContainerSearchSO,
              public hnrcSearchResultListModel: ReleaseContainerSrchListSO,
              public hnrcSearch_Modal: ReleaseContainerSearchSO,
              public hnrcServiceProvider: HrcservicesProvider,
              public rbSortModal: SortModel,
              public alertCtrl: AlertController,
              public securityUtility: SecurityUtility,
              private commonServices: CommonservicesProvider,) {

    this.selectedTitle = "holdRequestNo";
    this.holdReleaseNo = this.navParams.get("holdReleaseNumber");
    this.fromHoldContainer = this.navParams.get("fromHoldContainer");
    this.advSearchBy = this.navParams.get("advSearchBy");
    this.lazyItemList = [];
    this.isMultiSelect = false;
    this.SelectedItems = [];
    this.enableReleaseForUser = false;
    this.fetchDefineSet();
    this.getLocation();
  }


  ionViewWillEnter() {
    this.searchResults = new Array<ContainerHoldDetailsSO>();
    this.multipleReleaseItems = new Array<ContainerHoldDetailsSO>();
    this.isMultiSelect = false;
    this.SelectedItems = [];
    this.enableReleaseForUser = false;
    this.loadDefaultValues();
    this.initSearchOrFilterRCH();
  }

  getStatusIcon(s) {
    switch (s.holdStatus) {
      case 'Released':
        return "assets/img/submitted.svg";
      case 'On Hold':
        return "assets/img/pending.svg";
      case 'Approved':
        return "assets/img/approved.svg";
      case 'Active':
        return "assets/img/active.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated In':
        return "assets/img/partial_gated.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Expired':
        return "assets/img/expired.svg";
      default:
        return "assets/img/approved.svg";
    }
  }


  // FETCH DEFINE SET
  fetchDefineSet() {
    let reqObj = new DefinedSetReqModel();
    reqObj.definedSetNames = ["HRC_HOLD_ACTION", "HRC_CONTAINER_CATEGORY", "RELEASE_DESIGNATION_TYPE", "HRC_STATUS_RELEASE", "HRC_RELEASE_BY"];
    reqObj.lang = "en";

    this.commonServices.getDefinedSet(reqObj).subscribe(
      (response) => {
        let responseObj = <DefinedsetresListModel[]>response;
        this.holdActionDataLst = this.getFormattedResponseValue(responseObj, "definedSetName", "definedSetValues", "HRC_HOLD_ACTION");
        this.containerCategoryDataLst = this.getFormattedResponseValue(responseObj, "definedSetName", "definedSetValues", "HRC_CONTAINER_CATEGORY");
        this.designationTypeDataLst = this.getFormattedResponseValue(responseObj, "definedSetName", "definedSetValues", "RELEASE_DESIGNATION_TYPE");
        this.statusDataLst = this.getFormattedResponseValue(responseObj, "definedSetName", "definedSetValues", "HRC_STATUS_RELEASE");
        this.releaseByDataLst = this.getFormattedResponseValue(responseObj, "definedSetName", "definedSetValues", "HRC_RELEASE_BY");
      }
    )
  }
  getFormattedResponseValue(responseObj, inPropName: string, outPropName: string, formatKey: string) {
    for (let respInst of responseObj) {
      if (respInst[inPropName] === formatKey) {
        return respInst[outPropName];
      }
    }
  }

  // FETCH LOCATION
  getLocation() {
    let loc: UserDataModel = new UserDataModel();
    loc.userName = localStorage.getItem('LOGGEDINUSER');
    this.hnrcServiceProvider.getLocationMaster(loc, false).subscribe((response) => {
      this.locationDataLst = response.locationMasterList;
    })
  }

  // LOAD DEFAULT VALUES
  loadDefaultValues() {
    if (this.hnrcRequestModel.fromFilter == false || this.hnrcRequestModel.fromFilter == undefined) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
      this.createdToDate = new Date().toISOString();
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy H:mm');
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy H:mm');


      this.hnrcSearch_Modal.columns = this.resultConfig;
      this.hnrcSearch_Modal.start = 0;
      this.hnrcSearch_Modal.pageLength = 10;
      this.hnrcSearch_Modal.holdAction = "";
      this.hnrcSearch_Modal.containerNo = "";
      this.hnrcSearch_Modal.location = "";
      this.hnrcSearch_Modal.spName = "";
      this.hnrcSearch_Modal.referenceNo = "";
      if (this.fromHoldContainer == true) {
        this.hnrcSearch_Modal.holdRequestNo = this.holdReleaseNo;
      } else {
        this.hnrcSearch_Modal.holdRequestNo = null;
      }
      this.hnrcSearch_Modal.fromDate = "";
      this.hnrcSearch_Modal.toDate = "";
      this.hnrcSearch_Modal.autoReleaseFromDateRelease = "";
      this.hnrcSearch_Modal.autoReleaseToDateRelease = "";
      this.hnrcSearch_Modal.releaseFromDateRelease = "";
      this.hnrcSearch_Modal.releaseToDateRelease = "";
      this.hnrcSearch_Modal.designation = "All";
      this.hnrcSearch_Modal.rotationNo = "";
      this.hnrcSearch_Modal.deliveryOrderNo = "";
      this.hnrcSearch_Modal.containerAcceptanceNo = "";
      this.hnrcSearch_Modal.containerReleaseNo = "";
      this.hnrcSearch_Modal.isDeletedCA = "";
      this.hnrcSearch_Modal.status = "All";
      this.hnrcSearch_Modal.releasedBy = "";
      this.hnrcSearch_Modal.containerCategory = "";
      this.hnrcSearch_Modal.draw = 1;
      this.assignSortDetails();

    } else {
      this.hnrcSearch_Modal = Object.assign({}, this.hnrcSearch_Modal);
    }
  }

  //INITIALISE SEARCH [INFINITE SCROLL]
  initSearchOrFilterRCH() {
    this.assignPageDetails(true);
    this.assignSortDetails();
    this.hnrcServiceProvider.hnrcSearchAll(this.hnrcSearch_Modal).subscribe(response => {
      this.hnrcSearchResultListModel = <ReleaseContainerSrchListSO>response;
      this.addToLazyList(this.hnrcSearchResultListModel.list, true);
      if((this.hnrcSearchResultListModel.list).length == 0){
        this.alertHeadding = this.utils.getLocaleString("alert");
        this.no_data_filter = this.utils.getLocaleString("vesselsearchalert");
        this.ok_text = this.utils.getLocaleString("ok_text");
        const alert = this.alertCtrl.create({
          title: this.alertHeadding,
          subTitle: this.no_data_filter,
          buttons: [this.ok_text]
        });
        alert.present();
        this.totalResultCount = 0;
        this.currentResultCount = 0;
      }
      else{
        this.setCount(this.hnrcSearchResultListModel.recordsTotal, this.hnrcSearchResultListModel.recordsFiltered);
      }
    });
  }

  // ON SCROLL --> INVOKED ON EVERY INFINITE SCROLL EVENT
  onScrollSearchOrFilterRCH(infiniteScroll): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.assignPageDetails(false);
        if(this.lazyItemList.length != this.totalResultCount) {
          this.hnrcServiceProvider.hnrcSearchAll(this.hnrcSearch_Modal).subscribe(response => {
            this.hnrcSearchResultListModel = <ReleaseContainerSrchListSO>response;
            this.addToLazyList(this.hnrcSearchResultListModel.list, false);
            this.setCount(this.hnrcSearchResultListModel.recordsTotal, this.hnrcSearchResultListModel.recordsFiltered);
            infiniteScroll.complete();
            resolve();
          })
        }
        else{
          infiniteScroll.complete();
          resolve();
        }
      }, 500);
    })
  }

  // UTILS FOR INFINTE SCROLL
  addToLazyList(newItemLst: any, isInit: boolean) {
    if (isInit) {
      this.lazyItemList = [];
      this.content.scrollToTop(0);
    }
    for (let lazyItem of newItemLst) {
      this.lazyItemList.push(lazyItem);
    }
  }
  assignPageDetails(isInit: boolean) {
    if (isInit) {
      this.hnrcSearch_Modal.start = 0;
      this.hnrcSearch_Modal.draw = 1;
      this.currentResultCount = 0;

    } else if (this.fromHoldContainer && this.fromHoldContainer == true) {
      this.hnrcSearch_Modal.start = 0;
      this.hnrcSearch_Modal.draw = 1;
    }
    else {
      this.hnrcSearch_Modal.start = this.hnrcSearch_Modal.start + 10;
      this.hnrcSearch_Modal.draw = this.hnrcSearch_Modal.draw + 1;
    }
  }
  assignSortDetails() {
    this.ascending = this.rbSortModal.sortOrder != undefined ? this.rbSortModal.sortOrder : false;
    let sortOrder = this.ascending == true ? 'asc' : 'desc';
    this.selectedTitle = this.rbSortModal.sortOption;
    if (this.selectedTitle != "") {
      if (this.selectedTitle === 'rchcontainerno') {
        //this.searchResults = sortArray(this.searchResults, "containerNo", this.ascending);
        this.hnrcSearch_Modal.order = [{column: 1, dir: sortOrder}]
      }
      if (this.selectedTitle === 'rchisoCode') {
        //this.searchResults = sortArray(this.searchResults, "isoCode", this.ascending);
        this.hnrcSearch_Modal.order = [{column: 2, dir: sortOrder}]
      }
      if (this.selectedTitle === 'rchholdrequestno') {
        //this.searchResults = sortNumberArray(this.searchResults, "holdRequestNo", this.ascending);
        this.hnrcSearch_Modal.order = [{column: 3, dir: sortOrder}]
      }

      else if (this.selectedTitle === 'rchreferenceno') {
        //this.searchResults = sortArray(this.searchResults, "referenceNo",this.ascending);
        this.hnrcSearch_Modal.order = [{column: 4, dir: sortOrder}]
      }

      else if (this.selectedTitle == 'rchtype') {
        //this.searchResults = sortArray(this.searchResults, "holdType", this.ascending);
        this.hnrcSearch_Modal.order = [{column: 5, dir: sortOrder}]

      }
      else if (this.selectedTitle == 'rchholdaction') {
        //this.searchResults = sortArray(this.searchResults, "holdAction", this.ascending);
        this.hnrcSearch_Modal.order = [{column: 6, dir: sortOrder}]

      }
      else if (this.selectedTitle == 'rchautoreleasedatetime') {
        //this.searchResults = this.sortDateArray(this.searchResults, "autoReleaseDateTime");
        this.hnrcSearch_Modal.order = [{column: 7, dir: sortOrder}]

      }
      else if (this.selectedTitle == 'rchstatus') {
        //this.searchResults = sortArray(this.searchResults, "holdStatus", this.ascending);
        this.hnrcSearch_Modal.order = [{column: 8, dir: sortOrder}]

      }
      else if (this.selectedTitle == 'rchholdby') {
        //this.searchResults = sortArray(this.searchResults, "holdBy", this.ascending);
        this.hnrcSearch_Modal.order = [{column: 9, dir: sortOrder}]
      }
      else if (this.selectedTitle == 'rchholdreason') {
        //this.searchResults = sortArray(this.searchResults, "holdReason", this.ascending);
        this.hnrcSearch_Modal.order = [{column: 10, dir: sortOrder}]
      }
      else if (this.selectedTitle == 'rchrotation') {
        //this.searchResults = sortArray(this.searchResults, "rotationNumber", this.ascending);
        this.hnrcSearch_Modal.order = [{column: 11, dir: sortOrder}]
      }
      //this.lengthofmainarray = this.searchResults.length;
    }
  }
  setCount(totalCount, currentCount) {
    this.totalResultCount = totalCount;
    this.currentResultCount = this.currentResultCount + this.hnrcSearchResultListModel.list.length;
  }
  keyboardClose() {
    this.keyboard.close();
  }
  sortDateArray(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      this.left = new Date(this.transformwithTime(a[args]));
      this.right = new Date(this.transformwithTime(b[args]));
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
  showReleaseOption(hnrcSummaryData) {
    if (hnrcSummaryData.holdStatus == "On Hold" && hnrcSummaryData.holdBy == localStorage.getItem('LOGGEDINUSER')) {
      return true;
    } else {
      return false;
    }
  }

  // NAVIGATE FUNCTIONS
  navigateToSort() {
    this.rbSortModal.fromSort = false;
    // this.rbSortModal.sortOption = "rchcontainerno";
    this.navCtrl.push(RCHsortPage, {sortModal: this.rbSortModal});
  }
  navigateToFilter() {
    this.rbSortModal.fromSort = false;
    this.navCtrl.push(RCHFilter, {
      Request: this.hnrcSearch_Modal,
      HoldAction: this.holdActionDataLst,
      Designation: this.designationTypeDataLst,
      ContainerCategory: this.containerCategoryDataLst,
      Status: this.statusDataLst,
      Location: this.locationDataLst,
      SpName: this.spNameDataLst,
      ReleaseBy: this.releaseByDataLst
    });
  }

  // SLIDE CONTROLS
  goToViewRCH(hnrcSummaryData) {
    this.navCtrl.push(RCHviewPage,
      {hnrcViewResult: hnrcSummaryData});
  }
  showdetails(selResource: any) {
    this.navCtrl.push(RCHsummaryPage, {
      filter: this.hnrcSearch_Modal,
      hnrcSearchResult: selResource
    });
  }

  // FAB CONTROLS
  goToReleaseRCH(data = null) {
    let ReleaseData = [];
    if (this.isMultiSelect == false) {
      ReleaseData.push(data);
    }
    else {
      ReleaseData = this.SelectedItems;
    }
    this.navCtrl.push(RCHReleaseviewPage, {hnrcReleaseCotainerHoldData: ReleaseData});
  }
  goToDownloadCSV(hnrcSummaryData = null) {
    let args = new Map();
    if(hnrcSummaryData == null){
      args.set("holdId", (this.SelectedItems.map(a => a.holdId)).join());
    }
    else{
      args.set("holdId", hnrcSummaryData.holdId);
    }
    args.set("exportType", 'excel');
    this.hnrcServiceProvider.hnrcDownload(args,
      "csv");
  }
  goToDownloadPDF(hnrcSummaryData = null) {
    let args = new Map();
    if(hnrcSummaryData == null){
      args.set("holdId", (this.SelectedItems.map(a => a.holdId)).join());
    }
    else{
      args.set("holdId", hnrcSummaryData.holdId);
    }
    args.set("exportType", 'pdf');
    this.hnrcServiceProvider.hnrcDownload(args,
      "pdf");
  }



  longPressHandle(event) {
    if (event.select == true) {
      this.SelectedItems.push(event.value);
    }
    else {
      let index = this.SelectedItems.indexOf(event.value);
      if (index != -1) {
        this.SelectedItems.splice(index, 1);
      }
    }
    if (this.SelectedItems.length > 0) {
      this.isMultiSelect = true;
      this.enableReleaseForUser = false;
      for (let Item of this.SelectedItems) {
        if (((Item.holdStatus).replace(' ', '')).toUpperCase() == 'ONHOLD' && Item.holdBy == localStorage.getItem('LOGGEDINUSER')) {
          this.enableReleaseForUser = true;
        }
      }
    }
    else {
      this.isMultiSelect = false;
    }
  }

}


