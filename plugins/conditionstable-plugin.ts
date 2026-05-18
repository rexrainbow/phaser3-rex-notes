import ConditionsTable from './conditionstable'

import { Plugins as PhaserPlugins } from 'phaser';
class ConditionsTablePlugin extends PhaserPlugins.BasePlugin {
    destroy: any;
    game: any;

    constructor(pluginManager?: any) {
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