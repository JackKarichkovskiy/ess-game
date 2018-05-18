import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';

@Component({
  selector: 'local-select',
  templateUrl: './local-select.component.html',
  styleUrls: ['./local-select.component.css']
})
export class LocalSelectComponent implements OnInit {

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
  }

  onSelectChange(newLang: string) {
    this.translateService.use(newLang);
  }

  get langs(){
    return AppComponent.DEFAULT_SUPPORTED_LANGS;
  }

  get currentLang() {
    return this.translateService.currentLang;
  }
}
