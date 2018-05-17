import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private static readonly DEFAULT_LANG = 'en';
  private static readonly DEFAULT_SUPPORTED_LANGS = [AppComponent.DEFAULT_LANG, 'ru'];

  constructor(translate: TranslateService) {
    this.translateConfig(translate);
  }

  private translateConfig(translate: TranslateService) {
    translate.addLangs(AppComponent.DEFAULT_SUPPORTED_LANGS);
    translate.setDefaultLang(AppComponent.DEFAULT_LANG);

    const browserLang = translate.getBrowserLang();
    translate.use(AppComponent.DEFAULT_SUPPORTED_LANGS.includes(browserLang)
      ? browserLang
      : AppComponent.DEFAULT_LANG);
  }
}
