export class SpecialServiceSubTypeResponseModel{
    approver:string;
    approverData:ApproverData[];
    approverType:string;
    costsSO:CostSO[];
    designation:string;
    endDate:string;
    expCompDate:string;
    hour:string;
    instructions:string;
    isoType:string;
    operationStatus:string;
    qty:string;
    rotationNoPop:string;
    searchByContainer:string;
    specialServiceCode:string;
    specialServiceId:number;
    specialServiceName:string;
    startDate:string;
    subType:SubType[];
    totalBaseCost:string;
    tradeType:string;
    userRole:string;
}
export class ApproverData{
    approver: string;
    approvers: string;
    serviceTypeCode: string;
}
export class CostSO{
    amount:number;
    chargeType:string;
    unitOfMeasure:string;
}
export class SubType{
    subTypeId:number;
    subTypeName:string
}
