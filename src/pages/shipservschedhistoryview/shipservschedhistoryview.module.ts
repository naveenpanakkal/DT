import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipServSchedHistoryViewPage } from './shipservschedhistoryview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ShipServSchedHistoryViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipServSchedHistoryViewPage),
    TranslateModule
  ],
  exports: [
    ShipServSchedHistoryViewPage,
    TranslateModule
  ]
})
export class ShipServSchedHistoryViewPageModule {}
