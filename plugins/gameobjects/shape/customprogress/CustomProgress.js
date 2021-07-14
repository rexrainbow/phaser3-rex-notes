import CustomShapes from '../customshapes/CustomShapes.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class CustomProgress extends CustomShapes {
    constructor(scene, x, y, width, height, config) {
        super(scene, x, y, width, height, config);

        this.setValue(GetValue(config, 'value', 0));
    }

    get centerX() {
        return this.width / 2;;
    }

    get centerY() {
        return this.height / 2;
    }

    get radius() {
        return Math.min(this.centerX, this.centerY);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = Clamp(value, 0, 1);
        this.dirty = this.dirty || (this._value != value);
        this._value = value;
    }

    setValue(value) {
        this.value = value;
        return this;
    }
}

export default CustomProgress;