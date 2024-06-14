import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Radio extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerRadio';
    }
}

Object.assign(
    Radio.prototype,
    UpdateShapeMethods,
)

export default Radio;