import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {YsrSortPage} from "./ysr-sort";

@NgModule({
  declarations: [
    YsrSortPage,
  ],
  imports: [
    IonicPageModule.forChild(YsrSortPage),
    TranslateModule
  ],
  exports: [
    YsrSortPage,
    TranslateModule
  ]
})
export class YsrSortPageModule {}
