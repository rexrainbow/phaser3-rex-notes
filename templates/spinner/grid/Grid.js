import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Grid extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerGrid';
    }
}

Object.assign(
    Grid.prototype,
    UpdateShapeMethods,
)

export default Grid;