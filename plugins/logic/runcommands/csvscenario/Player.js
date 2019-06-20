import EventEmitterMethods from '../../../utils/eventemitter/EventEmitterMethods.js';
import GetValue from '../../../utils/object/GetValue.js';

class Player {
    constructor(scenario, config) {
        // Event emitter
        this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

        this.scenario = scenario;
        this.scene = scenario.scene;
        this.timer = undefined;
        this.currentIdx = -1;
        this.nextIdx = 0;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.currentIdx = GetValue(o, 'curIdx', -1);
        this.nextIdx = GetValue(o, 'nextIdx', 0);
        this._inRunCmdLoop = false;
        this.isRunning = GetValue(o, 'state', false);
        this.isPaused = GetValue(o, 'pause', false);
        this.waitEvent = GetValue(o, 'wait', undefined);
    }
    toJSON() {

    }

    boot() {

    }

    shutdown() {        
        this.stop();
        this.destroyEventEmitter();
        this.scenario = undefined;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }


    setNextIndex(index) {
        if (index === undefined) {
            index = this.currentIdx + 1;
        }
        this.nextIdx = index;
        return this;
    }

    start(config) {
        this.stop();
        var label = GetValue(config, 'label', ''); // Label '' is index 0
        this.offset = GetValue(config, 'offset', 0);
        if (this.scenario.isDebugMode) {
            this.scenario.log('Start at Label: ' + label);
        }

        var result = this.goto(label);
        if (!result) {
            return false;
        }

        this.isRunning = true;
        this.runNextCmd();
        return true;
    }

    stop() {
        if (!this.isRunning) {
            return this;
        }

        this.isRunning = false;
        this.isPaused = false;

        // clear wait event
        this.waitEvent = undefined;
        if (this.timer) {
            this.timer.remove();
            this.timer = undefined;
        }

        return this;
    }

    goto(label) {
        var index;
        if (typeof (label) === 'string') {
            index = this.scenario.getIndex(label);
        } else {
            index = label;
        }
        if (index == null) {
            return false;
        }
        this.setNextIndex(index);
        return true;
    }

    wait(eventName) {
        this.waitEvent = eventName;
        if (typeof (eventName) === 'number') {
            var delay = eventName;
            if (this.scenario.timeUnit === 1) {
                delay *= 1000;
            }
            this.timer = this.scene.time.delayedCall(delay, this.continue, [eventName], this);
        }
        return this;
    }

    complete() {
        this.emit('complete', this.scenario, this);
        this.stop();
        return this;
    }

    pause() {
        if (!this.isRunning) {
            return this;
        }
        if (this.isPaused) {
            return this;
        }

        this.isPaused = true;
        if (this.timer) {
            this.timer.paused = true;
        }
        return this;
    }

    resume() {
        if (!this.isRunning) {
            return this;
        }
        if (!this.isPaused) {
            return this;
        }

        this.isPaused = false;
        if (this.timer) {
            this.timer.paused = false;
        }
        return this;
    }

    continue(eventName) {
        if ((!this.isRunning) ||
            this.isPaused ||
            (this.waitEvent === undefined)) {
            return this;
        }

        if (eventName === this.waitEvent) {
            this.timer = undefined;
            this.waitEvent = undefined;
            this.runNextCmd();
        }
        return this;
    }

    runNextCmd() {
        if (this._inRunCmdLoop) { // prevent re-entry
            return;
        }

        var scenario = this.scenario,
            instMem = scenario.instMem,
            inst;
        this._inRunCmdLoop = true;
        while (
            this.isRunning &&
            (!this.isPaused) &&
            (this.waitEvent === undefined)
        ) {
            inst = instMem.get(this.currentIdx);
            this.setNextIndex();
            if (inst == null) {
                this.complete();
                break;
            }
            scenario.getCmdHandler(inst).run(inst);
        }
        this._inRunCmdLoop = false;
        return this;
    }
}

Object.assign(
    Player.prototype,
    EventEmitterMethods
);

export default Player;