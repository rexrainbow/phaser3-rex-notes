import PerlinGrivatyWell from './perlingrivatywell';

import { Plugins as PhaserPlugins } from 'phaser';
class PerlinGrivatyWellPlugin extends PhaserPlugins.BasePlugin {
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
        return new PerlinGrivatyWell(config);
    }

}

export default PerlinGrivatyWellPlugin;