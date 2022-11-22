import TweakerShell from './TweakerShell.js';

class Tweaker extends TweakerShell {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }

        if (config.styles === undefined) {
            config.styles = {};  // TODO: Default styles
        }

        // Overwrite space parameter
        var space = config.styles.space;
        if (space) {
            config.space = space;
            delete config.styles.space;
        }

        // Create sizer
        super(scene, config);
        this.type = 'rexTweaker';
    }
}

export default Tweaker