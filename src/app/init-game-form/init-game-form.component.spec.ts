import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitGameFormComponent } from './init-game-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { GameService } from '../services/game.service';
import { MatComponentsModule } from '../material/mat-components.module';
import { NgReduxModule, NgRedux } from 'ng2-redux';

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
        NgReduxModule
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
