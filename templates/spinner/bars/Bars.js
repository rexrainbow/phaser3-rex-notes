import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Bars extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerBars';
    }

}

Object.assign(
    Bars.prototype,
    UpdateShapeMethods,
)

export default Bars;