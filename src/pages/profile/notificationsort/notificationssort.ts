import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {SortModel} from "../../../shared/model/sort.model";
import {Utils} from "../../../shared/utils";

/**
 * Generated class for the NotificationsortPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificationsort',
  templateUrl: 'notificationssort.html',
  providers: [SortModel, Utils]
})

export class NotificationsortPage {
  sortMode: string;
  sort: boolean = false;
  ascend: boolean = false;
  sortselect: any;
  public notifSortModel: SortModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils,
              public viewCtrl: ViewController, public platform: Platform) {
    this.sortselect = 'acceptanceNo';
    this.ascend = false;
    this.sortMode = "Descending";
    this.notifSortModel = this.navParams.get('sortModal');
    if (this.notifSortModel.sortOrder ||
      this.notifSortModel.sortOption) {
      this.ascend = this.notifSortModel.sortOrder;
      this.sortselect = this.notifSortModel.sortOption;
      if (this.notifSortModel.sortOrder == true) {
        this.sortMode = "Ascending";
      } else {
        this.sortMode = "Descending"
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CasortPage');
  }

  changeorder() {
    if (this.ascend == true) {
      this.sortMode = "Ascending";
    } else {
      this.sortMode = "Descending";
    }
  }

  clear() {
    this.sortselect = 'acceptanceNo';
    this.ascend = false;
    this.sortMode = "Descending"
  }

  submit() {
    this.notifSortModel.sortOption = this.sortselect;
    this.notifSortModel.sortOrder = this.ascend;
    this.notifSortModel.fromSort = true;
    this.navCtrl.pop();
  }

}
