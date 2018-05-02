import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitGameFormComponent } from './init-game-form.component';
import { FormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components.module';
import { CustomFormsModule } from 'ng2-validation';
import { GameService } from '../services/game.service';

describe('InitGameFormComponent', () => {
  let component: InitGameFormComponent;
  let fixture: ComponentFixture<InitGameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatComponentsModule, CustomFormsModule],
      declarations: [ InitGameFormComponent ],
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
