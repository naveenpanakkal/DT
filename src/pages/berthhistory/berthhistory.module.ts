import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerthhistoryPage } from './berthhistory';

@NgModule({
  declarations: [
    BerthhistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(BerthhistoryPage),
  ],
  exports: [
    BerthhistoryPage
  ]
})
export class BerthhistoryPageModule {}
