import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoadDischargeMailPage } from './loaddischargemail';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    LoadDischargeMailPage,
  ],
  imports: [
    IonicPageModule.forChild(LoadDischargeMailPage),

    TranslateModule
  ],
  exports: [
    LoadDischargeMailPage,
    TranslateModule
  ]
})
export class LoaddischargemailPageModule {}
