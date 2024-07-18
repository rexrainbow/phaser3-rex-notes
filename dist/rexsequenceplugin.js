(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexsequenceplugin = factory());
})(this, (function () { 'use strict';

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = Phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
            }
            this._privateEE = (eventEmitter === true) || (eventEmitter === undefined);
            this._eventEmitter = (this._privateEE) ? (new EventEmitterClass()) : eventEmitter;
            return this;
        },

        destroyEventEmitter() {
            if (this._eventEmitter && this._privateEE) {
                this._eventEmitter.shutdown();
            }
            return this;
        },

        getEventEmitter() {
            return this._eventEmitter;
        },

        on() {
            if (this._eventEmitter) {
                this._eventEmitter.on.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        once() {
            if (this._eventEmitter) {
                this._eventEmitter.once.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        off() {
            if (this._eventEmitter) {
                this._eventEmitter.off.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        emit(event) {
            if (this._eventEmitter && event) {
                this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        addListener() {
            if (this._eventEmitter) {
                this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeListener() {
            if (this._eventEmitter) {
                this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeAllListeners() {
            if (this._eventEmitter) {
                this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        listenerCount() {
            if (this._eventEmitter) {
                return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
            }
            return 0;
        },

        listeners() {
            if (this._eventEmitter) {
                return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
            }
            return [];
        },

        eventNames() {
            if (this._eventEmitter) {
                return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
            }
            return [];
        },
    };

    var GetValue = function (source, key, defaultValue) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        }

        if (typeof (key) === 'string') {
            if (source.hasOwnProperty(key)) {
                return source[key];
            }
            if (key.indexOf('.') !== -1) {
                key = key.split('.');
            } else {
                return defaultValue;
            }
        }

        var keys = key;
        var parent = source;
        var value = defaultValue;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (parent.hasOwnProperty(key)) {
                //  Yes it has a key property, let's carry on down
                value = parent[key];

                parent = value;
            }
            else {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;
    };

    var Copy = function (dest, src, startIdx, endIdx) {
        if (startIdx === undefined) {
            startIdx = 0;
        }    if (endIdx === undefined) {
            endIdx = src.length;
        }
        dest.length = endIdx - startIdx;
        for (var i = 0, len = dest.length; i < len; i++) {
            dest[i] = src[i + startIdx];
        }
        return dest;
    };

    var FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
    var HEX = /^0x[0-9A-F]+$/i;

    var TypeConvert = function (s) {
        if (typeof (s) !== 'string') {
            return s;
        }

        if (s === '') {
            s = null;

        } else if (FLOAT.test(s)) {
            s = parseFloat(s);

        } else if (HEX.test(s)) {
            s = parseInt(s, 16);

        } else {
            switch (s) {
                case 'false': s = false; break;
                case 'true': s = true; break;
                case 'null': s = null; break;
                case 'undefined': s = undefined; break;
            }
        }

        return s;
    };

    var IsArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    var RunCommands = function (queue, scope, config) {
        var reverse = GetValue(config, 'reverse', false);

        var retVal;
        if (IsArray(queue[0])) {
            if (!reverse) {
                for (var i = 0, len = queue.length; i < len; i++) {
                    retVal = RunCommands(queue[i], scope, config);
                }
            } else {
                for (var len = queue.length, i = len - 1; i >= 0; i--) {
                    retVal = RunCommands(queue[i], scope, config);
                }
            }
        } else {
            retVal = RunCommand(queue, scope, config);
        }

        return retVal;
    };

    var RunCommand = function (cmd, scope, config) {
        var argsConvert = GetValue(config, 'argsConvert', undefined);
        var argsConvertScope = GetValue(config, 'argsConvertScope', undefined);

        var fnName = cmd[0];

        ARGS = Copy(ARGS, cmd, 1);
        if (argsConvert) {
            // convert string to floating number, boolean, null, or string        
            if (argsConvert === true) {
                argsConvert = TypeConvert;
                argsConvertScope = undefined;
            }
            for (var i = 0, len = ARGS.length; i < len; i++) {
                if (argsConvertScope) {
                    ARGS[i] = argsConvert.call(argsConvertScope, ARGS[i], cmd);
                } else {
                    ARGS[i] = argsConvert(ARGS[i], cmd);
                }
            }
        }

        var fn;
        if (typeof (fnName) === 'string') {
            fn = scope[fnName];
            if (fn == null) {
                fn = GetValue(scope, fnName, null);
            }
        } else {
            fn = fnName;
        }

        var retValue = fn.apply(scope, ARGS);
        return retValue;
    };
    var ARGS = []; // reuse this array

    const STATE_IDLE = 0;
    const STATE_RUN = 1;
    const STATE_RUNLAST = 2;
    const STATE_COMPLETE = 3;

    class Sequence {
        constructor(config) {
            // Event emitter
            this.setEventEmitter(GetValue(config, 'eventEmitter', undefined));

            this.commands = [];
            this.scope = undefined;
            this.config = undefined;
            this.index = 0;
            this.indexStep = 1; // 1, or -1
            this.setYoyo(GetValue(config, 'yoyo', false));
            this.setRepeat(GetValue(config, 'repeat', 0));
            this.setLoop(GetValue(config, 'loop', false));
            this.state = STATE_IDLE;
            this.task = undefined;
        }

        shutdown() {
            this.stop();
            this.destroyEventEmitter();
            this.commands.length = 0;
            this.scope = undefined;
            this.config = undefined;
        }

        destroy() {
            this.shutdown();
        }

        load(commands, scope, config) {
            this.stop();
            this.setYoyo(GetValue(config, 'yoyo', this.yoyo));
            this.setRepeat(GetValue(config, 'repeat', this.repeat));
            this.setLoop(GetValue(config, 'loop', this.loop));

            this.commands = Copy(this.commands, commands);
            this.scope = scope;
            this.config = config;
            return this;
        }

        start() {
            this.stop();

            this.resetRepeatCount();
            this.index = 0;
            this.indexStep = 1;
            this.state = STATE_RUN;
            if (this.commands.length > 0) {
                this.runNextCommands();
            } else {
                this.complete();
            }
            return this;
        }

        stop() {
            if (this.task) {
                this.task.off('complete', this.runNextCommands, this);
                this.task = undefined;
            }
            this.state = STATE_IDLE;
            return this;
        }

        setYoyo(yoyo) {
            if (yoyo === undefined) {
                yoyo = true;
            }
            this.yoyo = yoyo;
            return this;
        }

        setRepeat(count) {
            this.repeat = count;
            this.resetRepeatCount();
            return this;
        }

        setLoop(loop) {
            if (loop === undefined) {
                loop = true;
            }
            this.loop = loop;
            this.resetRepeatCount();
            return this;
        }

        resetRepeatCount() {
            this.repeatCount = (this.repeat === -1 || this.loop) ? 999999999999 : this.repeat;
            return this;
        }

        get completed() {
            return (this.state === STATE_COMPLETE);
        }

        get currentCommandIndex() {
            return (this.index - 1);
        }

        runNextCommands() {
            var task, isFirstCommand, isLastCommand;
            while (1) {
                if (this.state === STATE_RUNLAST) {
                    this.complete();
                    return;
                }

                task = RunCommands(this.commands[this.index], this.scope);
                if (task && (typeof (task.once) === 'function')) {
                    task.once('complete', this.runNextCommands, this);
                    this.task = task;
                } else {
                    this.task = undefined;
                }

                isFirstCommand = (this.index === 0);
                isLastCommand = (this.index === (this.commands.length - 1));
                if (!this.yoyo) {
                    if (isLastCommand) {
                        this.index = 0;
                        if (this.repeatCount > 0) {
                            this.repeatCount--;
                        } else {
                            this.state = STATE_RUNLAST; // goto completed at next running
                        }
                    } else {
                        this.index += this.indexStep;
                    }
                } else {
                    if (((this.indexStep > 0) && isLastCommand) ||
                        ((this.indexStep < 0) && isFirstCommand)) {
                        this.indexStep = -this.indexStep;
                        this.index += this.indexStep;
                        if (this.repeatCount > 0) {
                            this.repeatCount--;
                        } else {
                            this.state = STATE_RUNLAST; // goto completed at next running
                        }
                    } else {
                        this.index += this.indexStep;
                    }
                }

                if (this.task) {
                    return this;
                }
            }
        }

        complete() {
            this.state = STATE_COMPLETE;
            this.emit('complete', this.scope, this);
        }
    }

    Object.assign(
        Sequence.prototype,
        EventEmitterMethods
    );

    class SequencePlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(config) {
            return new Sequence(config);
        }
    }

    return SequencePlugin;

}));
