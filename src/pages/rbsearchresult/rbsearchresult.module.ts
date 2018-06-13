import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RBsearchresultPage } from './rbsearchresult';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBsearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(RBsearchresultPage),
    TranslateModule
  ],
  exports: [
    RBsearchresultPage,
    TranslateModule
  ]
})
export class RBsearchresultPageModule {}
