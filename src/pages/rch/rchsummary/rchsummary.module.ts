import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {RCHsummaryPage} from "./rchsummary";

@NgModule({
  declarations: [
    RCHsummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(RCHsummaryPage),
    TranslateModule
  ],
  exports: [
    RCHsummaryPage,
    TranslateModule
  ]
})
export class RCHsummaryPageModule {}
