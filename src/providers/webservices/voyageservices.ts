import {Injectable} from '@angular/core';
import {RestserviceProvider} from '../../providers/restservice/restservice';
import {Observable} from 'rxjs/Observable';
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {DefinedSetRequest} from "../../shared/model/voyage/voyageenquiryinitdefinedsetrequest.model";
import {VoyageEnquirySearchRequestModel} from "../../shared/model/voyage/voyageenquirysearchrequest.model";
import {VoyageEnquirySearchByIdModel} from "../../shared/model/voyage/voyageenquiryserachbyid.model";
import {ServiceProviderCode} from "../../pages/voyagefilterpopover/voyagefilterpopover";
/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class VoyageServicesProvider {

  constructor(private restService: RestserviceProvider) {

  }
  voyageInit(definedSetRequest: DefinedSetRequest, isOpenService : boolean): Observable<any> {
    let body = JSON.stringify(definedSetRequest);
    if (isOpenService)
      return this.restService.doPost(ServiceConfig.VOYAGE_OPEN_INIT, body, null, false);
    else
      return this.restService.doPost(ServiceConfig.VOYAGE_INIT, body, null, false);
  }
  voyageSearchLocation(serviceProviderCode: ServiceProviderCode,showLoading, isOpenService : boolean): Observable<any> {
    let body = JSON.stringify(serviceProviderCode);
    if (isOpenService)
      return this.restService.doPost(ServiceConfig.VOYAGE_OPEN_SEARCH_LOCATION_MASTER, body, null, showLoading);
    else
      return this.restService.doPost(ServiceConfig.VOYAGE_SEARCH_LOCATION_MASTER, body, null, showLoading);
  }
  voyageSearch(voyageEnquirySearchRequestModel: VoyageEnquirySearchRequestModel, isOpenService : boolean): Observable<any> {
    let body = JSON.stringify(voyageEnquirySearchRequestModel);
    if (isOpenService )
      return this.restService.doPost(ServiceConfig.VOYAGE_OPEN_SEARCH_REQUEST, body, null, true);
    else
      return this.restService.doPost(ServiceConfig.VOYAGE_SEARCH_REQUEST, body, null, true);


  }
  voyagSearchById(voyageEnquirySearchById: VoyageEnquirySearchByIdModel,  isOpenService : boolean): Observable<any> {
    let body = JSON.stringify(voyageEnquirySearchById);
    if ( isOpenService )
      return this.restService.doPost(ServiceConfig.VOYAGE_OPEN_SEARCH_BY_ID, body, null, true);
    else
      return this.restService.doPost(ServiceConfig.VOYAGE_SEARCH_BY_ID, body, null, true);
  }

}
