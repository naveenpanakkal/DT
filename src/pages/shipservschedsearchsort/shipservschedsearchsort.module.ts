import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShipServSchedSearchSortPage } from './shipservschedsearchsort';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ShipServSchedSearchSortPage,
  ],
  imports: [
    IonicPageModule.forChild(ShipServSchedSearchSortPage),
    TranslateModule
  ],
  exports: [
    ShipServSchedSearchSortPage,
    TranslateModule
  ]
})
export class ShipServSchedSearchSortPageModule {}
