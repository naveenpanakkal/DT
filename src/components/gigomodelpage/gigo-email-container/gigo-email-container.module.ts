import {NgModule} from "@angular/core";
import { IonicModule} from "ionic-angular";
import {TranslateModule} from "@ngx-translate/core";
import {GigoEmailContainerComponent} from "./gigo-email-container";


@NgModule({
  declarations: [
    GigoEmailContainerComponent,
  ],
  imports: [
    IonicModule,
    TranslateModule
  ],
  exports: [
    GigoEmailContainerComponent,
    TranslateModule
  ]
})
export class GigoEmailContainerComponentModule {}
