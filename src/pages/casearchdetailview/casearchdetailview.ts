import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
  Slides,
  ViewController, Navbar, Content
} from 'ionic-angular';
import {ContaineracceptanceProvider} from "../../providers/webservices/containeracceptanceservices";
import {ContainerAcceptanceModel} from "../../shared/model/containeracceptance/containeracceptance.model";
import {ContainerDetailsModel} from "../../shared/model/containeracceptance/containerdetails.model";
import {CaAttachModel} from "../../shared/model/containeracceptance/caattach.model";
import {CaNominationsModel} from "../../shared/model/containeracceptance/canominations.model";
import {DatePipe} from "@angular/common";
import {CADamageModelComponent} from "../../components/camodelpages/cadamagemodalpage/cadamagemodel";
import {CAIMGDModelComponent} from "../../components/camodelpages/caimdgmodelpage/caimdgmodel";
import {CAReeferModelComponent} from "../../components/camodelpages/careefermodelpage/careefermodel";
import {SecurityUtility} from "../../shared/securityutility";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {DocumentMasterModel} from "../../shared/model/containeracceptance/isocode/documentmaster.model";
import {IsoCodeMasterListModel} from "../../shared/model/containeracceptance/isocode/isocodemaster-list.model";
import {IsoCodeMasterModel} from "../../shared/model/containeracceptance/isocode/isocodemaster.model";
import {CAOOGModelComponent} from "../../components/camodelpages/caoogmodelpage/caoogmodel";
import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {ImdgDetailsModel} from "../../shared/model/containeracceptance/imdgdetails.model";
import {Casearchsummay} from "../casearchsummay/casearchsummay";
import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";

/**ContainerAcceptanceModel
 * Generated class for the CasearchdetailviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-casearchdetailview',
  templateUrl: 'casearchdetailview.html',
  providers: [Utils, ContainerAcceptanceModel, SecurityUtility]
})
export class CasearchdetailviewPage {

  /*Boolean flag to determine View/Edit mode*/
  editMode: boolean;
  isCreator: boolean;
  /*imdgDirtyFlag: boolean;*/
  reeferDirtyFlag: boolean;
  damageDirtyFlag: boolean;
  specialStowageListDirty: boolean;
  oogDirtyFlag: boolean;
  imdgArrayFlag: boolean;
  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  @ViewChild('navbar') navBar: Navbar;

  @ViewChild(Slides) slides: Slides;
  @ViewChild(Content) content: Content;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  public tabs: Array<any>;
  dateTimeFormat: string = 'DD/MM/YYYY HH:mm';
  dateTimeFormatplaceHolder: string = 'DD/MM/YYYY HH:MM';
  VGMOptions: string[] = ['Yes', 'Auto Approve'];
  selectedCategory: string;
  activeMode: string;
  isAccTypeExport: boolean = false;
  isAccTypeFull: boolean = false;
  previousContainerNo: string = '';

  requestwithID: ContainerAcceptanceModel;

  counter20Ft: number = 0;
  counter40Ft: number = 0;
  counter45Ft: number = 0;

  attachReceived: CaAttachModel[];
  nominationsReceived: CaNominationsModel[];
  tempNomin: CaNominationsModel[];
  containerDetailsArray: ContainerDetailsModel[];
  tempContArray: ContainerDetailsModel[];

  mandatory: boolean = false;

  containerDetailsForm: FormGroup;
  bookingDetailsForm: FormGroup;

  attachdirtyFlag: boolean = false;
  nomineedirtyFlag: boolean = false;

  containerDetailsFormArray: FormArray;
  error: boolean = false;

  todayPlusTwo: any;
  validityDate: any;

  disableSubmit: boolean = false;
  responseModelOriginal: any;

  // showNominationSug: boolean = false;
  nominationRespCodeModel: CaNominationsModel[];
  filterNominationArray: CaNominationsModel[];

  containerNumberArray: Array<string> = new Array<string>();

  clientTypeSelected: boolean = false;

  currDate: string = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();

  /* Tab Order
  0-AcceptanceDetails
  1-BookingDetails
  2-ContainerDetails
  3-Nominations
  4-Attachments
  */
  public showTabs: Array<boolean> = [false, false, false, false, false];

  private acceptanceType: string[] = ['Export Full', 'Export Empty', 'Storage Empty', 'Storage Full'];
  private tradeType: string[] = ['Foreign', 'Coastal'];
  public definedSetListModel: DefinedsetresListModel[];

  acceptanceTypeList: DefinedSetResModel[] = [];
  tradeTypeList: DefinedSetResModel[] = [];
  portOfDischargeList: DefinedSetResModel[] = [];
  containerNoAvailableList: DefinedSetResModel[] = [];
  modeOfTransportList: DefinedSetResModel[] = [];
  vgmRequiredList: DefinedSetResModel[] = [];
  clientList: DefinedSetResModel[] = [];
  specialStowageList: DefinedSetResModel[] = [];
  imdgType: DefinedSetResModel[] = [];
  packagingGroup: DefinedSetResModel[] = [];

  /*selectedModel: ContainerAcceptanceModel;*/
  isoCodeMasterList: IsoCodeMasterModel[];

  oogIsoCodeList = new Array<string>();
  verifyClientCode: boolean = false;

  fromHistory: boolean = false;
  fromSummary: boolean;

  modelToTransmit: ContainerAcceptanceModel

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
              public caProvider: ContaineracceptanceProvider,
              public responseModel: ContainerAcceptanceModel,
              public datepipe: DatePipe, public securityUtility: SecurityUtility,
              private commonServices: CommonservicesProvider,
              public utils: Utils, public formBuilder: FormBuilder,
              public keyboard: Keyboard, private viewCtrl: ViewController) {

    this.tabs = ['Acceptance Details', 'Booking Details', 'Container Details', 'Nominations', 'Attachments'];
    this.activeMode = this.navParams.get("mode");
    this.fromSummary = this.navParams.get("fromSummary");
    if (this.activeMode == 'view') {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
    this.requestwithID = new ContainerAcceptanceModel();
    this.fromHistory = this.navParams.get('fromHistory');
    if (this.fromHistory == true) {
      this.requestwithID.caRequestId = this.navParams.get('caRequestId');
    } else {
      this.requestwithID.acceptanceNo = this.navParams.get('acceptanceNo');
    }

    this.resetShowTabs(0);
    this.selectedTab = this.tabs[0];
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;
    this.initializeFeildValidation();
    this.todayPlusTwo = new Date();
    this.todayPlusTwo.setHours(this.todayPlusTwo.getHours() + 2);

    /*this.selectedModel = new ContainerAcceptanceModel();*/

    this.oogIsoCodeList.push("4960");
    this.oogIsoCodeList.push("22G2");
    this.oogIsoCodeList.push("22U1");
    this.oogIsoCodeList.push("25U1");
    this.oogIsoCodeList.push("42U1");
    this.oogIsoCodeList.push("45U6");

    this.getDefinedSet();
    this.getIsoCode();

    this.loadCA();


  }

  initializeFeildValidation() {
    this.containerDetailsForm = this.formBuilder.group({
      containerDetailsFormArray: this.formBuilder.array([
        /*this.addContainerForm()*/
      ])
    });

    this.bookingDetailsForm = this.formBuilder.group({
        cavalidityDate: [''],
        camodeOftransport: [''],
        cavgmrequired: [''],
        cainstructions: ['', Validators.compose([Validators.minLength(3)])]
      }
    );

    this.containerDetailsFormArray = this.containerDetailsForm.get('containerDetailsFormArray') as FormArray;
  }

  addContainerForm(): FormGroup {
    return this.formBuilder.group({
      containernumberForm: [''],
      imdgform: [''],
      reeferform: [''],
      oogform: [''],
      damageform: [''],
      isoCode: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewWillEnter() {

  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidLoad() {

    if (this.activeMode != 'view') {
      this.initializeBackButtonCustomHandler();
      this.navBar.backButtonClick = () => {
        if (!this.bookingDetailsForm.dirty && !this.containerDetailsForm.dirty && !this.attachdirtyFlag &&
          !this.specialStowageListDirty && (this.responseModelOriginal != this.responseModel) &&
          !this.reeferDirtyFlag && !this.oogDirtyFlag && !this.damageDirtyFlag && !this.imdgArrayFlag &&
          this.containerDetailsArray.length == this.tempContArray.length &&
          this.nominationsReceived.length == this.tempNomin.length) {
          this.navCtrl.pop();
        } else {
          this.onBackAlert();
        }
      }
    }
  }

  onBackAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'If you continue, your changes will be lost. Do you want to proceed?',
      buttons: [{
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
    alert.present();
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Overwrite Back Button Page Change');
      _this.onBackAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['CA_TYPE', 'DO_TRADE_TYPE', 'PORT_TERMINAL_BERTH_MASTER', 'MODE_OF_TRANSPORT',
      'BOOLEAN', 'MODE_OF_TRANSPORT', 'VGM_REQUIRED', 'CA_NOMINATIONS_TYPE', 'SPECIAL_STOWAGE', 'IMDG_NO',
      'PACKAGING_GROUP'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {

            if (this.definedSetListModel[i].definedSetName == 'CA_TYPE') {
              this.acceptanceTypeList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.acceptanceTypeList != null && this.acceptanceTypeList.length > 0 &&
                this.acceptanceTypeList[0].definedSetValueCode == '') {
                this.acceptanceTypeList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'DO_TRADE_TYPE') {
              this.tradeTypeList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.tradeTypeList != null && this.tradeTypeList.length > 0 && this.tradeTypeList[0].definedSetValueCode == '') {
                this.tradeTypeList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'PORT_TERMINAL_BERTH_MASTER') {
              this.portOfDischargeList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.portOfDischargeList != null && this.portOfDischargeList.length > 0 && this.portOfDischargeList[0].definedSetValueCode == '') {
                this.portOfDischargeList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'BOOLEAN') {
              this.containerNoAvailableList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.containerNoAvailableList != null && this.containerNoAvailableList.length > 0 && this.containerNoAvailableList[0].definedSetValueCode == '') {
                this.containerNoAvailableList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'MODE_OF_TRANSPORT') {
              this.modeOfTransportList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'VGM_REQUIRED') {
              this.vgmRequiredList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.vgmRequiredList.length > 0 && this.vgmRequiredList[0].definedSetValueCode == '') {
                this.vgmRequiredList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'CA_NOMINATIONS_TYPE') {
              this.clientList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'SPECIAL_STOWAGE') {
              this.specialStowageList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'IMDG_NO') {
              this.imdgType = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'PACKAGING_GROUP') {
              this.packagingGroup = this.definedSetListModel[i].definedSetValues;
            }
          }
        },
        error => {
          console.log("casearchdetailview.getDefinedSet() error");
        });
  }

  getIsoCode() {
    this.caProvider.getISOCode(new DocumentMasterModel())
      .subscribe(responseList => {
          let isoCodeMasterReqList = <IsoCodeMasterListModel>responseList;
          this.isoCodeMasterList = isoCodeMasterReqList.isoCodeMasterSos;
        },
        error => {
          console.log("casearchdetailview.getIsoCode() error");
        });
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


  loadCA() {
    this.showLeftButton = false;
    let containerElement: ContainerDetailsModel;
    this.caProvider.getSearchbyIdResult(this.requestwithID).subscribe(
      response => {

        this.responseModel = <ContainerAcceptanceModel>response;
        this.responseModelOriginal = Object.assign({}, this.responseModel);
        this.validityDate = this.parsedate(this.responseModel.validityDate);

        this.hideVGMOption();

        for (let indeX = 0; indeX < this.responseModel.caContainerDetailsSOs.length; indeX++) {

          if ((this.responseModel.caContainerDetailsSOs[indeX].containerStatus != null) &&
            (this.responseModel.caContainerDetailsSOs[indeX].containerStatus.toLowerCase() == "in terminal/yard")) {
            this.responseModel.caContainerDetailsSOs[indeX].containerEditMode = false;
          } else {
            this.responseModel.caContainerDetailsSOs[indeX].containerEditMode = true;
          }

          if ((this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus == null) ||
            (this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus == "")) {
            this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus = "false";
          } else {
            this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus = "true";
          }

          if ((this.responseModel.caContainerDetailsSOs[indeX].reefer == null) ||
            (this.responseModel.caContainerDetailsSOs[indeX].reefer == "")) {
            this.responseModel.caContainerDetailsSOs[indeX].reefer = "false";
          } else {
            this.responseModel.caContainerDetailsSOs[indeX].reefer = "true";
          }

          if ((this.responseModel.caContainerDetailsSOs[indeX].imdg == null) ||
            (this.responseModel.caContainerDetailsSOs[indeX].imdg == "")) {
            this.responseModel.caContainerDetailsSOs[indeX].imdg = "false";
          } else {
            this.responseModel.caContainerDetailsSOs[indeX].imdg = "true";
          }

          if ((this.responseModel.caContainerDetailsSOs[indeX].oog == null) ||
            (this.responseModel.caContainerDetailsSOs[indeX].oog == "")) {
            this.responseModel.caContainerDetailsSOs[indeX].oog = "false";
          } else {
            this.responseModel.caContainerDetailsSOs[indeX].oog = "true";
          }
        }

        this.disableFieldsForNominee(this.responseModel.clientCode);

        this.containerDetailsArray = this.responseModel.caContainerDetailsSOs;
        this.tempContArray = JSON.parse(JSON.stringify(this.containerDetailsArray));

        for (let i = 0; i < this.containerDetailsArray.length; i++) {
          if ((this.containerDetailsArray[i].specialStowageInstructions == "" || this.containerDetailsArray[i].specialStowageInstructions == null) &&
            (this.specialStowageList != null && this.specialStowageList[0] != null)) {
            this.containerDetailsArray[i].specialStowageInstructions = this.specialStowageList[0].definedSetValueCode;
          }
          this.containerDetailsFormArray.push(this.addContainerForm());
        }


        for (let indeX = 0; indeX < this.containerDetailsArray.length; indeX++) {
          this.containerNumberArray.push(this.containerDetailsArray[indeX].containerNumber);
        }

        if (null == this.responseModel.validityDate) {
          this.responseModel.validityDate = this.datepipe.transform(this.responseModel.validityDate);
        }

        if (null == this.responseModel.modeOfTransport) {
          this.responseModel.modeOfTransport = "";
        }

        this.attachReceived = this.responseModel.caAttachSOs;
        this.nominationsReceived = this.responseModel.caNominationsSOs;
        this.tempNomin = JSON.parse(JSON.stringify(this.nominationsReceived));
        for (let i = 0; i < this.nominationsReceived.length; i++) {
          if ((this.nominationsReceived[i].clientType == "" || this.nominationsReceived[i].clientType == null) &&
            (this.clientList != null && this.clientList[0] != null)) {
            this.nominationsReceived[i].clientType = this.clientList[0].definedSetValueCode;
          }
        }

        /*Boolean Flags to Hide/View Fields*/
        if (this.responseModel.acceptanceType == 'Export Full') {
          this.isAccTypeExport = true;
          this.isAccTypeFull = true;
        } else if (this.responseModel.acceptanceType == 'Export Empty') {
          this.isAccTypeExport = true;
          this.isAccTypeFull = false;
        } else if (this.responseModel.acceptanceType == 'Storage Empty') {
          this.isAccTypeExport = false;
          this.isAccTypeFull = false;
        } else if (this.responseModel.acceptanceType == 'Storage Full') {
          this.isAccTypeExport = false;
          this.isAccTypeFull = true;
        }

        for (containerElement of this.containerDetailsArray) {
          if (containerElement.isoCode.startsWith('2')) {
            this.counter20Ft++;
          } else if (containerElement.isoCode.startsWith('4')) {
            this.counter40Ft++;
          } else if (containerElement.isoCode.startsWith('L')) {
            this.counter45Ft++;
          }
        }
      }
    );
  }

  onSubmit() {
    let containerFormValidator = false;

    for (let i = 0; i < this.containerDetailsFormArray.controls.length; i++) {
      if (!((this.containerDetailsFormArray.controls[i].valid == false &&
          this.containerDetailsArray[i].containerEditMode == false) ||
          (this.containerDetailsFormArray.controls[i].valid == true))) {
        containerFormValidator = false;
        break;
      } else {
        containerFormValidator = true;
      }
    }

    if (this.bookingDetailsForm.valid && (!this.isCreator || (this.isCreator && (containerFormValidator == true))) && this.validateNominations()) {

      if (this.validityDate) {
        let formatValidityDate = this.validityDate;
        this.responseModel.validityDate = this.datepipe.transform(formatValidityDate.split("T")[0], 'dd/MM/yyyy');
        formatValidityDate = formatValidityDate.split("T")[1];
        formatValidityDate = formatValidityDate.substr(0, formatValidityDate.lastIndexOf(':'));
        this.responseModel.validityDate = this.responseModel.validityDate + " " + formatValidityDate;
      }

      this.responseModel.caNominationsSOs = this.nominationsReceived;

      if (this.attachReceived.find(element => !element.fileUploadId)) {
        this.presentAlert("Attention", 'Attachments are missing. ');
      } else {
        /*Assigning back container details array to request*/
        this.responseModel.caContainerDetailsSOs = this.containerDetailsArray;
        this.responseModel.caAttachSOs = this.attachReceived;
        this.responseModel.action = "AMEND";
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

    } else {
      this.error = true;
      if (this.containerDetailsForm.invalid) {
        this.moveToSlide(2);
        this.presentAlert('ALERT', 'Enter all mandatory fields');
      } else if (!this.validateNominations()) {
        this.moveToSlide(3);
        this.presentAlert('ALERT', 'Enter all mandatory fields');
      } else if (this.bookingDetailsForm.controls["cainstructions"].invalid) {
        this.moveToSlide(1);
        setTimeout(() => {
          this.content.scrollToBottom(0);
        }, 200);

      }
    }
  }

  moveToSlide(val: number) {
    this.slides.slideTo(val, 500);
    this.resetShowTabs(val);
    this.selectedTab = this.tabs[val];
  }

  proceedWithEdit() {

    this.editPreparation();

    /*Edit Request*/
    this.caProvider.onEdit(this.modelToTransmit).subscribe(
      response => {

        let responseafterEdit: ContainerAcceptanceModel = <ContainerAcceptanceModel>response;

        if (null != responseafterEdit.acceptanceNo) {
          localStorage.setItem('ca_vesselName', responseafterEdit.vesselName);
          if (true == this.fromSummary) {
            localStorage.setItem('showAmendMessage', "true");
            this.navCtrl.pop();
          } else {
            this.navCtrl
              .push(Casearchsummay, {
                acceptanceNo: responseafterEdit.acceptanceNo,
                showAmendMessage: true,
                status: responseafterEdit.status,
                status_icon: this.getStatusIcon(responseafterEdit.status)
              });
          }
        }
      },
      error => {
        this.presentAlert('ALERT', error[0].message);
        console.log("Error Occured <<" + JSON.stringify(error));
        //this.resetOnSubmitError();
      }
    );
  }

  getStatusIcon(statusIcon) {
    switch (statusIcon) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Active Pending':
        return "assets/img/pending.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated In':
        return "assets/img/partial_gated.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Cancel Pending':
        return "assets/img/pending.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  /*resetOnSubmitError() {
    for (let indeX = 0; indeX < this.responseModel.caContainerDetailsSOs.length; indeX++) {

      if ((this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus == null) ||
        (this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus == "")) {
        this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus = "false";
      } else {
        this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus = "true";
      }

      if ((this.responseModel.caContainerDetailsSOs[indeX].reefer == null) ||
        (this.responseModel.caContainerDetailsSOs[indeX].reefer == "")) {
        this.responseModel.caContainerDetailsSOs[indeX].reefer = "false";
      } else {
        this.responseModel.caContainerDetailsSOs[indeX].reefer = "true";
      }

      if ((this.responseModel.caContainerDetailsSOs[indeX].imdg == null) ||
        (this.responseModel.caContainerDetailsSOs[indeX].imdg == "")) {
        this.responseModel.caContainerDetailsSOs[indeX].imdg = "false";
      } else {
        this.responseModel.caContainerDetailsSOs[indeX].imdg = "true";
      }

      if ((this.responseModel.caContainerDetailsSOs[indeX].oog == null) ||
        (this.responseModel.caContainerDetailsSOs[indeX].oog == "")) {
        this.responseModel.caContainerDetailsSOs[indeX].oog = "false";
      } else {
        this.responseModel.caContainerDetailsSOs[indeX].oog = "true";
      }
    }
  }*/

  public editPreparation() {

    this.modelToTransmit = JSON.parse(JSON.stringify(this.responseModel));

    for (let indeX = 0; indeX < this.responseModel.caContainerDetailsSOs.length; indeX++) {
      if ((this.responseModel.caContainerDetailsSOs[indeX].containerNumber) &&
        (this.responseModel.caContainerDetailsSOs[indeX].containerNumber.length != 0) &&
        (this.responseModel.caContainerDetailsSOs[indeX].containerNumber.length < 10)) {
        this.moveToSlide(2);
        this.presentAlert('ALERT',
          "Please enter at least 10 characters for Container Number - Container Detail " + (indeX + 1));
        return;
      }

      if ((this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus != null) &&
        (this.responseModel.caContainerDetailsSOs[indeX].containerDamageStatus.toString() == "true")) {
        this.modelToTransmit.caContainerDetailsSOs[indeX].containerDamageStatus = "on";
      } else {
        delete this.modelToTransmit.caContainerDetailsSOs[indeX].containerDamageStatus;
      }

      if ((this.responseModel.caContainerDetailsSOs[indeX].reefer != null) &&
        (this.responseModel.caContainerDetailsSOs[indeX].reefer.toString() == "true")) {
        this.modelToTransmit.caContainerDetailsSOs[indeX].reefer = "on";
      } else {
        delete this.modelToTransmit.caContainerDetailsSOs[indeX].reefer;
      }

      if ((this.responseModel.caContainerDetailsSOs[indeX].imdg != null) &&
        (this.responseModel.caContainerDetailsSOs[indeX].imdg.toString() == "true")) {
        this.modelToTransmit.caContainerDetailsSOs[indeX].imdg = "on";
      } else {
        delete this.modelToTransmit.caContainerDetailsSOs[indeX].imdg;
      }

      if ((this.responseModel.caContainerDetailsSOs[indeX].oog != null) &&
        (this.responseModel.caContainerDetailsSOs[indeX].oog.toString() == "true")) {
        this.modelToTransmit.caContainerDetailsSOs[indeX].oog = "on";
      } else {
        delete this.modelToTransmit.caContainerDetailsSOs[indeX].oog;
      }

      if ((this.responseModel.caContainerDetailsSOs[indeX].tempScale != null &&
          this.responseModel.caContainerDetailsSOs[indeX].tempScale.toString() == "false") ||
        (this.responseModel.caContainerDetailsSOs[indeX].tempScale == null)) {
        delete this.modelToTransmit.caContainerDetailsSOs[indeX].tempScale;
      } else {
        this.modelToTransmit.caContainerDetailsSOs[indeX].tempScale = "on";
      }
    }
  }

  public filterTabs(tab: string): void {
    setTimeout(() => {
      this.content.scrollToTop(50);
      if (tab === 'Acceptance Details') {
        this.resetShowTabs(0);
      } else if (tab === 'Booking Details') {
        this.resetShowTabs(1);
      } else if (tab === 'Container Details') {
        this.resetShowTabs(2);
      } else if (tab === 'Nominations') {
        this.resetShowTabs(3);
      } else if (tab === 'Attachments') {
        this.resetShowTabs(4);
      }
      this.selectedTab = tab;
    }, 400);
  }

  resetShowTabs(val: number) {
    for (let i = 0; i < this.showTabs.length; i++) {
      if (val == i) {
        this.showTabs[i] = true;
      } else {
        this.showTabs[i] = false;
      }
    }
  }

  hideVGMOption(){
    if(this.responseModel.vgmRequired == "Yes" || this.responseModel.vgmRequired == "Auto Approve"){
      for (var i = 0; i < this.vgmRequiredList.length; i++) {
        if (this.vgmRequiredList[i] != null && this.vgmRequiredList[i].definedSetValueCode == "No") {
          this.vgmRequiredList.splice(i, 1);
          break;
        }
      }
      /*this.vgmRequiredList.
      jQuery("#vgmRequired option[value='No']").hide().prop('disabled', true);
    }else{
      jQuery("#vgmRequired option[value='No']").show().prop('disabled', false);*/
    }
  }

  parsedate(dtstring) {
    if (dtstring != null) {
      let pattern = /(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/;
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace(":", "");
      dtstring = dtstring.replace(" ", "");
      let date = new Date(dtstring.replace(pattern, '$3-$2-$1T$4:$5:00Z'));
      return date.toISOString();
    }
    else {
      return null;
    }
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Dismiss',
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    alert.present();
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
    } else {
      return 'arrow-dropdown';
    }
  }

  openDocs(attachment: CaAttachModel) {
    this.caProvider.uploadDocuments()
      .then(data => {
        attachment.fileName = data.fileName;
        attachment.fileUploadId = data.fileUploadId;
      }, error => {
        console.log("File Open Error in openDocs in searchdetailview");
      });
  }

  addAttachment() {
    this.attachdirtyFlag = true;
    if (this.attachReceived != null && this.attachReceived.length < 5) {
      this.attachReceived.push(new CaAttachModel());
    } else {
      this.presentAlert('ALERT', 'You are not allowed to Upload more than 5 Attachments.');
    }
  }

  closeAttachment(attachment: CaAttachModel) {
    this.attachdirtyFlag = true;
    for (var i = 0; i < this.attachReceived.length; i++) {
      if (this.attachReceived[i] == attachment) {
        this.attachReceived.splice(i, 1);
        break;
      }
    }
  }

  displayattach(attachment: CaAttachModel) {
    this.caProvider.openAttachment(attachment);
  }


  public addContainerEntry(): void {

    if (this.containerDetailsArray.length < 999) {
      let newContainer: ContainerDetailsModel = new ContainerDetailsModel();
      newContainer.containerEditMode = true;
      newContainer.containerDamageStatus = "false";
      newContainer.reefer = "false";
      newContainer.imdg = "false";
      newContainer.oog = "false";
      if (this.specialStowageList != null && this.specialStowageList[0] != null) {
        newContainer.specialStowageInstructions = this.specialStowageList[0].definedSetValueCode;
      }
      this.containerDetailsArray.push(newContainer);
      this.containerDetailsFormArray.push(this.addContainerForm());
    }
  }

  public addNominationEntry(): void {
    let newCaNomination: CaNominationsModel = new CaNominationsModel();
    //newCaNomination.clientType = this.clientList[0].definedSetValueCode;
    /*cannot have duplicate nominations type*/
    if (this.clientList != null && this.nominationsReceived.length < (this.clientList.length - 1)) {
      newCaNomination.clientType = this.clientList[0].definedSetValueCode;
      this.nominationsReceived.push(newCaNomination);
    }
  }

  public removeContainerEntry(index: number): void {
    if (this.containerDetailsArray.length != 1) {
      this.containerDetailsArray.splice(index, 1);
      this.containerDetailsFormArray.removeAt(index);
    }
  }

  onFocusChangeContainerNo(containerIndex: any, item: ContainerDetailsModel) {

    if (this.validate(item.containerNumber, '^[A-Z]{4}[0-9]{6,7}$')) {
      item.containerNumber = "";
      this.presentAlert("Attention", "Invalid Container Number");
      return;
    }

    let searchMatch: ContainerDetailsModel[];
    if (item.containerNumber && item.containerNumber != "") {
      if (this.containerDetailsArray.length == 1) {
        this.containerDetailsArray[containerIndex].containerNumber = item.containerNumber;

        let verifyContainerNo = new ContainerDetailsModel();
        verifyContainerNo.caId = this.responseModel.acceptanceNo;
        verifyContainerNo.containerNumber = this.containerDetailsArray[containerIndex].containerNumber;
        this.caProvider.verifyContainerNo(verifyContainerNo)
          .subscribe(response => {
            if (response != 0) {
              this.containerDetailsArray[containerIndex].containerNumber = "";
              console.log("<<Response<<" + JSON.stringify(response) + ">>");
              this.presentAlert("Attention",
                "Acceptance " + response + " has been created for the given container number");
            }
          });
      } else {
        searchMatch = this.containerDetailsArray.filter(element =>
          (element.containerNumber != null && element.containerNumber != "" && item.containerNumber != null &&
            element.containerNumber.toLowerCase() == item.containerNumber.toLowerCase())
        );
        if (searchMatch && searchMatch.length == 2) {
          //same type of nominee already present
          this.containerDetailsArray[containerIndex].containerNumber = "";
          this.containerDetailsArray[containerIndex].dropDown = "true";
          this.containerDetailsArray[containerIndex].containerEditMode = true;
          setTimeout(() => {
            this.presentAlert('ALERT', "Container Number already exists");
          }, 200);
        } else {
          this.containerDetailsArray[containerIndex].containerNumber = item.containerNumber;

          let verifyContainerNo = new ContainerDetailsModel();
          if (this.specialStowageList != null && this.specialStowageList[0] != null) {
            verifyContainerNo.specialStowageInstructions = this.specialStowageList[0].definedSetValueCode;
          }
          verifyContainerNo.caId = this.responseModel.acceptanceNo;
          verifyContainerNo.containerNumber = this.containerDetailsArray[containerIndex].containerNumber;
          this.caProvider.verifyContainerNo(verifyContainerNo)
            .subscribe(response => {
                if (response != 0) {
                  this.containerDetailsArray[containerIndex].containerNumber = "";
                  this.presentAlert("Attention",
                    "Acceptance " + response + " has been created for the given container number");
                }
              },
              error => {

              });
        }
      }
    }
  }

  hideRemoveOptionforNominee(): boolean {
    let retStatus: boolean;
    if (this.editMode && this.isCreator) {
      if (this.nominationsReceived.length == 1) {
        retStatus = false;
      } else {
        retStatus = true;
      }
    } else {
      retStatus = false;
    }
    return retStatus;
  }

  public removeNominationEntry(indeX: number): void {
    if (this.nominationsReceived.length != 1) {
      this.nominationsReceived.splice(indeX, 1);
    }
  }

  onNominationCharchange(ev: any, nominIndex: number) {

    this.filterNominationArray = this.nominationRespCodeModel;
    this.nominationsReceived[nominIndex].name = '';

    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.nominationsReceived[nominIndex].code;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.filterNominationArray = this.filterNominationArray.filter((item) => {
        if (item.companyCode.toString().toLowerCase().startsWith(val.toString().toLowerCase())) {
          this.nominationsReceived[nominIndex].showNominationSug = true;
        }
        return (item.companyCode.toString().toLowerCase().startsWith(val.toString().toLowerCase()));
      })
    } else {
      this.nominationsReceived[nominIndex].showNominationSug = false;
    }
  }

  onNominationFocus(clientType: string, nominIndex: number) {
    this.verifyClientCode = true;
    let clientCodeModel: CaNominationsModel = new CaNominationsModel();
    clientCodeModel.clientType = clientType;
    clientCodeModel.companyCode = '';
    clientCodeModel.companyName = '';

    this.caProvider.getClientCode(clientCodeModel).subscribe(
      response => {
        this.nominationRespCodeModel = <CaNominationsModel[]>response.list;
        if (this.verifyClientCode) {
          this.onNominationCharchange(null, nominIndex);
        }
      }
    );
  }

  hideNominationSuggestion(nominIndex: number, nominationElement: CaNominationsModel) {
    setTimeout(() => {
      if (nominationElement.code && nominationElement.code.length > 0 && this.verifyClientCode) {
        if (this.validate(nominationElement.code, '^[0-9a-zA-Z]{0,255}$')) {
          this.nominationsReceived[nominIndex].companyCode = '';
          this.nominationsReceived[nominIndex].companyName = '';
          this.nominationsReceived[nominIndex].code = "";
          this.presentAlert("Attention", 'Entered Client Code is Invalid.');
          return;
        }
        this.disableSubmit = true;
        let clientCodeModel: CaNominationsModel = new CaNominationsModel();
        let searchMatch: CaNominationsModel = new CaNominationsModel();
        let clientVerificationResponseArray: CaNominationsModel[];
        clientCodeModel.clientType = nominationElement.clientType;
        clientCodeModel.companyCode = nominationElement.code;
        clientCodeModel.companyName = nominationElement.companyName;

        this.caProvider.getClientCode(clientCodeModel).subscribe(
          response => {
            clientVerificationResponseArray = <CaNominationsModel[]>response.list;
            if (clientVerificationResponseArray.length == 0) {
              this.nominationsReceived[nominIndex].companyCode = '';
              this.nominationsReceived[nominIndex].companyName = '';
              this.nominationsReceived[nominIndex].code = "";
              this.nominationsReceived[nominIndex].name = "";
              this.presentAlert("Attention", 'Entered Client Code is Invalid.');
            } else {
              searchMatch = clientVerificationResponseArray.find(element =>
                element.companyCode.toString().toLowerCase() ==
                this.nominationsReceived[nominIndex].code.toString().toLowerCase())
              if (!searchMatch) {
                this.nominationsReceived[nominIndex].companyCode = '';
                this.nominationsReceived[nominIndex].companyName = '';
                this.nominationsReceived[nominIndex].code = "";
                this.nominationsReceived[nominIndex].name = "";
                this.presentAlert("Attention", 'Entered Client Code is Invalid.');
              } else {
                this.nominationsReceived[nominIndex].companyCode = searchMatch.companyCode;
                this.nominationsReceived[nominIndex].name = searchMatch.companyName;
              }
            }
            this.disableSubmit = false;
          },
          error => {
            this.disableSubmit = false;
          }
        );
        this.nominationsReceived[nominIndex].showNominationSug = false;
        this.verifyClientCode = false;
      }
    }, 500);

  }

  onSelectNominationCode(item: CaNominationsModel, nominIndex: number) {
    this.verifyClientCode = false;
    this.nominationsReceived[nominIndex].code = item.companyCode;
    this.nominationsReceived[nominIndex].name = item.companyName;
    this.nominationsReceived[nominIndex].showNominationSug = false;
  }

  onSpclStwgChange() {
    this.specialStowageListDirty = true;
  }

  onNominationTypeChange(nominIndex: number, item: CaNominationsModel) {
    let searchMatch: CaNominationsModel[];
    if (this.nominationsReceived.length == 1) {
      this.nominationsReceived[nominIndex].clientType = item.clientType;
      this.nominationsReceived[nominIndex].code = "";
      this.nominationsReceived[nominIndex].companyCode = "";
      this.nominationsReceived[nominIndex].name = "";
      this.nominationsReceived[nominIndex].companyName = "";
      this.nominationsReceived[nominIndex].dropDown = "true";
    } else {
      if (item.clientType != '') {
        searchMatch = this.nominationsReceived.filter(element =>
          element.clientType == item.clientType
        );
        if (searchMatch && searchMatch.length == 2) {
          //same type of nominee already present
          this.nominationsReceived[nominIndex] = new CaNominationsModel();
          this.nominationsReceived[nominIndex].code = "";
          this.nominationsReceived[nominIndex].companyCode = "";
          this.nominationsReceived[nominIndex].name = "";
          this.nominationsReceived[nominIndex].clientType = "";
          this.nominationsReceived[nominIndex].companyName = "";
          this.nominationsReceived[nominIndex].dropDown = "true";
          setTimeout(() => {
            this.presentAlert('ALERT', "Client type already selected");
          }, 200);
        } else {
          this.nominationsReceived[nominIndex] = new CaNominationsModel();
          this.nominationsReceived[nominIndex].code = "";
          this.nominationsReceived[nominIndex].companyCode = "";
          this.nominationsReceived[nominIndex].name = "";
          this.nominationsReceived[nominIndex].companyName = "";
          this.nominationsReceived[nominIndex].clientType = item.clientType;
          this.nominationsReceived[nominIndex].dropDown = "true";
        }
      } else {
        this.nominationsReceived[nominIndex] = new CaNominationsModel();
        this.nominationsReceived[nominIndex].code = "";
        this.nominationsReceived[nominIndex].companyCode = "";
        this.nominationsReceived[nominIndex].name = "";
        this.nominationsReceived[nominIndex].clientType = "";
        this.nominationsReceived[nominIndex].companyName = "";
        this.nominationsReceived[nominIndex].dropDown = "true";
      }
    }
  }

  openModalIMDG(index: any) {

    let profileModal = this.modalCtrl.create(CAIMGDModelComponent, {
      IMDGList: this.containerDetailsArray[index].imdgDetailsSOs,
      IMDGMasterList: this.imdgType,
      mode: this.editMode,
      creator: this.isCreator,
      containerEditMode: this.containerDetailsArray[index].containerEditMode,
      imdgFlag: this.containerDetailsArray[index].imdgFlag,
      packagingList: this.packagingGroup
    });
    profileModal.onDidDismiss(data => {
      if (null != data) {
        this.containerDetailsArray[index].imdgDetailsSOs = data.imdgDetailArray;
        /*this.imdgDirtyFlag = data.dirtyFlag;*/
        this.imdgArrayFlag = data.imdgArrayFlag;
      }
    });
    profileModal.present();
  }

  openModalReefer(index: any) {
    let profileModal = this.modalCtrl.create(CAReeferModelComponent, {
      containerElement: this.containerDetailsArray[index],
      mode: this.editMode,
      creator: this.isCreator,
      containerEditMode: this.containerDetailsArray[index].containerEditMode,
      reeferFlag: this.containerDetailsArray[index].reeferFlag
    });
    profileModal.onDidDismiss(data => {
      if (null != data) {
        this.containerDetailsArray[index] = data.containerEle;
        this.reeferDirtyFlag = data.dirtyFlag;
        if (this.containerDetailsArray[index].minTemp != null && this.containerDetailsArray[index].minTemp.endsWith(".")) {
          this.containerDetailsArray[index].minTemp = this.containerDetailsArray[index].minTemp.substring(0, this.containerDetailsArray[index].minTemp.length - 1);
        }
        if (this.containerDetailsArray[index].maxTemp != null && this.containerDetailsArray[index].maxTemp.endsWith(".")) {
          this.containerDetailsArray[index].maxTemp = this.containerDetailsArray[index].maxTemp.substring(0, this.containerDetailsArray[index].maxTemp.length - 1);
        }
        if (this.containerDetailsArray[index].ventOpen != null && this.containerDetailsArray[index].ventOpen.endsWith(".")) {
          this.containerDetailsArray[index].ventOpen = this.containerDetailsArray[index].ventOpen.substring(0, this.containerDetailsArray[index].ventOpen.length - 1);
        }
        if (this.containerDetailsArray[index].humidity != null && this.containerDetailsArray[index].humidity.endsWith(".")) {
          this.containerDetailsArray[index].humidity = this.containerDetailsArray[index].humidity.substring(0, this.containerDetailsArray[index].humidity.length - 1);
        }
        if ((this.containerDetailsArray[index].tempScale != null &&
            this.containerDetailsArray[index].tempScale.toString() == "false") ||
          (this.containerDetailsArray[index].tempScale == null)) {
          this.containerDetailsArray[index].tempScale = null;
        } else {
          this.containerDetailsArray[index].tempScale = "on";
        }
      }
    });
    profileModal.present();
  }

  openModalDamage(index: any) {

    let profileModal = this.modalCtrl.create(CADamageModelComponent, {
      damageCondition: this.containerDetailsArray[index].damageCondition,
      damageLocation: this.containerDetailsArray[index].damageLocation,
      damageItem: this.containerDetailsArray[index].damageItem,
      damageCount: this.containerDetailsArray[index].damageCount,
      damageWidth: this.containerDetailsArray[index].damageWidth,
      damageHeight: this.containerDetailsArray[index].damageHeight,
      damageLength: this.containerDetailsArray[index].damageLength,
      damageRemarks: this.containerDetailsArray[index].damageRemarks,
      containerEditMode: this.containerDetailsArray[index].containerEditMode,
      mode: this.editMode
    });
    profileModal.onDidDismiss(data => {

      if (null != data) {
        this.containerDetailsArray[index].damageCondition = data.damageCondition;
        this.containerDetailsArray[index].damageLocation = data.damageLocation;
        this.containerDetailsArray[index].damageItem = data.damageItem;
        this.containerDetailsArray[index].damageCount = data.damageCount;
        this.containerDetailsArray[index].damageWidth = data.damageWidth;
        this.containerDetailsArray[index].damageHeight = data.damageHeight;
        this.containerDetailsArray[index].damageLength = data.damageLength;
        if (this.containerDetailsArray[index].damageWidth != null &&
          this.containerDetailsArray[index].damageWidth.endsWith(".")) {
          this.containerDetailsArray[index].damageWidth =
            this.containerDetailsArray[index].damageWidth.substring(0, this.containerDetailsArray[index].damageWidth.length - 1);
        }
        if (this.containerDetailsArray[index].damageHeight != null &&
          this.containerDetailsArray[index].damageHeight.endsWith(".")) {
          this.containerDetailsArray[index].damageHeight =
            this.containerDetailsArray[index].damageHeight.substring(0, this.containerDetailsArray[index].damageHeight.length - 1);
        }
        if (this.containerDetailsArray[index].damageLength != null &&
          this.containerDetailsArray[index].damageLength.endsWith(".")) {
          this.containerDetailsArray[index].damageLength =
            this.containerDetailsArray[index].damageLength.substring(0, this.containerDetailsArray[index].damageLength.length - 1);
        }
        this.containerDetailsArray[index].damageRemarks = data.damageRemarks;
        this.damageDirtyFlag = data.dirtyFlag;
      }
    });
    profileModal.present();
  }

  openModalOOG(index: any) {
    let profileModal = this.modalCtrl.create(CAOOGModelComponent, {
      containerElement: this.containerDetailsArray[index],
      mode: this.editMode,
      creator: this.isCreator,
      containerEditMode: this.containerDetailsArray[index].containerEditMode,
      oogFlag: this.containerDetailsArray[index].oogFlag
    });
    profileModal.onDidDismiss(data => {

      if (null != data) {
        this.containerDetailsArray[index] = data.containerElement;
        this.oogDirtyFlag = data.dirtyFlag;
        if (this.containerDetailsArray[index] != null && this.containerDetailsArray[index].oogHeight != null &&
          this.containerDetailsArray[index].oogHeight.endsWith(".")) {
          this.containerDetailsArray[index].oogHeight = this.containerDetailsArray[index].oogHeight.substring(0, this.containerDetailsArray[index].oogHeight.length - 1);
        }
        if (this.containerDetailsArray[index] != null && this.containerDetailsArray[index].oogBack != null &&
          this.containerDetailsArray[index].oogBack.endsWith(".")) {
          this.containerDetailsArray[index].oogBack = this.containerDetailsArray[index].oogBack.substring(0, this.containerDetailsArray[index].oogBack.length - 1);
        }
        if (this.containerDetailsArray[index] != null && this.containerDetailsArray[index].oogFront != null &&
          this.containerDetailsArray[index].oogFront.endsWith(".")) {
          this.containerDetailsArray[index].oogFront = this.containerDetailsArray[index].oogFront.substring(0, this.containerDetailsArray[index].oogFront.length - 1);
        }
        if (this.containerDetailsArray[index] != null && this.containerDetailsArray[index].oogLeft != null &&
          this.containerDetailsArray[index].oogLeft.endsWith(".")) {
          this.containerDetailsArray[index].oogLeft = this.containerDetailsArray[index].oogLeft.substring(0, this.containerDetailsArray[index].oogLeft.length - 1);
        }
        if (this.containerDetailsArray[index] != null && this.containerDetailsArray[index].oogRight != null &&
          this.containerDetailsArray[index].oogRight.endsWith(".")) {
          this.containerDetailsArray[index].oogRight = this.containerDetailsArray[index].oogRight.substring(0, this.containerDetailsArray[index].oogRight.length - 1);
        }
      }
    });
    profileModal.present();
  }

  onSelectionChangedofISO(currentIsoCode: string, indeX: number) {
    if (this.disableOOGToggle(currentIsoCode)) {
      this.containerDetailsArray[indeX].oog = "false";
    }

    if (this.disableReeferToogle(currentIsoCode)) {
      this.containerDetailsArray[indeX].reefer = "false";
    }
  }

  disableReeferToogle(currentIsoCode: string) {
    if (currentIsoCode && currentIsoCode.includes("REEFER")) {
      return false;
    } else {
      return true;
    }
  }

  disableOOGToggle(currentIsoCode: string) {
    var searchHit;
    if (currentIsoCode) {
      searchHit = this.oogIsoCodeList.find(element =>
        element.startsWith(currentIsoCode.split(" - ")[0])
      );
    }
    if (!searchHit) {
      return true;
    } else {
      return false;
    }
  }

  reInitializeIMDG(indeX: number) {
    this.containerDetailsArray[indeX].imdgDetailsSOs = new Array<ImdgDetailsModel>();
    this.containerDetailsArray[indeX].imdgDetailsSOs.push(new ImdgDetailsModel());
  }

  reInitializeOOG(indeX: number) {
    this.containerDetailsArray[indeX].oogHeight = null;
    this.containerDetailsArray[indeX].oogFront = null;
    this.containerDetailsArray[indeX].oogBack = null;
    this.containerDetailsArray[indeX].oogLeft = null;
    this.containerDetailsArray[indeX].oogRight = null;
  }

  reInitializeReefer(indeX: number) {
    this.containerDetailsArray[indeX].tempScale = null;
    this.containerDetailsArray[indeX].minTemp = null;
    this.containerDetailsArray[indeX].maxTemp = null;
    this.containerDetailsArray[indeX].ventOpen = null;
    this.containerDetailsArray[indeX].humidity = null;
  }

  reInitializeDamage(indeX: number) {
    this.containerDetailsArray[indeX].damageCondition = null;
    this.containerDetailsArray[indeX].damageLocation = null;
    this.containerDetailsArray[indeX].damageItem = null;
    this.containerDetailsArray[indeX].damageCount = null;
    this.containerDetailsArray[indeX].damageWidth = null;
    this.containerDetailsArray[indeX].damageHeight = null;
    this.containerDetailsArray[indeX].damageLength = null;
    this.containerDetailsArray[indeX].damageRemarks = null;
  }

  disableFieldsForNominee(clientCode: string) {
    if ((this.securityUtility.canCreate(this.securityUtility.CONTAINER_ACCEPTANCE) == true) &&
      (localStorage.getItem('CLIENT_CODE') == clientCode)) {
      this.isCreator = true;
    } else {
      /*Logged in User is Nominee*/
      this.isCreator = false;
    }
  }

  showRemoveOptionforContainer(containerIndeX: number): boolean {
    let retStatus: boolean;
    if (this.editMode && this.isCreator && this.responseModel.caContainerDetailsSOs[containerIndeX].containerEditMode) {
      if (this.containerDetailsArray.length == 1) {
        retStatus = false;
      } else {
        retStatus = true;
      }
    } else {
      retStatus = false;
    }
    return retStatus;
  }

  disableToggleButtons(containerIndeX: number): boolean {
    return (!this.editMode ||
      this.editMode && (!this.containerDetailsArray[containerIndeX].containerEditMode || !this.isCreator));
    /*return (!this.editMode || (this.editMode && !this.isCreator));*/
  }

  enableInputForNominee(clientType: string): boolean {
    let retStatus: boolean;
    if (this.editMode && (this.isCreator || (!this.isCreator && !clientType))) {
      retStatus = true;
    } else {
      retStatus = false;
    }
    return retStatus;
  }

  public disableNominationSearch(clientType: string): boolean {
    if (clientType && clientType.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  onValidityDateChanged() {
    let vesselCutOff;
    if (this.isAccTypeExport) {
      if (this.responseModel.vesselCutOffTime && this.responseModel.vesselCutOffTime.length > 0) {
        vesselCutOff = this.transformDateTime(this.responseModel.vesselCutOffTime);
      } else {
        this.validityDate = '';
      }
    } else {
      if (this.responseModel.storageFrom && this.responseModel.storageTo) {

      }
    }

    if (this.validityDate && this.validityDate != '') {
      let futureTime: any = new Date();
      futureTime = futureTime.getTime() - (futureTime.getTimezoneOffset() * 60 * 1000);
      let diffInMs: number = Date.parse(this.validityDate) - futureTime;
      let diffInHours: number = diffInMs / 1000 / 60 / 60;

      if (this.isAccTypeExport) {
        if (diffInHours < 2) {
          setTimeout(() => {
            this.validityDate = '';
            this.presentAlert('ATTENTION', 'Validity date should be atleast 2 hours ahead of current time');
          }, 200);
        } else if (Date.parse(this.validityDate) > Date.parse(vesselCutOff)) {
          setTimeout(() => {
            this.validityDate = '';
            this.presentAlert('ATTENTION', 'Validity date cannot be greater than vessel cut off date');
          }, 200);
        }
      } else {
        let toDate: Date = new Date(this.formatDate(this.responseModel.storageTo));
        let fromDate: Date = new Date(this.formatDate(this.responseModel.storageFrom));
        toDate.setHours(toDate.getHours() + 23);
        toDate.setMinutes(toDate.getMinutes() + 59);
        if (Date.parse(this.validityDate) > Date.parse(toDate.toISOString())) {
          setTimeout(() => {
            this.validityDate = '';
            this.presentAlert('ATTENTION', 'Validity date cannot be greater than Storage To date');
          }, 200);
        } else if (Date.parse(this.validityDate) < Date.parse(fromDate.toISOString())) {
          setTimeout(() => {
            this.validityDate = '';
            this.presentAlert('ATTENTION', 'Validity date should be greater than Storage From date');
          }, 200);
        } else if (diffInHours < 2) {
          setTimeout(() => {
            this.validityDate = '';
            this.presentAlert('ATTENTION', 'Validity date should be atleast 2 hours ahead of current time');
          }, 200);
        }
      }
    }
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

  parseClientType(clientType: string): string {
    let searchHit: DefinedSetResModel = this.clientList.find(element =>
      element.definedSetValueCode == clientType);
    if (clientType == this.clientList[0].definedSetValueCode) {
      return clientType;
    } else {
      if (searchHit) {
        return searchHit.definedSetValueIntMessage;
      } else {
        return clientType;
      }
    }
  }

  nomineeEditEnabler(containerIndex: number): boolean {
    if (!this.containerNumberArray[containerIndex]) {
      return true;
    } else {
      return false;
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model, tIndex) {
    this.utils.keyUpValidate(e, format);
    let formatLetter = /^[a-zA-Z]*$/i;
    let formatDigit = /^[0-9]*$/i;
    if (model == 'containernumber') {
      let formatLetter = /^[A-Za-z]*$/i;
      let formatDigit = /^[0-9]*$/i;

      let firstSplitWord: string = '';
      let secondSplitWord: string = '';

      if (this.containerDetailsArray[tIndex].containerNumber.length <= 4) {
        firstSplitWord = e.target.value.toString().substr(0, e.target.value.length);
        if (formatLetter.test(firstSplitWord)) {
          this.previousContainerNo = e.target.value.toUpperCase();
          this.containerDetailsArray[tIndex].containerNumber = e.target.value.toUpperCase();
        } else {
          this.containerDetailsArray[tIndex].containerNumber = this.previousContainerNo;
        }
      } else {
        firstSplitWord = e.target.value.toString().substr(0, 4);
        secondSplitWord = e.target.value.toString().substr(4, e.target.value.length - 1);
        if (/*formatLetter.test(firstSplitWord) &&*/ formatDigit.test(secondSplitWord)) {
          this.previousContainerNo = e.target.value.toUpperCase();
          this.containerDetailsArray[tIndex].containerNumber = e.target.value.toUpperCase();
        } else {
          this.containerDetailsArray[tIndex].containerNumber = this.previousContainerNo;
        }
      }
    }
    else if (model == 'clientcode') {
      this.nominationsReceived[tIndex].code = e.target.value;
    }
  }

  onPaste(e: any, tIndex: any, item: ContainerDetailsModel) {

    // Do stuff
    setTimeout(() => {
      item.containerNumber = item.containerNumber.toUpperCase();
      this.onFocusChangeContainerNo(tIndex, item);
    });
    // Then clear pasted content from the input
  }

  formatDate(dateString) {
    var tempDate = dateString.split('/');
    var formattedDate;
    formattedDate = new Date(tempDate[1] + "/" + tempDate[0] + "/" + tempDate[2] + " GMT");
    return Date.parse(formattedDate);
  }

  patternCheck(format, value) {
    if (format.test(value)) {
      return true;
    }
    else {
      return false;
    }
  }

  validate(model, format) {
    if (model != null && model.length > 0) {
      let pattern = new RegExp(format);
      try {
        if (pattern.test(model)) {
          return false;
        } else {
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

  validateNominations(): boolean {
    if (this.nominationsReceived != null) {
      for (let indeX = 0; indeX < this.nominationsReceived.length; indeX++) {
        /!*provided a client Type and code is still empty*!/
        if (this.isNominationValid(indeX)) {
          return false;
        }
      }
      return true;
    } else {
      /!*Nomination Received Array is Null*!/
      return false;
    }
  }


  isNominationValid(indeX: number): boolean {
    if ((this.nominationsReceived[indeX].clientType != "") && (this.nominationsReceived[indeX].code == null || this.nominationsReceived[indeX].code == '')) {
      return true;
    }
    else {
      return false;
    }
  }

}
