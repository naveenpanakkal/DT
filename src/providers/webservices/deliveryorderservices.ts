import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import * as ServiceConfig from '../../shared/serviceconfiguration';

import {RestserviceProvider} from '../../providers/restservice/restservice';
import {RotationNumberMasterModel} from "../../shared/model/deliveryorder/rotationnumber/rotationnumberreq.model";
import {HbolMrnreqModel} from "../../shared/model/deliveryorder/hbol-mrn/hbol-mrnreq.model";
import {DeliveryorderreqModel} from "../../shared/model/deliveryorder/deliveryorderreq.model";
import {SearchdeliveryorderreqModel} from "../../shared/model/deliveryorder/searchdeliveryorder/searchdeliveryorderreq.model";
import {RetrievereqModel} from "../../shared/model/deliveryorder/retrievereq.model";
import {ChacodeModel} from "../../shared/model/deliveryorder/chacode/chacode.model";
import {FiletransferProvider} from "../filetransfer/filetransfer";
import {ContainersearchreqModel} from "../../shared/model/deliveryorder/containerdetails/containersearchreq.model";
import {DoappendreqModel} from "../../shared/model/deliveryorder/doappendreq.model";


@Injectable()
export class DeliveryorderservicesProvider {

  constructor(private restService: RestserviceProvider, private fileTransfer: FiletransferProvider) {

  }

  getPortMaster(masterModel: DeliveryorderreqModel, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(masterModel);
    return this.restService.doPost(ServiceConfig.DO_PORT_MASTER, body, null, showLoading);
  }

  getBoxOperatorMaster(masterModel: DeliveryorderreqModel): Observable<any> {
    let body = JSON.stringify(masterModel);
    return this.restService.doPost(ServiceConfig.BOX_OPERATOR_MASTER, body, null, false);
  }

  getTerminalMaster(masterModel: DeliveryorderreqModel): Observable<any> {
    let body = JSON.stringify(masterModel);
    return this.restService.doPost(ServiceConfig.TERMINAL_MASTER, body, null, true);
  }

  getRotationMaster(rotationReq: RotationNumberMasterModel): Observable<any> {
    let body = JSON.stringify(rotationReq);
    return this.restService.doPost(ServiceConfig.ROTATION_MASTER, body, null, false);
  }

  getRotationInfoMaster(rotationReq: RotationNumberMasterModel): Observable<any> {
    let body = JSON.stringify(rotationReq);
    return this.restService.doPost(ServiceConfig.ROTATION_INFO_MASTER, body, null, true);
  }

  getMrnNumberMaster(mrnnumReq: HbolMrnreqModel): Observable<any> {
    let body = JSON.stringify(mrnnumReq);
    return this.restService.doPost(ServiceConfig.MRN_MASTER, body, null, false);
  }

  getHbiolNumberMaster(hbiolnumReq: HbolMrnreqModel): Observable<any> {
    let body = JSON.stringify(hbiolnumReq);
    return this.restService.doPost(ServiceConfig.HBIOL_MASTER, body, null, false);
  }

  getBiolNumberMaster(biolnumReq: HbolMrnreqModel): Observable<any> {
    let body = JSON.stringify(biolnumReq);
    return this.restService.doPost(ServiceConfig.BIOL_MASTER, body, null, false);
  }

  editDO(doRequestModel: DoappendreqModel): Observable<any> {
    let body = JSON.stringify(doRequestModel);
    return this.restService.doPost(ServiceConfig.EDIT_DO, body, null, true);
  }

  onRetrieveValidate(retrieveRequest: RetrievereqModel): Observable<any> {
    let body = JSON.stringify(retrieveRequest);
    return this.restService.doPost(ServiceConfig.DO_RETRIVE_VALIDATE, body, null, false);
  }

  importRetrieve(retrieveRequest: RetrievereqModel): Observable<any> {
    let body = JSON.stringify(retrieveRequest);
    return this.restService.doPost(ServiceConfig.IMPORT_RETRIVE, body, null, false);
  }

  containerRetrieve(retrieveRequest: RetrievereqModel): Observable<any> {
    let body = JSON.stringify(retrieveRequest);
    return this.restService.doPost(ServiceConfig.CONTAINER_RETRIVE, body, null, false);
  }

  getFrieghtForwarderCode(chacodeModel: ChacodeModel): Observable<any> {
    let body = JSON.stringify(chacodeModel);
    return this.restService.doPost(ServiceConfig.FRIEGHT_FORWARDER_CODE, body, null, false);
  }

  getCHACode(chacodeModel: ChacodeModel): Observable<any> {
    let body = JSON.stringify(chacodeModel);
    return this.restService.doPost(ServiceConfig.CHA_CODE, body, null, false);
  }

  getCFSCode(chacodeModel: ChacodeModel): Observable<any> {
    let body = JSON.stringify(chacodeModel);
    return this.restService.doPost(ServiceConfig.CFS_CODE, body, null, false);
  }

  getConsigneeCode(chacodeModel: ChacodeModel): Observable<any> {
    let body = JSON.stringify(chacodeModel);
    return this.restService.doPost(ServiceConfig.CONSIGNEE_CODE, body, null, false);
  }

  getEmptyCode(chacodeModel: ChacodeModel): Observable<any> {
    let body = JSON.stringify(chacodeModel);
    return this.restService.doPost(ServiceConfig.EMPTY_YARD_CODE, body, null, false);
  }

  getHaulierCode(chacodeModel: ChacodeModel): Observable<any> {
    let body = JSON.stringify(chacodeModel);
    return this.restService.doPost(ServiceConfig.HAULIER_CODE, body, null, false);
  }

  getDeliveryOrderResults(searchdeliveryorderreqmodel: SearchdeliveryorderreqModel): Observable<any> {
    let body = JSON.stringify(searchdeliveryorderreqmodel);
    return this.restService.doPost(ServiceConfig.SEARCH_DELIVERY_ORDER, body, null, true);
  }

  getDOdetails(deliveryorderreqmodel: DeliveryorderreqModel): Observable<any> {
    let body = JSON.stringify(deliveryorderreqmodel);
    return this.restService.doPost(ServiceConfig.SEARCH_DO_BY_ID, body, null, true);
  }

  getHistory(deliveryorderreqmodel: DeliveryorderreqModel): Observable<any> {
    let body = JSON.stringify(deliveryorderreqmodel);
    return this.restService.doPost(ServiceConfig.GET_HISTORY, body, null, true);
  }

  CancelDO(deliveryorderreqmodel: DeliveryorderreqModel, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(deliveryorderreqmodel);
    return this.restService.doPost(ServiceConfig.CANCEL_DO, body, null, showLoading);
  }

  verifyHouseBillNo(retrieveRequest: RetrievereqModel): Observable<any> {
    let body = JSON.stringify(retrieveRequest);
    return this.restService.doPost(ServiceConfig.VERIFY_HBNO, body, null, true);
  }

  verifyBillNo(retrieveRequest: RetrievereqModel): Observable<any> {
    let body = JSON.stringify(retrieveRequest);
    return this.restService.doPost(ServiceConfig.VERIFY_BNO, body, null, true);
  }

  verifyValidRotationNo(retrieveRequest: RetrievereqModel): Observable<any> {
    let body = JSON.stringify(retrieveRequest);
    return this.restService.doPost(ServiceConfig.VERIFY_ROTATION_NO, body, null, true);
  }

  verifyValidIGMMRNNo(retrieveRequest: RetrievereqModel): Observable<any> {
    let body = JSON.stringify(retrieveRequest);
    return this.restService.doPost(ServiceConfig.VERIFY_IGMMRN_NO, body, null, true);
  }

  verifyAgentRef(retrieveRequest: RetrievereqModel): Observable<any> {
    let body = JSON.stringify(retrieveRequest);
    return this.restService.doPost(ServiceConfig.VERIFY_AGENT_REF, body, null, true);
  }

  saveDeliveryOrder(deliveryorderreqmodel: DeliveryorderreqModel): Observable<any> {
    let body = JSON.stringify(deliveryorderreqmodel);
    return this.restService.doPost(ServiceConfig.SAVE_DELIVERY_ORDER, body, null, true);
  }

  getContainerDetailsMaster(containersearchreqModel : ContainersearchreqModel): Observable<any>  {
    let body = JSON.stringify(containersearchreqModel);
    return this.restService.doPost(ServiceConfig.CONTAINER_DETAILS_MASTER, body, null, false);
  }

  openDocuments() : Promise<any> {
    return this.fileTransfer.openDocument(ServiceConfig.IDO_UPLOAD_FILE);
  }

  openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }

  //The function for printing the DO
  viewDo(args:Map<string, string>)
  {
    let view_url = ServiceConfig.PRINT_DELIVERY_ORDER;
    Array.from(args.keys(), (key : string, index : number) => {
      view_url = view_url +key+ '=';
      if( args.get(key) != null)
        view_url = view_url +args.get(key);
      if(index <= (args.size - 1)){
        view_url = view_url + '&';
      }
    })
    let file_type = "pdf";
    let file_name = "DELIVERY_ORDER_"+args.get("dORequestNoSearch")+".pdf";
    this.fileTransfer.viewDocument(view_url, file_type,file_name);
  }
}
