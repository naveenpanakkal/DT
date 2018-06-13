import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrSelectRotationModel} from "./select-rotation-model";


@NgModule({
  declarations: [
    SsrSelectRotationModel,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    SsrSelectRotationModel,
    TranslateModule
  ]
})
export class SsrSelectRotationModelModule {}
