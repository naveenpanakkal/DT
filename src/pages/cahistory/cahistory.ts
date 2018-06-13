import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ContainerAcceptanceModel} from "../../shared/model/containeracceptance/containeracceptance.model";
import {ContaineracceptanceProvider} from "../../providers/webservices/containeracceptanceservices";
import {CasearchdetailviewPage} from "../casearchdetailview/casearchdetailview";
import {Utils} from "../../shared/utils";
import {sortNumberArray} from "../../shared/utils";

/**
 * Generated class for the CahistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cahistory',
  templateUrl: 'cahistory.html',
  providers: [ContainerAcceptanceModel, ContaineracceptanceProvider, Utils]
})
export class CahistoryPage {


  acceptanceNo: any;
  CAdetailsArray: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public containeracceptancemodel: ContainerAcceptanceModel, public utils: Utils,
              private caProvider: ContaineracceptanceProvider) {

    this.acceptanceNo = this.navParams.get("acceptanceNo");
    this.populateHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CahistoryPage');
  }

  ionViewWillEnter() {
    if(this.CAdetailsArray != null){
      for(let index = 0; index < this.CAdetailsArray.length; index++){
        this.CAdetailsArray[index].showdetails = false;
      }
    }

  }

  populateHistory() {
    console.log('populateHistory. . . ');
    this.containeracceptancemodel.acceptanceNo = this.acceptanceNo;
    this.containeracceptancemodel.dropDown = "";
    this.caProvider.getHistory(this.containeracceptancemodel).subscribe(
      response => {
        this.CAdetailsArray = <ContainerAcceptanceModel[]>response;
        this.CAdetailsArray = sortNumberArray(this.CAdetailsArray, "requestNo", false);
        this.containeracceptancemodel.dropDown = "false";
      })
  }

  show(selVessel) {
    if (selVessel.showdetails) {
      selVessel.showdetails = false;
    }
    else {
      selVessel.showdetails = true;
    }
  }

  openview(requestNo: string) {
    this.navCtrl.push(CasearchdetailviewPage, {
      caRequestId: requestNo,
      fromHistory: true,
      mode: "view"
    });
  }

  geticon(selVessel) {
    if (selVessel.showDetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }
  }

}
