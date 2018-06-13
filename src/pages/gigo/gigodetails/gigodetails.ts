import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  Content,
  IonicPage,
  ModalController,
  Navbar,
  NavController,
  NavParams,
  Platform,
  ViewController
} from 'ionic-angular';
import {Utils} from "../../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {GigoDetailsSO} from "../../../shared/model/GIGO/gigodetails.model";
import {DamageDetailsViewContainerComponent} from "../../../components/gigomodelpage/damage-details-view/damagedetailsview";
import {DatePipe} from "@angular/common";
import {GigoAttachmentSO} from "../../../shared/model/GIGO/gigodetails.model";
import {GiGoCreatePage} from "../gigocreate/gigocreate";
import {SealDetailsViewContainerComponent} from "../../../components/gigomodelpage/seal-view-details/sealdetailsview";
import {GigoSearchByIdRequestModel} from "../../../shared/model/GIGO/gigosearchrequest.model";
import {GigoCreateSummary} from "../gigocreatesummary/gigocreatesummary"
import {SealDetailsComponent} from "../../../components/gigomodelpage/seal-details/seal-details";
import {DamageDetailsComponent} from "../../../components/gigomodelpage/damage-details/damagedetails";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";

@IonicPage()
@Component({
  selector: 'page-gigodetails',
  templateUrl: 'gigodetails.html',
  providers: [Utils,GigoDetailsSO,GiGoServiceProvider,GigoAttachmentSO,GigoSearchByIdRequestModel]
})

export class GiGoDetailsPage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  public showRightSlideNav: boolean;
  public dropDown: any;
  currentSearchID:GigoSearchByIdRequestModel = new GigoSearchByIdRequestModel();
  public gigoSearchResult:GigoDetailsSO = new GigoDetailsSO();
  public unregisterBackButtonAction: any;
  fromCreate: boolean = false;
  fromEdit:boolean=false;
  editfromHistory:boolean=false;
  fromHistory: boolean = false;
  selectedTabsIndex = 0;
  editHiddenStatus:boolean = false;
  cancelHiddenStatus:boolean = false;
  activeMode: string;
  editMode: boolean;
  public definedSetListModel: DefinedsetresListModel[];
  public sealIssuerList : DefinedSetResModel[] = [];
  public sealStatusList : DefinedSetResModel[] = [];
  public sealTypeList : DefinedSetResModel[] = [];
  dateTimeFormat: string = 'DD/MM/YYYY HH:mm GST';
  validityDate: any;
  disableSubmit: boolean = false;
  attachdirtyFlag: boolean = false;
  damageDirtyFlag: boolean = false;
  groupOne: FormGroup;
  groupTwo: FormGroup;
  trucknoPattern: string = "^([0-9a-zA-Z]{1,18})$";
  driverPattern: string = "^([0-9a-zA-Z ]{1,255})$";
  dateStatus:boolean = false;
  error: boolean = false;
  fromSummary: boolean = true;
  public gigoRequesttypeList : DefinedSetResModel[] = [];
  public requesttypeList : DefinedSetResModel[] = [];
  maxvalue: any;
  gigoTabheader: string;
  location:string;
  spname:string;
  attachmentDirtyFlag: boolean = false;
  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController,public datepipe: DatePipe,
              public gigoServiceProvider: GiGoServiceProvider,
              private commonServices: CommonservicesProvider,
              public utils: Utils, public formBuilder: FormBuilder,
              public keyboard: Keyboard, private viewCtrl: ViewController) {

    this.getDefinedSet();
    if(this.navParams.get('parentPage') && this.navParams.get('parentPage')=='fromHistory'){
       this.currentSearchID.gigoReqNo =this.navParams.get('gigoReqNo');
      this.location = this.navParams.get('location');
      this.spname = this.navParams.get('spname');
    }else {
      this.currentSearchID.gigoNo = this.navParams.get('gigoNo');
    }

    this.activeMode = this.navParams.get("mode");
    this.fromSummary = this.navParams.get("fromSummary");
    if (this.activeMode == 'view') {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
    this.selectedTabsIndex = -1;
    this.groupOne = formBuilder.group({
      truckNumber: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(18),
        Validators.pattern(this.trucknoPattern),Validators.required])],
      driverName: ['', Validators.compose([Validators.minLength(1),Validators.maxLength(255),
        Validators.pattern(this.driverPattern)])],
    });
    this.groupTwo = formBuilder.group({
      selectDays: ['', Validators.compose([Validators.required])],
    });
  }

  ionViewDidLoad() {
    if(this.editMode) {
      this.initializeBackButtonCustomHandler();
      this.navBar.backButtonClick = () => {
        this.onBackAlert();
      }
    }
    //For fetching current values
    this.sendSearchByIdRequest();
  }

  ionViewWillEnter() {
    /*this.sendSearchByIdRequest();*/
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = [ 'SEAL_ISSUER' , 'SEAL_STATUS' ,'SEAL_TYPE', 'GIGO_REQUEST_TYPE'];
    definedSetReqModel.lang = 'en';
    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {


            if (this.definedSetListModel[i].definedSetName == 'SEAL_ISSUER') {
              this.sealIssuerList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'SEAL_STATUS') {
              this.sealStatusList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'SEAL_TYPE') {
              this.sealTypeList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'GIGO_REQUEST_TYPE') {
              this.gigoRequesttypeList = this.definedSetListModel[i].definedSetValues;
            }
          }
          this.requesttypeList = JSON.parse(JSON.stringify(this.gigoRequesttypeList));
          if(this.requesttypeList && this.requesttypeList.length>0) {
            this.requesttypeList.splice(1, this.requesttypeList.length-1);
          }
        },
        error => {
          //Show error message
        });
  }


  getRequesttype()
  {
    if(this.gigoSearchResult.gigoContainerDetailsSO && this.gigoSearchResult.gigoContainerDetailsSO.length >0) {
      for (let j = 0; j < this.gigoSearchResult.gigoContainerDetailsSO.length; j++) {
        for (let i = 0; i < this.gigoRequesttypeList.length; i++) {
          if (this.gigoSearchResult.gigoContainerDetailsSO[j].requestType == this.gigoRequesttypeList[i].definedSetValueCode) {
            this.gigoSearchResult.gigoContainerDetailsSO[j].requestType = this.gigoRequesttypeList[i].definedSetValueIntMessage;
          }
        }
      }
    }
  }

  onBackAlert() {
    if (this.utils.popupHandler() == true) {

      if (!this.groupOne.dirty && !this.groupTwo.dirty && !this.damageDirtyFlag && !this.attachmentDirtyFlag) {

        this.navCtrl.pop();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'If you continue, your changes will be lost. Do you want to proceed?',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.navCtrl.pop();
            },
          },
            {
              text: 'Cancel',
              handler: () => {
              },
            }]
        });
        alert.present();
      }
    }
  }
  sendSearchByIdRequest()
  {
    this.gigoServiceProvider.gigoSearchById(this.currentSearchID, true).subscribe(response=> {
      this.gigoSearchResult = <GigoDetailsSO>response;
      this.showCancelButton();
      this.showEditButton();
      this.getRequesttype();
      this.validityDate = this.transformDateTime(this.gigoSearchResult.selectDays);
      this.maxvalue = this.validityDate;
      if(this.gigoSearchResult.locationName == null && this.location)
      {
        this.gigoSearchResult.locationName = this.location;
      }
      if(this.gigoSearchResult.spLocationName == null && this.spname)
      {
        this.gigoSearchResult.spLocationName = this.spname;
      }
      if(this.gigoSearchResult.moveType == "In")
      {
        this.gigoTabheader = "Gate In Details";
      }
      else if (this.gigoSearchResult.moveType == "Out")
      {
        this.gigoTabheader = "Gate Out Details";
      }
    },error =>{

    });
  }

  transformDateTime(value: string): any {
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1]),
      (+dateArray[4]),
      (+dateArray[5])).getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();
    return dateObject;
  }
  onValidityDateChanged() {
    let date;
    if (this.validityDate && this.validityDate.length > 0) {
      this.gigoSearchResult.selectDays = this.validityDate;
    } else {
      this.gigoSearchResult.selectDays = '';
    }
    date = this.transformDateTime(this.gigoSearchResult.selectDays);
    if(this.gigoSearchResult.selectDays != date)
    {
      this.dateStatus = true;
    }
    else {
      this.dateStatus = false;
    }

  }

  showSealButton(index: any) {
    if(this.gigoSearchResult.gigoContainerDetailsSO[index].containerNo == "" ||
      this.gigoSearchResult.gigoContainerDetailsSO[index].containerNo === 'undefined'||
      this.gigoSearchResult.gigoContainerDetailsSO[index].containerNo == null)
    {
      return false;
    }
    else {
      return true;
    }

  }

  showCancelButton():boolean {
    this.cancelHiddenStatus = false;
    return this.cancelHiddenStatus;
  }
  showEditButton():boolean {
    return this.editHiddenStatus;
  }

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }


  getStatus(status: string) {
    if (status == "YettoArrive") {
      status = "Yet to Arrive";
    }
    return status;
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Overwrite Back Button Page Change');
      _this.onBackAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  navigateBack() {
    if (this.editfromHistory && this.fromEdit) {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4));
    }else if (this.fromCreate || this.fromEdit ) {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 2));
    } else {
      this.navCtrl.pop();
    }
  }
  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }
  showDamageDetails(index: any){
    if(this.editMode)
    {
      let profileModal = this.modalCtrl.create(DamageDetailsComponent, {
        containerDetails: this.gigoSearchResult.gigoContainerDetailsSO[index],
        editmode: true
      });
      profileModal.onDidDismiss(data => {
        if (null != data) {
          this.gigoSearchResult.gigoContainerDetailsSO[index] = data.gigoContainerDetails;
          this.damageDirtyFlag = data.dirtyFlag;
        }
      });
      profileModal.present();
    }
    else {
      let profileModal = this.modalCtrl.create(DamageDetailsViewContainerComponent, {
        containerElement: this.gigoSearchResult.gigoContainerDetailsSO[index]
      });
      profileModal.onDidDismiss(data => {

        if (null != data) {
          this.gigoSearchResult.gigoContainerDetailsSO[index] = data.gigoContainerDetails;
          if (this.gigoSearchResult.gigoContainerDetailsSO[index].damageWidth != null &&
            this.gigoSearchResult.gigoContainerDetailsSO[index].damageWidth.endsWith(".")) {
            this.gigoSearchResult.gigoContainerDetailsSO[index].damageWidth =
              this.gigoSearchResult.gigoContainerDetailsSO[index].damageWidth.substring(0, this.gigoSearchResult.gigoContainerDetailsSO[index].damageWidth.length - 1);
          }
          if (this.gigoSearchResult.gigoContainerDetailsSO[index].damageHeight != null &&
            this.gigoSearchResult.gigoContainerDetailsSO[index].damageHeight.endsWith(".")) {
            this.gigoSearchResult.gigoContainerDetailsSO[index].damageHeight =
              this.gigoSearchResult.gigoContainerDetailsSO[index].damageHeight.substring(0, this.gigoSearchResult.gigoContainerDetailsSO[index].damageHeight.length - 1);
          }
          if (this.gigoSearchResult.gigoContainerDetailsSO[index].damageLength != null &&
            this.gigoSearchResult.gigoContainerDetailsSO[index].damageLength.endsWith(".")) {
            this.gigoSearchResult.gigoContainerDetailsSO[index].damageLength =
              this.gigoSearchResult.gigoContainerDetailsSO[index].damageLength.substring(0, this.gigoSearchResult.gigoContainerDetailsSO[index].damageLength.length - 1);
          }
          this.damageDirtyFlag = data.dirtyFlag;
        }
      });
      profileModal.present();
    }
  }
  showSealDetails(index: any){
    if(this.editMode)
    {
      let profileModal = this.modalCtrl.create(SealDetailsComponent,  {
        sealDetails: this.gigoSearchResult.gigoContainerDetailsSO[index].gigoSealDetailsSO,
        sealIssuerList: this.sealIssuerList,
        sealStatusList:this.sealStatusList,
        sealTypeList: this.sealTypeList,
        editmode: true
      });
      profileModal.onDidDismiss(data => {
        if (null != data) {
          this.gigoSearchResult.gigoContainerDetailsSO[index].gigoSealDetailsSO = data.sealDetails;
        }
      });
      profileModal.present();
    }
    else {
      let profileModal = this.modalCtrl.create(SealDetailsViewContainerComponent, {
        containerElement: this.gigoSearchResult.gigoContainerDetailsSO[index]
      });
      profileModal.present();
    }

  }

  displayattach(attachment: GigoAttachmentSO) {
    this.gigoServiceProvider.openAttachment(attachment);
  }
  editGigo()
  {
    this.navCtrl.push(GiGoCreatePage, {
      fromHistory: true
    });

  }
  cancelGigo()
  {

  }


  keyUpValidate(e, format, model, tIndex) {
    this.utils.keyUpValidate(e, format);
    if (model == 'truckNumber') {
      this.gigoSearchResult.truckNumber = e.target.value;
    }
    else if (model == 'driverName') {
      this.gigoSearchResult.driverName = e.target.value;
    }

  }
  keyboardClose() {
    this.keyboard.close();
  }
  onBlurValidation(ev,pattern,modelVariable) {
    if (this.validate(modelVariable, pattern)) {
      ev.value="";
      let messageText='Invalid Input';
      if(ev.placeholder){
        messageText='Invalid '+ ev.placeholder;
      }
      this.presentAlert("Attention", messageText);
      return;

    }
  }
  validate(model, format) {
    if (model != null && model.length > 0) {
      let pattern = new RegExp(format);
      try {
        if (pattern.test(model)) {
          return false;
        }
        else {
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

  onSubmit() {
    let containerFormValidator = false;
    if(this.groupOne.valid && this.groupTwo.valid) {
      if(this.attachmentsAdded()) {
       if (this.validityDate) {
        let formatValidityDate = this.validityDate;
        this.gigoSearchResult.selectDays = this.datepipe.transform(formatValidityDate.split("T")[0], 'dd/MM/yyyy');
        formatValidityDate = formatValidityDate.split("T")[1];
        formatValidityDate = formatValidityDate.substr(0, formatValidityDate.lastIndexOf(':'));
        this.gigoSearchResult.selectDays = this.gigoSearchResult.selectDays + " " + formatValidityDate;
       }
      let alert = this.alertCtrl.create({
        title: 'CONFIRM BOX',
        subTitle: 'Do you want to submit your request?',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.proceedWithEdit();
            }
          }, {
            text: 'CANCEL',
            handler: () => {
            },
          }]

      });
      alert.present();
    }
      else {
        this.presentAlert("ALERT","Please attach files.");
      }
    }
    else {
      this.error = true;
      if (this.groupOne.invalid || this.groupTwo.invalid) {
        this.presentAlert('ALERT', 'Enter all mandatory fields');
      }
    }
  }

  proceedWithEdit() {

    /*Edit Request*/
    this.gigoServiceProvider.gigoSaveModify(this.gigoSearchResult, true).subscribe(
      response => {

        let responseafterEdit: GigoDetailsSO = <GigoDetailsSO>response;

         this.navCtrl
           .push(GigoCreateSummary, {
             gigoSearchResult: responseafterEdit,
             fromSummary: this.fromSummary,
             editMode: this.editMode
           });
      },
      error => {
        this.presentAlert('ALERT', error[0].message);
        console.log("Error Occured <<" + JSON.stringify(error));
        //this.resetOnSubmitError();
      }
    );
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
  getStatusIcon(gigoStatus) {
    switch (gigoStatus) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
    }
  }
  uploadAttachment(): boolean {
    if (this.gigoSearchResult.gigoAttachmentSO != null && this.gigoSearchResult.gigoAttachmentSO.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  initializeAttachment() {
    this.gigoSearchResult.gigoAttachmentSO.push(new GigoAttachmentSO());
  }
  displayAttachment(attachment: GigoAttachmentSO) {
    this.gigoServiceProvider.openAttachment(attachment);
  }
  uploadDocs(attachment: GigoAttachmentSO) {
    this.gigoServiceProvider.uploadDocuments()
      .then(data => {
        attachment.fileName = data.fileName;
        attachment.fileUploadId = data.fileUploadId;
        attachment.hideUploadButton = false;
        this.attachmentDirtyFlag = true;
      }, error => {
        if(error.body.match("Found restricted content in file"))
        {
          this.presentAlert('ALERT', "Found restricted content in file");
        }
      });
  }
  closeAttachment(attachment: GigoAttachmentSO) {
    this.attachdirtyFlag = true;
    for (var i = 0; i < this.gigoSearchResult.gigoAttachmentSO.length; i++) {
      if (this.gigoSearchResult.gigoAttachmentSO[i] == attachment) {
        this.gigoSearchResult.gigoAttachmentSO.splice(i, 1);
        this.attachmentDirtyFlag = true;
        break;
      }
    }
  }

  addAttachment() {
    this.attachdirtyFlag = true;
    if (this.gigoSearchResult.gigoAttachmentSO != null && this.gigoSearchResult.gigoAttachmentSO.length < 5) {
      this.gigoSearchResult.gigoAttachmentSO.push(new GigoAttachmentSO());
    } else {
      this.presentAlert('ALERT', 'You are not allowed to Upload more than 5 Attachments.');
    }
  }
  attachmentsAdded() : boolean {
    if(this.gigoSearchResult.gigoAttachmentSO && this.gigoSearchResult.gigoAttachmentSO.length >0) {
      for (let i = 0; i < this.gigoSearchResult.gigoAttachmentSO.length; i++) {
        if(this.gigoSearchResult.gigoAttachmentSO[i].fileName == null  || this.gigoSearchResult.gigoAttachmentSO[i].fileName === 'undefined' ) {
          return false;
        }
      }
    }
    return true;
  }

}
