import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultsComponent } from './game-results.component';
import { MatComponentsModule } from '../material/mat-components.module';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GameStatistic } from '../models/game-statistic';

describe('GameResultsComponent', () => {
  let component: GameResultsComponent;
  let fixture: ComponentFixture<GameResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatComponentsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: new GameStatistic()}
      ],
      declarations: [GameResultsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
