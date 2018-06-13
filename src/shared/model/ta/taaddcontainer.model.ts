export class TaAddContainerListSO {
  list: TaAddContainerSO[];
}

export class TaAddContainerSO {
  containerAcceptanceno: string;
  containerFromDate: string;
  containerMoveType: string;
  containerNumberDetails: string;
  containerRelease: string;
  containerRotationNumber: string;
  containerStatus: string;
  containerStatusDetails: string;
  containerToDate: string;
  cutOffTimeDetails: string;
  deliveryOrderNumber: string;
  doAccType: string;
  docType: string;
  isoCodeDetails: string;
  isoCodeList: string[];
  locationCreate: string;
  moveTypeDetails: string;
  mvmntNomintdByCFS: string;
  mvmntNomintdByCHA: string;
  mvmntNomintdByEY: string;
  mvmntNomintdByFF: string;
  mvmntNomintdByIE: string;
  mvmntNomintdByTPR: string;
  nominateTransporterNoCreate: string;
  portOfDischrge: string;
  referenceNo: string;
  requestNo: string;
  requestType: string;
  shipperName: string;
  shippingLineDetails: string;
  spNameCreate: string;
  taISOQntyListSO: TaISOQuantitySO[];
  tradeType: string;
  trasporterCompany: string;

  containerDetailId: number;

  //extra variable added for UI
  checkedStatus: boolean;
}

export class TaISOQuantitySO {
  contCount: string;
  isoCode: string;
  maxCount: string;
}
