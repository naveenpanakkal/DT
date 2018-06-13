import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CshHistoryPage } from './cshhistory';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    CshHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CshHistoryPage),
    TranslateModule
  ],
  exports: [
    CshHistoryPage,
    TranslateModule
  ]
})
export class CshHistoryPageModule {}
