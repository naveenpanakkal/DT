import { Injectable } from '@angular/core';
import { RestserviceProvider } from '../../providers/restservice/restservice';
import { Observable } from 'rxjs/Observable';
import {BerthSearchReqModel} from "../../shared/model/berthsearchview/berthsearchviewreq.model";
import {BerthSearchDetailsReqModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsreq.model";
import {BerthHistoryRequestModel} from "../../shared/model/berthsearchview/berthhistory/berthhistoryrequest.model";
import {BerthSearchDetailsResultModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthsearchdetailsresult.model";
import {BerthDeleteByIdreqModel} from "../../shared/model/berthsearchview/berthsearchdetails/berthdeletebyidreq.model";
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {ExecuteactionrequestModel} from "../../shared/model/executeaction/executeactionrequest.model";
import {TerminalMasterReqModel} from "../../shared/model/berthsearchview/berthsearchdetails/terminalmasterreq.model";
import {BerthClientMasterReq} from "../../shared/model/berthsearchview/berthsearch/berthclientmasterreq.model";
import {FiletransferProvider} from "../filetransfer/filetransfer";

@Injectable()
export class BerthServicesProvider {

  constructor(private restService: RestserviceProvider,private fileTransfer: FiletransferProvider) {

  }

  searchBerthRegistered(berthSearchReqModel: BerthSearchReqModel): Observable<any> {
    let body = JSON.stringify(berthSearchReqModel);
    return this.restService.doPost(ServiceConfig.SEARCH_BERTH_REG_URL, body, null, true);
  }
  searchBerthByID(berthSearchDetailsReqModel: BerthSearchDetailsReqModel): Observable<any> {
    let body = JSON.stringify(berthSearchDetailsReqModel);
    return this.restService.doPost(ServiceConfig.SEARCH_BERTH_BY_NO_URL, body, null, true);
  }
  getHistory(berthHistoryRequest: BerthHistoryRequestModel): Observable<any> {
    let body = JSON.stringify(berthHistoryRequest);
    return this.restService.doPost(ServiceConfig.BERTH_HISTORY_URL, body, null, true);
  }
   compare(berthSearchDetailsReqModel: BerthSearchDetailsReqModel): Observable<any> {
    let body = JSON.stringify(berthSearchDetailsReqModel);
    return this.restService.doPost(ServiceConfig.BERTH_COMPARISON_URL, body, null, true);
  }
  
  executeAction(executeactionrequestModel: ExecuteactionrequestModel): Observable<any> {
    let body = JSON.stringify(executeactionrequestModel);
    return this.restService.doPost(ServiceConfig.BERTH_EXECUTE_ACTION, body, null, true);
  }

  CancelBerth(berthSearchDetailsResultModel: BerthSearchDetailsResultModel): Observable<any> {
    let body = JSON.stringify(berthSearchDetailsResultModel);
    return this.restService.doPost(ServiceConfig.BERTH_DELETE_BY_ID, body, null, true);
  }
  DeleteBerth(berthSearchDetailsResultModel: BerthSearchDetailsResultModel): Observable<any> {
    let body = JSON.stringify(berthSearchDetailsResultModel);
    return this.restService.doPost(ServiceConfig.BERTH_CANCEL, body, null, true);
  }

  DeletebyId(berthdeletebyIdreqModel: BerthDeleteByIdreqModel): Observable<any> {
    let body = JSON.stringify(berthdeletebyIdreqModel);
    return this.restService.doPost(ServiceConfig.BERTH_DELETE_BY_ID, body, null, true);
  }
 getClientMasterData(berthClientMasterReq:BerthClientMasterReq):Observable<any> {
    let body = JSON.stringify(berthClientMasterReq);
    return this.restService.doPost(ServiceConfig.BERTH_CLIENT_MASTER, body, null, false);
  }
  getShippingMasterData(berthClientMasterReq:BerthClientMasterReq):Observable<any> {
    let body = JSON.stringify(berthClientMasterReq);
    return this.restService.doPost(ServiceConfig.BERTH_SHIPPING_MASTER, body, null, false);
  }
   getTerminalMasterData(terminalMasterReqModel:TerminalMasterReqModel):Observable<any> {
    let body = JSON.stringify(terminalMasterReqModel);
    return this.restService.doPost(ServiceConfig.BERTH_TERMINAL_MASTER, body, null, false);
  }
  openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }
}
