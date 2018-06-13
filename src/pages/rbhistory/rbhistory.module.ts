import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RBhistoryPage } from './rbhistory';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBhistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RBhistoryPage),
    TranslateModule
  ],
  exports: [
    RBhistoryPage,
    TranslateModule
  ]
})
export class RBhistoryPageModule {}
