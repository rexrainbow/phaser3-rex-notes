import Scale from './scale.js';
import ScaleDownDestroy from './scale-down-destroy.js';
import Popup from './popup.js';

class ScalePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new Scale(gameObject, config);
    }
}

// mixin
var methods = {
    scaleDownDestroy: ScaleDownDestroy,
    popup: Popup,
}
Object.assign(
    ScalePlugin.prototype,
    methods
);

export default ScalePlugin;