import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {CAIMGDModelComponent} from "./caimdgmodel";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    CAIMGDModelComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    CAIMGDModelComponent,
    TranslateModule
  ]
})
export class CAIMGDModelComponentModule {}
