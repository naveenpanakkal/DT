import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckhistoryPage } from './truckhistory';

@NgModule({
  declarations: [
    TruckhistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckhistoryPage),
  ],
  exports: [
    TruckhistoryPage
  ]
})
export class TruckhistoryPageModule {}
