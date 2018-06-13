import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {RCHviewPage} from "./rchview";

@NgModule({
  declarations: [
    RCHviewPage,
  ],
  imports: [
    IonicPageModule.forChild(RCHviewPage),
    TranslateModule
  ],
  exports: [
    RCHviewPage,
    TranslateModule
  ]
})
export class RCHviewPageModule {}
