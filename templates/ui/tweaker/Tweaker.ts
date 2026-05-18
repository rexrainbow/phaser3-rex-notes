import GenerateTweakerShellClass from './GenerateTweakerShellClass';
import RegisterDefaultInputHandlers from './methods/RegisterDefaultInputHandlers';

class Tweaker extends GenerateTweakerShellClass() {
    ignoreDestroy: any;
    inputHandlers: any;
    scene: any;
    type: any;

    constructor(scene?: any, config?: any) {
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

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        this.inputHandlers = undefined;
    }
}

export default Tweaker