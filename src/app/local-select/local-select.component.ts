import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'local-select',
  templateUrl: './local-select.component.html',
  styleUrls: ['./local-select.component.css']
})
export class LocalSelectComponent implements OnInit {

  placeholder$: Observable<string>;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.localization();
  }

  onSelectChange(newLang: string) {
    this.translate.use(newLang);
  }

  private localization() {
    this.placeholder$ = this.translate.get('COMMON.SELECT_LANG');
  }
}
