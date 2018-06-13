import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Navbar, PopoverController, App, AlertController, Content} from 'ionic-angular';
import {VesselsearchdetailsPage} from '../vesselsearchdetails/vesselsearchdetails';
import {VesselRegSearchResultModel} from '../../shared/model/vesselsearchview/vesselregsearchresult.model';
import {VesselFilterPopoverPage} from '../vesselfilterpopover/vesselfilterpopover';
import {VesselSortPopoverPage} from '../vesselsortpopover/vesselsortpopover';
import {Storage} from '@ionic/storage';
import {LanguageProvider} from '../../providers/language/language';
import {VesselViewPage} from '../vesselview/vesselview';
import {VesselservicesProvider} from "../../providers/webservices/vesselservices";
import {VesselRegSearchModel} from "../../shared/model/vesselsearchview/vesselregsearch.model";
import {VesselRegSearchResultListModel} from "../../shared/model/vesselsearchview/vesselregsearchresult-list.model";
import {DatePipe} from '@angular/common';
import {ExecuteactionPage} from "../executeaction/executeaction";
import {TranslateService} from "@ngx-translate/core";
import {Utils} from "../../shared/utils";

/*
* ===========================================================================
* Copyright 2017 Dubai Trade.
* All Rights Reserved
* ===========================================================================
*
*  vesselsearchview.ts file contains VesselsearchviewPage class which holds functions to
*  populate the data, and handle the UI logic for Vessel Search Result page. This include filtering
*  and sorting the search result based on the values received from Sort and Filter popover pages
*
*/
@IonicPage()
@Component({
  selector: 'page-vesselsearchview',
  templateUrl: 'vesselsearchview.html',
  providers: [VesselservicesProvider, VesselRegSearchModel, VesselRegSearchResultModel, VesselRegSearchResultListModel,Utils]

})
export class VesselsearchviewPage {

  lengthofmainarray: number = 0;


  @ViewChild('navbar') navBar: Navbar;

  order: string = 'vesselname';
  selectedTitle: String;
  searchdetails: VesselRegSearchResultModel[];
  toholdalldataarray: VesselRegSearchResultModel[];

  date: Date;
  createdFromDate: any;
  createdToDate: any;
  ascending: boolean = false;
  dateFormat: string = 'DD/MM/YYYY';
  alertmsg:string;
  alerttitle:string;
  alertbutton:string;

    left:any;
    right:any;
  @ViewChild(Content) content: Content;
  constructor(public lang: LanguageProvider, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public app: App, private storage: Storage,
              public vesselsearchviewService: VesselservicesProvider, public vesselRegSearch: VesselRegSearchModel, public vesselRegSearchModel: VesselRegSearchResultModel,
              public vesselRegSearchResultListModel: VesselRegSearchResultListModel, public alertCtrl: AlertController, public datepipe: DatePipe,
              public translate: TranslateService, public utils: Utils) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.loadinitialrequest();
    this.selectedTitle = "regid";
    this.alertmsg=this.utils.getLocaleString("alertvesselsearchview");
    this.alerttitle=this.utils.getLocaleString("alert");
    this.alertbutton=this.utils.getLocaleString("alertok");
  };

  ionViewWillEnter()
  {
    this.searchVessel();
  }
  asc() {
    if (this.selectedTitle != "") {
      if (this.selectedTitle === 'vname') {
        this.searchdetails = this.sortArray(this.searchdetails, "vesselName");
      }

      else if (this.selectedTitle === 'status') {
        this.searchdetails = this.sortArray(this.searchdetails, "vesselRegistrationStatus");
      }

      else if (this.selectedTitle == 'type') {
        this.searchdetails = this.sortArray(this.searchdetails, "vesselType");
      }

      else if (this.selectedTitle === 'imo') {
        this.searchdetails = this.sortArray(this.searchdetails, "imoNo");
      }

      else if (this.selectedTitle === 'regid') {
        this.searchdetails = this.sortNumberArray(this.searchdetails, "vesselRegistrationId");
      }

      else if (this.selectedTitle === 'createDate') {
        this.searchdetails = this.sortDateArray(this.searchdetails, "createdDate");
        }
    this.lengthofmainarray = this.searchdetails.length;
    }
  }


  ionViewDidLoad() {

    this.storage.remove('filterSelected');
    this.storage.remove('vesselName');
    this.storage.remove('vesselImo');
    this.storage.remove('vesselReg');
    this.storage.remove('vesselType');
    localStorage.setItem('vesselCreatedFrom', '');
    localStorage.setItem('vesselCreateTo', '');

    //clear sort
    this.storage.remove('vesselRadioSelect');
    this.storage.remove('vesselSortOrder');
  }

  showdetails(s) {

    this.navCtrl.push(VesselsearchdetailsPage, {
      vesselname: s.vesselName,
      vesselid: s.vesselRegistrationId,
      vesselimo: s.imoNo,
      vesselstatus: s.vesselRegistrationStatus,
      vesselbuilt: s.createdDate,
      vesseltype: s.vesselType,
      vesselicon: this.getStatusIcon(s)
    });
    this.storage.remove('Approve');

  }


  presentFilterPopover(myEvent) {
    let popover = this.popoverCtrl.create(VesselFilterPopoverPage, {previous_search:this.vesselRegSearch}, {cssClass: 'cafilterpopover'});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((data) => {
      if (data) {
        if (data.statusFilter == null && data.vesselType == null && data.vesselName == null && data.vesselImo == null && data.vesselReg == null && data.vesselCreatedFromDate == null && data.vesselCreatedToDate == null) {
          this.loadrequest();
          this.searchVessel();
        }
        else {
          this.loadrequest();
          if (data.vesselName) {
            this.vesselRegSearch.vesselName = data.vesselName;
          }
          if (data.vesselImo) {
            this.vesselRegSearch.imoNo = data.vesselImo;
          }
          if (data.vesselReg) {
            this.vesselRegSearch.vesselRegistrationId = data.vesselReg;
          }
          if (data.statusFilter && data.statusFilter != 'All') {
            this.vesselRegSearch.vesselRegistrationStatusSearch = data.statusFilter;
          }
          if (data.vesselType && data.vesselType != 'All') {
            this.vesselRegSearch.vesselType = data.vesselType;
          }
          if (data.vesselCreatedFromDate && data.vesselCreatedFromDate != '') {
            this.vesselRegSearch.fromDate = data.vesselCreatedFromDate;
          }
          if (data.vesselCreatedToDate && data.vesselCreatedToDate != '') {
            this.vesselRegSearch.toDate = data.vesselCreatedToDate;
          }
          this.searchVessel();
          this.content.scrollToTop(0);
        }
      }
    });
  }

  /*Sort functionality*/
  presentSortPopover(myEvent) {
    let popover = this.popoverCtrl.create(VesselSortPopoverPage, {previous: this.selectedTitle}, {cssClass: 'casortpopover'});
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((data) => {
      this.selectedTitle = data.sortOption ? data.sortOption : '';
      this.ascending = data.sortOrder != null ? data.sortOrder : true;
      this.asc();
      this.content.scrollToTop(0);
    });
  }

  getStyle(s) {
      return '#808080';
  }

  goedit(s) {
    this.lang.isEdit = true;
  }

  goview(s) {
    this.navCtrl.push(VesselViewPage, {
      vesselname: s.vesselName,
      vesselid: s.vesselRegistrationId,
      vesselimo: s.imoNo,
      vesselicon: s.icon,
      vesselstatus: s.vesselRegistrationStatus,
      vesselbuilt: s.createdDate,
      fromHistory: false
    });
  }

  gotoapprove(s) {
    this.navCtrl.push(ExecuteactionPage, {
      workFlowId: s.wrkflwId,
      requestNo: s.vesselRegRequestId,
      fromPage: "VesselSearchResult"
    });
  }


  loadinitialrequest() {
    this.createdFromDate = new Date();
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdToDate = new Date().toISOString();

    this.vesselRegSearch.fromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
    this.vesselRegSearch.vesselRegistrationId = '';
    this.vesselRegSearch.imoNo = '';
    this.vesselRegSearch.toDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
    this.vesselRegSearch.vesselName = '';
    this.vesselRegSearch.vesselRegistrationStatusSearch = '';
    this.vesselRegSearch.vesselType = '';

    this.vesselRegSearch.requestNo = '';
  }

  loadrequest() {
    this.vesselRegSearch.fromDate = '';
    this.vesselRegSearch.vesselRegistrationId = '';
    this.vesselRegSearch.imoNo = '';
    this.vesselRegSearch.toDate = '';
    this.vesselRegSearch.vesselName = '';
    this.vesselRegSearch.vesselRegistrationStatusSearch = '';
    this.vesselRegSearch.vesselType = '';
    this.vesselRegSearch.requestNo = '';
  }

  searchVessel() {
     this.vesselsearchviewService.searchVesselRegistered(this.vesselRegSearch)
      .subscribe(response => {
          this.vesselRegSearchResultListModel = <VesselRegSearchResultListModel>response;
          this.searchdetails = this.vesselRegSearchResultListModel.list;
          this.toholdalldataarray = this.vesselRegSearchResultListModel.list;
          if ((this.searchdetails != null) && (this.searchdetails.length == 0)) {
            const alert = this.alertCtrl.create({
              title: this.alerttitle,
              subTitle: this.alertmsg,
              buttons: [this.alertbutton]
            });
            alert.present();
          } else {
            this.asc();
          }
        });
  }

  getStatusIcon(s) {

    switch (s.vesselRegistrationStatus) {
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

  hideApproveButton(s) {
    if (s.approveStatus == true  && s.canApprove == true) {
      return false;
    } else {
      return true;
    }
  }

  sortArray(array: Array<any>, args: string): Array<any> {
    let direction = this.ascending ? 1 : -1;
    array.sort((a: any, b: any) => {
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

  sortNumberArray(array: Array<any>, args: string): Array<any> {
    let direction = this.ascending ? 1 : -1;
    array.sort((a: any, b: any) => {
      if (a[args] < b[args]) {
        return -1 * direction;
      } else if (a[args] > b[args]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
    return array;
  }

  sortDateArray(array: Array<any>, args: string): Array<any> {
    array.sort((a: any, b: any) => {
      this.left = new Date(this.transform(a[args]));
      this.right = new Date(this.transform(b[args]));
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

}
