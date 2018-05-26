import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material';
import { I18nModule } from '../i18n/i18n.module';
import { MatComponentsModule } from '../material/mat-components.module';
import { GameStatistic } from '../models/game-statistic';
import { GameResultsComponent } from './game-results.component';

describe('GameResultsComponent', () => {
  let component: GameResultsComponent;
  let fixture: ComponentFixture<GameResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatComponentsModule,
        I18nModule
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: new GameStatistic() }
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
