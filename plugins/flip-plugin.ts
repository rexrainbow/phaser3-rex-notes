import Flip from './flip';

import { Plugins as PhaserPlugins } from 'phaser';
class FlipPlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;


    constructor(pluginManager?: any) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(gameObject?: any, config?: any) {
        return new Flip(gameObject, config);
    }
}

export default FlipPlugin;