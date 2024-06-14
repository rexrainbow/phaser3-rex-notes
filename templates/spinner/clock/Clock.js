import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Clock extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerClock';
    }

}

Object.assign(
    Clock.prototype,
    UpdateShapeMethods,
)

export default Clock;