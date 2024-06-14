import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Orbit extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerOrbit';
    }
}

Object.assign(
    Orbit.prototype,
    UpdateShapeMethods,
)

export default Orbit;