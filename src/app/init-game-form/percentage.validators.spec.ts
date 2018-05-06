import { AbstractControl, FormGroup, FormControl } from "@angular/forms";
import { PercentageValidators } from "./percentage.validators";

describe('PercentageValidators', () => {

  it('should return null if sum is less than limit', () => {
    let control: AbstractControl = new FormGroup({
      simpletonsPercent: new FormControl('50', [
      ]),
      knavesPercent: new FormControl('50', [
      ])
    });

    expect(PercentageValidators.cannotBeGtThanLimit(control)).toBeNull();
  });

  it('should return error object if sum greater than limit', () => {
    console.log('START PercentageValidators');
    let control: AbstractControl = new FormGroup({
      simpletonsPercent: new FormControl('50', [
      ]),
      knavesPercent: new FormControl('51', [
      ])
    });

    expect(PercentageValidators.cannotBeGtThanLimit(control)).not.toBeNull();
  });


});
