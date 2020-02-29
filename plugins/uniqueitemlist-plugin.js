import UniqueItemList from './uniqueitemlist.js';

class UniqueItemListPlugin extends Phaser.Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.once('destroy', this.destroy, this);
    }

    add(items) {
        return new UniqueItemList(items);
    }

}

export default UniqueItemListPlugin;