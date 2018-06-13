import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DosearchsummaryPage } from './dosearchsummary';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    DosearchsummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(DosearchsummaryPage),
    TranslateModule
  ],
  exports: [
    DosearchsummaryPage,
    TranslateModule
  ]
})
export class DosearchsummaryPageModule {}
