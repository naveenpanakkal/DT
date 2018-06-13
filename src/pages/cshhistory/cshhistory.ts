import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {sortArray, sortNumberArray, Utils} from "../../shared/utils";
import {CshHistoryRequestModal} from "../../shared/model/csh/cshHistoryRequestModal";
import {CSHSearchResultModel} from "../../shared/model/csh/cshsearchresult.model";
import {CshHistoryModal} from "../../shared/model/csh/cshHistoryModal";
import {TruckHistoryResponseModel} from "../../shared/model/truckhistory/truckhistoryresponse.model";
import {CshServiceProvider} from "../../providers/webservices/cshservice";
import {TruckdetailsPage} from "../truckdetails/truckdetails";
import {CSHDetailsPage} from "../cshdetailsview/cshdetailsview";
import {CSHSearchReqModel} from "../../shared/model/csh/cshsearchreq.model";

/**
 * Generated class for the CshhistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cshhistory',
  templateUrl: 'cshhistory.html',
  providers:[Utils,CshHistoryRequestModal,CshHistoryModal,CSHSearchReqModel]
})
export class CshHistoryPage {
  cshHistoryResult: CshHistoryModal[];
  private requestNo: any;
  private regStatus: string;
  ascending : boolean = false;
  private mode: string;
  cshItemStatus:any;
  canCancel:boolean;
  canAmend:boolean;
  canApprove:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public cshHistoryReqModal: CshHistoryRequestModal, public cshService: CshServiceProvider,
              public customFilter:CSHSearchReqModel) {
    this.customFilter = this.navParams.get('filter');
    this.requestNo = navParams.get('reqestNo');
    this.regStatus = this.navParams.get('regStatus');
    this.cshItemStatus = this.navParams.get('cshItemStatus');
    this.mode = "view";
    this.canCancel= navParams.get('cancancel');
    this.canAmend= navParams.get('canamend');
    this.canApprove= navParams.get('canapprove');
  }

  ionViewWillEnter() {
    this.loadCshHistory();
  }
  showCshHistory(historyList){
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

  openCshDetailView(cshrequestNo : string){
    this.navCtrl.push(CSHDetailsPage, {cshNo: cshrequestNo, mode: this.mode,
      filter: this.customFilter,
      cshItemStatus : this.cshItemStatus,
      fromHistory: true,
      regStatus: this.regStatus,
      cancancel:this.canCancel,
      canamend:this.canAmend,
      canapprove:this.canApprove
    });
  }
  loadCshHistory() {
    this.cshHistoryReqModal.requestNo = this.requestNo;
    this.cshService.getCshHistory(this.cshHistoryReqModal)
      .subscribe(response => {
          this.cshHistoryResult = <CshHistoryModal[]>response;
          this.cshHistoryResult = sortNumberArray(this.cshHistoryResult, "requestNo", this.ascending);
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
          //dismiss loading
        });
  }

}
