import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrCostComponent} from "./ssr-cost";


@NgModule({
  declarations: [
    SsrCostComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    SsrCostComponent,
    TranslateModule
  ]
})
export class SsrCostComponentModule {}
