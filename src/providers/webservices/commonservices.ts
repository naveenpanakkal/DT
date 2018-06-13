import {Injectable} from '@angular/core';
import {RestserviceProvider} from '../../providers/restservice/restservice';
import {Observable} from 'rxjs/Observable';
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {VesselWFRequestModel} from "../../shared/model/vesselworkflow/vesselwfrequest.model";
import {DocumentsReqModel} from "../../shared/model/documentsmaster/documentsreq.model";
import {DefinedSetReqModel} from "../../shared/model/definedset/definedsetreq.model";

/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonservicesProvider {

  constructor(private restService: RestserviceProvider) {

  }

  /*executeAction(executeactionrequestModel :ExecuteactionrequestModel): Observable<any>  {
    let body = JSON.stringify(executeactionrequestModel);
    return this.restService.doPost(ServiceConfig.EXECUTE_ACTION, body, null);
  }*/

  searchWorkflowByID(vesselWFRequestModel: VesselWFRequestModel, wfmodule: string): Observable<any> {
    let body = JSON.stringify(vesselWFRequestModel);
    if (wfmodule == "vessel") {
      console.log(wfmodule);
      return this.restService.doPost(ServiceConfig.SEARCH_VESSEL_BY_WORKFLOWID_URL, body, null, true);
    } else if (wfmodule == "truck") {
      return this.restService.doPost(ServiceConfig.SEARCH_TRUCK_BY_WORKFLOWID_URL, body, null, true);
    }
    else if (wfmodule == "berth") {
      return this.restService.doPost(ServiceConfig.SEARCH_BERTH_WORKFLOWID_URL, body, null, true);
    }
    else if(wfmodule == "sss"){
      return this.restService.doPost(ServiceConfig.SEARCH_SSS_WORKFLOWID_URL, body, null, true);
    }
    else if(wfmodule == "csh"){
      return this.restService.doPost(ServiceConfig.SEARCH_CSH_WORKFLOWID_URL, body, null, true);
    }
    else if(wfmodule == "rsb"){
      return this.restService.doPost(ServiceConfig.RB_WORKFLOWID_URL, body, null, true);
    }
    else if(wfmodule == "ssr"){
      return this.restService.doPost(ServiceConfig.SSR_WORKFLOWID_URL, body, null, true);
    }
  }

  getDocuments(documentsReqModel: DocumentsReqModel, dmodule: string): Observable<any> {
    let body = JSON.stringify(documentsReqModel);
    if (dmodule == "truck") {
      return this.restService.doPost(ServiceConfig.TRUCK_DOCUMENT_MASTER, body, null, false);
    }
  }

  getDefinedSet(definedSetModel : DefinedSetReqModel): Observable<any> {
    let body = JSON.stringify(definedSetModel);
    return this.restService.doPost(ServiceConfig.DEFINED_SET, body, null, false);
  }
}
