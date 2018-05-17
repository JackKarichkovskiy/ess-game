import { HttpClient, HttpClientModule } from '@angular/common/http';
import { isDevMode, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChartsModule } from 'ng2-charts';
import { DevToolsExtension, NgRedux, NgReduxModule } from 'ng2-redux';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { DisplayGameStateComponent } from './display-game-state/display-game-state.component';
import { GameResultsComponent } from './game-results/game-results.component';
import { InitGameFormComponent } from './init-game-form/init-game-form.component';
import { MatComponentsModule } from './material/mat-components.module';
import { rootReducer } from './models/actions';
import { GameState, INITIAL_STATE } from './models/game-state';
import { GameService } from './services/game.service';
import { LocalSelectComponent } from './local-select/local-select.component';


@NgModule({
  declarations: [
    AppComponent,
    InitGameFormComponent,
    DisplayGameStateComponent,
    GameResultsComponent,
    LocalSelectComponent
  ],
  entryComponents: [
    GameResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgReduxModule,
    ChartsModule,
    MatComponentsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<GameState>, devTools: DevToolsExtension) {
    var enhancers = isDevMode() ? [devTools.enhancer()] : [];
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancers);
  }
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}