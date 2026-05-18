import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Radio extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerRadio';
    }
}

Object.assign(
    Radio.prototype,
    UpdateShapeMethods,
)

export default Radio;