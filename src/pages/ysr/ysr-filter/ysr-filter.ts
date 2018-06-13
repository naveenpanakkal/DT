import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';

import {Utils} from "../../../shared/utils";
import {YsrSortPage} from "../../../pages/ysr/ysr-sort/ysr-sort";
import {YisrSearchReqModel} from "../../../shared/model/YISR/yisrsearchreq.model";
import {YisrServiceProviderReqModel} from "../../../shared/model/YISR/yisrServiceProviderReq.model";
import {YisrServiceProviderResponseModel} from "../../../shared/model/YISR/yisrServiceProviderResponse.model";
import {YisrServicesProvider} from "../../../providers/webservices/yisrservices";
import {ClientRegSpCodeTypeSOModal,ClientRegSpLocationSO} from "../../../shared/model/rb/rbClientRegSpLocationSO.modal";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
/**
 * Generated class for the gigosort page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ysrfilter',
  templateUrl: 'ysr-filter.html',
  providers: [Utils,YisrServiceProviderReqModel,YisrServiceProviderResponseModel,YisrServicesProvider,YisrSearchReqModel]
})

export class YsrFilterPage {
  public clientRegSpLocationSO : ClientRegSpLocationSO[];
  location: string ;
  locations: string[] = [];
  templocation:string;
  lineCode: string ;
  lineCodeList: string[] = [];
  public tradetypeList: DefinedSetResModel[] = [];
  tradeType: string[] = [];
  sptypes: string[] = [];
  spType: string;
  tempstype:string;
  terminalList: string[] = [];
  terminal: string[] = [];
  tempTerminal:string;
  loadCategory: string[] = [];
  isHold: string;
  isoCode: string;
  dayStoredFrom: string;
  dayStoredTo: string;
  isDamage: string;
  public searchbyList:string[]= [];
  searchby: string;
  public clientRegSpCodeTypeSO : ClientRegSpCodeTypeSOModal[];
  clientRegSpCodeTypeSOtemp : ClientRegSpLocationSO[];
  public definedSetListModel: DefinedsetresListModel[];
  public boolList: DefinedSetResModel[] = [];
  public loadCategoryList: DefinedSetResModel[] = [];
  public popupSizeList: DefinedSetResModel[] = [];
  public popupFilterList: DefinedSetResModel[] = [];
  public popupReportList: DefinedSetResModel[] = [];
  tempsearchby:string;
  importList : string[] = [];
  exportList : string[] = [];
  storageList : string[] = [];
  constructor(public navParams: NavParams,public modalCtrl: ModalController,
              public utils:Utils, public viewCtrl: ViewController,
              private serviceProviderReqModel: YisrServiceProviderReqModel,
              private serviceProviderResponseModel: YisrServiceProviderResponseModel,
              public navCtrl: NavController,public yisrServices: YisrServicesProvider,
              private commonServices: CommonservicesProvider,private searchRequest: YisrSearchReqModel,) {
    this.getServiceProvider();
    this.getDefinedSet();
    this.importList = [this.utils.getLocaleString("rb_select"),this.utils.getLocaleString("rb_dono"),
                       this.utils.getLocaleString("ysr_crno"),this.utils.getLocaleString("cshContainerNo")];
    this.exportList = [this.utils.getLocaleString("rb_select"),this.utils.getLocaleString("rb_cano"),
                       this.utils.getLocaleString("cshContainerNo")];
    this.storageList = [this.utils.getLocaleString("rb_select"),this.utils.getLocaleString("rb_cano")];
    if (this.location == "" || this.location == "undefined") {
      this.location="";
    }
    if (this.spType == "" || this.spType == "undefined") {
      this.spType="";
    }
    if (this.terminal && this.terminal.length == 0) {
      this.terminal[0] ="";
    }
    if (this.searchby == "" || this.searchby == "undefined") {
      this.searchby="";
    }
    this.searchRequest = new YisrSearchReqModel();
  }
  private getServiceProvider() {
    this.serviceProviderReqModel.userName = localStorage.getItem('LOGGEDINUSER');
    this.yisrServices.getServiceProvider(this.serviceProviderReqModel,false).subscribe(respose=> {
        this.serviceProviderResponseModel = respose;
        this.clientRegSpLocationSO = this.serviceProviderResponseModel.clientRegSpLocationSO;
        this.clientRegSpCodeTypeSOtemp = JSON.parse(JSON.stringify(this.clientRegSpLocationSO));
        this.locations = [];
        for(let i=0,j=0;i < this.clientRegSpCodeTypeSOtemp.length;i++) {
          if(this.clientRegSpCodeTypeSOtemp[i].spLocationName) {
            this.templocation=this.locations.find(x =>x == this.clientRegSpCodeTypeSOtemp[i].spLocationName );
            if(!this.templocation){
              this.locations[j]=this.clientRegSpCodeTypeSOtemp[i].spLocationName;
              j++;
            }
          }
        }
        if (this.locations && this.locations.length > 0) {
          this.locations.unshift("--Select--")
        }
        else {
          this.locations[0] = "--Select--";
        }
      },
      error=> {

      });
  }
  private getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['BOOLEAN',  'YISR_TRADE_TYPE', 'LOAD_CATEGORY', 'POPUP_SIZE' , 'POPUP_FILTER',
      'POPUP_REPORT_FORMAT' , 'SEARCH_BY_YARD_INVENTORY'];
    definedSetReqModel.lang = 'en';
    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {

            if (this.definedSetListModel[i].definedSetName == 'BOOLEAN') {
              this.boolList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'YISR_TRADE_TYPE') {
              this.tradetypeList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'LOAD_CATEGORY') {
              this.loadCategoryList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'POPUP_SIZE') {
              this.popupSizeList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'POPUP_FILTER') {
              this.popupFilterList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'POPUP_REPORT_FORMAT') {
              this.popupReportList = this.definedSetListModel[i].definedSetValues;
            }
          }

          if (this.tradeType && this.tradeType.length == 0) {
            if (this.tradetypeList && this.tradetypeList.length > 0) {
              this.tradeType[0] = this.tradetypeList[0].definedSetValueCode;
            }
          }
          if (this.loadCategory && this.loadCategory.length == 0) {
            if (this.loadCategoryList && this.loadCategoryList.length > 0) {
              this.loadCategory[0] = this.loadCategoryList[0].definedSetValueCode;
            }
          }
          if (this.isHold == null || this.isHold == "") {
            if (this.boolList && this.boolList.length > 0) {
              this.isHold = this.boolList[0].definedSetValueCode;
            }
          }
          if (this.isDamage == null || this.isDamage == "") {
            if (this.boolList && this.boolList.length > 0) {
              this.isDamage = this.boolList[0].definedSetValueCode;
            }
          }
        },
        error => {
          //Show error message
        });
  }
  search(){
    this.searchRequest.location = "";
    this.searchRequest.lineCode = "";
    this.searchRequest.tradeType = "";
    this.searchRequest.spType = "";
    this.searchRequest.terminalYard = "";
    this.searchRequest.containerNo = "";
    this.searchRequest.isoCode = "";
    this.searchRequest.loadCategory = "";
    this.searchRequest.daysStoredFrom = "";
    this.searchRequest.daysStoredTo = "";
    this.searchRequest.isHold = this.isHold;
    this.searchRequest.damaged = this.isDamage;
    this.searchRequest.searchBy = "";
    this.searchRequest.caNo = "";
    this.searchRequest.crNo = "";
    this.searchRequest.doNo = "";
    this.searchRequest.rotationNo = "";
    this.navCtrl.push(YsrSortPage, {
      searchRequest: this.searchRequest
    });
  }
  reset()
  {

  }
  spLocSelected(){
    this.sptypes = [];
    this.clientRegSpCodeTypeSOtemp=this.clientRegSpLocationSO.filter(x =>x.serviceProviderName == this.location)
    for(let i=0,j=0;i < this.clientRegSpLocationSO.length;i++) {
      this.clientRegSpCodeTypeSO = this.clientRegSpLocationSO[i].clientRegSpCodeTypeSO;
      if(this.clientRegSpLocationSO[i].serviceProviderName && this.clientRegSpLocationSO[i].spLocationName == this.location) {
        this.tempstype=this.sptypes.find(x =>x == this.clientRegSpLocationSO[i].serviceProviderName );
        if(!this.tempstype){
          this.sptypes[j]=this.clientRegSpLocationSO[i].serviceProviderName;
          j++;
        }
      }

    }
    if (this.sptypes && this.sptypes.length > 0) {
      this.sptypes.unshift("--Select--")
    }
    else {
      this.sptypes[0] = "--Select--";
    }
  }
  spTypeSelected()
  {
    this.terminalList = [];
    this.clientRegSpCodeTypeSOtemp=this.clientRegSpLocationSO.filter(x =>x.spSubLocationName == this.spType)
    for(let i=0,j=0;i < this.clientRegSpLocationSO.length;i++) {
      this.clientRegSpCodeTypeSO = this.clientRegSpLocationSO[i].clientRegSpCodeTypeSO;
      if(this.clientRegSpLocationSO[i].spSubLocationName) {
        this.tempTerminal=this.terminalList.find(x =>x == this.clientRegSpLocationSO[i].spSubLocationName );
        if(!this.tempTerminal && this.clientRegSpLocationSO[i].spLocationName == this.location &&
          this.clientRegSpLocationSO[i].serviceProviderName == this.spType){
          this.terminalList[j]=this.clientRegSpLocationSO[i].spSubLocationName;
          j++;
        }
      }
    }
  }
  tradeTypeSelected() {
    this.searchbyList = [];
    let tradeList = [];
    for (let i = 0; i < this.tradeType.length; i++) {
      tradeList.push(this.tradeType[i]);
    }
    for (let i = 0; i < tradeList.length; i++) {
      if (tradeList[i] == "IMPORT" || tradeList[i] == "TS") {
        for (let j = 0; j < this.importList.length; j++) {
          this.tempsearchby=this.searchbyList.find(x =>x == this.importList[j]);
          if(!this.tempsearchby)
          {
            this.searchbyList.push(this.importList[j]);
          }
        }
      }
      else if (tradeList[i] == "EXPORT") {
        for (let j = 0; j < this.exportList.length; j++) {
          this.tempsearchby=this.searchbyList.find(x =>x == this.exportList[j]);
          if(!this.tempsearchby)
          {
            this.searchbyList.push(this.exportList[j]);
          }
        }
      }
      else if (tradeList[i] == "STORAGE") {
        for (let j = 0; j < this.storageList.length; j++) {
          this.tempsearchby=this.searchbyList.find(x =>x == this.storageList[j]);
          if(!this.tempsearchby)
          {
            this.searchbyList.push(this.storageList[j]);
          }
        }
      }
      else if (tradeList[i] == "") {
        this.searchbyList = [];
      }
    }
  }
}
