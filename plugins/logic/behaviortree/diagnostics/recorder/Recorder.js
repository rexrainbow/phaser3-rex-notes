import {
    IDLE,
    SUCCESS,
    FAILURE,
    RUNNING,
    ABORT,
    ERROR,
    EVT_TICK_START,
    EVT_TICK_END,
    EVT_NODE_ENTER,
    EVT_NODE_OPEN,
    EVT_NODE_TICK,
    EVT_NODE_STATUS,
    EVT_NODE_CLOSE,
    EVT_NODE_EXIT,
    EVT_NODE_ABORT,
    EVT_NODE_LOG,
} from '../../constants.js';

const StatusNameMap = {
    [IDLE]: 'IDLE',
    [SUCCESS]: 'SUCCESS',
    [FAILURE]: 'FAILURE',
    [RUNNING]: 'RUNNING',
    [ABORT]: 'ABORT',
    [ERROR]: 'ERROR',
};

const AllEvents = [
    EVT_TICK_START,
    EVT_TICK_END,
    EVT_NODE_ENTER,
    EVT_NODE_OPEN,
    EVT_NODE_TICK,
    EVT_NODE_STATUS,
    EVT_NODE_CLOSE,
    EVT_NODE_EXIT,
    EVT_NODE_ABORT,
    EVT_NODE_LOG,
];

const NodeEvents = [
    EVT_NODE_ENTER,
    EVT_NODE_OPEN,
    EVT_NODE_TICK,
    EVT_NODE_CLOSE,
    EVT_NODE_EXIT,
    EVT_NODE_ABORT,
];

var GetStatusName = function (status) {
    return StatusNameMap[status] || `UNKNOWN(${status})`;
}

var GetNodeDepth = function (node, tree) {
    var depth = 0;
    var parent = node.parent;
    while (parent && (parent !== tree)) {
        depth++;
        parent = parent.parent;
    }
    return depth;
}

var CloneData = function (data) {
    if (data == null) {
        return data;
    }

    try {
        return JSON.parse(JSON.stringify(data));
    } catch (e) {
        return data;
    }
}

var NormalizeEvents = function (events) {
    if ((events === undefined) || (events === 'all')) {
        return AllEvents.slice();
    }

    if (typeof (events) === 'string') {
        return [events];
    }

    return events.slice();
}

var NormalizeTrees = function (tree, trees) {
    var output;

    if (trees === undefined) {
        if (tree === undefined) {
            return [];
        } else if (Array.isArray(tree)) {
            output = tree.slice();
        } else {
            output = [tree];
        }
    } else if (Array.isArray(trees)) {
        output = trees.slice();
    }
    else {
        output = [trees];
    }

    return output.filter(function (tree) {
        return !!tree;
    });
}

class Recorder {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        var {
            tree,
            trees,
            maxRecords = 60,
            events,
            includeNode = true,
            includeNodeMemory = false,
            includeOpenNodes = true,
            includeTime = true,
            autoStart = true,
            autoEnable = true,
            filter,
            onEvent,
            onRecord,
        } = config;

        this.trees = [];
        this.maxRecords = maxRecords;
        this.events = NormalizeEvents(events);
        this.includeNode = includeNode;
        this.includeNodeMemory = includeNodeMemory;
        this.includeOpenNodes = includeOpenNodes;
        this.includeTime = includeTime;
        this.autoEnable = autoEnable;
        this.filter = filter;
        this.onEvent = onEvent;
        this.onRecord = onRecord;

        this.records = [];
        this.currentRecord = null;
        this.currentRecords = {};
        this.tickID = 0;
        this.isStarted = false;
        this._nodeEventHandlers = {};

        var treeList = NormalizeTrees(tree, trees);
        if (treeList.length > 0) {
            this.setTrees(treeList);
        }

        if (autoStart && (this.trees.length > 0)) {
            this.start();
        }
    }

    get tree() {
        return this.trees[0] || null;
    }

    setTree(tree) {
        return this.setTrees(tree);
    }

    setTrees(trees) {
        var wasStarted = this.isStarted;
        if (this.isStarted) {
            this.stop();
        }

        this.trees = NormalizeTrees(undefined, trees);

        if (wasStarted) {
            this.start();
        }
        return this;
    }

    start() {
        if ((this.trees.length === 0) || this.isStarted) {
            return this;
        }

        for (var i = 0, cnt = this.trees.length; i < cnt; i++) {
            this.startTree(this.trees[i]);
        }

        this.isStarted = true;
        return this;
    }

    stop() {
        if ((this.trees.length === 0) || !this.isStarted) {
            return this;
        }

        for (var i = 0, cnt = this.trees.length; i < cnt; i++) {
            this.stopTree(this.trees[i]);
        }
        this._nodeEventHandlers = {};

        this.isStarted = false;
        return this;
    }

    startTree(tree) {
        if (this.autoEnable) {
            tree.setEventEnable(true);
        }

        tree.on(EVT_TICK_START, this.onTickStart, this);
        tree.on(EVT_TICK_END, this.onTickEnd, this);

        for (var i = 0, cnt = NodeEvents.length; i < cnt; i++) {
            var eventName = NodeEvents[i];
            var handler = this._nodeEventHandlers[eventName];
            if (!handler) {
                handler = this.createNodeEventHandler(eventName);
                this._nodeEventHandlers[eventName] = handler;
            }
            tree.on(eventName, handler, this);
        }

        tree.on(EVT_NODE_STATUS, this.onNodeStatus, this);
        tree.on(EVT_NODE_LOG, this.onNodeLog, this);
        return this;
    }

    stopTree(tree) {
        tree.off(EVT_TICK_START, this.onTickStart, this);
        tree.off(EVT_TICK_END, this.onTickEnd, this);

        for (var eventName in this._nodeEventHandlers) {
            tree.off(eventName, this._nodeEventHandlers[eventName], this);
        }

        tree.off(EVT_NODE_STATUS, this.onNodeStatus, this);
        tree.off(EVT_NODE_LOG, this.onNodeLog, this);
        return this;
    }

    clear() {
        this.records.length = 0;
        this.currentRecord = null;
        this.currentRecords = {};
        return this;
    }

    destroy() {
        this.stop();
        this.clear();
        this.trees = undefined;
        this.filter = undefined;
        this.onEvent = undefined;
        this.onRecord = undefined;
    }

    getRecords() {
        return this.records;
    }

    getLastRecord() {
        return this.records[this.records.length - 1];
    }

    getCurrentRecord() {
        return this.currentRecord;
    }

    toJSON() {
        return this.records;
    }

    createNodeEventHandler(eventName) {
        return function (node, tick) {
            this.addNodeEvent(eventName, node, tick);
        };
    }

    hasEvent(eventName) {
        return (this.events.indexOf(eventName) !== -1);
    }

    onTickStart(tick) {
        this.tickID++;

        var record = {
            type: 'bt.tick',
            treeID: tick.tree.id,
            tickID: this.tickID,
            events: [],
        };

        if (this.includeTime) {
            record.startTime = tick.currentTime;
        }

        this.currentRecord = record;
        this.currentRecords[tick.tree.id] = record;

        if (this.hasEvent(EVT_TICK_START)) {
            this.addEvent({
                type: EVT_TICK_START,
                treeID: tick.tree.id,
                tickID: this.tickID,
            }, tick);
        }
    }

    onTickEnd(status, tick) {
        var record = this.currentRecords[tick.tree.id];
        if (!record) {
            return;
        }

        record.status = status;
        record.statusName = GetStatusName(status);
        record.nodeCount = tick._nodeCount;

        if (this.includeOpenNodes) {
            record.openNodeIDs = tick._openNodes.map(function (node) {
                return node.id;
            });
        }

        if (this.includeTime) {
            record.endTime = tick.currentTime;
        }

        if (this.hasEvent(EVT_TICK_END)) {
            this.addEvent({
                type: EVT_TICK_END,
                treeID: tick.tree.id,
                tickID: this.tickID,
                status: status,
                statusName: record.statusName,
                nodeCount: record.nodeCount,
                openNodeIDs: record.openNodeIDs,
            }, tick);
        }

        if (this.maxRecords > 0) {
            this.records.push(record);
            if (this.records.length > this.maxRecords) {
                this.records.shift();
            }
        }

        if (this.onRecord) {
            this.onRecord(record, this);
        }

        delete this.currentRecords[tick.tree.id];
        this.currentRecord = null;
        for (var treeID in this.currentRecords) {
            this.currentRecord = this.currentRecords[treeID];
            break;
        }
    }

    onNodeStatus(node, status, tick) {
        if (!this.hasEvent(EVT_NODE_STATUS)) {
            return;
        }

        var event = this.createNodeRecord(EVT_NODE_STATUS, node, tick);
        event.status = status;
        event.statusName = GetStatusName(status);
        this.addEvent(event, tick);
    }

    onNodeLog(node, message, data, tick) {
        if (!this.hasEvent(EVT_NODE_LOG)) {
            return;
        }

        var event = this.createNodeRecord(EVT_NODE_LOG, node, tick);
        event.message = message;

        if (data !== undefined) {
            event.data = CloneData(data);
        }

        this.addEvent(event, tick);
    }

    addNodeEvent(eventName, node, tick) {
        if (!this.hasEvent(eventName)) {
            return;
        }

        this.addEvent(this.createNodeRecord(eventName, node, tick), tick);
    }

    addEvent(event, tick) {
        var currentRecord = this.currentRecords[tick.tree.id] || this.currentRecord;

        if (this.includeTime) {
            event.time = tick.currentTime;
        }

        if (this.filter && !this.filter(event, currentRecord, this)) {
            return;
        }

        if (currentRecord) {
            currentRecord.events.push(event);
        }

        if (this.onEvent) {
            this.onEvent(event, currentRecord, this);
        }
    }

    createNodeRecord(type, node, tick) {
        var event = {
            type: type,
            treeID: tick.tree.id,
            tickID: this.tickID,
            nodeID: node.id,
        };

        if (this.includeNode) {
            event.nodeName = node.name;
            event.nodeTitle = node.title;
            event.category = node.category;
            event.depth = GetNodeDepth(node, tick.tree);
        }

        if (this.includeNodeMemory) {
            event.memory = CloneData(tick.getNodeMemory(node.id));
        }

        return event;
    }
}

export default Recorder;
