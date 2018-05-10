import { RandomGenerator } from "./random";
import { not } from "@angular/compiler/src/output/output_ast";

describe('RandomGenerator', () => {

  afterAll(() => RandomGenerator.setup());

  it('should nextInt generate different sequences with different defined seed', () => {
    RandomGenerator.setup(1);
    let firstSeq = [
      RandomGenerator.nextInt(),
      RandomGenerator.nextInt(),
      RandomGenerator.nextInt()
    ];

    RandomGenerator.setup(2);
    let secondSeq = [
      RandomGenerator.nextInt(),
      RandomGenerator.nextInt(),
      RandomGenerator.nextInt()
    ];

    expect(firstSeq).not.toEqual(secondSeq);
  });

  it('should nextInt generate equal sequences with seed defining', () => {
    let seed = 1;
    RandomGenerator.setup(seed);
    let firstSeq = [
      RandomGenerator.nextInt(),
      RandomGenerator.nextInt(), 
      RandomGenerator.nextInt()
    ];

    RandomGenerator.setup(seed);
    let secondSeq = [
      RandomGenerator.nextInt(),
      RandomGenerator.nextInt(),
      RandomGenerator.nextInt()
    ];

    expect(firstSeq).toEqual(secondSeq);
  });

  it('should nextFloat generate not equal sequences with different defined seed', () => {
    RandomGenerator.setup(1);
    let firstSeq = [
      RandomGenerator.nextFloat(),
      RandomGenerator.nextFloat(), 
      RandomGenerator.nextFloat()
    ];

    RandomGenerator.setup(2);
    let secondSeq = [
      RandomGenerator.nextFloat(),
      RandomGenerator.nextFloat(),
      RandomGenerator.nextFloat()
    ];

    expect(firstSeq).not.toEqual(secondSeq);
  });

  it('should nextFloat generate equal sequences with seed defining', () => {
    let seed = 1;
    RandomGenerator.setup(seed);
    let firstSeq = [
      RandomGenerator.nextFloat(),
      RandomGenerator.nextFloat(), 
      RandomGenerator.nextFloat()
    ];

    RandomGenerator.setup(seed);
    let secondSeq = [
      RandomGenerator.nextFloat(),
      RandomGenerator.nextFloat(),
      RandomGenerator.nextFloat()
    ];

    expect(firstSeq).toEqual(secondSeq);
  });
});
