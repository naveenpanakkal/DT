import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DosearchresultPage } from './dosearchresult';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    DosearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(DosearchresultPage),
    TranslateModule
  ],
  exports: [
    DosearchresultPage,
    TranslateModule
  ]
})
export class DosearchresultPageModule {}
