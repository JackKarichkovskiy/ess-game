import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GameConfig } from '../models/game-config';
import { GameService } from '../services/game.service';
import { CustomValidators } from 'ng2-validation';
import { PercentageValidators } from './percentage.validators';

@Component({
  selector: 'init-game-form',
  templateUrl: './init-game-form.component.html',
  styleUrls: ['./init-game-form.component.css']
})
export class InitGameFormComponent {

  gameConfig: GameConfig = new GameConfig();
  gameIsRunning = false;

  form; // Validation control

  constructor(private gameService: GameService, fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  goGame() {
    this.gameService.startGame(this.gameConfig);
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