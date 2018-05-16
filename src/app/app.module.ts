import { isDevMode, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { DevToolsExtension, NgRedux, NgReduxModule } from 'ng2-redux';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { DisplayGameStateComponent } from './display-game-state/display-game-state.component';
import { InitGameFormComponent } from './init-game-form/init-game-form.component';
import { MatComponentsModule } from './material/mat-components.module';
import { rootReducer } from './models/actions';
import { GameState, INITIAL_STATE } from './models/game-state';
import { GameService } from './services/game.service';
import { GameResultsComponent } from './game-results/game-results.component';


@NgModule({
  declarations: [
    AppComponent,
    InitGameFormComponent,
    DisplayGameStateComponent,
    GameResultsComponent
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
    MatComponentsModule
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
