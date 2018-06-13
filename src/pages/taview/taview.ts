import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, ModalController, Navbar, NavController, NavParams, Slides} from 'ionic-angular';
import {
  AdditionalDetailsSO,
  TaContainerDetailsSO, TruckAppointmentAttachSO,
  TruckappointmentdetailsoModel
} from "../../shared/model/ta/truckappointmentdetailso.model";
import {TaSearchSOModel} from "../../shared/model/ta/taSearchSO.model";
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {TaadditionaldetailComponent} from "../../components/tamodelpages/taadditionaldetail/taadditionaldetail";
import {Utils} from "../../shared/utils";
import {TaAddContainerComponent} from "../../components/tamodelpages/ta-add-container/ta-add-container";

/**
 * Generated class for the TaviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-taview',
  templateUrl: 'taview.html',
  providers: [Utils]
})
export class TaviewPage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  headerTitle: string;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;
  moveTypeOutList: TaContainerDetailsSO[];
  moveTypeInList: TaContainerDetailsSO[];
  @ViewChild(Slides) slides: Slides;
  @ViewChild('mainSlides') mainslides: Slides;
  appointmentFrom: any;

  public viewRequest: TaSearchSOModel;
  public viewResponse: TruckappointmentdetailsoModel;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private taProvider: TruckappointmentserviceProvider, public modalCtrl: ModalController, public utils: Utils) {
    this.headerTitle = this.utils.getLocaleString("ta_view");
    this.tabs = [
      this.utils.getLocaleString("ta_tab1"),
      this.utils.getLocaleString("ta_tab2"),
      this.utils.getLocaleString("ta_tab3"),
      this.utils.getLocaleString("ta_tab4")
    ];

    this.moveTypeOutList = new Array<TaContainerDetailsSO>();
    this.moveTypeInList = new Array<TaContainerDetailsSO>();

    this.viewRequest = new TaSearchSOModel();
    if (this.navParams.get('fromPage') != "history") {
      this.viewRequest.appointmentNoSearch = this.navParams.get('appointmentNoSearch');
    } else {
      this.viewRequest.truckAppointmentReqId = this.navParams.get('truckAppointmentReqId');
    }

    this.loadTA();
    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    // this.dropDown=false;
    this.showRightButton = this.tabs.length > 2;
    this.resetShowTabs(0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaviewPage');
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
    this.showRightButton = !this.slides.isEnd();
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
  }

  public filterTabs(tab: string): void {
    this.showRightButton = !this.slides.isEnd();
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("ta_tab1")) {
      // this.resetShowTabs(0);
      this.mainslides.slideTo(0, 500);
      this.slides.slideTo(0, 500);
      this.currentTabIndexForNavigation = 0;
    } else if (tab === this.utils.getLocaleString("ta_tab3")) {
      // this.resetShowTabs(1);
      this.mainslides.slideTo(2, 500);
      this.slides.slideTo(2, 500);
      this.currentTabIndexForNavigation = 2;
    } else if (tab === this.utils.getLocaleString("ta_tab2")) {
      // this.resetShowTabs(2);
      this.mainslides.slideTo(1, 500);
      this.slides.slideTo(1, 500);
      this.currentTabIndexForNavigation = 1;
    } else if (tab === this.utils.getLocaleString("ta_tab4")) {
      //this.resetShowTabs(3);
      this.mainslides.slideTo(3, 500);
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
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  loadTA() {
    this.viewResponse = new TruckappointmentdetailsoModel();
    this.taProvider.searchTaById(this.viewRequest).subscribe(
      response => {
        this.viewResponse = <TruckappointmentdetailsoModel>response;
        if (this.viewResponse != null && this.viewResponse.containerDetails != null) {
          if (this.viewResponse.containerDetails.length != 0) {
            for (let i = 0; i < this.viewResponse.containerDetails.length; i++) {
              if(this.viewResponse.containerDetails[i].additionalDetails == null) {
                this.viewResponse.containerDetails[i].additionalDetails = new AdditionalDetailsSO();
              }
              if (this.viewResponse.containerDetails[i].moveTypeDetails.toLowerCase() == 'in') {
                this.moveTypeInList.push(this.viewResponse.containerDetails[i]);
              } else {
                this.moveTypeOutList.push(this.viewResponse.containerDetails[i]);
              }
            }
          }
        }
      }
    );
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
    /*this.moveTypeOutList[selectedTabIndex].additionalDetails.outOfCharge*/
    /*if(jQuery.inArray(rowValues.containerStatusDetails, hideAddational)>= 0 ||  (jQuery('.tradeType').val()=='Foreign' && rowValues.containerStatusDetails=='FCL') && jQuery.isEmptyObject(rowValues.taISOQntyListSO) ){
      row.find('.popinfoData').show();
    }else{
      row.find('.popinfoData').hide();
    }*/
  }

  displayattach(attachment: TruckAppointmentAttachSO) {
    this.taProvider.openAttachment(attachment);
  }

  openAdditionalDetailModal(index: any) {
    let profileModal = this.modalCtrl.create(TaadditionaldetailComponent, {
      additionalModel: this.viewResponse.containerDetails[index].additionalDetails
    });
    profileModal.onDidDismiss(data => {
      if (null != data) {

      }
    });
    profileModal.present();
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

  public mainContainerslideChanged(): void {
    let currentIndex = this.mainslides.getActiveIndex();
    this.showRightButton = !this.slides.isEnd();
    if (currentIndex == 0) {
      this.selectedTab = this.tabs[0];
      this.slides.slideTo(0, 500);
      this.currentTabIndexForNavigation = 0;

    }
    if (currentIndex == 1) {
      this.selectedTab = this.tabs[1];
      this.slides.slideTo(1, 500);
      this.currentTabIndexForNavigation = 1;

    }
    if (currentIndex == 2) {
      this.selectedTab = this.tabs[2];
      this.slides.slideTo(2, 500);
      this.currentTabIndexForNavigation = 2;

    }
    if (currentIndex == 3) {
      this.selectedTab = this.tabs[3];
      this.slides.slideTo(3, 500);
      this.currentTabIndexForNavigation = 3;

    }
    this.hideBottomNavButtons();
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
