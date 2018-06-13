
import {Component, ViewChild} from '@angular/core';
import {
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
import {GigoDetailsSO} from "../../../shared/model/GIGO/gigodetails.model";

/**
 * Generated class for the RbviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-GigocreateSummary',
  templateUrl: 'gigocreatesummary.html',
  providers: [Utils,GigoDetailsSO]
})

export class GigoCreateSummary {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }


  public unregisterBackButtonAction: any;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;
  public gigoSearchResult:GigoDetailsSO = new GigoDetailsSO();
  fromSummary: boolean;
  public dropDown: any;
  holdRequestNo: number;
  editMode:boolean;
  message:string;
  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              public keyboard: Keyboard, private viewCtrl: ViewController)
  {
    this.gigoSearchResult = <GigoDetailsSO>this.navParams.get('gigoSearchResult');
    this.fromSummary = this.navParams.get('fromSummary');
    this.editMode = this.navParams.get('editMode');
    this.getMessage();
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
        this.navigateBack();
    }
  }

  ionViewWillEnter() {

  }
  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }
  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Overwrite Back Button Page Change');
      _this.navigateBack();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }
  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }
  navigateBack() {
    if(this.fromSummary) {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 3));
    }
    else{
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 2));
    }
  }

  getStyle() {
    return '#808080';
  }
  getStatusIcon(taStatus) {
    switch (taStatus) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
    }
  }
getMessage()
{
  if(this.editMode)
  {
    this.message = "Gate In Gate Out amended successfully."
  }
  else {
    this.message = "Gate In Gate Out created successfully.";
  }
}
}

