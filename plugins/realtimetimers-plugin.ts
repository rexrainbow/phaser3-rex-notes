import RealTimeTimers from './realtimetimers';

import { Plugins as PhaserPlugins } from 'phaser';
class RealTimeTimersPlugin extends PhaserPlugins.BasePlugin {
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
        return new RealTimeTimers(config);
    }

}

export default RealTimeTimersPlugin;