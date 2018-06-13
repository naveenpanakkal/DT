import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrsummaryPage} from "./ssrsummary";


@NgModule({
  declarations: [
    SsrsummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SsrsummaryPage),
    TranslateModule
  ],
  exports: [
    SsrsummaryPage,
    TranslateModule
  ]
})
export class SsrsummaryPageModule {}


