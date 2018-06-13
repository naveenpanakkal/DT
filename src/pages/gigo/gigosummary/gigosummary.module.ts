import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiGosummaryPage } from './gigosummary';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GiGosummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(GiGosummaryPage),
    TranslateModule
  ],
  exports: [
    GiGosummaryPage,
    TranslateModule
  ]
})
export class GiGosummaryPageModule {}


