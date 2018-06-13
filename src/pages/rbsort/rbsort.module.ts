import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RBsortPage } from './rbsort';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBsortPage,
  ],
  imports: [
    IonicPageModule.forChild(RBsortPage),
    TranslateModule
  ],
  exports: [
    RBsortPage,
    TranslateModule
  ]
})
export class RBsortPageModule {}
