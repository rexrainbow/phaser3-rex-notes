import Buff from '../../utils/buff/Buff.js';
import MinMaxBounds from '../../utils/minmaxbounds/MinMaxBounds.js';

export default {
    addBuff: function (key, buffKey, value) {
        this.enableBuff(key, buffKey, true);
        this.buffs[key].add(buffKey, value);
        return this;
    },

    enableBuff: function (key, buffKey, enable) {
        if (!this.buffs.hasOwnProperty(key)) {
            this.buffs[key] = new Buff();
        }
        this.buffs[key].setEnable(buffKey, enable);
        return this;
    },

    removeBuff: function (key, buffKey) {
        if (!this.buffs.hasOwnProperty(key)) {
            return this;
        }

        this.buffs[key].remove(buffKey);
        return this;
    },

    setBounds: function (key, min, max) {
        if (!this.bounds.hasOwnProperty(key)) {
            this.bounds[key] = new MinMaxBounds();
        }
        this.bounds[key].setMin(min).setMax(max);
        return this;
    },

    getBuffResult: function (key) {
        return this.clamp(key, this.buff(key));
    },

    buff: function (key, baseValue) {
        if (baseValue === undefined) {
            baseValue = this.list[key];
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

    getBuffs: function (key) {
        return this.buffs[key];
    },

    getBounds: function (key) {
        return this.bounds[key];
    },
};