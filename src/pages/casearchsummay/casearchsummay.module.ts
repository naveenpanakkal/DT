import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Casearchsummay } from './casearchsummay';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    Casearchsummay,
  ],
  imports: [
    IonicPageModule.forChild(Casearchsummay),
    TranslateModule
  ],
  exports: [
    Casearchsummay,
    TranslateModule
  ]
})
export class CasearchsummayModule {}
