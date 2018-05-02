import { GameConfig } from "./game-config";

export interface GameState{

    isRunning: boolean;

    gameConfig: GameConfig;
}