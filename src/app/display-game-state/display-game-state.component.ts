import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs'

import { GameState } from '../models/game-state';
import { Unsubscribe } from 'redux';
import { GameService } from '../services/game.service';
import { GameConfig } from '../models/game-config';

@Component({
  selector: 'display-game-state',
  templateUrl: './display-game-state.component.html',
  styleUrls: ['./display-game-state.component.css']
})
export class DisplayGameStateComponent implements OnInit, OnDestroy {

  chartLabels = ['Simpletons', 'Knaves', 'Vindictives'];
  data: number[];
  chartType = 'pie';
  step: number;

  unsubscribeFn: Unsubscribe;

  constructor(private ngRedux: NgRedux<GameState>, private gameService: GameService) {
  }

  ngOnInit(): void {
    this.unsubscribeFn = this.ngRedux.subscribe(() => {
      let state = this.ngRedux.getState();
      this.data = [
        state.statistic.simpletonsAmount,
        state.statistic.knavesAmount,
        state.statistic.vindictiveAmount
      ];
      this.step = state.step;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeFn();
  }

  get gameProgress() {
    let gameDuration = this.gameService.getCurrentConfig().gameDuration;
    let gameProgress = this.step / gameDuration * GameConfig.ONE_HUNDRED_PERCENT;
    return Math.round(gameProgress);
  }
}
