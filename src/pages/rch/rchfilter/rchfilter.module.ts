import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {RCHFilter} from './rchfilter';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RCHFilter
  ],
  imports: [
    IonicPageModule.forChild(RCHFilter),
    TranslateModule
  ],
  exports: [
    RCHFilter,
    TranslateModule
  ]
})
export class RCHFilterModule {}
