import HitTest from './utils/input/HitTest.js';
import IsPointerInHitArea from './utils/input/IsPointerInHitArea.js';
import IsPointerInBounds from './utils/input/IsPointerInBounds.js';

class TouchHelperPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    destroy() {
        super.destroy();
    }
}

var methods = {
    hitTest: HitTest,
    isPointerInHitArea: IsPointerInHitArea,
    isPointerInBounds: IsPointerInBounds,
};

// mixin
Object.assign(
    TouchHelperPlugin.prototype,
    methods
);

export default TouchHelperPlugin;