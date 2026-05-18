import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Orbit extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerOrbit';
    }
}

Object.assign(
    Orbit.prototype,
    UpdateShapeMethods,
)

export default Orbit;