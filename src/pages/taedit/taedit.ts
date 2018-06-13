import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  Content,
  IonicPage,
  ModalController,
  Navbar,
  NavController,
  NavParams,
  Platform,
  Slides
} from 'ionic-angular';
import {
  AdditionalDetailsSO,
  TaContainerDetailsSO,
  TruckAppointmentAttachSO,
  TruckappointmentdetailsoModel
} from "../../shared/model/ta/truckappointmentdetailso.model";
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {TaSearchSOModel} from "../../shared/model/ta/taSearchSO.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {LocationMasterModel} from "../../shared/model/locationmaster.model";
import {SubLocationMasterModel} from "../../shared/model/sublocationmaster.model";
import {Utils} from "../../shared/utils";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {TaadditionaldetailComponent} from "../../components/tamodelpages/taadditionaldetail/taadditionaldetail";
import {TaAddContainerComponent} from "../../components/tamodelpages/ta-add-container/ta-add-container";
import {TaAddContainerSO} from "../../shared/model/ta/taaddcontainer.model";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {DatePipe} from "@angular/common";
import {TaTruckRegListSOModel, TaTruckRegSOModel} from "../../shared/model/ta/tatruckregso.model";
import {TaConfirmationPage} from "../taconfirmation/taconfirmation";
import {Keyboard} from "@ionic-native/keyboard";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the TaeditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-taedit',
  templateUrl: 'taedit.html',
  providers: [Utils]
})

export class TaeditPage {

  public viewRequest: TaSearchSOModel;
  public editRequest: TruckappointmentdetailsoModel;
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  headerTitle: string;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  advSearchOption: boolean = false;

  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;
  attachdirtyFlag: boolean = false;
  containerdirtyFlag: boolean = false;
  @ViewChild(Slides) slides: Slides;
  // @ViewChild('mainSlides') mainslides: Slides;
  public definedSetListModel: DefinedsetresListModel[];
  public requestTypeList: DefinedSetResModel[] = [];
  public moveTypeList: DefinedSetResModel[] = [];

  public locationModel: LocationMasterModel[] = [];
  public spNameModel: SubLocationMasterModel[] = [];

  appointmentDetailsForm1: FormGroup;
  appointmentDetailsForm2: FormGroup;
  appointmentDetailsForm3: FormGroup;
  appointmentDetailsForm4: FormGroup;

  alert: any = null;

  locationList: any[] = [];
  spNameList: any[] = [];
  moveTypeOutList: TaContainerDetailsSO[];
  moveTypeInList: TaContainerDetailsSO[];

  dateFormat: string = 'DD/MM/YYYY';

  appointmentFrom: any;
  currDate: string;
  maxValidDate: string;
  public timeSlots: string[] = [];
  showAvailableQuantity: boolean = false;
  verifyValidTruckNumber: boolean = false;
  showTruckNumber: boolean = false;
  verifyValidDriverName: boolean = false;
  showDriverName: boolean = false;
  filterTruckNumberArray: TaTruckRegSOModel[] = [];
  truckNumberArray: TaTruckRegSOModel[];
  public validDays: number = 0;
  fromSummary: boolean = true;
  public unregisterBackButtonAction: any;


  driverNameArray: TaTruckRegSOModel[] = [];
  filterDriverNameArray: TaTruckRegSOModel[];
  error: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils,
              private commonServices: CommonservicesProvider, private taProvider: TruckappointmentserviceProvider,
              public alertCtrl: AlertController, public modalCtrl: ModalController, public datepipe: DatePipe,
              public keyboard: Keyboard, public formBuilder: FormBuilder,
              public platform: Platform, public translate: TranslateService) {

    translate.setDefaultLang('en');
    translate.use('en');
    this.headerTitle = this.utils.getLocaleString("ta_edit");
    this.tabs = [
      this.utils.getLocaleString("ta_tab1"),
      this.utils.getLocaleString("ta_tab2"),
      this.utils.getLocaleString("ta_tab3"),
      this.utils.getLocaleString("ta_tab4")
    ];
    this.getValidDays();
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    // this.dropDown=false;
    this.showRightButton = this.tabs.length > 2;


    this.resetShowTabs(0);

    this.moveTypeOutList = new Array<TaContainerDetailsSO>();
    this.moveTypeInList = new Array<TaContainerDetailsSO>();

    this.viewRequest = new TaSearchSOModel();
    this.viewRequest.appointmentNoSearch = this.navParams.get('appointmentNoSearch');
    this.fromSummary = this.navParams.get("fromSummary");

    this.appointmentDetailsForm1 = this.formBuilder.group({
      appointmentFrom: ['', Validators.compose([Validators.required])]
    });

    this.appointmentDetailsForm2 = this.formBuilder.group({
      truckNumberCreate: ['', Validators.compose([Validators.required])]
    });

    this.appointmentDetailsForm3 = this.formBuilder.group({
      trailerNoCreate: ['', Validators.minLength(3)],
      driverNameCreate: ['', Validators.compose([Validators.required])]
    });

    this.appointmentDetailsForm4 = this.formBuilder.group({
      alternativeMobileNumber: ['', Validators.minLength(3)],
      remarksCreate: ['', Validators.minLength(3)]
    });

    this.getDefinedSet();
    this.loadTA();

  }

  ionViewDidLoad() {
    this.utils.setPaddingForScrollContent(false);
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.backAlert();
    }
  }

  backAlert() {
    if (!this.appointmentDetailsForm1.dirty &&
      !this.appointmentDetailsForm2.dirty && !this.appointmentDetailsForm3.dirty
      && !this.appointmentDetailsForm4.dirty
      && !this.attachdirtyFlag && !this.containerdirtyFlag) {

      this.navCtrl.pop();
    } else {
      if (this.alert) {
        this.alert.dismiss();
        this.alert = null;
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

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Overwrite Back Button Page Change');
      _this.backAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  ionViewWillLeave() {
    this.utils.setPaddingForScrollContent(false);
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
    // this.utils.setPaddingForScrollContent(true);
  }

// Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();

  }




  public filterTabs(tab: string): void {
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("ta_tab1")) {
      this.resetShowTabs(0);
      // this.mainslides.slideTo(0, 500);
      this.slides.slideTo(0, 500);
      this.currentTabIndexForNavigation = 0;


    } else if (tab === this.utils.getLocaleString("ta_tab3")) {
      this.resetShowTabs(1);
      // this.mainslides.slideTo(2, 500);

      this.slides.slideTo(2, 500);
      this.currentTabIndexForNavigation = 2;

    } else if (tab === this.utils.getLocaleString("ta_tab2")) {
      this.resetShowTabs(2);
      // this.mainslides.slideTo(1, 500);
      this.slides.slideTo(1, 500);
      this.currentTabIndexForNavigation = 1;

    } else if (tab === this.utils.getLocaleString("ta_tab4")) {
      this.resetShowTabs(3);
      // this.mainslides.slideTo(3, 500);

      this.slides.slideTo(3, 500);
      this.currentTabIndexForNavigation = 3;

    }
    this.hideBottomNavButtons();

    this.selectedTab = tab;
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

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['REQUEST_TYPE', 'MOVE_TYPE'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {

            if (this.definedSetListModel[i].definedSetName == 'REQUEST_TYPE') {
              this.requestTypeList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              if (this.requestTypeList.length > 0 && this.requestTypeList[0].definedSetValueCode == '') {
                this.requestTypeList.splice(0, 1);
              }
            }
            if (this.definedSetListModel[i].definedSetName == 'MOVE_TYPE') {
              this.moveTypeList = this.definedSetListModel[i].definedSetValues;
            }
          }
        },
        error => {
          //Show error message
        });
  }

  loadTA() {
    this.editRequest = new TruckappointmentdetailsoModel();
    this.taProvider.searchTaById(this.viewRequest).subscribe(
      response => {
        this.editRequest = <TruckappointmentdetailsoModel>response;
        this.appointmentFrom = this.editRequest.appointmentDateCreate;
        this.onAppointmentDateChanged(false);
        this.onAppointmentSlotChanged(false);
        if (this.editRequest != null && this.editRequest.containerDetails != null) {
          if (this.editRequest.containerDetails.length != 0) {
            for (let i = 0; i < this.editRequest.containerDetails.length; i++) {

              delete this.editRequest.containerDetails[i].additionalDetails.additonalId;

              if (this.editRequest.containerDetails[i].moveTypeDetails.toLowerCase() == 'in') {
                this.moveTypeInList.push(this.editRequest.containerDetails[i]);
              } else {
                this.moveTypeOutList.push(this.editRequest.containerDetails[i]);
              }
            }
          }
        }
      }
    );
  }

  openMoveTypeInModel() {
    this.navCtrl.push(TaadditionaldetailComponent, {
      isMoveTypeIn: true,
    });
  }

  openMoveTypeOutModel() {
    this.navCtrl.push(TaadditionaldetailComponent, {
      isMoveTypeIn: false,

    });
  }

  openTaAddContainer(isFromMoveTypeIn: boolean) {
    let addContainerModal = this.modalCtrl.create(TaAddContainerComponent, {
      mode: 'edit',
      locationCreate: this.editRequest.locationCreate,
      spNameCreate: this.editRequest.spNameCreate,
      moveTypeList: this.moveTypeList,
      isFromMoveTypeIn: isFromMoveTypeIn
    });

    addContainerModal.onDidDismiss(data => {
      if (null != data) {
        if (null != data.addContainer) {
          this.containerdirtyFlag = true;
          let addContainer: TaAddContainerSO[] = data.addContainer;
          for (let i = 0; i < addContainer.length; i++) {
            if (!this.isContainerDuplicate(addContainer[i])) {
              this.assignContainerToMoveType(addContainer[i]);
            }
          }
        }
      }
    });
    addContainerModal.present();
  }

  isContainerDuplicate(addContainer: TaAddContainerSO): boolean {
    if (this.moveTypeOutList) {
      for (let j = 0; j < this.moveTypeOutList.length; j++) {
        if (this.moveTypeOutList[j].containerNumberDetails == addContainer.containerNumberDetails) {
          return true;
        }
      }
    }
    if (this.moveTypeInList) {
      for (let j = 0; j < this.moveTypeInList.length; j++) {
        if (this.moveTypeInList[j].containerNumberDetails == addContainer.containerNumberDetails) {
          return true;
        }
      }
    }
    return false;
  }

  hideAddtionalDetailsIcon(containerIndex: number, isFromMoveTypeIn: boolean) {
    if (isFromMoveTypeIn == true) {
      if ((this.moveTypeInList[containerIndex].containerStatusDetails != null &&
          this.moveTypeInList[containerIndex].containerStatusDetails.toLowerCase() == "export full" ||
          this.moveTypeInList[containerIndex].containerStatusDetails.toLowerCase() == "lcl") &&
        (this.moveTypeInList[containerIndex].taISOQntyListSO == null ||
          this.moveTypeInList[containerIndex].taISOQntyListSO.length == 0)) {
        return false;
      } else {
        return true;
      }

    } else {
      if (this.moveTypeOutList[containerIndex].tradeType != null &&
        this.moveTypeOutList[containerIndex].tradeType.toLowerCase() == "foreign" &&
        (this.moveTypeOutList[containerIndex].containerStatusDetails.toLowerCase() == "fcl") &&
        (this.moveTypeOutList[containerIndex].taISOQntyListSO == null ||
          this.moveTypeOutList[containerIndex].taISOQntyListSO.length == 0)) {
        return false;
      } else {
        return true;
      }
    }
  }

  assignContainerToMoveType(addQuantity: TaAddContainerSO) {

    let selectedItem: TaContainerDetailsSO = new TaContainerDetailsSO();

    //selectedItem.containerId;
    selectedItem.containerDetailId = addQuantity.containerDetailId;
    selectedItem.containerNumberDetails = addQuantity.containerNumberDetails;
    selectedItem.containerRotationNumber = addQuantity.containerRotationNumber;
    selectedItem.containerStatus = addQuantity.containerStatus;
    selectedItem.containerStatusDetails = addQuantity.containerStatusDetails;
    selectedItem.cutOffTimeDetails = addQuantity.cutOffTimeDetails;
    selectedItem.docType = addQuantity.docType;
    //selectedItem.eirNoDetails;
    selectedItem.moveTypeDetails = addQuantity.moveTypeDetails;
    selectedItem.mvmntNomintdByTPR = addQuantity.mvmntNomintdByTPR;
    selectedItem.mvmntNomintdByFF = addQuantity.mvmntNomintdByFF;
    selectedItem.mvmntNomintdByIE = addQuantity.mvmntNomintdByIE;
    selectedItem.mvmntNomintdByCHA = addQuantity.mvmntNomintdByCHA;
    selectedItem.mvmntNomintdByCFS = addQuantity.mvmntNomintdByCFS;
    selectedItem.mvmntNomintdByEY = addQuantity.mvmntNomintdByEY;
    selectedItem.portOfDischrge = addQuantity.portOfDischrge;
    selectedItem.requestNo = addQuantity.requestNo;
    selectedItem.shipperName = addQuantity.shipperName;
    selectedItem.shippingLineDetails = addQuantity.shippingLineDetails;
    selectedItem.tradeType = addQuantity.tradeType;
    selectedItem.trasporterCompany = addQuantity.trasporterCompany;

    selectedItem.additionalDetails = new AdditionalDetailsSO();

    //variable added to find from where the container is added.
    selectedItem.isFromAddContainer = addQuantity.checkedStatus;

    if (addQuantity.moveTypeDetails.toLowerCase() == 'out') {
      if (selectedItem.isFromAddContainer) {
        selectedItem.isoCodeDetails = addQuantity.isoCodeDetails;
      } else {
        //binded only for UI. Remove it before sending create.
        selectedItem.isoCodeList = addQuantity.isoCodeList;
        selectedItem.taISOQntyListSO = addQuantity.taISOQntyListSO;
      }
      this.moveTypeOutList.push(selectedItem);
    }
    if (addQuantity.moveTypeDetails.toLowerCase() == 'in') {
      selectedItem.isoCodeDetails = addQuantity.isoCodeDetails;
      this.moveTypeInList.push(selectedItem);
    }
  }

  closeAttachment(attachment: TruckAppointmentAttachSO) {
    this.attachdirtyFlag = true;
    for (var i = 0; i < this.editRequest.attachs.length; i++) {
      if (this.editRequest.attachs[i] == attachment) {
        this.editRequest.attachs.splice(i, 1);
        break;
      }
    }
  }

  addAttachment() {
    this.attachdirtyFlag = true;
    if (this.editRequest.attachs != null && this.editRequest.attachs.length < 5) {
      this.editRequest.attachs.push(new TruckAppointmentAttachSO());
    } else {
      this.presentAlert('ALERT', 'You are not allowed to Upload more than 5 Attachments.');
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

  showAdvSearch(containerIndex: number, isMoveTypeIn: boolean) {
    if (isMoveTypeIn == true) {
      this.moveTypeInList[containerIndex].showadvOption = !this.moveTypeInList[containerIndex].showadvOption;
    } else {
      this.moveTypeOutList[containerIndex].showadvOption = !this.moveTypeOutList[containerIndex].showadvOption;
    }
  }

  getIcon(containerIndex: number, isMoveTypeIn: boolean) {
    if (isMoveTypeIn == true) {
      if (!this.moveTypeInList[containerIndex].showadvOption) {
        return 'arrow-dropdown';
      } else {
        return 'arrow-dropup';
      }
    } else {
      if (!this.moveTypeOutList[containerIndex].showadvOption) {
        return 'arrow-dropdown';
      } else {
        return 'arrow-dropup';
      }
    }
  }

  onAgentNoFocusChange() {
    if (this.editRequest.agentReferenceNo != '' && this.editRequest.agentReferenceNo.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.editRequest.agentReferenceNo = "";
    } else {
      if (this.editRequest.agentReferenceNo != '') {
        this.taProvider.verifyAgentNo(this.editRequest)
          .subscribe(response => {
              if (response == true) {
                this.editRequest.agentReferenceNo = '';
                this.presentAlert("ATTENTION", 'Agent Reference No is already used');
              }
            },
            error => {
            });
      }
    }
  }

  onAppointmentDateChanged(flag: boolean) {
    if (this.appointmentFrom) {
      let taSearchReq: TaSearchSOModel = new TaSearchSOModel();
      if (flag) {
        this.appointmentFrom = this.datepipe.transform(this.appointmentFrom, 'dd/MM/yyyy');
        taSearchReq.appointmentFrom = this.appointmentFrom;
      } else {
        this.appointmentFrom = this.parsedate(this.appointmentFrom);
        taSearchReq.appointmentFrom = this.editRequest.appointmentDateCreate;
      }

      taSearchReq.appointmentNoSearch = '';
      taSearchReq.locationSearch = this.editRequest.locationCreate;
      taSearchReq.serviceProviderSearch = this.editRequest.spNameCreate;

      this.taProvider.timeSlotDetails(taSearchReq, false)
        .subscribe(response => {
            if (response && response.length > 0) {
              this.timeSlots = response;
              if (flag) {
                this.editRequest.appointmentSlotCreate = this.timeSlots[0];
              } else {
                let searchresult = this.timeSlots.find(item => item == this.editRequest.appointmentSlotCreate);
                if (searchresult == null) {
                  this.timeSlots.unshift(this.editRequest.appointmentSlotCreate);
                }
              }
            } else {
              if (flag) {
                this.editRequest.appointmentSlotCreate = '';
                this.presentAlert("ATTENTION", 'Time slots not available for selected date');
              }
            }
          },
          error => {
          });
    }

  }

  onAppointmentSlotChanged(showloading: boolean) {
    let taSearchReq: TaSearchSOModel = new TaSearchSOModel();
    taSearchReq.appointmentFrom = this.editRequest.appointmentDateCreate;
    taSearchReq.appointmentSlot = this.editRequest.appointmentSlotCreate;
    taSearchReq.locationSearch = this.editRequest.locationCreate;
    taSearchReq.serviceProviderSearch = this.editRequest.spNameCreate;

    this.taProvider.getContainerCount(taSearchReq, showloading)
      .subscribe(response => {
          this.editRequest.availableQuantity = response.availableQuantity;
          if (response.availableQuantity <= 10) {
            this.showAvailableQuantity = true;
          } else {
            this.showAvailableQuantity = false;
          }
        },
        error => {
        });
  }

  getTruckNumberMaster() {
    this.verifyValidTruckNumber = true;
    this.truckNumberArray = [];
    let taTruckRegSOReq = new TaTruckRegSOModel();
    taTruckRegSOReq.appointmentDateCreate = this.editRequest.appointmentDateCreate;
    taTruckRegSOReq.countryOfRegistration = '';
    taTruckRegSOReq.licensePlateNumber = '';
    taTruckRegSOReq.plateCode = '';
    taTruckRegSOReq.plateType = '';
    taTruckRegSOReq.pool = '';
    taTruckRegSOReq.stateEmirates = '';

    this.taProvider.getTruckMastersFull(taTruckRegSOReq)
      .subscribe(responseList => {
          let truckNumberList = <TaTruckRegListSOModel>responseList;
          this.truckNumberArray = truckNumberList.list;
          if (this.verifyValidTruckNumber) {
            this.getTruckNumber(null);
          }
        },
        error => {

        })
  }

  hideTruckNumber() {
    setTimeout(() => {
      if(this.editRequest.truckNumberCreate.length > 0 && this.editRequest.truckNumberCreate.length < 3) {
        this.editRequest.truckNumberCreate = '';
        this.editRequest.trucktypeCreate = '';
        this.presentAlert('ATTENTION', 'Invalid Truck Number');
      }
      else if (this.editRequest.truckNumberCreate && this.editRequest.truckNumberCreate.length > 0 && this.verifyValidTruckNumber) {
        let taTruckRegSOReq = new TaTruckRegSOModel();
        taTruckRegSOReq.appointmentDateCreate = this.editRequest.appointmentDateCreate;
        taTruckRegSOReq.licensePlateNumber = this.editRequest.truckNumberCreate;
        this.taProvider.getTruckMasters(taTruckRegSOReq, true)
          .subscribe(response => {
              let truckNumber = <TaTruckRegSOModel>response;
              if (truckNumber && truckNumber.plateCode != null && truckNumber.plateCode != '') {
                this.editRequest.trucktypeCreate = truckNumber.truckType;
              } else {
                this.editRequest.truckNumberCreate = '';
                this.editRequest.trucktypeCreate = '';
                this.presentAlert('ATTENTION', 'Invalid Truck Number');
              }
            },
            error => {

            });
      }
      if (this.editRequest.truckNumberCreate.length == 0) {
        this.editRequest.trucktypeCreate = '';
      }
      this.verifyValidTruckNumber = false;
      this.showTruckNumber = false;
    }, 500);
  }


  getTruckNumber(ev: any) {
    this.editRequest.trucktypeCreate = "";
    this.filterTruckNumberArray = this.truckNumberArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.editRequest.truckNumberCreate;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterTruckNumberArray = this.filterTruckNumberArray.filter((item) => {
        if (item.licensePlateNumber.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showTruckNumber = true;
        }
        return (item.licensePlateNumber.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showTruckNumber = false;
    }
  }

  selectTruckNumber(item: any) {
    this.verifyValidTruckNumber = false;
    this.showTruckNumber = false;
    this.editRequest.truckNumberCreate = item.licensePlateNumber;
    this.editRequest.trucktypeCreate = item.truckType;
  }

  selectDriverName(item: any) {
    this.verifyValidDriverName = false;
    this.showDriverName = false;
    this.editRequest.driverNameCreate = item.name;
    this.editRequest.driverMobileNumberCreate = item.driverMobileNo;

  }

  uploadAttachment(): boolean {
    if (this.editRequest.attachs != null && this.editRequest.attachs.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  initializeAttachment() {
    this.editRequest.attachs.push(new TruckAppointmentAttachSO());
  }

  uploadDocs(attachment: TruckAppointmentAttachSO) {
    this.taProvider.uploadDocuments()
      .then(data => {
        attachment.fileName = data.fileName;
        attachment.fileUploadId = data.fileUploadId;
        attachment.hideUploadButton = false;
      }, error => {

      });
  }

  displayAttachment(attachment: TruckAppointmentAttachSO) {
    this.taProvider.openAttachment(attachment);
  }

  showConfirmation() {
    if (this.editRequest.attachs != null && this.editRequest.attachs.find(element => !element.fileUploadId)) {
      this.presentAlert("Attention", 'Please attach files.');
    } else {
      let alertMsg = 'Do you want to submit your request?';
      const alert = this.alertCtrl.create({
        title: 'CONFIRM BOX',
        message: alertMsg,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.taAmendRequest();
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

  taAmendRequest() {

    let backupModel: TruckappointmentdetailsoModel = JSON.parse(JSON.stringify(this.editRequest));

    if (this.editRequest.containerDetails == null) {
      this.editRequest.containerDetails = [];
    }
    if (this.appointmentFrom.toString().includes("-")) {
      this.editRequest.appointmentDateCreate = this.datepipe.transform(this.appointmentFrom, 'dd/MM/yyyy');
    } else {
      this.editRequest.appointmentDateCreate = this.appointmentFrom;
    }

    this.editRequest.containerDetails = this.moveTypeOutList.concat(this.moveTypeInList);

    for (let i = 0; i < this.editRequest.containerDetails.length; i++) {
      delete this.editRequest.containerDetails[i].isoCodeList;
      delete this.editRequest.containerDetails[i].taISOQntyListSO;
      delete this.editRequest.containerDetails[i].isFromAddContainer;

    }

    let editResponse: TruckappointmentdetailsoModel = new TruckappointmentdetailsoModel();
    this.taProvider.saveModifiedTA(this.editRequest)
      .subscribe(response => {
          editResponse = <TruckappointmentdetailsoModel>response;
          this.navCtrl.push(TaConfirmationPage, {
            appointmentNo: this.viewRequest.appointmentNoSearch,
            successModel: editResponse,
            fromSummary: this.fromSummary,
            confirmationMessage: "Truck Appointment amended successfully."
          });
        },
        error => {
          let errorMsg: string = error[0].message;
          this.translate.get(error[0].errorCode).subscribe(
            value => {
              errorMsg = value;
            }
          );
          this.presentAlert('ALERT', errorMsg);

          /*restoring on failure*/
          this.editRequest = JSON.parse(JSON.stringify(backupModel));
        });
  }

  keyboardClose() {
    this.keyboard.close();
  }

  additionDetailonfocusChanged( format, model, tIndex) {

    if (model == 'shipbillno' && this.utils.validate(this.moveTypeInList[tIndex].additionalDetails.shippingBillNo, format)) {
      this.moveTypeInList[tIndex].additionalDetails.shippingBillNo = '';
      this.presentAlert('ATTENTION', 'Invalid Shipping bill No');
    }
    else if(model == 'commoditydescription' && this.utils.validate(this.moveTypeInList[tIndex].additionalDetails.commodityDescription, format)) {
      this.moveTypeInList[tIndex].additionalDetails.commodityDescription = '';
      this.presentAlert('ATTENTION', 'Invalid Commodity Description');
    }
    else if(model == 'declaredweight' && this.utils.validate(this.moveTypeInList[tIndex].additionalDetails.declaredWeight, format)) {
      this.moveTypeInList[tIndex].additionalDetails.declaredWeight = '';
      this.presentAlert('ATTENTION', 'Invalid declared Weight');
    }
    else if(model == 'maxweight' && this.utils.validate(this.moveTypeInList[tIndex].additionalDetails.maxWeight, format)) {
      this.moveTypeInList[tIndex].additionalDetails.maxWeight = '';
      this.presentAlert('ATTENTION', 'Invalid maximum Weight');
    }
    else if(model == 'verifiedmass' && this.utils.validate(this.moveTypeInList[tIndex].additionalDetails.verifiedGross, format)) {
      this.moveTypeInList[tIndex].additionalDetails.verifiedGross = '';
      this.presentAlert('ATTENTION', 'Invalid verified  mass');
    }
    else if(model == 'customSeal' && this.utils.validate(this.moveTypeInList[tIndex].additionalDetails.customSealNo, format)) {
      this.moveTypeInList[tIndex].additionalDetails.customSealNo = '';
      this.presentAlert('ATTENTION', 'Invalid Custom Seal No');
    }
    else if(model == 'agentSeal' && this.utils.validate(this.moveTypeInList[tIndex].additionalDetails.agentSealNo, format)) {
      this.moveTypeInList[tIndex].additionalDetails.agentSealNo = '';
      this.presentAlert('ATTENTION', 'Invalid Agent Seal No');
    }
    else if(model == 'billofentry' && this.utils.validate(this.moveTypeOutList[tIndex].additionalDetails.billOfEntry, format)) {
      this.moveTypeOutList[tIndex].additionalDetails.billOfEntry = '';
      this.presentAlert('ATTENTION', 'Invalid Bill of entry');
    }
  }

  keyUpValidate(e, format, model, tIndex) {
    this.utils.keyUpValidate(e, format);
    if (model == 'truckNumber') {
      this.editRequest.truckNumberCreate = e.target.value;
    }
    else if (model == 'trailNumber') {
      this.editRequest.trailerNoCreate = e.target.value;
    }
    else if (model == 'driverName') {
      this.editRequest.driverNameCreate = e.target.value;
    }
    else if (model == 'alternativeNumber') {
      this.editRequest.alternativeMobileNumber = e.target.value;
    }
    else if (model == 'shipbillno') {
      this.moveTypeInList[tIndex].additionalDetails.billOfEntry = e.target.value;
    }
    else if (model == 'commoditydescription') {
      this.moveTypeInList[tIndex].additionalDetails.commodityDescription = e.target.value;
    }
    else if (model == 'declaredweight') {
      this.moveTypeInList[tIndex].additionalDetails.declaredWeight = e.target.value;
    }
    else if (model == 'maxweight') {
      this.moveTypeInList[tIndex].additionalDetails.maxWeight = e.target.value;
    }
    else if (model == 'verifiedmass') {
      this.moveTypeInList[tIndex].additionalDetails.verifiedGross = e.target.value;
    }
    else if (model == 'customSeal') {
      this.moveTypeInList[tIndex].additionalDetails.customSealNo = e.target.value;
    }
    else if (model == 'agentSeal') {
      this.moveTypeInList[tIndex].additionalDetails.agentSealNo = e.target.value;
    }
    else if (model == 'billofentry') {
      this.moveTypeOutList[tIndex].additionalDetails.billOfEntry = e.target.value;
    }
  }

  submit() {
    if ((this.moveTypeInList.length + this.moveTypeOutList.length) == 0) {
      this.presentAlert("ATTENTION", 'No containers selected.');
      this.resetShowTabs(2);
      this.slides.slideTo(1, 500);
      this.selectedTab = this.tabs[1];
      return;
    }
    if (this.appointmentDetailsForm1.valid && this.appointmentDetailsForm2.valid && this.appointmentDetailsForm3.valid) {
      this.showConfirmation();
    }
    else {
      this.error = true;
      this.presentAlert('ALERT', 'Enter all mandatory fields');
    }

  }

  getValidDays() {
    this.taProvider.validDays(new TaSearchSOModel())
      .subscribe(response => {
          this.validDays = response;
          this.currDate = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();
          let newDate: any = new Date();
          this.maxValidDate = new Date(newDate.setDate(newDate.getDate() + this.validDays)).toISOString();
        },
        error => {
          //Show error message
        });
  }

  getDriverNameMaster() {
    this.verifyValidDriverName = true;
    this.driverNameArray = [];
    let taTruckRegSOReq = new TaTruckRegSOModel();
    taTruckRegSOReq.driverMobileNo = '';
    taTruckRegSOReq.name = '';
    taTruckRegSOReq.pool = '';
    taTruckRegSOReq.transporterName = '';

    this.taProvider.getDriverMaster(taTruckRegSOReq, false)
      .subscribe(responseList => {
          let driverNameList = <TaTruckRegListSOModel>responseList;
          this.driverNameArray = driverNameList.list;
          if (this.verifyValidDriverName) {
            this.getDriverName(null);
          }
        },
        error => {

        })
  }

  getDriverName(ev: any) {
    this.filterDriverNameArray = this.driverNameArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.editRequest.driverNameCreate;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterDriverNameArray = this.filterDriverNameArray.filter((item) => {
        if (item.name.toString().toLowerCase().includes(val.toString().toLowerCase())) {
          this.showDriverName = true;
        }
        return (item.name.toString().toLowerCase().includes(val.toString().toLowerCase()));
      });
    } else {
      // hide the results when the query is empty
      this.showDriverName = false;
    }
  }

  public removeContainerDetais(index: any, moveintype: true): void {
    this.containerdirtyFlag = true;
    if (moveintype) {
      this.moveTypeInList.splice(index, 1);
    }
    else {
      this.moveTypeOutList.splice(index, 1);
    }
    if ((this.moveTypeInList.length + this.moveTypeOutList.length) == 0) {
      this.appointmentFrom = "";
      this.timeSlots = [];
      this.editRequest.appointmentSlotCreate = "";
      this.showAvailableQuantity = false;
      this.editRequest.truckNumberCreate = "";
      this.editRequest.trucktypeCreate = "";
      this.editRequest.availableQuantity = "";
    }
  }

  checkStatus(): boolean {
    if ((this.moveTypeInList.length + this.moveTypeOutList.length) > 1) {
      return true;
    }
    else {
      return false;
    }
  }

  hideDriverName() {
    setTimeout(() => {
      if(this.editRequest.driverNameCreate.length > 0 && this.editRequest.driverNameCreate.length < 3) {
        this.editRequest.driverNameCreate = '';
        this.editRequest.driverMobileNumberCreate = null;
        this.presentAlert('ATTENTION', 'Invalid Driver Name');
      }
      else if (this.editRequest.driverNameCreate && this.editRequest.driverNameCreate.length > 0 && this.verifyValidDriverName) {
        let taTruckRegSOReq = new TaTruckRegSOModel();
        taTruckRegSOReq.name = this.editRequest.driverNameCreate;
        this.taProvider.getDriverMasterSearch(taTruckRegSOReq)
          .subscribe(response => {
              let driverName = <TaTruckRegSOModel>response;
              if (driverName && driverName.name != null && driverName.name != '') {
                this.editRequest.driverMobileNumberCreate = Number(driverName.driverMobileNo);
              } else {
                this.editRequest.driverNameCreate = '';
                this.editRequest.driverMobileNumberCreate = null;
                this.presentAlert('ATTENTION', 'Invalid Driver Name');
              }
            },
            error => {

            });
      }
      if (this.editRequest.driverNameCreate.length == 0) {
        this.editRequest.driverMobileNumberCreate = null;
      }
      this.verifyValidDriverName = false;
      this.showDriverName = false;
    }, 500);
  }

  enableAppointmentDate(): boolean {
    if ((this.moveTypeOutList && this.moveTypeOutList.length > 0) || (this.moveTypeInList && this.moveTypeInList.length > 0)) {
      return true;
    } else {
      return false;
    }
  }

  enableAppointmentSlot(): boolean {
    if (this.appointmentFrom && this.timeSlots && this.timeSlots.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  parsedate(dtstring) {
    if (dtstring != null) {
      let pattern = /(\d{2})(\d{2})(\d{4})/;
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace("/", "");
      let date = dtstring.replace(pattern, '$3-$2-$1');
      return date;
    }
    else {
      return null;
    }
  }

  showDelete(containerStatus: string, fromMoveTypeIn: boolean): boolean {
    if (fromMoveTypeIn == true) {
      if ((containerStatus != null) && (containerStatus.toLowerCase() == "in terminal/yard")) {
        return false;
      } else {
        return true;
      }
    } else {
      if ((containerStatus != null) && (containerStatus.toLowerCase() == "completed")) {
        return false;
      } else {
        return true;
      }
    }
  }
  currentTabIndexForNavigation = 0;
  hidePreviousButton:boolean = false;
  hideNextButton:boolean = true;
  slideSelectedPrev()
  {

    if(this.currentTabIndexForNavigation > 0 )
    {
      this.currentTabIndexForNavigation = this.currentTabIndexForNavigation - 1
      this.filterTabs(this.tabs[this.currentTabIndexForNavigation]);
    }
    this.hideBottomNavButtons()

  }
  slideSelectedNext()
  {
    if(this.currentTabIndexForNavigation < 3 ) {
      this.filterTabs(this.tabs[this.currentTabIndexForNavigation + 1]);
    }
    this.hideBottomNavButtons()
  }

  hideBottomNavButtons(){
    if(this.currentTabIndexForNavigation > 0  &&  this.currentTabIndexForNavigation < 3)
    {
      this.hidePreviousButton = true;
      this.hideNextButton = true;
    }
    if(this.currentTabIndexForNavigation == 0 ) {
      this.hidePreviousButton = false;
      this.hideNextButton = true;
    }
    if(this.currentTabIndexForNavigation == 3) {
      this.hidePreviousButton = true;
      this.hideNextButton = false;
    }

  }
}

