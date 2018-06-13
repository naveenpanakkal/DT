import {Component, HostListener, ViewChild, ElementRef} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  IonicPage, NavController, NavParams, AlertController, PopoverController, Navbar, Content,
  Slides, Platform
} from 'ionic-angular';
import {FormBuilder, FormGroup, FormArray, Validators, FormControl} from '@angular/forms';
import 'rxjs/Rx';
import {Http, Headers, RequestOptions} from '@angular/http';
import {TrucksearchPage} from '../trucksearch/trucksearch';
import {MorePage} from '../more/more';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {TrucksearchbyidRequestModel} from "../../shared/model/trucksearchdetails/trucksearchbyidrequest.model";
import {TruckRegResultModel} from "../../shared/model/trucksearchdetails/truckregresult.model";
import {TruckRegAttachResultModel} from "../../shared/model/trucksearchdetails/truckregattachresult.model";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {CheckMultipleTruckModel} from "../../shared/model/trucksearchdetails/checkmultipletruck.model";
import {TruckComparisonPage} from "../truckcomparison/truckcomparison";
import {WorkflowPage} from "../workflow/workflow";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DocumentsReqModel} from "../../shared/model/documentsmaster/documentsreq.model";
import {DocumentsResultModel} from "../../shared/model/documentsmaster/documentsresult.model";
import {TruckservicesProvider} from "../../providers/webservices/truckservices";
import {TruckSearchResultsPage} from '../trucksearchresult/trucksearchresult';
import {TruckRegTerminalRFIDRequestModel} from "../../shared/model/trucksearchdetails/truckregterminalRFIDresult.model";
import {TruckRegTerminalResultModel} from "../../shared/model/trucksearchdetails/truckregterminalresult.model";
import {TrucksearchdetailsPage} from "../trucksearchdetails/trucksearchdetails";
import {OwnerCheckTruckModel} from "../../shared/model/trucksearchdetails/ownerchecktruck.model";
import {TruckRegPoolRequestModel} from "../../shared/model/trucksearchdetails/truckregpoolresult.model";
import {Keyboard} from '@ionic-native/keyboard';
import {TruckAdminEditModal} from "../../shared/model/trucksearchdetails/truckadminedit.modal";
import {Utils, maxValue, minValue, sortArray, formValidatePattern,trimModel} from "../../shared/utils";
import {TRUCK_COUNTRY_MASTER} from "../../shared/serviceconfiguration";
import {SecurityUtility} from "../../shared/securityutility";
import {TruckhistoryPage} from "../truckhistory/truckhistory";
import * as $ from 'jquery';
import {ValidationService} from "../../shared/validation.service";

/**
 * Generated class for the TruckdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-truckdetails',
  templateUrl: 'truckdetails.html',

  providers: [TrucksearchbyidRequestModel, TruckRegResultModel, CheckMultipleTruckModel, TruckRegAttachResultModel,
    DocumentsReqModel, DocumentsResultModel, TruckRegTerminalRFIDRequestModel,
    OwnerCheckTruckModel, TruckAdminEditModal, Utils, SecurityUtility]

})
export class TruckdetailsPage {
  maxdate: string = new Date().toISOString();
  validDateFlag : boolean = true;
  validInsDateFlag : boolean = true;
  validExpDateFlag : boolean = true;
  err_date_msg:string = '';
  err_date_ins_msg:string = '';
  err_date_exp_msg:string = '';
  regExpDate: any = new Date();
  startDateMin: string = new Date('2000-11-10').toISOString();
  DocDateMin: string = new Date('1950-01-01').toISOString();
  tempAttachArray: number = 0;
  ownercheckbox: boolean = false;
  truckRegId: number;
  truckRegRequestId: number;
  fromHistory: boolean;
  actionStatus: string;
  reregFirstLoad : boolean = false;
  mandatoryDocumentMaster: DocumentsResultModel[];
  currentMandatoryDocument: DocumentsResultModel[];
  items: string[];
  poolname: string[];
  patternLenghth = /^([1-9]|10)$/;
  grosspattern = /^(?:[1-9]|0[1-9]|10)$/;
  exprdate: any;
  previousName: string = '';
  previousEngineNo: string = '';
  previousOwnerPostCode: string = '';
  det: Array<{ title: string, icon: string, showDetails: boolean, color: string }> = [];
  spec: Array<{ title: string, icon: string, showDetails: boolean, color: string }> = [];
  own: Array<{ title: string, icon: string, showDetails: boolean, color: string }> = [];
  att: Array<{ title: string, icon: string, showDetails: boolean, color: string }> = [];

  sh_msg: boolean = false;
  typeselection = " "
  groupOne: FormGroup;
  groupTwo: FormGroup;
  groupThree: FormGroup;
  groupFour: FormGroup;
  groupFive: FormGroup;
  takeTwo: FormGroup;
  takeThree: FormGroup;
  takeFour: FormGroup;
  takeFourAttachments: FormArray;
  @ViewChild(Slides) slides: Slides;
  private truckdetails: boolean = true;
  private truckowner: boolean = false;
  private truckterminal: boolean = false;
  private truckattach: boolean = false;
  private oldtrucktype: string = "";
  private addRfidEnable: boolean = true;

  public base64Image: string;

  private imageSrc: any[] = [];
  grid: Array<Array<string>>;
  private uploaded: boolean = false;

  private rfidshow: boolean = true;

  public csvItems: any;
  truckMultipleChk: TruckRegResultModel[];
  attachments: TruckRegAttachResultModel[];
  temp_attachments: TruckRegAttachResultModel[];
  mandatoryattach: TruckRegAttachResultModel[];
  curtruckRegTerminalSOList: TruckRegTerminalResultModel[];
  @ViewChild('navbar') navBar: Navbar;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  mainArray: any[];

  rfidnum: any = [];
  rfidnums: any = [];

  mandatoryDocTypeArray: any;
  localDocTypeArray: any;
  poolList: TruckRegPoolRequestModel[];
  countryOfRegistrationcsv: any;
  statecsv: any;
  plateTypecsv: any;
  plateCodecsv: any;
  licensePlateNocsv: any;
  registrationStartDatecsv: any;
  registrationExpiryDatecsv: any;
  registeringAuthoritycsv: any;
  truckModelcsv: any;
  engineNocsv: any;
  chassisNocsv: any;
  manufacturercsv: any;
  lengthcsv: any;
  numberOfAxlescsv: any;
  typecsv: any;
  makeYearcsv: any;
  engineTypecsv: any;
  maximumGrossWeightcsv: any;
  vehicleColorcsv: any;
  truckInsuranceCompanycsv: any;
  truckInsuranceStartDatecsv: any;
  truckInsuranceNumbercsv: any;
  insuranceExpiryDatecsv: any;
  registrationNumbercsv: any;
  activecsv: any;
  showSO: boolean;
  namecsv: any;
  addressLine1csv: any;
  addressLine2csv: any;
  ownerCountrycsv: any;
  ownerStatecsv: any;
  ownerCitycsv: any;
  ownerPostCodecsv: any;
  phoneNumbercsv: any;
  leaseOwncsv: any;
  rfid_toadd: string[];
  rfIdNumbers: string;
  poolNamecsv: string;
  attachdocs: any;
  filebrowse: any;
  // country: string;
  // state: string;
  // platecode: string;
  // platetype: string;
  // lpn: string;
  // name: any;
  // addressLine1: any;
  // addressLine2: any;
  // ownerCity: any;
  // phoneNumber: any;
  // ownerCountry: any;
  // ownerState: any;
  // leaseOwn: any;
  // ownerPostCode: any;
  //poolName: any;
  // portname: any;

  inputNamePattern: string = "^[a-z0-9A-Z ]*$";

  formValidate: boolean = false;
  formValidateAdmin: boolean = false;

  rereg: string = null;
  truckRegTerminalSOList: any;

  // registrationExpiryDate: any;
  // registrationStartDate: any;
  //Variable to hold the Truck Registration Status
  truckStatus: string;
  mode: any;
  alertMsg: string;

  dateFormat: string = 'DD/MM/YYYY';
  uniqueRfidStatus: boolean = true;
  selectedCategory: any;
  public createdFromDate: any = '';
  public createdToDate: any = '';

  temparray: any[] = [];

  countryarray: any[] = [];
  statearray: any[] = [];
  mode_title: any[] = [];

  showCountryField: boolean;
  showStateField: boolean;
  tempCountryList: any[];
  rawCountryList: any[];
  stateDisabledStatus: boolean = true;
  temporary: any;
  approveStatus: string;
    distance:any = 5;
  validateCountry: boolean = true;


  private uploadFilePath: string;
  private uploadFileName: string;
  @ViewChild(Content) content: Content;
  private _fromExecuteAction: any;
  // scrollHandler(event) { this.content.scrollTop = this.content.scrollTop;
  //
  //   var interval = setInterval(() => {
  //   //   this.content.scrollTop = this.distance;
  //   //   this.distance=this.distance-5 ;
  //   //   if (this.distance<10){
  //   //     clearInterval(interval);
  //   //   }
  //   }, 5);
  // }

  constructor(public ele: ElementRef , public platform: Platform, public keyboard: Keyboard, public ownercheck: TruckservicesProvider, public popoverCtrl: PopoverController, private camera: Camera,
              public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController,
              public http: Http, public truckSearchdDetailsService: TruckservicesProvider, public temp_truckRegResultModel: TruckRegResultModel, public truckRegResultModel: TruckRegResultModel,
              public truckSearchbyidModel: TrucksearchbyidRequestModel, public checkMultipleTruckModel: CheckMultipleTruckModel,
              public commonservices: CommonservicesProvider, public documentsReqModel: DocumentsReqModel, public truckservicesProvider: TruckservicesProvider,
              public rfidObject: TruckRegTerminalRFIDRequestModel, public ownercheckmodel: OwnerCheckTruckModel, public truckAdminEditModal: TruckAdminEditModal, public utils: Utils,
              public securityUtility: SecurityUtility,public datepipe: DatePipe) {
    this.rfid_toadd = [];
    // this.Types=["Refrigerator Truck","Tank Truck","Tractor Truck","Ballast Tractor","Heavy Hauler"]
    this.typeselection = "--Select a Type--";
    this.oldtrucktype = this.truckRegResultModel.type;
    this.mode = navParams.get('mode');//[edit,new,view]
    this.rereg = navParams.get('rereg');
    if (null != navParams.get('reg_aut_so_list')) {
      this.truckRegResultModel.truckRegAuthorityMasterSOList = navParams.get('reg_aut_so_list');
      if (this.truckRegResultModel.truckRegAuthorityMasterSOList.length > 0) {
        this.showSO = true;
      } else {
        this.showSO = false;
      }
    }
    // The call to load the mandatory documents for truck regs
    this.getMandatoryAttachDoc();

    this.loadlists();
    this.mode_title['view'] = 'View';
    this.mode_title['edit'] = 'Edit';
    this.mode_title['new'] = 'Create';

    // The call to load the mandatory documents for truck regs
    this.regExpDate.setFullYear(this.regExpDate.getFullYear() + 5);
    this.regExpDate = this.regExpDate.toISOString();
    if (this.mode == 'new') {
      this.truckRegResultModel.countryOfRegistration = navParams.get('country');
      this.truckRegResultModel.state = navParams.get('state');
      this.truckRegResultModel.plateType = navParams.get('PlateType');
      this.truckRegResultModel.plateCode = navParams.get('PlateCode');
      this.truckRegResultModel.licensePlateNo = navParams.get('LPN');
      this.poolList = navParams.get('pool_so_list');
      this.truckRegResultModel.truckRegTerminalSOList = navParams.get('terminal_so_list');
      this.curtruckRegTerminalSOList = this.truckRegResultModel.truckRegTerminalSOList;
      this.attachments = new Array<TruckRegAttachResultModel>();
    }
    else if (this.mode == 'edit' || this.mode == 'view') {
      this.truckRegId = navParams.get('sel_truckId');
      this.truckRegRequestId = navParams.get('truckRegRequestId');
      this.fromHistory = navParams.get('fromHistory');
      if (true == this.fromHistory) {
        this.showSO = true; //Bug534-Fix
        if (navParams.get('actionStatus')) {
          this.truckStatus = navParams.get('actionStatus');
        }
        else {
          //TODO - Need to check to if we need to replace the usage of this.truckRegResultModel.status  with
          // this.truckStatus
          this.truckStatus = navParams.get('truckStatus');
        }
      } else {
        this.truckStatus = navParams.get('truckStatus');
      }

      this.truckRegResultModel.truckRegTerminalSOList = navParams.get('terminal_so_list');
      this.curtruckRegTerminalSOList = this.truckRegResultModel.truckRegTerminalSOList;
      this.loadTruckDetails();
    }

    this.groupOne = formBuilder.group({
      //licensePlateNo: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
      startdate: ['', Validators.compose([Validators.required])],
      enddate: ['', Validators.compose([Validators.required])],
      plateType: [''],
      plateCode: [''],

    });
    this.groupTwo = formBuilder.group({
      RegAuth: ['', Validators.compose([Validators.required])]
    });
    this.groupThree = formBuilder.group({
      truckModel: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      engineNo: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate]],
      chassisNo: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate]],
      manufacturer: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate]],
      // engineNo: ['',[formValidatePattern('/^[a-z0-9A-Z ]*$/'),Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      // chassisNo: ['',[formValidatePattern('/^[a-z0-9A-Z ]*$/'),Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      // manufacturer: ['',[formValidatePattern('/^[a-z0-9A-Z ]*$/'),Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      length: ['',[minValue(1), maxValue(10), Validators.compose([Validators.pattern(/^[0-9]*$/)])]],
      numberOfAxles: ['',[minValue(1), maxValue(10), Validators.compose([Validators.pattern(/^[0-9]*$/)])]],
    });
    this.groupFour = formBuilder.group({
      type: ['', Validators.compose([Validators.minLength(0),Validators.required])],
      makeYear: ['', Validators.compose([Validators.minLength(4), Validators.required])],
    });
    this.groupFive = formBuilder.group({
      engineType: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate]],
      // engineType: ['',[formValidatePattern('/^[a-z0-9A-Z ]*$/'),Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      maximumGrossWeight: ['', [minValue(1), maxValue(10), Validators.compose([Validators.pattern(/^[0-9]*$/)])]],
      vehicleColor: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate]],
      // vehicleColor: ['', [formValidatePattern('/^[a-z0-9A-Z ]*$/'),Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      truckInsuranceCompany: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate]],
      // truckInsuranceCompany: ['',[formValidatePattern('/^[a-z0-9A-Z ]*$/'),Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      active: ['', Validators.compose([Validators.minLength(0)])],
      expirydate: '',
      trkexpirydate: '',
      truckInsuranceNumber: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate]],
      // truckInsuranceNumber: ['',[formValidatePattern('/^[a-z0-9A-Z ]*$/'),Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      truckInsuranceStartDate: '',
    });

    this.takeTwo = formBuilder.group({
      name: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate,Validators.required]],
      // name: ['', [formValidatePattern("/^[a-z0-9A-Z ]*$/"),Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])]],
      addressLine1: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),Validators.required]],
      addressLine2: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      ownerCity: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate,Validators.required]],
      phoneNumber: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.numberValidate,Validators.required]],
      ownerPostCode: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.numberValidate]],
      // addressLine1: ['', [formValidatePattern(''),Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])]],
      // addressLine2: ['',[formValidatePattern(''), Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      // ownerCity: ['',[formValidatePattern('/^[a-z0-9A-Z ]*$/'),Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      // phoneNumber: ['', [formValidatePattern("/^[0-9]*$/"), Validators.compose([Validators.required, Validators.minLength(3)])]],
      ownerCountry: ['', Validators.compose([Validators.required])],
      ownerState: ['', Validators.compose([Validators.required])],
      leaseOwn: [''],
      // ownerPostCode: ['', [formValidatePattern("/^[0-9]*$/"),Validators.compose([Validators.minLength(3), Validators.maxLength(255)])]],
      ownercheck: ['', Validators.compose([Validators.required])],
    });

    this.takeThree = formBuilder.group({

      poolname: [''],
      rfidnums: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(10)])],
      portname: ['', Validators.compose([Validators.minLength(0)])]
      // rfidtoggle: [''],
    });

    this.takeFour = formBuilder.group({
      takeFourAttachments: formBuilder.array([
      ]),
      disabled: false
    });

    this.takeFourAttachments = this.takeFour.get('takeFourAttachments') as FormArray;


    this.det.push({
      title: 'Truck Details',
      icon: 'add',
      showDetails: false,
      color: 'collapse'
    });

    this.spec.push({
      title: 'Owner Details',
      icon: 'add',
      showDetails: false,
      color: 'collapse'
    });

    this.own.push({
      title: 'Terminal & Pool Details',
      icon: 'add',
      showDetails: false,
      color: 'collapse'
    });

    this.att.push({
      title: 'Attachments',
      icon: 'add',
      showDetails: false,
      color: 'collapse'
    });

    this.mainArray = [
      {id: 1, heading: 'Truck Details', showDetails: true},
      {id: 2, heading: 'Owner Details', showDetails: false},
      {id: 3, heading: 'Terminal & Pool Details', showDetails: false},
      {id: 4, heading: 'Attachments', showDetails: false}
    ];

    this.selectedCategory = this.mainArray[0].heading;
    this.showLeftButton = false;
    this.showRightButton = this.mainArray.length > 2;

  }
  // @HostListener('scroll', ['$event'])
  // onElementScroll($event) {
  //
  // }
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

  public filterData(category): void {
    if (category.heading == 'Truck Details') {

      this.firstpage();
    }
    else if (category.heading == 'Owner Details') {
      this.secondpage();
    }
    else if (category.heading == 'Terminal & Pool Details') {
      this.thirdpage();
    }
    else if (category.heading == 'Attachments') {
      this.fourthpage();
    }
  }

  addAttachForm(docType: any, docNo: any, fromdate: any, toDate: any, fileName: any): FormGroup {
    return this.formBuilder.group({
      /*docType: [docType, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required, Validators.pattern(/^[a-z0-9A-Z ]*$/)])],
      docNo: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required, Validators.pattern(/^[a-z0-9A-Z ]*$/)])],*/
      docType: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate,Validators.required]],
      docNo: ['',[Validators.compose([Validators.minLength(3), Validators.maxLength(255)]),ValidationService.stringValidate,Validators.required]],
      // docType: [docType,[formValidatePattern('/^[a-z0-9A-Z ]*$/'), Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])]],
      // docNo: ['',[formValidatePattern('/^[a-z0-9A-Z ]*$/'),Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])]],
      fromDate: ['', Validators.compose([Validators.required])],
      toDate: ['', Validators.compose([Validators.required])],
      fileName: ['', Validators.compose([Validators.required])],
    });
  }

  dismissKeyboard(content) {
    if (content.keyCode == 13) {
      this.keyboard.close();
    }

  }

  pasteEvent() {
    return true;
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 200,
      targetWidth: 200
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageSrc.push(this.base64Image);
      this.showgrid();
    }, (err) => {
      // Handle error
    });
  }

  showgrid() {

    this.grid = Array(Math.ceil(this.imageSrc.length / 2));

    let rowNum = 0; //counter to iterate over the rows in the grid

    for (let i = 0; i < this.imageSrc.length; i += 2) { //iterate images

      this.grid[rowNum] = Array(2); //declare two elements per row

      if (this.imageSrc[i]) { //check file URI exists
        this.grid[rowNum][0] = this.imageSrc[i] //insert image
      }

      if (this.imageSrc[i + 1] != null) { //repeat for the second image
        this.grid[rowNum][1] = this.imageSrc[i + 1]
      }

      rowNum++; //go on to the next row
    }
  }

  ionViewWillEnter() {

    /*if (this.mode == 'view') {
      this.loadTruckDetails();
    }*/
  if(this._fromExecuteAction) {
    this._fromExecuteAction.then(data => {
      if (this.mode == 'view') {
        this.loadTruckDetails();
      }
      this._fromExecuteAction = null;
    });
  }
    this.loadCSV();
  }

  loadCSV() {
    this.readCsvData('assets/data/truckregistration.csv')

  }

  hideCompare() {
    if ((this.truckStatus != null && this.truckStatus != "Approved") || (this.truckRegResultModel.amendRequestStatus != null && this.truckRegResultModel.amendRequestStatus == "Approved")) {
      return true;
    } else if (this.fromHistory) {
      return false;
    }
  }

  seecomparison() {
    this.navCtrl.push(TruckComparisonPage, {registrationId: this.truckRegId});
  }

// added this method to show workflow page from truck details.
  showWorkflow() {

    this.navCtrl.push(WorkflowPage, {
      "requestID": this.truckRegRequestId,
      "workflowId": this.truckRegResultModel.wrkflwId,
      "WFModule": "truck"
    });
  }


  readCsvData(csvUrl) {

    this.http.get(csvUrl)

      .subscribe(
        (data) => this.extractData(data['_body']),
        err => this.handleError(err)
      );
  }

  getCalenderIconStatus() {
    if (this.mode == "new") {
      return false;
    }
    else if (this.mode == "edit") {
      return false;
    }
    else {
      return true;
    }
  }

  expiryCalenderIcon() {
    if (this.mode == 'new' || this.mode == 'view') {
      return true;
    } else if (this.mode == 'edit') {
      if (this.isAdminUser() == false)
        return true;
      else
        return false;
    }
  }


  keyUpCheckerNumberAlphabet(ev) {
    let elementChecker: string;
    let format = /^[a-z0-9]*$/i;
    elementChecker = ev.target.value;
    // console.log(ev.target.value);
    let currentKeyCode = ev.keyCode;
    if (currentKeyCode >= 48 && currentKeyCode <= 57) {
      this.truckRegResultModel.engineNo = ev.target.value;
    }
    if (currentKeyCode >= 65 && currentKeyCode <= 90) {
      this.truckRegResultModel.engineNo = ev.target.value;
    }
    if (currentKeyCode >= 96 && currentKeyCode <= 105) {
      this.truckRegResultModel.engineNo = ev.target.value;
    }
    if (currentKeyCode == 32) {
      this.truckRegResultModel.engineNo = ev.target.value;
    }
    if (!format.test(elementChecker)) {
      this.truckRegResultModel.engineNo = this.previousEngineNo;
    }
    else {
      this.previousEngineNo = this.truckRegResultModel.engineNo;
    }
  }
 removeUnicodeCharactes(val):any{
    let currentVal = val;
  let  ranges = [
    '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
    '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
    '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
  ];
   // val=val.replace(/[\uE000-\uF8FF]/g, '');
   // val.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '')
   val = val.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
   val = val.replace(/[^\x00-\xFFFF]/g, "");
   return val;
   // return val.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
}

  keyUpValidate(e, format, model) {
    //e.target.value = this.removeUnicodeCharactes(e.target.value);
    this.utils.keyUpValidate(e, format);
    if (model == 'truckRegResultModel.truckModel') {
      this.truckRegResultModel.truckModel = e.target.value;
    }
    else if (model == 'truckRegResultModel.engineNo') {
      this.truckRegResultModel.engineNo = e.target.value;
    }
    else if (model == 'truckRegResultModel.chassisNo') {
      this.truckRegResultModel.chassisNo = e.target.value;
    }
    else if (model == 'truckRegResultModel.manufacturer') {
      this.truckRegResultModel.manufacturer = e.target.value;
    }
    else if (model == 'truckRegResultModel.length') {
      this.truckRegResultModel.length = e.target.value;
    }
    else if (model == 'truckRegResultModel.numberOfAxles') {
      this.truckRegResultModel.numberOfAxles = e.target.value;
    }
    else if (model == 'truckRegResultModel.engineType') {
      this.truckRegResultModel.engineType = e.target.value;
    }
    else if (model == 'truckRegResultModel.maximumGrossWeight') {
      this.truckRegResultModel.maximumGrossWeight = e.target.value;
    }
    else if (model == 'truckRegResultModel.vehicleColor') {
      this.truckRegResultModel.vehicleColor = e.target.value;
    }
    else if (model == 'truckRegResultModel.truckInsuranceCompany') {
      this.truckRegResultModel.truckInsuranceCompany = e.target.value;
    }
    else if (model == 'truckRegResultModel.truckInsuranceNumber') {
      this.truckRegResultModel.truckInsuranceNumber = e.target.value;
    }
    else if (model == 'truckRegResultModel.name') {
      this.truckRegResultModel.name = e.target.value;
    }
    else if (model == 'truckRegResultModel.addressLine1') {
      this.truckRegResultModel.addressLine1 = e.target.value;
    }
    else if (model == 'truckRegResultModel.addressLine2') {
      this.truckRegResultModel.addressLine2 = e.target.value;
    }
    else if (model == 'truckRegResultModel.ownerCity') {
      this.truckRegResultModel.ownerCity = e.target.value;
    }
    else if (model == 'truckRegResultModel.ownerPostCode') {
      this.truckRegResultModel.ownerPostCode = e.target.value;
    }
    else if (model == 'truckRegResultModel.phoneNumber') {
      this.truckRegResultModel.phoneNumber = e.target.value;
    }
    else if (model.indexOf('docType') > -1)//docType1
    {
      let index = model.replace('docType', "");
      this.attachments[index].docType = e.target.value;
    }
    else if (model.indexOf('docNum') > -1)//docNum
    {
      let index = model.replace('docNum', "");
      this.attachments[index].docNum = e.target.value;
    }
    /*    else if (model.indexOf('rfid_toadd') > -1)//docNum
        {
          let index = model.replace('rfid_toadd', "");
          this.rfid_toadd[index] = e.target.value;
        }*/
  }

  keyUpValidateRFID(e,model) {
    this.utils.keyUpValidate(e,"");

    if (model.indexOf('rfid_toadd') > -1)//docNum
    {
      let index = model.replace('rfid_toadd', "");
      this.rfid_toadd[index] = e.target.value;
    }
  }

  private extractData(res: Response) {
    let index: number;
    let csvItems = res || '';
    let allTextLines = csvItems.toString().split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];

    for (var i = 0; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(',');
      if (data.length == headers.length) {
        let tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j]);
        }
        lines.push(tarr);
      }
    }
    this.csvItems = lines;
    if (this.mode == 'new') {
      index = 6;//index of pg_new
    }

    else if (this.mode == 'edit') {
      index = 9;//index of pg_dit
    }
    else {
      index = 7;//index of pg_view
    }
    this.countryOfRegistrationcsv = this.csvItems[9][index];
    this.statecsv = this.csvItems[10][index];
    this.plateTypecsv = this.csvItems[11][index];
    this.plateCodecsv = this.csvItems[12][index];
    this.licensePlateNocsv = this.csvItems[13][index];
    this.registrationStartDatecsv = this.csvItems[14][index];
    this.registrationExpiryDatecsv = this.csvItems[15][index];
    this.registeringAuthoritycsv = this.csvItems[16][index];
    this.truckModelcsv = this.csvItems[17][index];
    this.engineNocsv = this.csvItems[18][index];
    this.chassisNocsv = this.csvItems[19][index];
    this.manufacturercsv = this.csvItems[20][index];
    this.lengthcsv = this.csvItems[21][index];
    this.numberOfAxlescsv = this.csvItems[22][index];
    this.typecsv = this.csvItems[23][index];
    this.makeYearcsv = this.csvItems[24][index];
    this.engineTypecsv = this.csvItems[25][index];
    this.maximumGrossWeightcsv = this.csvItems[26][index];
    this.vehicleColorcsv = this.csvItems[27][index];
    this.truckInsuranceCompanycsv = this.csvItems[37][index];
    this.truckInsuranceStartDatecsv = this.csvItems[38][index];
    this.truckInsuranceNumbercsv = this.csvItems[39][index];
    this.insuranceExpiryDatecsv = this.csvItems[40][index];
    this.registrationNumbercsv = this.csvItems[41][index];
    this.activecsv = this.csvItems[42][index];
    this.namecsv = this.csvItems[28][index];
    this.addressLine1csv = this.csvItems[29][index];
    this.addressLine2csv = this.csvItems[30][index];
    this.ownerCountrycsv = this.csvItems[31][index];
    this.ownerStatecsv = this.csvItems[32][index];
    this.ownerCitycsv = this.csvItems[33][index];
    this.ownerPostCodecsv = this.csvItems[34][index];
    this.phoneNumbercsv = this.csvItems[35][index];
    this.leaseOwncsv = this.csvItems[36][index];
    this.rfIdNumbers = this.csvItems[45][index];
    this.poolNamecsv = this.csvItems[46][index];
    this.attachdocs = this.csvItems[47][index];
    this.filebrowse = this.csvItems[54][index];
  }


  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }
   lastScrollTop = 0;
  startScroll:boolean = false;
  currentScrollInterval:any;
   ts:any;
   te:any;
   scrollLength= 0;
   //touchCancelled:false;
  ionViewDidLoad() {
    if(this.platform.is("ios")) {
      // this.content._scrollContent.nativeElement.addEventListener("touchcancel", function (e) {
      //   console.log("touch start");
      //   setTimeout(function () {
      //     this.startScroll = false;
      //     this.scrollLength = 0;
      //   }, 200);
      // }, false);
      this.content._scrollContent.nativeElement.addEventListener("touchcancel", function (e) {
        console.log("touch cancel");
        setTimeout(function () {
          this.startScroll = false;
          this.scrollLength = 0;
        }, 10);
      }, false);
      this.content.ionScrollStart.subscribe((data) => {
        this.startScroll = true;
        this.scrollLength = 1;
      });
      this.content.ionScroll.subscribe((data) => {
        if (this.startScroll === true) {
          if (this.lastScrollTop >= this.content.scrollTop) {
            if (this.content._scrollContent.nativeElement.scrollTop >= this.lastScrollTop - this.scrollLength) {
              this.content._scrollContent.nativeElement.scrollTop = this.content._scrollContent.nativeElement.scrollTop - this.scrollLength;
            }
          } else {
            if (this.content._scrollContent.nativeElement.scrollTop <= this.lastScrollTop + this.scrollLength) {
              this.content._scrollContent.nativeElement.scrollTop = this.content._scrollContent.nativeElement.scrollTop + this.scrollLength;
            }
          }
        }
      });
      this.content.ionScrollEnd.subscribe((data) => {
        this.startScroll = false;
        console.log("scrollTop" + this.content._scrollContent.nativeElement.scrollTop.toString());
        this.lastScrollTop = this.content._scrollContent.nativeElement.scrollTop + 1;
      });
    }
  }




  toggleDetails(det) {
    if (det.showDetails) {
      det.showDetails = false;
      det.icon = 'add';
      det.color = 'collapse';
    } else {
      det.showDetails = true;
      det.icon = 'remove';
      det.color = 'lblue';
    }
  }

  toggleDetail(spec) {
    if (spec.showDetails) {
      spec.showDetails = false;
      spec.icon = 'add';
      spec.color = 'collapse';
    } else {
      spec.showDetails = true;
      spec.icon = 'remove';
      spec.color = 'lblue';
    }
  }

  toggleDetai(own) {
    if (own.showDetails) {
      own.showDetails = false;
      own.icon = 'add';
      own.color = 'collapse';
    } else {
      own.showDetails = true;
      own.icon = 'remove';
      own.color = 'lblue';
    }
  }

  toggleDeta(att) {
    if (att.showDetails) {
      att.showDetails = false;
      att.icon = 'add';
      att.color = 'collapse';
    } else {
      att.showDetails = true;
      att.icon = 'remove';
      att.color = 'lblue';
    }
  }


  truckCountryReghidden() {
    if (this.countryOfRegistrationcsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckCountryRegedit() {
    if (this.countryOfRegistrationcsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckstatehidden() {
    if (this.statecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckstateedit() {
    if (this.statecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckplatetypehidden() {
    if (this.plateTypecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckplatetypeedit() {
    if (this.plateTypecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckplatecodehidden() {
    if (this.plateCodecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckplatecodeedit() {
    if (this.plateCodecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  trucklpnumhidden() {
    if (this.licensePlateNocsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  trucklpnumedit() {
    if (this.licensePlateNocsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckregstarthidden() {
    if (this.registrationStartDatecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckregstartedit() {
    if (this.registrationStartDatecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckregexpiryhidden() {
    if (this.registrationExpiryDatecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckregexpiryedit() {
    if (this.registrationExpiryDatecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckregauthhidden() {
    if (this.registeringAuthoritycsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckregauthedit() {
    if (this.registeringAuthoritycsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckmodelhidden() {
    if (this.truckModelcsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckmodeledit() {
    if (this.truckModelcsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckengnumhidden() {
    if (this.engineNocsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckengnumedit() {
    if (this.engineNocsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  sameOwnerHideNew() {
    if (this.mode == 'view') {
      return true;
    } else {
      if (this.truckRegResultModel && localStorage.getItem('CLIENT_CODE') != 'msadmin' &&
        this.truckRegResultModel && localStorage.getItem('CLIENT_CODE') != 'toadmin' &&
        this.truckRegResultModel && localStorage.getItem('CLIENT_CODE') != 'paadmin') {
        return false;
      }
      else {
        return true;

      }
    }
  }

  sameOwnerHide() {
    if (this.mode == 'view') {
      return true;
    } else {
      if (this.isAdminUser() == false) {
        return false;
      }
      else {
        return true;

      }
    }
  }

  truckchasnumhidden() {
    if (this.chassisNocsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckchasnumedit() {
    if (this.chassisNocsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckmanufhidden() {
    if (this.manufacturercsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckmanufedit() {
    if (this.manufacturercsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  cancelStatus() {
    if (this.isSameUser() && this.canCancel()) {
      if (this.truckStatus == "Cancelled" || this.truckRegResultModel.status == "Cancelled") {
        return true;
      } else if (this.truckRegResultModel.status == "Submitted") {
        return false;
      } else if (this.truckRegResultModel.status == "Rejected") {
        return false;
      } else if (this.truckRegResultModel.status == "Pending") {
        return false;
      } else if (this.truckRegResultModel.status == "Approved") {
        if (this.truckRegResultModel.amendRequestStatus == "Approved" || this.truckRegResultModel.amendRequestStatus == "Cancelled") {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return true;
    }
  }

  editTruckHistory() {
    this.mode = "edit";
    this.loadCSV();
    /*this.navCtrl.push(TruckdetailsPage, {
      truckRegRequestId: this.truckRegResultModel.truckRegRequestId,
      mode: this.mode,
      truckStatus: this.truckRegResultModel.status,
      sel_truckId: this.truckRegId,
      fromHistory: true
  });*/

  }

  editStatus() {
    //if (this.isAdminUser() == false) {
    if ((this.isSameUser() || this.isAdminUser()) && this.canEdit()) {
      if (this.truckStatus == "Cancelled" || this.truckRegResultModel.status == "Cancelled") {
        return true;
      } else if (this.truckRegResultModel.status == "Submitted") {
        return false;
      } else if (this.truckRegResultModel.status == "Pending") {
        return true;
      } else if (this.truckRegResultModel.status == "Rejected") {
        if (this.truckRegResultModel.amendRequestStatus == "Rejected" || this.truckRegResultModel.amendRequestStatus == "Submitted") {
          return false;
        } else {
          return true;
        }
      } else if (this.truckRegResultModel.status == "Approved") {
        if (this.truckRegResultModel.amendRequestStatus == "Rejected" || this.truckRegResultModel.amendRequestStatus == "Submitted") {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
    // } else if(this.canEdit() && this.truckRegResultModel.status != "Pending" ){
    //   return false;
    // } else {
    //   return true;
    // }
  }

  //Modified to check if the user have permission to create truck
  canEdit() {
    if (this.securityUtility.canAmend(this.securityUtility.TRUCK_REGISTRATION) == true) {
      return true;
    } else {
      return false;
    }
  }

  //Modified to check if the user have permission to create truck
  canCancel() {
    if (this.securityUtility.canCancel(this.securityUtility.TRUCK_REGISTRATION) == true) {
      return true;
    } else {
      return false;
    }
  }

  // cancelStatusOld() {
  //   if (this.truckRegResultModel.status === "Cancelled" || this.truckRegResultModel.status == "Pending") {
  //     return true;
  //   } else {
  //     if (this.isSameUser()) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  // }


  trucklenhidden() {
    if (this.lengthcsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  trucklenedit() {
    if (this.lengthcsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  trucknumaxleshidden() {
    if (this.numberOfAxlescsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  trucknumaxlesedit() {
    if (this.numberOfAxlescsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  trucktypehidden() {
    if (this.typecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  trucktypeedit() {
    if (this.typecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckmakeyearhidden() {
    if (this.makeYearcsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckmakeyearedit() {
    if (this.makeYearcsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckenginetypehidden() {
    if (this.engineTypecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckenginetypeedit() {
    if (this.engineTypecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckmgwhidden() {
    if (this.maximumGrossWeightcsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckmgwedit() {
    if (this.maximumGrossWeightcsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckvehcolorhidden() {
    if (this.vehicleColorcsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckvehcoloredit() {
    if (this.vehicleColorcsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckinsurancecomhidden() {
    if (this.truckInsuranceCompanycsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckinsurancecomedit() {
    if (this.truckInsuranceCompanycsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckinsustarthidden() {
    if (this.truckInsuranceStartDatecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckinsustartedit() {
    if (this.truckInsuranceStartDatecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckinsunumhidden() {
    if (this.truckInsuranceNumbercsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckinsunumedit() {
    if (this.truckInsuranceNumbercsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckinsuexphidden() {
    if (this.insuranceExpiryDatecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckinsuexpedit() {
    if (this.insuranceExpiryDatecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  truckregidhidden() {
    if (this.registrationNumbercsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckregidedit() {
    if (this.registrationNumbercsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }


  expiryhidden() {
    if (this.mode == 'new') {
      return true;
    } else {
      return false;
    }

  }

  trkexpirydisable() {
    if (this.isAdminUser()) {
      if (this.mode == 'new' || this.mode == 'edit') {
        return false;
      } else {
        return true;
      }
    }
    else {
      return true;
    }
  }

  truckacthidden() {
    if (this.mode == 'new' || this.activecsv == 'Hide') {
      return true;
    }
    else {
      if (this.isAdminUser()) {
        if (this.mode == "edit") {
          return false;
        }
      } else {
        if (this.fromHistory && this.mode == "edit") {
          return true;
        }
      }
      if (this.truckStatus == "Approved") {
        return false;
      } else if (this.truckRegResultModel.status == "Submitted" ||
        this.truckRegResultModel.status == "Pending") {
        return true;
      } else {
        return false;
      }
    }
  }


  truckactedit() {
    if (this.mode != 'view') {
      if (this.isAdminUser()) {
        return false;
      }
      else {
        if (this.truckRegResultModel.status == "Approved" || this.truckRegResultModel.status == "Rejected") {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }

  poolnameedit() {
    if (this.poolNamecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  rfIdNumeditstatus(terminalList) {
    if (terminalList.switchEnable) {
      this.addRfidEnable = true;
      if (this.rfIdNumbers == 'Editable' && this.isAdminUser() == false) {
        return false;
      } else {
        return true;
      }
    }
    else {
      this.addRfidEnable = false;
      return true;
    }
  }


  rfIdNumedit() {
    if (this.rfIdNumbers == 'Editable' && this.isAdminUser() == false) {
      return false;
    }
    else {
      return true;
    }
  }

  addrfIdstatus() {
    if (this.rfIdNumbers == 'Editable' && this.isAdminUser() == false && this.addRfidEnable) {
      return false;
    }
    else {
      return true;
    }
  }

  ownertruckhidden() {
    if (this.mode == 'view') {
      return true;
    }
    else {
      return false;
    }
  }

  isInViewMode() {
    if (this.mode == 'view') {
      return true;
    }
    else {
      return false;
    }
  }

  isInEditableMode() {
    if (this.mode == 'view' || this.isAdminUser()) {
      return true;
    }
    else {
      return false;
    }
  }

  ownernamehidden() {
    if (this.activecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  ownernameedit() {
    if (this.activecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  owneraddonehidden() {
    if (this.activecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  owneraddoneedit() {
    if (this.activecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  owneraddtwohidden() {
    if (this.activecsv == 'Hide') {
      return true;
    }
    else {
      return false;
    }
  }

  owneraddtwoedit() {
    if (this.activecsv == 'Editable' && this.isAdminUser() == false) {
      return false;
    }
    else {
      return true;
    }
  }

  ownercountryhidden() {
    if (this.activecsv == 'Hide') {
      return true;
    }
    else {
      return false;
    }

  }

  ownercountryedit() {
    if (this.activecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  owneredit_1() {
    if (this.activecsv == 'Editable' && this.isAdminUser() == true) {

      return true;

    }
    else {
      return false;

    }

  }
  ownerstatehidden() {
    if (this.activecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  ownerstateedit() {
    if (this.activecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  ownercityhidden() {
    if (this.activecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  ownercityedit() {
    if (this.activecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  ownerposthidden() {
    if (this.activecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  ownerpostedit() {
    if (this.activecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  ownerphonehidden() {
    if (this.activecsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  /*Added this method to identify the user is admin or not*/
  isAdminUser() {
    if (null != this.truckRegResultModel.approver) {
      if (this.truckRegResultModel.approver == "Y" && this.rereg != "rereg") {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  isSameUser() {
    if (this.truckRegResultModel && localStorage.getItem('CLIENT_CODE') == this.truckRegResultModel.clientCode) {
      return true;
    } else {
      return false;
    }
  }

  ownerphoneedit() {
    if (this.activecsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  truckownedhidden() {
    if (this.leaseOwncsv == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckownededit() {
    if (this.leaseOwncsv == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  owncountry() {
    if (this.ownerCountrycsv == 'Hide') {

      return false;

    }
    else {
      return true;

    }
  }

  ownstate() {
    if (this.ownerStatecsv == 'Hide') {

      return false;

    }
    else {
      return true;

    }
  }

  truckattachdochidden() {
    if (this.attachdocs == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckttachdocedit() {
    if (this.attachdocs == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }
    /*  if(attachment.closeStatus==true){
        return false;
      }else{
        return true;
      }*/

  }

  truckfilebrowsehide() {
    if (this.filebrowse == 'Hide') {

      return true;

    }
    else {
      return false;

    }

  }

  truckfilebrowseedit() {
    if (this.filebrowse == 'Editable' && this.isAdminUser() == false) {

      return false;

    }
    else {
      return true;

    }

  }

  nextpage() {
    if (this.truckdetails) {

      this.truckdetails = false;
      this.truckowner = true;
      this.truckterminal = false;
      this.truckattach = false;

    }

    else if (this.truckowner) {

      this.truckdetails = false;
      this.truckowner = false;
      this.truckterminal = true;
      this.truckattach = false;
    }
    else if (this.truckterminal) {

      this.truckdetails = false;
      this.truckowner = false;
      this.truckterminal = false;
      this.truckattach = true;
    }


  }


  firstpage() {
    this.content.scrollToTop(50);
    this.slides.slideTo(0,500);
    this.truckdetails = true;
    this.truckowner = false;
    this.truckterminal = false;
    this.truckattach = false;
    this.selectedCategory = "Truck Details";

  }

  secondpage() {
    this.content.scrollToTop(50);
    this.slides.slideTo(1,500);
    this.truckdetails = false;
    this.truckowner = true;
    this.truckterminal = false;
    this.truckattach = false;
    this.selectedCategory = "Owner Details";
  }

  thirdpage() {
    this.content.scrollToTop(50);
    this.slides.slideTo(2,500);
    this.truckdetails = false;
    this.truckowner = false;
    this.truckterminal = true;
    this.truckattach = false;
    this.selectedCategory = "Terminal & Pool Details";

  }

  fourthpage() {
    this.content.scrollToTop(50);
    this.slides.slideTo(3,500);
    this.truckdetails = false;
    this.truckowner = false;
    this.truckterminal = false;
    this.truckattach = true;
    this.selectedCategory = "Attachments";
    let trucktype = this.truckRegResultModel.type;
    /* this case checked for view and edit in normal and from history case*/
    if (this.oldtrucktype != trucktype || this.fromHistory){
      this.clearAttachmentArray();
      if ((trucktype != "" && trucktype != null) ||
        ((typeof(this.truckRegResultModel.truckRegAttachSOList) != 'undefined') &&
          (this.truckRegResultModel.truckRegAttachSOList.length > 0))){
        this.loadDocuments(trucktype); //changing the array count
      }
    }
    this.oldtrucktype = this.truckRegResultModel.type;
  }

  clearAttachmentArray() {

    this.mandatoryattach = [];
    if (this.takeFourAttachments) {
      let attachLength = this.takeFourAttachments.length;
      for (let i = 0, j = 0; i < attachLength; i++) {
        this.takeFourAttachments.removeAt(j);
        this.attachments.splice(j, 1);
      }
    }
    if (this.attachments.length > 0)
      this.attachments = [];
    this.tempAttachArray = 0;
  }


  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      if (this.mode != "view") {
        this.sh_msg = false;
        if (!this.groupOne.dirty && !this.groupTwo.dirty && !this.groupThree.dirty && !this.groupFour.dirty && !this.groupFive.dirty && !this.takeThree.dirty && !this.takeTwo.dirty &&
          !this.takeFour.dirty) {
          this.navCtrl.pop();
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'The entered details will be lost. Do you want to continue?',
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.navCtrl.pop();

                },
              },
              {
                text: 'Cancel',
                handler: () => {
                },
              }]

          });
          alert.setMode(this.utils.checkUIMode());
          alert.present();
        }
      } else {
        this.navCtrl.pop(); // Back button press when in view mode
      }
    };

  }

  enable_controls()
  {
    this.groupThree.controls['truckModel'].enable();
    this.groupThree.controls['engineNo'].enable();
    this.groupThree.controls['chassisNo'].enable();
    this.groupThree.controls['manufacturer'].enable();
    this.groupThree.controls['length'].enable();
    this.groupThree.controls['numberOfAxles'].enable();
    //enabling group-Five
    this.groupThree.controls['numberOfAxles'].enable();
    this.groupFive.controls['engineType'].enable();
    this.groupFive.controls['maximumGrossWeight'].enable();
    this.groupFive.controls['vehicleColor'].enable();
    this.groupFive.controls['truckInsuranceCompany'].enable();
    this.groupFive.controls['truckInsuranceNumber'].enable();
    //For enabling form-takeTwo
    this.takeTwo.controls['name'].enable();
    this.takeTwo.controls['addressLine1'].enable();
    this.takeTwo.controls['addressLine2'].enable();
    this.takeTwo.controls['ownerCity'].enable();
    this.takeTwo.controls['phoneNumber'].enable();
    this.takeTwo.controls['ownerPostCode'].enable();
  }

  truckdetailsubmit() {
    this.validateDate();
    this.validateInsDate();
    this.validateexpDate();
    if (this.truckdetailsubmitvalidate()) {
      if (!this.groupOne.valid || !this.groupTwo.valid || !this.groupThree.valid
      || !this.groupFour.valid || !this.groupFive.valid
      || !this.validDateFlag || !this.validInsDateFlag) {

        this.enable_controls();
        this.firstpage();
      }
      else if (!this.takeTwo.valid) {
        this.secondpage();
      }
      else if (!this.takeThree.valid) {
        this.thirdpage();
      }
      else if (this.attachments != null && this.attachments.length > 0 && !this.takeFour.valid) {
        this.fourthpage();
        for (let i = 0; i < this.takeFourAttachments.length; i++) {
          if (this.takeFourAttachments.controls[i].invalid) {
            this.attachments[i].showdetails = true;
          } else {
            this.attachments[i].showdetails = false;
          }
        }
      }
      return;
    }
    else if(this.formValidateAdmin)
    {
      if(!this.validExpDateFlag)
      {
        this.enable_controls();
        this.firstpage();
        return;
      }
    }
    this.showCreateEditAlert();
  }

  showCreateEditAlert() {
    //this.navCtrl.setRoot(TruckSearchResultsPage);
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: '<center> Do you want to submit your request ?</center>',
      //cssClass: 'search',
      cssClass: 'submit',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.temp_truckRegResultModel=Object.assign({}, this.truckRegResultModel);
            this.temp_truckRegResultModel.registrationExpiryDate = this.datetostring(this.truckRegResultModel.registrationExpiryDate);
            this.temp_truckRegResultModel.registrationStartDate = this.datetostring(this.truckRegResultModel.registrationStartDate);
            this.temp_truckRegResultModel.truckInsuranceStartDate = this.datetostring(this.truckRegResultModel.truckInsuranceStartDate);
            this.temp_truckRegResultModel.insuranceExpiryDate = this.datetostring(this.truckRegResultModel.insuranceExpiryDate);
            this.temp_truckRegResultModel.expiryDate = this.datetostring(this.truckRegResultModel.expiryDate);
            this.temp_attachments = Object.assign([],this.attachments);
            for (let i = 0; i < this.attachments.length; i++) {
              if(null != this.datetostring(this.attachments[i].docIssueDate)) {
                this.temp_attachments[i].docIssueDate = this.datetostring(this.attachments[i].docIssueDate);
              }
              if(null != this.datetostring(this.attachments[i].docExpDate)) {
                this.temp_attachments[i].docExpDate = this.datetostring(this.attachments[i].docExpDate);
              }

            }

            this.temp_truckRegResultModel.truckRegAttachSOList = this.temp_attachments;
            this.temp_truckRegResultModel.truckRegPoolSOList = [];
            if (this.poolname != null) {
              this.temp_truckRegResultModel.poolName = this.poolname[this.poolname.length];

              for (let i = 0; i < this.poolname.length; i++) {
                let poolobj = new TruckRegPoolRequestModel;
                poolobj.poolName = this.poolname[i];
                this.temp_truckRegResultModel.truckRegPoolSOList.push(poolobj);
              }
            }
            else {
              this.temp_truckRegResultModel.poolName = null;
            }
            /////Temp//////
            if (this.temp_truckRegResultModel.truckRegTerminalSOList.length > 0) {
              for (let i = 0; i < this.temp_truckRegResultModel.truckRegTerminalSOList.length; i++) {
                this.temp_truckRegResultModel.truckRegTerminalSOList[i].truckRegTerminalId = null;
                if (this.temp_truckRegResultModel.truckRegTerminalSOList.length > 0) {
                  for (let j = 0; j < this.temp_truckRegResultModel.truckRegTerminalSOList[i].truckRegRequestTerminalRFIDSO.length; j++) {
                    this.temp_truckRegResultModel.truckRegTerminalSOList[i].truckRegRequestTerminalRFIDSO[j].rfid = null;
                  }
                }
              }
            }
            /////Temp//////
            this.truckRegResultModel.switchEnable = "on";
            if (this.mode == 'new') {
              this.temp_truckRegResultModel.truckRegstatus = "Submitted";
              this.temp_truckRegResultModel.clientCode = localStorage.getItem('CLIENT_CODE');
              this.createTruckDetails();
            }
            else if (this.mode == 'edit') {
              if (this.rereg != null && this.rereg == 'rereg') {
                this.temp_truckRegResultModel.truckRegstatus = this.truckRegResultModel.status;
                this.temp_truckRegResultModel.reregister = "reregister";
                this.temp_truckRegResultModel.clientCode = localStorage.getItem('CLIENT_CODE');
                this.createTruckDetails();
              }
              else {
                this.temp_truckRegResultModel.truckRegstatus = "Amended";
                if (this.isAdminUser()) {
                  this.truckAdminEditModal.expiryDate =  this.datetostring(this.truckRegResultModel.expiryDate);
                  this.truckAdminEditModal.active = this.truckRegResultModel.active;
                  this.truckAdminEditModal.truckRegistrationId = this.truckRegResultModel.truckRegistrationId;
                  this.editAdminTruckDetails()
                } else {
                  this.editTruckDetails();
                }
              }
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }]
    });
    alert.setMode(this.utils.checkUIMode());
    alert.present();
  }

  showCreateEditStatus() {
    /*this.navCtrl.popToRoot().then(()=> {*/
    this.navCtrl.push(TrucksearchdetailsPage, {
      sel_truckId: this.truckRegResultModel.truckRegistrationId,
      sel_licPlateNo: this.truckRegResultModel.licensePlateNo,
      sel_OwnerName: this.truckRegResultModel.name,
      sel_truckStatus: this.truckRegResultModel.status,
      sel_truckDate: this.truckRegResultModel.createdDate,
      sel_statusIcon: "assets/img/submitted.svg",
      is_from_truck_create: true,
      truckLength: this.truckRegResultModel.length,
      truckColor: this.truckRegResultModel.vehicleColor
    });
    /*});*/
  }

  editTruckDetails() {
    this.truckSearchdDetailsService.editTruck(this.temp_truckRegResultModel)
      .subscribe(response => {
          this.truckRegResultModel = <TruckRegResultModel>response;
          // this.bindData();
          //console.log(this.truckRegResultModel.name);
          // console.log("response log ==>" + JSON.stringify(this.truckRegResultModel));
          this.showCreateEditStatus();
        },
        error => {
          if (error && error[0].message) {
            this.presentAlert('ALERT', error[0].message);
          } else {
            this.presentAlert('Error', "Web Service Error");
          }
        });
  }

  editAdminTruckDetails() {
    this.truckSearchdDetailsService.editAdminTruck(this.truckAdminEditModal)
      .subscribe(response => {
          this.truckRegResultModel = <TruckRegResultModel>response;
          // this.bindData();
          //console.log(this.truckRegResultModel.name);
          // console.log("response log ==>" + JSON.stringify(this.truckRegResultModel));
          this.showCreateEditStatus();
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
          //dismiss loading
          this.presentAlert('Error', "Web Service Error");
        });
  }

  createTruckDetails() {
    this.truckSearchdDetailsService.createTruck(this.temp_truckRegResultModel)
      .subscribe(response => {
          this.truckRegResultModel = <TruckRegResultModel>response;
          this.showCreateEditStatus();
        },
        error => {
          if (error && error[0].message) {
            this.presentAlert('ALERT', error[0].message);
          } else {
            this.presentAlert('Error', "Web Service Error");
          }

        });

  }
  valAfterClear:string;
  /*Added condition to check if the input is not empty and terminal details is enabed*/
  saverfid(id: string, i: number, c: number,abc:TruckRegTerminalResultModel) {

   // this.keyboardClose();
    this.rfidObject = new TruckRegTerminalRFIDRequestModel;
    if (id && id != "" && !this.rfIdNumedit()) {
      this.uniqueRfidStatus = true;
      if (id.length > 2 && id.length < 256) {
        let element: TruckRegTerminalRFIDRequestModel;
        for (element of this.curtruckRegTerminalSOList[i].truckRegRequestTerminalRFIDSO) {
          if (element.rfidNumbers == id) {
            this.uniqueRfidStatus = false;
            abc.valForClearingFeild='';
          }
        }
        if (this.uniqueRfidStatus) {
          this.rfidObject.rfidNumbers = id;
          this.curtruckRegTerminalSOList[i].truckRegRequestTerminalRFIDSO.push(this.rfidObject);
          abc.valForClearingFeild='';
        } else {
          this.presentAlert('RFID Number', 'RFID already exist');
        }
        this.rfid_toadd[i] = "";
      } else {
        this.presentAlert('Invalid RFID', 'Please enter valid RFID with three or more characters.');
      }
    } else {
      this.presentAlert('Invalid RFID', 'Please enter valid RFID with three or more characters.');
    }

  }

  //For managing copy paste for RFID
  onPaste(e: any,tIndex: any) {

    // Do stuff
    setTimeout(() => {
      this.rfid_toadd[tIndex] = e.target.value;
    });
    // Then clear pasted content from the input
  }
  hideCountryChange() {
    setTimeout(() => {
      // this.showAlert = false;
      if (this.validateCountry == true && this.truckRegResultModel.ownerCountry.length > 0) {
        if (this.truckRegResultModel.ownerState && this.truckRegResultModel.ownerState.length > 0) {
          let searchResp = this.temparray.find((item) => {
            if (this.truckRegResultModel.ownerCountry
              && this.truckRegResultModel.ownerCountry.toString().toLowerCase()
              == item.countryName.toString().toLowerCase()
              && this.truckRegResultModel.ownerState && this.truckRegResultModel.ownerState.toString().toLowerCase()
              == item.stateName.toString().toLowerCase()) {
              return (item.stateName);
            }
          })
          if (!searchResp && this.sh_msg) {
            this.truckRegResultModel.ownerCountry = "";
            this.presentAlert("Attention", 'Country is Invalid.');
          }
          else{
            this.countryarray.forEach(country => {
              if (country.toString().toLowerCase()
                == this.truckRegResultModel.ownerCountry.toString().toLowerCase()) {
                this.truckRegResultModel.ownerCountry=country.toString()
              }
            })
          }
          this.showCountryField = false;
        } else {
          let searchResp = this.temparray.find((item) => {
            if (this.truckRegResultModel.ownerCountry
              && this.truckRegResultModel.ownerCountry.toString().toLowerCase()
              == item.countryName.toString().toLowerCase()) {
              return (item.stateName);
            }
          })
          if (!searchResp && this.sh_msg) {
            this.truckRegResultModel.ownerCountry = "";
            if(this.truckRegResultModel.ownerCountry.length < 3 &&
              this.truckRegResultModel.ownerCountry.length > 0){
              //this.presentAlert("Alert", 'Please enter at least 3 characters.');
              this.presentAlert("Attention", 'Country is Invalid.');
            }
            else{
              this.presentAlert("Attention", 'Country is Invalid.');
            }
            this.truckRegResultModel.ownerState=''
          }
          else{
            this.countryarray.forEach(country => {
              if (country.toString().toLowerCase()
                == this.truckRegResultModel.ownerCountry.toString().toLowerCase()) {
                this.truckRegResultModel.ownerCountry=country.toString()
              }
            })
            this.truckRegResultModel.ownerState=''

          }
          this.showCountryField = false;
        }
      } else {
        this.validateCountry = true;
      }
    }, 500);
  }

  checkCountry(key: any) {
    setTimeout(() => {
      if (key.value.length != 0) {
        let searchResp: string;
        searchResp = this.countryarray.find(element =>
          // element == this.truckRegResultModel.ownerCountry)
          element.toString().toLowerCase() == this.truckRegResultModel.ownerCountry.toString().toLowerCase()
        )
        if (!searchResp && this.sh_msg) {

            this.truckRegResultModel.ownerCountry = '';
            this.truckRegResultModel.ownerState = '';
            this.presentAlert("Attention", 'Entered Country is Invalid.');
          this.showCountryField = false;
        }
        else {
          this.countryarray.forEach(country => {
            if (country.toString().toLowerCase()
              == this.truckRegResultModel.ownerCountry.toString().toLowerCase()) {
              this.truckRegResultModel.ownerCountry = country.toString()
            }
          })
          this.showCountryField = false
          /*      this.truckRegResultModel.ownerState=''*/
        }

      }
    }, 500);
  }

  checkState(key: any) {
    setTimeout(() => {
      if (key.value.length != 0) {
        let stateResp: boolean = false;
        for (let i = 0; i < this.statearray.length; i++) {
          if (this.statearray[i].stateName.toString().toLowerCase()
            == this.truckRegResultModel.ownerState.toString().toLowerCase()) {
            stateResp = true;
          }
        }
        if (!stateResp && this.sh_msg) {
            this.truckRegResultModel.ownerState = '';
            this.presentAlert("Attention", 'Entered State is Invalid.');
          this.showStateField = false;
        }
        else {
          let array = this.temparray.filter((item) => {

            if (this.truckRegResultModel.ownerCountry &&
              this.truckRegResultModel.ownerCountry.toString().toLowerCase() == item.countryName.toString().toLowerCase()) {
              return (item.stateName.toString().toLowerCase().startsWith(key.value.toString().toLowerCase()));
            }
          })
          let flag = 0
          if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
              if (array[i].stateName.toString().toLowerCase() == key.value.toString().toLowerCase()) {
                flag = 1;
                this.truckRegResultModel.ownerState = array[i].stateName.toString()
                break;
              }
            }
          }
          if (flag == 1) {
            this.showStateField = false
          }
          else if (this.sh_msg) {
            this.truckRegResultModel.ownerState = '';
            this.presentAlert("Attention", 'Entered State is Invalid.');
          }

        }
      }
    }, 500);
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.setMode(this.utils.checkUIMode());
    alert.present();
  }

  rfIdtoPop(rfid, terIndex: number, rfidIndex: number) {
    if (!this.rfIdNumedit()) {
      /*this.rfidObject.rfidNumbers = rfid;*/
      /*     var indexToPop = this.curtruckRegTerminalSOList[terIndex].truckRegRequestTerminalRFIDSO.indexOf(rfid,0);*/
      /* if (indexToPop > -1) {*/
      /*}*/

      this.curtruckRegTerminalSOList[terIndex].truckRegRequestTerminalRFIDSO.splice(rfidIndex, 1);

      let element: TruckRegTerminalRFIDRequestModel;
      for (element of this.curtruckRegTerminalSOList[terIndex].truckRegRequestTerminalRFIDSO) {
        // console.log("Element in " + element.rfidNumbers);
      }
    }

  }

  rfidpop(rfid, rfids: any) {

    var index: number = rfids.indexOf(rfid, 0);
    if (index > -1) {
      rfids.splice(index, 1);
    }

  }

  getCheck(terminalList) {
    if (terminalList.switchEnable) {
      return true;
    }
    else {
      return false;
    }
  }

  Toggle(terminalList, index: number) {

    // setTimeout(() => {
      if (terminalList.switchEnable) {
        terminalList.switchEnable = false;
      //  this.keyboardClose();
        //for (let i = 0; i < terminalList.truckRegRequestTerminalRFIDSO.length; i++) {
          terminalList.truckRegRequestTerminalRFIDSO = [];
       // }
      }
      else {
        terminalList.switchEnable = true;
      }
    // },50);

  }


  getStyle() {
    if (this.rfidshow) {
      return 1;
    }
    else {
      return 0.5;
    }

  }

  getfirstStyle() {
    if (this.truckdetails) {
      return "5px solid lightblue";
    }
    else {
      return "#387EF5";
    }
  }

  getsecondStyle() {
    if (this.truckowner) {
      return "5px solid lightblue";
    }
    else {
      return "#387EF5";
    }
  }

  getthirdStyle() {
    if (this.truckterminal) {
      return "5px solid lightblue";
    }
    else {
      return "#387EF5";
    }
  }

  getfourthStyle() {
    if (this.truckattach) {
      return "5px solid lightblue";
    }
    else {
      return "#387EF5";
    }
  }


  more() {
    let popover = this.popoverCtrl.create(MorePage);
    popover.present();
  }

  imagepop(i) {
    var imageindex: number = this.imageSrc.indexOf(i, 0);
    var rowindex: number = this.grid.indexOf(i, 0);
    // console.log("INDEX NUM: " + imageindex);
    // console.log("INDEX NUM: " + rowindex);
    if (imageindex > -1) {
      this.imageSrc.splice(imageindex, 1);
      // console.log("INDEX Remaining: " + this.imageSrc);
    }
  }

  buttonStatus() {
    if (this.fromHistory) {
      return false;
    } else {
      return true;
    }
  }

  cancelbuttonStatus() {
    if (this.mode == 'view') {
      if (((this.truckRegResultModel.status === 'Approved') && (this.truckRegResultModel.amendRequestStatus === 'Approved')) ||
        ((this.truckRegResultModel.status === 'Rejected') && (this.truckRegResultModel.amendRequestStatus === 'Rejected') ) ||
        ((this.truckRegResultModel.status === 'Rejected') && (this.truckRegResultModel.amendRequestStatus === 'Cancelled')) ||
        ((this.truckRegResultModel.status === 'Approved') && (this.truckRegResultModel.amendRequestStatus === 'Rejected')) ||
        ((this.truckRegResultModel.status === 'Approved') && (this.truckRegResultModel.amendRequestStatus === 'Cancelled'))) {
        return false;
      }
      else if (((this.truckRegResultModel.status === 'Pending') && (this.truckRegResultModel.amendRequestStatus === 'Pending')) ||
        ((this.truckRegResultModel.status === 'Rejected') && (this.truckRegResultModel.amendRequestStatus === 'Submitted')) ||
        ((this.truckRegResultModel.status === 'Rejected') && (this.truckRegResultModel.amendRequestStatus === 'Pending')) ||
        ((this.truckRegResultModel.status === 'Cancelled') && (this.truckRegResultModel.amendRequestStatus === 'Cancelled')) ||
        ((this.truckRegResultModel.status === 'Approved') && (this.truckRegResultModel.amendRequestStatus === 'Submitted')) ||
        ((this.truckRegResultModel.status === 'Approved') && (this.truckRegResultModel.amendRequestStatus === 'Pending'))) {
        // console.log(" Same User - Hide");
        return true;
      }


    } else {
      // console.log(" Same User");
      return false;
    }
    localStorage
  }


  workflowStatus() {
    if (this.fromHistory && this.mode == 'view') {
      return false;
    } else {
      return true;
    }
  }

  hideFloatingButton() {
    if (this.mode != 'view') {
      return true;
    } else {
      return false;
    }
  }

  deletetruck() {

    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'This action will cancel the Amendment request. Do you want to proceed?',
      //cssClass: 'search',
      buttons: [
        {

          text: 'OK',

          handler: () => {

            this.truckservicesProvider.cancelTruck(this.truckSearchbyidModel)
              .subscribe(Response => {
                  // console.log('Success');
                  this.navCtrl.push(TruckSearchResultsPage);
                },
                error => {
                  var errorMessage = <any>error;
                  //Show error message
                  //dismiss loading
                });

          }
        }, {
          text: 'CANCEL',
          handler: () => {
          },
        }]

    });

    alert.setMode(this.utils.checkUIMode());
    alert.present();

  }

  loadTruckDetails() {
    if (this.fromHistory) {
      this.truckSearchbyidModel.truckRegRequestId = this.truckRegRequestId;
    } else {
      this.truckSearchbyidModel.truckRegistrationId = this.truckRegId;
    }

    this.truckSearchdDetailsService.searchTruckById(this.truckSearchbyidModel)
      .subscribe(response => {
          this.truckRegResultModel = <TruckRegResultModel>response;
          this.curtruckRegTerminalSOList = <TruckRegTerminalResultModel[]>this.truckRegResultModel.truckRegTerminalSOList;
          for (let i = 0; i < this.truckRegResultModel.truckRegAttachSOList.length; i++) {
            this.truckRegResultModel.truckRegAttachSOList[i].docIssueDate = this.parsedate(this.truckRegResultModel.truckRegAttachSOList[i].docIssueDate);
            this.truckRegResultModel.truckRegAttachSOList[i].docExpDate = this.parsedate(this.truckRegResultModel.truckRegAttachSOList[i].docExpDate);
          }
          this.attachments = Object.assign([],this.truckRegResultModel.truckRegAttachSOList);
          // this.bindData();
          this.truckRegResultModel.registrationExpiryDate = this.parsedate(this.truckRegResultModel.registrationExpiryDate);
          this.truckRegResultModel.registrationStartDate = this.parsedate(this.truckRegResultModel.registrationStartDate);
          this.truckRegResultModel.truckInsuranceStartDate = this.parsedate(this.truckRegResultModel.truckInsuranceStartDate);
          this.truckRegResultModel.insuranceExpiryDate = this.parsedate(this.truckRegResultModel.insuranceExpiryDate);
          this.truckRegResultModel.expiryDate = this.parsedate(this.truckRegResultModel.expiryDate);
          if(this.poolList == null || this.poolList.length == 0)
          {
            this.poolList = JSON.parse(JSON.stringify(this.truckRegResultModel.truckRegPoolSOList))
            //this.poolList = Object.assign(this.truckRegResultModel.truckRegPoolSOList,[]);
            this.poolname = [];
            for (let i = 0; i < this.poolList.length; i++) {
              if (this.poolList[i].selected) {
                this.poolname.push(this.poolList[i].poolName);
              }
            }
          }

          if ((this.takeFourAttachments.controls.length < this.attachments.length) || (this.oldtrucktype != this.truckRegResultModel.type)){
            for (let i = 0; i < this.attachments.length; i++) {
              this.takeFourAttachments.push(this.addAttachForm(
                this.attachments[i].docType,
                this.attachments[i].docNum,
                this.attachments[i].docIssueDate,
                this.attachments[i].docExpDate,
                this.attachments[i].fileName,
              ));
            }
          }
          this.oldtrucktype = this.truckRegResultModel.type;

          if (this.rereg != null && this.rereg == "rereg") {
            if(!this.reregFirstLoad) {
              this.ownercheckbox = false;
              this.truckRegResultModel.name = '';
              this.truckRegResultModel.addressLine1 = '';
              this.truckRegResultModel.addressLine2 = '';
              this.truckRegResultModel.ownerCountry = '';
              this.truckRegResultModel.ownerState = '';
              this.truckRegResultModel.ownerCity = '';
              this.truckRegResultModel.ownerPostCode = '';
              this.truckRegResultModel.phoneNumber = '';
              this.truckRegResultModel.leaseOwn = '';
              this.reregFirstLoad = true;
              /*if (this.oldtrucktype != null && this.oldtrucktype != "") {
                this.loadDocuments(this.oldtrucktype);
              }*/
            }
            if(!this.takeFourAttachments.dirty)
            {
              this.clearAttachmentArray();
              this.loadDocuments(this.truckRegResultModel.type);
            }
          }
          if (this.truckRegResultModel.truckRegAttachSOList.length > 0) {
            this.checkCloseStatus();
          }
          //Trimming the strings to be displayed in the forms
          //trimModel(this.truckRegResultModel);

        },
        error => {
          var errorMessage = <any>error;
          //Show error message
          //dismiss loading
        });
  }

  isRereg()
  {
    if(this.rereg != null && this.rereg == "rereg")
      return true;
    else
      return false;
  }

  getTruckRegId()
  {
    if(this.rereg != null && this.rereg == "rereg")
      return '';
    else
      return this.truckRegResultModel.truckRegistrationId;
  }
  //For getting mandatory attachment doc type
  getMandatoryAttachDoc(){
    this.documentsReqModel.moduleName = "TRK_RG";
    this.commonservices.getDocuments(this.documentsReqModel, "truck")
      .subscribe(response => {
          this.mandatoryDocumentMaster = <DocumentsResultModel[]>response;
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
          //dismiss loading
        });
  }

  checkCloseStatus() {
    this.localDocTypeArray = [];
    for (let i = 0; i < this.takeFourAttachments.length; i++) {
      this.localDocTypeArray[i] = this.attachments[i]['docType'];
    }

    if (this.mode == 'edit') {
      this.mandatoryDocTypeArray = [];
      this.currentMandatoryDocument = this.mandatoryDocumentMaster.filter(x => x.keyCode == this.truckRegResultModel.type);
      for (let i = 0; i < this.currentMandatoryDocument.length; i++) {
        this.mandatoryDocTypeArray[i] = this.currentMandatoryDocument[i].docType;
      }
      for (let i = 0; i < this.takeFourAttachments.length; i++) {
        this.attachments[i].closeStatus = !(this.mandatoryDocTypeArray.includes(this.localDocTypeArray[i]));
      }
    }
  }

  showExecuteAction() {
    this.checkMultipleTruckModel.clientCode = localStorage.getItem('CLIENT_CODE');
    this.checkMultipleTruckModel.countryOfRegistration = this.truckRegResultModel.countryOfRegistration;
    this.checkMultipleTruckModel.state = this.truckRegResultModel.ownerState;
    this.checkMultipleTruckModel.licensePlateNo = this.truckRegResultModel.licensePlateNo;
    this.checkMultipleTruckModel.plateCode = this.truckRegResultModel.plateCode;
    this.checkMultipleTruckModel.plateType = this.truckRegResultModel.plateType;
    this.checkMultipleTruckModel.truckRegistrationId = this.truckRegResultModel.truckRegistrationId;

    this.truckSearchdDetailsService.checkMultipleTruck(this.checkMultipleTruckModel)
      .subscribe(response => {
          this.truckMultipleChk = <TruckRegResultModel[]> response;
          if (this.truckMultipleChk && this.truckMultipleChk[0] != null) {
            //show alert
            this.showMultipleAlert();
          } else {
            this.navExecuteAction();
          }
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
          //dismiss loading
        });

  }


  //---function for checkbox
  updateOwnerCheck() {
    // console.log('the checkbox is ' + this.ownercheckbox);
    if (this.ownercheckbox) {
      this.ownercheck.ownerCheckTruckAction(this.ownercheckmodel)
        .subscribe(response => {
            this.ownercheckmodel = <OwnerCheckTruckModel>response;
            this.truckRegResultModel.name = this.nameValidator(this.ownercheckmodel.name);
            this.truckRegResultModel.addressLine1 = this.addressValidator(this.ownercheckmodel.addressLine1);
            this.truckRegResultModel.addressLine2 = this.addressValidator(this.ownercheckmodel.addressLine2);
            this.truckRegResultModel.ownerCountry = this.addressValidator(this.ownercheckmodel.ownerCountry);

            this.truckRegResultModel.ownerCity = this.addressValidator(this.ownercheckmodel.ownerCity);
            this.truckRegResultModel.ownerState = this.addressValidator(this.ownercheckmodel.ownerState);

            this.truckRegResultModel.ownerPostCode = this.postalCodeValidator(this.ownercheckmodel.ownerPostCode);
            this.truckRegResultModel.phoneNumber = this.ownercheckmodel.phoneNumber;
          },
          error => {
            var errorMessage = <any>error;
            //Show error message
            //dismiss loading
          });
    }
    else {
      this.ownercheck.ownerCheckTruckAction(this.ownercheckmodel)
        .subscribe(response => {
            this.ownercheckmodel = <OwnerCheckTruckModel>response;
            this.truckRegResultModel.name = null;
            this.truckRegResultModel.addressLine1 = null;
            this.truckRegResultModel.addressLine2 = null;
            this.truckRegResultModel.ownerCountry = null;

            this.truckRegResultModel.ownerCity = null;
            this.truckRegResultModel.ownerState = null;
            this.truckRegResultModel.ownerPostCode = null;
            this.truckRegResultModel.phoneNumber = null;
          },
          error => {
            var errorMessage = <any>error;
            //Show error message
            //dismiss loading
          });

    }
  }

  postalCodeValidator(postalcode: string) {
    let format = /^[0-9 ]*$/i;
    if (!format.test(postalcode)) {
      /*special character present*/
      postalcode = '';
    }
    return postalcode;
  }

  nameValidator(postalcode: string) {
    let format = /^[a-z0-9 ']*$/i;
    if (!format.test(postalcode)) {
      /*special character present*/
      postalcode = '';
    }
    return postalcode;
  }

  addressValidator(address: string) {
    let format = /^[a-z0-9 ]*$/i;
    if (!format.test(address)) {
      /*special character present*/
      address = '';
    }
    return address;
  }

  showMultipleAlert() {

    this.alertMsg = 'Multiple Registrations exist with the same truck details, do you want to continue?';
    const alert = this.alertCtrl.create({
      title: 'Alert',
      message: this.alertMsg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.navExecuteAction();
          }
        }
      ]
    });
    alert.setMode(this.utils.checkUIMode());
    alert.present();
  }

  loadAction() {
    if (this.truckRegResultModel.approverButton && this.truckRegResultModel.wrkflwId) {
      return false;
    } else {
      return true;
    }
  }

  buttonAdd() {
    if (this.mode == 'view' || this.isAdminUser() == true) {
      return true;
    } else {
      return false;
    }
  }

  docTypeEdit(attachment) {
    let editdoctype = this.truckttachdocedit();
    if (editdoctype == false && (attachment.closeStatus == true)) {
      return false;
    } else
      return true;
  }

  navExecuteAction() {
    this._fromExecuteAction = this.navCtrl.push(ExecuteactionPage, {
      workFlowId: this.truckRegResultModel.wrkflwId,
      requestNo: this.truckRegRequestId, fromPage: "Truck"
    });
  }

  show(index) {
    if (this.attachments[index].showdetails) {
      this.attachments[index].showdetails = false;
    }
    else {
      this.attachments[index].showdetails = true;
    }
  }

  geticon(index) {
    if (this.attachments[index].showdetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }
  }

  openDocs(index) {
    this.truckservicesProvider.openDocuments()
      .then(data => {
        if (data) {
          this.attachments[index].fileName = data.fileName;
          this.attachments[index].fileUploadId = data.fileUploadId;
        } else {
          this.attachments[index].fileName = "";
        }
      }, error => {
        this.attachments[index].fileName = "";
      });
  }

  addAttachment() {
    this.tempAttachArray++;
    this.attachments.push(new TruckRegAttachResultModel());
    let length = this.attachments.length;
    this.attachments[length - 1].closeStatus = true;
    this.takeFourAttachments.push(this.addAttachForm(null, '', '', '', ''));
  }

  closeAttachment(index) {

    if (this.attachments[index].closeStatus) {
      this.takeFourAttachments.removeAt(index);
      this.attachments.splice(index, 1);
      this.tempAttachArray--;
    }
  }

  hideDeleteOption(index) {
    if (this.isAdminUser() == true) {
      return true;
    } else if ((this.mode == "new" ) || (this.mode == "edit" && this.isSameUser() == true   ) || this.rereg == "rereg") {
      if (this.attachments[index].closeStatus) {
        return false;
      } else {
        return true;
      }
    } else if (this.mode == "view") {
      return true;
    }

  }

  attachmentDocTypeShow(index) {
    if (!this.attachments[index].closeStatus) {
      return true;
    }
    else if ((this.mode == "view") || (this.isAdminUser() == true)) {
      return true;
    }
    else {
      return false;
    }
  }

  attachmentItemsShow(attachment) {
    if (this.mode == "view") {
      return true;
    }
    else {
      return false;
    }
  }

  truckdetailsubmitvalidateHide() {
    if (this.mode == "view") {
      return true;
    }
    else {
      return false;
    }
  }

  truckdetailsubmitvalidate() {
    let takeFour: boolean;
    if(!this.isAdminUser()){
      this.formValidate = true;
      this.formValidateAdmin = false;
      if (this.attachments != null && this.attachments.length > 0) {
        takeFour = this.takeFour.valid;
      }
      else {
        takeFour = true;
      }
      if (this.mode == "new" || this.mode == "edit") {
        if (this.groupOne.valid && this.groupTwo.valid && this.groupThree.valid &&
          this.groupFour.valid && this.groupFive.valid && this.takeTwo.valid && takeFour
          && this.validDateFlag && this.validInsDateFlag) {
          return false;
        }
        else {
          return true;
        }
      }
      /* else if (this.mode == "edit") {
            return false;
          }*/
    }
    else {
      this.formValidate = false;
      this.formValidateAdmin = true;
      return false;
    }

  }


  //---Get document types and attachments based on truck types
  loadDocuments(trucktype) {

    let temp_attachment : TruckRegAttachResultModel [];
    this.mandatoryattach = [];
    this.currentMandatoryDocument = this.mandatoryDocumentMaster.filter(x => x.keyCode == trucktype);

    if(trucktype == "null" || trucktype == "")
      this.clearAttachmentArray();
    else if((typeof(this.truckRegResultModel.truckRegAttachSOList) != 'undefined') && (this.truckRegResultModel.truckRegAttachSOList.length > 0) && this.rereg != "rereg") {
      for (let i = 0 ; i < this.currentMandatoryDocument.length; i++) {
        temp_attachment = (this.truckRegResultModel.truckRegAttachSOList.filter(x => x.docType == this.currentMandatoryDocument[i].docType));
        if (temp_attachment.length > 0) {
          //this.attachments.push(new TruckRegAttachResultModel());
          this.takeFourAttachments.push(this.addAttachForm(this.currentMandatoryDocument[i].docType, '', '', '', ''));
          this.attachments[i] = Object.assign({}, temp_attachment[0]);
          this.attachments[i].showdetails = false;
          this.attachments[i].closeStatus = false;
        } else {
          this.attachments.push(new TruckRegAttachResultModel());
          this.takeFourAttachments.push(this.addAttachForm(this.currentMandatoryDocument[i].docType, '', '', '', ''));
          this.attachments[i].docType = this.currentMandatoryDocument[i].docType;
          this.attachments[i].showdetails = false;
          this.attachments[i].closeStatus = false;

        }
      }
      let attachlength = this.takeFourAttachments.length;
      for ( let j = 0; j < this.truckRegResultModel.truckRegAttachSOList.length; j++){
        if((this.currentMandatoryDocument.filter(x => x.docType == this.truckRegResultModel.truckRegAttachSOList[j].docType).length) == 0)
        {
          this.takeFourAttachments.push(this.addAttachForm(this.truckRegResultModel.truckRegAttachSOList[j].docType, '', '', '', ''));
          this.attachments.push(new TruckRegAttachResultModel());
          this.attachments[attachlength] = Object.assign({}, this.truckRegResultModel.truckRegAttachSOList[j]);
          this.attachments[attachlength].showdetails = false;
          this.attachments[attachlength].closeStatus = true;
          attachlength ++;
        }
      }
    }else
    {
      for (let i = 0; i < this.currentMandatoryDocument.length; i++) {
        this.attachments.push(new TruckRegAttachResultModel());
        this.takeFourAttachments.push(this.addAttachForm(this.currentMandatoryDocument[i].docType, '', '', '', ''));
        this.attachments[i].docType = this.currentMandatoryDocument[i].docType;
        this.attachments[i].showdetails = false;
        this.attachments[i].closeStatus = false;
      }
    }
  } //End of Load Documents

  //---Open the attachments in view mode
  openattach(index) {
    this.truckservicesProvider.openAttachment(this.attachments[index]);
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

  //Validate Date before submission
  validateDate()
  {
    let start_date : any;
    let end_date : any;
    let currentDate: any = new Date().toISOString();
    if(this.truckRegResultModel.registrationStartDate != null && this.truckRegResultModel.registrationExpiryDate != null ) {

      start_date = this.datepipe.transform(this.truckRegResultModel.registrationStartDate, 'yyyy-MM-dd');
      end_date = this.datepipe.transform(this.truckRegResultModel.registrationExpiryDate, 'yyyy-MM-dd');
      currentDate = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
      /*if (start_date == end_date) {
        this.validDateFlag = false;
        this.err_date_msg = "Start date and end date should not be equal";
        return true;
      }
      else*/ if (end_date < currentDate) {
        this.validDateFlag = false;
        this.err_date_msg = " Expiry date is less than current date";
        return true
      }
      else
        this.validDateFlag = true;
    }else {
      this.validDateFlag = true;
      return false;
    }
  }


  validateInsDate()
  {
    let end_date : any;
    let currentDate: any = new Date().toISOString();
    if(this.truckRegResultModel.insuranceExpiryDate != null ) {
      end_date = this.datepipe.transform(this.truckRegResultModel.insuranceExpiryDate, 'yyyy-MM-dd');
      currentDate = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
      if (end_date < currentDate) {
        this.validInsDateFlag = false;
        this.err_date_ins_msg = " Insurance Expiry date is less than current date";
        return true
      }
      else
        this.validInsDateFlag = true;
    }else {
      this.validInsDateFlag = true;
      return false;
    }
  }

  validateexpDate()
  {
    let end_date : any;
    let currentDate: any = new Date().toISOString();
    if(this.truckRegResultModel.expiryDate != null ) {
      end_date = this.datepipe.transform(this.truckRegResultModel.expiryDate, 'yyyy-MM-dd');
      currentDate = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
      if (end_date < currentDate) {
        this.validExpDateFlag = false;
        this.err_date_exp_msg = " Expiry date is less than current date";
      }
      else
        this.validExpDateFlag = true;
    }else {
      this.validExpDateFlag = true;
    }
  }

  datetostring(datestring) {
    if (datestring != null && datestring.length > 5) {
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
      if (day == "NaN") {
        return null;
      }
      else {
        return day + "/" + monthstr + "/" + date.getFullYear();
      }

    }
    else {
      return null;
    }
  }

  countryFocus(){

  }
  getCountryNames(ev: any) {
// set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    this.tempCountryList = [];
    this.rawCountryList = [];
    for (let itemElement of this.temparray) {
      this.tempCountryList.push(itemElement.countryName);
    }
    this.rawCountryList = Array.from(new Set(this.tempCountryList));
    if (val && val.trim() != '') {
      this.countryarray = this.rawCountryList.filter((item) => {

        if (item.toLowerCase().includes(val.toLowerCase())) {
          this.showCountryField = true;

        }
        return (item.toLowerCase().includes(val.toLowerCase()));
      })
      if(this.countryarray.length > 0) {
        if (this.countryarray[0].toLowerCase() == val) {
          this.sh_msg = false;
        } else {
          this.sh_msg = true;
        }
      }else
        this.sh_msg = true;
    } else {
      // hide the results when the query is empty
      this.showCountryField = false;
    }
  }

  getStateNames(ev: any) {
// set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items

    if (val && val.trim() != '') {
      this.statearray = this.temparray.filter((item) => {

        if (this.truckRegResultModel.ownerCountry && this.truckRegResultModel.ownerCountry == item.countryName) {

          if (item.stateName.toLowerCase().includes(val.toLowerCase())) {
            this.showStateField = true;
          }
          return (item.stateName.toLowerCase().includes(val.toLowerCase()));
        }
      })
    } else {
      // hide the results when the query is empty
      this.showStateField = false;
    }
  }

  selectCountry(item: any) {
    this.validateCountry = false;
    this.truckRegResultModel.ownerCountry = item;
    this.showCountryField = false;
    this.truckRegResultModel.ownerState = null;
    this.stateDisabledStatus = false;

  }

  selectState(item: any) {
    this.truckRegResultModel.ownerState = item.stateName;
    this.showStateField = false;
  }

  hideCountry() {
    if (this.showCountryField) {
      this.showCountryField = false;
    }
  }

  hideState() {
    if (this.showStateField) {
      this.showStateField = false;
    }
  }

  isStateActive() {
    return this.stateDisabledStatus;
  }

  loadlists() {
    var headers = new Headers();

    let body = {"countryName": "", "stateName": ""};

    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    this.http.post(TRUCK_COUNTRY_MASTER, JSON.stringify(body), options).map(res => res.json().list).subscribe((data) => {
      this.temporary = data;
      this.initilize();
    })
  }

  initilize() {
    this.temparray = this.temporary;
  }


// To clear selectionin Type list
  onChangeType() {

    if (this.truckRegResultModel.type == "") {
      this.typeselection = "--Select a Type--"
    }
    else {
      this.typeselection = "--Clear Selection--"
    }

  }

  keyboardClose() {
    this.keyboard.close();
  }

  rfidValue (event:any,tIndex:any) {

    setTimeout(() => {
      this.rfid_toadd[tIndex] = event.value;

      //this.keyboardClose();
    },400);
  }

}


