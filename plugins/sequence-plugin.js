import Sequence from './sequence.js';

import { Plugins as PhaserPlugins } from 'phaser';
class SequencePlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new Sequence(config);
    }
}

export default SequencePlugin;