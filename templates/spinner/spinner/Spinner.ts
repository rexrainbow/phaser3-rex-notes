import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Spinner extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerSpinner';
    }
}

Object.assign(
    Spinner.prototype,
    UpdateShapeMethods,
)

export default Spinner;