import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { DevToolsExtension, NgRedux, NgReduxModule } from 'ng2-redux';
import { CustomFormsModule } from 'ng2-validation';
import { AppComponent } from './app.component';
import { DisplayGameStateComponent } from './display-game-state/display-game-state.component';
import { GameResultsComponent } from './game-results/game-results.component';
import { I18nModule } from './i18n/i18n.module';
import { InitGameFormComponent } from './init-game-form/init-game-form.component';
import { MatComponentsModule } from './material/mat-components.module';
import { rootReducer } from './models/actions';
import { GameState, INITIAL_STATE } from './models/game-state';
import { GameService } from './services/game.service';
import { SidenavButtonComponent } from './sidenav-button/sidenav-button.component';
import { TutorialComponent } from './tutorial/tutorial.component';

@NgModule({
  declarations: [
    AppComponent,
    InitGameFormComponent,
    DisplayGameStateComponent,
    GameResultsComponent,
    TutorialComponent,
    SidenavButtonComponent
  ],
  entryComponents: [
    GameResultsComponent,
    TutorialComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgReduxModule,
    ChartsModule,
    MatComponentsModule,
    I18nModule
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