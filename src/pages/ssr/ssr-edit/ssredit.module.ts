import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrEditPage} from "./ssredit";

@NgModule({
  declarations: [
    SsrEditPage,
  ],
  imports: [
   IonicPageModule.forChild(SsrEditPage),
    TranslateModule
  ],
  exports: [
    SsrEditPage,
    TranslateModule
  ]
})
export class SsrEditPageModule {}
