import Recorder from '../recorder/Recorder.js';
import LevelEvents from './LevelEvents.js';
import DefaultFilter from './DefaultFilter.js';
import GetFormatter from './GetFormatter.js';
import GetSinkWrite from './GetSinkWrite.js';
import LoggerMethods from './LoggerMethods.js';

class Logger {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        var {
            tree,
            trees,
            level = 'status',
            events,
            format = 'compact',
            formatter,
            sink,
            output,
            filter,
            includeNode = true,
            includeNodeMemory = false,
            includeOpenNodes = true,
            includeTime = false,
            autoStart = true,
            autoEnable = true,
        } = config;

        this.tree = null;
        this.level = level;
        this.formatter = GetFormatter(formatter || format);
        this.write = GetSinkWrite(sink, output);
        this.filter = filter || DefaultFilter(level);
        this.recorder = new Recorder({
            tree: tree,
            trees: trees,
            maxRecords: 0,
            events: events || LevelEvents[level] || LevelEvents.status,
            includeNode: includeNode,
            includeNodeMemory: includeNodeMemory,
            includeOpenNodes: includeOpenNodes,
            includeTime: includeTime,
            autoStart: false,
            autoEnable: autoEnable,
            onEvent: this.onRecorderEvent.bind(this),
        });

        this.tree = this.recorder.tree;

        if (autoStart && (this.recorder.trees.length > 0)) {
            this.start();
        }
    }

    destroy() {
        this.recorder.destroy();
        this.tree = undefined;
        this.recorder = undefined;
        this.formatter = undefined;
        this.write = undefined;
        this.filter = undefined;
    }
}

Object.assign(
    Logger.prototype,
    LoggerMethods,
)

export default Logger;
