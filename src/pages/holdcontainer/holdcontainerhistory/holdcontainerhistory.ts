import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {sortNumberArray, Utils} from '../../../shared/utils';
import {HrcservicesProvider} from "../../../providers/webservices/hrcservices";
import {HnrcHistory} from "../../../shared/model/hnrc/hnrchistory.model";
import {HoldContainerSO} from "../../../shared/model/hnrc/holdcontainerso.model";
import {HoldContainerEditandView} from "../holdcontainerEditandView/holdcontainerEditandView";

/**
 * Generated class for the TahistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-holdcontainerhistory',
  templateUrl: 'holdcontainerhistory.html',
  providers: [Utils, HrcservicesProvider, HoldContainerSO]
})
export class HChistoryPage {
  historyResponseList: any;
  ascending: boolean = false;
  requestId: number;
  isView:boolean;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public hrcservicesProvider: HrcservicesProvider,
              public holdContainerSO: HoldContainerSO) {
    this.holdContainerSO.holdRequestNo = this.navParams.get('holdRequestNo');
  }

  ionViewWillEnter() {
    this.loadHistory();
  }

  loadHistory() {
    this.hrcservicesProvider.getHistory(this.holdContainerSO).subscribe(
      response => {
        this.historyResponseList = <HnrcHistory[]>response;
        this.historyResponseList = sortNumberArray(this.historyResponseList, "requestNo", this.ascending);
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
    this.navCtrl.push(HoldContainerEditandView, {
        holdRequestNo:requestNo,
        isView: true,
        fromHistory: true
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TahistoryPage');
  }

}
