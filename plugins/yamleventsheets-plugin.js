import YAMLEventSheets from './yamleventsheets.js';
import CommandExecutor from './commandexecutor.js';

class YAMLEventSheetsPlugin extends Phaser.Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new YAMLEventSheets(config);
    }

    addCommandExecutor(scene, config) {
        return new CommandExecutor(scene, config);
    }

}

export default YAMLEventSheetsPlugin;