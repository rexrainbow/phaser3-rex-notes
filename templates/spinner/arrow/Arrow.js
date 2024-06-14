import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Arrow extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerArrow';
    }

    resetFromConfig(config, setDefaults) {
        if (setDefaults === undefined) {
            setDefaults = false;
        }

        super.resetFromConfig(config, setDefaults);

        var defaultValue;

        defaultValue = (setDefaults) ? 'down' : this.direction;
        this.setDirection(GetValue(config, 'direction', defaultValue));

        return this;
    }
}

Object.assign(
    Arrow.prototype,
    UpdateShapeMethods,
)

export default Arrow;