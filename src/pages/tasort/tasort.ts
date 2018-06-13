import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {SortModel} from "../../shared/model/sort.model";

/**
 * Generated class for the TasortPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tasort',
  templateUrl: 'tasort.html',
})
export class TasortPage {

  sortMode: string;
  sort: boolean = false;
  ascend: boolean = false;
  sortselect: any;
  public taSortModel: SortModel;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.taSortModel = this.navParams.get('sortModel');
    this.sortselect = 'rchcontainerno';
    this.ascend = false;
    this.sortMode = "Descending";

    if (this.taSortModel.sortOrder ||
      this.taSortModel.sortOption) {
      this.ascend = this.taSortModel.sortOrder;
      this.sortselect = this.taSortModel.sortOption;
      if (this.taSortModel.sortOrder == true) {
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
    this.sortselect = 'rchcontainerno';
    this.ascend = false;
    this.sortMode = "Descending"
  }

  submit() {
    this.taSortModel.sortOption = this.sortselect;
    this.taSortModel.sortOrder = this.ascend;
    this.taSortModel.fromSort = true;
    this.navCtrl.pop();
  }

}
