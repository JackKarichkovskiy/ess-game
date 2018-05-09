import { Injectable, EventEmitter } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/concat';

import { END_GAME, INIT_STATE, NEXT_STEP } from '../models/actions';
import { GameConfig } from '../models/game-config';
import { GameState } from '../models/game-state';

@Injectable()
export class GameService {

  private endGameEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private ngRedux: NgRedux<GameState>) {
  }

  startGame(config: GameConfig): Promise<any> {
    return this.prepareInit(config)
      .concat(this.prepareNextSteps(config))
      .concat(this.endGame())
      .toPromise();
  }

  endGame(): Observable<any> {
    return new Observable(observer => {
      this.ngRedux.dispatch({ type: END_GAME });
      observer.complete();
    });
  }

  stopGame() {
    this.endGameEmitter.emit(true);
  }

  private prepareInit(config: GameConfig): Observable<any> {
    return new Observable(observer => {
      this.ngRedux.dispatch({ type: INIT_STATE, config: config });
      observer.complete();
    });
  }

  private prepareNextSteps(config: GameConfig): Promise<any> {
    let delay = config.animationSpeed;
    return Observable.timer(delay, delay)
      .takeUntil(this.endGameEmitter)
      .take(GameConfig.DEFAULT_GAME_DURATION)
      .forEach(i => this.ngRedux.dispatch({ type: NEXT_STEP }));
  }
}
