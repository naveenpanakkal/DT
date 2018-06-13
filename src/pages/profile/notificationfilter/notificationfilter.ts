import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, Navbar, NavParams, Alert, Platform} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Keyboard} from "@ionic-native/keyboard";
import {TranslateService} from "@ngx-translate/core";
import {Utils} from "../../../shared/utils";

/**
 * Generated class for the notificationfilter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notificationfilter',
  templateUrl: 'notificationfilter.html',
  providers:[Utils]
})
export class NotificationFilterPage {
  @ViewChild('navbar') navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public keyboard: Keyboard,public translate: TranslateService,
              public formBuilder: FormBuilder,public  utils:Utils,public alertCtrl :AlertController,
              public platform: Platform) {

  }

  ionViewWillEnter(){

  }


  reset() {

  }

  keyboardClose() {
    this.keyboard.close();
  }
  showNotificatiosFilterResult() {

  }

  onPaste(e: any, ) {

    // Do stuff
    setTimeout(() => {

    });
    // Then clear pasted content from the input
  }


}
