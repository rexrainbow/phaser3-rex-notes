import ConditionsTable from './conditionstable.js'

import { Plugins as PhaserPlugins } from 'phaser';
class ConditionsTablePlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add() {
        return new ConditionsTable();
    }
}

export default ConditionsTablePlugin;