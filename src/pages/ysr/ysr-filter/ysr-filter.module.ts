import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {YsrFilterPage} from "./ysr-filter";


@NgModule({
  declarations: [
    YsrFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(YsrFilterPage),
    TranslateModule
  ],
  exports: [
    YsrFilterPage,
    TranslateModule
  ]
})
export class YsrFilterPageModule {}
