import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {VoyageServicesProvider} from "../../providers/webservices/voyageservices";
import {DefinedSetRequest} from "../../shared/model/voyage/voyageenquiryinitdefinedsetrequest.model";
import {VoyageEnquiryLoadModel} from "../../shared/model/voyage/voyageenquiryinit.model";
import {DefinedSetValue} from "../../shared/model/voyage/voyageenquiryinitdefineditem.model";
import {VoyageEnquirySearchRequestModel} from "../../shared/model/voyage/voyageenquirysearchrequest.model";
import {Utils} from "../../shared/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Keyboard} from '@ionic-native/keyboard';
import * as $ from 'jquery';
/**
 * Generated class for the VoyagefilterpopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-voyagefilterpopover',
  templateUrl: 'voyagefilterpopover.html',
  providers: [Utils, DefinedSetRequest, VoyageEnquiryLoadModel, VoyageServicesProvider, VoyageEnquirySearchRequestModel]
})

export class VoyagefilterpopoverPage {
  dateFormat: string = "DD/MM/YYYY";
  inputStringPattern: string = "^[a-zA-Z0-9 ]*$";
  DONumberPattern: string = "^[a-zA-Z0-9 ]{6,}$";
  selected: string = "All";
  pages: Array<{ title: string, showDetails: boolean, hide: boolean }>;
  showSubmenu: any;
  rotationNo: string;
  vesselName: string;
  alertMsg: string;
  portTerminalClear: boolean = true;
  // serviceProviderCode:ServiceProviderCode;

  ports: Ports[] = [];

  // terminalsOld: Terminal[] = [
  //   new Terminal('DP World T1', 'T1'),
  //   new Terminal('DP World T2', 'T2'),
  //   new Terminal('KSA T1', 'KST1'),
  //   new Terminal('TPT T1', 'TPTT1'),
  //   new Terminal('TPT T2', 'TPTT2'),
  //   new Terminal('TPT T3', 'TPTT3'),
  //   new Terminal('IGT', 'CH1')
  // ];
  terminals: Terminal[] = [];
  minDate: any;
  maxDate: any;
  tradeType: DefinedSetValue[] = [];
  duration: DefinedSetValue[] = [];
  operationStatusobj: DefinedSetValue[] = [];
  rotationNoHidden: boolean = false;
  vesselNameHidden: boolean = false;
  shippingLineHidden: boolean = false;
  durationHidden: boolean = false;
  etaHidden: boolean = false;
  operationStatusHidden: boolean = false;
  tradeTypeHidden: boolean = false;
  containerHidden: boolean = true;
  doHidden: boolean = true;
  portsChecked: boolean = true;
  terminalsChecked: boolean = true;
  billHidden: boolean = true;
  portHidden: boolean = false;
  terminalHidden: boolean = false;
  customsDHidden: boolean = true;
  bookingHidden: boolean = true;
  durationSelected: boolean = false;
  spLocationListSO: any;
  spLocationCode: any;
  spSubLocationCode: any;
  spSubLocationName: any;
  spLocationName: any;
  clientTypeCode?: any;
  serviceProviderCode: any;
  serviceProviderName?: any;
  prevvalidDno: any;
  prevvalidCno: any;
  spSubLocationListSO: any;
  formValidate: boolean = true;
  AllTerminals: Terminal[] = [];
  groupOne: FormGroup;
  tradeTypeDisabled: boolean = true;
  isOpenService: boolean = false;
  constructor(public keyboard: Keyboard, public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage,
              public alertCtrl: AlertController,
              public voyageEnquirySearchRequestModel: VoyageEnquirySearchRequestModel,
              public viewCtrl: ViewController, public utils: Utils,
              public formBuilder: FormBuilder) {
    this.pages = [
      {title: 'Rotation Number', showDetails: false, hide: true},
      {title: 'Vessel Name', showDetails: false, hide: true},
      {title: 'Shipping Line', showDetails: false, hide: true},
      {title: 'Ports', showDetails: false, hide: true},
      {title: 'Terminals', showDetails: false, hide: true},
      {title: 'Duration', showDetails: false, hide: true},
      {title: 'Date', showDetails: false, hide: true},
      {title: 'Operational Status', showDetails: false, hide: true},
      {title: 'Trade Type', showDetails: false, hide: true},
      {title: 'Container No', showDetails: false, hide: true},
      {title: 'Booking Reference No.', showDetails: false, hide: true},
      {title: 'DO No', showDetails: false, hide: true},
      {title: 'Bill of Lading', showDetails: false, hide: true},
      {title: 'Customs Declaration No', showDetails: false, hide: true},
    ];

    this.minDate = new Date();
    this.maxDate = new Date();
    if(null != this.navParams.get('isOpenService')) {
      this.isOpenService = this.navParams.get('isOpenService');
    }
    this.minDate.setMonth(this.minDate.getMonth() - 3);
    this.maxDate.setMonth(this.maxDate.getMonth() + 3);
    this.minDate = this.minDate.toISOString();
    this.maxDate = this.maxDate.toISOString();
    if (this.isOpenService) {
      this.enableSortTitle(["Rotation Number",
        "Vessel Name",
        "Shipping Line",
        "Ports",
        "Terminals",
        "Duration",
        "Date",
        "Operational Status"]);
    } else {
      this.enableSortTitle(["Rotation Number",
        "Vessel Name",
        "Shipping Line",
        "Ports",
        "Terminals",
        "Duration",
        "Date",
        "Operational Status",
        "Trade Type"]);
    }

    console.log('ionViewDidLoad VoyagefilterpopoverPage');
    this.groupOne = formBuilder.group({
      containerno: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(11)])],
      dono: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(30)])]
    });
    this.ports = navParams.get('port');
    this.terminals = navParams.get('terminal');
    this.AllTerminals = navParams.get('terminal');
    if (!this.isOpenService)
      this.tradeType = navParams.get('tradeType');
    this.duration = navParams.get('duration');
    this.operationStatusobj = navParams.get('operationStatusobj');
    this.loadinit();
  }

  ionViewDidEnter() {
    /* this.enableSortTitle(["Rotation Number",
       "Vessel Name",
       "Shipping Line",
       "Ports",
       "Terminals",
       "Duration",
       "Date",
       "Operational Status",
       "Trade Type"]);
     console.log('ionViewDidLoad VoyagefilterpopoverPage');
     this.loadinit();*/
    //this.rotationnoChange();
  }

  loadinit() {

    this.storage.get('voyage-filterModel').then((val) => {
      if (val != null) {
        this.voyageEnquirySearchRequestModel = <VoyageEnquirySearchRequestModel>val;
      }
      else {
        this.voyageEnquirySearchRequestModel = new VoyageEnquirySearchRequestModel;
      }
      if (this.operationStatusobj.length > 0) {
        if (this.voyageEnquirySearchRequestModel.operationalStatusSearch == null) {
          this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.operationStatusobj[0].definedSetValueCode
        }
      }
      if (!this.isOpenService && this.tradeType.length > 0) {
        if (this.voyageEnquirySearchRequestModel.tradeType == null) {
          this.voyageEnquirySearchRequestModel.tradeType = this.tradeType[0].definedSetValueCode
        }
      }
      if (this.duration.length > 0) {
        if (this.voyageEnquirySearchRequestModel.durationSearch == null) {
          this.voyageEnquirySearchRequestModel.durationSearch = this.duration[0].definedSetValueCode
        }
      }
      if (this.voyageEnquirySearchRequestModel.portsSearch!=null && this.voyageEnquirySearchRequestModel.portsSearch.length > 0) {
        this.setPorts(false);
        for (let i = 0; i < this.voyageEnquirySearchRequestModel.portsSearch.length; i++) {
          for (let j = 0; j < this.ports.length; j++) {
            if (this.voyageEnquirySearchRequestModel.portsSearch[i] == this.ports[j].portCode) {
              this.ports[j].status = true;
            }
          }
        }
      }
      else {
        this.setPorts(false);
        this.portTerminalClear = true;
      }
      this.portChange();
      if (this.voyageEnquirySearchRequestModel.terminalsSearch!=null &&this.voyageEnquirySearchRequestModel.terminalsSearch.length > 0) {
        this.setTerminal(false);
        for (let i = 0; i < this.voyageEnquirySearchRequestModel.terminalsSearch.length; i++) {
          for (let j = 0; j < this.terminals.length; j++) {
            if (this.voyageEnquirySearchRequestModel.terminalsSearch[i] == this.terminals[j].terminalCode) {
              this.terminals[j].status = true;
            }
          }
        }
      }
      else {
        this.setTerminal(false);
        this.portTerminalClear = true;
      }
      if(this.voyageEnquirySearchRequestModel.etaFromDateSearch==null || this.voyageEnquirySearchRequestModel.etaFromDateSearch.length==0)
      {
        this.voyageEnquirySearchRequestModel.etaFromDateSearch = this.minDate;
        this.voyageEnquirySearchRequestModel.etaToDateSearch = this.maxDate;
      }
        this.voyageEnquirySearchRequestModel.etaFromDateSearch = this.parsedate(this.voyageEnquirySearchRequestModel.etaFromDateSearch);
        this.voyageEnquirySearchRequestModel.etaToDateSearch = this.parsedate(this.voyageEnquirySearchRequestModel.etaToDateSearch);
      if (this.voyageEnquirySearchRequestModel.durationSearch == this.duration[0].definedSetValueCode) {
        this.etaHidden = false;
      } else {
        this.etaHidden = true;
      }
      this.rotationnoChange();
      if (null == this.voyageEnquirySearchRequestModel.rotationNumberSearch || this.voyageEnquirySearchRequestModel.rotationNumberSearch=="") {
        if (!this.isOpenService) {
          if (this.voyageEnquirySearchRequestModel.tradeType == 'Outbound') {
            this.enableSortTitle(["Rotation Number",
              "Vessel Name",
              "Shipping Line",
              "Ports",
              "Terminals",
              "Duration",
              "Date",
              "Operational Status",
              "Trade Type",
              "Container No",
              "Booking Reference No.",
              "Bill of Lading",
              "Customs Declaration No"
            ])
            this.containerHidden = false;
            this.doHidden = false;
            this.billHidden = false;
            this.customsDHidden = false;
            this.bookingHidden = false;
            this.tradeTypeDisabled = false;
            this.rotationNoHidden = false;
            this.vesselNameHidden = false;
            this.shippingLineHidden = false;
            this.operationStatusHidden = false;
            this.portHidden = false;
            this.terminalHidden = false;
          }
          else if (this.voyageEnquirySearchRequestModel.tradeType == 'Inbound') {
            this.enableSortTitle(["Rotation Number",
              "Vessel Name",
              "Shipping Line",
              "Ports",
              "Terminals",
              "Duration",
              "Date",
              "Operational Status",
              "Trade Type",
              "Container No",
              "DO No",
              "Bill of Lading",
              "Customs Declaration No"
            ])
            this.containerHidden = false;
            this.doHidden = false;
            this.billHidden = false;
            this.customsDHidden = false;
            this.bookingHidden = false;
            this.tradeTypeDisabled = false;
            this.rotationNoHidden = false;
            this.vesselNameHidden = false;
            this.shippingLineHidden = false;
            this.operationStatusHidden = false;
            this.portHidden = false;
            this.terminalHidden = false;
          }
          else {
            this.enableSortTitle(["Rotation Number",
              "Vessel Name",
              "Shipping Line",
              "Ports",
              "Terminals",
              "Duration",
              "Date",
              "Operational Status",
              "Trade Type"
            ])
            this.rotationNoHidden = false;
            this.vesselNameHidden = false;
            this.shippingLineHidden = false;
            this.containerHidden = true;
            this.doHidden = true;
            this.billHidden = true;
            this.customsDHidden = true;
            this.bookingHidden = true;
            this.tradeTypeDisabled = true;
            this.voyageEnquirySearchRequestModel.doNo = null;
            this.voyageEnquirySearchRequestModel.containerNo = null;
            this.voyageEnquirySearchRequestModel.billOfLading = null;
            this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
            this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
            this.operationStatusHidden = false;
            this.portHidden = false;
            this.terminalHidden = false;
          }
          this.setTradeValues();
        }
        this.onDurationChanged();
      }
      //
      // this.doNoChange();
      // this.bookingChange();
      // this.containerNoChange();
      // this.billChange();
      // this.customsChange();
      // this.bookingChange();
    });

  }

  getIcon(page) {
    if (page.showDetails) {
      return "arrow-dropup";
    } else {
      return "arrow-dropdown";
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

  setTradeValues() {

    if (this.voyageEnquirySearchRequestModel.bookingReferenceNo != null
      && this.voyageEnquirySearchRequestModel.bookingReferenceNo.length > 0) {
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.setDefaultTradeValues();
      this.containerHidden = true;
      this.doHidden = true;
      this.customsDHidden = true;
      this.billHidden = true;

    } else if (this.voyageEnquirySearchRequestModel.containerNo != null
      && this.voyageEnquirySearchRequestModel.containerNo.length > 0) {
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.setDefaultTradeValues();
      this.doHidden = true;
      this.customsDHidden = true;
      this.billHidden = true;
      this.bookingHidden = true;

    } else if (this.voyageEnquirySearchRequestModel.billOfLading != null
      && this.voyageEnquirySearchRequestModel.billOfLading.length > 0) {
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.setDefaultTradeValues();
      this.containerHidden = true;
      this.doHidden = true;
      this.customsDHidden = true;
      this.bookingHidden = true;

    } else if (this.voyageEnquirySearchRequestModel.customsDeclarationNo != null
      && this.voyageEnquirySearchRequestModel.customsDeclarationNo.length > 0) {
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.setDefaultTradeValues();
      this.containerHidden = true;
      this.doHidden = true;
      this.billHidden = true;
      this.bookingHidden = true;

    } else if (this.voyageEnquirySearchRequestModel.doNo != null
      && this.voyageEnquirySearchRequestModel.doNo.length > 0) {
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.setDefaultTradeValues();
      this.containerHidden = true;
      this.customsDHidden = true;
      this.billHidden = true;
      this.bookingHidden = true;

    } else if (this.voyageEnquirySearchRequestModel.bookingReferenceNo != null
      && this.voyageEnquirySearchRequestModel.bookingReferenceNo.length > 0) {
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.setDefaultTradeValues();
      this.containerHidden = true;
      this.doHidden = true;
      this.customsDHidden = true;
      this.billHidden = true;
    }

  }

  setDefaultTradeValues() {

    this.rotationNoHidden = true;
    this.vesselNameHidden = true;
    this.shippingLineHidden = true;
    this.operationStatusHidden = true;
    this.portHidden = true;
    this.terminalHidden = true;
    this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.selected;
  }

  setPorts(status: boolean) {
    for (let i = 0; i < this.ports.length; i++) {
      this.ports[i].status = status;
    }
    this.portChange();
  }

  setTerminal(status: boolean) {
    for (let i = 0; i < this.terminals.length; i++) {
      this.terminals[i].status = status;
    }
    this.terminalChange();
  }


  terminalChange() {
    this.portTerminalClear = false;
  }

  portChange() {
    this.portTerminalClear = false;
    this.terminals = [];
    for (let i = 0; i < this.ports.length; i++) {
      if (this.ports[i].status == true) {
        for (let j = 0; j < this.AllTerminals.length; j++) {
          if (this.AllTerminals[j].port == this.ports[i].portCode) {
            this.terminals.push(new Terminal(this.AllTerminals[j].terminalName, this.AllTerminals[j].terminalCode, this.AllTerminals[j].port));
          }
        }
      }
    }
  }

  toggleDetails(page) {
    this.showSubmenu = true;
    if (page.title == 'Rotation Number') {
      this.pages[0].showDetails = !this.pages[0].showDetails;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
    } else if (page.title == 'Vessel Name') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = !this.pages[1].showDetails;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
    } else if (page.title == 'Shipping Line') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = !this.pages[2].showDetails;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
    } else if (page.title == 'Ports') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = !this.pages[3].showDetails;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
      setTimeout(function(){
        $('.filterHeight').animate({
          scrollTop:100
        }, 'fast');
      },200);
    } else if (page.title == 'Terminals') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = !this.pages[4].showDetails;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
      setTimeout(function(){
        $('.filterHeight').animate({
          scrollTop:180
        }, 'fast');
      },200);
    } else if (page.title == 'Duration') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = !this.pages[5].showDetails;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
      setTimeout(function(){
        $('.filterHeight').animate({
          scrollTop:220
        }, 'fast');
      },200);
    } else if (page.title == 'Date') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = !this.pages[6].showDetails;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
      setTimeout(function(){
        $('.filterHeight').animate({
          scrollTop:300
        }, 'fast');
      },200);
    } else if (page.title == 'Operational Status') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = !this.pages[7].showDetails;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
      setTimeout(function(){
        $('.filterHeight').animate({
          scrollTop:320
        }, 'fast');
      },200);
    } else if (page.title == 'Trade Type') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[8].showDetails = !this.pages[8].showDetails;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
      setTimeout(function(){
        $('.filterHeight').animate({
          scrollTop:300
        }, 'fast');
      },200);
    } else if (page.title == 'Container No') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = !this.pages[9].showDetails;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;
    } else if (page.title == 'Booking Reference No.') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = !this.pages[10].showDetails;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;

    } else if (page.title == 'Bill of Lading') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[12].showDetails = !this.pages[12].showDetails;
      this.pages[13].showDetails = false;

    } else if (page.title == 'DO No') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = !this.pages[11].showDetails;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = false;

    } else if (page.title == 'Customs Declaration No') {
      this.pages[0].showDetails = false;
      this.pages[1].showDetails = false;
      this.pages[2].showDetails = false;
      this.pages[3].showDetails = false;
      this.pages[4].showDetails = false;
      this.pages[5].showDetails = false;
      this.pages[6].showDetails = false;
      this.pages[7].showDetails = false;
      this.pages[8].showDetails = false;
      this.pages[9].showDetails = false;
      this.pages[10].showDetails = false;
      this.pages[11].showDetails = false;
      this.pages[12].showDetails = false;
      this.pages[13].showDetails = !this.pages[13].showDetails;

      // this.customsDHidden = false;
      // this.billHidden = true;
      // this.bookingHidden = true;
      // this.containerHidden = true;

    }
    this.storage.set('voyage-submenu', page);
  }

  submit() {
    if (!(this.voyageEnquirySearchRequestModel.durationSearch != null && this.voyageEnquirySearchRequestModel.durationSearch.length > 0) && !(null != this.voyageEnquirySearchRequestModel.rotationNumberSearch &&
        this.voyageEnquirySearchRequestModel.rotationNumberSearch.length > 0) && Date.parse(this.voyageEnquirySearchRequestModel.etaFromDateSearch) > Date.parse(this.voyageEnquirySearchRequestModel.etaToDateSearch)) {
      this.showAlert();
      return;
    }
    this.voyageEnquirySearchRequestModel.portsSearch = [];
    for (let i = 0; i < this.ports.length; i++) {
      if (this.ports[i].status) {
        this.voyageEnquirySearchRequestModel.portsSearch.push(this.ports[i].portCode);
      }
    }
    this.voyageEnquirySearchRequestModel.terminalsSearch = [];
    for (let i = 0; i < this.terminals.length; i++) {
      if (this.terminals[i].status) {
        this.voyageEnquirySearchRequestModel.terminalsSearch.push(this.terminals[i].terminalCode);
      }
    }
    this.storage.set('voyage-filterModel', Object.assign({}, this.voyageEnquirySearchRequestModel));
    if (null != this.voyageEnquirySearchRequestModel.rotationNumberSearch
      && this.voyageEnquirySearchRequestModel.rotationNumberSearch.length > 0) {
      this.voyageEnquirySearchRequestModel.vesselNameSearch = null;
      this.voyageEnquirySearchRequestModel.shippingLineSearch = null;
      this.voyageEnquirySearchRequestModel.durationSearch = null;
      this.voyageEnquirySearchRequestModel.etaFromDateSearch = null;
      this.voyageEnquirySearchRequestModel.etaToDateSearch = null;
      this.voyageEnquirySearchRequestModel.operationalStatusSearch = null;
      this.voyageEnquirySearchRequestModel.portsSearch = null;
      this.voyageEnquirySearchRequestModel.terminalsSearch = null;
      this.voyageEnquirySearchRequestModel.tradeType = null;
    }
    if (this.portTerminalClear) {
      this.voyageEnquirySearchRequestModel.portsSearch = [];
      this.voyageEnquirySearchRequestModel.terminalsSearch = [];
    }
    if (this.voyageEnquirySearchRequestModel.durationSearch != null && this.voyageEnquirySearchRequestModel.durationSearch.length > 0) {
      this.voyageEnquirySearchRequestModel.etaFromDateSearch = "";
      this.voyageEnquirySearchRequestModel.etaToDateSearch = "";
    }
    else {
      this.voyageEnquirySearchRequestModel.etaFromDateSearch = this.datetostring(this.voyageEnquirySearchRequestModel.etaFromDateSearch);
      this.voyageEnquirySearchRequestModel.etaToDateSearch = this.datetostring(this.voyageEnquirySearchRequestModel.etaToDateSearch);
    }
    if (null != this.voyageEnquirySearchRequestModel.rotationNumberSearch &&
      this.voyageEnquirySearchRequestModel.rotationNumberSearch.length > 0) {
      this.voyageEnquirySearchRequestModel.etaFromDateSearch = "";
      this.voyageEnquirySearchRequestModel.etaToDateSearch = "";
      this.voyageEnquirySearchRequestModel.portsSearch = [];
      this.voyageEnquirySearchRequestModel.terminalsSearch = [];
    }

    if(this.voyageEnquirySearchRequestModel.tradeType == 'Outbound' || this.voyageEnquirySearchRequestModel.tradeType == 'Inbound' )
    {
      if( this.voyageEnquirySearchRequestModel.doNo != null ||
        this.voyageEnquirySearchRequestModel.containerNo != null ||
        this.voyageEnquirySearchRequestModel.billOfLading != null ||
        this.voyageEnquirySearchRequestModel.bookingReferenceNo != null ||
        this.voyageEnquirySearchRequestModel.customsDeclarationNo != null
      )
      {
        this.voyageEnquirySearchRequestModel.vesselNameSearch = null;
        this.voyageEnquirySearchRequestModel.shippingLineSearch = null;
        this.voyageEnquirySearchRequestModel.operationalStatusSearch = null;
      }
    }

    this.viewCtrl.dismiss(this.voyageEnquirySearchRequestModel).catch(() => {
    });
  }

  showAlert() {

    this.alertMsg = 'From Date should be less than To Date.';
    const alert = this.alertCtrl.create({
      title: 'Alert',
      message: this.alertMsg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }

  clear() {
    if (this.isOpenService) {
      this.enableSortTitle(["Rotation Number",
        "Vessel Name",
        "Shipping Line",
        "Ports",
        "Terminals",
        "Duration",
        "Date",
        "Operational Status"]);
    } else {
      this.enableSortTitle(["Rotation Number",
        "Vessel Name",
        "Shipping Line",
        "Ports",
        "Terminals",
        "Duration",
        "Date",
        "Operational Status",
        "Trade Type"]);
    }

    this.rotationNoHidden = false;
    this.vesselNameHidden = false;
    this.shippingLineHidden = false;
    this.durationHidden = false;
    this.etaHidden = false;
    this.operationStatusHidden = false;
    this.tradeTypeHidden = false;
    this.portHidden = false;
    this.terminalHidden = false;
    this.voyageEnquirySearchRequestModel = new VoyageEnquirySearchRequestModel;
    this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.selected;
    this.voyageEnquirySearchRequestModel.etaFromDateSearch = this.minDate;
    this.voyageEnquirySearchRequestModel.etaToDateSearch = this.maxDate;
    this.setPorts(true);
    this.portChange();
    this.rotationnoChange();
    if (!this.isOpenService)
      this.tradeTypeChange();
    this.portTerminalClear = false;
    this.pages[0].showDetails = false;
    this.pages[1].showDetails = false;
    this.pages[2].showDetails = false;
    this.pages[3].showDetails = false;
    this.pages[4].showDetails = false;
    this.pages[5].showDetails = false;
    this.pages[6].showDetails = false;
    this.pages[7].showDetails = false;
    this.pages[8].showDetails = false;
    this.pages[9].showDetails = false;
    this.pages[10].showDetails = false;
    this.pages[11].showDetails = false;
    this.pages[12].showDetails = false;
    this.pages[13].showDetails = false;
  }

  enableSortTitle(title: Array<string>) {
    for (let j = 0; j < this.pages.length; j++) {
      this.pages[j].hide = true;
    }
    for (let i = 0; i < title.length; i++) {
      for (let j = 0; j < this.pages.length; j++) {
        if (this.pages[j].title == title[i]) {
          this.pages[j].hide = false;
        }

      }
    }

  }

  datetostring(datestring) {
    if (datestring != null) {
      let month: number;
      let monthstr: string;
      let day: string;
      let date: Date;
      date = new Date(datestring);
      month = date.getMonth();
      month++;
      day = date.getDate().toString();
      if (day.length < 2) {
        day = "0" + day;
      }
      if (month < 10) {
        monthstr = "0" + month.toString();
      }
      else {
        monthstr = month.toString();
      }
      return day + "/" + monthstr + "/" + date.getFullYear();
    }
    else {
      return null;
    }
  }

  tradeTypeChange() {
    if (this.voyageEnquirySearchRequestModel.tradeType == 'Outbound') {
      this.enableSortTitle(["Rotation Number",
        "Vessel Name",
        "Shipping Line",
        "Ports",
        "Terminals",
        "Duration",
        "Date",
        "Operational Status",
        "Trade Type",
        "Container No",
        "Booking Reference No.",
        "Bill of Lading",
        "Customs Declaration No"
      ])
      this.containerHidden = false;
      this.doHidden = false;
      this.billHidden = false;
      this.customsDHidden = false;
      this.bookingHidden = false;
      this.tradeTypeDisabled = false;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.rotationNoHidden = false;
      this.vesselNameHidden = false;
      this.shippingLineHidden = false;
      this.operationStatusHidden = false;
      this.portHidden = false;
      this.terminalHidden = false;
    }
    else if (this.voyageEnquirySearchRequestModel.tradeType == 'Inbound') {
      this.enableSortTitle(["Rotation Number",
        "Vessel Name",
        "Shipping Line",
        "Ports",
        "Terminals",
        "Duration",
        "Date",
        "Operational Status",
        "Trade Type",
        "Container No",
        "DO No",
        "Bill of Lading",
        "Customs Declaration No"
      ])
      this.containerHidden = false;
      this.doHidden = false;
      this.billHidden = false;
      this.customsDHidden = false;
      this.bookingHidden = false;
      this.tradeTypeDisabled = false;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.rotationNoHidden = false;
      this.vesselNameHidden = false;
      this.shippingLineHidden = false;
      this.operationStatusHidden = false;
      this.portHidden = false;
      this.terminalHidden = false;
    }
    else {
      this.enableSortTitle(["Rotation Number",
        "Vessel Name",
        "Shipping Line",
        "Ports",
        "Terminals",
        "Duration",
        "Date",
        "Operational Status",
        "Trade Type"
      ])
      this.rotationNoHidden = false;
      this.vesselNameHidden = false;
      this.shippingLineHidden = false;
      this.containerHidden = true;
      this.doHidden = true;
      this.billHidden = true;
      this.customsDHidden = true;
      this.bookingHidden = true;
      this.tradeTypeDisabled = true;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.operationStatusHidden = false;
      this.portHidden = false;
      this.terminalHidden = false;
    }
    // this.voyageEnquirySearchRequestModel.etaFromDateSearch = null;
    // this.voyageEnquirySearchRequestModel.etaToDateSearch = null;

  }

  rotationnoChange() {
    if (null != this.voyageEnquirySearchRequestModel.rotationNumberSearch
      && this.voyageEnquirySearchRequestModel.rotationNumberSearch.length > 0) {
      this.vesselNameHidden = true;
      this.shippingLineHidden = true;
      this.durationHidden = true;
      this.etaHidden = true;
      this.operationStatusHidden = true;
      this.tradeTypeHidden = true;
      this.portHidden = true;
      this.terminalHidden = true;
      this.containerHidden = true;
      this.doHidden = true;
      this.billHidden = true;
      this.customsDHidden = true;
      this.bookingHidden = true;
    }
    else {
      this.vesselNameHidden = false;
      this.shippingLineHidden = false;
      this.durationHidden = false;
      this.etaHidden = false;
      this.operationStatusHidden = false;
      this.tradeTypeHidden = false;
      this.portHidden = false;
      this.terminalHidden = false;
      if (this.voyageEnquirySearchRequestModel.operationalStatusSearch == null)
        this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.selected;

      if (!this.isOpenService) {
        if (this.voyageEnquirySearchRequestModel.tradeType == 'Outbound') {
          this.enableSortTitle(["Rotation Number",
            "Vessel Name",
            "Shipping Line",
            "Ports",
            "Terminals",
            "Duration",
            "Date",
            "Operational Status",
            "Trade Type",
            "Container No",
            "Booking Reference No.",
            "Bill of Lading",
            "Customs Declaration No"
          ])
          this.containerHidden = false;
          this.doHidden = false;
          this.billHidden = false;
          this.customsDHidden = false;
          this.bookingHidden = false;
          this.tradeTypeDisabled = false;
          this.rotationNoHidden = false;
          this.vesselNameHidden = false;
          this.shippingLineHidden = false;
          this.operationStatusHidden = false;
          this.portHidden = false;
          this.terminalHidden = false;
        }
        else if (this.voyageEnquirySearchRequestModel.tradeType == 'Inbound') {
          this.enableSortTitle(["Rotation Number",
            "Vessel Name",
            "Shipping Line",
            "Ports",
            "Terminals",
            "Duration",
            "Date",
            "Operational Status",
            "Trade Type",
            "Container No",
            "DO No",
            "Bill of Lading",
            "Customs Declaration No"
          ])
          this.containerHidden = false;
          this.doHidden = false;
          this.billHidden = false;
          this.customsDHidden = false;
          this.bookingHidden = false;
          this.tradeTypeDisabled = false;
          this.rotationNoHidden = false;
          this.vesselNameHidden = false;
          this.shippingLineHidden = false;
          this.operationStatusHidden = false;
          this.portHidden = false;
          this.terminalHidden = false;
        }
        else {
          this.enableSortTitle(["Rotation Number",
            "Vessel Name",
            "Shipping Line",
            "Ports",
            "Terminals",
            "Duration",
            "Date",
            "Operational Status",
            "Trade Type"
          ])
          this.rotationNoHidden = false;
          this.vesselNameHidden = false;
          this.shippingLineHidden = false;
          this.containerHidden = true;
          this.doHidden = true;
          this.billHidden = true;
          this.customsDHidden = true;
          this.bookingHidden = true;
          this.tradeTypeDisabled = true;
          this.voyageEnquirySearchRequestModel.doNo = null;
          this.voyageEnquirySearchRequestModel.containerNo = null;
          this.voyageEnquirySearchRequestModel.billOfLading = null;
          this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
          this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
          this.operationStatusHidden = false;
          this.portHidden = false;
          this.terminalHidden = false;
        }
      }

    }
  }

  containerNoChange() {
    if (null != this.voyageEnquirySearchRequestModel.containerNo
      && this.voyageEnquirySearchRequestModel.containerNo.length > 0) {
      this.rotationNoHidden = true;
      this.voyageEnquirySearchRequestModel.rotationNumberSearch = null;
      this.vesselNameHidden = true;
      // this.voyageEnquirySearchRequestModel.vesselNameSearch = null;
      this.shippingLineHidden = true;
      // this.voyageEnquirySearchRequestModel.shippingLineSearch = null;
      this.doHidden = true;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.billHidden = true;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.customsDHidden = true;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.bookingHidden = true;
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.operationStatusHidden = true;
      this.portHidden = true;
      this.terminalHidden = true;
    }
    else {
      this.rotationNoHidden = false;
      this.vesselNameHidden = false;
      this.shippingLineHidden = false;
      this.doHidden = false;
      this.billHidden = false;
      this.customsDHidden = false;
      this.bookingHidden = false;
      this.operationStatusHidden = false;
      this.portHidden = false;
      this.terminalHidden = false;
      // this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.selected;
    }
  }

  doNoChange() {
    if (null != this.voyageEnquirySearchRequestModel.doNo
      && this.voyageEnquirySearchRequestModel.doNo.length > 0) {
      this.containerHidden = true;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.rotationNoHidden = true;
      this.voyageEnquirySearchRequestModel.rotationNumberSearch = null;
      this.vesselNameHidden = true;
      // this.voyageEnquirySearchRequestModel.vesselNameSearch = null;
      this.shippingLineHidden = true;
      // this.voyageEnquirySearchRequestModel.shippingLineSearch = null;
      this.billHidden = true;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.customsDHidden = true;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.operationStatusHidden = true;
      this.bookingHidden = true;
      this.portHidden = true;
      this.terminalHidden = true;
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
    }
    else {
      this.containerHidden = false;
      this.rotationNoHidden = false;
      this.vesselNameHidden = false;
      this.shippingLineHidden = false;
      this.billHidden = false;
      this.customsDHidden = false;
      this.operationStatusHidden = false;
      // this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.selected;
      this.bookingHidden = true;
      this.portHidden = false;
      this.terminalHidden = false;
    }
  }

  billChange() {
    if (null != this.voyageEnquirySearchRequestModel.billOfLading
      && this.voyageEnquirySearchRequestModel.billOfLading.length > 0) {
      this.containerHidden = true;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.rotationNoHidden = true;
      this.voyageEnquirySearchRequestModel.rotationNumberSearch = null;
      this.vesselNameHidden = true;
      // this.voyageEnquirySearchRequestModel.vesselNameSearch = null;
      this.shippingLineHidden = true;
      // this.voyageEnquirySearchRequestModel.shippingLineSearch = null;
      this.doHidden = true;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.customsDHidden = true;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.operationStatusHidden = true;
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.bookingHidden = true;
      this.portHidden = true;
      this.terminalHidden = true;
    }
    else {
      this.containerHidden = false;
      this.rotationNoHidden = false;
      this.vesselNameHidden = false;
      this.shippingLineHidden = false;
      this.bookingHidden = false;
      this.doHidden = false;
      this.customsDHidden = false;
      this.operationStatusHidden = false;
      // this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.selected;
      this.portHidden = false;
      this.terminalHidden = false;
    }
  }

  customsChange() {
    if (null != this.voyageEnquirySearchRequestModel.customsDeclarationNo
      && this.voyageEnquirySearchRequestModel.customsDeclarationNo.length > 0) {
      this.billHidden = true;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.rotationNoHidden = true;
      this.voyageEnquirySearchRequestModel.rotationNumberSearch = null;
      this.vesselNameHidden = true;
      // this.voyageEnquirySearchRequestModel.vesselNameSearch = null;
      this.shippingLineHidden = true;
      // this.voyageEnquirySearchRequestModel.shippingLineSearch = null;
      this.doHidden = true;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.containerHidden = true;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.operationStatusHidden = true;
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = null;
      this.bookingHidden = true;
      this.portHidden = true;
      this.terminalHidden = true;
    }
    else {
      this.billHidden = false;
      this.rotationNoHidden = false;
      this.vesselNameHidden = false;
      this.shippingLineHidden = false;
      this.bookingHidden = false;
      this.doHidden = false;
      this.customsDHidden = false;
      this.operationStatusHidden = false;
      // this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.selected;
      this.portHidden = false;
      this.terminalHidden = false;
      this.containerHidden = false;
    }
  }


  onDurationChanged() {
    if (this.voyageEnquirySearchRequestModel.durationSearch == "") {
      this.etaHidden = false;
    } else {
      this.etaHidden = true;
    }
  }

  bookingChange() {
    if (this.voyageEnquirySearchRequestModel.bookingReferenceNo.length > 0) {
      this.billHidden = true;
      this.voyageEnquirySearchRequestModel.billOfLading = null;
      this.rotationNoHidden = true;
      this.voyageEnquirySearchRequestModel.rotationNumberSearch = null;
      this.vesselNameHidden = true;
      // this.voyageEnquirySearchRequestModel.vesselNameSearch = null;
      this.shippingLineHidden = true;
      // this.voyageEnquirySearchRequestModel.shippingLineSearch = null;
      this.containerHidden = true;
      this.voyageEnquirySearchRequestModel.containerNo = null;
      this.customsDHidden = true;
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = null;
      this.operationStatusHidden = true;
      this.doHidden = true;
      this.voyageEnquirySearchRequestModel.doNo = null;
      this.portHidden = true;
      this.terminalHidden = true;
    }
    else {
      this.billHidden = false;
      this.rotationNoHidden = false;
      this.vesselNameHidden = false;
      this.shippingLineHidden = false;
      this.containerHidden = false;
      this.customsDHidden = false;
      this.operationStatusHidden = false;
      this.doHidden = true;
      this.portHidden = false;
      this.terminalHidden = false;
      this.voyageEnquirySearchRequestModel.operationalStatusSearch = this.selected;
    }
  }

  disableDone() {

    if(this.validate(this.voyageEnquirySearchRequestModel.rotationNumberSearch,'^((?!(0))[0-9]*)$'))
    {
      return true;
    }
    else if (null != this.voyageEnquirySearchRequestModel.rotationNumberSearch
      && this.voyageEnquirySearchRequestModel.rotationNumberSearch.length > 0) {
      return false;
    }
    if (this.validate(this.voyageEnquirySearchRequestModel.vesselNameSearch,this.inputStringPattern))
    {
      return true;
    }
    if(this.validate(this.voyageEnquirySearchRequestModel.shippingLineSearch,this.inputStringPattern))
    {
      return true;
    }
    if(this.validate(this.voyageEnquirySearchRequestModel.doNo,this.DONumberPattern))
    {
      return true;
    }
    if(this.validate(this.voyageEnquirySearchRequestModel.billOfLading,this.inputStringPattern))
    {
      return true;
    }
    if(this.validate(this.voyageEnquirySearchRequestModel.customsDeclarationNo,this.inputStringPattern))
    {
      return true;
    }
    if(this.validate(this.voyageEnquirySearchRequestModel.bookingReferenceNo,this.inputStringPattern))
    {
      return true;
    }
    if (this.voyageEnquirySearchRequestModel.doNo) {

      if (this.voyageEnquirySearchRequestModel.doNo.length < 6) {
        return true;
      }
      else
      {
        return false;
      }
    }
    else if (this.voyageEnquirySearchRequestModel.containerNo) {
      if (this.voyageEnquirySearchRequestModel.containerNo.length < 3) {
        return true;
      }
      else {
        return false;
      }
    }

    else if (this.voyageEnquirySearchRequestModel.tradeType == 'Outbound'
      || this.voyageEnquirySearchRequestModel.tradeType == 'Inbound') {
      if (((this.voyageEnquirySearchRequestModel.doNo != null && this.voyageEnquirySearchRequestModel.doNo.length > 0) ||
          (this.voyageEnquirySearchRequestModel.containerNo != null && this.voyageEnquirySearchRequestModel.containerNo.length > 0) ||
          (this.voyageEnquirySearchRequestModel.billOfLading != null && this.voyageEnquirySearchRequestModel.billOfLading.length > 0) ||
          (this.voyageEnquirySearchRequestModel.customsDeclarationNo != null && this.voyageEnquirySearchRequestModel.customsDeclarationNo.length > 0) ||
          (this.voyageEnquirySearchRequestModel.bookingReferenceNo != null && this.voyageEnquirySearchRequestModel.bookingReferenceNo.length > 0))) {
        return false;
      }
      else {
        return true;
      }
    }

  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'vesselName') {
      this.voyageEnquirySearchRequestModel.vesselNameSearch = e.target.value;
    }
    else if (model == 'shippingLine') {
      this.voyageEnquirySearchRequestModel.shippingLineSearch = e.target.value;
    }
    else if (model == 'rotationNumber') {
      this.voyageEnquirySearchRequestModel.rotationNumberSearch = e.target.value;
    }
    else if (model == 'DONumber') {
      let tempDo: string = e.target.value;
      if (tempDo.length <= 30) {
        this.voyageEnquirySearchRequestModel.doNo = e.target.value;
        this.prevvalidDno = e.target.value;
      } else {
        this.voyageEnquirySearchRequestModel.doNo = this.prevvalidDno;
      }
    }
    else if (model == 'containerNumber') {
      let tempCn: string = e.target.value;
      if (tempCn.length <= 11) {
        this.voyageEnquirySearchRequestModel.containerNo = e.target.value;
        this.prevvalidCno = e.target.value;
      } else {
        this.voyageEnquirySearchRequestModel.containerNo = this.prevvalidCno;
      }
      this.voyageEnquirySearchRequestModel.containerNo = e.target.value;
    }
    else if (model == 'billofLoading') {
      this.voyageEnquirySearchRequestModel.billOfLading = e.target.value;
    }
    else if (model == 'BookingReferenceNo') {
      this.voyageEnquirySearchRequestModel.bookingReferenceNo = e.target.value;
    }
    else if (model == 'customsDeclarationNo') {
      this.voyageEnquirySearchRequestModel.customsDeclarationNo = e.target.value;
    }

  }

  parsedate(dtstring) {
    if (dtstring != null && dtstring.length > 5) {
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

  keyboardClose() {
    this.keyboard.close();
  }

}

export class ServiceProviderCode {
  serviceProviderCode: string = "SP";
}

export class Ports {
  portName: string;
  portCode: string;
  status: boolean = true;

  constructor(name: string, code: string) {
    this.portName = name;
    this.portCode = code;
  };
}

export class Terminal {

  terminalName: string;
  terminalCode: string;
  status: boolean = true;
  port: string;

  constructor(name: string, code: string, port: string) {
    this.terminalName = name;
    this.terminalCode = code;
    this.port = port;

  };
}
