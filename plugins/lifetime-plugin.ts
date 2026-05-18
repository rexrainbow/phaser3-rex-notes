import LifeTime from './lifetime';

import { Plugins as PhaserPlugins } from 'phaser';
class LifeTimePlugin extends PhaserPlugins.BasePlugin {
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
        return new LifeTime(gameObject, config);
    }

}

export default LifeTimePlugin;