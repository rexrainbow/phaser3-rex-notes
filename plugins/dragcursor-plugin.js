import DragCursor from './dragcursor.js';

class DragCursorPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(parent, config) {
        return new DragCursor(parent, config);
    }

}

export default DragCursorPlugin;