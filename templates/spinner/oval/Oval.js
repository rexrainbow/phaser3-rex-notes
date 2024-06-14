import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Oval extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerOval';
    }
}

Object.assign(
    Oval.prototype,
    UpdateShapeMethods,
)

export default Oval;