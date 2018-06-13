import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import {Utils} from "../../../shared/utils";
import {GiGoSortModal} from "../../../shared/model/GIGO/gigosort.modal";

/**
 * Generated class for the gigosort page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gigosort',
  templateUrl: 'gigosort.html',
  providers: [Utils,GiGoSortModal]
})

export class GiGosortPage {
  sortMode: string;
  sort : boolean = false;
  sortselect : any;
  ascend : boolean = false;
  public gigoSortModal: GiGoSortModal;

  constructor(public navParams: NavParams,public utils:Utils, public viewCtrl: ViewController,public navCtrl: NavController) {
    this.sortselect = 'gigoNo';
    this.ascend  = false;
    this.sortMode = "Descending";
    this.gigoSortModal = this.navParams.get("sortModal");
    if(this.gigoSortModal.sortOrder ||
      this.gigoSortModal.sortOption) {
      this.ascend = this.gigoSortModal.sortOrder;
      this.sortselect = this.gigoSortModal.sortOption;
    if(this.gigoSortModal.sortOrder == true) {
      this.sortMode = "Ascending";
      } else {
      this.sortMode = "Descending"
      }
    }
  }

  clear() {
    this.sortselect = 'gigoNo';
    this.ascend = false;
    this.sortMode = "Descending"
  }

  submit() {
    this.gigoSortModal.sortOption = this.sortselect;
    this.gigoSortModal.sortOrder = this.ascend;
    this.gigoSortModal.fromSort = true;
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
