import TagPlayer from './tagplayer.js';

import { Plugins as PhaserPlugins } from 'phaser';
class TagPlayerPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new TagPlayer(scene, config);
    }
}

export default TagPlayerPlugin;