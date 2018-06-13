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
import {Utils} from "../../shared/utils";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {LocationMasterModel} from "../../shared/model/locationmaster.model";
import {SubLocationMasterModel, SubLocationMasterReqModel} from "../../shared/model/sublocationmaster.model";
import {TaSearchSOModel} from "../../shared/model/ta/taSearchSO.model";

import {
  AdditionalDetailsSO,
  TaContainerDetailsSO,
  TruckAppointmentAttachSO,
  TruckappointmentdetailsoModel
} from "../../shared/model/ta/truckappointmentdetailso.model";

import {TaAddQuantityComponent} from "../../components/tamodelpages/ta-add-quantity/ta-add-quantity";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaAddContainerSO} from "../../shared/model/ta/taaddcontainer.model";
import {TaAddContainerComponent} from "../../components/tamodelpages/ta-add-container/ta-add-container";
import {DatePipe} from "@angular/common";
import {TaTruckRegListSOModel, TaTruckRegSOModel} from "../../shared/model/ta/tatruckregso.model";
import {Keyboard} from "@ionic-native/keyboard";
import {TaConfirmationPage} from "../taconfirmation/taconfirmation";
import {TranslateService} from "@ngx-translate/core";


/**
 * Generated class for the TacreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tacreate',
  templateUrl: 'tacreate.html',
  providers: [Utils,]
})
export class TacreatePage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  headerTitle: string;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;
  @ViewChild(Slides) slides: Slides;

  public definedSetListModel: DefinedsetresListModel[];
  public requestTypeList: DefinedSetResModel[] = [];
  public moveTypeList: DefinedSetResModel[] = [];

  public locationModel: LocationMasterModel[] = [];
  public spNameModel: SubLocationMasterModel[] = [];

  locationList: any[] = [];
  spNameList: any[] = [];
  private moveTypeOut: TaContainerDetailsSO[] = [];
  private moveTypeIn: TaContainerDetailsSO[] = [];
  attachments: TruckAppointmentAttachSO[] = [];

  containerDetailsForm: FormGroup;
  appointmentDetailsForm1: FormGroup;
  appointmentDetailsForm2: FormGroup;
  appointmentDetailsForm3: FormGroup;
  appointmentDetailsForm4: FormGroup;

  showAdditionalDetails: boolean = false;
  public timeSlots: string[] = [];

  hideContainerDetails: boolean = true;
  dateFormat: string = 'DD/MM/YYYY';

  showAvailableQuantity: boolean = false;

  currDate: string;
  maxValidDate: string;
  appointmentFrom: any;

  alert: any = null;

  verifyValidTruckNumber: boolean = false;
  showTruckNumber: boolean = false;

  truckNumberArray: TaTruckRegSOModel[];
  filterTruckNumberArray: TaTruckRegSOModel[] = [];

  verifyValidDriverName: boolean = false;
  showDriverName: boolean = false;

  driverNameArray: TaTruckRegSOModel[] = [];
  filterDriverNameArray: TaTruckRegSOModel[];

  private selectedModel: TruckappointmentdetailsoModel = new TruckappointmentdetailsoModel();
  public validDays: number = 0;

  public unregisterBackButtonAction: any;
  error: boolean = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public utils: Utils,
              private commonServices: CommonservicesProvider, private alertCtrl: AlertController, public platform: Platform,
              private taProvider: TruckappointmentserviceProvider, public formBuilder: FormBuilder, public datepipe: DatePipe,
              public keyboard: Keyboard, public translate: TranslateService) {

    translate.setDefaultLang('en');
    translate.use('en');
    this.headerTitle = this.utils.getLocaleString("ta_create");
    this.tabs = [
      this.utils.getLocaleString("ta_tab1"),
      this.utils.getLocaleString("ta_tab2"),
      this.utils.getLocaleString("ta_tab3"),
      this.utils.getLocaleString("ta_tab4"),
      // this.utils.getLocaleString("ta_tab5"),
    ];

    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    // this.dropDown=false;
    this.showRightButton = this.tabs.length > 2;

    this.initializeFeildValidation();
    this.getLocation();
    this.getDefinedSet();
    this.getValidDays();
    this.selectedModel.appointmentSlotCreate = '';
    this.resetShowTabs(0);
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

  public filterTabs(tab: string): void {
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("ta_tab1")) {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
      this.currentTabIndexForNavigation = 0;
    } else if (tab === this.utils.getLocaleString("ta_tab2")) {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
      this.currentTabIndexForNavigation = 1;
    } else if (tab === this.utils.getLocaleString("ta_tab3")) {
      this.resetShowTabs(2);
      this.slides.slideTo(2, 500);
      this.currentTabIndexForNavigation = 2;
    } else if (tab === this.utils.getLocaleString("ta_tab4")) {
      this.resetShowTabs(3);
      this.slides.slideTo(3, 500);
      this.currentTabIndexForNavigation = 3;
    }
    this.hideBottomNavButtons();
    // else if (tab === this.utils.getLocaleString("ta_tab5")) {
    //   this.resetShowTabs(4);
    //   this.slides.slideTo(4, 500);
    // }
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
    this.showAdditionalDetails = false;
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.backAlert();
    }
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  backAlert() {
    if(this.utils.popupHandler() == true) {
      if (!this.containerDetailsForm.dirty && !this.appointmentDetailsForm1.dirty &&
        !this.appointmentDetailsForm2.dirty && !this.appointmentDetailsForm3.dirty &&
        !this.appointmentDetailsForm4.dirty && this.attachments.length == 0) {

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
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Overwrite Back Button Page Change');
      _this.backAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  openTaAddQuantity() {
    let addQuantityModal = this.modalCtrl.create(TaAddQuantityComponent, {
      mode: 'create',
      locationCreate: this.selectedModel.locationCreate,
      spNameCreate: this.selectedModel.spNameCreate,
      requestType: this.requestTypeList
    });

    addQuantityModal.onDidDismiss(data => {
      if (null != data) {
        if (null == data.addQuantity) {
          this.presentAlert("ATTENTION", 'No Data Found');
        } else {
          let addQuantity: TaAddContainerSO = data.addQuantity;
          addQuantity.checkedStatus = false;
          this.assignContainerToMoveType(addQuantity);
        }
      }
    });
    addQuantityModal.present();
  }

  openTaAddContainer(isFromMoveTypeIn: boolean) {
    let addContainerModal = this.modalCtrl.create(TaAddContainerComponent, {
      mode: 'create',
      locationCreate: this.selectedModel.locationCreate,
      spNameCreate: this.selectedModel.spNameCreate,
      moveTypeList: this.moveTypeList,
      isFromMoveTypeIn: isFromMoveTypeIn
    });

    addContainerModal.onDidDismiss(data => {
      if (null != data) {
        if (null != data.addContainer) {
          let addContainer: TaAddContainerSO[] = data.addContainer;
          for (let i = 0; i < addContainer.length; i++) {
            addContainer[i].checkedStatus = true;
            if(!this.isContainerDuplicate(addContainer[i])) {
              this.assignContainerToMoveType(addContainer[i]);
            }
          }
        }
      }
    });
    addContainerModal.present();
  }

  isContainerDuplicate(addContainer: TaAddContainerSO): boolean {
    if (this.moveTypeOut) {
      for (let j = 0; j < this.moveTypeOut.length; j++) {
        if (this.moveTypeOut[j].containerNumberDetails == addContainer.containerNumberDetails) {
          return true;
        }
      }
    }
    if (this.moveTypeIn) {
      for (let j = 0; j < this.moveTypeIn.length; j++) {
        if (this.moveTypeIn[j].containerNumberDetails == addContainer.containerNumberDetails) {
          return true;
        }
      }
    }
    return false;
  }

  public removeContainerDetais(index: number, isFromMoveIn: boolean): void {
    if (isFromMoveIn) {
      this.moveTypeIn.splice(index, 1);
    } else {
      this.moveTypeOut.splice(index, 1);
    }
    if (this.containerCount() == 0) {
      this.resetFields();
    }
  }

  initializeFeildValidation() {
    this.containerDetailsForm = this.formBuilder.group({
      location: ['', Validators.compose([Validators.required])],
      serviceProvider: ['', Validators.compose([Validators.required])]
    });

    this.appointmentDetailsForm1 = this.formBuilder.group({
      agentReferenceNo: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      appointmentFrom: ['', Validators.compose([Validators.required])]
    });

    this.appointmentDetailsForm2 = this.formBuilder.group({
      truckNumberCreate: ['', Validators.compose([Validators.required])]
    });

    this.appointmentDetailsForm3 = this.formBuilder.group({
      trailerNoCreate: ['', Validators.compose([Validators.minLength(3)])],
      driverNameCreate: ['', Validators.compose([Validators.required])]
    });

    this.appointmentDetailsForm4 = this.formBuilder.group({
      alternativeMobileNumber: ['', Validators.compose([Validators.minLength(3)])],
      remarksCreate: ['', Validators.compose([Validators.minLength(3)])]
    });
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

  getLocation() {
    let listAllLocation: Array<any> = [];
    this.taProvider.getLocationMaster(new TaSearchSOModel(), true)
      .subscribe(response => {
          this.locationModel = <LocationMasterModel[]>response;
          for (let i = 0; i < this.locationModel.length; i++) {
            listAllLocation.push(this.locationModel[i].spLocationName);
          }
          this.locationList = Array.from(new Set(listAllLocation));
        },
        error => {
          //Show error message
        });
  }

  getServiceProviderName() {
    let listAllspName: Array<any> = [];
    let spModel = new SubLocationMasterReqModel();
    spModel.location = this.selectedModel.locationCreate;
    this.taProvider.getSpNameMaster(spModel)
      .subscribe(response => {
          this.spNameModel = <SubLocationMasterModel[]>response;
          for (let i = 0; i < this.spNameModel.length; i++) {
            if (this.spNameModel[i].spSubLocationName.trim().length > 0) {
              listAllspName.push(this.spNameModel[i].spSubLocationName);
            }
          }
          this.spNameList = Array.from(new Set(listAllspName));
        },
        error => {
          //Show error message
        });
  }

  onLocationChanged() {
    this.getServiceProviderName();
    this.selectedModel.spNameCreate = '';
    this.hideContainerDetails = true;
    this.resetFields();
  }

  onspNameChanged() {
    if (this.selectedModel.spNameCreate && this.selectedModel.spNameCreate != '') {
      this.hideContainerDetails = false;
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

  onAgentNoFocusChange() {
    if (this.selectedModel.agentReferenceNo  && this.utils.validate(this.selectedModel.agentReferenceNo, '^[a-z0-9A-Z]*$')) {
      this.selectedModel.agentReferenceNo = '';
      this.presentAlert("Attention", "Invalid Agent Reference No");
      return;
    }
    if (this.selectedModel.agentReferenceNo != '' && this.selectedModel.agentReferenceNo.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.selectedModel.agentReferenceNo = "";
    } else {
      if (this.selectedModel.agentReferenceNo != '') {
        this.taProvider.verifyAgentNo(this.selectedModel)
          .subscribe(response => {
              if (response == true) {
                this.selectedModel.agentReferenceNo = '';
                this.presentAlert("ATTENTION", 'Agent Reference No is already used');
              }
            },
            error => {
            });
      }
    }
  }

  onISOCodeChanged(index: number) {
    for (let i = 0; i < this.moveTypeOut[index].taISOQntyListSO.length; i++) {
      if (this.moveTypeOut[index].isoCodeDetails == this.moveTypeOut[index].taISOQntyListSO[i].isoCode) {
        if(this.moveTypeOut[index].taISOQntyListSO[i].contCount) {
          this.moveTypeOut[index].containerCountDetails = Number(this.moveTypeOut[index].taISOQntyListSO[i].contCount);
        }
        this.moveTypeOut[index].maxCount = this.moveTypeOut[index].taISOQntyListSO[i].maxCount;
      }
    }
  }

  onContainerCountChanged(index: number) {
    if (this.moveTypeOut[index].containerCountDetails && this.moveTypeOut[index].containerCountDetails == 0) {
      this.moveTypeOut[index].containerCountDetails = null;
      this.presentAlert("ATTENTION", 'Count should not be zero.');
      return;
    }
    if (this.moveTypeOut[index].containerCountDetails && this.moveTypeOut[index].maxCount) {
      if (this.moveTypeOut[index].containerCountDetails > Number(this.moveTypeOut[index].maxCount)) {
        this.moveTypeOut[index].containerCountDetails = null;
        this.presentAlert("ATTENTION", 'Count should not be more than available count.');
      }
    }
  }

  onAppointmentDateChanged() {
    if (this.appointmentFrom) {
      let prevTimeSlot: any = this.selectedModel.appointmentSlotCreate;
      this.timeSlots = [];
      this.selectedModel.truckNumberCreate = '';
      this.selectedModel.trucktypeCreate = '';
      this.selectedModel.appointmentDateCreate = this.datepipe.transform(this.appointmentFrom, 'dd/MM/yyyy');
      let taSearchReq: TaSearchSOModel = new TaSearchSOModel();
      taSearchReq.appointmentFrom = this.selectedModel.appointmentDateCreate;
      taSearchReq.appointmentNoSearch = '';
      taSearchReq.locationSearch = this.selectedModel.locationCreate;
      taSearchReq.serviceProviderSearch = this.selectedModel.spNameCreate;

      this.taProvider.timeSlotDetails(taSearchReq, true)
        .subscribe(response => {
            if (response && response.length > 0) {
              this.timeSlots = response;
              this.selectedModel.appointmentSlotCreate = JSON.parse(JSON.stringify(this.timeSlots[0]));
              if (prevTimeSlot == this.timeSlots[0]) {
                this.onAppointmentSlotChanged();
              }
            } else {
              this.appointmentFrom = '';
              this.selectedModel.appointmentSlotCreate = '';
              this.presentAlert("ATTENTION", 'Time slots not available for selected date');
            }
          },
          error => {
          });
    }
  }

  onAppointmentSlotChanged() {
    if (this.selectedModel.appointmentSlotCreate && this.selectedModel.appointmentSlotCreate.indexOf("SPL") < 0) {
      let taSearchReq: TaSearchSOModel = new TaSearchSOModel();
      taSearchReq.appointmentFrom = this.selectedModel.appointmentDateCreate;
      taSearchReq.appointmentSlot = this.selectedModel.appointmentSlotCreate;
      taSearchReq.locationSearch = this.selectedModel.locationCreate;
      taSearchReq.serviceProviderSearch = this.selectedModel.spNameCreate;

      this.taProvider.getContainerCount(taSearchReq, true)
        .subscribe(response => {
            this.selectedModel.availableQuantity = response.availableQuantity;
            if (response.availableQuantity <= 10) {
              this.showAvailableQuantity = true;
            } else {
              this.showAvailableQuantity = false;
            }
          },
          error => {
          });
    } else {
      this.selectedModel.availableQuantity = '';
      this.showAvailableQuantity = false;
    }
  }

  getTruckNumberMaster() {
    this.verifyValidTruckNumber = true;
    this.truckNumberArray = [];
    let taTruckRegSOReq = new TaTruckRegSOModel();
    taTruckRegSOReq.appointmentDateCreate = this.selectedModel.appointmentDateCreate;
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

  selectTruckNumber(item: any) {
    this.verifyValidTruckNumber = false;
    this.showTruckNumber = false;
    this.selectedModel.truckNumberCreate = item.licensePlateNumber;
    this.selectedModel.trucktypeCreate = item.truckType;
  }

  hideTruckNumber() {
    setTimeout(() => {
      if(this.selectedModel.truckNumberCreate.length > 0 && this.selectedModel.truckNumberCreate.length < 3 ) {
        this.selectedModel.truckNumberCreate = '';
        this.selectedModel.trucktypeCreate = '';
        this.presentAlert('ATTENTION', 'Invalid Truck Number');
      } else if (this.selectedModel.truckNumberCreate && this.selectedModel.truckNumberCreate.length > 0 && this.verifyValidTruckNumber) {
        let taTruckRegSOReq = new TaTruckRegSOModel();
        taTruckRegSOReq.appointmentDateCreate = this.selectedModel.appointmentDateCreate;
        taTruckRegSOReq.licensePlateNumber = this.selectedModel.truckNumberCreate;
        this.taProvider.getTruckMasters(taTruckRegSOReq, true)
          .subscribe(response => {
              let truckNumber = <TaTruckRegSOModel>response;
              if (truckNumber && truckNumber.plateCode != null && truckNumber.plateCode != '') {
                this.selectedModel.trucktypeCreate = truckNumber.truckType;
              } else {
                this.selectedModel.truckNumberCreate = '';
                this.selectedModel.trucktypeCreate = '';
                this.presentAlert('ATTENTION', 'Invalid Truck Number');
              }
            },
            error => {

            });
      }
      if (this.selectedModel.truckNumberCreate.length == 0) {
        this.selectedModel.trucktypeCreate = '';
      }
      this.verifyValidTruckNumber = false;
      this.showTruckNumber = false;
    }, 500);
  }


  getTruckNumber(ev: any) {
    this.filterTruckNumberArray = this.truckNumberArray;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.selectedModel.truckNumberCreate;
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

  selectDriverName(item: any) {
    this.verifyValidDriverName = false;
    this.showDriverName = false;
    this.selectedModel.driverNameCreate = item.name;
    this.selectedModel.driverMobileNumberCreate = item.driverMobileNo;
  }

  hideDriverName() {
    setTimeout(() => {
      if(this.selectedModel.driverNameCreate.length > 0 && this.selectedModel.driverNameCreate.length < 3) {
        this.selectedModel.driverNameCreate = '';
        this.selectedModel.driverMobileNumberCreate = null;
        this.presentAlert('ATTENTION', 'Invalid Driver Name');
      }
      else if (this.selectedModel.driverNameCreate && this.selectedModel.driverNameCreate.length > 0 && this.verifyValidDriverName) {
        let taTruckRegSOReq = new TaTruckRegSOModel();
        taTruckRegSOReq.name = this.selectedModel.driverNameCreate;
        this.taProvider.getDriverMasterSearch(taTruckRegSOReq)
          .subscribe(response => {
              let driverName = <TaTruckRegSOModel>response;
              if (driverName && driverName.name != null && driverName.name != '') {
                this.selectedModel.driverMobileNumberCreate = Number(driverName.driverMobileNo);
              } else {
                this.selectedModel.driverNameCreate = '';
                this.selectedModel.driverMobileNumberCreate = null;
                this.presentAlert('ATTENTION', 'Invalid Driver Name');
              }
            },
            error => {

            });
      }
      if(this.selectedModel.driverNameCreate.length == 0) {
        this.selectedModel.driverMobileNumberCreate = null;
      }
      this.verifyValidDriverName = false;
      this.showDriverName = false;
    }, 500);
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
      val = this.selectedModel.driverNameCreate;
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

  assignContainerToMoveType(addQuantity: TaAddContainerSO) {

    let selectedItem: TaContainerDetailsSO = new TaContainerDetailsSO();

    selectedItem.containerId;
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

    if (addQuantity.moveTypeDetails.toUpperCase() == 'OUT') {
      if (selectedItem.isFromAddContainer) {
        selectedItem.isoCodeDetails = addQuantity.isoCodeDetails;
      } else {
        selectedItem.isoCodeDetails = '';
        //binded only for UI. Remove it before sending create.
        selectedItem.isoCodeList = addQuantity.isoCodeList;
        selectedItem.taISOQntyListSO = addQuantity.taISOQntyListSO;
      }
      this.moveTypeOut.push(selectedItem);
    }

    if (addQuantity.moveTypeDetails.toUpperCase() == 'IN') {
      selectedItem.isoCodeDetails = addQuantity.isoCodeDetails;
      this.moveTypeIn.push(selectedItem);
    }

  }

  resetFields() {
    this.moveTypeIn = [];
    this.moveTypeOut = [];
    this.selectedModel.appointmentDateCreate = '';
    this.appointmentFrom = '';
    this.timeSlots = [];
    this.selectedModel.appointmentSlotCreate = '';
    this.selectedModel.availableQuantity = null;
    this.showAvailableQuantity = false;
    this.selectedModel.truckNumberCreate = '';
    this.selectedModel.trucktypeCreate = '';
  }

  submit() {

    if (this.containerDetailsForm.valid && this.appointmentDetailsForm1.valid && this.appointmentDetailsForm2.valid
      && this.appointmentDetailsForm3.valid && this.validateContainers() && this.containerCount() > 0) {
      this.showConfirmation();
    } else {
      this.error = true;
      if (this.containerDetailsForm.invalid) {
        this.moveToSlide(0);
        this.presentAlert('ALERT', 'Enter all mandatory fields');
      } else if(this.containerCount() == 0) {
        this.moveToSlide(1);
        this.presentAlert("ATTENTION", 'No containers selected.');
      } else if(!this.validateContainers()) {
        this.moveToSlide(2);
        this.presentAlert('ALERT', 'Enter all mandatory fields');
      } else if (this.appointmentDetailsForm1.invalid || this.appointmentDetailsForm2.invalid || this.appointmentDetailsForm3.invalid) {
        this.moveToSlide(3);
        this.presentAlert('ALERT', 'Enter all mandatory fields');
      }
    }
  }

  moveToSlide(val: number) {
    this.slides.slideTo(val, 500);
    this.resetShowTabs(val);
    this.selectedTab = this.tabs[val];
  }

  showConfirmation() {
    if (this.attachments.find(element => !element.fileUploadId)) {
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
              this.taCreate();
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

  taCreate() {

    if (this.selectedModel.containerDetails == null) {
      this.selectedModel.containerDetails = [];
    }
    this.selectedModel.attachs = this.attachments;
    this.selectedModel.containerDetails = this.moveTypeOut.concat(this.moveTypeIn);

    let createModel: TruckappointmentdetailsoModel = JSON.parse(JSON.stringify(this.selectedModel));
    //createModel.containerDetails = this.moveTypeOut.concat(this.moveTypeIn);
    for (let i = 0; i < createModel.containerDetails.length; i++) {
      delete createModel.containerDetails[i].isoCodeList;
      delete createModel.containerDetails[i].taISOQntyListSO;
      delete createModel.containerDetails[i].isFromAddContainer;
      delete createModel.containerDetails[i].showadvOption;
    }

/*    console.log("Submit TA selectedModel: " + JSON.stringify(this.selectedModel));
    console.log("Submit TA createModel: " + JSON.stringify(createModel));*/

    this.taProvider.saveTruckAppointment(createModel)
      .subscribe(response => {
          let successModel = <TruckappointmentdetailsoModel>response;
          if (successModel && successModel.truckAppointmentNo && successModel.truckAppointmentNo > 0) {
            /*this.navCtrl.push(TasummaryPage, {
              appointmentNoSearch: successModel.truckAppointmentNo,
              agentReferenceNoResult: successModel.agentReferenceNo,
              truckNo: successModel.truckNumberCreate,
              appointmentDateSlot: successModel.appointmentDateCreate,
              //moveTypeSearch: successModel.moveTypeSearch,
              driverName: successModel.driverNameCreate,
              //status: successModel.status,
              //status_icon: this.getStatusIcon(selectedContainer.status)
            });*/
            this.navCtrl.push(TaConfirmationPage, {
              appointmentNo: successModel.truckAppointmentNo,
              successModel: successModel,
              fromSummary: false,
              confirmationMessage: "Truck Appointment submitted successfully."
            });
          }
        },
        error => {
          let errorMsg: string = error[0].message;
          this.translate.get(error[0].errorCode).subscribe(
            value => {
              errorMsg = value;
            }
          );
          this.presentAlert('ALERT', errorMsg);
        });
  }

  uploadAttachment(): boolean {
    if (this.attachments != null && this.attachments.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  initializeAttachment() {
    this.attachments.push(new TruckAppointmentAttachSO());
  }

  addAttachment() {
    if (this.attachments.length < 5) {
      this.attachments.push(new TruckAppointmentAttachSO());
    } else {
      this.presentAlert('ALERT', 'You are not allowed to Upload more than 5 Attachments');
    }
  }

  closeAttachment(attachment: TruckAppointmentAttachSO) {
    for (let i = 0; i < this.attachments.length; i++) {
      if (this.attachments[i] == attachment) {
        this.attachments.splice(i, 1);
        return;
      }
    }
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

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  enableAppointmentDate(): boolean {
    if (this.containerCount() > 0) {
      return true;
    } else {
      return false;
    }
  }

  enableAppointmentSlot(): boolean {
    if (this.selectedModel.appointmentDateCreate && this.timeSlots && this.timeSlots.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  showAdditionDetails(index: number, isFromMoveTypeIn: boolean) {
    this.showAdditionalDetails = !this.showAdditionalDetails;
    /*  if(isFromMoveTypeIn) {
          if(this.moveTypeIn[index].additionalDetails == null)
            this.moveTypeIn[index].additionalDetails = new AdditionalDetailsSO();
        } else {
          if(this.moveTypeOut[index].additionalDetails == null)
            this.moveTypeOut[index].additionalDetails = new AdditionalDetailsSO();
        }*/
  }

  hideAddtionalDetailsIcon(containerIndex: number, isFromMoveTypeIn: boolean) {
    if (isFromMoveTypeIn == true) {
      if ((this.moveTypeIn[containerIndex].containerStatusDetails != null &&
          this.moveTypeIn[containerIndex].containerStatusDetails.toLowerCase() == "export full" ||
          this.moveTypeIn[containerIndex].containerStatusDetails.toLowerCase() == "lcl") &&
        (this.moveTypeIn[containerIndex].taISOQntyListSO == null ||
          this.moveTypeIn[containerIndex].taISOQntyListSO.length == 0)) {
        return false;
      } else {
        return true;
      }
    } else {
      if (this.moveTypeOut[containerIndex].tradeType != null &&
        this.moveTypeOut[containerIndex].tradeType.toLowerCase() == "foreign" &&
        (this.moveTypeOut[containerIndex].containerStatusDetails.toLowerCase() == "fcl") &&
        (this.moveTypeOut[containerIndex].taISOQntyListSO == null ||
          this.moveTypeOut[containerIndex].taISOQntyListSO.length == 0)) {
        return false;
      } else {
        return true;
      }
    }
  }

  validateContainers(): boolean {
    if (this.moveTypeOut != null) {
      for (let i = 0; i < this.moveTypeOut.length; i++) {
        if(!this.moveTypeOut[i].isFromAddContainer && (this.isISOCodeValid(i) || this.isCountDetailsValid(i))) {
          return false;
        }
      }
    }
    return true;
  }

  isISOCodeValid(index: number) : boolean {
    if(!this.moveTypeOut[index].isFromAddContainer &&
      (this.moveTypeOut[index].isoCodeDetails == null || this.moveTypeOut[index].isoCodeDetails == '')) {
      return true;
    } else {
      return false;
    }
  }

  isCountDetailsValid(index: number) : boolean {
    if(!this.moveTypeOut[index].isFromAddContainer &&
      (this.moveTypeOut[index].containerCountDetails == null ||
        this.moveTypeOut[index].containerCountDetails.toString() == '')) {
      return true;
    } else {
      return false;
    }
  }

  containerCount(): number {
    let containerCount: number = 0;
    if(this.moveTypeIn) {
      containerCount = containerCount + this.moveTypeIn.length;
    }
    if(this.moveTypeOut) {
      containerCount = containerCount + this.moveTypeOut.length;
    }
    return containerCount;
  }

  getIcon() {
    if (!this.showAdditionalDetails) {
      return 'arrow-dropdown';
    }
    else {
      return 'arrow-dropup';
    }
  }
  keyboardClose() {
    this.keyboard.close();
  }

  additionDetailonfocusChanged( format, model, tIndex) {

    if (model == 'shipbillno' && this.utils.validate(this.moveTypeIn[tIndex].additionalDetails.shippingBillNo, format)) {
      this.moveTypeIn[tIndex].additionalDetails.shippingBillNo = '';
      this.presentAlert('ATTENTION', 'Invalid Shipping bill No');
    }
    else if(model == 'commoditydescription' && this.utils.validate(this.moveTypeIn[tIndex].additionalDetails.commodityDescription, format)) {
      this.moveTypeIn[tIndex].additionalDetails.commodityDescription = '';
      this.presentAlert('ATTENTION', 'Invalid Commodity Description');
    }
    else if(model == 'declaredweight' && this.utils.validate(this.moveTypeIn[tIndex].additionalDetails.declaredWeight, format)) {
      this.moveTypeIn[tIndex].additionalDetails.declaredWeight = '';
      this.presentAlert('ATTENTION', 'Invalid declared Weight');
    }
    else if(model == 'maxweight' && this.utils.validate(this.moveTypeIn[tIndex].additionalDetails.maxWeight, format)) {
      this.moveTypeIn[tIndex].additionalDetails.maxWeight = '';
      this.presentAlert('ATTENTION', 'Invalid maximum Weight');
    }
    else if(model == 'verifiedmass' && this.utils.validate(this.moveTypeIn[tIndex].additionalDetails.verifiedGross, format)) {
      this.moveTypeIn[tIndex].additionalDetails.verifiedGross = '';
      this.presentAlert('ATTENTION', 'Invalid verified  mass');
    }
    else if(model == 'customSeal' && this.utils.validate(this.moveTypeIn[tIndex].additionalDetails.customSealNo, format)) {
      this.moveTypeIn[tIndex].additionalDetails.customSealNo = '';
      this.presentAlert('ATTENTION', 'Invalid Custom Seal No');
    }
    else if(model == 'agentSeal' && this.utils.validate(this.moveTypeIn[tIndex].additionalDetails.agentSealNo, format)) {
      this.moveTypeIn[tIndex].additionalDetails.agentSealNo = '';
      this.presentAlert('ATTENTION', 'Invalid Agent Seal No');
    }
    else if(model == 'billofentry' && this.utils.validate(this.moveTypeOut[tIndex].additionalDetails.billOfEntry, format)) {
      this.moveTypeOut[tIndex].additionalDetails.billOfEntry = '';
      this.presentAlert('ATTENTION', 'Invalid Bill of entry');
    }
  }

  keyUpValidate(e, format, model, index) {
    this.utils.keyUpValidate(e, format);
    if (model == 'agentReferenceNo') {
      this.selectedModel.agentReferenceNo = e.target.value;
    } else if (model == 'alternativeNumber') {
      this.selectedModel.alternativeMobileNumber = e.target.value;
    } else if (model == 'truckNumber') {
      this.selectedModel.truckNumberCreate = e.target.value;
    } else if (model == 'trailNumber') {
      this.selectedModel.trailerNoCreate = e.target.value;
    } else if (model == 'driverName') {
      this.selectedModel.driverNameCreate = e.target.value;
    } else if(model == 'containerCountDetails') {
      this.moveTypeOut[index].containerCountDetails = e.target.value;
    } else if(model == 'shipbillno') {
      this.moveTypeIn[index].additionalDetails.shippingBillNo =  e.target.value;
    } else if(model == 'commoditydescription') {
      this.moveTypeIn[index].additionalDetails.commodityDescription =  e.target.value;
    } else if(model == 'declaredweight') {
      this.moveTypeIn[index].additionalDetails.declaredWeight =  e.target.value;
    } else if(model == 'maxweight') {
      this.moveTypeIn[index].additionalDetails.maxWeight =  e.target.value;
    } else if(model == 'verifiedmass') {
      this.moveTypeIn[index].additionalDetails.verifiedGross =  e.target.value;
    } else if(model == 'customSeal') {
      this.moveTypeIn[index].additionalDetails.customSealNo =  e.target.value;
    } else if(model == 'agentSeal') {
      this.moveTypeIn[index].additionalDetails.agentSealNo =  e.target.value;
    }
  }
}
