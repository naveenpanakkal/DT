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
  Slides,
  ViewController
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Utils} from "../../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {SealDetailsComponent} from "../../../components/gigomodelpage/seal-details/seal-details";
import {DamageDetailsComponent} from "../../../components/gigomodelpage/damage-details/damagedetails";
import {
  GigoAttachmentSO,
  GigoContainerDetailsSO,
  GigoDetailsSO,
  LocationMasterSO,
  SubLocationMasterSO
} from "../../../shared/model/GIGO/gigodetails.model";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {GigoCreateSummary} from "../gigocreatesummary/gigocreatesummary";
import {GigoMovement} from "../../../shared/model/GIGO/gigomovement.model";
import {GigoSearchSOModel} from "../../../shared/model/GIGO/gigosearch.model";
import {DatePipe} from "@angular/common";

/**GiGoEditPage
 * Generated class for the GiGoEdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gigocreate',
  templateUrl: 'gigocreate.html',
  providers: [GigoDetailsSO,Utils]
})

export class GiGoCreatePage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  @ViewChild(Slides) slides: Slides;
  dateTimeFormat: string = 'DD/MM/YYYY HH:mm GST';
  dateTimeFormatplaceHolder: string = 'DD/MM/YYYY HH:MM';
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false];
  public showRightSlideNav: boolean;
  public currentIndexSideNav: any;
  public dropDown: any;
  selectedTabsIndex = 0;
  private dropDown2: string = 'false';
  locationModel: GigoDetailsSO = new GigoDetailsSO();
  private selectedModel: GigoDetailsSO = new GigoDetailsSO();
  public gigoContainerDetailsSO: GigoContainerDetailsSO[] = [];
  public definedSetListModel: DefinedsetresListModel[];
  public modeOfTransportList: DefinedSetResModel[] = [];
  public moveTypeList : DefinedSetResModel[] = [];
  public gateMasterList : DefinedSetResModel[] = [];
  public gateIngateOutList : DefinedSetResModel[] = [];
  public gigoStatusList : DefinedSetResModel[] = [];
  public gigoReleasebyList : DefinedSetResModel[] = [];
  public gigoRequesttypeList : DefinedSetResModel[] = [];
  public requesttypeList : DefinedSetResModel[] = [];
  public sealIssuerList : DefinedSetResModel[] = [];
  public sealStatusList : DefinedSetResModel[] = [];
  public sealTypeList : DefinedSetResModel[] = [];
  public ladenStatusList : DefinedSetResModel[] = [];
  locationMasterModel: LocationMasterSO [] = [];
  sublocationMasterModel: SubLocationMasterSO [] = [];
  private pdf: string = 'pdf';
  private csv: string = 'excel';
  verifyRefNoExists : boolean = false;
  alertButtonDismiss:string;
  attensiontitle:string;
  attachments: GigoAttachmentSO[] = [];
  gigoMovement:GigoMovement[] = [];
  FormGroup1: FormGroup;
  FormGroup2: FormGroup;
  error: boolean = false;
  containerError: boolean = false;
  public unregisterBackButtonAction: any;
  maxvalue: any;
  // today :any;
  // tomorrow:any;
  gigoDate: any;
  previousContainerNo: string = '';
  defaultMoveType: string = "";
  gigoTabheader: string;
  ContainerDuplicate: boolean= false;
  attachmentDirtyFlag: boolean = false;
  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private commonServices: CommonservicesProvider,
              private alertCtrl: AlertController,
              public datepipe: DatePipe,
              public gigoServiceProvider: GiGoServiceProvider,
              public utils: Utils,
              public formBuilder: FormBuilder,
              public keyboard: Keyboard, private viewCtrl: ViewController) {

    this.alertButtonDismiss = this.utils.getLocaleString("ca_dismiss_txt");
    this.attensiontitle=this.utils.getLocaleString("ca_attention");
    this.getDefinedSet();
    this.getLocation();
    this.resetShowTabs(0);
    this.tabs = ['Gate In/Out Info', 'Attachments'];
    this.selectedTab = this.tabs[0];
    this.currentIndexSideNav = 2;
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.dropDown = false;
    this.showRightButton = this.tabs.length > 2;
    this.gigoContainerDetailsSO.push(new GigoContainerDetailsSO());
    this.gigoContainerDetailsSO[0].requestType = "";
    this.selectedTabsIndex = -1;

    this.FormGroup1 = this.formBuilder.group({
      location: ['', Validators.compose([Validators.required])],
      spname: ['', Validators.compose([Validators.required])],
      moveType: ['', Validators.compose([Validators.required])]
    });
    this.FormGroup2 = this.formBuilder.group({
      truckNumber: ['', Validators.compose([Validators.required])],
      driverName: [''],
      refNo: [''],
      gigoDate: ['', Validators.compose([Validators.required])]
    });
    if (this.selectedModel.location && this.selectedModel.location != null && this.selectedModel.location != "") {
      this.onLocationChanged();
    }
    else
    {
      this.selectedModel.location="";
    }



    if(!this.selectedModel.sPName){
      this.selectedModel.sPName = "";
    }

    // if ( this.gigoContainerDetailsSO[0].ladenStatus == null ||  this.gigoContainerDetailsSO[0].ladenStatus == "") {
    //   if (this.ladenStatusList && this.ladenStatusList.length > 0) {
    //     this.gigoContainerDetailsSO[0].ladenStatus = this.ladenStatusList[0].definedSetValueCode;
    //   }
    // }

    // this.selectedModel.location = "";
    // this.selectedModel.sPName = "";
    this.maxvalue = new Date();
    this.maxvalue.setHours(23,59,0,0);
    this.maxvalue = new Date(this.maxvalue.getTime() - (this.maxvalue.getTimezoneOffset() * 60000));
    this.maxvalue = this.maxvalue.toISOString();
    this.gigoTabheader = "Gate In Gate Out Details";
  }


  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.backAlert();
    }
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  backAlert() {
    if (this.utils.popupHandler() == true) {
      if (!this.FormGroup1.dirty && !this.FormGroup2.dirty && !this.attachmentDirtyFlag) {

        this.navCtrl.pop();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: 'The entered details will be lost. Do you want to continue?',
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

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      console.log('Overwrite Back Button Page Change');
      _this.backAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  getLocation (){
  let gigoDetailsSO:GigoDetailsSO = new GigoDetailsSO();
    let listAllLocation: Array<any> = [];
    this.gigoServiceProvider.gigoLocationMaster(gigoDetailsSO, false)
      .subscribe(response => {
         this.refineLocationData(response.locationMasterList);
        },
        error => {

        });
  }


  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['MODE_OF_TRANSPORT',  'GATE_MASTER', 'MOVE_TYPE_SEARCH', 'SEARCH_BY_GATE_IN_OUT' , 'GIGO_STATUS',
                                          'GIGO_RELEASE_BY' , 'GIGO_REQUEST_TYPE' , 'SEAL_ISSUER' , 'SEAL_STATUS' ,'SEAL_TYPE' , 'LADEN_STATUS'];
    definedSetReqModel.lang = 'en';
    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {

            if (this.definedSetListModel[i].definedSetName == 'MODE_OF_TRANSPORT') {
              this.modeOfTransportList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
           /*   if (this.modeOfTransportList.length > 0 && this.modeOfTransportList[0].definedSetValueCode == '') {
                this.modeOfTransportList.splice(0, 1);
              }*/
            }

            if (this.definedSetListModel[i].definedSetName == 'MOVE_TYPE_SEARCH') {
              this.moveTypeList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'GATE_MASTER') {
              this.gateMasterList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'SEARCH_BY_GATE_IN_OUT') {
              this.gateIngateOutList = this.definedSetListModel[i].definedSetValues;
            }

            if (this.definedSetListModel[i].definedSetName == 'GIGO_STATUS') {
              this.gigoStatusList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'GIGO_RELEASE_BY') {
              this.gigoReleasebyList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'GIGO_REQUEST_TYPE') {
              this.gigoRequesttypeList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'SEAL_ISSUER') {
              this.sealIssuerList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'SEAL_STATUS') {
              this.sealStatusList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'SEAL_TYPE') {
              this.sealTypeList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'LADEN_STATUS') {
              this.ladenStatusList = this.definedSetListModel[i].definedSetValues;
            }
          }
          if(this.gigoContainerDetailsSO && this.gigoContainerDetailsSO.length > 0) {
            this.gigoContainerDetailsSO[0].requesttypeList = JSON.parse(JSON.stringify(this.gigoRequesttypeList));
            if (this.gigoContainerDetailsSO[0].requesttypeList && this.gigoContainerDetailsSO[0].requesttypeList.length > 0) {
              this.gigoContainerDetailsSO[0].requesttypeList.splice(1, this.gigoContainerDetailsSO[0].requesttypeList.length - 1);
            }
            this.gigoContainerDetailsSO[0].ladenStatus= "";
          }
          this.requesttypeList = JSON.parse(JSON.stringify(this.gigoRequesttypeList));
          if(this.requesttypeList && this.requesttypeList.length>0) {
            this.requesttypeList.splice(1, this.requesttypeList.length-1);
          }
        },
        error => {
          //Show error message
        });


    setTimeout( ()=> {
      if(this.moveTypeList && this.moveTypeList.length > 0) {
        this.selectedModel.moveType = this.moveTypeList[0].definedSetValueCode;
      }
      if(this.gigoRequesttypeList && this.gigoRequesttypeList.length > 0) {
        if(this.gigoContainerDetailsSO) {
          this.gigoContainerDetailsSO[0].requestType =  this.gigoRequesttypeList[0].definedSetValueCode;
        }
      }
      if(this.ladenStatusList && this.ladenStatusList.length > 0) {
        if(this.gigoContainerDetailsSO) {
          this.gigoContainerDetailsSO[0].ladenStatus =  this.ladenStatusList[0].definedSetValueCode;
        }
      }
    }, 500);
  }

  onLocationChanged() {
    let masterModel = new GigoDetailsSO();
    masterModel.location = this.selectedModel.location;
   this.gigoServiceProvider.gigoSPNameMaster(masterModel, false)
     .subscribe(response => {
        this.sublocationMasterModel = response.spNameMasterList;
        this.selectedModel.sPName = "";
     },
       error => {

       });
    this.selectedModel.sPName = "";
  }


  getStatus(status: string) {
    if (status == "YettoArrive") {
      status = "Yet to Arrive";
    }
    return status;
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

    }/*
    else{
      if(modelName=='referenceNo'){
        this.verifyRefNo();
      }
      if(modelName=='containerNo'){
        this.verifyContainerNo(modelVariable);
      }

    }*/
  }

  verifyRefNo(ev,pattern,modelVariable) {
    if(modelVariable) {
      if (this.validate(modelVariable, pattern)) {
        // modelVariable="";
        ev.value="";
        let messageText='Invalid Input';
        if(ev.placeholder){
          messageText='Invalid Reference Number';
        }
        this.presentAlert("Attention", messageText);
        return;

      }
      this.gigoServiceProvider.gigoVerifyRefNo(this.selectedModel , false)
        .subscribe(response => {
            this.verifyRefNoExists = response;
            if(this.verifyRefNoExists) {
              this.selectedModel.referenceNo = "";
              this.presentAlert(this.attensiontitle, "Reference No already Exists, please provide another value.");
            }
          },
          error => {

          }
        )
    }
  }

  verifyContainerNo(container: GigoContainerDetailsSO,tIndex ) {
    // if (this.validate(container.containerNo, pattern))
    // {
    //   // //ev.value="";
    //   // let messageText='Invalid Input';
    //   // if(ev.placeholder){
    //   //   messageText='Invalid '+ ev.placeholder;
    //   // }
    //   container.containerNo="";
    //   this.presentAlert("Attention", 'Invalid Container Number');
    //   return;
    //
    // }


    if(this.validate(container.containerNo,'^[0-9a-zA-Z]{0,11}$')) {
      container.containerNo = "";
      this.presentAlert("Attention", "Invalid Container Number");
      return;
    }

    if(container.containerNo)
    {
    if (this.FormGroup1.valid) {
      if (this.gigoContainerDetailsSO[tIndex].requesttypeList && this.gigoContainerDetailsSO[tIndex].requesttypeList.length > 1) {
        this.gigoContainerDetailsSO[tIndex].requesttypeList.splice(1, 1);
      }
      let gigoSearchSOModel: GigoSearchSOModel = new GigoSearchSOModel();
      gigoSearchSOModel.containerNo = container.containerNo;
      for (let i = 0; i < this.locationMasterModel.length; i++) {
        if (this.selectedModel.location == this.locationMasterModel[i].spLocationCode) {
          gigoSearchSOModel.locationSearch = this.locationMasterModel[i].spLocationName;
        }
      }
      for (let j = 0; j < this.sublocationMasterModel.length; j++) {
        if (this.selectedModel.sPName == this.sublocationMasterModel[j].spSubLocationCode) {
          gigoSearchSOModel.spNameSearch = this.sublocationMasterModel[j].spSubLocationName;
        }
      }
      gigoSearchSOModel.moveTypeSearch = this.selectedModel.moveType;
      this.gigoServiceProvider.gigoMovementLog(gigoSearchSOModel, false)
        .subscribe(response => {
            this.gigoMovement = response;
            if (this.gigoMovement.length > 0) {
              if (this.gigoMovement[0].requestType) {
                for (let i = 0; i < this.gigoRequesttypeList.length; i++) {
                  if (this.gigoMovement[0].requestType == this.gigoRequesttypeList[i].definedSetValueCode) {
                    this.gigoContainerDetailsSO[tIndex].requesttypeList.push(this.gigoRequesttypeList[i]);
                  }
                }
                for (let i = 0; i < this.gigoContainerDetailsSO.length; i++) {
                  if(this.gigoContainerDetailsSO[i].containerNo == "" || this.gigoContainerDetailsSO[i].containerNo == null) {
                    this.resetContainerDetails(i);
                  }
                }
              }
              container.showSealButtton = true;
            }
            else {
              container.containerNo = "";
              container.showSealButtton = false;
              this.presentAlert(this.attensiontitle, "No request found for the Container. Please check the Move Type or Container No.\n");
            }
          },
          error => {

          })


    }
    else {
      this.containerError = true;
      container.containerNo = "";
    }
  }
  }

  // keyUpValidate(ev, format,model,selectedIndex, tIndex) {
  keyUpValidate(ev, format,model,selectedIndex) {
    this.utils.keyUpValidate(ev, format);
    if (model == 'truckNumber') {
      this.selectedModel.truckNumber = ev.target.value;
    }
    else if (model == 'driverName') {
      this.selectedModel.driverName = ev.target.value;
    }
    else if (model == 'referenceNo') {
      this.selectedModel.referenceNo = ev.target.value;
    }
    else if (model == 'chassisNo') {
      this.gigoContainerDetailsSO[selectedIndex].chassisNo = ev.target.value;
    }
    else if (model == 'containerNo') {
      let formatLetter = /^[A-Za-z]*$/i;
      let formatDigit = /^[0-9]*$/i;

      let firstSplitWord: string = '';
      let secondSplitWord: string = '';

      if (this.gigoContainerDetailsSO[selectedIndex].containerNo.length <= 4) {
        firstSplitWord = ev.target.value.toString().substr(0, ev.target.value.length);
        if (formatLetter.test(firstSplitWord)) {
          this.previousContainerNo = ev.target.value.toUpperCase();
          this.gigoContainerDetailsSO[selectedIndex].containerNo = ev.target.value.toUpperCase();
        } else {
          this.gigoContainerDetailsSO[selectedIndex].containerNo = this.previousContainerNo;
        }
      } else {
        firstSplitWord = ev.target.value.toString().substr(0, 4);
        secondSplitWord = ev.target.value.toString().substr(4, ev.target.value.length - 1);
        if (/*formatLetter.test(firstSplitWord) &&*/ formatDigit.test(secondSplitWord)) {
          this.previousContainerNo = ev.target.value.toUpperCase();
          this.gigoContainerDetailsSO[selectedIndex].containerNo = ev.target.value.toUpperCase();
        } else {
          this.gigoContainerDetailsSO[selectedIndex].containerNo = this.previousContainerNo;
        }
      }
    }

  }
  keyboardClose() {
    this.keyboard.close();
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

  refineLocationData(responseData:LocationMasterSO []){
    let tempResponse:LocationMasterSO []=[];
    for(let eachItem of responseData){
      if(eachItem.spLocationName && eachItem.spLocationCode){
        tempResponse.push(eachItem);
      }
    }

    this.locationMasterModel = this.removeDuplicates(tempResponse, 'spLocationName');

  }
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj =>
        mapObj[prop]).indexOf(obj[prop]) === pos; });
  }

  onRequestTypeChanged(container: GigoContainerDetailsSO) {
    for (let i = 0; i < this.gigoContainerDetailsSO.length; i++) {
      if (container != this.gigoContainerDetailsSO[i]) {
        if (this.gigoMovement[0].containerNo == this.gigoContainerDetailsSO[i].containerNo) {
          this.ContainerDuplicate = true;
          container.requesttypeList.splice(1,1);
          container.containerNo = "";
        }
      }
    }
      setTimeout(() => {
        if (this.ContainerDuplicate == true) {
          this.presentAlert('ALERT', 'Container Number with Request already Exists');
          this.ContainerDuplicate = false;
        }
      }, 500);

    if (container.requestType != "" && container.requestType != null && container.containerNo != "" && container.containerNo != null) {
      container.requestNo = this.gigoMovement[0].requestNo;
      container.isoCode = this.gigoMovement[0].isoCode;
      container.containerID = this.gigoMovement[0].containerID;
      container.mvmntClientCode = this.gigoMovement[0].mvmntClientCode;
      container.mvmntCreatedDate = this.gigoMovement[0].movemntCreatedDate;
      this.selectedModel.mvmntClientCode = this.gigoMovement[0].mvmntClientCode;
    }
    else {
      container.requestNo = "";
      container.isoCode = "";
    }

  }

  public filterTabs(tab: string): void {
    if (this.selectedTab != tab) {

    }
    if (tab === 'Vessel Info') {
      this.resetShowTabs(0);
    } else if (tab === 'Summary') {
      this.resetShowTabs(1);
    } else if (tab === 'Discharge Details') {
      this.resetShowTabs(2);
    } else if (tab === 'Load Details') {
      this.resetShowTabs(3);
    } else if (tab === 'Restow Details') {
      this.resetShowTabs(4);
    }
    this.selectedTab = tab;
    if (this.currentIndexSideNav != 2) {
      // this.closeSideNav(this.currentIndexSideNav,'');
    }
  }

  // Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();
  }

  resetShowTabs(val: number) {
    for (let i = 0; i < this.showTabs.length; i++) {
      if (val == i) {
        this.showTabs[i] = true;
      } else {
        this.showTabs[i] = false;
      }
    }
  }

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  showDeleteIcon(){
    if(this.gigoContainerDetailsSO && this.gigoContainerDetailsSO.length>1) {
      return true;
    }
    else {
      return false;
    }
  }

  damageDetailsmodel(containerDetails: GigoContainerDetailsSO) {

    let profileModal = this.modalCtrl.create(DamageDetailsComponent, {
      containerDetails: containerDetails
    });
    profileModal.onDidDismiss(data => {
      if (null != data) {
        containerDetails = data.gigoContainerDetails;
      }
    });
    profileModal.present();
  }

  sealDetailsmodel(containerDetails: GigoContainerDetailsSO){


    let profileModal = this.modalCtrl.create(SealDetailsComponent,  {
      sealDetails: containerDetails.gigoSealDetailsSO,
      sealIssuerList: this.sealIssuerList,
      sealStatusList:this.sealStatusList,
      sealTypeList: this.sealTypeList
    });
    profileModal.onDidDismiss(data => {
      if (null != data) {
        containerDetails.gigoSealDetailsSO = data.sealDetails;
      }
    });
    profileModal.present();
  }

  addContainer() {
    if (this.gigoContainerDetailsSO.length < 4) {
      let gigoContainerDetailsSO = new GigoContainerDetailsSO();
      gigoContainerDetailsSO.requestType ="";
      gigoContainerDetailsSO.ladenStatus= "";
      gigoContainerDetailsSO.requesttypeList = this.requesttypeList;
      this.gigoContainerDetailsSO.push(gigoContainerDetailsSO);
    } else {
      this.presentAlert('ALERT', 'Maximum 4 rows are allowed');
    }
  }



  closeContainer(container: GigoContainerDetailsSO) {
    for (let i = 0; i < this.gigoContainerDetailsSO.length; i++) {
      if (this.gigoContainerDetailsSO[i] == container) {
        this.gigoContainerDetailsSO.splice(i, 1);
        return;
      }
    }
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [this.alertButtonDismiss]
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
    this.attachments.push(new GigoAttachmentSO());
  }

  addAttachment() {
    if (this.attachments.length < 5) {
      this.attachments.push(new GigoAttachmentSO());
    } else {
      this.presentAlert('ALERT', 'You are not allowed to Upload more than 5 Attachments');
    }
  }

  closeAttachment(attachment: GigoAttachmentSO) {
    for (let i = 0; i < this.attachments.length; i++) {
      if (this.attachments[i] == attachment) {
        this.attachments.splice(i, 1);
        return;
      }
    }
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

  displayAttachment(attachment: GigoAttachmentSO) {
    this.gigoServiceProvider.openAttachment(attachment);
  }

  submit() {
    setTimeout(() => {
    if(this.FormGroup1.valid && this.FormGroup2.valid && this.validateFields()) {
      if(this.attachmentsAdded()) {
        this.showConfirmation();
      }
      else {
        this.presentAlert("ALERT","Please attach files.");
      }
    }
    else {
      this.error = true;
      this.containerError = true;
      this.presentAlert('ALERT', "Please enter All Mandatory fields");

    }
    }, 500);
  }

  validateFields(): boolean {
    if(this.gigoContainerDetailsSO != null) {
      for (let i = 0; i < this.gigoContainerDetailsSO.length; i++) {
        if(!(this.validateChasisNo(i) && this.validateRequestType(i) && this.validateLadenStatus(i))) {
          return false;
        }
      }
    }
    return true;
  }

  moveTypeSelected(ev) {

      if(this.defaultMoveType =="") {
        this.defaultMoveType = this.selectedModel.moveType;
      }
      if(this.selectedModel.moveType == "In")
      {
        this.gigoTabheader = "Gate In Details";
      }
      else if (this.selectedModel.moveType == "Out")
      {
        this.gigoTabheader = "Gate Out Details";
      }
      else
      {
        this.gigoTabheader = "Gate In Gate Out Details";
      }
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'All the container details will be cleared. Do you want to continue.',
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.defaultMoveType = this.selectedModel.moveType;
            for(let i=0;i<this.gigoContainerDetailsSO.length ; i++) {
              this.gigoContainerDetailsSO[i].chassisNo = "";
              this.gigoContainerDetailsSO[i].containerNo = "";
              this.gigoContainerDetailsSO[i].ladenStatus = "";
              this.resetContainerDetails(i);
              for (let i = 0; i < this.gigoContainerDetailsSO.length; i++) {
                if (this.gigoContainerDetailsSO[i].requesttypeList && this.gigoContainerDetailsSO[i].requesttypeList.length > 0) {
                  this.gigoContainerDetailsSO[i].requesttypeList.splice(1, this.gigoContainerDetailsSO[i].requesttypeList.length - 1);
                }
              }
            }
          },
        },
          {
            text: 'Cancel',
            handler: () => {
              this.selectedModel.moveType = this.defaultMoveType;
              alert.dismiss();
            },
          }]
      });

    if( this.selectedModel.moveType != this.defaultMoveType && (this.validateContainers() || this.validateAllChasisNo())) {
      setTimeout( ()=> {
        alert.present();
      }, 500);
    }

  }

  containerNochange(index: number) {

    if(this.gigoContainerDetailsSO[index].containerNo == "" || this.gigoContainerDetailsSO[index].containerNo == null) {
      this.resetContainerDetails(index);
      if(this.gigoContainerDetailsSO[index].requesttypeList && this.gigoContainerDetailsSO[index].requesttypeList.length>0) {
        this.gigoContainerDetailsSO[index].requesttypeList.splice(1, this.gigoContainerDetailsSO[index].requesttypeList.length-1);
      }
    }
  }

  resetContainerDetails(index: number) {
    this.gigoContainerDetailsSO[index].requestType = "";
    this.gigoContainerDetailsSO[index].requestNo = "";
    this.gigoContainerDetailsSO[index].isoCode = "";
    this.gigoContainerDetailsSO[index].showSealButtton = false;
    this.gigoContainerDetailsSO[index].damageCondition ="";
    this.gigoContainerDetailsSO[index].damageLocation ="";
    this.gigoContainerDetailsSO[index].damageItem ="";
    this.gigoContainerDetailsSO[index].damageCount ="";
    this.gigoContainerDetailsSO[index].damageLength ="";
    this.gigoContainerDetailsSO[index].damageWidth ="";
    this.gigoContainerDetailsSO[index].damageHeight ="";
    this.gigoContainerDetailsSO[index].remarks ="";
    if(this.gigoContainerDetailsSO[index].gigoAttchDmgDtlsSO) {
      for(let i=0;i<this.gigoContainerDetailsSO[index].gigoAttchDmgDtlsSO.length ; i++) {
        this.gigoContainerDetailsSO[index].gigoAttchDmgDtlsSO = [];
      }
    }
    if(this.gigoContainerDetailsSO[index].gigoSealDetailsSO) {
      for(let j=0;j<this.gigoContainerDetailsSO[index].gigoSealDetailsSO.length ; j++) {
        this.gigoContainerDetailsSO[index].gigoSealDetailsSO[j].sealNumber= "";
        this.gigoContainerDetailsSO[index].gigoSealDetailsSO[j].sealPrefix= "";
        this.gigoContainerDetailsSO[index].gigoSealDetailsSO[j].sealStatus= "";
        this.gigoContainerDetailsSO[index].gigoSealDetailsSO[j].sealType= "";
      }
    }
  }

  validateChasisNo(index: number): boolean {
        if(!this.gigoContainerDetailsSO[index].chassisNo) {
          return false;
    }
    return true;
  }

  validateContainers(): boolean {
    for (let i = 0; i < this.gigoContainerDetailsSO.length; i++) {
      if(this.gigoContainerDetailsSO[i].containerNo) {
        return true;
      }
    }
    return false;
  }

  validateAllChasisNo(): boolean {
    for (let i = 0; i < this.gigoContainerDetailsSO.length; i++) {
      if(this.gigoContainerDetailsSO[i].chassisNo) {
        return true;
      }
    }
    return false;
  }

  validateContainer(index: number): boolean {
      if(this.gigoContainerDetailsSO[index].containerNo=="" || this.gigoContainerDetailsSO[index].containerNo==='undefined') {
        return false;
      }
      else {
        return true;
      }
  }
   validateRequestType(index: number): boolean {
     if(this.gigoContainerDetailsSO[index].showSealButtton) {
       if(this.gigoContainerDetailsSO[index].requestType == "") {
         return false;
       }
     }
     return true;
   }
  validateLadenStatus(index: number): boolean {
    if(this.gigoContainerDetailsSO[index].showSealButtton) {
      if(this.gigoContainerDetailsSO[index].ladenStatus == "") {
        return false;
      }
    }
    return true;
  }


  showConfirmation() {
      let alertMsg = 'Do you want to submit your request?';
      const alert = this.alertCtrl.create({
        title: 'CONFIRM BOX',
        message: alertMsg,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.gigoCreate();
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
   }
  gigoCreate () {
    if(this.gigoDate) {
      let formatValidityDate = this.gigoDate;
      this.selectedModel.selectDays = this.datepipe.transform(formatValidityDate.split("T")[0], 'dd/MM/yyyy');
      formatValidityDate = formatValidityDate.split("T")[1];
      formatValidityDate = formatValidityDate.substr(0, formatValidityDate.lastIndexOf(':'));
      this.selectedModel.selectDays = this.selectedModel.selectDays + " " + formatValidityDate;

    }

    for (let i = 0; i < this.locationMasterModel.length; i++) {
      if (this.selectedModel.location == this.locationMasterModel[i].spLocationCode) {
        this.selectedModel.locationName = this.locationMasterModel[i].spLocationName;
      }
    }
    for (let j = 0; j < this.sublocationMasterModel.length; j++) {
      if (this.selectedModel.sPName == this.sublocationMasterModel[j].spSubLocationCode) {
        this.selectedModel.spLocationName= this.sublocationMasterModel[j].spSubLocationName;
      }
    }

     this.selectedModel.gigoContainerDetailsSO = this.gigoContainerDetailsSO;
     this.selectedModel.gigoAttachmentSO = this.attachments;


     this.gigoServiceProvider.gigoSaveReg(this.selectedModel, true)
       .subscribe(response =>{
         let responseCreate: GigoDetailsSO = <GigoDetailsSO>response;
            this.navCtrl.push(GigoCreateSummary, {
              gigoSearchResult: responseCreate,
              fromSummary: false,
              editMode: false
            });
       },
         error =>{
         if(error[0].errorCode && error[0].errorCode !="") {
           this.presentAlert('ALERT', error[0].errorCode);
         }
         else if (error[0].message && error[0].message !="")
         {
           this.presentAlert('ALERT', error[0].message);
         }
         })

  }

  attachmentsAdded() : boolean {
    if(this.attachments && this.attachments.length >0) {
      for (let i = 0; i < this.attachments.length; i++) {
        if(this.attachments[i].fileName == null  || this.attachments[i].fileName === 'undefined' ) {
          return false;
        }
      }
    }
    return true;
  }

}
