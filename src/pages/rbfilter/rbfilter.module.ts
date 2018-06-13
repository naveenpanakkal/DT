import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RBfilterPage } from './rbfilter';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBfilterPage,
  ],
  imports: [
    IonicPageModule.forChild(RBfilterPage),
    TranslateModule
  ],
  exports: [
    RBfilterPage,
    TranslateModule
  ]
})
export class RBfilterPageModule {}
