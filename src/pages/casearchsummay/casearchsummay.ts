import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, Navbar, NavController, NavParams, Platform} from 'ionic-angular';
import {CasearchdetailviewPage} from "../casearchdetailview/casearchdetailview";
import {ContainerAcceptanceModel} from "../../shared/model/containeracceptance/containeracceptance.model";
import {ContaineracceptanceProvider} from "../../providers/webservices/containeracceptanceservices";
import {CasearchresultPage} from "../casearchresult/casearchresult";
import {CahistoryPage} from "../cahistory/cahistory";
import {SecurityUtility} from "../../shared/securityutility";
import {Utils} from "../../shared/utils";

/**
 * Generated class for the CasummayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-casearchsummay',
  templateUrl: 'casearchsummay.html',
  providers: [ContainerAcceptanceModel, SecurityUtility, Utils]
})


export class Casearchsummay {

  @ViewChild('navbar') navBar: Navbar;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  public acceptanceNo: any;
  public acceptanceType: string;
  public linerBookingNo: string;
  public rotationNo: string;
  public shipperForwarder: string;
  public chaForwarder: string;
  public emptyYard: string;
  public cfs: string;
  public status: string;
  public statusIcon: string;
  public hideEditOption: boolean;
  public hideCancelOption: boolean;
  public hidePrintOption: boolean = true;
  public isfromCreateorAmend: boolean;
  public totalContainer: string;
  public vessalcutoff: string;
  public vessalName: string;
  public portofDischarge: string;

  public isfromCreate: boolean = false;

  cancelMessage: string;
  confirmBox: string;
  alertButtonOk: string;
  alertButtonCancel: string;
  alertButtonDismiss: string;
  notificationMessage: string;
  alerttitle: string;
  canCancel: boolean;
  canAmend: boolean;
  public showAmendMessage: boolean = false;
  public catotalNoofContainers: string;
  public vesselCutOfDateSuccess: string;
  public vesselName: string;
  public portOfDischarge: string;
  status_icon: any;
  /*to hide and show feilds in Summary Screen - Default Summary Screen and after successful amend/create*/
  fromCaSearch: boolean;

  _detailViewPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
              public caProvider: ContaineracceptanceProvider, public utils: Utils,
              public alertCtrl: AlertController, public securityUtility: SecurityUtility,
              public responseModel: ContainerAcceptanceModel, public requestwithID: ContainerAcceptanceModel) {
    this.showAmendMessage = this.navParams.get('showAmendMessage');

    this.acceptanceNo = this.navParams.get('acceptanceNo');
    this.status = this.navParams.get('status');
    this.statusIcon = this.navParams.get('status_icon');
    this.fromCaSearch = this.navParams.get('fromCAResults');
    this.cancelMessage = this.utils.getLocaleString("ca_cancel_message");
    this.confirmBox = this.utils.getLocaleString("ca_confirm_box");
    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.alertButtonCancel = this.utils.getLocaleString("ca_cancel");
    this.alertButtonDismiss = this.utils.getLocaleString("ca_dismiss_txt");
    this.alerttitle = this.utils.getLocaleString("ca_alert");

    this.acceptanceType = this.navParams.get('acceptanceType');
    this.linerBookingNo = this.navParams.get('linerBookingNo');
    this.rotationNo = this.navParams.get('rotationNo');
    this.shipperForwarder = this.navParams.get('shipperForwarder');
    this.chaForwarder = this.navParams.get('chaForwarder');
    this.emptyYard = this.navParams.get('emptyYard');
    this.cfs = this.navParams.get('cfs');
  }

  ionViewWillEnter() {
    this.isfromCreateorAmend = true;
    this.hidePrintOption = true;
    this.loadCA();
    this.fromCaSearch = this.navParams.get('fromCAResults');

    if (null != localStorage.getItem('ca_vesselName')) {
      this.vessalName = localStorage.getItem('ca_vesselName');
      localStorage.removeItem('ca_vesselName');
    }

    if (null != localStorage.getItem('showAmendMessage')) {
      this.showAmendMessage = true;
      localStorage.removeItem('showAmendMessage');
    }
  }

  ionViewDidEnter() {
    this.isfromCreateorAmend = this.navParams.get('isfromCreateorAmend');
    /*After Create*/
    if (this.isfromCreateorAmend) {
      this.notificationMessage = this.utils.getLocaleString("ca_created_successfully");
      this.isfromCreate = true;
    }
    /*From Summary - Edited Successfully*/
    if (this._detailViewPage && (this.showAmendMessage == true)) {
      this.fromCaSearch = false;
      this.isfromCreateorAmend = true;
      this.isfromCreate = false;
      this._detailViewPage.then(data => {
        this.notificationMessage = this.utils.getLocaleString("ca_amended_successfully");
      });
    } else if (this.showAmendMessage)/*From Search Result - Edited Successfully*/ {
      this.isfromCreateorAmend = true;
      this.isfromCreate = true;
      this.notificationMessage = this.utils.getLocaleString("ca_amended_successfully");
    }
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.isfromCreateorAmend = true;
    this.hidePrintOption = true;
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.navigateBack();
    }
  }

  public navigateBack() {
    if (this.isfromCreate) {
      this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.getActive().index - 2));
    } else {
      this.navCtrl.pop();
    }
  }

  initializeBackButtonCustomHandler(): void {
    var _this = this;
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(function (event) {
      _this.navigateBack();
    }, 101); // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */
  }

  getStatusIcon(currentStatus: string) {
    switch (currentStatus) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Active Pending':
        return "assets/img/pending.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated In':
        return "assets/img/partial_gated.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Cancel Pending':
        return "assets/img/pending.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  getStyle() {
    return '#808080';
  }

  viewCA() {
    this.navCtrl.push(CasearchdetailviewPage, {
      acceptanceNo: this.acceptanceNo,
      mode: "view"
    });
  }

  /*to edit an existing Delivery order*/
  editCA() {
    this._detailViewPage = this.navCtrl.push(CasearchdetailviewPage, {
      acceptanceNo: this.acceptanceNo,
      mode: "edit",
      fromSummary: true
    });
  }

  seehistory() {
    this.navCtrl.push(CahistoryPage, {acceptanceNo: this.acceptanceNo});
  }

  hideEdit(status: string): boolean {
    if ((status == "Active" || status == "Active Pending" ||
        status == "Pending" || status == "Partial Gated In") && (this.canAmend == true)) {
      return false;
    }
    else {
      return true;
    }
  }

  /*var printStats = ['ACTIVE','ACTIVE PENDING','PARTIAL GATED IN'];*/
  hidePrint(status: string): boolean {
    if (status == "Active" || status == "Active Pending" || status == "Partial Gated In") {
      return false;
    }
    else {
      return true;
    }
  }

  hideCancel(status: string) {
    if ((status == "Active" || status == "Active Pending" ||
        status == "Pending" || status == "Expired") && (this.canCancel == true)) {
      return false;
    }
    else {
      return true;
    }
  }

  cancelCA() {
    let alert = this.alertCtrl.create({
      title: this.confirmBox,
      subTitle: this.cancelMessage,
      buttons: [
        {
          text: this.alertButtonOk,
          handler: () => {

            this.caProvider.CancelCA(this.requestwithID)
              .subscribe(response => {
                  this.responseModel = <ContainerAcceptanceModel>response;
                  this.navCtrl.popTo(CasearchresultPage);
                },
                error => {
                  this.presentAlert(this.alerttitle, error[0].message);
                });
          }
        }, {
          text: this.alertButtonCancel,
          handler: () => {
          },
        }]

    });
    alert.present();
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

  loadCA() {
    this.requestwithID.acceptanceNo = this.acceptanceNo;
    this.caProvider.getSearchbyIdResult(this.requestwithID).subscribe(
      response => {
        this.responseModel = <ContainerAcceptanceModel>response;
        this.disableFieldsForNominee();
        this.status = this.responseModel.status;
        this.statusIcon = this.getStatusIcon(this.responseModel.status);
        this.hideEditOption = this.hideEdit(this.status);
        this.hidePrintOption = this.hidePrint(this.status);
        this.hideCancelOption = this.hideCancel(this.status);
      }
    );
  }

  disableFieldsForNominee() {
    if (this.securityUtility.canCancel(this.securityUtility.CONTAINER_ACCEPTANCE) == true) {
      this.canCancel = true;
    } else {
      this.canCancel = false;
    }
    if (this.securityUtility.canAmend(this.securityUtility.CONTAINER_ACCEPTANCE) == true) {
      this.canAmend = true;
    } else {
      this.canAmend = false;
    }
  }

  viewDoDoc() {
    let args = new Map();
    args.set("containerAcceptanceNoSearch", this.requestwithID.acceptanceNo.toString());
    args.set("acceptanceSearch", this.responseModel.acceptanceType);
    args.set("rotationNumberSearch", this.responseModel.rotationNumber);
    args.set("time", new Date().getTime());
    this.caProvider.printCa(args);
  }
}
