import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TaAddQuantityComponent } from './ta-add-quantity';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TaAddQuantityComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    TaAddQuantityComponent,
    TranslateModule
  ]
})
export class TaAddQuantityComponentModule {}
