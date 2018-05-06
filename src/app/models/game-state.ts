import { GameConfig } from "./game-config";
import { GameStatistic } from "./game-statistic";

export interface GameState{

    isRunning: boolean;

    statistic: GameStatistic;
}