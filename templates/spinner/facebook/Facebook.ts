import Base from '../base/Base';
import UpdateShapeMethods from './UpdateShapeMethods';

class Facebook extends Base {
    type: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexSpinnerFacebook';
    }
}

Object.assign(
    Facebook.prototype,
    UpdateShapeMethods,
)

export default Facebook;