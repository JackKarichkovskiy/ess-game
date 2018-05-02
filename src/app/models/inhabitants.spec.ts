import { GameConfig } from "./game-config";
import { Simpleton, InhabitantHealth, Knave, Vindictive } from "./inhabitants";

describe('Simpleton', () => {

  it('should create Simpleton with default health as Healthy', () => {
    let testObj = new Simpleton();

    expect(testObj.health).toBe(InhabitantHealth.Healthy);
  });

  it('should create Simpleton with input health', () => {
    let testObj = new Simpleton({ _health: InhabitantHealth.Dead });

    expect(testObj.health).toBe(InhabitantHealth.Dead);
  });

  it('should isDead be false when state is Healthy', () => {
    let testObj = new Simpleton({ _health: InhabitantHealth.Healthy });

    expect(testObj.isDead).toBeFalsy();
  });

  it('should isDead be false when state is Wounded', () => {
    let testObj = new Simpleton({ _health: InhabitantHealth.Wounded });

    expect(testObj.isDead).toBeFalsy();
  });

  it('should isDead be true when state is Dead', () => {
    let testObj = new Simpleton({ _health: InhabitantHealth.Dead });

    expect(testObj.isDead).toBeTruthy();
  });

  it('should help Healthy Simpleton if asked', () => {
    let needHelp = new Simpleton();
    let savior = new Simpleton();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });

  it('should help Wounded Simpleton if asked', () => {
    let needHelp = new Simpleton({ _health: InhabitantHealth.Wounded });
    let savior = new Simpleton();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });

  it('should help Healthy Knave if asked', () => {
    let needHelp = new Knave();
    let savior = new Simpleton();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });

  it('should help Wounded Knave if asked', () => {
    let needHelp = new Knave({ _health: InhabitantHealth.Wounded });
    let savior = new Simpleton();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });

  it('should help Healthy Vindictive if asked', () => {
    let needHelp = new Vindictive();
    let savior = new Simpleton();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });

  it('should help Wounded Vindictive if asked', () => {
    let needHelp = new Vindictive({ _health: InhabitantHealth.Wounded });
    let savior = new Simpleton();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });
});

describe('Knave', () => {

  it('should create Knave with default health as Healthy', () => {
    let testObj = new Knave();

    expect(testObj.health).toBe(InhabitantHealth.Healthy);
  });

  it('should create Knave with input health', () => {
    let testObj = new Knave({ _health: InhabitantHealth.Dead });

    expect(testObj.health).toBe(InhabitantHealth.Dead);
  });

  it('should isDead be false when state is Healthy', () => {
    let testObj = new Knave({ _health: InhabitantHealth.Healthy });

    expect(testObj.isDead).toBeFalsy();
  });

  it('should isDead be false when state is Wounded', () => {
    let testObj = new Knave({ _health: InhabitantHealth.Wounded });

    expect(testObj.isDead).toBeFalsy();
  });

  it('should isDead be true when state is Dead', () => {
    let testObj = new Knave({ _health: InhabitantHealth.Dead });

    expect(testObj.isDead).toBeTruthy();
  });

  it('should ignore Healthy Simpleton if asked', () => {
    let needHelp = new Simpleton();
    let savior = new Knave();

    expect(needHelp.askHelp(savior)).toBeFalsy();
    expect(needHelp.health).toBe(InhabitantHealth.Wounded);
  });

  it('should ignore Wounded Simpleton if asked', () => {
    let needHelp = new Simpleton({ _health: InhabitantHealth.Wounded });
    let savior = new Knave();

    expect(needHelp.askHelp(savior)).toBeFalsy();
    expect(needHelp.health).toBe(InhabitantHealth.Dead);
  });

  it('should ignore Healthy Knave if asked', () => {
    let needHelp = new Knave();
    let savior = new Knave();

    expect(needHelp.askHelp(savior)).toBeFalsy();
    expect(needHelp.health).toBe(InhabitantHealth.Wounded);
  });

  it('should ignore Wounded Knave if asked', () => {
    let needHelp = new Knave({ _health: InhabitantHealth.Wounded });
    let savior = new Knave();

    expect(needHelp.askHelp(savior)).toBeFalsy();
    expect(needHelp.health).toBe(InhabitantHealth.Dead);
  });

  it('should ignore Healthy Vindictive if asked', () => {
    let needHelp = new Vindictive();
    let savior = new Knave();

    expect(needHelp.askHelp(savior)).toBeFalsy();
    expect(needHelp.health).toBe(InhabitantHealth.Wounded);
  });

  it('should ignore Wounded Vindictive if asked', () => {
    let needHelp = new Vindictive({ _health: InhabitantHealth.Wounded });
    let savior = new Knave();

    expect(needHelp.askHelp(savior)).toBeFalsy();
    expect(needHelp.health).toBe(InhabitantHealth.Dead);
  });
});

describe('Vindictive', () => {

  it('should create Vindictive with default health as Healthy', () => {
    let testObj = new Vindictive();

    expect(testObj.health).toBe(InhabitantHealth.Healthy);
  });

  it('should create Vindictive with input health', () => {
    let testObj = new Vindictive({ _health: InhabitantHealth.Dead });

    expect(testObj.health).toBe(InhabitantHealth.Dead);
  });

  it('should isDead be false when state is Healthy', () => {
    let testObj = new Vindictive({ _health: InhabitantHealth.Healthy });

    expect(testObj.isDead).toBeFalsy();
  });

  it('should isDead be false when state is Wounded', () => {
    let testObj = new Vindictive({ _health: InhabitantHealth.Wounded });

    expect(testObj.isDead).toBeFalsy();
  });

  it('should isDead be true when state is Dead', () => {
    let testObj = new Vindictive({ _health: InhabitantHealth.Dead });

    expect(testObj.isDead).toBeTruthy();
  });

  it('should help Healthy Simpleton twice if asked', () => {
    let needHelp = new Simpleton();
    let savior = new Vindictive();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });

  it('should help Wounded Simpleton twice if asked', () => {
    let needHelp = new Simpleton({ _health: InhabitantHealth.Wounded });
    let savior = new Vindictive();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });

  it('should help Healthy Knave, then ignore after betrayal', () => {
    let needHelp = new Knave();
    let savior = new Vindictive();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
    expect(savior.askHelp(needHelp)).toBeFalsy();
    expect(savior.health).toBe(InhabitantHealth.Wounded);
    expect(needHelp.askHelp(savior)).toBeFalsy();
    expect(needHelp.health).toBe(InhabitantHealth.Wounded);
  });

  it('should help Wounded Knave, then ignore after betrayal', () => {
    let needHelp = new Knave({ _health: InhabitantHealth.Wounded });
    let savior = new Vindictive();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
    expect(savior.askHelp(needHelp)).toBeFalsy();
    expect(savior.health).toBe(InhabitantHealth.Wounded);
    expect(needHelp.askHelp(savior)).toBeFalsy();
    expect(needHelp.health).toBe(InhabitantHealth.Wounded);
  });

  it('should help Healthy Vindictive twice if asked', () => {
    let needHelp = new Vindictive();
    let savior = new Vindictive();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });

  it('should help Wounded Vindictive twice if asked', () => {
    let needHelp = new Vindictive({ _health: InhabitantHealth.Wounded });
    let savior = new Vindictive();

    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
    expect(needHelp.askHelp(savior)).toBeTruthy();
    expect(needHelp.health).toBe(InhabitantHealth.Healthy);
  });
});