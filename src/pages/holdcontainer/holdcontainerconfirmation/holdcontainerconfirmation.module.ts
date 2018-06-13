import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoldContainerConfirmation } from './holdcontainerconfirmation';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HoldContainerConfirmation,
  ],
  imports: [
    IonicPageModule.forChild(HoldContainerConfirmation),
    TranslateModule
  ],
  exports: [
    HoldContainerConfirmation,
    TranslateModule
  ]
})
export class HoldContainerConfirmationModule {}
