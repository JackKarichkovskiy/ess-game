import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayGameStateComponent } from './display-game-state.component';
import { ChartsModule } from 'ng2-charts';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { GameState, rootReducer } from '../models/game-state';

xdescribe('DisplayGameStateComponent', () => {
  let component: DisplayGameStateComponent;
  let fixture: ComponentFixture<DisplayGameStateComponent>;

  // let reduxFactory = () => {
  //   let ngRedux = new NgRedux<GameState>(null);
  //   ngRedux.configureStore(rootReducer, undefined);
  //   return ngRedux;
  // };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        NgReduxModule
      ],
      declarations: [
        DisplayGameStateComponent,
        // { provide: NgRedux, useFactory: reduxFactory },
      ]
    })
      .compileComponents();
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
