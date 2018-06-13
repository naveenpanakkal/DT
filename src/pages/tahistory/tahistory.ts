import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TaHistoryResponseModel} from "../../shared/model/ta/taHistoryResponse.model";
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {TaviewPage} from "../taview/taview";
import {TruckappointmentdetailsoModel} from "../../shared/model/ta/truckappointmentdetailso.model";

/**
 * Generated class for the TahistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tahistory',
  templateUrl: 'tahistory.html',
})
export class TahistoryPage {

  historyResponseList: TaHistoryResponseModel[];
  searchRequest: TruckappointmentdetailsoModel;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private taProvider: TruckappointmentserviceProvider) {
    this.searchRequest = new TruckappointmentdetailsoModel();
    this.searchRequest.truckAppointmentNo = this.navParams.get('truckAppointmentNo');

    this.loadHistory();
  }

  loadHistory() {
    this.taProvider.getHistoryList(this.searchRequest).subscribe(
      response => {
        this.historyResponseList = <TaHistoryResponseModel[]>response;
      }
    );
  }

  showHistory(historyElement) {
    if (historyElement.showdetails) {
      historyElement.showdetails = false;
    }
    else {
      historyElement.showdetails = true;
    }
  }

  geticon(historyList) {
    if (historyList.showdetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }
  }

  openView(requestNo: string) {
    this.navCtrl.push(TaviewPage, {
      truckAppointmentReqId: requestNo,
      fromPage:'history'
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TahistoryPage');
  }

}
