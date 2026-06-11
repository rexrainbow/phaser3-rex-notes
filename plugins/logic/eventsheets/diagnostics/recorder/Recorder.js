import NormalizeEvents from './NormalizeEvents.js';
import NormalizeManagers from './NormalizeManagers.js';
import ManagerMethods from './ManagerMethods.js';
import RecordMethods from './RecordMethods.js';
import EventMethods from './EventMethods.js';
import EventFactoryMethods from './EventFactoryMethods.js';
import GroupEventHandlers from './GroupEventHandlers.js';
import EventSheetEventHandlers from './EventSheetEventHandlers.js';
import LabelEventHandlers from './LabelEventHandlers.js';
import ConditionEvalEventHandlers from './ConditionEvalEventHandlers.js';
import RepeatEventHandlers from './RepeatEventHandlers.js';
import CommandEventHandlers from './CommandEventHandlers.js';
import PauseResumeEventHandlers from './PauseResumeEventHandlers.js';

class Recorder {
    constructor(config) {
        if (config === undefined) {
            config = {};
        }

        var {
            manager,
            managers,
            maxRecords = 60,
            events,
            includeTime = true,
            includeReferences = false,
            includeParameters = true,
            includeResult = true,
            autoStart = true,
            filter,
            onEvent,
            onRecord,
        } = config;

        this.managers = [];
        this.maxRecords = maxRecords;
        this.events = NormalizeEvents(events);
        this.includeTime = includeTime;
        this.includeReferences = includeReferences;
        this.includeParameters = includeParameters;
        this.includeResult = includeResult;
        this.filter = filter;
        this.onEvent = onEvent;
        this.onRecord = onRecord;

        this.records = [];
        this.currentRecord = null;
        this.currentRecords = {};
        this.roundID = 0;
        this.isStarted = false;
        this._handlers = undefined;
        this._stopTimers = {};

        var managerList = NormalizeManagers(manager, managers);
        if (managerList.length > 0) {
            this.setManagers(managerList);
        }

        if (autoStart && (this.managers.length > 0)) {
            this.start();
        }
    }

    get manager() {
        return this.managers[0] || null;
    }

    destroy() {
        this.stop();
        this.clear();
        this.managers = undefined;
        this.filter = undefined;
        this.onEvent = undefined;
        this.onRecord = undefined;
    }
}

Object.assign(
    Recorder.prototype,
    ManagerMethods,
    RecordMethods,
    EventMethods,
    EventFactoryMethods,
    GroupEventHandlers,
    EventSheetEventHandlers,
    LabelEventHandlers,
    ConditionEvalEventHandlers,
    RepeatEventHandlers,
    CommandEventHandlers,
    PauseResumeEventHandlers,
)

export default Recorder;
