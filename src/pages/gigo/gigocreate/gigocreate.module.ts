import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiGoCreatePage } from './gigocreate';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GiGoCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(GiGoCreatePage),
    TranslateModule
  ],
  exports: [
    GiGoCreatePage,
    TranslateModule
  ]
})
export class GiGoCreatePageModule {}
