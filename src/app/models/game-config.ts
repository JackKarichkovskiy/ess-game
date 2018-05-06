
export class GameConfig {

    static readonly ONE_HUNDRED_PERCENT = 100;
    static readonly DEFAULT_ANIMATION_SPEED = 100;
    static readonly DEFAULT_GAME_DURATION = 10;
    static readonly INHABITANTS_CREATION_FREQUENCY = 5;
    static readonly INHABITANTS_CREATION_AMOUNT = 100;
    static readonly SIMPLETONS_GENERATION_FACTOR = 0.5;
    static readonly KNAVES_GENERATION_FACTOR = 0.5;
    static readonly VINDICTIVE_GENERATION_FACTOR = 0.5;

    simpletonsPercent: number;
    knavesPercent: number;

    constructor(initConfig?) {
        Object.assign(this, initConfig);
    }

    getVindictivePercent() {
        if (!this.simpletonsPercent || !this.knavesPercent) return 0;

        let restPercentage = GameConfig.ONE_HUNDRED_PERCENT - this.simpletonsPercent - this.knavesPercent;
        return (restPercentage >= 0 && restPercentage <= GameConfig.ONE_HUNDRED_PERCENT) ? restPercentage : 0;
    }
}