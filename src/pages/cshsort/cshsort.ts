import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Utils} from "../../shared/utils";
import {CSHSortModal} from "../../shared/model/csh/cshSortModal";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the ChssortPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cshsort',
  templateUrl: 'cshsort.html',
  providers: [Utils,CSHSortModal]
})
export class CshsortPage {
  sortMode: string;
  sort : boolean = false;
  sortselect : string;
  ascend : boolean = false;
  public cshSortModal: CSHSortModal;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,
              private storage: Storage) {
    this.sortselect = 'cshRequestNo';
    this.ascend  = false;
    this.sortMode = "Descending";
    this.cshSortModal = this.navParams.get("sortModal");
    if(this.cshSortModal.sortOrder ||
      this.cshSortModal.sortOption) {
      this.ascend = this.cshSortModal.sortOrder;
      this.sortselect = this.cshSortModal.sortOption;
      if(this.cshSortModal.sortOrder == true){
        this.sortMode = "Ascending";
      } else {
        this.sortMode = "Descending"
      }
    }
  }

  clear() {
    this.sortselect = 'cshRequestNo';
    this.ascend = false;
    this.sortMode = "Descending"
  }

  submit() {
    this.cshSortModal.sortOption = this.sortselect;
    this.cshSortModal.sortOrder = this.ascend;
    this.cshSortModal.fromSort = true;
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
