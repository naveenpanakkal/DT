import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CahistoryPage } from './cahistory';

@NgModule({
  declarations: [
    CahistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CahistoryPage),
  ],
  exports: [
    CahistoryPage
  ]
})
export class CahistoryPageModule {}
