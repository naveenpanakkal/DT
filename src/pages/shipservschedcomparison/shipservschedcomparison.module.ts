import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {ShipServiceComparisonPage} from "./shipservschedcomparison";

@NgModule({
  declarations: [
    ShipServiceComparisonPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipServiceComparisonPage),
    TranslateModule
  ],
  exports: [
    ShipServiceComparisonPage,
    TranslateModule
  ]
})
export class ShipServiceComparisonPageModule {}
