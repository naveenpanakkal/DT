export class VoyageEnquirySearchRequestModel {
  billOfLading:string="";
  bookingReferenceNo:string="";
  containerNo:string="";
  customsDeclarationNo:string="";
  doNo:string="";
  durationSearch:string=null;
  etaFromDateSearch:string=null;
  etaToDateSearch:string=null;
  operationalStatusSearch :string=null;
  portsSearch :string[]=[];
  rotationNumberSearch :string="";
  shippingLineSearch :string="";
  terminalsSearch :string[]=[];
  tradeType :string="";
  vesselNameSearch :string="";
}
// {
//   "billOfLading": "",
//   "bookingReferenceNo": "",
//   "containerNo": "",
//   "customsDeclarationNo": "",
//   "doNo": "",
//   "durationSearch": "",
//   "etaFromDateSearch": "15/09/2017",
//   "etaToDateSearch": "15/03/2018",
//   "operationalStatusSearch": "All",
//   "portsSearch": [],
//   "rotationNumberSearch": "",
//   "shippingLineSearch": "",
//   "terminalsSearch": [],
//   "tradeType": "",
//   "vesselNameSearch": ""
// }
