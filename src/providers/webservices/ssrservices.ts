import {RestserviceProvider} from "../restservice/restservice";
import {Observable} from "rxjs/Observable";
import * as ServiceConfig from "../../shared/serviceconfiguration";
import {SsrSearchByIdRequestModal} from "../../shared/model/ssr/searchbyidrequest.modal";
import {SSRSearchRequest} from "../../shared/model/ssr/ssrsearchrequest.model";
import {Injectable} from "@angular/core";
import { SSRHistoryReqModel } from '../../shared/model/ssr/ssrhistoryreq.model';
import {SpecialServiceSubTypeReqModel} from "../../shared/model/ssr/specialservicesubtypereq.model";
import {FiletransferProvider} from "../filetransfer/filetransfer";
import { ServiceProviderMasterReqModel } from '../../shared/model/ssr/serviceprovidermasterreq.model';
import {LocationMasterRequestModel} from '../../shared/model/ssr/locationmasterreq.model';
import {SpecialServiceTypeReqModel} from '../../shared/model/ssr/specialservicetypereq.model';
import {ExecuteactionrequestModel} from "../../shared/model/executeaction/executeactionrequest.model";
import {SSRCancelReq} from '../../shared/model/ssr/ssrcancelreq.model';

@Injectable()
export class SsrServiceProvider {

  constructor(private restService: RestserviceProvider,private fileTransfer: FiletransferProvider) {

  }
  searchSsrByID(ssrSearchByIdModal: SsrSearchByIdRequestModal): Observable<any> {
    let body = JSON.stringify(ssrSearchByIdModal);
    return this.restService.doPost(ServiceConfig.SEARCH_SPECIAL_SERVICES_BY_ID, body, null, true);
  }
  searchSsr(ssrSearchRequest: SSRSearchRequest): Observable<any> {
    let body = JSON.stringify(ssrSearchRequest);
    return this.restService.doPost(ServiceConfig.SEARCH_SPECIAL_SERVICES, body, null, true);
  }
  getSSRHistory(ssrHistoryReqModel: SSRHistoryReqModel): Observable<any> {
    let body = JSON.stringify(ssrHistoryReqModel);
    return this.restService.doPost(ServiceConfig.SSR_HISTORY, body, null, true);

  }
   specialSubService(specialServiceSubTypeReqModel: SpecialServiceSubTypeReqModel): Observable<any> {
    let body = JSON.stringify(specialServiceSubTypeReqModel);
    return this.restService.doPost(ServiceConfig.SPECIAL_SUB_SERVICE_TYPE, body, null, false);
  }
   openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }
  getSSRMasterResponse(serviceProviderMasterReqModel: ServiceProviderMasterReqModel): Observable<any> {
    let body = JSON.stringify(serviceProviderMasterReqModel);
    return this.restService.doPost(ServiceConfig.SSR_SP_MASTER, body, null, true);

  }
  getSSRLocationMasterResponse(locationMasterRequestModel: LocationMasterRequestModel): Observable<any> {
    let body = JSON.stringify(locationMasterRequestModel);
    return this.restService.doPost(ServiceConfig.LOCATION_TERMINAL_MASTER, body, null, true);

  }
  getSSRSpecialServiceType(specialServiceTypeReqModel: SpecialServiceTypeReqModel): Observable<any> {
    let body = JSON.stringify(specialServiceTypeReqModel);
    return this.restService.doPost(ServiceConfig.SPECIAL_SERVICE_TYPE, body, null, true);

  }
   executeSSRAction(executeactionrequestModel: ExecuteactionrequestModel): Observable<any> {
    let body = JSON.stringify(executeactionrequestModel);
    return this.restService.doPost(ServiceConfig.SSR_ACTION, body, null, true);
  }
  cancelSSR(ssrCancelReq: SSRCancelReq): Observable<any> {
    let body = JSON.stringify(ssrCancelReq);
    return this.restService.doPost(ServiceConfig.SSR_CANCEL, body, null, true);
  }
}
