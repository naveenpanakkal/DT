import {Injectable} from '@angular/core';
import {RestserviceProvider} from '../../providers/restservice/restservice';
import {Observable} from 'rxjs/Observable';

import * as ServiceConfig from '../../shared/serviceconfiguration';
import {FiletransferProvider} from "../filetransfer/filetransfer";

import {ContainerAcceptanceModel} from "../../shared/model/containeracceptance/containeracceptance.model";
import {RotationNoSearchReqModel} from "../../shared/model/containeracceptance/rotationnosearch/rotationnosearchreq.model";
import {PortTerminalMasterModel} from "../../shared/model/containeracceptance/portterminal/portterminalmaster.model";
import {CaNominationsModel} from "../../shared/model/containeracceptance/canominations.model";
import {CaserachrequestModel} from "../../shared/model/containeracceptance/searchresult/caserachrequest.model";
import {ContainerDetailsModel} from "../../shared/model/containeracceptance/containerdetails.model";
import {DocumentMasterModel} from "../../shared/model/containeracceptance/isocode/documentmaster.model";

/*
  Generated class for the ContaineracceptanceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ContaineracceptanceProvider {

  constructor(private restService: RestserviceProvider, private fileTransfer: FiletransferProvider) {

  }

  printCa(args: Map<string, string>) {
    let view_url = ServiceConfig.CA_PRINT;
    Array.from(args.keys(), (key: string, index: number) => {
      view_url = view_url + key + '=';
      if (args.get(key) != null)
        view_url = view_url + args.get(key);
      if (index < (args.size - 1)) {
        view_url = view_url + '&';
      }
    })
    let file_type = "pdf";
    let file_name = "CONTAINER_ACCEPTANCE_" + args.get("containerAcceptanceNoSearch") + "." + file_type;
    this.fileTransfer.viewDocument(view_url, file_type, file_name);
  }

  getLocationMaster(locationModel: ContainerAcceptanceModel, showLoader: boolean): Observable<any> {
    let body = JSON.stringify(locationModel);
    return this.restService.doPost(ServiceConfig.CA_LOCATION_MASTER, body, null, showLoader);
  }

  getSpNameMaster(spNameModel: ContainerAcceptanceModel): Observable<any> {
    let body = JSON.stringify(spNameModel);
    return this.restService.doPost(ServiceConfig.CA_SP_NAME_MASTER, body, null, true);
  }

  getBoxOperatorMaster(boxOperatorModel: ContainerAcceptanceModel): Observable<any> {
    let body = JSON.stringify(boxOperatorModel);
    return this.restService.doPost(ServiceConfig.CA_BOX_OPERATOR_MASTER, body, null, true);
  }

  getRotationNumberMaster(rotationNumberModel: RotationNoSearchReqModel): Observable<any> {
    let body = JSON.stringify(rotationNumberModel);
    return this.restService.doPost(ServiceConfig.CA_ROTATION_NUMBER_MASTER, body, null, false);
  }

  verifyRotationNumber(rotationNumberModel: RotationNoSearchReqModel): Observable<any> {
    let body = JSON.stringify(rotationNumberModel);
    return this.restService.doPost(ServiceConfig.CA_VERIFY_ROTATION_NUMBER, body, null, true);
  }

  // send showLoading - true for verify
  getPortTerminalBerthMaster(portTerminalModel: PortTerminalMasterModel, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(portTerminalModel);
    return this.restService.doPost(ServiceConfig.CA_PORT_TERMINAL_BERTH_MASTER, body, null, showLoading);
  }

  getClientCode(clientCodeModel: CaNominationsModel): Observable<any> {
    let body = JSON.stringify(clientCodeModel);
    return this.restService.doPost(ServiceConfig.CA_CLIENT_CODE, body, null, false);
  }

  verifyBookingNo(bookingNoModel: ContainerAcceptanceModel): Observable<any> {
    let body = JSON.stringify(bookingNoModel);
    return this.restService.doPost(ServiceConfig.CA_VERIFY_BOOKING_NO, body, null, true);
  }

  verifyContainerNo(containerDetailsModel: ContainerDetailsModel): Observable<any> {
    let body = JSON.stringify(containerDetailsModel);
    return this.restService.doPost(ServiceConfig.CA_VERIFY_CONTAINER_NO, body, null, true);
  }

  getISOCode(isoCodeModel: DocumentMasterModel): Observable<any> {
    let body = JSON.stringify(isoCodeModel);
    return this.restService.doPost(ServiceConfig.CA_ISO_CODE, body, null, false);
  }

  saveContainer(saveModel: ContainerAcceptanceModel): Observable<any> {
    let body = JSON.stringify(saveModel);
    return this.restService.doPost(ServiceConfig.CA_SAVE, body, null, true);
  }

  uploadDocuments(): Promise<any> {
    return this.fileTransfer.openDocument(ServiceConfig.CA_UPLOAD_FILE);
  }

  openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }

  getSearchResults(searchRequest: CaserachrequestModel): Observable<any> {
    let body = JSON.stringify(searchRequest);
    return this.restService.doPost(ServiceConfig.CA_SEARCH, body, null, true);
  }

  getSearchbyIdResult(requestwithID: ContainerAcceptanceModel): Observable<any> {
    let body = JSON.stringify(requestwithID);
    return this.restService.doPost(ServiceConfig.CA_SEARCHBYID, body, null, true);
  }

  onEdit(editRequest: ContainerAcceptanceModel): Observable<any> {
    let body = JSON.stringify(editRequest);
    return this.restService.doPost(ServiceConfig.CA_EDITREQUEST, body, null, true);
  }

  CancelCA(requestwithID: ContainerAcceptanceModel): Observable<any> {
    let body = JSON.stringify(requestwithID);
    return this.restService.doPost(ServiceConfig.CA_CANCEL, body, null, true);
  }
  getHistory(containeracceptancemodel: ContainerAcceptanceModel): Observable<any> {
    let body = JSON.stringify(containeracceptancemodel);
    return this.restService.doPost(ServiceConfig.CA_HISTORY, body, null, true);
  }

}
