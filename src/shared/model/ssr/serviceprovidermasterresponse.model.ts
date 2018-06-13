export class ServiceProviderMasterResponseModel{
    clientCode:string;
    clientRegSpCodeTypeSO:ClientRegSpCodeTypeSO[];
    clientRegSpLocationId:number;
    clientTypeCode:string;
    serviceProviderCode:string;
    serviceProviderName:string;
    spLocationCode:string;
    spLocationName:string;
    spSubLocationCode:string;
    spSubLocationName:string;
}
export class ClientRegSpCodeTypeSO{
    clientCode:string;
    clientName:string;
    clientRegSpCodeTypeId:number;
    code:string;
    codeIssuer:string;
    codeName:string;
    codeType:string;
    codeTypeCode:string;
}