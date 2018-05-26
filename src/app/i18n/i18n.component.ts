import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './lang';

@Component({
  selector: 'i18n',
  template: '',
  styleUrls: ['./i18n.component.css']
})
export class I18nComponent {

  private static readonly DEFAULT_LANG: Language = {
    name: 'en',
    bundleKey: 'LANG.EN',
    iconPath: 'assets/images/flag-united-kingdom.png'
  };
  static readonly DEFAULT_SUPPORTED_LANGS = [
    I18nComponent.DEFAULT_LANG,
    {
      name: 'ru',
      bundleKey: 'LANG.RU',
      iconPath: 'assets/images/flag-russia.png'
    }
  ];

  constructor(translate: TranslateService) {
    this.translateConfig(translate);
  }

  private translateConfig(translate: TranslateService) {
    let langNames = I18nComponent.DEFAULT_SUPPORTED_LANGS.map(lang => lang.name);
    translate.addLangs(langNames);
    translate.setDefaultLang(I18nComponent.DEFAULT_LANG.name);

    const browserLang = translate.getBrowserLang();
    translate.use(langNames.includes(browserLang)
      ? browserLang
      : I18nComponent.DEFAULT_LANG.name);
  }
}
