import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { select } from 'ng2-redux';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs';

import { GameConfig } from '../models/game-config';
import { GameService } from '../services/game.service';
import { PercentageValidators } from './percentage.validators';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'init-game-form',
  templateUrl: './init-game-form.component.html',
  styleUrls: ['./init-game-form.component.scss']
})
export class InitGameFormComponent implements OnInit {

  gameConfig: GameConfig = new GameConfig();
  @select('isRunning') gameIsRunning: Observable<boolean>;

  randomSeedEnabled = false;
  gameDurationEnabled = false;

  form: AbstractControl; // Validation control

  constructor(private cd: ChangeDetectorRef,
    private gameService: GameService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildFormValidation(this.fb);
    this.controlGameSpeedDisability();
  }

  async goGame() {
    await this.gameService.startGame(this.gameConfig).catch(async onrejected => await this.gameService.endGame());
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

  gameDurationChanged($event: MatSlideToggleChange) {
    this.gameDurationEnabled = $event.checked;
    this.gameConfig.gameDuration = GameConfig.DEFAULT_GAME_DURATION;
    if (this.gameDurationEnabled) {
      this.gameDur.enable();
      this.cd.detectChanges();
    } else
      this.gameDur.disable();
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

  get gameDur() {
    return this.form.get('advSettingsGroup.gameDuration');
  }

  get gameSpeed() {
    return this.form.get('animationSpeed');
  }

  private buildFormValidation(fb: FormBuilder) {
    this.form = fb.group({
      // General Settings
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
      animationSpeed: fb.control(''),

      // Adv Settings
      advSettingsGroup: fb.group({
        randomSeed: fb.control({
          value: '',
          disabled: true
        }, [
            Validators.required,
            CustomValidators.digits
          ]),
        gameDuration: fb.control({
          value: '',
          disabled: true
        }, [
            Validators.required,
            CustomValidators.gt(0),
            CustomValidators.digits
          ])
      })
    });
  }

  private controlGameSpeedDisability() {
    this.gameIsRunning.subscribe(gameIsRun => {
      if (gameIsRun) this.gameSpeed.disable();
      else this.gameSpeed.enable();
    });
  }
}
