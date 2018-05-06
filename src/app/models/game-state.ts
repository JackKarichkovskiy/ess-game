import { GameConfig } from "./game-config";
import { GameStatistic } from "./game-statistic";
import { INIT_STATE } from "./actions";
import { Inhabitant, Simpleton, Knave, Vindictive } from "./inhabitants";

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

export function rootReducer(state: GameState, action) {
    switch (action.type) {
        case INIT_STATE:
            return initState(state, action.config);
    }

    return state;
}

function initState(state: GameState, config: GameConfig): GameState {
    state.isRunning = true;

    const simpletonsAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.simpletonsPercent);
    state.statistic.simpletonsAmount = simpletonsAmount;
    for (let i = 0; i < simpletonsAmount; i++)
        state.inhabitants.push(new Simpleton());

    const knavesAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.knavesPercent);
    state.statistic.knavesAmount = knavesAmount;
    for (let i = 0; i < knavesAmount; i++)
        state.inhabitants.push(new Knave());

    const vindictiveAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.getVindictivePercent());
    state.statistic.vindictiveAmount = vindictiveAmount;
    for (let i = 0; i < vindictiveAmount; i++)
        state.inhabitants.push(new Vindictive());

    console.log('inhabitants', state);

    return state;
}