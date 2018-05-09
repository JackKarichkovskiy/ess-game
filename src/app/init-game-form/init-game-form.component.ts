import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select } from 'ng2-redux';
import { CustomValidators } from 'ng2-validation';

import { GameConfig } from '../models/game-config';
import { GameService } from '../services/game.service';
import { PercentageValidators } from './percentage.validators';

@Component({
  selector: 'init-game-form',
  templateUrl: './init-game-form.component.html',
  styleUrls: ['./init-game-form.component.css']
})
export class InitGameFormComponent {

  gameConfig: GameConfig = new GameConfig();
  @select('isRunning') gameIsRunning;

  form; // Validation control

  constructor(private gameService: GameService, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  async goGame() {
    await this.gameService.startGame(this.gameConfig);
  }

  stopGame() {
    this.gameService.stopGame();
  }

  get sPer() {
    return this.form.get('percentageGroup.simpletonsPercent');
  }

  get kPer() {
    return this.form.get('percentageGroup.knavesPercent');
  }
  get perGroup() {
    return this.form.get('percentageGroup');
  }

  get simpletonsPercent() {
    return this.gameConfig.simpletonsPercent;
  }

  set simpletonsPercent(value) {
    this.gameConfig.simpletonsPercent = value;
  }

  get knavesPercent() {
    return this.gameConfig.knavesPercent;
  }

  set knavesPercent(value) {
    this.gameConfig.knavesPercent = value;
  }

  get vindictivePercent() {
    return this.gameConfig.getVindictivePercent();
  }

  private buildFormValidation(fb: FormBuilder) {
    this.form = fb.group({
      percentageGroup: fb.group({
        simpletonsPercent: fb.control('', [
          Validators.required,
          CustomValidators.range([0, 100]),
          CustomValidators.digits
        ]),
        knavesPercent: fb.control('', [
          Validators.required,
          CustomValidators.range([0, 100]),
          CustomValidators.digits
        ])
      }, {
          validator: PercentageValidators.cannotBeGtThanLimit
        })
    });
  }
}
