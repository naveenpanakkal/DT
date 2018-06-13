import {Component, ViewChild} from '@angular/core';
import {Content,AlertController, IonicPage, NavController, NavParams, Navbar, Platform,Alert} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RBServiceProvider} from "../../providers/webservices/rbservices";
import {DatePipe} from "@angular/common";
import {DeliveryToSearchSOModel} from "../../shared/model/ta/deliveryToSearchSO.model";
import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {TranslateService} from "@ngx-translate/core";
import {ValidationService} from "../../shared/validation.service";
import {RotationMaster} from "../../shared/model/rb/rbRotationMaster";
import {RotationMasterResultModal} from "../../shared/model/rb/rbRotationMasterResult.modal";
import {ServiceProviderReqModel} from "../../shared/model/rb/rbServiceProviderReq.modal";
import {RBSearchResultRequestModel} from "../../shared/model/rb/rbsearchresultrequest.model";
import {RotationResultDetails} from "../../shared/model/rb/rbRotationResultDetails.modal";
import {SaveUpdateReqModal} from "../../shared/model/rb/rbSaveUpdateReq.modal";
import {SearchByRotationReqModal} from "../../shared/model/rb/rbSearchByRotationReq.modal";
import {RBTerminalModal,SearchByRotationResponseModal} from "../../shared/model/rb/rbSearchByRotationResponse.modal";
import {ResourceMasterReqModal} from "../../shared/model/rb/rbResourceMasterReq.modal";
import {ServiceProviderResponseModel} from "../../shared/model/rb/rbServiceProviderResponse.model";
import {ClientRegSpCodeTypeSOModal, ClientRegSpLocationSO} from "../../shared/model/rb/rbClientRegSpLocationSO.modal";
import {ResourceMasterResponseModal} from "../../shared/model/rb/rbResourceMasterResponse.modal";
import {SearchByTerminal} from "../../shared/model/rb/rbSearchByTerminalReq.modal";
import {SearchTerminalResponse} from "../../shared/model/rb/rbSearchTerminalResult.modal";
import {RBLoadTerminalReqModal} from "../../shared/model/rb/rbloadTerminalReq.modal";
import {CADOMasterResultDetails} from "../../shared/model/rb/rbCADOResultDetails.modal";
import {CADOMasterResultModal} from "../../shared/model/rb/rbCADOMasterResponse.modal";
import {CADOMasterReq} from "../../shared/model/rb/rbCADOMasterReq.modal";
/**
 * Generated class for the RbfilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-RBfilter',
  templateUrl: 'rbfilter.html',
  providers:[Utils,RBSearchResultRequestModel,ServiceProviderReqModel,ServiceProviderResponseModel,SaveUpdateReqModal
    ,RBServiceProvider,RotationResultDetails,SearchByRotationReqModal,RotationMaster,RotationMasterResultModal
    ,SearchByRotationResponseModal,ResourceMasterReqModal,ResourceMasterResponseModal,SearchByTerminal,SearchTerminalResponse,
    RBLoadTerminalReqModal,CADOMasterResultDetails,CADOMasterResultModal,CADOMasterReq]
})
export class RBfilterPage {
  @ViewChild('navbar') navBar: Navbar;
  groupOne: FormGroup;
  dateFormat: string = 'DD/MM/YYYY HH:mm GST';
  disableControls: boolean;
  etaValidate: boolean = false;
  resRequestNo:any;
  cusRefNo:any;
  rbFromDate:any;
  rbToDate:any;
  rbSearchReqModal: RBSearchResultRequestModel;
  filterRotationArray: any;
  showRotationNo: boolean;
  rotationResponseModal: RotationResultDetails[];
  public saveUpdateReqModal : SaveUpdateReqModal;
  rotationno:any;
  rotationInValid:any;
  searchbyRotation:any;
  alertHeadding: string;
  attenionHeadding: string;
  lessFromDate: string;
  terminalVessel:any
  terminals : string[] = [];
  selectedTerminal:any;
  public terminalDependents: RBTerminalModal[] = [];
  private isSuccess: boolean;
  private resourceTypeList :string[] =[];
  rbVesselName:any;
  tempstype:string;
  spType:any;
  sptypes: string[] = [];
  public clientRegSpLocationSO : ClientRegSpLocationSO[];
  public clientRegSpCodeTypeSO : ClientRegSpCodeTypeSOModal[];
  terminalContainer:any;
  searchByContainer:any;
  containerStatus : boolean = false;
  containerNo:any;
  caNo:any;
  doNo:any;
  rbRequeststatus:string;
  rbServicestatus:any;
  isError:boolean=false;
  public  requestTypeContainer:boolean = false;
  public  requestTypeVessel:boolean = false;
  public  searchByCA:boolean = false;
  public  searchByDO:boolean = false;
  public selectedRequestType:any;
  requestTypeList: string[]= [];
  requestStatusList: string[] = [];
  serviceStatusList: string[] = [];
  public transporterCompanyArray: DeliveryToSearchSOModel[];
  verifyValidTransporterCompany: boolean = false;
  filterTransporterCompanyArray  :any;
  showTransporterCompany: boolean = false;
  loc: any ;
  spname: string ;
  tempspname:string;
  templocation:string;
  spnames: string[]= [];
  transporterCompany: any;
  advSearchOption: boolean;
  clientRegSpCodeTypeSOtemp : ClientRegSpLocationSO[];
  location: string ;
  locations: string[] = [];
  public searchby:string[]= [];
  filterCAArray:any;
  filterDOArray:any;
  searchCAdetails:CADOMasterResultDetails[];
  searchDOdetails:CADOMasterResultDetails[];
  showCANo:boolean;
  showDONo:boolean;
  containerNoPattern: string = "^([a-zA-z0-9]{10,11})$";
  cadoPattern: string = "^[a-zA-z0-9]*$";
  rotationnoPattern:string = "^([a-zA-z0-9]{1,255})$";
  cusrefnoPattern:string = "^([a-zA-z0-9]{1,30})$";
  public unregisterBackButtonAction: any;
  alertobj:Alert
  showingPopup: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public content: Content,
              public keyboard: Keyboard,public translate: TranslateService,public rbServices: RBServiceProvider,
              private searchByRotationReqModal: SearchByRotationReqModal,
              private rotationMasterResponseList: RotationMasterResultModal,
              private rotationMasterReqModal: RotationMaster,
              private resourceMasterReqModal: ResourceMasterReqModal,
              private resourceMasterResponseModal: ResourceMasterResponseModal,
              private serviceProviderReqModel: ServiceProviderReqModel,
              private serviceProviderResponseModel: ServiceProviderResponseModel,
              private searchByTerminalreqmodal:SearchByTerminal,
              private loadTerminalreqmodal :RBLoadTerminalReqModal,
              private searchTerminalResponsemodal:SearchTerminalResponse,
              private cadoMasterReqModal: CADOMasterReq,
              private cadoMasterResponseList: CADOMasterResultModal,
              public formBuilder: FormBuilder,public  utils:Utils,public alertCtrl :AlertController,public datepipe: DatePipe,
              public platform: Platform) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.groupOne = formBuilder.group({
      resRequestNo: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(30),ValidationService.numberValidate])],
      cusRefNo: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(30),Validators.pattern(this.cusrefnoPattern)])],
      selectedRequestType: [''],
      rotationNo: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(30),ValidationService.numberValidate])],
      rbVesselName: [''],
      terminalVessel: [''],
      spType: [''],
      location: [''],
      spname: [''],
      terminalContainer: [''],
      searchByContainer: [''],
      containerNo: ['', Validators.compose([Validators.minLength(10),Validators.maxLength(11),Validators.pattern(this.containerNoPattern)])],
      caNo:['', Validators.pattern(this.cadoPattern)],
      doNo:['', Validators.pattern(this.cadoPattern)],
      rbRequeststatus:[''],
      rbServicestatus:[''],
      rbFromDate: [''],
      rbToDate: [''],
    });

    this.rbSearchReqModal = this.navParams.get("Request");
    this.resRequestNo = this.rbSearchReqModal.resReqNoSrch;
    this.cusRefNo = this.rbSearchReqModal.cusRefNoSrch;
    this.selectedRequestType = this.rbSearchReqModal.requestTypeSrch;
    this.populateRequestType();
    if(this.selectedRequestType == null || this.selectedRequestType == "") {
      if(this.requestTypeList && this.requestTypeList.length > 0) {
        this.selectedRequestType = this.requestTypeList[0];
      }
      else {
        this.requestTypeList[0] = "--Select--";
        this.selectedRequestType = this.requestTypeList[0];
      }
    }
    if(this.selectedRequestType == "Vessel")
    {
      this.requestTypeContainer=false
      this.requestTypeVessel=true
      this.rotationno = this.rbSearchReqModal.rotationNoSrch;
      this.rbVesselName = this.rbSearchReqModal.vesselNameSrch;
      this.terminalVessel = this.rbSearchReqModal.terminalSrch;
      this.searchTerminalResponsemodal.terminals = this.rbSearchReqModal.terminalVessalList;
    }
    else if(this.selectedRequestType == "Container") {
      this.requestTypeContainer=true
      this.requestTypeVessel=false
      this.populateSearchBy();
      this.spType = this.rbSearchReqModal.spTypeSrch;
      if(this.spType != "")
      {
        this.location = this.rbSearchReqModal.locationSrch;
        this.locations = this.rbSearchReqModal.locationList;
      }
      if(this.location != "")
      {
        this.spname = this.rbSearchReqModal.spNameSrch;
        this.spnames = this.rbSearchReqModal.spNameList;
      }
      if(this.spname != "") {
        this.terminalContainer = this.rbSearchReqModal.terminalConSrch;
        this.searchTerminalResponsemodal.terminals = this.rbSearchReqModal.terminalConList;
      }
      this.searchByContainer = this.rbSearchReqModal.searchBySrch
      this.containerNo = this.rbSearchReqModal.containerNoSrch;
      this.caNo = this.rbSearchReqModal.caNoSrch;
      this.doNo = this.rbSearchReqModal.doNoSrch;
    }
    this.rbRequeststatus = this.rbSearchReqModal.resourceBookingStatusSrch;
    this.populateRequestStatus();
    if(this.rbRequeststatus == "All" )
    {
      this.rbRequeststatus = this.requestStatusList[0];
    }
    this.populateServiceStatus();
    if(this.rbSearchReqModal.serviceStatusSrch != "All"){
      this.rbServicestatus = this.rbSearchReqModal.serviceStatusSrch;
    }
    else {
      this.rbSearchReqModal.serviceStatusSrch = "";}
    if(this.rbServicestatus == null || this.rbServicestatus == "") {
      if(this.serviceStatusList && this.serviceStatusList.length > 0) {
        this.rbServicestatus = this.serviceStatusList[0];
      }
      else {
        this.serviceStatusList[0] = "All";
        this.rbServicestatus = this.serviceStatusList[0];
      }
    }
    if (null == this.rbSearchReqModal.fromDateSrch || ("" == this.rbSearchReqModal.fromDateSrch)) {
      this.setFromDates();
    }
    else {
      this.rbFromDate = this.transformDateTime(this.rbSearchReqModal.fromDateSrch);
    }
    if (null == this.rbSearchReqModal.todateSrch || ("" == this.rbSearchReqModal.todateSrch)) {
      this.setToDates();
    }
    else {
      this.rbToDate = this.transformDateTime(this.rbSearchReqModal.todateSrch);
    }
    this.rbControlsVisibility();
    this.getServiceProvider();

    this.saveUpdateReqModal = new SaveUpdateReqModal();
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.enableSearchTypeFeild();
  }


  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }
  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.backAlert();
    }
  }
  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      _this.backAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  backAlert() {
    if(this.showingPopup) {
      if(this.alertobj){
        this.alertobj.dismiss()
        this.alertobj=null
        this.showingPopup = false;
      }
    }
    else {
        this.navCtrl.pop();
      }
  }

  setFromDates() {
    this.rbFromDate = new Date();
    this.rbFromDate = new Date(this.rbFromDate.getTime() -
      this.rbFromDate.getTimezoneOffset() * 60000)
    this.rbFromDate.setDate(this.rbFromDate.getDate() - 7);
    this.rbFromDate = this.rbFromDate.toISOString();
    console.log('rbFromDate ' + this.rbFromDate);
  }
  setToDates() {
    this.rbToDate = new Date();
    this.rbToDate = new Date(this.rbToDate.getTime() -
      this.rbToDate.getTimezoneOffset() * 60000);
    this.rbToDate = this.rbToDate.toISOString();
    console.log('rbToDate ' + this.rbToDate);
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

  private getServiceProvider() {
    this.serviceProviderReqModel.userName = localStorage.getItem('LOGGEDINUSER');
    this.rbServices.getServiceProvider(this.serviceProviderReqModel,false).subscribe(respose=> {
        this.serviceProviderResponseModel = respose;
        this.clientRegSpLocationSO = this.serviceProviderResponseModel.clientRegSpLocationSO;
        for(let i=0,j=0;i < this.clientRegSpLocationSO.length;i++) {
          this.clientRegSpCodeTypeSO = this.clientRegSpLocationSO[i].clientRegSpCodeTypeSO;
          if(this.clientRegSpLocationSO[i].serviceProviderName) {
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
      },
      error=> {

      });
  }
  private loadTerminal() {
    this.loadTerminalreqmodal.userName = localStorage.getItem('LOGGEDINUSER');
    this.rbServices.loadTerminal(this.loadTerminalreqmodal).subscribe(response=> {
      this.searchTerminalResponsemodal.terminals = response;
    });
  }
  populateRequestType(){
    this.requestTypeList[0] = this.utils.getLocaleString("rb_select");
  this.requestTypeList[1] = this.utils.getLocaleString("Vessel");
  this.requestTypeList[2] = this.utils.getLocaleString("rb_container");
}

  populateRequestStatus(){
    this.requestStatusList[0] = this.utils.getLocaleString("All");
    this.requestStatusList[1] = this.utils.getLocaleString("vesselstatus2");
    this.requestStatusList[2] = this.utils.getLocaleString("vesselstatus3");
    this.requestStatusList[3] = this.utils.getLocaleString("vesselstatus4");
    this.requestStatusList[4] = this.utils.getLocaleString("vesselstatus6");
    this.requestStatusList[5] = this.utils.getLocaleString("vesselstatus7");
  }
  populateServiceStatus()
  {
    this.serviceStatusList[0] = this.utils.getLocaleString("All");
    this.serviceStatusList[1] = this.utils.getLocaleString("rb_workinprogress");
    this.serviceStatusList[2] = this.utils.getLocaleString("rb_completed");
    this.serviceStatusList[3] = this.utils.getLocaleString("rb_declined");
  }
  enableRequestType()
  {
    if(this.selectedRequestType == "--Select--" ||
      this.selectedRequestType == "") {
      this.requestTypeContainer=false;
      this.requestTypeVessel=false;
      this.containerStatus = false;
      this.searchByCA = false;
      this.searchByDO = false;
    }
    else if(this.selectedRequestType == "Container") {
      this.populateSearchBy();
      this.requestTypeContainer=true;
      this.requestTypeVessel=false;
      this.spType = "--Select--";
      this.location = "--Select--";
      this.spname = "--Select--";
      this.terminalContainer = "--Select--";
      this.searchByContainer = "--Select--";
      this.containerStatus = false;
      this.searchByCA = false;
      this.searchByDO = false;
      this.containerNo = "";
      this.caNo = "";
      this.doNo = "";
    }
    else {
      this.loadTerminal();
      this.getRotationMaster();
      this.requestTypeContainer=false;
      this.requestTypeVessel=true;
      this.rotationno = "";
      this.rbVesselName = "";
      this.terminalVessel= "--Select--";
      this.containerStatus = false;
      this.searchByCA = false;
      this.searchByDO = false;
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

  showAdvSearch() {
    this.advSearchOption = !this.advSearchOption;
  }
  getIcon() {
    if (!this.advSearchOption) {
      return 'arrow-dropdown';
    }
    else {
      return 'arrow-dropup';
    }
  }
  onCusRefNoFocusChange(){
    if (this.cusRefNo && this.utils.validate(this.cusRefNo, '^([a-zA-Z0-9]{1,30})$')) {
      this.isError = true;
      return;
    }
  }
  getTransporterCompany (ev: any) {
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
        if (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showTransporterCompany = true;
        }
        return (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showTransporterCompany = false;
    }
  }
  hideTransporterCompany () {
    this.verifyValidTransporterCompany = false;
    this.showTransporterCompany = false;
  }
  selectRotation(item: any) {
    this.verifyValidTransporterCompany = false;
    this.showTransporterCompany = false;
    this.transporterCompany = item.companyCode;
  }
  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'resRequestNo') {
      this.resRequestNo = e.target.value;
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
  rbRequestNoChange(){
    if (null != this.resRequestNo && this.resRequestNo.length > 0) {
      this.disableControls = true;
    } else {
      this.disableControls = false;
    }
  }

  rbControlsVisibility() {
    if (null != this.resRequestNo && this.resRequestNo.length > 0) {
      this.disableControls = true;
    } else {
      this.disableControls = false;
      if (this.selectedRequestType == "--Select--" ||
        this.selectedRequestType == "") {
        this.requestTypeContainer = false;
        this.requestTypeVessel = false;
        this.containerStatus = false;
        this.searchByCA = false;
        this.searchByDO = false;
      }
      else if (this.selectedRequestType == "Container") {
        this.requestTypeContainer = true;
        this.requestTypeVessel = false;
        if(this.searchByContainer == "--Select--") {
          this.containerStatus = false;
          this.searchByCA = false;
          this.searchByDO = false;
        }
        else if(this.searchByContainer == "Container No") {
          this.containerStatus = true;
          this.searchByCA = false;
          this.searchByDO = false;
        } else if(this.searchByContainer == "CA No") {
          this.containerStatus = false;
          this.searchByCA = true;
          this.searchByDO = false;
        }
        else if(this.searchByContainer == "DO No") {
          this.containerStatus = false;
          this.searchByCA = false;
          this.searchByDO = true;
        }
      }
      else if (this.selectedRequestType == "Vessel") {
        this.requestTypeContainer = false;
        this.requestTypeVessel = true;
      }
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
  private getRotationMaster() {
    this.rotationResponseModal = new Array<RotationResultDetails>();
    this.rbServices.rbRotationMaster(this.rotationMasterReqModal).subscribe(response=> {
      this.rotationMasterResponseList = response;
      this.rotationResponseModal = this.rotationMasterResponseList.list;
    });
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
        if (item.rotationNoSrch.toString().includes(val)) {
          this.showRotationNo = true;
        }
        return (item.rotationNoSrch.toString().includes(val));
      });
    } else {
      // hide the results when the query is empty
      this.showRotationNo = false;
    }
  }
  checkRotation(){
    if(null != this.rotationno && this.rotationno <= 30) {
      this.rotationInValid=false;
    }
  }
  selectRotationNo(item: any){
    setTimeout(() => {
      this.showRotationNo = false;
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
  //Defining the Selection process for the rotation number
  setRotationNumber(item: any) {
    this.rotationno = item.rotationNoSrch;
  }
  spTypeSelected(){
    this.locations = [];
    this.clientRegSpCodeTypeSOtemp=this.clientRegSpLocationSO.filter(x =>x.serviceProviderName == this.spType)
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
  }
  spLocSelected(){
    this.spnames = [];
    this.clientRegSpCodeTypeSOtemp=this.clientRegSpLocationSO.filter(x =>x.spLocationName == this.location)
    for(let i=0,j=0;i < this.clientRegSpCodeTypeSOtemp.length;i++) {
      if(this.clientRegSpCodeTypeSOtemp[i].spSubLocationName) {
        this.tempspname=this.spnames.find(x =>x == this.clientRegSpCodeTypeSOtemp[i].spSubLocationName );
        if(!this.tempspname){
          this.spnames[j]=this.clientRegSpCodeTypeSOtemp[i].spSubLocationName;
          j++;
        }
      }
    }
    if (this.spnames && this.spnames.length > 0) {
      this.spnames.unshift("--Select--")
    }
    else {
      this.spnames[0] = "--Select--";
    }
  }
  spNameSelected(){
    this.searchByTerminalreqmodal.location=this.location;
    this.searchByTerminalreqmodal.spName=this.spname;
    this.searchByTerminalreqmodal.spType=this.spType;
    this.searchByTerminalreqmodal.userName=localStorage.getItem('LOGGEDINUSER');
    this.rbServices.searchTerminal(this.searchByTerminalreqmodal,false).subscribe(response=> {
      this.searchTerminalResponsemodal.terminals = response;

      if (this.searchTerminalResponsemodal.terminals && this.searchTerminalResponsemodal.terminals.length > 0) {
        this.searchTerminalResponsemodal.terminals.unshift("--Select--")
      }
      else {
        this.searchTerminalResponsemodal.terminals[0] = "--Select--";
      }
    });
  }
  populateSearchBy(){
    this.searchby[0] = this.utils.getLocaleString("rb_select");
    this.searchby[1] = this.utils.getLocaleString("cshContainerNo");
    this.searchby[2] = this.utils.getLocaleString("rb_cano");
    this.searchby[3] = this.utils.getLocaleString("rb_dono");
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
        if (item.caNo!=null &&  item.caNo.toLowerCase().includes(val.toLowerCase())) {
          this.showCANo = true;
        }
        return (item.caNo!=null &&  item.caNo.toLowerCase().includes(val.toLowerCase()));
      });
    }  else {
      this.showCANo = false;
    }
  }
  searchCAMaster(){
    this.cadoMasterReqModal.caNo="";
    this.cadoMasterReqModal.createdFrom="";
    this.cadoMasterReqModal.createdTo="";
    this.cadoMasterReqModal.locationContainer=this.containerNo;
    this.cadoMasterReqModal.rotationNo="";
    this.cadoMasterReqModal.spName=this.spname;
    this.cadoMasterReqModal.terminalContainer=this.terminalContainer;
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
  setCANumber(item: any) {
    this.caNo = item.caNo;
    this.showCANo=false;
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
        if (item.doNo!=null &&  item.doNo.toLowerCase().includes(val.toLowerCase())) {
          this.showDONo = true;
        }
        return (item.doNo!=null &&  item.doNo.toLowerCase().includes(val.toLowerCase()));
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
    this.cadoMasterReqModal.spName=this.spname;
    this.cadoMasterReqModal.terminalContainer=this.terminalContainer;
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
    if(this.resRequestNo!=null && this.resRequestNo.length>0)
    {
      if (this.groupOne.controls.resRequestNo.valid)
        return false;
      else
        return true;
    }
    else {
      if (this.groupOne.controls.cusRefNo.valid)
      {
        disableStatus = false;
      }
      else {
        disableStatus = true;
      }
      if(this.selectedRequestType == "Vessel")
      {
        if(this.groupOne.controls.rotationNo.valid )
        {
          disableStatus = false;
        }
        else {
          disableStatus = true;
          return disableStatus;
        }
      }
      else if(this.selectedRequestType == "Container")
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
  DateCheck() {
    let fromDate: Date = new Date(this.rbFromDate);
    let toDate: Date = new Date(this.rbToDate);
    if ((fromDate > toDate)&& (this.resRequestNo == null || this.resRequestNo == "")) {
      this.presentAlert("Attention", 'From Date should be less than To Date.');
      return false;
    }
    else {
      return true;
    }

  }
  reset() {
    this.resRequestNo = "";
    this.cusRefNo = "";
    this.selectedRequestType = "--Select--";
    this.rotationno="";
    this.rbVesselName = "";
    this.terminalVessel = "--Select--";
    this.spType = "--Select--";
    this.location = "--Select--";
    this.spname = "--Select--";
    this.terminalContainer = "--Select--";
    this.searchByContainer = "--Select--";
    this.containerNo = "";
    this.caNo = "";
    this.doNo = "";
    this.rbRequeststatus = "All";
    this.rbServicestatus = "All";
    this.searchTerminalResponsemodal.terminals = [];
    this.locations = [];
    this.spnames = [];
    this.setFromDates();
    this.setToDates();
    this.isError =false;
    this.rbControlsVisibility();
  }
  showRbFilterResult() {
    this.attenionHeadding = this.utils.getLocaleString("attention");
    this.lessFromDate = this.utils.getLocaleString("CSH_created_less_from_date");
    this.etaValidate = false;
    if (!this.disableSearch()) {
      if (!this.DateCheck()) {
        return;
      }
      if (this.resRequestNo == null || this.resRequestNo == "") {
        if (this.cusRefNo != null && this.cusRefNo != "") {
          if (this.cusRefNo.length > 0 && (this.cusRefNo.length < 1 || this.cusRefNo.length > 255)) {
            this.isError = true;
            return;
          }
        }
        if (this.selectedRequestType == "Vessel") {
          if(this.rotationno != "") {
            if (this.rotationno.length > 0 && (this.rotationno.length < 1 || this.rotationno.length > 30) || !this.groupOne.controls.rotationNo.valid) {
              this.isError = true;
              return;
            }
          }
        }
        else if (this.selectedRequestType == "Container") {
          if (this.searchByContainer == "Container No") {
            if ((this.cusRefNo.length < 1) && this.containerNo.length > 0 && (this.containerNo.length < 1 || this.containerNo.length > 30) || !this.groupOne.controls.containerNo.valid) {
              this.isError = true;
              return;
            } else {
              this.isError = false;
            }
          }
        }
      }
      this.rbSearchReqModal.resReqNoSrch = this.resRequestNo;
      this.rbSearchReqModal.cusRefNoSrch = this.cusRefNo;
      if(this.selectedRequestType == "--Select--")
      {
        this.selectedRequestType = "";
      }
      this.rbSearchReqModal.requestTypeSrch = this.selectedRequestType;
      this.rbSearchReqModal.rotationNoSrch = this.rotationno;
      this.rbSearchReqModal.vesselNameSrch = this.rbVesselName;
      if(this.terminalVessel == "--Select--")
      {
        this.terminalVessel = "";
      }
      this.rbSearchReqModal.terminalSrch = this.terminalVessel;
      if (this.selectedRequestType == "Vessel") {
        this.rbSearchReqModal.terminalVessalList = this.searchTerminalResponsemodal.terminals;
      }
      else if (this.selectedRequestType == "Container") {
        this.rbSearchReqModal.terminalConList = this.searchTerminalResponsemodal.terminals;
      }
      if(this.spType == "--Select--")
      {
        this.spType = "";
      }
      this.rbSearchReqModal.spTypeSrch = this.spType;
      this.rbSearchReqModal.spTypeList = this.sptypes;
      if(this.location == "--Select--")
      {
        this.location = "";
      }
      this.rbSearchReqModal.locationSrch = this.location;
      this.rbSearchReqModal.locationList = this.locations;
      if(this.spname == "--Select--")
      {
        this.spname = "";
      }
      this.rbSearchReqModal.spNameSrch = this.spname;
      this.rbSearchReqModal.spNameList = this.spnames;
      if(this.terminalContainer == "--Select--")
      {
        this.terminalContainer = "";
      }
      this.rbSearchReqModal.terminalConSrch = this.terminalContainer;
      if(this.searchByContainer == "--Select--")
      {
        this.searchByContainer = "";
      }
      this.rbSearchReqModal.searchBySrch = this.searchByContainer;
      this.rbSearchReqModal.containerNoSrch = this.containerNo;
      this.rbSearchReqModal.caNoSrch = this.caNo;
      this.rbSearchReqModal.doNoSrch = this.doNo;
      this.rbSearchReqModal.resourceBookingStatusSrch = this.rbRequeststatus;
      if(this.rbServicestatus != "All"){
        this.rbSearchReqModal.serviceStatusSrch = this.rbServicestatus;
      }
      else {
        this.rbSearchReqModal.serviceStatusSrch = "";}
      let formatValidityDate = this.rbFromDate;
      this.rbSearchReqModal.fromDateSrch = this.datepipe.transform(formatValidityDate.split("T")[0], 'dd/MM/yyyy');
      formatValidityDate = formatValidityDate.split("T")[1];
      formatValidityDate = formatValidityDate.substr(0, formatValidityDate.lastIndexOf(':'));
      this.rbSearchReqModal.fromDateSrch = this.rbSearchReqModal.fromDateSrch + " " + formatValidityDate;
      formatValidityDate = "";
      formatValidityDate = this.rbToDate;
      this.rbSearchReqModal.todateSrch = this.datepipe.transform(formatValidityDate.split("T")[0], 'dd/MM/yyyy');
      formatValidityDate = formatValidityDate.split("T")[1];
      formatValidityDate = formatValidityDate.substr(0, formatValidityDate.lastIndexOf(':'));
      this.rbSearchReqModal.todateSrch = this.rbSearchReqModal.todateSrch + " " + formatValidityDate;
      this.rbSearchReqModal.fromFilter = true;
      this.navCtrl.pop();
    }
    else {
      this.isError = true;
      return;
      }
    }
}
