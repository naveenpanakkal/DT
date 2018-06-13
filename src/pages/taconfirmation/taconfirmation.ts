import {Component, ViewChild} from '@angular/core';
import {
  AlertController, Content, IonicPage, Navbar, NavController, NavParams, Platform, Slides,
  FabContainer
} from 'ionic-angular';
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {TaSearchSOModel} from "../../shared/model/ta/taSearchSO.model";
import {
  TaContainerDetailsSO,
  TruckappointmentdetailsoModel
} from "../../shared/model/ta/truckappointmentdetailso.model";
import {SecurityUtility} from "../../shared/securityutility";
import {Utils} from "../../shared/utils";
import {TasearchresultPage} from "../tasearchresult/tasearchresult";
import {TahistoryPage} from "../tahistory/tahistory";
import {TaeditPage} from "../taedit/taedit";
import {TaviewPage} from "../taview/taview";
import {DatePipe} from "@angular/common";

/**
 * Generated class for the TasummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-taconfirmation',
  templateUrl: 'taconfirmation.html',
  providers: [SecurityUtility, Utils]
})
export class TaConfirmationPage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  fromResultScreen: boolean;
  appointmentNoSearch: string;
  moveTypeSearch: string;
  status: string;
  confirmationMessage: string;
  statusIcon: string;
  public displayModel: TruckappointmentdetailsoModel;
  hidePrintOption: boolean;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;
  moveTypeOutList: TaContainerDetailsSO[];
  moveTypeInList: TaContainerDetailsSO[];
  @ViewChild(Slides) slides: Slides;
  @ViewChild('mainSlides') mainslides: Slides;
  public unregisterBackButtonAction: any;
  fromSummary: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private taProvider: TruckappointmentserviceProvider,
              public alertCtrl: AlertController, public utils: Utils,
              public platform: Platform, public datepipe: DatePipe) {
    this.moveTypeOutList = new Array<TaContainerDetailsSO>();
    this.moveTypeInList = new Array<TaContainerDetailsSO>();

    this.displayModel = this.navParams.get('successModel');
    this.appointmentNoSearch = this.navParams.get('appointmentNo');
    this.fromSummary = this.navParams.get('fromSummary');
    this.status = this.displayModel.taStatus;
    this.confirmationMessage = this.navParams.get('confirmationMessage');
    this.statusIcon = this.getStatusIcon(this.displayModel.taStatus);
    this.hidePrintOption = this.hidePrint(this.displayModel.taStatus);
    if (this.displayModel != null && this.displayModel.containerDetails != null) {
      if (this.displayModel.containerDetails.length != 0) {
        for (let i = 0; i < this.displayModel.containerDetails.length; i++) {
          if (this.displayModel.containerDetails[i].moveTypeDetails.toLowerCase() == 'in') {
            this.moveTypeInList.push(this.displayModel.containerDetails[i]);
          } else {
            this.moveTypeOutList.push(this.displayModel.containerDetails[i]);
          }
        }
      }
    }

    this.tabs = [
      this.utils.getLocaleString("ta_tab4"),
      this.utils.getLocaleString("ta_tab2"),
      this.utils.getLocaleString("ta_tab3"),
    ];

    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    // this.dropDown=false;
    this.showRightButton = this.tabs.length > 1;

    this.resetShowTabs(0);
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

  printDoc(fab: FabContainer) {
    let args = new Map();
    args.set("appointmentNoSearch", this.appointmentNoSearch);
    args.set("exportType", "pdf");
    this.taProvider.printTA(args);
    fab.close();
  }

  hidePrint(status: string) {
    if (status != null && (status.toLowerCase() == "active" || status.toLowerCase() == "partial gated in/out")) {
      return false;
    }
    else {
      return true;
    }
  }

  getStatusIcon(taStatus) {
    switch (taStatus) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated In/Out':
        return "assets/img/partial_gated.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  getStyle() {
    return '#808080';
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
    this.showRightButton = !this.slides.isEnd();
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("ta_tab4")) {
      this.resetShowTabs(0);
      this.mainslides.slideTo(0, 500);
      this.slides.slideTo(0, 500);
    } else if (tab === this.utils.getLocaleString("ta_tab2")) {
      this.resetShowTabs(1);
      this.mainslides.slideTo(1, 500);
      this.slides.slideTo(1, 500);
      this.showRightButton = false;
    } else if (tab === this.utils.getLocaleString("ta_tab3")) {
      this.resetShowTabs(2);
      this.mainslides.slideTo(2, 500);
      this.slides.slideTo(2, 500);
      this.showRightButton = false;
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

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      if (this.fromSummary) {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4));
      } else {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
      }
    }
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      if (_this.fromSummary) {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4));
      } else {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
      }

    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  public mainContainerslideChanged(): void {
    let currentIndex = this.mainslides.getActiveIndex();
    if (currentIndex == 0) {
      this.selectedTab = this.tabs[0];
      this.slides.slideTo(0, 500);
    }
    if (currentIndex == 1) {
      this.selectedTab = this.tabs[1];
      this.slides.slideTo(1, 500);
    }
    if (currentIndex == 2) {
      this.selectedTab = this.tabs[2];
      this.slides.slideTo(2, 500);
    }
    if (currentIndex == 3) {
      this.selectedTab = this.tabs[3];

      this.slides.slideTo(3, 500);
    }
  }
}
