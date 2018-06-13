import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
  Slides,
  ViewController, Navbar, Content
} from 'ionic-angular';

import {Utils} from "../../shared/utils";
import {Keyboard} from "@ionic-native/keyboard";
import {VldsSearchResultListModel} from "../../shared/model/VLDS/vldssearchallresult-list.model";
import {noUndefined} from "@angular/compiler/src/util";
import {VldsSearchResultModel} from "../../shared/model/VLDS/vldssearchallresult.model";
import {VldsSummaryListModel} from "../../shared/model/VLDS/vldssummarylist.model";
import {ContainerDetailsModel} from "../../shared/model/containeracceptance/containerdetails.model";
import {VldsServiceProvider} from "../../providers/webservices/vldsservice";
import {VldsSearchReqModel} from "../../shared/model/VLDS/vldssearchallreq.model";
import {VldsDischargeListModel} from "../../shared/model/VLDS/vldsdischargelist.model";
import {VldsLoadListModel} from "../../shared/model/VLDS/vldsloadlist.model";
import {VldsRestowListModel} from "../../shared/model/VLDS/vldsrestowlist.model";
import {VesselloaddischargesummaryfilterPage} from "../vesselloaddischargesummaryfilter/vesselloaddischargesummaryfilter";
import {LoadDischargeMailPage} from "../../components/loaddischargemodal/loaddischargemail/loaddischargemail";
import {LoadDischargeDownloadPage} from "../../components/loaddischargemodal/loaddischargedownload/loaddischargedownload";
import {VoyagedetailsPage} from "../voyagedetails/voyagedetails";

/**ContainerAcceptanceModel
 * Generated class for the VesselloaddischargesummarydetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vesselloaddischargesummarydetails',
  templateUrl: 'vesselloaddischargesummarydetails.html',
  providers: [Utils,VldsServiceProvider,VldsSearchResultListModel,VldsSummaryListModel,
    VldsSearchResultModel,VldsSearchReqModel,VldsDischargeListModel,VldsLoadListModel,VldsRestowListModel]
})
export class VesselloaddischargesummarydetailsPage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  scrollHandler(event) { this.content.scrollTop = this.content.scrollTop; }
  @ViewChild(Slides) slides: Slides;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false, false];
  public openSlider: Array<boolean> = [false, false,false,false];

  public showRightSlideNav: boolean;
  public currentIndexSideNav:any;
  public dropDown:any;
  public vldsSearchResult:VldsSearchResultModel;
  public dischargeList: VldsDischargeListModel = new VldsDischargeListModel()
  public loadList: VldsLoadListModel= new VldsLoadListModel()
  public restowList: VldsRestowListModel= new VldsRestowListModel()
  public  vldsSearchReqModel:VldsSearchReqModel=new VldsSearchReqModel();
  public vldsSummaryList:VldsSummaryListModel[] = [];
  public vldsTerminalList:string[] = [];
  public vldsBoxAgentList:string[] = [];
  public selectedSummarylist:VldsSummaryListModel = new VldsSummaryListModel();
  public selectedDataForSlider:any;
  public summaryTerminalSlider :string;
  public selectedSummaryIndex: number = 0;
  private pdf: string = 'pdf';
  private csv: string = 'excel';
  constructor(public platform: Platform, public modalCtrl: ModalController,
              public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController, public vldsServiceProvider : VldsServiceProvider,
              public utils: Utils,
              public keyboard: Keyboard, private viewCtrl: ViewController) {
    this.vldsSearchResult = this.navParams.get('vldsSearchResult');
    this.loadSummaryData();
    this.resetShowTabs(0);
    this.tabs = ['Vessel Info', 'Summary', 'Discharge Details', 'Load Details', 'Restow Details'];
    this.selectedTab = this.tabs[0];
    this.currentIndexSideNav=2;
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.dropDown=false;
    this.showRightButton = this.tabs.length > 2;
    // this.selectedDataForSlider =[{actual20ft:'',
    // actual40ft:'',
    // actual40ftPlus:'',
    // actualTotal:'',
    // boxAgent:'',
    // desig:'',
    // lineCode:'',
    // planned20ft:'',
    // planned40ft:'',
    // planned40ftPlus:'',
    // plannedTotal:'',
    // rowHeading:'',
    // terminal:'',
    // total:''}];
  }
  loadSummaryData(){
    this.vldsSearchReqModel.rotationNoSrch = this.vldsSearchResult.rotationNoSrch;
    this.vldsSearchReqModel.vesselName=this.vldsSearchResult.vesselName;
    this.vldsSearchReqModel.vesselStatusSrch= this.vldsSearchResult.status;
    this.vldsSearchReqModel.atdFrmDateSrch=this.vldsSearchResult.aTDDateFrom;
    this.vldsSearchReqModel.atdToDateSrch=this.vldsSearchResult.aTDDateTo;
    this.vldsSearchReqModel.etaFromDateSrch=this.vldsSearchResult.eTADateFrom;
    this.vldsSearchReqModel.etaToDateSrch= this.vldsSearchResult.eTADateTo;
    this.summaryTerminalSlider='';
    this.vldsServiceProvider.vldsSearchByID(this.vldsSearchReqModel).subscribe(response=> {
      this.vldsSearchResult = response;
      this.vldsSummaryList=response.summaryList;
      this.dischargeList=response.dischargeList;
      this.loadList=response.loadList;
      this.restowList=response.restowList;
      this.createDisahcrgeDataArray(this.dischargeList)
      this.createLoadDataArray(this.loadList);
      this.createRestowDataArray(this.restowList);
      this.selectedSummarylist = this.vldsSummaryList[this.selectedSummaryIndex];
      if(null !=this.vldsSummaryList && this.vldsSummaryList.length > 0) {
        for(let i=0; i< this.vldsSummaryList.length; i++) {
          this.vldsTerminalList[i]= this.vldsSummaryList[i].terminalSum;
          this.vldsBoxAgentList[i]= this.vldsSummaryList[i].boxAgentSum;
        }
        this.vldsTerminalList =  Array.from(new Set(this.vldsTerminalList));
        this.vldsBoxAgentList =  Array.from(new Set(this.vldsBoxAgentList));
      }

    },error =>{
      this.dischargeList=null;
      this.loadList=null;
      this.restowList=null;
    });
  }
  public dischargeListPopDown:any;
  selectedTabsIndex=0;
  public currentopenDischargeListindex: number = 0;
  createDisahcrgeDataArray(dischargeList:any)
  {
    this.dischargeListPopDown=[];
    if(dischargeList=='undefined' || dischargeList==undefined)
    {
      return;
    }
    let dataFetchIndex = 0;
    while(!this.checkListIsNotEmpty(dischargeList[dataFetchIndex])) {
      let boxAgent = dischargeList[dataFetchIndex].boxAgentDis;
      let lineCode = dischargeList[dataFetchIndex].lineCodeDis;
      let terminal = dischargeList[dataFetchIndex].terminalDis;
      let currentDischargeList = [];
      let dischargeSubDetailsIndex = 0;
      currentDischargeList[dischargeSubDetailsIndex] = dischargeList[dataFetchIndex];
      dischargeSubDetailsIndex =  dischargeSubDetailsIndex + 1;
      dataFetchIndex = dataFetchIndex + 1;
      while(true)
      {
        currentDischargeList[dischargeSubDetailsIndex] = dischargeList[dataFetchIndex];
        if (dischargeList[dataFetchIndex].desigDis === "Total") {
          break;
        }
        dischargeSubDetailsIndex =  dischargeSubDetailsIndex + 1;
        dataFetchIndex = dataFetchIndex + 1;
      }
      this.dischargeListPopDown.push({
        boxAgent: boxAgent,
        lineCode: lineCode,
        terminal: terminal,
        currentDischargeList
      });
      dataFetchIndex = dataFetchIndex + 1;
    }
    return;
  }
  openDischargeDetailsSlideNav(openDischargeIndex:any){
    this.selectedTabsIndex=0;
    if(this.currentopenDischargeListindex != openDischargeIndex){
      this.currentopenDischargeListindex = openDischargeIndex;
    }else{
      this.currentopenDischargeListindex = -1;
    }
  }
  public loadListPopDown:any;
  public currentopenLoadListindex: number = 0;
  createLoadDataArray(loadList:any)
  {
    this.loadListPopDown=[];
    if(this.checkListIsNotEmpty(loadList))
    {
      return;
    }
    let dataFetchIndex = 0;
    while(!this.checkListIsNotEmpty(loadList[dataFetchIndex])) {
      let boxAgent = loadList[dataFetchIndex].boxAgentLd;
      let lineCode = loadList[dataFetchIndex].lineCodeLd;
      let terminal = loadList[dataFetchIndex].terminalLd;
      let currentLoadList = [];
      let loadSubDetailsIndex = 0;
      currentLoadList[loadSubDetailsIndex] = loadList[dataFetchIndex];
      loadSubDetailsIndex =  loadSubDetailsIndex + 1;
      dataFetchIndex = dataFetchIndex + 1;
      while(true)
      {
        currentLoadList[loadSubDetailsIndex] = loadList[dataFetchIndex];
        if (loadList[dataFetchIndex].desigLd === "Total") {
          break;
        }
        loadSubDetailsIndex =  loadSubDetailsIndex + 1;
        dataFetchIndex = dataFetchIndex + 1;
      }
      this.loadListPopDown.push({
        boxAgent: boxAgent,
        lineCode: lineCode,
        terminal: terminal,
        currentLoadList
      });
      dataFetchIndex = dataFetchIndex + 1;
    }
    return;
  }

  openLoadDetailsSlide(openLoadIndex:any){
    this.selectedTabsIndex=0;
    if(this.currentopenLoadListindex != openLoadIndex){
      this.currentopenLoadListindex = openLoadIndex;
    }else{
      this.currentopenLoadListindex = -1;
    }
  }
  public restowListPopDown:any;
  public currentopenRestowListindex: number = 0;
  createRestowDataArray(restowList:any)
  {
    this.restowListPopDown=[];
    if(this.checkListIsNotEmpty(restowList))
    {
      return;
    }
    let dataFetchIndex = 0;
    while(!this.checkListIsNotEmpty(restowList[dataFetchIndex])) {
      let boxAgent = restowList[dataFetchIndex].boxagentRes;
      let lineCode = restowList[dataFetchIndex].lineCodeRes;
      let terminal = restowList[dataFetchIndex].terminalRes;
      let currentRestowList = [];
      let restowSubDetailsIndex = 0;
      currentRestowList[restowSubDetailsIndex] = restowList[dataFetchIndex];
      restowSubDetailsIndex =  restowSubDetailsIndex + 1;
      dataFetchIndex = dataFetchIndex + 1;
      while(true)
      {
        currentRestowList[restowSubDetailsIndex] = restowList[dataFetchIndex];
        if (restowList[dataFetchIndex].designRes === "Total") {
          break;
        }
        restowSubDetailsIndex =  restowSubDetailsIndex + 1;
        dataFetchIndex = dataFetchIndex + 1;
      }
      this.restowListPopDown.push({
        boxAgent: boxAgent,
        lineCode: lineCode,
        terminal: terminal,
        currentRestowList
      });
      dataFetchIndex = dataFetchIndex + 1;
    }
    return;
  }

  openRestowDetailsSlide(openLoadIndex:any){
    this.selectedTabsIndex=0;
    if(this.currentopenRestowListindex != openLoadIndex){
      this.currentopenRestowListindex = openLoadIndex;
    }else{
      this.currentopenRestowListindex = -1;
    }
  }
  currentTab:string='';
  public filterTabs(tab: string): void {
    if(this.selectedTab != tab){
      this.selectedTabsIndex = 0;
      this.currentopenRestowListindex = 0;
      this.currentopenLoadListindex = 0;
      this.currentopenDischargeListindex = 0;
      this.selectedSummaryIndex = 0;
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
    if(this.currentIndexSideNav != 2)
    {
      this.closeSideNav(this.currentIndexSideNav,'');
    }
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
  // Method that open the Summary Details Slide
  openSummaryDetailsSlideNav(summaryIndex:any){
    // this.summaryTerminalSlider = this.vldsSummaryList[summaryIndex].terminalSum;
   this.selectedSummarylist = this.vldsSummaryList[summaryIndex];
  if(this.selectedSummaryIndex != summaryIndex)
 {
     this.selectedSummaryIndex = summaryIndex;
  }else{
    this.selectedSummaryIndex = -1;
  }
    //this.closeSideNav(0,'open');
  }
  // Method that open the Discharge Details Slide
  openDischargeSlideNav(summaryIndex:any){
    // this.summaryTerminalSlider = this.vldsSummaryList[summaryIndex].terminalSum;
    this.selectedDataForSlider = [];
    let dataFetchIndex = summaryIndex;
    while(true){
      this.selectedDataForSlider.push({
      actual20ft : this.dischargeList[dataFetchIndex].actual20ftDis,
      actual40ft : this.dischargeList[dataFetchIndex].actual40ftDis,
      actual40ftPlus : this.dischargeList[dataFetchIndex].actual40ftPlusDis,
      actualTotal : this.dischargeList[dataFetchIndex].actualTotalDis,
      boxAgent : this.dischargeList[dataFetchIndex].boxAgentDis,
      desig : this.dischargeList[dataFetchIndex].desigDis,
      lineCode : this.dischargeList[dataFetchIndex].lineCodeDis,
      planned20ft : this.dischargeList[dataFetchIndex].planned20ftDis,
      planned40ft : this.dischargeList[dataFetchIndex].planned40ftDis,
      planned40ftPlus : this.dischargeList[dataFetchIndex].planned40ftPlusDis,
      plannedTotal : this.dischargeList[dataFetchIndex].plannedTotalDis,
      rowHeading : this.dischargeList[dataFetchIndex].rowHeadingDis,
      terminal : this.dischargeList[dataFetchIndex].terminalDis,
      total : this.dischargeList[dataFetchIndex].totalDis,
      dropDownSelected:false});
      if(this.dischargeList[dataFetchIndex].desigDis==="Total")
      {
        break;
      }
      dataFetchIndex = dataFetchIndex+1;
    }
    this.closeSideNav(1,'open');
  }
  // Method that open the Restow Details Slide
  openRestowDetailsSlideNav(summaryIndex:any){
    // this.summaryTerminalSlider = this.vldsSummaryList[summaryIndex].terminalSum;
    this.selectedDataForSlider = [];
    let dataFetchIndex = summaryIndex;
    while(true){
      this.selectedDataForSlider.push({
        actual20ft : this.restowList[dataFetchIndex].actual20ftRes,
        actual40ft : this.restowList[dataFetchIndex].actual40ftRes,
        actual40ftPlus : this.restowList[dataFetchIndex].actual40ftPlusRes,
        actualTotal : this.restowList[dataFetchIndex].actualTotalRes,
        boxAgent : this.restowList[dataFetchIndex].boxagentRes,
        desig : this.restowList[dataFetchIndex].designRes,
        lineCode : this.restowList[dataFetchIndex].lineCodeRes,
        planned20ft : this.restowList[dataFetchIndex].planned20ftRes,
        planned40ft : this.restowList[dataFetchIndex].planned40ftRes,
        planned40ftPlus : this.restowList[dataFetchIndex].planned40ftPlusRes,
        plannedTotal : this.restowList[dataFetchIndex].plannedTotalRes,
        rowHeading : this.restowList[dataFetchIndex].rowHeadingRes,
        terminal : this.restowList[dataFetchIndex].terminalRes,
        total : this.restowList[dataFetchIndex].totalRes,
        dropDownSelected:false});
      if(this.restowList[dataFetchIndex].designRes==="Total")
      {
        break;
      }
      dataFetchIndex = dataFetchIndex+1;
    }
    this.closeSideNav(1,'open');
  }
  // Method that open the Load Details Slide
  openLoadDetailsSlideNav(summaryIndex:any){
    // this.summaryTerminalSlider = this.vldsSummaryList[summaryIndex].terminalSum;
    this.selectedDataForSlider = [];
    let dataFetchIndex = summaryIndex;
    while(true){
      this.selectedDataForSlider.push({
        actual20ft : this.loadList[dataFetchIndex].actual20ftLd,
        actual40ft : this.loadList[dataFetchIndex].actual40ftLd,
        actual40ftPlus : this.loadList[dataFetchIndex].actual40ftPlusLd,
        actualTotal : this.loadList[dataFetchIndex].actualTotalLd,
        boxAgent : this.loadList[dataFetchIndex].boxAgentLd,
        desig : this.loadList[dataFetchIndex].desigLd,
        lineCode : this.loadList[dataFetchIndex].lineCodeLd,
        planned20ft : this.loadList[dataFetchIndex].planned20ftLd,
        planned40ft : this.loadList[dataFetchIndex].planned40ftLd,
        planned40ftPlus : this.loadList[dataFetchIndex].planned40ftPlusLd,
        plannedTotal : this.loadList[dataFetchIndex].plannedTotalLd,
        rowHeading : this.loadList[dataFetchIndex].rowHeadingLd,
        terminal : this.loadList[dataFetchIndex].terminalLd,
        total : this.loadList[dataFetchIndex].totalLd,
        dropDownSelected:false});
      if(this.loadList[dataFetchIndex].desigLd==="Total")
      {
        break;
      }
      dataFetchIndex = dataFetchIndex+1;
    }
    this.closeSideNav(1,'open');
  }
  // Method that to check data is availbale in the discharge,restow,Load and summary pages
  checkListIsNotEmpty(obj:any){
    if(obj === null|| obj === 'undefined' || obj === undefined)
    {
      return true;
    }
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length === 0;
}
// Method that to remove Restow details sub header data
  checkrestowList(restowIndex:any){
    if(this.restowList[restowIndex].boxagentRes !== null
      && this.restowList[restowIndex].lineCodeRes !== null
      && this.restowList[restowIndex].terminalRes !== null){
      return true
    }
    else{
      return false;
    }
  }
  openSelecedTab(selectedIndex)
  {
    //(this.detailsArray.dropDownSelected=='true')? detailsArray.dropDownSelected='false':detailsArray.dropDownSelected='true';
    if(this.selectedTabsIndex != selectedIndex)
    {
      this.selectedTabsIndex = selectedIndex;
    }else{
      this.selectedTabsIndex = -1;
    }
  }
  // Method that to remove Load details sub header data
  checkLoadList(restowIndex:any){
    if(this.loadList[restowIndex].boxAgentLd !== null
      && this.loadList[restowIndex].lineCodeLd !== null
      && this.loadList[restowIndex].terminalLd !== null){
      return true
    }
    else{
      return false;
    }
  }
  // Method that to remove Discharge details sub header data
  checkDischargeList(restowIndex:any){
    if(this.dischargeList[restowIndex].boxAgentDis !== null
      && this.dischargeList[restowIndex].lineCodeDis !== null
      && this.dischargeList[restowIndex].terminalDis !== null){
      return true
    }
    else{
      return false;
    }
  }
  closeSideNav(index:any,val:any){
    this.selectedTabsIndex = 0;
    this.currentIndexSideNav=index;
    if ( val === 'open') {
      this.openSlider[index] = true;
    } else {
      this.openSlider[index] = false;
      this.currentIndexSideNav=2;
    }
  }
  getStatus(status : string) {
    if(status == "YettoArrive") {
      status = "Yet to Arrive";
    }
    return status;
  }
  navigateToMail() {
    this.navCtrl.push(LoadDischargeMailPage,{
      terminal_list: this.vldsTerminalList,
      agentList: this.vldsBoxAgentList,
      rotationNumber: this.vldsSearchResult.rotationNoSrch,
      line : this.vldsSearchResult.line
    });
  }

  navigateToDownload(mode:string) {
    this.navCtrl.push(LoadDischargeDownloadPage,{
      terminal_list: this.vldsTerminalList,
      agentList: this.vldsBoxAgentList,
      downloadMode : mode,
      rotationNumber: this.vldsSearchResult.rotationNoSrch,
      line : this.vldsSearchResult.line
    });
  }

  showInfoPopup() {
    let clientCode = localStorage.getItem('CLIENT_CODE');
    this.navCtrl.push(VoyagedetailsPage, {
      sel_rotationNo: this.vldsSearchResult.rotationNoSrch,
      sel_sameUser: clientCode,
      isOpenService: true
    });
  }
  containsValue(obj){
        if(obj === null|| obj === 'undefined' || obj === undefined  || obj ==='')
      {
        return false;
      }
     else{
          return true;
        }

}
  ionViewWillEnter() {
  }
  ionViewWillLeave() {
  }
  ionViewDidLoad() {
  }
}
