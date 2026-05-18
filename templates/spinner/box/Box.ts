import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Box extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerBox';
    }

}

Object.assign(
    Box.prototype,
    UpdateShapeMethods,
)

export default Box;