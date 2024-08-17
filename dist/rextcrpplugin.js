(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextcrpplugin = factory());
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

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetSceneObject = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsSceneObject(object)) { // object = scene
            return object;
        } else if (object.scene && IsSceneObject(object.scene)) { // object = game object
            return object.scene;
        } else if (object.parent && object.parent.scene && IsSceneObject(object.parent.scene)) { // parent = bob object
            return object.parent.scene;
        } else {
            return null;
        }
    };

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    var GetGame = function (object) {
        if ((object == null) || (typeof (object) !== 'object')) {
            return null;
        } else if (IsGame(object)) {
            return object;
        } else if (IsGame(object.game)) {
            return object.game;
        } else if (IsSceneObject(object)) { // object = scene object
            return object.sys.game;
        } else if (IsSceneObject(object.scene)) { // object = game object
            return object.scene.sys.game;
        }
    };

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$5(config, 'eventEmitter', true));

            // Register callback of parent destroy event, also see `shutdown` method
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.once('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.once('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }

        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            // parent might not be shutdown yet
            if (this.parent) {
                if (this.parent === this.scene) { // parent is a scene
                    this.scene.sys.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent === this.game) { // parent is game
                    this.game.events.off('shutdown', this.onEnvDestroy, this);

                } else if (this.parent.once) { // parent is game object or something else
                    this.parent.off('destroy', this.onParentDestroy, this);
                }

                // bob object does not have event emitter
            }


            this.destroyEventEmitter();

            this.parent = undefined;
            this.scene = undefined;
            this.game = undefined;

            this.isShutdown = true;
        }

        destroy(fromScene) {
            this.shutdown(fromScene);
        }

        onEnvDestroy() {
            this.destroy(true);
        }

        onParentDestroy(parent, fromScene) {
            this.destroy(fromScene);
        }

        setParent(parent) {
            this.parent = parent;  // gameObject, scene, or game

            this.scene = GetSceneObject(parent);
            this.game = GetGame(parent);

            return this;
        }

    }
    Object.assign(
        ComponentBase.prototype,
        EventEmitterMethods
    );

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$4(config, 'tickingMode', 1));
            // boot() later
        }

        // override
        boot() {
            if ((this.tickingMode === 2) && (!this.tickingState)) {
                this.startTicking();
            }
        }

        // override
        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.stop();
            if (this.tickingState) {
                this.stopTicking();
            }
            super.shutdown(fromScene);
        }

        setTickingMode(mode) {
            if (typeof (mode) === 'string') {
                mode = TICKINGMODE[mode];
            }
            this.tickingMode = mode;
        }

        // override
        startTicking() {
            this.tickingState = true;
        }

        // override
        stopTicking() {
            this.tickingState = false;
        }

        get isRunning() {
            return this._isRunning;
        }

        set isRunning(value) {
            if (this._isRunning === value) {
                return;
            }

            this._isRunning = value;
            if ((this.tickingMode === 1) && (value != this.tickingState)) {
                if (value) {
                    this.startTicking();
                } else {
                    this.stopTicking();
                }
            }
        }

        start() {
            this.isPaused = false;
            this.isRunning = true;
            return this;
        }

        pause() {
            // Only can ba paused in running state
            if (this.isRunning) {
                this.isPaused = true;
                this.isRunning = false;
            }
            return this;
        }

        resume() {
            // Only can ba resumed in paused state (paused from running state)
            if (this.isPaused) {
                this.isPaused = false;
                this.isRunning = true;
            }
            return this;
        }

        stop() {
            this.isPaused = false;
            this.isRunning = false;
            return this;
        }

        complete() {
            this.isPaused = false;
            this.isRunning = false;
            this.emit('complete', this.parent, this);
        }
    }

    const TICKINGMODE = {
        'no': 0,
        'lazy': 1,
        'always': 2
    };

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    class BaseClock extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.isRunning = GetValue$3(o, 'isRunning', false);
            this.timeScale = GetValue$3(o, 'timeScale', 1);
            this.now = GetValue$3(o, 'now', 0);
            return this;
        }

        toJSON() {
            return {
                isRunning: this.isRunning,
                timeScale: this.timeScale,
                now: this.now,
                tickingMode: this.tickingMode
            };
        }

        // Override
        // startTicking() { }

        // Override
        // stopTicking() {}

        start(startAt) {
            if (startAt === undefined) {
                startAt = 0;
            }
            this.delta = 0;
            this.now = startAt;
            super.start();
            return this;
        }

        seek(time) {
            this.now = time;
            return this;
        }

        setTimeScale(value) {
            this.timeScale = value;
            return this;
        }

        tick(delta) {
            delta *= this.timeScale;
            this.now += delta;
            this.delta = delta;
            this.emit('update', this.now, this.delta);
            return this;
        }
    }

    class Clock extends BaseClock {
        startTicking() {
            super.startTicking();
            this.scene.sys.events.on('update', this.update, this);
        }

        stopTicking() {
            super.stopTicking();
            if (this.scene) { // Scene might be destoryed
                this.scene.sys.events.off('update', this.update, this);
            }
        }

        update(time, delta) {
            if ((!this.isRunning) || (this.timeScale === 0)) {
                return this;
            }
            this.tick(delta);
            return this;
        }
    }

    var Clear = function (obj) {
        if ((typeof (obj) !== 'object') || (obj === null)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            obj.length = 0;
        } else {
            for (var key in obj) {
                delete obj[key];
            }
        }

        return obj;
    };

    /**
     * Shallow Object Clone. Will not out nested objects.
     * @param {object} obj JSON object
     * @param {object} ret JSON object to return, set null to return a new object
     * @returns {object} this object
     */
    var Clone = function (obj, out) {
        var objIsArray = Array.isArray(obj);

        if (out === undefined) {
            out = (objIsArray) ? [] : {};
        } else {
            Clear(out);
        }

        if (objIsArray) {
            out.length = obj.length;
            for (var i = 0, cnt = obj.length; i < cnt; i++) {
                out[i] = obj[i];
            }
        } else {
            for (var key in obj) {
                out[key] = obj[key];
            }
        }

        return out;
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    let Recorder$1 = class Recorder extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            var clock = GetValue$2(config, 'clock', undefined);
            if (!clock) {
                clock = new Clock(parent);
            }
            this.clock = clock;

            this.resetFromJSON(config); // This function had been called in super(config)
        }

        resetFromJSON(o) {
            this.clock.resetFromJSON(GetValue$2(o, 'clock', undefined));
            this.commands = GetValue$2(o, 'commands', []); // [[time, cmd], [time, cmd], ...]
            return this;
        }

        toJSON() {
            return {
                clock: this.clock.toJSON(),
                commands: this.commands
            };
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.commands = undefined;
            this.clock.shutdown(fromScene);

            super.shutdown(fromScene);
        }

        start(startAt) {
            this.clear();
            this.clock.start(startAt);
            this.emit('start', this.parent, this);
            return this;
        }

        pause() {
            this.clock.pause();
            this.emit('pause', this.parent, this);
            return this;
        }

        resume() {
            this.clock.resume();
            this.emit('resume', this.parent, this);
            return this;
        }

        stop() {
            this.clock.stop();
            this.emit('stop', this.parent, this);
            return this;
        }

        seek(time) {
            this.clock.seek(time);
            return this;
        }

        get isRecording() {
            return this.clock.isRunning;
        }

        get timeScale() {
            return this.clock.timeScale;
        }

        set timeScale(timeScale) {
            this.clock.timeScale = timeScale;
        }

        setTimeScale(timeScale) {
            this.timeScale = timeScale;
            return this;
        }

        get now() {
            return this.clock.now;
        }

        addCommand(command, offset) {
            if (!this.isRecording) {
                return this;
            }
            if (offset === undefined) {
                offset = 0;
            }
            var time = this.clock.now + offset;
            this.commands.push([time, command]);
            return this;
        }

        getCommands(isRef) {
            if (isRef === undefined) {
                isRef = false;
            }
            var commands;
            if (isRef) {
                commands = this.commands;
            } else {
                commands = Clone(this.commands);
            }
            return commands;
        }

        clear() {
            this.commands.length = 0;
            return this;
        }
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

    var GetValue$1 = function (source, key, defaultValue) {
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
        var reverse = GetValue$1(config, 'reverse', false);

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
        var argsConvert = GetValue$1(config, 'argsConvert', undefined);
        var argsConvertScope = GetValue$1(config, 'argsConvertScope', undefined);

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
                fn = GetValue$1(scope, fnName, null);
            }
        } else {
            fn = fnName;
        }

        var retValue = fn.apply(scope, ARGS);
        return retValue;
    };
    var ARGS = []; // reuse this array

    const GetValue = Phaser.Utils.Objects.GetValue;

    let Player$1 = class Player extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            var clock = GetValue(config, 'clock', undefined);
            if (!clock) {
                clock = new Clock(parent);
            }
            this.clock = clock;
            this.clock.on('update', this.update, this);

            this.commands = [];

            this.resetFromJSON(config); // this function had been called in super(config)
        }

        resetFromJSON(o) {
            this.clock.resetFromJSON(GetValue(o, 'clock', undefined));
            this.state = GetValue(o, 'state', 0); // 0=idle, 1=run, 2=completed
            this.commands = GetValue(o, 'commands', []); // [[time, cmds], [time, cmds], ...]
            this.scope = GetValue(o, 'scope', undefined);
            this.setTimeUnit(GetValue(o, 'timeUnit', 0));
            this.setDtMode(GetValue(o, 'dtMode', 0));
            this.index = GetValue(o, 'index', 0);
            this.nextTime = GetValue(o, 'nextTime', 0);
            return this;
        }

        toJSON() {
            return {
                clock: this.clock.toJSON(),
                state: this.state,
                commands: this.commands,
                scope: this.scope,
                timeUnit: this.timeUnit,
                dtMode: this.dtMode,
                index: this.index,
                nextTime: this.nextTime
            };
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.clock.shutdown(fromScene);
            this.commands = undefined;

            super.shutdown(fromScene);
        }

        load(commands, scope, config) {
            this.stop();
            var timeUnit = GetValue(config, 'timeUnit', undefined);
            if (timeUnit !== undefined) {
                this.setTimeUnit(timeUnit);
            }
            var dtMode = GetValue(config, 'dtMode', undefined);
            if (dtMode !== undefined) {
                this.setDtMode(dtMode);
            }
            commands = commands
                .filter(function (item) {
                    var dt = item[0];
                    return !isNaN(dt);
                })
                .map(function (item) {
                    var dt = item[0];
                    if (typeof (dt) === 'string') {
                        item[0] = parseFloat(item[0]);
                    }
                    return item;
                });

            if (this.dtMode === 0) {
                commands.sort(function (itemA, itemB) {
                    var dtA = itemA[0],
                        dtB = itemB[0];
                    return (dtA > dtB) ? 1 :
                        (dtA < dtB) ? -1 : 0;
                });
            }

            Copy(this.commands, commands);
            this.scope = scope;
            return this;
        }

        clear() {
            this.commands.length = 0;
            return this;
        }

        append(time, fn, ...params) {
            var command;
            if (Array.isArray(fn)) {
                command = fn;
            } else {
                command = [fn, ...params];
            }
            this.commands.push([time, command]);
            return this;
        }

        start(startAt) {
            if (startAt === undefined) {
                startAt = 0;
            }

            this.stop();

            this.index = 0;
            this.state = 1;
            this.nextTime = this.getNextDt(0);

            this.clock.start(startAt);
            this.update(startAt);
            this.emit('start', this.parent, this);
            return this;
        }

        pause() {
            this.clock.pause();
            this.emit('pause', this.parent, this);
            return this;
        }

        resume() {
            this.clock.resume();
            this.emit('resume', this.parent, this);
            return this;
        }

        stop() {
            this.clock.stop();
            this.state = 0;
            this.emit('stop', this.parent, this);
            return this;
        }

        seek(time) {
            this.clock.seek(time);
            return this;
        }

        seekToNext() {
            this.seek(this.nextTime);
            return this;
        }

        get isPlaying() {
            return this.clock.isRunning;
        }

        get completed() {
            return (this.state === 2);
        }

        get timeScale() {
            return this.clock.timeScale;
        }

        set timeScale(timeScale) {
            this.clock.timeScale = timeScale;
        }

        setTimeScale(timeScale) {
            this.timeScale = timeScale;
            return this;
        }

        get now() {
            return this.clock.now;
        }

        update(now) {
            if (this.nextTime > now) {
                return this;
            }

            var commands = this.commands;

            while (1) {
                // Execute a command
                var item = commands[this.index];
                var command = item[1];
                if (!IsArray(command)) { // [dt, fnName, param0, param1, ...]
                    command = Copy(CMD, item, 1);
                }
                RunCommands(command, this.scope);
                this.emit('runcommand', command, this.scope);
                // Execute a command

                if (this.index >= (commands.length - 1)) {
                    this.nextTime = 0;
                    this.complete();
                    return this;
                } else {
                    // Get next time
                    this.index++; // Point to next command
                    this.nextTime = this.getNextDt(this.nextTime);
                    if (this.nextTime > now) {
                        return this;
                    }
                    // Get next time
                }

            }
        }

        complete() {
            this.clock.stop();
            this.state = 2;
            this.emit('complete', this.parent, this);
        }

        getNextDt(currentDt) {
            var time = this.commands[this.index][0];
            if (this.timeUnit === 1) { // Second mode
                time = time * 1000;
            }

            if (this.dtMode === 1) {
                time += currentDt;
            }

            return time;
        }

        setDtMode(dtMode) {
            if (typeof (dtMode) === 'string') {
                dtMode = DTMODE[dtMode];
            }
            this.dtMode = dtMode;
            return this;
        }

        setTimeUnit(timeUnit) {
            if (typeof (timeUnit) === 'string') {
                timeUnit = TIMEUNITMODE[timeUnit];
            }
            this.timeUnit = timeUnit;
            return this;
        }
    };

    var CMD = []; // reuse this array

    const TIMEUNITMODE = {
        ms: 0,
        s: 1,
        sec: 1,
    };

    const DTMODE = {
        abs: 0,
        absolute: 0,
        inc: 1,
        increment: 1
    };

    var TCRP = {
        Recorder: Recorder$1,
        Player: Player$1,
        RunCommands: RunCommands
    };

    const Recorder = TCRP.Recorder;
    const Player = TCRP.Player;

    class TCRPPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        addRecorder(parent, config) {
            return new Recorder(parent, config);
        }

        addPlayer(parent, config) {
            return new Player(parent, config);
        }
    }

    var methods = {
        runCommands: TCRP.RunCommands
    };

    Object.assign(
        TCRPPlugin.prototype,
        methods
    );

    return TCRPPlugin;

}));
