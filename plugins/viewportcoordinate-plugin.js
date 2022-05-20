import AddViewportCoordinateProperties from './viewportcoordinate.js';

class ViewportCoordinatePlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, viewport, vpx, vpy, transformCallback) {
        return AddViewportCoordinateProperties(gameObject, viewport, vpx, vpy, transformCallback);
    }
}

export default ViewportCoordinatePlugin;