import { GameConfig } from "./game-config";
import { GameStatistic } from "./game-statistic";
import { INIT_STATE, END_GAME } from "./actions";
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

export function rootReducer(state: GameState, action): GameState {
    switch (action.type) {
        case INIT_STATE:
            return initState(state, action.config);
        case END_GAME:
            return endGame(state);
    }

    return state;
}

function initState(state: GameState, config: GameConfig): GameState {
    let result = cloneState(state);
    result.isRunning = true;

    const simpletonsAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.simpletonsPercent);
    addSimpletons(result, simpletonsAmount);

    const knavesAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.knavesPercent);
    addKnaves(result, knavesAmount);

    const vindictiveAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.getVindictivePercent());
    addVindictive(result, vindictiveAmount);

    return result;
}

function addInhabitants<T extends Inhabitant>(source: Inhabitant[], count: number, constructorFn: new () => T) {
    for (let i = 0; i < count; i++)
        source.push(new constructorFn());
}

function addSimpletons(result: GameState, simpletonsAmount: number) {
    result.statistic.simpletonsAmount += simpletonsAmount;
    addInhabitants(result.inhabitants, simpletonsAmount, Simpleton);
}

function addKnaves(result: GameState, knavesAmount: number) {
    result.statistic.knavesAmount = knavesAmount;
    addInhabitants(result.inhabitants, knavesAmount, Knave);
}

function addVindictive(result: GameState, vindictiveAmount: number) {
    result.statistic.vindictiveAmount = vindictiveAmount;
    addInhabitants(result.inhabitants, vindictiveAmount, Vindictive);
}

function endGame(state: GameState): GameState {
    let result = cloneState(state);
    result.isRunning = false;
    return result;
}

function cloneState(state: GameState): GameState {
    let clonedInhabitants: Inhabitant[] = [];
    for (let inhabitant of state.inhabitants)
        clonedInhabitants.push(Object.assign({}, inhabitant));

    return tassign(state, { statistic: tassign(state.statistic), inhabitants: clonedInhabitants });
}