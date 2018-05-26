
export class GameConfig {

    static readonly ONE_HUNDRED_PERCENT = 100;
    static readonly DEFAULT_ANIMATION_DELAY = 500;
    static readonly DEFAULT_GAME_DURATION = 100;
    static readonly INHABITANTS_CREATION_FREQUENCY = 5;
    static readonly INHABITANTS_CREATION_AMOUNT = 100;
    static readonly SIMPLETONS_GENERATION_FACTOR = 0.5;
    static readonly KNAVES_GENERATION_FACTOR = 0.5;
    static readonly VINDICTIVE_GENERATION_FACTOR = 0.5;
    static readonly CREATION_AMOUNT_PERCENT = GameConfig.INHABITANTS_CREATION_AMOUNT / GameConfig.ONE_HUNDRED_PERCENT;
    static readonly DEFAULT_RANDOM_SEED = 10;

    simpletonsPercent: number;
    knavesPercent: number;

    animationDelay = GameConfig.DEFAULT_ANIMATION_DELAY;
    gameDuration = GameConfig.DEFAULT_GAME_DURATION;
    randomSeed: number;

    constructor(initConfig?) {
        Object.assign(this, initConfig);
    }

    getVindictivePercent() {
        if (typeof this.simpletonsPercent === "undefined" || typeof this.knavesPercent === "undefined") {
            return 0;
        }

        let restPercentage = GameConfig.ONE_HUNDRED_PERCENT - this.simpletonsPercent - this.knavesPercent;
        return (restPercentage >= 0 && restPercentage <= GameConfig.ONE_HUNDRED_PERCENT) ? restPercentage : 0;
    }
}