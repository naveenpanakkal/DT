import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DosearchPage } from './dosearch';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    DosearchPage,
  ],
  imports: [
    IonicPageModule.forChild(DosearchPage),
    TranslateModule
  ],
  exports: [
    DosearchPage,
    TranslateModule
  ]
})
export class DosearchPageModule {}
