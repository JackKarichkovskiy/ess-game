
export class GameConfig {

    simpletonsPercent: number;
    knavesPercent: number;

    constructor(initConfig?: GameConfig) {
        Object.assign(this, initConfig);
    }

    get vindictivePercent() {
        if (!this.simpletonsPercent || !this.knavesPercent) return 0;

        let restPercentage = 100 - this.simpletonsPercent - this.knavesPercent;
        return restPercentage >= 0 && restPercentage <= 100 ? restPercentage : 0;
    }
}