import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  Content,
  IonicPage,
  Navbar,
  NavController,
  NavParams,
  Slides,
  FabContainer
} from 'ionic-angular';
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {TaSearchSOModel} from "../../shared/model/ta/taSearchSO.model";
import {TruckappointmentdetailsoModel} from "../../shared/model/ta/truckappointmentdetailso.model";
import {SecurityUtility} from "../../shared/securityutility";
import {Utils} from "../../shared/utils";
import {TasearchresultPage} from "../tasearchresult/tasearchresult";
import {TahistoryPage} from "../tahistory/tahistory";
import {TaeditPage} from "../taedit/taedit";
import {TaviewPage} from "../taview/taview";
import {DatePipe} from "@angular/common";

/**
 * Generated class for the TasummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tasummary',
  templateUrl: 'tasummary.html',
  providers: [SecurityUtility, Utils]
})
export class TasummaryPage {
  @ViewChild('navbar') navBar: Navbar;
  @ViewChild(Content) content: Content;
  appointmentNoSearch: string;
  moveTypeSearch: string;
  status: string;
  statusIcon: string;
  public searchRequest: TaSearchSOModel;
  public searchResponse: TruckappointmentdetailsoModel;
  cancelMessage: string;
  appointmentDateTimeSlot: string;
  confirmBox: string = 'CONFIRM BOX';
  alertButtonOk: string;
  alertButtonCancel: string;
  alertButtonDismiss: string;
  alerttitle: string;
  hideCancelOption: boolean;
  hideEditOption: boolean;
  hidePrintOption: boolean;
  public tabs: Array<any>;
  public showTabs: Array<boolean> = [false, false, false, false, false];
  public showRightSlideNav: boolean;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public selectedTab: any;
  selectedTabsIndex = 0;
  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private taProvider: TruckappointmentserviceProvider,
              public alertCtrl: AlertController, public utils: Utils, public datepipe: DatePipe) {
    this.searchRequest = new TaSearchSOModel();
    this.appointmentNoSearch = this.navParams.get('appointmentNoSearch');
    this.moveTypeSearch = this.navParams.get('moveTypeSearch');
    this.searchRequest.appointmentNoSearch = this.navParams.get('appointmentNoSearch');
    // this.appointmentDateTimeSlot = this.navParams.get('appointmentDateSlot');
    this.status = this.navParams.get('status');
    this.statusIcon = this.navParams.get('status_icon');
    this.searchResponse = new TruckappointmentdetailsoModel();
    this.searchResponse.agentReferenceNo = this.navParams.get('agentReferenceNo');

    this.cancelMessage = this.utils.getLocaleString("ta_cancel_message");
    this.alertButtonOk = this.utils.getLocaleString("ca_ok_text");
    this.alertButtonCancel = this.utils.getLocaleString("ca_cancel");
    this.alertButtonDismiss = this.utils.getLocaleString("ca_dismiss_txt");
    this.alerttitle = this.utils.getLocaleString("ca_alert");

    this.tabs = [
      this.utils.getLocaleString("ta_tab4"),
      this.utils.getLocaleString("ta_tab2"),
      this.utils.getLocaleString("ta_tab3"),
    ];

    this.selectedTab = this.tabs[0];
    this.showRightSlideNav = false;
    this.showLeftButton = false;
    // this.dropDown=false;
    this.showRightButton = this.tabs.length > 2;

    this.resetShowTabs(0);

  }

  ionViewWillEnter() {
    this.loadTA();
  }

  loadTA() {
    this.taProvider.searchTaById(this.searchRequest).subscribe(
      response => {
        this.searchResponse = <TruckappointmentdetailsoModel>response;
        // this.appointmentDateTimeSlot = this.searchResponse.appointmentDateCreate + this.searchResponse.appointmentSlotCreate
        this.statusIcon = this.getStatusIcon(this.status);
        this.hideCancelOption = this.hideCancel(this.status);
        this.hideEditOption = this.hideEdit(this.status);
        this.hidePrintOption = this.hidePrint(this.status);
      }
    );
  }

  printDoc(fab: FabContainer) {
    let args = new Map();
    args.set("appointmentNoSearch", this.searchRequest.appointmentNoSearch.toString());
    args.set("exportType", "pdf");
    this.taProvider.printTA(args);
    fab.close();
  }

  hideCancel(status: string) {
    if (status != null && (status.toLowerCase() == "active" || status.toLowerCase() == "submitted")) {
      return false;
    }
    else {
      return true;
    }
  }

  cancelTA(fab: FabContainer) {
    let alert = this.alertCtrl.create({
      title: this.confirmBox,
      subTitle: this.cancelMessage,
      buttons: [
        {
          text: this.alertButtonOk,
          handler: () => {

            this.taProvider.cancelTA(this.searchResponse)
              .subscribe(response => {
                  this.navCtrl.popTo(TasearchresultPage);
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

  hideEdit(status: string) {
    if (status != null && (status.toLowerCase() == "active" || status.toLowerCase() == "submitted"
        || status.toLowerCase() == "partial gated in/out")) {

      if (this.searchResponse) {
        let appointmentDate = new Date(Date.parse(this.parsedate(this.searchResponse.appointmentDateCreate)));
        let tempAppointmentDate =this.datepipe.transform(appointmentDate, 'yyyy-MM-dd');
        /*let curDate = new Date();*/
        /*let curDate = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000));*/
        let curDate = new Date();
        let tempCurDate =this.datepipe.transform(curDate, 'yyyy-MM-dd');
        /*curDate.setHours(curDate.getHours()+4, curDate.getMinutes(),0,0);*/
        appointmentDate.setHours(
          Number(this.searchResponse.appointmentSlotCreate.split("-")[0].toString().split(":")[0].toString()) + this.searchResponse.configuredXHours,
          Number(this.searchResponse.appointmentSlotCreate.split("-")[0].toString().split(":")[1].toString()), 0, 0);
        if (tempCurDate  == tempAppointmentDate && curDate >= appointmentDate) {
          return true;
        } else {
          return false;
        }
      }
    }
    else {
      return true;
    }
  }

  hidePrint(status: string) {
    if (status != null && (status.toLowerCase() == "active" || status.toLowerCase() == "partial gated in/out")) {
      return false;
    }
    else {
      return true;
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
    this.navCtrl.push(TahistoryPage, {truckAppointmentNo: this.searchRequest.appointmentNoSearch});
    fab.close();
  }

  editTA(fab: FabContainer) {
    this.navCtrl.push(TaeditPage, {
      appointmentNoSearch: this.searchRequest.appointmentNoSearch,
      fromSummary: true
    });
    fab.close();
  }

  viewTA(fab: FabContainer) {
    this.navCtrl.push(TaviewPage, {appointmentNoSearch: this.searchRequest.appointmentNoSearch});
    fab.close();
  }

  getStatusIcon(taStatus) {
    switch (taStatus) {
      case 'Active':
        return "assets/img/active.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Partial Gated In/Out':
        return "assets/img/partial_gated.svg";
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  getStyle() {
    return '#808080';
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
    if (this.selectedTab != tab) {
      this.selectedTabsIndex = -1;
    }
    this.content.scrollToTop(50);
    if (tab === this.utils.getLocaleString("ta_tab4")) {
      this.resetShowTabs(0);
      this.slides.slideTo(0, 500);
    } else if (tab === this.utils.getLocaleString("ta_tab2")) {
      this.resetShowTabs(1);
      this.slides.slideTo(1, 500);
    } else if (tab === this.utils.getLocaleString("ta_tab3")) {
      this.resetShowTabs(2);
      this.slides.slideTo(2, 500);
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

  openSelecedTab(selectedIndex) {
    if (this.selectedTabsIndex != selectedIndex) {
      this.selectedTabsIndex = selectedIndex;
    } else {
      this.selectedTabsIndex = -1;
    }
  }
}
