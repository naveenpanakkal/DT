import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, Navbar, NavController, NavParams, Platform, Slides} from 'ionic-angular';
import {ShipServSchedSearchDetailResultModel} from "../../shared/model/shipservsched/ssssearchdetailresult.model";
import {ShipServSchedSearchModel} from "../../shared/model/shipservsched/ssssearch.model";
import {SSSServiceProvider} from "../../providers/webservices/sssservices";
import {ShipServSchedPartnerLinesSOModel} from "../../shared/model/shipservsched/ssspartnerlinesSO.model";
import {ShipServSchedVesselSOModel} from "../../shared/model/shipservsched/sssVesselSO.model";
import {ShipServSchedPortOfCallSOModel} from "../../shared/model/shipservsched/sssportofcallSO.model";
import {ShipServSchedDetailsAttachSOModel} from "../../shared/model/shipservsched/sssscheduledetailsattachSO.model";
import {WorkflowPage} from "../workflow/workflow";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {Utils} from "../../shared/utils";
import {ShipServSchedGetUserDataModel} from "../../shared/model/shipservsched/sssgetuserdata.model";
import {ShipServSchedLocationSOModel} from "../../shared/model/shipservsched/sssLocationSO.model";
import {ShipServSchedFrequencySOModel} from "../../shared/model/shipservsched/sssfrequencySO.model";
import {ShipServSchedMonthSelectedSOModel} from "../../shared/model/shipservsched/sssmonthselectedSO.model";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {ShipServiceComparisonPage} from "../shipservschedcomparison/shipservschedcomparison";


/**
 * Generated class for the ShipServSchedDetailViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shipservscheddetailview',
  templateUrl: 'shipservscheddetailview.html',
  providers:[Utils,ShipServSchedSearchDetailResultModel,ShipServSchedSearchModel,ShipServSchedGetUserDataModel]
})
export class ShipServSchedDetailViewPage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  scrollHandler(event) { this.content.scrollTop = this.content.scrollTop; }
  @ViewChild(Slides) slides: Slides;

  public showLeftButton: boolean;
  public showRightButton: boolean;
  public alert : any;
  public selectedTab: any;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false, false];
  public openSlider: Array<boolean> = [false, false,false,false];
  public showRightSlideNav: boolean;
  public currentIndexSideNav:any;

  sssPartnerLinesList:ShipServSchedPartnerLinesSOModel[];
  sssVesselsInServiceList:ShipServSchedVesselSOModel[];
  sssPortOfCallList:ShipServSchedPortOfCallSOModel[];
  sssAttachmentList:ShipServSchedDetailsAttachSOModel[];
  sssLocationDataModelList: ShipServSchedLocationSOModel[];
  sssFrequencyOfCallList:ShipServSchedFrequencySOModel[];
  sssMonthSelectedList:ShipServSchedMonthSelectedSOModel[];

  fromPage:string;
  requestNumber:any;
  hideApproveButton:boolean;
  isApprover:boolean;
  approveHeader:string;
  isCancelled:boolean;
  locationName:string;
  already_done_msg:string;
  frequencyModeMonth:boolean;
  actionDone : any;
  frequencyModeYear:boolean;
  frequencyModeDay:boolean;
  definedSetListModel: DefinedsetresListModel[];
  frequencyList:DefinedSetResModel[];
  intervalDaysList:DefinedSetResModel[];
  monthsList:DefinedSetResModel[];
  intervalPeriodList:DefinedSetResModel[];

  constructor(public navCtrl: NavController,
              public plt:Platform,
              public navParams: NavParams,
              public sssSearchModel: ShipServSchedSearchModel,
              public sssServiceProvider:SSSServiceProvider,
              public sssSearchDetailResultModel:ShipServSchedSearchDetailResultModel,
              public utils:Utils,
              public alertCtrl:AlertController,
              public util: Utils,
              public sssGetUserDataModel: ShipServSchedGetUserDataModel,
              public commonServices: CommonservicesProvider
              ) {
    this.sssSearchModel = this.navParams.get('sssSearchModel');
    this.fromPage = this.navParams.get('fromPage');
    this.already_done_msg = this.util.getLocaleString('action_already_done');
    if(this.fromPage == 'history') {
      this.sssSearchModel = new ShipServSchedSearchModel();
      this.requestNumber = this.navParams.get('requestNo');
      this.sssSearchModel.shippingServiceScheduleNoSearch = this.requestNumber;
    }
    this.resetShowTabs(0);
    this.tabs = ['sssDetails','sssPartnerLines','sssVesselsInService','sssPortOfCallInService','sssAttachments'];
    this.selectedTab = this.tabs[0];
    this.currentIndexSideNav=2;
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.showRightButton = true;
    this.isApprover = false;
    this.hideApproveButton = true;
    this.approveHeader = this.utils.getLocaleString('sssApproveHeader');
    this.isCancelled = false;
    this.sssGetUserDataModel.userName = localStorage.getItem('LOGGEDINUSER');
    this.frequencyModeMonth = false;
    this.frequencyModeDay = false;
    this.frequencyModeYear = false;
    this.getDefinedSet();
  }

  ionViewWillEnter(){
    this.fetchDetailData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShipServSchedDetailViewPage');
  }

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['FREQUENCY_OF_CALLS', 'INTERVAL_DAYS', 'MONTHS','INTERVAL_PERIOD'];
    definedSetReqModel.lang = 'en';

    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {
            if (this.definedSetListModel[i].definedSetName == 'FREQUENCY_OF_CALLS') {
              this.frequencyList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'INTERVAL_DAYS') {
              this.intervalDaysList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'MONTHS') {
              this.monthsList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'INTERVAL_PERIOD') {
              this.intervalPeriodList = this.definedSetListModel[i].definedSetValues;
            }
          }
        },
        error => {
          //Show error message
        },
        () => {

        }
      );
  }

  fetchDetailData(){
    if('history' == this.fromPage) {
      this.sssServiceProvider.sssSearchByRequestID(this.sssSearchModel).subscribe(response => {
        this.sssSearchDetailResultModel = response;
      }, error => {

      },()=>{
        this.getLocationDetails();
        this.enableApproveButton();
        this.showCutOffTime();
        this.enableStatusLink();
        this.fillPartnerLineData();
        this.fillOnTheTable();
        this.fillVesselInServiceData();
        this.fillPortOfCallData();
        this.fillAttachmentData();
      });
    }
    else{
      this.sssServiceProvider.sssSearchByID(this.sssSearchModel).subscribe(response => {
        this.sssSearchDetailResultModel = response;
      }, error => {

      },()=>{
        this.getLocationDetails();
        this.showCutOffTime();
        this.enableStatusLink();
        this.fillPartnerLineData();
        this.fillOnTheTable();
        this.fillVesselInServiceData();
        this.fillPortOfCallData();
        this.fillAttachmentData();
      });
    }
  }
  fillPartnerLineData(){
    if(null != this.sssSearchDetailResultModel) {
      this.sssPartnerLinesList = this.sssSearchDetailResultModel.partnerLinesSos;
    }
  }
  fillVesselInServiceData(){
    if(null != this.sssSearchDetailResultModel){
      this.sssVesselsInServiceList = this.sssSearchDetailResultModel.vesselSo;
    }
  }
  fillPortOfCallData(){
    if(null != this.sssSearchDetailResultModel){
      this.sssPortOfCallList = this.sssSearchDetailResultModel.portOfCallSo;
    }
  }
  fillAttachmentData(){
    if(null != this.sssSearchDetailResultModel){
      this.sssAttachmentList = this.sssSearchDetailResultModel.scheduleDetailsAttachSo;
    }
  }

  fillOnTheTable(){
    if(null != this.sssSearchDetailResultModel){
      if(this.sssSearchDetailResultModel.frequencyOfCalls == 'Every Month'){
        this.frequencyModeMonth = true;
      }else if(this.sssSearchDetailResultModel.frequencyOfCalls == 'Every Day'){
        this.frequencyModeDay = true;
      }else if(this.sssSearchDetailResultModel.frequencyOfCalls == 'Every Year'){
        this.frequencyModeYear = true;
      }
      this.sssFrequencyOfCallList = this.sssSearchDetailResultModel.frequencySo;
    }
  }

  getMonthList(monthList:ShipServSchedMonthSelectedSOModel[]):string{
    let selectedMonths:string = "";
    for(let i=0;i<monthList.length;i++){
      selectedMonths = selectedMonths.concat(this.getMonth(monthList[i].monthValue));
      if(i < monthList.length - 1) {
        selectedMonths = selectedMonths.concat(', ');
      }
    }
    return selectedMonths;
  }

  getMonth(month:string):string {
    let selectedMonth: string = "";
    if(null != this.monthsList && this.monthsList.length > 0) {
      for (let i = 0; i < this.monthsList.length; i++) {
        if (this.monthsList[i].definedSetValueCode == month) {
          selectedMonth = this.monthsList[i].definedSetValueIntMessage;
          return selectedMonth;
        }
      }
    }
    return selectedMonth;
  }

  getIntervalPeriod(period:string):string{
   let intervalPeriod:string = "";
   if(null != this.intervalPeriodList && this.intervalPeriodList.length > 0) {
     for (let i = 0; i < this.intervalPeriodList.length; i++) {
       if (this.intervalPeriodList[i].definedSetValueCode == period) {
         intervalPeriod = this.intervalPeriodList[i].definedSetValueIntMessage;
         return intervalPeriod;
       }
     }
   }
   return intervalPeriod;
  }
  getIntervalDays(day:string):string {
    let intervalDay: string = "";
    if (null != this.intervalDaysList && this.intervalDaysList.length > 0) {
      for (let i = 0; i < this.intervalDaysList.length; i++) {
        if (this.intervalDaysList[i].definedSetValueCode == day) {
          intervalDay = this.intervalDaysList[i].definedSetValueIntMessage;
          return intervalDay;
        }
      }
    }
    return intervalDay;
  }
  public filterTabs(tab: string): void {
    setTimeout(() => {
      this.content.scrollToTop(50);
    if (tab === 'sssDetails') {
      this.resetShowTabs(0);
    } else if (tab === 'sssPartnerLines') {
      this.resetShowTabs(1);
    } else if (tab === 'sssVesselsInService') {
      this.resetShowTabs(2);
    } else if (tab === 'sssPortOfCallInService') {
      this.resetShowTabs(3);
    } else if (tab === 'sssAttachments') {
      this.resetShowTabs(4);
    }
    this.selectedTab = tab;
    if(this.currentIndexSideNav != 2)
    {
      this.closeSideNav(this.currentIndexSideNav,'');
    }
    }, 400);
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

  closeSideNav(index:any,val:any){
    this.currentIndexSideNav=index;
    if ( val === 'open') {
      this.openSlider[index] = true;
    } else {
      this.openSlider[index] = false;
      this.currentIndexSideNav=2;
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


  checkListIsNotEmpty(obj: any) {
    if (obj === null ||obj === 'undefined' || obj === undefined) {
      return true;
    }
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length === 0;
  }


  show(attachment) {
    if (attachment.showDetails) {
      attachment.showDetails = false;
    }
    else {
      attachment.showDetails = true;
    }
  }

  geticon(attachment) {
    if (attachment.showDetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }

  }

  openAttach(attachment){
    this.sssServiceProvider.openAttachment(attachment);
  }

  showActionButton() {
    if (this.fromPage) {
      return false;
    } else {
      return true;
    }
  }

  workflowStatus() {
    if (this.fromPage) {
      return false;
    } else {
      return true;
    }
  }

  hideCompare() {
    if (this.sssSearchDetailResultModel.regStatus){
      if(this.sssSearchDetailResultModel.regStatus == "Approved" &&
        this.sssSearchDetailResultModel.amendRequestStatus != "Approved") {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
    }
  }

  showWorkflow(){
    this.navCtrl.push(WorkflowPage, {"requestID": this.requestNumber,"workflowId": this.sssSearchDetailResultModel.wrkflwId, "WFModule": "sss"});
  }

  showCutOffTime(){
    if(null != this.sssSearchDetailResultModel && this.sssSearchDetailResultModel.canApprove) {
      this.isApprover = true;
    }else{
      this.isApprover = false;
    }
  }
 enableApproveButton(){
    if(null != this.sssSearchDetailResultModel && this.sssSearchDetailResultModel.canApprove) {
      if (this.sssSearchDetailResultModel.approveStatus && this.sssSearchDetailResultModel.statusView != 'Cancelled') {
        this.hideApproveButton = false;//show the approve button
      } else {
        this.hideApproveButton = true;//hide the approve button
      }
    }else{
      this.hideApproveButton = true;//Hide the approve button
    }
 }
  enableStatusLink(){
    if (null != this.sssSearchDetailResultModel &&
      'Cancelled' == this.sssSearchDetailResultModel.statusView &&
      "" != this.sssSearchDetailResultModel.cancelRemarks) {
      this.isCancelled = true;
    } else {
      this.isCancelled = false;
    }
  }
  onActionApprove(){
   /* this.navCtrl.push(ExecuteactionPage,{workFlowId: this.sssSearchDetailResultModel.wrkflwId,
      requestNo: this.sssSearchDetailResultModel.requestNo,
      fromPage: "sssHistoryPage",header:this.approveHeader})*/
    this.sssServiceProvider.sssIsApproved(this.sssSearchDetailResultModel)
      .subscribe(response =>{
        if(response)
        {
          this.navCtrl.push(ExecuteactionPage,{workFlowId: this.sssSearchDetailResultModel.wrkflwId,
            requestNo: this.sssSearchDetailResultModel.requestNo,
            fromPage: "sssHistoryPage",header:this.approveHeader})
        } else {
          this.actionDone = this.already_done_msg;
          this.presentAlert();
        }
      });
  }

  showComments(){
    if(null != this.sssSearchDetailResultModel) {
        this.alert = this.alertCtrl.create({
          title: this.utils.getLocaleString('sssCancelRemarks'),
          subTitle: this.sssSearchDetailResultModel.cancelRemarks,
          buttons: [
            {
              text: this.utils.getLocaleString('sss_ok_text')
            }],
          enableBackdropDismiss: false
        });
        this.alert.present();
      }
  }

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: this.actionDone,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            //this.navigateToView();
          },
        }],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  seeSsscomparison() {
    this.navCtrl.push(ShipServiceComparisonPage, {registrationId: this.sssSearchDetailResultModel.scheduleDetailsId});
  }

  getLocationDetails() {
    let locMap = new Map<string, string>();
    this.sssServiceProvider.sssGetLocationData(this.sssGetUserDataModel,false).subscribe(response => {
      this.sssLocationDataModelList = response.clientRegSpLocationSO;
      if (null != this.sssLocationDataModelList) {
        for (let i = 0; i < this.sssLocationDataModelList.length; i++) {
          if (this.sssLocationDataModelList[i].serviceProviderCode == 'SP' && this.sssLocationDataModelList[i].spLocationCode != null) {
            locMap.set(this.sssLocationDataModelList[i].spLocationCode, this.sssLocationDataModelList[i].spLocationName)
          }
        }
      }

    }, error => {
      //not handled
    }, () => {
          if(this.sssSearchDetailResultModel.location != null){
            this.locationName = locMap.get(this.sssSearchDetailResultModel.location);//Get the location name mapped to location code
          }
    });
  }
}
