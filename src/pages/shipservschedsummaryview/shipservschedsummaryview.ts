import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShipServSchedSummaryResultModel} from "../../shared/model/shipservsched/ssssearchsummaryresult.model";
import {ShipServSchedDetailViewPage} from "../shipservscheddetailview/shipservscheddetailview";
import {ShipServSchedSearchModel} from "../../shared/model/shipservsched/ssssearch.model";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {ShipServSchedHistoryViewPage} from "../shipservschedhistoryview/shipservschedhistoryview";
import {ShipServSchedSummaryResultListModel} from "../../shared/model/shipservsched/ssssearchsummaryresultlist.model";
import {SSSServiceProvider} from "../../providers/webservices/sssservices";

@IonicPage()
@Component({
  selector: 'page-shipservschedsummaryview',
  templateUrl: 'shipservschedsummaryview.html',
  providers:[ShipServSchedSummaryResultModel,SSSServiceProvider]
})
export class ShipServSchedSummaryViewPage {

  sssSummary: ShipServSchedSummaryResultModel;
  sssSearchReqModel:ShipServSchedSearchModel;
  searchIDReqModel:ShipServSchedSearchModel;
  fromPage:string;
  searchResultListModel: ShipServSchedSummaryResultListModel;
  searchResults: ShipServSchedSummaryResultModel[];


  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceProvider:SSSServiceProvider) {
    this.sssSummary = this.navParams.get('sssItem');
    this.sssSearchReqModel = this.navParams.get('sssSearchModel');
  }

  ionViewWillEnter() {
    this.serviceProvider.sssSearchAll(this.sssSearchReqModel).subscribe(response => {
      this.searchResultListModel = <ShipServSchedSummaryResultListModel> response;
      this.searchResults = this.searchResultListModel.list;
    }, (error) => {

    }, () => {
      if (this.searchResults != null && this.searchResults.length > 0) {
        this.sssSummary = this.searchResults.find(item => item.sssNoSummary == this.sssSummary.sssNoSummary)
      }
      if(null == this.searchIDReqModel){
        this.searchIDReqModel = new ShipServSchedSearchModel();
        this.searchIDReqModel.shippingServiceScheduleNoSearch = this.sssSummary.sssNoSummary;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShipServSchedSummaryViewPage');

  }

  getStyle(s) {
    return '#808080';
  }

  getStatusIcon(s) {
    switch (s.statusSummary) {
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
      case 'Completed':
        return "assets/img/completed.svg";
      case 'Expired':
        return "assets/img/expired.svg";
    }
  }

  viewInfo(){
    this.navCtrl.push(ShipServSchedDetailViewPage,{sssSearchModel:this.searchIDReqModel})
  }
  showHistory() {
    this.navCtrl.push(ShipServSchedHistoryViewPage, {
     sssSearchModel:this.searchIDReqModel});
  }
}
