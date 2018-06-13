import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {YsrMailComponent} from "./ysr-mail";


@NgModule({
  declarations: [
    YsrMailComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    YsrMailComponent,
    TranslateModule
  ]
})
export class YsrMailComponentModule {}
