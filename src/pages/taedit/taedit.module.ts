import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaeditPage } from './taedit';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TaeditPage,
  ],
  imports: [
    IonicPageModule.forChild(TaeditPage),
    TranslateModule
  ],
  exports: [
    TaeditPage,
    TranslateModule
  ]
})
export class TaeditPageModule {}
