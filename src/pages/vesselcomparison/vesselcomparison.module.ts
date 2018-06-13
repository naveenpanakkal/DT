import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VesselComparisonPage } from './vesselcomparison';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselComparisonPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselComparisonPage),
    TranslateModule
  ],
  exports: [
    VesselComparisonPage,
    TranslateModule
  ]
})
export class VesselcomparisonPageModule {}
