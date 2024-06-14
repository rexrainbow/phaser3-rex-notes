import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Hearts extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerHearts';
    }
}

Object.assign(
    Hearts.prototype,
    UpdateShapeMethods,
)

export default Hearts;