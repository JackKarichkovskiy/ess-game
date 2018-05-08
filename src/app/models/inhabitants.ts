
export abstract class Inhabitant {

    private static idCounter = 0;
    health: InhabitantHealth = InhabitantHealth.Healthy;

    private id = Inhabitant.idCounter++;
    private className: string;

    constructor(initParams?) {
        Object.assign(this, initParams);
        this.className = this.constructor.name;
    }

    private help(other: Inhabitant): boolean {
        if (this.isHelping(other)) {
            other.upgradeHealth();
            return true;
        } else {
            other.downgradeHealth();
            return false;
        }
    }

    protected abstract isHelping(other: Inhabitant): boolean;

    abstract clone(): Inhabitant;

    askHelp(other: Inhabitant): boolean {
        if (!other) {
            this.downgradeHealth();
            return false;
        }

        return other.help(this);
    }

    private downgradeHealth() {
        switch (this.health) {
            case InhabitantHealth.Healthy:
                this.health = InhabitantHealth.Wounded;
                break;
            case InhabitantHealth.Wounded:
                this.health = InhabitantHealth.Dead;
                break;
            case InhabitantHealth.Dead:
                break;
            default:
                throw new Error('Unpredictable health state: ' + this.health);
        }
    }

    private upgradeHealth() {
        switch (this.health) {
            case InhabitantHealth.Healthy:
                break;
            case InhabitantHealth.Wounded:
                this.health = InhabitantHealth.Healthy;
                break;
            case InhabitantHealth.Dead:
                // Nothing could be done
                break;
            default:
                throw new Error('Unpredictable health state: ' + this.health);
        }
    }

    isDead() {
        return this.health === InhabitantHealth.Dead;
    }
}

export class Simpleton extends Inhabitant {

    protected isHelping(other: Inhabitant): boolean {
        return true;
    }

    clone(): Simpleton {
        return Object.assign(new Simpleton(), this);
    }
}

export class Knave extends Inhabitant {

    protected isHelping(other: Inhabitant): boolean {
        return false;
    }

    clone(): Knave {
        return Object.assign(new Knave(), this);
    }
}

export class Vindictive extends Inhabitant {

    notHelpingInhabitants: Inhabitant[] = [];

    protected isHelping(other: Inhabitant): boolean {
        return !this.notHelpingInhabitants.includes(other);
    }

    askHelp(other: Inhabitant): boolean {
        if (super.askHelp(other)) return true;

        if (!this.notHelpingInhabitants.includes(other))
            this.notHelpingInhabitants.push(other);
        return false;
    }

    clone(): Vindictive {
        return Object.assign(new Vindictive(), this, { notHelpingInhabitants: Object.assign([], this.notHelpingInhabitants) });
    }
}

export enum InhabitantHealth {
    Healthy = 0, Wounded = 1, Dead = 2
}