import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, ModalController, Navbar, NavController, NavParams, Slides,
  Platform, AlertController,ViewController} from 'ionic-angular';

import {Utils} from "../../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {
  ContainerHoldDetailsSO,
  ReleaseAdditionalDetailsSO, ReleaseAttachmentDetailsSO
} from "../../../shared/model/hnrc/releasecontainersrch.model";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
/**
 * Generated class for the RbviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-RCHview',
  templateUrl: 'rchview.html',
  providers: [Utils]
})

export class RCHviewPage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  headerTitle: string;
  selectedTabsIndex = 0;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  hnrcViewResult : ContainerHoldDetailsSO;
  hnrcAdditonalDetails:ReleaseAdditionalDetailsSO[];

  @ViewChild(Slides) slides: Slides;

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController,
              public utils: Utils,
              private hrcservicesProvider:HrcservicesProvider,
              public keyboard: Keyboard, private viewCtrl: ViewController) {
      this.hnrcViewResult = this.navParams.get("hnrcViewResult");
      this.hnrcAdditonalDetails = this.hnrcViewResult.additionalDetails;
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {

  }

  ionViewWillLeave() {

  }

  getStyle() {
    return '#808080';
  }

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  getAttachment(attachment: ReleaseAttachmentDetailsSO) {
    this.hrcservicesProvider.openAttachment(attachment);
  }

  navigateBack() {
      this.navCtrl.pop();
  }

}
