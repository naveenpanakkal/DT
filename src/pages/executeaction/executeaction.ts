import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ExecuteactionrequestModel} from "../../shared/model/executeaction/executeactionrequest.model";
import {ExecuteActionResultModel} from "../../shared/model/executeaction/executeactionresult.model";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {VesselViewPage} from "../vesselview/vesselview";
import {TruckdetailsPage} from "../truckdetails/truckdetails";
import {VesselservicesProvider} from "../../providers/webservices/vesselservices";
import {TruckservicesProvider} from "../../providers/webservices/truckservices";

import {VesselsearchviewPage} from "../vesselsearchview/vesselsearchview";

import {BerthServicesProvider} from "../../providers/webservices/berthservices";
import {BerthsearchsummaryPage} from "../berthsearchsummary/berthsearchsummary";
import {BerthsearchdetailviewPage} from "../berthsearchdetailview/berthsearchdetailview";
import {TruckSearchResultsPage} from "../trucksearchresult/trucksearchresult";
import {ServicesPage} from "../services/services";
import {BerthSearchViewPage} from "../berthsearchview/berthsearchview";
import {Utils} from "../../shared/utils";
import {SSSServiceProvider} from "../../providers/webservices/sssservices";
import {CshServiceProvider} from "../../providers/webservices/cshservice";
import {ShipServSchedSearchResultViewPage} from "../shipservschedsearchresultview/shipservschedsearchresultview";
import {ShipServSchedDetailViewPage} from "../shipservscheddetailview/shipservscheddetailview";
import { RBServiceProvider } from '../../providers/webservices/rbservices';
import {ShipServSchedSearchDetailResultModel} from "../../shared/model/shipservsched/ssssearchdetailresult.model";
import {SsrServiceProvider} from "../../providers/webservices/ssrservices";

/**
 * Generated class for the ExecuteactionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-executeaction',
  templateUrl: 'executeaction.html',
  providers: [ExecuteActionResultModel, ExecuteactionrequestModel,Utils,RBServiceProvider]
})
export class ExecuteactionPage {

  requestNo: any;
  status: string = 'Approve';
  comments: string = '';
  fromPage: string;

  actionDone: string;

  /*for berth*/
  rotationNo: string;
  berthStatus: string;
  approval_msg: string;
  already_done_msg:string;
  reject_msg: string;

  alertHeadding: string;
  commentMandatory: string;
  okText: string;
  header:string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public commonServices: CommonservicesProvider,
              public executeActionRequest: ExecuteactionrequestModel, public executeActionResult: ExecuteActionResultModel,
              public vesselservicesProvider: VesselservicesProvider, public truckservicesProvider: TruckservicesProvider,
              public alertCtrl: AlertController,
              public berthServicesProvider: BerthServicesProvider,public util: Utils,
              public sssServiceProvider:SSSServiceProvider,
              public cshServiceProvider: CshServiceProvider,
              public rbServiceProvider:RBServiceProvider,
              public ssrServiceProvider:SsrServiceProvider) {

    this.requestNo = this.navParams.get('requestNo');
    this.fromPage = this.navParams.get('fromPage');

    /*berth_specific*/
    this.rotationNo = this.navParams.get('rotationNo');
    this.berthStatus = this.navParams.get('berthStatus');
    this.approval_msg = this.util.getLocaleString('approval_msg');
    this.already_done_msg = this.util.getLocaleString('action_already_done');
    this.reject_msg = this.util.getLocaleString('reject_msg');
    this.status = '';
    this.header = this.navParams.get('header');
    if(undefined == this.header || '' == this.header){
      this.header = "Action";
    }
    if(this.fromPage=="csh" || this.fromPage=="CshSearchResult"){
      this.header = "Approve-Container Special Handling";
    }
    if(this.fromPage == "RB"){
      this.header = "Approve- Resource Booking";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExecuteactionPage');
  }

  proceed() {
    if(this.status == '') {
      if ((this.fromPage == 'Truck') || (this.fromPage == 'TruckSearchResult')) {
        this.truckservicesProvider.executeTruckAction(this.executeActionRequest)
          .subscribe(response => {
              this.executeActionResult = <ExecuteActionResultModel>response;
              this.status = response.Status;
              this.actionDone = '';
              if (this.status == 'Approved') {
                this.actionDone = this.approval_msg;
              } else if (this.status == 'Rejected') {
                this.actionDone = this.reject_msg;
              }
              this.presentAlert();
            },
            error => {
              var errorMessage = <any>error;
              //Show error message
              //dismiss loading
            });
      } else if ((this.fromPage == 'Vessel') || (this.fromPage == 'VesselSearchResult')) {
        this.vesselservicesProvider.executeVesselAction(this.executeActionRequest)
          .subscribe(response => {
              this.executeActionResult = <ExecuteActionResultModel>response;
              this.status = response.Status;
              this.actionDone = '';
              if (this.status == 'Approved') {
                this.actionDone = this.approval_msg;
              } else if (this.status == 'Rejected') {
                this.actionDone = this.reject_msg;
              }
              this.presentAlert();
            },
            error => {
              var errorMessage = <any>error;
              //Show error message
              //dismiss loading
            });
      }
      else if ((this.fromPage == 'Berth') || (this.fromPage == 'BerthSearchViewPage')) {
        this.berthServicesProvider.executeAction(this.executeActionRequest)
          .subscribe(response => {
              this.executeActionResult = <ExecuteActionResultModel>response;
              this.status = response.Status;
              this.actionDone = '';
              if (this.status == 'Approved') {
                this.actionDone = this.approval_msg;
              } else if (this.status == 'Rejected') {
                this.actionDone = this.reject_msg;
              }
              this.presentAlert();
            },
            error => {
              var errorMessage = <any>error;
              //Show error message
              //dismiss loading
            });
      }
      else if ((this.fromPage == 'sssHistoryPage') || (this.fromPage == 'sssResultPage')) {
        let isApprovedModel = new ShipServSchedSearchDetailResultModel();
        isApprovedModel.wrkflwId = this.executeActionRequest.workFlowId;
        this.sssServiceProvider.sssIsApproved(isApprovedModel)
          .subscribe(response => {
            if (response) {
              this.sssServiceProvider.executeSSSAction(this.executeActionRequest)
                .subscribe(response => {
                    this.executeActionResult = <ExecuteActionResultModel>response;
                    this.status = response.Status;
                    this.actionDone = '';
                    if (this.status == 'Approved') {
                      this.actionDone = this.approval_msg;
                    } else if (this.status == 'Rejected') {
                      this.actionDone = this.reject_msg;
                    }
                    this.presentAlert();
                  },
                  error => {
                    var errorMessage = <any>error;
                    //Show error message
                    //dismiss loading
                  });
            } else {
              this.actionDone = this.already_done_msg;
              this.presentAlert();
            }
          });
      } else if (this.fromPage == 'csh' || (this.fromPage == 'CshSearchResult')) {
        this.cshServiceProvider.executeCshAction(this.executeActionRequest)
          .subscribe(response => {
              this.executeActionResult = <ExecuteActionResultModel>response;
              this.status = response.Status;
              this.actionDone = '';
              if (this.status == 'Approved') {
                this.actionDone = this.approval_msg;
              } else if (this.status == 'Rejected') {
                this.actionDone = this.reject_msg;
              }
              this.presentAlert();
            },
            error => {
              var errorMessage = <any>error;
              //Show error message
              //dismiss loading
            });
      }
      else if (this.fromPage == 'RB' || (this.fromPage == 'RBsearchResults')) {
        this.rbServiceProvider.executeRBAction(this.executeActionRequest)
          .subscribe(response => {
              this.executeActionResult = <ExecuteActionResultModel>response;
              this.status = response.Status;
              this.actionDone = '';
              if (this.status == 'Approved') {
                this.actionDone = this.approval_msg;
              } else if (this.status == 'Rejected') {
                this.actionDone = this.reject_msg;
              }
              this.presentAlert();
            },
            error => {
              var errorMessage = <any>error;
              //Show error message
              //dismiss loading
            });
      }else if (this.fromPage == 'SSR' || (this.fromPage == 'SSRsearchResults')) {
        this.ssrServiceProvider.executeSSRAction(this.executeActionRequest)
          .subscribe(response => {
              this.executeActionResult = <ExecuteActionResultModel>response;
              this.status = response.Status;
              this.actionDone = '';
              if (this.status == 'Approved') {
                this.actionDone = this.approval_msg;
              } else if (this.status == 'Rejected') {
                this.actionDone = this.reject_msg;
              }
              this.presentAlert();
            },
            error => {
              var errorMessage = <any>error;
              //Show error message
              //dismiss loading
            });
      }
    }else {
      this.actionDone = this.already_done_msg;
      this.presentAlert();
    }
  }


  approve() {
    this.executeActionRequest.workFlowId = this.navParams.get('workFlowId');
    this.executeActionRequest.command = 'Approve';
    this.executeActionRequest.comments = this.comments;
    this.proceed();
  }

  reject() {
    this.executeActionRequest.workFlowId = this.navParams.get('workFlowId');
    this.executeActionRequest.command = 'Reject';
    this.executeActionRequest.comments = this.comments;
    this.alertHeadding = this.util.getLocaleString("alert");
    this.commentMandatory = this.util.getLocaleString("comment_mandatory");
    this.okText = this.util.getLocaleString("ok_text");
    if (this.comments.length == 0) {
      const alert = this.alertCtrl.create({
        title: this.alertHeadding,
        subTitle: this.commentMandatory,
        buttons: [this.okText]
      });
      alert.present();
    } else {

      this.proceed();
    }
  }

  navigateToView() {
    console.log("<<"+this.fromPage+">>");
    if (this.fromPage === 'Truck') {

      this.navCtrl.pop();
/*      this.navCtrl.popTo(this.navCtrl.getByIndex(2)).then(() => {
        this.navCtrl.push(TruckdetailsPage, {
          truckRegRequestId: this.requestNo,
          fromHistory: true,
          actionStatus: this.status,
          mode: 'view'
        });
      });*/
    } else if (this.fromPage === 'Vessel') {
      this.navCtrl.popTo(this.navCtrl.getByIndex(2)).then(() => {
        this.navCtrl.push(VesselViewPage, {requestNo: this.requestNo, fromHistory: true, actionStatus: this.status});
      });
    }
    else if (this.fromPage == 'VesselSearchResult') {
      this.navCtrl.popTo(ServicesPage).then(() => {
        this.navCtrl.push(VesselsearchviewPage);
      });
    } else if (this.fromPage == 'TruckSearchResult') {
      console.log("<<inside search result>>");
      this.navCtrl.popTo(ServicesPage).then(() => {
        this.navCtrl.push(TruckSearchResultsPage, {source: "fromApprove"});
      });
    } else if (this.fromPage === 'Berth') {
      this.navCtrl.pop();/*To(this.navCtrl.getByIndex(2)).then(() => {
        this.navCtrl.push(BerthsearchdetailviewPage, {
          rotationNo: this.rotationNo, berthStatus: this.status,
          requestNo: this.requestNo, fromHistory: true
        });
      });*/
    }
    else if (this.fromPage == 'BerthSearchViewPage') {
      this.navCtrl.popTo(ServicesPage).then(() => {
        this.navCtrl.push(BerthSearchViewPage);
      });
    }
    else if (this.fromPage == 'sssResultPage') {
      this.navCtrl.popTo(ServicesPage).then(() => {
        this.navCtrl.push(ShipServSchedSearchResultViewPage)
      });
    }else if (this.fromPage == 'csh' || this.fromPage == 'CshSearchResult'){
      this.navCtrl.pop();
    } else if (this.fromPage == 'sssHistoryPage') {
      this.navCtrl.pop();
    }
    else if (this.fromPage == 'RB'|| (this.fromPage ==  'RBsearchResults')) {
      this.navCtrl.pop();
    }
  }

  presentAlert() {
    const alert = this.alertCtrl.create({
      title: 'Message',
      subTitle: this.actionDone,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navigateToView();
          },
        }],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  goBack() {
    this.navCtrl.pop();
  }


}
