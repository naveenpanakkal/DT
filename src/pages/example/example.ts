import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import { LanguageProvider } from '../../providers/language/language';
import {Utils} from "../../shared/utils";

@Component({
  selector: 'page-example',
  templateUrl: 'example.html',
  providers: [Utils]
})


export class ExamplePage {
  langselected:any;
items = [];
   constructor(private translate: TranslateService, public lang: LanguageProvider,public utils:Utils) {
        translate.addLangs(["en", "fr"]);
        translate.setDefaultLang('en');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

         for (let i = 0; i < 30; i++) {
      this.items.push( i );
    }
    }


doInfinite(): Promise<any> {
    console.log('Begin async operation');

    return new Promise((resolve) => {
      setTimeout(() => {
        for (var i = 0; i < 30; i++) {
          this.items.push( this.items.length );
        }

        console.log('Async operation has ended');
        resolve();
      }, 500);
    })
  }


    abc(){
      this.translate.use(this.langselected)
        console.log(this.langselected);
        this.lang.language = this.langselected;
    }

}
