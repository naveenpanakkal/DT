import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TacreatePage } from './tacreate';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TacreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TacreatePage),
    TranslateModule
  ],
  exports: [
    TacreatePage,
    TranslateModule
  ]
})
export class TacreatePageModule {}
