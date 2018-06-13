import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {CshsortPage} from "./cshsort";

@NgModule({
  declarations: [
    CshsortPage,
  ],
  imports: [
    IonicPageModule.forChild(CshsortPage),
    TranslateModule
  ],
  exports: [
    CshsortPage,
    TranslateModule
  ]
})
export class CshsortPageModule {}
