import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { CustomFormsModule } from 'ng2-validation';
import { I18nModule } from '../i18n/i18n.module';
import { MatComponentsModule } from '../material/mat-components.module';
import { GameService } from '../services/game.service';
import { InitGameFormComponent } from './init-game-form.component';

describe('InitGameFormComponent', () => {
  let component: InitGameFormComponent;
  let fixture: ComponentFixture<InitGameFormComponent>;

  beforeEach(async(() => {
    const ngRedux: NgRedux<{}> = new NgRedux(null);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatComponentsModule,
        CustomFormsModule,
        ReactiveFormsModule,
        NgReduxModule,
        I18nModule
      ],
      declarations: [InitGameFormComponent],
      providers: [GameService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitGameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
