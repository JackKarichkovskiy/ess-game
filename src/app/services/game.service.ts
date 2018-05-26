import { EventEmitter, Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';

import { END_GAME, INIT_STATE, NEXT_STEP } from '../models/actions';
import { GameConfig } from '../models/game-config';
import { GameState } from '../models/game-state';
import { GameStatistic } from '../models/game-statistic';
import { MatDialog } from '@angular/material';
import { GameResultsComponent } from '../game-results/game-results.component';

@Injectable()
export class GameService {

  private static readonly LS_GAME_CONFIG_KEY = 'gameConfig';

  private endGameEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor(private ngRedux: NgRedux<GameState>, private dialog: MatDialog) {
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
      this.showResultsDialog(this.ngRedux.getState().statistic);
      localStorage.removeItem(GameService.LS_GAME_CONFIG_KEY);
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
    let delay = config.animationDelay;
    return Observable.timer(delay, delay)
      .takeUntil(this.endGameEmitter)
      .takeWhile((value, index) => this.checkStopGameCondition())
      .take(config.gameDuration)
      .forEach(value => this.nextStep(value));
  }

  private checkStopGameCondition(): boolean {
    return this.ngRedux.getState().statistic.getTotal() > 0;
  }

  private nextStep(value) {
    this.ngRedux.dispatch({ type: NEXT_STEP });
  }

  private showResultsDialog(statistic: GameStatistic) {
    this.dialog.open(GameResultsComponent, {
      data: statistic
    });
  }
}
