import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaviewPage } from './taview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TaviewPage,
  ],
  imports: [
    IonicPageModule.forChild(TaviewPage),
    TranslateModule
  ],
  exports: [
    TaviewPage,
    TranslateModule
  ]
})
export class TaviewPageModule {}
