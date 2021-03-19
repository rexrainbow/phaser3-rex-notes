import CircularProgress from '../circularprogress/CircularProgress.js';
import OnTouchPad from './OnTouchPad.js';
import EaseValueMethods from '../utils/EaseValueMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Knob extends CircularProgress {
    constructor(scene, config) {
        // Create sizer
        super(scene, config);
        this.type = 'rexKnob';

        this.setEnable(GetValue(config, 'enable', undefined));
        this.setEaseValueDuration(GetValue(config, 'easeValue.duration', 0));
        this.setEaseValueFunction(GetValue(config, 'easeValue.ease', 'Linear'));

        // Input
        this.setInteractive()
            .on('pointerdown', OnTouchPad, this)
            .on('pointermove', OnTouchPad, this);
    }

    setEnable(enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.enable = enable;
        return this;
    }
}

Object.assign(
    Knob.prototype,
    EaseValueMethods
);

export default Knob;