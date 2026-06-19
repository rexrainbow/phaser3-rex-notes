import YAMLEventSheets from './yamleventsheets.js';
import CommandExecutor from './commandexecutor.js';
import {
    Logger, Tracer, BBCodeSink,
    PhaseRunner,
} from './yamleventsheets.js';

import { Plugins as PhaserPlugins } from 'phaser';

class YAMLEventSheetsPlugin extends PhaserPlugins.BasePlugin {
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

    addLogger(config) {
        return new Logger(config);
    }

    addBBCodeLogger(config) {
        config.format = 'bbcode';
        config.sink = new BBCodeSink();
        return new Logger(config);
    }

    addTracer(config) {
        return new Tracer(config);
    }

    addPhaseRunner(eventSheetManager, config) {
        return new PhaseRunner(eventSheetManager, config);
    }

}

export default YAMLEventSheetsPlugin;