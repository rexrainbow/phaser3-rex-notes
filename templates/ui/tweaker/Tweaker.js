import TweakerShell from './TweakerShell.js';
import Builders from './builders/Builders.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Tweaker extends TweakerShell {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        config.styles = {};  // TODO
        config.builders = Builders;

        // Create sizer
        super(scene, config);
        this.type = 'rexTweaker';
    }
}

export default Tweaker