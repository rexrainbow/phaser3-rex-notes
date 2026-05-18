import { Math as PhaserMath } from 'phaser';
const Linear = PhaserMath.Linear;
const Percent = PhaserMath.Percent;

export default {
    setValue(value?: any, min?: any, max?: any) {
        if ((value === undefined) || (value === null)) {
            return this;
        }

        if (min !== undefined) {
            value = Percent(value, min, max);
        }
        this.value = value;
        return this;
    },

    addValue(inc?: any, min?: any, max?: any) {
        if (min !== undefined) {
            inc = Percent(inc, min, max);
        }
        this.value += inc;
        return this;
    },

    getValue(min?: any, max?: any) {
        var value = this.value;
        if ((min !== undefined) && (max !== undefined)) {
            value = Linear(min, max, value);
        }
        return value;
    }
}