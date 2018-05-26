import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nComponent } from '../i18n.component';

@Component({
  selector: 'local-select',
  templateUrl: './local-select.component.html',
  styleUrls: ['./local-select.component.css']
})
export class LocalSelectComponent {

  constructor(private translateService: TranslateService) { }

  onSelectChange(newLang: string) {
    this.translateService.use(newLang);
  }

  get langs(){
    return I18nComponent.DEFAULT_SUPPORTED_LANGS;
  }

  get currentLang() {
    return this.translateService.currentLang;
  }
}
