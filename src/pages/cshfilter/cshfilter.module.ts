import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CshfilterPage } from './cshfilter';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CshfilterPage,
  ],
  imports: [
    IonicPageModule.forChild(CshfilterPage),
    TranslateModule
  ],
  exports: [
    CshfilterPage,
    TranslateModule
  ]
})
export class CshfilterPageModule {}
