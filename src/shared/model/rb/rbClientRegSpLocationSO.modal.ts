
export class ClientRegSpLocationSO {

  clientRegSpLocationId:number;
  serviceProviderCode: string;
  serviceProviderName: string;
  spLocationCode: string;
  spSubLocationCode: string;
  clientTypeCode: string;
  clientCode: any;
  spSubLocationName: string;
  spLocationName: string;
  clientRegSpCodeTypeSO : ClientRegSpCodeTypeSOModal[];

}

export class ClientRegSpCodeTypeSOModal {
  clientRegSpCodeTypeId:number;
  codeIssuer: string;
  codeType: string;
  codeTypeCode: string;
  code: string;
  clientName: string;
  clientCode: string;
  codeName: string;
}
