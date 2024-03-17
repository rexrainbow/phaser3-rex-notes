import MarkedEventSheets from './markedeventsheets.js';
import CommandExecutor from './commandexecutor.js';
import CSV2MD from './logic/eventsheets/markedeventsheets/CSV2MD.js';

class MarkedEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new MarkedEventSheets(config);
    }

    addCommandExecutor(scene, config) {
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