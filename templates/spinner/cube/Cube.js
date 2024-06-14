import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Cube extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerCube';
    }

}

Object.assign(
    Cube.prototype,
    UpdateShapeMethods,
)

export default Cube;