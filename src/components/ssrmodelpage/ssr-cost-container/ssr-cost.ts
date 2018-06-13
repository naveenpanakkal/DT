import {Component, ViewChild} from '@angular/core';
import {AlertController, NavParams, ViewController, Navbar, Platform} from "ionic-angular";
import {ImdgDetailsModel} from "../../../shared/model/containeracceptance/imdgdetails.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {Keyboard} from "@ionic-native/keyboard";
import {Utils} from "../../../shared/utils";
import {GigoContainerDetailsSO, GigoSealDetailsSO} from "../../../shared/model/GIGO/gigodetails.model";
// import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the CAIMGDModelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'ssrcost',
  templateUrl: 'ssr-cost.html',
  providers: [Utils]
})
export class SsrCostComponent {

  inputPattern: string = "^[0-9a-zA-Z]{0,30}$";
  editMode: boolean;
  isCreator: boolean;
  containerEditMode: boolean;
  dirtyFlag: boolean;
  imdgArrayFlag: boolean = false;
  packagingList: DefinedSetResModel[] = [];
  dropDown:string = 'false';
  gigoSealDetails:GigoSealDetailsSO[];
  tempgigoSealDetails:GigoSealDetailsSO[];
  sealIssuerList : DefinedSetResModel[] = [];
  sealStatusList : DefinedSetResModel[] = [];
  sealTypeList : DefinedSetResModel[] = [];
  sealIssuer: string;
  sealStatus: string;
  sealType: string;
  selectedTabsIndex = 0;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  @ViewChild('navbar') navBar: Navbar;

  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              private alertCtrl: AlertController,
              public utils: Utils) {

  }
  close() {
    this.viewCtrl.dismiss(null);
  }


}


