import {Component} from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Utils} from "../../shared/utils";
import {BerthSearchResultListModel} from "../../shared/model/berthsearchview/berthsearchviewresult-list.model";
import {BerthSearchReqModel} from "../../shared/model/berthsearchview/berthsearchviewreq.model";
import {BerthSearchResultModel} from "../../shared/model/berthsearchview/berthsearchviewresult.model";
import {BerthSearchDetailsResultModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsresult.model";

/**
 * Generated class for the BerthsortpopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-berthsortpopover',
  templateUrl: 'berthsortpopover.html',
  providers: [Utils]
})
export class BerthsortpopoverPage {
  sortselect: any;
  myForm: FormGroup;
  ascend: boolean = true;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public utils:Utils,public navParams: NavParams, public viewCtrl: ViewController, private storage: Storage) {
    this.sortselect = this.navParams.get('berthRadioSelect');
    this.ascend = this.navParams.get('berthSortOrder');
 }

  ionViewDidLoad() {
  }

  clear() {
    this.sortselect = 'rno';
    this.ascend = false;

  }

  submit() {
    this.viewCtrl.dismiss({sortOption: this.sortselect, sortOrder: this.ascend}).catch(() => {
    });
  }

  changeorder() {
    this.ascend = !this.ascend;
  }

  getordericon() {
    if (this.ascend) {
      return "arrow-dropdown";
    } else {
      return "arrow-dropup";
    }
  }
}
