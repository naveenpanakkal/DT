import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {RestserviceProvider} from "../restservice/restservice";
import {VldsSearchReqModel} from "../../shared/model/VLDS/vldssearchallreq.model";
import {VldsMailModel} from "../../shared/model/VLDS/vldsmail.model";
import {VldsdefinedvalueslistModal} from "../../shared/model/VLDS/vldsdefinedvalueslist.modal";
import {VldsdefinedlistresultModal} from "../../shared/model/VLDS/vldsdefinedlistresult.modal";
import {VldsDefinedListModal} from "../../shared/model/VLDS/vldsdefinedlist.modal";

import * as ServiceConfig from '../../shared/serviceconfiguration';
import {FiletransferProvider} from "../filetransfer/filetransfer";
@Injectable()
export class VldsServiceProvider {
 constructor(private restService: RestserviceProvider,private fileTransfer: FiletransferProvider) {

 }

 vldsSearchAll(vldsSearchreqModel : VldsSearchReqModel ) : Observable<any> {
   let body = JSON.stringify(vldsSearchreqModel);
   return this.restService.doPost(ServiceConfig.VLDS_SEARCH_ALL,body,null,true);

 }
  vldsSearchByID(vldsSearchreqModel : VldsSearchReqModel ) : Observable<any> {
   let body = JSON.stringify(vldsSearchreqModel);
   return this.restService.doPost(ServiceConfig.VLDS_SEARCH_BY_ID,body,null,true);

 }
  vldsSendMail(vldsMailModel : VldsMailModel ) : Observable<any> {
   let body = JSON.stringify(vldsMailModel);
   return this.restService.doPost(ServiceConfig.VLDS_SEND_MAIL,body,null,true);

 }

  vldsDefinedListl(vldsDefinedList : VldsDefinedListModal ) : Observable<any> {
    let body = JSON.stringify(vldsDefinedList);
    return this.restService.doPost(ServiceConfig.VLDS_DEFINED_VALUES,body,null,false);

  }

  //The function for printing the DO
  vldsDownload(args:Map<string, string>,type: string)
  {
    let view_url = ServiceConfig.VLDS_DOWNLOAD_DOCUMENT;
    let downloadType = "pdf";
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
    let file_type = downloadType;
    let file_name = "vesselloaddischargesummary"+args.get("rotationNoSrch")+"."+downloadType;
    this.fileTransfer.viewDocument(view_url, file_type,file_name);
  }
}
