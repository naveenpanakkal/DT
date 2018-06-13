export class VoyageEnquiryResultModel {
  rotationNumber: number;
  vesselName: string;
  eta: string;
  terminals: string[];
  operationStatus?: string="";
  clientCode: string;
}
