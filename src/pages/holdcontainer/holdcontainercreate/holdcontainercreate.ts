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
import {Utils} from "../../../shared/utils";


import {Keyboard} from "@ionic-native/keyboard";

import {DatePipe} from "@angular/common";
import {HoldContainerSO, HoldSpecificationDetailsSO} from "../../../shared/model/hnrc/holdcontainerso.model";
import {UserDataModel} from "../../../shared/model/userdata.model";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {HRCAppParamSO} from "../../../shared/model/hnrc/hrcappparamso.model";
import {HnrclineModel} from "../../../shared/model/hnrc/hnrclinemaster.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContainerDetailSO} from "../../../shared/model/hnrc/releasecontainersrch.model";
import {HoldSpecDetailsListSO} from "../../../shared/model/hnrc/holdspecdetailslistso.model";
import {HoldContainerConfirmation} from "../holdcontainerconfirmation/holdcontainerconfirmation";
import {GenericAddContainerComponent} from "../../../components/addContainerGenericModel/generic-add-container";


/**
 * Generated class for the TacreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-holdcontainercreate',
  templateUrl: 'holdcontainercreate.html',

  providers: [Utils, HoldContainerSO]

})
export class HoldContainerCreatePage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  public tabs: Array<any>;
  private isError: boolean = false;
  private isErrorContainer: boolean = false;
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  currentTabIndexForNavigation = 0;
  hidePreviousButton:boolean = false;
  hideNextButton:boolean = true;
  public showRightButton: boolean;
  errorTime: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;
  public showTabs: Array<boolean> = [false, false];
  //containerCategoryStatus: Array<boolean> = [];
  //lineCodeStatus: Array<boolean> = [];

  public unregisterBackButtonAction: any;

  groupOne: FormGroup;
  groupTwo: FormGroup;
  groupThree: FormGroup;
  groupFour: FormGroup;
  groupFive: FormGroup;
  groupSix: FormGroup;
  groupSeven: FormGroup;
  groupEight: FormGroup;
  groupNine: FormGroup;
  groupTen: FormGroup;
  groupEleven: FormGroup;
  groupTwelve: FormGroup;

  otherReason:any;
  public alert: any = null;

  locationList: any[] = [];
  spNameList: any[] = [];
  lineCodeList: any[] = [];

  selectedLineCodes: any[] = [];
  selectedContainerCategories: any[] = [];

  public definedSetListModel: DefinedsetresListModel[];

  public autoReleaseList: DefinedSetResModel[] = [];
  public designationTypeList: DefinedSetResModel[] = [];
  public containerCategoryList: DefinedSetResModel[] = [];
  public holdActionList: DefinedSetResModel[] = [];
  public holdActionViewList: DefinedSetResModel[] = [];
  public holdReasonList: DefinedSetResModel[] = [];
  public holdBasedOnList: DefinedSetResModel[] = [];


  public silentHoldList: Array<string> = ["No", "Yes"];

  selectedModel: HoldContainerSO = new HoldContainerSO();

  configHrs: HRCAppParamSO = new HRCAppParamSO();

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  public dateTimeFormat: string = 'DD/MM/YYYY HH:mm GST';

  public dateTimePlaceHolder: string = 'DD/MM/YYYY HH:MM GST';

  public startDateTime: any;
  public endDateTime: any;
  public autoReleaseDateTime: any;
  private maxDateinvalid :boolean = false;

  holdSpecificationDetails: HoldSpecificationDetailsSO[] = [];

  public minStartDateTime: any;
  public minEndDateTime: any;
  public minAutoReleaseDateTime: any;

  holdBasedOn: string = '';
  headTitle: any;

  currDate: string = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();

  @ViewChild(Slides) slides: Slides;


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public utils: Utils,
              public keyboard: Keyboard, public datepipe: DatePipe, public platform: Platform,
              private commonServices: CommonservicesProvider, public formBuilder: FormBuilder, public hrcservicesProvider: HrcservicesProvider,
              private alertCtrl: AlertController, private holdContainerRequest: HoldContainerSO) {

    this.resetShowTabs(0);
    this.tabs = ['Hold Details', 'Hold Specification'];
    this.headTitle = this.utils.getLocaleString("ch_create_title");
    this.selectedTab = this.tabs[0];
    this.locationMaster();
    this.getConfiguredHrs();
    this.getDefinedSet();
    this.initializeFeildValidation();
    this.selectedModel.silentHold = this.silentHoldList[0];
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      _this.backAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.backAlert();
    }
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
    this.showLeftButton = currentIndex !== 0 && this.tabs.length > 1;
    this.showRightButton = !this.slides.isEnd();
  }

  backAlert() {
    if (this.utils.popupHandler() == true) {
      if (this.groupOne.dirty || this.groupTwo.dirty || this.groupThree.dirty || (this.groupFour.dirty && this.autoRelease()) ||
        this.groupFive.dirty || this.groupSeven.dirty || this.groupEight.dirty || (this.groupNine.dirty && this.showOtherReasons()) ||
        this.groupEleven.dirty) {

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
                //this.alert = null;
              },
            }]
        });
        this.alert.present();
      } else {
        this.navCtrl.pop();
      }
    }
  }

  onLineCodeChanged() {
    console.log(this.selectedLineCodes);
  }

  onContainerCategoryChanged() {
    console.log(this.selectedContainerCategories);
    this.holdActionCreation();
  }

  addContainer() {
    if (this.groupSeven.valid && this.groupOne.valid && this.groupFive.valid) {
      let profileModal = this.modalCtrl.create(GenericAddContainerComponent, {
        //containerNo: this.containerNo
      });
      profileModal.onDidDismiss(data => {
        if (null != data) {
          this.onContainerSearch(data.containerNo);
        }
      });
      profileModal.present();
    } else {
      this.isErrorContainer = true;
      this.moveToSlide(0);
      this.presentAlert('ALERT', 'Enter all mandatory fields');
    }
  }

  deleteContainer(index) {
    this.holdSpecificationDetails.splice(index, 1);
    if(index==this.selectedTabsIndex){
      this.selectedTabsIndex=-1;
    }

  }

  holdActionCreation() {
    this.holdActionViewList = [];
    this.selectedModel.holdAction = "";
    let ccList = [];
    for (let i = 0; i < this.selectedContainerCategories.length; i++) {
      ccList.push(this.selectedContainerCategories[i]);
    }
    for (let i = 0; i < ccList.length; i++) {
      if (ccList[i] == "Import") {
        this.holdActionViewList.push(this.holdActionList[this.holdActionList.findIndex(x => x.definedSetValueCode == "Stop Exit")]);
        this.holdActionViewList.push(this.holdActionList[this.holdActionList.findIndex(x => x.definedSetValueCode == "Stop Discharge")]);
      } else if (ccList[i] == "Export") {
        this.holdActionViewList.push(this.holdActionList[this.holdActionList.findIndex(x => x.definedSetValueCode == "Stop Entry")]);
        this.holdActionViewList.push(this.holdActionList[this.holdActionList.findIndex(x => x.definedSetValueCode == "Stop Load")]);
      } else if (ccList[i] == "Storage") {
        this.holdActionViewList.push(this.holdActionList[this.holdActionList.findIndex(x => x.definedSetValueCode == "Stop Entry")]);
        this.holdActionViewList.push(this.holdActionList[this.holdActionList.findIndex(x => x.definedSetValueCode == "Stop Exit")]);
      } else if (ccList[i] == "TS") {
        this.holdActionViewList.push(this.holdActionList[this.holdActionList.findIndex(x => x.definedSetValueCode == "Stop Exit")]);
        this.holdActionViewList.push(this.holdActionList[this.holdActionList.findIndex(x => x.definedSetValueCode == "Stop Load")]);
        this.holdActionViewList.push(this.holdActionList[this.holdActionList.findIndex(x => x.definedSetValueCode == "Stop Discharge")]);
      } else if (ccList[i] == "") {
        this.holdActionViewList = [];
      }
    }
    this.holdActionViewList = Array.from(new Set(this.holdActionViewList));
  }

  public filterTabs(tab: string): void {
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === "Hold Details") {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
      this.currentTabIndexForNavigation = 0;
    } else if (tab === "Hold Specification") {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
      this.currentTabIndexForNavigation = 1;
    }
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

  moveToSlide(val: number) {
    this.slides.slideTo(val, 500);
    this.resetShowTabs(val);
    this.selectedTab = this.tabs[val];
  }

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  initializeFeildValidation() {
    this.groupOne = this.formBuilder.group({
      location: ['', Validators.compose([Validators.required])],
      spName: ['', Validators.compose([Validators.required])]
    });
    this.groupTwo = this.formBuilder.group({
      referenceNo: ['', Validators.compose([Validators.pattern(/^[a-z0-9A-Z]{3,30}$/), Validators.required])]
    });
    this.groupThree = this.formBuilder.group({
      startDateTime: ['', Validators.compose([Validators.required])],
      endDateTime: ['', Validators.compose([Validators.required])],
      autoRelease: ['']
    });
    this.groupFour = this.formBuilder.group({
      autoReleaseDateTime: ['', Validators.compose([Validators.required])]
    });
    this.groupFive = this.formBuilder.group({
      lineCode: ['', Validators.compose([Validators.required])]
    });
    this.groupSix = this.formBuilder.group({
      designation: ['', Validators.compose([Validators.required])]
    });
    this.groupSeven = this.formBuilder.group({
      containerCategory: ['', Validators.compose([Validators.required])]
    });
    this.groupEight = this.formBuilder.group({
      holdAction: ['', Validators.compose([Validators.required])],
      holdReason: ['', Validators.compose([Validators.required])],
    });
    this.groupNine = this.formBuilder.group({
      otherReason: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])]
    });
    this.groupTen = this.formBuilder.group({
      holdBasedOn: ['', Validators.compose([Validators.required])]
    });
    this.groupEleven = this.formBuilder.group({
      remarks: ['', Validators.compose([Validators.pattern(/^[a-z0-9A-Z ]{3,255}$/), Validators.minLength(3), Validators.maxLength(255)])]
    });
    this.groupTwelve = this.formBuilder.group({
      silentHold: ['']
    });
  }

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['HRC_AUTO_RELEASE', 'HRC_DESIGNATION_TYPE', 'HRC_CONTAINER_CATEGORY',
      'HRC_HOLD_REASON', 'HRC_HOLD_BASED_ON', 'HRC_HOLD_ACTION'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {

            if (this.definedSetListModel[i].definedSetName == 'HRC_AUTO_RELEASE') {
              this.autoReleaseList = this.definedSetListModel[i].definedSetValues;
              this.selectedModel.autoRelease = this.autoReleaseList[0].definedSetValueCode;
            }

            if (this.definedSetListModel[i].definedSetName == 'HRC_DESIGNATION_TYPE') {
              this.designationTypeList = this.definedSetListModel[i].definedSetValues;
              this.selectedModel.designation = this.designationTypeList[0].definedSetValueCode;
            }

            if (this.definedSetListModel[i].definedSetName == 'HRC_CONTAINER_CATEGORY') {
              this.containerCategoryList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'HRC_HOLD_ACTION') {
              this.holdActionList = this.definedSetListModel[i].definedSetValues;
              if (this.holdActionList.length > 0 && this.holdActionList[0].definedSetValueCode == '') {
                this.holdActionList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'HRC_HOLD_REASON') {
              this.holdReasonList = this.definedSetListModel[i].definedSetValues;
              if (this.holdReasonList.length > 0 && this.holdReasonList[0].definedSetValueCode == '') {
                this.holdReasonList.splice(0, 1);
              }
            }

            if (this.definedSetListModel[i].definedSetName == 'HRC_HOLD_BASED_ON') {
              if (this.definedSetListModel[i].definedSetValues) {
                for (let j = 0; j < this.definedSetListModel[i].definedSetValues.length; j++) {
                  if (this.definedSetListModel[i].definedSetValues[j].definedSetValueCode == 'Container No') {
                    this.holdBasedOnList[0] = this.definedSetListModel[i].definedSetValues[j];
                  }
                }
              }
              this.selectedModel.holdBasedOn = this.holdBasedOnList[0].definedSetValueCode;
              this.holdBasedOn = this.holdBasedOnList[0].definedSetValueIntMessage;
            }

          }
        },
        error => {
          //Show error message
        });
  }

  getConfiguredHrs() {
    this.hrcservicesProvider.getConfiguredHrs(new HRCAppParamSO(), false).subscribe(response => {
        this.configHrs = <HRCAppParamSO>response;
        this.minStartDateTime = this.setMinDate(this.currDate, this.configHrs.startTimeHrsConfig || 0);
        this.minEndDateTime = this.setMinDate(this.minStartDateTime, this.configHrs.endTimeHrsConfig || 0);
        this.minAutoReleaseDateTime = this.minEndDateTime;
        //this.minStartDateTime = this.datepipe.transform(this.minStartDateTime, 'dd/MM/yyyy');
      },
      error => {
      });
  }

  locationMaster() {
    //let listAllLocation: LocationMasterSO[] = new Array<LocationMasterSO>();
    let locationRes: HoldContainerSO = new HoldContainerSO();

    let loc: UserDataModel = new UserDataModel();
    loc.userName = localStorage.getItem('LOGGEDINUSER');

    this.hrcservicesProvider.getLocationMaster(loc, true).subscribe(response => {

        locationRes = <HoldContainerSO>response;

        /*for (let i = 0; i < locationRes.locationMasterList.length; i++) {
           listAllLocation[i].spLocationCode = locationRes.locationMasterList[i].spLocationCode;
             listAllLocation[i].spLocationName = locationRes.locationMasterList[i].spLocationName;
       }*/
        //this.locationList = Array.from(new Set(listAllLocation));
        this.locationList = locationRes.locationMasterList;

      },
      error => {

      });
  }

  onLocationChanged() {
    this.selectedModel.spName = '';
    this.lineCodeList = [];
    //this.lineCodeStatus = [];
    this.serviceProviderMaster();
  }

  // keyUpValidate(ev, format, model, selectedIndex, tIndex) {
  keyUpValidate(ev, format, model) {
    this.utils.keyUpValidate(ev, format);
    if (model == 'referenceNo') {
      this.selectedModel.referenceNo = ev.target.value;
    }
    else if (model == 'otherReason') {
      this.selectedModel.otherReason = ev.target.value;
    }

    // if (this.validate(model, format)) {
    //   ev.value = "";
    //   let messageText = 'Invalid Input';
    //   if (ev.placeholder) {
    //     messageText = 'Invalid ' + ev.placeholder;
    //   }
    //   this.presentAlert("Attention", messageText);
    //   return;
    // }
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
  serviceProviderMaster() {
    let spNameReq: HoldContainerSO = new HoldContainerSO();
    let spNameRes: HoldContainerSO = new HoldContainerSO();
    spNameReq.location = this.selectedModel.location;
    this.hrcservicesProvider.getSpNameMaster(spNameReq, false).subscribe(response => {
        spNameRes = <HoldContainerSO>response;
        this.spNameList = spNameRes.spNameMasterList;
      },
      error => {
      });
  }

  onspNameChanged() {
    this.selectedLineCodes =[];
    this.lineMaster();
  }

  holdReasonChange() {
    this.selectedModel.otherReason ="";
  }

  lineMaster() {
    let linerCodeRequest: HoldContainerSO = new HoldContainerSO();

    let listAllLineNames: Array<any> = [];
    let linerCodeResponse: Array<HnrclineModel> = [];

    linerCodeRequest.location = this.selectedModel.location;
    linerCodeRequest.spName = this.selectedModel.spName;

    this.hrcservicesProvider.getLineMaster(linerCodeRequest, false).subscribe(response => {
        linerCodeResponse = <HnrclineModel[]>response;
        for (let i = 0; i < linerCodeResponse.length; i++) {
          if (null != linerCodeResponse[i].lineCode && "" != linerCodeResponse[i].lineCode) {
            listAllLineNames.push(linerCodeResponse[i].lineCode);
          }
        }
        this.lineCodeList = Array.from(new Set(listAllLineNames));

        /*        for (let i = 0; i < this.lineCodeList.length; i++) {
                  this.lineCodeStatus[i] = false;
                }*/

      },
      error => {
      });
  }

  submit() {
    if (this.validateOtherReason() && this.validateAutoRelease() &&
      this.groupOne.valid && this.groupTwo.valid && this.groupThree.valid &&
      this.groupFive.valid && this.groupSix.valid && this.groupSeven.valid &&
      this.groupEight.valid && this.groupEleven.valid && !this.isErrorContainer) {

      this.showConfirmation();
    } else {
      this.isError = true;
      this.isErrorContainer = false;
      this.moveToSlide(0);
      this.presentAlert('ALERT', 'Enter all mandatory fields');
    }
  }


  showConfirmation() {
    this.initializeCreateRequest();
    let alertMsg = 'Do you want to submit your request?';
    const alert = this.alertCtrl.create({
      title: 'CONFIRM BOX',
      message: alertMsg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.createHoldContainer();
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


  onReferenceNoFocusChange() {
    if (this.selectedModel.referenceNo && this.selectedModel.referenceNo != '' && this.selectedModel.referenceNo.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.selectedModel.referenceNo = "";
    } else if (this.selectedModel.referenceNo && this.selectedModel.referenceNo != '' && this.selectedModel.referenceNo.length > 30) {
      this.presentAlert("Alert", "Please enter valid Reference No (max 30)");
      this.selectedModel.referenceNo = "";
    }

    else {
      if (this.selectedModel.referenceNo && this.selectedModel.referenceNo != '') {
        this.hrcservicesProvider.verifyReferenceNo(this.selectedModel, true)
          .subscribe(response => {
              if (response == true) {
                this.selectedModel.referenceNo = '';
                this.presentAlert("ATTENTION", 'Given Reference No is Invalid, please provide another value.');
              }
            },
            error => {
            });
      }
    }
  }

  otherReasonFocusChange() {
    if (this.selectedModel.otherReason && this.selectedModel.otherReason != '' && this.selectedModel.otherReason.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.selectedModel.otherReason = "";
    } else if (this.selectedModel.otherReason && this.selectedModel.otherReason != '' && this.selectedModel.otherReason.length > 255) {
      this.presentAlert("Alert", "Please enter valid characters (max 255)");
      this.selectedModel.otherReason = "";
    } else {
      if (this.selectedModel.otherReason != '') {

      }
    }
  }

  onRemarkFocusChange() {
    if (this.selectedModel.remarks && this.selectedModel.remarks != '' && this.selectedModel.remarks.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.selectedModel.remarks = "";
    } else if (this.selectedModel.remarks && this.selectedModel.remarks != '' && this.selectedModel.remarks.length > 255) {
      this.presentAlert("Alert", "Please enter valid characters (max 255");
      this.selectedModel.remarks = "";
    } else {
      // if (this.selectedModel.remarks != '') {
      //
      // }
    }
  }

  onContainerSearch(containerNo) {

    if (containerNo && containerNo.length >= 10) {
      let holdSpecDetailsListSO: HoldSpecDetailsListSO = new HoldSpecDetailsListSO();
      let containerDetailSO: ContainerDetailSO = new ContainerDetailSO;
      containerDetailSO.containerNo = containerNo;
      containerDetailSO.loadStatus = this.selectedModel.designation;
      containerDetailSO.location = this.selectedModel.location;
      containerDetailSO.shippngStatsList = [];
      containerDetailSO.lineCodeList = [];

      for (let i = 0; i < this.selectedContainerCategories.length; i++) {
        containerDetailSO.shippngStatsList.push(this.selectedContainerCategories[i]);
      }

      for (let i = 0; i < this.selectedLineCodes.length; i++) {
        containerDetailSO.lineCodeList.push(this.selectedLineCodes[i]);
      }

      this.hrcservicesProvider.searchContainer(containerDetailSO, true)
        .subscribe(response => {
            holdSpecDetailsListSO = <HoldSpecDetailsListSO>response;
            let containerDetails: HoldSpecificationDetailsSO[] = holdSpecDetailsListSO.list;
            let errorList = "";
            let containerCountExceeded = this.utils.getLocaleString("container_count_exceeded");
            if (containerDetails && containerDetails.length > 0) {
              for (let i = 0; i < containerDetails.length; i++) {
                let containerDetail: HoldSpecificationDetailsSO = new HoldSpecificationDetailsSO();
                containerDetail.containerNo = containerDetails[i].containerNo;
                containerDetail.iSOCodeContainerNo = containerDetails[i].iSOCodeContainerNo;
                containerDetail.lineHold = containerDetails[i].lineHold;
                containerDetail.locationHold = containerDetails[i].locationHold;
                containerDetail.statusHold = containerDetails[i].statusHold;
                containerDetail.shippingStatus = containerDetails[i].shippingStatus;
                containerDetail.incrementRotationNumber = containerDetails[i].incrementRotationNumber;
                let containerAdded = false;
                for (let j = 0; j <= this.holdSpecificationDetails.length; j++) {
                  if (this.holdSpecificationDetails.length > 0 && this.holdSpecificationDetails[j]
                    && this.holdSpecificationDetails[j].containerNo == containerDetail.containerNo) {
                    containerAdded = true;
                  }
                }
                if (this.holdSpecificationDetails.length > 1000) {
                  this.presentAlert('ALERT', containerCountExceeded);
                }
                if (this.holdSpecificationDetails.length < 1000 && containerAdded == false) {
                  this.holdSpecificationDetails.push(containerDetail);
                }
                if (containerDetails[i].errorList && containerDetails[i].errorList != '') {
                  errorList = containerDetails[i].errorList;
                }
              }
              if (errorList != "") {
                this.presentAlert('ALERT', errorList);
              }
            }
          },
          error => {
            this.presentAlert('ALERT', error[0].errorCode);
          });
    } else {
      this.presentAlert("Alert", "Invalid Container No.");
    }

  }

  createHoldContainer() {
    let hcCreateResponse: HoldContainerSO = new HoldContainerSO();
    console.log('holdContainerRequest : ' + JSON.stringify(this.holdContainerRequest));
    this.hrcservicesProvider.saveHoldDetails(this.holdContainerRequest).subscribe(response => {
        hcCreateResponse = <HoldContainerSO>response;
        if (null != hcCreateResponse.holdRequestNo) {
          this.navCtrl.push(HoldContainerConfirmation, {
            holdRequestNo: hcCreateResponse.holdRequestNo,
            referenceNo: hcCreateResponse.referenceNo,
            startDateTime: hcCreateResponse.startDateTime,
            endDateTime: hcCreateResponse.endDateTime,
            holdStatus: hcCreateResponse.holdStatus,
            fromEdit: false
          });
        }
      },
      error => {
        this.presentAlert('ALERT', error[0].message);
      });
  }

  initializeCreateRequest() {
    this.holdContainerRequest = JSON.parse(JSON.stringify(this.selectedModel));

    //Container Category seperated with commas
    let containerCategoryString = "";
    for (let i = 0; i < this.selectedContainerCategories.length; i++) {
      containerCategoryString = containerCategoryString + "," + this.selectedContainerCategories[i];
    }
    this.holdContainerRequest.containerCategory = containerCategoryString.substr(1);

    //line Code seperated with commas
    let lineCodeString = "";
    for (let i = 0; i < this.selectedLineCodes.length; i++) {
      lineCodeString = lineCodeString + "," + this.selectedLineCodes[i];
    }
    this.holdContainerRequest.lineCode = lineCodeString.substr(1);

    let startDate = this.startDateTime;
    this.holdContainerRequest.startDateTime = this.datepipe.transform(startDate.split("T")[0], 'dd/MM/yyyy');
    startDate = (startDate.split("T")[1]).substr(0, (startDate.split("T")[1]).lastIndexOf(':'));
    this.holdContainerRequest.startDateTime = this.holdContainerRequest.startDateTime + " " + startDate;

    let endDate = this.endDateTime;
    this.holdContainerRequest.endDateTime = this.datepipe.transform(endDate.split("T")[0], 'dd/MM/yyyy');
    endDate = (endDate.split("T")[1]).substr(0, (endDate.split("T")[1]).lastIndexOf(':'));
    this.holdContainerRequest.endDateTime = this.holdContainerRequest.endDateTime + " " + endDate;

    if (this.autoRelease()) {
      let autoReleaseDate = this.autoReleaseDateTime;
      this.holdContainerRequest.autoReleaseDateTime = this.datepipe.transform(autoReleaseDate.split("T")[0], 'dd/MM/yyyy');
      autoReleaseDate = (autoReleaseDate.split("T")[1]).substr(0, (autoReleaseDate.split("T")[1]).lastIndexOf(':'));
      this.holdContainerRequest.autoReleaseDateTime = this.holdContainerRequest.autoReleaseDateTime + " " + autoReleaseDate;
    } else {
      this.holdContainerRequest.autoReleaseDateTime = null;
    }

    if (!this.showOtherReasons()) {
      this.holdContainerRequest.otherReason = null;
    }

    if (this.holdSpecificationDetails) {
      this.holdContainerRequest.holdSpecDetails = this.holdSpecificationDetails;
    }

  }

  onStartDateChanged() {
    setTimeout(() => {
      this.startDateTime = this.roundOffTime(this.startDateTime);
      this.endDateTime = this.setMinDate(this.startDateTime, this.configHrs.endTimeHrsConfig || 0);
      this.minEndDateTime = this.setMinDate(this.startDateTime, this.configHrs.endTimeHrsConfig || 0);
      let maxDateValue = new Date("2050-01-01T23:00:00Z");
      if(this.startDateTime >= maxDateValue.toISOString()) {
        this.maxDateinvalid = true;
      } else {
        this.maxDateinvalid = false;
      }
    }, 200);
  }

  onEndDateChanged() {
    setTimeout(() => {
      this.endDateTime = this.roundOffTime(this.endDateTime);
      this.autoReleaseDateTime = this.endDateTime;
      this.minAutoReleaseDateTime = this.endDateTime;
      let maxDateValue = new Date("2050-01-02T00:00:00.000Z");
      if(this.endDateTime >= maxDateValue.toISOString()) {
        this.maxDateinvalid = true;
      } else {
        this.maxDateinvalid = false;
      }
    }, 200);
  }

  onAutoReleaseDateChanged() {
    setTimeout(() => {
      this.autoReleaseDateTime = this.roundOffTime(this.autoReleaseDateTime);
    }, 200);
  }

  roundOffTime(date) {
    let newDate;
    let minutes: number = (date.split("T")[1]).substr(3, 2);
    newDate = date.substr(0, date.indexOf(":") + 1) + '00' + date.substr(date.lastIndexOf(":"));
    if (minutes >= 30) {
      newDate = new Date(new Date(newDate).setHours(new Date(newDate).getHours() + 1)).toISOString();
    }
    return newDate;
  }

  setMinDate(date, hours) {
    let newDate;
    let minutes: number = (date.split("T")[1]).substr(3, 2);
    if (minutes == 0) {
      newDate = new Date(new Date(date).setHours(new Date(date).getHours() + hours)).toISOString();
    } else {
      newDate = date.substr(0, date.indexOf(":") + 1) + '00' + date.substr(date.lastIndexOf(":"));
      newDate = new Date(new Date(newDate).setHours(new Date(newDate).getHours() + 1 + hours)).toISOString();
    }
    return newDate;
  }

  onAutoReleaseChanged() {
    if (this.autoRelease()) {
      if (this.endDateTime == undefined) {
        this.minAutoReleaseDateTime = this.minStartDateTime;
      }
      else {
        this.autoReleaseDateTime = this.endDateTime;
        this.minAutoReleaseDateTime = this.endDateTime;
      }
    }
  }

  autoRelease() {
    if (this.selectedModel && this.selectedModel.autoRelease && this.selectedModel.autoRelease.toLowerCase() == "yes") {
      return true;
    } else {
      return false;
    }
  }

  showOtherReasons() {
    if (this.selectedModel && this.selectedModel.holdReason && this.selectedModel.holdReason.toLowerCase() == 'others') {
      return true;
    } else {
      return false;
    }
  }

  showSilentHold() {
    if (localStorage.getItem('LOGGEDINUSER').toLowerCase() == 'toadmin' ||
      localStorage.getItem('LOGGEDINUSER').toLowerCase() == 'taadmin' ||
      localStorage.getItem('LOGGEDINUSER').toLowerCase() == 'paadmin') {
      return true;
    } else {
      return false;
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

  validateOtherReason(): boolean {
    if (this.showOtherReasons()) {
      if (this.groupNine.valid) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  validateAutoRelease(): boolean {
    if (this.autoRelease()) {
      if (this.groupFour.valid) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

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
    if(this.currentTabIndexForNavigation < 1 ) {
      this.filterTabs(this.tabs[this.currentTabIndexForNavigation + 1]);
    }
    this.hideBottomNavButtons()
  }
  hideBottomNavButtons(){
    if(this.currentTabIndexForNavigation > 0  &&  this.currentTabIndexForNavigation < 1)
    {
      this.hidePreviousButton = true;
      this.hideNextButton = true;
    }
    if(this.currentTabIndexForNavigation == 0 ) {
      this.hidePreviousButton = false;
      this.hideNextButton = true;
    }
    if(this.currentTabIndexForNavigation == 1) {
      this.hidePreviousButton = true;
      this.hideNextButton = false;
    }

  }
}


