import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';

import { GameState } from '../models/game-state';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'display-game-state',
  templateUrl: './display-game-state.component.html',
  styleUrls: ['./display-game-state.component.css']
})
export class DisplayGameStateComponent implements OnInit, OnDestroy {

  chartLabels = ['Simpletons', 'Knaves', 'Vindictives'];
  data: number[];
  chartType = 'pie';

  unsubscribeFn: Unsubscribe;

  constructor(private ngRedux: NgRedux<GameState>) {
  }

  ngOnInit(): void {
    this.unsubscribeFn = this.ngRedux.subscribe(() => {
      let state = this.ngRedux.getState();
      this.data = [
        state.statistic.simpletonsAmount,
        state.statistic.knavesAmount,
        state.statistic.vindictiveAmount
      ];
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeFn();
  }
}
