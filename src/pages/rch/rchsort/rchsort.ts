import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import {Utils} from "../../../shared/utils";
import {SortModel} from "../../../shared/model/sort.model";

/**
 * Generated class for the gigosort page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rchsort',
  templateUrl: 'rchsort.html',
  providers: [Utils,SortModel]
})

export class RCHsortPage {
  sortMode: string;
  sort : boolean = false;
  sortselect : string;
  ascend : boolean = false;
  public rchSortModal: SortModel;
  constructor(public navParams: NavParams,public utils:Utils, public viewCtrl: ViewController,public navCtrl: NavController,) {
    this.sortselect = 'rchcontainerno';
    this.ascend  = false;
    this.sortMode = "Descending";
    this.rchSortModal = this.navParams.get("sortModal");
    if(this.rchSortModal.sortOrder ||
      this.rchSortModal.sortOption) {
      this.ascend = this.rchSortModal.sortOrder;
      this.sortselect = this.rchSortModal.sortOption;
    if(this.rchSortModal.sortOrder == true) {
      this.sortMode = "Ascending";
      } else {
      this.sortMode = "Descending"
      }
    }
  }

  clear() {
    this.sortselect = 'rchcontainerno';
    this.ascend = false;
    this.sortMode = "Descending"
  }

  submit() {
    this.rchSortModal.sortOption = this.sortselect;
    this.rchSortModal.sortOrder = this.ascend;
    this.rchSortModal.fromSort = true;
    this.navCtrl.pop();
  }

  changeorder() {
    if(this.ascend == true) {
      this.sortMode = "Ascending";
    } else {
      this.sortMode = "Descending";
    }
  }
}
