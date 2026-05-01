import Files from './localforage-files.js'

import { Plugins as PhaserPlugins } from 'phaser';
class FilesPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new Files(config);
    }
}

export default FilesPlugin;