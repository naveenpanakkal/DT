import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VesselsearchviewPage } from './vesselsearchview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselsearchviewPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselsearchviewPage),
    TranslateModule
  ],
  exports: [
    VesselsearchviewPage,
    TranslateModule
  ]
})
export class VesselsearchviewPageModule {}
