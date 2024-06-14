import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Ios extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerIos';
    }
}

Object.assign(
    Ios.prototype,
    UpdateShapeMethods,
)

export default Ios;