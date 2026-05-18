import TagPlayer from './tagplayer';

import { Plugins as PhaserPlugins } from 'phaser';
class TagPlayerPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene?: any, config?: any) {
        return new TagPlayer(scene, config);
    }
}

export default TagPlayerPlugin;