import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {YsrCcvComponent} from "./ysr-ccv";


@NgModule({
  declarations: [
    YsrCcvComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    YsrCcvComponent,
    TranslateModule
  ]
})
export class YsrCcvComponentModule {}
