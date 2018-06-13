import {Component, ViewChild} from '@angular/core';
import {
  AlertController, Content, FabContainer, IonicPage, ModalController, NavController,
  NavParams
} from 'ionic-angular';
import {Keyboard} from "@ionic-native/keyboard";
import {sortArray, sortNumberArray, Utils, sortDateWithTimeArray} from "../../../shared/utils";
import {DatePipe} from "@angular/common";
import {LoadDischargeMailPage} from "../../../components/loaddischargemodal/loaddischargemail/loaddischargemail";
import {LoadDischargeDownloadPage} from "../../../components/loaddischargemodal/loaddischargedownload/loaddischargedownload";
import {GiGoFilter} from "../gigofilter/gigofilter";

import {GiGosortPage} from "../gigosort/gigosort";
import {GiGoDetailsPage} from "../gigodetails/gigodetails";
import {GiGosummaryPage} from "../gigosummary/gigosummary";
import {GiGoCreatePage} from "../gigocreate/gigocreate";
import {DefinedSetReqModel} from "../../../shared/model/definedset/definedsetreq.model";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";
import {CommonservicesProvider} from "../../../providers/webservices/commonservices";
import {SortModel} from "../../../shared/model/sort.model";
import {GigoListSO, GigoSearchResultSO} from "../../../shared/model/GIGO/gigosearchresult.model";
import {GigoSearchSOModel} from "../../../shared/model/GIGO/gigosearch.model";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {SecurityUtility} from "../../../shared/securityutility";
import {GigoDetailsSO, LocationMasterSO, SubLocationMasterSO} from "../../../shared/model/GIGO/gigodetails.model";
import {DefinedSetResModel} from "../../../shared/model/definedset/definedsetres.model";
import {GIGOCancelContainerComponent} from "../../../components/gigomodelpage/gigo-cancel-container/gigo-cancel-container";
import {GigoEmailContainerComponent} from "../../../components/gigomodelpage/gigo-email-container/gigo-email-container";

/**
 * Generated class for the VesselloaddischargesummarysearchresultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gigosearchresult',
  templateUrl: 'gigosearchresult.html',
  providers: [Utils, SortModel, GigoSearchSOModel, SecurityUtility]
})
export class GiGoSearchResultPage {

  gigoSearchResult: GigoSearchResultSO[];
  gigoSearchResultListModal: GigoListSO;

  resultCount: number = 0;
  sortOption: any;
  sortOrder: boolean = false;
  selectedTitle: string;
  ascending: boolean = true;
  lengthofmainarray: number = 0;
  sendMail: boolean = true;
  pdfDownLoad: string = "pdf";
  csvDownLoad: string = "excel";
  createdFromDate: any;
  createdToDate: any;
  locationList: any[] = [];
  public definedSetListModel: DefinedsetresListModel[];
  public modeOfTransportList: DefinedSetResModel[] = [];
  public booleanList : DefinedSetResModel[] = [];
  public moveTypeList : DefinedSetResModel[] = [];
  public gateMasterList : DefinedSetResModel[] = [];
  public gateIngateOutList : DefinedSetResModel[] = [];
  public gigoStatusList : DefinedSetResModel[] = [];
  public gigoReleasebyList : DefinedSetResModel[] = [];
  public gigoRequesttypeList : DefinedSetResModel[] = [];
  public sealIssuerList : DefinedSetResModel[] = [];
  public sealStatusList : DefinedSetResModel[] = [];
  public sealTypeList : DefinedSetResModel[] = [];
  public ladenStatusList : DefinedSetResModel[] = [];
  locationMasterModel: LocationMasterSO [] = [];
  sublocationMasterModel: SubLocationMasterSO [] = [];

  public alertHeadding: string;
  public no_data_filter: string;
  public ok_text: string;
  gigoResult: GigoSearchResultSO[] ;
  multiSelected: boolean = false;
  startTime : any = 0
  timeDelta : any = 0;
  scrollMove: boolean =false;
  private isMultipleReleaseActive:boolean = false;
  @ViewChild(Content) content: Content;

  constructor(public keyboard: Keyboard,
              public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
              public datepipe: DatePipe, public securityUtility: SecurityUtility,
              public utils: Utils, private commonServices: CommonservicesProvider,
              public alertCtrl: AlertController, private gigoSearchModel: GigoSearchSOModel,
              public gigoSortModel: SortModel, public gigoServiceProvider: GiGoServiceProvider) {

    this.getDefinedSet();
    this.getLocation();
    this.alertHeadding = this.utils.getLocaleString("alert");
    this.no_data_filter = this.utils.getLocaleString("vesselsearchalert");
    this.ok_text = this.utils.getLocaleString("ok_text");
    this.selectedTitle = "gigoNo";
    localStorage.removeItem('gigoCreatedFrom');
    localStorage.removeItem('gigoCreatedTo');
  }
isScrolling:boolean = false;
  ionViewDidLoad() {
    // this.loadRequest();
    //
    // this.content._scrollContent.nativeElement.addEventListener("touchmove", function (e) {
    //   this.isScrolling = true;
    // }, false);
    this.content.ionScrollStart.subscribe((data) => {
      this.isScrolling = true;

    });
    this.content.ionScroll.subscribe((data) => {
      this.isScrolling = true;
    });
    this.content.ionScrollEnd.subscribe((data) => {
      this.isScrolling = false;
    });

  }

  ionViewWillEnter() {
    //this.loadFilterRequest();
    if (null == localStorage.getItem('gigoCreatedFrom') || ("" == localStorage.getItem('gigoCreatedFrom'))) {
      this.createdFromDate = new Date();
      this.createdFromDate.setDate(this.createdFromDate.getDate() - 7);
      this.createdFromDate = this.createdFromDate.toISOString();
      localStorage.setItem('gigoCreatedFrom', this.createdFromDate);
    }
    else {
      this.createdFromDate = localStorage.getItem('gigoCreatedFrom');
      this.createdFromDate = new Date(this.createdFromDate);
      this.createdFromDate = this.datepipe.transform(this.createdFromDate, 'yyyy-MM-dd');
    }
    if (null == localStorage.getItem('gigoCreatedTo') || ("" == localStorage.getItem('gigoCreatedTo'))) {
      this.createdToDate = new Date().toISOString();
      localStorage.setItem('gigoCreatedTo', this.createdToDate);
    }
    else {
      this.createdToDate = localStorage.getItem('gigoCreatedTo');
      this.createdToDate = new Date(this.createdToDate);
      this.createdToDate = this.datepipe.transform(this.createdToDate, 'yyyy-MM-dd');
    }
    let varcreatedFromDate = this.datepipe.transform(this.createdFromDate, 'dd/MM/yyyy');
    let varcreatedToDate = this.datepipe.transform(this.createdToDate, 'dd/MM/yyyy');
    this.gigoSearchModel.startDate = varcreatedFromDate;
    this.gigoSearchModel.endDate  = varcreatedToDate;
    this.gigoResult = [];

    this.searchGigo();
  }

  keyboardClose() {
    this.keyboard.close();
  }

  getDefinedSet() {
    let definedSetReqModel = new DefinedSetReqModel();
    definedSetReqModel.definedSetNames = ['BOOLEAN','MODE_OF_TRANSPORT',  'GATE_MASTER', 'MOVE_TYPE', 'SEARCH_BY_GATE_IN_OUT' , 'GIGO_STATUS',
      'GIGO_RELEASE_BY' , 'GIGO_REQUEST_TYPE' , 'SEAL_ISSUER' , 'SEAL_STATUS' ,'SEAL_TYPE' , 'LADEN_STATUS'];
    definedSetReqModel.lang = 'en';
    this.commonServices.getDefinedSet(definedSetReqModel)
      .subscribe(responseArray => {
          this.definedSetListModel = <DefinedsetresListModel[]> responseArray;
          for (let i = 0; i < this.definedSetListModel.length; i++) {



            if (this.definedSetListModel[i].definedSetName == 'BOOLEAN') {
              this.booleanList = this.definedSetListModel[i].definedSetValues;
            }
            if (this.definedSetListModel[i].definedSetName == 'MODE_OF_TRANSPORT') {
              this.modeOfTransportList = this.definedSetListModel[i].definedSetValues;
              /* Remove --select-- if not needed */
              /*   if (this.modeOfTransportList.length > 0 && this.modeOfTransportList[0].definedSetValueCode == '') {
                   this.modeOfTransportList.splice(0, 1);
                 }*/
            }

            if (this.definedSetListModel[i].definedSetName == 'MOVE_TYPE') {
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
        },
        error => {
          //Show error message
        });
  }

  getLocation (){
    let gigoDetailsSO:GigoDetailsSO = new GigoDetailsSO();
    let listAllLocation: Array<any> = [];
    this.gigoServiceProvider.gigoLocationMaster(gigoDetailsSO, false)
      .subscribe(response => {
          this.locationMasterModel =  response.locationMasterList;

        },
        error => {

        });
  }

  touchStartEventFired(selSource,index) {
    this.startTime = Date.now();
  }
  multiselectionEndtime = 0;
  touchLeaveEventFired(selSource,index,event) {
    if(this.isScrolling == true){
      return;
    }
    let endTime = Date.now();
    this.timeDelta = endTime - this.startTime;
    let roundedTime = Math.round(this.timeDelta)
    if(this.gigoResult.length == 0){
      this.isMultipleReleaseActive = false;
    }
    if(this.isMultipleReleaseActive ==  true){
      if (roundedTime >= 40 && roundedTime < 1000) {

        if (selSource.longPressFired != 'true') {
          selSource.longPressFired = 'true';
          this.gigoResult.push(selSource);
        }
        else {
          this.gigoResult.splice(this.gigoResult.indexOf(selSource), 1);
          selSource.longPressFired = 'false';
          event.preventDefault();
          if(this.gigoResult.length == 0){
            this.multiselectionEndtime = Date.now();
          }
          this.lastMutiselectionTime = 100
          console.log("The lastMutiselectionTime "+ this.lastMutiselectionTime );
        }
      }
    } else {

      if (roundedTime >= 1000){
        if(selSource.longPressFired != 'true') {
          selSource.longPressFired = 'true';
          this.gigoResult.push(selSource);
        }
       /* else {
          this.gigoResult.splice(this.gigoResult.indexOf(selSource), 1);
          selSource.longPressFired = 'false';
          event.preventDefault();
          this.multiselectionEndtime = Date.now();
          this.lastMutiselectionTime = 100
          setTimeout(function() {
            this.lastMutiselectionTime = 0;
          }, 120);

        }*/
        this.isMultipleReleaseActive = true;
      }
    }
    if(this.gigoResult.length == 0){
      this.isMultipleReleaseActive = false;

    }
  }

  /* loadFilterRequest() {
    if (this.gigoSearchModel.gateInGateOutNo != null) {
      this.gigoSearchModel.gateInGateOutNo = this.gigoSearchReqModal.gateInGateOutNo;
      this.gigoSearchModel.advSearchBy = '';
      this.gigoSearchModel.chassisNoSearch = '';
      this.gigoSearchModel.containerAcceptanceNoSearch = '';
      this.gigoSearchModel.containerNoSearch = '';
      this.gigoSearchModel.containerReleaseNoSearch = '';
      this.gigoSearchModel.createdBy = '';
      this.gigoSearchModel.damageSearch = '';
      this.gigoSearchModel.deliveryOrderNoSearch = '';
      this.gigoSearchModel.eIRNoSearch = '';
      this.gigoSearchModel.endDate = '';
      this.gigoSearchModel.locationSearch = '';
      this.gigoSearchModel.moveTypeSearch = '';
      this.gigoSearchModel.nominateTransporterNoSearch = '';
      this.gigoSearchModel.sealSearch = '';
      this.gigoSearchModel.spNameSearch = '';
      this.gigoSearchModel.startDate = '';
      this.gigoSearchModel.statusSearch = '';
      this.gigoSearchModel.truckNoSearch = '';
    } else {
      this.gigoSearchModel = Object.assign({}, this.gigoSearchReqModal);
    }
  }*/

  private searchGigo() {

    this.gigoServiceProvider.gigoSearchAll(this.gigoSearchModel, true).subscribe(response => {
        this.gigoSearchResultListModal = <GigoListSO> response;
        this.gigoSearchResult = this.gigoSearchResultListModal.list;
        this.resultCount = this.gigoSearchResult.length;
        if (this.gigoSortModel.sortOption && this.gigoSearchResult) {
          this.selectedTitle = this.gigoSortModel.sortOption ? this.gigoSortModel.sortOption : '';
          this.ascending = this.gigoSortModel.sortOrder != null ? this.gigoSortModel.sortOrder : true;
        } else {
          this.ascending = false;
        }
        this.asc();
        this.content.scrollToTop(0);
        if (null != this.resultCount && this.resultCount == 0) {
          const alert = this.alertCtrl.create({
            title: this.alertHeadding,
            subTitle: this.no_data_filter,
            buttons: [this.ok_text]
          });
          alert.present();
        }
      },
      error => {
        if (this.gigoSortModel.fromSort == false) {
          const alert = this.alertCtrl.create({
            title: this.alertHeadding,
            subTitle: error[0].message,
            buttons: [this.ok_text]
          });
          alert.present();
        }
      });
  }

  getStyle(s) {
    return '#808080';
  }

  hideCreate(): boolean {
    if (this.securityUtility.canAmend(this.securityUtility.GIGO) == true) {
      return false;
    } else {
      return true;
    }
  }

  openGiGoCreate() {
    this.navCtrl.push(GiGoCreatePage);
  }

  gigoMailDownLoad(rotationNum: any, downloadMode: string, mailStatus: boolean) {

  }

  getStatusIcon(gigoStatus) {
    switch (gigoStatus) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated In':
        return "assets/img/partial_gated.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  goVldsView(index: any) {
    this.navCtrl.push(GiGoDetailsPage, {
      gigoSearchResult: this.gigoSearchResult[index]
    });

  }

  hideShowButton(selGigo){
    if(selGigo.nominated || selGigo.status=='Cancelled'){
      return true;
    }
    else{
      return false;
    }
  }

  editGiGo(selGigo) {
    this.navCtrl.push(GiGoDetailsPage, {
      gigoNo: selGigo.gigoNo,
      mode: "edit",
      fromSummary: false
    });
  }

  viewGiGo(selGigo) {
    this.navCtrl.push(GiGoDetailsPage, {
      gigoNo: selGigo.gigoNo,
      mode: "view"
    });
  }
  cancelGiGo(selGigo) {
    this.navCtrl.push(GIGOCancelContainerComponent, {
      gigoId:  selGigo.gigoNo,
      gigoStatus: selGigo.status
    });
  }

  /*longPressHandle(event){
    console.log(event);
    console.log("Long Press!");
    this.multiSelected = event.select;
    if(this.multiSelected) {
      if (this.gigoResult) {
        this.gigoResult.push(event.value);
      }
    }
      else {
        if(this.gigoResult && this.gigoResult.length > 0) {
          for(let i =0;i<this.gigoResult.length ; i++) {
            if(this.gigoResult[i] == event.value) {
              this.gigoResult.splice(i,1);
            }
          }
        }
      }

  }*/

  lastMutiselectionTime=0;
  showSummarydetails(selGiGo: any) {
      /*if(this.lastMutiselectionTime  != 0){
        return;
      }*/
      if(this.isScrolling == true){
        return;
      }
      if (!this.multiRequestSelected()) {
        if (/*this.multiselectionEndtime!= 0 && */((Date.now() - this.multiselectionEndtime)) / 1000 < .8) {
          return;
        }
        this.navCtrl.push(GiGosummaryPage, {
          selectedGiGoData: selGiGo,
        });
      }
  }

  // showVldsDetails(index: any) {
  //   this.navCtrl.push(GiGoDetailsPage, {
  //     gigoSearchResult: this.gigoSearchResult[index]
  //   });
  // }

  navigateToSort() {
    this.gigoSortModel.fromSort = false;
    this.navCtrl.push(GiGosortPage, {sortModal: this.gigoSortModel});
  }

  asc() {
    if (this.selectedTitle != "") {
      if (this.selectedTitle === 'gigoNo') {
        let searchData=this.gigoSearchResult;
        for(let res of searchData){
          res['sr_holdRequestNoSummary'] = parseInt(res.gigoNo);
        }
        this.gigoSearchResult = sortNumberArray(searchData, "sr_holdRequestNoSummary", this.ascending)
      }
      else if (this.selectedTitle === 'eirNo') {
        this.gigoSearchResult = sortArray(this.gigoSearchResult, "eirNo", this.ascending);
      }
      else if (this.selectedTitle === 'selectDays') {
        this.gigoSearchResult = sortDateWithTimeArray(this.gigoSearchResult, "selectDays", this.ascending);
      }
      else if (this.selectedTitle === 'truckNumber') {
        this.gigoSearchResult = sortArray(this.gigoSearchResult, "truckNumber", this.ascending);
      }
      else if (this.selectedTitle == 'moveType') {
        this.gigoSearchResult = sortArray(this.gigoSearchResult, "moveType", this.ascending);
      }
      else if (this.selectedTitle === 'location') {
        this.gigoSearchResult = sortArray(this.gigoSearchResult, "location", this.ascending);
      }
      else if (this.selectedTitle === 'status') {
        this.gigoSearchResult = sortArray(this.gigoSearchResult, "status", this.ascending);
      }
      else if (this.selectedTitle === 'chassisNo') {
        this.gigoSearchResult = sortArray(this.gigoSearchResult, "chassisNo", this.ascending);
      }
      else if (this.selectedTitle === 'containerNo') {
        this.gigoSearchResult = sortArray(this.gigoSearchResult, "containerNo", this.ascending);
      }
      this.lengthofmainarray = this.gigoSearchResult.length;
    }
  }


  navigateToFilter() {
    this.gigoSortModel.fromSort = false;
    this.navCtrl.push(GiGoFilter, {
      Request: this.gigoSearchModel,
      moveTypeList: this.moveTypeList,
      gigoStatusList:this.gigoStatusList,
      locationMasterModel: this.locationMasterModel,
      booleanList:this.booleanList,
      damageList:this.booleanList,
      gigoReleasebyList:this.gigoReleasebyList

    });
  }


  navigateToMail(){
    let gigoNo = "";
    let tempgigoResult:GigoSearchResultSO[];
    tempgigoResult = JSON.parse(JSON.stringify(this.gigoResult));
    if(tempgigoResult && tempgigoResult.length > 50) {
      tempgigoResult.splice(49,tempgigoResult.length-50);
    }
    for(let i=0; i<tempgigoResult.length; i++) {
      gigoNo=gigoNo+tempgigoResult[i].gigoNo;
      gigoNo=gigoNo+",";
    }

    this.navCtrl.push(GigoEmailContainerComponent, {gigoNo: gigoNo});

  }
  navigateToDownload(mode:string) {
    let args = new Map();
    let gigoNo = "";
    for(let i=0; i<this.gigoResult.length; i++) {
      gigoNo=gigoNo+this.gigoResult[i].gigoNo;
      gigoNo=gigoNo+",";
    }

    let moveType = "";
    for(let i=0; i<this.gigoResult.length; i++) {
      if(this.gigoResult[i].moveType!="" && this.gigoResult[i].moveType!=null) {
        moveType=moveType+this.gigoResult[i].moveType;
        moveType=moveType+",";
      }
    }


    args.set("gigoNo",  gigoNo);
    args.set("eIRNoSearch",  "");
    args.set("selectDays",  "");
    args.set("truckNoSearch",  "");
    args.set("moveTypeSearch",  moveType);
    args.set("locationSummary",  "");
    args.set("chassisNoSearch",  "");
    args.set("containerNoSearch",  "");
    args.set("statusSearch", "");
    args.set("clientCode",  "");
    args.set("exportType", mode);
    this.gigoServiceProvider.printGigo(args);

  }

  getStatus(status: string) {
    if (status == "YettoArrive") {
      status = "Yet to Arrive";
    }
    return status;
  }
  multiRequestSelected():boolean {
    if(this.gigoResult && this.gigoResult.length > 0) {
      return true;
    }
    return false;
  }
}
