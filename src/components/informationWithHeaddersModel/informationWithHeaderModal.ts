import { Component } from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";

/**
 * Generated class for the InformationmodalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'informationWithHeaderModal',
  templateUrl: 'informationWithHeaderModal.html'
})
export class InformationWithHeaderModalComponent {

  modalData: any[];

  constructor(params: NavParams, public viewCtrl: ViewController) {

    this.modalData = params.get('modalData');

    console.log(JSON.stringify(this.modalData));
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
