import { GameStatistic } from './game-statistic';
import { Inhabitant, Simpleton, Knave } from './inhabitants';

export interface GameState {

    isRunning: boolean;

    statistic: GameStatistic;

    inhabitants: Inhabitant[];

    step: number;

}

export const INITIAL_STATE: GameState = {
    isRunning: false,
    statistic: new GameStatistic(),
    inhabitants: [],
    step: 0
};