import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RBcreatePage } from './rbcreate';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBcreatePage,
  ],
  imports: [
    IonicPageModule.forChild(RBcreatePage),
    TranslateModule
  ],
  exports: [
    RBcreatePage,
    TranslateModule
  ]
})
export class RBcreatePageModule {}
