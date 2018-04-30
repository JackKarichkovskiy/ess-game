import { Component } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { GameConfig } from '../models/game-config';

@Component({
  selector: 'init-game-form',
  templateUrl: './init-game-form.component.html',
  styleUrls: ['./init-game-form.component.css']
})
export class InitGameFormComponent {

  constructor() {
  }

  goGame(initParams: GameConfig) {
    console.log(initParams);
  }

}
