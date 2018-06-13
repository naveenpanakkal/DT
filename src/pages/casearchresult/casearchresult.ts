import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {CacreatePage} from "../cacreate/cacreate";
import {CasearchresultModel} from "../../shared/model/containeracceptance/searchresult/casearchresult.model";
import {ContaineracceptanceProvider} from "../../providers/webservices/containeracceptanceservices";
import {CaserachrequestModel} from "../../shared/model/containeracceptance/searchresult/caserachrequest.model";
import {Casearchsummay} from "../casearchsummay/casearchsummay";
import {CasearchdetailviewPage} from "../casearchdetailview/casearchdetailview";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {ContainerAcceptanceModel} from "../../shared/model/containeracceptance/containeracceptance.model";
import {SecurityUtility} from "../../shared/securityutility";

import {sortArray, sortNumberArray, Utils} from "../../shared/utils";
import {DatePipe} from "@angular/common";
import {CasearchPage} from "../casearch/casearch";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {CasortPage} from "../casort/casort";
import {SortModel} from "../../shared/model/sort.model";


/**
 * Generated class for the CasearchresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-casearchresult',
  templateUrl: 'casearchresult.html',
  providers: [CaserachrequestModel, CasearchresultModel, ContainerAcceptanceModel, SecurityUtility, Utils, SortModel]
})
export class CasearchresultPage {

  public definedSetListModel: DefinedsetresListModel[];
  searchresults: CasearchresultModel[];
  requestwithID: ContainerAcceptanceModel;
  acceptanceTypeList: DefinedSetResModel[] = [];
  statusList: DefinedSetResModel[] = [];
  tradeTypeList: DefinedSetResModel[] = [];
  clientList: DefinedSetResModel[] = [];
  ascending: boolean = false;
  canAmend: boolean;
  canCancel: boolean;
  selectedTitle: string;
  locationModel: ContainerAcceptanceModel = new ContainerAcceptanceModel();
  left: any;
  right: any;
  locationList: any[] = [];
  @ViewChild(Content) content: Content;
  cancelMessage: string;
  public responseModel: ContainerAcceptanceModel;
  alerttitle: string;
  alertButtonOk: string;
  confirmBox: string;
  alertButtonCancel: string;
  alertButtonDismiss: string;
  createdFromDate: any;
  createdToDate: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public  caProvider: ContaineracceptanceProvider,
              public caSearchReqModel: CaserachrequestModel,
              public caSearchReqModelfilter: CaserachrequestModel,
              public popoverCtrl: PopoverController,
              public datepipe: DatePipe,
              private commonServices: CommonservicesProvider,
              public alertCtrl: AlertController, public utils: Utils,
              public securityUtility: SecurityUtility,
              public caSortModel: SortModel) {

    this.getDefinedSet();
    this.getLocation();
    localStorage.removeItem('caCreatedFrom');
    localStorage.removeItem('caCreateTo');
    this.requestwithID = new ContainerAcceptanceModel();
    this.selectedTitle = "acceptanceNo";
    this.alerttitle = this.utils.getLocaleString("ca_alert");
    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.confirmBox = this.utils.getLocaleString("ca_confirm_box");
    this.alertButtonCancel = this.utils.getLocaleString("ca_cancel");
    this.alertButtonDismiss = this.utils.getLocaleString("ca_dismiss_txt");
    this.cancelMessage = this.utils.getLocaleString("ca_cancel_message");

  }

  ionViewWillEnter() {
    this.content.scrollToTop(0);
    if (null == localStorage.getItem('caCreatedFrom') || ("" == localStorage.getItem('caCreatedFrom'))) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
      localStorage.setItem('caCreatedFrom', this.createdFromDate);
    }
    else {
      this.createdFromDate = localStorage.getItem('caCreatedFrom');
      this.createdFromDate = new Date(this.createdFromDate);
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    }
    if (null == localStorage.getItem('caCreatedTo') || ("" == localStorage.getItem('caCreatedTo'))) {
      this.createdToDate = new Date().toISOString();
      localStorage.setItem('caCreatedTo', this.createdToDate);
    }
    else {
      this.createdToDate = localStorage.getItem('caCreatedTo');
      this.createdToDate = new Date(this.createdToDate);
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
    }
    let varcreatedFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
    let varcreatedToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
    this.caSearchReqModel.fromDateSearch = varcreatedFromDate;
    this.caSearchReqModel.toDateSearch = varcreatedToDate;
    this.loadlists();
  }

  getStyle(s) {
    return '#808080';
  }

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['CA_TYPE', 'CA_STATUS', 'DO_TRADE_TYPE', 'CA_NOMINATIONS_TYPE_SEARCH'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {

            if (this.definedSetListModel[i].definedSetName == 'CA_TYPE') {
              this.acceptanceTypeList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'CA_STATUS') {
              this.statusList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'DO_TRADE_TYPE') {
              this.tradeTypeList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'CA_NOMINATIONS_TYPE_SEARCH') {
              this.clientList = this.definedSetListModel[i].definedSetValues;
            }
          }
        },
        error => {
          //Show error message
        });
  }

  getLocation() {
    let listAllLocation: Array<any> = [];
    let containerAcceptanceModel = new ContainerAcceptanceModel();
    containerAcceptanceModel.action = "SEARCH";
    this.caProvider.getLocationMaster(containerAcceptanceModel,false)
      .subscribe(response => {
          this.locationModel = <ContainerAcceptanceModel>response;
          for (let i = 0; i < this.locationModel.locationMasterList.length; i++) {
            listAllLocation.push(this.locationModel.locationMasterList[i].spLocationName);
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

  loadlists() {
    this.caProvider.getSearchResults(this.caSearchReqModel).subscribe(
      response => {
        this.searchresults = <CasearchresultModel[]>response.list;
        console.log(this.searchresults);
        if (this.searchresults != null && this.searchresults.length == 0) {
          const alert = this.alertCtrl.create({
            title: this.alerttitle,
            subTitle: this.utils.getLocaleString("no_data_found"),
            buttons: [this.alertButtonOk]
          });
          alert.present();
        }
        if (this.caSortModel && this.caSortModel.sortOption) {
          this.selectedTitle = this.caSortModel.sortOption ? this.caSortModel.sortOption : '';
          this.ascending = this.caSortModel.sortOrder != null ? this.caSortModel.sortOrder : true;

        } else {
          this.ascending = false;
        }
        this.asc();
      }
    );
    this.disableFieldsForNominee();

  }

  /*Sort functionality*/
  presentSortPopover(myEvent) {
    this.caSortModel.fromSort = false;
    this.navCtrl.push(CasortPage, {
      sortModel: this.caSortModel,
    });
  }

  asc() {
    if (this.selectedTitle != "") {
      if (this.selectedTitle == 'acceptanceNo') {
        this.searchresults = sortNumberArray(this.searchresults, "acceptanceNo", this.ascending);
      }
      else if (this.selectedTitle == 'acceptanceType') {
        this.searchresults = sortArray(this.searchresults, "acceptanceType", this.ascending);
      }
      else if (this.selectedTitle == 'linerBookingNo') {
        this.searchresults = sortArray(this.searchresults, "linerBookingNo", this.ascending);
      }
      else if (this.selectedTitle == 'rotationNo') {
        this.searchresults = sortArray(this.searchresults, "rotationNo", this.ascending);
      }
      else if (this.selectedTitle == 'shipperForwarder') {
        this.searchresults = sortArray(this.searchresults, "shipperForwarder", this.ascending);
      }
      else if (this.selectedTitle == 'chaForwarder') {
        this.searchresults = sortArray(this.searchresults, "chaForwarder", this.ascending);
      }
      else if (this.selectedTitle == 'emptyYard') {
        this.searchresults = sortArray(this.searchresults, "emptyYard", this.ascending);
      }
      else if (this.selectedTitle == 'cfs') {
        this.searchresults = sortArray(this.searchresults, "cfs", this.ascending);
      }
      else if (this.selectedTitle == 'status') {
        this.searchresults = sortArray(this.searchresults, "status", this.ascending);
      }
    }
  }

  presentFilterPopover(myEvent) {
    this.navCtrl.push(CasearchPage, {
      filter: this.caSearchReqModel,
      locationList: this.locationList,
      acceptanceTypeList: this.acceptanceTypeList,
      statusList: this.statusList,
      tradeTypeList: this.tradeTypeList,
      clientList: this.clientList
    });
  }

  getStatusIcon(selectedContainer) {
    switch (selectedContainer.status) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Active Pending':
        return "assets/img/pending.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated In':
        return "assets/img/partial_gated.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Cancel Pending':
        return "assets/img/pending.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  showdetails(selectedContainer) {
    this.navCtrl.push(Casearchsummay, {
      acceptanceNo: selectedContainer.acceptanceNo,
      acceptanceType: selectedContainer.acceptanceType,
      linerBookingNo: selectedContainer.linerBookingNo,
      rotationNo: selectedContainer.rotationNo,
      shipperForwarder: selectedContainer.shipperForwarder,
      chaForwarder: selectedContainer.chaForwarder,
      emptyYard: selectedContainer.emptyYard,
      cfs: selectedContainer.cfs,
      status: selectedContainer.status,
      status_icon: this.getStatusIcon(selectedContainer),
      fromCAResults: 'true'
    });
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

  gotoView(selContainer) {
    this.navCtrl.push(CasearchdetailviewPage, {
      acceptanceNo: selContainer.acceptanceNo,
      mode: "view"
    });
  }

  gotoEdit(selContainer) {
    this.navCtrl.push(CasearchdetailviewPage, {
      acceptanceNo: selContainer.acceptanceNo,
      mode: "edit",
      fromSummary: false
    });
  }

  hideCancelButton(selectedContainer) {
    if ((selectedContainer.status == "Active" || selectedContainer.status == "Active Pending" ||
        selectedContainer.status == "Pending" || selectedContainer.status == "Expired") && (this.canCancel == true)) {
      return false;
    }
    else {
      return true;
    }
  }

  hideEditOption(selectedContainer): boolean {
    if ((selectedContainer.status == "Active" || selectedContainer.status == "Active Pending" ||
        selectedContainer.status == "Pending" || selectedContainer.status == "Partial Gated In") && (this.canAmend == true)) {
      return false;
    }
    else {
      return true;
    }
  }

  cancelCA(selectedContainer: CasearchresultModel) {

    this.requestwithID.acceptanceNo = selectedContainer.acceptanceNo;
    let alert = this.alertCtrl.create({
      title: this.confirmBox,
      subTitle: this.cancelMessage,
      buttons: [
        {
          text: this.alertButtonOk,
          handler: () => {

            this.caProvider.CancelCA(this.requestwithID)
              .subscribe(response => {
                  console.log('SUCCESS');
                  this.loadlists();
                },
                error => {
                  this.presentAlert(this.alerttitle, error[0].message);
                  console.log("Error Occured <<" + JSON.stringify(error));
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

  openCACreate() {
    this.navCtrl.push(CacreatePage);
  }

  hideCreate(): boolean {
    if (this.securityUtility.canCreate(this.securityUtility.CONTAINER_ACCEPTANCE) == true) {
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
        text: this.alertButtonDismiss,
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    alert.present();
  }

  disableFieldsForNominee() {
    if (this.securityUtility.canCancel(this.securityUtility.CONTAINER_ACCEPTANCE) == true) {
      this.canCancel = true;
    } else {
      /*Logged in User is Nominee*/
      this.canCancel = false;
    }
    if (this.securityUtility.canAmend(this.securityUtility.CONTAINER_ACCEPTANCE) == true) {
      this.canAmend = true;
    } else {
      /*Logged in User is Nominee*/
      this.canAmend = false;
    }
  }

}
