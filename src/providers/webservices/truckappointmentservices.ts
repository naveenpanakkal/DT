import {RestserviceProvider} from "../restservice/restservice";
import {FiletransferProvider} from "../filetransfer/filetransfer";

import {Injectable} from "@angular/core";

import {Observable} from 'rxjs/Observable';

import * as ServiceConfig from '../../shared/serviceconfiguration';
import {TaSearchSOModel} from "../../shared/model/ta/taSearchSO.model";
import {TruckappointmentdetailsoModel} from "../../shared/model/ta/truckappointmentdetailso.model";
import {TaAddContainerSO} from "../../shared/model/ta/taaddcontainer.model";
import {SubLocationMasterReqModel} from "../../shared/model/sublocationmaster.model";
import {TaTruckRegSOModel} from "../../shared/model/ta/tatruckregso.model";
import {DeliveryToSearchSOModel} from "../../shared/model/ta/deliveryToSearchSO.model";
import {RotationNoSearchReqModel} from "../../shared/model/ta/rotationnosearch/rotationnosearchreq.model";

/*
  Generated class for the WebservicesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/


@Injectable()
export class TruckappointmentserviceProvider {

  constructor(private restService: RestserviceProvider, private fileTransfer: FiletransferProvider) {

  }

  getSearchResults(searchRequest: TaSearchSOModel): Observable<any> {
    let body = JSON.stringify(searchRequest);
    return this.restService.doPost(ServiceConfig.TA_SEARCH, body, null, true);
  }

  saveModifiedTA(editRequest: TruckappointmentdetailsoModel): Observable<any> {
    let body = JSON.stringify(editRequest);
    return this.restService.doPost(ServiceConfig.TA_AMEND, body, null, true);
  }

  saveTruckAppointment(createRequest: TruckappointmentdetailsoModel): Observable<any> {
    let body = JSON.stringify(createRequest);
    return this.restService.doPost(ServiceConfig.TA_CREATE, body, null, true);
  }

  printTA(args: Map<string, string>) {
    let view_url = ServiceConfig.TA_PRINT;
    Array.from(args.keys(), (key: string, index: number) => {
      view_url = view_url + key + '=';
      if (args.get(key) != null)
        view_url = view_url + args.get(key);
      if (index < (args.size - 1)) {
        view_url = view_url + '&';
      }
    })
    let file_type = "pdf";
    let file_name = "TRUCK_APPOINTMENT" + args.get("appointmentNoSearch") + "." + file_type;
    this.fileTransfer.viewDocument(view_url, file_type, file_name);
  }

  searchTaById(request: TaSearchSOModel): Observable<any> {
    let body = JSON.stringify(request);
    return this.restService.doPost(ServiceConfig.TA_SEARCHBYID, body, null, true);
  }

  uploadDocuments(): Promise<any> {
    return this.fileTransfer.openDocument(ServiceConfig.TA_FILES);
  }

  openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }

  getHistoryList(request: TruckappointmentdetailsoModel): Observable<any> {
    let body = JSON.stringify(request);
    return this.restService.doPost(ServiceConfig.TA_HISTORY, body, null, true);
  }

  getLocationMaster(locationModel: TaSearchSOModel, showLoader: boolean): Observable<any> {
    let body = JSON.stringify(locationModel);
    return this.restService.doPost(ServiceConfig.TA_LOCATION_MASTER, body, null, showLoader);
  }

  getSpNameMaster(spNameModel: SubLocationMasterReqModel): Observable<any> {
    let body = JSON.stringify(spNameModel);
    return this.restService.doPost(ServiceConfig.TA_SP_NAME_MASTER, body, null, true);
  }

  verifyAgentNo(agentNo: TruckappointmentdetailsoModel): Observable<any> {
    let body = JSON.stringify(agentNo);
    return this.restService.doPost(ServiceConfig.TA_VERIFY_AGENT_NO, body, null, true);
  }

  validDays(validDays: TaSearchSOModel): Observable<any> {
    let body = JSON.stringify(validDays);
    return this.restService.doPost(ServiceConfig.TA_VALID_DAYS_CAL, body, null, false);
  }

  addContainer(addContainerReq: TaAddContainerSO): Observable<any> {
    let body = JSON.stringify(addContainerReq);
    return this.restService.doPost(ServiceConfig.TA_ADD_CONTAINER, body, null, true);
  }

  addQuantity(addQuantityReq: TaAddContainerSO): Observable<any> {
    let body = JSON.stringify(addQuantityReq);
    return this.restService.doPost(ServiceConfig.TA_ADD_QUANTITY, body, null, true);
  }

  timeSlotDetails(timeSlotReq: TaSearchSOModel, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(timeSlotReq);
    return this.restService.doPost(ServiceConfig.TA_TIME_SLOT, body, null, showLoading);
  }

  getContainerCount(getContainerCountReq: TaSearchSOModel,showLoading: boolean): Observable<any> {
    let body = JSON.stringify(getContainerCountReq);
    return this.restService.doPost(ServiceConfig.TA_GET_CONTAINER_COUNT, body, null, showLoading);
  }

  getTruckMasters(getTruckMastersReq: TaTruckRegSOModel ,showLoading: boolean): Observable<any> {
    let body = JSON.stringify(getTruckMastersReq);
    return this.restService.doPost(ServiceConfig.TA_TRUCK_MASTERS, body, null, showLoading);
  }

  getTruckMastersFull(getTruckMastersFullReq: TaTruckRegSOModel): Observable<any> {
    let body = JSON.stringify(getTruckMastersFullReq);
    return this.restService.doPost(ServiceConfig.TA_TRUCK_MASTERS_FULL, body, null, false);
  }

  getDriverMaster(getDriverMasterReq: TaTruckRegSOModel,showLoading: boolean): Observable<any> {
    let body = JSON.stringify(getDriverMasterReq);
    return this.restService.doPost(ServiceConfig.TA_DRIVER_MASTER, body, null, showLoading);
  }

  getDriverMasterSearch(getDriverMasterSearchReq: TaTruckRegSOModel): Observable<any> {
    let body = JSON.stringify(getDriverMasterSearchReq);
    return this.restService.doPost(ServiceConfig.TA_DRIVER_MASTER_SEARCH, body, null, true);
  }

  cancelTA(cancelRequest: TruckappointmentdetailsoModel): Observable<any> {
    let body = JSON.stringify(cancelRequest);
    return this.restService.doPost(ServiceConfig.TA_CANCEL, body, null, true);
  }

  getTransporterCompanyMaster(getTransporterCompanyMasterReq: DeliveryToSearchSOModel): Observable<any> {
    let body = JSON.stringify(getTransporterCompanyMasterReq);
    return this.restService.doPost(ServiceConfig.TA_COMPANY_CODE_TRANS, body, null, false);
  }

  getTransporterTruckSearch(getTransporterTruckSearchReq: TaTruckRegSOModel): Observable<any> {
    let body = JSON.stringify(getTransporterTruckSearchReq);
    return this.restService.doPost(ServiceConfig.TA_TRUCK_SEARCH, body, null, false);
  }

  getTransporterShippingLine(getTransporterShippingLineReq: DeliveryToSearchSOModel): Observable<any> {
    let body = JSON.stringify(getTransporterShippingLineReq);
    return this.restService.doPost(ServiceConfig.TA_SHIPPING_LINE, body, null, false);
  }
  getRotationNumberMaster(getRotationNumberReq: RotationNoSearchReqModel): Observable<any> {
    let body = JSON.stringify(getRotationNumberReq);
    return this.restService.doPost(ServiceConfig.TA_ROTATION_MASTERS, body, null, false);
  }
}
