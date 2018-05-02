import { GameConfig } from "./game-config";
import { GameState } from "./game-state";

export class EssGame {

    readonly currentState: GameState;

    constructor(private startGameConfig: GameConfig) {
        this.currentState = { isRunning: false, gameConfig: startGameConfig };
    }

    nextGameState(): GameState {
        let newState: GameState;
        if (!this.currentState.isRunning) {
            this.currentState.isRunning = true;
            return this.stateCopy();
        }

        return this.goToNextState();
    }

    endGame(): GameState {
        this.currentState.isRunning = false;
        return this.stateCopy();
    }

    private goToNextState() {
        return this.stateCopy();
    }

    private stateCopy() {
        return Object.assign({},
            this.currentState,
            { gameConfig: Object.assign({}, this.currentState.gameConfig) });
    }
}