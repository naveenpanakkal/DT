import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipServSchedSearchFilterPage } from './shipservschedsearchfilter';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ShipServSchedSearchFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipServSchedSearchFilterPage),
    TranslateModule
  ],
  exports: [
    ShipServSchedSearchFilterPage,
    TranslateModule
  ]
})
export class ShipServSchedSearchFilterPageModule {}
