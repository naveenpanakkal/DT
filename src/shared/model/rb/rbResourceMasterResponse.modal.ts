import {ResourceTypeList} from "./rbResourceTypeList.modal";

export class ResourceMasterResponseModal {
  resLocationId: any;
  spType:null;
  location:null;
  spName:null;
  terminal:null;
  requestTypeCode:null;
  requestTypeName:null;
  perRequestCharge:null;
  taxPercentage:null;
  resourceTypeList: string[];
  resourceCategoryChargesMap: ResourceCategoryChargesMap[];
}

// export class ResourceCategoryChargesMap {
//   mapType: resourceChargesMap[];
// }

export class ResourceCategoryChargesMap {
  resLocCategoryId: number;
  resourceType: string;
  category: string;
  unitOfMeasure: string;
  qtyApplicable: string;
  durationApplicable: string;
  baseCharge:number;
  additionalCharges: number;
  otherCharges: number;
  quantity: number;
  duration: number;
}
