import Clock from './clock';

import { Plugins as PhaserPlugins } from 'phaser';
class ClockPlugin extends PhaserPlugins.BasePlugin {
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
        return new Clock(scene, config);
    }

}

export default ClockPlugin;