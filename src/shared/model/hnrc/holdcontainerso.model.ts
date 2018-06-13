export class HoldContainerSO {
  action: string;
  autoRelease: string;
  autoReleaseDateTime: string;
  b2bErrList: string;
  clientCode: string;
  clientType: string;
  conatinerNoEC: string;
  contSize: string;
  containerCategory: string;
  containerNo: string;
  countryHoldDetails: HoldCountryDetailsSO[];
  createdBy: string;
  createdDate: string;
  designation: string;
  endDateTime: string;
  exCountryDetails: HoldCountryDetailsSO[];
  exImoDtls: HoldSpecificationDetailsSO[];
  exPortDetails: HoldPortDetailsSO[];
  excludeCountry: string;
  excludePort: string;
  exportCatgry: string;
  holdAction: string;
  holdBasedOn: string;
  holdBasedOncountry: string;
  holdReason: string;
  holdRequestNo: number;
  holdRequestNumber: number;
  holdRequestStatus: string;
  holdSpecDetails: HoldSpecificationDetailsSO[];
  holdSpeciSOCode: string;
  holdStatus: string;
  importCatgry: string;
  isAutoUpdateNeed: string;
  isB2bMessage: string;
  isHoldProcessed: string;
  isReleased: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  lineCode: string;
  loadVesselNameEC: string;
  location: string;
  locationMasterList: LocationMasterSO[];
  otherReason: string;
  portHoldDetails: HoldPortDetailsSO[];
  portType: string;
  reexportCatgry: string;
  referenceNo: string;
  remarks: string;
  silentHold: string;
  spName: string;
  spNameMasterList: SubLocationMasterSO[];
  startDateTime: string;
  storageCatgry: string;
  terminal: string;
  tsCatgry: string;
  vesselType: string;
}

export class HoldCountryDetailsSO {
  containerSize: string;
  countryName: string;
  holdBasedOncountry: string;
  iSOCode: string;
  isExclude: string;
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

export class HoldPortDetailsSO {
  containerSize: string;
  iSOCode: string;
  isExclude: string;
  portCode: string;
  portName: string;
  portType: string;
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

export class IsoCodeSO {
  contSize:string;
}

export class IsoCodeResponse {
  isoList : IsoCodeResponseModal[];
}


export class IsoCodeResponseModal {
  isoCodeMstrId:number;
  isoCode:string;
  description:string;
  size:string;
  type:string;
  weight:string;
  classification:string;
}
