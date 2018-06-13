export class SssCompariosnResponseModal {
  amended: ShipCompareStructureModal;
  approved: ShipCompareStructureModal;
}

export class ShipCompareStructureModal {

  leaderLineMovesPerCall :number;
  nonFinAdmin :string;
  spName :string;
  location :string;
  clientCode :string;
  shippingLineList :ShippingLineList[];
  approverEditFlag :string;
  leaderLineMovesPerCallPercentage :number;
  shippingLine :string;
  frequencyOfCalls :string;
  approveStatus :boolean;
  finAdmin :string;
  action :string;
  vesselSo :VesselSo[];
  partner :string;
  shippingServiceCode :string;
  expectedTimeOfArrival :string;
  createdDate :string;
  canCancel : boolean;
  startDateService :string;
  scheduleDetailsReqId :number;
  regStatus :string;
  canEditCutoff :string;
  shippingLineClientCode :string;
  shippingServiceScheduleNo :number;
  agentReferenceNo :string;
  createdBy :string;
  cancelRemarks :string;
  endDateService :string;
  canApprove :string;
  wrkflwId :string;
  boxOperatorMaster :BoxOperatorMaster[];
  remarks :string;
  partnerLinesSos :PartnerLinesSos[];
  canEdit :boolean;
  selectDays :string;
  approximateTotalMovesPerCall :number;
  wrkflwStatus :string;
  requestNo :number;
  frequencySo :FrequencySo[];
  spNameList :SpNameList[];
  statusView :string;
  portOfCallSo :PortOfCallSo[];
  approver :any;
  scheduleDetailsAttachSo :string;
  isB2bMessage:string;
  source:string;
  admin:string;
  lastModifiedDate:string;
  amendRequestStatus:string;
  scheduleDetailsId:number;
  shippingServiceName:string;
}

export class ShippingLineList {

}

export class PartnerLinesSos {
  approved :boolean;
  ppartnerLinesMovesPerCall :number;
  lineCodePartner :string;
  endDatePartner :string;
  startDatePartner :string;
  clientCodePartner :string;
  partnerLinesMovesPerCallPercentage :number;
}

export class VesselSo {

  startDateVessel :string;
  vesselName :string;
  imoNo :any;
  expiryDate :string;
  endDateVessel :string;
  vesselMapId :number;
  vesselLOA :string;
  lineCodeVessel :string;
  tonnage :string;
  capacityInTEUS :string;
  serviceType :string;
}

export class PortOfCallSo {

  disableRow :boolean;
  portCallSequence :number;
  portCode :string;
  cutOffTime :string;
  terminalPort :string;
  portName :string;
}

export class FrequencySo {

  frequencyId :string;
  intervalDays :string;
  monthSelectedSo :MonthSelectedSo[];
  intervalperiod :string;
}

export class MonthSelectedSo {
  monthSelectedId :string;
  monthValue :string;
}

export class BoxOperatorMaster{

}
export class SpNameList {

}
