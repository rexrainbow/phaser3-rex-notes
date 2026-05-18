import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Oval extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerOval';
    }
}

Object.assign(
    Oval.prototype,
    UpdateShapeMethods,
)

export default Oval;