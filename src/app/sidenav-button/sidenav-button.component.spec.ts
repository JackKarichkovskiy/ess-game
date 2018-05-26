import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MatComponentsModule } from '../material/mat-components.module';
import { SidenavButtonComponent } from './sidenav-button.component';
import { MatDrawer } from '@angular/material';

class MatDrawerStub {

  opened = true;
  
  toggle(){
  }
}

describe('SidenavButtonComponent', () => {
  let component: SidenavButtonComponent;
  let fixture: ComponentFixture<SidenavButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavButtonComponent],
      imports: [MatComponentsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavButtonComponent);
    component = fixture.componentInstance;
    component.for = new MatDrawerStub() as MatDrawer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
