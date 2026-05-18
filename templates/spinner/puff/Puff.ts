import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Puff extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerPuff';
    }
}

Object.assign(
    Puff.prototype,
    UpdateShapeMethods,
)

export default Puff;