import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {GenericAddContainerComponent} from "./generic-add-container";

@NgModule({
  declarations: [
    GenericAddContainerComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    GenericAddContainerComponent,
    TranslateModule
  ]
})
export class GenericAddContainerComponentModule {}
