import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckfilterpopoverPage } from './truckfilterpopover';

@NgModule({
  declarations: [
    TruckfilterpopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckfilterpopoverPage),
  ],
  exports: [
    TruckfilterpopoverPage
  ]
})
export class TruckfilterpopoverPageModule {}
