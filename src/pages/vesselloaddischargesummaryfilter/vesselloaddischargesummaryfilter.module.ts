import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {
  VesselloaddischargesummaryfilterPage,
} from './vesselloaddischargesummaryfilter';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselloaddischargesummaryfilterPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselloaddischargesummaryfilterPage),
    TranslateModule
  ],
  exports: [
    VesselloaddischargesummaryfilterPage,
    TranslateModule
  ]
})
export class VesselloaddischargesummaryfilterModule {}
