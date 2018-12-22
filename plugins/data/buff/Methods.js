import Buff from '../../utils/buff/Buff.js';
import MinMaxBounds from '../../utils/minmaxbounds/MinMaxBounds.js';

export default {
    setBaseValue: function (key, value) {
        this.baseValues[key] = value;
        this.set(key, this.getBuffResult(key));
        return this;
    },

    removeBaseValue: function (key) {
        if (this.baseValues.hasOwnProperty(key)) {
            delete this.baseValues[key];
            this.remove(key);
        }
        return this;
    },

    setBuff: function (key, buffKey, value) {
        if (!this.buffs.hasOwnProperty(key)) {
            this.buffs[key] = new Buff();
        }
        this.buffs[key].set(buffKey, value);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    enableBuff: function (key, buffKey, enable) {
        if (!this.buffs.hasOwnProperty(key)) {
            this.buffs[key] = new Buff();
        }
        this.buffs[key].setEnable(buffKey, enable);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    removeBuff: function (key, buffKey) {
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

    setMin: function (key, min) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMin(min);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    setMax: function (key, max) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMax(max);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    setBounds: function (key, min, max) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMin(min).setMax(max);
        this.set(key, this.getBuffResult(key));
        return this;
    },

    getBuffResult: function (key) {
        return this.clamp(key, this.buff(key));
    },

    buff: function (key, baseValue) {
        if (baseValue === undefined) {
            baseValue = this.getBaseValue(key);
        }
        if (!this.buffs.hasOwnProperty(key)) {
            return baseValue;
        }
        return this.buffs[key].buff(baseValue);
    },

    clamp: function (key, value) {
        if (value === undefined) {
            value = this.list[key];
        }
        if (!this.bounds.hasOwnProperty(key)) {
            return value;
        }
        return this.bounds[key].clamp(value);
    },

    getBaseValue: function (key) {
        if (!this.baseValues.hasOwnProperty(key)) {
            this.baseValues[key] = 0;
        }
        return this.baseValues[key];
    },

    getBuffs: function (key, buffKey) {
        var buffs = this.buffs[key];
        if (buffKey === undefined) {
            return buffs;
        }
        if (buffs && buffs.hasOwnProperty(buffKey)) {
            return buffs[buffKey];
        }

        return undefined;
    },

    getBounds: function (key) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        return this.bounds[key];
    },
};