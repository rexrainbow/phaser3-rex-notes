import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Arrow extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerArrow';

        this.setDirection(GetValue(config, 'direction', 'down'));
    }
}

Object.assign(
    Arrow.prototype,
    UpdateShapeMethods,
)

export default Arrow;