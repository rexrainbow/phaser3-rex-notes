import EightDirection from './eightdirection';

import { Plugins as PhaserPlugins } from 'phaser';
class EightDirectionPlugin extends PhaserPlugins.BasePlugin {
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
        return new EightDirection(gameObject, config);
    }

}

export default EightDirectionPlugin;