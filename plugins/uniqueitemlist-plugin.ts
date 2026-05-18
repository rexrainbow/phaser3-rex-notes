import UniqueItemList from './uniqueitemlist';

import { Plugins as PhaserPlugins } from 'phaser';
class UniqueItemListPlugin extends PhaserPlugins.BasePlugin {
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
        return new UniqueItemList(config);
    }

}

export default UniqueItemListPlugin;