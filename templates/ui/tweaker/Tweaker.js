import TweakerShell from './TweakerShell.js';
import Builders from './builders/Builders.js';

const GetValue = Phaser.Utils.Objects.GetValue;
const Merge = Phaser.Utils.Objects.Merge;

class Tweaker extends TweakerShell {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (config.styles === undefined) {
            config.styles = {};  // TODO: Default styles
        }

        if (config.builders === undefined) {
            config.builders = {};
        }
        config.builders = Merge(config.builders, Builders);

        // Create sizer
        super(scene, config);
        this.type = 'rexTweaker';
    }
}

export default Tweaker