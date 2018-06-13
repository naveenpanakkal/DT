export class TruckSearchRespModel {
  agentReferenceNoResult: string;
  appoinmentNo: number;
  appointmentDateSlot: string;
  containerNumberSearch: string;
  docType: string;
  driverName: string;
  iSOCode: string;
  moveTypeSearch: string;
  referenceNo: string;
  status: string;
  truckNo: string;
  validity: string;
}

export class TruckSearchRespListModel {
  list: TruckSearchRespModel[];
}
