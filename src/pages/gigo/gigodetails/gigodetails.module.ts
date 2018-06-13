import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiGoDetailsPage } from './gigodetails';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    GiGoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GiGoDetailsPage),
    TranslateModule
  ],
  exports: [
    GiGoDetailsPage,
    TranslateModule
  ]
})
export class GiGoDetailsPageModule {}
