import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GigoCreateSummary } from './gigocreatesummary';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GigoCreateSummary,
  ],
  imports: [
    IonicPageModule.forChild(GigoCreateSummary),
    TranslateModule
  ],
  exports: [
    GigoCreateSummary,
    TranslateModule
  ]
})
export class GigoCreateSummaryModule {}
