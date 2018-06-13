import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TahistoryPage } from './tahistory';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TahistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TahistoryPage),
    TranslateModule
  ],
  exports: [
    TahistoryPage,
    TranslateModule
  ]
})
export class TahistoryPageModule {}
