import { Component } from '@angular/core';
import {ViewController, IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Utils} from "../../shared/utils";
/**
 * Generated class for the LoaddischargesortComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'loaddischargesort',
  templateUrl: 'loaddischargesort.html',
  providers: [Utils]
})
export class LoaddischargesortComponent {
  sortselect: any;
  ascend: boolean ;
  sortMode: string = "Ascending";
  constructor(public navParams: NavParams,public utils:Utils, public viewCtrl: ViewController,
   private storage: Storage) {
      this.sortselect = this.navParams.get('VLDSRadioSelect');
      this.ascend = this.navParams.get('VLDSSortOrder');
    if(this.ascend == false) {
      this.sortMode = "Descending";
    } else {
      this.sortMode = "Ascending";
    }
  }
  clear() {
    this.sortselect = 'rotationno';
    this.ascend = false;
    }

  submit() {
    this.viewCtrl.dismiss({sortOption: this.sortselect, sortOrder: this.ascend}).catch(() => {
    });
  }
  close() {
    this.viewCtrl.dismiss({sortOption: 'rotationno', sortOrder: false});
  }
  changeorder() {
   this.ascend = !this.ascend;

   if(this.ascend == false) {
     this.sortMode = "Descending";
   } else {
     this.sortMode = "Ascending";
   }
  }

  getordericon() {
    if (this.ascend) {
      return "arrow-dropdown";
    } else {
      return "arrow-dropup";
    }
  }

}
