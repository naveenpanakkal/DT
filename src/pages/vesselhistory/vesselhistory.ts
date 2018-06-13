import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {VesselViewPage} from '../vesselview/vesselview';
import {VesselHistoryRequest} from "../../shared/model/vesselhistory/vesselhistoryrequest.model";
import {VesselHistoryResponseModel} from "../../shared/model/vesselhistory/vesselhistoryresponse.model";
import {VesselservicesProvider} from "../../providers/webservices/vesselservices";
import {Utils} from "../../shared/utils";

/*
* ===========================================================================
* Copyright 2017 Dubai Trade.
* All Rights Reserved
* ===========================================================================
*
*  vesselhistory.ts file contains VesselHistoryPage class which holds functions to
*  populate the data, and handle the UI logic for vessel history page UI.
*
*/

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'vesselhistory.html',
  providers: [VesselservicesProvider, VesselHistoryResponseModel, VesselHistoryRequest,Utils]
})
export class VesselHistoryPage {
  public vesselHistoryResponseArray: VesselHistoryResponseModel[];
  vesselReqId: string;
  vesselStatus: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public utils: Utils, public vesselService: VesselservicesProvider, public vesselHistoryReq: VesselHistoryRequest,
              public vesselHistoryResponse: VesselHistoryResponseModel) {
    this.vesselReqId = this.navParams.get("requestID");
    this.vesselStatus = this.navParams.get('vesselStatus');
    this.vesselHistoryReq.requestNo = this.vesselReqId;
    this.populateHistory();
  }

  ionViewDidLoad() {

  }

  show(selVessel) {
    if (selVessel.showdetails) {
      selVessel.showdetails = false;
    }
    else {
      selVessel.showdetails = true;
    }
  }

  geticon(selVessel) {
    if (selVessel.showdetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }

  }

  openview(requestNo: string) {
    this.navCtrl.push(VesselViewPage, {
      requestNo: requestNo,
      vesselStatus: this.vesselStatus,
      vesselid: this.vesselHistoryReq.requestNo,
      fromHistory: true
    });
  }

  populateHistory() {
      this.vesselService.getHistory(this.vesselHistoryReq).subscribe(
      response => {
        this.vesselHistoryResponseArray = <VesselHistoryResponseModel[]>response;
      })
  }

}
