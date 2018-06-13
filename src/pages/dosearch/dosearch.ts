import {Component, ViewChild} from '@angular/core';
import {Alert, AlertController, Content, IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {FormBuilder} from '@angular/forms';

import {DeliveryorderreqModel} from '../../shared/model/deliveryorder/deliveryorderreq.model';
import {DeliveryorderservicesProvider} from "../../providers/webservices/deliveryorderservices";

import {RotationNumberMasterModel} from '../../shared/model/deliveryorder/rotationnumber/rotationnumberreq.model';

import {RotationnumberrespModel} from '../../shared/model/deliveryorder/rotationnumber/rotationnumberresp.model';
import {RotationnumberresplistModel} from '../../shared/model/deliveryorder/rotationnumber/rotationnumberresplist.model';

import {DatePipe} from '@angular/common';

import {ChacoderesplistModel} from "../../shared/model/deliveryorder/chacode/chacoderesplist.model";
import {ChacodeModel} from "../../shared/model/deliveryorder/chacode/chacode.model";
import {DocreatePage} from "../docreate/docreate";
import {Keyboard} from '@ionic-native/keyboard';
import {Utils} from "../../shared/utils";
import {RetrievereqModel} from "../../shared/model/deliveryorder/retrievereq.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {SearchdeliveryorderreqModel} from "../../shared/model/deliveryorder/searchdeliveryorder/searchdeliveryorderreq.model";

/**
 * Generated class for the DosearchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dosearch',
  templateUrl: 'dosearch.html',
  providers: [Utils, DeliveryorderreqModel, DeliveryorderservicesProvider, RotationNumberMasterModel, RotationnumberrespModel, RotationnumberresplistModel, SearchdeliveryorderreqModel]
})
export class DosearchPage {
  insiderotatenumber: any;
  createdFromDate: any;
  createdToDate: any;
  pattern = /06([0-9]{6,18})/;
  dateFormat: string = 'DD/MM/YYYY';
  searchdetails: RotationnumberrespModel[];
  public showrotatenum: boolean = false;
  maxvalue: any;
  vesselname: any;
  voyageno: any;
  imono: any;
  alertobj: Alert;
  etadatefrom: any;
  etadateto: any;
  shippingAgentName: string = "port";
  loc: any ;
  spname: any ;
  spnames: any = [];
  locations: any = [];
  doTypeList: DefinedSetResModel[] = [];
  tradeTypeList: DefinedSetResModel[] = [];
  delivaryToList: DefinedSetResModel[] = [];
  statusList: DefinedSetResModel[] = [];
  public definedSetListModel: DefinedsetresListModel[];
  private submit: boolean = false;
  showRotationNo: boolean;
  selectedStatus: string;
  selectedDotype: string;
  selectedTradetype: string;
  rotatenumber: string;
  selectedigmMrnNo: string;
  dORequestNo: string;
  agentReferenceNo: string;
  selectedBillNo: string;
  selectedHouseBillNo: string;
  selectediMONo: string;
  selectedcontainerNo:string;
  selectedVesselName: string;
  selectedVoyageNo: string;
  selectedDelivaryTo: string;
  frieghtForwarderCode: string;
  consigneeCode: string;
  cFSCode: string;
  emptyYardCode: string;
  filterRotationArray: any;
  showFrieght: boolean = false;
  showEmpty: boolean = false;
  showCFS: boolean = false;
  showConsignee: boolean = false;
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
  showFrieghtSug: boolean;
  showCHASug: boolean;
  showCFSSug: boolean;
  showEmptySSug: boolean;
  showConsigneeSug: boolean;
  hbiolArrayfromResp: string[];
  freightArrayfromResp: string[];
  consigneeArrayfromResp: string[];
  chaArrayfromResp: string[];
  cfsArrayfromResp: string[];
  emptyArrayfromResp: string[];
  mrnHidden: boolean = true;
  bLoHidden: boolean = true;
  hbLoHidden: boolean= true;
  tradeHidden: boolean = true;
  public verifyReq: RetrievereqModel;
  mandatory: boolean = false;
  lengthCheck: boolean = false;
  hiddenFields : boolean;
  public unregisterBackButtonAction: any;

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  constructor(public keyboard: Keyboard, public navCtrl: NavController, public datepipe: DatePipe,
              public rotationnumberrespmodel: RotationnumberrespModel,
              public rotationnumbermastermodel: RotationNumberMasterModel,
              public rotationnumberresplistmodel: RotationnumberresplistModel,
              public deliveryorderservicesprovider: DeliveryorderservicesProvider,
              public deliveryorderreqmodel: DeliveryorderreqModel,
              public doServiceProvider: DeliveryorderservicesProvider,
              private commonServices: CommonservicesProvider,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public utils: Utils,
              public searchdeliveryorderreqmodel: SearchdeliveryorderreqModel,
              private alertCtrl: AlertController) {

    this.searchdeliveryorderreqmodel = this.navParams.get("filter");
    this.doTypeList = this.navParams.get("doTypeList");
    this.tradeTypeList = this.navParams.get("tradeTypeList");
    this.delivaryToList = this.navParams.get("delivaryToList");
    this.statusList =  this.navParams.get("statusList");
    this.locations = this.navParams.get("locations");

    this.loc =  this.searchdeliveryorderreqmodel.portSearch;
    this.spname = this.searchdeliveryorderreqmodel.terminalSearch;
    this.selectedDotype = this.searchdeliveryorderreqmodel.dOtypeSearch;
    this.selectedTradetype = this.searchdeliveryorderreqmodel.tradeTypeSearch;
    this.dORequestNo = this.searchdeliveryorderreqmodel.dORequestNoSearch;
    this.agentReferenceNo = this.searchdeliveryorderreqmodel.agentDoNoSearch;
    this.rotatenumber = this.searchdeliveryorderreqmodel.rotationNoSearch;
    this.selectedigmMrnNo = this.searchdeliveryorderreqmodel.mRNNumberSearch;
    this.selectedHouseBillNo = this.searchdeliveryorderreqmodel.houseBillofLadingSearch;
    this.selectedBillNo = this.searchdeliveryorderreqmodel.billofLadingNumberSearch;
    this.selectedcontainerNo = this.searchdeliveryorderreqmodel.containerNoSearch;
    this.selectedDelivaryTo =  this.searchdeliveryorderreqmodel.deliveryToSearch;
    this.frieghtForwarderCode  =this.searchdeliveryorderreqmodel.frieghtForwarderSearch;
    this.consigneeCode = this.searchdeliveryorderreqmodel.consigneeSearch;
    this.cFSCode = this.searchdeliveryorderreqmodel.cFSSearch;
    this.emptyYardCode = this.searchdeliveryorderreqmodel.emptyYardSearch;
    this.selectedStatus = this.searchdeliveryorderreqmodel.statusSearch;


    if(this.loc == null || this.loc == "") {
      if(this.locations && this.locations.length > 0) {
        this.loc = this.locations[0];
      }
    }
    else {
      this.valueselected();
    }
    if(this.spname == null || this.spname == "") {
      if(this.spnames && this.spnames.length > 0) {
        this.spname = this.spnames[0];
      }
      else {
        this.spnames[0] = "--Select--";
        this.spname = this.spnames[0];
      }
    }

    if(this.selectedTradetype == null || this.selectedTradetype == "") {
      if(this.tradeTypeList && this.tradeTypeList.length > 0) {
        this.selectedTradetype = this.tradeTypeList[0].definedSetValueCode;
      }
    }

    if(this.selectedDotype == null || this.selectedDotype == "") {
      if(this.doTypeList && this.doTypeList.length > 0) {
        this.selectedDotype = this.doTypeList[0].definedSetValueCode;
      }
    }
    this.typeSelected();
    this.tradeSelected();

    if(this.selectedDelivaryTo == null || this.selectedDelivaryTo == "") {
      if(this.delivaryToList && this.delivaryToList.length > 0) {
        this.selectedDelivaryTo = this.delivaryToList[0].definedSetValueCode;
      }
    }
    else if (this.selectedDelivaryTo == 'Freight Forwarder') {
      this.showFrieght = true;
      this.showEmpty = false;
      this.showCFS = false;
      this.showConsignee = false;
    }

    else if (this.selectedDelivaryTo == 'Consignee') {
      this.showFrieght = false;
      this.showEmpty = false;
      this.showCFS = false;
      this.showConsignee = true;
    }

    else if (this.selectedDelivaryTo == 'CFS') {
      this.showFrieght = false;
      this.showEmpty = false;
      this.showCFS = true;
      this.showConsignee = false;
    }

    else if (this.selectedDelivaryTo == 'Empty Yard') {
      this.showFrieght = false;
      this.showEmpty = true;
      this.showCFS = false;
      this.showConsignee = false;
    }


    if(this.selectedStatus == null) {
      if(this.statusList && this.statusList.length > 0) {
        this.selectedStatus = this.statusList[0].definedSetValueCode;
      }
    }

    this.maxvalue = new Date().toISOString();

    if (null == localStorage.getItem('DOSearchCreatedFrom') || ("" == localStorage.getItem('DOSearchCreatedFrom'))) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
    }
    else {
      this.createdFromDate =  localStorage.getItem('DOSearchCreatedFrom');
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

    if(this.dORequestNo && this.dORequestNo.length > 0) {
      this.hiddenFields = true;
    }
    else {
      this.hiddenFields = false;
    }

  }


  openDOCreate() {
    this.navCtrl.push(DocreatePage);
  }


  validate(model, format) {
    if(model!=null && model.length>0)
    {
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

  searchrotatenum() {
    this.showrotatenum = !this.showrotatenum;
    this.insiderotatenumber = this.rotatenumber;
  }


  getRotationNo(ev: any) {
    // if the value is an empty string don't filter the items
    this.filterRotationArray = [];

    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.rotatenumber;
    } else {
      val = ev.target.value;
    }

    if (val && val.trim() != '') {
      // Filter the items
      this.filterRotationArray = this.searchdetails.filter((item) => {
        return (item.rotationNo != null && item.rotationNo.toLowerCase().includes(val.toLowerCase()));
      });
    }
    if (this.filterRotationArray.length == 0) {
      this.showRotationNo = false;
    }
    else {
      this.showRotationNo = true;
    }
  }


  deliverytoselected() {

    this.frieghtForwarderCode = "";
    this.consigneeCode = "";
    this.cFSCode = '';
    this.emptyYardCode = '';
    if (this.selectedDelivaryTo == 'Freight Forwarder') {
      this.showFrieght = true;
      this.showEmpty = false;
      this.showCFS = false;
      this.showConsignee = false;
    }

    else if (this.selectedDelivaryTo == 'Consignee') {
      this.showFrieght = false;
      this.showEmpty = false;
      this.showCFS = false;
      this.showConsignee = true;
    }

    else if (this.selectedDelivaryTo == 'CFS') {
      this.showFrieght = false;
      this.showEmpty = false;
      this.showCFS = true;
      this.showConsignee = false;
    }

    else if (this.selectedDelivaryTo == 'Empty Yard') {
      this.showFrieght = false;
      this.showEmpty = true;
      this.showCFS = false;
      this.showConsignee = false;
    }
    else {
      this.showFrieght = false;
      this.showEmpty = false;
      this.showCFS = false;
      this.showConsignee = false;
    }
  }

  loaddetails() {
    this.rotationnumbermastermodel.eTADateFrom = "";
    this.rotationnumbermastermodel.eTADateTo = "";
    this.rotationnumbermastermodel.iMONo = "";
    this.rotationnumbermastermodel.rotationNo = "";
    this.rotationnumbermastermodel.vesselName = "";
    this.rotationnumbermastermodel.voyageNo = "";
  }

  valueselected() {
    if(this.loc == "--Select--") {
      this.deliveryorderreqmodel.port = "";
    }else{
      this.deliveryorderreqmodel.port = this.loc;
    }
    this.deliveryorderservicesprovider.getTerminalMaster(this.deliveryorderreqmodel)
      .subscribe(response => {
          console.log('SUCCESS');
          this.deliveryorderreqmodel = <DeliveryorderreqModel>response;
          this.spnames = this.deliveryorderreqmodel.terminalMaster;
          if(this.spnames && this.spnames.length > 0) {
            this.spnames.unshift("--Select--");
          }
          else {
            this.spnames[0] = "--Select--";
          }
          console.log('SP NAMES ' + this.spnames)
        },
        error => {

        });
     if(this.spnames && this.spnames.length > 0) {
       this.spname = this.spnames[0];
     }
  }


  getItems() {

    this.loaddetails();
    if (this.insiderotatenumber) {
      console.log('INSIDE ROT NUM' + this.insiderotatenumber);
      this.rotationnumbermastermodel.rotationNo = this.insiderotatenumber;
    }
    if (this.vesselname) {
      this.rotationnumbermastermodel.vesselName = this.vesselname;
    }
    if (this.voyageno) {
      this.rotationnumbermastermodel.voyageNo = this.voyageno;
    }
    if (this.imono) {
      this.rotationnumbermastermodel.iMONo = this.imono;
    }
    if (this.etadatefrom) {
      this.rotationnumbermastermodel.eTADateFrom = this.etadatefrom;
    }
    if (this.etadateto) {
      this.rotationnumbermastermodel.eTADateTo = this.etadateto;
    }
    this.searchrotatenumber();


  }

  searchrotatenumber() {
    this.deliveryorderservicesprovider.getRotationMaster(this.rotationnumbermastermodel)
      .subscribe(response => {
          this.rotationnumberresplistmodel = <RotationnumberresplistModel>response;
          this.searchdetails = this.rotationnumberresplistmodel.list;
          this.getRotationNo(null);
        },
        error => {
          var errorMessage = <any>error;
          console.log('ERROR');
        });
  }

  hideRotation() {
    setTimeout(() => {
      if (this.validate(this.rotatenumber, '^[0-9]{0,18}$')) {
        this.rotatenumber = '';
        this.presentAlert("ATTENTION", 'Rotation No is Invalid.');
        return;
      }
      if (this.rotatenumber && this.rotatenumber.length > 0) {
        this.intializeVerifiy();
        this.doServiceProvider.verifyValidRotationNo(this.verifyReq)
          .subscribe(response => {
              if (response == true) {
                this.rotatenumber = '';
                this.presentAlert("ATTENTION", 'Rotation No is Invalid.');
              }
            },
            error => {
            });
      }
      this.showRotationNo = false;
    }, 500);
  }

  intializeVerifiy() {
    this.verifyReq = new RetrievereqModel();
    this.verifyReq.billofLadingNo = this.selectedBillNo;
    this.verifyReq.doType = this.selectedDotype;
    this.verifyReq.hbillofLadingNo = this.selectedHouseBillNo;
    this.verifyReq.rotationNo =  this.rotatenumber;
  }

  selectRotation(item: any) {
    this.rotatenumber = item.rotationNo;
    this.selectediMONo = item.iMONo;
    this.selectedVesselName = item.vesselName;
    this.selectedVoyageNo = item.voyageNo;
    this.showRotationNo = false;
  }

  setcountandstate(s) {
    this.rotatenumber = s.rotationNo;
    this.showrotatenum = !this.showrotatenum;
  }

  dateCheck() {
    if (this.createdFromDate > this.createdToDate) {
      this.presentAlert("Attention", "From Date should be less than To Date.");
      return false;
    }
    else {
      return true;
    }
  }

  showDOresults() {
    setTimeout(() => {
    if(this.lengthCheck)
      return;
    else if(this.validate(this.dORequestNo,'^[0-9]{0,18}$') ||
      this.validate(this.selectedigmMrnNo,'^[a-z0-9A-Z]{0,30}$') ||
      this.validate(this.selectedHouseBillNo,'^[a-z0-9A-Z]{0,30}$') ||
      this.validate(this.selectedBillNo,'^[a-z0-9A-Z]{0,30}$') ||
      this.validate(this.selectedcontainerNo,'^[a-z0-9A-Z]{0,11}$')) {
      this.mandatory = true;
      this.presentAlert("Attention", "Please enter valid characters");
      return;
    }

    else if ((this.dORequestNo == null || this.dORequestNo.length == 0) && !this.dateCheck()) {
      return;
    }
    else {

      if (this.loc == "--Select--") {
        this.searchdeliveryorderreqmodel.portSearch = "";
      }
      else {
        this.searchdeliveryorderreqmodel.portSearch = this.loc;
      }
      if (this.spname == "--Select--") {
        this.searchdeliveryorderreqmodel.terminalSearch = "";
      }
      else {
        this.searchdeliveryorderreqmodel.terminalSearch = this.spname;
      }
      if (this.createdFromDate) {
        localStorage.setItem('DOSearchCreatedFrom', this.createdFromDate);
      } else {
        localStorage.setItem('DOSearchCreatedFrom', '');
      }

      if (this.createdToDate) {
        localStorage.setItem('DOSearchCreatedTo', this.createdToDate);
      } else {
        localStorage.setItem('DOSearchCreatedTo', '');
      }

      let varcreatedFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
      let varcreatedToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
      this.searchdeliveryorderreqmodel.fromDateSearch = varcreatedFromDate;
      this.searchdeliveryorderreqmodel.toDateSearch = varcreatedToDate;

      this.searchdeliveryorderreqmodel.dOtypeSearch = this.selectedDotype;
      this.searchdeliveryorderreqmodel.tradeTypeSearch = this.selectedTradetype ;
      this.searchdeliveryorderreqmodel.dORequestNoSearch = this.dORequestNo;
      this.searchdeliveryorderreqmodel.agentDoNoSearch = this.agentReferenceNo;
      this.searchdeliveryorderreqmodel.rotationNoSearch =  this.rotatenumber;
      this.searchdeliveryorderreqmodel.mRNNumberSearch = this.selectedigmMrnNo;
      this.searchdeliveryorderreqmodel.houseBillofLadingSearch = this.selectedHouseBillNo;
      this.searchdeliveryorderreqmodel.billofLadingNumberSearch = this.selectedBillNo;
      this.searchdeliveryorderreqmodel.containerNoSearch = this.selectedcontainerNo;
      this.searchdeliveryorderreqmodel.deliveryToSearch = this.selectedDelivaryTo;
      this.searchdeliveryorderreqmodel.frieghtForwarderSearch = this.frieghtForwarderCode  ;
      this.searchdeliveryorderreqmodel.consigneeSearch =  this.consigneeCode;
      this.searchdeliveryorderreqmodel.cFSSearch = this.cFSCode;
      this.searchdeliveryorderreqmodel.emptyYardSearch = this.emptyYardCode;
      this.searchdeliveryorderreqmodel.statusSearch  =this.selectedStatus;

      this.submit = true;

      this.navCtrl.pop();
    }
    }, 500);
  }

  reset() {
    if( this.locations &&  this.locations.length >0 ) {
      this.loc = this.locations[0];
    }
    if( this.spnames &&  this.spnames.length >0 ) {
      this.spname = this.spnames[0];
    }
    if(this.doTypeList && this.doTypeList.length > 0) {
      this.selectedDotype = this.doTypeList[0].definedSetValueCode;
    }
    if(this.tradeTypeList && this.tradeTypeList.length > 0) {
      this.selectedTradetype = this.tradeTypeList[0].definedSetValueCode;
    }
    if(this.delivaryToList && this.delivaryToList.length > 0) {
      this.selectedDelivaryTo = this.delivaryToList[0].definedSetValueCode;
    }
    if(this.statusList && this.statusList.length > 0) {
      this.selectedStatus = this.statusList[0].definedSetValueCode;
    }
    this.dORequestNo = "";
    this.agentReferenceNo = "";
    this.rotatenumber = "";
    this.selectedigmMrnNo = "";
    this.selectedHouseBillNo = "";
    this.selectedBillNo = "";
    this.selectedcontainerNo = "";
    this.frieghtForwarderCode = "";
    this.consigneeCode = "";
    this.cFSCode = "";
    this.emptyYardCode = "";
    this.createdFromDate = new Date();
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    this.createdToDate = new Date().toISOString();
    this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');


    this.showFrieght = false;
    this.showEmpty = false;
    this.showCFS = false;
    this.showConsignee = false;
    this.tradeHidden = true;
    this.mrnHidden = true;
    this.bLoHidden = true;
    this.hbLoHidden = true;

    this.submit = false;

  }

  getFrieghtItems(ev: any) {
    this.filterFrieghtArray = [];
    // set val to the value of the searchbar
    let val = ev.target.value;
    //this.filterFrieghtArray = this.frieghtRespCodeModel;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterFrieghtArray = this.frieghtRespCodeModel.filter((item) => {
        return (item.companyCode != null && item.companyCode.toLowerCase().includes(val.toLowerCase()));
      })
    }
    if (this.filterFrieghtArray.length == 0) {
      this.showFrieghtSug = false;
    }
    else {
      this.showFrieghtSug = true;
    }
  }

  getFrieghtFromService() {
    this.lengthCheck = true;
    this.freightArrayfromResp = [];
    let stringArray: string[];
    let freightCodeModel: ChacodeModel;
    let freightCodeModelList: ChacoderesplistModel;
    freightCodeModel = new ChacodeModel;
    this.frieghtRespCodeModel = new Array<ChacodeModel>();
    freightCodeModel.companyCode = "";
    freightCodeModel.companyName = "";
    freightCodeModel.ffCode = "";
    this.deliveryorderservicesprovider.getFrieghtForwarderCode(freightCodeModel)
      .subscribe(response => {
          freightCodeModelList = <ChacoderesplistModel>response;
          this.frieghtRespCodeModel = freightCodeModelList.list;

          for (let frieghtNumberElement of this.frieghtRespCodeModel) {
            this.freightArrayfromResp.push(frieghtNumberElement.companyCode);
          }
          /*Removing Duplicates*/
          stringArray = Array.from(new Set(this.freightArrayfromResp));
          this.freightArrayfromResp = stringArray;
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  hideFrieghtSuggestion(ev: any) {
    setTimeout(() => {
      if(this.frieghtForwarderCode && this.frieghtForwarderCode.length > 0) {
        this.lengthCheck = true;
      }
      else {
        this.lengthCheck = false;
      }
      if(this.validate(this.frieghtForwarderCode,'^[a-zA-Z0-9 ]*$'))  {
        this.frieghtForwarderCode= "" ;
        this.presentAlert("ATTENTION", 'Freight Forwarder Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let chacodeModelArray: ChacodeModel[] = [];
        let searchResp: ChacodeModel = new ChacodeModel;
        let freightCodeModelList: ChacoderesplistModel;
        let freightCodeModel: ChacodeModel = new ChacodeModel;
        freightCodeModel.companyCode = this.frieghtForwarderCode;
        freightCodeModel.companyName = '';
        freightCodeModel.ffCode = '';
        this.doServiceProvider.getFrieghtForwarderCode(freightCodeModel)
          .subscribe(response => {
              freightCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = freightCodeModelList.list;
              if (chacodeModelArray.length == 0) {
                this.frieghtForwarderCode = "";
                this.presentAlert("Attention", 'Frieght Forwarder Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(element =>
                  element.companyCode.toString().toLowerCase() == this.frieghtForwarderCode.toString().toLowerCase())
                if (!searchResp) {
                  this.frieghtForwarderCode = "";
                  this.presentAlert("Attention", 'Frieght Forwarder Company Code is Invalid.');
                } else {
                  this.frieghtForwarderCode = searchResp.companyCode;
                  this.lengthCheck = false;
                }
              }

            },
            error => {
              this.lengthCheck = false;
              var errorMessage = <any>error;
              //Show error message
            });
        this.showFrieghtSug = false;
      }
    }, 500);
  }

  onSelectFrieght(item: any) {
    this.frieghtForwarderCode = item.companyCode;
    this.showFrieghtSug = false;
  }


  getConsigneeItems(ev: any) {

    this.filterConsigneeArray = [];
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterConsigneeArray = this.consigneeRespCodeModel.filter((item) => {
        return (item.companyCode != null && item.companyCode.toLowerCase().includes(val.toLowerCase()));
      })
    }
    if (this.filterConsigneeArray.length == 0) {
      this.showConsigneeSug = false;
    }
    else {
      this.showConsigneeSug = true;
    }
  }

  getConsigneeFromService() {
    this.lengthCheck = true;
    this.consigneeArrayfromResp = [];
    let stringArray: string[];
    let consigneeCodeModel: ChacodeModel;

    let consigneeCodeModelList: ChacoderesplistModel;
    consigneeCodeModel = new ChacodeModel;
    this.consigneeRespCodeModel = new Array<ChacodeModel>();
    consigneeCodeModel.companyCode = "";
    consigneeCodeModel.companyName = "";
    consigneeCodeModel.ieCode = "";
    this.deliveryorderservicesprovider.getConsigneeCode(consigneeCodeModel)
      .subscribe(response => {
          consigneeCodeModelList = <ChacoderesplistModel>response;
          this.consigneeRespCodeModel = consigneeCodeModelList.list;

          for (let consigneeNumberElement of this.consigneeRespCodeModel) {
            this.consigneeArrayfromResp.push(consigneeNumberElement.companyCode);
          }

          /*Removing Duplicates*/
          stringArray = Array.from(new Set(this.consigneeArrayfromResp));
          this.consigneeArrayfromResp = stringArray;

        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  hideConsigneeSuggestion(ev : any) {
    setTimeout(() => {
      if(this.consigneeCode && this.consigneeCode.length > 0) {
        this.lengthCheck = true;
      }
      else {
        this.lengthCheck = false;
      }
      if(this.validate(this.consigneeCode,'^[a-zA-Z0-9 ]*$')) {
        this.consigneeCode= "";
        this.presentAlert("ATTENTION", 'Consignee Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let searchResp: ChacodeModel = new ChacodeModel;
        let chacodeModelArray: ChacodeModel[] = [];
        let consigneeCodeModelList: ChacoderesplistModel;
        let consigneeCodeModel: ChacodeModel = new ChacodeModel;
        consigneeCodeModel.companyCode = this.consigneeCode;
        consigneeCodeModel.companyName = '';
        consigneeCodeModel.ieCode = "";
        this.doServiceProvider.getConsigneeCode(consigneeCodeModel)
          .subscribe(response => {
              consigneeCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = consigneeCodeModelList.list;

              if (chacodeModelArray.length == 0) {
                this.consigneeCode = "";
                this.presentAlert("Attention", 'Consignee Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(element =>
                  element.companyCode.toString().toLowerCase() == this.consigneeCode.toString().toLowerCase())
                if (!searchResp) {
                  this.consigneeCode = "";
                  this.presentAlert("Attention", 'Consignee Company Code is Invalid.');
                } else {
                  this.consigneeCode = searchResp.companyCode;
                  this.lengthCheck = false;
                }
              }

            },
            error => {
              this.lengthCheck = false;
              var errorMessage = <any>error;
              //Show error message
            });
        this.showConsigneeSug = false;
      }    }, 500);
  }

  onSelectConsignee(item: any) {
    this.consigneeCode = item.companyCode;
    this.showConsigneeSug = false;
  }


  getCFSItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    this.filterCFSArray = [];
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterCFSArray = this.cfsRespCodeModel.filter((item) => {
        return (item.companyCode != null && item.companyCode.toLowerCase().includes(val.toLowerCase()));
      })
    }
    if (this.filterCFSArray.length == 0) {
      this.showCFSSug = false;
    }
    else {
      this.showCFSSug = true;
    }
  }

  getCFSFromService() {
    this.lengthCheck = true;
    this.cfsArrayfromResp = [];
    let stringArray: string[];
    let cfsCodeModel: ChacodeModel;

    let cfsCodeModelList: ChacoderesplistModel;
    cfsCodeModel = new ChacodeModel;
    this.cfsRespCodeModel = new Array<ChacodeModel>();
    cfsCodeModel.companyCode = "";
    cfsCodeModel.companyName = "";
    cfsCodeModel.cfsCode = "";
    this.deliveryorderservicesprovider.getCFSCode(cfsCodeModel)
      .subscribe(response => {
          cfsCodeModelList = <ChacoderesplistModel>response;
          this.cfsRespCodeModel = cfsCodeModelList.list;

          for (let cfsNumberElement of this.cfsRespCodeModel) {
            this.cfsArrayfromResp.push(cfsNumberElement.companyCode);
          }

          /*Removing Duplicates*/
          stringArray = Array.from(new Set(this.cfsArrayfromResp));
          this.cfsArrayfromResp = stringArray;

        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  hideCFSSuggestion(ev  :any) {
    setTimeout(() => {
      if(this.cFSCode && this.cFSCode.length > 0) {
        this.lengthCheck = true;
      }
      else {
        this.lengthCheck = false;
      }
      if(this.validate(this.cFSCode,'^[a-zA-Z0-9 ]*$')) {
        this.cFSCode= "";
        this.presentAlert("ATTENTION", 'CFS Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let chacodeModelArray: ChacodeModel[] = [];
        let searchResp: ChacodeModel = new ChacodeModel;
        let cfsCodeModelList: ChacoderesplistModel;
        let cfsCodeModel: ChacodeModel = new ChacodeModel;
        cfsCodeModel.companyCode = this.cFSCode;
        cfsCodeModel.companyName = '';
        cfsCodeModel.cfsCode = "";
        this.doServiceProvider.getCFSCode(cfsCodeModel)
          .subscribe(response => {
              cfsCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = cfsCodeModelList.list;
              if (chacodeModelArray.length == 0) {
                this.cFSCode = "";
                this.presentAlert("Attention", 'CFS Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(element =>
                  element.companyCode.toString().toLowerCase() == this.cFSCode.toString().toLowerCase())
                if (!searchResp) {
                  this.cFSCode = "";
                  this.presentAlert("Attention", 'CFS Company Code is Invalid.');
                } else {
                  this.cFSCode = searchResp.companyCode;
                  this.lengthCheck = false;
                }
              }

            },
            error => {
              this.lengthCheck = false;
              var errorMessage = <any>error;
              //Show error message
            });
        this.showCFSSug = false;
      }
    }, 500);
  }

  onSelectCFS(item: any) {
    this.cFSCode = item.companyCode;
    this.showCFSSug = false;
  }


  getEmptyItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;
    this.filterEmptyArray = [];
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterEmptyArray = this.emptyRespCodeModel.filter((item) => {
        return (item.companyCode != null && item.companyCode.toLowerCase().includes(val.toLowerCase()));
      })
    }
    if (this.filterEmptyArray.length == 0) {
      this.showEmptySSug = false;
    }
    else {
      this.showEmptySSug = true;
    }
  }

  getEmptyFromService() {
    this.lengthCheck = true;
    this.emptyArrayfromResp = [];
    let stringArray: string[];
    let emptyCodeModel: ChacodeModel;

    let emptyCodeModelList: ChacoderesplistModel;
    emptyCodeModel = new ChacodeModel;
    this.chaRespCodeModel = new Array<ChacodeModel>();
    emptyCodeModel.companyCode = "";
    emptyCodeModel.companyName = "";
    emptyCodeModel.eyCode = "";
    this.deliveryorderservicesprovider.getEmptyCode(emptyCodeModel)
      .subscribe(response => {
          emptyCodeModelList = <ChacoderesplistModel>response;
          this.emptyRespCodeModel = emptyCodeModelList.list;

          for (let cfsNumberElement of this.emptyRespCodeModel) {
            this.emptyArrayfromResp.push(cfsNumberElement.companyCode);
          }

          /*Removing Duplicates*/
          stringArray = Array.from(new Set(this.emptyArrayfromResp));
          this.emptyArrayfromResp = stringArray;

        },
        error => {

        });
  }

  hideEmptySuggestion(ev :any) {
    setTimeout(() => {
      if(this.emptyYardCode && this.emptyYardCode.length > 0) {
        this.lengthCheck = true;
      }
      else {
        this.lengthCheck = false;
      }
      if(this.validate(this.emptyYardCode, '^[a-zA-Z0-9 ]*$')) {
        this.emptyYardCode = "";
        this.presentAlert("ATTENTION", 'Empty Yard Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let chacodeModelArray: ChacodeModel[] = [];
        let emptyCodeModelList: ChacoderesplistModel;
        let searchResp: ChacodeModel = new ChacodeModel;
        let emptyCodeModel: ChacodeModel = new ChacodeModel;
        emptyCodeModel.companyCode = this.emptyYardCode;
        emptyCodeModel.companyName = '';
        emptyCodeModel.eyCode = "";
        this.doServiceProvider.getEmptyCode(emptyCodeModel)
          .subscribe(response => {
              emptyCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = emptyCodeModelList.list;

              if (chacodeModelArray.length == 0) {
                this.emptyYardCode = "";
                this.presentAlert("Attention", 'Empty Yard Company Code is Invalid.');
              }
              else {
                searchResp = chacodeModelArray.find(emptyYardElement =>
                  emptyYardElement.companyCode.toString().toLowerCase() == this.emptyYardCode.toString().toLowerCase())
                if (!searchResp) {
                  this.emptyYardCode = "";
                  this.presentAlert("Attention", 'Empty Yard Company Code is Invalid.');
                } else {
                  this.emptyYardCode= searchResp.companyCode;
                  this.lengthCheck = false;
                }
              }
            },
            error => {
              this.lengthCheck = false;
              var errorMessage = <any>error;
              //Show error message
            });
        this.showEmptySSug = false;
      }    }, 500);
  }

  onSelectEmpty(item: any) {
    this.emptyYardCode = item.companyCode;
    this.showEmptySSug = false;
  }

  typeSelected() {
    if (this.selectedDotype == "Empty") {
      this.selectedigmMrnNo = "";
      this.selectedHouseBillNo = "";
      this.selectedBillNo = "";
      if(this.tradeTypeList && this.tradeTypeList.length > 0) {
        this.selectedTradetype = this.tradeTypeList[0].definedSetValueCode;
      }
      this.mrnHidden = false;
      this.bLoHidden = false;
      this.hbLoHidden = false;
      this.tradeHidden = true;

    }
    else if (this.selectedDotype == "FCL") {
      this.mrnHidden = true;
      this.bLoHidden = true;
      this.hbLoHidden = true;
      this.tradeHidden = false;
      if(this.tradeTypeList && this.tradeTypeList.length > 0) {
        if( this.selectedTradetype=="") {
        this.selectedTradetype = this.tradeTypeList[0].definedSetValueCode;
        }
      }    }
    else if (this.selectedDotype == "LCL" || this.selectedDotype == "") {
      this.mrnHidden = true;
      this.bLoHidden = true;
      this.hbLoHidden = true;
      this.tradeHidden = true;
      if(this.tradeTypeList && this.tradeTypeList.length > 0) {
        this.selectedTradetype = this.tradeTypeList[0].definedSetValueCode;
      }
    }
  }

  tradeSelected() {
    if (this.selectedDotype == "FCL" && this.selectedTradetype== "Foreign") {
      this.selectedHouseBillNo = "";
      this.hbLoHidden = false;
      this.bLoHidden=true;
      this.mrnHidden = true;
    }
    else if (this.selectedDotype == "FCL" && this.selectedTradetype == "Coastal") {
      this.selectedigmMrnNo = "";
      this.selectedHouseBillNo = "";
      this.selectedBillNo = "";
      this.mrnHidden = false;
      this.bLoHidden = false;
      this.hbLoHidden = false;
    }
    else if (this.selectedDotype == "FCL" && this.selectedTradetype == '') {
      this.mrnHidden = true;
      this.bLoHidden = true;
      this.hbLoHidden = true;
    }
  }

  keyUpValidate(e, format, model) {

    this.utils.keyUpValidate(e, format);
    if (model == 'rotateNumber') {
      this.rotatenumber = e.target.value;
    }
    else if (model == 'domrnno') {
      this.selectedigmMrnNo = e.target.value;
    }
    else if (model == 'dohousebillno') {
      this.selectedHouseBillNo = e.target.value;
    }
    else if (model == 'dobillno') {
      this.selectedBillNo = e.target.value;
    }
    else if (model == 'docontainerno') {
      this.selectedcontainerNo = e.target.value;
    }
    else if (model == 'dorequestno') {
      this.dORequestNo = e.target.value;
    }
    else if (model == 'frieghtForwarderCode') {
      this.frieghtForwarderCode = e.target.value;
    }
    else if (model == 'consigneeCode') {
      this.consigneeCode = e.target.value;
    }
    else if (model == 'cFSCode') {
      this.cFSCode = e.target.value;
    }
    else if (model == 'emptyYardCode') {
      this.emptyYardCode = e.target.value;
    }

  }

  onFocusChangeofContainerNo() {
    if (this.selectedcontainerNo && this.selectedcontainerNo != '' && this.selectedcontainerNo.length != 11
      && this.utils.validate(this.selectedcontainerNo, '^[a-z0-9A-Z]{0,11}$')) {

      this.presentAlert("Alert", "Please enter exact 11 characters");
      this.selectedcontainerNo = "";
      this.lengthCheck = true;
    }
    else {
      this.lengthCheck = false;
    }
  }

  onFocusChangeofDoRequest() {
    if (this.dORequestNo != '' && this.dORequestNo.length < 6) {
      this.presentAlert("Alert", "Please enter atleast 6 characters");
      this.dORequestNo = "";
    }
  }

  onFocusChangeofAgentRequest() {
    if (this.agentReferenceNo && this.agentReferenceNo != '' && this.agentReferenceNo.length < 3
        && this.agentReferenceNo.length > 30) {

      this.presentAlert("Alert", "Please enter atleast 3 valid characters");
      this.agentReferenceNo = "";
      this.lengthCheck = true;
    }
    else {
      this.lengthCheck = false;
    }
  }

  onFocusChangeofMNR() {
    if (this.selectedigmMrnNo && this.selectedigmMrnNo != '' &&
      this.utils.validate(this.selectedigmMrnNo, '^[a-z0-9A-Z]{3,30}$')) {

      this.presentAlert("Alert", "Please enter atleast 3 valid characters");
      this.selectedigmMrnNo = "";
      this.lengthCheck = true;
    }
    else {
      this.lengthCheck = false;
    }
  }

  onFocusChangeofHouse() {
    if (this.selectedHouseBillNo && this.selectedHouseBillNo != ''
      && this.utils.validate(this.selectedHouseBillNo, '^[a-z0-9A-Z]{3,30}$')) {

      this.presentAlert("Alert", "Please enter atleast 3 valid characters");
      this.selectedHouseBillNo = "";
      this.lengthCheck = true;
    }
    else {
      this.lengthCheck = false;
    }
  }

  onFocusChangeofBillNo() {
    if (this.selectedBillNo && this.selectedBillNo != '' &&
      this.utils.validate(this.selectedBillNo, '^[a-z0-9A-Z]{3,30}$')) {

      this.presentAlert("Alert", "Please enter atleast 3 valid characters");
      this.selectedBillNo = "";
      this.lengthCheck = true;
    }
    else {
      this.lengthCheck = false;
    }
  }

  requestNochange()  {
    if(null != this.dORequestNo &&
      this.dORequestNo.length > 0) {
      this.hiddenFields = true;
    }
    else {
      this.hiddenFields = false;
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }


  presentAlert(title: string, message: string) {
    this.alertobj = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'Dismiss',
          handler: () => {
            this.lengthCheck = false;
          }
        }]
    });
    if(this.navCtrl.getActive().name == "DosearchPage") {
      this.alertobj.present();
    }
  }
}
