import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

describe('AppComponent', () => {
});

export class TranslateServiceStub extends TranslateService {

    get(key: any): any {
        return Observable.of(key);
    }

    addLangs(langs) {
    }

    setDefaultLang(lang) {
    }

    getBrowserLang() {
        return '';
    }

    use(lang) {
        return Observable.of(null);
    }
}