import MarkedEventSheets from './markedeventsheets.js';
import CommandExecutor from './commandexecutor.js';

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

export default MarkedEventSheetsPlugin;