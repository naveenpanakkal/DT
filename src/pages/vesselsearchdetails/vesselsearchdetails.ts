import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController, App} from 'ionic-angular';
import {MorePage} from '../more/more';
import {Storage} from '@ionic/storage';
import {VesselViewPage} from '../vesselview/vesselview';
import {VesselHistoryPage} from '../vesselhistory/vesselhistory';
import {VesselComparisonPage} from "../vesselcomparison/vesselcomparison";
import {VesselIDSearchModel} from "../../shared/model/vesselsearchdetails/vesselidsearch.model";
import {VesselservicesProvider} from "../../providers/webservices/vesselservices";
import {VesselIDSearchResultModel} from "../../shared/model/vesselsearchdetails/vesselidsearchresult.model";
import {TranslateService} from "@ngx-translate/core";
import {Utils} from "../../shared/utils";

/*
* ===========================================================================
* Copyright 2017 Dubai Trade.
* All Rights Reserved
* ===========================================================================
*
*  vesselsearchdetails.ts file contains VesselsearchdetailsPage class which holds functions to
*  populate the data, and handle the UI navigation logic for Selected Vessel View UI.
*
*/
@IonicPage()
@Component({
  selector: 'page-vesselsearchdetails',
  templateUrl: 'vesselsearchdetails.html',
  providers: [VesselIDSearchModel, VesselIDSearchResultModel,Utils]
})
export class VesselsearchdetailsPage {

  vname: string;
  vid: number;
  vimo: string;
  vicon: string;
  vstatus: string;
  oldpage: any;
  vtype: any;
  cdate: any;
  vbuilt: any;
  tabBarElement: any;

  private fabnew: boolean = false;

  constructor(private storage: Storage, public navCtrl: NavController,public utils: Utils,public navParams: NavParams, public popoverCtrl: PopoverController, public app: App,
              public vesselSearchbyidrequestModel: VesselIDSearchModel,
              public vesselSearchbyidresultModel: VesselIDSearchResultModel,
              public vesselServicesProvider: VesselservicesProvider, public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.vname = this.navParams.get('vesselname');
    this.vid = this.navParams.get('vesselid');
    this.vimo = this.navParams.get('vesselimo');
    this.vicon = this.navParams.get('vesselicon');
    this.vstatus = this.navParams.get('vesselstatus');
    this.vbuilt = this.navParams.get('vesselbuilt');
    this.vtype = this.navParams.get('vesseltype');
    this.storage.remove('Approve');
    this.storage.remove('Reject');
    this.storage.remove('Pending');
    this.storage.remove('RadioSelect');
  }

  closemodal() {
    this.navCtrl.popToRoot()

  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }


  loadVessel(){

    this.vesselSearchbyidrequestModel.vesselRegistrationId=this.vid;
    this.vesselServicesProvider.searchVesselByID(this.vesselSearchbyidrequestModel)
      .subscribe(response => {
          this.vesselSearchbyidresultModel = <VesselIDSearchResultModel>response;
          this.vstatus=this.vesselSearchbyidresultModel.vesselRegistrationStatus;
        });

  }

  c() {
    this.oldpage.pop();
    this.navCtrl.pop();
  }

  callnewfab() {
    this.fabnew = true;
  }

  ionViewDidLoad() {

  }

  getStyle() {

      return '#808080';
  }

  getStatusIcon(vstatus) {

    switch (vstatus) {
      case 'Approved':
        return "assets/img/approved.svg";
      case 'Rejected':
        return "assets/img/rejected.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Submitted':
        return "assets/img/submitted.svg";
      case 'Suspended':
        return "assets/img/suspended.svg";
    }
  }


  more(myEvent) {
    let popover = this.popoverCtrl.create(MorePage);
    popover.present({
      ev: myEvent
    });
  }

  viewinfo() {
    this.navCtrl.push(VesselViewPage,{vesselid: this.vid, fromHistory: false});
  }

  seeworkflow() {
  //   this.navCtrl.push(WorkflowPage,{vesselid: this.vid});
  }

  viewcompare(){
    this.navCtrl.push(VesselComparisonPage);
  }

  seehistory() {
    this.navCtrl.push(VesselHistoryPage, {requestID : this.vid, vesselStatus : this.vstatus});
  }
  ionViewWillEnter()
  {
    this.loadVessel();
  }
}
