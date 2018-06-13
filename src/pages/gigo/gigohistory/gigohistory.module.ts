import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {GigoHistoryPage} from "./gigohistory";

@NgModule({
  declarations: [
    GigoHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(GigoHistoryPage),
    TranslateModule
  ],
  exports: [
    GigoHistoryPage,
    TranslateModule
  ]
})
export class GigoHistoryPageModule {}
