import Recorder from '../recorder/Recorder.js';
import {
    EVT_TICK_START,
    EVT_TICK_END,
    EVT_NODE_STATUS,
    EVT_NODE_ABORT,
    EVT_NODE_LOG,
} from '../../constants.js';

const LevelEvents = {
    error: [
        EVT_TICK_END,
        EVT_NODE_STATUS,
        EVT_NODE_ABORT,
    ],
    status: [
        EVT_TICK_END,
        EVT_NODE_STATUS,
        EVT_NODE_ABORT,
        EVT_NODE_LOG,
    ],
    tick: [
        EVT_TICK_START,
        EVT_TICK_END,
    ],
    verbose: 'all',
};

const ErrorStatusNames = [
    'ABORT',
    'ERROR',
];

var ConsoleWrite = function (value) {
    console.log(value);
}

var GetNodeLabel = function (record) {
    var label = record.nodeName || record.nodeTitle || 'node';
    if (record.nodeID !== undefined) {
        label += `#${record.nodeID}`;
    }
    return label;
}

var DefaultFilter = function (level) {
    if (level !== 'error') {
        return undefined;
    }

    return function (record) {
        if (record.type === EVT_NODE_ABORT) {
            return true;
        }

        if (record.type === EVT_NODE_STATUS) {
            return (ErrorStatusNames.indexOf(record.statusName) !== -1);
        }

        if (record.type === EVT_TICK_END) {
            return (ErrorStatusNames.indexOf(record.statusName) !== -1);
        }

        return false;
    }
}

var CompactFormatter = function (record) {
    switch (record.type) {
        case EVT_TICK_START:
            return `[BT ${record.treeID}] tick#${record.tickID} start`;

        case EVT_TICK_END:
            return `[BT ${record.treeID}] tick#${record.tickID} ${record.statusName} nodes=${record.nodeCount} open=${(record.openNodeIDs) ? record.openNodeIDs.length : 0}`;

        case EVT_NODE_STATUS:
            return `[BT ${record.treeID}] tick#${record.tickID} ${GetNodeLabel(record)} -> ${record.statusName}`;

        case EVT_NODE_ABORT:
            return `[BT ${record.treeID}] tick#${record.tickID} ${GetNodeLabel(record)} abort`;

        case EVT_NODE_LOG:
            return `[BT ${record.treeID}] tick#${record.tickID} ${GetNodeLabel(record)} log: ${record.message}`;

        default:
            return `[BT ${record.treeID}] tick#${record.tickID} ${record.type} ${GetNodeLabel(record)}`;
    }
}

var JSONFormatter = function (record) {
    return JSON.stringify(record);
}

var GetFormatter = function (format) {
    if (typeof (format) === 'function') {
        return format;
    }

    switch (format) {
        case 'json':
            return JSONFormatter;

        case 'compact':
        default:
            return CompactFormatter;
    }
}

var GetSinkWrite = function (sink, output) {
    if (sink) {
        if (typeof (sink) === 'function') {
            return sink;
        }

        if (sink.write) {
            return function (value) {
                sink.write(value);
            };
        }
    }

    if (output) {
        return output;
    }

    return ConsoleWrite;
}

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

    setTree(tree) {
        this.recorder.setTree(tree);
        this.tree = this.recorder.tree;
        return this;
    }

    setTrees(trees) {
        this.recorder.setTrees(trees);
        this.tree = this.recorder.tree;
        return this;
    }

    start() {
        this.recorder.start();
        return this;
    }

    stop() {
        this.recorder.stop();
        return this;
    }

    destroy() {
        this.recorder.destroy();
        this.tree = undefined;
        this.recorder = undefined;
        this.formatter = undefined;
        this.write = undefined;
        this.filter = undefined;
    }

    onRecorderEvent(record, tickRecord, recorder) {
        if (this.filter && !this.filter(record, tickRecord, recorder)) {
            return;
        }

        var value = this.formatter(record, tickRecord, recorder);
        if (value === undefined) {
            return;
        }

        this.write(value, record, tickRecord, recorder);
    }
}

export default Logger;
