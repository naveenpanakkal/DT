import {CaAttachModel} from "./caattach.model";
import {ContainerDetailsModel} from "./containerdetails.model";
import {CaNominationsModel} from "./canominations.model";
import {SubLocationMasterModel} from "./sublocationmaster.model";
import {LocationMasterModel} from "./locationmaster.model";

export class ContainerAcceptanceModel {
  acceptanceNo: number;
  acceptanceType: string;
  action: string;
  boxOperatorMaster: string[];
  caAttachSOs: CaAttachModel[];
  caContainerDetailsSOs: ContainerDetailsModel[];
  caId: number;
  caNominationsSOs: CaNominationsModel[];
  caRequestId: number;
  cargoCutOffTime: string;
  clientCode: string;
  containerAcceptanceNoSuccess: number;
  containerNoProvided: string;
  containerNumberAvailable: string;
  createdBy: string;
  createdDate: string;
  finalPortOfDestination: string;
  finalPortOfDestinationCode: string;
  instructions: string;
  isB2bMessage: string;
  isDeleted: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  linerBookingNumber: string;
  linerBookingNumberSuccess: string;
  linerCode: string;
  location: string;
  locationMasterList: LocationMasterModel[];
  modeOfTransport: string;
  placeOfReceipt: string;
  placeOfReceiptCode: string;
  portOfDischarge: string;
  portOfDischargeSuccess: string;
  portOfLoading: string;
  requestDate: string;
  rotationNoSuccess: string;
  rotationNumber: string;
  serviceProvider: string;
  spNameMasterList: SubLocationMasterModel[];
  status: string;
  storageFrom: string;
  storageTo: string;
  terminal: string;
  totalNoOfContainersSuccess: number;
  totalNoOfDays: number;
  tradeType: string;
  validityDate: string;
  vesselCutOfDateSuccess: string;
  vesselCutOffTime: string;
  vesselName: string;
  vesselNameSuccess: string;
  vgmRequired: string;

  rotationNo: string;
  requestNo: number;
  dropDown='false';
}
