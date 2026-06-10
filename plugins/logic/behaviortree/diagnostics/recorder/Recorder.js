import NormalizeEvents from './NormalizeEvents.js';
import NormalizeTrees from './NormalizeTrees.js';
import TreeMethods from './TreeMethods.js';
import RecordMethods from './RecordMethods.js';
import EventMethods from './EventMethods.js';
import EventFactoryMethods from './EventFactoryMethods.js';
import TickEventHandlers from './TickEventHandlers.js';
import NodeEventHandlers from './NodeEventHandlers.js';

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

    destroy() {
        this.stop();
        this.clear();
        this.trees = undefined;
        this.filter = undefined;
        this.onEvent = undefined;
        this.onRecord = undefined;
    }
}

Object.assign(
    Recorder.prototype,
    TreeMethods,
    RecordMethods,
    EventMethods,
    EventFactoryMethods,
    TickEventHandlers,
    NodeEventHandlers,
)

export default Recorder;
