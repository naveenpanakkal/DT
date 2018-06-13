import {Injectable} from '@angular/core';
import {RestserviceProvider} from '../../providers/restservice/restservice';
import {Observable} from 'rxjs/Observable';

import * as ServiceConfig from '../../shared/serviceconfiguration';

import { ExecuteactionrequestModel} from "../../shared/model/executeaction/executeactionrequest.model";
import { TrucksearchbyidRequestModel} from "../../shared/model/trucksearchdetails/trucksearchbyidrequest.model";
import { OwnerCheckTruckModel } from "../../shared/model/trucksearchdetails/ownerchecktruck.model";

import {TruckRegSearchReqModel} from "../../shared/model/trucksearchview/truckregsearchrequest.model";
import {TruckSearchForReqModel} from "../../shared/model/trucksearchview/trucksearchforreg.model";
import {TruckHistoryRequestModel} from "../../shared/model/truckhistory/truckhistoryrequest.model";
import {TruckComparisonRequest} from "../../shared/model/truckcomparison/truckcomparison.request";
import {TruckRegResultModel} from "../../shared/model/trucksearchdetails/truckregresult.model";
import {CheckMultipleTruckModel} from "../../shared/model/trucksearchdetails/checkmultipletruck.model";
import {TruckAdminEditModal} from "../../shared/model/trucksearchdetails/truckadminedit.modal";
import {FiletransferProvider} from "../filetransfer/filetransfer";

/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class TruckservicesProvider {

  constructor(private restService: RestserviceProvider,private fileTransfer: FiletransferProvider) {

  }

  executeTruckAction(executeactionrequestModel: ExecuteactionrequestModel): Observable<any> {
    let body = JSON.stringify(executeactionrequestModel);
    return this.restService.doPost(ServiceConfig.TRUCK_EXECUTE_ACTION, body, null, true);
  }


  cancelTruck(truckSearchbyidModel: TrucksearchbyidRequestModel): Observable<any> {
    let body = JSON.stringify(truckSearchbyidModel);
    return this.restService.doPost(ServiceConfig.TRUCK_CANCEL, body, null, true);
  }

    ownerCheckTruckAction(ownerchecktruckModel :OwnerCheckTruckModel): Observable<any>  {
    let body = JSON.stringify(ownerchecktruckModel);
    return this.restService.doPost(ServiceConfig.TRUCK_OWNER_CHECK, body, null, true);
  }

  searchTruckRegistered(truckregsearchmodel: TruckRegSearchReqModel): Observable<any> {
    let body = JSON.stringify(truckregsearchmodel);
    return this.restService.doPost(ServiceConfig.SEARCH_TRUCK_REGISTERED_URL, body, null, true);
  }

  searchTruckForRegistration(trucksearchforreqmodel: TruckSearchForReqModel): Observable<any> {
    let body = JSON.stringify(trucksearchforreqmodel);
    return this.restService.doPost(ServiceConfig.TRUCK_SEARCH_FOR_REG, body, null, true);
  }

  searchTruckById(truckSearchbyidModel: TrucksearchbyidRequestModel): Observable<any> {
    let body = JSON.stringify(truckSearchbyidModel);
    return this.restService.doPost(ServiceConfig.TRUCK_SEARCH_BY_ID_URL, body, null, true);
  }

  getHistory(truckHistoryModel: TruckHistoryRequestModel): Observable<any> {
    let body = JSON.stringify(truckHistoryModel);
    return this.restService.doPost(ServiceConfig.TRUCK_HISTORY_URL, body, null, true);
  }

  compare(truckComparisonRequest: TruckComparisonRequest): Observable<any> {
    let body = JSON.stringify(truckComparisonRequest);
    return this.restService.doPost(ServiceConfig.TRUCK_COMPARISON_URL, body, null, true);
  }

  editTruck(truckcreateditmodel: TruckRegResultModel): Observable<any> {
    let body = JSON.stringify(truckcreateditmodel);
    return this.restService.doPost(ServiceConfig.TRUCK_EDIT_URL, body, null, true);
  }

  editAdminTruck(truckadmineditmodal: TruckAdminEditModal): Observable<any> {
    let body = JSON.stringify(truckadmineditmodal);
    return this.restService.doPost(ServiceConfig.TRUCK_ADMIN_EDIT_URL, body, null, true);
  }
  createTruck(truckcreateditmodel: TruckRegResultModel): Observable<any> {
    let body = JSON.stringify(truckcreateditmodel);
    return this.restService.doPost(ServiceConfig.TRUCK_CREATE_URL, body, null, true);
  }

  checkMultipleTruck(checkMultipleTruckModel: CheckMultipleTruckModel): Observable<any> {
    let body = JSON.stringify(checkMultipleTruckModel);
    return this.restService.doPost(ServiceConfig.TRUCK_MULTIPLE_EXIST, body, null, true);
  }
   openDocuments() : Promise<any> {

    return this.fileTransfer.openDocument(ServiceConfig.TRUCK_UPLOAD_FILE);
  }

  openAttachment(attachment: any) {
    if(attachment.fileName != null && attachment.fileName != "") {
      this.fileTransfer.openAttachment(attachment);
    }
  }
}
