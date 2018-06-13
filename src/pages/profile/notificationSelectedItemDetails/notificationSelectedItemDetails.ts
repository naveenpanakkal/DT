import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Utils} from "../../../shared/utils";

/**
 * Generated class for the NotificationDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificationSelectedItemDetails',
  templateUrl: 'notificationSelectedItemDetails.html',
  providers:[Utils]
})

export class NotificationSelectedItemDetailsPage {
  notificationDatas:{};

  constructor(public navCtrl: NavController, public utils: Utils,public navParams: NavParams) {
    console.log("actionName"+this.navParams.get("notificationItemData"));
    if (this.navParams.get('notificationItemData')) {
      this.notificationDatas=this.navParams.get('notificationItemData');
    } else {
      this.notificationDatas={};
    }
  }

  ionViewDidLoad() {
    console.log("actionName"+this.navParams.get("notificationItemData"));
    if (this.navParams.get('notificationItemData')) {
      this.notificationDatas=this.navParams.get('notificationItemData');
    } else {
      this.notificationDatas={};
    }
  }

}
