import Files from './localforage-files'

import { Plugins as PhaserPlugins } from 'phaser';
class FilesPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config?: any) {
        return new Files(config);
    }
}

export default FilesPlugin;