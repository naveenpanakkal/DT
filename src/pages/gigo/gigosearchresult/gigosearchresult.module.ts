import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GiGoSearchResultPage } from './gigosearchresult';
import {TranslateModule} from "@ngx-translate/core";
import {DtEventsModule} from "../../../directives/dt-events/dt-events.module";

@NgModule({
  declarations: [
    GiGoSearchResultPage,
  ],
  imports: [
    IonicPageModule.forChild(GiGoSearchResultPage),
    TranslateModule,
    DtEventsModule
  ],
  exports: [
    GiGoSearchResultPage,
    TranslateModule
  ]
})
export class GiGoSearchResultPageModule {}
