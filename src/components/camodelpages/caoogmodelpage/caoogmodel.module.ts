import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {CAOOGModelComponent} from "./caoogmodel";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    CAOOGModelComponent
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    CAOOGModelComponent,
    TranslateModule
  ]
})
export class CAOOGModelComponentModule {}
