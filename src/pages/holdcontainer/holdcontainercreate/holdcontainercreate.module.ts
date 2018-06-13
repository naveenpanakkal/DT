import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {HoldContainerCreatePage} from "./holdcontainercreate";

@NgModule({
  declarations: [
    HoldContainerCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(HoldContainerCreatePage),
    TranslateModule
  ],
  exports: [
    HoldContainerCreatePage,
    TranslateModule
  ]
})
export class HoldContainerCreatePageModule {}
