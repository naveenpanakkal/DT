import {GigoDetailsSO} from "./gigodetails.model";

export class GigoListSO {
  list: GigoSearchResultSO[];
  list1: GigoDetailsSO[];
}

export class GigoSearchResultSO {
  chassisNo: string;
  moveType: string;
  eirNo: string;
  selectDays: string;
  containerNo: string;
  gigoNo: string;
  location: string;
  referenceNoSummary: string;
  requestNo: string;
  status: string;
  truckNumber: string;
  startDateTime: string;
  longPressFired:string;
  timer:any;
}
