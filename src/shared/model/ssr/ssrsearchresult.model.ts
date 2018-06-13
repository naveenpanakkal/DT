export class SSRSearchList {
  list: SSRSearchResult[];
}

export class SSRSearchResult {
amendRequestStatus:boolean;
appoverEditFlag:boolean;
approvedStatus:boolean;
approverButton:boolean;
caNo:string;
cancelRemarks:string;
clientCode:string;
containerSsrDetailsSO:ContainerSsrDetailsSOModel[];
crNo:string;
createdDate:string;
cusReferenceNo:string;
doNo:string;
endDate:string;
expCompDate:string;
expectedComplnDate:string;
instructionsVessel:string;
isB2bMessage:string;
isDeleted:string;
lastModifiedDate:string;
latestStatus:string;
location:string;
locationCode:string;
pendingStatus:boolean;
perRequestCharge:string;
remarks:string;
requestStatus:string;
sSRAttachSO:SSRAttachSOModel[];
serviceCategory:string;
serviceMasterCode:string;
serviceProvidedOn:string;
serviceStatus:string;
spName:string;
spType:string;
specialInstructions:string;
specialServiceType:string;
specialServiceTypeName:string;
ssrRequestNo:number;
ssrRequestReqNo:number;
startDate:string;
subType:string;
taxPercent:string;
terminal:string;
totalChargeAmount:string;
vesselSsrDetailsSO:VesselSsrDetailsSOModel[];
workFlowName:string;
wrkflwId:string;
wrkflwStatus:string;
xmlAction:string;
}

export class ContainerSsrDetailsSOModel{
  actualCost:string;
  containerNo:string;
  containerPerItemCharges:ContainerPerItemChargeModel[];
  designation:string;
  hoursActualContainer:string;
  hoursContainer:string;
  isoType:string;
  planedCost:string;
  quantityActualContainer:string;
  quantityContainer:string;
  tradeType:string;
}

export class ContainerPerItemChargeModel{
  amount:number;
  chargeName:string;
}
export class SSRAttachSOModel{

}
export class VesselSsrDetailsSOModel{

}