import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SsrAddContainerModel} from "./ssr-add-container-model";

@NgModule({
  declarations: [
    SsrAddContainerModel,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    SsrAddContainerModel,
    TranslateModule
  ]
})
export class SsrAddContainerModelModule {}
