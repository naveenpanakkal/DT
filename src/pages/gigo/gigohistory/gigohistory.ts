/*<reference path="../../../../node_modules/ionic-angular/components/fab/fab-container.d.ts"/>*/

import {Component} from '@angular/core';
import {FabContainer, IonicPage, NavController, NavParams} from 'ionic-angular';
import {GigoHistory} from "../../../shared/model/GIGO/gigohistory.model";
import {sortNumberArray, Utils} from "../../../shared/utils";
import {GiGoServiceProvider} from "../../../providers/webservices/gigoservice";
import {GigoSearchResultSORequest} from "../../../shared/model/GIGO/gigosearchresultsorequest.model";
import {GiGoDetailsPage} from "../gigodetails/gigodetails";
import {GigoDetailsSO, LocationMasterSO} from "../../../shared/model/GIGO/gigodetails.model";

/**
 * Generated class for the TahistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gigohistory',
  templateUrl: 'gigohistory.html',
  providers:[Utils,GiGoServiceProvider,GigoHistory,GigoSearchResultSORequest]
})
export class GigoHistoryPage {
  historyResponseList : any;
  ascending:boolean = false;
  canCancel :any;
  canAmend :any;
  canApprove :any;
  requestType : any;
  requestNo :number;
  regStatus:string;
  gigoNo:number;
  historyElement:boolean;
  location:string;
  spname:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public gigoProvider: GiGoServiceProvider,
              public gigoHistoryReqModal: GigoSearchResultSORequest) {

    this.gigoHistoryReqModal.requestNo = this.navParams.get('gigoId');
     this.gigoNo = this.navParams.get("gigoId");
    this.location = this.navParams.get("location");
    this.spname = this.navParams.get("spname");
    // this.canCancel = this.navParams.get('cancancel');
    //this.canAmend = this.navParams.get('canamend');
    //  this.canApprove = this.navParams.get('canapprove');
    //this.requestType = this.navParams.get("requestType")
    // this.regStatus = this.navParams.get('regStatus');
  }
  ionViewWillEnter() {
    this.loadHistory();
  }
  loadHistory() {
    this.gigoProvider.gigoHistory(this.gigoHistoryReqModal,true).subscribe(
      response => {
        this.historyResponseList = <GigoHistory[]>response;
        this.historyResponseList = sortNumberArray(this.historyResponseList, "requestId", this.ascending);
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
    this.navCtrl.push(GiGoDetailsPage, {
      gigoReqNo: requestNo,
      parentPage:'fromHistory',
      mode: "view",
      location: this.location,
      spname: this.spname
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GigohistoryPage');
  }

  showhistory(){
    if(this.historyElement){
      this.historyElement = true;
    }
    else{
      this.historyElement = false;
    }
  }

}

