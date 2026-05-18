import Buff from '../../utils/buff/Buff';
import MinMaxBounds from '../../utils/minmaxbounds/MinMaxBounds';

export default {
    setBaseValue(key?: any, value?: any) {
        this.baseValues[key] = value;
        this.set(key, this.getBuffResult(key));
        return this;
    },

    removeBaseValue(key?: any) {
        if (this.baseValues.hasOwnProperty(key)) {
            delete this.baseValues[key];
            this.remove(key);
        }
        return this;
    },

    setBuff(key?: any, buffKey?: any, value?: any) {
        if (!this.buffs.hasOwnProperty(key)) {
            this.buffs[key] = new Buff();
        }
        this.buffs[key].set(buffKey, value);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    enableBuff(key?: any, buffKey?: any, enable?: any) {
        if (!this.buffs.hasOwnProperty(key)) {
            this.buffs[key] = new Buff();
        }
        this.buffs[key].setEnable(buffKey, enable);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    removeBuff(key?: any, buffKey?: any) {
        if (this.buffs.hasOwnProperty(key)) {
            if (buffKey === undefined) {
                delete this.buffs[key];
            } else {
                this.buffs[key].remove(buffKey);
            }
        }
        this.set(key, this.getBuffResult(key));
        return this;
    },

    setMin(key?: any, min?: any) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMin(min);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    setMax(key?: any, max?: any) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMax(max);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    setBounds(key?: any, min?: any, max?: any) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMin(min).setMax(max);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    getBuffResult(key?: any) {
        return this.clamp(key, this.buff(key));
    },

    buff(key?: any, baseValue?: any) {
        if (baseValue === undefined) {
            baseValue = this.getBaseValue(key);
        }
        if (!this.buffs.hasOwnProperty(key)) {
            return baseValue;
        }
        return this.buffs[key].buff(baseValue);
    },

    clamp(key?: any, value?: any) {
        if (value === undefined) {
            value = this.list[key];
        }
        if (!this.bounds.hasOwnProperty(key)) {
            return value;
        }
        return this.bounds[key].clamp(value);
    },

    getBaseValue(key?: any) {
        if (!this.baseValues.hasOwnProperty(key)) {
            this.baseValues[key] = 0;
        }
        return this.baseValues[key];
    },

    getBuffs(key?: any, buffKey?: any) {
        var buffs = this.buffs[key];
        if (buffKey === undefined) {
            return buffs;
        }
        if (buffs && buffs.hasOwnProperty(buffKey)) {
            return buffs[buffKey];
        }

        return undefined;
    },

    getBuffValue(key?: any, buffKey?: any) {
        return this.getBuffs(key, buffKey).value
    },

    getBounds(key?: any) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        return this.bounds[key];
    },

    getMinBound(key?: any) {
        return this.getBounds(key).min;
    },

    getMaxBound(key?: any) {
        return this.getBounds(key).max;
    }
};