export class ShipServSchedSearchCriteria {
  code: string;
  name: string;
  selected: boolean;

  constructor(code:string,name:string,selected:boolean){
    this.code = code;
    this.name = name;
    this.selected = selected;
  }
}
