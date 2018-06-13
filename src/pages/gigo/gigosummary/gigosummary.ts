import {Component, ViewChild} from '@angular/core';
import {
  AlertController, Content, FabContainer, IonicPage, ModalController, Navbar, NavController,
  NavParams
} from 'ionic-angular';
import {SecurityUtility} from "../../../shared/securityutility";
import {Utils} from "../../../shared/utils";
import {DatePipe} from "@angular/common";
import {GigoSearchResultSO} from "../../../shared/model/GIGO/gigosearchresult.model";
import {GiGoDetailsPage} from "../gigodetails/gigodetails";
import {GigoHistoryPage} from "../gigohistory/gigohistory";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {GigoDetailsSO} from "../../../shared/model/GIGO/gigodetails.model";
import {GigoSearchByIdRequestModel} from "../../../shared/model/GIGO/gigosearchrequest.model";
import {GIGOCancelContainerComponent} from "../../../components/gigomodelpage/gigo-cancel-container/gigo-cancel-container";
import {GigoEmailContainerComponent} from "../../../components/gigomodelpage/gigo-email-container/gigo-email-container";


/**
 * Generated class for the TasummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gigosummary',
  templateUrl: 'gigosummary.html',
  providers: [SecurityUtility, Utils,GiGoServiceProvider,GigoDetailsSO,GigoSearchByIdRequestModel]
})
export class GiGosummaryPage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  appointmentNoSearch: string;
  moveTypeSearch: string;
  status: string;
  statusIcon: string;
  public selectedGiGoSearchData: GigoSearchResultSO;
  cancelMessage: string;
  confirmBox: string = 'ATTENTION';
  alertButtonOk: string;
  alertButtonCancel: string;
  alertButtonDismiss: string;
  alerttitle: string;
  hideCancelOption: boolean;
  hideEditOption: boolean;
  hidePrintOption: boolean;

  public selectedTab: any;
  selectedTabsIndex = 0;
  currentSearchID:GigoSearchByIdRequestModel = new GigoSearchByIdRequestModel();
  public gigoSearchResult:GigoDetailsSO = new GigoDetailsSO();

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,
              public alertCtrl: AlertController, public utils: Utils, public datepipe: DatePipe,
              public gigoServiceProvider: GiGoServiceProvider) {
    this.selectedGiGoSearchData = <GigoSearchResultSO>this.navParams.get('selectedGiGoData');

    this.statusIcon = this.getStatusIcon(this.selectedGiGoSearchData.status);
    this.status = this.selectedGiGoSearchData.status;
    this.currentSearchID.gigoNo = this.selectedGiGoSearchData.gigoNo;
    this.cancelMessage = this.utils.getLocaleString("ta_cancel_message");
    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.alertButtonCancel = this.utils.getLocaleString("ca_cancel");
    this.alertButtonDismiss = this.utils.getLocaleString("ca_dismiss_txt");
    this.alerttitle = this.utils.getLocaleString("ca_alert");

  }

  ionViewWillEnter() {
    this.sendSearchByIdRequest();
  }

  sendSearchByIdRequest()
  {
    this.gigoServiceProvider.gigoSearchById(this.currentSearchID, true).subscribe(response=> {
      this.gigoSearchResult = <GigoDetailsSO>response;
      this.showEditCancelButton();
      this.status=this.gigoSearchResult.status;
      this.statusIcon=this.getStatusIcon(this.gigoSearchResult.status);
    },error =>{

    });
  }

  showEditCancelButton()
  {
    if(this.gigoSearchResult.isNominated == 'Y' || this.gigoSearchResult.status=='Cancelled')
    {
      this.hideEditOption = true;
      this.hideCancelOption = true;
    }
    else {
      this.hideEditOption = false;
      this.hideCancelOption = false;
    }
  }

  cancelGiGo(fab: FabContainer) {
      this.navCtrl.push(GIGOCancelContainerComponent, {
        gigoId:  this.gigoSearchResult.gigoNo,
        gigoStatus: this.gigoSearchResult.status
      });

    fab.close();
  }

  parsedate(dtstring) {
    if (dtstring != null) {
      let pattern = /(\d{2})(\d{2})(\d{4})/;
      dtstring = dtstring.replace("/", "");
      dtstring = dtstring.replace("/", "");
      let date = dtstring.replace(pattern, '$3-$2-$1');
      return date;
    }
    else {
      return null;
    }
  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{
        text: this.alertButtonDismiss,
        handler: () => {
          alert.dismiss();
        }
      }]
    });
    alert.present();
  }

  seeHistory(fab: FabContainer) {
    this.navCtrl.push(GigoHistoryPage, {
      gigoId:  this.gigoSearchResult.gigoNo,
      location: this.gigoSearchResult.locationName,
      spname: this.gigoSearchResult.spLocationName
      // fromSummary: true
    });

    fab.close();
  }

  editGiGo(fab: FabContainer) {
    this.navCtrl.push(GiGoDetailsPage, {
      gigoNo: this.selectedGiGoSearchData.gigoNo,
      fromSummary: true,
      mode: "edit"
    });
    fab.close();
  }

  viewGiGo(fab: FabContainer) {
    this.navCtrl.push(GiGoDetailsPage, {
      gigoNo: this.selectedGiGoSearchData.gigoNo,
      mode: "view"
    });
    fab.close();
  }

  getStatusIcon(gigoStatus) {
    switch (gigoStatus) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
    }
  }

  getStyle() {
    return '#808080';
  }

  navigateToMail(){
    let emailModal = this.modalCtrl.create(GigoEmailContainerComponent, {
      gigoNo: this.selectedGiGoSearchData.gigoNo
    });
    emailModal.onDidDismiss(data => {
      if (null != data) {
      }
    });
    emailModal.present();
  }
  navigateToDownload(mode:string) {
    let args = new Map();
    args.set("gigoNo",  this.selectedGiGoSearchData.gigoNo);
    args.set("eIRNoSearch",  this.selectedGiGoSearchData.eirNo);
    args.set("selectDays",  this.selectedGiGoSearchData.selectDays);
    args.set("truckNoSearch",  this.selectedGiGoSearchData.truckNumber);
    args.set("moveTypeSearch",  this.selectedGiGoSearchData.moveType);
    args.set("locationSummary",  this.selectedGiGoSearchData.location);
    args.set("chassisNoSearch",  this.selectedGiGoSearchData.chassisNo);
    args.set("containerNoSearch",  this.selectedGiGoSearchData.containerNo);
    args.set("statusSearch", this.selectedGiGoSearchData.status);
    args.set("clientCode",  "");
    args.set("exportType", mode);
    this.gigoServiceProvider.printGigo(args);

  }
}
