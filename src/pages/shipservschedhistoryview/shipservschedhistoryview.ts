import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ShipServSchedHistoryResponseModel} from "../../shared/model/shipservsched/ssshistoryresult.model";
import {ShipServSchedGetHistoryDataModel} from "../../shared/model/shipservsched/sssgethistorydata.model";
import {ShipServSchedSearchModel} from "../../shared/model/shipservsched/ssssearch.model";
import {ShipServSchedSummaryResultModel} from "../../shared/model/shipservsched/ssssearchsummaryresult.model";
import {BerthsearchdetailviewPage} from "../berthsearchdetailview/berthsearchdetailview";
import {BerthHistoryResponseModel} from "../../shared/model/berthsearchview/berthhistory/berthhistoryresponse.model";
import {ShipServSchedDetailViewPage} from "../shipservscheddetailview/shipservscheddetailview";
import {SSSServiceProvider} from "../../providers/webservices/sssservices";

/**
 * Generated class for the ShipServSchedHistoryViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shipservschedhistoryview',
  templateUrl: 'shipservschedhistoryview.html',
  providers:[ShipServSchedHistoryResponseModel,ShipServSchedGetHistoryDataModel,ShipServSchedSearchModel,ShipServSchedSummaryResultModel]
})
export class ShipServSchedHistoryViewPage {

  sssHistoryList:ShipServSchedHistoryResponseModel[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public sssServiceProvider:SSSServiceProvider,
              public sssGetHistoryReqModel:ShipServSchedGetHistoryDataModel,
              public sssSearchOriginalModel:ShipServSchedSearchModel) {
    this.sssSearchOriginalModel = this.navParams.get('sssSearchModel');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShipServSchedHistoryViewPage');
  }

  ionViewWillEnter(){
    this.populateHistory();
  }

  show(history) {
    if (history.showDetails) {
      history.showDetails = false;
    }
    else {
      history.showDetails = true;
    }
  }

  geticon(history) {
    if (history.showDetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }

  }

  openview(requestNo: string) {
    this.navCtrl.push(ShipServSchedDetailViewPage, {
      requestNo: requestNo,
      fromPage:'history'
    });
  }
  populateHistory() {
    console.log("SSS - History Populate");
    if(null != this.sssSearchOriginalModel){
      this.sssGetHistoryReqModel.scheduleDetailsId = this.sssSearchOriginalModel.shippingServiceScheduleNoSearch;
    }
    this.sssServiceProvider.sssGetHistory(this.sssGetHistoryReqModel).subscribe(
      response => {
        this.sssHistoryList = <ShipServSchedHistoryResponseModel[]>response;
        console.log("SSS History Unparsed Response JSON : <<" + JSON.stringify(response) + ">>");
      },
      error => {
        var errorMessage = "Place Holder for error Handling";
      })
  }

}
