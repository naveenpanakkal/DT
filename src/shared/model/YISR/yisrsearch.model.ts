export class YisrListSO {
  location: string;
  lineCode: string;
  terminalYard: string;
  list: YisrSearchResult[];
  errors: string;
}

export class YisrSearchResult {
  below3: string;
  below7: string;
  below10: string;
  below15: string;
  above30: string;
  below30: string;
  total: string;
  rowHeading: string;
  lineCode: string;
  tradeType: string;
  spType: string;
  terminalYard: string;
  containerNo: string;
  isoCode: string;
  loadCategory: string;
  location: string;
  daysStoredFrom: string;
  daysStoredTo: string;
  isHold: string;
  damaged: string;
  caNo: string;
  doNo: string;
  crNo: string;
  rotationNo: string;
  vesselName: string;
  voyageNo: string;
  createdDate: string;
  etaFromDate: string;
  etaToDate: string;
  createdFrom: string;
  createdTo: string;
  containerList: string;
  containerSize: string;
}
