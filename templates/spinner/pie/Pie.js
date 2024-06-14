import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Pie extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerPie';
    }
}

Object.assign(
    Pie.prototype,
    UpdateShapeMethods,
)

export default Pie;