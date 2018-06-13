import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrConfirmation} from "./ssrconfirmation";

@NgModule({
  declarations: [
    SsrConfirmation,
  ],
  imports: [
    IonicPageModule.forChild(SsrConfirmation),
    TranslateModule
  ],
  exports: [
    SsrConfirmation,
    TranslateModule
  ]
})
export class SsrConfirmationModule {}
