import {Injectable} from '@angular/core';
import {RestserviceProvider} from '../../providers/restservice/restservice';
import {Observable} from 'rxjs/Observable';

import * as ServiceConfig from '../../shared/serviceconfiguration';

import {VesselRegSearchModel} from '../../shared/model/vesselsearchview/vesselregsearch.model';
import {VesselIDSearchModel} from '../../shared/model/vesselsearchdetails/vesselidsearch.model';
import {SearchApprovedModel} from "../../shared/model/vesselsearchdetails/searchapproved.model";

import {ExecuteactionrequestModel} from "../../shared/model/executeaction/executeactionrequest.model";
import {VesselHistoryRequest} from "../../shared/model/vesselhistory/vesselhistoryrequest.model";
import {VesselComparisonRequest} from "../../shared/model/vesselcomparison/vesselcomparison.request";

/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VesselservicesProvider {

  constructor(private restService: RestserviceProvider) {

  }

  searchVesselRegistered(vesselRegSearchModel: VesselRegSearchModel): Observable<any> {
    let body = JSON.stringify(vesselRegSearchModel);
    return this.restService.doPost(ServiceConfig.SEARCH_VESSEL_REG_URL, body, null, true);
  }

  searchVesselByID(vesselIDSearchModel: VesselIDSearchModel): Observable<any> {
    let body = JSON.stringify(vesselIDSearchModel);
    return this.restService.doPost(ServiceConfig.SEARCH_VESSEL_BY_ID_URL, body, null, true);
  }

  searchApprovedImo(searchApprovedModel: SearchApprovedModel): Observable<any> {
    let body = JSON.stringify(searchApprovedModel);
    return this.restService.doPost(ServiceConfig.VESSEL_SEARCH_APPROVAL_IMO, body, null, true);
  }

  executeVesselAction(executeactionrequestModel: ExecuteactionrequestModel): Observable<any> {
    let body = JSON.stringify(executeactionrequestModel);
    return this.restService.doPost(ServiceConfig.VESSEL_EXECUTE_ACTION, body, null, true);
  }

  getHistory(vesselHistoryRequest: VesselHistoryRequest): Observable<any> {
    let body = JSON.stringify(vesselHistoryRequest);
    return this.restService.doPost(ServiceConfig.VESSEL_HISTORY_URL, body, null, true);
  }

  compare(vesselComparisonRequest : VesselComparisonRequest):Observable<any>{
    let body = JSON.stringify(vesselComparisonRequest);
    return this.restService.doPost(ServiceConfig.VESSEL_COMPARISON_URL, body,null, true);
  }

}
