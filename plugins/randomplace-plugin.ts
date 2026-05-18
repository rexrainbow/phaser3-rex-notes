import RandomPlace from './randomplace';

import { Plugins as PhaserPlugins } from 'phaser';
class RandomPlacePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    randomPlace(items?: any, options?: any) {
        return RandomPlace(items, options);
    }
}

export default RandomPlacePlugin;