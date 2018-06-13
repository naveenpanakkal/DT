import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckdetailsPage } from './truckdetails';

@NgModule({
  declarations: [
    TruckdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckdetailsPage),
  ],
  exports: [
    TruckdetailsPage
  ]
})
export class TruckdetailsPageModule {}
