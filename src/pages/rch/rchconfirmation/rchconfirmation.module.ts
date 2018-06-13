import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RchConfirmation } from './rchconfirmation';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RchConfirmation,
  ],
  imports: [
    IonicPageModule.forChild(RchConfirmation),
    TranslateModule
  ],
  exports: [
    RchConfirmation,
    TranslateModule
  ]
})
export class RchConfirmationModule {}
