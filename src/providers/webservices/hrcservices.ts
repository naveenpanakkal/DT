import {Injectable} from "@angular/core";
import * as ServiceConfig from '../../shared/serviceconfiguration';
import {RestserviceProvider} from "../restservice/restservice";
import {FiletransferProvider} from "../filetransfer/filetransfer";
import {Observable} from "rxjs/Observable";
import {HoldContainerSO, IsoCodeSO} from "../../shared/model/hnrc/holdcontainerso.model";
import {HRCAppParamSO} from "../../shared/model/hnrc/hrcappparamso.model";
import {HoldContainerSearchSORequest} from "../../shared/model/hnrc/holdcontainersearchsorequest.model";
import {ContainerDetailSORequest} from "../../shared/model/hnrc/containerdetailsorequest.model";
import {ReleaseContainerSearchSO} from "../../shared/model/hnrc/releasecontainersearch.model";
import {
  ContainerDetailSO, ContainerHoldDetailsSO,
  ReleaseContainerReqListSO
} from "../../shared/model/hnrc/releasecontainersrch.model";
import {UserDataModel} from "../../shared/model/userdata.model";
import {RotationNoSearchReqModel} from "../../shared/model/ta/rotationnosearch/rotationnosearchreq.model";


@Injectable()
export class HrcservicesProvider {
  constructor(private restService: RestserviceProvider, private fileTransfer: FiletransferProvider) {

  }
  getLocationMaster(locationrequest: UserDataModel, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(locationrequest);
    return this.restService.doPost(ServiceConfig.HRC_LOCATION_MASTER, body, null, showLoading);
  }

  getConfiguredHrs(configurehrsrequest: HRCAppParamSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(configurehrsrequest);
    return this.restService.doPost(ServiceConfig.HRC_CONFIGRD_HRS, body, null, showLoading);
  }

  getSearch(searchrequest: HoldContainerSearchSORequest, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(searchrequest);
    return this.restService.doPost(ServiceConfig.HRC_SEARCH, body, null, showLoading);
  }

  getSearchByID(searchbyidrequest: HoldContainerSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(searchbyidrequest);
    return this.restService.doPost(ServiceConfig.HRC_SEARCH_BY_ID, body, null, showLoading);
  }

  getSpNameMaster(spnamerequest: HoldContainerSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(spnamerequest);
    return this.restService.doPost(ServiceConfig.HRC_SP_NAME_MASTER, body, null, showLoading);
  }

  getLineMaster(linemasterrequest: HoldContainerSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(linemasterrequest);
    return this.restService.doPost(ServiceConfig.HRC_LINE_MASTER, body, null, showLoading);
  }

  getHistory(historyrequest: HoldContainerSO): Observable<any> {
    let body = JSON.stringify(historyrequest);
    return this.restService.doPost(ServiceConfig.HRC_HISTORY, body, null, true);
  }

  getSearchHoldRelease(showLoading: boolean): Observable<any> {
    let body;
    return this.restService.doPost(ServiceConfig.HRC_SEARCHHOLDRELEASE_DTLS, body, null, showLoading);
  }

  verifyReferenceNo(referencenorequest: HoldContainerSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(referencenorequest);
    return this.restService.doPost(ServiceConfig.HRC_REF_NO, body, null, showLoading);
  }

  searchContainer(searchcontainerrequest: ContainerDetailSO, showLoading: boolean): Observable<any> {
    let body = JSON.stringify(searchcontainerrequest);
    return this.restService.doPost(ServiceConfig.HRC_SEARCH_CONTAINER, body, null, showLoading);
  }

  saveHoldDetails(holddetailsrequest: HoldContainerSO): Observable<any> {
    let body = JSON.stringify(holddetailsrequest);
    return this.restService.doPost(ServiceConfig.HRC_SAVE_HOLDDETAILS, body, null, true);
  }

  modifyHoldDetails(holddetailsrequest: HoldContainerSO): Observable<any> {
    let body = JSON.stringify(holddetailsrequest);
    return this.restService.doPost(ServiceConfig.HRC_SAVE_MODIFIED, body, null, true);
  }

  deleteByID(referencenorequest: HoldContainerSO): Observable<any> {
    let body = JSON.stringify(referencenorequest);
    return this.restService.doPost(ServiceConfig.HRC_DELETE_BY, body, null, true);
  }

  getReleaseContainer(releaseRequest: HoldContainerSO): Observable<any> {
    let body = JSON.stringify(releaseRequest);
    return this.restService.doPost(ServiceConfig.RELEASE_LOCATION_MASTER, body, null, true);
  }

  searchHoldRelease(releaseContainerRequest: ReleaseContainerSearchSO): Observable<any> {
    let body = JSON.stringify(releaseContainerRequest);
    return this.restService.doPost(ServiceConfig.SEARCH_HOLD_RELEASE, body, null, true);
  }

  hnrcSearchAll(rbSearchreqModel: ReleaseContainerSearchSO): Observable<any> {
    let body = JSON.stringify(rbSearchreqModel);
    return this.restService.doPost(ServiceConfig.HRC_SEARCHHOLDRELEASE_DTLS_2, body, null, true);
  }
  hnrcSaveReleaseDetails(hnrcContainerHoldDetailsModel: ReleaseContainerReqListSO): Observable<any> {
    let body = JSON.stringify(hnrcContainerHoldDetailsModel);
    return this.restService.doPost(ServiceConfig.SAVE_RELEASE_DETAILS, body, null, true);
  }



  hrcIsoCode(isoCodeSOModel: IsoCodeSO): Observable<any> {
    let body = JSON.stringify(isoCodeSOModel);
    return this.restService.doPost(ServiceConfig.HRC_ISO_CODE,body, null, true);
  }

  uploadDocuments(): Promise<any> {
    return this.fileTransfer.openDocument(ServiceConfig.HNRC_FILES);
  }

  //The function for printing the DO
  hnrcDownload(args:Map<string, string>,type: string)
  {
    let view_url = ServiceConfig.HNRC_DOWNLOAD_DOCUMENT;
    let downloadType = "pdf";
    let file_name='';
    if(null != type && "" != type) {
      if(type == "pdf") {
        downloadType = "pdf";

      } else {
        downloadType = "csv";
      }
    }
    Array.from(args.keys(), (key : string, index : number) => {
      view_url = view_url +key+ '=';
      if( args.get(key) != null)
        view_url = view_url +args.get(key);
      if(index <= (args.size - 1)){
        view_url = view_url + '&';
      }
    })
    if(null != type && "" != type) {
      if(type == "pdf") {
        file_name =  "Release Details"+"."+downloadType;
      } else {
        file_name =  "Release details"+"."+downloadType;
      }
    }
    let file_type = downloadType;
    console.log(view_url);
    this.fileTransfer.viewDocument(view_url, file_type,file_name);
  }
  openAttachment(attachment: any) {
    this.fileTransfer.openAttachment(attachment);
  }

  getRotationNumberMaster(getRotationNumberReq: RotationNoSearchReqModel): Observable<any> {
    let body = JSON.stringify(getRotationNumberReq);
    return this.restService.doPost(ServiceConfig.TA_ROTATION_MASTERS, body, null, false);
  }
}
