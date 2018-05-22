import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { MatComponentsModule } from '../material/mat-components.module';
import { TutorialComponent } from './tutorial.component';

describe('TutorialComponent', () => {
  let component: TutorialComponent;
  let fixture: ComponentFixture<TutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatComponentsModule,
        TranslateModule.forRoot({
        })
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceStub }
      ],
      declarations: [TutorialComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class TranslateServiceStub extends TranslateService {

  get(key: any): any {
    return Observable.of(key);
  }

}