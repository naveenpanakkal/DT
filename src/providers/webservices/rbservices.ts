import {ExecuteactionrequestModel} from "../../shared/model/executeaction/executeactionrequest.model";
import {Observable} from "rxjs/Observable";
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {RestserviceProvider} from "../restservice/restservice";
import {FiletransferProvider} from "../filetransfer/filetransfer";
import {Injectable} from "@angular/core";
import{RBSearchByIDReqModel} from "../../shared/model/rb/rbsearchbyidreq.model";
import{RBSearchResultRequestModel} from "../../shared/model/rb/rbsearchresultrequest.model";
import {ServiceProviderReqModel}from "../../shared/model/rb/rbServiceProviderReq.modal";
import {SearchByTerminal}from "../../shared/model/rb/rbSearchByTerminalReq.modal";
import {RBLoadTerminalReqModal}from "../../shared/model/rb/rbloadTerminalReq.modal";
import {SearchByRotationReqModal}from "../../shared/model/rb/rbSearchByRotationReq.modal";
import {ResourceMasterReqModal}from "../../shared/model/rb/rbResourceMasterReq.modal";
import {ValidateContainerModal} from "../../shared/model/rb/rbValidateContainer.modal";
import {RotationMaster} from "../../shared/model/rb/rbRotationMaster";
import { RBHistoryRequestModal } from "../../shared/model/rb/rbhistoryrequest.modal";
import {CADOMasterReq } from "../../shared/model/rb/rbCADOMasterReq.modal";
import {ContainerDetailsReqModal} from "../../shared/model/rb/rbContainerDetailsReq.modal";
import {SaveUpdateReqModal} from "../../shared/model/rb/rbSaveUpdateReq.modal";
import {RBCancelRequestModal} from "../../shared/model/rb/rbcancelrequest.modal";
import {ReleaseContainerSearchSO} from "../../shared/model/hnrc/releasecontainersearch.model";
@Injectable()
export class RBServiceProvider {
  constructor(private restService: RestserviceProvider, private fileTransfer: FiletransferProvider) {

  }

  rbSearchAll(rbSearchreqModel: RBSearchResultRequestModel): Observable<any> {
    let body = JSON.stringify(rbSearchreqModel);
    return this.restService.doPost(ServiceConfig.RB_SEARCHRESULT, body, null, true);
  }
  getSearchById(rbSearchByIDDetailsModel: RBSearchByIDReqModel): Observable<any> {
    let body = JSON.stringify(rbSearchByIDDetailsModel);
    return this.restService.doPost(ServiceConfig.RB_SEARCHBYID, body, null, true);
  }
  uploadDocuments(): Promise<any> {
    return this.fileTransfer.openDocument(ServiceConfig.RB_UPLOAD_FILE);
  }
  openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }
  getServiceProvider(rbServiceProviderReqModel: ServiceProviderReqModel, showloading: boolean): Observable<any> {
    let body = JSON.stringify(rbServiceProviderReqModel);
    return this.restService.doPost(ServiceConfig.RB_SERVICE_PROVIDER, body, null, showloading);
  }
  searchTerminal(rbSearchByTerminal: SearchByTerminal,showloading: boolean): Observable<any> {
    let body = JSON.stringify(rbSearchByTerminal);
    return this.restService.doPost(ServiceConfig.RB_SEARCH_TERMINAL, body, null, showloading);
  }
  loadTerminal(rbSearchByTerminal: RBLoadTerminalReqModal): Observable<any> {
    let body = JSON.stringify(rbSearchByTerminal);
    return this.restService.doPost(ServiceConfig.RB_LOAD_TERMINAL, body, null, true);
  }
  searchTerminalByRotation(rbSearchByRotation: SearchByRotationReqModal): Observable<any> {
    let body = JSON.stringify(rbSearchByRotation);
    return this.restService.doPost(ServiceConfig.RB_SEARCH_BY_ROTATION_NUMBER, body, null, false);
  }
  getResources(rbResourceMasterReqModal: ResourceMasterReqModal): Observable<any> {
    let body = JSON.stringify(rbResourceMasterReqModal);
    return this.restService.doPost(ServiceConfig.RB_RESOURCE_MASTER, body, null, true);
  }

  validateContainerResources(saveUpdateReqModal: SaveUpdateReqModal): Observable<any> {
    let body = JSON.stringify(saveUpdateReqModal);
    return this.restService.doPost(ServiceConfig.RB_VALIDATECONTAINERS, body, null, false);
  }
  rbSaveResourceBooking(saveUpdateReqModal: SaveUpdateReqModal): Observable<any> {
    let body = JSON.stringify(saveUpdateReqModal);
    return this.restService.doPost(ServiceConfig.RB_SAVE_RESOURCE_BOOKING, body, null, true);
  }

  rbUpdateResourceBooking(saveUpdateReqModal: SaveUpdateReqModal): Observable<any> {
    let body = JSON.stringify(saveUpdateReqModal);
    return this.restService.doPost(ServiceConfig.RB_UPDATERB, body, null, true);
  }

  rbRotationMaster(searchByRotationReqModal: RotationMaster): Observable<any> {
    let body = JSON.stringify(searchByRotationReqModal);
    return this.restService.doPost(ServiceConfig.RB_ROTATION_MASTER, body, null, true);
  }
  getRBHistory(rbHistoryReqModal: RBHistoryRequestModal): Observable<any> {
    let body = JSON.stringify(rbHistoryReqModal);
    return this.restService.doPost(ServiceConfig.RB_HISTORY, body, null, true);

  }
   rbCAMaster(cadoMasterReqmodal: CADOMasterReq): Observable<any> {
    let body = JSON.stringify(cadoMasterReqmodal);
    return this.restService.doPost(ServiceConfig.RB_CA_MASTER, body, null, false);
  }
   rbDOMaster(cadoMasterReqmodal: CADOMasterReq): Observable<any> {
    let body = JSON.stringify(cadoMasterReqmodal);
    return this.restService.doPost(ServiceConfig.RB_DO_MASTER, body, null, false);
  }
   getContainerDetails(containerDetailsReqModal: ContainerDetailsReqModal): Observable<any> {
    let body = JSON.stringify(containerDetailsReqModal);
    return this.restService.doPost(ServiceConfig.RB_CONTAINER_DETAILS, body, null, true);

  }
   getExportContainerDetails(containerDetailsReqModal: ContainerDetailsReqModal): Observable<any> {
    let body = JSON.stringify(containerDetailsReqModal);
    return this.restService.doPost(ServiceConfig.RB_EXPORT_CONTAINER_DETAILS, body, null, true);

  }
   getTSContainerDetails(containerDetailsReqModal: ContainerDetailsReqModal): Observable<any> {
    let body = JSON.stringify(containerDetailsReqModal);
    return this.restService.doPost(ServiceConfig.RB_TS_CONTAINER_DETAILS, body, null, true);

  }
  executeRBAction(executeactionrequestModel: ExecuteactionrequestModel): Observable<any> {
    let body = JSON.stringify(executeactionrequestModel);
    return this.restService.doPost(ServiceConfig.RB_ACTION, body, null, true);
  }
  getSearchByReqId(rbSearchByIDDetailsModel: RBSearchByIDReqModel): Observable<any> {
    let body = JSON.stringify(rbSearchByIDDetailsModel);
    return this.restService.doPost(ServiceConfig.RB_SEARCHBYREQID, body, null, true);
  }
  rbContainerMaster(containerDetailsReqModal: ContainerDetailsReqModal): Observable<any> {
    let body = JSON.stringify(containerDetailsReqModal);
    return this.restService.doPost(ServiceConfig.RB_CONTAINER_MASTER, body, null, true);
  }
  cancelContainerDetails(rbCancelContainerDetailsModel: RBCancelRequestModal): Observable<any> {
    let body = JSON.stringify(rbCancelContainerDetailsModel);
    return this.restService.doPost(ServiceConfig.RB_CANCEL, body, null, true);
  }
}
