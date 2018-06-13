import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrsortPage} from "./ssrsort";

@NgModule({
  declarations: [
    SsrsortPage,
  ],
  imports: [
    IonicPageModule.forChild(SsrsortPage),
    TranslateModule
  ],
  exports: [
    SsrsortPage,
    TranslateModule
  ]
})
export class SsrsortPageModule {}
