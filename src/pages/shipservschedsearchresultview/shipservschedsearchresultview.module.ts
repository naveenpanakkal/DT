import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipServSchedSearchResultViewPage } from './shipservschedsearchresultview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ShipServSchedSearchResultViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipServSchedSearchResultViewPage),
    TranslateModule
  ],
  exports: [
    ShipServSchedSearchResultViewPage,
    TranslateModule
  ]
})
export class ShipServSchedSearchResultViewPageModule {}
