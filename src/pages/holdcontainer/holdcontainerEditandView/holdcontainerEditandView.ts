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
import {Utils} from "../../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {HoldContainerSO, IsoCodeResponseModal, IsoCodeSO} from "../../../shared/model/hnrc/holdcontainerso.model";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {DatePipe} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HoldContainerConfirmation} from "../holdcontainerconfirmation/holdcontainerconfirmation";
import {UserDataModel} from "../../../shared/model/userdata.model";
import {HRCAppParamSO} from "../../../shared/model/hnrc/hrcappparamso.model";
import {RCHsearchresultPage} from "../../rch/rchsearchresult/rchsearchresult";
import {ReleaseContainerSearchSO} from "../../../shared/model/hnrc/releasecontainersearch.model";
import {RCHsummaryPage} from "../../rch/rchsummary/rchsummary";


/**
 * Generated class for the RbviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-HoldContainerEditandView',
  templateUrl: 'holdcontainerEditandView.html',
  providers: [Utils, HoldContainerSO, IsoCodeSO,ReleaseContainerSearchSO]
})

export class HoldContainerEditandView {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  public unregisterBackButtonAction: any;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false];
  public showRightSlideNav: boolean;
  currentTabIndexForNavigation = 0;
  hideNextButton:boolean = true;
  hidePreviousButton:boolean = false;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;

  public dropDown: any;
  holdRequestNo: number;
  isView: boolean = true;
  fromHistory:boolean = false;
  public containerCategory: any;

  public definedSetListModel: DefinedsetresListModel[];
  public autoReleaseList: DefinedSetResModel[] = [];
  public containerCategoryList: DefinedSetResModel[] = [];

  public silentHoldList: Array<string> = ["No", "Yes"];

  holderDetailsForm1: FormGroup;
  holderDetailsForm2: FormGroup;
  holderDetailsForm3: FormGroup;
  holderDetailsForm4: FormGroup;
  holderDetailsForm5: FormGroup;

  public alert: any = null;

  public location: string = '';
  public spName: string = '';
  public endDateTime: any;
  public autoReleaseDateTime: any;

  configHrs: HRCAppParamSO = new HRCAppParamSO();

  public minAutoReleaseDateTime: any;
  public minEndDateTime: any;

  error: boolean = false;
  headTitle: any;
  loading: any;
  serviceCounter: number;

  public dateTimeFormat: string = 'DD/MM/YYYY HH:mm GST';
  public isoCodeResponse: IsoCodeResponseModal[] = [];
  private isoCode: string = "";
  private maxDateinvalid :boolean = false;
  releaseSearchRequest : ReleaseContainerSearchSO;

  currDate: string = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              public utils: Utils, public hrcservicesProvider: HrcservicesProvider, public formBuilder: FormBuilder,
              public keyboard: Keyboard, private alertCtrl: AlertController, public loadingCtrl: LoadingController,
              public holdContainer: HoldContainerSO, public holdContainerRequest: HoldContainerSO,
              private commonServices: CommonservicesProvider, public datepipe: DatePipe,
              private isoCodeSO: IsoCodeSO) {

    this.tabs = ['Hold Details', 'Hold Specification', 'Exclude Criteria'];

    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.serviceCounter = 0;
    this.holdRequestNo = this.navParams.get('holdRequestNo');
    this.isView = this.navParams.get('isView');
    this.fromHistory = this.navParams.get('fromHistory');
    if (this.isView == true) {
      this.headTitle = this.utils.getLocaleString("ch_view_title");
    }
    else {
      this.headTitle = this.utils.getLocaleString("ch_edit_title");
    }


    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;
    this.dropDown = false;
    this.resetShowTabs(0);
    this.initializeFieldValidation();
    this.loadHoldContainerDetails();
    this.getDefinedSet();
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

  ionViewWillEnter() {

  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  datetostring(datestring) {
    if (datestring != null) {
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
      return day + "/" + monthstr + "/" + date.getFullYear();
    }
    else {
      return null;
    }
  }

  backAlert() {
    if (this.utils.popupHandler() == true) {
      if (this.holderDetailsForm1.dirty || (this.holderDetailsForm2.dirty && this.autoRelease()) ||
        (this.holderDetailsForm3.dirty && this.showOtherReasons()) || this.holderDetailsForm4.dirty ||
        (this.holderDetailsForm5.dirty && this.showSilentHold())) {
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

  getStyle() {
    return '#808080';
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
    } else if (tab === "Exclude Criteria") {
      this.resetShowTabs(2);
      this.slides.slideTo(2, 500);

    }
    this.selectedTab = tab;
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

  moveToSlide(val: number) {
    this.slides.slideTo(val, 500);
    this.resetShowTabs(val);
    this.selectedTab = this.tabs[val];
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

  showOtherReasons() {
    if (this.holdContainer && this.holdContainer.holdReason && this.holdContainer.holdReason.toLowerCase() == 'others') {
      return true;
    }
    return false;
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

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['HRC_AUTO_RELEASE', 'HRC_CONTAINER_CATEGORY'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {

            if (this.definedSetListModel[i].definedSetName == 'HRC_AUTO_RELEASE') {
              this.autoReleaseList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'HRC_CONTAINER_CATEGORY') {
              this.containerCategoryList = this.definedSetListModel[i].definedSetValues;
              this.getContainerCatrgory();
            }

          }
        },
        error => {
          //Show error message
        });
  }

  loadHoldContainerDetails() {
    let holdContainerRequest: HoldContainerSO = new HoldContainerSO();
    if(this.fromHistory == true){
      holdContainerRequest.holdRequestNumber = this.holdRequestNo;
    }
    else{
      holdContainerRequest.holdRequestNo = this.holdRequestNo;
    }

    this.loading.present();
    this.serviceCounter = 1;
    this.hrcservicesProvider.getSearchByID(holdContainerRequest, false).subscribe(response => {
        this.holdContainer = <HoldContainerSO>response;
        if (this.holdContainer.holdBasedOn.toLocaleLowerCase() == 'container no') {
          this.tabs = ['Hold Details', 'Hold Specification'];
          this.showRightButton = this.tabs.length > 2;
        }
        this.isoCodeSO.contSize = this.holdContainer.contSize;
        this.locationMaster();
        this.serviceProviderMaster();
        this.getConfiguredHrs();
        if (this.holdContainer.holdBasedOn && (this.holdContainer.holdBasedOn == "Generic" ||
            this.holdContainer.holdBasedOn == "Rotation No")) {
          this.getIsoCode();
        }

        if (this.holdContainer.autoReleaseDateTime) {
          this.autoReleaseDateTime = this.parsedate(this.holdContainer.autoReleaseDateTime);
          this.minAutoReleaseDateTime = this.parsedate(this.holdContainer.endDateTime);
        }
        this.getContainerCatrgory();
        this.dismissLoading();
      },
      error => {
        this.dismissLoading();
      });
  }

  getContainerCatrgory() {
    if (this.holdContainer && this.holdContainer.containerCategory && this.containerCategoryList) {
      this.containerCategory = this.holdContainer.containerCategory;
      for (let i = 0; i < this.containerCategoryList.length; i++) {
        this.containerCategory = (this.containerCategory).replace(this.containerCategoryList[i].definedSetValueCode,
          this.containerCategoryList[i].definedSetValueIntMessage);
      }
    }
  }


   viewRelease(holdNumber: number) {

    this.navCtrl.push(RCHsearchresultPage, {
      holdReleaseNumber: holdNumber,
      advSearchBy: 'holdRequestNo',
      fromHoldContainer: true
    });
    // this.navCtrl.push(RCHsummaryPage, {
    //   //filter: this.releaseSearchRequest,
    //   holdReleaseNumber: holdNumber,
    //   fromHoldContainer: true
    //   //hnrcSearchResult: this.releaseSearchRequest,
    // });

  }

  onEndDateChanged() {
    setTimeout(() => {
      this.endDateTime = this.roundOffTime(this.endDateTime);
      this.autoReleaseDateTime = this.endDateTime;
      this.minAutoReleaseDateTime = this.endDateTime;
      let maxDateValue = new Date("2050-01-01T23:00:00Z");
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

  onAutoReleaseChanged() {
    if (this.autoRelease()) {
      if (this.holdContainer.autoReleaseDateTime) {
        this.autoReleaseDateTime = this.parsedate(this.holdContainer.autoReleaseDateTime);
        this.minAutoReleaseDateTime = this.parsedate(this.holdContainer.endDateTime);
      } else {
        this.autoReleaseDateTime = this.endDateTime;
        this.minAutoReleaseDateTime = this.endDateTime;
      }
      setTimeout(() => {
        this.showAutoReleaseDateConfirmation();
      }, 300);
    } else {
      this.holdContainer.isAutoUpdateNeed = null;
    }
  }

  otherReasonFocusChange() {
    if (this.holdContainer.otherReason && this.holdContainer.otherReason != '' && this.holdContainer.otherReason.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.holdContainer.otherReason = "";
    } else if (this.holdContainer.otherReason && this.holdContainer.otherReason != '' && this.holdContainer.otherReason.length > 255) {
      this.presentAlert("Alert", "Please enter valid characters (max 255)");
      this.holdContainer.otherReason = "";
    } else {
      // if (this.holdContainer.otherReason != '') {
      //
      // }
    }
  }

  onRemarkFocusChange() {
    if (this.holdContainer.remarks && this.holdContainer.remarks != '' && this.holdContainer.remarks.length < 3) {
      this.presentAlert("Alert", "Please enter atleast 3 characters");
      this.holdContainer.remarks = "";
    } else if (this.holdContainer.remarks && this.holdContainer.remarks != '' && this.holdContainer.remarks.length > 255) {
      this.presentAlert("Alert", "Please enter valid characters (max 255");
      this.holdContainer.remarks = "";
    } else {
      // if (this.holdContainer.remarks != '') {
      //
      // }
    }
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

  autoRelease() {
    if (this.holdContainer && this.holdContainer.autoRelease && this.holdContainer.autoRelease.toLowerCase() == "yes") {
      return true;
    } else {
      return false;
    }
  }

  locationMaster() {
    this.serviceCounter++;
    let locationRes: HoldContainerSO = new HoldContainerSO();
    let loc: UserDataModel = new UserDataModel();
    loc.userName = localStorage.getItem('LOGGEDINUSER');
    this.hrcservicesProvider.getLocationMaster(loc, false).subscribe(response => {
        locationRes = <HoldContainerSO>response;
        for (let i = 0; i < locationRes.locationMasterList.length; i++) {
          if (this.holdContainer.location == locationRes.locationMasterList[i].spLocationCode) {
            this.location = locationRes.locationMasterList[i].spLocationName;
          }
        }
        this.dismissLoading();
      },
      error => {
        this.dismissLoading();
      });
  }

  serviceProviderMaster() {
    this.serviceCounter++;
    let spNameReq: HoldContainerSO = new HoldContainerSO();
    let spNameRes: HoldContainerSO = new HoldContainerSO();
    spNameReq.location = this.holdContainer.location;
    this.hrcservicesProvider.getSpNameMaster(spNameReq, false).subscribe(response => {
        spNameRes = <HoldContainerSO>response;
        for (let i = 0; i < spNameRes.spNameMasterList.length; i++) {
          if (this.holdContainer.spName == spNameRes.spNameMasterList[i].spSubLocationCode) {
            this.spName = spNameRes.spNameMasterList[i].spSubLocationName;
          }
        }
        this.dismissLoading();
      },
      error => {
        this.dismissLoading();
      });
  }

  getConfiguredHrs() {
    this.serviceCounter++;
    this.hrcservicesProvider.getConfiguredHrs(new HRCAppParamSO(), false).subscribe(response => {
        this.configHrs = <HRCAppParamSO>response;
        let minEDTCurr = this.setMinDate(this.currDate, this.configHrs.endTimeHrsConfig);
        let minEDTStart = this.setMinDate(this.parsedate(this.holdContainer.startDateTime), this.configHrs.endTimeHrsConfig || 0);
        if (Date.parse(minEDTCurr) > Date.parse(minEDTStart)) {
          this.minEndDateTime = minEDTCurr;
        } else {
          this.minEndDateTime = minEDTStart;
        }
        if (this.holdContainer.endDateTime) {
          this.endDateTime = this.parsedate(this.holdContainer.endDateTime);
        }
        this.dismissLoading();
      },
      error => {
        this.dismissLoading();
      });
  }

  editHoldContainer() {
    this.initializeEditRequest();
    let hcEditResponse: HoldContainerSO = new HoldContainerSO();

    this.hrcservicesProvider.modifyHoldDetails(this.holdContainerRequest).subscribe(response => {
        hcEditResponse = <HoldContainerSO>response;
        if (null != hcEditResponse.holdRequestNo) {
          this.navCtrl.push(HoldContainerConfirmation, {
            holdRequestNo: hcEditResponse.holdRequestNo,
            referenceNo: hcEditResponse.referenceNo,
            startDateTime: hcEditResponse.startDateTime,
            endDateTime: hcEditResponse.endDateTime,
            holdStatus: hcEditResponse.holdStatus,
            fromEdit: true
          });
        }
      },
      error => {
        this.presentAlert('ALERT', error[0].message);
      });
  }

  initializeEditRequest() {

    this.holdContainerRequest = JSON.parse(JSON.stringify(this.holdContainer));

    let endDate = this.endDateTime;
    this.holdContainerRequest.endDateTime = this.datepipe.transform(endDate.split("T")[0], 'dd/MM/yyyy');
    endDate = (endDate.split("T")[1]).substr(0, (endDate.split("T")[1]).lastIndexOf(':'));
    this.holdContainerRequest.endDateTime = this.holdContainerRequest.endDateTime + " " + endDate;
    if (this.autoRelease()) {
      let autoReleaseDate = this.autoReleaseDateTime;
      this.holdContainerRequest.autoReleaseDateTime = this.datepipe.transform(autoReleaseDate.split("T")[0], 'dd/MM/yyyy');
      autoReleaseDate = (autoReleaseDate.split("T")[1]).substr(0, (autoReleaseDate.split("T")[1]).lastIndexOf(':'));
      this.holdContainerRequest.autoReleaseDateTime = this.holdContainerRequest.autoReleaseDateTime + " " + autoReleaseDate;
    }
  }

  initializeFieldValidation() {
    this.holderDetailsForm1 = this.formBuilder.group({
      endDateTime: ['', Validators.compose([Validators.required])],
      autoRelease: ['']
    });

    this.holderDetailsForm2 = this.formBuilder.group({
      autoReleaseDateTime: ['', Validators.compose([Validators.required])]
    });

    this.holderDetailsForm3 = this.formBuilder.group({
      otherReason: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])]
    });

    this.holderDetailsForm4 = this.formBuilder.group({
      remarks: ['', Validators.compose([Validators.minLength(3)])]
    });

    this.holderDetailsForm5 = this.formBuilder.group({
      silentHold: ['']
    });
  }

  submit() {
    if (this.validateOtherReason() && this.holderDetailsForm4.valid) {
      this.showConfirmation();
    } else {
      this.error = true;
      this.moveToSlide(0);
      this.presentAlert('ALERT', 'Enter all mandatory fields');
    }
  }

  validateOtherReason(): boolean {
    if (this.showOtherReasons()) {
      if (this.holderDetailsForm3.valid) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  showConfirmation() {
    let alertMsg = 'Do you want to submit your request?';
    const alert = this.alertCtrl.create({
      title: 'CONFIRM BOX',
      message: alertMsg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.editHoldContainer();
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

  showAutoReleaseDateConfirmation() {
    let alertMsg = 'Should Auto Release Date & Time also be applicable to containers currently on Hold? (Ok / Cancel)';
    const alert = this.alertCtrl.create({
      title: 'CONFIRM BOX',
      message: alertMsg,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.holdContainer.isAutoUpdateNeed = 'Yes';
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.holdContainer.isAutoUpdateNeed = 'No';
          }
        }
      ]
    });
    alert.present();
  }

  dismissLoading() {
    this.serviceCounter--;
    if (this.serviceCounter == 0) {
      this.loading.dismissAll();
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
      buttons: ['Dismiss']
    });
    alert.present();
  }

  private getIsoCode() {
    this.hrcservicesProvider.hrcIsoCode(this.isoCodeSO)
      .subscribe(response => {
          this.isoCodeResponse = response;
          /* for (let j=0,i = 0; i < this.isoCodeResponse.length; i++) {
             if (this.holdContainer.holdSpeciSOCode &&
               this.holdContainer.holdSpecDetails[0].iSOCode == this.isoCodeResponse[i].classification) {
               this.isoCode[j] = this.isoCodeResponse[i].isoCode;
               j++;
             }
           }*/
          let selectedIso = this.holdContainer.holdSpeciSOCode.split(',');
          let reqISO = [];

          let reqIsoObj = selectedIso.map((selIso, pos, arr) => {
            return this.isoCodeResponse.filter((resIso) => {
              if (resIso.classification == selIso) {
                reqISO.push(resIso.isoCode);
                return true;
              }
              else {
                return false;
              }
            })
          });

          this.isoCode = reqISO.join(',');
        },
        error => {
        });
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
    if(this.currentTabIndexForNavigation < 2 ) {
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
