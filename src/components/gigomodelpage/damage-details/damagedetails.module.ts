import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {DamageDetailsComponent} from "./damagedetails";

import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    DamageDetailsComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    DamageDetailsComponent,
    TranslateModule
  ]
})
export class DamageDetailsComponentModule {}
