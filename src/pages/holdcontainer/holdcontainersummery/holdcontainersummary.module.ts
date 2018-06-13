import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoldContainerSummaryPage } from './holdcontainersummary';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HoldContainerSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(HoldContainerSummaryPage),
    TranslateModule
  ],
  exports: [
    HoldContainerSummaryPage,
    TranslateModule
  ]
})
export class HoldContainerSummaryPageModule {


}
