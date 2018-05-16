import { TestBed, inject } from '@angular/core/testing';
import { GameService } from './game.service';
import { NgReduxModule } from 'ng2-redux';
import { MatDialogModule } from '@angular/material';


describe('GameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgReduxModule, MatDialogModule],
      providers: [GameService]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
});
