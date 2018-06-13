import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {DamageDetailsViewContainerComponent} from "./damagedetailsview";

@NgModule({
  declarations: [
    DamageDetailsViewContainerComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    DamageDetailsViewContainerComponent,
    TranslateModule
  ]
})
export class DamageDetailsViewContainerComponentModule {}
