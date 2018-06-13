import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Utils} from "../../shared/utils";

/**
 * Generated class for the WorkflowdetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-workflowdetails',
  templateUrl: 'workflowdetails.html',
  providers:[Utils]
})
export class WorkflowdetailsPage {
  requestID:any;
  date:any;
  actionName:any
  actionBy: any;
  remarks:any;
  status: any;

  constructor(public navCtrl: NavController, public utils: Utils,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log("actionName"+this.navParams.get("actionName"));
    if (this.navParams.get('actionName')) {
      this.actionName=this.navParams.get('actionName');
    } else {
      this.actionName="";
    }

    if (this.navParams) {
      if (this.navParams.get('date')) {
        this.date=this.navParams.get('date');
      } else {
        this.date="";
      }

      if (this.navParams.get('actionBy')) {
        this.actionBy=this.navParams.get('actionBy');
      } else {
        this.actionBy="";
      }

      if (this.navParams.get('status')) {
        this.status=this.navParams.get('status');
      } else {
        this.status="";
      }

      if (this.navParams.get('remarks')) {
        this.remarks=this.navParams.get('remarks');
      } else {
        this.remarks="";
      }
      console.log("requu"+this.navParams.get("requestID"));
      if (this.navParams.get('requestID')) {
        this.requestID=this.navParams.get('requestID');
      } else {
        this.requestID="";
      }

    }

  }

}
