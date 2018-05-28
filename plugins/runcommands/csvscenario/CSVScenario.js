'use strict'

import EE from 'eventemitter3';
import CSVToArray from './../../utils/array/CSVToArray.js';
import IsArray from './../../utils/array/IsArray.js';
import CmdQueue from './CmdQueue.js';
import CommandsManager from './commands/CommandsManager.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

class CSVScenario extends EE {
    constructor(parent, config) {
        super();

        this.parent = parent;
        this.cmdQueue = new CmdQueue(this);
        this.cmdHandlers = new CommandsManager(this);
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isRunning = false;
        this.isPaused = false;
        this.cmdHandlers.resetFromJSON(o);
        this.cmdQueue.resetFromJSON(o);
        this.scope = undefined;
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
        this.scope = scope;
        var arr = this.convert(strCmd, config);
        this.parse(arr, config);
        return this;
    }

    start(config) {
        var offset = GetFastValue(config, 'offset', 0);
        var label = GetFastValue(config, 'label', '');
        this.isRunning = true;
        this.isPaused = false;
        var index = this.cmdHandlers.getHandler('label').getIndex(label);
        if (index == null) {
            this.log('Label: ' + label + ' is not found');
            return;
        } else {
            this.log('Start at Label: ' + label);
        }
        this.runNextCmd(index);
    }

    stop() {
        this.isRunning = false;
    }

    append(commands) {

    }

    clean() {

    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
    }

    get lastLabel() {
        return this.cmdHandlers.labelCmd.lastLabel;
    }

    get previousLabel() {
        return this.cmdHandlers.labelCmd.preLabel;
    }

    runNextCmd(index) {
        var cmdHandlers = this.cmdHandlers,
            cmdQueue = this.cmdQueue;
        var cmdPack, cmdHandler;
        while (this.isRunning && !this.isPaused) {
            if (cmdQueue.length === 0) {
                this.stop();
                return;
            }
            cmdPack = cmdQueue.get(index);
            if (cmdPack == null) {
                this.stop();
                return;
            }
            cmdHandlers.getHandler(cmdPack).run(cmdPack);

            index = undefined;
        }
    }

    getCmdHandler(name) {
        return this.cmdHandlers.getHandler(name);
    }

    convert(strCmd, config) {
        var format = GetFastValue(config, 'format', 0);
        var arr;
        if (typeof (format) === 'string') {
            format = FORMATMODE[format.toLowerCase()];
        }
        if (format === 0) {
            arr = CSVToArray(strCmd);
        } else {
            arr = JSON.parse(strCmd);
            if (!IsArray(arr[0])) {
                arr = [arr[0]];
            }
        }
        return arr;
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
        var handler = this.cmdHandlers.getHandler(cmdPack);
        if (!handler) {
            return false;
        }
        cmdPack = handler.parse(cmdPack, this.cmdQueue.length + 1);
        this.cmdQueue.append(cmdPack);
        return true;
    }

    log(msg) {
        if (this.isDebugMode) {
            console.log(msg);
        }
    }
}

const FORMATMODE = {
    'csv': 0,
    'json': 1
}

const DEFAULT_PREFIX = /^#([a-zA-Z]+)/;

export default CSVScenario;