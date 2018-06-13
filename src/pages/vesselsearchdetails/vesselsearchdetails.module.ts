import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VesselsearchdetailsPage } from './vesselsearchdetails';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    VesselsearchdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VesselsearchdetailsPage),
    TranslateModule
  ],
  exports: [
    VesselsearchdetailsPage,
    TranslateModule
  ]
})
export class VesselsearchdetailsPageModule {}
