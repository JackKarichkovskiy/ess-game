
export abstract class Inhabitant {

    private static idCounter = 0;
    
    health: InhabitantHealth = InhabitantHealth.Healthy;

    private id = Inhabitant.idCounter++;
    private className: string;

    constructor(initParams?) {
        Object.assign(this, initParams);
        this.className = this.constructor.name;
    }

    abstract clone(): Inhabitant;

    protected abstract isHelping(other: Inhabitant): boolean;

    askHelp(other: Inhabitant): boolean {
        if (!other) {
            this.downgradeHealth();
            return false;
        }

        return other.help(this);
    }

    isDead() {
        return this.health === InhabitantHealth.Dead;
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
}

export class Simpleton extends Inhabitant {

    clone(): Simpleton {
        return Object.assign(new Simpleton(), this);
    }

    protected isHelping(other: Inhabitant): boolean {
        return true;
    }
}

export class Knave extends Inhabitant {

    clone(): Knave {
        return Object.assign(new Knave(), this);
    }

    protected isHelping(other: Inhabitant): boolean {
        return false;
    }
}

export class Vindictive extends Inhabitant {

    notHelpingInhabitants: Inhabitant[] = [];

    askHelp(other: Inhabitant): boolean {
        if (super.askHelp(other)) return true;

        if (!this.notHelpingInhabitants.includes(other))
            this.notHelpingInhabitants.push(other);
        return false;
    }

    clone(): Vindictive {
        return Object.assign(new Vindictive(), this, { notHelpingInhabitants: Object.assign([], this.notHelpingInhabitants) });
    }

    protected isHelping(other: Inhabitant): boolean {
        return !this.notHelpingInhabitants.includes(other);
    }
}

export enum InhabitantHealth {
    Healthy = 0, Wounded = 1, Dead = 2
}