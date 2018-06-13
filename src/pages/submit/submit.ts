import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Tab } from 'ionic-angular';
import {Utils} from "../../shared/utils";

/**
 * Generated class for the SubmitPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-submit',
  templateUrl: 'submit.html',
  providers: [Utils],
})
export class SubmitPage {

vimo : any;
vregowner : any;
vhicn : any;
vname : any;
vmmsi : any;

index: any;

 tabBarElement: any;
 @ViewChild('navbar') navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils:Utils,) {

    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.index = ((<Tab>this.navCtrl).index);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitPage');
     this.vregowner = this.navParams.get('vesselregownerdetail');
    this.vhicn = this.navParams.get('vesselhicn');
    this.vimo = this.navParams.get('vesselimo');
    this.vname = this.navParams.get('vesselname');
    this.vmmsi = this.navParams.get('vesselmmsi');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'flex';
  }

  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.parent.select(this.index);
  }

  }
}
