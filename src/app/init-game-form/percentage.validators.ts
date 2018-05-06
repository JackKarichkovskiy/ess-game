import { AbstractControl, ValidationErrors } from "@angular/forms";
import { GameConfig } from "../models/game-config";

export class PercentageValidators {

    static cannotBeGtThanLimit(control: AbstractControl): ValidationErrors | null {
        let simpletonsPercent = +control.get('simpletonsPercent').value;
        let knavesPercent = +control.get('knavesPercent').value;

        let sum = simpletonsPercent + knavesPercent;
        if (sum > GameConfig.ONE_HUNDRED_PERCENT)
            return {
                cannotBeGtThanLimit: {
                    limit: GameConfig.ONE_HUNDRED_PERCENT,
                    actualSum: sum
                }
            };

        return null;
    }
}