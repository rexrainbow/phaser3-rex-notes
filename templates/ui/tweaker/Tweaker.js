import TweakerShell from './TweakerShell.js';
import RegisterDefaultInputHandlers from './methods/RegisterDefaultInputHandlers.js';

class Tweaker extends TweakerShell {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (config.styles === undefined) {
            config.styles = {};  // TODO: Default styles
        }

        config.background = config.styles.background || {};
        config.space = config.styles.space || {};

        // Create sizer
        super(scene, config);
        this.type = 'rexTweaker';

        this.inputHandlers = [];

        RegisterDefaultInputHandlers.call(this);
    }
}

export default Tweaker