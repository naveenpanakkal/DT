import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrFilter} from "./ssrfilter";

@NgModule({
  declarations: [
    SsrFilter,
  ],
  imports: [
    IonicPageModule.forChild(SsrFilter),
    TranslateModule
  ],
  exports: [
    SsrFilter,
    TranslateModule
  ]
})
export class SsrFilterModule {}
