export class ReleaseContainerSrchListSO {
  list: ContainerHoldDetailsSO[];
  recordsTotal : number;
  recordsFiltered : number;
}

export class ReleaseContainerReqListSO {
  releaseList: ContainerHoldDetailsSO[];
}

export class ContainerHoldDetailsSO {
  addDtlsView: string;
  additionalDetails: ReleaseAdditionalDetailsSO[];
  autoRelease: string;
  autoReleaseDateTime: string;
  b2brmks: string;
  clientCode: string;
  clientType: string;
  contList: string[];
  containerCategory: string;
  containerID: number;
  containerList: ContainerDetailSO[];
  containerNo: string;
  createdBy: string;
  createdDate: string;
  endDateTime: string;
  holdAction: string;
  holdBasedOn: string;
  holdBy: string;
  holdCode: string;
  holdCreatedOn: string;
  holdId: number;
  holdReason: string;
  holdRequestNo: number;
  holdStatus: string;
  holdType: string;
  isDeletedCA: string;
  isLatestCycle: string;
  isReleased: string;
  isoCode: string;
  lineCode: string;
  loadStatus: string;
  location: string;
  optrCode: string;
  referenceNo: string;
  releaseDate: string;
  releaseLater: string;
  releaseNow: string;
  releasedBy: string;
  rotationNumber: string;
  shippingStatus: string;
  silentHold: string;
  spName: string;
  startDateTime: string;
  longPressFired:string;
  timer:any;

}

export class ReleaseAdditionalDetailsSO {
  additionalDetailId: number;
  createdBy: string;
  createdDate: string;
  holdCreatedBy: string;
  holdCreatedDate: string;
  releaseAttachmnts: ReleaseAttachmentDetailsSO[];
  releaseDate: string;
  releaseLater: string;
  releaseNow: string;
  releasedBy: string;
  remarks: string;
}

export class ContainerDetailSO {
  actualArrivalTime: string;
  billNo: string;
  billNoList: string[];
  caLocation: string;
  caSPName: string;
  caSPNameList: string[];
  cfsOperatorCode: string;
  consigneeCode: string;
  consolAgentCode: string;
  containerAgentCode: string;
  containerDamageInfo: string;
  containerDetailId: number;
  containerDigit: number;
  containerIDList: number[];
  containerList: string[];
  containerLocation: string;
  containerNo: string;
  containerPrefix: string;
  containerPrefixList: string[];
  containerRangeList: HoldSpecificationDetailsSO[];
  containerSealNo: string;
  containerStatus: string;
  containerWeight: string;
  customsHouseCode: string;
  designationList: string[];
  designationPort: string;
  errors: string;
  excludeContainerList: string[];
  fromDate: string;
  heavyDuty: string;
  igmDat: string;
  igmDate: string;
  igmNO: string;
  imcoCode: string;
  imoCodeofVessel: string;
  imocodeofVsl: string;
  importerName: string;
  isActive: string;
  isCycleCompleted: string;
  isDiscList: string;
  isForeign: string;
  isLatestCycle: string;
  isLoadList: string;
  isRemoved: string;
  isoCode: string;
  isoCodeList: string[];
  lineCode: string;
  lineCodeList: string[];
  lineNo: string;
  lineNumber: string;
  loadCategory: string;
  loadStatus: string;
  location: string;
  messageType: string;
  noOfContainers: number;
  operatorCode: string;
  optrCodeList: string[];
  outOfGaugeIndicator: string;
  outboundRotation: string;
  overSizeBack: string;
  overSizeFront: string;
  overSizeLeft: string;
  overSizeRight: string;
  overSizeTop: string;
  portOfDischarge: string;
  portOfLoading: string;
  portOfOrigin: string;
  reeferIndicator: string;
  reeferSetTemperature: string;
  reqNo: number;
  rotationNumber: string;
  rotationNumberList: string[];
  sealNumber: string;
  shippingStatus: string;
  shippngStatsList: string[];
  socFlag: string;
  status: string;
  statusList: string[];
  stowage: string;
  subLineNo: string;
  temperature: string;
  terminalId: string;
  toDate: string;
  totalNoofPackagesInContainer: string;
  unNoOfImco: string;
  vesselCode: string;
  vesselCodeContainer: string;
  voyageNumber: string;
}

export class ReleaseAttachmentDetailsSO {
  fileName: string;
  fileUploadId: number;
  hideUploadButton:boolean=true;
}

export class HoldSpecificationDetailsSO {
  containerNo: string;
  containerPrefix: string;
  containerRangeFrom: string;
  containerSize: string;
  containerrangeTo: string;
  errorList: string;
  iSOCode: string;
  iSOCodeContainerNo: string;
  imoNumber: string;
  incrementRotationNumber: string;
  isExclude: string;
  lineHold: string;
  locationHold: string;
  shippingStatus: string;
  statusHold: string;
}
