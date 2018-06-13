import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  Content,
  IonicPage,
  LoadingController,
  ModalController,
  Navbar,
  NavController,
  NavParams,
  Platform,
  Slides
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {DeliveryorderservicesProvider} from "../../providers/webservices/deliveryorderservices";
import {DeliveryorderreqModel} from "../../shared/model/deliveryorder/deliveryorderreq.model";
import {RotationNumberMasterModel} from "../../shared/model/deliveryorder/rotationnumber/rotationnumberreq.model";
import {RotationnumberrespModel} from "../../shared/model/deliveryorder/rotationnumber/rotationnumberresp.model";
import {RotationnumberresplistModel} from "../../shared/model/deliveryorder/rotationnumber/rotationnumberresplist.model";
import {HbolMrnreqModel} from "../../shared/model/deliveryorder/hbol-mrn/hbol-mrnreq.model";
import {HbolnumberresplistModel} from "../../shared/model/deliveryorder/hbol-mrn/hbol-mrnresplist.model";
import {HbolnumberrespModel} from "../../shared/model/deliveryorder/hbol-mrn/hbol-mrnresp.model";
import {ErrorModel} from "../../shared/model/errorhandle/error.model";
import {RetrievereqModel} from "../../shared/model/deliveryorder/retrievereq.model";
import {ChacoderesplistModel} from "../../shared/model/deliveryorder/chacode/chacoderesplist.model";
import {ChacodeModel} from "../../shared/model/deliveryorder/chacode/chacode.model";
import {DosearchsummaryPage} from "../dosearchsummary/dosearchsummary";
import {DeliveryorderattachModel} from "../../shared/model/deliveryorder/deliveryorderattach.model";
import {InformationmodalComponent} from "../../components/informationmodal/informationmodal";
import {ContainersearchreqModel} from "../../shared/model/deliveryorder/containerdetails/containersearchreq.model";
import {ContainerdetailsresListModel} from "../../shared/model/deliveryorder/containerdetails/containerdetailsres-list.model";
import {ContainerdetailsreqModel} from "../../shared/model/deliveryorder/containerdetailsreq.model";
import {Keyboard} from '@ionic-native/keyboard';
import {Utils} from "../../shared/utils";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";

/**
 * Generated class for the DocreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-docreate',
  templateUrl: 'docreate.html',
  providers: [DeliveryorderreqModel, RetrievereqModel, Utils]

})
export class DocreatePage {
  @ViewChild(Slides) slides: Slides;
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;

  public portMasterDOModel: DeliveryorderreqModel = new DeliveryorderreqModel();
  private deliveryOrderType: boolean = true;
  private billOfLadingDetails: boolean = false;
  private importerDetails: boolean = false;
  private deliveryOrderDetails: boolean = false;
  private containerTable: boolean = false;
  private cargoDetails: boolean = false;
  private showAttachment: boolean = false;
  public isConfirmOpen: boolean = false;
  public terminalDOModel: DeliveryorderreqModel = new DeliveryorderreqModel();
  public boxOperatortDOModel: DeliveryorderreqModel = new DeliveryorderreqModel();
  public rotationNoRespArray: RotationnumberrespModel[];
  public rotationNoRespList: RotationnumberresplistModel;
  public mrnNoRespList: HbolnumberresplistModel;
  public mrnNoRespArray: HbolnumberrespModel[];
  public hbiolNoRespList: HbolnumberresplistModel;
  public hbiolNoRespArray: HbolnumberrespModel[];
  public biolNoRespList: HbolnumberresplistModel;
  public biolNoRespArray: HbolnumberrespModel[];
  private containerDetails: ContainerdetailsreqModel[] = [];

  public importRetrieveModel: DeliveryorderreqModel = new DeliveryorderreqModel();
  public containerRetrieveModel: DeliveryorderreqModel = new DeliveryorderreqModel();


  public rotationNoReq: RotationNumberMasterModel;
  public mrnnumber: HbolMrnreqModel;
  public WarningMsg_Refeer: string = "";

  public errorModel: ErrorModel[];

  public selectedTab: any;
  public tabs: Array<any>;
  public showLeftButton: boolean;
  public showRightButton: boolean;

  public definedSetListModel: DefinedsetresListModel[];

  deliveryOrderTypeForm: FormGroup;
  billOfLadingDetailsForm: FormGroup;
  doboxOperatorForm: FormGroup;
  doRoatationnoForm: FormGroup;
  deliveryOrderDetailsForm1: FormGroup;
  selectedDoRotationNoForm: FormGroup;
  selectedDoBoxOperatorForm: FormGroup;
  doForExamForm: FormGroup;
  deliveryOrderDetailsForm2: FormGroup;
  deliveryOrderDetailsForm3: FormGroup;


  selectedDoLocation: string;
  selectedDoSpName: string;
  selectedBoxOperator: string;
  selectedDoBoxOperator: string;
  selectedDoType: string;
  selectedTradeType: string;
  selectedHaulierCode: string;
  haulierName: string;
  searchedContainer: string;
  allSelected: boolean = false;
  showBillOfLading: boolean = false;
  doisEmpty: boolean = false;

  prevSelectedDoType: string = '';
  prevSelectedTradeType: string = '';

  prevSelectedDoBoxOperator: string = '';
  prevSelectedDoRotationNo: string = '';

  //doTypeList: string[] = ['LCL', 'FCL', 'Empty'];
  //doTradeTypeList: string[] = ['Foreign', 'Coastal'];
  //doExamination: string[] = ['Yes', 'No'];
  //departureModeOptions: string[] = ['Departure by Gate', 'Departure by Rail', 'Departure by Vessel'];
  //deliveryToOptions: string[] = ['Freight Forwarder', 'Consignee', 'CFS', 'Empty Yard'];

  doTypeList: DefinedSetResModel[] = [];
  doTradeTypeList: DefinedSetResModel[] = [];
  doExamination: DefinedSetResModel[] = [];
  departureModeOptions: DefinedSetResModel[] = [];
  //deliveryToOptions: DefinedSetResModel[] = [];
  deliveryToList: DefinedSetResModel[] = [];

  containerTableDetails: any = [];
  tempcontainerTableDetails: any = [];
  attachments: DeliveryorderattachModel[];
  state: any;
  currDate: any;

  showHaulierSug: boolean;
  showFrieghtSug: boolean;
  showCHASug: boolean;
  showCFSSug: boolean;
  showEmptySSug: boolean;
  showConsigneeSug: boolean;
  mandatory: boolean = false;
  retrieveMandatory: boolean = false;
  frieght: boolean = false;
  empty: boolean = false;
  consignee: boolean = false;
  cha: boolean = false;
  cfs: boolean = false;
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
  commodityDetails: any;

  alert: any = null;

  dateFormat: string = "DD/MM/YYYY";
  verifyValidRotationNo: boolean = false;
  verifyValidIGMMRNNo: boolean = false;
  verifyBillNo: boolean = false;
  verifyHouseBillNo: boolean = false;

  showRotationNo: boolean = false;
  showContainer: boolean = false;
  hideRotationNoInfo: boolean = true;
  showIgmMrnNo: boolean = false;
  showBillOfLadingNo: boolean = false;
  showHouseBillOfLadingNo: boolean = false;
  selectContainer: boolean = false;
  isDoTypeFcl: boolean;
  shouldShow: boolean;
  isDoTypeSelected: boolean;
  isDeliveryToMandatory: boolean;
  showCommoditytable: boolean = false;
  containerDataTable: boolean = false;
  readOnlyFlag: boolean = false;
  readOnlyFlagEmpty: boolean = false;
  disableDone: boolean = true;
  disableClear: boolean = true;
  showResetMsgDoType: boolean = false;
  showResetMsgTradeType: boolean = false;

  selectedRotationNo: string;
  selectedDoRotationNo: string;
  selectedigmMrnNo: string;
  selectedBillNo: string;
  selectedHouseBillNo: string;
  selectediMONo: string;
  selectedVesselName: string;
  selectedVoyageNo: string;
  companyName: string;
  companyCode: string;
  chaCompanyCode: string;
  chaCompanyName: string;
  instructionsToOtherParty: string;
  containerPermitNo: string;
  containerPermitDate: any;
  agentReferenceNo: string;
  doForExam: string;
  departureMode: string;
  deliveryTo: string;
  selectedVesselNameMrn: string;
  selectedVoyageNoMrn: string;
  selectedImoNoMrn: string;
  dovalidityDate: any;
  importerName: string;
  importerAddress: string;
  portOfLoading: string;
  portOfDestination: string;
  noOfContainers: string;

  loading: any;

  filterRotationArray: any;
  filterContainerArray: ContainerdetailsreqModel[];
  filterMrnArray: any;
  filterbiolNoArray: any;
  filterHbiolNoArray: any;
  trashIconStatus: boolean;
  public verifyReq: RetrievereqModel;
  public submitCreate: DeliveryorderreqModel;
  public submitSucess: DeliveryorderreqModel;
  igmMrnTemp: string = "";
  containerValue: string = "Container";

  public unregisterBackButtonAction: any;

  constructor(public keyboard: Keyboard, public deliveryorderreqmodel: DeliveryorderreqModel, public formBuilder: FormBuilder, public navCtrl: NavController,
              public navParams: NavParams, public modalCtrl: ModalController, public doServiceProvider: DeliveryorderservicesProvider,
              public retrieveReq: RetrievereqModel, private alertCtrl: AlertController, private commonServices: CommonservicesProvider,
              public datepipe: DatePipe, public utils: Utils, public loadingCtrl: LoadingController, public platform: Platform) {


    this.initialization();
    this.isConfirmOpen = false;
    // Check which arrows should be shown
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;
    this.getDefinedSet();
    this.getPortMaster();
    this.initializeFeildValidation();
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.WarningMsg_Refeer = "";
  }

  initialization() {
    this.attachments = [];
    this.deliveryOrderType = true;
    this.billOfLadingDetails = false;
    this.importerDetails = false;
    this.deliveryOrderDetails = false;
    this.containerTable = false;
    this.cargoDetails = false;
    this.showAttachment = false;
    this.isDoTypeFcl = false;
    this.shouldShow = false;
    this.isDoTypeSelected = false;
    this.isDeliveryToMandatory = false;
    this.currDate = new Date().toISOString();

    this.tabs = ['Delivery Order Type', 'Attachments'];

    // Select it by defaut
    this.selectedTab = this.tabs[0];
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.onBackAlert();
    }
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

  presentAlert(title: string, message: string) {
    if (this.alert == null) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  onBackAlert() {
    if (this.utils.popupHandler() == true) {
      if (!this.deliveryOrderTypeForm.dirty && (this.attachments.length == 0)) {
        this.navCtrl.pop();
      } else {
          this.alert = this.alertCtrl.create({
            title: 'Alert',
            subTitle: 'The entered details will be lost. Do you want to continue?',
            buttons: [{
              text: 'Ok',
              handler: () => {
                this.navCtrl.pop();
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

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['IDO_TYPE', 'DO_TRADE_TYPE', 'DEPARTURE_MODE', 'DELIVERY_TO', 'BOOLEAN'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {
            if (this.definedSetListModel[i].definedSetName == 'IDO_TYPE') {
              this.doTypeList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.doTypeList.length > 0 && this.doTypeList[0].definedSetValueCode == '') {
                this.doTypeList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'DO_TRADE_TYPE') {
              this.doTradeTypeList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.doTradeTypeList.length > 0 && this.doTradeTypeList[0].definedSetValueCode == '') {
                this.doTradeTypeList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'DEPARTURE_MODE') {
              this.departureModeOptions = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              // if (this.departureModeOptions.length > 0 && this.departureModeOptions[0].definedSetValueCode == '') {
              //   this.departureModeOptions.splice(0, 1);
              // }
            }

            if (this.definedSetListModel[i].definedSetName == 'DELIVERY_TO') {
              this.deliveryToList = this.definedSetListModel[i].definedSetValues;
              this.deliveryorderreqmodel.deliveryTo = this.deliveryToList[0].definedSetValueCode;
              // /* Remove --select-- if not needed */
              // if (this.deliveryToList.length > 0 && this.deliveryToList[0].definedSetValueCode == '') {
              //   this.deliveryToList.splice(0, 1);
              // }
            }

            if (this.definedSetListModel[i].definedSetName == 'BOOLEAN') {
              this.doExamination = this.definedSetListModel[i].definedSetValues;
            }
          }
        },
        error => {
          //Show error message
        });
  }


  deliveryOrderSubmit() {
    let validationChecker: boolean = false;
    this.setValidation();
    if (this.selectedDoType == "LCL" || (this.selectedDoType == "FCL" && this.selectedTradeType == "Foreign")) {
      if (this.deliveryOrderTypeForm.valid && this.billOfLadingDetailsForm.valid && this.doboxOperatorForm.valid &&
        this.doRoatationnoForm.valid && this.deliveryOrderDetailsForm1.valid && this.deliveryOrderDetailsForm2.valid &&
        this.deliveryOrderDetailsForm3.valid) {
        validationChecker = true;
      }
    } else {
      if (this.deliveryOrderTypeForm.valid && this.deliveryOrderDetailsForm1.valid && this.deliveryOrderDetailsForm2.valid &&
        this.deliveryOrderDetailsForm3.valid && this.selectedDoRotationNoForm.valid && this.selectedDoBoxOperatorForm.valid) {
        validationChecker = true;
      }
    }
    if (true == validationChecker) {
      if (!this.containerTableDetails || this.containerTableDetails.length == 0) {
        this.filterData('Container Table');
        //this.slides.slideTo(this.tabs.indexOf('Container Table'), 500);
        this.presentAlert('Attention', 'Container Table is empty');
      } else {
        this.showConfirmation();
      }

    } else {
      this.mandatory = true;
      this.retrieveMandatory = true;
      if (this.deliveryOrderTypeForm.invalid) {
        this.filterData('Delivery Order Type');
        //this.slides.slideTo(this.tabs.indexOf('Delivery Order Type'), 500);
      } else if (this.billOfLadingDetailsForm.invalid || this.doboxOperatorForm.invalid || this.doRoatationnoForm.invalid) {
        this.filterData('Retrieve Bill Of Lading Details');
        //this.slides.slideTo(this.tabs.indexOf('Retrieve Bill Of Lading Details'), 500);
      } else if (this.deliveryOrderDetailsForm1.invalid || this.deliveryOrderDetailsForm2.invalid || this.deliveryOrderDetailsForm3.invalid
        || this.selectedDoBoxOperatorForm.invalid || this.selectedDoRotationNoForm.invalid) {
        this.filterData('Delivery Order Details');
        //this.slides.slideTo(this.tabs.indexOf('Delivery Order Details'), 500);
      }
      this.presentAlert('ALERT', 'Enter all mandatory fields');
    }

  }

  /*  deliveryOrderReset() {
      this.resetValues();
      this.initialization();
      this.selectedDoLocation = "";
      this.selectedDoSpName = "";
      this.selectedDoType = "";
      this.selectedTradeType = "";
    }*/

  editReefer(containerStatus: ContainerdetailsreqModel): boolean {
    if ((containerStatus.iSOCode == "22R1" || containerStatus.iSOCode == "22R9" || containerStatus.iSOCode == "25R1" ||
        containerStatus.iSOCode == "42R1" || containerStatus.iSOCode == "42R9" || containerStatus.iSOCode == "45R1" ||
        containerStatus.iSOCode == "45R8" || containerStatus.iSOCode == "45R9")) {

      if (containerStatus.containerStatus == null) {
        return true;
      } else if (containerStatus.containerStatus.toLowerCase() != "completed") {
        return true;
      } else {
        return false;
      }

    } else {
      return false;
    }
  }

  showConfirmation() {
    if (this.attachments.find(element => !element.fileUploadId)) {
      this.presentAlert("Attention", 'Attachments are missing.');
    } else {
      let alertMsg = 'Do you want to submit your request?';
      const alert = this.alertCtrl.create({
        title: 'CONFIRM BOX',
        message: alertMsg,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.proceedOrderSubmit();
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
    }
  }

  proceedOrderSubmit() {
    this.initializeSubmitOrder();
    this.doServiceProvider.saveDeliveryOrder(this.submitCreate)
      .subscribe(response => {
          this.submitSucess = <DeliveryorderreqModel>response;
          if (this.submitSucess.deliveryOrderNo && this.submitSucess.deliveryOrderNo > 0) {
            if (this.submitSucess.doType && this.submitSucess.doType == "LCL") {
              this.igmMrnTemp = this.submitSucess.lclIGMMRNNo;
            } else if (this.submitSucess.doType && this.submitSucess.doType == "FCL") {
              this.igmMrnTemp = this.submitSucess.fclIGMMRNNo;
            } else {
              this.igmMrnTemp = "";
            }
            this.navCtrl.push(DosearchsummaryPage, {
              DOrequestno: this.submitSucess.deliveryOrderNo,
              DOagentno: this.submitSucess.agentDoNumber,
              DOrotateno: this.submitSucess.rotationNo,
              DObolno: this.submitSucess.billofLadingNo,
              DOvaliditydate: this.submitSucess.dOValidityDate,
              DOstatus: this.submitSucess.deliveryOrderStatus,
              DOcreateddate: this.submitSucess.createdDate,
              DOtype: this.submitSucess.doType,
              DOstatus_icon: "assets/img/active.svg",
              DOmrnno: this.igmMrnTemp,
              DOTradeType: this.submitSucess.tradeType,
              isFromCreate: true,
            });
          }
        },
        error => {
          let errormessage = error[0].message
          for (let j = 1; j < error.length; j++) {
            errormessage = errormessage + '\n' + error[j].message;
          }
          this.presentAlert('ALERT', errormessage);
        });

  }

  getPortMaster() {
    let masterModel = new DeliveryorderreqModel();
    this.doServiceProvider.getPortMaster(masterModel, true)
      .subscribe(response => {
          this.portMasterDOModel = <DeliveryorderreqModel>response;
        },
        error => {

          //Show error message
        });
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

  openattach(attachment) {
    this.doServiceProvider.openAttachment(attachment);
  }

  closeAttachment(attachment: DeliveryorderattachModel) {
    for (var i = 0; i < this.attachments.length; i++) {
      if (this.attachments[i] == attachment) {
        this.attachments.splice(i, 1);
        return;
      }
    }
  }

  addAttachment() {
    if (this.attachments.length < 5) {
      this.attachments.push(new DeliveryorderattachModel());
    } else {
      this.presentAlert('ALERT', 'You are not allowed to Upload more than 5 Attachments');
    }
  }

  getTerminalMaster() {
    let masterModel = new DeliveryorderreqModel();
    masterModel.port = this.selectedDoLocation;
    this.doServiceProvider.getTerminalMaster(masterModel)
      .subscribe(response => {
          this.terminalDOModel = <DeliveryorderreqModel>response;
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  getBoxOperatorMaster() {
    let masterModel = new DeliveryorderreqModel();
    masterModel.port = this.selectedDoLocation;
    masterModel.terminal = this.selectedDoSpName;
    this.doServiceProvider.getBoxOperatorMaster(masterModel)
      .subscribe(response => {
          this.boxOperatortDOModel = <DeliveryorderreqModel>response;
        },
        error => {
          //Show error message
        });
  }

  getRotationNumberMaster(isFromDoRotationNo: boolean) {
    this.resetRotation();
    this.rotationNoRespArray = [];
    this.rotationNoReq = new RotationNumberMasterModel();
    this.rotationNoReq.port = this.selectedDoLocation;
    this.rotationNoReq.terminal = this.selectedDoSpName;
    this.doServiceProvider.getRotationMaster(this.rotationNoReq)
      .subscribe(responseList => {
          this.rotationNoRespList = <RotationnumberresplistModel>responseList;
          this.rotationNoRespArray = this.rotationNoRespList.list;
          if (this.verifyValidRotationNo) {
            this.getRotationNo(null, isFromDoRotationNo);
          }
        },
        error => {

        })
  }

  getMrnNumberMaster() {
    this.resetIgmMrnNo();
    this.mrnNoRespArray = [];
    this.mrnnumber = new HbolMrnreqModel();
    this.doServiceProvider.getMrnNumberMaster(this.mrnnumber)
      .subscribe(responseList => {
          this.mrnNoRespList = <HbolnumberresplistModel>responseList;
          this.mrnNoRespArray = this.mrnNoRespList.list;
        },
        error => {

        })
  }

  getbiolNumberMaster() {
    this.verifyBillNo = true;
    this.biolNoRespArray = [];
    let biolNumber = new HbolMrnreqModel();
    biolNumber.billofLadingNo = "";
    biolNumber.fclIGMMRNNo = this.selectedigmMrnNo;
    biolNumber.rotationNo = this.selectedRotationNo;
    this.doServiceProvider.getBiolNumberMaster(biolNumber)
      .subscribe(responseList => {
          this.biolNoRespList = <HbolnumberresplistModel>responseList;
          this.biolNoRespArray = this.biolNoRespList.list;
        },
        error => {

        });
  }

  gethbiolNumberMaster() {
    this.verifyHouseBillNo = true;
    this.selectedBillNo = '';
    this.hbiolNoRespArray = [];
    let hbiolNumber = new HbolMrnreqModel();
    hbiolNumber.billofLadingNo = "";
    hbiolNumber.houseBillofLadingNo = "";
    hbiolNumber.lclIGMMRNNo = this.selectedigmMrnNo;
    hbiolNumber.rotationNo = this.selectedRotationNo;
    this.doServiceProvider.getHbiolNumberMaster(hbiolNumber)
      .subscribe(responseList => {
          this.hbiolNoRespList = <HbolnumberresplistModel>responseList;
          this.hbiolNoRespArray = this.hbiolNoRespList.list;
        },
        error => {

        });
  }

  onLocationChanged() {
    //this.readOnlyFlag = false;
    this.selectedDoSpName = '';
    this.selectedBoxOperator = '';
    this.getTerminalMaster();
  }

  onSpNameChanged() {
    //this.readOnlyFlag = false;
    this.getBoxOperatorMaster();
  }

  onRetrieve() {

    this.setValidation();
    if (this.billOfLadingDetailsForm.valid && this.doboxOperatorForm.valid && this.doRoatationnoForm.valid) {
      this.loading.present();
      this.intializeRetrieve();
      this.doServiceProvider.onRetrieveValidate(this.retrieveReq)
        .subscribe(response => {
            if (response == true) {
              this.importRetrieve();
              this.showCommoditytable = true;
              this.containerDataTable = true;
              this.readOnlyFlag = true;
            } else {
              this.loading.dismissAll();
              this.presentAlert("ATTENTION", 'Retrieve Error');
            }
          },
          error => {
            this.loading.dismissAll();
            this.presentAlert("ATTENTION", error[0].message);
          });
    } else {
      this.retrieveMandatory = true;
      this.presentAlert('ALERT', 'Enter all mandatory fields');
    }
  }

  importRetrieve() {
    this.getCargoDetails();
    this.intializeRetrieve();
    this.doServiceProvider.importRetrieve(this.retrieveReq)
      .subscribe(response => {
          this.containerRetrieve();
          this.importRetrieveModel = <DeliveryorderreqModel>response;
          this.importerDetailsData(this.importRetrieveModel);
        },
        error => {
          this.loading.dismissAll();
        });
  }

  containerRetrieve() {
    this.intializeRetrieve();
    this.doServiceProvider.containerRetrieve(this.retrieveReq)
      .subscribe(response => {
          this.loading.dismissAll();
          this.containerRetrieveModel = <DeliveryorderreqModel>response;
          this.containerTableDetails = this.containerRetrieveModel.delOrdContDetlSO;
          if (!this.containerTableDetails || this.containerTableDetails.length == 0) {
            this.presentAlert("Attention", 'No Containers found for the given combination of input: Box Operator, Rotation No, MRN/IGM No, BoL No/House BoL No');
          } else if (this.containerTableDetails || this.containerTableDetails.length > 0) {
            this.noOfContainers = this.containerTableDetails.length;
          }
        },
        error => {
          this.loading.dismissAll();
        });
  }

  public removeAttachContainerDetais(container: any): void {
    for (let i = 0; i < this.filterContainerArray.length; i++) {
      if (this.filterContainerArray[i].containerNo == container.containerNo) {
        this.filterContainerArray[i].selected = false;
        break;
      }
    }
    for (let i = 0; i < this.containerTableDetails.length; i++) {
      if (this.containerTableDetails[i] == container) {
        this.containerTableDetails.splice(i, 1);
        break;
      }
    }
    if (this.containerTableDetails.length == 0) {
      this.disableDone = true;
      this.disableClear = true;
    }
    this.tempcontainerTableDetails = [];
    this.containerTableDetails.forEach((item) => {
      this.tempcontainerTableDetails.push(item);
    })
    this.allSelected = false;
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
    this.commodityDetails = dummyDetails;
  }

  importerDetailsData(data: DeliveryorderreqModel) {
    this.importerName = data.importerName;
    this.importerAddress = data.importerAddress;
    this.portOfLoading = data.portOfLoading;
    this.portOfDestination = data.portOfDestination;
    //this.noOfContainers = data.noOfContainers;
    this.containerPermitNo = data.containerPermitNo;
  }

  getRotationNo(ev: any, isFromDoRotationNo: boolean) {
    this.filterRotationArray = this.rotationNoRespArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      if (isFromDoRotationNo) {
        val = this.selectedDoRotationNo;
      } else {
        val = this.selectedRotationNo;
      }
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterRotationArray = this.filterRotationArray.filter((item) => {
        if (item.rotationNo.includes(val)) {
          this.showRotationNo = true;
        }
        return (item.rotationNo.includes(val));
      });
    } else {
      // hide the results when the query is empty
      this.showRotationNo = false;
    }
  }

  showContainerTable(): boolean {
    if (this.selectedDoBoxOperator != '' && this.selectedDoRotationNo != '') {
      return true;
    } else {
      return false;
    }
  }

  getContainerList(ev: any) {
    this.tempcontainerTableDetails = [];
    this.filterContainerArray = [];
    this.filterContainerArray = JSON.parse(JSON.stringify(this.containerDetails));
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.searchedContainer;
    } else {
      val = ev.target.value;
    }
    this.disableDone = true;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.trashIconStatus = false;
      this.filterContainerArray = this.filterContainerArray.filter((item) => {
        if (item.containerNo.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showContainer = true;
        }
        if (this.containerTableDetails.length == 0) {
          this.allSelected = false;
        }
        this.containerTableDetails.forEach((container) => {
          if (item.containerNo.toString().toLowerCase() == container.containerNo.toString().toLowerCase()) {
            item.selected = true;
            this.tempcontainerTableDetails.push(item);
          }
        });
        return (item.containerNo.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    }
    else {
      // hide the results when the query is empty
      this.showContainer = false;
      this.trashIconStatus = true;
      if (this.containerTableDetails.length != 0) {
        this.disableDone = false;
        this.disableClear = false;
      }
    }
    if (this.filterContainerArray.length == 0) {
      this.disableDone = true;
      this.disableClear = true;
    }
    this.setAllstatus();
  }

  getIgmNos(ev: any) {
    this.filterMrnArray = this.mrnNoRespArray;
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterMrnArray = this.filterMrnArray.filter((item) => {
        if (item.iGMMRNNo.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showIgmMrnNo = true;
        }
        return (item.iGMMRNNo.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showIgmMrnNo = false;
    }
  }

  getBillOfLadingNos(ev: any) {
    this.filterbiolNoArray = this.biolNoRespArray;
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterbiolNoArray = this.filterbiolNoArray.filter((item) => {
        if (item.billofLadingNo.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showBillOfLadingNo = true;
        }
        return (item.billofLadingNo.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showBillOfLadingNo = false;
    }
  }

  getHouseBillOfLadingNos(ev: any) {
    this.filterHbiolNoArray = this.hbiolNoRespArray;
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterHbiolNoArray = this.filterHbiolNoArray.filter((item) => {
        if (item.houseBillofLadingNo.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showHouseBillOfLadingNo = true;
        }
        return (item.houseBillofLadingNo.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showHouseBillOfLadingNo = false;
    }
  }

  hideRotation() {
    setTimeout(() => {
      if (this.utils.validate(this.selectedRotationNo, '^[0-9]{0,18}$')) {
        this.selectedRotationNo = "";
        this.presentAlert("ATTENTION", 'Rotation No is Invalid.');
        return;
      }
      if (this.selectedRotationNo != '' && this.verifyValidRotationNo) {
        this.intializeVerifiy();
        this.doServiceProvider.verifyValidRotationNo(this.verifyReq)
          .subscribe(response => {
              if (response == true) {
                this.selectedRotationNo = '';
                this.hideRotationNoInfo = true;
                this.presentAlert("ATTENTION", 'Rotation No is Invalid.');
              } else {
                this.hideRotationNoInfo = false;
              }
            },
            error => {
            });
      }
      this.verifyValidRotationNo = false;
      this.showRotationNo = false;
    }, 500);
  }

  hideContainer() {
    this.showContainer = false;
  }

  hideDoRotation() {
    setTimeout(() => {
      if (this.utils.validate(this.selectedDoRotationNo, '^[0-9]{0,18}$')) {
        this.selectedDoRotationNo = "";
        this.presentAlert("ATTENTION", 'Rotation No is Invalid.');
        return;
      }
      if (this.selectedDoRotationNo != '' && this.verifyValidRotationNo) {
        this.intializeVerifiy();
        this.doServiceProvider.verifyValidRotationNo(this.verifyReq)
          .subscribe(response => {
              if (response == true) {
                this.selectedDoRotationNo = '';
                this.hideRotationNoInfo = true;
                this.presentAlert("ATTENTION", 'Rotation No is Invalid.');
              } else {
                this.hideRotationNoInfo = false;
              }
            },
            error => {
            });
      }
      this.verifyValidRotationNo = false;
      this.showRotationNo = false;
    }, 500);
  }

  hideIgmMrnNo() {
    setTimeout(() => {
      if (this.utils.validate(this.selectedigmMrnNo, '^[0-9]{0,30}$')) {
        this.selectedigmMrnNo = "";
        this.presentAlert("ATTENTION", 'MRN/IGM No is Invalid, please provide another value.');
        return;
      }
      if (this.selectedigmMrnNo != '' && this.verifyValidIGMMRNNo) {
        this.intializeVerifiy();
        this.doServiceProvider.verifyValidIGMMRNNo(this.verifyReq)
          .subscribe(response => {
              if (response == true) {
                this.selectedigmMrnNo = '';
                this.presentAlert("ATTENTION", 'MRN/IGM No is Invalid, please provide another value.');
              }
            },
            error => {
            });
      }
      this.verifyValidIGMMRNNo = false;
      this.showIgmMrnNo = false;
    }, 500);
  }

  hideBillOfLadingNo() {
    setTimeout(() => {
      if (this.utils.validate(this.selectedBillNo, '^[a-z0-9A-Z]{0,30}$')) {
        this.selectedBillNo = "";
        this.presentAlert("ATTENTION", 'Given BoL No is invalid, please provide another value.');
        return;
      }
      if (this.selectedBillNo != '' && this.verifyBillNo) {
        this.intializeVerifiy();
        this.doServiceProvider.verifyBillNo(this.verifyReq)
          .subscribe(response => {
              if (response == 901) {
                this.selectedBillNo = '';
                this.presentAlert("ATTENTION", 'Given BoL No is already used to create DO, please provide another value.');
              } else if (response == 801) {
                this.selectedBillNo = '';
                this.presentAlert("ATTENTION", 'Given BoL No is invalid, please provide another value.');
              } else {
                let biolNumber = new HbolMrnreqModel();
                biolNumber.billofLadingNo = this.selectedBillNo;
                biolNumber.fclIGMMRNNo = this.selectedigmMrnNo;
                biolNumber.rotationNo = this.selectedRotationNo;
                this.doServiceProvider.getBiolNumberMaster(biolNumber)
                  .subscribe(responseList => {
                      let biolNoRespList: HbolnumberresplistModel = <HbolnumberresplistModel>responseList;
                      if (biolNoRespList.list.length == 1) {
                        this.selectedigmMrnNo = biolNoRespList.list[0].iGMMRNNo;
                      }
                    },
                    error => {

                    });
              }
            },
            error => {
              this.selectedBillNo = '';
            });
      }
      this.verifyBillNo = false;
      this.showBillOfLadingNo = false;
    }, 500);
  }

  hideHouseBillOfLadingNo() {
    setTimeout(() => {
      if (this.utils.validate(this.selectedHouseBillNo, '^[a-z0-9A-Z]{0,30}$')) {
        this.selectedHouseBillNo = "";
        this.presentAlert("ATTENTION", 'Given HBoL No is invalid, please provide another value.');
        return;
      }
      if (this.selectedHouseBillNo != '' && this.verifyHouseBillNo) {
        this.intializeVerifiy();
        this.doServiceProvider.verifyHouseBillNo(this.verifyReq)
          .subscribe(response => {
              if (response == 901) {
                this.selectedHouseBillNo = '';
                this.presentAlert("ATTENTION", 'Given HBoL No is already used to create DO, please provide another value.');
              } else if (response == 801) {
                this.selectedHouseBillNo = '';
                this.presentAlert("ATTENTION", 'Given HBoL No is invalid, please provide another value.');
              } else {
                let hbiolNumber = new HbolMrnreqModel();
                hbiolNumber.billofLadingNo = this.selectedBillNo;
                hbiolNumber.houseBillofLadingNo = this.selectedHouseBillNo;
                hbiolNumber.lclIGMMRNNo = this.selectedigmMrnNo;
                hbiolNumber.rotationNo = this.selectedRotationNo;
                this.doServiceProvider.getHbiolNumberMaster(hbiolNumber)
                  .subscribe(responseList => {
                      let hbiolNoRespList: HbolnumberresplistModel = <HbolnumberresplistModel>responseList;
                      if (hbiolNoRespList.list.length == 1) {
                        this.selectedBillNo = hbiolNoRespList.list[0].billofLadingNo;
                        this.selectedigmMrnNo = hbiolNoRespList.list[0].iGMMRNNo;
                      }
                    },
                    error => {

                    });
              }
            },
            error => {
              this.selectedHouseBillNo = '';
            });
      }
      this.verifyHouseBillNo = false;
      this.showHouseBillOfLadingNo = false;
    }, 500);
  }

  selectRotation(item: any) {
    this.verifyValidRotationNo = false;
    this.hideRotationNoInfo = false;
    this.showRotationNo = false;
    if (this.selectedDoType == 'Empty' || this.selectedTradeType == 'Coastal') {
      this.selectedDoRotationNo = item.rotationNo;
    } else {
      this.selectedRotationNo = item.rotationNo;
      this.selectediMONo = item.iMONo;
      this.selectedVesselName = item.vesselName;
      this.selectedVoyageNo = item.voyageNo;
    }
  }

  resetRotation() {
    this.verifyValidRotationNo = true;
    this.hideRotationNoInfo = true;
    this.selectediMONo = '';
    this.selectedVesselName = '';
    this.selectedVoyageNo = '';
  }

  showInfoPopup() {
    let rotNoReq = new RotationNumberMasterModel();
    if (this.selectedTradeType == 'Coastal' || this.selectedDoType == 'Empty') {
      rotNoReq.rotationNoInfoBTN = this.selectedDoRotationNo;
    } else {
      rotNoReq.rotationNoInfoBTN = this.selectedRotationNo;
    }
    this.doServiceProvider.getRotationInfoMaster(rotNoReq)
      .subscribe(response => {
          let rotNoResp = <RotationnumberrespModel>response;
          let infoModalData = [{label: 'Vessel Name', value: rotNoResp.vesselName},
            {label: 'Voyage No', value: rotNoResp.voyageNo},
            {label: 'Shipping Line', value: rotNoResp.line},
            {label: 'Arrival Date – ATB', value: rotNoResp.atb},
            {label: 'Berthing Date - ATA', value: rotNoResp.ata},
            {label: 'Sail Date - ATD', value: rotNoResp.atd},
            {label: 'Vessel Status', value: rotNoResp.operationalStatus}];
          let profileModal = this.modalCtrl.create(InformationmodalComponent, {modalData: infoModalData});
          profileModal.present();
        },
        error => {

        });
  }

  onValidityDateSelection() {
    setTimeout(() => {
      let extendedDate = new Date(this.datepipe.transform(this.dovalidityDate));
      let curDate = new Date();
      curDate.setHours(0, 0, 0, 0);
      extendedDate.setHours(0, 0, 0, 0);
      if (extendedDate < curDate) {
        this.deliveryorderreqmodel.dOValidityExtendedUpto = "";
        this.presentAlert("Attention", 'Validity Date cannot be less than current date.');
        this.dovalidityDate = "";
      }
    }, 500);
  }

  onPermitDateSelection() {
    setTimeout(() => {
      let extendedDate = new Date(this.datepipe.transform(this.containerPermitDate));
      let curDate = new Date();
      curDate.setHours(0, 0, 0, 0);
      extendedDate.setHours(0, 0, 0, 0);
      if (extendedDate > curDate) {
        this.deliveryorderreqmodel.containerPermitDate = "";
        this.presentAlert("Attention", 'Container Permit Date cannot be greater than current date.');
        this.containerPermitDate = "";
      }
    }, 500);
  }

  getContainerDetails() {

    if ((this.prevSelectedDoBoxOperator == '' && this.prevSelectedDoRotationNo == '') ||
      (this.prevSelectedDoBoxOperator != this.selectedDoBoxOperator || this.prevSelectedDoRotationNo != this.selectedDoRotationNo)) {

      this.containerDetails = [];
      let containerDetailsReq = new ContainersearchreqModel;
      containerDetailsReq.doDboxOperator = this.selectedDoBoxOperator;
      containerDetailsReq.doDrotationNumber = this.selectedDoRotationNo;
      containerDetailsReq.doType = this.selectedDoType;

      this.prevSelectedDoBoxOperator = this.selectedDoBoxOperator;
      this.prevSelectedDoRotationNo = this.selectedDoRotationNo;

      this.doServiceProvider.getContainerDetailsMaster(containerDetailsReq)
        .subscribe(response => {
          let containerDetailsList = <ContainerdetailsresListModel> response;
          this.containerDetails = containerDetailsList.list;
          this.containerDetails.forEach((item) => {
            item.selected = false;
          });
          this.getContainerList(null);
        });
    }

  }

  validateContainer(ev: any) {
    if (this.utils.validate(this.searchedContainer, '^[a-z0-9A-Z]{0,30}$')) {
      this.searchedContainer = "";
      this.presentAlert("ATTENTION", 'Container  is invalid.');
      return;
    }
  }

  resetContainerTab() {
    this.containerTableDetails = [];
    this.containerDetails = [];
    this.filterContainerArray = [];
    this.tempcontainerTableDetails = [];
    this.showContainer = false;
    this.searchedContainer = '';
    this.disableDone = true;
    this.disableClear = true;
  }

  clearContainerSearch() {
    this.showContainer = false;
    this.searchedContainer = '';
    this.tempcontainerTableDetails = JSON.parse(JSON.stringify(this.containerTableDetails));
    this.disableDone = true;
    if (this.containerTableDetails.length == 0) {
      this.disableClear = true;
    } else {
      this.disableClear = false;
    }
  }

  selectIgmMrnNo(item: any) {
    this.verifyValidIGMMRNNo = false;
    this.showIgmMrnNo = false;
    this.selectedigmMrnNo = item.iGMMRNNo;
    this.selectedVesselNameMrn = item.vesselName;
    this.selectedVoyageNoMrn = item.voyageNo;
    this.selectedImoNoMrn = item.iMONo;
  }

  resetIgmMrnNo() {
    this.verifyValidIGMMRNNo = true;
    this.selectedVesselNameMrn = '';
    this.selectedVoyageNoMrn = '';
    this.selectedImoNoMrn = '';
  }

  selectBillOfLadingNo(item: any) {
    this.verifyBillNo = false;
    this.showBillOfLadingNo = false;
    this.selectedBillNo = item.billofLadingNo;
    this.selectedigmMrnNo = item.iGMMRNNo;
  }

  selectHouseBillOfLadingNo(item: any) {
    this.verifyHouseBillNo = false;
    this.showHouseBillOfLadingNo = false;
    this.selectedHouseBillNo = item.houseBillofLadingNo;
    this.selectedBillNo = item.billofLadingNo;
    this.selectedigmMrnNo = item.iGMMRNNo;
  }

  intializeRetrieve() {
    this.retrieveReq = new RetrievereqModel();
    this.retrieveReq.billofLadingNo = this.selectedBillNo;
    this.retrieveReq.boxOperator = this.selectedBoxOperator;
    this.retrieveReq.doType = this.selectedDoType;
    this.retrieveReq.hbillofLadingNo = this.selectedHouseBillNo;
    this.retrieveReq.iMONoRotation = this.selectediMONo;
    this.retrieveReq.port = this.selectedDoLocation;
    this.retrieveReq.rotationNo = this.selectedRotationNo;
    this.retrieveReq.terminal = this.selectedDoSpName;
    this.retrieveReq.vesselNameRotation = this.selectedVesselName;
    this.retrieveReq.voyageNoRotation = this.selectedVoyageNo;
    if (this.isDoTypeFcl) {
      this.retrieveReq.imoNoFCLMrn = this.selectedImoNoMrn;
      this.retrieveReq.voyageNoLCLMrn = this.selectedVoyageNoMrn;
      this.retrieveReq.fclIGMMRNNo = this.selectedigmMrnNo;
      this.retrieveReq.vesselNameFCLMrn = this.selectedVesselNameMrn;
      this.retrieveReq.tradeType = this.selectedTradeType;
    } else {
      this.retrieveReq.imoNoLCLMrn = this.selectedImoNoMrn;
      this.retrieveReq.voyageNoFCLMrn = this.selectedVoyageNoMrn;
      this.retrieveReq.lclIGMMRNNo = this.selectedigmMrnNo;
      this.retrieveReq.vesselNameLCLMrn = this.selectedVesselNameMrn;
      this.retrieveReq.tradeType = '';
    }
  }

  intializeVerifiy() {
    this.verifyReq = new RetrievereqModel();
    this.verifyReq.billofLadingNo = this.selectedBillNo;
    this.verifyReq.doType = this.selectedDoType;
    this.verifyReq.hbillofLadingNo = this.selectedHouseBillNo;
    //this.verifyReq.iMONoRotation = this.selectediMONo;
    this.verifyReq.port = this.selectedDoLocation;
    this.verifyReq.rotationNo = this.selectedRotationNo;
    this.verifyReq.boxOperator = this.selectedBoxOperator;
    this.verifyReq.doDrotationNumber = this.selectedDoRotationNo;
    this.verifyReq.doDboxOperator = this.selectedDoBoxOperator;
    this.verifyReq.agentDoNumber = this.agentReferenceNo;
    this.verifyReq.terminal = this.selectedDoSpName;
    if (this.isDoTypeFcl) {
      this.verifyReq.fclIGMMRNNo = this.selectedigmMrnNo;
      this.verifyReq.tradeType = this.selectedTradeType;
    } else {
      this.verifyReq.lclIGMMRNNo = this.selectedigmMrnNo;
      this.verifyReq.tradeType = '';
    }

    if (this.selectedTradeType == 'Coastal' || this.selectedDoType == 'Empty') {
      this.verifyReq.rotationNo = this.selectedDoRotationNo;
    }
  }

  initializeSubmitOrder() {
    this.submitCreate = new DeliveryorderreqModel();
    this.submitCreate.agentDoNumber = this.agentReferenceNo;
    this.submitCreate.clientCode = localStorage.getItem('CLIENT_CODE');

    this.submitCreate.containerPermitDate = this.datepipe.transform(this.containerPermitDate, 'dd/MM/yyyy');
    this.submitCreate.containerPermitNo = this.containerPermitNo;
    this.submitCreate.dOValidityDate = this.datepipe.transform(this.dovalidityDate, 'dd/MM/yyyy');
    this.submitCreate.dOValidityExtendedUpto = this.datepipe.transform(this.dovalidityDate, 'dd/MM/yyyy');

    if (this.selectedTradeType == 'Coastal' || this.selectedDoType == 'Empty') {

    } else {
      this.submitCreate.noOfContainers = /*this.importRetrieveModel.noOfContainers*/ this.containerTableDetails.length;
    }

    this.submitCreate.delOrdContDetlSO = this.containerTableDetails;
    this.submitCreate.totalNoOfContainers = this.containerTableDetails.length;


    if (this.selectedDoType == 'LCL') {
      this.submitCreate.delOrdCommodtyDetlSO = this.commodityDetails;
      this.submitCreate.natureOfCargo = this.importRetrieveModel.natureOfCargo;
      this.submitCreate.unitOfQuantity = this.importRetrieveModel.unitOfQuantity;
      this.submitCreate.packageDetail = this.importRetrieveModel.packageDetail;
      this.submitCreate.packageType = this.importRetrieveModel.packageType;
      this.submitCreate.totalNoOfPackages = this.importRetrieveModel.totalNoOfPackages;
      this.submitCreate.totalItemNo = this.importRetrieveModel.totalItemNo;
      this.submitCreate.totalQuantity = this.importRetrieveModel.totalQuantity;
      this.submitCreate.totalWeight = this.importRetrieveModel.totalWeight;
      this.submitCreate.grossWeightUnit = this.importRetrieveModel.grossWeightUnit;
    }

    this.submitCreate.deliveryTo = this.deliveryorderreqmodel.deliveryTo;
    this.submitCreate.depatureMode = this.departureMode;

    this.submitCreate.doForExamination = this.doForExam;
    this.submitCreate.doType = this.selectedDoType;
    this.submitCreate.billofLadingNo = this.selectedBillNo;
    this.submitCreate.hbillofLadingNo = this.selectedHouseBillNo;
    this.submitCreate.iMONoRotation = this.selectediMONo;
    this.submitCreate.importerAddress = this.importRetrieveModel.importerAddress;
    this.submitCreate.importerName = this.importRetrieveModel.importerName;
    this.submitCreate.instructionsToOtherParty = this.instructionsToOtherParty;

    this.submitCreate.port = this.selectedDoLocation;
    this.submitCreate.portOfDestination = this.importRetrieveModel.portOfDestination;
    this.submitCreate.portOfLoading = this.importRetrieveModel.portOfLoading;
    this.submitCreate.rotationNoInfoBTN = this.importRetrieveModel.rotationNoInfoBTN;

    this.submitCreate.terminal = this.selectedDoSpName;

    this.submitCreate.vesselNameRotation = this.selectedVesselName;
    this.submitCreate.voyageNoRotation = this.selectedVoyageNo;

    if (this.selectedDoType == 'FCL') {
      this.submitCreate.imoNoFCLMrn = this.selectedImoNoMrn;
      this.submitCreate.voyageNoFCLMrn = this.selectedVoyageNoMrn;
      this.submitCreate.fclIGMMRNNo = this.selectedigmMrnNo;
      this.submitCreate.vesselNameFCLMrn = this.selectedVesselNameMrn;
      this.submitCreate.tradeType = this.selectedTradeType;
    }
    if (this.selectedDoType == 'LCL') {
      this.submitCreate.imoNoLCLMrn = this.selectedImoNoMrn;
      this.submitCreate.voyageNoLCLMrn = this.selectedVoyageNoMrn;
      this.submitCreate.lclIGMMRNNo = this.selectedigmMrnNo;
      this.submitCreate.vesselNameLCLMrn = this.selectedVesselNameMrn;
      this.submitCreate.tradeType = '';
    }

    this.submitCreate.doDboxOperator = this.selectedDoBoxOperator;
    this.submitCreate.doDrotationNumber = this.selectedDoRotationNo;

    this.submitCreate.boxOperator = this.selectedBoxOperator;
    this.submitCreate.rotationNo = this.selectedRotationNo;

    this.submitCreate.cFSCode = this.deliveryorderreqmodel.cFSCode;
    this.submitCreate.cFSName = this.deliveryorderreqmodel.cFSName;

    this.submitCreate.cHACode = this.deliveryorderreqmodel.cHACode;
    this.submitCreate.cHAName = this.deliveryorderreqmodel.cHAName;

    this.submitCreate.emptyYardCode = this.deliveryorderreqmodel.emptyYardCode;
    this.submitCreate.emptyYardName = this.deliveryorderreqmodel.emptyYardName;

    this.submitCreate.frieghtForwarderCode = this.deliveryorderreqmodel.frieghtForwarderCode;
    this.submitCreate.frieghtForwarderName = this.deliveryorderreqmodel.frieghtForwarderName;

    this.submitCreate.haulierCode = this.deliveryorderreqmodel.haulierCode;
    this.submitCreate.haulierName = this.deliveryorderreqmodel.haulierName;

    this.submitCreate.consigneeCode = this.deliveryorderreqmodel.consigneeCode;
    this.submitCreate.consigneeName = this.deliveryorderreqmodel.consigneeName;

    this.submitCreate.doAttachs = this.attachments;

  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();
  }

  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  getHaulierItems(ev: any) {
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
    this.haulierRespCodeModel = [];
    let haulierCodeModelList: ChacoderesplistModel;
    let haulierCodeModel: ChacodeModel = new ChacodeModel;
    haulierCodeModel.companyCode = '';
    haulierCodeModel.companyName = '';
    this.doServiceProvider.getHaulierCode(haulierCodeModel)
      .subscribe(response => {
          haulierCodeModelList = <ChacoderesplistModel>response;
          this.haulierRespCodeModel = haulierCodeModelList.list;
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  onSelectHaulierCode(item: any) {
    this.deliveryorderreqmodel.haulierCode = item.companyCode;
    this.deliveryorderreqmodel.haulierName = item.companyName;
    this.showHaulierSug = false;
  }

  hideHaulierSuggestion(ev: any) {
    setTimeout(() => {
      if (this.utils.validate(this.deliveryorderreqmodel.haulierCode, '^[a-z0-9A-Z]{0,30}$')) {
        this.deliveryorderreqmodel.haulierCode = "";
        this.presentAlert("Attention", 'Haulier Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let haulierCodeModelList: ChacoderesplistModel;
        let searchResp: ChacodeModel = new ChacodeModel;
        let chacodeModelArray: ChacodeModel[] = [];
        let haulierCodeModel: ChacodeModel = new ChacodeModel;
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
              var errorMessage = <any>error;
              //Show error message
            });
        this.showHaulierSug = false;
      }
    }, 500);
  }

  getConsigneeItems(ev: any) {
    this.filterConsigneeArray = this.consigneeRespCodeModel;
    this.deliveryorderreqmodel.consigneeName = ''
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterConsigneeArray = this.filterConsigneeArray.filter((item) => {
        if (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showConsigneeSug = true;
        }
        return (item.companyCode.toString().toLowerCase().includes(val.toString().toLowerCase()));
      })
    } else {
      this.showConsigneeSug = false;
    }
  }

  getConsigneeFromService() {
    this.consigneeRespCodeModel = [];
    let consigneeCodeModelList: ChacoderesplistModel;
    let consigneeCodeModel: ChacodeModel = new ChacodeModel;
    consigneeCodeModel.companyCode = '';
    consigneeCodeModel.companyName = '';
    this.doServiceProvider.getConsigneeCode(consigneeCodeModel)
      .subscribe(response => {
          consigneeCodeModelList = <ChacoderesplistModel>response;
          this.consigneeRespCodeModel = consigneeCodeModelList.list;
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  hideConsigneeSuggestion(ev: any) {
    setTimeout(() => {
      if (this.utils.validate(this.deliveryorderreqmodel.consigneeCode, '^[a-z0-9A-Z]{0,30}$')) {
        this.deliveryorderreqmodel.consigneeCode = "";
        this.presentAlert("Attention", 'Consignee Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let searchResp: ChacodeModel = new ChacodeModel;
        let chacodeModelArray: ChacodeModel[] = [];
        let consigneeCodeModelList: ChacoderesplistModel;
        let consigneeCodeModel: ChacodeModel = new ChacodeModel;
        consigneeCodeModel.companyCode = this.deliveryorderreqmodel.consigneeCode;
        consigneeCodeModel.companyName = '';
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
              var errorMessage = <any>error;
              //Show error message
            });
        this.showConsigneeSug = false;
      }
    }, 500);
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
    this.frieghtRespCodeModel = [];
    let freightCodeModelList: ChacoderesplistModel;
    let freightCodeModel: ChacodeModel = new ChacodeModel;
    freightCodeModel.companyCode = '';
    freightCodeModel.companyName = '';
    freightCodeModel.ffCode = "";
    this.doServiceProvider.getFrieghtForwarderCode(freightCodeModel)
      .subscribe(response => {
          freightCodeModelList = <ChacoderesplistModel>response;
          this.frieghtRespCodeModel = freightCodeModelList.list;
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  hideFrieghtSuggestion(ev: any) {
    setTimeout(() => {
      if (this.utils.validate(this.deliveryorderreqmodel.frieghtForwarderCode, '^[a-z0-9A-Z]{0,30}$')) {
        this.deliveryorderreqmodel.frieghtForwarderCode = "";
        this.presentAlert("Attention", 'Frieght Forwarder Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let chacodeModelArray: ChacodeModel[] = [];
        let searchResp: ChacodeModel = new ChacodeModel;
        let freightCodeModelList: ChacoderesplistModel;
        let freightCodeModel: ChacodeModel = new ChacodeModel;
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
              var errorMessage = <any>error;
              //Show error message
            });
        this.showFrieghtSug = false;
      }
    }, 500);
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
    } else {
      this.showCHASug = false;
    }
  }

  getCHAFromService() {
    this.chaRespCodeModel = [];
    let chaCodeModelList: ChacoderesplistModel;
    let chaCodeModel: ChacodeModel = new ChacodeModel;
    chaCodeModel.companyCode = '';
    chaCodeModel.companyName = '';
    chaCodeModel.chaCode = "";
    this.doServiceProvider.getCHACode(chaCodeModel)
      .subscribe(response => {
          chaCodeModelList = <ChacoderesplistModel>response;
          this.chaRespCodeModel = chaCodeModelList.list;
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  hideCHASuggestion(ev: any) {
    setTimeout(() => {
      if (this.utils.validate(this.deliveryorderreqmodel.cHACode, '^[a-z0-9A-Z]{0,30}$')) {
        this.deliveryorderreqmodel.cHACode = "";
        this.presentAlert("Attention", 'CHA Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let chacodeModelArray: ChacodeModel[] = [];
        let searchResp: ChacodeModel = new ChacodeModel;
        let chaCodeModelList: ChacoderesplistModel;
        let chaCodeModel: ChacodeModel = new ChacodeModel;
        chaCodeModel.companyCode = this.deliveryorderreqmodel.cHACode;
        chaCodeModel.companyName = '';
        chaCodeModel.chaCode = "";
        this.doServiceProvider.getCHACode(chaCodeModel)
          .subscribe(response => {
              chaCodeModelList = <ChacoderesplistModel>response;
              chacodeModelArray = chaCodeModelList.list;
              if (chacodeModelArray.length <= 0) {
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
              var errorMessage = <any>error;
              //Show error message
            });
        this.showCHASug = false;
      }
    }, 500);
  }

  onSelectCHA(item: any) {
    this.deliveryorderreqmodel.cHACode = item.companyCode;
    this.deliveryorderreqmodel.cHAName = item.companyName;
    this.showCHASug = false;
  }

  getCFSItems(ev: any) {
    this.filterCFSArray = this.cfsRespCodeModel;
    this.deliveryorderreqmodel.cFSName = '';
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
    } else {
      this.showCFSSug = false;
    }
  }

  getCFSFromService() {
    this.cfsRespCodeModel = [];
    let cfsCodeModelList: ChacoderesplistModel;
    let cfsCodeModel: ChacodeModel = new ChacodeModel;
    cfsCodeModel.companyCode = '';
    cfsCodeModel.companyName = '';
    cfsCodeModel.cfsCode = '';
    this.doServiceProvider.getCFSCode(cfsCodeModel)
      .subscribe(response => {
          cfsCodeModelList = <ChacoderesplistModel>response;
          this.cfsRespCodeModel = cfsCodeModelList.list;
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  hideCFSSuggestion(ev: any) {
    setTimeout(() => {
      if (this.utils.validate(this.deliveryorderreqmodel.cFSCode, '^[a-z0-9A-Z]{0,30}$')) {
        this.deliveryorderreqmodel.cFSCode = "";
        this.presentAlert("Attention", 'CFS Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let chacodeModelArray: ChacodeModel[] = [];
        let searchResp: ChacodeModel = new ChacodeModel;
        let cfsCodeModelList: ChacoderesplistModel;
        let cfsCodeModel: ChacodeModel = new ChacodeModel;
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
              var errorMessage = <any>error;
              //Show error message
            });
        this.showCFSSug = false;
      }
    }, 500);
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
    } else {
      this.showEmptySSug = false;
    }
  }

  getEmptyFromService() {
    this.chaRespCodeModel = [];

    let emptyCodeModelList: ChacoderesplistModel;
    let emptyCodeModel: ChacodeModel = new ChacodeModel;
    emptyCodeModel.companyCode = '';
    emptyCodeModel.companyName = '';
    emptyCodeModel.eyCode = "";
    this.doServiceProvider.getEmptyCode(emptyCodeModel)
      .subscribe(response => {
          emptyCodeModelList = <ChacoderesplistModel>response;
          this.emptyRespCodeModel = emptyCodeModelList.list;
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
        });
  }

  hideEmptySuggestion(ev: any) {
    setTimeout(() => {
      if (this.utils.validate(this.deliveryorderreqmodel.emptyYardCode, '^[a-z0-9A-Z]{0,30}$')) {
        this.deliveryorderreqmodel.emptyYardCode = "";
        this.presentAlert("Attention", 'Empty Yard Company Code is Invalid.');
        return;
      }
      let val = ev.value;
      if (val.length > 0) {
        let chacodeModelArray: ChacodeModel[] = [];
        let emptyCodeModelList: ChacoderesplistModel;
        let searchResp: ChacodeModel = new ChacodeModel;
        let emptyCodeModel: ChacodeModel = new ChacodeModel;
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
              var errorMessage = <any>error;
              //Show error message
            });
        this.showEmptySSug = false;
      }
    }, 500);
  }

  onSelectEmpty(item: any) {
    this.deliveryorderreqmodel.emptyYardCode = item.companyCode;
    this.deliveryorderreqmodel.emptyYardName = item.companyName;
    this.showEmptySSug = false;
  }


  initializeFeildValidation() {

    this.deliveryOrderTypeForm = this.formBuilder.group({
      doLocation: ['', Validators.compose([Validators.required])],
      doSpName: ['', Validators.compose([Validators.required])],
      doType: ['', Validators.compose([Validators.required])],
      doTradeType: ['']
    });

    this.billOfLadingDetailsForm = this.formBuilder.group({
      doIgmMrnNo: [''],
      doBillNo: [''],
      doHouseBillNo: [''],
    });

    this.doboxOperatorForm = this.formBuilder.group({
      doBoxOperator: ['']
    });

    this.doRoatationnoForm = this.formBuilder.group({
      doRotationNo: ['']
    });

    this.deliveryOrderDetailsForm1 = this.formBuilder.group({
      agentReferenceNo: ['', Validators.compose([Validators.required])],
      dovalidityDate: ['', Validators.compose([Validators.required])],
    });

    this.deliveryOrderDetailsForm2 = this.formBuilder.group({
      departureMode: [''],
      deliveryTo: ['']
    });

    this.deliveryOrderDetailsForm3 = this.formBuilder.group({
      frieghtForwarderCode: [''],
      consigneeCode: [''],
      cFSCode: [''],
      emptyYardCode: [''],
      cHACode: [''],
      haulierCode: [''],
      containerPermitNo: [''],
      containerPermitDate: [''],
      instructionsToOtherParty: ['']
    });

    this.selectedDoBoxOperatorForm = this.formBuilder.group({
      selectedDoBoxOperator: ['']
    });

    this.selectedDoRotationNoForm = this.formBuilder.group({
      selectedDoRotationNo: ['']
    });

    this.doForExamForm = this.formBuilder.group({
      doForExam: ['']
    });
  }

  setValidation() {
    //set deliveryOrderTypeForm
    this.deliveryOrderTypeForm.controls["doTradeType"].clearValidators();
    this.deliveryOrderTypeForm.controls["doTradeType"].disable();
    if (this.selectedDoType == 'FCL') {
      this.deliveryOrderTypeForm.controls["doTradeType"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderTypeForm.controls["doTradeType"].enable();
    }

    // set billOfLadingDetailsForm
    this.doboxOperatorForm.controls["doBoxOperator"].clearValidators();
    this.doboxOperatorForm.controls["doBoxOperator"].disable();
    this.doRoatationnoForm.controls["doRotationNo"].clearValidators();
    this.doRoatationnoForm.controls["doRotationNo"].disable();
    this.billOfLadingDetailsForm.controls["doHouseBillNo"].clearValidators();
    this.billOfLadingDetailsForm.controls["doHouseBillNo"].disable();
    this.billOfLadingDetailsForm.controls["doBillNo"].clearValidators();
    this.billOfLadingDetailsForm.controls["doBillNo"].disable();
    this.billOfLadingDetailsForm.controls["doIgmMrnNo"].clearValidators();
    this.billOfLadingDetailsForm.controls["doIgmMrnNo"].disable();
    this.deliveryOrderDetailsForm2.controls["deliveryTo"].clearValidators();
    this.deliveryOrderDetailsForm2.controls["deliveryTo"].enable();


    if (this.selectedDoType == 'LCL' || (this.selectedDoType == 'FCL' && this.selectedTradeType == 'Foreign')) {
      this.doboxOperatorForm.controls["doBoxOperator"].setValidators(Validators.compose([Validators.required]));
      this.doboxOperatorForm.controls["doBoxOperator"].enable();
      this.doRoatationnoForm.controls["doRotationNo"].setValidators(Validators.compose([Validators.required]));
      this.doRoatationnoForm.controls["doRotationNo"].enable();
      this.billOfLadingDetailsForm.controls["doIgmMrnNo"].setValidators(Validators.compose([Validators.required]));
      this.billOfLadingDetailsForm.controls["doIgmMrnNo"].enable();
      this.deliveryOrderDetailsForm2.controls["deliveryTo"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderDetailsForm2.controls["deliveryTo"].enable();
      if (this.selectedDoType == 'LCL') {
        this.billOfLadingDetailsForm.controls["doHouseBillNo"].setValidators(Validators.compose([Validators.required]));
        this.billOfLadingDetailsForm.controls["doHouseBillNo"].enable();
      } else if (this.selectedDoType == 'FCL' && this.selectedTradeType == 'Foreign') {
        this.billOfLadingDetailsForm.controls["doBillNo"].setValidators(Validators.compose([Validators.required]));
        this.billOfLadingDetailsForm.controls["doBillNo"].enable();
      }
    }

    // set deliveryOrderDetailsForm
    this.selectedDoBoxOperatorForm.controls["selectedDoBoxOperator"].clearValidators();
    this.selectedDoBoxOperatorForm.controls["selectedDoBoxOperator"].disable();
    this.selectedDoRotationNoForm.controls["selectedDoRotationNo"].clearValidators();
    this.selectedDoRotationNoForm.controls["selectedDoRotationNo"].disable();
    if ((this.selectedDoType == 'FCL' && this.selectedTradeType == 'Coastal') || this.selectedDoType == 'Empty') {
      this.selectedDoBoxOperatorForm.controls["selectedDoBoxOperator"].setValidators(Validators.compose([Validators.required]));
      this.selectedDoBoxOperatorForm.controls["selectedDoBoxOperator"].enable();
      this.selectedDoRotationNoForm.controls["selectedDoRotationNo"].setValidators(Validators.compose([Validators.required]));
      this.selectedDoRotationNoForm.controls["selectedDoRotationNo"].enable();
    }

    //set delivery to validation
    this.setValidationDeliveryTo();

    this.deliveryOrderTypeForm.updateValueAndValidity();
    this.billOfLadingDetailsForm.updateValueAndValidity();
    this.doboxOperatorForm.updateValueAndValidity();
    this.doRoatationnoForm.updateValueAndValidity();
    this.deliveryOrderDetailsForm1.updateValueAndValidity();
    this.deliveryOrderDetailsForm2.updateValueAndValidity();
    this.selectedDoBoxOperatorForm.updateValueAndValidity();
    this.selectedDoRotationNoForm.updateValueAndValidity();
  }

  setValidationDeliveryTo() {
    this.deliveryOrderDetailsForm3.controls["frieghtForwarderCode"].clearValidators();
    this.deliveryOrderDetailsForm3.controls["frieghtForwarderCode"].disable();
    this.deliveryOrderDetailsForm3.controls["consigneeCode"].clearValidators();
    this.deliveryOrderDetailsForm3.controls["consigneeCode"].disable();
    this.deliveryOrderDetailsForm3.controls["cFSCode"].clearValidators();
    this.deliveryOrderDetailsForm3.controls["cFSCode"].disable();
    this.deliveryOrderDetailsForm3.controls["emptyYardCode"].clearValidators();
    this.deliveryOrderDetailsForm3.controls["emptyYardCode"].disable();

    if (this.getDeliveryType(1)) {
      this.deliveryOrderDetailsForm3.controls["frieghtForwarderCode"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderDetailsForm3.controls["frieghtForwarderCode"].enable();
    } else if (this.getDeliveryType(2)) {
      this.deliveryOrderDetailsForm3.controls["consigneeCode"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderDetailsForm3.controls["consigneeCode"].enable();
    } else if (this.getDeliveryType(3)) {
      this.deliveryOrderDetailsForm3.controls["cFSCode"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderDetailsForm3.controls["cFSCode"].enable();
    } else if (this.getDeliveryType(4)) {
      this.deliveryOrderDetailsForm3.controls["emptyYardCode"].setValidators(Validators.compose([Validators.required]));
      this.deliveryOrderDetailsForm3.controls["emptyYardCode"].enable();
    }
    this.deliveryOrderDetailsForm3.updateValueAndValidity();
  }

  geticon(x) {
    if (x) {
      return 'arrow-dropup';
    } else {
      return 'arrow-dropdown';
    }
  }

  onRetriveStatus() {
    if (/*this.selectedRotationNo != '' && this.selectedBoxOperator != '' &&
      (this.selectedBillNo != '' || this.selectedHouseBillNo != '')
      && */!this.verifyValidIGMMRNNo && !this.verifyValidRotationNo &&
    !(this.verifyHouseBillNo || this.verifyBillNo)) {
      return false;
    } else {
      return true;
    }
  }

  resetValues() {
    this.selectedBoxOperator = "";
    this.selectedRotationNo = "";
    this.selectedDoBoxOperator = "";
    this.selectedDoRotationNo = "";
    this.selectedigmMrnNo = "";
    this.selectedBillNo = "";
    this.selectedHouseBillNo = "";
    this.agentReferenceNo = "";
    this.dovalidityDate = "";
    this.doForExam = "";
    this.departureMode = "";
    this.companyCode = "";
    this.companyName = "";
    this.containerPermitNo = "";
    this.containerPermitDate = "";
    this.instructionsToOtherParty = "";
    this.importerName = "";
    this.importerAddress = "";
    this.portOfLoading = "";
    this.portOfDestination = "";
    this.noOfContainers = "";
    this.containerTableDetails = [];
    this.containerDataTable = false;
    this.hideRotationNoInfo = true;
    this.importRetrieveModel = new DeliveryorderreqModel();
    this.containerRetrieveModel = new DeliveryorderreqModel();
    this.deliveryorderreqmodel = new DeliveryorderreqModel();
    this.deliveryorderreqmodel.deliveryTo = this.deliveryToList[0].definedSetValueCode;
    this.deliveryorderreqmodel.cHACode = "";
    this.deliveryorderreqmodel.haulierCode = "";

    this.prevSelectedDoBoxOperator = "";
    this.prevSelectedDoRotationNo = "";
  }


  public filterData(tab: string): void {
    setTimeout(() => {
      this.setValidation();
      if (tab === 'Delivery Order Type') {
        this.deliveryOrderType = true;
        this.billOfLadingDetails = false;
        this.importerDetails = false;
        this.deliveryOrderDetails = false;
        this.containerTable = false;
        this.cargoDetails = false;
        this.showAttachment = false;
        this.selectedTab = 'Delivery Order Type';
      } else if (tab === 'Retrieve Bill Of Lading Details') {
        this.billOfLadingDetails = true;
        this.selectedTab = 'Retrieve Bill Of Lading Details';
        this.deliveryOrderType = false;
        this.importerDetails = false;
        this.deliveryOrderDetails = false;
        this.containerTable = false;
        this.cargoDetails = false;
        this.showAttachment = false;
      } else if (tab === 'Bill Of Lading Details') {
        this.importerDetails = true;
        this.selectedTab = 'Bill Of Lading Details';
        this.deliveryOrderType = false;
        this.billOfLadingDetails = false;
        this.deliveryOrderDetails = false;
        this.containerTable = false;
        this.cargoDetails = false;
        this.showAttachment = false;
      } else if (tab === 'Delivery Order Details') {
        this.deliveryOrderDetails = true;
        this.selectedTab = 'Delivery Order Details';
        this.deliveryOrderType = false;
        this.deliveryOrderType = false;
        this.billOfLadingDetails = false;
        this.importerDetails = false;
        this.containerTable = false;
        this.cargoDetails = false;
        this.showAttachment = false;
      } else if (tab === 'Container Table') {
        this.deliveryOrderType = false;
        this.billOfLadingDetails = false;
        this.importerDetails = false;
        this.deliveryOrderDetails = false;
        this.containerTable = true;
        this.cargoDetails = false;
        this.showAttachment = false;
        this.selectedTab = 'Container Table';
      } else if (tab === 'Cargo Details') {
        this.deliveryOrderType = false;
        this.billOfLadingDetails = false;
        this.importerDetails = false;
        this.deliveryOrderDetails = false;
        this.containerTable = false;
        this.cargoDetails = true;
        this.showAttachment = false;
        this.selectedTab = 'Cargo Details';
      } else if (tab === 'Attachments') {
        this.deliveryOrderType = false;
        this.billOfLadingDetails = false;
        this.importerDetails = false;
        this.deliveryOrderDetails = false;
        this.containerTable = false;
        this.cargoDetails = false;
        this.showAttachment = true;
        this.selectedTab = 'Attachments';
      }
      this.slides.slideTo(this.tabs.indexOf(this.selectedTab), 500);
      this.content.scrollToTop(0);
      this.clearContainerSearch();
    }, 300);

  }

  changeDoType(selectedValue: any) {
    if (this.prevSelectedDoType == '') {
      this.prevSelectedDoType = this.selectedDoType;
      this.changeType(selectedValue);
    } else if (this.prevSelectedDoType != this.selectedDoType) {
      this.showChangeTypeAlert(selectedValue, true);
    } else if (this.prevSelectedDoType == this.selectedDoType) {
      return;
    } else {
      this.changeType(selectedValue);
    }
  }

  changeTradeType(selectedValue: any) {
    if (this.selectedTradeType == '' && this.prevSelectedTradeType == "") {
      return;
    } else if (this.prevSelectedTradeType == '') {
      this.prevSelectedTradeType = this.selectedTradeType;
      this.changeType(selectedValue);
    } else if (this.prevSelectedTradeType != this.selectedTradeType) {
      this.showChangeTypeAlert(selectedValue, false);
    } else if (this.prevSelectedTradeType == this.selectedTradeType) {
      return;
    } else {
      this.changeType(selectedValue);
    }
  }

  showChangeTypeAlert(selectedValue: any, isFromDoType: boolean) {
    setTimeout(() => {
      let alertMsg = 'If you continue you will reset your changes. Do you want to proceed?';
      const alert = this.alertCtrl.create({
        title: 'CONFIRM BOX',
        message: alertMsg,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              if (isFromDoType) {
                this.prevSelectedDoType = this.selectedDoType;
              } else {
                this.prevSelectedTradeType = this.selectedTradeType;
              }
              this.changeType(selectedValue);
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              if (isFromDoType) {
                this.selectedDoType = this.prevSelectedDoType;
              } else {
                this.selectedTradeType = this.prevSelectedTradeType;
              }
            }
          }
        ]
      });
      alert.present();
    }, 200);
  }

  changeType(selectedValue: any) {
    this.readOnlyFlag = false;
    this.readOnlyFlagEmpty = false;
    this.resetValues();
    if (selectedValue === 'Empty') {
      this.selectedTradeType = "";
      this.prevSelectedTradeType = "";
      this.tabs = ['Delivery Order Type', 'Delivery Order Details', 'Container Table', 'Attachments'];
      this.setValidation();
      setTimeout(() => {
        this.doisEmpty = true;
        this.isDoTypeFcl = false;
        this.shouldShow = true;
        this.isDeliveryToMandatory = false;
      }, 200);
      this.resetContainerTab();
    } else if (selectedValue === 'FCL') {
      //this.selectedTradeType = "";
      //this.prevSelectedTradeType = "";
      this.tabs = ['Delivery Order Type', 'Delivery Order Details', 'Attachments'];
      this.setValidation();
      setTimeout(() => {
        this.doisEmpty = false;
        this.isDoTypeFcl = true;
        this.shouldShow = false;
        this.isDeliveryToMandatory = false;
      }, 200);
    } else if (selectedValue === 'LCL') {
      this.selectedTradeType = "";
      this.prevSelectedTradeType = "";
      this.tabs = ['Delivery Order Type', 'Retrieve Bill Of Lading Details', 'Bill Of Lading Details',
        'Delivery Order Details', 'Container Table', 'Cargo Details', 'Attachments'];
      this.setValidation();
      setTimeout(() => {
        this.doisEmpty = false;
        this.isDoTypeFcl = false;
        this.shouldShow = false;
        this.isDeliveryToMandatory = true;
        this.showBillOfLading = true;
      }, 200);
    } else if (selectedValue === 'Foreign') {
      this.tabs = ['Delivery Order Type', 'Retrieve Bill Of Lading Details', 'Bill Of Lading Details',
        'Delivery Order Details', 'Container Table', 'Attachments'];
      this.setValidation();
      setTimeout(() => {
        this.doisEmpty = false;
        this.shouldShow = false;
        this.isDeliveryToMandatory = true;
        this.showBillOfLading = false;
      }, 200);
    } else if (selectedValue === 'Coastal') {
      this.tabs = ['Delivery Order Type', 'Delivery Order Details', 'Container Table', 'Attachments'];
      this.setValidation();
      setTimeout(() => {
        this.doisEmpty = false;
        this.shouldShow = true;
        this.showBillOfLading = true;
        this.isDeliveryToMandatory = false;
      }, 200);
      this.resetContainerTab();
    }
    this.showRightButton = this.tabs.length > 2;
    this.slides.slideTo(0, 500);
  }

  onSelectionchangeofDeliveryTo() {
    this.deliveryorderreqmodel.emptyYardName = "";
    this.deliveryorderreqmodel.emptyYardCode = "";
    this.deliveryorderreqmodel.cFSName = "";
    this.deliveryorderreqmodel.cFSCode = "";
    this.deliveryorderreqmodel.frieghtForwarderName = "";
    this.deliveryorderreqmodel.frieghtForwarderCode = "";
    this.deliveryorderreqmodel.consigneeName = "";
    this.deliveryorderreqmodel.consigneeCode = "";
    this.setValidationDeliveryTo();
  }

  onFocusChangeofAgentRef() {
    if (this.agentReferenceNo != '' && this.agentReferenceNo.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.agentReferenceNo = "";
    } else {
      if (this.agentReferenceNo != '') {
        this.intializeVerifiy();
        this.doServiceProvider.verifyAgentRef(this.verifyReq)
          .subscribe(response => {
              if (response == true) {
                this.agentReferenceNo = '';
                this.presentAlert("ATTENTION", 'Agent Reference No already Exists, please provide another value.');
              }
            },
            error => {
            });
      }
    }
  }

  onContainerPermitNoBlur() {
    if (this.utils.validate(this.containerPermitNo, '^[a-z0-9A-Z]*$')) {
      this.containerPermitNo = "";
      this.presentAlert("Attention", "Invalid Container Permit Number");
      return;
    }
    if (this.containerPermitNo != '' && this.containerPermitNo.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.containerPermitNo = '';
    }
  }

  oninstructionsToOtherPartyBlur(curEvent: any) {
    if (curEvent.keyCode != 13 && this.instructionsToOtherParty != '' && this.instructionsToOtherParty.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.instructionsToOtherParty = '';
    }
  }

  selectAllContainer() {
    if (this.allSelected) {
      let matchFound: boolean = false;
      for (let index = 0; index < this.filterContainerArray.length; index++) {
        matchFound = false;
        this.filterContainerArray[index].selected = true;
        for (let i = 0; i < this.tempcontainerTableDetails.length; i++) {
          if (this.filterContainerArray[index].containerNo == this.tempcontainerTableDetails[i].containerNo) {
            matchFound = true;
          }
        }
        if (matchFound == false) {
          this.tempcontainerTableDetails.push(this.filterContainerArray[index]);
        }
      }
      this.disableDone = false;
    } else {
      for (let index = 0; index < this.filterContainerArray.length; index++) {
        this.filterContainerArray[index].selected = false;
        for (let i = 0; i < this.tempcontainerTableDetails.length; i++) {
          if (this.filterContainerArray[index].containerNo == this.tempcontainerTableDetails[i].containerNo) {
            this.tempcontainerTableDetails.splice(i, 1);
            break;
          }
        }
      }
      if (this.containerTableDetails.length == 0) {
        this.disableDone = true;
      }
      else {
        this.disableDone = false;
      }
    }
  }

  toggleSelected(container: any) {
    setTimeout(() => {
      let contains: boolean = false;
      let allStatus: boolean = false;
      for (let i = 0; i < this.filterContainerArray.length; i++) {
        if (this.filterContainerArray[i].selected) {
          this.disableDone = false;
          break;
        }
        else {
          if (this.containerTableDetails.length == 0) {
            this.disableDone = true;
          }
          else {
            this.disableDone = false;
          }
        }
      }
      if (container.selected) {
        this.tempcontainerTableDetails.forEach((item) => {
          if (item.containerNo == container.containerNo) {
            contains = true;
          }
        });
        if (!contains) {
          this.tempcontainerTableDetails.push(container);
          container.hideval = false;
        }
      }
      if (!container.selected) {
        this.allSelected = false;
        this.tempcontainerTableDetails.forEach((item) => {
          if (item.containerNo == container.containerNo) {
            let index = this.tempcontainerTableDetails.indexOf(item);
            this.tempcontainerTableDetails.splice(index, 1);
          }
        });
      }
      this.setAllstatus();
    }, 500);
  }

  setAllstatus() {
    let allStatus: boolean = true;
    for (let i = 0; i < this.filterContainerArray.length; i++) {
      if (!this.filterContainerArray[i].selected) {
        allStatus = false;
        break;
      }
    }
    if (allStatus) {
      this.allSelected = true;
    }
    else {
      this.allSelected = false;
    }
  }

  submitContainerSelection() {
    this.readOnlyFlagEmpty = true;
    this.disableDone = true;
    if (this.containerTableDetails == null || this.containerTableDetails.length == 0) {
      this.containerTableDetails = JSON.parse(JSON.stringify(this.tempcontainerTableDetails));
    } else {
      let matchFound: boolean = false;
      this.tempcontainerTableDetails.forEach((tempElement) => {
        matchFound = false;
        for (let conIndex = 0; conIndex < this.containerTableDetails.length; conIndex++) {
          if (this.containerTableDetails[conIndex].containerNo == tempElement.containerNo) {
            matchFound = true;
          }
        }
        if (matchFound == false) {
          this.containerTableDetails.push(tempElement);
        }
      })
      let containerIndex = 0;
      let containerIterator = JSON.parse(JSON.stringify(this.containerTableDetails));
      let matchPresent: boolean = false;
      let arrayIndexestoBeSpliced: number[] = [];
      for (let i = 0; i < containerIterator.length; i++) {
        matchPresent = false;
        for (let j = 0; j < this.tempcontainerTableDetails.length; j++) {
          if (containerIterator[i].containerNo == this.tempcontainerTableDetails[j].containerNo) {
            matchPresent = true; //no need to delete
          }
        }
        if (matchPresent == false) {
          if (containerIterator != null && containerIterator.length >= i) {
            console.log("No match found for <<" + JSON.stringify(containerIterator[i].containerNo) + ">>");
            arrayIndexestoBeSpliced.push(i);
            // this.containerTableDetails.splice(i, 1);
          }
        }
      }
      arrayIndexestoBeSpliced = arrayIndexestoBeSpliced.sort((n1, n2) => n2 - n1);
      arrayIndexestoBeSpliced.forEach(elementIndex => {
        this.containerTableDetails.splice(elementIndex, 1);
      });
      arrayIndexestoBeSpliced = [];
    }

    if (this.containerTableDetails.length > 0) {
      this.showContainer = false;
      this.trashIconStatus = true;
      this.containerDataTable = true;
      this.disableClear = false;
    }
    else {
      this.containerDataTable = false;
      this.disableClear = true;
      this.showContainer = false;
    }
    this.searchedContainer = '';
  }

  cancelContainerSelection() {
    this.allSelected = false;
    this.disableDone = true;
    this.disableClear = true;
    if (this.containerTableDetails) {
      this.containerTableDetails.forEach((container) => {
        container.selected = false;
      });
      this.containerTableDetails = [];
      this.tempcontainerTableDetails = [];
      this.showContainer = false;
      this.containerDataTable = false;
      this.searchedContainer = '';
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'containerPermitNo') {
      this.containerPermitNo = e.target.value;
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
    else if (model == 'deliveryorderreqmodel.haulierCode') {
      this.deliveryorderreqmodel.haulierCode = e.target.value;
    }
    else if (model == 'searchedContainer') {
      this.searchedContainer = e.target.value;
    }
    else if (model == 'selectedDoRotationNo') {
      this.selectedDoRotationNo = e.target.value;
    }
    else if (model == 'selectedigmMrnNo') {
      this.selectedigmMrnNo = e.target.value;
    }
    else if (model == 'selectedBillNo') {
      this.selectedBillNo = e.target.value;
    }
    else if (model == 'selectedHouseBillNo') {
      this.selectedHouseBillNo = e.target.value;
    }
    // else if (model == 'Instructions') {
    //   this.instructionsToOtherParty = e.target.value;
    // }
  }

  lstKeyUpValidate(e, format, model, instance) {
    this.utils.keyUpValidate(e, format);
    if (model == 'refeer') {
      instance[model] = e.target.value;
    }
  }

  lstKeyUpValidateOnBlur(instance) {
    let val = instance['reefer'];
    if (eval("/^[0-9-.]{0,7}$/").test(val) === false) {
      instance['reefer'] = "";
    }
  }

  checkReffer(ev, mode) {
    this.WarningMsg_Refeer = "Temperature entered will be applied for Pre Temperature Inspection (PTI) before Pickup.";
    if (mode == "in") {
      this.isConfirmOpen = true;
    }
    else if (mode == "out") {
      this.isConfirmOpen = false;
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

  getDeliveryType(index: number): boolean {
    if (this.deliveryToList && this.deliveryToList.length > 0
      && this.deliveryorderreqmodel.deliveryTo &&
      this.deliveryorderreqmodel.deliveryTo == this.deliveryToList[index].definedSetValueCode) {

      return true;
    } else {
      return false;
    }
  }

}

