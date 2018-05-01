import { GameConfig } from "./game-config";

describe('GameConfig', () => {

  it('should create GameConfig with undefined params while putting nothing to constructor', () => {
    let testObj = new GameConfig();

    expect(testObj.simpletonsPercent).toBeUndefined();
    expect(testObj.knavesPercent).toBeUndefined();
    expect(testObj.vindictivePercent).toBe(0);
  });
});
