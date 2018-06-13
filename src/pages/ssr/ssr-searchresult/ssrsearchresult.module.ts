import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrSearchResultPage} from "./ssrsearchresult";

@NgModule({
  declarations: [
    SsrSearchResultPage,
  ],
  imports: [
    IonicPageModule.forChild(SsrSearchResultPage),
    TranslateModule
  ],
  exports: [
    SsrSearchResultPage,
    TranslateModule
  ]
})
export class SsrSearchResultPageModule {}
