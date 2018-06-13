import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import {Utils} from "../../shared/utils";
@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
  providers: [Utils],
})
export class MorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App, public utils:Utils,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  logout(){
    this.app.getRootNav().setRoot(LoginPage);

  }

}
