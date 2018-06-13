
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
  selector: 'page-SsrConfirmation',
  templateUrl: 'ssrconfirmation.html',
  providers: [Utils,GigoDetailsSO]
})

export class SsrConfirmation {
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

  public dropDown: any;
  holdRequestNo: number;

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              public keyboard: Keyboard, private viewCtrl: ViewController)
  {
    // this.gigoSearchResult = <GigoDetailsSO>this.navParams.get('gigoSearchResult');
  }

  // ionViewDidLoad() {
  // }
  //
  // ionViewWillEnter() {
  //
  // }
  //
  // ionViewWillLeave() {
  //   this.navigateBack();
  // }
  //
  //
  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }
  // navigateBack() {
  //   this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 3));
  // }
  //
  // getStyle() {
  //   return '#808080';
  // }
  getStatusIcon(taStatus) {
    switch (taStatus) {
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
    }
  }

}

