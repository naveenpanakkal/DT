import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, Navbar, Platform, FabContainer } from 'ionic-angular';
import {DosearchdetailviewPage} from "../dosearchdetailview/dosearchdetailview";
import {DohistoryPage} from "../dohistory/dohistory";
import {DeliveryorderreqModel} from "../../shared/model/deliveryorder/deliveryorderreq.model";
import {DeliveryorderservicesProvider} from "../../providers/webservices/deliveryorderservices";
import {DosearchresultPage} from "../dosearchresult/dosearchresult";
import {SearchdeliveryorderreqModel} from "../../shared/model/deliveryorder/searchdeliveryorder/searchdeliveryorderreq.model";
import {Utils} from "../../shared/utils";

@IonicPage()
@Component({
  selector: 'page-dosearchsummary',
  templateUrl: 'dosearchsummary.html',
  providers: [DeliveryorderservicesProvider, DeliveryorderreqModel, SearchdeliveryorderreqModel, Utils]
})
export class DosearchsummaryPage {

  @ViewChild('navbar') navBar: Navbar;

  // Property used to store the callback of the event handler to unsubscribe to it when leaving this page
  public unregisterBackButtonAction: any;

  DOstatus: any;
  DOrequestno: any;
  DOagentno: any;
  DOrotateno: any;
  DObolno: any;
  DOmrnno: any;
  DOtype: any;
  DOTradeType: any;
  DOcreateddate: any;
  DOvaliditydate: any;
  DOhbillofLadingNo: any;
  DOtotalContainers: any;

  DOStatusIcon: any;
  notificationMessage: string;

  hideEditOption: boolean;
  hideCancelOption: boolean;
  public hidePrintOption: boolean = true;
  isFromCreate: boolean = false;
  isFromAmend: boolean = false;

  _detailViewPage: any;
  public showAmendMessage: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
              public deliveryorderreqmodel: DeliveryorderreqModel, public alertCtrl: AlertController, public utils: Utils,
              public deliveryorderservicesprovider: DeliveryorderservicesProvider,
              public customFilter: SearchdeliveryorderreqModel) {

    this.isFromCreate = this.navParams.get('isFromCreate');
    this.isFromAmend = this.navParams.get('isFromAmend');

    this.DOstatus = navParams.get('DOstatus');
    this.DOrequestno = navParams.get('DOrequestno');
    this.DOagentno = navParams.get('DOagentno');
    this.DOrotateno = navParams.get('DOrotateno');
    this.DObolno = navParams.get('DObolno');
    this.DOmrnno = navParams.get('DOmrnno');
    this.DOtype = navParams.get('DOtype');
    this.DOTradeType = navParams.get('DOTradeType');
    this.DOcreateddate = navParams.get('DOcreateddate');
    this.DOvaliditydate = navParams.get('DOvaliditydate');
    this.DOStatusIcon = navParams.get('DOstatus_icon');
    this.DOtotalContainers = navParams.get('DOtotalcontainers');

    this.customFilter = this.navParams.get('filter');

    this.hideEditOption = this.hideEdit();
    this.hideCancelOption = this.hideCancel();
    this.hidePrintOption = this.hidePrint();

    if (null != localStorage.getItem('do_showAmendMessage')) {
      this.showAmendMessage = true;
      localStorage.removeItem('do_showAmendMessage');
    }
  }

  ionViewDidEnter() {

    if (this.isFromCreate) {
      this.notificationMessage = this.utils.getLocaleString("do_created_successfully");
    }
    if (this._detailViewPage && (this.showAmendMessage == true)) /*From Summary - Edited Successfully*/ {
      this.isFromCreate = false;
      this.isFromAmend = true;
      this._detailViewPage.then(data => {
        this.notificationMessage = this.utils.getLocaleString("do_amended_successfully");
      });
    } else if (this.isFromAmend)/*From Search Result - Edited Successfully*/ {
      this.isFromCreate = true;
      this.notificationMessage = this.utils.getLocaleString("do_amended_successfully");
    }
  }

  loadDO() {
    this.deliveryorderreqmodel.deliveryOrderNo = this.DOrequestno;
    this.deliveryorderservicesprovider.getDOdetails(this.deliveryorderreqmodel)
      .subscribe(response => {
        this.deliveryorderreqmodel = <DeliveryorderreqModel>response;
        if(null != localStorage.getItem('do_validityDate')) {
          this.DOvaliditydate = localStorage.getItem('do_validityDate');
          localStorage.removeItem('do_validityDate');
        }else{
          this.DOvaliditydate = this.deliveryorderreqmodel.dOValidityDate;
        }
        if(null != localStorage.getItem('do_totalcontainers')) {
          this.DOtotalContainers = Number(localStorage.getItem('do_totalcontainers'));
          localStorage.removeItem('do_totalcontainers');
        }else{
          this.DOtotalContainers = this.deliveryorderreqmodel.totalNoOfContainers;
        }
        this.DOhbillofLadingNo = this.deliveryorderreqmodel.hbillofLadingNo;
      });
  }

  getDOType(): string {
    if (this.DOtype == "Empty") {
      return "E";
    } else if (this.DOtype == "FCL") {
      if (this.DOTradeType == "Coastal") {
        return "FC";
      } else {
        return "FF";
      }
    } else if (this.DOtype == "LCL") {
      return "L";
    }else{
      return "";
    }
  }

  showBillOfLading():boolean{
    if (this.DOtype == "LCL" || ( this.DOtype =="FCL" && this.DOTradeType == "Foreign")){
      return true;
    }else{
      return false;
    }
  }

  showHouseBillOfLading():boolean{
    if (this.DOtype == "LCL" ){
      return true;
    }else{
      return false;
    }
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
      case 'Partial Gated Out':
        return "assets/img/partial gated out.svg";
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

  viewDO(fab: FabContainer ) {
    this.navCtrl.push(DosearchdetailviewPage, {DOrequestno: this.DOrequestno});
    fab.close();
  }

  /*to edit an existing Delivery order*/
  editDO(fab: FabContainer) {
    this._detailViewPage = this.navCtrl.push(DosearchdetailviewPage, {
      DOrequestno: this.DOrequestno,
      mode: 'edit',
      fromSummary: true
    });
    fab.close();
  }

  seehistory() {
    this.navCtrl.push(DohistoryPage, {DOrequestno: this.DOrequestno});
  }

  viewDoDoc() {
    let args = new Map();
    args.set("dORequestNoSearch", this.deliveryorderreqmodel.deliveryOrderNo.toString());
    args.set("dOtypeSearch", this.deliveryorderreqmodel.doType);
    args.set("tradeTypeSearch", this.DOTradeType);
    this.deliveryorderservicesprovider.viewDo(args);
  }

  ionViewWillLeave() {
    // Unregister the custom back button action for this page
    this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

  ionViewWillEnter() {
    this.loadDO();
    if (null != localStorage.getItem('do_showAmendMessage')) {
      this.showAmendMessage = true;
      localStorage.removeItem('do_showAmendMessage');
    }
    /*Gathering from Storage as 2 calls - invocation of searchByDO service in milliseconds gaps after
    savemodifiedDo is giving old data*/
    if (null != localStorage.getItem('do_status')) {
      this.DOstatus = localStorage.getItem('do_status');
      this.DOStatusIcon = this.getStatusIcon(this.DOstatus);
      localStorage.removeItem('do_status');
    }


  }

  ionViewDidLoad() {
    this.initializeBackButtonCustomHandler();
    this.navBar.backButtonClick = () => {
      this.navigateBack();
    }
  }

  public navigateBack() {
    if (this.isFromCreate) {
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

  hideEdit(): boolean {
    if (this.DOstatus == "Cancelled" || this.DOstatus == "Completed") {
      return true;
    }
    else {
      return false;
    }
  }

  bolOrMrnStatus() {
    if (this.DOtype == "LCL") {
      return false;
    } else if (this.DOtype == "FCL") {
      if (this.DOTradeType == "Foreign") {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  hideCancel() {
    if (this.DOstatus == "Cancelled" || this.DOstatus == "Completed" ||
      this.DOstatus == 'Partial Gated Out' || this.DOstatus == 'Cancel Pending') {
      return true;
    }
    else {
      return false;
    }
  }
  hidePrint(): boolean {
    if (this.DOstatus == "Cancelled" || this.DOstatus == "Completed" || this.DOstatus == "Cancel Pending" || this.DOstatus == "Expired") {
      return true;
    }
    else {
      return false;
    }
  }

  cancelDO() {
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'This action will cancel the Delivery Order. Do you want to proceed?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.deliveryorderservicesprovider.CancelDO(this.deliveryorderreqmodel, true)
              .subscribe(response => {
                this.deliveryorderreqmodel = <DeliveryorderreqModel>response;
                this.navCtrl.popTo(DosearchresultPage);
              });
          }
        }, {
          text: 'CANCEL',
          handler: () => {
          },
        }]

    });
    alert.present();
  }

}
