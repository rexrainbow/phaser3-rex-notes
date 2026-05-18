import BuildFuzzyModule from './fuzzy';

import { Plugins as PhaserPlugins } from 'phaser';
class FuzzyPlugin extends PhaserPlugins.BasePlugin {
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
        return BuildFuzzyModule(config);
    }

}

export default FuzzyPlugin;