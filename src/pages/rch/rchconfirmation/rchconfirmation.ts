import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {SecurityUtility} from "../../../shared/securityutility";
import {Utils} from "../../../shared/utils";
import {RCHviewPage} from "../rchview/rchview";
import {ContainerHoldDetailsSO} from "../../../shared/model/hnrc/releasecontainersrch.model";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";

/**
 * Generated class for the RbviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rc-container',
  templateUrl: 'rchconfirmation.html',
  providers: [SecurityUtility, Utils]
})

export class RchConfirmation {
  @ViewChild('navbar') navBar: Navbar;

  hnrcSummaryData : ContainerHoldDetailsSO;
  hnrcReleasedItems : ContainerHoldDetailsSO[] = [];

  hideReleaseOption:boolean=true;
  status = "Released";
  public unregisterBackButtonAction: any;
  fromSummary: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public hnrcServiceProvider: HrcservicesProvider,
              public platform: Platform,
              public utils: Utils) {
    this.fromSummary = this.navParams.get('fromSummary');
    this.hnrcSummaryData = this.navParams.get("hnrcReleaseCotainerHoldData");

    if(this.hnrcSummaryData.holdStatus == "On Hold"  && this.hnrcSummaryData.holdBy == localStorage.getItem('LOGGEDINUSER')) {
      this.hideReleaseOption = false;
    }

    let unFormattedItems = this.navParams.get("hnrcReleaseCotainerHoldData");
    this.hnrcReleasedItems = [];
    for(let hnrcReleasedItem of unFormattedItems){
      if(hnrcReleasedItem.holdStatus == "On Hold"  && hnrcReleasedItem.holdBy == localStorage.getItem('LOGGEDINUSER')) {
        this.hnrcReleasedItems.push(hnrcReleasedItem);
      }
    }

  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      if (this.fromSummary) {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4));
      } else {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
      }
    }
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      if (_this.fromSummary) {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 4));
      } else {
        this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
      }

    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  navigateBack() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(
      1));
  }

  getStatusIcon(s) {
    switch (s.holdStatus) {
      case 'Released':
        return "assets/img/submitted.svg";
      case 'On Hold':
        return "assets/img/pending.svg";
      case 'Approved':
        return "assets/img/approved.svg";
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
      default:
        return "assets/img/approved.svg";
    }
  }

  getStyle() {
    return '#808080';
  }

  viewRCH(){
    this.navCtrl.push(RCHviewPage,
      {hnrcViewResult: this.hnrcSummaryData});
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

}

