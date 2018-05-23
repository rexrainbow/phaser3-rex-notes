import DragCursor from './dragcursor.js';

class DragCursorPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    add(parent, config) {
        return new DragCursor(parent, config);
    }

}

export default DragCursorPlugin;