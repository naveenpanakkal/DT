import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,PopoverController } from 'ionic-angular';
import { WorkflowdetailsPage } from '../workflowdetails/workflowdetails';
import {VesselIDSearchModel} from '../../shared/model/vesselsearchdetails/vesselidsearch.model';
import {VesselIDSearchResultModel} from '../../shared/model/vesselsearchdetails/vesselidsearchresult.model';
import {VesselWFRequestModel} from '../../shared/model/vesselworkflow/vesselwfrequest.model';
import {VesselWFResultModel} from '../../shared/model/vesselworkflow/vesselwfresult.model';
import {VesselWFTaskVariableModel} from '../../shared/model/vesselworkflow/vesselwftaskvariable.model';
import {VesselWFProcessVariableModel} from '../../shared/model/vesselworkflow/vesselwfprocessvariable.model';
import {VesselservicesProvider} from "../../providers/webservices/vesselservices";
import {CommonservicesProvider} from "../../providers/webservices/commonservices";
import {Utils} from "../../shared/utils";

/**
 * Generated class for the WorkflowPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-workflow',
  templateUrl: 'workflow.html',
  providers: [VesselIDSearchModel,VesselIDSearchResultModel,VesselWFResultModel,VesselWFTaskVariableModel,
  VesselWFProcessVariableModel,VesselWFRequestModel,Utils]
})
export class WorkflowPage {

  singleValue: any;
  appname: any;
  popover: any;
  vessel:number=0;
  workflowid:string="";
  workflowModule:string;
  requestid:any;
  completed: boolean = true;
  workflowdetails:VesselWFResultModel[];

  commentText:string;
  status:string;
  pendingstatus:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public popoverCtrl: PopoverController,
  public vesselSearchbyidrequestModel: VesselIDSearchModel,public vesselSearchbyidresultModel:VesselIDSearchResultModel,
  public vesselServicesProvider: VesselservicesProvider,public vesselWFResultModel:VesselWFResultModel,
  public commonservices:CommonservicesProvider,public vesselWFRequestModel:VesselWFRequestModel,
  public vesselWFTaskVariableModel:VesselWFTaskVariableModel,public vesselWFProcessVariableModel:VesselWFProcessVariableModel,
  public utils : Utils) {

  this.requestid=this.navParams.get('requestID');
  this.workflowid = this.navParams.get('workflowId');
  this.workflowModule = this.navParams.get("WFModule");
  this.pendingstatus=this.utils.getLocaleString("pendingstatus");
    if(this.workflowid.length > 0){

        this.loadWFDetails();

    }
  }

  ionViewDidLoad() {
  }

  getStatusStyle(list) {
    if(list.taskVariable) {
      if((list.taskVariable.Status)&& list.taskVariable.Status=='Approved') {
        return 'boxItemApproved';
      } else if((list.taskVariable.Status)&& list.taskVariable.Status=='Rejected') {
        return 'boxItemRejected';
      }  else if((list.taskVariable.Status)&& list.taskVariable.Status=='Cancel') {
        return 'boxItemCancelled';
      } else {
        return 'boxItem';
     }
      } else {
        return 'boxItem'
    }
  }

  presentpopover(myEvent,s){
   this.vesselWFProcessVariableModel=<VesselWFProcessVariableModel>(s.processVariable),
   this.vesselWFTaskVariableModel=<VesselWFTaskVariableModel>(s.taskVariable);

if(this.vesselWFTaskVariableModel) {
  if(this.vesselWFTaskVariableModel.comments) {
    this.commentText = this.vesselWFTaskVariableModel.comments;
  } else {
    this.commentText = "";
  }

  if(this.vesselWFTaskVariableModel.Status) {

    this.status  = this.vesselWFTaskVariableModel.Status;
  } else {
    this.status  = this.pendingstatus;
  }

} else {
  this.status  = this.pendingstatus;
  this.commentText = "";
}


    this.popover = this.popoverCtrl.create(WorkflowdetailsPage,{
      requestID:this.requestid,
      date:s.claimTime,
      actionName:s.name,
      actionBy:s.assignee,
      remarks:this.commentText,
      status:this.status}, {cssClass: 'workflowpopover'});


    this.popover.present({
      ev: myEvent
    });
    this.popover.onDidDismiss((data) => {

    });
  }
     /*modified method to move searchWorkflowById method to common service class*/
    loadWFDetails(){
      this.vesselWFRequestModel.workFlowId=this.workflowid;
      this.commonservices.searchWorkflowByID(this.vesselWFRequestModel, this.workflowModule)
      .subscribe(response => {
       this.workflowdetails = <VesselWFResultModel[]>response;
       },
      error => {
        var errorMessage = <any>error;
        //Show error message
        //dismiss loading
      });
    }
}
