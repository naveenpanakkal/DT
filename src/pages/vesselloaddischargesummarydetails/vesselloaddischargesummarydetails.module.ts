import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VesselloaddischargesummarydetailsPage } from './vesselloaddischargesummarydetails';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselloaddischargesummarydetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselloaddischargesummarydetailsPage),
    TranslateModule
  ],
  exports: [
    VesselloaddischargesummarydetailsPage,
    TranslateModule
  ]
})
export class VesselloaddischargesummarydetailsPageModule {}
