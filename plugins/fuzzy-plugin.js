import BuildFuzzyModule from './fuzzy';

import { Plugins as PhaserPlugins } from 'phaser';
class FuzzyPlugin extends PhaserPlugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return BuildFuzzyModule(config);
    }

}

export default FuzzyPlugin;