import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {YsrPdfComponent} from "./ysr-pdf";


@NgModule({
  declarations: [
    YsrPdfComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    YsrPdfComponent,
    TranslateModule
  ]
})
export class YsrPdfComponentModule {}
