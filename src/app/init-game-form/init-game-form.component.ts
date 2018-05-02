import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { GameConfig } from '../models/game-config';
import { GameService } from '../services/game.service';

@Component({
  selector: 'init-game-form',
  templateUrl: './init-game-form.component.html',
  styleUrls: ['./init-game-form.component.css']
})
export class InitGameFormComponent {

  gameConfig: GameConfig = new GameConfig();
  gameIsRunning = false;

  constructor(private gameService: GameService) {
  }

  goGame(initParams: GameConfig) {
    this.gameIsRunning = true;

    this.gameService.startGame(initParams).subscribe(state => {
      console.log(state);

      this.gameIsRunning = state.isRunning;
    });
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
