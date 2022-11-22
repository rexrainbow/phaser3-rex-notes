import Sizer from '../sizer/Sizer.js';
import Methods from './methods/Methods.js';
import CreateBackground from './builders/CreateBackground.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class TweakerShell extends Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (config.orientation === undefined) {
            config.orientation = 'y';
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexTweakerShell';

        this.styles = GetValue(config, 'styles') || {};

        var background = CreateBackground(scene, undefined, config.background);
        if (background) {
            this.addBackground(background);
        }
    }
}

Object.assign(
    TweakerShell.prototype,
    Methods
);

export default TweakerShell;