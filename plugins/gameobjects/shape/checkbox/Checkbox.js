import CheckboxShape from './CheckboxShape.js';
import Click from '../../../input/button/Button.js';
import { DefaultBoxFillColor, DefaultCheckerColor } from './Const.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class Checkbox extends CheckboxShape {
    constructor(scene, x, y, width, height, color, config) {
        if (IsPlainObject(x)) {
            config = x;
            x = GetValue(config, 'x', 0);
            y = GetValue(config, 'y', 0);
            width = GetValue(config, 'width', 2);
            height = GetValue(config, 'height', 2);
            color = GetValue(config, 'color', DefaultBoxFillColor);
        } else if (IsPlainObject(color)) {
            config = color;
            color = GetValue(config, 'color', DefaultBoxFillColor);
        }

        super(scene, x, y, width, height, color, config);

        this._click = new Click(this, GetValue(config, 'click'));
        this._click.on('click', function () {
            this.toggleValue();
        }, this);

        this.setReadOnly(GetValue(config, 'readOnly', false));
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