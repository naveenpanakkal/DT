export class ServiceProviderResponseModel{

  clientRegistrationId:number;
  clientName: string;
  clientEmailId:string;
  clientOfficeNumber:number;
  clientAddressLine1:string;
  clientAddressLine2:string;
  clientCountry:string;
  clientState:string;
  clientCity:string;
  clientPostCode:number;
  adminTitle: string;
  adminName: string;
  userName: string;
  adminEmailId: string;
  confirmEmailId: string;
  distributionEmailId: string;
  adminMobileNo:number;
  groupClient: string;
  subUserLimit: string;
  status: string;
  requestId:string;
  fromDate:any;
  toDate: any;
  terminal: any;
  wrkflwStatus: string;
  isDeleted: string;
  createdDate: string;
  clientCode: string;
  requestNo: string;
  clientRegRequestId: number;
  wrkflwId: string;
  clientRegistrationStatus: string;
  clientOnHoldStatus: string;
  clientRejectionStatus: string;
  clientDeletionStatus: string;
  lastModifiedDate: string;
  activationId: string;
  userId: string;
  approverButton:boolean;
  pendingStatus: boolean;
  isB2bMessage: string;
  captchaResponse: string;
  isEdi:any;
  channel:any;
  reference:any;
  clientRegSpLocationSO : ClientRegSpLocationSO[];
  clientRegAttachs : ClientRegAttachs[];
  clientRegSpPoolSO : ClientRegSpPoolSO[];
  clientRegGroupClientSO : ClientRegGroupClientSO[];
}

export class ClientRegSpLocationSO {

  clientRegSpLocationId:number;
  serviceProviderCode: string;
  serviceProviderName: string;
  spLocationCode: string;
  spSubLocationCode: string;
  clientTypeCode: string;
  clientCode: any;
  spSubLocationName: string;
  spLocationName: string;
  clientRegSpCodeTypeSO : ClientRegSpCodeTypeSOModal[];

}

export class ClientRegSpCodeTypeSOModal {

  clientRegSpCodeTypeId:number;
  codeIssuer: string;
  codeType: string;
  codeTypeCode: string;
  code: string;
  clientName: string;
  clientCode: string;
  codeName: string;
}
export class ClientRegSpPoolSO{

}

export class ClientRegGroupClientSO {

}

export class ClientRegAttachs {

  clientRegAttachId:number;
  fileUploadId:number;
  documentType:string;
  documentNo:string;
  issueDate:string;
  expiryDate:string;
  fileName:string;
}



