import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { END_GAME, INIT_STATE, NEXT_STEP } from '../models/actions';
import { GameState } from '../models/game-state';
import { GameConfig } from '../models/game-config';

@Injectable()
export class GameService {

  constructor(private ngRedux: NgRedux<GameState>) { }

  startGame(config) {
    this.ngRedux.dispatch({ type: INIT_STATE, config: config });

    for (let i = 0; i < GameConfig.DEFAULT_GAME_DURATION; i++)
      this.ngRedux.dispatch({ type: NEXT_STEP });

    this.ngRedux.dispatch({ type: END_GAME });
  }
}
