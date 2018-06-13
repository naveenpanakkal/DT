export class LocationMasterResponseModel {
    specialcategorySO:string[];
    terminalSO:TerminalSO[];
}
export class TerminalSO{
    locListSO:LocationListSO[];
    location:string;
    locationMappingId:number;
    serviceCategoryCode:string;
    serviceCategoryName:string;
    serviceMasterCode:string;
    spName:string;
    spType:string;
    terminal:string;
}
export class LocationListSO{

}