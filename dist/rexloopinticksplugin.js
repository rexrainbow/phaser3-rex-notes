(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexloopinticksplugin = factory());
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

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$2(config, 'eventEmitter', true));

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

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$1(config, 'tickingMode', 1));
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

    class LoopIndex {
        constructor(key, start, end, step, items) {
            this.key = key;
            this.start = start;
            this.end = end;
            this.step = step;
            this.items = items;
            this._current = start;
        }

        reset() {
            this._current = this.start;
        }

        get isEnd() {
            return (this.step >= 0) ? (this._current >= this.end) : (this._current <= this.end);
        }

        get length() {
            if (((this.step >= 0) && (this.start > this.end)) ||
                ((this.step < 0) && (this.start < this.end))) {
                return 0;
            }
            return Math.floor(this.end - this.start) + 1;
        }

        next() {
            if (this.isEnd) {
                this._current = this.start;
            } else {
                this._current += this.step;
            }
            return this;
        }

        get current() {
            return (!this.items) ? this._current : this.items[this._current];
        }
    }

    class LoopIndexGenerator {
        constructor() {
            this.indexes = [];
            this.length = 0;
            this.reset();
        }

        reset() {
            for (var i = 0, cnt = this.indexes.length; i < cnt; i++) {
                this.indexes[i].reset();
            }
            this.firstPass = true;
            this.currentCount = 0;
            return this;
        }

        addNumberLoop(key, start, end, step) {
            if (step === undefined) {
                step = (end >= start) ? 1 : -1;
            }
            this.indexes.push(new LoopIndex(key, start, end, step));
            this.length = this._getLength();
            return this;
        }

        addItemsLoop(key, items, reverse) {
            if (reverse === undefined) {
                reverse = false;
            }
            var lastIndex = items.length - 1;
            var start = (reverse) ? lastIndex : 0;
            var end = (reverse) ? 0 : lastIndex;
            var step = (reverse) ? -1 : 1;
            this.indexes.push(new LoopIndex(key, start, end, step, items));
            this.length = this._getLength();
            return this;
        }

        addLoop(config) {
            this.indexes.push(new LoopIndex(config.key, config.start, config.end, config.step, config.items));
            this.length = this._getLength();
            return this;
        }

        removeLoops() {
            this.indexes.length = 0;
            this.length = 0;
            return this;
        }

        _getLength() {
            var total = undefined;
            for (var i = 0, cnt = this.indexes.length; i < cnt; i++) {
                if (total === undefined) {
                    total = this.indexes[i].length;
                } else {
                    total *= this.indexes[i].length;
                }
            }
            return (total === undefined) ? 0 : total;
        }

        get progress() {
            return this.currentCount / this.length;
        }

        get isEnd() {
            for (var i = this.indexes.length - 1; i >= 0; i--) {
                if (!this.indexes[i].isEnd) {
                    return false;
                }
            }
            return true;
        }

        next() {
            var loopIndex, goNext;
            for (var i = this.indexes.length - 1; i >= 0; i--) {
                loopIndex = this.indexes[i];
                goNext = loopIndex.isEnd;
                loopIndex.next();
                if (!goNext) {
                    break;
                }
            }        
            return this;
        }

        getCurrent(out) {
            if (out === undefined) {
                out = {};
            }
            var loopIndex;
            for (var i = this.indexes.length - 1; i >= 0; i--) {
                loopIndex = this.indexes[i];
                out[loopIndex.key] = loopIndex.current;
            }
            return out;
        }

        getNext(out) {
            if (!this.firstPass) {
                this.next();
            } else {
                this.firstPass = false;
            }
            this.getCurrent(out);
            this.currentCount++;
            return out;
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

    const GetValue = Phaser.Utils.Objects.GetValue;

    class LoopInTicks extends TickTask {
        constructor(scene, config) {
            super(scene, config);

            this.deltaPeriod = 1000 / scene.game.loop.targetFps;
            this.deltaPercentage = 1;
            this.loopIndexGenerator = new LoopIndexGenerator();
            this.currentIndexes = {};
            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.setCallback(GetValue(o, 'callback', this.callback), GetValue(o, 'scope', this.scope));
            this.setDeltaPercentage(GetValue(o, 'deltaPercentage', this.deltaPercentage));
            this.loopIndexGenerator.reset();
            Clear(this.currentIndexes);
            return this;
        }

        startTicking() {
            super.startTicking();
            this.scene.sys.events.on('preupdate', this.preupdate, this);
        }

        stopTicking() {
            super.stopTicking();
            if (this.scene) { // Scene might be destoryed
                this.scene.sys.events.off('preupdate', this.preupdate, this);
            }
        }

        setCallback(callback, scope) {
            this.callback = callback;
            this.scope = scope;
            return this;
        }

        setDeltaPercentage(percentage) {
            this.deltaPercentage = percentage;
            return this;
        }

        addNumberLoop(key, start, end, step) {
            this.loopIndexGenerator.addNumberLoop(key, start, end, step);
            return this;
        }

        addItemsLoop(key, items, reverse) {
            this.loopIndexGenerator.addItemsLoop(key, items, reverse);
            return this;
        }

        addLoop(config) {
            this.loopIndexGenerator.addLoop(config);
            return this;
        }

        get curTime() {
            return new Date().getTime();
        }

        get progress() {
            return this.loopIndexGenerator.progress;
        }

        preupdate(time, delta) {
            if ((!this.isRunning) || (!this.callback)) {
                return;
            }

            var startTime = this.curTime;
            var totalTime = this.deltaPeriod * this.deltaPercentage;
            var isTimeOut;
            this.emit('tickstart', this);
            do {
                if (this.loopIndexGenerator.isEnd) {
                    this.complete();
                    return;
                }

                this.currentIndexes = this.loopIndexGenerator.getNext(this.currentIndexes);
                if (this.scope) {
                    this.callback.call(this.scope, this.currentIndexes, this);
                } else {
                    this.callback(this.currentIndexes, this);
                }
                isTimeOut = (this.curTime - startTime) >= totalTime;
            } while (!isTimeOut)
            this.emit('tickend', this);
            return;
        }
    }

    class LoopInTicksPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new LoopInTicks(scene, config);
        }
    }

    return LoopInTicksPlugin;

}));
