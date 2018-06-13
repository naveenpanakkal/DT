import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VoyagesortpopoverPage } from './voyagesortpopover';

@NgModule({
  declarations: [
    VoyagesortpopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(VoyagesortpopoverPage),
  ],
  exports: [
    VoyagesortpopoverPage
  ]
})
export class VoyagesortpopoverPageModule {}
