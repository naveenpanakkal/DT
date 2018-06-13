export class RBSearchResultRequestModel{
  resReqNoSrch:string;
  cusRefNoSrch:string;
  requestTypeSrch:string;
  spTypeSrch:string;
  spTypeList:string[];
  locationSrch:string;
  locationList:string[];
  spNameSrch:string;
  spNameList:string[];
  terminalConSrch:string;
  terminalConList:string[];
  searchBySrch:string;
  containerNoSrch:string;
  caNoSrch:string;
  doNoSrch:string;
  crNoSrch:string;
  rotationNoSrch:string;
  vesselNameSrch:string;
  terminalSrch:string;
  terminalVessalList:string[];
  resourceBookingStatusSrch:string = "All";
  serviceStatusSrch:string;
  fromDateSrch:string;
  todateSrch:string;
  fromFilter: boolean = false;
}
