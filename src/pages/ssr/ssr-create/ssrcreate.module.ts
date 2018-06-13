import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrCreatePage} from "./ssrcreate";

@NgModule({
  declarations: [
    SsrCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(SsrCreatePage),
    TranslateModule
  ],
  exports: [
    SsrCreatePage,
    TranslateModule
  ]
})
export class SsrCreatePageModule {}
