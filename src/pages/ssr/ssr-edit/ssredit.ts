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

import {Utils} from "../../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {TruckappointmentserviceProvider} from "../../../providers/webservices/truckappointmentservices";
import {TaSearchSOModel} from "../../../shared/model/ta/taSearchSO.model";
import {SsrServiceProvider} from "../../../providers/webservices/ssrservices";
import {
  SsrSearchByIdResponseModal} from "../../../shared/model/ssr/searchbyidresponse.modal";
import {SsrSearchByIdRequestModal} from "../../../shared/model/ssr/searchbyidrequest.modal";
import {SsrApproverComponent} from "../../../components/ssrmodelpage/ssr-approver-details/ssr-approver";
import {SsrCostComponent} from "../../../components/ssrmodelpage/ssr-cost-container/ssr-cost";
import {SsrAddContainerModel} from "../../../components/ssrmodelpage/ssr-add-container-model/ssr-add-container-model";
import {SsrSelectRotationModel} from "../../../components/ssrmodelpage/ssr-select-rotation-model/select-rotation-model";


/**SSREditPage
 * Generated class for the SSREdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ssredit',
  templateUrl: 'ssredit.html',
  providers: [Utils,SsrServiceProvider,SsrSearchByIdRequestModal,SsrSearchByIdResponseModal]
})

export class SsrEditPage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  headerTitle:string;
  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false, false];
  currentTabIndexForNavigation = 0;
  hidePreviousButton:boolean = false;
  hideNextButton:boolean = true;
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  private mode: string;
  private serviceNo: string;
  selectedTabsIndex=0;
  moveTypeOut:any;
  @ViewChild(Slides) slides: Slides;


  locationList: any[] = [];
  spNameList: any[] = [];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController , public navParams: NavParams, public utils: Utils,
              private ssrProvider: SsrServiceProvider,private ssrSearchByRequestModal: SsrSearchByIdRequestModal,
              private ssrSearchResponseModal: SsrSearchByIdResponseModal) {
    this.serviceNo = this.navParams.get("serviceNo");
    this.mode = this.navParams.get("mode");
    this.ssrSearchByRequestModal.ssrRequestNo = this.serviceNo;
    this.tabs = [
      this.utils.getLocaleString("ssr_tab1"),
      this.utils.getLocaleString("ssr_tab2"),
      this.utils.getLocaleString("ssr_tab3"),
      this.utils.getLocaleString("ssr_tab5"),
    ];
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;

    this.resetShowTabs(0);
    this.loadService();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TaeditPage');
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
    } else if (tab === this.utils.getLocaleString("ssr_tab5")) {
      this.resetShowTabs(3);
      this.slides.slideTo(3, 500);
      this.currentTabIndexForNavigation = 3;
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

  openSelecedTab(selectedIndex){
    if(this.selectedTabsIndex != selectedIndex)
    {
      this.selectedTabsIndex = selectedIndex;
    }else{
      this.selectedTabsIndex = -1;
    }
  }
  private loadService() {
    this.ssrProvider.searchSsrByID(this.ssrSearchByRequestModal).subscribe(response=> {
      this.ssrSearchResponseModal = response;
    },error => {

    })
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
    if(this.currentTabIndexForNavigation < 3) {
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
