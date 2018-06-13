import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExecuteactionPage } from './executeaction';
import {Utils} from "../../shared/utils";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ExecuteactionPage,
  ],
  imports: [
    IonicPageModule.forChild(ExecuteactionPage),
    TranslateModule
  ],
  exports: [
    ExecuteactionPage,
    TranslateModule
  ]
})
export class ExecuteactionPageModule {}
