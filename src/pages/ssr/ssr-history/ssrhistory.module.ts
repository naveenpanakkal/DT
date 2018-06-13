import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrHistoryPage} from "./ssrhistory";

@NgModule({
  declarations: [
    SsrHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(SsrHistoryPage),
    TranslateModule
  ],
  exports: [
    SsrHistoryPage,
    TranslateModule
  ]
})
export class SsrHistoryPageModule {}
