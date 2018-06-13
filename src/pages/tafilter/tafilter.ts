import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ContainerAcceptanceModel} from "../../shared/model/containeracceptance/containeracceptance.model";
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {TaSearchSOModel} from "../../shared/model/ta/taSearchSO.model";
import {SubLocationMasterModel, SubLocationMasterReqModel} from "../../shared/model/sublocationmaster.model";
import {DatePipe} from "@angular/common";
import {DeliveryToSearchResultListSO, DeliveryToSearchSOModel} from "../../shared/model/ta/deliveryToSearchSO.model";
import {TaTruckRegListSOModel, TaTruckRegSOModel} from "../../shared/model/ta/tatruckregso.model";
import {RotationNoSearchReqModel} from "../../shared/model/ta/rotationnosearch/rotationnosearchreq.model";
import {RotationNoSearchResultList} from "../../shared/model/ta/rotationnosearch/rotationnosearchresultlist.model";
import {RotationNoSearchResultModel} from "../../shared/model/ta/rotationnosearch/rotationnosearchresult.model";
import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";

/**
 * Generated class for the TafilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tafilter',
  templateUrl: 'tafilter.html',
  providers: [Utils]

})
export class TafilterPage {

  public taSearchRequest: TaSearchSOModel;
  public transporterCompanyArray: DeliveryToSearchSOModel[];
  public truckNumberArray: TaTruckRegSOModel[];
  public driverNameArray: TaTruckRegSOModel[];
  public shippingLineArray: DeliveryToSearchSOModel[];
  public rotationNumberArray: RotationNoSearchResultModel[];
  verifyValidTransporterCompany: boolean = false;
  verifyValidTruckNumber: boolean = false;
  verifyValidDriverName: boolean = false;
  verifyValidShippingLine: boolean = false;
  verifyValidRotationNumber: boolean = false;
  dateFormat: string = 'DD/MM/YYYY';
  locationList: any[] = [];
  moveTypeList: any[] = [];
  statusList: any[] = [];
  spNameList: any[] = [];
  filterTransporterCompanyArray: any;
  filterTruckNumberArray: any;
  filterDriverNameArray: any;
  filterShippingLineArray: any;
  filterRotationNumberArray: any;
  showTransporterCompany: boolean = false;
  showTruckNumber: boolean = false;
  showDriverName: boolean = false;
  showShipperLine: boolean = false;
  showrotationNumber: boolean = false;
  maxvalue: any;
  loc: any;
  appointmentNo: any;
  agentReferenceNo: any;
  containerNo: any;
  containerAcceptanceNo: any;
  deliveryOrderNo: any;
  containerReleaseNo: any;
  spname: any;
  createdFromDate: any;
  createdToDate: any;
  transporterCompany: any;
  truckNumber: any;
  driverName: any;
  shippingLine: any;
  rotationNumber: any;
  selectedMovetype: any;
  selectedStatus: any;
  spNameModel: SubLocationMasterModel[] = [];
  agentReferenceNoErrormsg: string;
  containerNoErrormsg: string;
  alertMsg: string;
  alertButtonOk: string;
  alertButtonDismiss: string;
  alerttitle: string;
  attensiontitle: string;
  submit: boolean = false;


  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public datepipe: DatePipe,
              public keyboard: Keyboard,
              public utils: Utils,
              private alertCtrl: AlertController,
              private taProvider: TruckappointmentserviceProvider) {

    this.locationList = this.navParams.get('locationList');
    this.moveTypeList = this.navParams.get('moveTypeList');
    this.statusList = this.navParams.get('statusTypeList');
    this.taSearchRequest = this.navParams.get('filter');

    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.alertButtonDismiss = this.utils.getLocaleString("ca_dismiss_txt");
    this.alerttitle = this.utils.getLocaleString("ca_alert");
    this.attensiontitle = this.utils.getLocaleString("attention");

    this.loc = this.taSearchRequest.locationSearch;
    this.spname = this.taSearchRequest.serviceProviderSearch;
    this.selectedMovetype = this.taSearchRequest.moveTypeSearch;
    this.selectedStatus = this.taSearchRequest.statusSearch;
    this.appointmentNo = this.taSearchRequest.appointmentNoSearch;
    this.agentReferenceNo = this.taSearchRequest.agentReferenceNoSearch;
    this.transporterCompany = this.taSearchRequest.trasporterCompany;
    this.truckNumber = this.taSearchRequest.truckNumberSearch;
    this.driverName = this.taSearchRequest.driverName;
    this.containerNo = this.taSearchRequest.containerNumberSearch;
    this.shippingLine = this.taSearchRequest.shippingLineSearch;
    this.rotationNumber = this.taSearchRequest.rotationNumberSearch;
    this.containerAcceptanceNo = this.taSearchRequest.containerAcceptancenoSearch;
    this.deliveryOrderNo = this.taSearchRequest.doNoSearch;
    this.containerReleaseNo = this.taSearchRequest.crNoSearch;

    if (this.agentReferenceNo == null) {
      this.agentReferenceNo = "";
    }
    if (this.containerNo == null) {
      this.containerNo = "";
    }
    if (this.loc == null || this.loc == "") {
      if (this.locationList && this.locationList.length > 0) {
        this.loc = this.locationList[0];
      }
    }
    else {
      this.getServiceProviderName();
    }

    if (this.spname == null || this.spname == "") {
      if (this.spNameList && this.spNameList.length > 0) {
        this.spname = this.spNameList[0];
      }
      else {
        this.spNameList[0] = "--Select--";
        this.spname = this.spNameList[0];
      }
    }

    if (this.selectedMovetype == null || this.selectedMovetype == "") {
      if (this.moveTypeList && this.moveTypeList.length > 0) {
        this.selectedMovetype = this.moveTypeList[0].definedSetValueCode;
      }
    }

    if (this.selectedStatus == null || this.selectedStatus == "") {
      if (this.statusList && this.statusList.length > 0) {
        this.selectedStatus = this.statusList[0].definedSetValueCode;
      }
    }
    this.maxvalue = new Date().toISOString();

  }

  ionViewWillEnter() {
    if (null == localStorage.getItem('taCreatedFrom') || ("" == localStorage.getItem('taCreatedFrom'))) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
    }
    else {
      this.createdFromDate = localStorage.getItem('taCreatedFrom');
      this.createdFromDate = new Date(this.createdFromDate);
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    }
    if (null == localStorage.getItem('taCreatedTo') || ("" == localStorage.getItem('taCreatedTo'))) {
      this.createdToDate = new Date().toISOString();
    }
    else {
      this.createdToDate = localStorage.getItem('taCreatedTo');
      this.createdToDate = new Date(this.createdToDate);
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
    }
    this.content.scrollToTop(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TafilterPage');
  }

  getServiceProviderName() {
    let listAllspName: Array<any> = [];
    let spModel = new SubLocationMasterReqModel();
    if (this.loc == "--Select--") {
      spModel.location = "";
    }
    else {
      spModel.location = this.loc;
    }
    /*spModel.action = "SEARCH";*/
    this.taProvider.getSpNameMaster(spModel)
      .subscribe(response => {
          this.spNameModel = <SubLocationMasterModel[]>response;
          for (let i = 0; i < this.spNameModel.length; i++) {
            if (this.spNameModel[i].spSubLocationName.trim().length > 0) {
              listAllspName.push(this.spNameModel[i].spSubLocationName);
            }
          }
          this.spNameList = Array.from(new Set(listAllspName));
          if (this.spNameList && this.spNameList.length > 0) {
            this.spNameList.unshift("--Select--");
          }
          else {
            this.spNameList[0] = "--Select--";
          }
        },
        error => {
          //Show error message
        });

    if (this.spNameList && this.spNameList.length > 0) {
      this.spname = this.spNameList[0];
    }
  }

  getTransporterCompany(ev: any) {
    this.filterTransporterCompanyArray = this.transporterCompanyArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.transporterCompany;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterTransporterCompanyArray = this.filterTransporterCompanyArray.filter((item) => {
        if (item.companyName.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showTransporterCompany = true;
        }
        return (item.companyName.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showTransporterCompany = false;
    }
  }

  getTransporterCompanyMaster() {
    this.verifyValidTransporterCompany = true;
    this.transporterCompanyArray = [];
    let deliveryToSearchReq = new DeliveryToSearchSOModel();
    this.taProvider.getTransporterCompanyMaster(deliveryToSearchReq)
      .subscribe(responseList => {
          let transporterCompanyList = <DeliveryToSearchResultListSO>responseList;
          this.transporterCompanyArray = transporterCompanyList.list;
          if (this.verifyValidTransporterCompany) {
            this.getTransporterCompany(null);
          }
        },
        error => {

        })
  }

  hideTransporterCompany() {
    setTimeout(() => {
      if (this.validate(this.transporterCompany, '[0-9a-zA-Z ]{0,255}$')) {
        this.transporterCompany = '';
        this.presentAlert("ATTENTION", 'Transporter Company is Invalid.');
      }
      this.verifyValidTransporterCompany = false;
      this.showTransporterCompany = false;
    }, 500);

  }

  selectTransporterCompany(item: any) {
    this.verifyValidTransporterCompany = false;
    this.showTransporterCompany = false;
    this.transporterCompany = item.companyName;
  }

  getTruckNmber(ev: any) {
    this.filterTruckNumberArray = this.truckNumberArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.truckNumber;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterTruckNumberArray = this.filterTruckNumberArray.filter((item) => {
        if (item.licensePlateNumber.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showTruckNumber = true;
        }
        return (item.licensePlateNumber.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showTruckNumber = false;
    }
  }

  getTruckNmberMaster() {
    this.verifyValidTruckNumber = true;
    this.truckNumberArray = [];
    let taTruckRegSOReq = new TaTruckRegSOModel();
    this.taProvider.getTransporterTruckSearch(taTruckRegSOReq)
      .subscribe(responseList => {
          let truckNumberList = <TaTruckRegListSOModel>responseList;
          this.truckNumberArray = truckNumberList.list;
          if (this.verifyValidTruckNumber) {
            this.getTruckNmber(null);
          }
        },
        error => {

        })
  }

  hideTruckNmber() {
    setTimeout(() => {
      if (this.validate(this.truckNumber, '^[0-9a-zA-Z]{0,18}$')) {
        this.truckNumber = '';
        this.presentAlert("ATTENTION", 'Truck Number is Invalid.');
      }
      this.verifyValidTruckNumber = false;
      this.showTruckNumber = false;
    }, 500);

  }

  selectTruckNumber(item: any) {
    this.verifyValidTruckNumber = false;
    this.showTruckNumber = false;
    this.truckNumber = item.licensePlateNumber;
  }

  getDriverName(ev: any) {
    this.filterDriverNameArray = this.driverNameArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.driverName;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterDriverNameArray = this.filterDriverNameArray.filter((item) => {
        if (item.name.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showDriverName = true;
        }
        return (item.name.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showDriverName = false;
    }
  }

  getDriverNameMaster() {
    this.verifyValidDriverName = true;
    this.driverNameArray = [];
    let taTruckRegSOReq = new TaTruckRegSOModel();
    this.taProvider.getDriverMaster(taTruckRegSOReq, false)
      .subscribe(responseList => {
          let driverNameList = <TaTruckRegListSOModel>responseList;
          this.driverNameArray = driverNameList.list;
          if (this.verifyValidDriverName) {
            this.getDriverName(null);
          }
        },
        error => {

        })
  }

  hideDriverName() {
    setTimeout(() => {
      if (this.validate(this.driverName, '^[0-9a-zA-Z ]{0,255}$')) {
        this.driverName = '';
        this.presentAlert("ATTENTION", 'Driver Name is Invalid.');
      }
      this.verifyValidDriverName = false;
      this.showDriverName = false;
    }, 500);
  }

  selectDriverName(item: any) {
    this.verifyValidDriverName = false;
    this.showDriverName = false;
    this.driverName = item.name;
  }

  getShippingLine(ev: any) {
    this.filterShippingLineArray = this.shippingLineArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.shippingLine;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterShippingLineArray = this.filterShippingLineArray.filter((item) => {
        if (item.shippingLineCode.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showShipperLine = true;
        }
        return (item.shippingLineCode.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showShipperLine = false;
    }
  }

  getShippingLineMaster() {
    this.verifyValidShippingLine = true;
    this.shippingLineArray = [];
    let deliveryToSearchSOReq = new DeliveryToSearchSOModel();
    this.taProvider.getTransporterShippingLine(deliveryToSearchSOReq)
      .subscribe(responseList => {
          let transporterShippingLineList = <DeliveryToSearchResultListSO>responseList;
          this.shippingLineArray = transporterShippingLineList.list;
          if (this.verifyValidShippingLine) {
            this.getShippingLine(null);
          }
        },
        error => {

        })
  }

  hideShippingLine() {
    setTimeout(() => {
      if (this.validate(this.shippingLine, '^[0-9a-zA-Z]{0,255}$')) {
        this.shippingLine = '';
        this.presentAlert("ATTENTION", 'Shipping Line is Invalid.');
      }
      this.verifyValidShippingLine = false;
      this.showShipperLine = false;
    }, 500);
  }

  selectShippingLine(item: any) {
    this.verifyValidShippingLine = false;
    this.showShipperLine = false;
    this.shippingLine = item.shippingLineCode;
  }

  getRotationNumber(ev: any) {
    this.filterRotationNumberArray = this.rotationNumberArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.rotationNumber;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterRotationNumberArray = this.filterRotationNumberArray.filter((item) => {
        if (item.rotationNo.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showrotationNumber = true;
        }
        return (item.rotationNo.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showrotationNumber = false;
    }
  }

  getRotationNumberMaster() {
    this.verifyValidRotationNumber = true;
    this.rotationNumberArray = [];
    let rotationNoSearchReq = new RotationNoSearchReqModel();
    this.taProvider.getRotationNumberMaster(rotationNoSearchReq)
      .subscribe(responseList => {
          let rotationNoRespList = <RotationNoSearchResultList>responseList;
          this.rotationNumberArray = rotationNoRespList.list;
          if (this.verifyValidRotationNumber) {
            this.getRotationNumber(null);
          }
        },
        error => {

        })
  }

  hideRotationNumber() {
    setTimeout(() => {
      if (this.validate(this.rotationNumber, '^[0-9]{0,18}$')) {
        this.rotationNumber = '';
        this.presentAlert("ATTENTION", 'Rotation No is Invalid.');
      }
      this.verifyValidRotationNumber = false;
      this.showrotationNumber = false;
    }, 500);

  }

  selectRotation(item: any) {
    this.verifyValidRotationNumber = false;
    this.showrotationNumber = false;
    this.rotationNumber = item.rotationNo;
  }

  reset() {
    if (this.locationList && this.locationList.length > 0) {
      this.loc = this.locationList[0];
    }
    if (this.spNameList && this.spNameList.length > 0) {
      this.spname = this.spNameList[0];
    }
    this.appointmentNo = "";
    this.agentReferenceNo = "";
    this.transporterCompany = "";
    this.truckNumber = "";
    this.driverName = "";
    this.containerNo = "";
    this.shippingLine = "";
    this.rotationNumber = "";
    this.containerAcceptanceNo = "";
    this.deliveryOrderNo = "";
    this.containerReleaseNo = "";
    if (this.moveTypeList && this.moveTypeList.length > 0) {
      this.selectedMovetype = this.moveTypeList[0].definedSetValueCode;
    }
    if (this.statusList && this.statusList.length > 0) {
      this.selectedStatus = this.statusList[0].definedSetValueCode;
    }
    this.createdFromDate = new Date();
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    this.createdToDate = new Date().toISOString();
    this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
  }

  showTaResults() {
    this.submit = true;
    let fromDate: Date = new Date(this.createdFromDate);
    let toDate: Date = new Date(this.createdToDate);
    if (fromDate > toDate) {
      this.showAlert();
    }
    else {

      if (!(this.fieldsValid(this.agentReferenceNo, '^[0-9a-zA-Z]{0,30}$')) &&
        !(this.fieldsValid(this.transporterCompany, '^[0-9a-zA-Z ]{0,255}$')) &&
        !(this.fieldsValid(this.truckNumber, '^[0-9a-zA-Z]{0,18}$')) &&
        !(this.fieldsValid(this.driverName, '^[0-9a-zA-Z ]{0,255}$')) &&
        !(this.fieldsValid(this.containerAcceptanceNo, '^[0-9]{0,30}$')) &&
        !(this.fieldsValid(this.shippingLine, '^[0-9a-zA-Z]{0,255}$')) &&
        !this.containerNoValid() &&
        !(this.fieldsValid(this.deliveryOrderNo, '^[0-9]{0,30}$')) &&
        !(this.fieldsValid(this.containerReleaseNo, '^[0-9]{0,30}$')) &&
        !(this.validate(this.appointmentNo, '^[0-9]{0,18}$'))) {

        /* if ((this.agentReferenceNo.length == 0 || this.agentReferenceNo.length >= 3) &&
           (this.containerNo.length == 0 || this.containerNo.length >= 10)) {*/
        if (this.loc == "--Select--") {
          this.taSearchRequest.locationSearch = "";
        }
        else {
          this.taSearchRequest.locationSearch = this.loc;
        }
        if (this.spname == "--Select--") {
          this.taSearchRequest.serviceProviderSearch = "";
        }
        else {
          this.taSearchRequest.serviceProviderSearch = this.spname;
        }
        let varcreatedFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
        let varcreatedToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
        this.taSearchRequest.fromDateSearch = varcreatedFromDate;
        this.taSearchRequest.todateSearch = varcreatedToDate;
        if (this.createdFromDate) {
          localStorage.setItem('taCreatedFrom', this.createdFromDate);
        }
        else {
          localStorage.setItem('taCreatedFrom', '');
        }

        if (this.createdToDate) {
          localStorage.setItem('taCreatedTo', this.createdToDate);
        }
        else {
          localStorage.setItem('taCreatedTo', '');
        }
        this.taSearchRequest.appointmentNoSearch = this.appointmentNo;
        this.taSearchRequest.agentReferenceNoSearch = this.agentReferenceNo;
        this.taSearchRequest.trasporterCompany = this.transporterCompany;
        this.taSearchRequest.truckNumberSearch = this.truckNumber;
        this.taSearchRequest.driverName = this.driverName;
        this.taSearchRequest.containerNumberSearch = this.containerNo;
        this.taSearchRequest.shippingLineSearch = this.shippingLine;
        this.taSearchRequest.moveTypeSearch = this.selectedMovetype;
        this.taSearchRequest.rotationNumberSearch = this.rotationNumber;
        this.taSearchRequest.containerAcceptancenoSearch = this.containerAcceptanceNo;
        this.taSearchRequest.doNoSearch = this.deliveryOrderNo;
        this.taSearchRequest.crNoSearch = this.containerReleaseNo;
        this.taSearchRequest.statusSearch = this.selectedStatus;

        this.navCtrl.pop();
      }

    }
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'taappointmentno') {
      this.appointmentNo = e.target.value;
    }
    else if (model == 'taagentreferenceno') {
      this.agentReferenceNo = e.target.value;
    }
    else if (model == 'tatransportercompany') {
      this.transporterCompany = e.target.value;
    }
    else if (model == 'tatruckno') {
      this.truckNumber = e.target.value;
    }
    else if (model == 'tadrivername') {
      this.driverName = e.target.value;
    }
    else if (model == 'tacontainernumber') {
      this.containerNo = e.target.value;
    }
    else if (model == 'tashippingline') {
      this.shippingLine = e.target.value;
    }
    else if (model == 'tarotationnumber') {
      this.rotationNumber = e.target.value;
    }
    else if (model == 'tadonumber') {
      this.deliveryOrderNo = e.target.value;
    }
    else if (model == 'tacontainerreleaseno') {
      this.containerReleaseNo = e.target.value;
    }
    else if (model == 'tacanumber') {
      this.containerAcceptanceNo = e.target.value;
    }
  }

  validate(model, format) {
    if (model != null && model.length > 0) {
      let pattern = new RegExp(format);
      try {
        if (pattern.test(model)) {
          return false;
        }
        else {
          return true;
        }
      } catch (ex) {
        console.log(ex);
      }
    }
    else {
      return false;
    }

  }

  agentreferenceValid() {
    if (this.agentReferenceNo && this.agentReferenceNo.length == 0) {
      return false;
    }
    else if (this.agentReferenceNo && this.agentReferenceNo.length < 3) {
      this.agentReferenceNoErrormsg = this.utils.getLocaleString("enter_3_char");
      return true;
    }
    else {
      if (this.validate(this.agentReferenceNo, '^[0-9a-zA-Z]{0,30}$')) {
        this.agentReferenceNoErrormsg = this.utils.getLocaleString("invalid_characters")
        return true;
      }
      else {
        return false;
      }
    }
  }

  fieldsValid(model, format) {
    if (model && model.length == 0) {
      return false;
    }
    else if (model && model.length < 3) {
      this.agentReferenceNoErrormsg = this.utils.getLocaleString("enter_3_char");
      return true;
    }
    else {
      if (this.validate(model, format)) {
        this.agentReferenceNoErrormsg = this.utils.getLocaleString("invalid_characters")
        return true;
      }
      else {
        return false;
      }
    }
  }

  containerNoValid() {
    if (this.containerNo && this.containerNo.length == 0) {
      return false;
    }
    else if (this.containerNo && this.containerNo.length < 10) {
      this.containerNoErrormsg = this.utils.getLocaleString("enter_10_char");
      return true;
    }
    else {
      if (this.validate(this.containerNo, '^[0-9a-zA-Z]{0,30}$')) {
        this.containerNoErrormsg = this.utils.getLocaleString("invalid_characters")
        return true;
      }
      else {
        return false;
      }
    }
  }

  showAlert() {

    this.alertMsg = this.utils.getLocaleString("cafilteralert");
    const alert = this.alertCtrl.create({
      title: this.alerttitle,
      message: this.alertMsg,
      buttons: [
        {
          text: this.alertButtonOk,
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [this.alertButtonDismiss]
    });
    if(this.navCtrl.getActive().name == "TafilterPage") {
      alert.present();
    }
  }
}
