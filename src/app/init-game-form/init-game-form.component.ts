import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { select } from 'ng2-redux';
import { CustomValidators } from 'ng2-validation';

import { GameConfig } from '../models/game-config';
import { GameService } from '../services/game.service';
import { PercentageValidators } from './percentage.validators';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'init-game-form',
  templateUrl: './init-game-form.component.html',
  styleUrls: ['./init-game-form.component.css']
})
export class InitGameFormComponent {

  gameConfig: GameConfig = new GameConfig();
  @select('isRunning') gameIsRunning;

  randomSeedEnabled = false;

  form: AbstractControl; // Validation control

  constructor(private cd: ChangeDetectorRef,
    private gameService: GameService,
    fb: FormBuilder) {
    this.buildFormValidation(fb);
  }

  async goGame() {
    await this.gameService.startGame(this.gameConfig);
  }

  stopGame() {
    this.gameService.stopGame();
  }

  randomSeedChanged($event: MatSlideToggleChange) {
    this.randomSeedEnabled = $event.checked;
    if (this.randomSeedEnabled) {
      this.gameConfig.randomSeed = GameConfig.DEFAULT_RANDOM_SEED;
      this.ranSeed.enable();
      this.cd.detectChanges();
    } else {
      this.gameConfig.randomSeed = undefined;
      this.ranSeed.disable();
    }
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

  get advSettGroup() {
    return this.form.get('advSettingsGroup');
  }

  get ranSeed() {
    return this.form.get('advSettingsGroup.randomSeed');
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
        }),
      advSettingsGroup: fb.group({
        randomSeed: fb.control({
          disabled: true
        }, Validators.required)
      })
    });
  }
}
