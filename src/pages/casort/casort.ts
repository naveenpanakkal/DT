import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {Utils} from "../../shared/utils";
import {SortModel} from "../../shared/model/sort.model";

/**
 * Generated class for the CasortPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-casort',
  templateUrl: 'casort.html',
  providers: [SortModel, Utils]
})
export class CasortPage {

  sortMode: string;
  sort: boolean = false;
  ascend: boolean = false;
  sortselect: any;
  public caSortModel: SortModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils: Utils,
              public viewCtrl: ViewController, public platform: Platform) {
    this.caSortModel = this.navParams.get('sortModel');
    this.sortselect = 'acceptanceNo';
    this.ascend = false;
    this.sortMode = "Descending";

    if (this.caSortModel.sortOrder ||
      this.caSortModel.sortOption) {
      this.ascend = this.caSortModel.sortOrder;
      this.sortselect = this.caSortModel.sortOption;
      if (this.caSortModel.sortOrder == true) {
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
    this.caSortModel.sortOption = this.sortselect;
    this.caSortModel.sortOrder = this.ascend;
    this.caSortModel.fromSort = true;
    this.navCtrl.pop();
  }
}
