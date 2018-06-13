import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {HoldContainerEditandView} from "./holdcontainerEditandView";

@NgModule({
  declarations: [
    HoldContainerEditandView,
  ],
  imports: [
    IonicPageModule.forChild(HoldContainerEditandView),
    TranslateModule
  ],
  exports: [
    HoldContainerEditandView,
    TranslateModule
  ]
})
export class HoldContainerEditandViewPageModule {}
