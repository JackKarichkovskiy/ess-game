import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Unsubscribe } from 'redux';

import { GameConfig } from '../models/game-config';
import { GameState } from '../models/game-state';
import { GameService } from '../services/game.service';
import { GameStatistic } from '../models/game-statistic';

@Component({
  selector: 'display-game-state',
  templateUrl: './display-game-state.component.html',
  styleUrls: ['./display-game-state.component.css']
})
export class DisplayGameStateComponent implements OnInit, OnDestroy {

  percentageChartLabels = ['Simpletons', 'Knaves', 'Vindictives'];
  percentageData: number[];

  populationData: PopulationData[];
  populationChartLabels: number[] = [];
  populationChartOptions = {
    responsive: true
  };

  step: number;
  gameDuration: number;

  unsubscribeFn: Unsubscribe;

  constructor(private ngRedux: NgRedux<GameState>, private gameService: GameService) {
  }

  ngOnInit(): void {
    this.unsubscribeFn = this.ngRedux.subscribe(() => {
      let state = this.ngRedux.getState();

      if (this.step === state.step) return;
      this.step = state.step;

      this.updatePercentageData(state.statistic);

      if (this.step === 0) this.initPopulationChart();
      this.updatePopulationData(state.statistic);
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

  private updatePercentageData(statistic: GameStatistic) {
    this.percentageData = [
      statistic.simpletonsAmount,
      statistic.knavesAmount,
      statistic.vindictiveAmount
    ];
  }

  private initPopulationChart() {
    this.populationData = [
      { data: [] as number[], label: 'Simpletons' },
      { data: [] as number[], label: 'Knaves' },
      { data: [] as number[], label: 'Vindictives' }
    ];

    this.populationChartLabels.splice(0, this.populationChartLabels.length);
    let gameDuration = this.gameService.getCurrentConfig().gameDuration;
    for (let i = 0; i < gameDuration; i++)
      this.populationChartLabels.push(i);
  }

  private updatePopulationData(statistic: GameStatistic) {
    let copy = this.copyOfPopulationData();  // for dynamic update
    copy[0].data.push(statistic.simpletonsAmount);
    copy[1].data.push(statistic.knavesAmount);
    copy[2].data.push(statistic.vindictiveAmount);

    this.populationData = copy;
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
}

interface PopulationData {
  data: number[],
  label: string
}