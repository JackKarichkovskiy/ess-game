import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Unsubscribe } from 'redux';

import { GameConfig } from '../models/game-config';
import { GameState } from '../models/game-state';
import { GameService } from '../services/game.service';

@Component({
  selector: 'display-game-state',
  templateUrl: './display-game-state.component.html',
  styleUrls: ['./display-game-state.component.css']
})
export class DisplayGameStateComponent implements OnInit, OnDestroy {

  percentageChartLabels = ['Simpletons', 'Knaves', 'Vindictives'];
  percentageData: number[];

  populationData: PopulationData[];
  populationChartLabels: number[];
  populationChartOptions = {
    responsive: true
  };

  step: number;

  unsubscribeFn: Unsubscribe;

  constructor(private ngRedux: NgRedux<GameState>, private gameService: GameService) {
  }

  ngOnInit(): void {
    this.unsubscribeFn = this.ngRedux.subscribe(() => {
      let state = this.ngRedux.getState();
      this.percentageData = [
        state.statistic.simpletonsAmount,
        state.statistic.knavesAmount,
        state.statistic.vindictiveAmount
      ];
      this.step = state.step;

      if (this.step === 0) this.initPopulationChart();

      this.populationChartLabels.push(this.step);

      this.populationData = this.copyOfPopulationData();
      this.populationData[0].data.push(state.statistic.simpletonsAmount);
      this.populationData[1].data.push(state.statistic.knavesAmount);
      this.populationData[2].data.push(state.statistic.vindictiveAmount);
    });
  }

  private copyOfPopulationData(): PopulationData[] {
    let copy = [];
    for (let data of this.populationData)
      copy.push({
        data: Object.assign([], data.data),
        label: data.label
      });

    return copy;
  }


  ngOnDestroy(): void {
    this.unsubscribeFn();
  }

  get gameProgress() {
    let gameDuration = this.gameService.getCurrentConfig().gameDuration;
    let gameProgress = this.step / gameDuration * GameConfig.ONE_HUNDRED_PERCENT;
    return Math.round(gameProgress);
  }

  private initPopulationChart() {
    this.populationData = [
      { data: [] as number[], label: 'Simpletons' },
      { data: [] as number[], label: 'Knaves' },
      { data: [] as number[], label: 'Vindictives' }
    ];
    this.populationChartLabels = [];
  }
}

interface PopulationData {
  data: number[],
  label: string
}