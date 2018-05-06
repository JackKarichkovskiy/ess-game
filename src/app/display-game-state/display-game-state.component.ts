import { Component, OnDestroy } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { GameState } from '../models/game-state';
import { GameStatistic } from '../models/game-statistic';
import { Subscription } from 'rxjs/Subscription';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'display-game-state',
  templateUrl: './display-game-state.component.html',
  styleUrls: ['./display-game-state.component.css']
})
export class DisplayGameStateComponent implements OnDestroy {

  chartLabels = ['Simpletons', 'Knaves', 'Vindictives'];
  // @select('statistic') statistic: GameStatistic;
  data = [undefined, undefined, undefined];
  chartType = 'pie';

  unsubscribeFunc: Unsubscribe;

  constructor(ngRedux: NgRedux<GameState>) {
    this.unsubscribeFunc = ngRedux.subscribe(() => {
      let state = ngRedux.getState();
      console.log('DisplayGameStateComponent', state);
      this.data = [state.statistic.simpletonsAmount, state.statistic.knavesAmount, state.statistic.vindictiveAmount];
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeFunc();
  }
}
