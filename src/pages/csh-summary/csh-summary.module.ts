import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CshSummaryPage } from './csh-summary';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CshSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(CshSummaryPage),
    TranslateModule
  ],
  exports: [
    CshSummaryPage,
    TranslateModule
  ]
})
export class CshSummaryPageModule {}
