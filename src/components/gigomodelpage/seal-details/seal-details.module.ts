import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {SealDetailsComponent} from "./seal-details";

import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    SealDetailsComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    SealDetailsComponent,
    TranslateModule
  ]
})
export class SealDetailsComponentModule {}
