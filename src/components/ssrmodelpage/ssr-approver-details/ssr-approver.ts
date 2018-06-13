import {Component, ViewChild} from '@angular/core';
import {AlertController, NavParams,NavController, ViewController, Navbar, Platform} from "ionic-angular";
import {ImdgDetailsModel} from "../../../shared/model/containeracceptance/imdgdetails.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {Keyboard} from "@ionic-native/keyboard";
import {Utils} from "../../../shared/utils";

/**
 * Generated class for the SSRApproverModel component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ssr-approver',
  templateUrl: 'ssr-approver.html',
  providers: [Utils]
})
export class SsrApproverComponent {
  approvers:any[] = [];
  @ViewChild('navbar') navBar: Navbar;

  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              private alertCtrl: AlertController,
              public utils: Utils,public navCtrl: NavController,public navParams: NavParams) {
          this.approvers = this.navParams.get('approvers');
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


