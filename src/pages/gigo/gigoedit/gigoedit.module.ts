import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiGoEditPage } from './gigoedit';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GiGoEditPage,
  ],
  imports: [
    IonicPageModule.forChild(GiGoEditPage),
    TranslateModule
  ],
  exports: [
    GiGoEditPage,
    TranslateModule
  ]
})
export class GiGoEditPageModule {}
