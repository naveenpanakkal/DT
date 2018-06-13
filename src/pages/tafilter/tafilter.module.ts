import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TafilterPage } from './tafilter';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TafilterPage,
  ],
  imports: [
    IonicPageModule.forChild(TafilterPage),
    TranslateModule
  ],
  exports: [
    TafilterPage,
    TranslateModule
  ]
})
export class TafilterPageModule {}
