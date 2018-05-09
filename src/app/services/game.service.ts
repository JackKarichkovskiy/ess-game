import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/concat';

import { END_GAME, INIT_STATE, NEXT_STEP } from '../models/actions';
import { GameConfig } from '../models/game-config';
import { GameState } from '../models/game-state';

@Injectable()
export class GameService {

  constructor(private ngRedux: NgRedux<GameState>) { }

  startGame(config: GameConfig): Promise<any> {
    let init = new Observable(observer => {
      this.ngRedux.dispatch({ type: INIT_STATE, config: config });
      observer.complete();
    });

    let delay = config.animationSpeed;
    let nextSteps = Observable.timer(delay, delay)
      .map(i => {
        this.ngRedux.dispatch({ type: NEXT_STEP });
        return i;
      })
      .take(GameConfig.DEFAULT_GAME_DURATION);

    let endGame = new Observable(observer => {
      this.ngRedux.dispatch({ type: END_GAME });
      observer.complete();
    });

    return init.concat(nextSteps).concat(endGame).toPromise();
  }
}
