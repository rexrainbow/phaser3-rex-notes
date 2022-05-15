import Sizer from '../sizer/Sizer.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tweaker extends Sizer {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexTweaker';
    }
}

export default Tweaker