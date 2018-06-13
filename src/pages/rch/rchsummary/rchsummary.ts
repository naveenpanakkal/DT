import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {SecurityUtility} from "../../../shared/securityutility";
import {Utils} from "../../../shared/utils";
import {RCHviewPage} from "../rchview/rchview";
import {RCHReleaseviewPage} from "../rchrelease/rchrelease";
import {
  ContainerHoldDetailsSO,
  ReleaseContainerSrchListSO
} from "../../../shared/model/hnrc/releasecontainersrch.model";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {ReleaseContainerSearchSO} from "../../../shared/model/hnrc/releasecontainersearch.model";


/**
 * Generated class for the RCHsummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-RCHsummary',
  templateUrl: 'rchsummary.html',
  providers: [SecurityUtility, Utils,ReleaseContainerSrchListSO]
})
export class RCHsummaryPage {
  @ViewChild('navbar') navBar: Navbar;

  hnrcSummaryData : ContainerHoldDetailsSO;
  hideReleaseOption:boolean=true;
  fromHoldContainer:boolean=false;
  fromSummary:boolean=true;
  holdReleaseNumber:any;
  releaseSearchRequest: ReleaseContainerSearchSO;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public hnrcServiceProvider: HrcservicesProvider,
              public platform: Platform,
              public hnrcSearchResultListModel: ReleaseContainerSrchListSO,
              public utils: Utils) {

    this.holdReleaseNumber = this.navParams.get("holdReleaseNumber");
    this.fromHoldContainer = this.navParams.get("fromHoldContainer");
    this.hnrcSummaryData = new ContainerHoldDetailsSO();
    this.hnrcSummaryData.holdStatus="";
    if(!this.fromHoldContainer || null == this.fromHoldContainer ) {
      this.hnrcSummaryData = this.navParams.get("hnrcSearchResult");
      if(this.hnrcSummaryData.holdStatus == "On Hold"  && this.hnrcSummaryData.holdBy == localStorage.getItem('LOGGEDINUSER')) {
        this.hideReleaseOption = false;
      }
    } else {
      this.getHoldDetails();
    }

  }

  ionViewWillEnter() {

  }
  ionViewDidLoad() {

    console.log('ionViewDidLoad RCHsummaryPage');
  }
  navigateBack() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(
      1));
  }

  getStatusIcon(s) {
    if(s && null != s) {
      switch (s.holdStatus) {
        case 'Released':
          return "assets/img/submitted.svg";
        case 'On Hold':
          return "assets/img/pending.svg";
        case 'Cancelled':
          return "assets/img/cancelled.svg";
        case 'Partial Gated In':
          return "assets/img/partial_gated.svg";
        case 'Completed':
          return "assets/img/completed.svg";
        case 'Expired':
          return "assets/img/expired.svg";
        default:
          return "assets/img/submitted.svg";
      }
    }
  }

  getStyle() {
    return '#808080';
  }

  viewRCH(){
    this.navCtrl.push(RCHviewPage,
      {hnrcViewResult: this.hnrcSummaryData});
  }

  viewRelease(){
    this.navCtrl.push(RCHReleaseviewPage,{hnrcReleaseCotainerHoldData: this.hnrcSummaryData
    , fromSummary: this.fromSummary});
  }

  downloadPDF(){
    let args = new Map();
    args.set("holdId", this.hnrcSummaryData.holdId) ;
    args.set("exportType", 'pdf');
      this.hnrcServiceProvider.hnrcDownload(args,
        "pdf");
  }

  downloadCSV(){
    let args = new Map();
    args.set("holdId", this.hnrcSummaryData.holdId) ;
    args.set("exportType", 'excel');
    this.hnrcServiceProvider.hnrcDownload(args,
      "csv");
  }

  private getHoldDetails() {
    this.releaseSearchRequest = new ReleaseContainerSearchSO();
    this.releaseSearchRequest.advSearchBy = "holdRequestNo";
    this.releaseSearchRequest.holdRequestNo = this.holdReleaseNumber;
    this.releaseSearchRequest.pageLength = 1;
    this.releaseSearchRequest.designation = "All";
    this.releaseSearchRequest.status = "All";
    this.releaseSearchRequest.draw = 2;
    this.hnrcServiceProvider.hnrcSearchAll(this.releaseSearchRequest).subscribe(response => {
      this.hnrcSearchResultListModel = <ReleaseContainerSrchListSO>response;
      if(this.hnrcSearchResultListModel) {
        this.hnrcSummaryData = this.hnrcSearchResultListModel.list[0];
      }
    });
  }
}
