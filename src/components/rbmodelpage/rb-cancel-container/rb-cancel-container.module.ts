import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { RBCancelContainerComponent } from './rb-cancel-container';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    RBCancelContainerComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    RBCancelContainerComponent,
    TranslateModule
  ]
})
export class RbCancelContainerComponentModule {}
