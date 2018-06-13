import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrucksearchdetailsPage } from './trucksearchdetails';

@NgModule({
  declarations: [
    TrucksearchdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TrucksearchdetailsPage),
  ],
  exports: [
    TrucksearchdetailsPage
  ]
})
export class TrucksearchdetailsPageModule {}
