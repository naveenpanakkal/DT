import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {GiGosortPage} from "./gigosort";

@NgModule({
  declarations: [
    GiGosortPage,
  ],
  imports: [
    IonicPageModule.forChild(GiGosortPage),
    TranslateModule
  ],
  exports: [
    GiGosortPage,
    TranslateModule
  ]
})
export class GiGosortPageModule {}
