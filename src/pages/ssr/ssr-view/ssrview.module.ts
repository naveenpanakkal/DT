import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrViewPage} from "./ssrview";

@NgModule({
  declarations: [
    SsrViewPage,
  ],
  imports: [
    IonicPageModule.forChild(SsrViewPage),
    TranslateModule
  ],
  exports: [
    SsrViewPage,
    TranslateModule
  ]
})
export class SsrViewPageModule {}
