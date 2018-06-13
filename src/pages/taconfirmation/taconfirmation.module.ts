  import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaConfirmationPage } from './taconfirmation';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TaConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(TaConfirmationPage),
    TranslateModule
  ],
  exports: [
    TaConfirmationPage,
    TranslateModule
  ]
})
export class TaConfirmationPageModule {}
