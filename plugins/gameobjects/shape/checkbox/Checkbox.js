import CheckboxShape from './CheckboxShape.js';
import Click from '../../../input/button/Button.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Checkbox extends CheckboxShape {
    constructor(scene, x, y, width, height, color, config) {
        super(scene, x, y, width, height, color, config);

        this._click = new Click(this, GetValue(config, 'click'));
        this._click.on('click', this.toggleChecked, this);

        this.setReadOnly(GetValue(config, 'readOnly', false));
    }

    get value() {
        return this._value;
    }

    set value(value) {
        value = !!value;

        if (this._value === value) {
            return;
        }

        super.value = value;

        this.emit('valuechange', value);
    }

    get readOnly() {
        return !this._click.enable;
    }

    set readOnly(value) {
        this._click.enable = !value;
    }

    setReadOnly(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.readOnly = enable;
        return this;
    }
}

export default Checkbox;