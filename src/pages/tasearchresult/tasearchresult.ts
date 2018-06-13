import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {TasortPage} from "../tasort/tasort";
import {SortModel} from "../../shared/model/sort.model";
import {sortArray, sortNumberArray, Utils} from "../../shared/utils";
import {TafilterPage} from "../tafilter/tafilter";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {TaSearchSOModel} from "../../shared/model/ta/taSearchSO.model";
import {DatePipe} from "@angular/common";
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {TruckSearchRespModel} from "../../shared/model/ta/truckSearchResp.model";
import {TasummaryPage} from "../tasummary/tasummary";
import {LocationMasterModel} from "../../shared/model/locationmaster.model";
import {TacreatePage} from "../tacreate/tacreate";
import {TaeditPage} from "../taedit/taedit";
import {TaviewPage} from "../taview/taview";
import {TruckappointmentdetailsoModel} from "../../shared/model/ta/truckappointmentdetailso.model";

/**
 * Generated class for the TasearchresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tasearchresult',
  templateUrl: 'tasearchresult.html',
  providers: [Utils, SortModel]
})
export class TasearchresultPage {

  @ViewChild(Content) content: Content;

  public definedSetListModel: DefinedsetresListModel[];
  public advancedSearchParams: DefinedSetResModel[] = [];
  public moveTypeList: DefinedSetResModel[] = [];
  public requestTypeList: DefinedSetResModel[] = [];
  public statusTypeList: DefinedSetResModel[] = [];
  locationModel: LocationMasterModel[] = [];
  public searchRequest: TaSearchSOModel;
  public searchResults: TruckSearchRespModel[];
  locationList: any[] = [];
  createdFromDate: any;
  createdToDate: any;
  alerttitle: string;
  alertButtonOk: string;
  ascending: boolean = false;
  sortTitle: string;
  left: any;
  right: any;
  cancelMessage: string;
  confirmBox: string = 'CONFIRM BOX';
  alertButtonCancel: string;
  alertButtonDismiss: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public taSortModel: SortModel,
              public datepipe: DatePipe,
              public utils: Utils,
              public alertCtrl: AlertController,
              private commonServices: CommonservicesProvider,
              private taProvider: TruckappointmentserviceProvider) {
    this.getDefinedSet();
    this.getLocation();
    this.searchRequest = new TaSearchSOModel();
    this.searchRequest.advSearchOption = false;
    this.alerttitle = this.utils.getLocaleString("ca_alert");
    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.cancelMessage = this.utils.getLocaleString("ta_cancel_message");
    this.alertButtonCancel = this.utils.getLocaleString("ca_cancel");
    this.alertButtonDismiss = this.utils.getLocaleString("ca_dismiss_txt");
    this.sortTitle = "appoinmentNo";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasearchresultPage');
  }

  ionViewWillEnter() {
    this.content.scrollToTop(0);
    if (null == localStorage.getItem('taCreatedFrom') || ("" == localStorage.getItem('taCreatedFrom'))) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
      localStorage.setItem('taCreatedFrom', this.createdFromDate);
    }
    else {
      this.createdFromDate = localStorage.getItem('taCreatedFrom');
      this.createdFromDate = new Date(this.createdFromDate);
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    }
    if (null == localStorage.getItem('taCreatedTo') || ("" == localStorage.getItem('taCreatedTo'))) {
      this.createdToDate = new Date().toISOString();
      localStorage.setItem('taCreatedTo', this.createdToDate);
    }
    else {
      this.createdToDate = localStorage.getItem('taCreatedTo');
      this.createdToDate = new Date(this.createdToDate);
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
    }
    let varcreatedFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
    let varcreatedToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
    this.searchRequest.fromDateSearch = varcreatedFromDate;
    this.searchRequest.todateSearch = varcreatedToDate;
    this.loadlists();
  }

  loadlists() {
    this.taProvider.getSearchResults(this.searchRequest).subscribe(
      response => {
        this.searchResults = <TruckSearchRespModel[]>response.list;
        console.log(this.searchResults);
        if (this.searchResults != null && this.searchResults.length == 0) {
          const alert = this.alertCtrl.create({
            title: this.alerttitle,
            subTitle: this.utils.getLocaleString("no_data_found"),
            buttons: [this.alertButtonOk]
          });
          alert.present();
        }
        if (this.taSortModel && this.taSortModel.sortOption) {
          this.sortTitle = this.taSortModel.sortOption ? this.taSortModel.sortOption : '';
          this.ascending = this.taSortModel.sortOrder != null ? this.taSortModel.sortOrder : true;

        } else {
          this.ascending = false;
        }
        this.asc();
      }
    );

  }

  asc() {
    if (this.sortTitle != "") {
      if (this.sortTitle == 'appoinmentNo') {
        this.searchResults = sortNumberArray(this.searchResults, "appoinmentNo", this.ascending);
      }
      else if (this.sortTitle == 'agentReferenceNoResult') {
        this.searchResults = sortArray(this.searchResults, "agentReferenceNoResult", this.ascending);
      }
      else if (this.sortTitle == 'truckNo') {
        this.searchResults = sortArray(this.searchResults, "truckNo", this.ascending);
      }
      else if (this.sortTitle == 'appointmentDateSlot') {
        this.searchResults = this.sortDateArray(this.searchResults, "appointmentDateSlot");
      }
      else if (this.sortTitle == 'moveTypeSearch') {
        this.searchResults = sortArray(this.searchResults, "moveTypeSearch", this.ascending);
      }
      else if (this.sortTitle == 'driverName') {
        this.searchResults = sortArray(this.searchResults, "driverName", this.ascending);
      }
      else if (this.sortTitle == 'status') {
        this.searchResults = sortArray(this.searchResults, "status", this.ascending);
      }
    }
  }

  getStyle() {
    return '#808080';
  }

  presentSortPopover() {
    this.taSortModel.fromSort = false;
    this.navCtrl.push(TasortPage, {
      sortModel: this.taSortModel
    });
  }

  presentFilterPopover() {
    this.navCtrl.push(TafilterPage, {
      filter: this.searchRequest,
      locationList: this.locationList,
      moveTypeList: this.moveTypeList,
      statusTypeList: this.statusTypeList
    });
  }

  getStatusIcon(taStatus) {
    switch (taStatus) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated In/Out':
        return "assets/img/partial_gated.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  parsedate(dtstring) {
    if (dtstring != null) {
      let pattern = /(\d{2})(\d{2})(\d{4})/;
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace("/", "");
      let date = dtstring.replace(pattern, '$3-$2-$1');
      return date;
    }
    else {
      return null;
    }
  }

  hideEditOption(selectedTA): boolean {
    if (selectedTA.status != null && (selectedTA.status.toLowerCase() == "active" || selectedTA.status.toLowerCase() == "submitted"
        || selectedTA.status.toLowerCase() == "partial gated in/out")) {

      let appointmentDate : Date = new Date(Date.parse(this.parsedate(selectedTA.appointmentDateSlot.split(" & ")[0])));
      let tempAppointmentDate =this.datepipe.transform(appointmentDate, 'yyyy-MM-dd');
      // let curDate = new Date();
      /*let curDate = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000));*/
      let curDate = new Date();
      let tempCurDate =this.datepipe.transform(curDate, 'yyyy-MM-dd');
    /*  curDate.setHours(curDate.getHours()+4, curDate.getMinutes(),0,0);*/
      appointmentDate.setHours(
        Number(selectedTA.appointmentDateSlot.split(" & ")[1].toString().split(":")[0].toString()) + Number(selectedTA.configuredXHours),
        Number(selectedTA.appointmentDateSlot.split(" & ")[1].toString().split(":")[1].toString().split("-")[0]), 0, 0);
      if (tempCurDate == tempAppointmentDate && curDate >= appointmentDate) {
        return true;
      } else {
        return false;
      }
    }
    else {
      return true;
    }
  }

  editTA(appointmentNo) {
    this.navCtrl.push(TaeditPage, {
      appointmentNoSearch: appointmentNo,
      fromSummary: false
    });
  }

  viewTA(appointmentNo) {
    this.navCtrl.push(TaviewPage, {appointmentNoSearch: appointmentNo});
  }

  hideCancelButton(status: string) {
    if (status != null && (status.toLowerCase() == "active" || status.toLowerCase() == "submitted")) {
      return false;
    }
    else {
      return true;
    }
  }

  cancelTA(cancelId) {
    let cancelReq: TruckappointmentdetailsoModel = new TruckappointmentdetailsoModel();
    cancelReq.truckAppointmentNo = cancelId;
    let alert = this.alertCtrl.create({
      title: this.confirmBox,
      subTitle: this.cancelMessage,
      buttons: [
        {
          text: this.alertButtonOk,
          handler: () => {

            this.taProvider.cancelTA(cancelReq)
              .subscribe(response => {
                  this.loadlists();
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

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ["TERMINAL_MASTER", "REQUEST_TYPE", "MOVE_TYPE", "TERMINAL_MASTER",
      "SEARCH_BY_TRUCK_APPOINTMENT", "MOVE_TYPE", "TA_STATUS_SEARCH", "MOVE_TYPE"];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {

            if (this.definedSetListModel[i].definedSetName == 'SEARCH_BY_TRUCK_APPOINTMENT') {
              this.advancedSearchParams = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'TA_STATUS_SEARCH') {
              this.statusTypeList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'MOVE_TYPE') {
              this.moveTypeList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'REQUEST_TYPE') {
              this.requestTypeList = this.definedSetListModel[i].definedSetValues;
            }
          }
        },
        error => {
          //Show error message
        });
  }

  getLocation() {
    let listAllLocation: Array<any> = [];
    this.taProvider.getLocationMaster(new TaSearchSOModel(), false)
      .subscribe(response => {
          this.locationModel = <LocationMasterModel[]>response;
          for (let i = 0; i < this.locationModel.length; i++) {
            listAllLocation.push(this.locationModel[i].spLocationName);
          }
          this.locationList = Array.from(new Set(listAllLocation));
          if (this.locationList && this.locationList.length > 0) {
            this.locationList.unshift("--Select--")
          }
          else {
            this.locationList[0] = "--Select--";
          }
        },
        error => {
          //Show error message
        });
  }

  showdetails(selectedContainer) {
    this.navCtrl.push(TasummaryPage, {
      appointmentNoSearch: selectedContainer.appoinmentNo,
      agentReferenceNoResult: selectedContainer.agentReferenceNoResult,
      truckNo: selectedContainer.truckNo,
      appointmentDateSlot: selectedContainer.appointmentDateSlot,
      moveTypeSearch: selectedContainer.moveTypeSearch,
      driverName: selectedContainer.driverName,
      status: selectedContainer.status,
      status_icon: this.getStatusIcon(selectedContainer.status)
    });
  }

  openTACreate() {
    // this.navCtrl.push(TacreatePage,{filter: this.taSearch_Modal,mode:'create'});
    this.navCtrl.push(TacreatePage, {mode: 'create'});
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
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})\s\&\s(\d{1,2})\:(\d{2})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1]),
      (+dateArray[4]),
      (+dateArray[5])
    );
    return dateObject;
  }

}
