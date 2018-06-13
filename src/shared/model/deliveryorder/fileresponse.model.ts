export class FileresponseModel {

  moduleId: string;
  moduleName: string;
  serverFilePath: string;
  description: string;
  status: string;
  fileData: string;
  showdetails:boolean=false;

  /*common for upload and download*/
  fileName: string;
  fileUploadId: number;

  /*searchById response*/
  doOrderAttachId: string;
  docType: string;
  docNum: string;
  docIssueDate: string;
  docExpDate: string;

}
