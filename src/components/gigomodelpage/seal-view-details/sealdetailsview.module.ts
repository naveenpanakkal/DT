import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import {TranslateModule} from "@ngx-translate/core";
import {SealDetailsViewContainerComponent} from "./sealdetailsview";

@NgModule({
  declarations: [
    SealDetailsViewContainerComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    SealDetailsViewContainerComponent,
    TranslateModule
  ]
})
export class SealDetailsViewContainerComponentModule {}
