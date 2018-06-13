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
  selector: 'sealdetails',
  templateUrl: 'seal-details.html',
  providers: [Utils]
})
export class SealDetailsComponent {

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

    this.gigoSealDetails = params.get('sealDetails');
    this.sealIssuerList = params.get('sealIssuerList');
    this.sealStatusList = params.get('sealStatusList');
    this.sealTypeList = params.get('sealTypeList');
    this.editMode = params.get('editmode');
    this.selectedTabsIndex = -1;

    if(!this.gigoSealDetails) {
      this.gigoSealDetails= [];
      let gigoDetails = new GigoSealDetailsSO();
      gigoDetails.sealPrefix = "";
      gigoDetails.sealStatus = "";
      gigoDetails.sealType = "";
      this.gigoSealDetails.push(gigoDetails);
    }
    else if (this.gigoSealDetails.length == 0)
    {
      let gigoDetails = new GigoSealDetailsSO();
      gigoDetails.sealPrefix = "";
      gigoDetails.sealStatus = "";
      gigoDetails.sealType = "";
      this.gigoSealDetails.push(gigoDetails);
    }
    this.tempgigoSealDetails = JSON.parse(JSON.stringify(this.gigoSealDetails));
    for (let i = 0; i < this.tempgigoSealDetails.length; i++) {
      if (this.tempgigoSealDetails[i].sealType === 'undefined') {
        this.tempgigoSealDetails[i].sealType == "";
      }
      else if (this.tempgigoSealDetails[i].sealPrefix === 'undefined') {
        this.tempgigoSealDetails[i].sealPrefix == "";
      }
      else if (this.tempgigoSealDetails[i].sealStatus === 'undefined') {
        this.tempgigoSealDetails[i].sealStatus == "";
      }
    }
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

  close() {
    this.viewCtrl.dismiss(null);
  }

  onOKClick() {

    this.viewCtrl.dismiss({
      sealDetails: this.tempgigoSealDetails
    });
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model, tIndex) {
    this.utils.keyUpValidate(e, format);
    if (model == 'sl_number') {
      this.tempgigoSealDetails[tIndex].sealNumber = e.target.value;
    }
  }
  onBlurValidation(tIndex) {
    if (this.validate('^[0-9a-zA-Z]{0,18}$',this.tempgigoSealDetails[tIndex].sealNumber)) {
      this.tempgigoSealDetails[tIndex].sealNumber = "";
      let messageText='Invalid ' + 'Number';



      // this.presentAlert("Attention", "Invalid Data");
      this.presentAlert("Attention",messageText);

      return;

    }
  }

  validate(format,model) {
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

  // validate(model, format) {
  //   if (model != null && model.length > 0) {
  //     let pattern = new RegExp(format);
  //     try {
  //       if (pattern.test(model)) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     } catch (ex) {
  //       console.log(ex);
  //     }
  //   }
  //   else {
  //     return false;
  //   }
  //
  // }

  showDeleteIcon(){
    if(this.tempgigoSealDetails && this.tempgigoSealDetails.length>1) {
      return true;
    }
    else {
      return false;
    }
  }

  addContainer() {
    if (this.tempgigoSealDetails.length < 5) {
      let gigoDetails = new GigoSealDetailsSO();
      gigoDetails.sealPrefix = "";
      gigoDetails.sealStatus = "";
      gigoDetails.sealType = "";
      this.tempgigoSealDetails.push(gigoDetails);
    } else {
      this.presentAlert('ALERT', 'Maximum 5 rows are allowed.');
    }
  }

  closeContainer(container: GigoSealDetailsSO) {
    for (let i = 0; i < this.tempgigoSealDetails.length; i++) {
      if (this.tempgigoSealDetails[i] == container) {
        this.tempgigoSealDetails.splice(i, 1);
        return;
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
  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

}


