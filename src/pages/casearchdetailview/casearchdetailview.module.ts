import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasearchdetailviewPage } from './casearchdetailview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CasearchdetailviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CasearchdetailviewPage),
    TranslateModule
  ],
  exports: [
    CasearchdetailviewPage,
    TranslateModule
  ]
})
export class CasearchdetailviewPageModule {}
