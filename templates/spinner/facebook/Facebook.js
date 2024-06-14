import Base from '../base/Base.js';
import UpdateShapeMethods from './UpdateShapeMethods.js';

class Facebook extends Base {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexSpinnerFacebook';
    }
}

Object.assign(
    Facebook.prototype,
    UpdateShapeMethods,
)

export default Facebook;