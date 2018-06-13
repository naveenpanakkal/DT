import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LanguageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LanguageProvider {

  public language : any;
  public valueforngif: boolean = false;
  public footerif: boolean = false;

  public hideTabs: boolean = true;
  public isEdit: boolean = false;

  public createdfrom : any;
  public createdto : any;

  public vesselCreatedFrom : any;
  public vesselCreateTo : any;
}
