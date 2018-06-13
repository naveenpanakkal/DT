import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RBviewPage } from './rbview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBviewPage,
  ],
  imports: [
    IonicPageModule.forChild(RBviewPage),
    TranslateModule
  ],
  exports: [
    RBviewPage,
    TranslateModule
  ]
})
export class RBviewPageModule {}
