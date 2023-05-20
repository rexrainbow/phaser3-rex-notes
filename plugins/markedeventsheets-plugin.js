import MarkedEventSheets from './logic/eventsheets/markedeventsheets/MarkedEventSheets.js';
import CommandExecutor from './logic/runcommands/managers/Managers.js';
import SetValue from './utils/object/SetValue.js';

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
}

SetValue(window, 'RexPlugins.CommandExecutor', CommandExecutor);

export default MarkedEventSheetsPlugin;