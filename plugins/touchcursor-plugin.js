import TouchCursor from './touchcursor.js';

import { Plugins as PhaserPlugins } from 'phaser';
class TouchCursorPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject, config) {
        return new TouchCursor(gameObject, config);
    }

}

export default TouchCursorPlugin;