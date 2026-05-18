import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Ios extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerIos';
    }
}

Object.assign(
    Ios.prototype,
    UpdateShapeMethods,
)

export default Ios;