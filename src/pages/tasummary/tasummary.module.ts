import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasummaryPage } from './tasummary';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TasummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(TasummaryPage),
    TranslateModule
  ],
  exports: [
    TasummaryPage,
    TranslateModule
  ]
})
export class TasummaryPageModule {}
