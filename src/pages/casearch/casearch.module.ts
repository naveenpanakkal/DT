import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasearchPage } from './casearch';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CasearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CasearchPage),
    TranslateModule
  ],
  exports: [
    CasearchPage,
    TranslateModule
  ]
})
export class CasearchPageModule {}
