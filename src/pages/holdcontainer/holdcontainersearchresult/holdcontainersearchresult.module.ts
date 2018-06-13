import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {HoldContainerSearchresultPage} from "./holdcontainersearchresult";

@NgModule({
  declarations: [
    HoldContainerSearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(HoldContainerSearchresultPage),
    TranslateModule
  ],
  exports: [
    HoldContainerSearchresultPage,
    TranslateModule
  ]
})
export class HoldContainerSearchresultPageModule {}
