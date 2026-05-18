import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Clock extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerClock';
    }

}

Object.assign(
    Clock.prototype,
    UpdateShapeMethods,
)

export default Clock;