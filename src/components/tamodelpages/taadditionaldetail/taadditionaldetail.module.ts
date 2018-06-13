import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TaadditionaldetailComponent } from './taadditionaldetail';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    TaadditionaldetailComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    TaadditionaldetailComponent,
    TranslateModule
  ]
})
export class TaadditionaldetailComponentModule {}
