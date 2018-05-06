import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { NgRedux, NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { InitGameFormComponent } from './init-game-form/init-game-form.component';
import { GameService } from './services/game.service';
import { MatComponentsModule } from './material/mat-components.module';
import { DisplayGameStateComponent } from './display-game-state/display-game-state.component';
import { GameState, rootReducer, INITIAL_STATE } from './models/game-state';


@NgModule({
  declarations: [
    AppComponent,
    InitGameFormComponent,
    DisplayGameStateComponent
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
