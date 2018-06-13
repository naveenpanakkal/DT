import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipServSchedDetailViewPage } from './shipservscheddetailview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ShipServSchedDetailViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipServSchedDetailViewPage),
    TranslateModule
  ],
  exports: [
    ShipServSchedDetailViewPage,
    TranslateModule
  ]
})
export class ShipServSchedDetailViewPageModule {}
