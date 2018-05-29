'use strict'

import EE from 'eventemitter3';
import CSVToArray from './../../utils/array/CSVToArray.js';
import IsArray from './../../utils/array/IsArray.js';
import CmdQueue from './CmdQueue.js';
import CmdHandlers from './commands/CmdHandlers.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class CSVScenario extends EE {
    constructor(scene, config) {
        super();

        this.scene = scene;
        this.timer = undefined;
        this.cmdQueue = new CmdQueue(this);
        this.cmdHandlers = new CmdHandlers(this);
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = false;
        this.isPaused = false;
        this.waitEvent = undefined;
        this.cmdHandlers.resetFromJSON(o);
        this.cmdQueue.resetFromJSON(o);
        this.scope = undefined;
        this.timeUnit = GetFastValue(o, 'timeUnit', 1);
        this.isDebugMode = GetFastValue(o, 'debug', false);
        return this;
    }

    toJSON() {
        return {};
    }

    boot() {}

    shutdown() {
        this.parent = undefined;
    }

    destroy() {
        this.shutdown();
    }

    load(strCmd, scope, config) {
        this.stop();

        this.timeUnit = GetFastValue(config, 'timeUnit', this.timeUnit);
        if (typeof (this.timeUnit) === 'string') {
            this.timeUnit = TIMEUNITMODE[this.timeUnit];
        }
        this.scope = scope;
        this.parse(CSVToArray(strCmd), config);
        return this;
    }

    start(config) {
        var offset = GetFastValue(config, 'offset', 0);
        var label = GetFastValue(config, 'label', '');
        this.isRunning = true;
        this.isPaused = false;
        var index = this.getCmdHandler('label').getIndex(label);
        if (index == null) {
            this.log('Label: ' + label + ' is not found');
            return;
        } else {
            this.log('Start at Label: ' + label);
        }
        this.runNextCmd(index);
    }

    wait(eventName) {
        this.waitEvent = eventName;
        if (typeof (eventName) === 'number') {
            var delay = eventName;
            if (this.timeUnit === 1) {
                delay *= 1000;
            }
            this.timer = this.scene.time.delayedCall(delay, this.resume, [eventName], this);
        }

    }

    stop() {
        if (this.timer) {
            this.timer.remove();
            this.timer = undefined;
        }
        this.isRunning = false;
    }

    complete() {
        this.emit('complete');
        this.stop();
    }

    append(commands) {

    }

    clean() {

    }

    pause() {
        this.isPaused = true;
        if (this.timer) {
            this.timer.paused = true;
        }
    }

    resume(eventName) {
        if (!this.isRunning) {
            return;
        }

        if (eventName === undefined) {
            this.isPaused = false;
            if (this.timer) {
                this.timer.paused = false;
            }
        } else {
            this.resumeFromEvent(eventName);
        }
    }

    resumeFromEvent(eventName) {
        if (this.isPaused) {
            return;
        }

        if (eventName === this.waitEvent) {
            this.timer = undefined;
            this.waitEvent = undefined;
            this.runNextCmd();
        }
    }

    get lastLabel() {
        return this.cmdHandlers.labelCmd.lastLabel;
    }

    get previousLabel() {
        return this.cmdHandlers.labelCmd.preLabel;
    }

    getCmdHandler(name) {
        if (typeof (name) !== 'string') {
            name = name[0];
        }
        return this.cmdHandlers.get(name);
    }

    parse(arr, config) {
        var prefix = GetFastValue(config, 'prefix', DEFAULT_PREFIX);
        if (typeof (prefix) === 'string') {
            prefix = new RegExp(prefix);
        }

        var item, name;
        for (var i = 0, len = arr.length; i < len; i++) {
            item = arr[i];
            name = item[0];
            if (name === '-') {
                this.appendCommand(item);

            } else if (!isNaN(name)) {
                var time = parseFloat(name);
                if (time > 0) {
                    // insert 'waittime' command
                    this.appendCommand(['waittime', time]);
                }
                item[0] = '-';
                this.appendCommand(item);

            } else if (prefix.test(name)) {
                var innerMatch = name.match(prefix);
                item[0] = innerMatch[1].toLowerCase();
                var isValid = this.appendCommand(item);

                if (!isValid) {
                    this.log('Line ' + i + ': ' + JSON.stringify(item) + ' is not a valid command');
                }

            } else {
                // insert 'waitevent' command
                this.appendCommand(['waitevent', name]);
                item[0] = '-';
                this.appendCommand(item);
            }
        }

        return this;
    }

    appendCommand(cmdPack) {
        var handler = this.getCmdHandler(cmdPack);
        if (handler === null) {
            return false;
        }
        cmdPack = handler.parse(cmdPack, this.cmdQueue.length + 1);
        this.cmdQueue.append(cmdPack);
        return true;
    }

    runNextCmd(index) {
        var cmdQueue = this.cmdQueue;
        var cmdPack, cmdHandler;
        while (this.isRunning && (!this.isPaused) && (this.waitEvent === undefined)) {
            if (cmdQueue.length === 0) {
                this.complete();
                return;
            }
            cmdPack = cmdQueue.get(index);
            if (cmdPack == null) {
                this.complete();
                return;
            }
            this.getCmdHandler(cmdPack).run(cmdPack);

            index = undefined;
        }
    }

    log(msg) {
        if (this.isDebugMode) {
            console.log(msg);
        }
    }
}

const TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1
};
const DEFAULT_PREFIX = /^#([a-zA-Z]+)/;

export default CSVScenario;