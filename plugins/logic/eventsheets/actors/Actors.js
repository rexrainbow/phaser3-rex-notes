import EventEmitter from '../../../utils/eventemitter/EventEmitter.js';
import { MODE_PARALLEL } from './constants.js';
import Methods from './methods/Methods.js';
import StateAction from './stateaction/StateAction.js';
import NOOP from '../../../utils/object/NOOP.js';

class Actors extends EventEmitter {
    constructor(eventSheetManager, config = {}) {
        super();

        var {
            mode = MODE_PARALLEL,
            defaultPriority = 0,
            stateActionClass = StateAction,
            transitionGroupName = '_',
            stateActionGroupName = transitionGroupName,
            cleanup = NOOP,
        } = config;

        this.eventSheetManager = eventSheetManager;
        this.actors = [];
        this.mode = mode;
        this.defaultPriority = defaultPriority;
        this.stateActionClass = stateActionClass;
        this.transitionGroupName = transitionGroupName;
        this.stateActionGroupName = stateActionGroupName;
        this.cleanupCallback = cleanup;

        this.isRunning = false;
        this.isStopping = false;
        this.currentRun = null;
        this.currentStateAction = null;
        this._nextStateActionId = 0;
    }
}

Object.assign(
    Actors.prototype,
    Methods
)

export default Actors;
