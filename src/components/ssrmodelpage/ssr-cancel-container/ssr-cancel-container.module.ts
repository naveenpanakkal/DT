import {NgModule} from "@angular/core";
import { IonicModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {SsrCancelContainerComponent} from "./ssr-cancel-container";


@NgModule({
  declarations: [
    SsrCancelContainerComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    SsrCancelContainerComponent,
    TranslateModule
  ]
})
export class SsrCancelContainerComponentModule {}
