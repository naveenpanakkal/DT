import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VesselHistoryPage } from './vesselhistory';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselHistoryPage),
    TranslateModule
  ],
  exports: [
    VesselHistoryPage,
    TranslateModule
  ]
})
export class HistoryPageModule {}
