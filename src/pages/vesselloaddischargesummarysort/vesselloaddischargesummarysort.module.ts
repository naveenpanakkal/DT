import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {VesselloaddischargesummarysortPage} from "./vesselloaddischargesummarysort";

@NgModule({
  declarations: [
    VesselloaddischargesummarysortPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselloaddischargesummarysortPage),
    TranslateModule
  ],
  exports: [
    VesselloaddischargesummarysortPage,
    TranslateModule
  ]
})
export class VesselloaddischargesummarySortPageModule {}
