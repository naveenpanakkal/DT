import {Component} from '@angular/core';
import {Utils} from "../../../shared/utils";
import {NavParams, NavController,ViewController,AlertController} from "ionic-angular";
import {RsbResources} from "../../../shared/model/rb/rbSaveUpdateReq.modal";
/**
 * Generated class for the RBCancel component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'rb-charges-container',
  templateUrl: 'rb-charges.html',
  providers: [Utils]
})
export class RBChargesComponent {
  resourceMap :RsbResources;
  error: boolean = false;
  baseCharge: string;
  additionalCharge: string;
  otherCharge: string;
  baseChargeAmount: string;
  additionalChargeAmount: string;
  otherChargeAmount: string;
  constructor(public navCtrl: NavController,public navParams: NavParams,
              public viewCtrl: ViewController,
              private alertCtrl: AlertController,public utils: Utils) {
    this.resourceMap = this.navParams.get('resourceMap');
    this.baseCharge = this.navParams.get('baseCharge').toFixed(3);
    this.additionalCharge = this.navParams.get('additionalCharge').toFixed(3);
    this.otherCharge =this.navParams.get('otherCharge').toFixed(3);
    this.baseChargeAmount = (Number(this.baseCharge)* Number(this.resourceMap.quantity)* Number(this.resourceMap.duration)).toFixed(3);
    this.additionalChargeAmount = (Number(this.additionalCharge) * Number(this.resourceMap.quantity)* Number(this.resourceMap.duration)).toFixed(3);
    this.otherChargeAmount = (Number(this.otherCharge) * Number(this.resourceMap.quantity) * Number(this.resourceMap.duration)).toFixed(3);
  }

  navigateBack() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  }
  close() {
    this.viewCtrl.dismiss(null);
  }
  submit() {
    this.viewCtrl.dismiss(null);
  }
}
