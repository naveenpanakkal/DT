import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {
  AlertController, IonicPage, ModalController, NavController,
  NavParams, Slides, Navbar, Platform, Content
} from 'ionic-angular';
import {ContaineracceptanceProvider} from "../../providers/webservices/containeracceptanceservices";
import {ContainerAcceptanceModel} from "../../shared/model/containeracceptance/containeracceptance.model";
import {CaAttachModel} from "../../shared/model/containeracceptance/caattach.model";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RotationNoSearchReqModel} from "../../shared/model/containeracceptance/rotationnosearch/rotationnosearchreq.model";
import {RotationNoSearchResultList} from "../../shared/model/containeracceptance/rotationnosearch/rotationnosearchresultlist.model";
import {RotationNoSearchResultModel} from "../../shared/model/containeracceptance/rotationnosearch/rotationnosearchresult.model";
import {PortTerminalMasterModel} from "../../shared/model/containeracceptance/portterminal/portterminalmaster.model";
import {PortTerminalMasterListModel} from "../../shared/model/containeracceptance/portterminal/portterminalmaster-list.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {DocumentMasterModel} from "../../shared/model/containeracceptance/isocode/documentmaster.model";
import {IsoCodeMasterListModel} from "../../shared/model/containeracceptance/isocode/isocodemaster-list.model";
import {IsoCodeMasterModel} from "../../shared/model/containeracceptance/isocode/isocodemaster.model";
import {CAIMGDModelComponent} from "../../components/camodelpages/caimdgmodelpage/caimdgmodel";
import {CAReeferModelComponent} from "../../components/camodelpages/careefermodelpage/careefermodel";
import {CADamageModelComponent} from "../../components/camodelpages/cadamagemodalpage/cadamagemodel";

import {ContainerDetailsModel} from "../../shared/model/containeracceptance/containerdetails.model";
import {CAOOGModelComponent} from "../../components/camodelpages/caoogmodelpage/caoogmodel";
import {CaNominationsModel} from "../../shared/model/containeracceptance/canominations.model";
import {DatePipe} from "@angular/common";
import {Casearchsummay} from "../casearchsummay/casearchsummay";
import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {ImdgDetailsModel} from "../../shared/model/containeracceptance/imdgdetails.model";
import {VoyagedetailsPage} from "../voyagedetails/voyagedetails";
import {ValidationService} from "../../shared/validation.service";


/**
 * Generated class for the CacreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cacreate',
  templateUrl: 'cacreate.html',
  providers: [Utils]
})
export class CacreatePage {

  @ViewChild(Slides) slides: Slides;
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;

  linerPattern: string = "^[a-z0-9A-Z]{0,30}$";
  public selectedTab: any;
  public tabs: Array<any>;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  clientTypeSelected: boolean = false;

  disableValidityDate: boolean = true;
  disableRotationNo: boolean = true;
  hideRotationNoInfo: boolean = true;

  /* Tab Order
  0 - AcceptanceDetails
  1 - BookingDetails
  2 - ContainerDetails
  3 - Nominations
  4 - Attachments */
  public showTabs: Array<boolean> = [false, false, false, false, false];

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

  locationModel: ContainerAcceptanceModel = new ContainerAcceptanceModel();
  spNameModel: ContainerAcceptanceModel = new ContainerAcceptanceModel();
  boxOperatorModel: ContainerAcceptanceModel = new ContainerAcceptanceModel();
  locationList: any[] = [];
  spNameList: any[] = [];
  previousContainerNo: string = '';


  selectedModel: ContainerAcceptanceModel = new ContainerAcceptanceModel();
  modelToTransmit: ContainerAcceptanceModel

  containerDetails: ContainerDetailsModel[] = new Array<ContainerDetailsModel>();
  nominationsReceived: CaNominationsModel[] = new Array<CaNominationsModel>();
  attachments: CaAttachModel[] = [];

  nominationRespCodeModel: CaNominationsModel[];
  filterNominationArray: CaNominationsModel[];
  // showNominationSug: boolean = false;

  public rotationNoRespArray: RotationNoSearchResultModel[];
  public portTerminalRespArray: PortTerminalMasterModel[];
  public definedSetListModel: DefinedsetresListModel[];

  isoCodeMasterList: IsoCodeMasterModel[] = [];
  isoSelectedOption: any[];
  showRotationNo: boolean = false;
  showPlaceOfReceipt: boolean = false;
  showFinalPortOfDestination: boolean = false;

  isAcceptanceType: boolean = false;

  verifyValidRotationNo: boolean = false;
  verifyPlaceOfReceipt: boolean = false;
  verifyFinalPortOfDestination: boolean = false;
  verifyClientCode: boolean = false;

  filterRotationArray: any;
  filterPortNameArray: any;

  isAccTypeExport: boolean = false;
  isAccTypeFull: boolean = false;
  disableSubmit: boolean = false;

  acceptanceDetailsForm: FormGroup;
  bookingDetailsForm: FormGroup;
  informationForm: FormGroup;

  containerDetailsForm: FormGroup;

  containerDetailsFormArray: FormArray;

  dateTimeFormat: string = 'DD/MM/YYYY HH:mm';
  dateTimeFormatplaceHolder: string = 'DD/MM/YYYY HH:MM';
  dateFormat: string = 'DD/MM/YYYY';
  storageFrom: any;
  storageTo: any;
  validityDate: any;
  currDate: string = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();

  oogIsoCodeList: string[] = [];

  error: boolean = false;

  public unregisterBackButtonAction: any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private cdRef: ChangeDetectorRef,
              public formBuilder: FormBuilder, private caProvider: ContaineracceptanceProvider, private commonServices: CommonservicesProvider,
              public datepipe: DatePipe, public utils: Utils, public keyboard: Keyboard, public platform: Platform) {

    this.tabs = ['Acceptance Details', 'Nominations', 'Attachments'];
    // Select it by default
    this.selectedTab = this.tabs[0];
    // Check which arrows should be shown
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;
    this.getDefinedSet();
    this.initializeFeildValidation();
    this.resetShowTabs(0);
    this.getLocation();
    this.getIsoCode();


    this.oogIsoCodeList.push("4960");
    this.oogIsoCodeList.push("22G2");
    this.oogIsoCodeList.push("22U1");
    this.oogIsoCodeList.push("25U1");
    this.oogIsoCodeList.push("42U1");
    this.oogIsoCodeList.push("45U6");
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
      console.log('Overwrite Back Button Page Change');
      _this.backAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  backAlert() {

    if (!this.acceptanceDetailsForm.dirty && this.attachments.length == 0 &&
      (this.nominationsReceived.length == 1 && this.nominationsReceived[0].clientType == '')) {
      this.navCtrl.pop();
    } else {
      let alert = this.alertCtrl.create({
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

            },
          }]
      });
      alert.present();
    }
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
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
              if (this.acceptanceTypeList.length > 0 && this.acceptanceTypeList[0].definedSetValueCode == '') {
                this.acceptanceTypeList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'DO_TRADE_TYPE') {
              this.tradeTypeList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.tradeTypeList.length > 0 && this.tradeTypeList[0].definedSetValueCode == '') {
                this.tradeTypeList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'PORT_TERMINAL_BERTH_MASTER') {
              this.portOfDischargeList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.portOfDischargeList.length > 0 && this.portOfDischargeList[0].definedSetValueCode == '') {
                this.portOfDischargeList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'BOOLEAN') {
              this.containerNoAvailableList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.containerNoAvailableList.length > 0 && this.containerNoAvailableList[0].definedSetValueCode == '') {
                this.containerNoAvailableList.splice(0, 1);
              }
              this.selectedModel.containerNumberAvailable = this.containerNoAvailableList[0].definedSetValueCode;
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
          let newContainer: ContainerDetailsModel = new ContainerDetailsModel();
          newContainer.specialStowageInstructions = this.specialStowageList[0].definedSetValueCode;
          this.containerDetails.push(newContainer);
          this.containerDetailsFormArray.push(this.addContainerForm());
          let newCaNomination: CaNominationsModel = new CaNominationsModel();
          newCaNomination.clientType = this.clientList[0].definedSetValueCode;
          this.nominationsReceived.push(newCaNomination);
        },
        error => {
          //Show error message
        });
  }

  getLocation() {
    let listAllLocation: Array<any> = [];
    this.caProvider.getLocationMaster(new ContainerAcceptanceModel(), true)
      .subscribe(response => {
          this.locationModel = <ContainerAcceptanceModel>response;
          for (let i = 0; i < this.locationModel.locationMasterList.length; i++) {
            listAllLocation.push(this.locationModel.locationMasterList[i].spLocationName);
          }
          this.locationList = Array.from(new Set(listAllLocation));
        },
        error => {
          //Show error message
        });
  }

  getServiceProviderName() {
    let listAllspName: Array<any> = [];
    let spModel = new ContainerAcceptanceModel();
    spModel.location = this.selectedModel.location;
    this.caProvider.getSpNameMaster(spModel)
      .subscribe(response => {
          this.spNameModel = <ContainerAcceptanceModel>response;
          for (let i = 0; i < this.spNameModel.spNameMasterList.length; i++) {
            if (this.spNameModel.spNameMasterList[i].spSubLocationName.trim().length > 0) {
              listAllspName.push(this.spNameModel.spNameMasterList[i].spSubLocationName);
            }
          }
          this.spNameList = Array.from(new Set(listAllspName));
        },
        error => {
          //Show error message
        });
  }

  getBoxOperatorMaster() {
    let boModel = new ContainerAcceptanceModel();
    boModel.location = this.selectedModel.location;
    boModel.serviceProvider = this.selectedModel.serviceProvider;
    this.caProvider.getBoxOperatorMaster(boModel)
      .subscribe(response => {
          this.boxOperatorModel = <ContainerAcceptanceModel>response;
          for (let i = 0; i < this.boxOperatorModel.boxOperatorMaster.length; i++) {
            if (this.boxOperatorModel.boxOperatorMaster[i].trim().length == 0) {
              this.boxOperatorModel.boxOperatorMaster.splice(i, 1);
            }
          }
        },
        error => {
          //Show error message
        });
  }

  getIsoCode() {
    this.caProvider.getISOCode(new DocumentMasterModel())
      .subscribe(responseList => {
          let isoCodeMasterReqList = <IsoCodeMasterListModel>responseList;
          this.isoCodeMasterList = isoCodeMasterReqList.isoCodeMasterSos;
        },
        error => {
          //Show error message
        });
  }

  onLocationChanged() {
    this.getServiceProviderName();
    this.clearRotationNumber();
    this.disableRotationNo = true;
    this.selectedModel.serviceProvider = '';
    for (let i = 0; i < this.locationModel.locationMasterList.length; i++) {
      if (this.locationModel.locationMasterList[i].spLocationName === this.selectedModel.location) {
        this.selectedModel.portOfLoading = this.locationModel.locationMasterList[i].spLocationCode;
      }
    }
    if (this.checkPortNamesAreSame()) {
      this.selectedModel.finalPortOfDestination = '';
      this.selectedModel.finalPortOfDestinationCode = '';
    }
  }

  onspNameChanged() {
    if(this.selectedModel.serviceProvider && this.selectedModel.serviceProvider != '') {
      this.getBoxOperatorMaster();
    }
    this.clearRotationNumber();
    this.selectedModel.linerCode = '';
    if (this.selectedModel.location && this.selectedModel.serviceProvider) {
      this.disableRotationNo = false;
    } else {
      this.disableRotationNo = true;
    }
  }

  onAcceptanceTypeChanged(selectedValue: any) {
    if (this.isAcceptanceType) {
      this.resetFields();
    } else {
      this.clearNominations();
      this.storageFrom = '';
      this.storageTo = '';
    }
    this.isAcceptanceType = true;
    this.tabs = ['Acceptance Details', 'Booking Details', 'Container Details', 'Nominations', 'Attachments'];
    this.showRightButton = this.tabs.length > 2;
    if (selectedValue === 'Export Full') {
      this.isAccTypeExport = true;
      this.isAccTypeFull = true;
    } else if (selectedValue === 'Export Empty') {
      this.isAccTypeExport = true;
      this.isAccTypeFull = false;
    } else if (selectedValue === 'Storage Empty') {
      this.isAccTypeExport = false;
      this.isAccTypeFull = false;
    } else if (selectedValue === 'Storage Full') {
      this.isAccTypeExport = false;
      this.isAccTypeFull = true;
    }
    this.setValidation();
  }

  enableBookingDetailsForm() {
    this.bookingDetailsForm.controls["linerBookingNumber"].enable();
  }

  submit() {
    if (this.acceptanceDetailsForm.valid && this.bookingDetailsForm.valid && this.containerDetailsForm.valid
      && this.informationForm.valid && this.validateNominations()) {
      this.showConfirmation();
    }
    else {
      this.error = true;
      if (this.acceptanceDetailsForm.invalid) {
        this.moveToSlide(0);
      } else if (this.bookingDetailsForm.invalid) {
        this.enableBookingDetailsForm();
        this.moveToSlide(1);
      } else if (this.containerDetailsForm.invalid) {
        this.moveToSlide(2);
      } else if (!this.validateNominations()) {
        this.moveToSlide(3);
      } else if (this.informationForm.invalid) {
        this.moveToSlide(1);
        return;
      }
      this.presentAlert('ALERT', 'Enter all mandatory fields');
    }
  }

  moveToSlide(val: number) {
    this.slides.slideTo(val, 500);
    this.resetShowTabs(val);
    this.selectedTab = this.tabs[val];
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
              this.containerCreate();
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

  containerCreate() {
    this.initializeCreateRequest();
    this.caProvider.saveContainer(this.modelToTransmit)
      .subscribe(response => {
          let successModel = <ContainerAcceptanceModel>response;
          if (successModel && successModel.acceptanceNo && successModel.acceptanceNo > 0) {
            localStorage.setItem('ca_vesselName', successModel.vesselName);
            this.navCtrl.push(Casearchsummay, {
              acceptanceNo: successModel.acceptanceNo,
              acceptanceType: successModel.acceptanceType,
              rotationNo: successModel.rotationNumber,
              isfromCreateorAmend: true,
              status: successModel.status,
              totalContainer: successModel.totalNoOfContainersSuccess,
              vessalcutoff: successModel.vesselCutOfDateSuccess,
              vessalName: successModel.vesselName,
              portofDischarge: successModel.portOfDischargeSuccess,
              status_icon: this.selectedModel.containerNumberAvailable == 'Yes' ? this.getStatusIcon('Active')
                : this.getStatusIcon('Pending')
            });
          }
        },
        error => {
          this.presentAlert('ALERT', error[0].message);
          //this.resetOnSubmitError();
        });
  }

  getStatusIcon(statusIcon) {
    switch (statusIcon) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Pending':
        return "assets/img/pending.svg";
    }
  }

  /*resetOnSubmitError() {
    for (let indeX = 0; indeX < this.selectedModel.caContainerDetailsSOs.length; indeX++) {

      if ((this.selectedModel.caContainerDetailsSOs[indeX].containerDamageStatus == null) ||
        (this.selectedModel.caContainerDetailsSOs[indeX].containerDamageStatus == "")) {
        this.selectedModel.caContainerDetailsSOs[indeX].containerDamageStatus = "false";
      } else {
        this.selectedModel.caContainerDetailsSOs[indeX].containerDamageStatus = "true";
      }

      if ((this.selectedModel.caContainerDetailsSOs[indeX].reefer == null) ||
        (this.selectedModel.caContainerDetailsSOs[indeX].reefer == "")) {
        this.selectedModel.caContainerDetailsSOs[indeX].reefer = "false";
      } else {
        this.selectedModel.caContainerDetailsSOs[indeX].reefer = "true";
      }

      if ((this.selectedModel.caContainerDetailsSOs[indeX].imdg == null) ||
        (this.selectedModel.caContainerDetailsSOs[indeX].imdg == "")) {
        this.selectedModel.caContainerDetailsSOs[indeX].imdg = "false";
      } else {
        this.selectedModel.caContainerDetailsSOs[indeX].imdg = "true";
      }

      if ((this.selectedModel.caContainerDetailsSOs[indeX].oog == null) ||
        (this.selectedModel.caContainerDetailsSOs[indeX].oog == "")) {
        this.selectedModel.caContainerDetailsSOs[indeX].oog = "false";
      } else {
        this.selectedModel.caContainerDetailsSOs[indeX].oog = "true";
      }
    }
  }*/

  initializeCreateRequest() {
    if (!this.isAccTypeExport) {
      this.selectedModel.storageTo = this.datepipe.transform(this.storageTo, 'dd/MM/yyyy');
      this.selectedModel.storageFrom = this.datepipe.transform(this.storageFrom, 'dd/MM/yyyy');
    }

    if (this.validityDate) {
      let formatValidityDate = this.validityDate;
      this.selectedModel.validityDate = this.datepipe.transform(formatValidityDate.split("T")[0], 'dd/MM/yyyy');
      formatValidityDate = formatValidityDate.split("T")[1];
      formatValidityDate = formatValidityDate.substr(0, formatValidityDate.lastIndexOf(':'));
      this.selectedModel.validityDate = this.selectedModel.validityDate + " " + formatValidityDate;
    }

    this.selectedModel.caNominationsSOs = this.nominationsReceived;
    this.selectedModel.caContainerDetailsSOs = this.containerDetails;
    this.selectedModel.caAttachSOs = this.attachments;
    this.modelToTransmit = JSON.parse(JSON.stringify(this.selectedModel));
    for (let i = 0; i < this.selectedModel.caContainerDetailsSOs.length; i++) {
      if (this.selectedModel.caContainerDetailsSOs[i].imdg != null &&
        this.selectedModel.caContainerDetailsSOs[i].imdg.toString() == "true") {
        this.modelToTransmit.caContainerDetailsSOs[i].imdg = 'on';
      } else {
        delete this.modelToTransmit.caContainerDetailsSOs[i].imdg;
      }

      if (this.selectedModel.caContainerDetailsSOs[i].reefer != null &&
        this.selectedModel.caContainerDetailsSOs[i].reefer.toString() == "true") {
        this.modelToTransmit.caContainerDetailsSOs[i].reefer = 'on';
      } else {
        delete this.modelToTransmit.caContainerDetailsSOs[i].reefer;
      }

      if (this.selectedModel.caContainerDetailsSOs[i].oog != null &&
        this.selectedModel.caContainerDetailsSOs[i].oog.toString() == "true") {
        this.modelToTransmit.caContainerDetailsSOs[i].oog = 'on';
      } else {
        delete this.modelToTransmit.caContainerDetailsSOs[i].oog;
      }

      if (this.selectedModel.caContainerDetailsSOs[i].containerDamageStatus != null &&
        this.selectedModel.caContainerDetailsSOs[i].containerDamageStatus.toString() == "true") {
        this.modelToTransmit.caContainerDetailsSOs[i].containerDamageStatus = 'on';
      } else {
        delete this.modelToTransmit.caContainerDetailsSOs[i].containerDamageStatus;
      }

      if ((this.selectedModel.caContainerDetailsSOs[i].tempScale != null &&
          this.selectedModel.caContainerDetailsSOs[i].tempScale.toString() == "false") ||
        (this.selectedModel.caContainerDetailsSOs[i].tempScale == null)) {
        delete this.modelToTransmit.caContainerDetailsSOs[i].tempScale;
      } else {
        this.modelToTransmit.caContainerDetailsSOs[i].tempScale = "on";
      }
    }

  }

  getRotationNumberMaster() {
    this.verifyValidRotationNo = true;
    this.disableValidityDate = true;
    this.hideRotationNoInfo = true;
    this.rotationNoRespArray = [];
    let rotationNoSearchReq = new RotationNoSearchReqModel();
    rotationNoSearchReq.location = this.selectedModel.location;
    rotationNoSearchReq.serviceProvider = this.selectedModel.serviceProvider;
    this.caProvider.getRotationNumberMaster(rotationNoSearchReq)
      .subscribe(responseList => {
          let rotationNoRespList = <RotationNoSearchResultList>responseList;
          this.rotationNoRespArray = rotationNoRespList.list;
          if (this.verifyValidRotationNo) {
            this.getRotationNo(null);
          }
        },
        error => {

        })
  }

  getRotationNo(ev: any) {
    this.filterRotationArray = this.rotationNoRespArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.selectedModel.rotationNumber;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterRotationArray = this.filterRotationArray.filter((item) => {
        if (item.rotationNo.startsWith(val)) {
          this.showRotationNo = true;
        }
        return (item.rotationNo.startsWith(val));
      });
    } else {
      // hide the results when the query is empty
      this.showRotationNo = false;
    }
  }

  hideRotation() {
    setTimeout(() => {
      if (this.validate(this.selectedModel.rotationNumber, '^[0-9]{0,18}$')) {
        this.clearRotationNumber();
        this.presentAlert("ATTENTION", 'Invalid Rotation Number');
        return;
      }
      if (this.selectedModel.rotationNumber && this.selectedModel.rotationNumber.length > 0 && this.verifyValidRotationNo) {
        let rotationNoModel = new RotationNoSearchReqModel();
        rotationNoModel.location = this.selectedModel.location;
        rotationNoModel.serviceProvider = this.selectedModel.serviceProvider;
        rotationNoModel.rotationNo = this.selectedModel.rotationNumber;
        this.caProvider.verifyRotationNumber(rotationNoModel)
          .subscribe(response => {
              let rotationNoRes = <RotationNoSearchResultModel>response;
              this.setRotationNoDetails(rotationNoRes);
            },
            error => {
            });
      }
      if (this.selectedModel.rotationNumber.length == 0) {
        this.clearRotationNumber();
      }
      this.verifyValidRotationNo = false;
      this.showRotationNo = false;
    }, 500);
  }

  setRotationNoDetails(rotationNoRes) {
    if (rotationNoRes.vesselName != null && rotationNoRes.vesselName != "" &&
      rotationNoRes.operationalStatus.toUpperCase() != "SAILED") {
      this.hideRotationNoInfo = false;
      this.selectedModel.rotationNo = rotationNoRes.rotationNo;
      this.selectedModel.vesselName = rotationNoRes.vesselName;
      this.selectedModel.cargoCutOffTime = rotationNoRes.cargoCutOffTime;
      this.selectedModel.vesselCutOffTime = rotationNoRes.vesselCutOffTime;
      this.onValidityDateChanged();
    }
    else if (rotationNoRes.operationalStatus != null && rotationNoRes.operationalStatus.toUpperCase() === "SAILED") {
      this.clearRotationNumber();
      this.presentAlert("ATTENTION", 'ETA crossed, cannot generate CA');
    }
    else {
      this.clearRotationNumber();
      this.presentAlert("ATTENTION", 'Invalid Rotation Number');
    }
  }

  clearRotationNumber() {
    this.hideRotationNoInfo = true;
    this.disableValidityDate = true;
    this.selectedModel.rotationNumber = '';
    this.selectedModel.rotationNo = '';
    this.selectedModel.vesselName = '';
    this.selectedModel.cargoCutOffTime = '';
    this.selectedModel.vesselCutOffTime = '';
    this.validityDate = '';
  }

  selectRotation(item: any) {
    this.verifyValidRotationNo = false;
    this.showRotationNo = false;
    this.hideRotationNoInfo = false;
    this.selectedModel.rotationNumber = item.rotationNo;
    this.selectedModel.rotationNo = item.rotationNo;
    this.selectedModel.vesselName = item.vesselName;
    this.selectedModel.cargoCutOffTime = item.cargoCutOffTime;
    this.selectedModel.vesselCutOffTime = item.vesselCutOffTime;
    this.onValidityDateChanged();
  }

  getPortName(ev: any, isPlaceOfReceipt: boolean) {
    this.filterPortNameArray = this.portTerminalRespArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      if (isPlaceOfReceipt) {
        val = this.selectedModel.placeOfReceipt;
      } else {
        val = this.selectedModel.finalPortOfDestination;
      }
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterPortNameArray = this.filterPortNameArray.filter((item) => {
        if (item.portName.toString().toLowerCase().startsWith(val.toString().toLowerCase())) {
          if (isPlaceOfReceipt) {
            this.showPlaceOfReceipt = true;
          } else {
            this.showFinalPortOfDestination = true;
          }
        }
        return (item.portName.toString().toLowerCase().startsWith(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      if (isPlaceOfReceipt) {
        this.showPlaceOfReceipt = false;
      } else {
        this.showFinalPortOfDestination = false;
      }
    }
  }

  getPortTerminalMaster(isPlaceOfReceipt: boolean) {
    if (isPlaceOfReceipt) {
      this.verifyPlaceOfReceipt = true;
    } else {
      this.verifyFinalPortOfDestination = true;
    }
    this.portTerminalRespArray = [];
    let portTerminalReq = new PortTerminalMasterModel();
    portTerminalReq.countryName = '';
    portTerminalReq.portCode = '';
    portTerminalReq.portName = '';

    this.caProvider.getPortTerminalBerthMaster(portTerminalReq, false)
      .subscribe(responseList => {
          let portTerminalRespList = <PortTerminalMasterListModel>responseList;
          this.portTerminalRespArray = portTerminalRespList.list;
          if ((isPlaceOfReceipt && this.verifyPlaceOfReceipt) || (!isPlaceOfReceipt && this.verifyFinalPortOfDestination)) {
            this.getPortName(null, isPlaceOfReceipt);
          }
        },
        error => {

        });
  }

  hidePlaceOfReceipt() {
    setTimeout(() => {
      if (this.selectedModel.placeOfReceipt && this.selectedModel.placeOfReceipt.length > 0 && this.verifyPlaceOfReceipt) {
        let portTerminalReq = new PortTerminalMasterModel();
        portTerminalReq.countryName = '';
        portTerminalReq.portCode = '';
        portTerminalReq.portName = this.selectedModel.placeOfReceipt;

        this.caProvider.getPortTerminalBerthMaster(portTerminalReq, true)
          .subscribe(responseList => {
              let portTerminalRespList = <PortTerminalMasterListModel>responseList;
              let portTerminalArray = portTerminalRespList.list;
              if (portTerminalArray.length == 0 || portTerminalArray[0].portName.toUpperCase() != this.selectedModel.placeOfReceipt.toUpperCase()) {
                this.selectedModel.placeOfReceipt = '';
                this.selectedModel.placeOfReceiptCode = '';
                this.presentAlert('Attention', 'Place of Receipt is Invalid.');
              } else {
                if (portTerminalArray[0].portName) {
                  this.selectedModel.placeOfReceipt = portTerminalArray[0].portName;
                  this.selectedModel.placeOfReceiptCode = portTerminalArray[0].portCode;
                  if (this.checkPortNamesAreSame()) {
                    this.selectedModel.placeOfReceipt = '';
                    this.selectedModel.placeOfReceiptCode = '';
                  }
                }
              }
            },
            error => {

            });
      }
      this.verifyPlaceOfReceipt = false;
      this.showPlaceOfReceipt = false;
    }, 500);
  }

  selectPlaceOfReceipt(item: any) {
    this.verifyPlaceOfReceipt = false;
    this.showPlaceOfReceipt = false;
    this.selectedModel.placeOfReceipt = item.portName;
    this.selectedModel.placeOfReceiptCode = item.portCode;
    if (this.checkPortNamesAreSame()) {
      this.selectedModel.placeOfReceipt = '';
      this.selectedModel.placeOfReceiptCode = '';
    }
  }


  hideFinalPortOfDestination() {
    setTimeout(() => {
      if (this.selectedModel.finalPortOfDestination && this.selectedModel.finalPortOfDestination.length > 0 && this.verifyFinalPortOfDestination) {
        let portTerminalReq = new PortTerminalMasterModel();
        portTerminalReq.countryName = '';
        portTerminalReq.portCode = '';
        portTerminalReq.portName = this.selectedModel.finalPortOfDestination;

        this.caProvider.getPortTerminalBerthMaster(portTerminalReq, true)
          .subscribe(responseList => {
              let portTerminalRespList = <PortTerminalMasterListModel>responseList;
              let portTerminalArray = portTerminalRespList.list;
              if (portTerminalArray.length == 0 || portTerminalArray[0].portName.toUpperCase() != this.selectedModel.finalPortOfDestination.toUpperCase()) {
                this.selectedModel.finalPortOfDestination = '';
                this.selectedModel.finalPortOfDestinationCode = '';
                this.presentAlert('Attention', 'Final Port Of Destination is Invalid');
              } else {
                if (portTerminalArray[0].portName) {
                  this.selectedModel.finalPortOfDestination = portTerminalArray[0].portName;
                  this.selectedModel.finalPortOfDestinationCode = portTerminalArray[0].portCode;
                  if (this.checkPortNamesAreSame()) {
                    this.selectedModel.finalPortOfDestination = '';
                    this.selectedModel.finalPortOfDestinationCode = '';
                  }
                }
              }
            },
            error => {

            });
      }
      this.verifyFinalPortOfDestination = false;
      this.showFinalPortOfDestination = false;
    }, 500);
  }

  selectFinalPortOfDestination(item: any) {

    this.verifyFinalPortOfDestination = false;
    this.showFinalPortOfDestination = false;
    this.selectedModel.finalPortOfDestination = item.portName;
    this.selectedModel.finalPortOfDestinationCode = item.portCode;
    if (this.checkPortNamesAreSame()) {
      this.selectedModel.finalPortOfDestination = '';
      this.selectedModel.finalPortOfDestinationCode = '';
    }
  }

  onFocusChangeLinerBooking() {
    if (this.selectedModel.linerBookingNumber != null && this.selectedModel.linerBookingNumber.length > 0) {
      this.caProvider.verifyBookingNo(this.selectedModel)
        .subscribe(response => {
            if (response == true) {
              this.selectedModel.linerBookingNumber = '';
              this.presentAlert('Attention', 'Liner booking number is already used');
            }
          },
          error => {

          });
    }
  }

  onFocusChangeContainerNo(containerIndex: any, containerDetailItem: ContainerDetailsModel) {

    if (this.validate(containerDetailItem.containerNumber, '^[A-Z]{4}[0-9]{6,7}$')) {
      containerDetailItem.containerNumber = "";
      this.presentAlert("Attention", "Invalid Container Number");
      return;
    }
    let searchMatch: ContainerDetailsModel[];
    if (containerDetailItem.containerNumber && containerDetailItem.containerNumber != "") {
      if (this.containerDetails.length == 1) {
        this.containerDetails[containerIndex].containerNumber = containerDetailItem.containerNumber;
        this.verifyContainerNumber(containerIndex);
      } else {
        searchMatch = this.containerDetails.filter(element =>
          (element.containerNumber.toLowerCase() == containerDetailItem.containerNumber.toLowerCase() && element.containerNumber != "")
        );
        if (searchMatch && searchMatch.length == 2) {
          //same type of nominee already present
          this.containerDetails[containerIndex] = new ContainerDetailsModel();
          this.containerDetails[containerIndex].containerNumber = "";
          this.containerDetails[containerIndex].dropDown = "true";
          this.containerDetails[containerIndex].specialStowageInstructions = this.specialStowageList[0].definedSetValueCode;
          setTimeout(() => {
            this.presentAlert('ALERT', "Container Number already exists");
          }, 200);
        } else {
          this.containerDetails[containerIndex].containerNumber = containerDetailItem.containerNumber;
          this.verifyContainerNumber(containerIndex);
        }
      }
    }
  }

  verifyContainerNumber(containerIndex: any) {
    let verifyContainerNo = new ContainerDetailsModel();
    verifyContainerNo.containerNumber = this.containerDetails[containerIndex].containerNumber;
    this.caProvider.verifyContainerNo(verifyContainerNo)
      .subscribe(response => {
          if (response != 0) {
            this.containerDetails[containerIndex].containerNumber = "";
            this.presentAlert("Attention",
              "Acceptance " + response + " has been created for the given container number");
          }
        },
        error => {

        });
  }

  onFocusChangeContainerQuantity(containerDetailItem: ContainerDetailsModel) {
    if (this.validate(containerDetailItem.containerQuantity, '^[0-9]{0,3}$')) {
      containerDetailItem.containerQuantity = null;
      this.presentAlert("Attention", "Invalid Container Quantity");
      return;
    }
    if (containerDetailItem.containerQuantity && containerDetailItem.containerQuantity == 0) {
      containerDetailItem.containerQuantity = null;
      this.presentAlert("Attention", "Container Quantity cannot be 0");
    } else {
      let totalQuantity: number = 0;
      for (let i = 0; i < this.containerDetails.length; i++) {
        if (this.containerDetails[i].containerQuantity) {
          totalQuantity = Number(this.containerDetails[i].containerQuantity) + totalQuantity;
        }
      }
      if (totalQuantity > 999) {
        containerDetailItem.containerQuantity = null;
        this.presentAlert("Attention", "More than 999 containers cannot be added in a single Acceptance");
      }
    }
  }

  onContainerNoAvailable() {
    this.containerDetails = new Array<ContainerDetailsModel>();
    let newContainer: ContainerDetailsModel = new ContainerDetailsModel();
    newContainer.specialStowageInstructions = this.specialStowageList[0].definedSetValueCode;
    newContainer.tempScale = "false";
    this.containerDetails.push(newContainer);
    for (let index = this.containerDetailsFormArray.length; index > 0; index--) {
      this.containerDetailsFormArray.removeAt(index - 1);
    }
    this.containerDetailsFormArray.push(this.addContainerForm());
  }

  onStorageDateChanged(isStorageTo: boolean) {
    if (this.storageFrom && new Date(this.storageFrom).toDateString() == "Invalid Date") {
      this.storageFrom = '';
      this.validityDate = '';
      this.disableValidityDate = true;
      this.selectedModel.totalNoOfDays = new ContainerAcceptanceModel().totalNoOfDays;
      return;
    }
    else if (this.storageTo && new Date(this.storageTo).toDateString() == "Invalid Date") {
      this.storageTo = '';
      this.validityDate = '';
      this.disableValidityDate = true;
      this.selectedModel.totalNoOfDays = new ContainerAcceptanceModel().totalNoOfDays;
      return;
    }
    if (this.storageFrom && this.storageTo) {
      if (isStorageTo && (Date.parse(this.storageTo) < Date.parse(this.storageFrom))) {
        setTimeout(() => {
          this.storageTo = '';
          this.validityDate = '';
          this.disableValidityDate = true;
          this.selectedModel.totalNoOfDays = new ContainerAcceptanceModel().totalNoOfDays;
          this.presentAlert('Attention', 'Storage To date cannot be lesser than Storage From date');
        }, 200);
      } else if (!isStorageTo && (Date.parse(this.storageFrom) > Date.parse(this.storageTo))) {
        setTimeout(() => {
          this.storageFrom = '';
          this.validityDate = '';
          this.disableValidityDate = true;
          this.selectedModel.totalNoOfDays = new ContainerAcceptanceModel().totalNoOfDays;
          this.presentAlert('Attention', 'Storage From date cannot be greater than Storage To date');
        }, 200);
      } else {
        let eventStartTime = new Date(this.storageFrom);
        let eventEndTime = new Date(this.storageTo);
        var duration = eventEndTime.valueOf() - eventStartTime.valueOf();
        if (duration != 0) {
          duration = duration / (1000 * 3600 * 24);
        }
        setTimeout(() => {
          this.selectedModel.totalNoOfDays = duration + 1;
          this.disableValidityDate = false;
        }, 200);
        if (this.validityDate && this.validityDate != '') {
          this.checkValidityStorageTime(true);
        }
        }
    }
  }

  onValidityDateChanged() {
    let vesselCutOff;
    if (this.isAccTypeExport) {
      if (this.selectedModel.vesselCutOffTime && this.selectedModel.vesselCutOffTime.length > 0) {
        this.disableValidityDate = false;
        vesselCutOff = this.transformDateTime(this.selectedModel.vesselCutOffTime);
      } else {
        this.validityDate = '';
        this.disableValidityDate = true;
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
        } else if (Date.parse(this.validityDate) > vesselCutOff) {
          setTimeout(() => {
            this.validityDate = '';
            this.presentAlert('ATTENTION', 'Validity date cannot be greater than vessel cut off date');
          }, 200);
        }
      } else {
        if (diffInHours < 2) {
          this.checkValidityStorageTime(false);
        } else {
          this.checkValidityStorageTime(true);
        }
      }
    }
  }

  /**
   *
   * @param {boolean} isValidityDateValid is set to false if Validity date is atleast 2 hours ahead of current time
   */
  checkValidityStorageTime(isValidityDateValid: boolean) {
    // Adding 23 Hours and 59 minutes to Storage To date
    let eod = (23 * 60 * 60 * 1000) + ( 59 * 60 * 1000);
    if (Date.parse(this.validityDate) > (Date.parse(this.storageTo) + eod)) {
      setTimeout(() => {
        this.validityDate = '';
        this.presentAlert('ATTENTION', 'Validity date cannot be greater than Storage To date');
      }, 200);
    } else if (Date.parse(this.validityDate) < Date.parse(this.storageFrom)) {
      setTimeout(() => {
        this.validityDate = '';
        this.presentAlert('ATTENTION', 'Validity date should be greater than Storage From date');
      }, 200);
    } else if (!isValidityDateValid) {
      setTimeout(() => {
        this.validityDate = '';
        this.presentAlert('ATTENTION', 'Validity date should be atleast 2 hours ahead of current time');
      }, 200);
    }
  }


  transformDateTime(value: string): any {
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1]),
      (+dateArray[4]),
      (+dateArray[5])).getTime() - (new Date().getTimezoneOffset() * 60000);
    return dateObject;
  }

  public addNominationEntry(): void {
    let newCaNomination: CaNominationsModel = new CaNominationsModel();
    if (this.clientList != null && this.nominationsReceived.length < (this.clientList.length - 1)) {
      let newCaNomination: CaNominationsModel = new CaNominationsModel();
      newCaNomination.clientType = this.clientList[0].definedSetValueCode;
      this.nominationsReceived.push(newCaNomination);
    }
  }

  public removeNominationEntry(indeX: number): void {
    if (this.nominationsReceived.length != 1) {
      this.nominationsReceived.splice(indeX, 1);
    }
  }

  public disableNominationSearch(clientType: string): boolean {
    if (clientType && clientType.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  hideRemoveOptionforNomination(): boolean {
    let retStatus: boolean;
    if (this.nominationsReceived.length == 1) {
      retStatus = false;
    } else {
      retStatus = true;
    }
    return retStatus;
  }

  addContainerDetails() {
    if (this.containerDetails.length < 999) {
      let newContainer: ContainerDetailsModel = new ContainerDetailsModel();
      newContainer.specialStowageInstructions = this.specialStowageList[0].definedSetValueCode;
      this.containerDetails.push(newContainer);
      this.containerDetailsFormArray.push(this.addContainerForm());
    }
  }

  hideRemoveOptionforContainer(): boolean {
    let retStatus: boolean;
    if (this.containerDetails.length == 1) {
      retStatus = false;
    } else {
      retStatus = true;
    }
    return retStatus;
  }

  removeContainerDetails(index: any) {
    if (this.containerDetails.length > 1) {
      if (this.containerDetails[index]) {
        this.containerDetails.splice(index, 1);
        this.containerDetailsFormArray.removeAt(index);
      }
    }
    if (this.containerDetails.length == 1) {
      this.content.scrollToBottom(0);
    }
  }

  addAttachment() {
    if (this.attachments.length < 5) {
      this.attachments.push(new CaAttachModel());
    } else {
      this.presentAlert('ALERT', 'You are not allowed to Upload more than 5 Attachments');
    }
  }

  closeAttachment(attachment: CaAttachModel) {
    for (let i = 0; i < this.attachments.length; i++) {
      if (this.attachments[i] == attachment) {
        this.attachments.splice(i, 1);
        return;
      }
    }
  }

  uploadDocs(attachment: CaAttachModel) {
    this.caProvider.uploadDocuments()
      .then(data => {
        attachment.fileName = data.fileName;
        attachment.fileUploadId = data.fileUploadId;
      }, error => {

      });
  }

  displayAttachment(attachment: CaAttachModel) {
    this.caProvider.openAttachment(attachment);
  }

  initializeFeildValidation() {
    this.acceptanceDetailsForm = this.formBuilder.group({
      location: ['', Validators.compose([Validators.required])],
      serviceProvider: ['', Validators.compose([Validators.required])],
      acceptanceType: ['', Validators.compose([Validators.required])],
      tradeType: ['']
    });
    this.bookingDetailsForm = this.formBuilder.group({
      linerCode: ['', Validators.compose([Validators.required])],
      rotationNo: [''],
      storageFrom: [''],
      storageTo: [''],
      validityDate: [''],
      linerBookingNumber: ['', Validators.compose([Validators.minLength(3), Validators.required, Validators.pattern(this.linerPattern)])],
      placeOfReceipt: [''],
      portOfDischarge: [''],
      finalPortOfDestination: [''],
      modeOfTransport: [''],
      containerNoAvailable: ['', Validators.compose([Validators.required])],
      vgmRequired: ['']
    });

    this.informationForm = this.formBuilder.group({
      instructions: ['', Validators.compose([Validators.minLength(3)])]
    });

    this.containerDetailsForm = this.formBuilder.group({
      containerDetailsFormArray: this.formBuilder.array([
        /*this.addContainerForm()*/
      ])
    });

    this.containerDetailsFormArray = this.containerDetailsForm.get('containerDetailsFormArray') as FormArray;
  }

  setValidation() {
    if (this.isAccTypeExport) {
      this.acceptanceDetailsForm.controls["tradeType"].setValidators(Validators.compose([Validators.required]));
      this.acceptanceDetailsForm.controls["tradeType"].enable();
    } else {
      this.acceptanceDetailsForm.controls["tradeType"].clearValidators();
      this.acceptanceDetailsForm.controls["tradeType"].disable();
    }

    if (this.isAccTypeExport) {
      this.bookingDetailsForm.controls["rotationNo"].setValidators(Validators.compose([Validators.required]));
      this.bookingDetailsForm.controls["rotationNo"].enable();
      this.bookingDetailsForm.controls["portOfDischarge"].setValidators(Validators.compose([Validators.required]));
      this.bookingDetailsForm.controls["portOfDischarge"].enable();
      this.bookingDetailsForm.controls["storageFrom"].clearValidators();
      this.bookingDetailsForm.controls["storageFrom"].disable();
      this.bookingDetailsForm.controls["storageTo"].clearValidators();
      this.bookingDetailsForm.controls["storageTo"].disable();
    } else {
      this.bookingDetailsForm.controls["storageFrom"].setValidators(Validators.compose([Validators.required]));
      this.bookingDetailsForm.controls["storageFrom"].enable();
      this.bookingDetailsForm.controls["storageTo"].setValidators(Validators.compose([Validators.required]));
      this.bookingDetailsForm.controls["storageTo"].enable();
      this.bookingDetailsForm.controls["rotationNo"].clearValidators();
      this.bookingDetailsForm.controls["rotationNo"].disable();
      this.bookingDetailsForm.controls["portOfDischarge"].clearValidators();
      this.bookingDetailsForm.controls["portOfDischarge"].disable();
    }

    if (this.isAccTypeExport && this.isAccTypeFull) {
      this.bookingDetailsForm.controls["placeOfReceipt"].setValidators(Validators.compose([Validators.required]));
      this.bookingDetailsForm.controls["placeOfReceipt"].enable();
      this.bookingDetailsForm.controls["finalPortOfDestination"].setValidators(Validators.compose([Validators.required]));
      this.bookingDetailsForm.controls["finalPortOfDestination"].enable();
      this.bookingDetailsForm.controls["vgmRequired"].setValidators(Validators.compose([Validators.required]));
      this.bookingDetailsForm.controls["vgmRequired"].enable();
    } else {
      this.bookingDetailsForm.controls["placeOfReceipt"].clearValidators();
      this.bookingDetailsForm.controls["placeOfReceipt"].disable();
      this.bookingDetailsForm.controls["finalPortOfDestination"].clearValidators();
      this.bookingDetailsForm.controls["finalPortOfDestination"].disable();
      this.bookingDetailsForm.controls["vgmRequired"].clearValidators();
      this.bookingDetailsForm.controls["vgmRequired"].disable();
    }

    this.acceptanceDetailsForm.updateValueAndValidity();
    this.bookingDetailsForm.updateValueAndValidity();
  }

  addContainerForm(): FormGroup {
    if (!this.selectedModel.containerNumberAvailable || this.selectedModel.containerNumberAvailable == 'Yes') {
      return this.formBuilder.group({
        containerNumber: ['', Validators.compose([Validators.minLength(10), Validators.required, ValidationService.containerNumberValidate])],
        containerQuantity: [''],
        isoCode: ['', Validators.compose([Validators.required])]
      });
    } else {
      return this.formBuilder.group({
        containerNumber: [''],
        containerQuantity: ['', Validators.compose([Validators.required])],
        isoCode: ['', Validators.compose([Validators.required])]
      });
    }
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

  resetShowTabs(val: number) {
    for (let i = 0; i < this.showTabs.length; i++) {
      if (val == i) {
        this.showTabs[i] = true;
      } else {
        this.showTabs[i] = false;
      }
    }
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
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
      this.setValidation();
      this.selectedTab = tab;
    }, 400);
  }

  checkPortNamesAreSame(): boolean {
    let placeOfReceipt = this.selectedModel.placeOfReceiptCode ? this.selectedModel.placeOfReceiptCode.toUpperCase() : '';
    let portOfLoading = this.selectedModel.portOfLoading ? this.selectedModel.portOfLoading.toUpperCase() : '';
    //let portOfDischarge = this.selectedModel.portOfDischarge ? this.selectedModel.portOfDischarge.toUpperCase() : '';
    let finalPortOfDestination = this.selectedModel.finalPortOfDestinationCode ? this.selectedModel.finalPortOfDestinationCode.toUpperCase() : '';
    /*    if (placeOfReceipt != null && placeOfReceipt != "" && placeOfReceipt === portOfDischarge) {
          this.presentAlert('Attention', 'Place Of Receipt and Port Of Discharge cannot be same');
          return true;
        }*/
    if (placeOfReceipt != null && placeOfReceipt != "" && placeOfReceipt === finalPortOfDestination) {
      this.presentAlert('Attention', 'Place Of Receipt and Final Port Of Destination cannot be same');
      return true;
    }
    /*    if (portOfLoading != null && portOfLoading != "" && portOfLoading === portOfDischarge) {
          this.presentAlert('Attention', 'Port Of Loading and Port Of Discharge cannot be same');
          return true;
        }*/
    if (portOfLoading != null && portOfLoading != "" && portOfLoading === finalPortOfDestination) {
      this.presentAlert('Attention', 'Port Of Loading and Final Port Of Destination cannot be same');
      return true;
    }
    return false;
  }

  resetFields() {

    this.selectedModel.tradeType = '';
    this.selectedModel.linerCode = '';
    this.selectedModel.vesselCutOffTime = '';
    this.selectedModel.cargoCutOffTime = '';
    this.selectedModel.totalNoOfDays = new ContainerAcceptanceModel().totalNoOfDays;
    this.selectedModel.linerBookingNumber = '';

    this.selectedModel.rotationNumber = '';
    this.selectedModel.vesselName = '';
    this.selectedModel.cargoCutOffTime = '';
    this.selectedModel.vesselCutOffTime = '';
    this.selectedModel.placeOfReceipt = '';
    this.selectedModel.placeOfReceiptCode = '';
    this.selectedModel.portOfDischarge = '';
    this.selectedModel.finalPortOfDestination = '';
    this.selectedModel.finalPortOfDestinationCode = '';
    this.selectedModel.modeOfTransport = '';
    this.selectedModel.vgmRequired = '';
    this.selectedModel.instructions = '';

    this.storageFrom = '';
    this.storageTo = '';
    this.validityDate = '';
    this.disableValidityDate = true;

    this.selectedModel.containerNumberAvailable = this.containerNoAvailableList[0].definedSetValueCode;

    this.onContainerNoAvailable();
    this.clearNominations();

    this.selectedModel.caNominationsSOs = [];
    this.selectedModel.caContainerDetailsSOs = [];

    this.hideRotationNoInfo = true;
  }

  clearNominations() {
    this.nominationsReceived = new Array<CaNominationsModel>();
    let newCaNominations: CaNominationsModel = new CaNominationsModel();
    newCaNominations.clientType = this.clientList[0].definedSetValueCode;
    this.nominationsReceived.push(newCaNominations);
  }

  onNominationCharchange(ev: any, nominIndex: number) {

    this.filterNominationArray = this.nominationRespCodeModel;
    this.nominationsReceived[nominIndex].companyName = '';
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
      },
      error => {
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

  openModalOOG(index: any) {
    let profileModal = this.modalCtrl.create(CAOOGModelComponent, {
      containerElement: this.containerDetails[index],
      mode: true,
      creator: true,
      containerEditMode: true,
      oogFlag: this.containerDetails[index].oogFlag
    });
    profileModal.onDidDismiss(data => {
      if (null != data) {
        this.containerDetails[index] = data.containerElement;
        if(this.containerDetails[index] != null && this.containerDetails[index].oogHeight != null &&
        this.containerDetails[index].oogHeight.endsWith(".")){
          this.containerDetails[index].oogHeight = this.containerDetails[index].oogHeight.substring(0,this.containerDetails[index].oogHeight.length-1);
        }
        if(this.containerDetails[index] != null && this.containerDetails[index].oogBack != null &&
          this.containerDetails[index].oogBack.endsWith(".")){
          this.containerDetails[index].oogBack = this.containerDetails[index].oogBack.substring(0,this.containerDetails[index].oogBack.length-1);
        }
        if(this.containerDetails[index] != null && this.containerDetails[index].oogFront != null &&
          this.containerDetails[index].oogFront.endsWith(".")){
          this.containerDetails[index].oogFront = this.containerDetails[index].oogFront.substring(0,this.containerDetails[index].oogFront.length-1);
        }
        if(this.containerDetails[index] != null && this.containerDetails[index].oogLeft != null &&
          this.containerDetails[index].oogLeft.endsWith(".")){
          this.containerDetails[index].oogLeft = this.containerDetails[index].oogLeft.substring(0,this.containerDetails[index].oogLeft.length-1);
        }
        if(this.containerDetails[index] != null && this.containerDetails[index].oogRight != null &&
          this.containerDetails[index].oogRight.endsWith(".")){
          this.containerDetails[index].oogRight = this.containerDetails[index].oogRight.substring(0,this.containerDetails[index].oogRight.length-1);
        }
      }
    });
    profileModal.present();
  }

  reInitializeIMDG(indeX: number) {
    this.containerDetails[indeX].imdgDetailsSOs = new Array<ImdgDetailsModel>();
    this.containerDetails[indeX].imdgDetailsSOs.push(new ImdgDetailsModel());
  }

  reInitializeOOG(indeX: number) {
    this.containerDetails[indeX].oogHeight = null;
    this.containerDetails[indeX].oogFront = null;
    this.containerDetails[indeX].oogBack = null;
    this.containerDetails[indeX].oogLeft = null;
    this.containerDetails[indeX].oogRight = null;
  }

  reInitializeReefer(indeX: number) {
    this.containerDetails[indeX].tempScale = null;
    this.containerDetails[indeX].minTemp = null;
    this.containerDetails[indeX].maxTemp = null;
    this.containerDetails[indeX].ventOpen = null;
    this.containerDetails[indeX].humidity = null;
  }

  reInitializeDamage(indeX: number) {
    this.containerDetails[indeX].damageCondition = null;
    this.containerDetails[indeX].damageLocation = null;
    this.containerDetails[indeX].damageItem = null;
    this.containerDetails[indeX].damageCount = null;
    this.containerDetails[indeX].damageWidth = null;
    this.containerDetails[indeX].damageHeight = null;
    this.containerDetails[indeX].damageLength = null;
    this.containerDetails[indeX].damageRemarks = null;
  }

  openModalIMDG(index: any) {
    let profileModal = this.modalCtrl.create(CAIMGDModelComponent, {
      IMDGList: this.containerDetails[index].imdgDetailsSOs,
      IMDGMasterList: this.imdgType,
      mode: true,
      creator: true,
      containerEditMode: true,
      imdgFlag: this.containerDetails[index].imdgFlag,
      packagingList: this.packagingGroup
    });
    profileModal.onDidDismiss(data => {
      if (null != data) {
        this.containerDetails[index].imdgDetailsSOs = data.imdgDetailArray;
      }
    });
    profileModal.present();
  }

  openModalReefer(index: any) {
    let profileModal = this.modalCtrl.create(CAReeferModelComponent, {
      containerElement: this.containerDetails[index],
      mode: true,
      creator: true,
      containerEditMode: true,
      reeferFlag: this.containerDetails[index].reeferFlag
    });
    profileModal.onDidDismiss(data => {
      if (null != data) {
        this.containerDetails[index] = data.containerEle;
        if(this.containerDetails[index].minTemp != null && this.containerDetails[index].minTemp.endsWith(".")){
          this.containerDetails[index].minTemp = this.containerDetails[index].minTemp.substring(0,this.containerDetails[index].minTemp.length-1);
        }
        if(this.containerDetails[index].maxTemp != null && this.containerDetails[index].maxTemp.endsWith(".")){
          this.containerDetails[index].maxTemp = this.containerDetails[index].maxTemp.substring(0,this.containerDetails[index].maxTemp.length-1);
        }
        if(this.containerDetails[index].ventOpen != null && this.containerDetails[index].ventOpen.endsWith(".")){
          this.containerDetails[index].ventOpen = this.containerDetails[index].ventOpen.substring(0,this.containerDetails[index].ventOpen.length-1);
        }
        if(this.containerDetails[index].humidity != null && this.containerDetails[index].humidity.endsWith(".")){
          this.containerDetails[index].humidity = this.containerDetails[index].humidity.substring(0,this.containerDetails[index].humidity.length-1);
        }
        if (this.containerDetails[index].tempScale != null &&
          this.containerDetails[index].tempScale.toString() == "false") {
          this.containerDetails[index].tempScale = null;
        } else {
          this.containerDetails[index].tempScale = "on";
        }
      }
    });
    profileModal.present();
  }

  openModalDamage(index: any) {
    let profileModal = this.modalCtrl.create(CADamageModelComponent, {
      damageCondition: this.containerDetails[index].damageCondition,
      damageLocation: this.containerDetails[index].damageLocation,
      damageItem: this.containerDetails[index].damageItem,
      damageCount: this.containerDetails[index].damageCount,
      damageWidth: this.containerDetails[index].damageWidth,
      damageHeight: this.containerDetails[index].damageHeight,
      damageLength: this.containerDetails[index].damageLength,
      damageRemarks: this.containerDetails[index].damageRemarks,
      containerEditMode: true,
      mode: true
    });
    profileModal.onDidDismiss(data => {
      if (null != data) {
        this.containerDetails[index].damageCondition = data.damageCondition;
        this.containerDetails[index].damageLocation = data.damageLocation;
        this.containerDetails[index].damageItem = data.damageItem;
        this.containerDetails[index].damageCount = data.damageCount;
        this.containerDetails[index].damageWidth = data.damageWidth;
        this.containerDetails[index].damageHeight = data.damageHeight;
        this.containerDetails[index].damageLength = data.damageLength;
        if(this.containerDetails[index].damageWidth != null &&
          this.containerDetails[index].damageWidth.endsWith(".")) {
          this.containerDetails[index].damageWidth =
            this.containerDetails[index].damageWidth.substring(0,this.containerDetails[index].damageWidth.length-1);
        }
        if(this.containerDetails[index].damageHeight != null &&
          this.containerDetails[index].damageHeight.endsWith(".")) {
          this.containerDetails[index].damageHeight =
            this.containerDetails[index].damageHeight.substring(0,this.containerDetails[index].damageHeight.length-1);
        }
        if(this.containerDetails[index].damageLength != null &&
          this.containerDetails[index].damageLength.endsWith(".")) {
          this.containerDetails[index].damageLength =
            this.containerDetails[index].damageLength.substring(0,this.containerDetails[index].damageLength.length-1);
        }
        this.containerDetails[index].damageRemarks = data.damageRemarks;
      }
    });
    profileModal.present();
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

  onISOCodeChanged(currentIsoCode: string, indeX: number) {

    if (this.disableOOGToggle(currentIsoCode)) {
      this.containerDetails[indeX].oog = "false";
    }

    if (this.disableReeferToogle(currentIsoCode)) {
      this.containerDetails[indeX].reefer = "false";
    }
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model, tIndex) {
    this.utils.keyUpValidate(e, format);

    if (model == 'linerbookingnumber') {
      this.selectedModel.linerBookingNumber = e.target.value;
    }
    else if (model == 'containernumber') {
      //this.containerDetails[tIndex].containerNumber = e.target.value.toUpperCase();

      let formatLetter = /^[A-Za-z]*$/i;
      let formatDigit = /^[0-9]*$/i;

      let firstSplitWord: string = '';
      let secondSplitWord: string = '';

      if (this.containerDetails[tIndex].containerNumber.length <= 4) {
        firstSplitWord = e.target.value.toString().substr(0, e.target.value.length);
        if (formatLetter.test(firstSplitWord)) {
          this.previousContainerNo = e.target.value.toUpperCase();
          this.containerDetails[tIndex].containerNumber = e.target.value.toUpperCase();
        } else {
          this.containerDetails[tIndex].containerNumber = this.previousContainerNo;
        }
      } else {
        //firstSplitWord = e.target.value.toString().substr(0, 4);
        secondSplitWord = e.target.value.toString().substr(4, e.target.value.length - 1);
        if (/*formatLetter.test(firstSplitWord) &&*/ formatDigit.test(secondSplitWord)) {
          this.previousContainerNo = e.target.value.toUpperCase();
          this.containerDetails[tIndex].containerNumber = e.target.value.toUpperCase();
        } else {
          this.containerDetails[tIndex].containerNumber = this.previousContainerNo;
        }
      }
    }
    else if (model == 'containerquantity') {
      this.containerDetails[tIndex].containerQuantity = e.target.value;
    }
    else if (model == 'rotateNumber') {
      this.selectedModel.rotationNumber = e.target.value;
    }
    else if (model == 'clientcode') {
      this.nominationsReceived[tIndex].code = e.target.value;
    }
  }

  onPaste(e: any, tIndex: any, containerDetailItem: ContainerDetailsModel) {

    // Do stuff
    setTimeout(() => {
      containerDetailItem.containerNumber = containerDetailItem.containerNumber.toUpperCase();
      this.onFocusChangeContainerNo(tIndex, containerDetailItem);
    });
    // Then clear pasted content from the input
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

  showInfoPopup() {
    let clientCode = localStorage.getItem('CLIENT_CODE');
    this.navCtrl.push(VoyagedetailsPage, {
      sel_rotationNo: this.selectedModel.rotationNumber,
      sel_sameUser: clientCode,
      isOpenService: true
    });
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
