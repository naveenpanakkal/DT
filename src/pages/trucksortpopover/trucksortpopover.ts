import {Component} from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams, LoadingController, Platform} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {Utils} from "../../shared/utils";

@IonicPage()
@Component({
  selector: 'page-filterpopover',
  templateUrl: 'trucksortpopover.html',
  providers: [ Utils]
})
export class TruckSortpopoverPage {

  sortselect: any;
  myForm: FormGroup;
  res: any;
  ascend: boolean = false;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams,public utils: Utils, public viewCtrl: ViewController,public plt:Platform, private storage: Storage) {

  }

  ionViewDidLoad() {
    //this.sortselect='truckRegID';
    this.plt.ready().then( () => {
      //console.log('ionViewDidLoad FilterpopoverPage');
      this.storage.get('truckRadioSelect').then((val) => {
        if (val != null) {
          this.sortselect = val;
        }
      });

      this.storage.get('truckSortOrder').then((val) => {
       // console.log("sort order" + val);
        if (val != null) {
          this.ascend = val;
        }
      });
    });
    //ios code change  -- start
    //Code added to solve the persistence issue for is sort popover
    if(this.sortselect == null){
     // console.log("The sort select is empty");
      this.sortselect = this.navParams.get('previous');
     // console.log("The sort select is "+ this.sortselect);
    }
    //ios code change  -- end
  }

  clear() {
    this.sortselect = 'truckRegID';
    this.ascend = false;
    this.storage.remove('truckRadioSelect');
    this.storage.remove('truckSortOrder');
    this.res = this.sortselect;
    /*this.viewCtrl.dismiss({sortOption: this.res, sortOrder: this.ascend}).catch(() => {
    });*/
  }

  submit() {
    this.res = this.sortselect;
    this.storage.set('truckRadioSelect', this.res);
    this.storage.set('truckSortOrder', this.ascend);
    this.viewCtrl.dismiss({sortOption: this.res, sortOrder: this.ascend}).catch(() => {
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
