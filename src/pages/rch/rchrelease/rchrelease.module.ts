import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {RCHReleaseviewPage} from "./rchrelease";

@NgModule({
  declarations: [
    RCHReleaseviewPage,
  ],
  imports: [
    IonicPageModule.forChild(RCHReleaseviewPage),
    TranslateModule
  ],
  exports: [
    RCHReleaseviewPage,
    TranslateModule
  ]
})
export class RCHReleaseviewPageModule {}
