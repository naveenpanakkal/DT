import {Component, ViewChild} from '@angular/core';
import {AlertController, NavParams, ViewController, Navbar, Platform} from "ionic-angular";
import {ContainerDetailsModel} from "../../../shared/model/containeracceptance/containerdetails.model";
import {CaAttachModel} from "../../../shared/model/containeracceptance/caattach.model";
import {ImdgDetailsModel} from "../../../shared/model/containeracceptance/imdgdetails.model";
import {IsoCodeMasterModel} from "../../../shared/model/containeracceptance/isocode/isocodemaster.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {Keyboard} from "@ionic-native/keyboard";
import {Utils} from "../../../shared/utils";
// import {FormGroup, FormArray, FormBuilder, Validators} from "@angular/forms";

/**
 * Generated class for the CAIMGDModelComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'caimdgmodel',
  templateUrl: 'caimdgmodel.html',
  providers: [Utils]
})
export class CAIMGDModelComponent {

  inputPattern: string = "^[0-9a-zA-Z]{0,30}$";
  imdgDetailArray: ImdgDetailsModel[];
  imdgType: DefinedSetResModel[] = [];
  editMode: boolean;
  isCreator: boolean;
  containerEditMode: boolean;
  dirtyFlag: boolean;
  imdgFlag: string;
  imdgArrayFlag: boolean = false;
  packagingList: DefinedSetResModel[] = [];

  /*imdgForm: FormGroup;*/

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  @ViewChild('navbar') navBar: Navbar;

  constructor(public platform: Platform, params: NavParams, public viewCtrl: ViewController,
              public keyboard: Keyboard,
              private alertCtrl: AlertController, /*public formBuilder: FormBuilder,*/
              public utils: Utils) {
    /*this.imdgDetailArray = Object.assign([],params.get('IMDGList'));*/
    this.imdgDetailArray = JSON.parse(JSON.stringify(params.get('IMDGList')));
    this.imdgType = params.get('IMDGMasterList');
    this.editMode = params.get('mode');
    this.isCreator = params.get('creator');
    this.containerEditMode = params.get('containerEditMode');
    this.imdgFlag = params.get('imdgFlag');
    this.packagingList = params.get('packagingList');
    // this.initializeFeildValidation();

    if (!this.imdgDetailArray) {
      this.imdgDetailArray = new Array<ImdgDetailsModel>();
    }
    if (this.imdgDetailArray.length == 0) {
      this.addIMDGEntry();
    }
    if ((this.imdgDetailArray.length == 1 ) &&
      (this.imdgDetailArray[0].imdgClass == null || this.imdgDetailArray[0].imdgClass == "")) {
      this.imdgDetailArray[0].imdgClass = this.imdgType[0].definedSetValueCode;
    }
    if ((this.imdgDetailArray.length == 1 ) &&
      (this.imdgDetailArray[0].packingGroup == null || this.imdgDetailArray[0].packingGroup == "")) {
      this.imdgDetailArray[0].packingGroup = this.packagingList[0].definedSetValueCode;
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

  /*initializeFeildValidation() {

    this.imdgForm = this.formBuilder.group({
        imdgClass: [''],
        unNumber: [''],
        imdgPageNo: [''],
        flashPoint: [''],
        packingGroup: [''],
        sRLabel: ['']
      }
    );
  }*/

  close() {
    this.viewCtrl.dismiss(null);
  }

  onOKClick() {
    /*if (this.imdgForm.dirty) {
      this.dirtyFlag = true;
    }
    else {
      this.dirtyFlag = false;
    }*/
    this.viewCtrl.dismiss({
      imdgDetailArray: this.imdgDetailArray,/*
      dirtyFlag: this.dirtyFlag,*/
      imdgArrayFlag: this.imdgArrayFlag
    });
  }

  removeIMDGEntry(indeX: number) {
    this.imdgArrayFlag = true;
    if (this.imdgDetailArray.length > 1) {
      this.imdgDetailArray.splice(indeX, 1);
    }
  }

  hideRemoveOptiomforIMDG() : boolean {
    let retStatus: boolean;
    if (this.imdgDetailArray.length == 1) {
      retStatus = false;
    } else {
      retStatus = true;
    }
    return retStatus;
  }

  addIMDGEntry() {
    this.imdgArrayFlag = true;
    let imdgElement = new ImdgDetailsModel();
    imdgElement.dropDown = "false";
    imdgElement.subsidiaryRiskLabel = "";
    if (this.packagingList != null && this.packagingList[0] != null) {
      imdgElement.packingGroup = this.packagingList[0].definedSetValueCode;
    }
    if (this.imdgType != null && this.imdgType[0] != null) {
      imdgElement.imdgClass = this.imdgType[0].definedSetValueCode;
    }
    imdgElement.flashPoint = "";
    imdgElement.imdgPageNo = "";
    imdgElement.flashPoint = "";

    this.imdgDetailArray.push(imdgElement);
    this.imdgDetailArray[this.imdgDetailArray.length - 1].imdgClass = this.imdgType[0].definedSetValueCode;
  }

  enableInput(currIndex: string): boolean {
    /*return (this.editMode && (this.isCreator || (!this.isCreator && !(this.imdgFlag == "Yes")))  );*/
    return (this.editMode && (this.isCreator || (!this.isCreator && !(this.imdgFlag == "Yes"))) && this.containerEditMode );
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model, tIndex) {
    this.utils.keyUpValidate(e, format);
    if (model == 'unnumber') {
      this.imdgDetailArray[tIndex].unNumber = e.target.value;
    }
    else if (model == 'imdpageno') {
      this.imdgDetailArray[tIndex].imdgPageNo = e.target.value;
    }
    else if (model == 'imdflashpoint') {
      this.imdgDetailArray[tIndex].flashPoint = e.target.value;
    }
    else if (model == 'imdpackinggroup') {
      this.imdgDetailArray[tIndex].packingGroup = e.target.value;
    }
    else if (model == 'risklabel') {
      this.imdgDetailArray[tIndex].subsidiaryRiskLabel = e.target.value;
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

  onFocusFields(model, value, format, tIndex) {
    if (value != null && value.length > 0) {

      if (model == 'unnumber') {
        if (this.imdgDetailArray[tIndex].unNumber.length > 0 && this.imdgDetailArray[tIndex].unNumber.length < 4) {
          this.imdgDetailArray[tIndex].unNumber = null;
          this.presentAlert("Attention", "Please Enter Exact 4 characters");
          return;
        }
        if (this.validate(value, format)) {
          this.imdgDetailArray[tIndex].unNumber = null;
          this.presentAlert("Attention", "Invalid UN Number");
          return;
        }
      }
      else if (model == 'imdpageno') {
        if (this.validate(value, format)) {
          this.imdgDetailArray[tIndex].imdgPageNo = null;
          this.presentAlert("Attention", "Invalid IMDG Page No");
          return;
        }
      }
      else if (model == 'imdflashpoint') {
        if (this.imdgDetailArray[tIndex].flashPoint.length > 0 && this.imdgDetailArray[tIndex].flashPoint.length < 3) {
          this.imdgDetailArray[tIndex].flashPoint = null;
          this.presentAlert("Attention", "Please Enter Exact 3 characters");
          return;
        }

        if (this.validate(value, format)) {
          this.imdgDetailArray[tIndex].flashPoint = null;
          this.presentAlert("Attention", "Invalid Flash Point");
          return;
        }
      }
      else if (model == 'imdpackinggroup') {
        if (this.validate(value, format)) {
          this.imdgDetailArray[tIndex].packingGroup = null;
          this.presentAlert("Attention", "Invalid Packing Group");
          return;
        }
      }
      else if (model == 'risklabel') {
        if (this.validate(value, format)) {
          this.imdgDetailArray[tIndex].subsidiaryRiskLabel = null;
          this.presentAlert("Attention", "Invalid Subsidiary Risk Label");
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
