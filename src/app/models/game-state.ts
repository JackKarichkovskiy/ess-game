import { GameConfig } from "./game-config";
import { GameStatistic } from "./game-statistic";
import { INIT_STATE } from "./actions";
import { Inhabitant, Simpleton, Knave, Vindictive } from "./inhabitants";
import { tassign } from 'tassign';

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
    let result = cloneState(state);
    console.log('cloneState', result);
    result.isRunning = true;

    const simpletonsAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.simpletonsPercent);
    result.statistic.simpletonsAmount = simpletonsAmount;
    for (let i = 0; i < simpletonsAmount; i++)
        result.inhabitants.push(new Simpleton());

    const knavesAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.knavesPercent);
    result.statistic.knavesAmount = knavesAmount;
    for (let i = 0; i < knavesAmount; i++)
        result.inhabitants.push(new Knave());

    const vindictiveAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.getVindictivePercent());
    result.statistic.vindictiveAmount = vindictiveAmount;
    for (let i = 0; i < vindictiveAmount; i++)
        result.inhabitants.push(new Vindictive());

    console.log('state', result);

    return result;
}

function cloneState(state): GameState {
    return tassign(state, { statistic: tassign(state.statistic) });
}