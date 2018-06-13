export class SsrSearchByIdResponseModal {

    specialInstructions :string;
    startDate:string;
    wrkflwId :string;
    spName :string;
    location :string;
    clientCode :string;
    totalChargeAmount :any;
    endDate :string;
    remarks :string;
    specialServiceType :string;
    workFlowName :string;
    wrkflwStatus :string;
    terminal :string;
    perRequestCharge :any;
    crNo :string;
    expCompDate :string;
    approvedStatus :any;
    xmlAction :any;
    createdDate :string;
    requestStatus :string;
    instructionsVessel :string;
    ssrRequestReqNo :number;
    specialServiceTypeName :string;
    pendingStatus :string;
    serviceProvidedOn :string;
    approverButton :string;
    isDeleted :any;
    cusReferenceNo :string;
    appoverEditFlag :any;
    spType :string;
    ssrRequestNo :number;
    locationCode :string;
    doNo :string;
    isB2bMessage :string;
    serviceStatus :string;
    subType :string;
    cancelRemarks :string;
    caNo :string;
    lastModifiedDate :string;
    latestStatus :string;
    taxPercent :any;
    amendRequestStatus :string;
    serviceCategory :string;
    expectedComplnDate :string;
    serviceMasterCode :string;
    containerSsrDetailsSO :ContainerSsrDetailsSO[];
    vesselSsrDetailsSO :VesselSsrDetailsSO[] ;
    sSRAttachSO : SsrAttachSO[];
}
export class SsrAttachSO {
  resLocCategoryId: number;
}

export class VesselSsrDetailsSO  {

   eta :string;
   vesselName:string;
   specialServiceVesselDetailId: number;
   operationStatus :string;
   hours :any;
   etd :string;
   planedCost :any;
   actualCost :any;
   rotationNo :string;
   vesselPerItemCharges :VesselPerItemCharges[];
   hoursActual :any;
   quantity :any;
   quantityActual :any;
}

export class VesselPerItemCharges  {
  vesselItemChargeId: number;
  chargeType: string;
  amount: number;
}
export class ContainerSsrDetailsSO  {

   containerNo :string;
   containerPerItemCharges :ContainerPerItemCharges[] ;
   tradeType:string;
   hoursActualContainer :any;
   planedCost :any;
   hoursContainer :number;
   designation :string;
   quantityActualContainer :any;
   isoType:string;
   actualCost :any;
   quantityContainer :any;
}
export class ContainerPerItemCharges  {
  chargeName: string;
  amount: number;
}
