import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Hearts extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerHearts';
    }
}

Object.assign(
    Hearts.prototype,
    UpdateShapeMethods,
)

export default Hearts;