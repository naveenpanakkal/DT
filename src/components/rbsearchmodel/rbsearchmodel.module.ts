import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RBSearchModelComponent } from './rbsearchmodel';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBSearchModelComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    RBSearchModelComponent,
    TranslateModule
  ]
})
export class RBSearchModelComponentModule {}
