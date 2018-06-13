import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RBsummaryPage } from './rbsummary';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBsummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(RBsummaryPage),
    TranslateModule
  ],
  exports: [
    RBsummaryPage,
    TranslateModule
  ]
})
export class RBsummaryPageModule {}
