import ArcadeStepClock from './ArcadeStepClock';

import { Plugins as PhaserPlugins } from 'phaser';
class ArcadeStepClockPlugin extends PhaserPlugins.BasePlugin {
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
        return new ArcadeStepClock(scene, config);
    }

}

export default ArcadeStepClockPlugin;