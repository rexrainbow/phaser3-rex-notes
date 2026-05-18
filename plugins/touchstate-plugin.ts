import TouchState from './touchstate';

import { Plugins as PhaserPlugins } from 'phaser';
class TouchStatePlugin extends PhaserPlugins.BasePlugin {
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
        return new TouchState(gameObject, config);
    }

}

export default TouchStatePlugin;