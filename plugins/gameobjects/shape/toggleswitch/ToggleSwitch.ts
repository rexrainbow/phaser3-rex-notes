import ToggleSwitchShape from './ToggleSwitchShape';
import Click from '../../../input/button/Button';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class ToggleSwitch extends ToggleSwitchShape {
    _click: any;
    toggleValue: any;

    constructor(scene?: any, x?: any, y?: any, width?: any, height?: any, color?: any, config?: any) {
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

export default ToggleSwitch;