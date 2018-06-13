import {RestserviceProvider} from "../restservice/restservice";
import {Observable} from "rxjs/Observable";
import * as ServiceConfig from "../../shared/serviceconfiguration";
import {ShipServSchedSearchModel} from "../../shared/model/shipservsched/ssssearch.model";
import {Injectable} from "@angular/core";
import {ShipServSchedGetUserDataModel} from "../../shared/model/shipservsched/sssgetuserdata.model";
import {ShipServSchedGetHistoryDataModel} from "../../shared/model/shipservsched/sssgethistorydata.model";
import {ExecuteactionrequestModel} from "../../shared/model/executeaction/executeactionrequest.model";
import {URLSearchParams} from "@angular/http";
import {FiletransferProvider} from "../filetransfer/filetransfer";
import {ShipServSchedVesselSearchModel} from "../../shared/model/shipservsched/sssVesselSearch.model";
import {VesselComparisonRequest} from "../../shared/model/vesselcomparison/vesselcomparison.request";
import {SssComparisonRequestModal} from "../../shared/model/shipservsched/ssscomparisonrequest.modal";
import {ShipServSchedSearchDetailResultModel} from "../../shared/model/shipservsched/ssssearchdetailresult.model";

@Injectable()
export class SSSServiceProvider {
  constructor(private restService: RestserviceProvider,private fileTransfer:FiletransferProvider) {
  }

  sssSearchAll(sssSearchModel: ShipServSchedSearchModel): Observable<any> {
    let body = JSON.stringify(sssSearchModel);
    console.log("Ship Serv Sched Request - "+body);
    return this.restService.doPost(ServiceConfig.SSS_SEARCH_ALL, body, null, true);

  }

  sssSearchByID(sssSearchModel: ShipServSchedSearchModel): Observable<any> {
    let body = JSON.stringify(sssSearchModel);
    return this.restService.doPost(ServiceConfig.SSS_SEARCH_BY_ID, body, null, true);
  }

  sssGetLocationData(sssGetUserDataModel:ShipServSchedGetUserDataModel,showLoading:boolean):Observable<any>{
    let body = JSON.stringify(sssGetUserDataModel);
    return this.restService.doPost(ServiceConfig.SSS_LOCATION_MASTER,body,null,showLoading);
  }

  sssGetHistory(sssGetHistoryModel:ShipServSchedGetHistoryDataModel):Observable<any>{
    let body = JSON.stringify(sssGetHistoryModel);
    return this.restService.doPost(ServiceConfig.SSS_HISTORY,body,null,true);
  }

  sssSearchByRequestID(sssSearchModel:ShipServSchedSearchModel):Observable<any>{
    let body = JSON.stringify(sssSearchModel);
    return this.restService.doPost(ServiceConfig.SSS_SEARCH_BY_REQUEST_ID,body,null,true);
  }

  executeSSSAction(executeactionrequestModel: ExecuteactionrequestModel): Observable<any> {
    let body = JSON.stringify(executeactionrequestModel);
    return this.restService.doPost(ServiceConfig.SSS_EXECUTE_ACTION, body, null, true);
  }

  sssIsApproved(sssSearchDetailResultModel:ShipServSchedSearchDetailResultModel): Observable<any> {
    let isApprovedModel = new ShipServSchedSearchDetailResultModel();
    isApprovedModel.wrkflwId = sssSearchDetailResultModel.wrkflwId;
    let body = JSON.stringify(isApprovedModel);
    return this.restService.doPost(ServiceConfig.SSS_IS_APPROVED, body, null, true);
  }

  sssGetVesselName(vesselModel:ShipServSchedVesselSearchModel):Observable<any>{
    let body = JSON.stringify(vesselModel);
    return this.restService.doPost(ServiceConfig.SSS_VESSEL_NAME,body,null,false);

  }

  openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }

  download(args:Map<string,string>,type:string){
    let view_url = ServiceConfig.SSS_DOWNLOAD;
    let downloadType = "pdf";
    if(null != type && "" != type) {
      if(type == "pdf") {
        downloadType = "pdf";
      } else {
        downloadType = "excel";
      }
    }
    Array.from(args.keys(), (key : string, index : number) => {
      view_url = view_url +key+ '=';
      if( args.get(key) != null)
        view_url = view_url +args.get(key);
      if(index <= (args.size - 1)){
        view_url = view_url + '&';
      }
    });
    view_url = view_url + "exportType=" + downloadType;
    if(downloadType == "excel"){
      downloadType = "csv";
    }
    let file_type = downloadType;
    let file_name = "shippingschedule."+downloadType;
    this.fileTransfer.viewDocument(view_url, file_type,file_name);

  }
  compare(sssComparisonRequestModal : SssComparisonRequestModal):Observable<any>{
    let body = JSON.stringify(sssComparisonRequestModal);
    return this.restService.doPost(ServiceConfig.SSS_COMPARISON_URL, body,null, true);
  }
}
