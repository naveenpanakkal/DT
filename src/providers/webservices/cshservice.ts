
import {ExecuteactionrequestModel} from "../../shared/model/executeaction/executeactionrequest.model";
import {CSSpeacialContainerRotationRequestModel} from "../../shared/model/csh/cshspeacialcontainerregistredrotation.model";
import {Observable} from "rxjs/Observable";
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {RestserviceProvider} from "../restservice/restservice";
import {CSHRotationMasterReqModel} from "../../shared/model/csh/cshrotationmasterreq.model";
import {CSHSearchReqModel} from "../../shared/model/csh/cshsearchreq.model";
import {CSHSearchByIDReqModel} from "../../shared/model/csh/cshsearchbyidreq.model";
import {CSHContainerDetailsModel} from "../../shared/model/csh/cshcontainerdetails.model";
import {FiletransferProvider} from "../filetransfer/filetransfer";
import {Injectable} from "@angular/core";
import {CSHSearchByIDResultModel} from "../../shared/model/csh/cshsearchbyidresult.model";
import {CshHistoryRequestModal} from "../../shared/model/csh/cshHistoryRequestModal";
import {CSHCreateModel} from "../../shared/model/csh/cshcreate.model";
import {CSHCancelContainerDetails} from "../../shared/model/csh/cancelcontainerdetails.model";

@Injectable()
export class CshServiceProvider {
  constructor(private restService: RestserviceProvider, private fileTransfer: FiletransferProvider) {

  }

  cshSearchAll(cshSearchreqModel: CSHSearchReqModel): Observable<any> {
    let body = JSON.stringify(cshSearchreqModel);
    return this.restService.doPost(ServiceConfig.CSH_SEARCH_ALL, body, null, true);
  }
  getRotationMasterData(cshRotationMasterReqModel: CSHRotationMasterReqModel): Observable<any> {
    let body = JSON.stringify(cshRotationMasterReqModel);
    return this.restService.doPost(ServiceConfig.CSH_ROTATION_MASTER, body, null, false);

  }
   getContainerDetails(cshContainerDetailsModel: CSHContainerDetailsModel): Observable<any> {
    let body = JSON.stringify(cshContainerDetailsModel);
    return this.restService.doPost(ServiceConfig.CSH_CONTAINER_DETAILS, body, null, true);

  }

  getSearchByIdDetails(cshSearchByIDDetailsModel: CSHSearchByIDReqModel,showloading: boolean): Observable<any> {
    let body = JSON.stringify(cshSearchByIDDetailsModel);
    return this.restService.doPost(ServiceConfig.CSH_SEARCH_BY_ID_DETAILS, body, null, showloading);
  }
  getCshDetailsFromHistory(cshSearchByIDDetailsModel: CSHSearchByIDReqModel): Observable<any> {
    let body = JSON.stringify(cshSearchByIDDetailsModel);
    return this.restService.doPost(ServiceConfig.CSH_SEARCH_BY_ID_DETAILS, body, null, true);
  }

  getCshHistory(cshHistoryReqModal: CshHistoryRequestModal): Observable<any> {
    let body = JSON.stringify(cshHistoryReqModal);
    return this.restService.doPost(ServiceConfig.CSH_HISTORY, body, null, true);

  }
  //For comparing amended CSH request
  cshCompare(cshComparisonRequest:CSHSearchByIDResultModel): Observable<any> {
    let body = JSON.stringify(cshComparisonRequest);
    return this.restService.doPost(ServiceConfig.CSH_COMPARISON, body, null, true);
  }

  uploadDocuments(): Promise<any> {
    return this.fileTransfer.openDocument(ServiceConfig.CSH_UPLOAD_FILE);
  }
  openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }
  createCSH(cshCreateModel: CSHCreateModel): Observable<any> {
    let body = JSON.stringify(cshCreateModel);
    return this.restService.doPost(ServiceConfig.CSH_CREATE, body, null, true);
  }

  editCSH(cshModel: CSHSearchByIDResultModel): Observable<any> {
    let body = JSON.stringify(cshModel);
    return this.restService.doPost(ServiceConfig.CSH_EDIT, body, null, true);
  }

  executeCshAction(executeactionrequestModel: ExecuteactionrequestModel): Observable<any> {
    let body = JSON.stringify(executeactionrequestModel);
    return this.restService.doPost(ServiceConfig.CSH_ACTION, body, null, true);
  }

  searchRegisteredRotationNumber(cshsearchResultModel: CSSpeacialContainerRotationRequestModel): Observable<any> {
    let body = JSON.stringify(cshsearchResultModel);
    return this.restService.doPost(ServiceConfig.SPECAIL_CONTAINER, body, null, false);
  }
  cancelContainerDetails(cshCancelContainerDetailsModel: CSHCancelContainerDetails): Observable<any> {
    let body = JSON.stringify(cshCancelContainerDetailsModel);
    return this.restService.doPost(ServiceConfig.CANCEL_CONTAINER_DETAILS, body, null, true);
  }
}
