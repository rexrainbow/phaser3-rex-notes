import JSONEventSheets from './jsoneventsheets';
import CommandExecutor from './commandexecutor';

import { Plugins as PhaserPlugins } from 'phaser';
class JSONEventSheetsPlugin extends PhaserPlugins.BasePlugin {
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
        return new JSONEventSheets(config);
    }

    addCommandExecutor(scene?: any, config?: any) {
        return new CommandExecutor(scene, config);
    }

}

export default JSONEventSheetsPlugin;