import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaintabsPage } from './maintabs';

@NgModule({
  declarations: [
    MaintabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MaintabsPage),
  ],
  exports: [
    MaintabsPage
  ]
})
export class MaintabsPageModule {}
