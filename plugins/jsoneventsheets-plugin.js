import JSONEventSheets from './jsoneventsheets.js';
import CommandExecutor from './commandexecutor.js';

import { Plugins as PhaserPlugins } from 'phaser';
class JSONEventSheetsPlugin extends PhaserPlugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }

    add(config) {
        return new JSONEventSheets(config);
    }

    addCommandExecutor(scene, config) {
        return new CommandExecutor(scene, config);
    }

}

export default JSONEventSheetsPlugin;