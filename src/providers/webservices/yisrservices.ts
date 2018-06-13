import {Injectable} from '@angular/core';
import {RestserviceProvider} from '../../providers/restservice/restservice';
import {Observable} from 'rxjs/Observable';
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {YisrSearchReqModel} from "../../shared/model/YISR/yisrsearchreq.model";
import {YisrServiceProviderReqModel} from "../../shared/model/YISR/yisrServiceProviderReq.model";
/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class YisrServicesProvider {

  constructor(private restService: RestserviceProvider) {

  }
  yisrSearch(yisrSearchreqModel: YisrSearchReqModel): Observable<any> {
    let body = JSON.stringify(yisrSearchreqModel);
    return this.restService.doPost(ServiceConfig.YISR_SEARCH_ALL, body, null, true);
  }
  getServiceProvider(yisrServiceProviderReqModel: YisrServiceProviderReqModel, showloading: boolean): Observable<any> {
    let body = JSON.stringify(yisrServiceProviderReqModel);
    return this.restService.doPost(ServiceConfig.YISR_GET_CLIENTDETAILS, body, null, showloading);
  }
}
