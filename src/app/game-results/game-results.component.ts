import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { GameStatistic } from '../models/game-statistic';

@Component({
  selector: 'game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: GameStatistic) {
  }

}
