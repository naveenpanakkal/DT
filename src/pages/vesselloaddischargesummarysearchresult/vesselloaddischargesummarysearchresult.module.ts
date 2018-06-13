import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VesselloaddischargesummarysearchresultPage } from './vesselloaddischargesummarysearchresult';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselloaddischargesummarysearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselloaddischargesummarysearchresultPage),
    TranslateModule
  ],
  exports: [
    VesselloaddischargesummarysearchresultPage,
    TranslateModule
  ]
})
export class VesselloaddischargesummarysearchresultPageModule {}
