import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {
  GiGoFilter,
} from './gigofilter';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GiGoFilter,
  ],
  imports: [
    IonicPageModule.forChild(GiGoFilter),
    TranslateModule
  ],
  exports: [
    GiGoFilter,
    TranslateModule
  ]
})
export class GiGoFilterModule {}
