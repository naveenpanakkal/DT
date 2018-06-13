import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VesselViewPage } from './vesselview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselViewPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselViewPage),
    TranslateModule
  ],
  exports: [
    VesselViewPage,
    TranslateModule
  ]
})
export class VesselViewPageModule {}
