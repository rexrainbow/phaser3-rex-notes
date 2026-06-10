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
            manager,
            managers,
            level = 'flow',
            events,
            format = 'compact',
            formatter,
            sink,
            output,
            filter,
            includeTime = false,
            includeReferences = false,
            includeParameters = true,
            includeResult = true,
            autoStart = true,
        } = config;

        this.manager = null;
        this.level = level;
        this.formatter = GetFormatter(formatter || format);
        this.write = GetSinkWrite(sink, output);
        this.filter = filter || DefaultFilter(level);
        this.recorder = new Recorder({
            manager: manager,
            managers: managers,
            maxRecords: 0,
            events: events || LevelEvents[level] || LevelEvents.flow,
            includeTime: includeTime,
            includeReferences: includeReferences,
            includeParameters: includeParameters,
            includeResult: includeResult,
            autoStart: false,
            onEvent: this.onRecorderEvent.bind(this),
        });

        this.manager = this.recorder.manager;

        if (autoStart && (this.recorder.managers.length > 0)) {
            this.start();
        }
    }

    destroy() {
        this.recorder.destroy();
        this.manager = undefined;
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
