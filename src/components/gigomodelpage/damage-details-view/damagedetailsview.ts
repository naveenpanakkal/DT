import {Component} from '@angular/core';
import {Utils} from "../../../shared/utils";
import {NavParams, ViewController,AlertController} from "ionic-angular";
import {FormBuilder} from "@angular/forms";
import {GigoContainerDetailsSO} from "../../../shared/model/GIGO/gigodetails.model"
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {GigoAttchDmgDtlsSO} from "../../../shared/model/GIGO/gigodetails.model";
/**
 * Generated class for the  component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'page-damagedetailsview',
  templateUrl: 'damagedetailsview.html',
  providers: [Utils,GigoContainerDetailsSO,GiGoServiceProvider,GigoAttchDmgDtlsSO]
})
export class DamageDetailsViewContainerComponent {

  containerElement: GigoContainerDetailsSO = new GigoContainerDetailsSO();
  constructor(params: NavParams, public formBuilder: FormBuilder, public viewCtrl: ViewController,
              private alertCtrl: AlertController,
              public gigoServiceProvider: GiGoServiceProvider,public utils: Utils) {
    this.containerElement = Object.assign({}, params.get('containerElement'));

  }

  close() {
    this.viewCtrl.dismiss(null);
  }
  onOKClick() {
    this.viewCtrl.dismiss(null);
  }
  displayattach(attachment: GigoAttchDmgDtlsSO) {
    this.gigoServiceProvider.openAttachment(attachment);
  }
}
