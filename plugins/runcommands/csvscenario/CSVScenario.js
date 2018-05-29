'use strict'

import EE from 'eventemitter3';
import CSVToArray from './../../utils/array/CSVToArray.js';
import IsArray from './../../utils/array/IsArray.js';
import CmdQueue from './CmdQueue.js';
import CmdHandlers from './commands/CmdHandlers.js';

const GetValue = Phaser.Utils.Objects.GetValue;

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
        this.threadId = GetValue(o, 'threadId', 0);
        this.isRunning = GetValue(o, 'state', false);
        this.isPaused = GetValue(o, 'pause', false);
        this.waitEvent = GetValue(o, 'wait', undefined);
        this.cmdHandlers.resetFromJSON(o);
        this.cmdQueue.resetFromJSON(o);
        this.scope = GetValue(o, 'scope', undefined);
        this.timeUnit = GetValue(o, 'timeUnit', 0);
        this.argsConvert = GetValue(o, 'argsConvert', true);
        this.argsConvertScope = GetValue(o, 'argsConvertScope', undefined);
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

        this.timeUnit = GetValue(config, 'timeUnit', this.timeUnit);
        if (typeof (this.timeUnit) === 'string') {
            this.timeUnit = TIMEUNITMODE[this.timeUnit];
        }
        this.argsConvert = GetValue(config, 'argsConvert', this.argsConvert);
        this.argsConvertScope = GetValue(config, 'argsConvertScope', this.argsConvertScope);
        this.scope = scope;
        this.parse(CSVToArray(strCmd), config);
        return this;
    }

    start(config) {
        this.stop();
        var label = GetValue(config, 'label', '');
        this.offset = GetValue(config, 'offset', 0);
        this.isRunning = true;
        this.isPaused = false;
        if (this.threadId >= 99999999999) {
            this.threadId = 0;
        } else {
            this.threadId++;
        }
        if (this.isDebugMode) {
            this.log('Goto at Label: ' + label);
        }
        this.goto(label);
    }

    goto(label) {
        var index = this.getCmdHandler('label').getIndex(label);
        if (index == null) {
            this.error('Label: ' + label + ' is not found');
            this.stop();
        } else {
            this.runNextCmd(index);
        }
    }

    wait(eventName) {
        this.waitEvent = eventName;
        if (typeof (eventName) === 'number') {
            var delay = eventName;
            if (this.timeUnit === 1) {
                delay *= 1000;
            }
            this.timer = this.scene.time.delayedCall(delay, this.continue, [], this);
        }

    }

    stop() {
        if (!this.isRunning) {
            return;
        }

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
        if (!this.isRunning) {
            return;
        }
        if (this.isPaused) {
            return;
        }

        this.isPaused = true;
        if (this.timer) {
            this.timer.paused = true;
        }
    }

    resume() {
        if (!this.isRunning) {
            return;
        }
        if (!this.isPaused) {
            return;
        }

        this.isPaused = false;
        if (this.timer) {
            this.timer.paused = false;
        }
    }

    continue (eventName) {
        if (!this.isRunning) {
            return;
        }
        if (this.isPaused) {
            return;
        }

        if ((eventName === undefined) ||
            (eventName === this.waitEvent)) {
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
        var prefix = GetValue(config, 'prefix', DEFAULT_PREFIX);
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
                    this.error('Line ' + i + ': ' + JSON.stringify(item) + ' is not a valid command');
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
        if (handler == null) {
            return false;
        }
        cmdPack = handler.parse(cmdPack, this.cmdQueue.length);
        if (cmdPack) {
            this.cmdQueue.append(cmdPack);
        }
        return true;
    }

    runNextCmd(index) {
        var threadId = this.threadId;
        var cmdQueue = this.cmdQueue;
        var cmdPack, cmdHandler;
        while (
            this.isRunning &&
            (!this.isPaused) &&
            (this.waitEvent === undefined) &&
            (threadId === this.threadId)
        ) {
            if (cmdQueue.length === 0) {
                this.complete();
                break;
            }
            cmdPack = cmdQueue.get(index);
            if (cmdPack == null) {
                this.complete();
                break;
            }
            this.getCmdHandler(cmdPack).run(cmdPack);

            index = undefined;
        }
    }

    log(msg) {
        this.emit('log', msg, this);
    }

    get isDebugMode() {
        return (this.listenerCount('log') > 0);
    }

    error(msg) {
        this.emit('error', msg, this);
    }
}

const TIMEUNITMODE = {
    ms: 0,
    s: 1,
    sec: 1
};
const DEFAULT_PREFIX = /^#([a-zA-Z]+)/;

export default CSVScenario;