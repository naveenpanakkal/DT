import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content, AlertController, Slides} from 'ionic-angular';
import {VesselIDSearchModel} from '../../shared/model/vesselsearchdetails/vesselidsearch.model';
import {VesselIDSearchResultModel} from '../../shared/model/vesselsearchdetails/vesselidsearchresult.model';
import {VesselIDRegAttachModel} from '../../shared/model/vesselsearchdetails/vesselidregattach.model';
import {ExecuteactionPage} from "../executeaction/executeaction";
import {SearchApprovedModel} from "../../shared/model/vesselsearchdetails/searchapproved.model";
import {VesselservicesProvider} from "../../providers/webservices/vesselservices";
import {VesselComparisonPage} from '../vesselcomparison/vesselcomparison';
import {WorkflowPage} from '../workflow/workflow';
import {FileOpener} from '@ionic-native/file-opener';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';
import {Headers, RequestOptions} from '@angular/http'
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {Utils} from "../../shared/utils";

/*
* ===========================================================================
* Copyright 2017 Dubai Trade.
* All Rights Reserved
* ===========================================================================
*
*  vesselview.ts file contains VesselViewPage class which holds functions to
*  populate the data, and handle the UI navigation logic for vessel view UI.
*  Vessel View page display the detailed information of a particular vessel registration
*  entry.
*
*/
@IonicPage()
@Component({
  selector: 'page-vesselviewpage',
  templateUrl: 'vesselview.html',
  providers: [VesselIDSearchModel, VesselIDSearchResultModel, VesselIDRegAttachModel, SearchApprovedModel,
    FileOpener, FileTransferObject, FileTransfer, File,Utils]
})
export class VesselViewPage {

  private vesseldetails: boolean = true;
  private vesselspec: boolean = false;
  private vesselowner: boolean = false;
  private vesselattach: boolean = false;

  vesselRegistrationId: any;
  requestNo: any;
  vesselApprovalImo: VesselIDSearchResultModel[];
  vessel: any = '';

  vesselType: any;
  @ViewChild(Slides) slides: Slides;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  mainArray: any[];

  isFabHidden: boolean;
  vesselStatus: string;
  alertMsg: string;
  alertTitle: string;
  alertHeadding: string;
  cancelText: string;
  alert: string;
  not_supported: string;
  unableToDownload: string;
  okText: string;
  okTextSmall: string;
  fromHistory: boolean;
  hideStatus: boolean;
  selectedCategory:any;

  attachments: VesselIDRegAttachModel[];
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public vesselSearchbyidrequestModel: VesselIDSearchModel, public vesselSearchbyidresultModel: VesselIDSearchResultModel,
              public vesselIDRegAttachModel: VesselIDRegAttachModel, public searchApprovedModel: SearchApprovedModel,
              public vesselServicesProvider: VesselservicesProvider, public alertCtrl: AlertController,
              private fileOpener: FileOpener, private transfer: FileTransfer, private fileTransfer: FileTransferObject,
              private file: File, public utils : Utils) {
    this.vesselRegistrationId = this.navParams.get(this.utils.getLocaleString("vessel_id"));
    this.requestNo = this.navParams.get(this.utils.getLocaleString("request_No"));
    this.vesselStatus = this.navParams.get(this.utils.getLocaleString("vessel_status"));
    this.fromHistory = this.navParams.get(this.utils.getLocaleString("from_history"));
    this.loadVesselDetails();

    this.mainArray = [
      {id: 1, heading: 'Vessel Details', showDetails: true},
      {id: 2, heading: 'Owner Details', showDetails: false},
      {id: 3, heading: 'Vessel Specs', showDetails: false},
      {id: 4, heading: 'Attachments', showDetails: false}
    ];
    this.selectedCategory = this.mainArray[0].heading;
    this.showLeftButton = false;
    this.showRightButton = this.mainArray.length > 2;
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = !this.slides.isEnd();
  }

// Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

// Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }

  public filterData(category): void {
    if (category.heading == 'Vessel Details') {
      this.vesselspec = true;
      this.vesseldetails = false;
      this.vesselowner = false;
      this.vesselattach = false;
      this.selectedCategory = "Vessel Details";
    }
    else if (category.heading == 'Owner Details') {
      this.vesselspec = false;
      this.vesseldetails = true;
      this.vesselowner = false;
      this.vesselattach = false;
      this.selectedCategory = "Owner Details";
    }
    else if (category.heading == 'Vessel Specs') {
      this.vesselspec = false;
      this.vesseldetails = false;
      this.vesselowner = true;
      this.vesselattach = false;
      this.selectedCategory = "Vessel Specs";

    }
    else if (category.heading == 'Attachments') {
      this.vesselspec = false;
      this.vesseldetails = false;
      this.vesselowner = false;
      this.vesselattach = true;
      this.selectedCategory = "Attachments";
    }
  }


  ionViewDidLoad() {

  }

  getfirstStyle() {
    if (this.vesseldetails) {
      return "5px solid #519CDC";
    }
    else {
      return "#387EF5";
    }
  }

  getfirsttextStyle() {
    if (this.vesseldetails) {
      return "#FFF";
    }
    else {
      return "#519CDC";
    }
  }

  getsecondStyle() {
    if (this.vesselowner) {
      return "5px solid #519CDC";
    }
    else {
      return "#387EF5";
    }
  }

  getsecondtextStyle() {
    if (this.vesselowner) {
      return "#FFF";
    }
    else {
      return "#519CDC";
    }
  }

  getthirdStyle() {
    if (this.vesselspec) {
      return "5px solid #519CDC";
    }
    else {
      return "#387EF5";
    }
  }

  getthirdtextStyle() {
    if (this.vesselspec) {
      return "#FFF";
    }
    else {
      return "#519CDC";
    }
  }

  getfourthStyle() {
    if (this.vesselattach) {
      return "5px solid #519CDC";
    }
    else {
      return "#387EF5";
    }
  }

  getfourthtextStyle() {
    if (this.vesselattach) {
      return "#FFF";
    }
    else {
      return "#519CDC";
    }
  }

  showWorkflow() {

    this.navCtrl.push(WorkflowPage, {
      "requestID": this.requestNo,
      "workflowId": this.vesselSearchbyidresultModel.wrkflwId,
      "WFModule": "vessel"
    });
  }


  seecomparison() {
    this.navCtrl.push(VesselComparisonPage, {registrationId: this.vesselRegistrationId});
  }

  seeaction() {
    this.navCtrl.setRoot(ExecuteactionPage);

  }

  firstpage() {
    this.content.scrollToTop(0);
    this.vesselspec = false;
    this.vesseldetails = true;
    this.vesselowner = false;
    this.vesselattach = false;

  }

  secondpage() {
    this.content.scrollToTop(0);
    this.vesselspec = false;
    this.vesseldetails = false;
    this.vesselowner = true;
    this.vesselattach = false;

  }

  thirdpage() {
    this.content.scrollToTop(0);
    this.vesselspec = true;
    this.vesseldetails = false;
    this.vesselowner = false;
    this.vesselattach = false;

  }

  fourthpage() {
    this.content.scrollToTop(0);
    this.vesselspec = false;
    this.vesseldetails = false;
    this.vesselowner = false;
    this.vesselattach = true;

  }

  show(attachment) {
    if (attachment.showdetails) {
      attachment.showdetails = false;
    }
    else {
      attachment.showdetails = true;
    }
  }

  geticon(attachment) {
    if (attachment.showdetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }

  }

  loadVesselDetails() {
    if (this.fromHistory) {
      this.vesselSearchbyidrequestModel.requestNo = this.requestNo;
    } else {
      this.vesselSearchbyidrequestModel.vesselRegistrationId = this.vesselRegistrationId;
    }
    this.vesselServicesProvider.searchVesselByID(this.vesselSearchbyidrequestModel)
      .subscribe(response => {
          this.vesselSearchbyidresultModel = <VesselIDSearchResultModel>response;
          if((this.vesselSearchbyidresultModel.active == 'Yes') || (this.vesselSearchbyidresultModel.active == 'No') ){
           //do nothing
          }
          else{
            this.vesselSearchbyidresultModel.active = "";
          }
          this.attachments = <VesselIDRegAttachModel[]>(this.vesselSearchbyidresultModel.vesselRegAttachs);
          this.vesselType = this.utils.getLocaleString(this.vesselSearchbyidresultModel.vesselType);
        });
  }

  showExecuteAction() {

    this.searchApprovedModel.vesselRegistrationId = this.vesselSearchbyidresultModel.vesselRegistrationId;
    this.searchApprovedModel.imoNo = this.vesselSearchbyidresultModel.imoNo;
    this.searchApprovedModel.clientCode = localStorage.getItem('CLIENT_CODE');

    this.vesselServicesProvider.searchApprovedImo(this.searchApprovedModel)
      .subscribe(response => {
          this.vesselApprovalImo = <VesselIDSearchResultModel[]> response;
          if (this.vesselApprovalImo && this.vesselApprovalImo[0] != null) {
             this.showMultipleImoAlert();
          } else {
            this.navExecuteAction();
          }
        });
  }

  showMultipleImoAlert() {



    this.alertMsg = this.utils.getLocaleString("alertMessage_vessel") + this.vesselSearchbyidresultModel.imoNo +
      this.utils.getLocaleString("continue_msg");
    this.alertTitle = this.utils.getLocaleString("confirm_box");
    this.cancelText = this.utils.getLocaleString("del-b");
    this.okText = this.utils.getLocaleString("ok_text");
    const alert = this.alertCtrl.create({
      title: this.alertTitle,
      message: this.alertMsg,
      buttons: [
        {
          text: this.cancelText,
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: this.okText,
          handler: () => {
            this.navExecuteAction();
          }
        }
      ]
    });
    alert.present();
  }

  navExecuteAction() {
    this.navCtrl.push(ExecuteactionPage, {
      workFlowId: this.vesselSearchbyidresultModel.wrkflwId,
      requestNo: this.requestNo, fromPage: "Vessel"
    });
  }

  loadAction() {
    if (this.vesselSearchbyidresultModel.approveStatus && this.vesselSearchbyidresultModel.wrkflwId) {
      return false;
    } else {
      return true;
    }
  }

  buttonStatus() {
    if (this.fromHistory) {
      return false;
    } else {
      return true;
    }
  }

  workflowStatus() {
    if (this.fromHistory) {
      return false;
    } else {
      return true;
    }
  }

  hideCompare() {
    if ((this.vesselStatus != null && this.vesselStatus != "Approved") || (this.vesselSearchbyidresultModel.vesselRegistrationStatus != null && this.vesselSearchbyidresultModel.vesselRegistrationStatus == "Approved")) {
      return true;
    } else {
      return false;
    }
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/octet-stream');
  }

  openattach(attachment) {

    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({headers: headers});
    let fileurl = ServiceConfig.DOWNLOAD_FILE + '/' + attachment.fileUploadId + '/' + attachment.fileName;
    let downloadurl = encodeURI(fileurl);
    var filename = attachment.fileName;
    let fileExt = filename.substr(filename.lastIndexOf('.') + 1);
    let MimeType = this.getMimeType(fileExt);
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.not_supported = this.utils.getLocaleString("file_format_not_support");
    this.unableToDownload = this.utils.getLocaleString("unable_to_download");
    this.okTextSmall = this.utils.getLocaleString("ok_text_small");
    this.fileTransfer.download(downloadurl, this.file.dataDirectory + '/' + attachment.fileName, true, options).then((entry) => {
      this.fileOpener.open(decodeURI(entry.toURL()), MimeType).then()
        .catch(err => {
            const alert = this.alertCtrl.create({
            title: this.alertHeadding,
            message: this.not_supported,
            buttons: [this.okTextSmall]
          });
          alert.present();
        });
    }, (error) => {
        const alert = this.alertCtrl.create({
        title: this.alertHeadding,
        message: this.unableToDownload,
        buttons: [this.okTextSmall]
      });
      alert.present();
    }).catch(err=>{
    });

  }

  private getMimeType(fileFormat: string) : string {
    let mimeFormat: string = 'application/' + fileFormat;
    if (fileFormat.toLowerCase() == "jpg" || fileFormat.toLowerCase() == "jfif" || fileFormat.toLowerCase() == "jpe"
      || fileFormat.toLowerCase() == "jpeg") {
      mimeFormat = "image/jpeg";
    }
    else if (fileFormat.toLowerCase() == "png" || fileFormat.toLowerCase() == "x-png") {
      mimeFormat = "image/png";
    }
    else if (fileFormat.toLowerCase() == "txt") {
      mimeFormat = "text/plain";
    }
    else if (fileFormat.toLowerCase() == "doc" || fileFormat.toLowerCase() == "dot" || fileFormat.toLowerCase() == "w6w"
      || fileFormat.toLowerCase() == "wiz" || fileFormat.toLowerCase() == "word") {
      mimeFormat = "application/msword";
    }
    else if (fileFormat.toLowerCase() == "xl" || fileFormat.toLowerCase() == "xla" || fileFormat.toLowerCase() == "xlb"
      || fileFormat.toLowerCase() == "xlc" || fileFormat.toLowerCase() == "xld" || fileFormat.toLowerCase() == "xlk"
      || fileFormat.toLowerCase() == "xll" || fileFormat.toLowerCase() == "xlm" || fileFormat.toLowerCase() == "xls"
      || fileFormat.toLowerCase() == "xlt" || fileFormat.toLowerCase() == "xlv" || fileFormat.toLowerCase() == "xlw") {
      mimeFormat = "application/excel";
    }
    else if (fileFormat.toLowerCase() == 'docx') {
      mimeFormat = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }
    else if (fileFormat.toLowerCase() == 'xlsx') {
      mimeFormat = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    else if (fileFormat.toLowerCase() == "ppt" || fileFormat.toLowerCase() == "pot" || fileFormat.toLowerCase() == "pps") {
      mimeFormat = "application/vnd.ms-powerpoint";
    }
    else if (fileFormat.toLowerCase() == "xls" || fileFormat.toLowerCase() == "pot" || fileFormat.toLowerCase() == "pps") {
      mimeFormat = "application/vnd.ms-excel";
    }
    else if(fileFormat.toLowerCase() == "xml"){
      mimeFormat = "text/xml";
    }

    return mimeFormat;
  }


}
