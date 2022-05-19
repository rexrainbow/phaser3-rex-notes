import Sizer from '../sizer/Sizer.js';
import Methods from './methods/Methods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tweaker extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexTweaker';
    }
}

Object.assign(
    Tweaker.prototype,
    Methods
);

export default Tweaker