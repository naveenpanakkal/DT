import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, Navbar, NavController, NavParams, PopoverController} from 'ionic-angular';

import {DeliveryorderservicesProvider} from "../../providers/webservices/deliveryorderservices";
import {SearchdeliveryorderreqModel} from "../../shared/model/deliveryorder/searchdeliveryorder/searchdeliveryorderreq.model";
import {SearchdeliveryorderresplistModel} from "../../shared/model/deliveryorder/searchdeliveryorder/searchdeliveryorderresplist.model";

import {DeliveryorderreqModel} from "../../shared/model/deliveryorder/deliveryorderreq.model";
import {DosearchsummaryPage} from "../dosearchsummary/dosearchsummary";
import {SearchdeliveryorderrespModel} from "../../shared/model/deliveryorder/searchdeliveryorder/searchdeliveryorderresp.model";
import {DosearchdetailviewPage} from "../dosearchdetailview/dosearchdetailview";
import {DatePipe} from "@angular/common";
import {DosearchPage} from "../dosearch/dosearch";
import {DocreatePage} from "../docreate/docreate";
import {sortArray, sortDateArray, sortNumberArray, Utils} from "../../shared/utils";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {DosortPage} from "../dosort/dosort";
import {SortModel} from "../../shared/model/sort.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";

/**
 * Generated class for the DosearchresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dosearchresult',
  templateUrl: 'dosearchresult.html',
  providers: [DeliveryorderservicesProvider, DeliveryorderreqModel, SearchdeliveryorderreqModel, SearchdeliveryorderresplistModel, Utils, SortModel]
})
export class DosearchresultPage {

  lengthofmainarray: number = 0;
  public definedSetListModel: DefinedsetresListModel[];
  delivaryToList: DefinedSetResModel[] = [];
  statusList: DefinedSetResModel[] = [];
  tradeTypeList: DefinedSetResModel[] = [];
  doTypeList: DefinedSetResModel[] = [];

  location: any;
  terminal: any;
  createdfrom: any;
  createdto: any;
  rotationno: any;
  status: any;
  dotype: any;
  tradeType: any;
  dorequestno: any;
  doagentrefno: any;
  domrnno: any;
  dohousebillno: any;
  dobillno: any;
  docontainerno: any;
  deliveryto: any;
  frieghtForwarderCode: any;
  consigneeCode: any;
  cFSCode: any;
  emptyYardCode: any;
  @ViewChild('navbar') navBar: Navbar;
  fromdate: any;
  todate: any;
  createdFromDate: any;
  createdToDate: any;
  empty: boolean;
  locations: any[] = [];
  searchresults: SearchdeliveryorderrespModel[];

  ascending: boolean = false;
  selectedTitle: string;

  hideCancelOption: boolean;
  left: any;
  right: any;


  afterCancelled: string;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController,
              public deliveryorderreqmodel: DeliveryorderreqModel, public alertCtrl: AlertController,
              public navParams: NavParams, public deliveryorderservicesprovider: DeliveryorderservicesProvider,
              public searchdeliveryorderresplistmodel: SearchdeliveryorderresplistModel,
              public doreqmodel: SearchdeliveryorderreqModel,
              private commonServices: CommonservicesProvider,
              public searchdeliveryorderreqmodel: SearchdeliveryorderreqModel, public datepipe: DatePipe,
              public doSortModel: SortModel) {

    this.selectedTitle = 'dorequestno';
    this.doSortModel.sortOrder = false;
    this.getDefinedSet();
    this.getLocation();
    localStorage.removeItem('DOSearchCreatedFrom');
    localStorage.removeItem('DOSearchCreatedTo');
  }

  ionViewWillEnter() {

    if (null == localStorage.getItem('DOSearchCreatedFrom') || ("" == localStorage.getItem('DOSearchCreatedFrom'))) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
    }
    else {
      this.createdFromDate = localStorage.getItem('DOSearchCreatedFrom');
      this.createdFromDate = new Date(this.createdFromDate);
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    }
    if (null == localStorage.getItem('DOSearchCreatedTo') || ("" == localStorage.getItem('DOSearchCreatedTo'))) {
      this.createdToDate = new Date().toISOString();
    }
    else {
      this.createdToDate = localStorage.getItem('DOSearchCreatedTo');
      this.createdToDate = new Date(this.createdToDate);
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
    }


    let varcreatedFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
    let varcreatedToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
    this.searchdeliveryorderreqmodel.fromDateSearch = varcreatedFromDate;
    this.searchdeliveryorderreqmodel.toDateSearch = varcreatedToDate;
    this.loadDO();
  }

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['IDO_TYPE', 'DO_TRADE_TYPE', 'DELIVERY_TO', 'IDO_STATUS'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {


            if (this.definedSetListModel[i].definedSetName == 'IDO_TYPE') {
              this.doTypeList = this.definedSetListModel[i].definedSetValues;
              /* change --select-- to All */
              if (this.doTypeList.length > 0 && this.doTypeList[0].definedSetValueCode == '') {
                this.doTypeList[0].definedSetValueIntMessage = 'All';
              }
            }
            if (this.definedSetListModel[i].definedSetName == 'DO_TRADE_TYPE') {
              this.tradeTypeList = this.definedSetListModel[i].definedSetValues;
              /* change --select-- to All */
              if (this.tradeTypeList.length > 0 && this.tradeTypeList[0].definedSetValueCode == '') {
                this.tradeTypeList[0].definedSetValueIntMessage = 'All';
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'DELIVERY_TO') {
              this.delivaryToList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'IDO_STATUS') {
              this.statusList = this.definedSetListModel[i].definedSetValues;
            }
          }
        },
        error => {
          //Show error message
        });
  }

  getLocation() {
    this.deliveryorderservicesprovider.getPortMaster(this.deliveryorderreqmodel, false)
      .subscribe(response => {
          this.deliveryorderreqmodel = <DeliveryorderreqModel>response;
          this.locations = this.deliveryorderreqmodel.portsMaster;
          if (this.locations && this.locations.length > 0) {
            this.locations.unshift("--Select--");
          }
          else {
            this.locations[0] = "--Select--";
          }

        },
        error => {

        });
  }

  loadDO() {
    this.doreqmodel = JSON.parse(JSON.stringify(this.searchdeliveryorderreqmodel));
    if (this.searchdeliveryorderreqmodel.dORequestNoSearch && this.searchdeliveryorderreqmodel.dORequestNoSearch.length > 0) {
      this.doreqmodel.portSearch = "";
      this.doreqmodel.terminalSearch = "";
      this.doreqmodel.agentDoNoSearch = "";
      this.doreqmodel.rotationNoSearch = "";
      this.doreqmodel.mRNNumberSearch = "";
      this.doreqmodel.houseBillofLadingSearch = "";
      this.doreqmodel.billofLadingNumberSearch = "";
      this.doreqmodel.containerNoSearch = "";
      this.doreqmodel.frieghtForwarderSearch = "";
      this.doreqmodel.consigneeSearch = "";
      this.doreqmodel.cFSSearch = "";
      this.doreqmodel.emptyYardSearch = "";
      this.doreqmodel.toDateSearch = "";
      this.doreqmodel.fromDateSearch = "";
      if (this.doTypeList && this.doTypeList.length > 0) {
        this.doreqmodel.dOtypeSearch = this.doTypeList[0].definedSetValueCode;
      }
      if (this.tradeTypeList && this.tradeTypeList.length > 0) {
        this.doreqmodel.tradeTypeSearch = this.tradeTypeList[0].definedSetValueCode;
      }
      if (this.delivaryToList && this.delivaryToList.length > 0) {
        this.doreqmodel.deliveryToSearch = this.delivaryToList[0].definedSetValueCode;
      }
      if (this.statusList && this.statusList.length > 0) {
        this.doreqmodel.statusSearch = this.statusList[0].definedSetValueCode;
      }

    }
    this.deliveryorderservicesprovider.getDeliveryOrderResults(this.doreqmodel)
      .subscribe(response => {
        this.searchdeliveryorderresplistmodel = <SearchdeliveryorderresplistModel>response;
        this.searchresults = this.searchdeliveryorderresplistmodel.list;
        console.log(this.searchresults);
        if (this.searchresults.length == 0) {
          this.empty = true;
          this.presentAlert("ALERT", 'No data found for current filter.');
        }
        else {
          this.empty = false;
          if (this.doSortModel) {
            this.selectedTitle = this.doSortModel.sortOption ? this.doSortModel.sortOption : 'dorequestno';
            this.ascending = this.doSortModel.sortOrder == false  ? false : true;
          } else {
            this.ascending = false;
          }
          this.content.scrollToTop(0);
          this.asc();
        }
      })
  }

  showdetails(s) {
    this.navCtrl.push(DosearchsummaryPage, {
      DOrequestno: s.dORequestNoSearch,
      DOagentno: s.agentDoNoSearch,
      DOrotateno: s.rotationNumberSearch,
      DObolno: s.billofLadingNumberSearch,
      DOmrnno: s.mRNNumberSearch,
      DOtype: s.dOtypeSearch,
      DOTradeType: s.tradeTypeSearch,
      DOcreateddate: s.createdDate,
      DOvaliditydate: s.doValidityDate,
      DOstatus: s.statusSearch,
      DOstatus_icon: this.getStatusIcon(s),
      filter: this.searchdeliveryorderreqmodel
    });
  }

  /*Sort functionality*/
  presentSortPopover(myEvent) {
    this.doSortModel.fromSort = false;
    this.navCtrl.push(DosortPage, {
      sortModel: this.doSortModel,
    });
  }

  asc() {

    if (this.selectedTitle != "") {
      if (this.selectedTitle == 'dotype') {
        this.searchresults = sortArray(this.searchresults, "dOtypeSearch", this.ascending);
      }
      else if (this.selectedTitle == 'dorequestno') {
        this.searchresults = sortNumberArray(this.searchresults, "dORequestNoSearch", this.ascending);
      }
      else if (this.selectedTitle == 'agentrefno') {
        this.searchresults = sortArray(this.searchresults, "agentDoNoSearch", this.ascending);
      }
      else if (this.selectedTitle == 'rotationno') {
        this.searchresults = sortNumberArray(this.searchresults, "rotationNumberSearch", this.ascending);
      }
      else if (this.selectedTitle == 'mrnno') {
        this.searchresults = sortArray(this.searchresults, "mRNNumberSearch", this.ascending);
      }
      else if (this.selectedTitle == 'housebill') {
        this.searchresults = sortArray(this.searchresults, "houseBillofLadingSearch", this.ascending);
      }
      else if (this.selectedTitle == 'billlandingno') {
        this.searchresults = sortArray(this.searchresults, "billofLadingNumberSearch", this.ascending);
      }
      else if (this.selectedTitle == 'status') {
        this.searchresults = sortArray(this.searchresults, "statusSearch", this.ascending);
      }
      else if (this.selectedTitle == 'validitydate') {
        this.searchresults = sortDateArray(this.searchresults, "doValidityDate", this.ascending);
      }
      else if (this.selectedTitle == 'createddate') {
        this.searchresults = sortDateArray(this.searchresults, "createdDate", this.ascending);
      }
      this.lengthofmainarray = this.searchresults.length;

    }
    console.log('lengthofmainarray ' + this.lengthofmainarray);
  }

  presentFilterPopover(myEvent) {
    this.navCtrl.push(DosearchPage, {
      filter: this.searchdeliveryorderreqmodel,
      locations: this.locations,
      doTypeList: this.doTypeList,
      statusList: this.statusList,
      tradeTypeList: this.tradeTypeList,
      delivaryToList: this.delivaryToList
    });
  }

  getStatusIcon(s) {
    switch (s.statusSearch) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Active Pending':
        return "assets/img/pending.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated Out':
        return "assets/img/partial gated out.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Cancel Pending':
        return "assets/img/pending.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  getStyle(s) {
    return '#808080';
  }

  openDOCreate() {
    this.navCtrl.push(DocreatePage);
  }

  cancelDO(selDO) {
    let deliveryorderreq: DeliveryorderreqModel = new DeliveryorderreqModel();
    deliveryorderreq.deliveryOrderNo = selDO.dORequestNoSearch;
    let alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: 'This action will cancel the Delivery Order. Do you want to proceed?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.deliveryorderservicesprovider.getDOdetails(deliveryorderreq)
              .subscribe(response => {
                  this.deliveryorderreqmodel = <DeliveryorderreqModel>response;
                  this.deliveryorderservicesprovider.CancelDO(this.deliveryorderreqmodel, false)
                    .subscribe(response => {
                        this.deliveryorderreqmodel = <DeliveryorderreqModel>response;
                        this.loadDO();
                      },
                      error => {

                      });
                },
                error => {
                });
          }
        }, {
          text: 'CANCEL',
          handler: () => {
          },
        }]

    });
    alert.present();
  }

  hideCancelButton(selDO) {
    if (selDO.statusSearch == "Cancelled" || selDO.statusSearch == "Completed"
      || selDO.statusSearch == "Cancel Pending" || selDO.statusSearch == "Partial Gated Out") {
      return true;
    }
    else {
      return false;
    }
  }

  hideEditOption(selDO): boolean {
    if (selDO.statusSearch == "Cancelled" || selDO.statusSearch == "Completed") {
      return true;
    }
    else {
      return false;
    }
  }

  onViewClick(selDO) {
    this.navCtrl.push(DosearchdetailviewPage, {DOrequestno: selDO.dORequestNoSearch});
  }

  onEditClick(selDO) {
    this.navCtrl.push(DosearchdetailviewPage, {DOrequestno: selDO.dORequestNoSearch, mode: 'edit'});
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}
