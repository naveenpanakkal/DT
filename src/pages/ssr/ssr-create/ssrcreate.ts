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
  Slides,
  ViewController
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Utils} from "../../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {SealDetailsComponent} from "../../../components/gigomodelpage/seal-details/seal-details";
import {DamageDetailsComponent} from "../../../components/gigomodelpage/damage-details/damagedetails";
import {GigoAttachmentSO, GigoContainerDetailsSO, GigoDetailsSO, LocationMasterSO, SubLocationMasterSO} from "../../../shared/model/GIGO/gigodetails.model";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {LocationMasterModel} from "../../../shared/model/locationmaster.model";
import {SubLocationMasterModel} from "../../../shared/model/sublocationmaster.model";
// import {GigoCreateSummary} from "../gigocreatesummary/gigocreatesummary";
import {GigoMovement} from "../../../shared/model/GIGO/gigomovement.model";
import {GigoSearchSOModel} from "../../../shared/model/GIGO/gigosearch.model";
import {SsrApproverComponent} from "../../../components/ssrmodelpage/ssr-approver-details/ssr-approver";
import {SsrCostComponent} from "../../../components/ssrmodelpage/ssr-cost-container/ssr-cost";
import {SsrSelectRotationModel} from "../../../components/ssrmodelpage/ssr-select-rotation-model/select-rotation-model";
import {SsrAddContainerModel} from "../../../components/ssrmodelpage/ssr-add-container-model/ssr-add-container-model";


/**GiGoEditPage
 * Generated class for the GiGoEdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ssrcreate',
  templateUrl: 'ssrcreate.html',
  providers: [GigoDetailsSO,Utils]
})

export class SsrCreatePage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  @ViewChild(Slides) slides: Slides;
  dateTimeFormat: string = 'DD/MM/YYYY HH:mm';
  dateTimeFormatplaceHolder: string = 'DD/MM/YYYY HH:MM';
  public showLeftButton: boolean;
  public showRightButton: boolean;
  hidePreviousButton:boolean = false;
  hideNextButton:boolean = true;
  public selectedTab: any;
  currentTabIndexForNavigation = 0;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false,false,false,false];
  public showRightSlideNav: boolean;
  public currentIndexSideNav: any;
  public dropDown: any;
  selectedTabsIndex = 0;
  private dropDown2: string = 'false';
  private hideUploadButton: string = 'false';
  locationModel: GigoDetailsSO = new GigoDetailsSO();
  private selectedModel: GigoDetailsSO = new GigoDetailsSO();
  public gigoContainerDetailsSO: GigoContainerDetailsSO[] = [];
  public definedSetListModel: DefinedsetresListModel[];
  public modeOfTransportList: DefinedSetResModel[] = [];
  public moveTypeList: DefinedSetResModel[] = [];
  public gateMasterList: DefinedSetResModel[] = [];
  public gateIngateOutList: DefinedSetResModel[] = [];
  public gigoStatusList: DefinedSetResModel[] = [];
  public gigoReleasebyList: DefinedSetResModel[] = [];
  public gigoRequesttypeList: DefinedSetResModel[] = [];
  public requesttypeList: DefinedSetResModel[] = [];
  public sealIssuerList: DefinedSetResModel[] = [];
  public sealStatusList: DefinedSetResModel[] = [];
  public sealTypeList: DefinedSetResModel[] = [];
  public ladenStatusList: DefinedSetResModel[] = [];
  locationMasterModel: LocationMasterSO [] = [];
  sublocationMasterModel: SubLocationMasterSO [] = [];
  private pdf: string = 'pdf';
  private csv: string = 'excel';
  verifyRefNoExists: boolean = false;
  alertButtonDismiss: string;
  attensiontitle: string;
  attachments: GigoAttachmentSO[] = [];
  gigoMovement: GigoMovement[] = [];
  FormGroup1: FormGroup;
  FormGroup2: FormGroup;
  error: boolean = false;
  containerError: boolean = false;

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private commonServices: CommonservicesProvider,
              private alertCtrl: AlertController,
              public gigoServiceProvider: GiGoServiceProvider,
              public utils: Utils,
              public formBuilder: FormBuilder,
              public keyboard: Keyboard, private viewCtrl: ViewController) {
    this.tabs = [
      this.utils.getLocaleString("ssr_tab1"),
      this.utils.getLocaleString("ssr_tab2"),
      this.utils.getLocaleString("ssr_tab3"),
    ];
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;
    this.resetShowTabs(0);

  }
  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }
  public filterTabs(tab: string): void {
    if(this.selectedTab != tab){
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("ssr_tab1")) {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
      this.currentTabIndexForNavigation = 0;
    } else if (tab === this.utils.getLocaleString("ssr_tab2")) {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
      this.currentTabIndexForNavigation = 1;
    }else if (tab === this.utils.getLocaleString("ssr_tab3")) {
      this.resetShowTabs(2);
      this.slides.slideTo(2, 500);
      this.currentTabIndexForNavigation = 2;
    }
    this.selectedTab = tab;
  }
  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();

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
  openApproverModel(){
    let profileModal = this.modalCtrl.create(SsrApproverComponent,  {

    });
    profileModal.present();
  }
  openCostModel(){
    let profileModal = this.modalCtrl.create(SsrCostComponent,  {

    });
    profileModal.present();
  }
  openRotationSelectModel(){
    let profileModal = this.modalCtrl.create(SsrSelectRotationModel,  {

    });
    profileModal.present();
  }
  openAddContainer(){
    let profileModal = this.modalCtrl.create(SsrAddContainerModel,  {

    });
    profileModal.present();
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
    if(this.currentTabIndexForNavigation > 0  &&  this.currentTabIndexForNavigation < 2)
    {
      this.hidePreviousButton = true;
      this.hideNextButton = true;
    }
    if(this.currentTabIndexForNavigation == 0 ) {
      this.hidePreviousButton = false;
      this.hideNextButton = true;
    }
    if(this.currentTabIndexForNavigation == 2) {
      this.hidePreviousButton = true;
      this.hideNextButton = false;
    }

  }

}
