import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TruckservicesProvider} from "../../providers/webservices/truckservices";
import { TruckHistoryRequestModel} from "../../shared/model/truckhistory/truckhistoryrequest.model";
import { TruckHistoryResponseModel} from "../../shared/model/truckhistory/truckhistoryresponse.model";
import { TruckdetailsPage } from "../truckdetails/truckdetails"
import {Utils, sortNumberArray, sortArray} from "../../shared/utils";
/**
 * Generated class for the TruckhistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-truckhistory',
  templateUrl: 'truckhistory.html',
  providers: [TruckHistoryRequestModel,TruckHistoryResponseModel, Utils]
})
export class TruckhistoryPage {
  truckHistoryResponseList: TruckHistoryResponseModel[];
  requestNo: string;
  truckRegId: string;
  mode: string;
  truckStatus : string;
  ascending : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public truckHistoryService: TruckservicesProvider, public truckHistoryModel: TruckHistoryRequestModel,
              public truckHistoryResponse: TruckHistoryResponseModel) {
    this.requestNo = navParams.get('reqestNo');
    this.truckRegId = navParams.get('sel_truckId');
    this.truckStatus = navParams.get('truckStatus');
    this.mode = "view";
    //this.loadTruckHistory();

  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad TruckhistoryPage');
  }

  ionViewWillEnter() {
    this.loadTruckHistory();
  }

  show(historyList){
    if(historyList.showdetails){
      historyList.showdetails=false;
    }
    else{
      historyList.showdetails=true;
    }
  }

  geticon(historyList){
    if(historyList.showdetails)
    {
      return 'arrow-dropup';
    }
    else
    {
      return 'arrow-dropdown';
    }

  }

  openView(historyList_requestNo : string){

    this.navCtrl.push(TruckdetailsPage, {
      truckRegRequestId: historyList_requestNo, mode: this.mode, truckStatus : this.truckStatus, sel_truckId : this.truckRegId, fromHistory: true
    });
  }

  loadTruckHistory() {
    this.truckHistoryModel.requestNo = this.requestNo;
    this.truckHistoryService.getHistory(this.truckHistoryModel)
      .subscribe(response => {
          this.truckHistoryResponseList = <TruckHistoryResponseModel[]>response;
          this.truckHistoryResponseList = sortArray(this.truckHistoryResponseList, "requestNo", this.ascending);
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
          //dismiss loading
        });
  }

}
