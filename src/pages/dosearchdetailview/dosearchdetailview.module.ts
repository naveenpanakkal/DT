import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DosearchdetailviewPage } from './dosearchdetailview';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    DosearchdetailviewPage,
  ],
  imports: [
    IonicPageModule.forChild(DosearchdetailviewPage),
    TranslateModule
  ],
  exports: [
    DosearchdetailviewPage,
    TranslateModule
  ]
})
export class DosearchdetailviewPageModule {}
