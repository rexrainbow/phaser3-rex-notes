import Flash from './flash';

import { Plugins as PhaserPlugins } from 'phaser';
class FlashPlugin extends PhaserPlugins.BasePlugin {
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
        return new Flash(gameObject, config);
    }
}

export default FlashPlugin;