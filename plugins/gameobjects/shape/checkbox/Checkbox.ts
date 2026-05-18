import CheckboxShape from './CheckboxShape';
import Click from '../../../input/button/Button';
import { DefaultBoxFillColor, DefaultCheckerColor } from './Const';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

class Checkbox extends CheckboxShape {
    _click: any;
    toggleValue: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, color?: any, config?: any) {
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
        this._click.on('click', function() {
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

    setReadOnly(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.readOnly = enable;
        return this;
    }
}

export default Checkbox;