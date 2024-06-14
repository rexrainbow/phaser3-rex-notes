import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Puff extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerPuff';
    }
}

Object.assign(
    Puff.prototype,
    UpdateShapeMethods,
)

export default Puff;