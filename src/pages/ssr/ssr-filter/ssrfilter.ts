import {Component, ViewChild} from '@angular/core';
import {Alert, AlertController, Content, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Utils} from "../../../shared/utils";
import {DatePipe} from "@angular/common";
import {FormBuilder,FormGroup, Validators} from "@angular/forms";
import {Keyboard} from '@ionic-native/keyboard';
import {GigoSearchSOModel} from "../../../shared/model/GIGO/gigosearch.model";
import {SSRSearchResult} from "../../../shared/model/ssr/ssrsearchresult.model";
import {GigoDetailsSO, LocationMasterSO, SubLocationMasterSO} from "../../../shared/model/GIGO/gigodetails.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {SsrServiceProvider} from "../../../providers/webservices/ssrservices";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {ServiceProviderMasterResponseModel} from '../../../shared/model/ssr/serviceprovidermasterresponse.model';
import {LocationMasterRequestModel} from '../../../shared/model/ssr/locationmasterreq.model';
import {LocationMasterResponseModel} from '../../../shared/model/ssr/locationmasterresponse.model';
import {SpecialServiceTypeReqModel} from '../../../shared/model/ssr/specialservicetypereq.model';
import {SpecialServiceTypeResponseModel} from '../../../shared/model/ssr/specialservicetyperesponse.model';
import {RotationResultDetails} from "../../../shared/model/rb/rbRotationResultDetails.modal";
import {
  RBTerminalModal,
  SearchByRotationResponseModal
} from "../../../shared/model/rb/rbSearchByRotationResponse.modal";
import {SearchByRotationReqModal} from "../../../shared/model/rb/rbSearchByRotationReq.modal";
import {RBServiceProvider} from "../../../providers/webservices/rbservices";
import {SaveUpdateReqModal} from "../../../shared/model/rb/rbSaveUpdateReq.modal";
import {SearchTerminalResponse} from "../../../shared/model/rb/rbSearchTerminalResult.modal";
import {ResourceMasterReqModal} from "../../../shared/model/rb/rbResourceMasterReq.modal";
import {ResourceMasterResponseModal} from "../../../shared/model/rb/rbResourceMasterResponse.modal";
import {RotationMaster} from "../../../shared/model/rb/rbRotationMaster";
import {RotationMasterResultModal} from "../../../shared/model/rb/rbRotationMasterResult.modal";
import {SSRSearchRequest} from '../../../shared/model/ssr/ssrsearchrequest.model';
import {CADOMasterResultDetails} from "../../../shared/model/rb/rbCADOResultDetails.modal";
import {CADOMasterResultModal} from "../../../shared/model/rb/rbCADOMasterResponse.modal";
import {CADOMasterReq} from "../../../shared/model/rb/rbCADOMasterReq.modal";
import {ValidationService} from "../../../shared/validation.service";

/**
 * Generated class for the ssrfilter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ssrfilter',
  templateUrl: 'ssrfilter.html',
  providers: [Utils,SSRSearchResult,SearchByRotationReqModal,SearchByRotationResponseModal,RBServiceProvider,SaveUpdateReqModal
    ,CADOMasterReq,SearchTerminalResponse,ResourceMasterReqModal,ResourceMasterResponseModal,RotationMaster,RotationMasterResultModal
    ,CADOMasterResultModal,SSRSearchRequest]
})

export class SsrFilter {
  locationMasterModel: LocationMasterSO [] = [];
  groupOne: FormGroup;
  ssrFilterList: any[] = [];
  spNameList: any[] = [];
  spLocationList: any[] = [];
  locationList: any[] = [];
  ssrTerminalList: any[] =[];
  specialServiceTypeList: any[];
  dateFormat: string = "DD/MM/YYYY HH:mm GST";
  inputStringPattern: string = "^[a-zA-Z0-9 ]*$";
  DONumberPattern: string = "^[a-zA-Z0-9 ]{6,}$";
  selected: string = "All";
  Errormsg: any;
  containerNoErrormsg: any;
  filterRotationArray: any;
  rotationno:any;
  resRequestNo:any;
  containerNo:any;
  caNo:any;
  doNo:any;
  rotationInValid:any;
  searchbyRotation:any;
  rotationResponseModal: RotationResultDetails[];
  createdFromDate: any;
  createdToDate: any;
  maxDate: any;
  alertobj:Alert;
  showingPopup: boolean = false;
  alertHeadding: string;
  selectedTerminal:any;
  location: string ;
  disableControls: boolean;
  alertMsg: string;
  alertButtonOk: string;
  alerttitle: string;
  searchByContainer:any;
  containerStatus : boolean = false;
  isError:boolean=false;
  filterCAArray:any;
  showCANo:boolean;
  filterDOArray:any;
  showDONo:boolean;
  searchCAdetails:CADOMasterResultDetails[];
  searchDOdetails:CADOMasterResultDetails[];
  public ssrSearchResult:SSRSearchResult[];
  public spTypeList: string[] = [];
  public serviceCategoryList: string[] = [];
  public searchByList: string[] = [];
  public serviceStatusList: string[] = [];
  public requestStatusList: string[] = [];
  public serviceProviderMasterResponse :ServiceProviderMasterResponseModel[]=[];
  public sublocationMasterModel: SubLocationMasterSO [] = [];
  public locationMasterResponseModel: LocationMasterResponseModel[] = [];
  public specialServiceTypeResponseModel: SpecialServiceTypeResponseModel [] = [];
  public spType: string;
  public spLocationName: string;
  public spSubLocationName: string;
  public ssrTerminalName: string;
  public serviceCategoryName: string;
  public ssrRequestNo: string;
  public cusRefNo: string;
  public requestStatus: string;
  public serviceStatus: string;
  public showSearchBy: boolean = false;
  public showRotationNo: boolean = false;
  public showRotationNoList: boolean = false;
  public saveUpdateReqModal : SaveUpdateReqModal;
  public terminalDependents: RBTerminalModal[] = [];
  private isSuccess: boolean;
  private resourceTypeList :string[] =[];
  public specialServiceTypeName: string;
  public  searchByCA:boolean = false;
  public  searchByDO:boolean = false;
  containerNoPattern: string = "^([a-zA-z0-9]{10,11})$";
  cadoPattern: string = "^[a-zA-z0-9]*$";
  rotationnoPattern:string = "^([a-zA-z0-9]{1,255})$";
  cusrefnoPattern:string = "^([a-zA-z0-9]{1,30})$";
  @ViewChild(Content) content: Content;

  constructor(public keyboard: Keyboard, public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage,
              public datepipe: DatePipe,
              public alertCtrl: AlertController,
              public viewCtrl: ViewController, public utils: Utils,
              public formBuilder: FormBuilder,
              public SsrServiceProvider: SsrServiceProvider,
              private commonServices: CommonservicesProvider,
              private searchByRotationReqModal: SearchByRotationReqModal,
              public rbServices: RBServiceProvider,
              private searchTerminalResponsemodal:SearchTerminalResponse,
              private resourceMasterReqModal: ResourceMasterReqModal,
              private resourceMasterResponseModal: ResourceMasterResponseModal,
              private rotationMasterResponseList: RotationMasterResultModal,
              private rotationMasterReqModal: RotationMaster,
              private cadoMasterReqModal: CADOMasterReq,
              public ssrSearchRequest_modal:SSRSearchRequest,
              private cadoMasterResponseList: CADOMasterResultModal
  ) {
    // this.locationMasterModel = this.navParams.get('locationMasterModel');

    this.groupOne = formBuilder.group({
      ssrRequestNo: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(255),ValidationService.numberValidate])],
      cusRefNo: ['', Validators.compose([Validators.minLength(3),Validators.maxLength(30),Validators.pattern(this.cusrefnoPattern)])],
      spType: [''],
      spLocationName: [''],
      spSubLocationName: [''],
      ssrTerminalName: [''],
      serviceCategoryName: [''],
      specialServiceTypeName: [''],
      searchByContainer: [''],
      rotationno: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(18),ValidationService.numberValidate])],
      containerNo: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(11),Validators.pattern(this.containerNoPattern)])],
      caNo:['', Validators.pattern(this.cadoPattern)],
      doNo:['', Validators.pattern(this.cadoPattern)],
      requestStatus:[''],
      serviceStatus:[''],
      createdFromDate: [''],
      createdToDate: [''],
    });

    this.ssrSearchRequest_modal = this.navParams.get('Request');
    this.spTypeList = this.navParams.get('spTypeList');
    this.serviceCategoryList = this.navParams.get('serviceCategoryList');
    this.searchByList = this.navParams.get('searchByList');
    this.serviceStatusList = this.navParams.get('serviceStatusList');
    this.requestStatusList = this.navParams.get('requestStatusList');
    this.serviceProviderMasterResponse = this.navParams.get('serviceProviderMasterResponse');
    this.maxDate = new Date().toISOString();
    this.saveUpdateReqModal = new SaveUpdateReqModal();
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.alerttitle = this.utils.getLocaleString("ca_alert");
    this.ssrRequestNo = this.ssrSearchRequest_modal.ssrRequestNoSrch;

    this.cusRefNo = this.ssrSearchRequest_modal.cusRefNoSrch;
    this.spType = this.ssrSearchRequest_modal.spTypeSrch;
    this.spLocationName = this.ssrSearchRequest_modal.locationSrch;
    this.spSubLocationName = this.ssrSearchRequest_modal.spNameSrch;
    this.ssrTerminalName = this.ssrSearchRequest_modal.terminalSrch;
    this.serviceCategoryName = this.ssrSearchRequest_modal.serviceCategorySrch;
    this.rotationno = this.ssrSearchRequest_modal.rotationNumber;
    this.specialServiceTypeName = this.ssrSearchRequest_modal.specialServiceSrch;
    this.searchByContainer = this.ssrSearchRequest_modal.searchBySrch;
    // this.ssrSearchRequest_modal.containerNoSrch = (this.containerNo == undefined?"":this.containerNo);
    this.doNo = this.ssrSearchRequest_modal.doNoSrch;
    this.containerNo = this.ssrSearchRequest_modal.crNoSrch;
    // this.serviceStatus = this.ssrSearchRequest_modal.serviceStatusSrch;
    // this.Errormsg =  this.utils.getLocaleString("invalid_characters");
    // this.ssrSearchRequest_modal.caNoSrch = (this.caNo == undefined?"":this.caNo);
    this.spNameList = this.ssrSearchRequest_modal.spNameList;
    this.spLocationList = this.ssrSearchRequest_modal.spLocationList;
    this.ssrTerminalList = this.ssrSearchRequest_modal.ssrTerminalList;
    this.specialServiceTypeList = this.ssrSearchRequest_modal.specialServiceTypeList;
    if(this.searchByContainer == "Container No") {
      this.containerNo = this.ssrSearchRequest_modal.containerNoSrch;
      this.doNo = "";
      this.caNo = "";
      this.containerStatus = false;
      this.searchByCA = false;
      this.searchByDO = false;
    }
    else if(this.searchByContainer == "CA No") {
      this.caNo = this.ssrSearchRequest_modal.caNoSrch;
      this.doNo = "";
      this.containerNo = "";
      this.containerStatus = false;
      this.searchByCA = true;
      this.searchByDO = false;
    }
    else if(this.searchByContainer == "DO No") {
      this.doNo = this.ssrSearchRequest_modal.doNoSrch;
      this.caNo = "";
      this.containerNo = "";
      this.containerStatus = false;
      this.searchByCA = false;
      this.searchByDO = true;
    }
    if(this.ssrSearchRequest_modal.serviceStatusSrch != "All"){
      this.serviceStatus = this.ssrSearchRequest_modal.serviceStatusSrch;
    }
    else {
      this.ssrSearchRequest_modal.serviceStatusSrch = "";
    }
    if(this.ssrSearchRequest_modal.requestStatusSrch != "All"){
      this.requestStatus = this.ssrSearchRequest_modal.requestStatusSrch;
    }
    else {
      this.ssrSearchRequest_modal.requestStatusSrch = "";
    }

    if (null == this.ssrSearchRequest_modal.createdFrmDate || ("" == this.ssrSearchRequest_modal.createdFrmDate)) {
      this.setFromDates();
    }
    else {
      this.createdFromDate = this.transformDateTime(this.ssrSearchRequest_modal.createdFrmDate);
    }
    if (null == this.ssrSearchRequest_modal.createdToDate || ("" == this.ssrSearchRequest_modal.createdToDate)) {
      this.setToDates();
    }
    else {
      this.createdToDate = this.transformDateTime(this.ssrSearchRequest_modal.createdToDate);
    }
    this.ssrControlsVisibility();
    this.enableSearchTypeFeild();
  }
  setFromDates() {
    this.createdFromDate = new Date();
    this.createdFromDate = new Date(this.createdFromDate.getTime() -
    this.createdFromDate.getTimezoneOffset() * 60000)
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.createdFromDate.toISOString();
  }
  setToDates() {
    this.createdToDate = new Date();
    this.createdToDate = new Date(this.createdToDate.getTime() -
    this.createdToDate.getTimezoneOffset() * 60000);
    this.createdToDate = this.createdToDate.toISOString();
  }
  transformDateTime(value: string): any {
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1]),
      (+dateArray[4]),
      (+dateArray[5])).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();
    return dateObject;
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

  ionViewWillEnter() {
    if (null == localStorage.getItem('ssrCreatedFrom') || ("" == localStorage.getItem('ssrCreatedFrom'))) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
    }
    else {
      this.createdFromDate = localStorage.getItem('ssrCreatedFrom');
      this.createdFromDate = new Date(this.createdFromDate);
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd H:mm');
    }
    if (null == localStorage.getItem('ssrCreatedTo') || ("" == localStorage.getItem('ssrCreatedTo'))) {
      this.createdToDate = new Date().toISOString();
    }
    else {
      this.createdToDate = localStorage.getItem('ssrCreatedTo');
      this.createdToDate = new Date(this.createdToDate);
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd H:mm');
    }


    this.content.scrollToTop(0);
  }
  onServiceProviderChange() {
    this.ssrFilterList = this.serviceProviderMasterResponse.filter(value => value.serviceProviderName === this.spType );
    this.spNameList = this.removeDuplicates(this.ssrFilterList,'spLocationName');
    this.spLocationName = "";
    this.spSubLocationName = "";
    this.ssrTerminalName = "";
  }
  onLocationChanged() {
    this.spLocationList = this.ssrFilterList.filter(value => value.spLocationName === this.spLocationName );
    this.spLocationList = this.removeDuplicates(this.spLocationList,'spSubLocationName');
    this.spSubLocationName = "";
    this.ssrTerminalName = "";
  }
  onSpLocationListChanged() {
    let locationMasterRequestModel = new LocationMasterRequestModel();
    locationMasterRequestModel.spName = this.spSubLocationName;
    locationMasterRequestModel.spType = this.spType;
    locationMasterRequestModel.location = this.spLocationName;
    this.SsrServiceProvider.getSSRLocationMasterResponse(locationMasterRequestModel)
      .subscribe(response => {
          this.locationMasterResponseModel = response;
          this.ssrTerminalList = this.removeDuplicates(this.locationMasterResponseModel["terminalSO"],'terminal');
        },
        error => {

        });
    this.ssrTerminalName = "";
  }
  onServiceCategoryChanged() {
    let specialServiceTypeReqModel = new SpecialServiceTypeReqModel();
    specialServiceTypeReqModel.location = this.spLocationName;
    specialServiceTypeReqModel.serviceCategory = this.serviceCategoryName;
    specialServiceTypeReqModel.spName = this.spSubLocationName;
    specialServiceTypeReqModel.spType = this.spType;
    specialServiceTypeReqModel.terminal = this.ssrTerminalName;
    this.SsrServiceProvider.getSSRSpecialServiceType(specialServiceTypeReqModel)
      .subscribe(response => {
          this.specialServiceTypeResponseModel = response;
          this.specialServiceTypeList = this.specialServiceTypeResponseModel['specialServiceList'];
        },
        error => {

        });
    this.specialServiceTypeName = "";
    this.rotationno = "";
    this.containerStatus = false;
    this.searchByCA = false;
    this.searchByDO = false;
    this.searchByContainer = "";
    this.caNo = "";
    this.doNo = "";
    this.containerNo = "";
    if(this.serviceCategoryName == 'Container'){
      this.showSearchBy = true;
      this.showRotationNo = false;
    }
    else if(this.serviceCategoryName == 'Vessel'){
      this.showSearchBy = false;
      this.showRotationNo = true;
      this.getRotationMaster();
    }
    else{
      this.showSearchBy = false;
      this.showRotationNo = false;
    }
  }
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj =>
        mapObj[prop]).indexOf(obj[prop]) === pos; });
  }
  getRotationNo(ev: any) {
    this.filterRotationArray = this.rotationResponseModal;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.rotationno;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterRotationArray = this.filterRotationArray.filter((item) => {
        if (item.rotationNoSrch.toString().startsWith(val)) {
          this.showRotationNoList = true;
        }
        return (item.rotationNoSrch.toString().startsWith(val));
      });
    } else {
      // hide the results when the query is empty
      this.showRotationNoList = false;
    }
  }
  keyboardClose() {
    this.keyboard.close();
  }
  setRotationNumber(item: any) {
    this.rotationno = item.rotationNoSrch;
  }
  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'ssrRequestNo') {
      this.ssrRequestNo = e.target.value;
    }else if (model == 'cusRefNo') {
      this.cusRefNo = e.target.value;
    } else if (model == 'rotationno') {
      this.rotationno = e.target.value;
    } else if (model == 'containerNo') {
      this.containerNo = e.target.value;
    } else if (model == 'caNo') {
      this.caNo = e.target.value;
    } else if (model == 'doNo') {
      this.doNo = e.target.value;
    }
  }
  checkRotation(){
    if(null != this.rotationno && this.rotationno <= 30) {
      this.rotationInValid=false;
    }
  }
  selectRotationNo(item: any){
    setTimeout(() => {
      this.showRotationNoList = false;
      this.searchByRotationReqModal.rotationNumberSearch=this.rotationno;
      this.searchbyRotation = new Array<SearchByRotationResponseModal>();
      if(this.rotationno!=null && this.rotationno!=""){
        this.rbServices.searchTerminalByRotation(this.searchByRotationReqModal)
          .subscribe(response => {
              this.searchbyRotation = <SearchByRotationResponseModal>response;
              if(this.searchbyRotation.length==0){
                this.rotationno=null;
                this.presentAlert(this.alertHeadding,this.utils.getLocaleString("invalid_rotation_number"));
              }else{
                //this.searchbyRotation = this.searchByRotationResponseList.list;
                //this.rbVesselName=this.searchbyRotation.vesselName;
                this.saveUpdateReqModal.locationVessel=this.searchbyRotation.locationVessel;
                this.saveUpdateReqModal.vesselStatus=this.searchbyRotation.vesselStatus;
                this.searchTerminalResponsemodal.terminals = [];
                for(let i = 0; i < this.searchbyRotation.terminals.length; i++) {
                  this.searchTerminalResponsemodal.terminals[i] =this.searchbyRotation.terminals[i];
                }
                this.selectedTerminal = this.searchTerminalResponsemodal.terminals[0];
                this.terminalDependents = this.searchbyRotation.terminalDependents;
                this.isSuccess=true;
                this.getResourceMaster();
              }
            },
            error => {
              this.isSuccess=false;
              var errorMessage = <any>error;
            });
      }
    }, 500);
  }
  presentAlert(title: string, message: string) {
    if(this.alertobj){
      this.alertobj.dismiss();
      this.alertobj = null;
    }
    this.showingPopup = true;
    this.alertobj = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text:'Dismiss',
        handler: () => {
          if(!this.groupOne.valid){
          }
          this.showingPopup =  false;
        },
      }]
    });
    this.alertobj.present();
  }
  private getResourceMaster() {
    //this.resourceMasterResponseModal = new Array<ResourceMasterResponseModal>();
    this.resourceMasterReqModal.terminal = this.selectedTerminal;
    this.resourceMasterReqModal.location = this.location;
    this.rbServices.getResources(this.resourceMasterReqModal).subscribe(response=> {
      this.resourceMasterResponseModal = response;
      for(let i = 0; i < this.resourceMasterResponseModal.resourceTypeList.length; i++) {
        this.resourceTypeList[i] =this.resourceMasterResponseModal.resourceTypeList[i];
      }
    });
  }
  private getRotationMaster() {
    this.rotationResponseModal = new Array<RotationResultDetails>();
    this.rbServices.rbRotationMaster(this.rotationMasterReqModal).subscribe(response=> {
      this.rotationMasterResponseList = response;
      this.rotationResponseModal = this.rotationMasterResponseList.list;
    });
  }
  ssrControlsVisibility(){
    if (null != this.ssrRequestNo && this.ssrRequestNo.length > 0) {
      this.disableControls = true;
    } else {
      this.disableControls = false;
      if (this.serviceCategoryName == "--Select--" || this.serviceCategoryName == "") {
        this.showSearchBy = false;
        this.showRotationNo = false;
      }
      else if (this.serviceCategoryName == "Container") {
        this.showSearchBy = true;
        this.showRotationNo = false;
      }
      else if (this.serviceCategoryName == "Vessel") {
        this.showSearchBy = false;
        this.showRotationNo = true;
      }
      else {
        this.showSearchBy = false;
        this.showRotationNo = false;
        this.containerStatus = false;
        this.searchByCA = false;
        this.searchByDO = false;
      }
    }
  }
  ssrRequestNoChange(){
    if (null != this.ssrRequestNo && this.ssrRequestNo.length > 0) {
      this.disableControls = true;
    } else {
      this.disableControls = false;
    }
  }
  enableSearchTypeFeild()
  {
    this.isError = false;
    if(this.searchByContainer == "--Select--" ||
      this.searchByContainer == "") {
      this.containerNo = "";
      this.caNo = "";
      this.doNo = "";
      this.containerStatus = false;
      this.searchByCA = false;
      this.searchByDO = false;
    }
    else if(this.searchByContainer == "Container No") {
      this.caNo = "";
      this.doNo = "";
      this.containerStatus = true;
      this.searchByCA = false;
      this.searchByDO = false;
    } else if(this.searchByContainer == "CA No") {
      this.containerNo = "";
      this.doNo = "";
      this.containerStatus = false;
      this.searchByCA = true;
      this.searchByDO = false;
    }
    else if(this.searchByContainer == "DO No") {
      this.containerNo = "";
      this.caNo = "";
      this.containerStatus = false;
      this.searchByCA = false;
      this.searchByDO = true;
    }

  }
  getCANo(ev: any) {
    this.filterCAArray = this.searchCAdetails;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val =this.caNo;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterCAArray = this.filterCAArray.filter((item) => {
        if (item.caNo!=null &&  item.caNo.toLowerCase().startsWith(val.toLowerCase())) {
          this.showCANo = true;
        }
        return (item.caNo!=null &&  item.caNo.toLowerCase().startsWith(val.toLowerCase()));
      });
    }  else {
      this.showCANo = false;
    }
  }
  setCANumber(item: any) {
    this.caNo = item.caNo;
    this.showCANo=false;
  }
  searchCAMaster(){
    this.cadoMasterReqModal.caNo="";
    this.cadoMasterReqModal.createdFrom="";
    this.cadoMasterReqModal.createdTo="";
    this.cadoMasterReqModal.locationContainer=this.containerNo;
    this.cadoMasterReqModal.rotationNo="";
    this.cadoMasterReqModal.spName=this.spSubLocationName;
    this.cadoMasterReqModal.terminalContainer=this.ssrTerminalName;
    this.cadoMasterReqModal.vesselName="";

    this.searchCAdetails = new Array<CADOMasterResultDetails>();
    this.rbServices.rbCAMaster(this.cadoMasterReqModal)
      .subscribe(response => {
          this.cadoMasterResponseList = <CADOMasterResultModal>response;
          this.searchCAdetails = this.cadoMasterResponseList.list;
          this.getCANo(null)
        },
        error => {
          var errorMessage = <any>error;
        });
  }
  getDONo(ev: any) {
    this.filterDOArray = this.searchDOdetails;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val =this.doNo;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterDOArray = this.filterDOArray.filter((item) => {
        if (item.doNo!=null &&  item.doNo.toLowerCase().startsWith(val.toLowerCase())) {
          this.showDONo = true;
        }
        return (item.doNo!=null &&  item.doNo.toLowerCase().startsWith(val.toLowerCase()));
      });
    }  else {
      this.showDONo = false;
    }
  }
  searchDOMaster(){
    this.cadoMasterReqModal.caNo="";
    this.cadoMasterReqModal.createdFrom="";
    this.cadoMasterReqModal.createdTo="";
    this.cadoMasterReqModal.locationContainer=this.containerNo;
    this.cadoMasterReqModal.rotationNo="";
    this.cadoMasterReqModal.spName=this.spSubLocationName;
    this.cadoMasterReqModal.terminalContainer=this.ssrTerminalName;
    this.cadoMasterReqModal.vesselName="";

    this.searchDOdetails = new Array<CADOMasterResultDetails>();
    this.rbServices.rbDOMaster(this.cadoMasterReqModal)
      .subscribe(response => {
          this.cadoMasterResponseList = <CADOMasterResultModal>response;
          this.searchDOdetails = this.cadoMasterResponseList.list;
          this.getDONo(null)
        },
        error => {
          var errorMessage = <any>error;
        });
  }
  setDONumber(item: any) {
    this.doNo = item.doNo;
    this.showDONo=false;
  }
  disableSearch() {
    let disableStatus;
    if(this.ssrRequestNo!=null && this.ssrRequestNo.length>0)
    {
      if (this.groupOne.controls.ssrRequestNo.valid)
        return false;
      else
        this.isError = true;
        return true;
    }
    else{
      if (this.groupOne.controls.cusRefNo.valid)
      {
        disableStatus = false;
      }
      else {
        disableStatus = true;
      }
      if(this.serviceCategoryName == "Vessel")
      {
        if(this.groupOne.controls.rotationno.valid )
        {
          disableStatus = false;
        }
        else {
          disableStatus = true;
          return disableStatus;
        }
      }
      else if(this.serviceCategoryName == "Container")
      {
        if (this.searchByContainer == "Container No")
        {
          if(this.groupOne.controls.containerNo.valid)
          {
            disableStatus = false;
          }
          else {
            disableStatus = true;
            return disableStatus;
          }
        }
        else if (this.searchByContainer == "CA No")
        {
          if(this.groupOne.controls.caNo.valid)
          {
            disableStatus = false;
          }
          else {
            disableStatus = true;
            return disableStatus;
          }
        }
        else if (this.searchByContainer == "DO No")
        {
          if(this.groupOne.controls.doNo.valid)
          {
            disableStatus = false;
          }
          else {
            disableStatus = true;
            return disableStatus;
          }
        }
      }
    }
    return disableStatus;
  }
  onCusRefNoFocusChange(){
    if (this.cusRefNo && this.utils.validate(this.cusRefNo, '^([a-zA-Z0-9]{1,30})$')) {
      this.isError = true;
      return;
    }
  }
  reset() {

    this.ssrRequestNo = "";
    this.cusRefNo = "";
    this.spType = "--Select--";
    this.spLocationName = "";
    this.spSubLocationName = "";
    this.ssrTerminalName = "";
    this.serviceCategoryName = "--Select--";;
    this.specialServiceTypeName = "";
    this.rotationno = "";
    this.searchByContainer = "";
    this.requestStatus = "All";
    this.serviceStatus= "All";
    this.spNameList = [];
    this.spLocationList = [];
    this.ssrTerminalList = [];
    this.specialServiceTypeList = [];

    this.createdFromDate = new Date();
    this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
    this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd H:mm');
    this.createdToDate = new Date().toISOString();
    this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd H:mm');


  }

  ssrSearchFilterSubmit() {

    //this.submit = true;
    let fromDate: Date = new Date(this.createdFromDate);
    let toDate: Date = new Date(this.createdToDate);
    if(!this.disableSearch()){
      if (fromDate > toDate) {
        this.showAlert();
      }
      else{

        if (!(this.validate(this.ssrRequestNo, '^([0-9]{1,255})$')) &&
          !(this.validate(this.cusRefNo, '^([a-zA-Z0-9]{1,30})$')) &&
          !(this.validate(this.rotationno, '^[0-9]{0,30}$')) )
        {

          let varcreatedFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy H:mm');
          let varcreatedToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy H:mm');
          this.ssrSearchRequest_modal.createdFrmDate = varcreatedFromDate;
          this.ssrSearchRequest_modal.createdToDate = varcreatedToDate;
          if (this.createdFromDate) {
            localStorage.setItem('ssrCreatedFrom', this.createdFromDate);
          }
          else {
            localStorage.setItem('ssrCreatedFrom', '');
          }

          if (this.createdToDate) {
            localStorage.setItem('ssrCreatedTo', this.createdToDate);
          }
          else {
            localStorage.setItem('ssrCreatedTo', '');
          }
          if(this.spType == "--Select--")
          {
            this.spType = "";
          }
          this.ssrSearchRequest_modal.spTypeSrch = (this.spType == undefined?"":this.spType);

          if(this.spLocationName == "--Select--"){
            this.spLocationName ="";
          }
          this.ssrSearchRequest_modal.locationSrch = (this.spLocationName == undefined?"":this.spLocationName);
          this.ssrSearchRequest_modal.spNameList = this.spNameList;

          if(this.spSubLocationName == "--Select--" ){
            this.spSubLocationName = "";
          }
          this.ssrSearchRequest_modal.spNameSrch = (this.spSubLocationName == undefined?"":this.spSubLocationName);
          this.ssrSearchRequest_modal.spLocationList = this.spLocationList;

          if(this.ssrTerminalName == "--Select--" ){
            this.ssrTerminalName = "";
          }
          this.ssrSearchRequest_modal.terminalSrch = (this.ssrTerminalName == undefined?"":this.ssrTerminalName);
          this.ssrSearchRequest_modal.ssrTerminalList = this.ssrTerminalList;

          if(this.specialServiceTypeName =="--Select--" ){
            this.specialServiceTypeName = "";
          }
          this.ssrSearchRequest_modal.serviceCategorySrch = (this.serviceCategoryName == undefined?"":this.serviceCategoryName);

          if(this.serviceCategoryName == "--Select--"){
            this.serviceCategoryName ="";
          }
          else if(this.serviceCategoryName == "Vessel"){
            //this.ssrSearchRequest_modal.specialServiceTypeList = this.specialServiceTypeList;
          }
          else if(this.serviceCategoryName == "Container"){

          }
          this.ssrSearchRequest_modal.specialServiceTypeList = this.specialServiceTypeList;
          this.ssrSearchRequest_modal.ssrRequestNoSrch = (this.ssrRequestNo == undefined?"":this.ssrRequestNo);
          this.ssrSearchRequest_modal.cusRefNoSrch = (this.cusRefNo == undefined?"":this.cusRefNo);
          this.ssrSearchRequest_modal.specialServiceSrch = (this.specialServiceTypeName == undefined?"":this.specialServiceTypeName);
          this.ssrSearchRequest_modal.rotationNumber = (this.rotationno == undefined?"":this.rotationno);
          this.ssrSearchRequest_modal.searchBySrch = (this.searchByContainer == undefined?"":this.searchByContainer);
          this.ssrSearchRequest_modal.containerNoSrch = (this.containerNo == undefined?"":this.containerNo);
          this.ssrSearchRequest_modal.caNoSrch = (this.caNo == undefined?"":this.caNo);
          this.ssrSearchRequest_modal.doNoSrch = (this.doNo == undefined?"":this.doNo);
          this.ssrSearchRequest_modal.crNoSrch = (this.containerNo == undefined?"":this.containerNo);
          this.ssrSearchRequest_modal.requestStatusSrch = (this.requestStatus == undefined?"":this.requestStatus);
          this.ssrSearchRequest_modal.serviceStatusSrch = (this.serviceStatus == undefined?"":this.serviceStatus);
          this.ssrSearchRequest_modal.fromFilter = true;

          this.navCtrl.pop();

        }
      }
    }
  }



}
