import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckComparisonPage } from './truckcomparison';

@NgModule({
  declarations: [
    TruckComparisonPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckComparisonPage),
  ],
  exports: [
    TruckComparisonPage
  ]
})
export class TruckcomparisonPageModule {}
