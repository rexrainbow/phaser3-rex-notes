import DragScale from './dragscale.js';

class DragScalePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new DragScale(gameObject, config);
    }

}

export default DragScalePlugin;