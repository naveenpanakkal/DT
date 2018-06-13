import {ShipServSchedPartnerLinesSOModel} from "./ssspartnerlinesSO.model";
import {ShipServSchedVesselSOModel} from "./sssVesselSO.model";
import {ShipServSchedPortOfCallSOModel} from "./sssportofcallSO.model";
import {ShipServSchedDetailsAttachSOModel} from "./sssscheduledetailsattachSO.model";
import {ShipServSchedFrequencySOModel} from "./sssfrequencySO.model";

export class ShipServSchedSearchDetailResultModel{
  location:string;
  spName:string;
  spNameList:string[];
  clientCode:any;
  statusView:string;
  cancelRemarks:string;
  shippingServiceScheduleNo:number;
  agentReferenceNo:number;
  shippingLine:string;
  shippingLineList:string[];
  shippingServiceCode:string;
  shippingServiceName:string;
  approximateTotalMovesPerCall:number;
  leaderLineMovesPerCall:number;
  leaderLineMovesPerCallPercentage:number;
  startDateService:string;
  frequencyOfCalls:string;
  selectDays:any;
  endDateService:string;
  scheduleDetailsId:number;
  scheduleDetailsReqId:number;
  expectedTimeOfArrival:string;
  remarks:string;
  partnerLinesSos:ShipServSchedPartnerLinesSOModel[];
  vesselSo:ShipServSchedVesselSOModel[];
  portOfCallSo:ShipServSchedPortOfCallSOModel[];
  scheduleDetailsAttachSo:ShipServSchedDetailsAttachSOModel[];
  frequencySo:ShipServSchedFrequencySOModel[];
  requestNo:number;
  wrkflwId:string;
  boxOperatorMaster:any[];
  lastModifiedDate:any;
  createdDate:string;
  createdBy:string;
  wrkflwStatus:string;
  approveStatus:boolean;
  canCancel:boolean;
  canEdit:boolean;
  approver:any;
  approverEditFlag:any;
  amendRequestStatus:string;
  canApprove:boolean;
  finAdmin:boolean;
  nonFinAdmin:boolean;
  regStatus:string;
}
