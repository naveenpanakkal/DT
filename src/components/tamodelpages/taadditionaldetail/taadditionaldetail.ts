import {Component, ViewChild} from '@angular/core';
import { NavParams, Platform, ViewController, Navbar} from "ionic-angular";
import {AdditionalDetailsSO} from "../../../shared/model/ta/truckappointmentdetailso.model";

/**
 * Generated class for the TaadditionaldetailComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'taadditionaldetail',
  templateUrl: 'taadditionaldetail.html'
})
export class TaadditionaldetailComponent {

  @ViewChild('navbar') navBar: Navbar;
  additionalDetailModel: AdditionalDetailsSO;
  public unregisterBackButtonAction: any;
  isMoveTypeIn:boolean;
  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController) {
    this.additionalDetailModel = params.get('additionalModel');
    this.isMoveTypeIn = params.get('isMoveTypeIn');//[edit,new,view]
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      _this.onBack();
    }, 101);
  }

  onBack() {
    this.viewCtrl.dismiss(null);
  }

}
