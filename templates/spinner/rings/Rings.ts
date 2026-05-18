import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Rings extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerRings';
    }
}

Object.assign(
    Rings.prototype,
    UpdateShapeMethods,
)

export default Rings;