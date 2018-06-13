import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyagedetailsPage } from './voyagedetails';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VoyagedetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyagedetailsPage),
    TranslateModule
  ],
  exports: [
    VoyagedetailsPage,
    TranslateModule
  ]
})
export class VoyagedetailsPageModule {}
