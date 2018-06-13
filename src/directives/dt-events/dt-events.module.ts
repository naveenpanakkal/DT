import { NgModule } from '@angular/core';
import {DtEventsDirective} from "./dt-events";
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
@NgModule({
  declarations: [
    DtEventsDirective
  ],
  imports: [
  ],
  exports: [
    DtEventsDirective
  ]
})
export class DtEventsModule {}


export class CustomHammerConfig extends HammerGestureConfig {
  overrides = {
    'press': { time: 6000 }  //set press delay for 6 second
  }
}

