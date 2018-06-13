import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TasortPage } from './tasort';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TasortPage,
  ],
  imports: [
    IonicPageModule.forChild(TasortPage),
    TranslateModule
  ],
  exports: [
    TasortPage,
    TranslateModule
  ]
})
export class TasortPageModule {}
