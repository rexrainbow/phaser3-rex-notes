import CheckboxBase from '../../../plugins/checkbox.js';
import Click from '../click/Click.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Checkbox extends CheckboxBase {
    constructor(scene, x, y, width, height, color, config) {
        super(scene, x, y, width, height, color, config);

        this._click = new Click(this, GetValue(config, 'input'));

        this._click.on('click', this.toggleChecked, this);
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