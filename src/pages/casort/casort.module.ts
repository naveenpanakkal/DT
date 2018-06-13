import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CasortPage } from './casort';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CasortPage,
  ],
  imports: [
    IonicPageModule.forChild(CasortPage),
    TranslateModule
  ],
  exports: [
    CasortPage,
    TranslateModule
  ]
})
export class CasortPageModule {}
