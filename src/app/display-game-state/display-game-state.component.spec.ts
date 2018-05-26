import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGameStateComponent } from './display-game-state.component';
import { ChartsModule } from 'ng2-charts';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { GameState, INITIAL_STATE } from '../models/game-state';
import { I18nModule } from '../i18n/i18n.module';
import { MatComponentsModule } from '../material/mat-components.module';
import { GameService } from '../services/game.service';
import { Unsubscribe } from 'redux';
import { Subscription } from 'rxjs';
import { rootReducer } from '../models/actions';

describe('DisplayGameStateComponent', () => {
  let component: DisplayGameStateComponent;
  let fixture: ComponentFixture<DisplayGameStateComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        MatComponentsModule,
        ChartsModule,
        NgReduxModule,
        I18nModule
      ],
      declarations: [
        DisplayGameStateComponent
      ],
      providers: [
        GameService
      ]
    })
      .compileComponents();
    let ngRedux: NgRedux<GameState> = TestBed.get(NgRedux);
    ngRedux.configureStore(rootReducer, INITIAL_STATE, [], []);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayGameStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
