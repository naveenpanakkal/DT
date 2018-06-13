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
import {HoldContainerSO} from "../../../shared/model/hnrc/holdcontainerso.model";

/**
 * Generated class for the RbviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hold-container',
  templateUrl: 'holdcontainerconfirmation.html',
  providers: [Utils, HoldContainerSO]
})

export class HoldContainerConfirmation {
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
  public dropDown: any;
  holdRequestNo: number;
  holdReferenceNo: number;
  startDateTime: any;
  endDateTime: any;
  holdStatus: string;
  fromEdit: boolean = false;

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              public keyboard: Keyboard, private viewCtrl: ViewController) {
    this.holdRequestNo = this.navParams.get('holdRequestNo');
    this.holdReferenceNo = this.navParams.get('referenceNo');
    this.startDateTime = this.navParams.get('startDateTime');
    this.endDateTime = this.navParams.get('endDateTime');
    this.fromEdit = this.navParams.get('fromEdit');
    this.holdStatus = this.navParams.get('holdStatus');

  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.navigateBack();
    }
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      _this.navigateBack();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  navigateBack() {
    if(this.fromEdit == true){
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 3));
    }
    else {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 2));
    }
  }

  getStyle() {

    return '#808080';
  }

  getStatusIcon(holdStatus) {
    switch (holdStatus) {
      case 'Approved':
        return "assets/img/approved.svg";
      case 'Active':
        return "assets/img/active.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated In':
        return "assets/img/partial_gated.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Expired':
        return "assets/img/expired.svg";
      default:
        return "assets/img/approved.svg";
    }
  }

}

