import {Component} from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {Utils} from "../../shared/utils";

/**
 * Generated class for the VoyagesortpopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-voyagesortpopover',
  templateUrl: 'voyagesortpopover.html',
  providers: [Utils]
})
export class VoyagesortpopoverPage {
  sortselect: any;
  myForm: FormGroup;
  res: any;
  ascend: boolean = false;
  rotationnoChecked: boolean = true;
  vesselnameChecked: boolean = false;
  etaChecked: boolean = false;
  terminalsChecked: boolean = false;
  operationStatusChecked: boolean = false;
  clientCodeChecked: boolean = false;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public utils: Utils,public navParams: NavParams, public viewCtrl: ViewController, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterpopoverPage');
    //ios code change  -- start
    //Code added to solve the persistence issue for is sort popover

    this.storage.get('voyageRadioSelect').then((val) => {
      if (val != null) {
        this.sortselect = val;
      }
      else {
        this.sortselect="rotationNumber";
      }
    });

    this.storage.get('voyagerSortOrder').then((val) => {
      if (val != null) {
        this.ascend = val;
      }
    });


    //ios code change  -- end
    if (this.sortselect == "rotationNumber") {
      this.rotationnoChecked = true;
      this.vesselnameChecked = false;
      this.etaChecked = false;
      this.terminalsChecked = false;
      this.operationStatusChecked = false;
      this.clientCodeChecked = false;
    }
    else if (this.sortselect == "vesselName") {
      this.rotationnoChecked = false;
      this.vesselnameChecked = true;
      this.etaChecked = false;
      this.terminalsChecked = false;
      this.operationStatusChecked = false;
      this.clientCodeChecked = false;
    }
    else if (this.sortselect == "eta") {
      this.rotationnoChecked = false;
      this.vesselnameChecked = false;
      this.etaChecked = true;
      this.terminalsChecked = false;
      this.operationStatusChecked = false;
      this.clientCodeChecked = false;
    }
    else if (this.sortselect == "terminals") {
      this.rotationnoChecked = false;
      this.vesselnameChecked = false;
      this.etaChecked = false;
      this.terminalsChecked = true;
      this.operationStatusChecked = false;
      this.clientCodeChecked = false;
    }
    else if (this.sortselect == "operationStatus") {
      this.rotationnoChecked = false;
      this.vesselnameChecked = false;
      this.etaChecked = false;
      this.terminalsChecked = false;
      this.operationStatusChecked = true;
      this.clientCodeChecked = false;
    }
    else {
      this.rotationnoChecked = false;
      this.vesselnameChecked = false;
      this.etaChecked = false;
      this.terminalsChecked = false;
      this.operationStatusChecked = false;
      this.clientCodeChecked = true;
    }

  }

  clear() {
    this.sortselect = 'rotationNumber';
    this.ascend = false;
    // this.viewCtrl.dismiss({sortOption: "",sortOrder: ""}).catch(() => {
    // });
  }

  submit() {
    this.storage.set('voyageRadioSelect', this.sortselect);
    this.storage.set('voyagerSortOrder', this.ascend);
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
