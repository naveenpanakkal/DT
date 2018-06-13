export class RBSearchByIDResultModel{
  rsbId:number;
  rsbReqId:number;
  requestType:string;
  cusReferenceNo:string;
  requestNo:string;
  requestStatus:string;
  cancelRemarks:string;
  serviceStatus:string;
  serviceProvidedOn:string;
  remarksSP:string;
  requestDateTime:string;
  rotationNo:string;
  vesselName:string;
  vesselStatus:string;
  locationVessel:string;
  terminal:string;
  terminalOperator:string;
  prefBerth:string;
  eta:string;
  cutOffTime:string;
  remarksVessel:string;
  tradeTypeContainer:string;
  serviceProviderType:string;
  locationContainer:string;
  spName:string;
  terminalContainer:string;
  searchByContainer:string;
  caNo:string;
  doNo:string;
  crNo:string;
  remarksContainer:string;
  tax:number;
  perRequestCharges:number;
  totalCharges:string;
  rsbContainers:RBContainerDetailsModel[];
  rsbResources:RBResourceDetailsModel[];
  resBookingAttachments:RBAttachmentDetailsModel[];
  terminalData:RBTerminalDetailsModel;
  resourceMasterData:RBResourceMasterListModel;
  approveStatus:boolean= false;
  approver:string;
  wrkflwStatus:string;
  resourceBookingStatus:string;
  wrkflwId:string;
  clientCode:string;
  amendRequestStatus:string;
  approverEditFlag:string;
  userEditFlag:string;
  createdDate:string;
  lastModifiedDate:string;
  createdBy:string;
  isB2bMessage:string;
}

export class RBContainerDetailsModel{
  rsbContainerId:number;
  containerNo: string;
  isoType: string;
  designation: string;
  tradeType: string;
}

export class RBResourceDetailsModel{
  resourceType:string;
  category:string;
  unitOfMeasure:string;
  quantity:number;
  duration:number;
  actualQuantity:number;
  actualDuration:number;
  sumCharges:string;
  baseCharge:number;
  additionalCharges:number;
  otherCharges:number;
}

export class RBAttachmentDetailsModel{
  docType:string;
  docNum:string;
  docIssueDate:string;
  docExpDate:string;
  fileUploadId:string;
  fileName:string;
  resBooking:string;
}

export class RBTerminalDetailsModel{
  rotationNumber:number;
  vesselName:string;
  vesselType:string;
  vesselStatus:string;
  terminalOperator:string;
  prefBerth:string;
  eta:string;
  rotationNo:number;
  locationVessel:string;
  locationContainer:string;
  remarksVessel:string;
  cutOffTime:string;
  terminals:string[];
  terminalNames:string[];
  terminalDependents: RBTerminalDependentsModel[];
}

export class RBTerminalDependentsModel{
  terminal: RBTerminalOperatorsModel[];
}

export class RBTerminalOperatorsModel{
  terminalOperator:string;
  prefBerth:string;
}
export class RBResourceMasterListModel{
  resLocationId:number;
  spType:string;
  location:string;
  spName:string;
  terminal:string;
  requestTypeCode:string;
  requestTypeName:string;
  perRequestCharge:number;
  taxPercentage:string;
  resourceTypeList:string[];
  resourceCategoryChargesMap:RBResourceCategoryChargesMapModel[];
}

export class RBResourceCategoryChargesMapModel{
  Miscellaneous:RBChargesListModal[];
  EquipmentHireCharges:RBChargesListModal[];
  LabourHireCharges:RBChargesListModal[];
  VESSELUAT:RBChargesListModal[];
}

export class RBChargesListModal{
  resLocCategoryId:number;
  resourceType:string;
  category:string;
  unitOfMeasure:string;
  qtyApplicable:string;
  durationApplicable:string;
  baseCharge:number;
  additionalCharges:number;
  otherCharges:number;
  quantity: number;
  duration: number;
}
