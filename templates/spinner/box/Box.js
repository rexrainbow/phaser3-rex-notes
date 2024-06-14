import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Box extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerBox';
    }

}

Object.assign(
    Box.prototype,
    UpdateShapeMethods,
)

export default Box;