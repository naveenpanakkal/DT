import {Component, ViewChild} from '@angular/core';
import {AlertController, NavParams, ViewController, Navbar, Platform} from "ionic-angular";
import {ContainerDetailsModel} from "../../../shared/model/containeracceptance/containerdetails.model";
import {Keyboard} from "@ionic-native/keyboard";
import {Utils} from "../../../shared/utils";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the InformationmodalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'caoogmodel',
  templateUrl: 'caoogmodel.html',
  providers: [Utils]

})
export class CAOOGModelComponent {

  inputPattern: string = "^(?!(\\.))[0-9.]{0,5}$";
  decimalPattern: string = "^[+]?([0-9]+(?:[\\.][0-9]*)?|\\.[0-9]+)$";
  containerElement: ContainerDetailsModel;
  editMode: boolean;
  isCreator: boolean;
  containerEditMode: boolean;
  oogFlag: string;
  oogRight: string;
  oogHght: string;
  oogFront: string;
  oogBack: string;
  oogLeft: string;
  dirtyFlag: boolean;

  oogForm: FormGroup;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  @ViewChild('navbar') navBar: Navbar;

  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              public formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              public utils: Utils) {
    this.containerElement = Object.assign({}, params.get('containerElement'));
    this.editMode = params.get('mode');
    this.isCreator = params.get('creator');
    this.oogFlag = params.get('oogFlag');
    this.containerEditMode = params.get('containerEditMode');
    this.initializeFeildValidation();
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

  initializeFeildValidation() {
    this.oogForm = this.formBuilder.group({
        oogHeight: [''],
        oogFront: [''],
        oogBack: [''],
        oogLeft: [''],
        oogRight: ['']
      }
    );
  }

  close() {
    this.viewCtrl.dismiss(null);
  }

  onOKClick() {
    if (this.oogForm.dirty) {
      this.dirtyFlag = true;
    }
    else {
      this.dirtyFlag = false;
    }
    this.viewCtrl.dismiss({containerElement: this.containerElement, dirtyFlag: this.dirtyFlag});
  }

  enableInput(): boolean {
    return (this.editMode && (this.isCreator || (!this.isCreator && !(this.oogFlag == "Yes"))) && this.containerEditMode);
  }

  keyboardClose() {
    this.keyboard.close();
  }


  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'height') {
      this.oogHght = e.target.value;
      this.containerElement.oogHeight = this.utils.keyUpDecimalValidate(this.oogHght);
    }
    else if (model == 'front') {
      this.oogFront = e.target.value;
      this.containerElement.oogFront = this.utils.keyUpDecimalValidate(this.oogFront);
    }
    else if (model == 'back') {
      this.oogBack = e.target.value;
      this.containerElement.oogBack = this.utils.keyUpDecimalValidate(this.oogBack);
    }
    else if (model == 'left') {
      this.oogLeft = e.target.value;
      this.containerElement.oogLeft = this.utils.keyUpDecimalValidate(this.oogLeft);
    }
    else if (model == 'right') {
      this.oogRight = e.target.value;
      this.containerElement.oogRight = this.utils.keyUpDecimalValidate(this.oogRight);
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

      if (model == 'height') {
        if (this.validate(value, format)) {
          this.containerElement.oogHeight = null;
          this.presentAlert("Attention", "Invalid Height");
          return;
        }
      }
      else if (model == 'front') {
        if (this.validate(value, format)) {
          this.containerElement.oogFront = null;
          this.presentAlert("Attention", "Invalid Front");
          return;
        }
      }
      else if (model == 'back') {
        if (this.validate(value, format)) {
          this.containerElement.oogBack = null;
          this.presentAlert("Attention", "Invalid back");
          return;
        }
      }
      else if (model == 'left') {
        if (this.validate(value, format)) {
          this.containerElement.oogLeft = null;
          this.presentAlert("Attention", "Invalid Left");
          return;
        }
      }
      else if (model == 'right') {
        if (this.validate(value, format)) {
          this.containerElement.oogRight = null;
          this.presentAlert("Attention", "Invalid Right");
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
