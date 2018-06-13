import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InformationWithHeaderModalComponent } from './informationWithHeaderModal';

@NgModule({
  declarations: [
    InformationWithHeaderModalComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    InformationWithHeaderModalComponent
  ]
})
export class InformationWithHeaderModalComponentModule {}
