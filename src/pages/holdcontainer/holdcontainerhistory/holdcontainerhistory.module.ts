import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HChistoryPage } from './holdcontainerhistory';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HChistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(HChistoryPage),
    TranslateModule
  ],
  exports: [
    HChistoryPage,
    TranslateModule
  ]
})
export class HChistoryPageModule {}

