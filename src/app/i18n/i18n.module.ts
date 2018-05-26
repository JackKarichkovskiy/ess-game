import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nComponent } from './i18n.component';
import { LocalSelectComponent } from './local-select/local-select.component';

@NgModule({
  declarations: [
    LocalSelectComponent,
    I18nComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    LocalSelectComponent,
    I18nComponent,
    TranslateModule
  ],
  bootstrap: [
    I18nComponent
  ]
})
export class I18nModule { }

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/');
}