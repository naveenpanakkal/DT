import {TaISOQuantitySO} from "./taaddcontainer.model";

export class TruckappointmentdetailsoModel {
  action: string;
  agentNameView: string;
  agentReferenceNo: string;
  alternativeMobileNumber: number;
  appointmentDateCreate: string;
  appointmentSlotCreate: string;
  appointmentTime: string;
  availableQuantity: string;
  attachs: TruckAppointmentAttachSO[];
  clientCode: string;
  configuredXHours: number;
  containerDetails: TaContainerDetailsSO[];
  createdBy: string;
  createdDate: string;
  driverMobileNumberCreate: number;
  driverNameCreate: string;
  isB2bMessage: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  locationCreate: string;
  noOfContainers: string;
  portOfDischrge: string;
  prevContainerCount: number;
  prevSlot: string;
  prevSlotDate: string;
  remarksCreate: string;
  slotType: string;
  spNameCreate: string;
  taStatus: string;
  terminalCreate: string;
  trailerNoCreate: string;
  truckAppointmentNo: number;
  truckAppointmentReqId: number;
  truckNumberCreate: string;
  trucktypeCreate: string;
}

export class TruckAppointmentAttachSO {
  docExpDate: string;
  docIssueDate: string;
  docNum: string;
  docType: string;
  fileName: string;
  fileUploadId: number;
  truckAttachId: number;
  hideUploadButton:boolean=true;
}

export class AdditionalDetailsSO {
  additonalId: number;
  agentSealNo: string;
  billOfEntry: string;
  commodityDescription: string;
  customSealNo: string;
  declaredWeight: string;
  maxWeight: string;
  outOfCharge: string;
  shippingBillNo: string;
  verifiedGross: string;
}

export class TaContainerDetailsSO {
  additionalDetails: AdditionalDetailsSO;
  caDOCRNoDetails: string;
  category: string;
  containerCountDetails: number;
  containerId: number;
  containerList: string[];
  containerNumberConfirm: string;
  containerNumberDetails: string;
  containerRotationNumber: string;
  containerSizeDetails: string;
  containerStatus: string;
  containerStatusDetails: string;
  cutOffTimeDetails: string;
  docType: string;
  eirNoDetails: string;
  isoCodeDetails: string;
  maxCount: string;
  moveTypeDetails: string;
  mvmntNomintdByCFS: string;
  mvmntNomintdByCHA: string;
  mvmntNomintdByEY: string;
  mvmntNomintdByFF: string;
  mvmntNomintdByIE: string;
  mvmntNomintdByTPR: string;
  portOfDischrge: string;
  requestNo: string;
  shipperName: string;
  shippingLineDetails: string;
  tradeType: string;
  trasporterCompany: string;

  containerDetailId: number;

  // remove it before sending.
  // Extra params added for create and edit
  isoCodeList: string[];
  taISOQntyListSO: TaISOQuantitySO[];
  isFromAddContainer: boolean;

  showadvOption: boolean= false;
}
