import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Rings extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerRings';
    }
}

Object.assign(
    Rings.prototype,
    UpdateShapeMethods,
)

export default Rings;