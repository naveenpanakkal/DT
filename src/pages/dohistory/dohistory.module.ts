import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DohistoryPage } from './dohistory';

@NgModule({
  declarations: [
    DohistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DohistoryPage),
  ],
  exports: [
    DohistoryPage
  ]
})
export class DohistoryPageModule {}
