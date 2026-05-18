import Bank from './bank';

import { Plugins as PhaserPlugins } from 'phaser';
class BankPlugin extends PhaserPlugins.BasePlugin {
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
        return new Bank(config);
    }

}

export default BankPlugin;