import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  Content,
  IonicPage,
  ModalController,
  Navbar,
  NavController,
  NavParams,
  Slides,
  Alert,
  Platform
} from 'ionic-angular';
import {Utils} from "../../shared/utils";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {DefinedsetresListModel} from "../../shared/model/definedset/definedsetres-list.model";
import {DefinedSetResModel} from "../../shared/model/definedset/definedsetres.model";
import {LocationMasterModel} from "../../shared/model/locationmaster.model";
import {SubLocationMasterModel, SubLocationMasterReqModel} from "../../shared/model/sublocationmaster.model";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RBServiceProvider} from "../../providers/webservices/rbservices";
import {ServiceProviderReqModel} from "../../shared/model/rb/rbServiceProviderReq.modal";
import {ServiceProviderResponseModel} from "../../shared/model/rb/rbServiceProviderResponse.model";
import {
  ResBookingAttachments, RsbContainers, RsbResources,
  SaveUpdateReqModal
} from "../../shared/model/rb/rbSaveUpdateReq.modal";
import {ClientRegSpCodeTypeSOModal, ClientRegSpLocationSO} from "../../shared/model/rb/rbClientRegSpLocationSO.modal";
import {SearchByRotationReqModal} from "../../shared/model/rb/rbSearchByRotationReq.modal";
import {RBTerminalModal, SearchByRotationResponseModal} from "../../shared/model/rb/rbSearchByRotationResponse.modal";
import {Keyboard} from "@ionic-native/keyboard";
import {RotationMaster} from "../../shared/model/rb/rbRotationMaster";
import {RotationResultDetails} from "../../shared/model/rb/rbRotationResultDetails.modal";
import {RotationMasterResultModal} from "../../shared/model/rb/rbRotationMasterResult.modal";
import {RbAddContainerComponent} from "../../components/rbmodelpage/rb-add-container/rb-add-container";
import {ResourceMasterReqModal} from "../../shared/model/rb/rbResourceMasterReq.modal";
import {
  ResourceCategoryChargesMap,
  ResourceMasterResponseModal
} from "../../shared/model/rb/rbResourceMasterResponse.modal";
import {SearchByTerminal} from "../../shared/model/rb/rbSearchByTerminalReq.modal";
import {SearchTerminalResponse} from "../../shared/model/rb/rbSearchTerminalResult.modal";
import {CADOMasterReq} from "../../shared/model/rb/rbCADOMasterReq.modal";
import {CADOMasterResultDetails} from "../../shared/model/rb/rbCADOResultDetails.modal";
import {CADOMasterResultModal} from "../../shared/model/rb/rbCADOMasterResponse.modal";
import {ContainerDetailsResponseModal} from "../../shared/model/rb/rbContainerDetailsResponse.modal";
import {AcceptedContainers} from "../../shared/model/rb/rbContainerDetailsResponse.modal";
import {CSHBaseInfoAttachModel} from "../../shared/model/csh/cshbaseinfoattach.model";
import {RBSearchModelComponent} from "../../components/rbsearchmodel/rbsearchmodel";
import {RBSearchByIDReqModel} from "../../shared/model/rb/rbsearchbyidreq.model";
import {ValidateContainerModal} from "../../shared/model/rb/rbValidateContainer.modal";
import {RBviewPage} from "../rbview/rbview";
import {
  RBAttachmentDetailsModel, RBChargesListModal, RBContainerDetailsModel,
  RBResourceDetailsModel, RBResourceMasterListModel
} from "../../shared/model/rb/rbsearchbyidresult.model";
import {RBSearchByIDResultModel} from "../../shared/model/rb/rbsearchbyidresult.model";
import {DatePipe} from "@angular/common";
import {RBChargesComponent} from "../../components/rbmodelpage/rb-charges/rb-charges";

/**
 * Generated class for the TacreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-RBcreate',
  templateUrl: 'rbcreate.html',

  providers: [Utils, ServiceProviderReqModel, ServiceProviderResponseModel, SaveUpdateReqModal, RBAttachmentDetailsModel
    , RBServiceProvider, RotationMaster, RotationMasterResultModal, RotationResultDetails, SearchByRotationReqModal
    , SearchByRotationResponseModal, ResourceMasterReqModal, ResourceMasterResponseModal, SearchByTerminal,
    SearchTerminalResponse, CADOMasterReq, CADOMasterResultDetails, CADOMasterResultModal, ContainerDetailsResponseModal,
    AcceptedContainers, RsbResources, ValidateContainerModal, ResBookingAttachments, RBSearchByIDReqModel, RBSearchByIDResultModel]

})
export class RBcreatePage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  alertHeadding: string;
  ok_text: string;
  private isSuccess: boolean;
  sptype: string;
  sptypes: string[] = [];
  location: string;
  locations: string[] = [];
  spname: string;
  spnames: string[] = [];
  requestTypes: string[] = ['Vessel', 'Container'];
  servicestatus:string[] = [];
  spTerminals: string[] = [];
  public import: TradeType;
  public export: TradeType;
  public ts: TradeType;
  public tradetypes: Map<string, TradeType>;
  public searchby: Map<string, string>;
  private selectedResourceType: any;
  private selectedCategory: any;
  private selectedCategoryIndex: number;
  private selectedUnit: any;
  addContainer: boolean = true;
  selectContainer: boolean = true;
  caNo: boolean = true;
  daNo: boolean = true;
  containeradded: boolean = false;
  isApproveredit: boolean = false;
  isServiceProviderOn: boolean = false;
  isSpRemarks: boolean = false;
  showCANo: boolean;
  dateFormat: string = 'DD/MM/YYYY';
  dateTimeFormat: string = 'DD/MM/YYYY HH:mm GST';
  showDONo: boolean;
  isterminalselected: boolean = false;
  private tempAttachArray: any;
  private resourceCategory: ResourceCategoryChargesMap[];
  resourceFormArray: FormArray;
  istradeselected: boolean = false;
  containers: RBContainerDetailsModel[];
  accContainers: AcceptedContainers[];
  private resourceDirty: boolean = false;
  containerno: string;
  containernumbers: string[] = [];
  rejectedcontainers: string[] = [];
  private isError: boolean = false;
  showMandatory: boolean = true;
  public unregisterBackButtonAction: any;
  alertobj: Alert;
  alertback: Alert;
  showingPopup: boolean = false;
  spNameChanged: boolean = false;
  tradeTypeStatus:boolean = false;
  searchByStatus:boolean = false;

  scrollHandler(event) {
    this.content.scrollTop = this.content.scrollTop;
  }

  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;
  moveTypeOut: any;
  requestType: string = 'Select';
  groupOne: FormGroup;
  groupTwo: FormGroup;
  groupThree: FormGroup;
  groupFour: FormGroup;
  groupFive: FormGroup;
  groupSix: FormGroup;
  groupSeven: FormGroup;
  groupEight: FormGroup;
  attachmentsFormArray: FormArray;
  attachmentDirty: boolean = false;
  resultAttachments: RBAttachmentDetailsModel[] = [];
  attachments: ResBookingAttachments[] = [];
  tempattachments: ResBookingAttachments[] = [];
  currdate: string = new Date().toISOString();
  maxdate: string = new Date('2050-12-31').toISOString();
  maxsprovider: any;
  minsprovider: string;
  filterRotationArray: any;
  showRotationNo: boolean;
  searchbyRotation: any;
  rotationno: any;
  rotationInValid: any;
  maplist: any;
  resMapList:any;
  mode: string;
  @ViewChild(Slides) slides: Slides;

  public definedSetListModel: DefinedsetresListModel[];
  public requestTypeList: DefinedSetResModel[] = [];
  public moveTypeList: DefinedSetResModel[] = [];

  public locationModel: LocationMasterModel[] = [];
  public spNameModel: SubLocationMasterModel[] = [];
  public terminalDependents: RBTerminalModal[] = [];
  public rsbResources: RsbResources[] = [];

  locationList: any[] = [];
  spNameList: any[] = [];
  terminals: string[] = [];
  selectedTerminal: any;


  public validDays: number = 0;
  public saveUpdateReqModal: SaveUpdateReqModal;
  public clientRegSpLocationSO: ClientRegSpLocationSO[];
  public clientRegSpCodeTypeSO: ClientRegSpCodeTypeSOModal[];
  clientRegSpCodeTypeSOtemp: ClientRegSpLocationSO[];
  rotationResponseModal: RotationResultDetails[];
  rbChargeListModal: RBChargesListModal[];
  private resourceTypeList: string[][] =[];
  private categoryTypeList: string[][] = [];
  private unitOfMeasure: string[][] = [];
  private baseCharge: number;
  private additionalCharge: number;
  private otherCharge: number;
  private actualQuantity: number=0;
  private actualDuration: number=0;
  private sumCharges: number = 0;
  private total: number = 0;
  private totalCharge: string;
  private totalChargeValue: string;
  private quantity: number;
  private selectedDuration: number;
  private tax: string;
  private taxValue: string;
  private taxPercentage: number;
  private currentsum: number = 0;
  private charge: number = 0;
  private previousRequestType: string;
  private perRequestCharge: number;
  private perRequest: string;
  private perRequestValue: string;
  private resourceCategoryChargesMap: ResourceCategoryChargesMap[];
  private resourceMap: RsbResources[] = [];
  private prevSum: number[] = [];
  private resourceDetailModal: RBResourceDetailsModel[] = [];
  searchCAdetails: CADOMasterResultDetails[];
  searchDOdetails: CADOMasterResultDetails[];
  searchCAitem: CADOMasterResultDetails[];
  searchDOitem: CADOMasterResultDetails[];
  filterCAArray: any;
  filterDOArray: any;
  fromHistory: boolean = false;
  title: string;
  currentSearchID: RBSearchByIDReqModel = new RBSearchByIDReqModel();
  rbIdSearchResult: RBSearchByIDResultModel;
  resourceMasterData:RBResourceMasterListModel;
  rbSprovider: any;
  cusrefnoPattern:string = "^([a-zA-z0-9]{1,30})$";

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public utils: Utils,
              private commonServices: CommonservicesProvider,
              public keyboard: Keyboard,
              private alertCtrl: AlertController,
              private serviceProviderReqModel: ServiceProviderReqModel,
              private rotationMasterReqModal: RotationMaster,
              private rotationMasterResponseList: RotationMasterResultModal,
              private searchByRotationReqModal: SearchByRotationReqModal,
              private searchByRotationResponseModal: SearchByRotationResponseModal,
              private serviceProviderResponseModel: ServiceProviderResponseModel,
              private resourceMasterResponseModal: ResourceMasterResponseModal,
              private resourceMasterReqModal: ResourceMasterReqModal,
              private searchByTerminalreqmodal: SearchByTerminal,
              private searchTerminalResponsemodal: SearchTerminalResponse,
              private cadoMasterReqModal: CADOMasterReq,
              private cadoMasterResponseList: CADOMasterResultModal,
              private containerDetailsResponseModal: ContainerDetailsResponseModal,
              private acceptedContainers: AcceptedContainers,
              private rbServices: RBServiceProvider,
              private validatereq: ValidateContainerModal,
              public formBuilder: FormBuilder,
              public datepipe: DatePipe,
              public platform: Platform) {

    this.resetShowTabs(0);
    this.mode = this.navParams.get('mode');
    this.fromHistory = this.navParams.get('fromHistory');
    this.maxsprovider = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString();
    this.previousRequestType = "";
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.ok_text = this.utils.getLocaleString("ok_text");
    this.import = new TradeType("Import");
    this.export = new TradeType("Export");
    this.ts = new TradeType("T/S");
    this.tradetypes = new Map<string, TradeType>();
    this.tradetypes.set("Import", this.import);
    this.tradetypes.set("Export", this.export);
    this.tradetypes.set("T/S", this.ts);
    this.searchby = new Map<string, string>();
    this.containers = new Array<RBContainerDetailsModel>();
    this.total = 0;
    this.isServiceProviderOn = false;
    this.isSpRemarks = false;
    if(this.mode == "edit") {
      this.spNameChanged = false;
    } else {
      this.spNameChanged = true;
    }
    this.servicestatus = ['Work In Progress', 'Completed','Declined'];
    if (this.mode == "edit" && !this.fromHistory) {
      this.currentSearchID.rsbId = this.navParams.get('rsbId');
      this.searchbyidforedit();
      this.title = this.utils.getLocaleString("rb_edit_title")
    } else if (this.mode == "edit" && this.fromHistory) {
      this.currentSearchID.rsbReqId = this.navParams.get('rsbReqId');
      this.searchbyidforedit();
      this.title = this.utils.getLocaleString("rb_edit_title")
    }
    else {
      this.title = this.utils.getLocaleString("rb_create_title")
    }
    this.tabs = [
      this.utils.getLocaleString("rb_tab1")
    ];
    this.selectedTab = this.tabs[0];
    this.groupOne = formBuilder.group({
      requestType: ['', Validators.compose([Validators.required])]
    });

    this.groupTwo = formBuilder.group({
      rotationNo: ['', Validators.compose([Validators.maxLength(18), Validators.minLength(1), Validators.required])],
      terminal: ['', Validators.compose([Validators.required])],
      remarksVessel: ['', Validators.compose([Validators.maxLength(255), Validators.minLength(1)])],
    });
    this.groupThree = formBuilder.group({
      serviceProviderType: ['', Validators.compose([Validators.required])],
      locationContainer: ['', Validators.compose([Validators.required])],
      spName: ['', Validators.compose([Validators.required])],
      terminalContainer: ['', Validators.compose([Validators.required])],
      tradeTypeContainer: [''],
      searchByContainer: ['']
    });

    this.groupFour = formBuilder.group({
      resourceFormArray: this.formBuilder.array([])
    });

    this.resourceFormArray = this.groupFour.get('resourceFormArray') as FormArray;

    this.groupFive = this.formBuilder.group({
      attachmentsFormArray: this.formBuilder.array([])
    });
    this.groupSix = formBuilder.group({
      caNo: [''],
      doNo: [''],
      remarksContainer: ['']
    });
    this.groupSeven = formBuilder.group({
      cusReferenceNo: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(3),Validators.pattern(this.cusrefnoPattern), Validators.required])],
    });
    this.groupEight = formBuilder.group({
      serviceStatus: [''],
      serviceProvidedOn: [''],
      remarksSP: [''],
    });
    this.attachmentsFormArray = this.groupFive.get('attachmentsFormArray') as FormArray;
    this.getServiceProvider();
    this.saveUpdateReqModal = new SaveUpdateReqModal();
    this.rotationMasterReqModal.rotationNo = "";
    this.rotationMasterReqModal.vesselName = "";
  }


  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.backAlert();
    }
  }

  initializeBackButtonCustomHandler(): void {
    var backEvent = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      backEvent.backAlert();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }
  backpopup:boolean = false;
  backAlert() {
    if(this.backpopup == true){
      return;
    }

    if (this.showingPopup) {
      if (this.alertobj) {
        this.alertobj.dismiss()
        this.alertobj = null
        this.showingPopup = false;
      }
    }else{
      if(this.alertback == null){
        this.backpopup = true;
        this.alertback = this.alertCtrl.create({
          title: this.utils.getLocaleString("confirm_box"),
          subTitle: this.utils.getLocaleString("rb_backalert_msg"),
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.navCtrl.pop();
              this.backpopup = false;
            },
          },
            {
              text: 'Cancel',
              handler: () => {
               this.backpopup = false;
              },
            }],
          enableBackdropDismiss: false
        });
        if((this.groupOne.dirty || this.groupTwo.dirty || this.groupThree.dirty || this.groupFour.dirty
            || this.groupFive.dirty ||this.groupSix.dirty || this.groupSeven.dirty || this.groupEight.dirty || this.attachmentDirty||this.resourceDirty)) {
          this.alertback.present();
          this.alertback = null;
        } else {
          this.navCtrl.pop();
        }
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

  //For changing the tabs
  private changeTabs() {
    this.previousRequestType = this.saveUpdateReqModal.requestType;
    if (this.saveUpdateReqModal.requestType == 'Vessel') {
      this.getRotationMaster();
      this.resourceMasterReqModal.requestTypeCode = "VES";
      this.tabs = [
        this.utils.getLocaleString("rb_tab1"),
        this.utils.getLocaleString("rb_tab2"),
        this.utils.getLocaleString("rb_tab4"),
        this.utils.getLocaleString("rb_tab5"),
      ];
    } else if (this.saveUpdateReqModal.requestType == 'Container') {
      this.tabs = [
        this.utils.getLocaleString("rb_tab1"),
        this.utils.getLocaleString("rb_tab3"),
        this.utils.getLocaleString("rb_tab4"),
        this.utils.getLocaleString("rb_tab5"),
      ];
    }
  }

  //Method called when Request Type is changed
  private setRequestType() {
    //Setting the pop up for
    let alrt_obj = this.alertCtrl.create({
      title: this.utils.getLocaleString("alert"),
      subTitle: this.utils.getLocaleString("rb_change_type_alert"),
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.resourceMap = [];
          this.attachments = [];
          this.containers = [];
          this.containernumbers=[];
          this.terminals=[];
          this.locations = [];
          this.spnames = [];
          this.spTerminals = [];
          this.currentsum = 0;
          this.total = this.currentsum;
          this.totalChargeValue= "";
          this.perRequestValue = "";
          this.taxValue="";
          this.saveUpdateReqModal.rotationNo = null;
          this.saveUpdateReqModal.doNo = null;
          this.saveUpdateReqModal.caNo = null;
          this.saveUpdateReqModal.tradeTypeContainer = null;
          this.saveUpdateReqModal.searchByContainer = null;
          this.addContainer = true;
          this.selectContainer = true;
          this.isterminalselected = false;
          this.caNo = true;
          this.daNo = true;
          this.isError=false;
          this.clearFormArray(this.resourceFormArray);
          this.addRbList(0);
          this.clearFormArray(this.attachmentsFormArray);
          this.clearVesselInfo();
          this.clearContainerInfo();
          this.changeTabs();
          alrt_obj.dismiss();
        },
      },
        {
          text: 'Cancel',
          handler: () => {
            if (this.saveUpdateReqModal.requestType == 'Vessel') {
              this.saveUpdateReqModal.requestType = 'Container';
            } else if (this.saveUpdateReqModal.requestType == 'Container') {
              this.saveUpdateReqModal.requestType = 'Vessel';
            }
            alrt_obj.dismiss();
          },
        }],
      enableBackdropDismiss: false
    });
    //Alert will only be displayed if any data are entered
    if (this.previousRequestType != this.saveUpdateReqModal.requestType) {
      if ((null != this.saveUpdateReqModal.rotationNo && this.saveUpdateReqModal.rotationNo.toString().length > 0) ||
        (null != this.saveUpdateReqModal.serviceProviderType && this.saveUpdateReqModal.serviceProviderType.length > 0)) {
        setTimeout(() => {
          alrt_obj.present();
        }, 500);
      } else {
        this.changeTabs();
      }
    } else {
      this.changeTabs();
    }

    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    this.showRightButton = this.tabs.length > 2;
  }

  private getRequestTypeCode(requestType: string) {
    if (requestType == 'Vessel') {
      this.resourceMasterReqModal.requestTypeCode = "VES";
      this.resourceMasterReqModal.location = this.saveUpdateReqModal.locationVessel;
    } else {
      this.resourceMasterReqModal.requestTypeCode = "CON";
      this.resourceMasterReqModal.location = this.saveUpdateReqModal.locationContainer;
    }
  }

  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0 && this.tabs.length > 1;
    this.showRightButton = !this.slides.isEnd();

  }

  public filterTabs(tab: string): void {
    setTimeout(() => {
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === "General Information") {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
    } else if (tab === "Container Details") {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
    } else if (tab === "Vessel Information") {
      this.resetShowTabs(2);
      this.slides.slideTo(1, 500);
    } else if (tab === "Resource Booking") {
      this.resetShowTabs(3);
      this.slides.slideTo(3, 500);
    }
    else if (tab === "Attachments") {
      this.resetShowTabs(4);
      this.slides.slideTo(4, 500);
    }
    this.selectedTab = tab;
    }, 400);
  }

  resetShowTabs(val: number) {
    for (let i = 0; i < this.showTabs.length; i++) {
      if (val == i) {
        this.showTabs[i] = true;
      } else {
        this.showTabs[i] = false;
      }
      if(val==4){
        this.setAttachContainers();
      }
    }
  }

  isEditMode() {
    if (this.mode == "edit") {
      return true;
    } else {
      return false;
    }
  }

  isAdminEditMode() {
    if (this.isApproveredit == true && this.saveUpdateReqModal.serviceStatus == "Completed") {
      return false;
    } else {
      return true;
    }
  }

  isAdmin() {
    if (this.saveUpdateReqModal.approver == "Y" ) {
      return true;
    } else {
      return false;
    }
  }

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }

  uploadDocs(attachment: any) {
    this.rbServices.uploadDocuments()
      .then(data => {
        if (typeof data !== 'undefined' && data !== null) {
          attachment.fileName = data.fileName;
          attachment.fileUploadId = data.fileUploadId;
        }
      }, error => {

      });
  }

  openDocs(attachment: any) {
    this.rbServices.openAttachment(attachment);
  }

  addattachForm(docType: any, docNum: any, docIssueDate: any, docExpDate: any): FormGroup {
    return this.formBuilder.group({
      docType: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      docNum: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      docIssueDate: ['', Validators.compose([Validators.maxLength(255), Validators.minLength(3), Validators.required])],
      docExpDate: ['', Validators.compose([Validators.maxLength(255), Validators.minLength(3), Validators.required])],
    });
  }

  addAttachment() {
    this.attachmentDirty = true;
    this.attachments.push(new ResBookingAttachments());
    this.attachmentsFormArray.push(this.addattachForm('', '', '', ''));
  }

  closeAttachment(index) {
    this.attachmentDirty = true;
    this.attachments.splice(index, 1);
    this.attachmentsFormArray.removeAt(index);
    return;
  }

  setAttachContainers() {
    if (this.attachmentsFormArray.length > 0) {
      this.clearFormArray(this.attachmentsFormArray)
    }
    for (let i = 0; i < this.attachments.length; i++) {
      this.attachments[i].docIssueDate = this.parsedate(this.attachments[i].docIssueDate);
      this.attachments[i].docExpDate = this.parsedate(this.attachments[i].docExpDate);
      this.attachmentsFormArray.push(this.addattachForm(
        this.attachments[i].docType,
        this.attachments[i].docNum,
        this.attachments[i].docIssueDate,
        this.attachments[i].docExpDate,
      ));
    }
  }

  parsedate(dtstring) {
    if (dtstring != null && dtstring.length > 5) {
      let pattern = /(\d{2})(\d{2})(\d{4})/;
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace("/", "");
      let date = new Date(dtstring.replace(pattern, '$3-$2-$1'));
      return date.toISOString();
    }
    else {
      return null;
    }
  }

  openChargeDetails(index) {
    let addContainerModal;
    let baseChargeValue;
    let AddChargeValue;
    let otherCharge;
    if(this.mode=='edit'){
      if(null != this.resourceMap[index].baseCharge) {
        baseChargeValue = this.resourceMap[index].baseCharge;
      }else {
        baseChargeValue = this.baseCharge;
      }
      if(null != this.resourceMap[index].additionalCharges) {
        AddChargeValue = this.resourceMap[index].additionalCharges;
      } else {
        AddChargeValue = this.additionalCharge;
      }
      if(null != this.resourceMap[index].otherCharges) {
        otherCharge = this.resourceMap[index].otherCharges;
      } else {
        otherCharge = this.otherCharge;
      }
      addContainerModal = this.modalCtrl.create(RBChargesComponent, {
        resourceMap: this.resourceMap[index],
        baseCharge: baseChargeValue,
        additionalCharge: AddChargeValue,
        otherCharge: otherCharge
      });
    }else{
      addContainerModal = this.modalCtrl.create(RBChargesComponent, {
        resourceMap: this.resourceMap[index],
        baseCharge: this.resourceMap[index].baseCharge,
        additionalCharge: this.resourceMap[index].additionalCharges,
        otherCharge: this.resourceMap[index].otherCharges
      });
    }
    addContainerModal.onDidDismiss(data => {
    });
    addContainerModal.present();
  }

  onQuantityFocusChange(selectedTabIndex) {
    if (this.resourceMap[selectedTabIndex].quantity && this.utils.validate(this.resourceMap[selectedTabIndex].quantity, '^[1-9][0-9]*$')) {
      this.resourceMap[selectedTabIndex].quantity = null;
      return;
    }
  }

  onDurationFocusChange(selectedTabIndex) {
    if (this.resourceMap[selectedTabIndex].duration && this.utils.validate(this.resourceMap[selectedTabIndex].duration, '^[1-9][0-9]*$')) {
      this.resourceMap[selectedTabIndex].duration = null;
      return;
    }
  }
  onDocumentNoFocusChange(selectedTabIndex){
    if (this.attachments[selectedTabIndex].docNum && this.utils.validate(this.attachments[selectedTabIndex].docNum, '^[0-9a-zA-Z]*$')) {
      this.attachments[selectedTabIndex].docNum = null;
      return;
    }
  }
  onDocumentTypeFocusChange(selectedTabIndex){
    if (this.attachments[selectedTabIndex].docType && this.utils.validate(this.attachments[selectedTabIndex].docType, '^[0-9a-zA-Z]*$')) {
      this.attachments[selectedTabIndex].docType = null;
      return;
    }
  }
  keyboardClose() {
    this.keyboard.close();
  }

  keyUpValidate(e, format, model, index) {
    this.utils.keyUpValidate(e, format);
    if (model == 'rotationno') {
      this.saveUpdateReqModal.rotationNo = e.target.value;
    }
    else if (model == 'cusReferenceNo') {
      this.saveUpdateReqModal.cusReferenceNo = e.target.value;
    }
    else if (model == 'doNo') {
      this.saveUpdateReqModal.doNo = e.target.value;
    }
    else if (model == 'caNo') {
      this.saveUpdateReqModal.caNo = e.target.value;
    }
    else if (model == 'quantity') {
      this.resourceMap[index].quantity = e.target.value;
    }
    else if (model == 'duration') {
      this.resourceMap[index].duration = e.target.value;
    }
    else if (model == 'actualQuantity') {
      this.resourceMap[index].actualQuantity = e.target.value;
    }
    else if (model == 'actualDuration') {
      this.resourceMap[index].actualDuration = e.target.value;
    }
    else if (model == 'docType') {
      this.attachments[index].docType = e.target.value;
    }
    else if (model == 'docNum') {
      this.attachments[index].docNum = e.target.value;
    }
  }

  checkRotation() {
    if (null != this.rotationno && this.rotationno.toString().length <= 18) {
      this.rotationInValid = false;
    }
    this.terminals=[];
    this.clearVesselInfo();
    this.resetresourceBooking();
    this.clearFormArray(this.resourceFormArray);
  }

  //Defining the Selection process for the rotation number
  setRotationNumber(item: any) {
    this.showRotationNo = false;
    this.saveUpdateReqModal.rotationNo = item.rotationNoSrch;
  }
resetresourceBooking(){
    this.currentsum = 0;
    this.total = this.currentsum;
    this.tax = "";
    this.taxValue = "";
    this.perRequest= "";
    this.perRequestValue= "";
    this.totalCharge="";
    this.totalChargeValue="";
    this.saveUpdateReqModal.category = "";
    this.saveUpdateReqModal.unitOfMeasure = "";
    this.saveUpdateReqModal.quantity = "";
    this.saveUpdateReqModal.duration = "";
    this.saveUpdateReqModal.actualQuantity = "";
    this.saveUpdateReqModal.actualDuration = "";
    this.resourceMap = [];
}
  openRBAddContainer() {
    let addContainerModal = this.modalCtrl.create(RbAddContainerComponent, {
      tradetype: this.saveUpdateReqModal.tradeTypeContainer,
      location: this.saveUpdateReqModal.locationContainer,
      spname: this.saveUpdateReqModal.spName,
      terminal: this.saveUpdateReqModal.terminalContainer,
      mode: 'create',
    });
     let j=0;
    if(this.containernumbers && this.containernumbers.length >0 ){
      j=this.containernumbers.length;
    }
    addContainerModal.onDidDismiss(data => {
      if (null != data) {
        if (null != data.containers.rejectedContainers[0]) {
          let message = '<p>The container no(s) are not available</p> <ul>';
          for (let i = 0; i < data.containers.rejectedContainers.length; i++) {
            this.rejectedcontainers[i] = data.containers.rejectedContainers[i];
            message = message + ' ' + '<li>' + this.rejectedcontainers[i] + '</li>';
          }
          message = message + '</ul>';
          this.presentAlert(this.alertHeadding, message);
        }
        if (null != data.containers.acceptedContainers[0]) {
          this.containeradded = true;
          this.containerDetailsResponseModal = data.containers;
          for (let i = 0; i < this.containerDetailsResponseModal.acceptedContainers.length; i++) {
            this.containerno = this.containernumbers.find(x => x == this.containerDetailsResponseModal.acceptedContainers[i].containerNo);
            if (!this.containerno) {
              this.containernumbers[j] = this.containerDetailsResponseModal.acceptedContainers[i].containerNo;
              this.containers.push(this.containerDetailsResponseModal.acceptedContainers[i]);
            }
          }
        }
      }
    });
    addContainerModal.present();

  }

  openSelectContainer() {
    let selectContainerModal = this.modalCtrl.create(RBSearchModelComponent, {
      caNo: this.saveUpdateReqModal.caNo,
      doNo: this.saveUpdateReqModal.doNo,
      location: this.saveUpdateReqModal.locationContainer,
      spname: this.saveUpdateReqModal.spName,
      terminal: this.saveUpdateReqModal.terminalContainer,
      mode: 'create',
    });
    let j=0;
    if(this.containernumbers && this.containernumbers.length >0 ){
      j=this.containernumbers.length;
    }
    selectContainerModal.onDidDismiss(data => {
      if (null != data.containers || this.containers.length > 0) {
        this.containeradded = true;
        this.accContainers = data.containers;
        for (let i = 0; i < this.accContainers.length; i++) {
          this.containerno = this.containernumbers.find(x => x == this.accContainers[i].containerNo);
          if (!this.containerno) {
            this.containernumbers[j] = this.accContainers[i].containerNo;
            this.containers.push(this.accContainers[i]);
          }
        }
      }
    });
    selectContainerModal.present();

  }

  selectRotationNo(item: any) {
    setTimeout(() => {
      if (this.utils.validate(this.saveUpdateReqModal.rotationNo, '^[1-9][0-9]{1,18}$')) {
        this.saveUpdateReqModal.rotationNo = null;
        this.showRotationNo = false;
        this.presentAlert(this.alertHeadding, this.utils.getLocaleString("invalid_rotation_number"));
      } else {
        this.showRotationNo = false;
        this.searchByRotationReqModal.rotationNumberSearch = this.saveUpdateReqModal.rotationNo;
        this.searchbyRotation = new Array<SearchByRotationResponseModal>();
        if (this.saveUpdateReqModal.rotationNo != null && this.saveUpdateReqModal.rotationNo != "") {
          this.rbServices.searchTerminalByRotation(this.searchByRotationReqModal)
            .subscribe(response => {
                this.searchbyRotation = <SearchByRotationResponseModal>response;
                if (null == this.searchbyRotation.rotationNumber) {
                  this.saveUpdateReqModal.rotationNo = null;
                  this.presentAlert(this.alertHeadding, this.utils.getLocaleString("invalid_rotation_number"));
                } else {
                  this.saveUpdateReqModal.vesselName = this.searchbyRotation.vesselName;
                  this.saveUpdateReqModal.locationVessel = this.searchbyRotation.locationVessel;
                  this.saveUpdateReqModal.vesselStatus = this.searchbyRotation.vesselStatus;
                  this.saveUpdateReqModal.cutOffTime = this.searchbyRotation.cutOffTime;
                  this.saveUpdateReqModal.eta = this.searchbyRotation.eta;
                  for (let i = 0; i < this.searchbyRotation.terminals.length; i++) {
                    this.terminals[i] = this.searchbyRotation.terminals[i];
                  }
                  this.selectedTerminal = this.terminals[0];
                  this.terminalDependents = this.searchbyRotation.terminalDependents;
                  this.saveUpdateReqModal.terminal = this.selectedTerminal;
                  this.saveUpdateReqModal.terminalOperator = this.searchbyRotation.terminalDependents[this.selectedTerminal].terminalOperator;
                  this.saveUpdateReqModal.prefBerth = this.searchbyRotation.terminalDependents[this.selectedTerminal].prefBerth;
                  this.isSuccess = true;
                  this.getResourceMaster(null);
                }
              },
              error => {
                this.isSuccess = false;
                var errorMessage = <any>error;
              });
        }
      }
    }, 500);
  }

  searchCA() {
    setTimeout(() => {
      this.cadoMasterReqModal.caNo = this.saveUpdateReqModal.caNo;
      this.cadoMasterReqModal.createdFrom = "";
      this.cadoMasterReqModal.createdTo = "";
      this.cadoMasterReqModal.locationContainer = this.saveUpdateReqModal.locationContainer;
      this.cadoMasterReqModal.rotationNo = "";
      this.cadoMasterReqModal.spName = this.saveUpdateReqModal.spName;
      this.cadoMasterReqModal.terminalContainer = this.saveUpdateReqModal.terminalContainer;
      this.cadoMasterReqModal.vesselName = "";

      this.searchCAitem = new Array<CADOMasterResultDetails>();
      if (this.saveUpdateReqModal.caNo != null && this.saveUpdateReqModal.caNo != "") {
        this.rbServices.rbCAMaster(this.cadoMasterReqModal)
          .subscribe(response => {
              this.cadoMasterResponseList = <CADOMasterResultModal>response;
              this.searchCAitem = this.cadoMasterResponseList.list;
              if (this.searchCAitem.length == 0) {
                this.selectContainer = true;
                this.showCANo = false;
                this.presentAlert(this.alertHeadding, this.utils.getLocaleString("rb_invalid_ca"));
                this.saveUpdateReqModal.caNo = "";
              } else {
                this.selectContainer = false;
                this.showCANo = false;
              }
            },
            error => {
              var errorMessage = <any>error;
            });
      } else {
        this.selectContainer = true;
        this.showCANo = false;
      }
    }, 500);
  }

  searchDO() {
    setTimeout(() => {
      this.cadoMasterReqModal.doNo = this.saveUpdateReqModal.doNo;
      this.cadoMasterReqModal.createdFrom = "";
      this.cadoMasterReqModal.createdTo = "";
      this.cadoMasterReqModal.locationContainer = this.saveUpdateReqModal.locationContainer;
      this.cadoMasterReqModal.rotationNo = "";
      this.cadoMasterReqModal.spName = this.saveUpdateReqModal.spName;
      this.cadoMasterReqModal.terminalContainer = this.saveUpdateReqModal.terminalContainer;
      this.cadoMasterReqModal.vesselName = "";

      this.searchDOitem = new Array<CADOMasterResultDetails>();
      if (this.saveUpdateReqModal.doNo != null && this.saveUpdateReqModal.doNo != "") {
        this.rbServices.rbDOMaster(this.cadoMasterReqModal)
          .subscribe(response => {
              this.cadoMasterResponseList = <CADOMasterResultModal>response;
              this.searchDOitem = this.cadoMasterResponseList.list;
              if (this.searchDOitem.length == 0) {
                this.selectContainer = true;
                this.showDONo = false;
                this.presentAlert(this.alertHeadding, this.utils.getLocaleString("rb_invalid_do"));
                this.saveUpdateReqModal.doNo = "";
              } else {
                this.selectContainer = false;
                this.showDONo = false;
              }
            },
            error => {
              var errorMessage = <any>error;
            });
      } else {
        this.selectContainer = true;
        this.showDONo = false;
      }
    }, 500);
  }

  checkDO() {
    if (this.saveUpdateReqModal.doNo == "") {
      this.selectContainer = true;
    }
  }

  checkCA() {
    if (this.saveUpdateReqModal.caNo == "") {
      this.selectContainer = true;
    }
  }

  terminalChange(event: Event) {
    setTimeout(() => {
    this.selectedTerminal = event;
    this.terminalDependents = this.searchbyRotation.terminalDependents;
    this.saveUpdateReqModal.terminalOperator = this.searchbyRotation.terminalDependents[this.selectedTerminal].terminalOperator;
    this.saveUpdateReqModal.prefBerth = this.searchbyRotation.terminalDependents[this.selectedTerminal].prefBerth;
    }, 400);
  }


  presentAlert(title: string, message: string) {

    if (this.alertobj) {
      this.alertobj.dismiss();
      this.alertobj = null;
    }
    this.showingPopup = true;
 setTimeout(() => {
    this.alertobj = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: 'Dismiss',
        handler: () => {
          if(message.includes("Service Provided On date should be between request creation date and current sysdate")){
            this.slides.slideTo(0, 500);
            this.resetShowTabs(0);
            this.selectedTab = this.tabs[0];
          }
          if (message.includes("The container no(s)") || message == this.utils.getLocaleString("rb_invalid_do")
            || message == this.utils.getLocaleString("rb_invalid_ca")) {
            this.slides.slideTo(1, 500);
            this.resetShowTabs(1);
            this.selectedTab = this.tabs[1];
          }else if(message ==this.utils.getLocaleString("invalid_rotation_number")){
            this.slides.slideTo(1, 500);
            this.resetShowTabs(2);
            this.selectedTab = this.tabs[1];
          }
          else if (!this.groupOne.valid || !this.groupSeven.valid || !this.groupEight.valid) {
            this.slides.slideTo(0, 500);
            this.resetShowTabs(0);
            this.selectedTab = this.tabs[0];
          } else if (this.saveUpdateReqModal.requestType == "Vessel" && !this.groupTwo.valid) {
            this.slides.slideTo(1, 500);
            this.resetShowTabs(2);
            this.selectedTab = this.tabs[1];
          } else if (this.saveUpdateReqModal.requestType == "Container"
            && ((!this.groupThree.valid) || (!this.groupSix.valid))|| message == this.utils.getLocaleString("rb_alert_container")) {
            this.slides.slideTo(1, 500);
            this.resetShowTabs(1);
            this.selectedTab = this.tabs[1];
          } else if (!this.groupFour.valid) {
            this.slides.slideTo(3, 500);
            this.resetShowTabs(3);
            this.selectedTab = this.tabs[2];
          }else{
            this.selectedTab = this.tabs[3];
          }
          this.showingPopup = false;
        },
      }]
    });

    this.alertobj.present();
    }, 200);
  }

  private getServiceProvider() {
    this.serviceProviderReqModel.userName = localStorage.getItem('LOGGEDINUSER');
    this.rbServices.getServiceProvider(this.serviceProviderReqModel,false).subscribe(respose=> {
      this.serviceProviderResponseModel = respose;
      this.clientRegSpLocationSO = this.serviceProviderResponseModel.clientRegSpLocationSO;
      if(this.mode == "edit" && this.saveUpdateReqModal.requestType == 'Container') {
        for(let i = 0; i < this.clientRegSpLocationSO.length; i++) {
          this.sptypes[i] = this.clientRegSpLocationSO[i].serviceProviderName;
        }
        this.sptypes = Array.from(new Set(this.sptypes));
        this.spTypeSelected(false);
        this.spLocSelected(false);
        this.spNameSelected(false);
        this.setSearchBy(false);
        this.changeSearchBy(false);
        } else {
          for (let i = 0, j = 0; i < this.clientRegSpLocationSO.length; i++) {
            this.clientRegSpCodeTypeSO = this.clientRegSpLocationSO[i].clientRegSpCodeTypeSO;
            this.sptype = this.sptypes.find(x => x == this.clientRegSpLocationSO[i].serviceProviderName);
            if (!this.sptype) {
              this.sptypes[j] = this.clientRegSpLocationSO[i].serviceProviderName;
              j++;
            }
          }
        }
      },
      error => {

      });
  }

  private getRotationMaster() {
    this.rotationResponseModal = new Array<RotationResultDetails>();
    this.rbServices.rbRotationMaster(this.rotationMasterReqModal).subscribe(response => {
      this.rotationMasterResponseList = response;
      this.rotationResponseModal = this.rotationMasterResponseList.list;
    });
  }

  getRotationNo(ev: any) {
    this.filterRotationArray = this.rotationResponseModal;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.saveUpdateReqModal.rotationNo;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterRotationArray = this.filterRotationArray.filter((item) => {
        if (item.rotationNoSrch.toString().includes(val)) {
          this.showRotationNo = true;
        }
        return (item.rotationNoSrch.toString().includes(val));
      });
    } else {
      // hide the results when the query is empty
      this.showRotationNo = false;
    }
  }

  private getResourceMaster(index: any) {
      if (this.saveUpdateReqModal.requestType == 'Container'
        && null != this.saveUpdateReqModal.terminalContainer &&
      "" != this.saveUpdateReqModal.terminalContainer) {
        this.resourceMasterReqModal.terminal = this.saveUpdateReqModal.terminalContainer;
      } else {
        this.resourceMasterReqModal.terminal = this.saveUpdateReqModal.terminal;
      }

    this.getRequestTypeCode(this.saveUpdateReqModal.requestType);
    this.rbServices.getResources(this.resourceMasterReqModal).subscribe(response => {
      this.resourceMasterResponseModal = response;
      this.saveUpdateReqModal.terminal = this.resourceMasterResponseModal.terminal;
       if (this.mode != "edit") {
        if (this.resourceMap.length == 0) {
          this.addRbList(0);
        } else {
          this.setRbContainers(index,false);
        }
      }
      else {
          //this.getResourceMaster(index);
           if (this.resourceMap.length == 0) {
                this.addRbList(0);
           }
          if(null == index || (index > 0 && index < this.resourceMap.length)) {
            this.setRbContainers(this.resourceMap.length-1,true);
          } else {
            this.setRbContainers(index,true);
          }
      }
    });
  }

  spTypeSelected(isChanged: boolean) {
    if(isChanged == true) {
      this.locations = [];
      this.saveUpdateReqModal.locationContainer="";
    }
    if(this.saveUpdateReqModal.terminalContainer=="" ||this.saveUpdateReqModal.terminalContainer==null){
      this.resetresourceBooking();
    }
    this.clientRegSpCodeTypeSOtemp = this.clientRegSpLocationSO.filter(x => x.serviceProviderName == this.saveUpdateReqModal.serviceProviderType)
    for (let i = 0, j = 0; i < this.clientRegSpCodeTypeSOtemp.length; i++) {
      if (this.clientRegSpCodeTypeSOtemp[i].spLocationName) {
        this.location = this.locations.find(x => x == this.clientRegSpCodeTypeSOtemp[i].spLocationName);
        if (!this.location) {
          this.locations[j] = this.clientRegSpCodeTypeSOtemp[i].spLocationName;
          j++;
        }
      }
    }
 }
  spLocSelected(isChanged:boolean) {
    if(isChanged == true) {
      this.spnames = [];
      this.terminals = [];
      this.filterCAArray = [];
      this.filterDOArray = [];
      this.saveUpdateReqModal.spName = "";
      this.saveUpdateReqModal.terminalContainer = "";
      this.saveUpdateReqModal.tradeTypeContainer = "";
      this.saveUpdateReqModal.searchByContainer = "";
      this.saveUpdateReqModal.caNo = "";
      this.saveUpdateReqModal.doNo = "";
      this.isterminalselected = false;
    }
    if(this.saveUpdateReqModal.terminalContainer=="" ||this.saveUpdateReqModal.terminalContainer==null){
      //this.resetresourceBooking();
    }
    this.clientRegSpCodeTypeSOtemp = this.clientRegSpLocationSO.filter(x => x.serviceProviderName == this.saveUpdateReqModal.serviceProviderType);
    this.clientRegSpCodeTypeSOtemp = this.clientRegSpCodeTypeSOtemp.filter(x => x.spLocationName  == this.saveUpdateReqModal.locationContainer);
    for (let i = 0, j = 0; i < this.clientRegSpCodeTypeSOtemp.length; i++) {
      if (this.clientRegSpCodeTypeSOtemp[i].spSubLocationName) {
        this.spname = this.spnames.find(x => x == this.clientRegSpCodeTypeSOtemp[i].spSubLocationName);
        if (!this.spname) {
          this.spnames[j] = this.clientRegSpCodeTypeSOtemp[i].spSubLocationName;
          j++;
        }
      }

    }
  }

  spSSSelected() {
    if (this.saveUpdateReqModal.serviceStatus == this.utils.getLocaleString("rb_completed")) {
      this.isServiceProviderOn = true;
      this.isSpRemarks = true;
      this.isError=false;
      this.groupEight.controls.serviceProvidedOn.setValidators(Validators.compose([Validators.required]));
      this.groupEight.controls.serviceProvidedOn.enable();
      this.groupEight.controls.remarksSP.clearValidators();
      this.groupEight.controls.remarksSP.disable();
      this.groupEight.controls.remarksSP.enable();
      if(this.groupFour.controls["actualQuantity"]) {
        this.groupFour.controls["actualQuantity"].setValue(this.saveUpdateReqModal.actualQuantity);
        this.groupFour.controls.actualQuantity.setValidators(Validators.compose([Validators.required]));
        this.groupFour.controls.actualQuantity.enable();
      }
      if(this.groupFour.controls["actualDuration"]) {
        this.groupFour.controls["actualDuration"].setValue(this.saveUpdateReqModal.actualDuration);
        this.groupFour.controls.actualDuration.setValidators(Validators.compose([Validators.required]));
        this.groupFour.controls.actualDuration.enable();
      }
    } else if (this.saveUpdateReqModal.serviceStatus == this.utils.getLocaleString("rb_declined")) {
      this.isServiceProviderOn = false;
      this.isSpRemarks = true;
      this.isError=false;
      this.groupEight.controls.remarksSP.setValidators(Validators.compose([Validators.required]));
      this.groupEight.controls.remarksSP.enable();
      this.groupEight.controls.serviceProvidedOn.clearValidators();
      this.groupEight.controls.serviceProvidedOn.disable();
      this.groupEight.controls.serviceProvidedOn.enable();
    } else {
      this.isServiceProviderOn = false;
      this.isSpRemarks = false;
      this.isError=false;
      this.groupEight.controls.serviceProvidedOn.clearValidators();
      this.groupEight.controls.serviceProvidedOn.disable();
      this.groupEight.controls.serviceProvidedOn.enable();
      this.groupEight.controls.remarksSP.clearValidators();
      this.groupEight.controls.remarksSP.disable();
      this.groupEight.controls.remarksSP.enable();
    }
  }

  spNameSelected(isChanged: boolean) {
    if(this.saveUpdateReqModal.terminalContainer=="" ||this.saveUpdateReqModal.terminalContainer==null){
      this.resetresourceBooking();
    }
    if(isChanged == true) {
      this.saveUpdateReqModal.terminalContainer = "";
    }
    this.spTerminals = [];
    this.searchByTerminalreqmodal.location = this.saveUpdateReqModal.locationContainer;
    this.searchByTerminalreqmodal.spName = this.saveUpdateReqModal.spName;
    this.searchByTerminalreqmodal.spType = this.saveUpdateReqModal.serviceProviderType;
    this.searchByTerminalreqmodal.userName = localStorage.getItem('LOGGEDINUSER');
    this.rbServices.searchTerminal(this.searchByTerminalreqmodal, false).subscribe(response => {
      this.spTerminals = response;
      this.spNameChanged = true;
    });
  }

  categorySelected(category: Event, index: number,resourseMap: any) {

    if(null != category) {
      this.selectedCategory = category;
      this.saveUpdateReqModal.unitOfMeasure = "";
      resourseMap[index].unitOfMeasure = "";
    }
    this.selectedCategoryIndex = index;
    this.unitOfMeasure[index] = [];
    this.saveUpdateReqModal.category = this.selectedCategory;
    if (this.selectedCategory) {
      if(this.mode == "create") {
        for (let i = 0; i < this.maplist.length; i++) {
          this.unitOfMeasure[index][i] = this.resourceCategoryChargesMap[this.selectedResourceType][i].unitOfMeasure;
        }
      } else {
        for (let i = 0; i < this.maplist.length; i++) {
          this.unitOfMeasure[index][i] = this.resourceMasterData.resourceCategoryChargesMap[this.resourceMap[index].resourceType][i].unitOfMeasure;
        }
      }
    }
    this.unitOfMeasure[index] = Array.from(new Set(this.unitOfMeasure[index]));
    //this.calculateCharges(resourseMap, index);
  }

  unitSelected(unit: Event, index: number, resourseType: any) {
    this.selectedUnit = unit;
    this.saveUpdateReqModal.unitOfMeasure = this.selectedUnit;
    this.calculateCharges(resourseType, index);
  }

  calculateCharges(resourseType: any, index: number) {
    if(this.mode=='edit'){
      if(null == this.selectedResourceType || "" == this.selectedResourceType) {
        this.selectedResourceType=this.resourceMap[index].resourceType;
      }
      if(null == this.selectedCategory || "" == this.selectedCategory) {
        this.selectedCategory=this.resourceMap[index].category;
      }
      if(null == this.selectedUnit || "" == this.selectedUnit) {
        this.selectedUnit=this.resourceMap[index].unitOfMeasure;
      }
      this.maplist = this.resourceMasterData.resourceCategoryChargesMap[this.selectedResourceType];
    }
    if ((null == this.selectedResourceType || "" == this.selectedResourceType) ||
      (null == this.selectedCategory || "" == this.selectedCategory) ||
      (null == this.selectedUnit || "" == this.selectedUnit)) {
      return;
    } else if(this.mode=='create') {
      if(null != this.resourceMap[index]) {
        this.selectedResourceType = this.resourceMap[index].resourceType;
        this.selectedCategory = this.resourceMap[index].category;
        this.selectedUnit = this.resourceMap[index].unitOfMeasure;
      }
      this.maplist = this.resourceMasterResponseModal.resourceCategoryChargesMap[this.selectedResourceType];
    }


    this.maplist.find(item => {
      item.category == this.selectedCategory
    });
    let mySelectedlist = this.maplist.filter((item) => {
      return (item.category == this.selectedCategory);
    });
    if (null != mySelectedlist && mySelectedlist.length>0) {
      this.currentsum = 0;
      this.sumCharges = 0.000;
      this.baseCharge = mySelectedlist[0].baseCharge;
      this.additionalCharge = mySelectedlist[0].additionalCharges;
      this.otherCharge = mySelectedlist[0].otherCharges;
      this.actualQuantity = mySelectedlist[0].actualQuantity;
      this.actualDuration = mySelectedlist[0].actualDuration;
      this.otherCharge = mySelectedlist[0].otherCharges;
      this.resourceMap[index].baseCharge = this.baseCharge;
      this.resourceMap[index].additionalCharges = this.additionalCharge;
      this.resourceMap[index].otherCharges = this.otherCharge;

      if (this.baseCharge && this.additionalCharge && this.resourceMap[index].quantity > 0 && this.resourceMap[index].duration > 0) {
        this.taxValue = this.tax;
        this.perRequestValue = this.perRequest;
        this.totalChargeValue = this.totalCharge;
        if(this.resourceMap[index].actualQuantity && this.resourceMap[index].actualQuantity >0 &&
          this.resourceMap[index].actualDuration &&
          this.resourceMap[index].actualDuration >0 ) {
          resourseType.sumCharges = (this.baseCharge + this.additionalCharge + this.otherCharge)
            * (this.resourceMap[index].actualQuantity * this.resourceMap[index].actualDuration);
        } else {
          resourseType.sumCharges = (this.baseCharge + this.additionalCharge + this.otherCharge)
            * (this.resourceMap[index].quantity * this.resourceMap[index].duration);
        }
        this.sumCharges = this.sumCharges + resourseType.sumCharges;
        this.resourceMap[index].sumCharges = Number(this.sumCharges).toFixed(3);
        this.calculateSum();
      } else if (this.baseCharge && this.additionalCharge &&
        (null == resourseType[index].duration || "" == resourseType[index].duration) ||
        (null == resourseType[index].quantity || "" == resourseType[index].quantity)) {
        this.resourceMap[index].sumCharges = "0.000";
        this.calculateSum();
      }
    }
  }

  calculateSum() {
    for (let i = 0; i < this.resourceMap.length; i++) {
      this.currentsum += Number(this.resourceMap[i].sumCharges);
    }
      this.offsetValue(this.currentsum);
  }

  offsetValue(charge:any) {
    this.total = 0;
    if(charge > 0) {
      this.total = charge + this.perRequestCharge;
    }
    this.total = this.total * (this.taxPercentage / 100) + this.total;
    this.totalCharge = (this.total.toFixed(3)).toString();
    this.taxValue = this.tax;
    this.perRequestValue = this.perRequest;
    if(this.total > 0) {
      this.totalChargeValue = this.totalCharge;
    } else {
      this.totalChargeValue = "";
    }

  }

  resourceTypeSelected(type: Event,index: number,resourceMap:any) {
    if(null != type) {
      this.selectedResourceType = type;
      this.saveUpdateReqModal.category = "";
      resourceMap[index].category ="";
      resourceMap[index].unitOfMeasure="";
      resourceMap[index].quantity="";
      resourceMap[index].duration="";
      resourceMap[index].actualQuantity="";
      resourceMap[index].actualDuration="";
      resourceMap[index].sumCharges="";
      this.containers=[];
      //this.calculateCharges(resourceMap, index);
      this.currentsum=0;
      this.calculateSum();

    }
    if(this.mode == "edit") {
      this.maplist = this.resourceMasterData.resourceCategoryChargesMap[this.selectedResourceType];
      this.categoryTypeList[index] = [];
      if (this.selectedResourceType) {
        this.categoryTypeList[index] = [];
        this.unitOfMeasure[index] = [];
        for (let i = 0; i < this.maplist.length; i++) {
          this.categoryTypeList[index].push(this.resourceMasterData.resourceCategoryChargesMap[this.selectedResourceType][i].category);
        }
      }
    } else{
      this.resourceCategoryChargesMap = this.resourceMasterResponseModal.resourceCategoryChargesMap;
      this.maplist = this.resourceMasterResponseModal.resourceCategoryChargesMap[this.selectedResourceType];
      this.categoryTypeList[index] = [];
      if (this.selectedResourceType) {
        this.categoryTypeList[index] = [];
        this.unitOfMeasure[index] = [];
        for (let i = 0; i < this.maplist.length; i++) {
          this.categoryTypeList[index].push(this.resourceCategoryChargesMap[this.selectedResourceType][i].category);
        }
      }
    }

    this.unitOfMeasure[index] = Array.from(new Set(this.unitOfMeasure[index]));
    this.categoryTypeList[index] = Array.from(new Set(this.categoryTypeList[index]));

  }
 setSearchBy(isChanged: boolean) {
   if (this.saveUpdateReqModal.tradeTypeContainer != null) {

     if (isChanged) {
       this.containers = [];
       this.saveUpdateReqModal.doNo = "";
       this.saveUpdateReqModal.caNo = "";
       this.addContainer = true;
       this.selectContainer = true;
       this.caNo = true;
       this.daNo = true;
       this.istradeselected = true;
       this.saveUpdateReqModal.searchByContainer = "";
       this.containeradded = false;
     }
     this.groupThree.controls.searchByContainer.setValidators(Validators.compose([Validators.required]));
     this.searchby = this.tradetypes.get(this.saveUpdateReqModal.tradeTypeContainer).search;
   }
 }

  changeSearchBy(isChanged: boolean) {
    if(isChanged) {
      this.containers = [];
      this.containernumbers = [];
      this.saveUpdateReqModal.caNo = "";
      this.saveUpdateReqModal.doNo = "";
    }
   switch (this.saveUpdateReqModal.searchByContainer) {
      case "Container No":
        this.addContainer = false;
        this.selectContainer = true;
        this.caNo = true;
        this.daNo = true;
        this.groupThree.controls.searchByContainer.setValidators(Validators.compose([Validators.required]));
        break;
      case "CA No":
        this.addContainer = true;
        this.caNo = false;
        this.daNo = true;
        if (this.containers.length > 0) {
          this.containeradded = true;
        }
        this.groupSix.controls.caNo.setValidators(Validators.compose([Validators.required]));
        break;
      case "DO No":
        this.addContainer = true;
        this.caNo = true;
        this.daNo = false;
        if (this.containers.length > 0) {
          this.containeradded = true;
        }
        this.groupSix.controls.doNo.setValidators(Validators.compose([Validators.required]));
        break;
      default:
        this.addContainer = true;
        this.selectContainer = true;
        this.caNo = true;
        this.daNo = true;
        break;
    }
  }

  getCANo(ev: any) {
    this.selectContainer = true;
    this.filterCAArray = this.searchCAdetails;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.saveUpdateReqModal.caNo;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterCAArray = this.filterCAArray.filter((item) => {
        if (item.caNo != null && item.caNo.toLowerCase().includes(val.toLowerCase())) {
          this.showCANo = true;
        }
        return (item.caNo != null && item.caNo.toLowerCase().includes(val.toLowerCase()));
      });
    } else {
      this.showCANo = false;
    }
  }

  searchCAMaster() {
    this.cadoMasterReqModal.caNo = "";
    this.cadoMasterReqModal.createdFrom = "";
    this.cadoMasterReqModal.createdTo = "";
    this.cadoMasterReqModal.locationContainer = this.saveUpdateReqModal.locationContainer;
    this.cadoMasterReqModal.rotationNo = "";
    this.cadoMasterReqModal.spName = this.saveUpdateReqModal.spName;
    this.cadoMasterReqModal.terminalContainer = this.saveUpdateReqModal.terminalContainer;
    this.cadoMasterReqModal.vesselName = "";

    this.searchCAdetails = new Array<CADOMasterResultDetails>();
    this.rbServices.rbCAMaster(this.cadoMasterReqModal)
      .subscribe(response => {
          this.cadoMasterResponseList = <CADOMasterResultModal>response;
          this.searchCAdetails = this.cadoMasterResponseList.list;
          this.getCANo(null)
        },
        error => {
          var errorMessage = <any>error;
        });
  }

  setCANumber(item: any) {
    this.saveUpdateReqModal.caNo = item.caNo;
    this.showCANo = false;
    this.selectContainer = false;
  }

  getDONo(ev: any) {
    this.selectContainer = true;
    this.filterDOArray = this.searchDOdetails;
    // set val to the value of the searchbar
    let val;
    if (ev == null) {
      val = this.saveUpdateReqModal.doNo;
    } else {
      val = ev.target.value;
    }
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.filterDOArray = this.filterDOArray.filter((item) => {
        if (item.doNo != null && item.doNo.toLowerCase().includes(val.toLowerCase())) {
          this.showDONo = true;
        }
        return (item.doNo != null && item.doNo.toLowerCase().includes(val.toLowerCase()));
      });
    } else {
      this.showDONo = false;
    }
  }

  addRbList(index: any) {
    this.resourceDirty = true;
    if (this.resourceMap && this.resourceMap.length < 99) {
      this.selectedResourceType = "";
      this.selectedCategory = "";
      this.selectedUnit = "";
      this.resourceMap.push(new RsbResources());
      this.resourceFormArray.push(this.addRbForm('', '', '', '', '','',''));
    if(this.mode == "edit" && this.resourceMap.length >= 1) {
      this.getResourceMaster(null);
    } else {
      if (null != index && this.resourceMap.length) {
        //this.getResourceMaster(index);
        if (index > 0 && index < this.resourceMap.length) {
          this.setRbContainers(this.resourceMap.length - 1, true);
        } else {
          this.setRbContainers(index, true);
        }
      }
    }

    } else {
      this.presentAlert(this.alertHeadding, this.utils.getLocaleString("invalid_rb_list"));
    }
  }

  addRbForm(resourceType: any, category: any, unitOfMeasure, quantity: any, duration: any,actualQuantity: any,actualDuration: any): FormGroup {
    return this.formBuilder.group({
      resourceType: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      unitOfMeasure: ['', Validators.compose([Validators.required])],
      quantity: ['', Validators.compose([Validators.maxLength(6), Validators.minLength(1), Validators.required])],
      duration: ['', Validators.compose([Validators.maxLength(6), Validators.minLength(0), Validators.required])],
      actualQuantity: ['', Validators.compose([Validators.maxLength(6), Validators.minLength(1)])],
      actualDuration: ['', Validators.compose([Validators.maxLength(6), Validators.minLength(1)])],
    });
  }

  setRbContainers(index: any,fromAddList: boolean) {


    if (this.mode == "edit" && !fromAddList) {
      //this.resourceCategoryChargesMap = this.resourceMasterData;
      if (this.resourceMap && this.resourceMap.length < 5) {
        for (let i = 0; i < this.resourceMap.length; i++) {
          this.getbaseCharge(i);
          // this.resourceFormArray.push(this.addRbForm(this.resourceMap[i].resourceType, this.resourceMap[i].category,
          //   this.resourceMap[i].unitOfMeasure, this.resourceMap[i].quantity, this.resourceMap[i].duration,
          //   this.resourceMap[i].actualQuantity, this.resourceMap[i].actualDuration));
        }
      }
      for (let i = 0; i < this.resourceMap.length; i++) {
        this.resourceTypeList[i] = [];
        this.categoryTypeList[i] = [];
        this.unitOfMeasure[i] = [];
          for(let j = 0; j< this.resourceMasterData.resourceTypeList.length; j++) {
            this.resourceTypeList[i].push(this.resourceMasterData.resourceTypeList[j]);
          }

        if(null != this.resourceMap[i]) {
          this.resMapList = this.resourceMasterData.resourceCategoryChargesMap[this.resourceMap[i].resourceType];
        }

        for (let k = 0; k < this.resMapList.length; k++) {
          this.categoryTypeList[i].push(this.resMapList[k].category);
          this.unitOfMeasure[i].push(this.resMapList[k].unitOfMeasure);
        }
        this.resourceTypeList[i] = Array.from(new Set(this.resourceTypeList[i]));
        this.categoryTypeList[i] = Array.from(new Set(this.categoryTypeList[i]));
        this.unitOfMeasure[i] = Array.from(new Set(this.unitOfMeasure[i]));
      }
      this.tax = this.resourceMasterData.taxPercentage;
      this.taxPercentage = Number(this.tax.slice(0, -1));
      this.perRequestCharge=this.resourceMasterData.perRequestCharge;
      this.perRequest= this.perRequestCharge.toFixed(3);
      this.taxValue = this.tax;
      this.perRequestValue = this.perRequest;

    } else {

      this.resourceCategoryChargesMap = this.resourceMasterResponseModal.resourceCategoryChargesMap;
      for(let i = 0; i < this.resourceMap.length; i++) {
        if(null != index) {
          this.resourceTypeList[index] = [];
          this.categoryTypeList[index] = [];
          this.unitOfMeasure[index] = [];
          for (let j = 0; j < this.resourceMasterResponseModal.resourceTypeList.length; j++) {
            this.resourceTypeList[index].push(this.resourceMasterResponseModal.resourceTypeList[j]);
          }
          this.resourceTypeList[index] = Array.from(new Set(this.resourceTypeList[index]));
        }
      }
      this.tax = this.resourceMasterResponseModal.taxPercentage;
      this.taxPercentage = Number(this.tax.slice(0, -1));
      this.perRequestCharge=this.resourceMasterResponseModal.perRequestCharge;
      this.perRequest= this.perRequestCharge.toFixed(3);
      if (this.resourceFormArray.controls.length > 0) {
        this.clearFormArray(this.resourceFormArray)
      }
      for (let i = 0; i < this.resourceMap.length; i++) {
        this.resourceFormArray.push(this.addRbForm(
          this.resourceMap[i].resourceType,
          this.resourceMap[i].category,
          this.resourceMap[i].unitOfMeasure,
          this.resourceMap[i].quantity,
          this.resourceMap[i].duration,
          this.resourceMap[i].actualQuantity,
          this.resourceMap[i].actualDuration
        ));
      }
    }


  }

  clearFormArray(obj: FormArray) {
    for (let i = obj.length; i >= 0; i--) {
      obj.removeAt(i);
    }
  }

  //Clearing container information list
  clearContainerInfo() {
    if (null != this.saveUpdateReqModal) {
      this.saveUpdateReqModal.serviceProviderType = "";
      this.saveUpdateReqModal.locationContainer = "";
      this.saveUpdateReqModal.spName = "";
      this.saveUpdateReqModal.terminalContainer = "";
      this.saveUpdateReqModal.tradeTypeContainer = "";
      this.saveUpdateReqModal.searchByContainer = "";
      this.saveUpdateReqModal.remarksContainer = "";
    }
  }

  //Clearing vessel information list
  clearVesselInfo() {
    if (null != this.saveUpdateReqModal) {
      this.saveUpdateReqModal.vesselName = "";
      this.saveUpdateReqModal.vesselStatus = "";
      this.saveUpdateReqModal.locationVessel = "";
      this.saveUpdateReqModal.terminal = "";
      this.saveUpdateReqModal.terminalOperator = "";
      this.saveUpdateReqModal.prefBerth = "";
      this.saveUpdateReqModal.eta = "";
      this.saveUpdateReqModal.remarksVessel = "";
      this.saveUpdateReqModal.cutOffTime = "";
    }
  }

  removeRbList(index) {
    if (this.resourceMap.length > 1 && null == this.saveUpdateReqModal.approver) {
      this.resourceDirty = true;
      //this.calculateSum();
      this.currentsum = this.currentsum - Number(this.resourceMap[index].sumCharges);
      this.charge= ((Number(this.totalCharge) - Number(this.resourceMap[index].sumCharges)));
      this.totalChargeValue= this.charge.toFixed(3).toString();
      if (this.charge > 0) {
        this.offsetValue(this.charge);
      } else {
        this.taxValue = "";
        this.perRequestValue= "";
        this.totalCharge="";
        this.totalChargeValue="";
      }
      this.resourceMap.splice(index, 1);
      this.clearFormArray(this.resourceFormArray);
      this.resourceFormArray.removeAt(index);
      for (let i = 0; i < this.resourceMap.length; i++) {
           this.resourceFormArray.push(this.addRbForm(this.resourceMap[i].resourceType, this.resourceMap[i].category,
           this.resourceMap[i].unitOfMeasure, this.resourceMap[i].quantity, this.resourceMap[i].duration,
           this.resourceMap[i].actualQuantity, this.resourceMap[i].actualDuration));
          this.selectedResourceType = this.resourceMap[i].resourceType;
          this.selectedCategory = this.resourceMap[i].category;
          this.resourceTypeSelected(null,i,this.resourceMap);
          this.categorySelected(null,i,this.resourceMap);
      }
      return;
    }

  }

  trashIconHidden() {
    if (this.resourceMap.length > 1 && null == this.saveUpdateReqModal.approver) {
      return false;
    }
    return true;
  }

  searchDOMaster() {
    this.cadoMasterReqModal.caNo = "";
    this.cadoMasterReqModal.createdFrom = "";
    this.cadoMasterReqModal.createdTo = "";
    this.cadoMasterReqModal.locationContainer = this.saveUpdateReqModal.locationContainer;
    this.cadoMasterReqModal.rotationNo = "";
    this.cadoMasterReqModal.spName = this.saveUpdateReqModal.spName;
    this.cadoMasterReqModal.terminalContainer = this.saveUpdateReqModal.terminalContainer;
    this.cadoMasterReqModal.vesselName = "";

    this.searchDOdetails = new Array<CADOMasterResultDetails>();
    this.rbServices.rbDOMaster(this.cadoMasterReqModal)
      .subscribe(response => {
          this.cadoMasterResponseList = <CADOMasterResultModal>response;
          this.searchDOdetails = this.cadoMasterResponseList.list;
          this.getDONo(null)
        },
        error => {
          var errorMessage = <any>error;
        });
  }

  clearContainer() {
    this.containers = [];
    this.containernumbers = [];
  }

  setDONumber(item: any) {
    this.saveUpdateReqModal.doNo = item.doNo;
    this.showDONo = false;
    this.selectContainer = false;
  }

  onChangeofTerminal() {
    this.isterminalselected = true;
    this.containers = [];
    this.saveUpdateReqModal.doNo = "";
    this.saveUpdateReqModal.caNo = "";
    this.addContainer = true;
    this.selectContainer = true;
    this.caNo = true;
    this.daNo = true;
    this.istradeselected = true;
    this.saveUpdateReqModal.tradeTypeContainer="";
    this.saveUpdateReqModal.searchByContainer = "";
    this.containeradded = false;
    this.clearFormArray(this.resourceFormArray);
    this.resetresourceBooking();
    this.getResourceMaster(null);
    this.groupThree.controls.tradeTypeContainer.setValidators(Validators.compose([Validators.required]));
  }

  deleteContainer(index) {
    this.containernumbers.splice(index, 1);
    this.containers.splice(index, 1);
    return;
  }

  checkIsFileAttached() {
    for (let i = 0; i < this.attachments.length; i++) {
      if ((this.attachments[i].docType != "" || this.attachments[i].docNum != null || this.attachments[i].docIssueDate != null
          || this.attachments[i].docExpDate != null) &&
        !this.attachments[i].fileUploadId) {
        return false;
      }
    }
    return true;
  }

  createEditRB() {
    if (this.groupOne.valid && this.groupSeven.valid && this.groupEight.valid) {
      if (this.saveUpdateReqModal.requestType == 'Vessel' && (!this.groupTwo.valid)) {
        this.isError = true;
        this.presentAlert(this.alertHeadding, this.utils.getLocaleString("alert_mandatory"));
      } else if (this.saveUpdateReqModal.requestType == 'Container' && (!this.groupThree.valid ||!this.groupSix.valid)) {
        this.isError = true;
        this.presentAlert(this.alertHeadding, this.utils.getLocaleString("alert_mandatory"));
      } else if (this.actualValidation() == false) {
        this.isError = true;
        this.presentAlert(this.alertHeadding, this.utils.getLocaleString("alert_mandatory"));
      } else if (this.saveUpdateReqModal.requestType == 'Container' && this.containers.length <= 0) {
        this.isError = true;
        this.presentAlert(this.alertHeadding, this.utils.getLocaleString("rb_alert_container"));
      } else if (this.groupFour.valid && this.groupFive.valid) {
        if (this.checkIsFileAttached()) {
            for (let i = 0; i < this.attachments.length; i++) {
            if(null != this.attachments[i].docIssueDate) {
              this.attachments[i].docIssueDate = this.datepipe.transform(this.attachments[i].docIssueDate, 'dd/MM/yyyy');
            }
            if(null != this.attachments[i].docExpDate) {
              this.attachments[i].docExpDate = this.datepipe.transform(this.attachments[i].docExpDate, 'dd/MM/yyyy');
            }
          }
          this.submitRequest(this.mode);
        } else {
          this.isError = true;
          this.presentAlert(this.utils.getLocaleString("confirm_box"), this.utils.getLocaleString("rb_attachFile_msg"));
        }
      } else {
        this.isError = true;
        this.presentAlert(this.alertHeadding, this.utils.getLocaleString("alert_mandatory"));
      }
    } else {
      this.isError = true;
      this.presentAlert(this.alertHeadding, this.utils.getLocaleString("alert_mandatory"));
    }
  }

  actualValidation() {
    if(this.isAdminEditMode()) {
      return true;
    } else {
      for(let i = 0; i< this.resourceMap.length; i++) {
        if(null == this.resourceMap[i].actualDuration || (!this.resourceMap[i].actualDuration)
          || null == this.resourceMap[i].actualQuantity || (!this.resourceMap[i].actualQuantity)) {
           return false;
        }
      }
    }
  }

  datetostring(datestring) {
    if (datestring != null && datestring.length > 5) {
      let month: number;
      let monthstr: string;
      let day: string;
      let date: Date;
      date = new Date(datestring);
      month = date.getMonth();
      month++;
      day = date.getDate().toString();
      if (day.length < 2) {
        day = "0" + day;
      }
      if (month < 10) {
        monthstr = "0" + month.toString();
      }
      else {
        monthstr = month.toString();
      }
      if (day == "NaN") {
        return null;
      }
      else {
        return day + "/" + monthstr + "/" + date.getFullYear();
      }

    }
    else {
      return null;
    }
  }

  submitRequest(mode: string) {

    if (this.alertobj) {
      this.alertobj.dismiss();
      this.alertobj = null;
    }
    this.showingPopup = true;

    this.alertobj = this.alertCtrl.create({
        title: this.utils.getLocaleString("confirm_box"),
        subTitle: 'Do you want to submit your request?',
        buttons: [
          {
            text: this.ok_text,
            handler: () => {
              this.saveUpdateReqModal.rsbResources = this.resourceMap;
              this.saveUpdateReqModal.totalCharges = this.totalCharge;
              this.saveUpdateReqModal.resBookingAttachments = this.attachments;
              this.saveUpdateReqModal.rsbContainers = this.containers;
              if(this.containers.length > 0|| this.mode == "create" ) {
                this.validateRequest();
              } else {
                this.saveUpdateRequest();
              }
              this.showingPopup = false;
            },
          }, {
            text: this.utils.getLocaleString("ca_cancel"),
            handler: () => {
              this.showingPopup = false;
            },
          }],
        enableBackdropDismiss: false
    });
    this.alertobj.present();

  }

  navtoViewPage(mode: string) {
    if (mode == "create") {
      this.navCtrl.push(RBviewPage, {
        rsbId: this.saveUpdateReqModal.rsbId,
        requestType: this.saveUpdateReqModal.requestType,
        fromCreate: true
      });
    } else if (mode == "edit") {
      this.navCtrl.push(RBviewPage, {
        rsbId: this.saveUpdateReqModal.rsbId,
        requestType: this.saveUpdateReqModal.requestType,
        editfromHistory: this.fromHistory,
        fromEdit: true
      });
    }
  }

  validateRequest() {
    this.rbServices.validateContainerResources(this.saveUpdateReqModal)
      .subscribe(response => {
          this.containerDetailsResponseModal = <ContainerDetailsResponseModal>response;
          if (this.containerDetailsResponseModal.message != null) {
            const alert = this.alertCtrl.create({
              title: this.alertHeadding,
              subTitle: this.containerDetailsResponseModal.message,
              buttons: [this.ok_text]
            });
            alert.present();
          } else {
            this.saveUpdateRequest();
          }
        },
        error => {
          const alert = this.alertCtrl.create({
            title: this.alertHeadding,
            subTitle: error[0].message,
            buttons: [this.ok_text]
          });
          alert.present();
        });
    this.showingPopup = false;
  }

  saveUpdateRequest() {
    this.saveUpdateReqModal.perRequestCharges = Number((this.perRequestCharge).toFixed(3));
    this.saveUpdateReqModal.tax = this.taxPercentage;
    this.saveUpdateReqModal.crNo = "";
    if (this.mode == "create") {
      this.rbServices.rbSaveResourceBooking(this.saveUpdateReqModal)
        .subscribe(response => {
            this.saveUpdateReqModal = <SaveUpdateReqModal>response;
            this.navtoViewPage("create");
          },
          error => {
          if(error[0] && error[0].message.includes("Duplicate resource type is already selected in the  same request")){
            error[0].message = "Duplicate resources will not be allowed";
          }
            const alert = this.alertCtrl.create({
              title: this.alertHeadding,
              subTitle: error[0].message,
              buttons: [this.ok_text]
            });
            alert.present();
            this.showingPopup = false;
          });
    } else if (this.mode == "edit") {
      if (null != this.rbSprovider || ("" != this.rbSprovider)) {
        let formatServiceDate = this.rbSprovider;
        this.saveUpdateReqModal.serviceProvidedOn = this.datepipe.transform(formatServiceDate.split("T")[0], 'dd/MM/yyyy');
        formatServiceDate = formatServiceDate.split("T")[1];
        formatServiceDate = formatServiceDate.substr(0, formatServiceDate.lastIndexOf(':'));
        this.saveUpdateReqModal.serviceProvidedOn = this.saveUpdateReqModal.serviceProvidedOn + " " + formatServiceDate;
      }
      this.rbServices.rbUpdateResourceBooking(this.saveUpdateReqModal)
        .subscribe(response => {
            this.saveUpdateReqModal = <SaveUpdateReqModal>response;
            this.navtoViewPage("edit");
          },
          error => {
            const alert = this.alertCtrl.create({
              title: this.alertHeadding,
              subTitle: error[0].message,
              buttons: [this.ok_text]
            });
            this.presentAlert(this.alertHeadding,error[0].message);
          });
    }
  }

  searchbyidforedit() {
    if (this.fromHistory) {
      this.rbServices.getSearchByReqId(this.currentSearchID).subscribe(response => {
        this.rbIdSearchResult = <RBSearchByIDResultModel>response;
        this.setvaluestoForm();
        this.setrbModel();
      }, error => {

      });
    } else {
      this.rbServices.getSearchById(this.currentSearchID).subscribe(response => {
        this.rbIdSearchResult = <RBSearchByIDResultModel>response;
        this.setvaluestoForm();
        this.setrbModel();
      }, error => {

      });
    }
  }
  setvaluestoForm(){
    this.resourceMap=this.rbIdSearchResult.rsbResources;
    this.attachments = this.rbIdSearchResult.resBookingAttachments;
    this.groupTwo.controls["rotationNo"].setValue(this.rbIdSearchResult.rotationNo);
    this.groupTwo.controls["terminal"].setValue(this.rbIdSearchResult.terminal);
    this.groupSeven.controls["cusReferenceNo"].setValue(this.rbIdSearchResult.cusReferenceNo);

    this.groupThree.controls["serviceProviderType"].setValue(this.rbIdSearchResult.serviceProviderType);
    this.groupThree.controls["locationContainer"].setValue(this.rbIdSearchResult.locationContainer);
    this.groupThree.controls["spName"].setValue(this.rbIdSearchResult.spName);
    this.groupThree.controls["terminalContainer"].setValue(this.rbIdSearchResult.terminalContainer);
     if (this.resourceMap && this.resourceMap.length < 5) {
          for (let i = 0; i < this.resourceMap.length; i++) {
            this.resourceFormArray.push(this.addRbForm(this.resourceMap[i].resourceType, this.resourceMap[i].category,
            this.resourceMap[i].unitOfMeasure, this.resourceMap[i].quantity, this.resourceMap[i].duration,
            this.resourceMap[i].actualQuantity, this.resourceMap[i].actualDuration));
          }
            for (let i = 0; i < this.resourceMap.length; i++) {
              this.resourceFormArray.controls[i].get('resourceType').setValue(this.resourceMap[i].resourceType);
              this.resourceFormArray.controls[i].get('category').setValue(this.resourceMap[i].category);
              this.resourceFormArray.controls[i].get('unitOfMeasure').setValue(this.resourceMap[i].unitOfMeasure);
              this.resourceFormArray.controls[i].get('quantity').setValue(this.resourceMap[i].quantity);
              this.resourceFormArray.controls[i].get('duration').setValue(this.resourceMap[i].duration);
          }
     }
      this.setAttachContainers();
      for (let i = 0; i < this.attachments.length; i++) {
      this.attachmentsFormArray.controls[i].get('docType').setValue(this.attachments[i].docType);
      this.attachmentsFormArray.controls[i].get('docNum').setValue(this.attachments[i].docNum);
      this.attachmentsFormArray.controls[i].get('docIssueDate').setValue(this.attachments[i].docIssueDate);
      this.attachmentsFormArray.controls[i].get('docExpDate').setValue(this.attachments[i].docExpDate);
    }
  }
  setrbModel() {
    this.saveUpdateReqModal.requestType = this.rbIdSearchResult.requestType;
    this.saveUpdateReqModal.cusReferenceNo = this.rbIdSearchResult.cusReferenceNo;
    this.saveUpdateReqModal.rotationNo = this.rbIdSearchResult.rotationNo;
    this.saveUpdateReqModal.vesselName = this.rbIdSearchResult.vesselName;
    this.saveUpdateReqModal.vesselStatus = this.rbIdSearchResult.vesselStatus;
    this.saveUpdateReqModal.locationVessel = this.rbIdSearchResult.locationVessel;
    this.saveUpdateReqModal.terminal = this.rbIdSearchResult.terminal;
    this.saveUpdateReqModal.terminalOperator = this.rbIdSearchResult.terminalOperator;
    this.saveUpdateReqModal.prefBerth = this.rbIdSearchResult.prefBerth;
    this.saveUpdateReqModal.eta = this.rbIdSearchResult.eta;
    this.saveUpdateReqModal.cutOffTime = this.rbIdSearchResult.cutOffTime;
    this.saveUpdateReqModal.remarksVessel = this.rbIdSearchResult.remarksVessel;
    this.saveUpdateReqModal.serviceProviderType = this.rbIdSearchResult.serviceProviderType;
    this.saveUpdateReqModal.locationContainer = this.rbIdSearchResult.locationContainer;
    this.saveUpdateReqModal.spName = this.rbIdSearchResult.spName;
    this.saveUpdateReqModal.terminalContainer = this.rbIdSearchResult.terminalContainer;
    this.saveUpdateReqModal.tradeTypeContainer = this.rbIdSearchResult.tradeTypeContainer;
    this.saveUpdateReqModal.searchByContainer = this.rbIdSearchResult.searchByContainer;
    this.saveUpdateReqModal.caNo = this.rbIdSearchResult.caNo;
    this.saveUpdateReqModal.doNo = this.rbIdSearchResult.doNo;
    this.saveUpdateReqModal.resBookingAttachments = this.rbIdSearchResult.resBookingAttachments;
    this.saveUpdateReqModal.totalCharges = this.rbIdSearchResult.totalCharges;
    this.saveUpdateReqModal.rsbResources = this.rbIdSearchResult.rsbResources;
    this.saveUpdateReqModal.rsbId=this.rbIdSearchResult.rsbId.toString();
    this.saveUpdateReqModal.rsbReqId=this.rbIdSearchResult.rsbReqId.toString();
    this.saveUpdateReqModal.wrkflwId=this.rbIdSearchResult.wrkflwId;
    this.saveUpdateReqModal.resourceBookingStatus = this.rbIdSearchResult.resourceBookingStatus;
    this.saveUpdateReqModal.approver = this.rbIdSearchResult.approver;
   // this.resourceMap = this.saveUpdateReqModal.rsbResources;
    this.resourceMasterData = this.rbIdSearchResult.resourceMasterData;
    this.resourceMasterReqModal = this.resourceMasterData;
    for(let i=0;i < this.saveUpdateReqModal.rsbResources.length;i++){
      this.saveUpdateReqModal.rsbResources[i].sumCharges=Number(this.saveUpdateReqModal.rsbResources[i].sumCharges).toFixed(3);
    }
    for(let i=0;i < this.rbIdSearchResult.terminalData.terminals.length;i++){
      this.terminals[i] = this.rbIdSearchResult.terminalData.terminals[i];
    }
  //  this.attachments = this.saveUpdateReqModal.resBookingAttachments;
    this.saveUpdateReqModal.remarksContainer = this.rbIdSearchResult.remarksContainer;
    this.containers = this.rbIdSearchResult.rsbContainers;
    if(this.containers){
     if (this.containers.length != 0) {
      this.containeradded = true;
      for (let i = 0; i < this.containers.length; i++) {
       delete this.containers[i].rsbContainerId;
       this.containernumbers[i]=this.containers[i].containerNo;
      }
     }
    }
    if (this.saveUpdateReqModal.doNo != "" || this.saveUpdateReqModal.doNo!=null ||
          this.saveUpdateReqModal.caNo != "" || this.saveUpdateReqModal.caNo!=null) {
            this.selectContainer = false;
    }
   // this.setAttachContainers();
    this.totalCharge = Number(this.saveUpdateReqModal.totalCharges).toFixed(3);
    this.totalChargeValue = this.totalCharge;
    //this.getResourceMaster(null);
    this.setRbContainers(null,false);
    this.saveUpdateReqModal.requestNo = this.rbIdSearchResult.requestNo;
    this.saveUpdateReqModal.amendRequestStatus = this.rbIdSearchResult.amendRequestStatus;
    this.saveUpdateReqModal.serviceStatus = this.rbIdSearchResult.serviceStatus;
    this.saveUpdateReqModal.serviceProvidedOn = this.rbIdSearchResult.serviceProvidedOn;
    this.saveUpdateReqModal.remarksSP = this.rbIdSearchResult.remarksSP;
    this.saveUpdateReqModal.createdDate = this.rbIdSearchResult.createdDate;
    this.minsprovider = this.transformDateTime(this.saveUpdateReqModal.createdDate);
    if (this.rbIdSearchResult.approverEditFlag == "Y") {
      this.isApproveredit = true;
      this.groupEight.controls.serviceStatus.setValidators(Validators.compose([Validators.required]));
    }
    if (null == this.rbIdSearchResult.serviceProvidedOn || ("" == this.rbIdSearchResult.serviceProvidedOn)) {
      this.setServiceProvideDate();
    }
    else {
      this.rbSprovider = this.transformDateTime(this.rbIdSearchResult.serviceProvidedOn);
    }
    this.changeTabs();
  }

  getbaseCharge(i:any){
  this.maplist = this.resourceMasterData.resourceCategoryChargesMap[this.resourceMap[i].resourceType];
  this.maplist.find(item => {
      item.category == this.resourceMap[i].category
    });
    let mySelectedlist = this.maplist.filter((item) => {
      return (item.category == this.resourceMap[i].category);
    });
    if(null != mySelectedlist && null != mySelectedlist[0]) {
      this.resourceMap[i].baseCharge = mySelectedlist[0].baseCharge;
      this.resourceMap[i].additionalCharges = mySelectedlist[0].additionalCharges;
      this.resourceMap[i].otherCharges = mySelectedlist[0].otherCharges;
    }
}
  setServiceProvideDate() {
    this.rbSprovider = new Date();
    this.rbSprovider = new Date(this.rbSprovider.getTime() -
      this.rbSprovider.getTimezoneOffset() * 60000)
    this.rbSprovider.setDate(this.rbSprovider.getDate());
    this.rbSprovider = this.rbSprovider.toISOString();
  }

  transformDateTime(value: string): any {
    let reggie = /(\d{2})\/(\d{2})\/(\d{4})\s(\d{2}):(\d{2})/;
    let dateArray = reggie.exec(value);
    let dateObject = new Date(
      (+dateArray[3]),
      ((+dateArray[2])) - 1, // month starts at 0!
      (+dateArray[1]),
      (+dateArray[4]),
      (+dateArray[5])).toISOString();
    return dateObject;
  }

  isActualRequired(actValue:any) {
    if(this.isAdminEditMode() == true) {
      return false;
    } else if(null == actValue || actValue.length<1){
      return true;
    } else {
      return false;
    }
  }

  isDisabled() {
    if (this.mode == "edit") {
      if (this.rbIdSearchResult && this.rbIdSearchResult.wrkflwStatus &&
          (this.rbIdSearchResult.wrkflwStatus == "Submitted" ||
          this.rbIdSearchResult.wrkflwStatus == "Rejected") && this.rbIdSearchResult.resourceBookingStatus &&
          (this.rbIdSearchResult.resourceBookingStatus != "Approved")) {
          this.showMandatory = true;
          this.isterminalselected=true;
          return false;
      }
      else {
        this.showMandatory = false;
        this.isterminalselected=false;
        this.selectContainer=true;
        this.addContainer=true;
        return true;
      }
    } else {
      this.showMandatory = true;
      return false;
    }
  }

  deleteDisabled(){
    if(null != this.saveUpdateReqModal.approver) {
      if (this.mode == "edit") {
        if (this.rbIdSearchResult && this.rbIdSearchResult.wrkflwStatus &&
          (this.rbIdSearchResult.wrkflwStatus == "Submitted" ||
            this.rbIdSearchResult.wrkflwStatus == "Rejected") && this.rbIdSearchResult.resourceBookingStatus &&
          (this.rbIdSearchResult.resourceBookingStatus != "Approved")) {
          this.showMandatory = true;
          this.isterminalselected = true;
          return false;
        }
        else {
          this.showMandatory = false;
          this.isterminalselected = false;
          this.selectContainer = true;
          this.addContainer = true;
          return true;
        }
      } else {
        this.showMandatory = true;
        return false;
      }
    } else {
      return true;
    }
  }

  // isTerminalSelected() {
  //   // if (this.mode == "edit") {
  //   //   return false
  //   // } else {
  //     return (!this.isterminalselected);
  //  // }
  // }

  onCusRefNoFocusChange(){
    if (this.saveUpdateReqModal.cusReferenceNo && this.utils.validate(this.saveUpdateReqModal.cusReferenceNo,
        '^([a-zA-Z0-9]{1,30})$')) {
      this.isError = true;
      return;
    }
  }

  isCusRefEditable() {
    if (this.mode == "edit") {
      if (this.rbIdSearchResult && this.rbIdSearchResult.wrkflwStatus &&
          this.rbIdSearchResult.wrkflwStatus == "Submitted"&& this.rbIdSearchResult.resourceBookingStatus &&
        (this.rbIdSearchResult.resourceBookingStatus != "Approved")) {
          this.showMandatory = true;
          this.isterminalselected=true;
          return false;
      }
      else {
        this.showMandatory = false;
        this.isterminalselected=false;
        return true;
      }
    } else {
      this.showMandatory = true;
      return false;
    }
  }
}
class TradeType {
  tdtype: string;
  search: Map<string, string>;

  constructor(tdtype: string) {
    this.tdtype = tdtype;
    this.search = new Map();
    if (tdtype == "Import") {
      this.search.set("Container No", "Container No");
      this.search.set("DO No", "DO No");
    } else if (this.tdtype == "Export") {
      this.search.set("Container No", "Container No");
      this.search.set("CA No", "CA No");
    } else if (this.tdtype == "T/S") {
      this.search.set("Container No", "Container No");
    }
  }

}
