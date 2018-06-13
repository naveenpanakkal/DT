import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {HoldContainerFilter} from "./holdcontainerfilter";

@NgModule({
  declarations: [
    HoldContainerFilter,
  ],
  imports: [
    IonicPageModule.forChild(HoldContainerFilter),
    TranslateModule
  ],
  exports: [
    HoldContainerFilter,
    TranslateModule
  ]
})
export class HoldContainerFilterModule {}
