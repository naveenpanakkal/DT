import {NgModule} from "@angular/core";
import {GIGOCancelContainerComponent} from "./gigo-cancel-container";
import { IonicModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    GIGOCancelContainerComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    GIGOCancelContainerComponent,
    TranslateModule
  ]
})
export class GigoCancelContainerComponentModule {}
