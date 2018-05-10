import { tassign } from 'tassign';

import { GameConfig } from './game-config';
import { GameState } from './game-state';
import { Inhabitant, Knave, Simpleton, Vindictive, InhabitantHealth } from './inhabitants';
import { GameStatistic } from './game-statistic';
import { DisplayGameStateComponent } from '../display-game-state/display-game-state.component';
import { RandomGenerator } from '../utils/random';

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

    setupRandomSeedIfNeeded(config);

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

    if (clone.step % GameConfig.INHABITANTS_CREATION_FREQUENCY === GameConfig.INHABITANTS_CREATION_FREQUENCY - 1)
        addNewGeneration(clone);

    tryToEliminateVenoms(clone);

    cleanDeadBodies(clone);

    clone.step++;
    return clone;
}

function addNewGeneration(state: GameState): void {
    if (state.statistic.simpletonsAmount > 1) {
        let newSimpletonsCount = Math.round(state.statistic.simpletonsAmount * GameConfig.SIMPLETONS_GENERATION_FACTOR);
        addSimpletons(state, newSimpletonsCount);
    }

    if (state.statistic.knavesAmount > 1) {
        let newKnavesCount = Math.round(state.statistic.knavesAmount * GameConfig.KNAVES_GENERATION_FACTOR);
        addKnaves(state, newKnavesCount);
    }

    if (state.statistic.vindictiveAmount > 1) {
        let newVindictiveCount = Math.round(state.statistic.vindictiveAmount * GameConfig.VINDICTIVE_GENERATION_FACTOR);
        addVindictive(state, newVindictiveCount);
    }
}

function tryToEliminateVenoms(state: GameState) {
    let inhabitants = state.inhabitants;
    for (let i = 0; i < inhabitants.length; i++) {
        let other = findRandomOther(inhabitants, i);

        inhabitants[i].askHelp(other);
    }
}

function findRandomOther(inhabitants: Inhabitant[], except?: number): Inhabitant {
    if (!inhabitants || inhabitants.length < 2) return null;

    let other: Inhabitant;
    do {
        let otherIndex = Math.floor(RandomGenerator.nextFloat() * inhabitants.length);
        if (otherIndex !== except)
            other = inhabitants[otherIndex];
    } while (!other);

    return other;
}

function cleanDeadBodies(state: GameState): void {
    state.inhabitants = state.inhabitants.filter(i => {
        return !i.isDead();
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

function setupRandomSeedIfNeeded(config: GameConfig) {
    RandomGenerator.setup(config.randomSeed);
}

export function cloneState(state: GameState): GameState {
    let clonedInhabitants: Inhabitant[] = [];
    for (let inhabitant of state.inhabitants)
        clonedInhabitants.push(inhabitant.clone());

    return tassign(state, { statistic: tassign(state.statistic), inhabitants: clonedInhabitants });
}