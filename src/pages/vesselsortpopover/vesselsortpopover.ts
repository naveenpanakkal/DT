import {Component} from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams, LoadingController, Platform} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Utils} from "../../shared/utils";

/*
* ===========================================================================
* Copyright 2017 Dubai Trade.
* All Rights Reserved
* ===========================================================================
*
*  vesselsortpopover.ts file contains VesselSortPopoverPage class which holds functions to
*  populate the data, and handle the UI navigation logic for vessel filter popover UI.
*
*/

@IonicPage()
@Component({
  selector: 'page-vesselsortpopover',
  templateUrl: 'vesselsortpopover.html',
  providers: [ Utils]
})
export class VesselSortPopoverPage {

  sortselect: any;

  res: any;
  ascend: boolean = false;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public utils: Utils, public navParams: NavParams, public viewCtrl: ViewController, public plt:Platform, private storage: Storage) {

  }

  ionViewDidLoad() {

    this.plt.ready().then( () => {

      this.storage.get('vesselRadioSelect').then((val) => {

        if(val!=null)
        {
          this.sortselect = val;
        }
        else
        {
          this.sortselect='regid';
        }
      });

      this.storage.get('vesselSortOrder').then((val) => {

        if (val != null) {
          this.ascend = val;
        }
      });

    });
    //ios code change  -- start
    //Code added to solve the persistence issue for is sort popover
    if(this.sortselect == null){

      this.sortselect = this.navParams.get('previous');

    }
    //ios code change  -- end
  }

  clear() {
    this.sortselect='regid';
    this.ascend = false;
    this.storage.remove('vesselRadioSelect');
    this.storage.remove('vesselSortOrder');
    this.res = this.sortselect;
    /*this.viewCtrl.dismiss({sortOption: this.res, sortOrder: this.ascend}).catch(() => {
    });*/
  }

  submit() {
    this.res = this.sortselect;
    this.plt.ready().then( () => {

      this.storage.set('vesselRadioSelect', this.res);
      this.storage.set('vesselSortOrder', this.ascend);
    });
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
