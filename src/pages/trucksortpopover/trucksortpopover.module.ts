import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckSortpopoverPage } from './trucksortpopover';

@NgModule({
  declarations: [
    TruckSortpopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckSortpopoverPage),
  ],
  exports: [
    TruckSortpopoverPage
  ]
})
export class TrucksortpopoverPageModule { }
