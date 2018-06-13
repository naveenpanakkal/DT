import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {Utils} from "../../shared/utils";
import {DatePipe} from "@angular/common";
import {ShipServSchedSearchModel} from "../../shared/model/shipservsched/ssssearch.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {SSSServiceProvider} from "../../providers/webservices/sssservices";
import {ShipServSchedGetUserDataModel} from "../../shared/model/shipservsched/sssgetuserdata.model";
import {ShipServSchedLocationSOModel} from "../../shared/model/shipservsched/sssLocationSO.model";
import {Keyboard} from "@ionic-native/keyboard";
import {ShipServSchedVesselResultModel} from "../../shared/model/shipservsched/sssVessel.model";
import {ShipServSchedVesselSearchModel} from "../../shared/model/shipservsched/sssVesselSearch.model";
import {ShipServSchedVesselListModel} from "../../shared/model/shipservsched/sssVesselList.model";

/**
 * Generated class for the ShipServSchedSearchFilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shipservschedsearchfilter',
  templateUrl: 'shipservschedsearchfilter.html',
  providers: [Utils, ShipServSchedSearchModel, SSSServiceProvider, ShipServSchedGetUserDataModel, ShipServSchedLocationSOModel,ShipServSchedVesselResultModel,ShipServSchedVesselSearchModel,ShipServSchedVesselListModel]

})
export class ShipServSchedSearchFilterPage {
  sssCDF: string;
  sssCDT: string;
  definedSetListModel: DefinedsetresListModel[];
  roleList: any[];
  statusList: any[];
  advSearchList: any[];
  locationList: LocationModel[];
  spNameList: any[];

  advSrchAgentRef: boolean;
  advSrchLocation: boolean;
  advSrchSchedName: boolean;
  advSrchSchedCode: boolean;
  advSrchRole: boolean;
  advSrchVesselName: boolean;
  advSrchStatus: boolean;

  dateFormat: string = 'DD/MM/YYYY';
  sssLocationDataModelList: ShipServSchedLocationSOModel[];

  advSearchOption: boolean;
  defaultSelectOption: string;
  disableControls:boolean;

  shippingServiceScheduleNoSearch:any;
  startDateSearch:any;
  endDateSearch:any;
  locationSearch:string;
  spNameSearch:string;
  agentReferenceNoSearch:string;
  shippingServiceCodeSearch:string;
  shippingServiceNameSearch:string;
  role:string;
  vesselNameSearch:string;
  status:string;

  createdDateFrom:any;
  createdDateTo:any;

  alertMsg:string;
  alert : any;
  alertTitle:string;
  alertButtonOk:string;
  alertButtonDismiss:string;
  maxValue:any;
  error: boolean;
  vesselResultModelList:ShipServSchedVesselResultModel[];
  showVesselNameList:boolean;
  filterVesselArray:ShipServSchedVesselResultModel[];
  defaultRole:string = 'All';
  defaultStatus:string = 'All';
  errormsg : string;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public utils: Utils,
              public plt:Platform,
              public translate: TranslateService,
              public datepipe: DatePipe,
              public keyboard: Keyboard,
              public commonServices: CommonservicesProvider,
              public sssSearchReqModel: ShipServSchedSearchModel,
              public sssServiceProvider: SSSServiceProvider,
              public sssGetUserDataModel: ShipServSchedGetUserDataModel,
              private alertCtrl: AlertController,
              public vesselSearchModel:ShipServSchedVesselSearchModel) {

    this.sssSearchReqModel = this.navParams.get('sssSearchModel');
    this.defaultSelectOption = 'sssSelectOption';
    this.sssGetUserDataModel.userName = localStorage.getItem('LOGGEDINUSER')
    this.advSearchOption = false;
    this.disableControls = false;
    this.toggleCriteria(true);
    if(null != this.sssSearchReqModel && '' != this.sssSearchReqModel.shippingServiceScheduleNoSearch){
      this.disableControls = true;
    }
    this.maxValue = new Date().toISOString();
    this.alertTitle = this.utils.getLocaleString("sss_alert");
    this.alertButtonOk = this.utils.getLocaleString("sss_ok_text");
    this.alertButtonDismiss = this.utils.getLocaleString("sss_dismiss_txt");
    this.getDefinedSet();
    this.showVesselNameList = false;
    this.initDateFields();
    this.initFields();
  }

  initDateFields(){
      this.createdDateFrom = new Date();
      this.createdDateTo = new Date();
      this.createdDateFrom.setDate(this.createdDateTo.getDate() - 7);
      this.startDateSearch = this.datepipe.transform(this.createdDateFrom, 'yyyy-MM-dd');
      this.endDateSearch = this.datepipe.transform(this.createdDateTo, 'yyyy-MM-dd');
  }
  keyboardClose() {
    this.keyboard.close();
  }
  initFields() {
    this.shippingServiceScheduleNoSearch = this.sssSearchReqModel.shippingServiceScheduleNoSearch;
    if(this.sssSearchReqModel.startDateSearch !='') {
      this.startDateSearch = this.parsedate(this.sssSearchReqModel.startDateSearch);
    }
    if(this.sssSearchReqModel.endDateSearch != ''){
      this.endDateSearch = this.parsedate(this.sssSearchReqModel.endDateSearch);
    }
    this.locationSearch = this.sssSearchReqModel.locationSearch;
    this.spNameSearch = this.sssSearchReqModel.spNameSearch;
    this.agentReferenceNoSearch = this.sssSearchReqModel.agentReferenceNoSearch;
    this.shippingServiceCodeSearch = this.sssSearchReqModel.shippingServiceCodeSearch;
    this.shippingServiceNameSearch = this.sssSearchReqModel.shippingServiceNameSearch;
    this.role = (this.sssSearchReqModel.role == '')?this.defaultRole:this.sssSearchReqModel.role;
    this.status = (this.sssSearchReqModel.status == '')?this.defaultStatus:this.sssSearchReqModel.status;
    this.vesselNameSearch = this.sssSearchReqModel.vesselNameSearch;
    if(this.locationSearch.length > 0 || this.spNameSearch.length > 0 ||
        this.agentReferenceNoSearch.length > 0 || this.shippingServiceCodeSearch.length > 0 ||
        this.shippingServiceNameSearch.length > 0 || this.vesselNameSearch.length > 0 ||
        !this.status.startsWith(this.defaultStatus) || !this.role.startsWith(this.defaultRole)){
      this.advSearchOption = true;
      this.toggleCriteria(true);
    }
  }

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['SSS_STATUS', 'SSS_ROLE', 'SEARCH_BY_SSS'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {
            if (this.definedSetListModel[i].definedSetName == 'SSS_ROLE') {
              this.roleList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'SSS_STATUS') {
              this.statusList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'SEARCH_BY_SSS') {
              this.advSearchList = this.definedSetListModel[i].definedSetValues;
            }
          }
        },
        error => {
          //Show error message
        },
        () => {
          this.findSelectInRoleList();
          if (this.role == '') {
            this.role = this.defaultRole;
          }
          if(this.status == ''){
            this.status = this.defaultStatus;
          }

          this.getLocationList();

        }
      );
  }

  findSelectInRoleList() {
    for (let i = 0; i < this.roleList.length; i++) {
      if (this.roleList[i].definedSetValueCode == '') {
        this.roleList[i].definedSetValueCode = this.defaultSelectOption;
        return;
      }
    }
  }

  getLocationList() {
    this.locationList = [];
    this.locationList.push(new LocationModel(this.defaultSelectOption, this.defaultSelectOption));
    this.sssServiceProvider.sssGetLocationData(this.sssGetUserDataModel,true).subscribe(response => {
      this.sssLocationDataModelList = response.clientRegSpLocationSO;
      if (null != this.sssLocationDataModelList) {
        for (let i = 0; i < this.sssLocationDataModelList.length; i++) {
          if ((undefined == this.locationList.find(x => x.locationCode == this.sssLocationDataModelList[i].spLocationCode)) &&
            (this.sssLocationDataModelList[i].spLocationCode != null) &&
            (this.sssLocationDataModelList[i].serviceProviderCode == 'SP')) {
            this.locationList.push(new LocationModel(this.sssLocationDataModelList[i].spLocationCode, this.sssLocationDataModelList[i].spLocationName));
          }
        }
      }
    }, error => {
      //not handled
    }, () => {
      this.getSPNameList();
      if (this.locationSearch == '') {
        this.locationSearch = this.defaultSelectOption;
      }
    });
  }

  onLocationChanged() {
    this.getSPNameList();
    this.spNameSearch = this.defaultSelectOption;
  }

  getSPNameList() {
    this.spNameList = [];
    let spList: Array<string> = [];
    spList.push(this.defaultSelectOption);
    if (null != this.sssLocationDataModelList) {
      for (let i = 0; i < this.sssLocationDataModelList.length; i++) {
        if (this.locationSearch == this.sssLocationDataModelList[i].spLocationCode &&
          this.sssLocationDataModelList[i].serviceProviderCode == 'SP' &&
          this.sssLocationDataModelList[i].spSubLocationName != null) {
          spList.push(this.sssLocationDataModelList[i].spSubLocationName);
        }
      }
      this.spNameList = Array.from(new Set(spList));
    }
    if (this.spNameSearch == '') {
      this.spNameSearch = this.defaultSelectOption;
    }
  }

  sssNumberChanged(){
    if(this.shippingServiceScheduleNoSearch != ""){
      this.disableControls = true;
    }else{
      this.disableControls = false;
    }
  }

  reset() {
    console.log("On Reset");
    this.shippingServiceCodeSearch = '';
    this.shippingServiceNameSearch = '';
    this.locationSearch = this.defaultSelectOption;
    this.agentReferenceNoSearch = '';
    this.spNameSearch = this.defaultSelectOption;
    this.role = this.defaultRole;
    this.startDateSearch = '';
    this.endDateSearch = '';
    this.vesselNameSearch = '';
    this.shippingServiceScheduleNoSearch = '';
    this.status = this.defaultStatus;
    this.advSearchOption = false;
    this.toggleCriteria(true);
    this.initDateFields();
    this.content.scrollToTop(50);
    this.content.scrollToBottom(0);
  }

  parsedate(dtstring):string {
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

  showSearchResults() {
    setTimeout(() => {
        if (this.shippingServiceScheduleNoSearch != "") {
          if(!this.validate(this.shippingServiceScheduleNoSearch, '^[1-9][0-9]{0,18}$')) {
            this.error = false;
          }else {
            this.error = true;
            this.presentAlert("Attention", this.utils.getLocaleString("invalid_characters"));
            return;
          }
        }else if (!(this.agentReferenceNoSearch.length > 0 && this.validate(this.agentReferenceNoSearch, '^[a-zA-Z0-9 ]{3,30}$') ||
        this.shippingServiceCodeSearch.length > 0 && this.validate(this.shippingServiceCodeSearch, '^[a-zA-Z0-9 ]{3,30}$') ||
        this.shippingServiceNameSearch.length > 0 && this.validate(this.shippingServiceNameSearch, '^[a-zA-Z0-9 ]{3,255}$') ||
        this.vesselNameSearch.length > 0 && this.validate(this.vesselNameSearch, '^[a-zA-Z0-9 ]{3,255}$'))) {
          this.error = false;
        }else {
          this.error = true;
          this.presentAlert("Attention", this.utils.getLocaleString("invalid_characters"));
          return;
        }
        this.sssSearchReqModel.shippingServiceScheduleNoSearch = this.shippingServiceScheduleNoSearch;
        let sStartDate = this.parsedate(this.startDateSearch);
        let sEndDate = this.parsedate(this.endDateSearch);
        let startDate = new Date(this.datepipe.transform(sStartDate));
        let endDate = new Date(this.datepipe.transform(sEndDate));
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        if ((startDate > endDate) && (this.shippingServiceScheduleNoSearch == "")) {
          this.showAlert();
        } else {
          this.sssSearchReqModel.locationSearch = (this.locationSearch != this.defaultSelectOption) ? this.locationSearch : '';
          this.sssSearchReqModel.spNameSearch = (this.spNameSearch != this.defaultSelectOption) ? this.spNameSearch : '';
          this.sssSearchReqModel.role = (this.role != this.defaultSelectOption) ? this.role : '';
          this.sssSearchReqModel.status = this.status;
          this.sssSearchReqModel.agentReferenceNoSearch = this.agentReferenceNoSearch;
          this.sssSearchReqModel.vesselNameSearch = this.vesselNameSearch;
          this.sssSearchReqModel.shippingServiceCodeSearch = this.shippingServiceCodeSearch;
          this.sssSearchReqModel.shippingServiceNameSearch = this.shippingServiceNameSearch;
          this.startDateSearch = this.parsedate(this.startDateSearch);
          this.endDateSearch = this.parsedate(this.endDateSearch);
          let crtFromDate = this.datepipe.transform(this.startDateSearch, 'dd/MM/yyyy');
          let crtToDate = this.datepipe.transform(this.endDateSearch, 'dd/MM/yyyy');
          this.sssSearchReqModel.startDateSearch = crtFromDate;
          this.sssSearchReqModel.endDateSearch = crtToDate;
          this.navCtrl.pop();
          }
    },500);
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if(model == 'sssnumber') {
      this.shippingServiceScheduleNoSearch = e.target.value;
    }
    else if(model == 'sssAgentRefNumber') {
      this.agentReferenceNoSearch = e.target.value;
    }
    else if(model == 'sssSchedCode') {
      this.shippingServiceCodeSearch = e.target.value;
    }
    else if(model == 'sssSchedName') {
      this.shippingServiceNameSearch = e.target.value;
    }
    else if(model == 'sssVesselName') {
      this.vesselNameSearch = e.target.value;
    }
  }

  showAdvSearch() {
    if(!this.disableControls) {
      this.toggleCriteria(!this.advSearchOption);
      this.advSearchOption = !this.advSearchOption;
    }
  }

  getIcon() {
    if (!this.advSearchOption) {
      return 'arrow-dropdown';
    }
    else {
      return 'arrow-dropup';
    }
  }

  toggleCriteria(showCriteria:boolean){
    if(showCriteria){
      this.advSrchStatus = true;
      this.advSrchVesselName = true;
      this.advSrchRole = true;
      this.advSrchAgentRef = true;
      this.advSrchLocation = true;
      this.advSrchSchedName = true;
      this.advSrchSchedCode = true;
    }else{
      this.advSrchStatus = false;
      this.advSrchVesselName = false;
      this.advSrchRole = false;
      this.advSrchAgentRef = false;
      this.advSrchLocation = false;
      this.advSrchSchedName = false;
      this.advSrchSchedCode = false;
    }
  }

  showAlert() {
    this.alertMsg = this.utils.getLocaleString("sssInvalidDateAlert");
    this.alert = this.alertCtrl.create({
      title: this.alertTitle,
      message: this.alertMsg,
      buttons: [
        {
          text: this.alertButtonOk,
          handler: () => {
            this.alert.dismiss();
          }
        }
      ]
    });
    this.alert.present();
  }

  validate(model, format) {
    if(null != this.shippingServiceScheduleNoSearch && "" == this.shippingServiceScheduleNoSearch ) {
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
    }else
    {
      return false
    }

  }

  errorValidate(model, format) {
    if(null != this.shippingServiceScheduleNoSearch && "" == this.shippingServiceScheduleNoSearch ) {
      if (model && model.length == 0) {
        return false;
      }
      else if (model && model.length < 3) {
        this.errormsg = this.utils.getLocaleString("enter_3_char");
        return true;
      }
      else {
        if (this.validate(model, format)) {
          this.errormsg = this.utils.getLocaleString("invalid_characters")
          return true;
        }
        else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  presentAlert(title: string, message: string) {
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    this.alert.present();
  }

  getVesselName(ev: any) {
    let temp_vessel_result = this.vesselResultModelList;
    let val;
    if(ev == null)
    {
      val = this.vesselNameSearch;
    }else {
      val = ev.target.value;
    }
    this.filterVesselArray = [];
    if (val.length > 0) {
      if (null != temp_vessel_result && temp_vessel_result.length > 0) {
        this.filterVesselArray = temp_vessel_result.filter((item) => {
          return (item.vesselName != null && item.vesselName.toLowerCase().includes(val.toLowerCase()));
        });
      }
    }
    if(this.filterVesselArray.length > 0){
      this.showVesselNameList = true;
    }else{
      this.showVesselNameList = false;
    }
  }

  searchVesselName(){
    this.vesselSearchModel.imoNo = '';
    this.vesselSearchModel.vesselName = '';
    this.sssServiceProvider.sssGetVesselName(this.vesselSearchModel).subscribe(response => {
      let vesselList:ShipServSchedVesselListModel = <ShipServSchedVesselListModel>response;
      this.vesselResultModelList = vesselList.list;
      this.getVesselName(null);
    },error=>{
        console.log(this.error);
    },()=>{
    });
  }

  selectVesselName(item:ShipServSchedVesselResultModel){
    this.vesselNameSearch = item.vesselName;
    this.showVesselNameList = false;
    setTimeout(()=>{
      this.showVesselNameList = false;
    },100);

  }

  hideVesselNameList() {
    setTimeout(() => {
      this.showVesselNameList = false;
    }, 500);
  }
}

class LocationModel{
  locationCode:string;
  locationName:string;
  constructor(locCode:string,locName:string){
    this.locationCode = locCode;
    this.locationName = locName;
  }
}

