import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
import {Utils} from "../../shared/utils";
import {SortModel} from "../../shared/model/sort.model";

/**
 * Generated class for the DosortpagePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dosortpage',
  templateUrl: 'dosort.html',
  providers: [SortModel, Utils]
})
export class DosortPage {

  sortMode: string;
  ascend: boolean = false;
  sortselect: any;

  public doSortModel: SortModel;

  constructor(public navCtrl: NavController, public navParams: NavParams,public utils:Utils,
              public viewCtrl: ViewController, public platform: Platform) {

    this.doSortModel = this.navParams.get('sortModel');
    this.sortselect = 'dorequestno';
    this.ascend  = false;
    this.sortMode = "Descending";

    if (this.doSortModel.sortOrder ||
      this.doSortModel.sortOption) {
      this.ascend = this.doSortModel.sortOrder;
      this.sortselect = this.doSortModel.sortOption;
      if (this.doSortModel.sortOrder == true) {
        this.sortMode = "Ascending";
      } else {
        this.sortMode = "Descending"
      }
    }
  }

  changeorder() {
    if(this.ascend == true) {
      this.sortMode = "Ascending";
    } else {
      this.sortMode = "Descending";
    }
  }

  clear() {
    this.sortselect = 'dorequestno';
    this.ascend = false;
    this.sortMode = "Descending"
  }

  submit() {
    this.doSortModel.sortOption = this.sortselect;
    this.doSortModel.sortOrder = this.ascend;
    this.doSortModel.fromSort = true;
    this.navCtrl.pop();
  }

}
