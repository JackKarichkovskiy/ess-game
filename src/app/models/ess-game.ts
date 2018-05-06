import { GameConfig } from "./game-config";
import { GameState } from "./game-state";
import { Inhabitant, Simpleton, Knave, Vindictive } from "./inhabitants";
import { GameStatistic } from "./game-statistic";

export class EssGame {

    private step = 0;
    private inhabitants: Inhabitant[] = [];

    constructor(private startGameConfig: GameConfig) {
    }

    // nextGameState(): GameState {
    //     if (!this.currentState.isRunning) {
    //         return this.prepareInitialState();
    //     }

    //     return this.goToNextState();
    // }

    // endGame(): GameState {
    //     this.currentState.isRunning = false;

    //     return this.stateCopy();
    // }

    // private goToNextState() {
    //     let isTimeToGenerateNewInhabitants =
    //         this.step % GameConfig.INHABITANTS_CREATION_FREQUENCY === GameConfig.INHABITANTS_CREATION_FREQUENCY - 1;
    //     if (isTimeToGenerateNewInhabitants)
    //         this.addNewInhabitants();

    //     this.nextStep();
    //     return this.stateCopy();
    // }

    // private stateCopy() {
    //     return Object.assign({}, this.currentState, {
    //         statistic: Object.assign({}, this.currentState.statistic)
    //     });
    // }

    // private addNewInhabitants() {

    // }

    // private prepareInitialState(): GameState {
    //     this.currentState.isRunning = true;
    //     this.currentState.statistic = new GameStatistic();

    //     const creationAmountPercent = GameConfig.INHABITANTS_CREATION_AMOUNT / GameConfig.ONE_HUNDRED_PERCENT;

    //     const simpletonsAmount = Math.round(creationAmountPercent * this.startGameConfig.simpletonsPercent);
    //     this.currentState.statistic.simpletonsAmount = simpletonsAmount;
    //     for (let i = 0; i < simpletonsAmount; i++)
    //         this.inhabitants.push(new Simpleton());

    //     const knavesAmount = Math.round(creationAmountPercent * this.startGameConfig.knavesPercent);
    //     this.currentState.statistic.knavesAmount = knavesAmount;
    //     for (let i = 0; i < knavesAmount; i++)
    //         this.inhabitants.push(new Knave());

    //     const vindictiveAmount = Math.round(creationAmountPercent * this.startGameConfig.getVindictivePercent());
    //     this.currentState.statistic.vindictiveAmount = vindictiveAmount;
    //     for (let i = 0; i < vindictiveAmount; i++)
    //         this.inhabitants.push(new Vindictive());

    //     console.log('inhabitants', this.inhabitants);

    //     return this.stateCopy();
    // }

    // private nextStep() {
    //     this.step++;
    // }
}