import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

import {DatePipe} from "@angular/common";
import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {Storage} from "@ionic/storage";
import {VesselloaddischargesummarysearchresultPage} from "../vesselloaddischargesummarysearchresult/vesselloaddischargesummarysearchresult";
import {VldsSearchReqModel} from "../../shared/model/VLDS/vldssearchallreq.model";
import {VldsSortModal} from "../../shared/model/VLDS/vldssort.modal";

/**
 * Generated class for the vesselloaddischargesummarysort page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vesselloaddischargesummaryort',
  templateUrl: 'vesselloaddischargesummarysort.html',
  providers: [Utils,VldsSortModal]
})

export class VesselloaddischargesummarysortPage {

  sortMode: string;
  sort : boolean = false;
  sortselect : string;
  ascend : boolean = false;
  public vldsSearchReqModal: VldsSearchReqModel;
  public vldsSortModal: VldsSortModal;
  constructor(public navParams: NavParams,public utils:Utils, public viewCtrl: ViewController,
              private storage: Storage,public navCtrl: NavController,) {

    this.sortselect = 'rotationno';
    this.ascend  = false;
    this.sortMode = "Descending";
    this.vldsSortModal = this.navParams.get("sortModal");
    if(this.vldsSortModal.sortOrder ||
      this.vldsSortModal.sortOption) {
      this.ascend = this.vldsSortModal.sortOrder;
      this.sortselect = this.vldsSortModal.sortOption;
    if(this.vldsSortModal.sortOrder == true){
      this.sortMode = "Ascending";
    } else {
      this.sortMode = "Descending"
    }
}

  }
  clear() {
    this.sortselect = 'rotationno';
    this.ascend = false;
    this.sortMode = "Descending"
  }

  submit() {
    this.vldsSortModal.sortOption = this.sortselect;
    this.vldsSortModal.sortOrder = this.ascend;
    this.vldsSortModal.fromSort = true;
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
