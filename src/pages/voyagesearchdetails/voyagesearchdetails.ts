import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import {VoyagedetailsPage} from "../voyagedetails/voyagedetails";
import {Utils} from "../../shared/utils";
/**
 * Generated class for the VoyagesearchdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-voyagesearchdetails',
  templateUrl: 'voyagesearchdetails.html',
  providers: [ Utils]
})
export class VoyagesearchdetailsPage {
  rotationNo:string;
  vesselName:string;
  terminals:string;
  operationStatus:string;
  clientCode:string;
  userClientCode:string;
  eta:string;
  sameUser : boolean = false;
  isOpenService: boolean = false;
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public utils: Utils) {
    this.rotationNo = navParams.get('sel_rotationNo');
    this.vesselName = navParams.get('sel_vesselName');
    this.terminals = navParams.get('sel_terminals');
    this.operationStatus = navParams.get('sel_operationStatus');
    this.clientCode = navParams.get('sel_clientCode');
    this.eta = navParams.get('sel_eta');
    this.isOpenService = navParams.get('isOpenService');
    this.userClientCode = localStorage.getItem('CLIENT_CODE');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VoyagesearchdetailsPage');
  }
  viewVoyage()
  {
    if(this.clientCode == this.userClientCode) {
      this.sameUser = true;
    } else {
      this.sameUser = false;
    }
    this.navCtrl.push(VoyagedetailsPage, {
      sel_rotationNo: this.rotationNo,
      sel_sameUser: this.sameUser,
      isOpenService: this.isOpenService
    });
  }
}
