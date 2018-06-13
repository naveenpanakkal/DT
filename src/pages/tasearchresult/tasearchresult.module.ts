import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasearchresultPage } from './tasearchresult';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TasearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(TasearchresultPage),
    TranslateModule
  ],
  exports: [
    TasearchresultPage,
    TranslateModule
  ]
})
export class TasearchresultPageModule {}
