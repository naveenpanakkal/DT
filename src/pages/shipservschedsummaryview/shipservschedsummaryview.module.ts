import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipServSchedSummaryViewPage } from './shipservschedsummaryview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ShipServSchedSummaryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipServSchedSummaryViewPage),
    TranslateModule
  ],
  exports: [
    ShipServSchedSummaryViewPage,
    TranslateModule
  ]
})
export class ShipServSchedSummaryViewPageModule {}
