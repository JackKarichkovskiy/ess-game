import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { GameConfig } from '../models/game-config';

@Component({
  selector: 'init-game-form',
  templateUrl: './init-game-form.component.html',
  styleUrls: ['./init-game-form.component.css']
})
export class InitGameFormComponent {

  gameConfig: GameConfig = new GameConfig();

  constructor() {
  }

  goGame(initParams: GameConfig) {
    console.log(initParams);
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
}
