import { GameState } from './game-state';
import { GameStatistic } from './game-statistic';
import { Simpleton, Vindictive, Knave, InhabitantHealth } from './inhabitants';
import { cloneState } from './actions';

describe('cloneState function', () => {

  it('should properly clone state', () => {
    let origin: GameState = {
      isRunning: false,
      step: 0,
      statistic: new GameStatistic(),
      inhabitants: [new Vindictive()]
    };
    (origin.inhabitants[0] as Vindictive).notHelpingInhabitants.push(new Simpleton());
    let clone = cloneState(origin);

    clone.isRunning = true;
    clone.step++;
    clone.statistic.simpletonsAmount++;
    clone.statistic.knavesAmount = 2;
    clone.statistic.vindictiveAmount = 3;
    clone.inhabitants.push(new Knave());

    expect(origin.isRunning).toBeFalsy();
    expect(origin.step).toBe(0);
    expect(origin.statistic.simpletonsAmount).toBe(0);
    expect(origin.statistic.knavesAmount).toBe(0);
    expect(origin.statistic.vindictiveAmount).toBe(0);
    expect(origin.inhabitants.length).toBe(1);

    expect(clone.inhabitants.length).toBe(2);
  });
});
