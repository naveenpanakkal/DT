import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TaHistoryResponseModel} from "../../shared/model/ta/taHistoryResponse.model";
import {TruckappointmentserviceProvider} from "../../providers/webservices/truckappointmentservices";
import {TruckappointmentdetailsoModel} from "../../shared/model/ta/truckappointmentdetailso.model";
import {RBviewPage} from "../rbview/rbview";
import { RBServiceProvider } from '../../providers/webservices/rbservices';
import { RBHistoryRequestModal } from '../../shared/model/rb/rbhistoryrequest.modal';
import { RBHistoryModal } from '../../shared/model/rb/rbhistory.modal';
import { sortNumberArray, Utils } from '../../shared/utils';

/**
 * Generated class for the TahistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-RBhistory',
  templateUrl: 'rbhistory.html',
  providers:[Utils,RBServiceProvider,RBHistoryRequestModal,RBHistoryModal]
})
export class RBhistoryPage {
  historyResponseList : any
  ascending:boolean = false
  canCancel :any
  canAmend :any
  canApprove :any
  requestType : any
  requestId :number
  regStatus:string
  isEmpty:boolean=true

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public rbProvider: RBServiceProvider,
              public rbHistoryReqModal: RBHistoryRequestModal) {

    this.rbHistoryReqModal.rsbId = this.navParams.get('rsbId');
    this.rbHistoryReqModal.rsbReqId = this.navParams.get('rsbReqId');
    this.requestId = this.navParams.get("requestId")
    this.canCancel = this.navParams.get('cancancel');
    this.canAmend = this.navParams.get('canamend');
    this.canApprove = this.navParams.get('canapprove');
    this.requestType = this.navParams.get("requestType")
    this.regStatus = this.navParams.get('regStatus');
  }
  ionViewWillEnter() {
    this.loadHistory();
  }
  loadHistory() {
    this.rbProvider.getRBHistory(this.rbHistoryReqModal).subscribe(
      response => {
        this.historyResponseList = <RBHistoryModal[]>response;
        if(this.historyResponseList.length>0){
          this.historyResponseList = sortNumberArray(this.historyResponseList, "requestNo", this.ascending);
          this.isEmpty=false
        }
        else{
          this.isEmpty=true
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
    this.navCtrl.push(RBviewPage, {
      fromHistory: true,
      rsbReqId: requestNo,
      requestId : this.requestId,
      fromPage:'history',
      cancancel:this.canCancel,
      canamend:this.canAmend,
      canapprove:this.canApprove,
      requestType:this.requestType,
      regStatus: this.regStatus
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TahistoryPage');
  }

}
