import {Component, ViewChild} from '@angular/core';
import {
  AlertController, Content, IonicPage, NavController, NavParams, PopoverController, ModalController,
  Navbar
} from 'ionic-angular';

import {Storage} from '@ionic/storage';
import {Utils} from "../../shared/utils";
import {VldsServiceProvider} from "../../providers/webservices/vldsservice";
import {VldsSearchReqModel} from "../../shared/model/VLDS/vldssearchallreq.model";
import {VldsSearchResultListModel} from "../../shared/model/VLDS/vldssearchallresult-list.model";
import {DatePipe} from "@angular/common";
import {Keyboard} from "@ionic-native/keyboard";
import {VldsSearchResultModel} from "../../shared/model/VLDS/vldssearchallresult.model";
import {TruckSearchResultsPage} from "../trucksearchresult/trucksearchresult";
import {VesselloaddischargesummarydetailsPage} from "../vesselloaddischargesummarydetails/vesselloaddischargesummarydetails";
import {VesselloaddischargesummaryfilterPage} from "../vesselloaddischargesummaryfilter/vesselloaddischargesummaryfilter";
import {VldsDefinedListModal} from "../../shared/model/VLDS/vldsdefinedlist.modal";
import {VldsdefinedlistresultModal} from "../../shared/model/VLDS/vldsdefinedlistresult.modal";
import {VldsdefinedvalueslistModal} from "../../shared/model/VLDS/vldsdefinedvalueslist.modal";
import {LoadDischargeMailPage} from "../../components/loaddischargemodal/loaddischargemail/loaddischargemail";
import {VldsSummaryListModel} from "../../shared/model/VLDS/vldssummarylist.model";
import {LoaddischargesortComponent} from "../../components/loaddischargesort/loaddischargesort"
import {VesselloaddischargesummarysortPage} from "../vesselloaddischargesummarysort/vesselloaddischargesummarysort";
import {VldsDischargeListModel} from "../../shared/model/VLDS/vldsdischargelist.model";
import {VldsLoadListModel} from "../../shared/model/VLDS/vldsloadlist.model";
import {VldsRestowListModel} from "../../shared/model/VLDS/vldsrestowlist.model";
import {LoadDischargeDownloadPage} from "../../components/loaddischargemodal/loaddischargedownload/loaddischargedownload";
import {VldsSortModal} from "../../shared/model/VLDS/vldssort.modal";

/**
 * Generated class for the VesselloaddischargesummarysearchresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vesselloaddischargesummarysearchresult',
  templateUrl: 'vesselloaddischargesummarysearchresult.html',
  providers: [Utils, VldsServiceProvider, VldsSearchReqModel, VldsSearchResultModel,
    VldsSearchResultListModel, VldsDefinedListModal, VldsdefinedlistresultModal,
    VldsdefinedvalueslistModal,VldsSortModal]
})
export class VesselloaddischargesummarysearchresultPage {
  vldsSearchResult: VldsSearchResultModel[];
  vldsDefinedValuesModal: VldsdefinedvalueslistModal[];
  resultCount: number = 0;
  sortOption: any;
  vldssort: boolean = false;
  sortOrder: boolean = false;
  selectedTitle: string;
  ascending: boolean = true;
  lengthofmainarray: number = 0;
  left: any;
  right: any;
  sendMail: boolean = true;
  pdfDownLoad: string = "pdf";
  csvDownLoad: string = "excel";
  public vldsSummaryList: VldsSummaryListModel[] = [];
  public vldsSearchReqModel: VldsSearchReqModel = new VldsSearchReqModel();
  public dischargeList: VldsDischargeListModel = new VldsDischargeListModel();
  public loadList: VldsLoadListModel = new VldsLoadListModel();
  public restowList: VldsRestowListModel = new VldsRestowListModel();
  public vldsTerminalList: string[] = [];
  public vldsBoxAgentList: string[] = [];

  public alertHeadding: string;
  public no_data_filter: string;
  public ok_text: string;
  @ViewChild(Content) content: Content;

  constructor(public keyboard: Keyboard,
              public navCtrl: NavController, public navParams: NavParams,
              public datepipe: DatePipe,
              public utils: Utils,
              public alertCtrl: AlertController,
              public vldsDefinedReq: VldsDefinedListModal,
              public vldsDefinedResultModal: VldsdefinedlistresultModal,
              public vldsServiceProvider: VldsServiceProvider,
              public vldsSearchReqModal: VldsSearchReqModel,
              public vldsSearch_Modal: VldsSearchReqModel,
              public vldsSearchResultListModal: VldsSearchResultListModel,
              public vldsMailDownloadSearchResult: VldsSearchResultListModel,
              public vldsSortModal: VldsSortModal,
              private storage: Storage) {
    //this.loadDefinedList();

    this.selectedTitle = "rotationno";
  }

  ionViewDidLoad() {
     // this.loadRequest();
  }

  ionViewWillEnter() {
    this.loadFilterRequest();
    this.vldsSearchResult = new Array<VldsSearchResultModel>();
    this.searchLoadDischarge();
  }


  keyboardClose() {
    this.keyboard.close();
  }

  loadDefinedList() {
    this.vldsServiceProvider.vldsDefinedListl(this.vldsDefinedReq).subscribe(response => {
      this.vldsDefinedResultModal = <VldsdefinedlistresultModal> response[0];

      if (null != this.vldsDefinedResultModal) {

        this.vldsDefinedValuesModal = this.vldsDefinedResultModal.definedSetValues;
      }
    });
  }

  loadRequest() {
    this.vldsSearchReqModal.rotationNoSrch = '';
    this.vldsSearchReqModal.vesselName = '';
    this.vldsSearchReqModal.vesselStatusSrch = '';
    this.vldsSearchReqModal.atdFrmDateSrch = '';
    this.vldsSearchReqModal.atdToDateSrch = '';
    this.vldsSearchReqModal.etaFromDateSrch = '';
    this.vldsSearchReqModal.etaToDateSrch = '';
  }

  loadFilterRequest() {
    if (this.vldsSearchReqModal.rotationNoSrch != null && this.vldsSearchReqModal.rotationNoSrch != "") {
      this.vldsSearch_Modal.rotationNoSrch = this.vldsSearchReqModal.rotationNoSrch;
      this.vldsSearch_Modal.vesselName = '';
      this.vldsSearch_Modal.vesselStatusSrch = '';
      this.vldsSearch_Modal.atdFrmDateSrch = '';
      this.vldsSearch_Modal.atdToDateSrch = '';
      this.vldsSearch_Modal.etaFromDateSrch = '';
      this.vldsSearch_Modal.etaToDateSrch = '';
    } else {
      this.vldsSearch_Modal = Object.assign({}, this.vldsSearchReqModal);
    }
  }

  private searchLoadDischarge() {
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.no_data_filter = this.utils.getLocaleString("vesselsearchalert");
    this.ok_text = this.utils.getLocaleString("ok_text");
    this.vldsServiceProvider.vldsSearchAll(this.vldsSearch_Modal).subscribe(response => {
        this.vldsSearchResultListModal = <VldsSearchResultListModel> response;
        this.vldsSearchResult = this.vldsSearchResultListModal.list;
        this.resultCount = this.vldsSearchResult.length;

        if (this.vldsSortModal.sortOption && this.vldsSearchResult) {
          this.selectedTitle = this.vldsSortModal.sortOption ? this.vldsSortModal.sortOption : '';
          this.ascending = this.vldsSortModal.sortOrder != null ? this.vldsSortModal.sortOrder : true;

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
      },
      error => {
        if(this.vldsSortModal.fromSort == false) {
        const alert = this.alertCtrl.create({
          title: this.alertHeadding,
          subTitle: error[0].message,
          buttons: [this.ok_text]
        });
        alert.present();
      }
      });
  }

  getStyle(s) {
    return '#808080';
  }

  goVldsMailDownLoad(rotationNum: any, downloadMode: string, mailStatus: boolean) {
    this.vldsSearchReqModel.rotationNoSrch = rotationNum;
    this.vldsServiceProvider.vldsSearchByID(this.vldsSearchReqModel).subscribe(response => {
      this.vldsMailDownloadSearchResult = response;
      this.vldsSummaryList = response.summaryList;
      this.dischargeList = response.dischargeList;
      this.loadList = response.loadList;
      this.restowList = response.restowList;
      if (null != this.vldsSummaryList && this.vldsSummaryList.length > 0) {
        for (let i = 0; i < this.vldsSummaryList.length; i++) {
          this.vldsTerminalList[i] = this.vldsSummaryList[i].terminalSum;
          this.vldsBoxAgentList[i] = this.vldsSummaryList[i].boxAgentSum;
        }
        this.vldsTerminalList = Array.from(new Set(this.vldsTerminalList));
        this.vldsBoxAgentList = Array.from(new Set(this.vldsBoxAgentList));
      }
      if (mailStatus) {
        this.navigateToMail(this.vldsMailDownloadSearchResult);
      } else {
        this.navigateToDownload(downloadMode, this.vldsMailDownloadSearchResult);
      }
    }, error => {
      this.dischargeList = null;
      this.loadList = null;
      this.restowList = null;
    });

  }

  getStatusIcon(s) {

    switch (s.status) {
      case 'YettoArrive':
        return "assets/img/pending.svg";
      case 'Sailed':
        return "assets/img/pending.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Cancelled':
        return "assets/img/pending.svg";
      case 'Submitted':
        return "assets/img/pending.svg";
      case 'Suspended':
        return "assets/img/pending.svg";
      default :
        return "assets/img/pending.svg";
    }
  }

  goVldsView(index: any) {
    console.log("Inside goVldsView : ");
    this.navCtrl.push(VesselloaddischargesummarydetailsPage, {
      vldsSearchResult: this.vldsSearchResult[index]
    });

  }

  showVldsDetails(index: any) {
    this.navCtrl.push(VesselloaddischargesummarydetailsPage, {
      vldsSearchResult: this.vldsSearchResult[index]
    });
  }

  navigateToSort() {
    this.vldsSortModal.fromSort = false;
    this.navCtrl.push(VesselloaddischargesummarysortPage,{sortModal: this.vldsSortModal});
  }

  asc() {
    if (this.selectedTitle != "") {
      if (this.selectedTitle === 'rotationno') {
        this.vldsSearchResult = this.sortArray(this.vldsSearchResult, "rotationNoSrch");
      }
      if (this.selectedTitle === 'vesselName') {
        this.vldsSearchResult = this.sortArray(this.vldsSearchResult, "vesselName");
      }

      else if (this.selectedTitle === 'eta') {
        this.vldsSearchResult = this.sortDateArray(this.vldsSearchResult, "eta");
      }

      else if (this.selectedTitle == 'etd') {
        this.vldsSearchResult = this.sortDateArray(this.vldsSearchResult, "etd");
      }

      else if (this.selectedTitle === 'ata') {
        this.vldsSearchResult = this.sortDateArray(this.vldsSearchResult, "ata");
      }

      else if (this.selectedTitle === 'atd') {
        this.vldsSearchResult = this.sortDateArray(this.vldsSearchResult, "atd");
      }
      else if (this.selectedTitle === 'status') {
        this.vldsSearchResult = this.sortArray(this.vldsSearchResult, "status");
      }
      this.lengthofmainarray = this.vldsSearchResult.length;
    }
  }

  sortArray(array: Array<any>, args: string): Array<any> {
    let direction = this.ascending ? 1 : -1;
    array.sort((a: any, b: any) => {
      if (a[args] == null) {
        a[args] = "";
      }
      if (b[args] == null) {
        b[args] = "";
      }
      if (a[args].toLowerCase() < b[args].toLowerCase()) {
        return -1 * direction;
      } else if (a[args].toLowerCase() > b[args].toLowerCase()) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    return array;
  }

  sortDateArray(array: Array<any>, args: string): Array<any> {
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
  }

  navigateToFilter() {
    this.vldsSortModal.fromSort = false;
    this.navCtrl.push(VesselloaddischargesummaryfilterPage, {Request: this.vldsSearchReqModal});
  }

  private loadDefinedValues() {
    this.vldsDefinedReq.definedSetNames.push("VESSEL_STATUS_MASTER");
    this.vldsDefinedReq.definedSetNames.push("FILE_FORMAT");
    this.vldsDefinedReq.lang = "en";
  }

  navigateToMail(searchResult: any) {
    this.navCtrl.push(LoadDischargeMailPage, {
      terminal_list: this.vldsTerminalList,
      agentList: this.vldsBoxAgentList,
      rotationNumber: searchResult.rotationNoSrch,
      line: searchResult.line
    });
  }

  navigateToDownload(mode: string, searchResult: any) {
    this.navCtrl.push(LoadDischargeDownloadPage, {
      terminal_list: this.vldsTerminalList,
      agentList: this.vldsBoxAgentList,
      downloadMode: mode,
      rotationNumber: searchResult.rotationNoSrch,
      line: searchResult.line
    });
  }

  getStatus(status : string) {
    if(status == "YettoArrive") {
      status = "Yet to Arrive";
    }
    return status;
  }
}
