import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrucksearchPage } from './trucksearch';

@NgModule({
  declarations: [
    TrucksearchPage,
  ],
  imports: [
    IonicPageModule.forChild(TrucksearchPage),
  ],
  exports: [
    TrucksearchPage
  ]
})
export class TrucksearchPageModule {}
