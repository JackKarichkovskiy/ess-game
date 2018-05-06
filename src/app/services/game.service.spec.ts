import { TestBed, inject } from '@angular/core/testing';
import { GameService } from './game.service';
import { NgReduxModule } from 'ng2-redux';


describe('GameServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgReduxModule],
      providers: [GameService]
    });
  });

  it('should be created', inject([GameService], (service: GameService) => {
    expect(service).toBeTruthy();
  }));
});
