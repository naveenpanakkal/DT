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
import {SsrServiceProvider} from "../../../providers/webservices/ssrservices";
import {SsrSearchByIdResponseModal} from "../../../shared/model/ssr/searchbyidresponse.modal";
import {SsrSearchByIdRequestModal} from "../../../shared/model/ssr/searchbyidrequest.modal";
import {SsrApproverComponent} from "../../../components/ssrmodelpage/ssr-approver-details/ssr-approver";
import {SsrCostComponent} from "../../../components/ssrmodelpage/ssr-cost-container/ssr-cost";
import {SpecialServiceSubTypeReqModel} from "../../../shared/model/ssr/specialservicesubtypereq.model";
import {SpecialServiceSubTypeResponseModel} from "../../../shared/model/ssr/specialservicesubtyperesponse.model";
import {SSRAttachSOModel} from "../../../shared/model/ssr/ssrsearchresult.model";
import {WorkflowPage} from "../../workflow/workflow";
import {ExecuteactionPage} from "../../executeaction/executeaction";
import {SsrEditPage} from "../ssr-edit/ssredit";
import {SsrCancelContainerComponent} from "../../../components/ssrmodelpage/ssr-cancel-container/ssr-cancel-container";

/**SSRViewPage
 * Generated class for the SSRView page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ssrview',
  templateUrl: 'ssrview.html',
  providers: [Utils,SsrServiceProvider]
})

export class SsrViewPage {

  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  headerTitle:string;
  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }
  public tabs: Array<any>=[];
  public showTabs: Array<boolean> = [false, false, false, false, false];
  hidePreviousButton:boolean = false;
  hideNextButton:boolean = true;
  currentTabIndexForNavigation = 0;
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex=0;
  public ssrSearchResult:SsrSearchByIdResponseModal;
  public ssrsubtypeResult:SpecialServiceSubTypeResponseModel;
  @ViewChild(Slides) slides: Slides;
  locationList: any[] = [];
  spNameList: any[] = [];
  public ssrSearchRequest:SsrSearchByIdRequestModal=new SsrSearchByIdRequestModal();
  public ssrsubtypeRequest:SpecialServiceSubTypeReqModel=new SpecialServiceSubTypeReqModel();
  fromHistory: boolean = false;
  issearchbyIDsuccess:boolean=true;
  searchby:string;
  canCancel:boolean;
  canAmend:boolean;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public navParams: NavParams, public utils: Utils,
    public ssrServiceProvider:SsrServiceProvider) {
    this.ssrSearchRequest.ssrRequestNo = this.navParams.get('ssrrequestno');
    this.ssrSearchRequest.ssrRequestReqNo = this.navParams.get('ssrRequestReqNo');
    this.fromHistory = this.navParams.get('fromHistory');
    if(this.navParams.get('fromHistory')) {
      this.canCancel= navParams.get('cancancel');
      this.canAmend= navParams.get('canamend');
    }
    this.showRightSlideNav = false;
    this.showLeftButton = false;
   }
  ionViewDidLoad() {

  }
 ionViewWillEnter() {
    this.searchByIdRequest(this.ssrSearchRequest);
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

  public filterTabs(tab: string): void {
    if(this.selectedTab != tab){
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("ssr_tab1")) {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
      this.currentTabIndexForNavigation = 0;
    } else if (tab === this.utils.getLocaleString("ssr_tab2")) {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
      this.currentTabIndexForNavigation = 1;
    }else if (tab === this.utils.getLocaleString("ssr_tab3")) {
      this.resetShowTabs(2);
      this.slides.slideTo(2, 500);
      this.currentTabIndexForNavigation = 2;
    } else if (tab === this.utils.getLocaleString("ssr_tab4")) {
      this.resetShowTabs(3);
      this.slides.slideTo(3, 500);
      this.currentTabIndexForNavigation = 3;
    } else if (tab === this.utils.getLocaleString("ssr_tab5")) {
      this.resetShowTabs(4);
      this.slides.slideTo(4, 500);
      this.currentTabIndexForNavigation = 4;
    }
    this.selectedTab = tab;

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

  openSelecedTab(selectedIndex){
    if(this.selectedTabsIndex != selectedIndex)
    {
      this.selectedTabsIndex = selectedIndex;
    }else{
      this.selectedTabsIndex = -1;
    }
  }
   searchByIdRequest(ssrRequestNo:any){
    this.ssrServiceProvider.searchSsrByID(ssrRequestNo).subscribe(response=> {
      this.ssrSearchResult = <SsrSearchByIdResponseModal>response;
      if(!this.ssrSearchResult){
        this.issearchbyIDsuccess=false;
      }else{
        this.ssrsubtypeRequest.serviceMasterCode=this.ssrSearchResult.serviceMasterCode;
        this.ssrsubtypeRequest.specialServiceType=this.ssrSearchResult.specialServiceType;
        this.ssrServiceProvider.specialSubService(this.ssrsubtypeRequest).subscribe(response=> {
        this.ssrsubtypeResult = <SpecialServiceSubTypeResponseModel>response;
        this.searchByValue();
        this.populateTabs();
            },error =>{
          this.issearchbyIDsuccess=false;
        });
     // this.populateTabs();
      }
    },error =>{
      this.issearchbyIDsuccess=false;
    });
  }
  checkListIsNotEmpty(obj:any){
    if(obj === null|| obj === 'undefined' || obj === undefined)
    {
      return true;
    }
    return obj && obj !== 'null' && obj !== 'undefined' && obj.length === 0;
  }
   checkVisibility(obj:any){
    if(obj =="Y")
    {
      return false;
    }
    return true;
  }
  searchByValue(){
     if(this.ssrSearchResult.caNo !=null && this.ssrSearchResult.caNo !=""){
      this.searchby= this.utils.getLocaleString("ssr-ca");
    }else if(this.ssrSearchResult.doNo!=null && this.ssrSearchResult.doNo!=""){
      this.searchby= this.utils.getLocaleString("ssr_dono");
    }else if(!this.checkVisibility(this.ssrsubtypeResult.searchByContainer)){
      this.searchby= this.utils.getLocaleString("ssr-container-no");
    }
  }
  populateTabs() {
    switch(this.ssrSearchResult.serviceMasterCode){
    case this.utils.getLocaleString("ssr_vesselcode"):
            this.tabs = [
            this.utils.getLocaleString("ssr_tab1"),
            this.utils.getLocaleString("ssr_tab3"),
            this.utils.getLocaleString("ssr_tab5"),
          ];
          break;
    case this.utils.getLocaleString("ssr_containercode"):
          this.tabs = [
          this.utils.getLocaleString("ssr_tab1"),
          this.utils.getLocaleString("ssr_tab2"),
          this.utils.getLocaleString("ssr_tab5"),
          ];
          break;
    case this.utils.getLocaleString("ssr_doccode"):
          this.tabs = [
          this.utils.getLocaleString("ssr_tab1"),
          this.utils.getLocaleString("ssr_tab4"),
          this.utils.getLocaleString("ssr_tab5"),
          ];
          break;
    default :
          this.tabs = [
          this.utils.getLocaleString("ssr_tab1"),
      ];
    }
    this.resetShowTabs(0);
    this.selectedTab = this.tabs[0];
    this.showRightButton = this.tabs.length > 2;
  }

  openApproverModel(){
    let profileModal = this.modalCtrl.create(SsrApproverComponent,  {
      approvers:this.ssrsubtypeResult.approverData,
    });
    profileModal.present();
  }
  openCostModel(){
    let profileModal = this.modalCtrl.create(SsrCostComponent,  {

    });
    profileModal.present();
  }
   getAttachment(attachment: SSRAttachSOModel) {
    this.ssrServiceProvider.openAttachment(attachment);
  }
   workflowStatus() {
    if (this.fromHistory) {
      return false;
    } else {
      return true;
    }
  }
  seeWorkFlow() {
    this.navCtrl.push(WorkflowPage, {
      requestID: this.ssrSearchResult.ssrRequestReqNo,
      "workflowId": this.ssrSearchResult.wrkflwId,
      "WFModule": "ssr"
    });
  }
  loadAction() {
    if (this.ssrSearchResult && this.ssrSearchResult.approverButton) {
      return false;
    } else {
      return true;
    }
  }
  seeAction() {
    this.navCtrl.push(ExecuteactionPage,{
      workFlowId: this.ssrSearchResult.wrkflwId,
      rsbId: this.ssrSearchResult.ssrRequestReqNo,
      fromPage: "SSR",})
  }
  slideSelectedPrev()
  {

    if(this.currentTabIndexForNavigation > 0 )
    {
      this.currentTabIndexForNavigation = this.currentTabIndexForNavigation - 1
      this.filterTabs(this.tabs[this.currentTabIndexForNavigation]);
    }
    this.hideBottomNavButtons()

  }
  slideSelectedNext()
  {
    if(this.currentTabIndexForNavigation < 4 ) {
      this.filterTabs(this.tabs[this.currentTabIndexForNavigation + 1]);
    }
    this.hideBottomNavButtons()
  }
  hideBottomNavButtons(){
    if(this.currentTabIndexForNavigation > 0  &&  this.currentTabIndexForNavigation < 4)
    {
      this.hidePreviousButton = true;
      this.hideNextButton = true;
    }
    if(this.currentTabIndexForNavigation == 0 ) {
      this.hidePreviousButton = false;
      this.hideNextButton = true;
    }
    if(this.currentTabIndexForNavigation == 4) {
      this.hidePreviousButton = true;
      this.hideNextButton = false;
    }
  }
  hideEditButton():boolean{
    if(this.ssrSearchResult && this.canAmend){
       if(this.ssrSearchResult.approvedStatus=='Submitted' && this.ssrSearchResult.amendRequestStatus=='Submitted'){
          return false;
        }else if(this.ssrSearchResult.approvedStatus=='Rejected' && this.ssrSearchResult.amendRequestStatus=='Submitted'){
          return false;
        }else if(this.ssrSearchResult.approvedStatus=='Approved' && (this.ssrSearchResult.amendRequestStatus=='Submitted'
        ||this.ssrSearchResult.amendRequestStatus=='Rejected')){
          return false;
        }else{
          return true;
        }
    }else if(this.ssrSearchResult && this.ssrSearchResult.approvedStatus=='Approved'&& this.ssrSearchResult.appoverEditFlag=='Y'
        && (this.ssrSearchResult.serviceStatus!="Completed")){
        return false;
    }else{
      return true;
    }
  }
  editSSR(ssrSearchResult){
    this.navCtrl.push(SsrEditPage,{mode: 'edit',ssrrequestno:ssrSearchResult.ssrRequestNo,fromHistory: true});
  }
  hideCancelButton():boolean{
    if(this.ssrSearchResult){
      if(!this.ssrSearchResult.approverButton && this.canCancel){
        if(this.ssrSearchResult.serviceStatus=="Completed" ||this.ssrSearchResult.serviceStatus=="Declined"||
          this.ssrSearchResult.serviceStatus=="Work In Progress"){
          return true;
        }else if(this.ssrSearchResult.approvedStatus=='Submitted' && this.ssrSearchResult.amendRequestStatus=='Submitted'){
          return false;
        }else if(this.ssrSearchResult.approvedStatus=='Pending' && this.ssrSearchResult.amendRequestStatus=='Pending'){
          return false;
        }else if(this.ssrSearchResult.approvedStatus=='Rejected' && (this.ssrSearchResult.amendRequestStatus=='Submitted'
        ||this.ssrSearchResult.amendRequestStatus=='Pending')){
          return false;
        }else if(this.ssrSearchResult.approvedStatus=='Approved' && (this.ssrSearchResult.amendRequestStatus=='Submitted'
        ||this.ssrSearchResult.amendRequestStatus=='Pending'||this.ssrSearchResult.amendRequestStatus=='Rejected')){
          return false;
        }else{
          return true;
        }
      }else{
        return true;
      }
    }else{
      return true;
    }
  }
  cancelSSR(){
  let profileModal = this.modalCtrl.create(SsrCancelContainerComponent,  {
      requeststatus:this.ssrSearchResult.amendRequestStatus,
      ssrreqno:this.ssrSearchResult.ssrRequestReqNo,
      fromHistory:true,
    });
    profileModal.present();
  }
}
