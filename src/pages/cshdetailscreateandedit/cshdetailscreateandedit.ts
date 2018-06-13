import {Component, ViewChild} from '@angular/core';
import {
  Alert,
  AlertController,
  Content,
  IonicPage,
  ModalController,
  Navbar,
  NavController,
  NavParams,
  Platform,
  Slides,
  ViewController
} from 'ionic-angular';

import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {CSHRotationMasterReqModel} from "../../shared/model/csh/cshrotationmasterreq.model";
import {CSHRotationMasterListModel} from "../../shared/model/csh/cshrotationmaster-list.model";
import {CSHRotationMasterModel} from "../../shared/model/csh/cshrotationmaster.model";
import {CshServiceProvider} from "../../providers/webservices/cshservice";
import {CSHContainerDetailsModel} from "../../shared/model/csh/cshcontainerdetails.model";
import {CSHSearchByIDResultModel} from "../../shared/model/csh/cshsearchbyidresult.model";
import {VoyagedetailsPage} from "../voyagedetails/voyagedetails";
import {CSHHazardousContainerModel} from "../../shared/model/csh/cshhazardouscontainer.model";
import {CSHOOGContainerModel} from "../../shared/model/csh/cshoogcontainer.model";
import {CSHSpecialHandlingModel} from "../../shared/model/csh/cshspecialhandling.model";
import {CSHBaseInfoAttachModel} from "../../shared/model/csh/cshbaseinfoattach.model";
import {CSHCreateModel} from "../../shared/model/csh/cshcreate.model";
import {CSSpeacialContainerRotationRequestModel} from "../../shared/model/csh/cshspeacialcontainerregistredrotation.model";
import {CSHRotationResponseModel} from "../../shared/model/csh/cshregistredrotation.model";
import {CSHDetailHistoryReqModel} from "../../shared/model/csh/cshdetailfromhistory";
import {CshSummaryPage} from "../csh-summary/csh-summary";
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CSHSearchByIDReqModel} from "../../shared/model/csh/cshsearchbyidreq.model";

/**CSHViewModel
 * Generated class for the CSHDetailsView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cshcreateeditview',
  templateUrl: 'cshdetailscreateandedit.html',
  providers: [Utils, CshServiceProvider, CSHRotationMasterReqModel, CSHRotationMasterModel, CSHRotationMasterListModel,
    CSHContainerDetailsModel, CSHSearchByIDResultModel, CSHCreateModel, CSHBaseInfoAttachModel, CSHDetailHistoryReqModel,
  ]
})
export class CSHCreateEditPage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  @ViewChild(Slides) slides: Slides;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false, false];
  public openSlider: Array<boolean> = [false, false, false, false];
  public showRightSlideNav: boolean;
  public currentIndexSideNav: any;
  public dropDown: any;
  public damage: category;
  public heavyDuty: category;
  public Others: category;
  public cat_map: Map<string, category>;
  public subcat_map: Array<Map<string, string>>;

  public displayDirtyAlert: boolean = true;
  regStatus: string;
  currentSearchID: CSHSearchByIDReqModel = new CSHSearchByIDReqModel();
  mode: string;
  showMandatory: boolean = true;
  fromHistory: boolean = false;
  attachmentDirty: boolean = false;
  cshno: any;
  cshDetailHistoryModal: CSHDetailHistoryReqModel;
  searchdetails: CSHRotationMasterModel[];
  searchbyRotation: CSHRotationMasterModel[];
  rotationno: any;
  prevRotation: string;
  filterRotationArray: any;
  showRotationNo: boolean;
  requestCutOffTime: string;
  shippingLine: string;
  vesselName: string;
  eta: string;
  etd: string;
  isSuccess: boolean = false;
  hazardousContainers: CSHHazardousContainerModel[];
  oogContainers: CSHOOGContainerModel[];
  specialhandling: CSHSpecialHandlingModel[];
  attachments: CSHBaseInfoAttachModel[] = [];
  alertHeadding: string;
  ok_text: string;
  allhazardousSelected: boolean = false;
  editmode: string;
  hazardousFilterSelected: boolean = false;
  alloogSelected: boolean = false;
  oogFilterSelected: boolean = false;
  allsplSelected: boolean = false;
  splFilterSelected: boolean = false;
  showContainer: boolean = false;
  selectedCategory: string;
  isattachone: boolean = true;
  groupOne: FormGroup;
  groupTwo: FormGroup;
  groupThree: FormGroup;
  groupFour: FormGroup;
  groupFive: FormGroup;
  rotationInValid: boolean = false;
  alphaPattern: string = "^[a-z0-9A-Z]{1,15}$";
  alphamaxPattern: string = "^[a-z0-9A-Z]{1,3}$";
  charPattern: string = "^[a-z0-9A-Z]$";
  isError: boolean = false;
  hazardousFormArray: FormArray;
  oogFormArray: FormArray;
  specialhandlingFormArray: FormArray;
  attachmentsFormArray: FormArray;
  public unregisterBackButtonAction: any;
  countcheckedHazardous: number
  countcheckedOOG: number
  countcheckedSH: number
  alertobj: Alert
  alertobj1: Alert
  isuserInput: boolean = true;

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController,
              public utils: Utils,
              public keyboard: Keyboard, private viewCtrl: ViewController,
              private cshRotationMasterReq: CSHRotationMasterReqModel,
              private cshRotationMasterResult: CSHRotationMasterModel,
              private cshRotationMasterListModel: CSHRotationMasterListModel,
              public cshServiceProvider: CshServiceProvider, public cshContainerDetailsModel: CSHContainerDetailsModel,
              public cshSearchByIDResultModel: CSHSearchByIDResultModel, public cshCreateModel: CSHCreateModel,
              public formBuilder: FormBuilder) {

    this.resetShowTabs(0);
    //For searching the rotation number
    // this.searchRotationMaster();
    this.regStatus = this.navParams.get('regStatus');
    this.mode = this.navParams.get('mode');
    this.fromHistory = this.navParams.get('fromHistory');
    if (this.mode == "edit" && !this.fromHistory) {
      this.currentSearchID.cshNo = this.navParams.get('cshNo');
      this.searchbyidforedit(this.currentSearchID.cshNo);
      this.editmode = this.utils.getLocaleString("cshEditTitle")
    } else if (this.mode == "edit" && this.fromHistory) {
      this.currentSearchID.cshRequestNo = this.navParams.get('cshNo');
      this.searchbyidforedit(this.currentSearchID.cshRequestNo);
      this.editmode = this.utils.getLocaleString("cshEditTitle")
    }
    else {
      this.editmode = this.utils.getLocaleString("cshTitle")
    }

    this.cshDetailHistoryModal = new CSHDetailHistoryReqModel();
    this.damage = new category("Damage");
    this.heavyDuty = new category("Heavy Duty");
    this.Others = new category("Others");
    this.cat_map = new Map<string, category>();
    this.cat_map.set("DMG", this.damage);
    this.cat_map.set("HD", this.heavyDuty);
    this.cat_map.set("OTH", this.Others);
    this.subcat_map = new Array();
    //this.subcat_map[0] = new Map<string,string>();
    this.tabs = [this.utils.getLocaleString("cshtab1")];
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.dropDown = false;
    this.showRightButton = this.tabs.length > 2;
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.ok_text = this.utils.getLocaleString("ok_text");
    this.validateFields();
    this.countcheckedHazardous = 0
    this.countcheckedOOG = 0
    this.countcheckedSH = 0
  }

  ionViewWillEnter() {
    this.displayDirtyAlert = true;
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.backAlert();
    }
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidLoad() {
    // this.initializeBackButtonCustomHandler();
    // this.navBar.backButtonClick = () => {
    //   this.backAlert();
    // }
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
        _this.backAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  backAlert() {
    if (this.utils.popupHandler() == true) {
      this.alertobj1 = this.alertCtrl.create({
        title: this.utils.getLocaleString("ca_confirm_box"),
        subTitle: this.utils.getLocaleString("csh_backalert_msg"),
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.alertobj1 = null;
            this.navCtrl.pop();
          },
        },
          {
            text: 'Cancel',
            handler: () => {
              this.alertobj1 = null;
            },
          }],
      });
      if ((this.groupOne.dirty || this.groupTwo.dirty || this.groupThree.dirty || this.groupFour.dirty
          || this.groupFive.dirty || this.attachmentDirty) && this.displayDirtyAlert) {
        this.alertobj1.present();
      } else {
        this.navCtrl.pop();
      }
    }
  }

  validateFields() {
    this.groupOne = this.formBuilder.group({
      rotationnumber: ['', Validators.compose([Validators.pattern(/^[0-9]{0,18}$/), Validators.required])]
    });

    this.groupTwo = this.formBuilder.group({
      hazardousSelected: [''],
      hazardousFormArray: this.formBuilder.array([])
    });
    this.hazardousFormArray = this.groupTwo.get('hazardousFormArray') as FormArray;

    this.groupThree = this.formBuilder.group({
      oogSelected: [''],
      oogFormArray: this.formBuilder.array([])
    });
    this.oogFormArray = this.groupThree.get('oogFormArray') as FormArray;

    this.groupFour = this.formBuilder.group({
      splSelected: [''],
      specialhandlingFormArray: this.formBuilder.array([])
    });
    this.specialhandlingFormArray = this.groupFour.get('specialhandlingFormArray') as FormArray;

    this.groupFive = this.formBuilder.group({
      attachmentsFormArray: this.formBuilder.array([])
    });
    this.attachmentsFormArray = this.groupFive.get('attachmentsFormArray') as FormArray;
  }

  addHContainerForm(imcoCode: any, unNo: any, flashPoint: any, imdgPage: any, packingGroup: any, riskLabel: any,
                    hazardousRemarks: any, selectedHazardous: any): FormGroup {
    return this.formBuilder.group({
      imcoCode: [''],
      unNo: [''],
      flashPoint: [''],
      imdgPage: [''],
      packingGroup: [''],
      riskLabel: [''],
      hazardousRemarks: [''],
      selectedHazardous: ['']
    });
  }

  addOogContainerForm(ofFront: any, obBack: any, olLeft: any, orRight: any, ohHeight: any, oogRemarks: any,
                      selectOog: any): FormGroup {
    return this.formBuilder.group({
      ofFront: [''],
      obBack: [''],
      olLeft: [''],
      orRight: [''],
      ohHeight: [''],
      oogRemarks: [''],
      selectOog: ['']
    });
  }

  //For setting the form validators only if the check box is checked
  setHazardousValidators(selectedIndex: number) {
    if (this.regStatus != "Approved") {
      if (this.hazardousContainers[selectedIndex].selected) {
        if (this.mode == 'edit') {
          this.hazardousFormArray.controls[selectedIndex].get("imcoCode").setValue(this.hazardousContainers[selectedIndex].imcoCode);
          this.hazardousFormArray.controls[selectedIndex].get("unNo").setValue(this.hazardousContainers[selectedIndex].unNo);
        }
        this.hazardousFormArray.controls[selectedIndex].get("imcoCode").setValidators(Validators.compose([Validators.required]));
        this.hazardousFormArray.controls[selectedIndex].get("imcoCode").enable();
        this.hazardousFormArray.controls[selectedIndex].get("unNo").setValidators(Validators.compose([Validators.required, Validators.minLength(4)]));
        this.hazardousFormArray.controls[selectedIndex].get("unNo").enable();
      }
      else {
        this.hazardousFormArray.controls[selectedIndex].get("imcoCode").clearValidators();
        this.hazardousFormArray.controls[selectedIndex].get("imcoCode").disable();
        this.hazardousFormArray.controls[selectedIndex].get("imcoCode").enable();
        this.hazardousFormArray.controls[selectedIndex].get("unNo").clearValidators();
        this.hazardousFormArray.controls[selectedIndex].get("unNo").disable();
        this.hazardousFormArray.controls[selectedIndex].get("unNo").enable();
      }
    }
  }

  //For setting the form validators only if the check box is checked
  setOogValidators(selectedIndex: number) {
    if (this.regStatus != "Approved") {
      if (this.oogContainers[selectedIndex].selected) {
        if (this.mode == 'edit') {
          this.oogFormArray.controls[selectedIndex].get("ofFront").setValue(this.oogContainers[selectedIndex].ofFront);
          this.oogFormArray.controls[selectedIndex].get("obBack").setValue(this.oogContainers[selectedIndex].obBack);
          this.oogFormArray.controls[selectedIndex].get("olLeft").setValue(this.oogContainers[selectedIndex].olLeft);
          this.oogFormArray.controls[selectedIndex].get("orRight").setValue(this.oogContainers[selectedIndex].orRight);
          this.oogFormArray.controls[selectedIndex].get("ohHeight").setValue(this.oogContainers[selectedIndex].ohHeight);
        }
        this.oogFormArray.controls[selectedIndex].get("ofFront").setValidators(Validators.compose([Validators.required]));
        this.oogFormArray.controls[selectedIndex].get("ofFront").enable();
        this.oogFormArray.controls[selectedIndex].get("obBack").setValidators(Validators.compose([Validators.required]));
        this.oogFormArray.controls[selectedIndex].get("obBack").enable();
        this.oogFormArray.controls[selectedIndex].get("olLeft").setValidators(Validators.compose([Validators.required]));
        this.oogFormArray.controls[selectedIndex].get("olLeft").enable();
        this.oogFormArray.controls[selectedIndex].get("orRight").setValidators(Validators.compose([Validators.required]));
        this.oogFormArray.controls[selectedIndex].get("orRight").enable();
        this.oogFormArray.controls[selectedIndex].get("ohHeight").setValidators(Validators.compose([Validators.required]));
        this.oogFormArray.controls[selectedIndex].get("ohHeight").enable();
      } else {
        this.oogFormArray.controls[selectedIndex].get("ofFront").clearValidators();
        this.oogFormArray.controls[selectedIndex].get("ofFront").disable();
        this.oogFormArray.controls[selectedIndex].get("ofFront").enable();
        this.oogFormArray.controls[selectedIndex].get("obBack").clearValidators();
        this.oogFormArray.controls[selectedIndex].get("obBack").disable();
        this.oogFormArray.controls[selectedIndex].get("obBack").enable();
        this.oogFormArray.controls[selectedIndex].get("olLeft").clearValidators();
        this.oogFormArray.controls[selectedIndex].get("olLeft").disable();
        this.oogFormArray.controls[selectedIndex].get("olLeft").enable();
        this.oogFormArray.controls[selectedIndex].get("orRight").clearValidators();
        this.oogFormArray.controls[selectedIndex].get("orRight").disable();
        this.oogFormArray.controls[selectedIndex].get("orRight").enable();
        this.oogFormArray.controls[selectedIndex].get("ohHeight").clearValidators();
        this.oogFormArray.controls[selectedIndex].get("ohHeight").disable();
        this.oogFormArray.controls[selectedIndex].get("ohHeight").enable();
      }
    }
  }

  setSpecialValidators(selectedIndex: number) {
    if (this.regStatus != "Approved") {
      if (this.specialhandling[selectedIndex].selected) {
        if (this.mode == 'edit') {
          this.specialhandlingFormArray.controls[selectedIndex].get("categorySh").setValue(this.specialhandling[selectedIndex].categorySh);
          this.specialhandlingFormArray.controls[selectedIndex].get("subCategorySh").setValue(this.specialhandling[selectedIndex].subCategorySh);
        }
        this.specialhandlingFormArray.controls[selectedIndex].get("categorySh").setValidators(Validators.compose([Validators.required]));
        this.specialhandlingFormArray.controls[selectedIndex].get("categorySh").enable();
        this.specialhandlingFormArray.controls[selectedIndex].get("subCategorySh").setValidators(Validators.compose([Validators.required]));
        this.specialhandlingFormArray.controls[selectedIndex].get("subCategorySh").enable();
      }
      else {
        this.specialhandlingFormArray.controls[selectedIndex].get("categorySh").clearValidators();
        this.specialhandlingFormArray.controls[selectedIndex].get("categorySh").disable();
        this.specialhandlingFormArray.controls[selectedIndex].get("categorySh").enable();
        this.specialhandlingFormArray.controls[selectedIndex].get("subCategorySh").clearValidators();
        this.specialhandlingFormArray.controls[selectedIndex].get("subCategorySh").disable();
        this.specialhandlingFormArray.controls[selectedIndex].get("subCategorySh").enable();
      }
    }
  }

  addSContainerForm(categorySh: any, remarksSh: any, subCategorySh: any, selectSpecial: any): FormGroup {
    return this.formBuilder.group({
      categorySh: [''],
      remarksSh: [''],
      subCategorySh: [''],
      selectSpecial: ['']
    });
  }

  addattachForm(fileCategory: any, fileRemarks: any, categoryeditable: any): FormGroup {
    return this.formBuilder.group({
      fileCategory: ['', Validators.compose([Validators.required])],
      fileRemarks: [''],
      categoryeditable: ['']
    });
  }

  setHazardousContainers() {
    if (this.hazardousFormArray.length > 0) {
      this.clearFormArray(this.hazardousFormArray)
    }
    for (let i = 0; i < this.hazardousContainers.length; i++) {
      this.hazardousContainers[i].selected = false;
      this.hazardousFormArray.push(this.addHContainerForm(
        this.hazardousContainers[i].imcoCode,
        this.hazardousContainers[i].unNo,
        this.hazardousContainers[i].flashPoint,
        this.hazardousContainers[i].imdgPage,
        this.hazardousContainers[i].packingGroup,
        this.hazardousContainers[i].riskLabel,
        this.hazardousContainers[i].hazardousRemarks,
        this.hazardousContainers[i].selected
      ));
    }
  }

  setOogContainers() {
    if (this.oogFormArray.length > 0) {
      this.clearFormArray(this.oogFormArray)
    }
    for (let i = 0; i < this.oogContainers.length; i++) {
      this.oogContainers[i].selected = false;
      this.oogFormArray.push(this.addOogContainerForm(
        this.oogContainers[i].ofFront,
        this.oogContainers[i].obBack,
        this.oogContainers[i].olLeft,
        this.oogContainers[i].orRight,
        this.oogContainers[i].ohHeight,
        this.oogContainers[i].oogRemarks,
        this.oogContainers[i].selected
      ));
    }
  }

  setSpecialContainers() {
    if (this.specialhandlingFormArray.length > 0) {
      this.clearFormArray(this.specialhandlingFormArray)
    }
    for (let i = 0; i < this.specialhandling.length; i++) {
      this.specialhandling[i].selected = false;
      this.specialhandlingFormArray.push(this.addSContainerForm(
        this.specialhandling[i].categorySh,
        this.specialhandling[i].remarksSh,
        this.specialhandling[i].subCategorySh,
        this.specialhandling[i].selected
      ));
    }
  }

  setAttachContainers() {
    if (this.attachmentsFormArray.length > 0) {
      this.clearFormArray(this.attachmentsFormArray)
    }
    for (let i = 0; i < this.attachments.length; i++) {
      if (this.mode == "edit" && this.regStatus == "Approved" && (this.cshSearchByIDResultModel.requestStatus == "Submitted" ||
          this.cshSearchByIDResultModel.requestStatus == "Rejected")) {
        this.attachments[i].categoryeditable = false;
      } else {
        this.attachments[i].categoryeditable = true;
      }
      this.attachmentsFormArray.push(this.addattachForm(
        this.attachments[i].fileCategory,
        this.attachments[i].fileRemarks,
        this.attachments[i].categoryeditable
      ));
    }
  }

  clearFormArray(obj: FormArray) {
    for (let i = obj.length; i > 0; i--) {
      obj.removeAt(i - 1);
    }
  }

  public filterTabs(tab: string): void {
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("cshtab1")) {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
    } else if (tab === this.utils.getLocaleString("cshtab2")) {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
    } else if (tab === this.utils.getLocaleString("cshtab3")) {
      this.resetShowTabs(2);
      this.slides.slideTo(2, 500);
    } else if (tab === this.utils.getLocaleString("cshtab4")) {
      this.resetShowTabs(3);
      this.slides.slideTo(3, 500);
    } else if (tab === this.utils.getLocaleString("cshtab5")) {
      this.resetShowTabs(4);
      this.slides.slideTo(4, 500);
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

  selectedTabsIndex = 0;

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  //Defining the Selection process for the rotation number
  setRotationNumber(item: any) {
    this.rotationno = item.rotationNumber;
    this.isuserInput = false;
  }

  resetVal() {
    this.isError = false;
    this.allhazardousSelected = false;
    this.hazardousFilterSelected = false;
    this.alloogSelected = false;
    this.oogFilterSelected = false;
    this.allsplSelected = false;
    this.splFilterSelected = false;
    if (null == this.rotationno || this.rotationno.toString().match(/^[0-9]{0,18}$/)) {
      this.rotationInValid = false;
    } else {
      this.rotationInValid = true;
    }
  }

  selectRotationNo(item: any) {
    this.resetVal();
    setTimeout(() => {
      this.prevRotation = this.rotationno;
      this.showRotationNo = false;
      this.cshRotationMasterReq.rotationNumber = this.rotationno;
      if (this.isuserInput) {
        this.cshRotationMasterReq.isBlurSrch = "Y";
      }
      this.searchbyRotation = new Array<CSHRotationMasterModel>();
      if (this.rotationno != null && this.rotationno != "" && !this.isSuccess) {
        this.cshServiceProvider.getRotationMasterData(this.cshRotationMasterReq)
          .subscribe(response => {
              this.cshRotationMasterListModel = <CSHRotationMasterListModel>response;
              if (this.cshRotationMasterListModel.list.length == 0) {
                this.rotationno = null;
                this.showRotationNo = false;
                this.presentAlert(this.alertHeadding, this.utils.getLocaleString("invalid_rotation_number"));
              } else {
                this.searchbyRotation = this.cshRotationMasterListModel.list;
                this.requestCutOffTime = this.searchbyRotation[0].requestCutOffTime;
                this.shippingLine = this.searchbyRotation[0].shippingLine;
                this.vesselName = this.searchbyRotation[0].vesselName;
                this.eta = this.searchbyRotation[0].eta;
                this.etd = this.searchbyRotation[0].etd;
                this.isSuccess = true;
                this.showRotationNo = false;
              }
            },
            error => {
              this.isSuccess = false;
              var errorMessage = <any>error;
            });
      }
      this.isuserInput = true;
    }, 500);
  }

  getRotationNo(ev: any) {
    this.filterRotationArray = this.searchdetails;
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
        if (item.rotationNumber.toString().includes(val)) {
          this.showRotationNo = true;
        }
        return (item.rotationNumber.toString().includes(val));
      });
    } else {
      // hide the results when the query is empty
      this.showRotationNo = false;
    }
  }

  searchRotationMaster() {
    this.cshRotationMasterReq.etaFromDate = "";
    this.cshRotationMasterReq.etaToDate = "";
    this.cshRotationMasterReq.rotationNumber = "";
    this.cshRotationMasterReq.vesselName = "";
    this.cshRotationMasterReq.voyageNo = "";
    this.cshRotationMasterReq.isBlurSrch = "";
    this.searchdetails = new Array<CSHRotationMasterModel>();
    this.cshServiceProvider.getRotationMasterData(this.cshRotationMasterReq)
      .subscribe(response => {
          this.cshRotationMasterListModel = <CSHRotationMasterListModel>response;
          this.searchdetails = this.cshRotationMasterListModel.list;
          this.getRotationNo(null)
        },
        error => {
          var errorMessage = <any>error;
        });

  }

  keyUpValidate(e, format, model, index) {
    if (e.keyCode === 13) {
      this.keyboard.close();
    }
    this.utils.keyUpValidate(e, format);
    if (model == 'rotationno') {
      this.rotationno = e.target.value;
    } else if (model == 'imcoCode') {
      this.hazardousContainers[index].imcoCode = e.target.value;
    } else if (model == 'unNo') {
      this.hazardousContainers[index].unNo = e.target.value;
    } else if (model == 'imdgPage') {
      this.hazardousContainers[index].imdgPage = e.target.value;
    } else if (model == 'flashPoint') {
      this.hazardousContainers[index].flashPoint = e.target.value;
    } else if (model == 'packingGroup') {
      this.hazardousContainers[index].packingGroup = e.target.value;
    } else if (model == 'riskLabel') {
      this.hazardousContainers[index].riskLabel = e.target.value;
    } else if (model == 'ofFront') {
      this.oogContainers[index].ofFront = e.target.value;
    } else if (model == 'obBack') {
      this.oogContainers[index].obBack = e.target.value;
    } else if (model == 'olLeft') {
      this.oogContainers[index].olLeft = e.target.value;
    } else if (model == 'orRight') {
      this.oogContainers[index].orRight = e.target.value;
    } else if (model == 'ohHeight') {
      this.oogContainers[index].ohHeight = e.target.value;
    }

  }

  keyboardClose() {
    this.keyboard.close();
  }

  hazardousChecked(allSelect: boolean, selected: boolean) {
    if (allSelect == true) {
      return allSelect;
    } else {
      if (selected) {
        return selected;
      } else {
        return false;
      }

    }
  }

  searchbyidforedit(currentSearchID: any) {
    currentSearchID = this.currentSearchID;
    this.cshServiceProvider.getSearchByIdDetails(currentSearchID,true).subscribe(response => {
      this.cshSearchByIDResultModel = <CSHSearchByIDResultModel>response;
      this.tabs = [
        this.utils.getLocaleString("cshtab1"),
        this.utils.getLocaleString("cshtab2"),
        this.utils.getLocaleString("cshtab3"),
        this.utils.getLocaleString("cshtab4"),
        this.utils.getLocaleString("cshtab5"),
      ];
      this.showRightButton = this.tabs.length > 2;
      this.rotationno = this.cshSearchByIDResultModel.rotationNumber;
      this.hazardousContainers = this.cshSearchByIDResultModel.cshHazardousContainer;
      this.setHazardousContainers();
      this.setSelected(this.hazardousContainers, "Hazard");
      this.oogContainers = this.cshSearchByIDResultModel.cshOOGContainer;
      this.setOogContainers();
      this.setSelected(this.oogContainers, "OOG");
      this.specialhandling = this.cshSearchByIDResultModel.cshSpecialHandling;
      /*This change is done to include the special handling containers for
      submitted reqs where special handling containers are 0*/
      this.shippingLine = this.cshSearchByIDResultModel.shippingLine;
      if (this.regStatus != "Approved" && this.cshSearchByIDResultModel.requestStatus == "Submitted" && this.specialhandling.length == 0) {
        this.getSpecialHandlingContainer();
      } else {
        this.setSpecialContainers();
      }
      this.setSelected(this.specialhandling, "Special");
      this.attachments = this.cshSearchByIDResultModel.cshBaseInfoAttach;
      this.setAttachContainers();
      this.requestCutOffTime = this.cshSearchByIDResultModel.requestCutOffTime;
      this.vesselName = this.cshSearchByIDResultModel.vesselName;
      this.eta = this.cshSearchByIDResultModel.eta;
      this.etd = this.cshSearchByIDResultModel.etd;
      this.isSuccess = true;
      this.setSubCategoryAtRunTime();
    }, error => {

    });
  }

  //For setting the selected parameters
  setSelected(containerArray: any [], container: string) {
    for (let i = 0; i < containerArray.length; i++) {
      containerArray[i].selected = (containerArray[i].isSelected == 'Y') ? true : false;

      if (containerArray[i].selected == true) {
        if (container == "Hazard") {
          this.countcheckedHazardous++;
          if (containerArray && this.countcheckedHazardous && this.countcheckedHazardous == containerArray.length) {
            this.allhazardousSelected = true;
          }
          else {
            this.allhazardousSelected = false;
          }
        }
        else if (container == "OOG") {
          this.countcheckedOOG++;
          if (containerArray && this.countcheckedOOG && this.countcheckedOOG == containerArray.length) {
            this.alloogSelected = true;
          }
          else {
            this.alloogSelected = false;
          }
        }
        else if (container == "Special") {
          this.countcheckedSH++;
          if (containerArray && this.countcheckedSH && this.countcheckedSH == containerArray.length) {
            this.allsplSelected = true;
          }
          else {
            this.allsplSelected = false;
          }
        }

        if (containerArray.find(x => x.cshHazardousContainerId != null)) {
          this.setHazardousValidators(i);
        }
        if (containerArray.find(x => x.cshOOGContainerId != null)) {
          this.setOogValidators(i);
        }
        if (containerArray.find(x => x.cshSpecialHandlingId != null)) {
          this.setSpecialValidators(i);
        }
      }
    }
  }

  getContainerDetails() {
    if (this.groupOne.valid && this.isSuccess) {
      this.cshContainerDetailsModel.rotationNumber = this.rotationno;
      this.cshContainerDetailsModel.requestCutOffTime = this.requestCutOffTime;
      this.cshContainerDetailsModel.shippingLine = this.shippingLine;
      this.cshServiceProvider.getContainerDetails(this.cshContainerDetailsModel)
        .subscribe(response => {
            this.cshSearchByIDResultModel = <CSHSearchByIDResultModel>response;
            this.tabs = [
              this.utils.getLocaleString("cshtab1"),
              this.utils.getLocaleString("cshtab2"),
              this.utils.getLocaleString("cshtab3"),
              this.utils.getLocaleString("cshtab4"),
              this.utils.getLocaleString("cshtab5"),
            ];
            this.showRightButton = this.tabs.length > 2;
            this.hazardousContainers = this.cshSearchByIDResultModel.cshHazardousContainer;
            this.setHazardousContainers();
            this.oogContainers = this.cshSearchByIDResultModel.cshOOGContainer;
            this.setOogContainers();
            this.getSpecialHandlingContainer();
            this.attachments = this.cshSearchByIDResultModel.cshBaseInfoAttach;
            this.setAttachContainers();
          },
          error => {
            const alert = this.alertCtrl.create({
              title: this.alertHeadding,
              subTitle: error[0].message,
              buttons: [this.ok_text]
            });
            alert.present();
          });
    } else if (!this.groupOne.valid) {
      this.rotationInValid = true;
      this.showRightButton = this.tabs.length > 2;
      // this.presentAlert(this.alertHeadding,this.utils.getLocaleString("alert_mandatory"))
    }
  }

  checkRotation() {
    if (this.prevRotation != this.rotationno) {
      this.tabs = [this.utils.getLocaleString("cshtab1")];
      this.requestCutOffTime = "";
      this.shippingLine = "";
      this.vesselName = "";
      this.eta = "";
      this.etd = "";
      this.isSuccess = false;
      this.showRightButton = this.tabs.length > 2;
      if (null != this.rotationno && this.rotationno.toString().length <= 18) {
        if (this.rotationno.toString().match(/^[0-9]{0,18}$/)) {
          this.rotationInValid = false;
        }
      }
      if (null != this.rotationno && this.rotationno.toString().length == 0) {
        this.alertobj1 = null
      }
    }
  }

  presentAlert(title: string, message: string) {
    if (this.alertobj1 == null) {
      this.alertobj = this.alertCtrl.create({
        title: title,
        subTitle: message,
        buttons: [{
          text: 'Dismiss',
          handler: () => {
            if (message != this.utils.getLocaleString("invalid_attachments")) {
              if (!this.groupTwo.valid) {
                this.slides.slideTo(1, 500);
                this.resetShowTabs(1);
                this.selectedTab = this.tabs[1];
              } else if (!this.groupThree.valid) {
                this.slides.slideTo(2, 500);
                this.resetShowTabs(2);
                this.selectedTab = this.tabs[2];
              } else if (!this.groupFour.valid) {
                this.slides.slideTo(3, 500);
                this.resetShowTabs(3);
                this.selectedTab = this.tabs[3];
              }
            }
          },
        }],
      });
      this.alertobj.present();
    }
  }

  showInfoPopup() {
    let clientCode = localStorage.getItem('CLIENT_CODE');
    this.displayDirtyAlert = false;
    this.navCtrl.push(VoyagedetailsPage, {
      sel_rotationNo: this.rotationno,
      sel_sameUser: clientCode,
      isOpenService: true
    });
  }

  uploadDocs(attachment: any) {
    this.cshServiceProvider.uploadDocuments()
      .then(data => {
        if (typeof data !== 'undefined' && data !== null) {
          attachment.fileName = data.fileName;
          attachment.fileUploadId = data.fileUploadId;
        }
      }, error => {

      });
  }

  openDocs(attachment: any) {
    this.cshServiceProvider.openAttachment(attachment);
  }

  createEditCSH() {
    if (!this.findSelectedContainer()) {
      this.presentAlert(this.alertHeadding, this.utils.getLocaleString("container_unselected"));
    } else if (this.groupTwo.valid && this.groupThree.valid && this.groupFour.valid && this.groupFive.valid) {
      if (this.checkIsFileAttached()) {
        this.submitRequest(this.mode);
      } else {
        this.presentAlert(this.utils.getLocaleString("attention"), this.utils.getLocaleString("csh_attachFile_msg"));
      }

    } else {
      this.isError = true;
      this.presentAlert(this.alertHeadding, this.utils.getLocaleString("alert_mandatory"))
    }
  }

  checkIsFileAttached() {
    for (let i = 0; i < this.attachments.length; i++) {
      if ((this.attachments[i].fileCategory != "" || this.attachments[i].fileCategory != null) &&
        !this.attachments[i].fileUploadId) {
        return false;
      }
    }
    return true;
  }

  /*createCSH(){
    if(!this.findSelectedContainer()){
        this.presentAlert(this.alertHeadding,this.utils.getLocaleString("container_unselected"));
      }else if(this.groupTwo.valid && this.groupThree.valid  && this.groupFour.valid && this.groupFive.valid){
        this.isError=false;
        this.submitRequest();
      }else{
        this.isError=true;
        this.presentAlert(this.alertHeadding,this.utils.getLocaleString("alert_mandatory"))
      }
  }

  editCSH(){
    if(!this.findSelectedContainer()){
      this.presentAlert(this.alertHeadding,this.utils.getLocaleString("container_unselected"));
    }else if(this.groupTwo.valid && this.groupThree.valid && this.groupFive.valid){
      this.submitRequest();
    }else{
      this.isError=true;
      this.presentAlert(this.alertHeadding,this.utils.getLocaleString("alert_mandatory"))
    }
  }*/

  submitRequest(mode: string) {
    if (this.mode == "create") {
      let alert = this.alertCtrl.create({
        title: this.utils.getLocaleString("confirm_box"),
        subTitle: 'Do you want to submit your request?',
        buttons: [
          {
            text: this.ok_text,
            handler: () => {
              this.createCSHRequest();
              this.cshServiceProvider.createCSH(this.cshCreateModel)
                .subscribe(response => {
                    this.cshSearchByIDResultModel = <CSHSearchByIDResultModel>response;
                    this.navtoSummaryPage();
                  },
                  error => {
                    const alert = this.alertCtrl.create({
                      title: this.alertHeadding,
                      subTitle: error[0].message,
                      buttons: [this.ok_text]
                    });
                    alert.present();
                  });
            },
          }, {
            text: this.utils.getLocaleString("ca_cancel"),
            handler: () => {

            },
          }],
        //enableBackdropDismiss: false

      });
      alert.present();
    } else if (mode == "edit") {
      let alert = this.alertCtrl.create({
        title: this.utils.getLocaleString("confirm_box"),
        subTitle: 'Do you want to submit your request?',
        buttons: [
          {
            text: this.ok_text,
            handler: () => {
              this.cshServiceProvider.editCSH(this.cshSearchByIDResultModel)
                .subscribe(response => {
                    this.cshSearchByIDResultModel = <CSHSearchByIDResultModel>response;
                    this.navtoSummaryPage();
                  },
                  error => {
                    const alert = this.alertCtrl.create({
                      title: this.alertHeadding,
                      subTitle: error[0].message,
                      buttons: [this.ok_text]
                    });
                    alert.present();
                  });
            }
          }, {
            text: this.utils.getLocaleString("ca_cancel"),
            handler: () => {

            },
          }],
        //enableBackdropDismiss: false

      });
      alert.present();
    }
  }

  navtoSummaryPage() {
    this.navCtrl.push(CshSummaryPage, {
      mode: this.mode,
      fromCreate: true,
      cshSearchByIDResultModel: this.cshSearchByIDResultModel
    });
  }

  createCSHRequest() {
    this.replaceNull();
    this.cshCreateModel.agentReferenceNo = "";
    this.cshCreateModel.clientCode = localStorage.getItem('CLIENT_CODE');
    this.cshCreateModel.cshBaseInfoAttach = this.attachments;
    this.cshCreateModel.cshHazardousContainer = this.hazardousContainers;
    this.cshCreateModel.cshSpecialHandling = this.specialhandling;
    this.cshCreateModel.cshOOGContainer = this.oogContainers;
    this.cshCreateModel.rotationNumber = this.rotationno.toString();
    this.cshCreateModel.requestCutOffTime = this.requestCutOffTime;
    this.cshCreateModel.shippingLine = this.shippingLine;
    this.cshCreateModel.vesselName = this.vesselName;
    this.cshCreateModel.eta = this.eta;
    this.cshCreateModel.etd = this.etd;
    this.cshCreateModel.cshOOGContainerId = "";
    this.cshCreateModel.cshRequestNo = "";
    this.cshCreateModel.fileName = "";
    this.cshCreateModel.fileUploadId = "";
    this.cshCreateModel.flashPoint = "";
    this.cshCreateModel.hazardousContainerNo = "";
    this.cshCreateModel.hazardousRemarks = "";
    this.cshCreateModel.imcoCode = "";
    this.cshCreateModel.imdgPage = "";
    this.cshCreateModel.isoCode = "";
    this.cshCreateModel.obBack = "";
    this.cshCreateModel.ofFront = "";
    this.cshCreateModel.ohHeight = "";
    this.cshCreateModel.olLeft = "";
    this.cshCreateModel.oogContainerNo = "";
    this.cshCreateModel.oogIso = "";
    this.cshCreateModel.oogRemarks = "";
    this.cshCreateModel.orRight = "";
    this.cshCreateModel.packingGroup = "";
    this.cshCreateModel.requestStatus = "";
    this.cshCreateModel.riskLabel = "";
    this.cshCreateModel.rotationNumberSearchButton = "";
    this.cshCreateModel.selectCheckbox = "";
    this.cshCreateModel.specialContainer = "";
    this.cshCreateModel.subCategorySh = "";
    this.cshCreateModel.subCategoryShDamage = "";
    this.cshCreateModel.subCategoryShHeavy = "";
    this.cshCreateModel.subCategoryShOther = "";

  }

  replaceNull() {
    this.hazardousContainers.forEach(element => {
      Object.keys(element).forEach(item => {
        if (item == "isSelected" && element[item] == null) {
          element[item] = "N";
        } else if (element[item] == null) {
          element[item] = "";
        }
      })
    });
    this.oogContainers.forEach(element => {
      Object.keys(element).forEach(item => {
        if (item == "isSelected" && element[item] == null) {
          element[item] = "N";
        } else if (element[item] == null) {
          element[item] = "";
        }
      })
    });
    this.specialhandling.forEach(element => {
      Object.keys(element).forEach(item => {
        if (item == "isSelected" && element[item] == null) {
          element[item] = "N";
        } else if (element[item] == null) {
          element[item] = "";
        }
      })
    });
  }

  findSelectedContainer() {
    let selectedHContainer: CSHHazardousContainerModel;
    let selectedOConatiner: CSHOOGContainerModel;
    let selectedSContainer: CSHSpecialHandlingModel;
    selectedHContainer = this.hazardousContainers.find(x => x.isSelected == 'Y');
    selectedOConatiner = this.oogContainers.find(x => x.isSelected == 'Y');
    selectedSContainer = this.specialhandling.find(x => x.isSelected == 'Y');
    if (selectedHContainer || selectedOConatiner || selectedSContainer) {
      return true;
    }
    return false;
  }


  //For handling select all for special handling containers
  splSelectAll() {
    if (!this.allsplSelected) {
      let alert = this.alertCtrl.create({
        title: this.utils.getLocaleString("confirm_box"),
        subTitle: 'Do you want to remove All container from the request?',
        buttons: [
          {
            text: this.ok_text,
            handler: () => {
              this.countcheckedSH = 0
              this.splMultiSelection();
            }
          }, {
            text: this.utils.getLocaleString("ca_cancel"),
            handler: () => {
              this.splrevertStatus();
            },
          }],
        //enableBackdropDismiss: false

      });
      alert.present();
    } else {
      this.countcheckedSH = this.specialhandlingFormArray.length
      this.splMultiSelection();
    }
  }

  //For handling multi select for special handling containers
  splMultiSelection() {
    // if(!this.splFilterSelected){
    //   //this.allhazardousSelected = this.allhazardousSelected;
    //   this.splFilterSelected = true;
    // }
    // else{
    //this.allhazardousSelected = !this.allhazardousSelected;
    for (let i = 0; i < this.specialhandling.length; i++) {
      this.specialhandling[i].selected = this.allsplSelected;
      if (this.specialhandling[i].selected) {
        this.specialhandling[i].selectCheckbox = "on";
        this.specialhandling[i].isSelected = "Y";
      } else {
        this.specialhandling[i].selectCheckbox = "";
        this.specialhandling[i].isSelected = "N";
      }
    }
    // }
    this.splFilterSelected = true;
  }

  splCheck(index: number) {

    if (!this.specialhandling[index].selected) {
      let alert = this.alertCtrl.create({
        title: this.utils.getLocaleString("confirm_box"),
        subTitle: 'Do you want to remove this container from the request?',
        buttons: [
          {
            text: this.ok_text,
            handler: () => {
              this.allsplSelected = false;
              this.countcheckedSH--
              this.splSingleSelection(index, null);
            }
          }, {
            text: this.utils.getLocaleString("ca_cancel"),
            handler: () => {
              this.splSingleSelection(index, true);
            },
          }],
        //enableBackdropDismiss: false

      });
      alert.present();

    } else {
      this.countcheckedSH++
      this.splSingleSelection(index, null);
    }
  }


  splrevertStatus() {
    this.allsplSelected = !this.allsplSelected;
  }

  hazardousSelectAll() {
    if (!this.allhazardousSelected) {
      let alert = this.alertCtrl.create({
        title: this.utils.getLocaleString("confirm_box"),
        subTitle: 'Do you want to remove All container from the request?',
        buttons: [
          {
            text: this.ok_text,
            handler: () => {
              this.countcheckedHazardous = 0
              this.hMultiSelection();
            }
          }, {
            text: this.utils.getLocaleString("ca_cancel"),
            handler: () => {
              this.revertStatus();
            },
          }],
        //enableBackdropDismiss: false

      });
      alert.present();
    } else {
      this.countcheckedHazardous = this.hazardousContainers.length
      this.hMultiSelection();
    }
  }


  revertStatus() {
    this.allhazardousSelected = !this.allhazardousSelected;
  }

  revertOogStatus() {
    this.alloogSelected = !this.alloogSelected;
  }

  hazardousCheck(index: number) {
    if (!this.hazardousContainers[index].selected) {
      this.alertobj = this.alertCtrl.create({
        title: this.utils.getLocaleString("confirm_box"),
        subTitle: 'Do you want to remove this container from the request?',
        buttons: [
          {
            text: this.ok_text,
            handler: () => {
              this.allhazardousSelected = false;
              this.countcheckedHazardous--
              this.hSingleSelection(index, null);
            }
          }, {
            text: this.utils.getLocaleString("ca_cancel"),
            handler: () => {
              this.hSingleSelection(index, true);
            },
          }],
      });
      this.alertobj.present();
    } else {
      this.hSingleSelection(index, null);
      this.countcheckedHazardous++
    }
  }

  hMultiSelection() {
    // if(!this.hazardousFilterSelected){
    //   //this.allhazardousSelected = this.allhazardousSelected;
    //   this.hazardousFilterSelected = true;
    // }
    // else{
    //this.allhazardousSelected = !this.allhazardousSelected;
    for (let i = 0; i < this.hazardousContainers.length; i++) {
      this.hazardousContainers[i].selected = this.allhazardousSelected;
      if (this.hazardousContainers[i].selected) {
        this.hazardousContainers[i].selectCheckbox = "on";
        this.hazardousContainers[i].isSelected = "Y";
      } else {
        this.hazardousContainers[i].selectCheckbox = "";
        this.hazardousContainers[i].isSelected = "N";
      }
    }
    //   }
    this.hazardousFilterSelected = true;
  }


  oogMultiSelection() {
    // if(!this.oogFilterSelected){
    //   this.oogFilterSelected = true;
    // }
    // else{
    for (let i = 0; i < this.oogContainers.length; i++) {
      this.oogContainers[i].selected = this.alloogSelected;
      if (this.oogContainers[i].selected) {
        this.oogContainers[i].selectCheckbox = "on";
        this.oogContainers[i].isSelected = "Y";
      } else {
        this.oogContainers[i].selectCheckbox = "";
        this.oogContainers[i].isSelected = "N";
      }
    }
    // }
    this.oogFilterSelected = true;
  }

  hSingleSelection(index: number, selected: boolean) {
    if (selected) {
      this.hazardousContainers[index].selected = selected;
    }
    if (this.hazardousContainers[index].selected) {
      this.hazardousContainers[index].selectCheckbox = "on";
      this.hazardousContainers[index].isSelected = "Y";
    } else {
      this.hazardousContainers[index].selectCheckbox = "";
      this.hazardousContainers[index].isSelected = "N";
    }
    for (let i = 0; i < this.hazardousContainers.length; i++) {
      if (!this.hazardousContainers[i].selected) {
        if (this.allhazardousSelected) {
          this.hazardousFilterSelected = true;
        }
        this.allhazardousSelected = false;
        return;
      }
    }
    if (!this.allhazardousSelected) {
      this.hazardousFilterSelected = true;
    }
    this.allhazardousSelected = true;
    return;
  }

  splSingleSelection(index: number, selected: boolean) {
    if (selected) {
      this.specialhandling[index].selected = selected;
    }
    if (this.specialhandling[index].selected) {
      this.specialhandling[index].selectCheckbox = "on";
      this.specialhandling[index].isSelected = "Y";
    } else {
      this.specialhandling[index].selectCheckbox = "";
      this.specialhandling[index].isSelected = "N";
    }
    for (let i = 0; i < this.specialhandling.length; i++) {
      if (!this.specialhandling[i].selected) {
        if (this.allsplSelected) {
          this.splFilterSelected = true;
        }
        this.allsplSelected = false;
        return;
      }
    }
    if (!this.allsplSelected) {
      this.splFilterSelected = true;
    }
    this.allsplSelected = true;
    return;
  }

  oogSingleSelection(index: number, selected: boolean) {
    if (selected) {
      this.oogContainers[index].selected = selected;
    }
    if (this.oogContainers[index].selected) {
      this.oogContainers[index].selectCheckbox = "on";
      this.oogContainers[index].isSelected = "Y";
    } else {
      this.oogContainers[index].selectCheckbox = "";
      this.oogContainers[index].isSelected = "N";
    }
    for (let i = 0; i < this.oogContainers.length; i++) {
      if (!this.oogContainers[i].selected) {
        if (this.alloogSelected) {
          this.oogFilterSelected = true;
        }
        this.alloogSelected = false;
        return;
      }
    }
    if (!this.alloogSelected) {
      this.oogFilterSelected = true;
    }
    this.alloogSelected = true;
    return;
  }

  oogSelectAll() {
    if (!this.alloogSelected) {
      let alert = this.alertCtrl.create({
        title: this.utils.getLocaleString("confirm_box"),
        subTitle: 'Do you want to remove All container from the request?',
        buttons: [
          {
            text: this.ok_text,
            handler: () => {
              this.countcheckedOOG = 0
              this.oogMultiSelection();
            }
          }, {
            text: this.utils.getLocaleString("ca_cancel"),
            handler: () => {
              this.revertOogStatus();
            },
          }],
        //enableBackdropDismiss: false

      });
      alert.present();
    } else {
      this.countcheckedOOG = this.oogFormArray.length
      this.oogMultiSelection();
    }
  }

  oogCheck(index: number) {
    if (!this.oogContainers[index].selected) {
      let alert = this.alertCtrl.create({
        title: this.utils.getLocaleString("confirm_box"),
        subTitle: 'Do you want to remove this container from the request?',
        buttons: [
          {
            text: this.ok_text,
            handler: () => {
              this.alloogSelected = false;
              this.countcheckedOOG--
              this.oogSingleSelection(index, null);
            }
          }, {
            text: this.utils.getLocaleString("ca_cancel"),
            handler: () => {
              this.oogSingleSelection(index, true);
            },
          }],
        //enableBackdropDismiss: false

      });
      alert.present();
    } else {
      this.countcheckedOOG++
      this.oogSingleSelection(index, null);
    }
  }

  allSelected: boolean = false;
  filterContainerArray: any = [];
  disableDone: boolean = true;
  containerTableDetails: any = [];
  tempcontainerTableDetails: any = [];

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

  registerdRotationDetails: CSHRotationResponseModel = new CSHRotationResponseModel();

  getSpecialHandlingContainer() {
    let registeresRotationReq = new CSSpeacialContainerRotationRequestModel();
    registeresRotationReq.rotationNumber = this.rotationno;
    registeresRotationReq.shippingLine = this.shippingLine;
    this.cshServiceProvider.searchRegisteredRotationNumber(registeresRotationReq)
      .subscribe(response => {
        this.specialhandling = <CSHSpecialHandlingModel []>response.list;
        for (let i = 0; i < this.specialhandling.length; i++) {
          this.specialhandling[i].isSelected = "N";
        }
        this.showContainer = true;
        this.setSpecialContainers();
        this.setSubCategoryAtRunTime();
      });
  }

  readOnlyFlagEmpty = true;
  trashIconStatus = true;
  containerDataTable = true;
  disableClear = false;
  searchedContainer = '';

  submitContainerSelection() {
    // this.readOnlyFlagEmpty = true;
    // this.disableDone = true;
    // if (this.containerTableDetails == null || this.containerTableDetails.length == 0) {
    //   this.containerTableDetails = JSON.parse(JSON.stringify(this.tempcontainerTableDetails));
    // } else {
    //   let matchFound: boolean = false;
    //   this.tempcontainerTableDetails.forEach((tempElement) => {
    //     matchFound = false;
    //     for (let conIndex = 0; conIndex < this.containerTableDetails.length; conIndex++) {
    //       if (this.containerTableDetails[conIndex].containerNo == tempElement.containerNo) {
    //         matchFound = true;
    //       }
    //     }
    //     if (matchFound == false) {
    //       this.containerTableDetails.push(tempElement);
    //     }
    //   })
    //   let containerIndex = 0;
    //   let containerIterator = JSON.parse(JSON.stringify(this.containerTableDetails));
    //   let matchPresent: boolean = false;
    //   let arrayIndexestoBeSpliced: number[] = [];
    //   for (let i = 0; i < containerIterator.length; i++) {
    //     matchPresent = false;
    //     for (let j = 0; j < this.tempcontainerTableDetails.length; j++) {
    //       if (containerIterator[i].containerNo == this.tempcontainerTableDetails[j].containerNo) {
    //         matchPresent = true; //no need to delete
    //       }
    //     }
    //     if (matchPresent == false) {
    //       if (containerIterator != null && containerIterator.length >= i) {
    //         console.log("No match found for <<" + JSON.stringify(containerIterator[i].containerNo) + ">>");
    //         arrayIndexestoBeSpliced.push(i);
    //         // this.containerTableDetails.splice(i, 1);
    //       }
    //     }
    //   }
    //   arrayIndexestoBeSpliced = arrayIndexestoBeSpliced.sort((n1, n2) => n2 - n1);
    //   arrayIndexestoBeSpliced.forEach(elementIndex => {
    //     this.containerTableDetails.splice(elementIndex, 1);
    //   })
    //
    //   arrayIndexestoBeSpliced = [];
    // }
    //
    // if (this.containerTableDetails.length > 0) {
    //   this.showContainer = false;
    //   this.trashIconStatus = true;
    //   this.containerDataTable = true;
    //   this.disableClear = false;
    // }
    // else {
    //   this.containerDataTable = false;
    //   this.disableClear = true;
    //   this.showContainer = false;
    // }
    // this.searchedContainer = '';
  }

  cancelContainerSelection() {
    // this.allSelected = false;
    // this.disableDone = true;
    // this.disableClear = true;
    // if (this.containerTableDetails) {
    //   this.containerTableDetails.forEach((container) => {
    //     container.selected = false;
    //   });
    //   this.containerTableDetails = [];
    //   this.tempcontainerTableDetails = [];
    //   this.showContainer = false;
    //   this.containerDataTable = false;
    //   this.searchedContainer = '';
    // }
  }

  addAttachment() {
    this.attachmentDirty = true;
    if (this.attachments.length < 5) {
      this.attachments.push(new CSHBaseInfoAttachModel());
      let length = this.attachments.length;
      this.attachments[length - 1].categoryeditable = true;
      this.attachmentsFormArray.push(this.addattachForm('', '', ''));
      // if(this.attachments.length>1){
      //   this.isattachone=false;
      // }
    } else {
      this.presentAlert(this.alertHeadding, this.utils.getLocaleString("invalid_attachments"));
    }
  }

  closeAttachment(index) {
    // if (this.attachments.length >1) {
    this.attachmentDirty = true;
    this.attachments.splice(index, 1);
    this.attachmentsFormArray.removeAt(index);
    // if(this.attachments.length ==1){
    //   this.isattachone=true;
    // }
    return;
    // }
  }

  checkListIsNotEmpty(obj: any) {
    if (obj === null || obj === 'undefined' || obj === undefined) {
      return true;
    }
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length === 0;
  }

  //For getting the subcategory list from the catogary obj
  setSubCategoryKeys(index: number) {

    this.subcat_map[index] = new Map<string, string>();
    if (this.specialhandling[index].categorySh != null) {
      if (this.mode == "edit") {
        if (this.specialhandling[index].categorySh != "") {
          this.subcat_map[index] = this.cat_map.get(this.specialhandling[index].categorySh).subcategory;
        }
      } else {
        this.specialhandling[index].subCategorySh = "";
        this.subcat_map[index] = this.cat_map.get(this.specialhandling[index].categorySh).subcategory;
      }

    }
  }

// Method that is called On ion select change
  setSubCategoryKeysOnChange(index: number) {
    this.subcat_map[index] = new Map<string, string>();
    if (this.specialhandling[index].categorySh != null) {
      this.specialhandling[index].subCategorySh = "";
      this.subcat_map[index] = this.cat_map.get(this.specialhandling[index].categorySh).subcategory;
    }
  }

  isEditMode() {
    if (this.mode == "edit") {
      return true;
    } else {
      return false;
    }
  }

  //Function to check if the controls needs to be disabled
  isDisabled() {
    if (this.mode == "edit") {
      if ((this.regStatus == "Approved" && this.cshSearchByIDResultModel.requestStatus == "Approved") ||
        (this.regStatus == "Approved" && this.cshSearchByIDResultModel.requestStatus == "Submitted") ||
        (this.regStatus == "Approved" && this.cshSearchByIDResultModel.requestStatus == "Rejected")) {
        this.showMandatory = false;
        return true;
      }
      else
        return false;
    } else {
      return false;
    }
  }

  //For setting the category and subcategory at run time
  setSubCategoryAtRunTime() {
    for (let i = 0; i < this.specialhandling.length; ++i) {
      this.setSubCategoryKeys(i);
    }
  }

  attachmentCategoryShow(index) {
    if (this.mode == "edit" &&
      (this.regStatus == "Approved" && this.cshSearchByIDResultModel.requestStatus == "Submitted")) {
      this.attachments[index].categoryeditable = false;
    } else {
      this.attachments[index].categoryeditable = true;
    }
    return this.attachments[index].categoryeditable;
  }
}


class category {
  cat_value: string;
  subcategory: Map<string, string>;

  constructor(cat_value: string) {
    this.cat_value = cat_value;
    this.subcategory = new Map();
    if (cat_value == "Damage") {
      this.subcategory.set("DMG_Top", "Top Damaged");
      this.subcategory.set("DMG_BOTTAM", "Bottom Damaged");
    } else if (this.cat_value == "Heavy Duty") {
      this.subcategory.set("HEAVY_DUTY", "Yacht");
    } else if (this.cat_value == "Others") {
      this.subcategory.set("Oth", "Others");
    }
  }


}
