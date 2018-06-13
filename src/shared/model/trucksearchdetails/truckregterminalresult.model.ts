import {TruckRegTerminalRFIDRequestModel} from "./truckregterminalRFIDresult.model";


export class TruckRegTerminalResultModel {
  operatingTerminal: string;
  port: string;
  switchEnable: boolean;
  truckRegRequestTerminalRFIDSO: TruckRegTerminalRFIDRequestModel[];
  truckRegTerminalId: string;
  valForClearingFeild;
}
