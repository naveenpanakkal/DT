export class ValidateContainerModal {
  wrkflwId: string;
  amendRequestStatus: string;
  approver: string;
  requestId: string;
  rsbId: string;
  rsbReqId: string;
  createdDate: string;
  lastModifiedDate: string;
  requestType: string;
  cusReferenceNo: string;
  requestNo: string;
  cancelRemarks: string;
  serviceStatus: string;
  serviceProvidedOn: string;
  remarksSP: string;
  requestDateTime: string;
  rotationNo: string;
  vesselName: string;
  vesselStatus: string;
  locationVessel: string;
  terminal: string;
  terminalOperator: string;
  prefBerth: string;
  eta: string;
  cutOffTime: string;
  remarksVessel: string;
  serviceProviderType: string;
  locationContainer: string;
  spName: string;
  terminalContainer: string;
  tradeTypeContainer: string;
  searchByContainer: string;
  caNo: string;
  doNo: string;
  crNo: string;
  remarksContainer: string;
  resourceType: string;
  category: string;
  unitOfMeasure: string;
  quantity: string;
  duration: string;
  rsbContainers: RsbContainers[];
  rsbResources: RsbResources[];
  resBookingAttachments: ResBookingAttachments[];
  totalCharges: string;
  perRequestCharges: string;
  tax: number;
}

export class RsbContainers {
  containerNo: string;
  isoType: string;
  designation: string;
  tradeType: string;
}

export class RsbResources {
  resourceType: string;
  category: string;
  unitOfMeasure: string;
  quantity: string;
  duration: string;
  baseCharge: number;
  additionalCharges: number;
  otherCharges: number;
  sumCharges: string;
}

export class ResBookingAttachments {
  docType: string;
  docNum: string;
  docIssueDate: string;
  docExpDate: string;
  fileName: string;
  fileUploadId: number;
}
