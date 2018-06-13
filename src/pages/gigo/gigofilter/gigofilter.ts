import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, NavController, NavParams,ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Utils} from "../../../shared/utils";
import {DatePipe} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {Keyboard} from '@ionic-native/keyboard';
import {GigoSearchSOModel} from "../../../shared/model/GIGO/gigosearch.model";
import {GigoDetailsSO, LocationMasterSO, SubLocationMasterSO} from "../../../shared/model/GIGO/gigodetails.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {createElementCssSelector} from "@angular/compiler";



/**
 * Generated class for the gigofilter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gigopagefilter',
  templateUrl: 'gigofilter.html',
  providers: [Utils,GigoSearchSOModel]
})

export class GiGoFilter {
  locationMasterModel: LocationMasterSO [] = [];
  /*locationList:string;*/
  //spNameList: any[] = [];
  dateFormat: string = "DD/MM/YYYY";
  inputStringPattern: string = "^[a-zA-Z0-9 ]*$";
  DONumberPattern: string = "^[a-zA-Z0-9 ]{6,}$";
  selected: string = "All";
  Errormsg: any;
  containerNoErrormsg: any;
  public moveTypeList: DefinedSetResModel[] = [];
  public gigoStatusList: DefinedSetResModel[] = [];
  public gigoReleasebyList: DefinedSetResModel[] = [];
  public booleanList: DefinedSetResModel[] = [];
  public damageList: DefinedSetResModel[] = [];
  public sublocationMasterModel: SubLocationMasterSO [] = [];
  public searchRequest: GigoSearchSOModel;
  submit: boolean = false;
  booleanListSeal: String;
  loc: string;
  alertMsg: string;
  spName: string;
  alertButtonOk: string;
  alertButtonDismiss: string;
  alerttitle: string;
  moveType: string;
  gigoNo: any;
  eIRNoSearch: string;
  chassisNoSearch: string;
  truckNoSearch: string;
  deliveryOrderNoSearch: string;
  containerAcceptanceNoSearch: string;
  containerNo: string;
  statusSearch: string;
  createdBy: string;
  createdFromDate: any;
  varcreatedFromDate: any;
  varcreatedToDate: any;
  damageSearch: string;
  createdToDate: any;
  sealSearch: string;
  maxDate: any;



  locationModel: GigoDetailsSO = new GigoDetailsSO();
  private selectedModel: GigoDetailsSO = new GigoDetailsSO();


  @ViewChild(Content) content: Content;

  constructor(public keyboard: Keyboard, public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage,
              public datepipe: DatePipe,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController, public utils: Utils,
              public formBuilder: FormBuilder,
              public gigoServiceProvider: GiGoServiceProvider,
              private commonServices: CommonservicesProvider,
  ) {
    //this.locationMasterModel = this.navParams.get('locationMasterModel');
    this.refineLocationData(this.navParams.get('locationMasterModel'));
    this.moveTypeList = this.navParams.get('moveTypeList');
    this.gigoStatusList = this.navParams.get('gigoStatusList');
    this.searchRequest = this.navParams.get('Request');
    this.booleanList = this.navParams.get('booleanList');
    this.damageList = this.navParams.get('booleanList');
    this.gigoReleasebyList = this.navParams.get('gigoReleasebyList');
    this.Errormsg =  this.utils.getLocaleString("invalid_characters");
    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.alertButtonDismiss = this.utils.getLocaleString("ca_dismiss_txt");
    this.alerttitle = this.utils.getLocaleString("ca_alert");

    //this.spNameList=this.navParams.get('loc// ationMasterModel');
    this.loc = this.searchRequest.locationSearch;
    this.moveType = this.searchRequest.moveTypeSearch;
    this.statusSearch = this.searchRequest.statusSearch;
    this.damageSearch = this.searchRequest.damageSearch;
    this.sealSearch = this.searchRequest.sealSearch;
    this.spName = this.searchRequest.spNameSearch;
    this.gigoNo = this.searchRequest.gateInGateOutNo;
    this.eIRNoSearch = this.searchRequest.eIRNoSearch;
    this.chassisNoSearch = this.searchRequest.chassisNoSearch;
    this.truckNoSearch = this.searchRequest.truckNoSearch;
    this.deliveryOrderNoSearch = this.searchRequest.deliveryOrderNoSearch;
    this.containerAcceptanceNoSearch = this.searchRequest.containerAcceptanceNoSearch;
    this.containerNo = this.searchRequest.containerNoSearch;
    this.createdBy = this.searchRequest.createdBy;




    if (this.loc && this.loc != null && this.loc != "") {
      this.onLocationChanged(false);
    }
      else
    {
      this.loc="";
    }



    if(!this.spName){
      this.spName = "";
    }

    if (this.moveType == null || this.moveType == "") {
      if (this.moveTypeList && this.moveTypeList.length > 0) {
        this.moveType = this.moveTypeList[0].definedSetValueCode;
      }
    }

    if (this.statusSearch == null || this.statusSearch == "") {
      if (this.gigoStatusList && this.gigoStatusList.length > 0) {
        this.statusSearch = this.gigoStatusList[0].definedSetValueCode;
      }

    }

    if (this.damageSearch == null || this.damageSearch == "") {
      if (this.damageList && this.damageList.length > 0) {
        this.damageSearch = this.damageList[0].definedSetValueCode;
      }


    }
    if (this.sealSearch == null || this.sealSearch == "") {
      if (this.booleanList && this.booleanList.length > 0) {
        this.sealSearch = this.booleanList[0].definedSetValueCode;
      }
    }
    if (this.createdBy == null || this.createdBy == "") {
      if (this.gigoReleasebyList && this.gigoReleasebyList.length > 0) {
        this.createdBy = this.gigoReleasebyList[0].definedSetValueCode;
      }
    }

    if (null == localStorage.getItem('gigoCreatedFrom') || ("" == localStorage.getItem('gigoCreatedFrom'))) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
    }
    else {
      this.createdFromDate = localStorage.getItem('gigoCreatedFrom');
      this.createdFromDate = new Date(this.createdFromDate);
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    }
    if (null == localStorage.getItem('gigoCreatedTo') || ("" == localStorage.getItem('gigoCreatedTo'))) {
      this.createdToDate = new Date().toISOString();
    }
    else {
      this.createdToDate = localStorage.getItem('gigoCreatedTo');
      this.createdToDate = new Date(this.createdToDate);
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
    }

    this.maxDate = new Date().toISOString();

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

  showAlert() {

    this.alertMsg = this.utils.getLocaleString("vesselfilteralert");
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
    alert.present();
  }

  ionViewWillEnter() {

    this.content.scrollToTop(0);
  }


  onLocationChanged(flag: boolean) {
    let masterModel = new GigoDetailsSO();
    masterModel.location = this.loc;
    this.gigoServiceProvider.gigoSPNameMaster(masterModel, false)
      .subscribe(response => {
          this.sublocationMasterModel = response.spNameMasterList;
        },
        error => {

        });
    if(flag) {
      this.spName = "";
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);

    if (model == 'gigo_no') {
      this.gigoNo = e.target.value;
    }
    else if (model == 'gigo_eir_no') {
      this.eIRNoSearch = e.target.value;
    }
    else if (model == 'gigo_chassis_no') {
      this.chassisNoSearch = e.target.value;
    }
    else if (model == 'gigo_truck_no') {
      this.truckNoSearch = e.target.value;
    }

    else if (model == 'gigo_delivery_order_no') {
      this.deliveryOrderNoSearch = e.target.value;
    }
    else if (model == 'gigo_container_Acceptance_no') {
      this.containerAcceptanceNoSearch = e.target.value;
    }
    else if (model == 'gigo_container_no') {
      this.containerNo = e.target.value;
    }

  }

  reset() {

    this.loc = "";
    this.spName = "";
    this.gigoNo = "";
    this.eIRNoSearch = "";
    this.chassisNoSearch = "";
    this.truckNoSearch = "";
    this.deliveryOrderNoSearch = "";
    this.containerAcceptanceNoSearch = "";
    this.containerNo = "";
    if (this.moveTypeList && this.moveTypeList.length > 0) {
      this.moveType = this.moveTypeList[0].definedSetValueCode;
    }
    if (this.gigoStatusList && this.gigoStatusList.length > 0) {
      this.statusSearch = this.gigoStatusList[0].definedSetValueCode;
    }
    if (this.gigoReleasebyList && this.gigoReleasebyList.length > 0) {
      this.createdBy = this.gigoReleasebyList[0].definedSetValueCode;
    }
    if (this.damageList && this.damageList.length > 0) {
      this.damageSearch = this.damageList[0].definedSetValueCode;
    }
    if (this.booleanList && this.booleanList.length > 0) {
      this.sealSearch = this.booleanList[0].definedSetValueCode;
    }

    this.createdFromDate = new Date();
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    this.createdToDate = new Date().toISOString();
    this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');


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

  refineLocationData(responseData:LocationMasterSO []){
    let tempResponse:LocationMasterSO []=[];
      for(let eachItem of responseData){
        if(eachItem.spLocationName && eachItem.spLocationCode){
          tempResponse.push(eachItem);
        }
      }
    this.locationMasterModel = this.removeDuplicates(tempResponse, 'spLocationName');
  }
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj =>
        mapObj[prop]).indexOf(obj[prop]) === pos; });
  }


  GigoSubmit() {


    this.submit = true;
    let fromDate: Date = new Date(this.createdFromDate);
    let toDate: Date = new Date(this.createdToDate);
    if (fromDate > toDate) {
      this.showAlert();
    }
else{

      if (!(this.validate(this.gigoNo, '^[0-9]{0,18}$')) &&
        !(this.validate(this.eIRNoSearch, '^[0-9a-zA-Z]{0,30}$')) &&
        !(this.validate(this.chassisNoSearch, '^[0-9a-zA-Z]{0,255}$')) &&
        !(this.validate(this.truckNoSearch, '^[0-9a-zA-Z]{0,18}$')) &&
        !(this.validate(this.containerNo , '^[0-9a-zA-Z]{0,255}$')) &&
        !this.containerNoValid() &&
        !(this.validate(this.containerAcceptanceNoSearch, '^[0-9a-zA-Z]{0,30}$')) &&
        !(this.validate(this.deliveryOrderNoSearch, '^[0-9a-zA-Z]{0,30}$')))
      {

    let varcreatedFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
    let varcreatedToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
    this.searchRequest.startDate = varcreatedFromDate;
    this.searchRequest.endDate = varcreatedToDate;
    if (this.createdFromDate) {
      localStorage.setItem('gigoCreatedFrom', this.createdFromDate);
    }
    else {
      localStorage.setItem('gigoCreatedFrom', '');
    }

    if (this.createdToDate) {
      localStorage.setItem('gigoCreatedTo', this.createdToDate);
    }
    else {
      localStorage.setItem('gigoCreatedTo', '');
    }
    this.searchRequest.moveTypeSearch = this.moveType;
    this.searchRequest.statusSearch = this.statusSearch;
    this.searchRequest.damageSearch = this.damageSearch;
    this.searchRequest.locationSearch = this.loc;
    this.searchRequest.spNameSearch = this.spName;
    this.searchRequest.gateInGateOutNo = this.gigoNo;
    this.searchRequest.eIRNoSearch = this.eIRNoSearch;
    this.searchRequest.chassisNoSearch = this.chassisNoSearch;
    this.searchRequest.truckNoSearch = this.truckNoSearch;
    this.searchRequest.deliveryOrderNoSearch = this.deliveryOrderNoSearch;
    this.searchRequest.containerAcceptanceNoSearch = this.containerAcceptanceNoSearch;
    this.searchRequest.sealSearch = this.sealSearch;
    this.searchRequest.containerNoSearch = this.containerNo;
    this.searchRequest.createdBy = this.createdBy;

    this.navCtrl.pop();

  }
}
  }



}
