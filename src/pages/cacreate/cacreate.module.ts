import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CacreatePage } from './cacreate';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CacreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CacreatePage),
    TranslateModule
  ],
  exports: [
    CacreatePage,
    TranslateModule
  ]
})
export class CacreatePageModule {}
