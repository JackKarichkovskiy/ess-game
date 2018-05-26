import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgRedux } from 'ng2-redux';
import { Unsubscribe } from 'redux';
import { Subscription } from 'rxjs';
import { GameConfig } from '../models/game-config';
import { GameState } from '../models/game-state';
import { GameStatistic } from '../models/game-statistic';
import { GameService } from '../services/game.service';


@Component({
  selector: 'display-game-state',
  templateUrl: './display-game-state.component.html',
  styleUrls: ['./display-game-state.component.css']
})
export class DisplayGameStateComponent implements OnInit, OnDestroy {

  private simpletonsLabel: string;
  private knavesLabel: string;
  private vindictiveLabel: string;

  percentageChartLabels = new Array<string>(3);
  percentageData: number[];

  populationData: PopulationData[] = [];
  populationChartLabels: number[] = [];
  populationChartOptions = {
    responsive: true
  };

  step: number;
  gameDuration: number;

  unsubscribeReduxFn: Unsubscribe;
  simpletonsTranslateSub: Subscription;
  knavesTranslateSub: Subscription;
  vindictiveTranslateSub: Subscription;

  constructor(private translate: TranslateService,
    private ngRedux: NgRedux<GameState>,
    private gameService: GameService) {
  }

  ngOnInit() {
    this.reduxUpdateData();
    this.translateSetup();
  }

  ngOnDestroy() {
    this.unsubscribeReduxFn();
    this.simpletonsTranslateSub.unsubscribe();
    this.knavesTranslateSub.unsubscribe();
    this.vindictiveTranslateSub.unsubscribe();
  }

  get gameProgress() {
    if (!this.ngRedux.getState().isRunning) return 0;

    let gameDuration = this.gameService.getCurrentConfig().gameDuration;
    let gameProgress = this.step / gameDuration * GameConfig.ONE_HUNDRED_PERCENT;
    return Math.round(gameProgress);
  }

  private reduxUpdateData() {
    this.unsubscribeReduxFn = this.ngRedux.subscribe(() => {
      let state = this.ngRedux.getState();

      if (this.step === state.step) return;
      this.step = state.step;

      this.updatePercentageData(state.statistic);

      if (this.step === 0) this.initPopulationChart();
      this.updatePopulationData(state.statistic);
    });
  }

  private translateSetup() {
    this.simpletonsTranslateSub = this.translate.stream('DISPLAY_PANEL.SIMPLETONS_LABEL').subscribe((res: string) => {
      this.simpletonsLabel = res;
      this.percentageChartLabels[0] = this.simpletonsLabel;
      if (this.populationData[0]) this.populationData[0].label = this.simpletonsLabel;
    });
    this.knavesTranslateSub = this.translate.stream('DISPLAY_PANEL.KNAVES_LABEL').subscribe((res: string) => {
      this.knavesLabel = res;
      this.percentageChartLabels[1] = this.knavesLabel;
      if (this.populationData[1]) this.populationData[1].label = this.knavesLabel;
    });
    this.vindictiveTranslateSub = this.translate.stream('DISPLAY_PANEL.VINDICTIVES_LABEL').subscribe((res: string) => {
      this.vindictiveLabel = res;
      this.percentageChartLabels[2] = this.vindictiveLabel;
      if (this.populationData[2]) this.populationData[2].label = this.vindictiveLabel;
    });
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
      { data: [] as number[], label: this.simpletonsLabel },
      { data: [] as number[], label: this.knavesLabel },
      { data: [] as number[], label: this.vindictiveLabel }
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