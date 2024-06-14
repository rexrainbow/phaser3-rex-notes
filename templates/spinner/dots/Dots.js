import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Dots extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerDots';
    }
}

Object.assign(
    Dots.prototype,
    UpdateShapeMethods,
)

export default Dots;