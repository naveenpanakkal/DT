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
  selector: 'damagedetails',
  templateUrl: 'damagedetails.html',
  providers: [Utils]
})
export class DamageDetailsComponent {

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
    this.gigoContainerDetails = params.get('containerDetails');
    if(!this.gigoContainerDetails) {
      this.gigoContainerDetails =  new GigoContainerDetailsSO();
    }
    this.damageCondition=this.gigoContainerDetails.damageCondition;
    this.damageItem=this.gigoContainerDetails.damageItem;
    this.damageLocation= this.gigoContainerDetails.damageLocation;
    this.damageCount =this.gigoContainerDetails.damageCount;
    this.damageWidth=this.gigoContainerDetails.damageWidth ;
    this.damageHeight=this.gigoContainerDetails.damageHeight;
    this.damageLength=this.gigoContainerDetails.damageLength;
    this.damageRemarks= this.gigoContainerDetails.remarks ;
    this.editMode = params.get('editmode');

   if(this.gigoContainerDetails.gigoAttchDmgDtlsSO && this.gigoContainerDetails.gigoAttchDmgDtlsSO.length > 0){
     this.attachments = JSON.parse(JSON.stringify(this.gigoContainerDetails.gigoAttchDmgDtlsSO));
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
    setTimeout(() => {
    if(this.attachmentsAdded()) {
    this.gigoContainerDetails.damageCondition = this.damageCondition;
    this.gigoContainerDetails.damageItem = this.damageItem;
    this.gigoContainerDetails.damageLocation = this.damageLocation;
    this.gigoContainerDetails.damageCount = this.damageCount;
    this.gigoContainerDetails.damageWidth = this.damageWidth;
    this.gigoContainerDetails.damageHeight = this.damageHeight;
    this.gigoContainerDetails.damageLength = this.damageLength;
    this.gigoContainerDetails.remarks = this.damageRemarks;

    if (this.damageForm.dirty) {
      this.dirtyFlag = true;
    }
    else {
      this.dirtyFlag = false;
    }
    this.gigoContainerDetails.gigoAttchDmgDtlsSO = this.attachments;
    this.viewCtrl.dismiss({
      gigoContainerDetails: this.gigoContainerDetails,
      dirtyFlag: this.dirtyFlag
    });
}
    else {
      this.presentAlert("ALERT","Please attach files.");
    }
  }, 500);
  }

  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model) {
    this.utils.keyUpValidate(e, format);
    if (model == 'condition') {
      this.damageCondition = e.target.value;
    }
    else if (model == 'location') {
      this.damageLocation = e.target.value;
    }
    else if (model == 'item') {
      this.damageItem= e.target.value;
    }
    else if (model == 'width') {
      this.damageWidth = e.target.value;
    }
    else if (model == 'count') {
      this.damageCount = e.target.value;
    }
    else if (model == 'height') {
      this.damageHeight = e.target.value;
    }
    else if (model == 'length') {
      this.damageLength = e.target.value;
    }
    else if (model == 'remarks') {
      this.damageRemarks = e.target.value;
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
  onBlurValidation(ev,pattern,modelVariable) {
    if (this.validate(modelVariable, pattern)) {
      ev.value = "";
      let messageText = 'Invalid Input';
      if (ev.placeholder) {
        messageText = 'Invalid ' + ev.placeholder;
      }
      this.presentAlert("Attention", messageText);
      return;

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
  uploadAttachment(): boolean {
    if (this.attachments != null && this.attachments.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  initializeAttachment() {
    this.attachments.push(new GigoAttchDmgDtlsSO());
  }

  addAttachment() {
    if (this.attachments.length < 3) {
      this.attachments.push(new GigoAttchDmgDtlsSO());
    } else {
      this.presentAlert('ALERT', 'You are not allowed to Upload more than 3 Attachments');
    }
  }

  closeAttachment(attachment: GigoAttchDmgDtlsSO) {
    for (let i = 0; i < this.attachments.length; i++) {
      if (this.attachments[i] == attachment) {
        this.attachments.splice(i, 1);
        return;
      }
    }
  }
  uploadDocs(attachment: GigoAttchDmgDtlsSO) {
    this.gigoServiceProvider.uploadDocuments()
      .then(data => {
        attachment.fileName = data.fileName;
        attachment.fileUploadId = data.fileUploadId;
        attachment.hideUploadButton = false;
      }, error => {
        if(error.body.match("Found restricted content in file"))
        {
          this.presentAlert('ALERT', "Found restricted content in file");
        }
      });
  }

  displayAttachment(attachment: GigoAttchDmgDtlsSO) {
    this.gigoServiceProvider.openAttachment(attachment);
  }

  attachmentsAdded() : boolean {
    if(this.attachments && this.attachments.length >0) {
      for (let i = 0; i < this.attachments.length; i++) {
        if(this.attachments[i].fileName == null  || this.attachments[i].fileName === 'undefined') {
          return false;
        }
      }
    }
    return true;
  }


}


