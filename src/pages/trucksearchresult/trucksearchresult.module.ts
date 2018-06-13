import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TruckSearchResultsPage } from './trucksearchresult';

@NgModule({
  declarations: [
    TruckSearchResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(TruckSearchResultsPage),
  ],
  exports: [
    TruckSearchResultsPage
  ]
})
export class TrucksearchresultPageModule {}
