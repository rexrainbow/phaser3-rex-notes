import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Spinner extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerSpinner';
    }
}

Object.assign(
    Spinner.prototype,
    UpdateShapeMethods,
)

export default Spinner;