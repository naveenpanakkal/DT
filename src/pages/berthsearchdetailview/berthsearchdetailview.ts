import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Content, AlertController, Slides} from 'ionic-angular';
import {BerthServicesProvider} from "../../providers/webservices/berthservices";
import {BerthSearchDetailsReqModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsreq.model";
import {BerthSearchDetailsResultModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsresult.model";
import {BerthRegAttachSOModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthRegAttachSO.model";
import {BerthInfoDetlSOModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthInfoDetlSO.model";
import {BerthCargoDetlSOModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthCargoDetlSO.model";
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http'
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {WorkflowPage} from '../workflow/workflow';
import {BerthcomparisonPage} from '../berthcomparison/berthcomparison';
import {ExecuteactionPage} from "../executeaction/executeaction";
import {TerminalMasterReqModel} from "../../shared/model/berthsearchview/berthsearchdetails/terminalmasterreq.model";
import {TerminalMasterResultModel} from "../../shared/model/berthsearchview/berthsearchdetails/terminalmasterresult.model";
import {TranslateService} from "@ngx-translate/core";
import {BerthSearchViewPage} from "../berthsearchview/berthsearchview";
import {BerthSearchReqModel} from "../../shared/model/berthsearchview/berthsearchviewreq.model";
import {Utils} from "../../shared/utils";
/**
 * Generated class for the BerthsearchdetailviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-berthsearchdetailview',
  templateUrl: 'berthsearchdetailview.html',
  providers: [BerthSearchDetailsReqModel, BerthSearchDetailsResultModel,TerminalMasterReqModel,BerthSearchReqModel,Utils],
})
export class BerthsearchdetailviewPage {
  rotationNo: number;
  hideApproveButton: boolean;
  private agentinfo: boolean = true;
  private vesselinfo: boolean = false;
  private callinfo: boolean = false;
  private berthinginfo: boolean = false;
  private containerinfo: boolean = false;
  private cargoinfo: boolean = false;
  private cargodetails: boolean = false;
  private attachmentinfo: boolean = false;
  fromHistory: boolean;
  requestNo: string;
  berthStatus: string;
  attachments: BerthRegAttachSOModel[];
  berthingInfo: any[] = [];
  cargoInfo: BerthCargoDetlSOModel[];
  terminalInfo:TerminalMasterResultModel[];
  tab1Root: any;
  mainArray: any[];
  terminalname:string;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  selectedCategory: any;
  port:string;
  TimeZone:string="GST";
  @ViewChild(Content) content: Content;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bBerthSearchDetailsReqModel: BerthSearchDetailsReqModel,
              public berthSearchDetailsResultModel: BerthSearchDetailsResultModel, public berthServicesProvider: BerthServicesProvider,
              public alertCtrl: AlertController,public terminalMasterReqModel:TerminalMasterReqModel,public utils:Utils,
              public translate: TranslateService,public customFilter: BerthSearchReqModel) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.rotationNo = this.navParams.get('rotationNo');
    this.fromHistory = this.navParams.get('fromHistory');
    this.requestNo = this.navParams.get('requestNo');
    this.berthStatus = this.navParams.get('berthStatus');
    this.customFilter = this.navParams.get('filter');
    this.showLeftButton = false;
    this.showRightButton = true;
    this.selectedCategory = 'Agent Information';
  }
  ionViewWillEnter()
  {
    this.searchBerth();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BerthsearchdetailviewPage');
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

  hideCompare() {
    if (this.berthSearchDetailsResultModel.berthBookingStatus == "Approved" && (this.berthSearchDetailsResultModel.requestStatus == "Submitted"
        || this.berthSearchDetailsResultModel.requestStatus == "Pending")) {
      return false;
    } else {
      return true;
    }
  }

  seecomparison() {
    this.navCtrl.push(BerthcomparisonPage, {
      requestID: this.requestNo,
      rotationNumber: this.berthSearchDetailsResultModel.rotationNumber
    });
  }

  public filterData(category): void {
    console.log("Inside filter");
    if (category.heading == 'Agent Information') {
      this.content.scrollToTop(0);
      this.agentinfo = true;
      this.vesselinfo = false;
      this.callinfo = false;
      this.berthinginfo = false;
      this.containerinfo = false;
      this.attachmentinfo = false;
      this.cargoinfo = false;
      this.cargodetails = false;
      this.selectedCategory= "Agent Information";
    }
    else if (category.heading == 'Vessel Information') {
      this.content.scrollToTop(0);
      this.agentinfo = false;
      this.vesselinfo = true;
      this.callinfo = false;
      this.berthinginfo = false;
      this.containerinfo = false;
      this.attachmentinfo = false;
      this.cargoinfo = false;
      this.cargodetails = false;
      this.selectedCategory= "Vessel Information";
    }
    else if (category.heading == 'Call Information') {
      this.content.scrollToTop(0);
      this.agentinfo = false;
      this.vesselinfo = false;
      this.callinfo = true;
      this.berthinginfo = false;
      this.containerinfo = false;
      this.attachmentinfo = false;
      this.cargoinfo = false;
      this.cargodetails = false;
      this.selectedCategory= "Call Information";
    }
    else if (category.heading == 'Berthing Information') {
      this.content.scrollToTop(0);
      this.agentinfo = false;
      this.vesselinfo = false;
      this.callinfo = false;
      this.berthinginfo = true;
      this.containerinfo = false;
      this.attachmentinfo = false;
      this.cargoinfo = false;
      this.cargodetails = false;
      this.selectedCategory= "Berthing Information";
    }
    else if (category.heading == 'Container Information') {
      this.content.scrollToTop(0);
      this.agentinfo = false;
      this.vesselinfo = false;
      this.callinfo = false;
      this.berthinginfo = false;
      this.containerinfo = true;
      this.attachmentinfo = false;
      this.cargoinfo = false;
      this.cargodetails = false;
      this.selectedCategory= "Container Information";
    }
    else if (category.heading == 'Cargo Information') {
      this.content.scrollToTop(0);
      this.agentinfo = false;
      this.vesselinfo = false;
      this.callinfo = false;
      this.berthinginfo = false;
      this.containerinfo = false;
      this.attachmentinfo = false;
      this.cargoinfo = true;
      this.cargodetails = false;
      this.selectedCategory= "Cargo Information";
    }
    else if (category.heading == 'Cargo Details') {
      this.content.scrollToTop(0);
      this.agentinfo = false;
      this.vesselinfo = false;
      this.callinfo = false;
      this.berthinginfo = false;
      this.containerinfo = false;
      this.attachmentinfo = false;
      this.cargoinfo = false;
      this.cargodetails = true;
      this.selectedCategory= "Cargo Details";
    }
    else {
      this.content.scrollToTop(0);
      this.agentinfo = false;
      this.vesselinfo = false;
      this.callinfo = false;
      this.berthinginfo = false;
      this.containerinfo = false;
      this.attachmentinfo = true;
      this.cargoinfo = false;
      this.cargodetails = false;
      this.selectedCategory= "Attachments";
    }
  }
othersvisible(){
  if (this.berthSearchDetailsResultModel.additionalServices != null &&
  this.berthSearchDetailsResultModel.additionalServices.length >=0 &&
  this.berthSearchDetailsResultModel.additionalServices.endsWith("Others")){
    return false;
  }else
    return true;
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

  searchBerth() {
    console.log("Rotation No " + this.rotationNo);
    console.log("Request No " + this.requestNo);
    if (this.fromHistory) {
      this.bBerthSearchDetailsReqModel.requestID = this.requestNo;

    } else {
      this.bBerthSearchDetailsReqModel.rotationNumber = this.rotationNo;
    }
    console.log("Berth Details Request JSON : <<" + JSON.stringify(this.bBerthSearchDetailsReqModel) + ">>");
    this.berthServicesProvider.searchBerthByID(this.bBerthSearchDetailsReqModel)
      .subscribe(response => {
          console.log("Berth Details Response JSON : <<" + JSON.stringify(response) + ">>");
          this.berthSearchDetailsResultModel = <BerthSearchDetailsResultModel>response;
          this.hideApproveButton  = this.berthSearchDetailsResultModel.approverButton;
          this.attachments = <BerthRegAttachSOModel[]>(this.berthSearchDetailsResultModel.berthRegAttachSO);
          this.berthingInfo = <BerthInfoDetlSOModel[]>(this.berthSearchDetailsResultModel.berthInfoDetlSO);
          this.cargoInfo = <BerthCargoDetlSOModel[]>(this.berthSearchDetailsResultModel.berthCargoDetlSO);
          this.port=this.berthSearchDetailsResultModel.port;
          if(this.berthSearchDetailsResultModel.etd==null){
            this.berthSearchDetailsResultModel.estimantedStayHrs=null;
          }
           if(this.port!=null && this.port.length >0){
              this.terminalMasterReqModel.port=this.port;
            this.berthServicesProvider.getTerminalMasterData(this.terminalMasterReqModel)
            .subscribe(response => {
            this.terminalInfo=<TerminalMasterResultModel[]> (response);
            this.terminalname=this.terminalInfo[0].terminalName;
            },error => {
            var errorMessage = <any>error;
            //Show error message
            //dismiss loading
            });
          }
          this.populateTabs();
          this.getValues();

          this.selectedCategory = this.mainArray[0].heading;
          this.showLeftButton = false;
          this.showRightButton = this.mainArray.length > 2;
        },error => {
          var errorMessage = <any>error;
          //Show error message
          //dismiss loading
        });
  }
  getValues() {
    for (let i = 0; i < this.berthingInfo.length; i++) {
      if(this.berthingInfo[i].callReason!=null && this.berthingInfo[i].callReason.length>0)
      {
        this.translate.get(this.berthingInfo[i].callReason).subscribe(
          value => {
            this.berthingInfo[i].callReason = value;
          }
        );
      }
    }
    for (let i = 0; i < this.cargoInfo.length; i++) {
      if(this.cargoInfo[i].imdg!=null && this.cargoInfo[i].imdg.length>0) {
        this.translate.get(this.cargoInfo[i].imdg).subscribe(
          value => {
            this.cargoInfo[i].imdg = value;
          }
        );
      }
      if(this.cargoInfo[i].cargoType!=null && this.cargoInfo[i].cargoType.length>0) {
        this.translate.get(this.cargoInfo[i].cargoType).subscribe(
          value => {
            this.cargoInfo[i].cargoType = value;
          }
        );
      }
      if(this.cargoInfo[i].units!=null && this.cargoInfo[i].units.length>0) {
        this.translate.get(this.cargoInfo[i].units).subscribe(
          value => {
            this.cargoInfo[i].units = value;
          }
        );
      }
    }
    if(this.berthSearchDetailsResultModel.vesselPosition!=null && this.berthSearchDetailsResultModel.vesselPosition.length>0) {
      this.translate.get(this.berthSearchDetailsResultModel.vesselPosition).subscribe(
        value => {
          this.berthSearchDetailsResultModel.vesselPosition = value;
        }
      );
    }
    if(this.berthSearchDetailsResultModel.port!=null && this.berthSearchDetailsResultModel.port.length>0) {
      this.translate.get(this.berthSearchDetailsResultModel.port).subscribe(
        value => {
          this.berthSearchDetailsResultModel.port = value;
        }
      );
    }
    if(this.berthSearchDetailsResultModel.modeOfOperation!=null && this.berthSearchDetailsResultModel.modeOfOperation.length>0) {
      this.translate.get(this.berthSearchDetailsResultModel.modeOfOperation).subscribe(
        value => {
          this.berthSearchDetailsResultModel.modeOfOperation = value;
        }
      );
    }
 if(this.berthSearchDetailsResultModel.operationStatus!=null && this.berthSearchDetailsResultModel.operationStatus.length>0) {
      this.translate.get(this.berthSearchDetailsResultModel.operationStatus).subscribe(
        value => {
          this.berthSearchDetailsResultModel.operationStatus = value;
        }
      );
    }
  }

  populateTabs() {
    try {

      let containerPresent : boolean = false;
      let bothPresent : boolean = false;
      let cargoPresent:boolean=false;
      let searchResult : BerthInfoDetlSOModel;
      searchResult = this.berthingInfo.find(x =>x.callReason == 'CONTAINEROPERATION');
      if(searchResult){
          containerPresent = true;
      }
      searchResult = this.berthingInfo.find(x =>x.callReason == 'Both');
      if(searchResult){
         bothPresent = true;
      }
        searchResult = this.berthingInfo.find(x =>x.callReason == 'CARGOOPERATION(BreakBulk)');
       if(searchResult){
          cargoPresent = true;
      }
       if (bothPresent || (containerPresent && cargoPresent)) {
        let temp = [
          {id: 1, heading: 'Agent Information', showDetails: false},
          {id: 2, heading: 'Vessel Information', showDetails: false},
          {id: 3, heading: 'Call Information', showDetails: false},
          {id: 4, heading: 'Berthing Information', showDetails: false},
          {id: 5, heading: 'Container Information', showDetails: false},
          {id: 6, heading: 'Cargo Information', showDetails: false},
          {id: 7, heading: 'Cargo Details', showDetails: false},
          {id: 8, heading: 'Attachments', showDetails: false}
        ];
        this.mainArray = temp;
      }
      else if (containerPresent) {
        let temp = [
          {id: 1, heading: 'Agent Information', showDetails: false},
          {id: 2, heading: 'Vessel Information', showDetails: false},
          {id: 3, heading: 'Call Information', showDetails: false},
          {id: 4, heading: 'Berthing Information', showDetails: false},
          {id: 5, heading: 'Container Information', showDetails: false},
          {id: 6, heading: 'Attachments', showDetails: false}
        ];
        this.mainArray = temp;
      } else {
        let temp = [
          {id: 1, heading: 'Agent Information', showDetails: false},
          {id: 2, heading: 'Vessel Information', showDetails: false},
          {id: 3, heading: 'Call Information', showDetails: false},
          {id: 4, heading: 'Berthing Information', showDetails: false},
          {id: 5, heading: 'Cargo Information', showDetails: false},
          {id: 6, heading: 'Cargo Details', showDetails: false},
          {id: 7, heading: 'Attachments', showDetails: false}
        ];
        this.mainArray = temp;
      }
    } catch (exception) {
      let temp = [
        {id: 1, heading: 'Agent Information', showDetails: false},
        {id: 2, heading: 'Vessel Information', showDetails: false},
        {id: 3, heading: 'Call Information', showDetails: false},
        {id: 4, heading: 'Berthing Information', showDetails: false},
        {id: 5, heading: 'Attachments', showDetails: false}
      ];
      this.mainArray = temp;
    }

  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'bearer ' + localStorage.getItem('token'));
    headers.append('Content-Type', 'application/octet-stream');
  }

  openattach(attachment) {
    this.berthServicesProvider.openAttachment(attachment);
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

  showWorkflow() {
    this.navCtrl.push(WorkflowPage, {"requestID": this.requestNo,"workflowId": this.berthSearchDetailsResultModel.wrkflwId, "WFModule": "berth"});
  }

  onClickofAction() {
    this.navCtrl.push(ExecuteactionPage, {
      workFlowId: this.berthSearchDetailsResultModel.wrkflwId,
      requestNo: this.berthSearchDetailsResultModel.requestID,
      fromPage: "Berth",
      berthStatus: this.berthSearchDetailsResultModel.berthBookingStatus
    });
  }
   //--- Logic For Cancel
isAdmin(){
 if((this.berthSearchDetailsResultModel.clientCode==='toadmin')||
 (this.berthSearchDetailsResultModel.clientCode==='msadmin'))
 {
        	return true;
  }else
     return false;
 }
  isSameUser() {
    if (this.berthSearchDetailsResultModel && localStorage.getItem('CLIENT_CODE') ==
    this.berthSearchDetailsResultModel.clientCode) {
      return true;
    } else {
      return false;
    }
  }
  cancelStatus() {
    if(this.isAdmin()==false && this.isSameUser()){
      if (this.berthSearchDetailsResultModel.berthBookingStatus == "Cancelled") {
        return true;
      }else if (this.berthSearchDetailsResultModel.operationStatus=='Sailed'
        || this.berthSearchDetailsResultModel.operationStatus=='OperationStarted'
        || this.berthSearchDetailsResultModel.operationStatus=='OperationInProgress'
        || this.berthSearchDetailsResultModel.operationStatus=='OperationCompleted'){
        return true;
      }else if (this.berthSearchDetailsResultModel.berthBookingStatus == "Submitted" ||
            this.berthSearchDetailsResultModel.berthBookingStatus == "Pending") {
            if (this.berthSearchDetailsResultModel.requestStatus == "Submitted" ||
                     this.berthSearchDetailsResultModel.requestStatus == "Pending") {
            return false;
            }else{
              return true;
            }
      } else if (this.berthSearchDetailsResultModel.berthBookingStatus == "Approved") {
          if (this.berthSearchDetailsResultModel.requestStatus == "Submitted" ||
          this.berthSearchDetailsResultModel.requestStatus == "Rejected" ||
            this.berthSearchDetailsResultModel.requestStatus == "Pending") {
            return false;
          } else {
            return true;
          }
     } else if (this.berthSearchDetailsResultModel.berthBookingStatus == "Rejected") {
          if (this.berthSearchDetailsResultModel.requestStatus == "Cancelled" ||
          this.berthSearchDetailsResultModel.requestStatus == "Submitted" ||
          this.berthSearchDetailsResultModel.requestStatus == "Rejected" ) {
            return true;
          } else {
            return false;
          }
        }
    }else
          return true;
   }

   deleteberth() {
      if (this.berthSearchDetailsResultModel.operationStatus =='Berthed'){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Vessel is already in berthing stage so cancellation/deletion cannot be processed',
       buttons: [
        {
          text: 'OK',
          handler: () => {

           }
        }]
      });
      alert.present();
     }else{
      this.berthSearchDetailsResultModel.rotationNumber=null;
      let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'This action will cancel the Amendment request. Do you want to proceed?',
       buttons: [
        {
          text: 'OK',
          handler: () => {
            this.berthServicesProvider.CancelBerth(this.berthSearchDetailsResultModel)
              .subscribe(Response => {
                  if(Response.errorCode=='cancel2hours'){
                        let message=Response.errorMessage;
                        this.alertanddelete(message);
                      }else{
                         this.navCtrl.push(BerthSearchViewPage,
                        {
                          filter: this.customFilter
                        });
                      }
                  },
                error => {
                  var errorMessage = <any>error;
                  //Show error message
                  //dismiss loading
                });
          }
        }, {
          text: 'CANCEL',
          handler: () => {
         },
        }]

    });
    alert.present();
     }
  }
   alertanddelete(message){
      let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: message,
          buttons: [
            {
             text: 'OK',
              handler: () => {
                this.berthServicesProvider.CancelBerth(this.berthSearchDetailsResultModel)
                  .subscribe(Response => {
                          this.navCtrl.push(BerthSearchViewPage,
                        {
                          filter: this.customFilter
                        });
                    },
                    error => {
                      var errorMessage = <any>error;
                      //Show error message
                      //dismiss loading
                    });
              }
            }, {
              text: 'CANCEL',
              handler: () => {
            },
            }]

        });
        alert.present();
  }
}
