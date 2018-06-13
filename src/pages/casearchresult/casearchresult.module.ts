import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasearchresultPage } from './casearchresult';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CasearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(CasearchresultPage),
    TranslateModule
  ],
  exports: [
    CasearchresultPage,
    TranslateModule
  ]
})
export class CasearchresultPageModule {}
