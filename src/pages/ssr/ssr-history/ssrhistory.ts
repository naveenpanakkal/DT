/*<reference path="../../../../node_modules/ionic-angular/components/fab/fab-container.d.ts"/>*/

import {Component} from '@angular/core';
import {FabContainer, IonicPage, NavController, NavParams} from 'ionic-angular';
import { sortNumberArray, Utils } from '../../../shared/utils';
import {SsrServiceProvider} from "../../../providers/webservices/ssrservices";
import {SsrViewPage} from "../ssr-view/ssrview";
import { SSRHistoryReqModel } from '../../../shared/model/ssr/ssrhistoryreq.model';
import { SSRHistoryResponseModel } from '../../../shared/model/ssr/ssrhistoryresponse.model';
/**
 * Generated class for the TahistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ssrohistory',
  templateUrl: 'ssrhistory.html',
  providers:[Utils,SsrServiceProvider,SSRHistoryReqModel,SSRHistoryResponseModel]
})
export class SsrHistoryPage {
   historyResponseList : any
   isEmpty:boolean=true
   ascending:boolean = false
   canCancel: boolean;
   canAmend: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
            public ssrServiceProvider:SsrServiceProvider,
            public ssrHistoryReqModel:SSRHistoryReqModel) {
   this.ssrHistoryReqModel.ssrRequestNo = navParams.get('ssrrequestno');
  this.canCancel= navParams.get('cancancel');
  this.canAmend= navParams.get('canamend');
  }
  ionViewWillEnter() {
    this.loadHistory();
  }  
  loadHistory() {
    this.ssrServiceProvider.getSSRHistory(this.ssrHistoryReqModel).subscribe(
      response => {
        this.historyResponseList = <SSRHistoryResponseModel[]>response;
        if(this.historyResponseList.length>0){
        this.historyResponseList = sortNumberArray(this.historyResponseList, "requestNo", this.ascending);
        this.isEmpty=false;
        }
         else{
          this.isEmpty=true;
        }
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
    this.navCtrl.push(SsrViewPage, {
      ssrRequestReqNo: requestNo,
      fromHistory: true,
      cancancel:this.canCancel,
      canamend:this.canAmend,
    });
  
  }

  ionViewDidLoad() {
    
  }
  
  showhistory(historyElement){
    if (historyElement.showdetails) {
      historyElement.showdetails = false;
    }
    else {
      historyElement.showdetails = true;
    }
  }

}

