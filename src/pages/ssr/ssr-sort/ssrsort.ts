import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

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
  selector: 'page-ssrsort',
  templateUrl: 'ssrsort.html',
  providers: [Utils,SortModel]
})

export class SsrsortPage {
  sortMode: string;
  sort : boolean = false;
  sortselect : any;
  ascend : boolean = false;
  public ssrSortModal: SortModel;

  constructor(public navParams: NavParams,public utils:Utils, public viewCtrl: ViewController,public navCtrl: NavController) {
    this.sortselect = 'ssrRequestNoSrch';
    this.ascend  = false;
    this.sortMode = "Descending";
    this.ssrSortModal = this.navParams.get("sortModal");
    if(this.ssrSortModal.sortOrder ||
      this.ssrSortModal.sortOption) {
      this.ascend = this.ssrSortModal.sortOrder;
      this.sortselect = this.ssrSortModal.sortOption;
    if(this.ssrSortModal.sortOrder == true) {
      this.sortMode = "Ascending";
      } else {
      this.sortMode = "Descending"
      }
    }
  }

  clear() {
    this.sortselect = 'ssr-serv-req-no';
    this.ascend = false;
    this.sortMode = "Descending"
  }
  submit() {
    this.ssrSortModal.sortOption = this.sortselect;
    this.ssrSortModal.sortOrder = this.ascend;
    this.ssrSortModal.fromSort = true;
    this.navCtrl.pop();

  }
  //
  changeorder() {
    if (this.ascend == true) {
      this.sortMode = "Ascending";
    } else {
      this.sortMode = "Descending";
    }
  }
}
