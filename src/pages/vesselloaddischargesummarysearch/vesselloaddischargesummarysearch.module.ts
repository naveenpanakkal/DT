import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {
  VesselloaddischargesummarysearchPage,
} from './vesselloaddischargesummarysearch';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselloaddischargesummarysearchPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselloaddischargesummarysearchPage),
    TranslateModule
  ],
  exports: [
    VesselloaddischargesummarysearchPage,
    TranslateModule
  ]
})
export class VesselloaddischargesummarysearchPageModule {}
