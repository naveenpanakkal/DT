import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BerthHistoryRequestModel} from "../../shared/model/berthsearchview/berthhistory/berthhistoryrequest.model";
import {BerthHistoryResponseModel} from "../../shared/model/berthsearchview/berthhistory/berthhistoryresponse.model";
import {BerthServicesProvider} from "../../providers/webservices/berthservices";
import {BerthsearchdetailviewPage} from '../berthsearchdetailview/berthsearchdetailview';
import {BerthSearchReqModel} from "../../shared/model/berthsearchview/berthsearchviewreq.model";
import {Utils} from "../../shared/utils";
/**
 * Generated class for the BerthhistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-berthhistory',
  templateUrl: 'berthhistory.html',
  providers: [BerthServicesProvider,BerthHistoryRequestModel,BerthSearchReqModel,Utils]
})
export class BerthhistoryPage {
  public berthHistoryResponseArray: BerthHistoryResponseModel[];
  rotationNo: string;
  berthStatus: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public berthServicesProvider:BerthServicesProvider,public berthHistoryRequest:BerthHistoryRequestModel,public utils:Utils,
  public customFilter: BerthSearchReqModel ) {

    this.rotationNo = this.navParams.get("rotationNo");
    this.berthStatus = this.navParams.get('bStatus');
    this.customFilter = this.navParams.get('filter');
    this.berthHistoryRequest.rotationNumberSearch=this.rotationNo;
  }
  ionViewWillEnter()
  {
    this.populateHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerthhistoryPage');
  }
   show(berth) {
    if (berth.showdetails) {
      berth.showdetails = false;
    }
    else {
      berth.showdetails = true;
    }
  }

  geticon(berth) {
    if (berth.showdetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }

  }

  openview(requestNo: string) {
    console.log("Berth Status in History <<" + this.berthStatus + ">>");
    this.navCtrl.push(BerthsearchdetailviewPage, {
      requestNo: requestNo,
      berthStatus: this.berthStatus,
      fromHistory: true,
      filter: this.customFilter
    });
  }
populateHistory() {
    console.log('populateHistory. . . ');
    this.berthServicesProvider.getHistory(this.berthHistoryRequest).subscribe(
      response => {
        this.berthHistoryResponseArray = <BerthHistoryResponseModel[]>response;
        console.log("Berth History Unparsed Response JSON : <<" + JSON.stringify(response) + ">>");
        console.log("Berth History Response Length : " + this.berthHistoryResponseArray.length);
      },
      error => {
        var errorMessage = "Place Holder for error Handling";
      })
  }
}
