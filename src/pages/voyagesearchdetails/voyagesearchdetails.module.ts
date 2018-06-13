import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyagesearchdetailsPage } from './voyagesearchdetails';

@NgModule({
  declarations: [
    VoyagesearchdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyagesearchdetailsPage),
  ],
  exports: [
    VoyagesearchdetailsPage
  ]
})
export class VoyagesearchdetailsPageModule {}
