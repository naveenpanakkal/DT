import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';

import {DatePipe} from "@angular/common";
import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";

/**
 * Generated class for the vesselloaddischargesummarysearch page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vesselloaddischargesummarysearch',
  templateUrl: 'vesselloaddischargesummarysearch.html',
  providers: [Utils]
})

export class VesselloaddischargesummarysearchPage {

  constructor(public keyboard: Keyboard,
              public navCtrl: NavController, public navParams: NavParams,
              public datepipe: DatePipe,
              public utils: Utils,
              private alertCtrl: AlertController,
             ) {


  }

  ionViewDidLoad() {

  }
  ionViewWillEnter() {

  }



  keyboardClose() {
    this.keyboard.close();
  }

}
