import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './models/lang';
import { MatDialog } from '@angular/material';
import { TutorialComponent } from './tutorial/tutorial.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private static readonly LS_NOT_FIRST_ENTRY_KEY = 'notFirstEntry';

  private static readonly DEFAULT_LANG: Language = {
    name: 'en',
    bundleKey: 'LANG.EN',
    iconPath: 'assets/images/flag-united-kingdom.png'
  };
  static readonly DEFAULT_SUPPORTED_LANGS = [
    AppComponent.DEFAULT_LANG,
    {
      name: 'ru',
      bundleKey: 'LANG.RU',
      iconPath: 'assets/images/flag-russia.png'
    }
  ];

  initFormPanelOpened = true;

  constructor(private dialog: MatDialog, translate: TranslateService) {
    this.translateConfig(translate);
    this.openTutorialIfNeeded();
  }

  openTutorial() {
    this.dialog.open(TutorialComponent, {
      width: '800px',
      position: {
        top: '150px'
      }
    });
  }

  private openTutorialIfNeeded() {
    let notFirstEntry = !!localStorage.getItem(AppComponent.LS_NOT_FIRST_ENTRY_KEY);
    if (notFirstEntry) return;

    this.openTutorial();
    localStorage.setItem(AppComponent.LS_NOT_FIRST_ENTRY_KEY, String(true));
  }

  private translateConfig(translate: TranslateService) {
    let langNames = AppComponent.DEFAULT_SUPPORTED_LANGS.map(lang => lang.name);
    translate.addLangs(langNames);
    translate.setDefaultLang(AppComponent.DEFAULT_LANG.name);

    const browserLang = translate.getBrowserLang();
    translate.use(langNames.includes(browserLang)
      ? browserLang
      : AppComponent.DEFAULT_LANG.name);
  }
}
