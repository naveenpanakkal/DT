import {Component, ViewChild} from '@angular/core';
import {AlertController, NavParams, ViewController, Navbar, Platform} from "ionic-angular";
import {ImdgDetailsModel} from "../../../shared/model/containeracceptance/imdgdetails.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {Keyboard} from "@ionic-native/keyboard";
import {Utils} from "../../../shared/utils";
import {GigoAttchDmgDtlsSO, GigoContainerDetailsSO} from "../../../shared/model/GIGO/gigodetails.model";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {FormGroup, FormBuilder} from "@angular/forms";

/**
 * Generated class for the CAIMGDModelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ysrccv',
  templateUrl: 'ysr-ccv.html',
  providers: [Utils]
})
export class YsrCcvComponent {

  editMode: boolean;
  isCreator: boolean;
  containerEditMode: boolean;
  dirtyFlag: boolean;
  imdgArrayFlag: boolean = false;
  packagingList: DefinedSetResModel[] = [];
  gigoContainerDetails:GigoContainerDetailsSO;
  attachments: GigoAttchDmgDtlsSO[] = [];
  damageForm: FormGroup;
  damageCondition: string;
  damageLocation: string;
  damageItem: string;
  damageCount: string;
  damageWidth: string;
  damageHeight: string;
  damageLength: string;
  damageRemarks:string;
  damageConditions: string;
  damageLocations: string;
  damageItems: string;
  damageCounts: string;
  damageWidths: string;
  damageHeights: string;
  damageLengths: string;
  damageRemark:string;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  @ViewChild('navbar') navBar: Navbar;

  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              public gigoServiceProvider: GiGoServiceProvider,
              private alertCtrl: AlertController, public formBuilder: FormBuilder,
              public utils: Utils) {

   }
  close() {
    this.viewCtrl.dismiss(null);
  }

}


