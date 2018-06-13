import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VesselFilterPopoverPage } from './vesselfilterpopover';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselFilterPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselFilterPopoverPage),
    TranslateModule
  ],
  exports: [
    VesselFilterPopoverPage,
    TranslateModule
  ]
})
export class VesselFilterPopoverPageModule {}
