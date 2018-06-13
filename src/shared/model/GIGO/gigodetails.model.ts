import {DefinedSetResModel} from "../definedset/definedsetres.model";
export class GigoDetailsSO {
  action: string;
  addMailIDs: string;
  b2BEndReferenceNo: string;
  b2BStartReferenceNo: string;
  cancelMessage: string[];
  cancelRemarks: string;
  channel: string;
  clientCode: string;
  createdBy: string;
  createdDate: string;
  driverName: string;
  ediDocumentIssueDate: string;
  ediMessageReferenceNo: string;
  eirNo: string;
  exportType: string;
  gate: string;
  gigoAttachmentSO: GigoAttachmentSO[];
  gigoConfirmSO: GigoConfirmSO[];
  gigoContainerDetailsSO: GigoContainerDetailsSO[];
  gigoNo: number;
  gigoReqNo: number;
  isB2bMessage: string;
  isDeleted: string;
  isEdi: string;
  isNominated: string;
  lastModifiedDate: string;
  location: string;
  locationMasterList: LocationMasterSO[];
  locationName: string;
  mailId: string;
  moveType: string;
  mvmntClientCode: string;
  mvmntNomintdByCFS: string;
  mvmntNomintdByCHA: string;
  mvmntNomintdByEY: string;
  mvmntNomintdByFF: string;
  mvmntNomintdByIE: string;
  mvmntNomintdByTPR: string;
  referenceNo: string;
  reportFormat: string;
  sPName: string;
  selectDays: string;
  spLocationName: string;
  spNameMasterList: SubLocationMasterSO[];
  status: string;
  terminal: string;
  truckNumber: string;
  warningMessage: string;

}

export class GigoAttachmentSO {
  fileName: string;
  fileUploadId: number;
  gigoAttachId: number;
  hideUploadButton:boolean=true;
}

export class GigoConfirmSO {
  confirmChassis: string;
  confirmContainer: string;
  confirmDate: string;
  gigoNo: number;
}

export class GigoContainerDetailsSO {
  actualWeight: string;
  chassisNo: string;
  containerID: number;
  containerNo: string;
  damageCondition: string;
  damageCount: string;
  damageHeight: string;
  damageItem: string;
  damageLength: string;
  damageLocation: string;
  damageWidth: string;
  eirNumber: string;
  gateInOutTime: string;
  gigoAttchDmgDtlsSO: GigoAttchDmgDtlsSO[];
  gigoConReqNo: number;
  gigoNum: number;
  gigoSealDetailsSO: GigoSealDetailsSO[];
  hauiler: string;
  isoCode: string;
  ladenStatus: string;
  lineCode: string;
  location: string;
  locationName: string;
  mvmntClientCode: string;
  mvmntCreatedDate: string;
  previousStatus: string;
  remarks: string;
  requestNo: string;
  requestType: string;
  sPName: string;
  spLocationName: string;
  showSealButtton=false;
  requesttypeList : DefinedSetResModel[] = [];
}

export class LocationMasterSO {
  clientTypeCode: string;
  serviceProviderCode: string;
  serviceProviderName: string;
  spLocationCode: string;
  spLocationName: string;
  spSubLocationCode: string;
  spSubLocationName: string;
}

export class SubLocationMasterSO {
  spSubLocationCode: string;
  spSubLocationName: string;
}

export class GigoAttchDmgDtlsSO {
  fileName: string;
  fileUploadId: number;
  gigoAttachId: number;
  gigoAttachIdReq: number;
  hideUploadButton:boolean=true;
}

export class GigoSealDetailsSO {
  gigoSealNo: number;
  gigoSealReqNo: number;
  isSealDeleted: string;
  sealNumber: string;
  sealPrefix: string;
  sealStatus: string;
  sealType: string;
}
