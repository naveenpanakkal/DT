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

import {Utils} from "../../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {
  ContainerHoldDetailsSO,
  ReleaseAttachmentDetailsSO,
  ReleaseContainerReqListSO,
  ReleaseContainerSrchListSO,
} from "../../../shared/model/hnrc/releasecontainersrch.model";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {RchConfirmation} from "../rchconfirmation/rchconfirmation";

/**
 * Generated class for the RCHReleaseviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rchreleaseview',
  templateUrl: 'rchrelease.html',
  providers: [Utils,HrcservicesProvider,ReleaseContainerSrchListSO,ContainerHoldDetailsSO,HrcservicesProvider]
})

export class RCHReleaseviewPage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  headerTitle: string;
  selectedTabsIndex = 0;
  releaseEventSelected:any;
  releaseNow:string = 'true';
  releaseLater:string = 'false';
  releaseRemarks:string;
  public minEndDateTime: any;
  public autoReleaseDateTime: any;
  // public minAutoReleaseDateTime: any;
  currDate: string = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();

  hnrcReleaseCotainerHoldData : ContainerHoldDetailsSO[];
  releaseContainerReqList: ReleaseContainerReqListSO = new ReleaseContainerReqListSO();
  public releaseDateTime: any;
  alertHeadding: string;
  ok_text: string;
  isReleaseSubmit : boolean = false;
  isReleaseDtEmpty : boolean = false;
  validationMessage : string = '';
  fromSummary:boolean;false;
  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  attachments: ReleaseAttachmentDetailsSO[] = [];
  releaseContainerSrchListSO:ReleaseContainerSrchListSO;
  dateFormat: string="DD/MM/YYYY HH:mm GST"
  @ViewChild(Slides) slides: Slides;

  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController,
              private hrcservicesProvider:HrcservicesProvider,
              public utils: Utils,
              public keyboard: Keyboard, private viewCtrl: ViewController) {
    this.hnrcReleaseCotainerHoldData = this.navParams.get("hnrcReleaseCotainerHoldData");
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.ok_text = this.utils.getLocaleString("ok_text");
    this.fromSummary=this.navParams.get("fromSummary");
    this.minEndDateTime = this.setMinEndDate(this.currDate);
    this.releaseEventSelected = 'ReleaseNow';
    this.releaseContainerReqList.releaseList = new Array<ContainerHoldDetailsSO>();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {

  }

  ionViewWillLeave() {

  }

  getStyle() {
    return '#808080';
  }

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  navigateBack() {
    this.navCtrl.pop();
  }

  uploadAttachment(): boolean {
    if (this.attachments != null && this.attachments.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  initializeAttachment() {
    this.attachments.push(new ReleaseAttachmentDetailsSO());
  }

  uploadDocs(attachment: ReleaseAttachmentDetailsSO) {
    this.hrcservicesProvider.uploadDocuments()
      .then(data => {
        attachment.fileName = data.fileName;
        attachment.fileUploadId = data.fileUploadId;
        attachment.hideUploadButton = false;
      }, error => {

      });
  }

  releaseContainerHold() {
    if(this.attachmentsAdded()) {
      for(let ContainerData of this.hnrcReleaseCotainerHoldData){

        ContainerData.releaseLater = this.releaseLater;
        ContainerData.releaseNow = this.releaseNow;

        ContainerData.additionalDetails[0].releaseNow = this.releaseNow;
        ContainerData.additionalDetails[0].releaseLater = this.releaseLater;
        if(this.releaseEventSelected == 'ReleaseNow') {
          ContainerData.additionalDetails[0].releaseDate = this.autoReleaseDateTime;
        }
        else if(this.releaseEventSelected == 'ReleaseLater'){
          if(this.releaseDateTime || this.releaseDateTime == ''){
            this.presentAlert("Warning",this.utils.getLocaleString("rch_DateMandatory"));
          }
        }
        ContainerData.additionalDetails[0].releaseAttachmnts = this.attachments;
        ContainerData.additionalDetails[0].remarks = this.releaseRemarks;
        ContainerData.additionalDetails[0].releasedBy=localStorage.getItem('LOGGEDINUSER');

        this.releaseContainerReqList.releaseList.push(ContainerData);
      }

      this.hrcservicesProvider.hnrcSaveReleaseDetails(this.releaseContainerReqList)
        .subscribe(response => {
            this.navCtrl.push(RchConfirmation,{
              hnrcReleaseCotainerHoldData: this.hnrcReleaseCotainerHoldData,
              fromSummary: this.fromSummary
            });
          },
          error => {
            this.presentAlert(this.alertHeadding,error[0].message);
          });
    }
    else {
      this.presentAlert("ALERT","Please attach files.");
    }
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

  cancel() {
    this.navCtrl.pop();
  }

  displayAttachment(attachment: ReleaseAttachmentDetailsSO) {
    this.hrcservicesProvider.openAttachment(attachment);
  }

  addAttachment() {
    if (this.attachments.length < 2) {
      this.attachments.push(new ReleaseAttachmentDetailsSO());
    } else {
      this.presentAlert('ALERT', 'You are not allowed to Upload more than 2 Attachments');
    }
  }

  closeAttachment(attachment: ReleaseAttachmentDetailsSO) {
    for (let i = 0; i < this.attachments.length; i++) {
      if (this.attachments[i] == attachment) {
        this.attachments.splice(i, 1);
        return;
      }
    }
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  parsedate(dtstring) {
    if (dtstring != null) {
      let pattern = /(\d{2})(\d{2})(\d{4})(\d{2})(\d{2})/;
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace(":", "");
      dtstring = dtstring.replace(" ", "");
      let date = new Date(dtstring.replace(pattern, '$3-$2-$1T$4:$5:00Z'));
      return date.toISOString();
    }
    else {
      return null;
    }
  }

  releaseEventChanged() {
    if(this.releaseEventSelected == 'ReleaseNow'){
      this.releaseNow= 'true';
      this.releaseLater = 'false';
    }
    else{
      this.releaseNow= 'false';
      this.releaseLater = 'true';
    }
  }

  onEndDateChanged() {
    setTimeout(() => {
      this.releaseDateTime = this.roundOffTime(this.releaseDateTime);
      this.autoReleaseDateTime = this.releaseDateTime;
      // this.minAutoReleaseDateTime = this.parsedate(this.releaseDateTime);
    }, 200);
  }

  roundOffTime(date) {
    let newDate;
    let minutes: number = (date.split("T")[1]).substr(3, 2);
    newDate = date.substr(0, date.indexOf(":") + 1) + '00' + date.substr(date.lastIndexOf(":"));
    if (minutes >= 30) {
      newDate = new Date(new Date(newDate).setHours(new Date(newDate).getHours() + 1)).toISOString();
    }
    return newDate;
  }

  setMinEndDate(date) {
    let newDate;
    newDate = date.substr(0, date.indexOf(":") + 1) + '00' + date.substr(date.lastIndexOf(":"));
    newDate = new Date(new Date(newDate).setHours(new Date(newDate).getHours() + 1)).toISOString();
    return newDate;
  }

}
