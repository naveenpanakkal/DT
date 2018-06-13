import {Component,ViewChild} from '@angular/core';
import {AlertController, NavParams, ViewController,Navbar,Platform} from "ionic-angular";
import {ContainerDetailsModel} from "../../../shared/model/containeracceptance/containerdetails.model";
import {Keyboard} from "@ionic-native/keyboard";
import {Utils} from "../../../shared/utils";
import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the CADamageModelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'cadamagemodel',
  templateUrl: 'cadamagemodel.html',
  providers: [Utils]

})
export class CADamageModelComponent {

  // containerElement: ContainerDetailsModel;
  editMode: boolean;
  inputPattern: string = "^(?!(\\.))[0-9.]{0,5}$";
  decimalPattern: string = "^[+]?([0-9]+(?:[\\.][0-9]*)?|\\.[0-9]+)$";
  damageCondition: string;
  damageLocation: string;
  damageItem: string;
  damageCount: string;
  damageWidth: string;
  damageHeight: string;
  damageLength: string;
  damageRemarks: string;
  dirtyFlag: boolean;
  containerEditMode: boolean;

  damageForm: FormGroup;
// Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  @ViewChild('navbar') navBar: Navbar;

  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              private alertCtrl: AlertController, public formBuilder: FormBuilder,
              public utils: Utils) {
    // this.containerElement = params.get('containerElement');
    this.damageCondition = params.get('damageCondition');
    this.damageLocation = params.get('damageLocation');
    this.damageItem = params.get('damageItem');
    this.damageCount = params.get('damageCount');
    this.damageWidth = params.get('damageWidth');
    this.damageHeight = params.get('damageHeight');
    this.damageLength = params.get('damageLength');
    this.damageRemarks = params.get('damageRemarks');
    this.containerEditMode = params.get('containerEditMode');
    this.editMode = params.get('mode');
    if (this.damageWidth != null && this.damageWidth.endsWith(".")) {
      this.damageWidth = this.damageWidth.substring(0, this.damageWidth.length - 1);
    }
    if (this.damageHeight != null && this.damageHeight.endsWith(".")) {
      this.damageHeight = this.damageHeight.substring(0, this.damageHeight.length - 1);
    }
    if (this.damageLength != null && this.damageLength.endsWith(".")) {
      this.damageLength = this.damageLength.substring(0, this.damageLength.length - 1);
    }
    this.initializeFeildValidation();
  }

  initializeFeildValidation() {
    this.damageForm = this.formBuilder.group({
        damageCondition: [''],
        damageLocation: [''],
        damageItem: [''],
        damageCount: [''],
        damageWidth: [''],
        damageHeight: [''],
        damageLength: [''],
        damageRemarks: ['']
      }
    );
  }

  close() {
    this.viewCtrl.dismiss(null);
  }

  ionViewDidLoad() {
    if (this.editMode == true) {
      this.initializeBackButtonCustomHandler();
      this.navBar.backButtonClick = () => {
        this.viewCtrl.dismiss(null);
      }
    }
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Overwrite Back Button Page Change');
      _this.onBackAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }


  onBackAlert() {
    this.viewCtrl.dismiss(null);
  }

  onOKClick() {
    if (this.damageForm.dirty) {
      this.dirtyFlag = true;
    }
    else {
      this.dirtyFlag = false;
    }
    this.viewCtrl.dismiss({
      damageCondition: this.damageCondition,
      damageLocation: this.damageLocation,
      damageItem: this.damageItem,
      damageCount: this.damageCount,
      damageWidth: this.damageWidth,
      damageHeight: this.damageHeight,
      damageLength: this.damageLength,
      damageRemarks: this.damageRemarks,
      dirtyFlag: this.dirtyFlag
    });
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'damagecount') {
      this.damageCount = e.target.value;
    }
    else if (model == 'damagewidth') {
      this.damageWidth = e.target.value;
      this.damageWidth = this.utils.keyUpDecimalValidate(this.damageWidth);
    }
    else if (model == 'damageheight') {
      this.damageHeight = e.target.value;
      this.damageHeight = this.utils.keyUpDecimalValidate(this.damageHeight);
    }
    else if (model == 'damagelength') {
      this.damageLength = e.target.value;
      this.damageLength = this.utils.keyUpDecimalValidate(this.damageLength);
    }
  }

  validate(model, format) {
    if (model != null && model.length > 0) {
      let pattern = new RegExp(format);
      try {
        if (pattern.test(model)) {
          return false;
        } else {
          return true;
        }
      } catch (ex) {
        console.log(ex);
      }
    }
    else {
      return false;
    }

  }

  onFocusFields(model, value, format) {
    if (value != null && value.length > 0) {

      if (model == 'damagecount') {
        if (this.validate(value, format)) {
          this.damageCount = null;
          this.presentAlert("Attention", "Invalid Damage count");
          return;
        }
      }
      else if (model == 'damagewidth') {
        if (this.validate(value, format)) {
          this.damageWidth = null;
          this.presentAlert("Attention", "Invalid Damage width");
          return;
        }
      }
      else if (model == 'damageheight') {
        if (this.validate(value, format)) {
          this.damageHeight = null;
          this.presentAlert("Attention", "Invalid Damage height");
          return;
        }
      }
      else if (model == 'damagelength') {
        if (this.validate(value, format)) {
          this.damageLength = null;
          this.presentAlert("Attention", "Invalid Damage Length");
          return;
        }
      }

    }
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Dismiss',
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    alert.present();
  }

}
