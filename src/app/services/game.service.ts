import { EventEmitter, Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';

import { END_GAME, INIT_STATE, NEXT_STEP } from '../models/actions';
import { GameConfig } from '../models/game-config';
import { GameState } from '../models/game-state';

@Injectable()
export class GameService {

  private static readonly LS_GAME_CONFIG_KEY = 'gameConfig';

  private endGameEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private ngRedux: NgRedux<GameState>) {
  }

  startGame(config: GameConfig): Promise<any> {
    localStorage.setItem(GameService.LS_GAME_CONFIG_KEY, JSON.stringify(config));

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

  getCurrentConfig(): GameConfig {
    return new GameConfig(JSON.parse(localStorage.getItem(GameService.LS_GAME_CONFIG_KEY)));
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
      .take(config.gameDuration)
      .forEach(i => this.ngRedux.dispatch({ type: NEXT_STEP }));
  }
}
