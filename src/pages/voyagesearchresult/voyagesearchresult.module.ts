import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyagesearchresultPage } from './voyagesearchresult';

@NgModule({
  declarations: [
    VoyagesearchresultPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyagesearchresultPage),
  ],
  exports: [
    VoyagesearchresultPage
  ]
})
export class VoyagesearchresultPageModule {}
