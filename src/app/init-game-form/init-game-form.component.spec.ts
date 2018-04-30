import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitGameFormComponent } from './init-game-form.component';

describe('InitGameFormComponent', () => {
  let component: InitGameFormComponent;
  let fixture: ComponentFixture<InitGameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitGameFormComponent ]
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
