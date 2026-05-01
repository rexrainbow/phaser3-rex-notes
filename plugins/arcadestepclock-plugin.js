import ArcadeStepClock from './ArcadeStepClock.js';

import { Plugins as PhaserPlugins } from 'phaser';
class ArcadeStepClockPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(scene, config) {
        return new ArcadeStepClock(scene, config);
    }

}

export default ArcadeStepClockPlugin;