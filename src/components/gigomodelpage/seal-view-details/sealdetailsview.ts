import {Component} from '@angular/core';
import {Utils} from "../../../shared/utils";
import {NavParams, ViewController,AlertController} from "ionic-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GigoContainerDetailsSO,GigoSealDetailsSO} from "../../../shared/model/GIGO/gigodetails.model"
/**
 * Generated class for the TaAddQuantityComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'page-sealdetailsview',
  templateUrl: 'sealdetailsview.html',
  providers: [Utils]
})
export class SealDetailsViewContainerComponent {
  selectedTabsIndex = 0;
  containerElement: GigoContainerDetailsSO = new GigoContainerDetailsSO();
  constructor(params: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController,
              private alertCtrl: AlertController,public utils: Utils) {
    this.containerElement = Object.assign({}, params.get('containerElement'));
    this.selectedTabsIndex = -1;
    if (this.containerElement.gigoSealDetailsSO.length == 0)
    {
      let gigoDetails = new GigoSealDetailsSO();
      gigoDetails.sealPrefix = "";
      gigoDetails.sealStatus = "";
      gigoDetails.sealType = "";
      this.containerElement.gigoSealDetailsSO.push(gigoDetails);
    }

  }
  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }
  close() {
    this.viewCtrl.dismiss(null);
  }
  onOKClick() {
    this.viewCtrl.dismiss(null);
  }
}
