import GenerateTweakerShellClass from './GenerateTweakerShellClass.js';
import RegisterDefaultInputHandlers from './methods/RegisterDefaultInputHandlers.js';

class Tweaker extends GenerateTweakerShellClass() {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (config.hasOwnProperty('style')) {
            config.styles = config.style;
        }

        if (config.styles === undefined) {
            config.styles = {};  // TODO: Default styles
        }

        config.background = config.styles.background || {};
        config.space = config.styles.space || {};

        // Create sizer
        super(scene, config);
        this.type = 'rexTweaker';

        RegisterDefaultInputHandlers.call(this);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        this.inputHandlers = undefined;
    }
}

export default Tweaker