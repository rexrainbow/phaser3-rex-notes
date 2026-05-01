import CursorAtBounds from './cursoratbounds.js';

import { Plugins as PhaserPlugins } from 'phaser';
class CursorAtBoundsPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new CursorAtBounds(scene, config);
    }

}

export default CursorAtBoundsPlugin;