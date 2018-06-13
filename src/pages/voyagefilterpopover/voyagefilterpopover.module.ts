import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyagefilterpopoverPage } from './voyagefilterpopover';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VoyagefilterpopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyagefilterpopoverPage),
    TranslateModule
  ],
  exports: [
    VoyagefilterpopoverPage,
    TranslateModule
  ]
})
export class VoyagefilterpopoverPageModule {}
