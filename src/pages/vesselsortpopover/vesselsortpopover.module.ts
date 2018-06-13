import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VesselSortPopoverPage } from './vesselsortpopover';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselSortPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselSortPopoverPage),
    TranslateModule
  ],
  exports: [
    VesselSortPopoverPage,
    TranslateModule
  ]
})
export class FilterpopoverPageModule {}
