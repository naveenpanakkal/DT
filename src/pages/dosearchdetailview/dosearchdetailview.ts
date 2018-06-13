import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController, NavParams, Platform, Slides} from 'ionic-angular';
import {DeliveryorderservicesProvider} from "../../providers/webservices/deliveryorderservices";
import {DeliveryorderreqModel} from "../../shared/model/deliveryorder/deliveryorderreq.model";
import {HomePage} from '../home/home';
import {DatePipe} from '@angular/common';
import {ChacoderesplistModel} from "../../shared/model/deliveryorder/chacode/chacoderesplist.model";
import {ChacodeModel} from "../../shared/model/deliveryorder/chacode/chacode.model";
import {DosearchsummaryPage} from "../dosearchsummary/dosearchsummary";
import {Headers} from "@angular/http";
import {DeliveryorderattachModel} from "../../shared/model/deliveryorder/deliveryorderattach.model";
import {Keyboard} from '@ionic-native/keyboard';
import {ContainerdetailsreqModel} from "../../shared/model/deliveryorder/containerdetailsreq.model";
import {Utils} from "../../shared/utils";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DoappendreqModel} from "../../shared/model/deliveryorder/doappendreq.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-dosearchdetailview',
  templateUrl: 'dosearchdetailview.html',
  providers: [DeliveryorderreqModel, DoappendreqModel, Utils]
})
export class DosearchdetailviewPage {

  public containerDetaisAdded = [{}];

  dateFormat: string = "DD/MM/YYYY";

  DOrequestno: any;

  tab1Root: any;

  onlyForCreate: boolean = false;
  dotype: boolean = true;
  billoflandingno: boolean = false;
  importer: boolean = false;
  dodetails: boolean = false;
  containertable: boolean = false;
  cargodetails: boolean = false;
  showAttachments: boolean = false;

  doisEmpty: boolean = false;//Type is Empty
  public showAmendMessage: boolean = false;

  public definedSetListModel: DefinedsetresListModel[];
  deliveryToList: DefinedSetResModel[] = [];

  filterHaulierArray: any;
  filterFrieghtArray: any;
  filterConsigneeArray: any;
  filterCHAArray: any;
  filterCFSArray: any;
  filterEmptyArray: any;
  haulierRespCodeModel: ChacodeModel[];
  frieghtRespCodeModel: ChacodeModel[];
  consigneeRespCodeModel: ChacodeModel[];
  chaRespCodeModel: ChacodeModel[];
  cfsRespCodeModel: ChacodeModel[];
  emptyRespCodeModel: ChacodeModel[];

  housebilloflandingno: boolean = false;

  @ViewChild(Slides) slides: Slides;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public WarningMsg_Refeer:string ="";
  public isConfirmOpen:boolean = false;
  mainArray: any[];
  containerArray: any[];
  cargoArray: any[];

  selectedCategory: any;

  tradetype: boolean = false;
  billlandno: boolean = false;
  frieght: boolean = false;
  empty: boolean = false;
  consignee: boolean = false;
  cha: boolean = false;
  cfs: boolean = false;

  fromHistory: boolean = false;
  editdo: boolean = false;
  viewdo: boolean = false;
  requestno: any;

  deliveryOrderForm1: FormGroup;
  deliveryOrderForm2: FormGroup;
  deliveryOrderForm3: FormGroup;

  mandatory: boolean = false;
  isDeliveryToMandatory: boolean = false;

  deliveryordertype: string;
  mode: any;

  public unregisterBackButtonAction: any;

  showHaulierSug: boolean;
  showFrieghtSug: boolean;
  showCHASug: boolean;
  showCFSSug: boolean;
  showEmptySSug: boolean;
  showConsigneeSug: boolean;

  doRespModel: DeliveryorderreqModel;

  currentdate = new Date().toISOString();

  hideCancelOption: boolean;

  fromSummary: boolean;

  editMode: boolean;
  viewMode: boolean;

  dateHolder: any;

  private alert: any = null;

  doExamination: DefinedSetResModel[] = [];

  attachReceived: DeliveryorderattachModel[];
  attachReceivedTemp: any;
  attachHolder: DeliveryorderattachModel[];
  containerValue: string = "Container";

  @ViewChild('navbar') navBar: Navbar;

  constructor(public keyboard: Keyboard, public navCtrl: NavController,
              public navParams: NavParams,
              public doServiceProvider: DeliveryorderservicesProvider,
              public platform: Platform,
              public deliveryorderreqmodel: DeliveryorderreqModel,
              public doammendreqmodel: DoappendreqModel,
              public alertCtrl: AlertController,
              private commonServices: CommonservicesProvider,
              public datepipe: DatePipe, public utils: Utils, public formBuilder: FormBuilder) {

    this.DOrequestno = this.navParams.get('DOrequestno');

    this.requestno = this.navParams.get('requestNo');
    this.fromHistory = this.navParams.get('fromHistory');

    this.mode = this.navParams.get('mode');
    this.isConfirmOpen = false;
    this.fromSummary = this.navParams.get("fromSummary");

    this.tab1Root = HomePage;
    this.loadDO();
    this.getDefinedSetDoEdit();
    if (this.mode == "edit") {
      this.getHaulierCode();
      this.getCFSFromService();
      this.getCHAFromService();
      this.getConsigneeFromService();
      this.getFrieghtFromService();
      this.getEmptyFromService();
      this.editMode = true;
      this.viewMode = false;
      this.initializeForms();
    }
    else {
      this.viewMode = true;
      this.editMode = false;
    }
  }

  initializeForms() {
    this.deliveryOrderForm1 = this.formBuilder.group({
      dovalidityDate: ['', Validators.compose([Validators.required])],
      doForExam: [''],
      deliveryTo: ['']
    });
    this.deliveryOrderForm2 = this.formBuilder.group({
      ffc: [''],
      consigneeCode: [''],
      cFSCode: [''],
      emptyYardCode: ['']
    });
    this.deliveryOrderForm3 = this.formBuilder.group({

      cHACode: [''],
      haulierCode: [''],
      containerPermitNo: [''],
      containerPermitDate: [''],
      instructionsToOtherParty: ['']
    });
  }

  onSelectionchangeofExamination() {

  }

  getCargoDetails() {
    //It is hardcoded in Web code
    let dummyDetails = [{
      "cargoCommodityCode": "1", "cargoItemDescription": "STANDARD NEWSPRINT 42GSM ,DIA.127 CMS, WIDTH 140 CMS",
      "cargoCommodityQuantity": 100.0, "cargoUnitOfMeasurement": "BAG", "cargoVolumeUnit": "12",
      "cargoWeight": 1000.0, "cargoCountryOfOrigin": null
    },
      {
        "cargoCommodityCode": "2", "cargoItemDescription": "STANDARD NEWSPRINT 62GSM ,DIA.157 CMS, WIDTH 200 CMS",
        "cargoCommodityQuantity": 300.0, "cargoUnitOfMeasurement": "BAG", "cargoVolumeUnit": "20",
        "cargoWeight": 8000.0, "cargoCountryOfOrigin": null
      },
      {
        "cargoCommodityCode": "3", "cargoItemDescription": "STANDARD NEWSPRINT 72GSM ,DIA.757 CMS, WIDTH 500 CMS",
        "cargoCommodityQuantity": 400.0, "cargoUnitOfMeasurement": "BAG", "cargoVolumeUnit": "30",
        "cargoWeight": 6000.0, "cargoCountryOfOrigin": null
      }];
    this.cargoArray = dummyDetails;
  }

  onSelectionchangeofDeliveryTo() {
    /*clearing pre-existing values on selection change*/
    this.deliveryorderreqmodel.emptyYardName = "";
    this.deliveryorderreqmodel.emptyYardCode = "";
    this.deliveryorderreqmodel.cFSName = "";
    this.deliveryorderreqmodel.cFSCode = "";
    this.deliveryorderreqmodel.frieghtForwarderName = "";
    this.deliveryorderreqmodel.frieghtForwarderCode = "";
    this.deliveryorderreqmodel.consigneeName = "";
    this.deliveryorderreqmodel.consigneeCode = "";
  }

  hideCancel() {
    if (this.deliveryorderreqmodel.deliveryOrderStatus == "Cancelled" ||
      this.deliveryorderreqmodel.deliveryOrderStatus == "Completed") {
      return true;
    }
    else {
      return false;
    }
  }

  parsedate(dtstring) {
    if (dtstring != null) {
      let pattern = /(\d{2})(\d{2})(\d{4})/;
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace("/", "");
      let date = new Date(dtstring.replace(pattern, '$3-$2-$1'));
      return date.toISOString();
    }
    else {
      return null;
    }
  }

  public filterData(category): void {
    setTimeout(() => {
      if (this.mode == 'edit') {
        this.editdo = true;
      } else {
        this.viewdo = true;
      }
      if (category.heading == 'Delivery Order Type') {
        this.dotype = true;
        this.billoflandingno = false;
        this.importer = false;
        this.dodetails = false;
        this.containertable = false;
        this.cargodetails = false;
        this.showAttachments = false;
        this.selectedCategory = "Delivery Order Type";
      }
      else if (category.heading == 'Retrieve Bill Of Lading Details') {
        this.dotype = false;
        this.billoflandingno = true;
        this.importer = false;
        this.dodetails = false;
        this.containertable = false;
        this.cargodetails = false;
        this.showAttachments = false;
        this.selectedCategory = "Retrieve Bill Of Lading Details";
      }
      else if (category.heading == 'Bill Of Lading Details') {
        this.dotype = false;
        this.billoflandingno = false;
        this.importer = true;
        this.dodetails = false;
        this.containertable = false;
        this.cargodetails = false;
        this.showAttachments = false;
        this.selectedCategory = "Bill Of Lading Details";
      }
      else if (category.heading == 'Delivery Order Details') {
        this.dotype = false;
        this.billoflandingno = false;
        this.importer = false;
        this.dodetails = true;
        this.containertable = false;
        this.cargodetails = false;
        this.showAttachments = false;
        this.selectedCategory = "Delivery Order Details";
      }
      else if (category.heading == 'Container Table') {
        this.dotype = false;
        this.billoflandingno = false;
        this.importer = false;
        this.dodetails = false;
        this.containertable = true;
        this.cargodetails = false;
        this.showAttachments = false;
        this.selectedCategory = "Container Table";
      }
      else if (category.heading == 'Cargo Details') {
        this.dotype = false;
        this.billoflandingno = false;
        this.importer = false;
        this.dodetails = false;
        this.containertable = false;
        this.cargodetails = true;
        this.showAttachments = false;
        this.selectedCategory = "Cargo Details";
      }
      else {
        this.dotype = false;
        this.billoflandingno = false;
        this.importer = false;
        this.dodetails = false;
        this.containertable = false;
        this.cargodetails = false;
        this.showAttachments = true;
        this.selectedCategory = "Attachments";
      }
      this.slides.slideTo(this.getIDforCategory(this.selectedCategory), 500);
    }, 300);
  }

  resetShowTabs(category_heading: string) {
    if (category_heading == 'Delivery Order Type') {
      this.dotype = true;
      this.billoflandingno = false;
      this.importer = false;
      this.dodetails = false;
      this.containertable = false;
      this.cargodetails = false;
      this.showAttachments = false;
      this.selectedCategory = "Delivery Order Type";
    }
    else if (category_heading == 'Retrieve Bill Of Lading Details') {
      this.dotype = false;
      this.billoflandingno = true;
      this.importer = false;
      this.dodetails = false;
      this.containertable = false;
      this.cargodetails = false;
      this.showAttachments = false;
      this.selectedCategory = "Retrieve Bill Of Lading Details";
    }
    else if (category_heading == 'Bill Of Lading Details') {
      this.dotype = false;
      this.billoflandingno = false;
      this.importer = true;
      this.dodetails = false;
      this.containertable = false;
      this.cargodetails = false;
      this.showAttachments = false;
      this.selectedCategory = "Bill Of Lading Details";

    }
    else if (category_heading == 'Delivery Order Details') {
      this.dotype = false;
      this.billoflandingno = false;
      this.importer = false;
      this.dodetails = true;
      this.containertable = false;
      this.cargodetails = false;
      this.showAttachments = false;
      this.selectedCategory = "Delivery Order Details";
    }
    else if (category_heading == 'Container Table') {
      this.dotype = false;
      this.billoflandingno = false;
      this.importer = false;
      this.dodetails = false;
      this.containertable = true;
      this.cargodetails = false;
      this.showAttachments = false;
      this.selectedCategory = "Container Table";
    }
    else if (category_heading == 'Cargo Details') {
      this.dotype = false;
      this.billoflandingno = false;
      this.importer = false;
      this.dodetails = false;
      this.containertable = false;
      this.cargodetails = true;
      this.showAttachments = false;
      this.selectedCategory = "Cargo Details";
    }
    else {
      this.dotype = false;
      this.billoflandingno = false;
      this.importer = false;
      this.dodetails = false;
      this.containertable = false;
      this.cargodetails = false;
      this.showAttachments = true;
      this.selectedCategory = "Attachments";
    }
  }

  moveToSlide(category_heading: string) {
    this.slides.slideTo(this.getIDforCategory(category_heading), 500);
    this.resetShowTabs(category_heading);
    this.selectedCategory = category_heading;
  }

  getIDforCategory(category_heading: string) {
    for (let indeX = 0; indeX < this.mainArray.length; indeX++) {
      if (this.mainArray[indeX].heading == category_heading) {
        return indeX;
      }
    }
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();
  }

// Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

// Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  ionViewDidLoad() {
    if (this.mode == "edit") {
      this.initializeBackButtonCustomHandler();
      this.navBar.backButtonClick = () => {
        this.onBackAlert();
      }
    }
  }

  attachArrayChanged(): boolean {
    let flag = false;
    if (this.attachReceived.length == this.attachReceivedTemp.length) {
      for (let i = 0; i < this.attachReceived.length; i++) {
        if (this.attachReceivedTemp[i].fileUploadId != this.attachReceived[i].fileUploadId) {
          flag = true;
          break;
        }
      }
    }
    else if (this.attachReceived.length > this.attachReceivedTemp.length) {
      flag = true;
    }
    else if (this.attachReceived.length < this.attachReceivedTemp.length) {
      flag = true;
    }
    return flag;
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      _this.onBackAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  onBackAlert() {
    if (!this.deliveryOrderForm1.dirty && !this.deliveryOrderForm2.dirty && !this.deliveryOrderForm3.dirty &&
      this.containerArray.length == this.deliveryorderreqmodel.delOrdContDetlSO.length && !this.attachArrayChanged()) {
      this.navCtrl.pop();
    } else {
      if (this.alert) {
        this.alert.dismiss();
        this.alert = null;
      } else {
        this.alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'If you continue, your changes will be lost. Do you want to proceed?',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.navCtrl.popTo(DosearchsummaryPage);
            },
          },
            {
              text: 'Cancel',
              handler: () => {
                this.alert = null;
              },
            }]
        });
        this.alert.present();
      }
    }
  }

  showDetails(arr) {
    arr.showDetails = !arr.showDetails;
  }

  ionViewDidLeave() {
    this.fromHistory = false;
  }

  loadDO() {

    if (this.fromHistory) {
      this.deliveryorderreqmodel.deliveryOrderRequestId = this.requestno;
    } else {
      this.deliveryorderreqmodel.deliveryOrderNo = this.DOrequestno;
      this.deliveryorderreqmodel.deliveryOrderRequestId = null;
    }

    this.doServiceProvider.getDOdetails(this.deliveryorderreqmodel)
      .subscribe(response => {
          this.deliveryorderreqmodel = <DeliveryorderreqModel>response;
          this.containerArray = JSON.parse(JSON.stringify(this.deliveryorderreqmodel.delOrdContDetlSO));

          if (this.fromHistory) {
            this.getCargoDetails();
          } else {
            this.cargoArray = this.deliveryorderreqmodel.delOrdCommodtyDetlSO;
          }
          this.deliveryordertype = this.deliveryorderreqmodel.doType;
          this.attachReceived = this.deliveryorderreqmodel.doAttachs;
          this.attachHolder = JSON.parse(JSON.stringify(this.attachReceived));
          if (this.deliveryorderreqmodel.doType == "LCL" ||
            (this.deliveryorderreqmodel.doType == "FCL" && this.deliveryorderreqmodel.tradeType == "Foreign")) {
            this.isDeliveryToMandatory = true;
          } else {
            this.isDeliveryToMandatory = false;
          }
          this.hideshowfields();

          this.selectedCategory = this.mainArray[0].heading;
          this.showLeftButton = false;
          this.showRightButton = this.mainArray.length > 2;
          this.hideCancelOption = this.hideCancel();
          if (this.mode == "edit") {
            if (null != this.deliveryorderreqmodel.dOValidityDate) {
              this.deliveryorderreqmodel.dOValidityDate = this.parsedate(this.deliveryorderreqmodel.dOValidityDate);
            }
            if (null != this.deliveryorderreqmodel.containerPermitDate) {
              this.deliveryorderreqmodel.containerPermitDate = this.parsedate(this.deliveryorderreqmodel.containerPermitDate);
            }
          }
          //console.log(this.attachReceived);
          this.attachReceivedTemp = JSON.parse(JSON.stringify(this.attachReceived));
          console.log("ffry", this.attachReceivedTemp);
        },
        error => {

        });
  }

  onPermitDateSelection() {
    setTimeout(() => {
      let extendedDate = new Date(this.datepipe.transform(this.deliveryorderreqmodel.containerPermitDate));
      let curDate = new Date();
      curDate.setHours(0, 0, 0, 0);
      extendedDate.setHours(0, 0, 0, 0);
      if (extendedDate > curDate) {
        this.deliveryorderreqmodel.containerPermitDate = "";
        this.presentAlert("Attention", 'Container Permit Date cannot be greater than current date.');
      }
    }, 500);
  }

  hideshowfields() {

    if (this.deliveryordertype == 'FCL') {
      this.tradetype = true;
      if (this.deliveryorderreqmodel.tradeType == 'Foreign') {
        let temp = [
          {id: 1, heading: 'Delivery Order Type', showDetails: false},
          {id: 2, heading: 'Retrieve Bill Of Lading Details', showDetails: false},
          {id: 3, heading: 'Bill Of Lading Details', showDetails: false},
          {id: 4, heading: 'Delivery Order Details', showDetails: false},
          {id: 5, heading: 'Container Table', showDetails: false},
          {id: 6, heading: 'Attachments', showDetails: false}
        ];
        this.mainArray = temp;
        this.billlandno = true;
      }
      else if (this.deliveryorderreqmodel.tradeType == 'Coastal') {
        let temp = [
          {id: 1, heading: 'Delivery Order Type', showDetails: false},
          {id: 2, heading: 'Delivery Order Details', showDetails: false},
          {id: 3, heading: 'Container Table', showDetails: false},
          {id: 4, heading: 'Attachments', showDetails: false}
        ];
        this.mainArray = temp;
      }
    }
    else if (this.deliveryordertype == 'LCL') {
      let temp = [
        {id: 1, heading: 'Delivery Order Type', showDetails: false},
        {id: 2, heading: 'Retrieve Bill Of Lading Details', showDetails: false},
        {id: 3, heading: 'Bill Of Lading Details', showDetails: false},
        {id: 4, heading: 'Delivery Order Details', showDetails: false},
        {id: 5, heading: 'Container Table', showDetails: false},
        {id: 6, heading: 'Cargo Details', showDetails: false},
        {id: 7, heading: 'Attachments', showDetails: false}
      ];
      this.mainArray = temp;
      this.housebilloflandingno = true;
    }
    else {
      this.doisEmpty = true;
      let temp = [
        {id: 1, heading: 'Delivery Order Type', showDetails: false},
        {id: 2, heading: 'Delivery Order Details', showDetails: false},
        {id: 3, heading: 'Container Table', showDetails: false},
        {id: 4, heading: 'Attachments', showDetails: false}
      ];
      this.mainArray = temp;
    }
  }

  getStatusIcon() {
    switch (this.doRespModel.deliveryOrderStatus) {
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

  getDeliveryType(index: number): boolean {
    if (this.deliveryToList && this.deliveryToList.length > 0
      && this.deliveryorderreqmodel.deliveryTo &&
      this.deliveryorderreqmodel.deliveryTo == this.deliveryToList[index].definedSetValueCode) {

      return true;
    } else {
      return false;
    }
  }

  setValidationtoForms() {
    if (this.deliveryorderreqmodel.doType == "LCL" ||
      (this.deliveryorderreqmodel.doType == "FCL" && this.deliveryorderreqmodel.tradeType == "Foreign")) {
      this.deliveryOrderForm1.controls["deliveryTo"].setValue(this.deliveryorderreqmodel.deliveryTo);
      this.deliveryOrderForm1.controls["deliveryTo"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderForm1.controls["deliveryTo"].enable();
    } else {
      this.deliveryOrderForm1.controls["deliveryTo"].clearValidators();
      this.deliveryOrderForm1.controls["deliveryTo"].enable();
    }

    this.deliveryOrderForm1.controls["dovalidityDate"].setValue(this.deliveryorderreqmodel.dOValidityDate);

    if (this.getDeliveryType(1)) {
      this.deliveryOrderForm2.controls["ffc"].setValue(this.deliveryorderreqmodel.frieghtForwarderCode);
      this.deliveryOrderForm2.controls["ffc"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderForm2.controls["ffc"].enable();
      this.deliveryOrderForm2.controls["consigneeCode"].clearValidators();
      this.deliveryOrderForm2.controls["consigneeCode"].disable();
      this.deliveryOrderForm2.controls["cFSCode"].clearValidators();
      this.deliveryOrderForm2.controls["cFSCode"].disable();
      this.deliveryOrderForm2.controls["emptyYardCode"].clearValidators();
      this.deliveryOrderForm2.controls["emptyYardCode"].disable();
    } else if (this.getDeliveryType(2)) {
      this.deliveryOrderForm2.controls["consigneeCode"].setValue(this.deliveryorderreqmodel.consigneeCode);
      this.deliveryOrderForm2.controls["consigneeCode"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderForm2.controls["consigneeCode"].enable();
      this.deliveryOrderForm2.controls["ffc"].clearValidators();
      this.deliveryOrderForm2.controls["ffc"].disable();
      this.deliveryOrderForm2.controls["cFSCode"].clearValidators();
      this.deliveryOrderForm2.controls["cFSCode"].disable();
      this.deliveryOrderForm2.controls["emptyYardCode"].clearValidators();
      this.deliveryOrderForm2.controls["emptyYardCode"].disable();

    } else if (this.getDeliveryType(3)) {
      this.deliveryOrderForm2.controls["cFSCode"].setValue(this.deliveryorderreqmodel.cFSCode);
      this.deliveryOrderForm2.controls["cFSCode"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderForm2.controls["cFSCode"].enable();
      this.deliveryOrderForm2.controls["consigneeCode"].clearValidators();
      this.deliveryOrderForm2.controls["consigneeCode"].disable();
      this.deliveryOrderForm2.controls["ffc"].clearValidators();
      this.deliveryOrderForm2.controls["ffc"].disable();
      this.deliveryOrderForm2.controls["emptyYardCode"].clearValidators();
      this.deliveryOrderForm2.controls["emptyYardCode"].disable();
    } else if (this.getDeliveryType(4)) {
      this.deliveryOrderForm2.controls["emptyYardCode"].setValue(this.deliveryorderreqmodel.emptyYardCode);
      this.deliveryOrderForm2.controls["emptyYardCode"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderForm2.controls["emptyYardCode"].enable();
      this.deliveryOrderForm2.controls["consigneeCode"].clearValidators();
      this.deliveryOrderForm2.controls["consigneeCode"].disable();
      this.deliveryOrderForm2.controls["cFSCode"].clearValidators();
      this.deliveryOrderForm2.controls["cFSCode"].disable();
      this.deliveryOrderForm2.controls["ffc"].clearValidators();
      this.deliveryOrderForm2.controls["ffc"].disable();
    } else {

      this.deliveryOrderForm2.controls["consigneeCode"].clearValidators();
      this.deliveryOrderForm2.controls["consigneeCode"].enable();
      this.deliveryOrderForm2.controls["cFSCode"].clearValidators();
      this.deliveryOrderForm2.controls["cFSCode"].enable();
      this.deliveryOrderForm2.controls["emptyYardCode"].clearValidators();
      this.deliveryOrderForm2.controls["emptyYardCode"].enable();
      this.deliveryOrderForm2.controls["ffc"].clearValidators;
      this.deliveryOrderForm2.controls["ffc"].enable();
      this.deliveryOrderForm2.controls["ffc"].clearValidators();
      this.deliveryOrderForm2.controls["ffc"].disable();
    }

    this.deliveryOrderForm1.updateValueAndValidity();
    this.deliveryOrderForm2.updateValueAndValidity();
  }

  /*to edit an existing Delivery order*/
  doEditSubmit() {
    this.setValidationtoForms();
    if (!(this.deliveryOrderForm1.valid && this.deliveryOrderForm2.valid && this.deliveryOrderForm3.valid)) {
      this.mandatory = true;
      this.presentAlert("Attention", 'Enter All mandatory fields.');
      this.moveToSlide("Delivery Order Details");
      return;
    }
    if (null == this.deliveryorderreqmodel.dOValidityDate) {
      this.presentAlert("Attention", 'Enter All mandatory fields.');
      this.moveToSlide("Delivery Order Details");
    }
    else {
      let extendedDate = new Date(this.datepipe.transform(this.deliveryorderreqmodel.dOValidityDate));
      let curDate = new Date();
      curDate.setHours(0, 0, 0, 0);
      extendedDate.setHours(0, 0, 0, 0);
      if (extendedDate < curDate) {
        this.deliveryorderreqmodel.dOValidityDate = "";
        this.mandatory = true;
        this.setValidationtoForms();
        this.presentAlert("Attention", 'Enter All mandatory fields.');
        this.moveToSlide("Delivery Order Details");
        this.deliveryorderreqmodel.dOValidityDate = "";
      }
      else if ((this.deliveryorderreqmodel.deliveryTo == 'Empty Yard') && ('' == this.deliveryorderreqmodel.emptyYardCode)) {
        this.presentAlert("Attention", 'Empty Yard Code is empty.');
        this.moveToSlide("Delivery Order Details");
      }
      else if ((this.deliveryorderreqmodel.deliveryTo == 'CFS') && ('' == this.deliveryorderreqmodel.cFSCode)) {
        this.presentAlert("Attention", 'CFS Code is empty.');
        this.moveToSlide("Delivery Order Details");
      }
      else if ((this.deliveryorderreqmodel.deliveryTo == 'Consignee') && ('' == this.deliveryorderreqmodel.consigneeCode)) {
        this.presentAlert("Attention", 'Consignee Code is empty.');
        this.moveToSlide("Delivery Order Details");
      }
      else if ((this.deliveryorderreqmodel.deliveryTo == 'Freight Forwarder') &&
        ('' == this.deliveryorderreqmodel.frieghtForwarderCode)) {
        this.presentAlert("Attention", 'Freight Forwarder Code is empty.');
        this.moveToSlide("Delivery Order Details");
      }
      else if (this.attachReceived.find(element => !element.fileUploadId)) {
        this.presentAlert("Attention", 'Attachments are missing. ');
      }
      else {
        let alert = this.alertCtrl.create({
          title: 'CONFIRM BOX',
          subTitle: 'Do you want to submit your request?',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.proceedWithEdit();
              }
            }, {
              text: 'CANCEL',
              handler: () => {
              },
            }]
        });
        alert.present();
      }
    }
  }

  proceedWithEdit() {
    this.deliveryorderreqmodel.delOrdContDetlSO = this.containerArray;
    this.deliveryorderreqmodel.totalNoOfContainers = this.containerArray.length;
    this.dateHolder = this.deliveryorderreqmodel.dOValidityDate;

    this.deliveryorderreqmodel
      .dOValidityDate = this.datepipe.transform(this.deliveryorderreqmodel.dOValidityDate, 'dd/MM/yyyy');

    this.deliveryorderreqmodel.dOValidityDate = this.deliveryorderreqmodel.dOValidityDate;

    if (null != this.deliveryorderreqmodel.containerPermitDate) {
      this.deliveryorderreqmodel
        .containerPermitDate = this.datepipe.transform(this.deliveryorderreqmodel.containerPermitDate, 'dd/MM/yyyy');
    }
    this.deliveryorderreqmodel.doAttachs = this.attachReceived;
    this.deliveryorderreqmodel.deliveryOrderRequestId = null;

    if (this.deliveryorderreqmodel.delOrdCommodtyDetlSO) {
      if (this.deliveryorderreqmodel.delOrdCommodtyDetlSO[this.deliveryorderreqmodel.delOrdCommodtyDetlSO.length - 1]) {
        this.doammendreqmodel.cargoCommodityCode =
          this.deliveryorderreqmodel.delOrdCommodtyDetlSO[this.deliveryorderreqmodel.delOrdCommodtyDetlSO.length - 1].cargoCommodityCode;
        this.doammendreqmodel.cargoItemDescription =
          this.deliveryorderreqmodel.delOrdCommodtyDetlSO[this.deliveryorderreqmodel.delOrdCommodtyDetlSO.length - 1].cargoItemDescription;
      }
    }

    delete this.deliveryorderreqmodel.delOrdCommodtyDetlSO;

    this.doammendreqmodel = this.deliveryorderreqmodel as DoappendreqModel;


    this.doServiceProvider.editDO(this.doammendreqmodel)
      .subscribe(response => {
          this.doRespModel = <DeliveryorderreqModel>response;
          if (null != this.doRespModel.deliveryOrderRequestId) {
            if (true == this.fromSummary) {
              localStorage.setItem('do_showAmendMessage', "true");
              localStorage.setItem('do_status', this.doRespModel.deliveryOrderStatus);
              localStorage.setItem('do_validityDate', this.doRespModel.dOValidityDate);
              localStorage.setItem('do_totalcontainers', this.doRespModel.totalNoOfContainers.toString());
              this.navCtrl.pop();
            } else {
              this.navCtrl.push(DosearchsummaryPage, {
                DOrequestno: this.doRespModel.deliveryOrderNo,
                DOagentno: this.doRespModel.agentDoNumber,
                DOrotateno: this.doRespModel.rotationNo,
                DObolno: this.doRespModel.billofLadingNo,
                DOvaliditydate: this.doRespModel.dOValidityDate,
                DOstatus: this.doRespModel.deliveryOrderStatus,
                DOcreateddate: this.doRespModel.createdDate,
                DOtype: this.doRespModel.doType,
                DOTradeType: this.doRespModel.tradeType,
                DOstatus_icon: this.getStatusIcon(),
                DOtotalcontainers: this.doRespModel.totalNoOfContainers.toString(),
                isFromAmend: true
              });
            }
          }
        },
        error => {
          let errormessage = error[0].message
          for (let j = 1; j < error.length; j++) {
            errormessage = errormessage + '\n' + error[j].message;
          }
          this.presentAlert('ALERT', errormessage);
          this.deliveryorderreqmodel.dOValidityDate = this.dateHolder;
        })
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'deliveryorderreqmodel.haulierCode') {
      this.deliveryorderreqmodel.haulierCode = e.target.value;
    }
    else if (model == 'deliveryorderreqmodel.consigneeCode') {
      this.deliveryorderreqmodel.consigneeCode = e.target.value;
    }
    else if (model == 'deliveryorderreqmodel.frieghtForwarderCode') {
      this.deliveryorderreqmodel.frieghtForwarderCode = e.target.value;
    }
    else if (model == 'deliveryorderreqmodel.consigneeCode') {
      this.deliveryorderreqmodel.consigneeCode = e.target.value;
    }
    else if (model == 'deliveryorderreqmodel.cFSCode') {
      this.deliveryorderreqmodel.cFSCode = e.target.value;
    }
    else if (model == 'deliveryorderreqmodel.emptyYardCode') {
      this.deliveryorderreqmodel.emptyYardCode = e.target.value;
    }
    else if (model == 'deliveryorderreqmodel.cHACode') {
      this.deliveryorderreqmodel.cHACode = e.target.value;
    }
    else if (model == 'containerPermitNo') {
      this.deliveryorderreqmodel.containerPermitNo = e.target.value;
    }
  }

  getItems(ev: any) {
    this.filterHaulierArray = this.haulierRespCodeModel;
    this.deliveryorderreqmodel.haulierName = '';
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterHaulierArray = this.filterHaulierArray.filter((item) => {
        if (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showHaulierSug = true;
        }
        return (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase()));
      })
    } else {
      this.showHaulierSug = false;
    }
  }

  getHaulierCode() {

    let haulierCodeModel: ChacodeModel;
    let haulierCodeModelList: ChacoderesplistModel;
    haulierCodeModel = new ChacodeModel;
    this.haulierRespCodeModel = new Array<ChacodeModel>();
    haulierCodeModel.companyCode = '';
    haulierCodeModel.companyName = '';
    this.doServiceProvider.getHaulierCode(haulierCodeModel)
      .subscribe(response => {
          haulierCodeModelList = <ChacoderesplistModel>response;
          this.haulierRespCodeModel = haulierCodeModelList.list;
        },
        error => {

        });
  }

  onSelectHaulierCode(item: any) {
    this.deliveryorderreqmodel.haulierCode = item.companyCode;
    this.deliveryorderreqmodel.haulierName = item.companyName;
    this.showHaulierSug = false;
  }

  hideHaulierSuggestion(ev: any) {
    if (this.validate(this.deliveryorderreqmodel.haulierCode, '^[a-z0-9A-Z]{0,30}$')) {
      this.deliveryorderreqmodel.haulierCode = "";
      this.presentAlert("Attention", 'Haulier Company Code is Invalid.');
      return;
    }
    let val = ev.value;
    if (val.length > 0) {
      setTimeout(() => {
        let haulierCodeModel: ChacodeModel;
        let haulierCodeModelList: ChacoderesplistModel;
        let searchResp: ChacodeModel;
        searchResp = new ChacodeModel;
        let chacodeModelArray: ChacodeModel[];
        chacodeModelArray = new Array<ChacodeModel>();
        haulierCodeModel = new ChacodeModel;
        haulierCodeModel.companyCode = this.deliveryorderreqmodel.haulierCode;
        haulierCodeModel.companyName = '';
        this.doServiceProvider.getHaulierCode(haulierCodeModel)
          .subscribe(response => {
              haulierCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = haulierCodeModelList.list;
              if (chacodeModelArray.length == 0) {
                this.deliveryorderreqmodel.haulierCode = '';
                this.deliveryorderreqmodel.haulierName = '';
                this.presentAlert("Attention", 'Haulier Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(element =>
                  element.companyCode.toString().toLowerCase() == this.deliveryorderreqmodel.haulierCode.toString().toLowerCase())
                if (!searchResp) {
                  this.deliveryorderreqmodel.haulierCode = '';
                  this.deliveryorderreqmodel.haulierName = '';
                  this.presentAlert("Attention", 'Haulier Company Code is Invalid.');
                } else {
                  this.deliveryorderreqmodel.haulierCode = searchResp.companyCode;
                  this.deliveryorderreqmodel.haulierName = searchResp.companyName;
                }
              }
            },
            error => {

            });
        this.showHaulierSug = false;
      }, 500);
    }
  }

  getConsigneeItems(ev: any) {
    this.filterConsigneeArray = this.consigneeRespCodeModel;

    /*clearing Name on Value change*/
    this.deliveryorderreqmodel.consigneeName = "";


    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterConsigneeArray = this.consigneeRespCodeModel.filter((item) => {
        if (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showConsigneeSug = true;
        }
        return (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase()));
      })
    }
    else {
      this.showConsigneeSug = false;
    }
  }

  getConsigneeFromService() {

    let consigneeCodeModel: ChacodeModel;
    let consigneeCodeModelList: ChacoderesplistModel;
    consigneeCodeModel = new ChacodeModel;
    this.consigneeRespCodeModel = new Array<ChacodeModel>();
    consigneeCodeModel.companyCode = "";
    consigneeCodeModel.companyName = '';
    /*consigneeCodeModel.c = '';*/
    this.doServiceProvider.getConsigneeCode(consigneeCodeModel)
      .subscribe(response => {
        consigneeCodeModelList = <ChacoderesplistModel>response;
        this.consigneeRespCodeModel = consigneeCodeModelList.list;

        /*for (let consigneeNumberElement of this.consigneeRespCodeModel) {
          this.consigneeArrayfromResp.push(consigneeNumberElement.companyCode);
        }

        /!*Removing Duplicates*!/
        stringArray = Array.from(new Set(this.consigneeArrayfromResp));
        this.consigneeArrayfromResp = stringArray;*/

      });
  }

  hideConsigneeSuggestion(ev: any) {
    if (this.validate(this.deliveryorderreqmodel.consigneeCode, '^[a-z0-9A-Z]{0,30}$')) {
      this.deliveryorderreqmodel.consigneeCode = "";
      this.presentAlert("Attention", 'Consignee Company Code is Invalid.');
      return;
    }
    let val = ev.value;
    if (val.length > 0) {
      setTimeout(() => {
        let consigneeCodeModel: ChacodeModel;
        let searchResp: ChacodeModel;
        searchResp = new ChacodeModel;
        let chacodeModelArray: ChacodeModel[];
        let consigneeCodeModelList: ChacoderesplistModel;
        consigneeCodeModel = new ChacodeModel;
        chacodeModelArray = new Array<ChacodeModel>();
        consigneeCodeModel.companyCode = this.deliveryorderreqmodel.consigneeCode;
        consigneeCodeModel.companyName = '';
        /*consigneeCodeModel.ffCode = '';*/
        this.doServiceProvider.getConsigneeCode(consigneeCodeModel)
          .subscribe(response => {
              consigneeCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = consigneeCodeModelList.list;

              if (chacodeModelArray.length == 0) {
                this.deliveryorderreqmodel.consigneeName = "";
                this.deliveryorderreqmodel.consigneeCode = "";
                this.presentAlert("Attention", 'Consignee Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(element =>
                  element.companyCode.toString().toLowerCase() == this.deliveryorderreqmodel.consigneeCode.toString().toLowerCase())
                if (!searchResp) {
                  this.deliveryorderreqmodel.consigneeName = "";
                  this.deliveryorderreqmodel.consigneeCode = "";
                  this.presentAlert("Attention", 'Consignee Company Code is Invalid.');
                } else {
                  this.deliveryorderreqmodel.consigneeCode = searchResp.companyCode;
                  this.deliveryorderreqmodel.consigneeName = searchResp.companyName;
                }
              }
            },
            error => {

            });
        this.showConsigneeSug = false;
      }, 500);
    }
  }

  onSelectConsignee(item: any) {
    this.deliveryorderreqmodel.consigneeCode = item.companyCode;
    this.deliveryorderreqmodel.consigneeName = item.companyName;
    this.showConsigneeSug = false;
  }

  getFrieghtItems(ev: any) {

    this.filterFrieghtArray = this.frieghtRespCodeModel;
    this.deliveryorderreqmodel.frieghtForwarderName = '';
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterFrieghtArray = this.filterFrieghtArray.filter((item) => {
        if (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showFrieghtSug = true;
        }
        return (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase()));
      })
    }
    else {
      this.showFrieghtSug = false;
    }
  }

  getFrieghtFromService() {
    let freightCodeModel: ChacodeModel;
    let freightCodeModelList: ChacoderesplistModel;
    freightCodeModel = new ChacodeModel;
    this.frieghtRespCodeModel = new Array<ChacodeModel>();
    freightCodeModel.companyCode = '';
    freightCodeModel.companyName = '';
    freightCodeModel.ffCode = '';
    this.doServiceProvider.getFrieghtForwarderCode(freightCodeModel)
      .subscribe(response => {
          freightCodeModelList = <ChacoderesplistModel>response;
          this.frieghtRespCodeModel = freightCodeModelList.list;
        },
        error => {
          //Show error message
        });
  }

  hideFrieghtSuggestion(ev: any) {
    if (this.validate(this.deliveryorderreqmodel.frieghtForwarderCode, '^[a-z0-9A-Z]{0,30}$')) {
      this.deliveryorderreqmodel.frieghtForwarderCode = "";
      this.presentAlert("Attention", 'Frieght Forwarder Company Code is Invalid.');
      return;

    }
    let val = ev.value;
    if (val.length > 0) {
      setTimeout(() => {
        let chacodeModelArray: ChacodeModel[];
        let freightCodeModel: ChacodeModel;
        let searchResp: ChacodeModel;
        searchResp = new ChacodeModel;
        let freightCodeModelList: ChacoderesplistModel;
        freightCodeModel = new ChacodeModel;
        chacodeModelArray = new Array<ChacodeModel>();
        freightCodeModel.companyCode = this.deliveryorderreqmodel.frieghtForwarderCode;
        freightCodeModel.companyName = '';
        freightCodeModel.ffCode = '';
        this.doServiceProvider.getFrieghtForwarderCode(freightCodeModel)
          .subscribe(response => {
              freightCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = freightCodeModelList.list;
              if (chacodeModelArray.length == 0) {
                this.deliveryorderreqmodel.frieghtForwarderName = "";
                this.deliveryorderreqmodel.frieghtForwarderCode = "";
                this.presentAlert("Attention", 'Frieght Forwarder Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(element =>
                  element.companyCode.toString().toLowerCase() == this.deliveryorderreqmodel.frieghtForwarderCode.toString().toLowerCase())
                if (!searchResp) {
                  this.deliveryorderreqmodel.frieghtForwarderName = "";
                  this.deliveryorderreqmodel.frieghtForwarderCode = "";
                  this.presentAlert("Attention", 'Frieght Forwarder Company Code is Invalid.');
                } else {
                  this.deliveryorderreqmodel.frieghtForwarderCode = searchResp.companyCode;
                  this.deliveryorderreqmodel.frieghtForwarderName = searchResp.companyName;
                }
              }
            },
            error => {

            });
        this.showFrieghtSug = false;
      }, 500);
    }
  }

  onSelectFrieght(item: any) {
    this.deliveryorderreqmodel.frieghtForwarderCode = item.companyCode;
    this.deliveryorderreqmodel.frieghtForwarderName = item.companyName;
    this.showFrieghtSug = false;
  }

  getCHAItems(ev: any) {

    this.filterCHAArray = this.chaRespCodeModel;
    this.deliveryorderreqmodel.cHAName = '';
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterCHAArray = this.filterCHAArray.filter((item) => {
        if (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showCHASug = true;
        }
        return (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase()));
      })
    }
    else {
      this.showCHASug = false;
    }
  }

  getCHAFromService() {

    let chaCodeModel: ChacodeModel;
    let chaCodeModelList: ChacoderesplistModel;
    chaCodeModel = new ChacodeModel;
    this.chaRespCodeModel = new Array<ChacodeModel>();
    chaCodeModel.companyCode = '';
    chaCodeModel.companyName = '';
    chaCodeModel.chaCode = "";
    this.doServiceProvider.getCHACode(chaCodeModel)
      .subscribe(response => {
          chaCodeModelList = <ChacoderesplistModel>response;
          this.chaRespCodeModel = chaCodeModelList.list;

        },
        error => {

        });
  }

  hideCHASuggestion(ev: any) {
    if (this.validate(this.deliveryorderreqmodel.cHACode, '^[a-z0-9A-Z]{0,30}$')) {
      this.deliveryorderreqmodel.cHACode = "";
      this.presentAlert("Attention", 'CHA Company Code is Invalid.');
      return;
    }
    let val = ev.value;
    if (val.length > 0) {
      setTimeout(() => {
        let chaCodeModel: ChacodeModel;
        let chacodeModelArray: ChacodeModel[];
        let searchResp: ChacodeModel;
        searchResp = new ChacodeModel;
        let chaCodeModelList: ChacoderesplistModel;
        chaCodeModel = new ChacodeModel;
        chacodeModelArray = new Array<ChacodeModel>();
        chaCodeModel.companyCode = this.deliveryorderreqmodel.cHACode;
        chaCodeModel.companyName = '';
        chaCodeModel.chaCode = "";
        this.doServiceProvider.getCHACode(chaCodeModel)
          .subscribe(response => {
              chaCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = chaCodeModelList.list;
              if (chacodeModelArray.length == 0) {
                this.deliveryorderreqmodel.cHAName = "";
                this.deliveryorderreqmodel.cHACode = "";
                this.presentAlert("Attention", 'CHA Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(element =>
                  element.companyCode.toString().toLowerCase() == this.deliveryorderreqmodel.cHACode.toString().toLowerCase())
                if (!searchResp) {
                  this.deliveryorderreqmodel.cHAName = "";
                  this.deliveryorderreqmodel.cHACode = "";
                  this.presentAlert("Attention", 'CHA Company Code is Invalid.');
                } else {
                  this.deliveryorderreqmodel.cHACode = searchResp.companyCode;
                  this.deliveryorderreqmodel.cHAName = searchResp.companyName;
                }
              }
            },
            error => {

            });
        this.showCHASug = false;
      }, 500);
    }
  }

  onSelectCHA(item: any) {
    this.deliveryorderreqmodel.cHACode = item.companyCode;
    this.deliveryorderreqmodel.cHAName = item.companyName;
    this.showCHASug = false;
  }

  getCFSItems(ev: any) {
    this.filterCFSArray = this.cfsRespCodeModel;
    this.deliveryorderreqmodel.cFSName = ''
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterCFSArray = this.filterCFSArray.filter((item) => {
        if (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showCFSSug = true;
        }
        return (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase()));
      })
    }
    else {
      this.showCFSSug = false;
    }
  }

  getCFSFromService() {
    let cfsCodeModel: ChacodeModel;
    let cfsCodeModelList: ChacoderesplistModel;
    cfsCodeModel = new ChacodeModel;
    this.cfsRespCodeModel = new Array<ChacodeModel>();
    cfsCodeModel.companyCode = '';
    cfsCodeModel.companyName = '';
    cfsCodeModel.cfsCode = '';
    this.doServiceProvider.getCFSCode(cfsCodeModel)
      .subscribe(response => {
          cfsCodeModelList = <ChacoderesplistModel>response;
          this.cfsRespCodeModel = cfsCodeModelList.list;

        },
        error => {

        });
  }

  hideCFSSuggestion(ev: any) {
    if (this.validate(this.deliveryorderreqmodel.cFSCode, '^[a-z0-9A-Z]{0,30}$')) {
      this.deliveryorderreqmodel.cFSCode = "";
      this.presentAlert("Attention", 'CFS Company Code is Invalid.');
      return;
    }
    let val = ev.value;
    if (val.length > 0) {
      setTimeout(() => {
        let chacodeModelArray: ChacodeModel[];
        let cfsCodeModel: ChacodeModel;
        let searchResp: ChacodeModel;
        searchResp = new ChacodeModel;
        let cfsCodeModelList: ChacoderesplistModel;
        cfsCodeModel = new ChacodeModel;
        chacodeModelArray = new Array<ChacodeModel>();
        cfsCodeModel.companyCode = this.deliveryorderreqmodel.cFSCode;
        cfsCodeModel.companyName = '';
        cfsCodeModel.cfsCode = "";
        this.doServiceProvider.getCFSCode(cfsCodeModel)
          .subscribe(response => {
              cfsCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = cfsCodeModelList.list;
              if (chacodeModelArray.length == 0) {
                this.deliveryorderreqmodel.cFSName = "";
                this.deliveryorderreqmodel.cFSCode = "";
                this.presentAlert("Attention", 'CFS Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(element =>
                  element.companyCode.toString().toLowerCase() == this.deliveryorderreqmodel.cFSCode.toString().toLowerCase())
                if (!searchResp) {
                  this.deliveryorderreqmodel.cFSName = "";
                  this.deliveryorderreqmodel.cFSCode = "";
                  this.presentAlert("Attention", 'CFS Company Code is Invalid.');
                } else {
                  this.deliveryorderreqmodel.cFSCode = searchResp.companyCode;
                  this.deliveryorderreqmodel.cFSName = searchResp.companyName;
                }
              }
            },
            error => {

            });
        this.showCFSSug = false;
      }, 500);
    }
  }

  onSelectCFS(item: any) {
    this.deliveryorderreqmodel.cFSCode = item.companyCode;
    this.deliveryorderreqmodel.cFSName = item.companyName;
    this.showCFSSug = false;
  }

  getEmptyItems(ev: any) {
    this.filterEmptyArray = this.emptyRespCodeModel;
    this.deliveryorderreqmodel.emptyYardName = '';
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterEmptyArray = this.emptyRespCodeModel.filter((item) => {
        if (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showEmptySSug = true;
        }
        return (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase()));
      })
    }
    else {
      this.showEmptySSug = false;
    }
  }

  getEmptyFromService() {

    let emptyCodeModel: ChacodeModel;
    let emptyCodeModelList: ChacoderesplistModel;
    emptyCodeModel = new ChacodeModel;
    this.emptyRespCodeModel = new Array<ChacodeModel>();
    emptyCodeModel.companyCode = '';
    emptyCodeModel.companyName = '';
    emptyCodeModel.eyCode = '';
    this.doServiceProvider.getEmptyCode(emptyCodeModel)
      .subscribe(response => {
          emptyCodeModelList = <ChacoderesplistModel>response;
          this.emptyRespCodeModel = emptyCodeModelList.list;

        },
        error => {

        });
  }

  hideEmptySuggestion(ev: any) {
    if (this.validate(this.deliveryorderreqmodel.emptyYardCode, '^[a-z0-9A-Z]{0,30}$')) {
      this.deliveryorderreqmodel.emptyYardCode = "";
      this.presentAlert("Attention", 'Empty Yard Company Code is Invalid.');
      return;
    }
    let val = ev.value;
    if (val.length > 0) {
      setTimeout(() => {
        let chacodeModelArray: ChacodeModel[];
        let emptyCodeModel: ChacodeModel;
        let emptyCodeModelList: ChacoderesplistModel;
        emptyCodeModel = new ChacodeModel;
        let searchResp: ChacodeModel;
        searchResp = new ChacodeModel;
        chacodeModelArray = new Array<ChacodeModel>();
        emptyCodeModel.companyCode = this.deliveryorderreqmodel.emptyYardCode;
        emptyCodeModel.companyName = '';
        emptyCodeModel.eyCode = "";
        this.doServiceProvider.getEmptyCode(emptyCodeModel)
          .subscribe(response => {
              emptyCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = emptyCodeModelList.list;

              if (chacodeModelArray.length == 0) {
                this.deliveryorderreqmodel.emptyYardName = "";
                this.deliveryorderreqmodel.emptyYardCode = "";
                this.presentAlert("Attention", 'Empty Yard Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(emptyYardElement =>
                  emptyYardElement.companyCode.toString().toLowerCase() == this.deliveryorderreqmodel.emptyYardCode.toString().toLowerCase())
                if (!searchResp) {
                  this.deliveryorderreqmodel.emptyYardName = "";
                  this.deliveryorderreqmodel.emptyYardCode = "";
                  this.presentAlert("Attention", 'Empty Yard Company Code is Invalid.');
                } else {
                  this.deliveryorderreqmodel.emptyYardCode = searchResp.companyCode;
                  this.deliveryorderreqmodel.emptyYardName = searchResp.companyName;
                }
              }
            },
            error => {

            });
        this.showEmptySSug = false;
      }, 500);
    }
  }

  onSelectEmpty(item: any) {
    this.deliveryorderreqmodel.emptyYardCode = item.companyCode;
    this.deliveryorderreqmodel.emptyYardName = item.companyName;
    this.showEmptySSug = false;
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/octet-stream');
  }

  show(attachment) {
    if (attachment.showdetails) {
      attachment.showdetails = false;
    }
    else {
      attachment.showdetails = true;
    }
  }

  geticon(attachment) {
    if (attachment.showDetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }

  }

  openDocs(attachment: DeliveryorderattachModel) {
    this.doServiceProvider.openDocuments()
      .then(data => {
        if (typeof data !== 'undefined' && data !== null) {
          attachment.fileName = data.fileName;
          attachment.fileUploadId = data.fileUploadId;
        }
      }, error => {
      });
  }

  addAttachment() {
    if (this.attachReceived.length < 5) {
      this.attachReceived.push(new DeliveryorderattachModel());
    }
    else {
      this.presentAlert("Attention", 'You are not allowed to Upload more than 5 Attachments.');
    }
  }

  closeAttachment(attachment: DeliveryorderattachModel) {
    for (var i = 0; i < this.attachReceived.length; i++) {
      if (this.attachReceived[i] == attachment) {
        this.attachReceived.splice(i, 1);
        break;
      }
    }
  }

  displayattach(attachment: DeliveryorderattachModel) {
    this.doServiceProvider.openAttachment(attachment);
  }

  public removeAttachContainerDetais(container: any): void {
    if (this.containerArray.length > 1) {
      for (let i = 0; i < this.containerArray.length; i++) {
        if (this.containerArray[i] == container) {
          this.containerArray.splice(i, 1);
          break;
        }
      }
    }
  }

  focusChangetoDODTab() {
    this.dotype = false;
    this.billoflandingno = false;
    this.importer = false;
    this.dodetails = true;
    this.containertable = false;
    this.cargodetails = false;
    this.showAttachments = false;
    this.selectedCategory = "Delivery Order Details";
  }

  keyboardClose() {
    this.keyboard.close();
  }

  checkStatus(containerStatus): boolean {
    if (this.editMode) {
      if (this.containerArray.length > 1) {
        if ((this.deliveryordertype == 'FCL' && this.deliveryorderreqmodel.tradeType == 'Coastal') ||
          (this.deliveryordertype == 'Empty')) {
          if (containerStatus == null) {
            return true;
          } else if (containerStatus.toLowerCase() != "completed") {
            return true;
          } else {
            return false;
          }
        }

        /*if ((containerStatus != null && containerStatus.toLowerCase() != "completed" ) &&
          ((this.deliveryordertype == 'FCL' && this.deliveryorderreqmodel.tradeType == 'Coastal') ||
            (this.deliveryordertype == 'Empty'))) {
          return true;
        } else {
          return false;
        }*/
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  editReefer(containerStatus: ContainerdetailsreqModel): boolean {
    if (this.editMode) {
      if ((containerStatus.iSOCode == "22R1" || containerStatus.iSOCode == "22R9" || containerStatus.iSOCode == "25R1" ||
          containerStatus.iSOCode == "42R1" || containerStatus.iSOCode == "42R9" || containerStatus.iSOCode == "45R1" ||
          containerStatus.iSOCode == "45R8" || containerStatus.iSOCode == "45R9")) {

        if ( containerStatus.containerStatus == null) {
          return true;
        } else if (containerStatus.containerStatus.toLowerCase() != "completed") {
          return true;
        } else {
          return false;
        }

      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  lstKeyUpValidate(e, format, model,instance){
    this.utils.keyUpValidate(e, format);
    if (model == 'refeer') {
      instance[model] = e.target.value;
    }
  }
  lstKeyUpValidateOnBlur(instance){
    let val = instance['reefer'];
    if(eval("/^[0-9-.]{0,7}$/").test(val) === false){
      instance['reefer'] = "";
    }
  }

  checkReffer(ev,mode) {
    this.WarningMsg_Refeer = "Temperature entered will be applied for Pre Temperature Inspection (PTI) before Pickup.";
    if (mode == "in") {
      this.isConfirmOpen = true;
    }
    else if (mode == "out") {
      this.isConfirmOpen = false;
    }
  }


  showPermitDetails(): boolean {
    if ((this.deliveryordertype == 'FCL' &&
        this.deliveryorderreqmodel.tradeType == 'Coastal') || (this.deliveryordertype == 'Empty')) {
      return false;
    } else {
      return true;
    }
  }

  onContainerPermitNoBlur() {
    if (this.validate(this.deliveryorderreqmodel.containerPermitNo, '^[a-z0-9A-Z]*$')) {
      this.deliveryorderreqmodel.containerPermitNo = "";
      this.presentAlert("Attention", "Invalid Container Permit Number");
      return;
    }

    if (this.deliveryorderreqmodel.containerPermitNo != '' && this.deliveryorderreqmodel.containerPermitNo.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.deliveryorderreqmodel.containerPermitNo = '';
    }
  }

  containerCount(containerNo: number): boolean {
    if (containerNo) {
      if (containerNo == 0) {
        return false;
      } else if (containerNo == 1) {
        this.containerValue = "Container";
        return true;
      } else {
        this.containerValue = "Containers"
        return true;
      }
    }
  }

  oninstructionsToOtherPartyBlur(curEvent: any) {
    if (curEvent.keyCode != 13 && this.deliveryorderreqmodel.instructionsToOtherParty != '' && this.deliveryorderreqmodel.instructionsToOtherParty.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.deliveryorderreqmodel.instructionsToOtherParty = '';
    }
  }


  getDefinedSetDoEdit() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['DELIVERY_TO', 'BOOLEAN'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
        this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
        for (let i = 0; i < this.definedSetListModel.length; i++) {

          if (this.definedSetListModel[i].definedSetName == 'DELIVERY_TO') {
            this.deliveryToList = this.definedSetListModel[i].definedSetValues;
          }

          if (this.definedSetListModel[i].definedSetName == 'BOOLEAN') {
            this.doExamination = this.definedSetListModel[i].definedSetValues;
          }
        }

        if (this.deliveryorderreqmodel.deliveryTo == null || this.deliveryorderreqmodel.deliveryTo == "") {
          this.deliveryorderreqmodel.deliveryTo = this.deliveryToList[0].definedSetValueCode;
        }
      });
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
}
