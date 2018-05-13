import { GameConfig } from "./game-config";

export class GameStatistic {

    simpletonsAmount = 0;
    knavesAmount = 0;
    vindictiveAmount = 0;

    getTotal() {
        return this.simpletonsAmount + this.knavesAmount + this.vindictiveAmount;
    }

    getSimpletonsPart() {
        return this.simpletonsAmount / this.getTotal();
    }

    getKnavesPart() {
        return this.knavesAmount / this.getTotal();
    }

    getVindictivePart() {
        return this.vindictiveAmount / this.getTotal();
    }

    clone(): GameStatistic {
        return Object.assign(new GameStatistic(), this);
    }
}