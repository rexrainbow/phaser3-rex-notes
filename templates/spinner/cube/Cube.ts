import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Cube extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerCube';
    }

}

Object.assign(
    Cube.prototype,
    UpdateShapeMethods,
)

export default Cube;