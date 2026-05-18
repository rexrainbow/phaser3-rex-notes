import { Utils as PhaserUtils } from 'phaser';
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;
const GetValue = PhaserUtils.Objects.GetValue;

class MinMaxBounds {
    max: any;
    min: any;

    constructor(min?: any, max?: any) {
        if (IsPlainObject(min)) {
            var config = min;
            min = GetValue(config, 'min', undefined);
            max = GetValue(config, 'max', undefined);
        }
        this.setMin(min);
        this.setMax(max);
    }

    setMin(value?: any) {
        this.min = value;
        return this;
    }

    setMax(value?: any) {
        this.max = value;
        return this;
    }

    clamp(value?: any) {
        if ((this.min !== undefined) && (value < this.min)) {
            value = this.min;
        } else if ((this.max !== undefined) && (value > this.max)) {
            value = this.max;
        }
        return value;
    }
}

export default MinMaxBounds;