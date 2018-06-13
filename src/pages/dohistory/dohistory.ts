import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeliveryorderreqModel } from '../../shared/model/deliveryorder/deliveryorderreq.model';
import {DeliveryorderservicesProvider} from "../../providers/webservices/deliveryorderservices";
import {DosearchdetailviewPage} from "../dosearchdetailview/dosearchdetailview";
import {Utils} from "../../shared/utils";

@IonicPage()
@Component({
  selector: 'page-dohistory',
  templateUrl: 'dohistory.html',
  providers:[DeliveryorderreqModel,DeliveryorderservicesProvider,Utils]
})
export class DohistoryPage {

  DOrequestno: any;
  DOdetailsArray: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public utils:Utils,public deliveryorderservicesprovider : DeliveryorderservicesProvider,public deliveryorderreqmodel : DeliveryorderreqModel) {

    this.DOrequestno = this.navParams.get("DOrequestno");
    this.populateHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DohistoryPage');
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
    if (selVessel.showDetails) {
      return 'arrow-dropup';
    }
    else {
      return 'arrow-dropdown';
    }

  }

  openview(requestNo: string) {
    this.navCtrl.push(DosearchdetailviewPage, {
      requestNo: requestNo,
      fromHistory: true
    });
  }

  populateHistory() {
    console.log('populateHistory. . . ');
    this.deliveryorderreqmodel.deliveryOrderNo = this.DOrequestno;
    this.deliveryorderservicesprovider.getHistory(this.deliveryorderreqmodel).subscribe(
      response => {
        this.DOdetailsArray = <DeliveryorderreqModel[]>response;
        console.log("Vessel History Response Length : " + this.DOdetailsArray.length);
      },
      error => {
        var errorMessage = "Place Holder for error Handling";
      })
  }

}
