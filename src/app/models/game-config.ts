
export class GameConfig {

    static readonly ONE_HUNDRED_PERCENT = 100;

    simpletonsPercent: number;
    knavesPercent: number;

    constructor(initConfig?: GameConfig) {
        Object.assign(this, initConfig);
    }

    get vindictivePercent() {
        if (!this.simpletonsPercent || !this.knavesPercent) return 0;

        let restPercentage = GameConfig.ONE_HUNDRED_PERCENT - this.simpletonsPercent - this.knavesPercent;
        return (restPercentage >= 0 && restPercentage <= GameConfig.ONE_HUNDRED_PERCENT) ? restPercentage : 0;
    }
}