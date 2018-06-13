import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Utils} from "../../shared/utils";
import {RBSortModal} from "../../shared/model/rb/rbSortModal";

/**
 * Generated class for the TasortPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-rbsort',
  templateUrl: 'rbsort.html',
  providers: [Utils, RBSortModal]
})
export class RBsortPage {

  sortMode: string;
  sort: boolean = false;
  ascend: boolean = false;
  sortselect: any;
  public rbSortModel: RBSortModal;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sortselect = 'rb_requestno';
    this.ascend = false;
    this.sortMode = "Descending";
    this.rbSortModel = this.navParams.get("sortModal");
    if (this.rbSortModel.sortOrder ||
      this.rbSortModel.sortOption) {
      this.ascend = this.rbSortModel.sortOrder;
      this.sortselect = this.rbSortModel.sortOption;
      if (this.rbSortModel.sortOrder == true) {
        this.sortMode = "Ascending";
      } else {
        this.sortMode = "Descending"
      }
    }
  }

  changeorder() {
    if (this.ascend == true) {
      this.sortMode = "Ascending";
    } else {
      this.sortMode = "Descending";
    }
  }

  clear() {
    this.sortselect = 'rb_requestno';
    this.ascend = false;
    this.sortMode = "Descending"
  }

  submit() {
    this.rbSortModel.sortOption = this.sortselect;
    this.rbSortModel.sortOrder = this.ascend;
    this.rbSortModel.fromSort = true;
    this.navCtrl.pop();
  }

}
