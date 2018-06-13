import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BerthsearchdetailviewPage} from '../berthsearchdetailview/berthsearchdetailview';
import {BerthhistoryPage} from '../berthhistory/berthhistory';
import {BerthServicesProvider} from "../../providers/webservices/berthservices";
import {BerthSearchDetailsReqModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsreq.model";
import {BerthSearchDetailsResultModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsresult.model";
import {ExecuteactionPage} from "../executeaction/executeaction";
import {BerthSearchViewPage} from "../berthsearchview/berthsearchview";
import {BerthSearchReqModel} from "../../shared/model/berthsearchview/berthsearchviewreq.model";
import {Utils} from "../../shared/utils";
/**
 * Generated class for the BerthsearchsummaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-berthsearchsummary',
  templateUrl: 'berthsearchsummary.html',
  providers: [BerthSearchDetailsReqModel, BerthSearchDetailsResultModel, BerthServicesProvider,BerthSearchReqModel,Utils]
})
export class BerthsearchsummaryPage {
  bStatus: string;
  bicon: string;
  bName: string;
  rNo: number;
  bEta: string;
  bCreatedBy: string;
  bCreatedDate: string;
  operationStatus:string;
  alertMsg: string;
  hideApproveButton: boolean;
  cancelbtnStatus:boolean;
  requeststatus:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public berthServicesProvider: BerthServicesProvider,
              public bBerthSearchDetailsReqModel: BerthSearchDetailsReqModel,
              public berthSearchDetailsResultModel: BerthSearchDetailsResultModel,public utils:Utils,
              public alertCtrl: AlertController, public customFilter: BerthSearchReqModel) {

    this.bStatus = this.navParams.get('berthstatus');
    this.bName = this.navParams.get('vesselname');
    this.rNo = this.navParams.get('rotationno');
    this.bEta = this.navParams.get('eta');
    this.bCreatedBy = this.navParams.get('createdby');
    this.bCreatedDate = this.navParams.get('createddate');
    this.bicon = this.navParams.get('statusicon');
    this.bBerthSearchDetailsReqModel.rotationNumber = this.navParams.get('rotationno');
    this.cancelbtnStatus = this.navParams.get('cancelbtnStatus');
    this.operationStatus = this.navParams.get('operationstatus');
    this.customFilter = this.navParams.get('filter');
    this.requeststatus = this.navParams.get('requestStatus');
  }

  getStyle() {

  }
  ionViewWillEnter()
  {
    /*to enable action button enable*/
    this.invokeService();

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BerthsearchsummaryPage');
  }

  viewinfo() {
    this.navCtrl.push(BerthsearchdetailviewPage, {rotationNo: this.rNo});
  }

  seehistory() {
    this.navCtrl.push(BerthhistoryPage, {rotationNo: this.rNo, berthStatus: this.bStatus,filter: this.customFilter});
  }


  invokeService() {
    console.log("Berth Details Request JSON : <<" + JSON.stringify(this.bBerthSearchDetailsReqModel) + ">>");

    this.berthServicesProvider.searchBerthByID(this.bBerthSearchDetailsReqModel)
      .subscribe(response => {
          console.log("Berth Details Response JSON : <<" + JSON.stringify(response) + ">>");
          this.berthSearchDetailsResultModel = <BerthSearchDetailsResultModel>response;
          this.hideApproveButton = this.berthSearchDetailsResultModel.approverButton;
          this.bStatus = this.berthSearchDetailsResultModel.berthBookingStatus;
          console.log("Approver Status : <<" + JSON.stringify(response) + ">>");
        },
        error => {
          var errorMessage = <any>error;
          //Show error message
          //dismiss loading
        });
  }

  onClickofAction() {
    this.navCtrl.push(ExecuteactionPage, {
      workFlowId: this.berthSearchDetailsResultModel.wrkflwId,
      requestNo: this.berthSearchDetailsResultModel.requestID,
      fromPage: "Berth",
      berthStatus: this.berthSearchDetailsResultModel.berthBookingStatus
    });
  }
    deleteberth() {
  if (this.operationStatus =='Berthed'){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'Vessel is already in berthing stage so cancellation/deletion cannot be processed',
       buttons: [
        {
          text: 'OK',
          handler: () => {

           }
        }]
      });
      alert.present();
     }else if (this.requeststatus =='Submitted'){
     this.berthSearchDetailsResultModel.rotationNumber=this.rNo;
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'This action will cancel the Berth registration. Do you want to proceed?',
       buttons: [
        {
          text: 'OK',
          handler: () => {
            this.berthServicesProvider.CancelBerth(this.berthSearchDetailsResultModel)
              .subscribe(Response => {
                  if(Response.errorCode=='cancel2hours'){
                        let message=Response.errorMessage;
                        this.alertanddelete(message);
                      }else{
                      this.navCtrl.push(BerthSearchViewPage,
                        {
                          filter: this.customFilter
                        });
                      }
                },
                error => {
                  var errorMessage = <any>error;
                  //Show error message
                  //dismiss loading
                });
          }
        }, {
          text: 'CANCEL',
          handler: () => {
         },
        }]

    });
    alert.present();
  }else{
    this.berthSearchDetailsResultModel.rotationNumber=this.rNo;
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: 'This action will cancel the Berth registration. Do you want to proceed?',
       buttons: [
        {
          text: 'OK',
          handler: () => {
            this.berthServicesProvider.DeleteBerth(this.berthSearchDetailsResultModel)
              .subscribe(Response => {
                  if(Response.errorCode=='cancel2hours'){
                        let message=Response.errorMessage;
                        this.alertanddelete(message);
                      }else{
                      this.navCtrl.push(BerthSearchViewPage,
                        {
                          filter: this.customFilter
                        });
  }
                },
                error => {
                  var errorMessage = <any>error;
                  //Show error message
                  //dismiss loading
                });
}
        }, {
          text: 'CANCEL',
          handler: () => {
         },
        }]

    });
    alert.present();
  }
}
   alertanddelete(message){
      let alert = this.alertCtrl.create({
          title: 'Alert',
          subTitle: message,
          buttons: [
            {
             text: 'OK',
              handler: () => {
                this.berthServicesProvider.CancelBerth(this.berthSearchDetailsResultModel)
                  .subscribe(Response => {
                        this.navCtrl.push(BerthSearchViewPage,
                        {
                          filter: this.customFilter
                        });
                    },
                    error => {
                      var errorMessage = <any>error;
                      //Show error message
                      //dismiss loading
                    });
              }
            }, {
              text: 'CANCEL',
              handler: () => {
            },
            }]

        });
        alert.present();
  }

  getStatusIcon(bStatus) {

    switch (bStatus) {
      case 'Approved':
        return "assets/img/approved.svg";
      case 'Rejected':
        return "assets/img/rejected.svg";
      case 'Pending':
        return "assets/img/pending.svg";
      case 'Cancelled':
        return "assets/img/cancelled.svg";
      case 'Submitted':
        return "assets/img/submitted.svg";
      case 'Suspended':
        return "assets/img/suspended.svg";
      case 'Cancellation Initiated':
        return "assets/img/cancelled.svg";
    }
  }
}
