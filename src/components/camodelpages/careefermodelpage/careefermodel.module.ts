import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {CAReeferModelComponent} from "./careefermodel";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    CAReeferModelComponent
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    CAReeferModelComponent,
    TranslateModule
  ]
})
export class CAReeferModelComponentModule {}
