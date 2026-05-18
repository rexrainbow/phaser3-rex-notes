import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Grid extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerGrid';
    }
}

Object.assign(
    Grid.prototype,
    UpdateShapeMethods,
)

export default Grid;