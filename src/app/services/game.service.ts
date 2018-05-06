import { Injectable } from '@angular/core';
import { GameConfig } from '../models/game-config';
import { Observable } from 'rxjs/Observable';
import { GameState } from '../models/game-state';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Subject } from 'rxjs/Subject';
import { EssGame } from '../models/ess-game';

@Injectable()
export class GameService {

  constructor() { }

  startGame(config): Observable<GameState> {
    let newGame = new EssGame(new GameConfig(config));

    return Observable.concat(
      Observable.of(newGame.currentState),
      Observable.timer(GameConfig.DEFAULT_ANIMATION_SPEED, GameConfig.DEFAULT_ANIMATION_SPEED)
        .map(i => newGame.nextGameState())
        .take(GameConfig.DEFAULT_GAME_DURATION),
      Observable.of(newGame.endGame())
    );
  }

  private emitNewState(observer) {

  }

}
