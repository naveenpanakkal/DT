import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, IonicPage, Navbar, NavController, NavParams} from 'ionic-angular';
import {SecurityUtility} from "../../../shared/securityutility";
import {Utils} from "../../../shared/utils";
import {DatePipe} from "@angular/common";
import {HoldContainerEditandView} from "../holdcontainerEditandView/holdcontainerEditandView";

import {HChistoryPage} from "../holdcontainerhistory/holdcontainerhistory";
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {HoldContainerSearchresultPage} from "../holdcontainersearchresult/holdcontainersearchresult";
import {HoldContainerSO} from "../../../shared/model/hnrc/holdcontainerso.model";
import {DefinedsetresListModel} from "../../../shared/model/definedset/definedsetres-list.model";


/**
 * Generated class for the TasummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'holdcontainer-summary',
  templateUrl: 'holdcontainersummary.html',
  providers: [SecurityUtility, Utils, HoldContainerSO]
})
export class HoldContainerSummaryPage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  public selResource: any;
  containerCategoryList: DefinedsetresListModel[] = [];
  appointmentNoSearch: string;
  moveTypeSearch: string;
  status: string;
  canCancel: boolean;
  canAmend: boolean;
  statusIcon: string;
  cancelMessage: string;
  cancelConfirmedMessage: string;
  cancelledMessage: string;
  ExpiredMessage: string;
  cancelApproveMessage: string;
  cancelActiveMessage: string;
  isView: boolean;

  confirmBox: string = 'CONFIRM BOX';
  alertButtonOk: string;
  alertButtonCancel: string;
  alertButtonDismiss: string;
  alerttitle: string;
  hideCancelOption: boolean;
  hideEditOption: boolean;
  hidePrintOption: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public hrcservicesProvider: HrcservicesProvider,
              public securityUtility: SecurityUtility,
              public alertCtrl: AlertController,
              public utils: Utils,
              public responseModel: HoldContainerSO,
              public datepipe: DatePipe) {
    this.selResource = this.navParams.get('selResource');
    this.containerCategoryList = this.navParams.get('containerCategoryList');

    this.cancelApproveMessage = this.utils.getLocaleString("hold_cancel_message");
    this.cancelActiveMessage = this.utils.getLocaleString("hold_cancel_active_message");
    this.ExpiredMessage = this.utils.getLocaleString("hold_cancel_expired_message");
    this.cancelledMessage = this.utils.getLocaleString("hold_cancel_cancelled_message");
    this.alertButtonOk = this.utils.getLocaleString("gen_ok_text");
    this.alertButtonCancel = this.utils.getLocaleString("gen_cancel");
    this.alertButtonDismiss = this.utils.getLocaleString("gen_dismiss_txt");
    this.alerttitle = this.utils.getLocaleString("gen_alert");
  }

  ionViewWillEnter() {
    this.disableFields();
    this.getHoldDetails();

  }

  presentAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            alert.dismiss();
            this.navCtrl.popTo(HoldContainerSearchresultPage);
          }
        }
      ]
    });
    alert.present();
  }

  seehistory() {
    this.navCtrl.push(HChistoryPage, {holdRequestNo: this.selResource.holdRequestNo});

  }

  disableFields() {
    if (this.securityUtility.canCancel(this.securityUtility.HOLD_RELEASE_CONTAINER) == true) {
      this.canCancel = true;
    } else {
      this.canCancel = false;
    }

    if (this.securityUtility.canAmend(this.securityUtility.HOLD_RELEASE_CONTAINER) == true) {
      this.canAmend = true;
    } else {
      this.canAmend = false;
    }
  }

  getStatusIcon(holdStatus) {
    switch (holdStatus) {
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

  cancelHoldContainer(selResource) {
    if (this.selResource.holdStatus == "Approved") {
      this.cancelMessage = this.cancelApproveMessage;
      this.cancelConfirmedMessage = this.cancelledMessage;
    }
    else if (this.selResource.holdStatus == "Active") {
      this.cancelMessage = this.cancelActiveMessage;
      this.cancelConfirmedMessage = this.ExpiredMessage;
    }
    let alert = this.alertCtrl.create({
      title: this.confirmBox,
      subTitle: this.cancelMessage,
      buttons: [
        {
          text: this.alertButtonOk,
          handler: () => {

            this.hrcservicesProvider.deleteByID(selResource)
              .subscribe(response => {
                  this.responseModel = <HoldContainerSO>response;
                  setTimeout(() => {
                    if (this.responseModel.holdStatus == "Cancelled"||this.responseModel.holdStatus == "Expired") {
                      this.presentAlert('Confirm', this.cancelConfirmedMessage);
                    }
                  }, 500);
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

  hideCancel(status: string) {
    if (this.canCancel == false) {
      return true;
    }
    if (status == "Cancelled" || status == "Expired") {
      return true;
    } else {
      return false;
    }
  }

  hideEdit(status: string) {
    if (this.canAmend == false) {
      return true;
    }
    if ((status == "Cancelled" || status == "Expired")) {
      return true;
    } else {
      return false;
    }
  }

  goToView(s) {
    this.navCtrl.push(HoldContainerEditandView, {
      holdRequestNo: this.selResource.holdRequestNo,
      isView: true,
      fromHistory: false
    });
  }

  goToEdit(s) {
    this.navCtrl.push(HoldContainerEditandView, {
      holdRequestNo: this.selResource.holdRequestNo,
      isView: false,
      fromHistory: false
    });
  }

  getStyle() {
    return '#808080';
  }

  private getHoldDetails() {
    let holdContainerRequest: HoldContainerSO = new HoldContainerSO();
    holdContainerRequest.holdRequestNo = this.selResource.holdRequestNo;
    this.hrcservicesProvider.getSearchByID(holdContainerRequest, false).subscribe(response => {
      this.responseModel = <HoldContainerSO>response;
      this.selResource.holdStatus = this.responseModel.holdStatus;
      this.hideEditOption = this.hideEdit(this.selResource.holdStatus);
      this.hideCancelOption = this.hideCancel(this.selResource.holdStatus);
    }, error => {

    });
  }
}
