import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RCHsearchresultPage } from './rchsearchresult';
import {TranslateModule} from "@ngx-translate/core";
import {DtEventsModule} from '../../../directives/dt-events/dt-events.module';

@NgModule({
  declarations: [
    RCHsearchresultPage,

  ],
  imports: [
    IonicPageModule.forChild(RCHsearchresultPage),
    TranslateModule,
    DtEventsModule
  ],
  exports: [
    RCHsearchresultPage,
    TranslateModule,

  ]
})
export class RCHsearchresultPageModule {}
