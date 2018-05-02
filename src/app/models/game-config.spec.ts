import { GameConfig } from "./game-config";

describe('GameConfig', () => {

  it('should create GameConfig with undefined params while putting nothing to constructor', () => {
    let testObj = new GameConfig();

    expect(testObj.simpletonsPercent).toBeUndefined();
    expect(testObj.knavesPercent).toBeUndefined();
    expect(testObj.getVindictivePercent()).toBe(0);
  });

  it('should create GameConfig with specified params while putting init object to constructor', () => {
    let testObj = new GameConfig({ simpletonsPercent: 10, knavesPercent: 20 });

    expect(testObj.simpletonsPercent).toBe(10);
    expect(testObj.knavesPercent).toBe(20);
    expect(testObj.getVindictivePercent()).toBe(70);
  });

  it('should vindictivePercent be 0 if simpletonsPercent is undefined', () => {
    let testObj = new GameConfig({ knavesPercent: 20 });

    expect(testObj.simpletonsPercent).toBeUndefined();
    expect(testObj.knavesPercent).toBe(20);
    expect(testObj.getVindictivePercent()).toBe(0);
  });

  it('should vindictivePercent be 0 if knavesPercent is undefined', () => {
    let testObj = new GameConfig({ simpletonsPercent: 10 });

    expect(testObj.simpletonsPercent).toBe(10);
    expect(testObj.knavesPercent).toBeUndefined();
    expect(testObj.getVindictivePercent()).toBe(0);
  });

  it('should vindictivePercent be 0 if calculated vindictivePercent is negative', () => {
    let testObj = new GameConfig({ simpletonsPercent: GameConfig.ONE_HUNDRED_PERCENT, knavesPercent: 1 });

    expect(testObj.simpletonsPercent).toBe(GameConfig.ONE_HUNDRED_PERCENT);
    expect(testObj.knavesPercent).toBe(1);
    expect(testObj.getVindictivePercent()).toBe(0);
  });

  it('should vindictivePercent be 0 if calculated vindictivePercent is higher than upper limit', () => {
    let testObj = new GameConfig({ simpletonsPercent: -1, knavesPercent: 0 });

    expect(testObj.simpletonsPercent).toBe(-1);
    expect(testObj.knavesPercent).toBe(0);
    expect(testObj.getVindictivePercent()).toBe(0);
  });
});
