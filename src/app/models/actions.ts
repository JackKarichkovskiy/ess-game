import { tassign } from 'tassign';

import { GameConfig } from './game-config';
import { GameState } from './game-state';
import { Inhabitant, Knave, Simpleton, Vindictive, InhabitantHealth } from './inhabitants';
import { GameStatistic } from './game-statistic';

export const INIT_STATE = 'INIT_STATE';
export const NEXT_STEP = 'NEXT_STEP';
export const END_GAME = 'END_GAME';

export function rootReducer(state: GameState, action): GameState {
    switch (action.type) {
        case INIT_STATE:
            return initState(state, action.config);
        case NEXT_STEP:
            return goToNextPhase(state);
        case END_GAME:
            return endGame(state);
    }

    return state;
}

function initState(state: GameState, config: GameConfig): GameState {
    let result = cloneState(state);
    result.isRunning = true;
    result.statistic = new GameStatistic();
    result.inhabitants = [];
    result.step = 0;

    const simpletonsAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.simpletonsPercent);
    addSimpletons(result, simpletonsAmount);

    const knavesAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.knavesPercent);
    addKnaves(result, knavesAmount);

    const vindictiveAmount = Math.round(GameConfig.CREATION_AMOUNT_PERCENT * config.getVindictivePercent());
    addVindictive(result, vindictiveAmount);

    return result;
}

function addSimpletons(result: GameState, simpletonsAmount: number) {
    result.statistic.simpletonsAmount += simpletonsAmount;
    addInhabitants(result.inhabitants, simpletonsAmount, Simpleton);
}

function addKnaves(result: GameState, knavesAmount: number) {
    result.statistic.knavesAmount += knavesAmount;
    addInhabitants(result.inhabitants, knavesAmount, Knave);
}

function addVindictive(result: GameState, vindictiveAmount: number) {
    result.statistic.vindictiveAmount += vindictiveAmount;
    addInhabitants(result.inhabitants, vindictiveAmount, Vindictive);
}

function addInhabitants<T extends Inhabitant>(source: Inhabitant[], count: number, constructorFn: new () => T) {
    for (let i = 0; i < count; i++) {
        source.push(new constructorFn());
    }
}

function goToNextPhase(state: GameState): GameState {
    let clone = cloneState(state);

    // Add new inhabitants if needed
    // if (clone.step % GameConfig.INHABITANTS_CREATION_FREQUENCY === GameConfig.INHABITANTS_CREATION_FREQUENCY - 1)
    //     addNewGeneration(clone);

    // Try to eliminate venoms

    // Clean dead bodies
    cleanDeadBodies(clone);

    clone.step++;
    return clone;
}

function addNewGeneration(state: GameState): void {
    let newSimpletonsCount = Math.round(state.statistic.simpletonsAmount * GameConfig.SIMPLETONS_GENERATION_FACTOR);
    addSimpletons(state, newSimpletonsCount);

    let newKnavesCount = Math.round(state.statistic.knavesAmount * GameConfig.KNAVES_GENERATION_FACTOR);
    addKnaves(state, newKnavesCount);

    let newVindictiveCount = Math.round(state.statistic.vindictiveAmount * GameConfig.VINDICTIVE_GENERATION_FACTOR);
    addVindictive(state, newVindictiveCount);
}

function cleanDeadBodies(state: GameState): void {
    state.inhabitants = state.inhabitants.filter(i => {
        // console.log(i, i.isDead);
        return !i.isDead;
    });
    refreshStatistic(state);
}

function refreshStatistic(state: GameState) {
    state.statistic.simpletonsAmount = 0;
    state.statistic.knavesAmount = 0;
    state.statistic.vindictiveAmount = 0;

    for (let inhabitant of state.inhabitants)
        if (inhabitant instanceof Simpleton)
            state.statistic.simpletonsAmount++;
        else if (inhabitant instanceof Knave)
            state.statistic.knavesAmount++;
        else
            state.statistic.vindictiveAmount++;
}

function endGame(state: GameState): GameState {
    let result = cloneState(state);
    result.isRunning = false;
    return result;
}

function cloneState(state: GameState): GameState {
    let clonedInhabitants: Inhabitant[] = [];
    for (let inhabitant of state.inhabitants)
        clonedInhabitants.push(inhabitant.clone());

    return tassign(state, { statistic: tassign(state.statistic), inhabitants: clonedInhabitants });
}