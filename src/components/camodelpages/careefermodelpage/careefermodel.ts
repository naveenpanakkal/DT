import {Component, ViewChild} from '@angular/core';
import {AlertController, NavParams, Platform, ViewController, Navbar} from "ionic-angular";
import {ContainerDetailsModel} from "../../../shared/model/containeracceptance/containerdetails.model";
import {Utils} from "../../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the InformationmodalComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'careefermodel',
  templateUrl: 'careefermodel.html',
  providers: [Utils]
})
export class CAReeferModelComponent {

  @ViewChild('navbar') navBar: Navbar;

  decimalPattern: string = "^[+]?([0-9]+(?:[\\.][0-9]*)?|\\.[0-9]+)$";
  decimalWithNegativePattern: string = "^[-]?([0-9]+(?:[\\.][0-9]*)?|\\.[0-9]+)$";
  inputPattern: string = "^(?!(\\.))[0-9.]{0,5}$";
  negativeInputPattern: string = "^(?!(\\.))[0-9.-]{0,5}$";

  containerElement: ContainerDetailsModel;
  editMode: boolean;
  isCreator: boolean;
  reeferFlag: string;
  containerEditMode: boolean;
  minimumTemp: string;
  maximumTemp: string;
  ventOpen: string;
  humidity: string;
  dirtyFlag: boolean;

  reeferForm: FormGroup;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              public formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              public utils: Utils) {
    this.containerElement = Object.assign({}, params.get('containerElement'));
    this.editMode = params.get('mode');
    this.isCreator = params.get('creator');
    this.reeferFlag = params.get('reeferFlag');

    this.containerEditMode = params.get('containerEditMode');
    this.initializeFeildValidation();
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
    this.reeferForm = this.formBuilder.group({
        refTemp: [''],
        refMinTemp: [''],
        refMaxTemp: [''],
        refVentOpen: [''],
        refHumid: [''],
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

  onOKClick() {
    if (this.reeferForm.dirty) {
      this.dirtyFlag = true;
    }
    else {
      this.dirtyFlag = false;
    }
    this.viewCtrl.dismiss({containerEle: this.containerElement, dirtyFlag: this.dirtyFlag});
  }

  enableInput(): boolean {
    let valueSet: boolean;
    if (this.containerElement.minTemp || this.containerElement.maxTemp ||
      this.containerElement.ventOpen || this.containerElement.humidity) {
      valueSet = true;
    } else {
      valueSet = false;
    }
    return (this.editMode && (this.isCreator || (!this.isCreator && !(this.reeferFlag == "Yes"))) && this.containerEditMode);
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'mintemp') {
      this.minimumTemp = e.target.value;
      this.containerElement.minTemp = this.utils.keyUpDecimalValidate(this.minimumTemp);
    }
    else if (model == 'maxtemp') {
      this.maximumTemp = e.target.value;
      this.containerElement.maxTemp = this.utils.keyUpDecimalValidate(this.maximumTemp);
    }
    else if (model == 'ventopen') {
      this.ventOpen = e.target.value;
      this.containerElement.ventOpen = this.utils.keyUpPositiveDecimalValidate(this.ventOpen);
    }
    else if (model == 'humidity') {
      this.humidity = e.target.value;
      this.containerElement.humidity = this.utils.keyUpPositiveDecimalValidate(this.humidity);
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

      if (model == 'mintemp') {
        if ((value != null && (value.startsWith("."))) || (this.validate(value, format))) {
          this.containerElement.minTemp = null;
          this.presentAlert("Attention", "Invalid Minimum Temperature");
          return;
        }
        if ((value != null && (value.startsWith("-."))) || (this.validate(value, format))) {
          this.containerElement.minTemp = null;
          this.presentAlert("Attention", "Invalid Minimum Temperature");
          return;
        }
        if(this.containerElement.minTemp && this.containerElement.maxTemp) {
          if(Number(this.containerElement.minTemp) > Number(this.containerElement.maxTemp)) {
            this.containerElement.minTemp = null;
            this.presentAlert("Attention", "Minimum Temperature cannot be greater than Maximum Temperature");
            return;
          }
        }
      }
      else if (model == 'maxtemp') {
        if ((value != null && value.startsWith(".")) || (this.validate(value, format))) {
          this.containerElement.maxTemp = null;
          this.presentAlert("Attention", "Invalid Maximum Temperature");
          return;
        }
        if ((value != null && (value.startsWith("-."))) || (this.validate(value, format))) {
          this.containerElement.maxTemp = null;
          this.presentAlert("Attention", "Invalid Maximum Temperature");
          return;
        }
        if(this.containerElement.minTemp && this.containerElement.maxTemp) {
          if(Number(this.containerElement.maxTemp) < Number(this.containerElement.minTemp)) {
            this.containerElement.maxTemp = null;
            this.presentAlert("Attention", "Maximum Temperature cannot be lesser than Minimum Temperature");
            return;
          }
        }
      }
      else if (model == 'ventopen') {
        if (this.validate(value, format) || (value != null && value.startsWith("."))) {
          this.containerElement.ventOpen = null;
          this.presentAlert("Attention", "Invalid Vent open");
          return;
        }
      }
      else if (model == 'humidity') {
        if (this.validate(value, format) || (value != null && value.startsWith("."))) {
          this.containerElement.humidity = null;
          this.presentAlert("Attention", "Invalid Humidity");
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
