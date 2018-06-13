import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {CADamageModelComponent} from "./cadamagemodel";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    CADamageModelComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    CADamageModelComponent,
    TranslateModule
  ]
})
export class CADamageModelComponentModule {}
