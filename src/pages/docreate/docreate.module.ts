import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocreatePage } from './docreate';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    DocreatePage,
  ],
  imports: [
    IonicPageModule.forChild(DocreatePage),
    TranslateModule
  ],
  exports: [
    DocreatePage,
    TranslateModule
  ]
})
export class DocreatePageModule {}
