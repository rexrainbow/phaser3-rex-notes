import Clock from '../../clock';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class LifeTime extends Clock {
    complete: any;
    destroyMode: any;
    isRunning: any;
    lifeTime: any;
    now: any;
    parent: any;
    start: any;

    resetFromJSON(o?: any) {
        super.resetFromJSON(o);
        this.setLifeTime(GetValue(o, 'lifeTime', 1000));
        this.setDestroyMode(GetValue(o, 'destroy', true));
        if (GetValue(o, 'start', true)) {
            this.start();
        }
        return this;
    }

    toJSON() {
        var o = super.toJSON();
        o.lifeTime = this.lifeTime;
        return o;
    }

    setLifeTime(time?: any) {
        this.lifeTime = time;
        return this;
    }

    addToLifeTime(time?: any) {
        this.lifeTime += time;
        return this;
    }

    setDestroyMode(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.destroyMode = enable;
        return this;
    }

    get isAlive() {
        return this.now < this.lifeTime;
    }

    get remainder() {
        var remainder = this.lifeTime - this.now;
        if (remainder < 0) {
            remainder = 0;
        }
        return remainder;
    }

    update(time?: any, delta?: any) {
        if (!this.isRunning) {
            return this;
        }

        super.update(time, delta);
        if (!this.isAlive) {
            this.complete();
            if (this.destroyMode) {
                this.gameObject.destroy();
            }
        }
        return this;
    }

    get gameObject() {
        return this.parent;
    }
}

export default LifeTime;