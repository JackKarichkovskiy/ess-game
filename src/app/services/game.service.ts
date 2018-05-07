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
import { NgRedux } from 'ng2-redux';
import { INIT_STATE, END_GAME } from '../models/actions';

@Injectable()
export class GameService {

  constructor(private ngRedux: NgRedux<GameState>) { }

  startGame(config) {
    this.ngRedux.dispatch({ type: INIT_STATE, config: config });

    this.ngRedux.dispatch({ type: END_GAME });
  }
}
