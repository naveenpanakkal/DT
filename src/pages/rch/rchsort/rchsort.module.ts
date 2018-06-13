import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {RCHsortPage} from "./rchsort";

@NgModule({
  declarations: [
    RCHsortPage,
  ],
  imports: [
    IonicPageModule.forChild(RCHsortPage),
    TranslateModule
  ],
  exports: [
    RCHsortPage,
    TranslateModule
  ]
})
export class RCHsortPageModule {}
