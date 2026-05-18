import MarkedEventSheets from './markedeventsheets';
import CommandExecutor from './commandexecutor';
import CSV2MD from './logic/eventsheets/markedeventsheets/CSV2MD';

import { Plugins as PhaserPlugins } from 'phaser';
class MarkedEventSheetsPlugin extends PhaserPlugins.BasePlugin {
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
        return new MarkedEventSheets(config);
    }

    addCommandExecutor(scene?: any, config?: any) {
        return new CommandExecutor(scene, config);
    }

}

var methods = {
    csv2md: CSV2MD
}

Object.assign(
    MarkedEventSheetsPlugin.prototype,
    methods,
)

export default MarkedEventSheetsPlugin;