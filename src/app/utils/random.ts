
export class RandomGenerator {
    // LCG using GCC's constants
    private readonly m = 0x80000000; // 2**31;
    private readonly a = 1103515245;
    private readonly c = 12345;

    private static instance = new RandomGenerator(new Date().getTime());

    private state: number;

    private constructor(private seed: number) {
        this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }

    private generateNextInt(): number {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    private generateNextFloat(): number {
        // returns in range [0,1]
        return this.generateNextInt() / (this.m - 1);
    }

    private generateNextRange(start: number, end: number) {
        // returns in range [start, end): including start, excluding end
        // can't modulu nextInt because of weak randomness in lower bits
        var rangeSize = end - start;
        var randomUnder1 = this.generateNextInt() / this.m;
        return start + Math.floor(randomUnder1 * rangeSize);
    }

    private generateChoice(array: number[]): number {
        return array[this.generateNextRange(0, array.length)];
    }

    static setup(seed?: number) {
        this.instance = seed ? new RandomGenerator(seed) : new RandomGenerator(new Date().getTime());
    }

    static nextInt(): number {
        return this.instance.generateNextInt();
    }

    static nextFloat(): number {
        return this.instance.generateNextFloat();
    }

    static nextRange(start: number, end: number) {
        return this.instance.generateNextRange(start, end);
    }

    static choice(array: number[]): number {
        return this.instance.generateChoice(array);
    }
}