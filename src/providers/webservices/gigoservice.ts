import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {RestserviceProvider} from "../restservice/restservice";

import * as ServiceConfig from '../../shared/serviceconfiguration';
import {FiletransferProvider} from "../filetransfer/filetransfer";
import {GigoSearchSOModel} from "../../shared/model/GIGO/gigosearch.model";
import {GigoDetailsSO} from "../../shared/model/GIGO/gigodetails.model";
import {GigoSearchResultSORequest} from "../../shared/model/GIGO/gigosearchresultsorequest.model";
import {GigoSearchByIdRequestModel} from "../../shared/model/GIGO/gigosearchrequest.model";

@Injectable()
export class GiGoServiceProvider {
  constructor(private restService: RestserviceProvider, private fileTransfer: FiletransferProvider) {

  }

  gigoSearchAll(gigoSearchReqModel: GigoSearchSOModel, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(gigoSearchReqModel);
    return this.restService.doPost(ServiceConfig.GIGO_SEARCH_ALL, body, null, showLoading);
  }

  gigoLocationMaster(locationRequest:GigoDetailsSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(locationRequest);
    return this.restService.doPost(ServiceConfig.GIGO_LOCATION_MASTER, body, null, showLoading);
  }

  gigoSPNameMaster(spNameRequest:GigoDetailsSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(spNameRequest);
    return this.restService.doPost(ServiceConfig.GIGO_SP_NAME_MASTER, body, null, showLoading);
  }

  gigoSearchById(searchRequest:GigoSearchByIdRequestModel,  showLoading: boolean): Observable<any> {
    let body = JSON.stringify(searchRequest);
    return this.restService.doPost(ServiceConfig.GIGO_SEARCH_BY_ID, body, null, showLoading);
  }

  gigoHistory(historyRequest:GigoSearchResultSORequest, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(historyRequest);
    return this.restService.doPost(ServiceConfig.GIGO_GET_HISTORY, body, null, showLoading);
  }

  gigoSaveModify(modifyRequest:GigoDetailsSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(modifyRequest);
    return this.restService.doPost(ServiceConfig.GIGO_SAVE_MODIFY, body, null, showLoading);
  }

  gigoDeleteById(deleteRequest:GigoSearchByIdRequestModel, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(deleteRequest);
    return this.restService.doPost(ServiceConfig.GIGO_DELETE_BY_ID, body, null, showLoading);
  }

  gigoVerifyRefNo(verifyRequest:GigoDetailsSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(verifyRequest);
    return this.restService.doPost(ServiceConfig.GIGO_VERIFY_REFNO, body, null, showLoading);
  }


  gigoMovementLog(movementRequest:GigoSearchSOModel, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(movementRequest);
    return this.restService.doPost(ServiceConfig.GIGO_MOVEMENT_LOG, body, null, showLoading);
  }

  gigoSaveReg(regRequest:GigoDetailsSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(regRequest);
    return this.restService.doPost(ServiceConfig.GIGO_SAVE_REG, body, null, showLoading);
  }

  uploadDocuments(): Promise<any> {
    return this.fileTransfer.openDocument(ServiceConfig.GIGO_UPLOAD_FILES);
  }

  openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }
  gigoSendMail(emailRequest: GigoDetailsSO) {
    let body = JSON.stringify(emailRequest);
    return this.restService.doPost(ServiceConfig.GIGO_SEND_MAIL, body, null, true);
  }
  printGigo(args: Map<string, string>) {
    let view_url = ServiceConfig.GIGO_DOWNLOAD_DOCUMENT;
    Array.from(args.keys(), (key: string, index: number) => {
      view_url = view_url + key + '=';
      if (args.get(key) != null)
        view_url = view_url + args.get(key);
      if (index < (args.size - 1)) {
        view_url = view_url + '&';
      }
    })
    let file_type = args.get("exportType");
    if(file_type == 'excel') {
      file_type = 'csv';
    }
    let file_name = "gateingateout" + "." + file_type;
    this.fileTransfer.viewDocument(view_url, file_type, file_name);
  }
}
