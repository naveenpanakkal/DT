import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoaddischargesortComponent } from './loaddischargesort';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    LoaddischargesortComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    LoaddischargesortComponent,
    TranslateModule
  ]
})
export class LoaddischargesortComponentModule {}
