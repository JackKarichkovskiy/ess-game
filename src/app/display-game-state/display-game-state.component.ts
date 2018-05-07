import { Component } from '@angular/core';
import { select } from 'ng2-redux';

import { GameState } from '../models/game-state';

@Component({
  selector: 'display-game-state',
  templateUrl: './display-game-state.component.html',
  styleUrls: ['./display-game-state.component.css']
})
export class DisplayGameStateComponent {

  chartLabels = ['Simpletons', 'Knaves', 'Vindictives'];
  @select((s: GameState) => [
    s.statistic.simpletonsAmount,
    s.statistic.knavesAmount,
    s.statistic.vindictiveAmount
  ])
  data: number[];
  chartType = 'pie';

}
