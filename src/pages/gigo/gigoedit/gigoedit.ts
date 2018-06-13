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


/**GiGoEditPage
 * Generated class for the GiGoEdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gigoedit',
  templateUrl: 'gigoedit.html',
  providers: [Utils]
})

export class GiGoEditPage {

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
  public showTabs: Array<boolean> = [false, false];
  public showRightSlideNav: boolean;
  public currentIndexSideNav: any;
  public dropDown: any;

  selectedTabsIndex = 0;
  private dropDown2: string = 'false';
  private pdf: string = 'pdf';
  private csv: string = 'excel';

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController,
              public gigoServiceProvider: GiGoServiceProvider,
              public utils: Utils,
              public keyboard: Keyboard, private viewCtrl: ViewController) {

    this.resetShowTabs(0);
    this.tabs = ['Gate In/Out Info', 'Attachments'];
    this.selectedTab = this.tabs[0];
    this.currentIndexSideNav = 2;
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.dropDown = false;
    this.showRightButton = this.tabs.length > 2;
  }


  getStatus(status: string) {
    if (status == "YettoArrive") {
      status = "Yet to Arrive";
    }
    return status;
  }


  public filterTabs(tab: string): void {
    if (this.selectedTab != tab) {

    }
    if (tab === 'Vessel Info') {
      this.resetShowTabs(0);
    } else if (tab === 'Summary') {
      this.resetShowTabs(1);
    } else if (tab === 'Discharge Details') {
      this.resetShowTabs(2);
    } else if (tab === 'Load Details') {
      this.resetShowTabs(3);
    } else if (tab === 'Restow Details') {
      this.resetShowTabs(4);
    }
    this.selectedTab = tab;
    if (this.currentIndexSideNav != 2) {
      // this.closeSideNav(this.currentIndexSideNav,'');
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


  // displayattach(attachment: TruckAppointmentAttachSO) {
  //   this.taProvider.openAttachment(attachment);
  // }
  ionViewWillEnter() {
  }

  ionViewWillLeave() {
  }

  ionViewDidLoad() {
  }
}
