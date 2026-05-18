import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Pie extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerPie';
    }
}

Object.assign(
    Pie.prototype,
    UpdateShapeMethods,
)

export default Pie;