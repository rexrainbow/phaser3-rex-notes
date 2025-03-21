(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexaiospinner = factory());
})(this, (function () { 'use strict';

    const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

    var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
        src.updateData();
        camera.addToRenderList(src);

        var pipeline = renderer.pipelines.set(src.pipeline);

        var result = GetCalcMatrix(src, camera, parentMatrix);

        var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var alpha = camera.alpha * src.alpha;

        renderer.pipelines.preBatch(src);

        var shapes = src.geom,
            shape;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            shape = shapes[i];
            if (shape.visible) {
                shape.webglRender(pipeline, calcMatrix, alpha, dx, dy);
            }
        }

        renderer.pipelines.postBatch(src);
    };

    const SetTransform = Phaser.Renderer.Canvas.SetTransform;

    var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
        src.updateData();
        camera.addToRenderList(src);

        var ctx = renderer.currentContext;

        if (SetTransform(renderer, ctx, src, camera, parentMatrix)) {
            var dx = src._displayOriginX;
            var dy = src._displayOriginY;

            var shapes = src.geom,
                shape;
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                shape = shapes[i];
                if (shape.visible) {
                    shape.canvasRender(ctx, dx, dy);
                }
            }

            //  Restore the context saved in SetTransform
            ctx.restore();
        }
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer

    };

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

    const Shape = Phaser.GameObjects.Shape;
    const RemoveItem = Phaser.Utils.Array.Remove;

    class BaseShapes extends Shape {
        constructor(scene, x, y, width, height) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 2;
            }
            if (height === undefined) {
                height = width;
            }

            super(scene, 'rexShapes', []);

            this._width = -1;
            this._height = -1;
            this.dirty = true;
            this.isSizeChanged = true;
            this.shapes = {};

            this.setPosition(x, y);
            this.setSize(width, height);

            this.updateDisplayOrigin();
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this.setSize(value, this._height);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this.setSize(this._width, value);
        }

        setDirty(value) {
            if (value === undefined) {
                value = true;
            }
            this.dirty = value;
            return this;
        }

        setSize(width, height) {
            this.isSizeChanged = this.isSizeChanged || (this._width !== width) || (this._height !== height);
            this.dirty = this.dirty || this.isSizeChanged;
            this._width = width;
            this._height = height;
            this.updateDisplayOrigin();
            var input = this.input;
            if (input && !input.customHitArea) {
                input.hitArea.width = width;
                input.hitArea.height = height;
            }
            return this;
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }

        get fillColor() {
            return this._fillColor;
        }

        set fillColor(value) {
            this.setFillStyle(value, this._fillAlpha);
        }

        get fillAlpha() {
            return this._fillAlpha;
        }

        set fillAlpha(value) {
            this.setFillStyle(this._fillColor, value);
        }

        setFillStyle(color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.dirty = this.dirty ||
                (this.fillColor !== color) ||
                (this.fillAlpha !== alpha);

            this._fillColor = color;
            this._fillAlpha = alpha;

            return this;
        }

        get lineWidth() {
            return this._lineWidth;
        }

        set lineWidth(value) {
            this.setStrokeStyle(value, this._strokeColor, this._strokeAlpha);
        }

        get strokeColor() {
            return this._strokeColor;
        }

        set strokeColor(value) {
            this.setStrokeStyle(this._lineWidth, value, this._strokeAlpha);
        }

        get strokeAlpha() {
            return this._strokeAlpha;
        }

        set strokeAlpha(value) {
            this.setStrokeStyle(this._lineWidth, this._strokeColor, value);
        }

        setStrokeStyle(lineWidth, color, alpha) {
            if (alpha === undefined) {
                alpha = 1;
            }

            this.dirty = this.dirty ||
                (this.lineWidth !== lineWidth) ||
                (this.strokeColor !== color) ||
                (this.strokeAlpha !== alpha);

            this._lineWidth = lineWidth;
            this._strokeColor = color;
            this._strokeAlpha = alpha;

            return this;
        }

        updateShapes() {

        }

        updateData() {
            if (!this.dirty) {
                return this;
            }

            this.updateShapes();
            var shapes = this.geom;
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var shape = shapes[i];
                if (shape.dirty) {
                    shape.updateData();
                }
            }

            this.isSizeChanged = false;
            this.dirty = false;


            return this;
        }

        clear() {
            this.geom.length = 0;
            Clear(this.shapes);
            this.dirty = true;
            return this;
        }

        getShape(name) {
            return this.shapes[name];
        }

        getShapes() {
            return this.geom;
        }

        addShape(shape) {
            this.geom.push(shape);
            var name = shape.name;
            if (name) {
                this.shapes[name] = shape;
            }
            this.dirty = true;
            return this;
        }

        deleteShape(name) {
            var shape = this.getShape(name);
            if (shape) {
                delete this.shapes[name];
                RemoveItem(this.geom, shape);
            }
            return this;
        }
    }

    Object.assign(
        BaseShapes.prototype,
        Render
    );

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

    const GetValue$8 = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$8(config, 'eventEmitter', true));

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

    const GetValue$7 = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$7(config, 'tickingMode', 1));
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

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$6(config, 'tickEventName', defaultEventName);
            this.isSceneTicker = !IsGameUpdateEvent(this.tickEventName);

        }

        startTicking() {
            super.startTicking();

            if (this.isSceneTicker) {
                this.scene.sys.events.on(this.tickEventName, this.update, this);
            } else {
                this.game.events.on(this.tickEventName, this.update, this);
            }

        }

        stopTicking() {
            super.stopTicking();

            if (this.isSceneTicker && this.scene) { // Scene might be destoryed
                this.scene.sys.events.off(this.tickEventName, this.update, this);
            } else if (this.game) {
                this.game.events.off(this.tickEventName, this.update, this);
            }
        }

        // update(time, delta) {
        //     
        // }

    }

    var IsGameUpdateEvent = function (eventName) {
        return (eventName === 'step') || (eventName === 'poststep');
    };

    const GetValue$5 = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class Timer {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.state = GetValue$5(o, 'state', IDLE);
            this.timeScale = GetValue$5(o, 'timeScale', 1);
            this.delay = GetValue$5(o, 'delay', 0);
            this.repeat = GetValue$5(o, 'repeat', 0);
            this.repeatCounter = GetValue$5(o, 'repeatCounter', 0);
            this.repeatDelay = GetValue$5(o, 'repeatDelay', 0);
            this.duration = GetValue$5(o, 'duration', 0);
            this.nowTime = GetValue$5(o, 'nowTime', 0);
            this.justRestart = GetValue$5(o, 'justRestart', false);
        }

        toJSON() {
            return {
                state: this.state,
                timeScale: this.timeScale,
                delay: this.delay,
                repeat: this.repeat,
                repeatCounter: this.repeatCounter,
                repeatDelay: this.repeatDelay,
                duration: this.duration,
                nowTime: this.nowTime,
                justRestart: this.justRestart,
            }
        }

        destroy() {

        }

        setTimeScale(timeScale) {
            this.timeScale = timeScale;
            return this;
        }

        setDelay(delay) {
            if (delay === undefined) {
                delay = 0;
            }
            this.delay = delay;
            return this;
        }

        setDuration(duration) {
            this.duration = duration;
            return this;
        }

        setRepeat(repeat) {
            this.repeat = repeat;
            return this;
        }

        setRepeatInfinity() {
            this.repeat = -1;
            return this;
        }

        setRepeatDelay(repeatDelay) {
            this.repeatDelay = repeatDelay;
            return this;
        }

        start() {
            this.nowTime = (this.delay > 0) ? -this.delay : 0;
            this.state = (this.nowTime >= 0) ? COUNTDOWN : DELAY;
            this.repeatCounter = 0;
            return this;
        }

        stop() {
            this.state = IDLE;
            return this;
        }

        update(time, delta) {
            if (this.state === IDLE || this.state === DONE ||
                delta === 0 || this.timeScale === 0
            ) {
                return;
            }

            this.nowTime += (delta * this.timeScale);
            this.justRestart = false;
            if (this.nowTime >= this.duration) {
                if ((this.repeat === -1) || (this.repeatCounter < this.repeat)) {
                    this.repeatCounter++;
                    this.justRestart = true;
                    this.nowTime -= this.duration;
                    if (this.repeatDelay > 0) {
                        this.nowTime -= this.repeatDelay;
                        this.state = REPEATDELAY;
                    }
                } else {
                    this.nowTime = this.duration;
                    this.state = DONE;
                }
            } else if (this.nowTime >= 0) {
                this.state = COUNTDOWN;
            }
        }

        get t() {
            var t;
            switch (this.state) {
                case IDLE:
                case DELAY:
                case REPEATDELAY:
                    t = 0;
                    break;

                case COUNTDOWN:
                    t = this.nowTime / this.duration;
                    break;

                case DONE:
                    t = 1;
                    break;
            }
            return Clamp(t, 0, 1);
        }

        set t(value) {
            value = Clamp(value, -1, 1);
            if (value < 0) {
                this.state = DELAY;
                this.nowTime = -this.delay * value;
            } else {
                this.state = COUNTDOWN;
                this.nowTime = this.duration * value;

                if ((value === 1) && (this.repeat !== 0)) {
                    this.repeatCounter++;
                }
            }
        }

        setT(t) {
            this.t = t;
            return this;
        }

        get isIdle() {
            return this.state === IDLE;
        }

        get isDelay() {
            return this.state === DELAY;
        }

        get isCountDown() {
            return this.state === COUNTDOWN;
        }

        get isRunning() {
            return this.state === DELAY || this.state === COUNTDOWN;
        }

        get isDone() {
            return this.state === DONE;
        }

        get isOddIteration() {
            return (this.repeatCounter & 1) === 1;
        }

        get isEvenIteration() {
            return (this.repeatCounter & 1) === 0;
        }

    }

    const IDLE = 0;
    const DELAY = 1;
    const COUNTDOWN = 2;
    const REPEATDELAY = 3;
    const DONE = -1;

    class TimerTickTask extends SceneUpdateTickTask {
        constructor(parent, config) {
            super(parent, config);
            this.timer = new Timer();
            // boot() later 
        }

        // override
        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            super.shutdown(fromScene);
            this.timer.destroy();
            this.timer = undefined;
        }

        start() {
            this.timer.start();
            super.start();
            return this;
        }

        stop() {
            this.timer.stop();
            super.stop();
            return this;
        }

        complete() {
            this.timer.stop();
            super.complete();
            return this;
        }

    }

    const GetValue$4 = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

    class EaseValueTaskBase extends TimerTickTask {
        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$4(o, 'timer'));
            this.setEnable(GetValue$4(o, 'enable', true));
            this.setTarget(GetValue$4(o, 'target', this.parent));
            this.setDelay(GetAdvancedValue(o, 'delay', 0));
            this.setDuration(GetAdvancedValue(o, 'duration', 1000));
            this.setEase(GetValue$4(o, 'ease', 'Linear'));
            this.setRepeat(GetValue$4(o, 'repeat', 0));

            return this;
        }

        setEnable(e) {
            if (e == undefined) {
                e = true;
            }
            this.enable = e;
            return this;
        }

        setTarget(target) {
            if (target === undefined) {
                target = this.parent;
            }
            this.target = target;
            return this;
        }

        setDelay(time) {
            this.delay = time;
            // Assign `this.timer.setRepeat(repeat)` manually
            return this;
        }

        setDuration(time) {
            this.duration = time;
            return this;
        }

        setRepeat(repeat) {
            this.repeat = repeat;
            // Assign `this.timer.setRepeat(repeat)` manually
            return this;
        }

        setRepeatDelay(repeatDelay) {
            this.repeatDelay = repeatDelay;
            // Assign `this.timer.setRepeatDelay(repeatDelay)` manually
            return this;
        }

        setEase(ease) {
            if (ease === undefined) {
                ease = 'Linear';
            }
            this.ease = ease;
            this.easeFn = GetEaseFunction(ease);
            return this;
        }

        // Override
        start() {
            // Ignore start if timer is running, i.e. in DELAY, o RUN state
            if (this.timer.isRunning) {
                return this;
            }

            super.start();
            return this;
        }

        restart() {
            this.timer.stop();
            this.start.apply(this, arguments);
            return this;
        }

        stop(toEnd) {
            if (toEnd === undefined) {
                toEnd = false;
            }

            super.stop();

            if (toEnd) {
                this.timer.setT(1);
                this.updateTarget(this.target, this.timer);
                this.complete();
            }

            return this;
        }

        update(time, delta) {
            if (
                (!this.isRunning) ||
                (!this.enable) ||
                (this.parent.hasOwnProperty('active') && !this.parent.active)
            ) {
                return this;
            }

            var target = this.target,
                timer = this.timer;

            timer.update(time, delta);

            // isDelay, isCountDown, isDone
            if (!timer.isDelay) {
                this.updateTarget(target, timer);
            }

            this.emit('update', target, this);

            if (timer.isDone) {
                this.complete();
            }

            return this;
        }

        // Override
        updateTarget(target, timer) {

        }
    }

    const GetValue$3 = Phaser.Utils.Objects.GetValue;
    const Linear$c = Phaser.Math.Linear;

    class EaseValueTask extends EaseValueTaskBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;
            // this.timer

            this.resetFromJSON();
            this.boot();
        }

        start(config) {
            if (this.timer.isRunning) {
                return this;
            }

            var target = this.target;
            this.propertyKey = GetValue$3(config, 'key', 'value');
            var currentValue = target[this.propertyKey];
            this.fromValue = GetValue$3(config, 'from', currentValue);
            this.toValue = GetValue$3(config, 'to', currentValue);

            this.setEase(GetValue$3(config, 'ease', this.ease));
            this.setDuration(GetValue$3(config, 'duration', this.duration));
            this.setRepeat(GetValue$3(config, 'repeat', 0));
            this.setDelay(GetValue$3(config, 'delay', 0));
            this.setRepeatDelay(GetValue$3(config, 'repeatDelay', 0));

            this.timer
                .setDuration(this.duration)
                .setRepeat(this.repeat)
                .setDelay(this.delay)
                .setRepeatDelay(this.repeatDelay);

            target[this.propertyKey] = this.fromValue;

            super.start();
            return this;
        }

        updateTarget(target, timer) {
            var t = timer.t;
            t = this.easeFn(t);

            target[this.propertyKey] = Linear$c(this.fromValue, this.toValue, t);
        }
    }

    var Start = function (duration) {
        if (!this.easeValueTask) {
            this.easeValueTask = new EaseValueTask(this, { eventEmitter: null });
        }

        if (duration !== undefined) {
            this.duration = duration;
            this.easeValueTask.stop();  // Will restart with new duration
        }

        // Won't restart if easeValueTask is running
        if (this.easeValueTask.isRunning) {
            return this;
        }

        // Start easeValueTask
        this.easeValueTask.restart({
            key: 'value',
            from: 0, to: 1,
            duration: this.duration,
            ease: this.ease,
            repeat: -1,  // -1: infinity

            delay: this.delay,
            repeatDelay: this.repeatDelay
        });

        this.setDirty();

        return this;
    };

    var Stop = function () {
        if (!this.easeValueTask) {
            return this;
        }
        this.easeValueTask.stop();
        this.setDirty();
        return this;
    };

    var Pause = function () {
        if (!this.easeValueTask) {
            return this;
        }
        this.easeValueTask.pause();
        this.setDirty();
        return this;
    };

    var Resume = function () {
        if (!this.easeValueTask) {
            return this;
        }
        this.easeValueTask.pause();
        this.setDirty();
        return this;
    };

    var EaseValueMethods = {
        start: Start,
        stop: Stop,
        pause: Pause,
        resume: Resume
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    class Base extends BaseShapes {
        constructor(scene, config) {
            var x = GetValue$2(config, 'x', 0);
            var y = GetValue$2(config, 'y', 0);
            var width = GetValue$2(config, 'width', 64);
            var height = GetValue$2(config, 'height', 64);

            super(scene, x, y, width, height);

            this.resetFromConfig(config, true);

            this.buildShapes(config);

            if (GetValue$2(config, 'start', true)) {
                this.start();
            }
        }

        resetFromConfig(config, setDefaults) {
            if (setDefaults === undefined) {
                setDefaults = false;
            }

            var defaultValue;

            defaultValue = (setDefaults) ? 1000 : this.duration;
            this.setDuration(GetValue$2(config, 'duration', defaultValue));

            defaultValue = (setDefaults) ? 'Linear' : this.ease;
            this.setEase(GetValue$2(config, 'ease', defaultValue));

            defaultValue = (setDefaults) ? 0 : this.delay;
            this.setDelay(GetValue$2(config, 'delay', defaultValue));

            defaultValue = (setDefaults) ? 0 : this.repeatDelay;
            this.setRepeatDelay(GetValue$2(config, 'repeatDelay', defaultValue));

            defaultValue = (setDefaults) ? 0xffffff : this.color;
            this.setColor(GetValue$2(config, 'color', defaultValue));

            defaultValue = (setDefaults) ? 0 : this.value;
            this.setValue(GetValue$2(config, 'value', defaultValue));

            return this;
        }

        buildShapes() {
        }

        get centerX() {
            return this.width / 2;    }

        get centerY() {
            return this.height / 2;
        }

        get radius() {
            return Math.min(this.centerX, this.centerY);
        }

        get color() {
            return this._color;
        }

        set color(value) {
            this.isColorChanged = this.isColorChanged || (this._color !== value);
            this.dirty = this.dirty || this.isColorChanged;
            this._color = value;
            this.setShapesColor(value);
        }

        setColor(color) {
            this.color = color;
            return this;
        }

        setShapesColor(color) {

        }

        get value() {
            return this._value;
        }

        set value(value) {
            value = Phaser.Math.Clamp(value, 0, 1);
            this.dirty = this.dirty || (this._value != value);
            this._value = value;
        }

        setValue(value) {
            this.value = value;
            return this;
        }

        setDuration(duration) {
            this.duration = duration;
            return this;
        }

        setDelay(delay) {
            this.delay = delay;
            return this;
        }

        setRepeatDelay(repeatDelay) {
            this.repeatDelay = repeatDelay;
            return this;
        }

        setEase(ease) {
            this.ease = ease;
            return this;
        }

        get isRunning() {
            return (this.tweenTask) ? this.tweenTask.isRunning : false;
        }
    }

    Object.assign(
        Base.prototype,
        EaseValueMethods
    );

    var FillStyle = function (color, alpha) {
        if (color == null) {
            this.isFilled = false;
        } else {
            if (alpha === undefined) {
                alpha = 1;
            }
            this.isFilled = true;
            this.fillColor = color;
            this.fillAlpha = alpha;
        }
        return this;
    };

    var LineStyle = function (lineWidth, color, alpha) {
        if ((lineWidth == null) || (color == null)) {
            this.isStroked = false;
        } else {
            if (alpha === undefined) {
                alpha = 1;
            }
            this.isStroked = true;
            this.lineWidth = lineWidth;
            this.strokeColor = color;
            this.strokeAlpha = alpha;
        }
        return this;
    };

    var StyleMethods = {
        fillStyle: FillStyle,
        lineStyle: LineStyle
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

    var DataMethods = {
        enableData() {
            if (this.data === undefined) {
                this.data = {};
            }
            return this;
        },

        setData(key, value) {
            this.enableData();
            if (arguments.length === 1) {
                var data = key;
                for (key in data) {
                    this.data[key] = data[key];
                }
            } else {
                this.data[key] = value;
            }
            return this;
        },

        getData(key, defaultValue) {
            this.enableData();
            return (key === undefined) ? this.data : GetValue$1(this.data, key, defaultValue);
        },

        incData(key, inc, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) + inc);
            return this;
        },

        mulData(key, mul, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) * mul);
            return this;
        },

        clearData() {
            if (this.data) {
                Clear(this.data);
            }
            return this;
        },
    };

    class BaseGeom {
        constructor() {
            this.name = undefined;
            this.dirty = true;
            this.visible = true;
            this.data = undefined;

            this.isFilled = false;
            this.fillColor = undefined;
            this.fillAlpha = 1;

            this.isStroked = false;
            this.lineWidth = 1;
            this.strokeColor = undefined;
            this.strokeAlpha = 1;
        }

        setName(name) {
            this.name = name;
            return this;
        }

        setVisible(visible) {
            if (visible === undefined) {
                visible = true;
            }
            this.visible = visible;
            return this;
        }

        reset() {
            this
                .setVisible()
                .fillStyle()
                .lineStyle();

            return this;
        }

        webglRender(pipeline, calcMatrix, alpha, dx, dy) {

        }

        canvasRender(ctx, dx, dy) {

        }

        updateData() {
            this.dirty = false;
        }
    }

    Object.assign(
        BaseGeom.prototype,
        StyleMethods,
        DataMethods
    );

    /*
    src: {
        fillColor, 
        fillAlpha, 
        pathData, 
        pathIndexes  // Earcut(pathData)
    }
    */

    var Utils$1 = Phaser.Renderer.WebGL.Utils;

    var FillPathWebGL = function (pipeline, calcMatrix, src, alpha, dx, dy)
    {
        var fillTintColor = Utils$1.getTintAppendFloatAlpha(src.fillColor, src.fillAlpha * alpha);

        var path = src.pathData;
        var pathIndexes = src.pathIndexes;

        for (var i = 0; i < pathIndexes.length; i += 3)
        {
            var p0 = pathIndexes[i] * 2;
            var p1 = pathIndexes[i + 1] * 2;
            var p2 = pathIndexes[i + 2] * 2;

            var x0 = path[p0 + 0] - dx;
            var y0 = path[p0 + 1] - dy;
            var x1 = path[p1 + 0] - dx;
            var y1 = path[p1 + 1] - dy;
            var x2 = path[p2 + 0] - dx;
            var y2 = path[p2 + 1] - dy;

            var tx0 = calcMatrix.getX(x0, y0);
            var ty0 = calcMatrix.getY(x0, y0);
            var tx1 = calcMatrix.getX(x1, y1);
            var ty1 = calcMatrix.getY(x1, y1);
            var tx2 = calcMatrix.getX(x2, y2);
            var ty2 = calcMatrix.getY(x2, y2);

            pipeline.batchTri(src, tx0, ty0, tx1, ty1, tx2, ty2, 0, 0, 1, 1, fillTintColor, fillTintColor, fillTintColor, 2);
        }
    };

    /*
    src: {
        strokeColor,
        strokeAlpha,
        pathData,
        lineWidth,
        closePath
    }
    */
    var Utils = Phaser.Renderer.WebGL.Utils;

    var StrokePathWebGL = function (pipeline, src, alpha, dx, dy)
    {
        var strokeTint = pipeline.strokeTint;
        var strokeTintColor = Utils.getTintAppendFloatAlpha(src.strokeColor, src.strokeAlpha * alpha);

        strokeTint.TL = strokeTintColor;
        strokeTint.TR = strokeTintColor;
        strokeTint.BL = strokeTintColor;
        strokeTint.BR = strokeTintColor;

        var path = src.pathData;
        var pathLength = path.length - 1;
        var lineWidth = src.lineWidth;
        var halfLineWidth = lineWidth / 2;

        var px1 = path[0] - dx;
        var py1 = path[1] - dy;

        if (!src.closePath)
        {
            pathLength -= 2;
        }

        for (var i = 2; i < pathLength; i += 2)
        {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;

            pipeline.batchLine(
                px1,
                py1,
                px2,
                py2,
                halfLineWidth,
                halfLineWidth,
                lineWidth,
                i - 2,
                (src.closePath) ? (i === pathLength - 1) : false
            );

            px1 = px2;
            py1 = py2;
        }
    };

    var FillStyleCanvas = function (ctx, src, altColor, altAlpha)
    {
        var fillColor = (altColor) ? altColor : src.fillColor;
        var fillAlpha = (altAlpha) ? altAlpha : src.fillAlpha;

        var red = ((fillColor & 0xFF0000) >>> 16);
        var green = ((fillColor & 0xFF00) >>> 8);
        var blue = (fillColor & 0xFF);

        ctx.fillStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + fillAlpha + ')';
    };

    var LineStyleCanvas = function (ctx, src, altColor, altAlpha)
    {
        var strokeColor = (altColor) ? altColor : src.strokeColor;
        var strokeAlpha = (altAlpha) ? altAlpha : src.strokeAlpha;

        var red = ((strokeColor & 0xFF0000) >>> 16);
        var green = ((strokeColor & 0xFF00) >>> 8);
        var blue = (strokeColor & 0xFF);

        ctx.strokeStyle = 'rgba(' + red + ',' + green + ',' + blue + ',' + strokeAlpha + ')';
        ctx.lineWidth = src.lineWidth;
    };

    const Earcut = Phaser.Geom.Polygon.Earcut;

    class PathBase extends BaseGeom {
        constructor() {
            super();

            this.pathData = [];
            this.pathIndexes = [];
            this.closePath = false;
        }

        updateData() {
            this.pathIndexes = Earcut(this.pathData);

            super.updateData();
            return this;
        }

        webglRender(pipeline, calcMatrix, alpha, dx, dy) {
            if (this.isFilled) {
                FillPathWebGL(pipeline, calcMatrix, this, alpha, dx, dy);
            }

            if (this.isStroked) {
                StrokePathWebGL(pipeline, this, alpha, dx, dy);
            }
        }

        canvasRender(ctx, dx, dy) {
            var path = this.pathData;
            var pathLength = path.length - 1;

            var px1 = path[0] - dx;
            var py1 = path[1] - dy;

            ctx.beginPath();

            ctx.moveTo(px1, py1);

            if (!this.closePath) {
                pathLength -= 2;
            }

            for (var i = 2; i < pathLength; i += 2) {
                var px2 = path[i] - dx;
                var py2 = path[i + 1] - dy;
                ctx.lineTo(px2, py2);
            }

            if (this.closePath) {
                ctx.closePath();
            }


            if (this.isFilled) {
                FillStyleCanvas(ctx, this);
                ctx.fill();
            }

            if (this.isStroked) {
                LineStyleCanvas(ctx, this);
                ctx.stroke();
            }
        }
    }

    var StartAt = function (x, y, pathData) {
        pathData.length = 0;

        if (x != null) {
            pathData.push(x, y);
        }

        return pathData;
    };

    var LineTo = function (x, y, pathData) {
        var cnt = pathData.length;
        if (cnt >= 2) {
            var lastX = pathData[cnt - 2];
            var lastY = pathData[cnt - 1];
            if ((x === lastX) && (y === lastY)) {
                return pathData;
            }
        }

        pathData.push(x, y);
        return pathData;
    };

    const DegToRad$4 = Phaser.Math.DegToRad;

    var ArcTo = function (centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        var deltaAngle = endAngle - startAngle;
        var step = DegToRad$4(deltaAngle) / iteration;
        startAngle = DegToRad$4(startAngle);
        for (var i = 0; i <= iteration; i++) {
            var angle = startAngle + (step * i);
            var x = centerX + (radiusX * Math.cos(angle));
            var y = centerY + (radiusY * Math.sin(angle));
            LineTo(x, y, pathData);
        }
        return pathData;
    };

    //import QuadraticBezierInterpolation from '../../utils/math/interpolation/QuadraticBezierInterpolation.js';

    const QuadraticBezierInterpolation = Phaser.Math.Interpolation.QuadraticBezier;

    var QuadraticBezierTo = function (cx, cy, x, y, iterations, pathData) {
        var pathDataCnt = pathData.length;
        var p0x = pathData[pathDataCnt - 2];
        var p0y = pathData[pathDataCnt - 1];
        for (var i = 1, last = iterations - 1; i <= last; i++) {
            var t = i / last;
            pathData.push(
                QuadraticBezierInterpolation(t, p0x, cx, x),
                QuadraticBezierInterpolation(t, p0y, cy, y)
            );
        }
        return pathData;
    };

    // import CubicBezierInterpolation from '../../utils/math/interpolation/CubicBezierInterpolation.js';

    const CubicBezierInterpolation = Phaser.Math.Interpolation.CubicBezier;

    var CubicBezierCurveTo = function (cx0, cy0, cx1, cy1, x, y, iterations, pathData) {
        var pathDataCnt = pathData.length;
        var p0x = pathData[pathDataCnt - 2];
        var p0y = pathData[pathDataCnt - 1];
        for (var i = 1, last = iterations - 1; i <= last; i++) {
            var t = i / last;
            pathData.push(
                CubicBezierInterpolation(t, p0x, cx0, cx1, x),
                CubicBezierInterpolation(t, p0y, cy0, cy1, y)
            );
        }
        return pathData;
    };

    //import CatmullRomInterpolation from '../../utils/math/interpolation/CatmullRomInterpolation.js';

    const CatmullRomInterpolation = Phaser.Math.Interpolation.CatmullRom;

    var CatmullRomTo = function (points, iterations, pathData) {
        var pathDataCnt = pathData.length;
        var p0x = pathData[pathDataCnt - 2];
        var p0y = pathData[pathDataCnt - 1];

        var xList = [p0x];
        var yList = [p0y];
        for (var i = 0, cnt = points.length; i < cnt; i += 2) {
            xList.push(points[i]);
            yList.push(points[i + 1]);
        }

        for (var i = 1, last = iterations - 1; i <= last; i++) {
            var t = i / last;
            pathData.push(
                CatmullRomInterpolation(xList, t),
                CatmullRomInterpolation(yList, t)
            );
        }
        return pathData;
    };

    var DuplicateLast = function (pathData) {
        var len = pathData.length;
        if (len < 2) {
            return pathData;
        }

        var lastX = pathData[len - 2];
        var lastY = pathData[len - 1];
        pathData.push(lastX);
        pathData.push(lastY);

        return pathData;
    };

    var AddPathMethods = {
        clear() {
            this.start();
            return this;
        },

        start() {
            this.startAt();
            return this;
        },

        startAt(x, y) {
            this.restorePathData();
            this.accumulationLengths = undefined;

            StartAt(x, y, this.pathData);
            this.firstPointX = x;
            this.firstPointY = y;
            this.lastPointX = x;
            this.lastPointY = y;

            return this;
        },

        lineTo(x, y, relative) {
            if (relative === undefined) {
                relative = false;
            }
            if (relative) {
                x += this.lastPointX;
                y += this.lastPointY;
            }

            LineTo(x, y, this.pathData);

            this.lastPointX = x;
            this.lastPointY = y;
            return this;
        },

        verticalLineTo(x, relative) {
            this.lineTo(x, this.lastPointY, relative);
            return this;
        },

        horizontalLineTo(y, relative) {
            this.lineTo(this.lastPointX, y, relative);
            return this;
        },

        ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
            if (anticlockwise === undefined) {
                anticlockwise = false;
            }

            ArcTo(
                centerX, centerY,
                radiusX, radiusY,
                startAngle, endAngle, anticlockwise,
                this.iterations,
                this.pathData
            );

            this.lastPointX = this.pathData[this.pathData.length - 2];
            this.lastPointY = this.pathData[this.pathData.length - 1];
            return this;
        },

        arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
            this.ellipticalArc(centerX, centerY, radius, radius, startAngle, endAngle, anticlockwise);
            return this;
        },

        quadraticBezierTo(cx, cy, x, y) {
            QuadraticBezierTo(
                cx, cy, x, y,
                this.iterations,
                this.pathData
            );

            this.lastPointX = x;
            this.lastPointY = y;
            return this;
        },

        cubicBezierTo(cx0, cy0, cx1, cy1, x, y) {
            CubicBezierCurveTo(
                cx0, cy0, cx1, cy1, x, y,
                this.iterations,
                this.pathData
            );

            this.lastPointX = x;
            this.lastPointY = y;
            return this;
        },

        catmullRomTo(...points) {
            CatmullRomTo(
                points,
                this.iterations,
                this.pathData
            );

            this.lastPointX = points[points.length-2];
            this.lastPointY = points[points.length-1];
            return this;
        },

        close() {
            // Line to first point        
            var startX = this.pathData[0],
                startY = this.pathData[1];
            if ((startX !== this.lastPointX) || (startY !== this.lastPointY)) {
                this.lineTo(startX, startY);
            }

            this.closePath = true;
            return this;
        },

        end() {
            DuplicateLast(this.pathData);
            return this;
        },

    };

    //import PointRotateAround from '../../utils/math/RotateAround.js';

    const PointRotateAround = Phaser.Math.RotateAround;

    var RotateAround = function (centerX, centerY, angle, pathData) {
        var point = { x: 0, y: 0 };
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            point.x = pathData[i];
            point.y = pathData[i + 1];
            PointRotateAround(point, centerX, centerY, angle);
            pathData[i] = point.x;
            pathData[i + 1] = point.y;
        }
        return pathData;
    };

    var Scale = function (centerX, centerY, scaleX, scaleY, pathData) {
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            var x = pathData[i] - centerX;
            var y = pathData[i + 1] - centerY;
            x *= scaleX;
            y *= scaleY;
            pathData[i] = x + centerX;
            pathData[i + 1] = y + centerY;
        }
        return pathData;
    };

    var Offset = function (x, y, pathData) {
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            pathData[i] += x;
            pathData[i + 1] += y;
        }
        return pathData;
    };

    const DegToRad$3 = Phaser.Math.DegToRad;
    Phaser.Math.RotateAround;

    var TransformPointsMethods = {
        rotateAround(centerX, centerY, angle) {
            if (this.pathData.length === 0) {
                return this;
            }

            angle = DegToRad$3(angle);

            RotateAround(centerX, centerY, angle, this.pathData);

            var pathDataCnt = this.pathData.length;
            this.lastPointX = this.pathData[pathDataCnt - 2];
            this.lastPointY = this.pathData[pathDataCnt - 1];
            return this;
        },

        scale(centerX, centerY, scaleX, scaleY) {
            if (this.pathData.length === 0) {
                return this;
            }

            Scale(centerX, centerY, scaleX, scaleY, this.pathData);
            this.lastPointX = this.pathData[pathDataCnt - 2];
            this.lastPointY = this.pathData[pathDataCnt - 1];
            return this;
        },

        offset(x, y) {
            Offset(x, y, this.pathData);
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

    var SavePathDataMethods = {
        savePathData() {
            if (this.pathDataSaved) {
                return this;
            }

            this.pathDataSave = [...this.pathData];
            this.pathData.length = 0;
            this.pathDataSaved = true;
            return this;
        },

        restorePathData() {
            if (!this.pathDataSaved) {
                return this;
            }

            Copy(this.pathData, this.pathDataSave);
            this.pathDataSave = undefined;
            this.pathDataSaved = false;
            return this;
        },
    };

    const DistanceBetween = Phaser.Math.Distance.Between;
    const Wrap = Phaser.Math.Wrap;
    const Linear$b = Phaser.Math.Linear;

    var AppendFromPathSegment = function (srcPathData, accumulationLengths, startT, endT, destPathData) {
        if (endT === undefined) {
            endT = startT;
            startT = 0;
        }

        startT = WrapT(startT);
        endT = WrapT(endT);

        if (startT === endT) {
            return;
        }

        var totalPathLength = accumulationLengths[accumulationLengths.length - 1];
        var startL = totalPathLength * startT;
        var endL = totalPathLength * endT;
        if (startT < endT) {
            AddPathSegment(srcPathData, accumulationLengths, startL, endL, destPathData);
        } else {
            AddPathSegment(srcPathData, accumulationLengths, startL, totalPathLength, destPathData);
            AddPathSegment(srcPathData, accumulationLengths, 0, endL, destPathData);
        }

        DuplicateLast(destPathData);
    };

    var AddPathSegment = function (srcPathData, accumulationLengths, startL, endL, destPathData) {
        var skipState = (startL > 0);
        for (var i = 0, cnt = accumulationLengths.length; i < cnt; i++) {
            var pIdx = i * 2;
            var d = accumulationLengths[i];

            if (skipState) {
                if (d < startL) {
                    continue;
                } else if (d == startL) {
                    skipState = false;
                } else { // d > startL
                    var deltaD = d - accumulationLengths[i - 1];
                    var t = 1 - ((d - startL) / deltaD);
                    destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
                    destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
                    skipState = false;
                }
            }

            if (d <= endL) {
                destPathData.push(srcPathData[pIdx]);
                destPathData.push(srcPathData[pIdx + 1]);
                if (d === endL) {
                    break;
                }
            } else { // d > endL
                var deltaD = d - accumulationLengths[i - 1];
                var t = 1 - ((d - endL) / deltaD);
                destPathData.push(GetInterpolation(srcPathData, pIdx - 2, pIdx, t));
                destPathData.push(GetInterpolation(srcPathData, pIdx - 1, pIdx + 1, t));
                break;
            }
        }
    };

    var GetInterpolation = function (pathData, i0, i1, t) {
        var p0 = pathData[i0], p1 = pathData[i1];
        return Linear$b(p0, p1, t);
    };

    var WrapT = function (t) {
        if (t === 0) {
            return 0;
        } else if ((t % 1) === 0) {
            return 1;
        }
        return Wrap(t, 0, 1);
    };

    var PathSegmentMethods = {
        updateAccumulationLengths() {
            if (this.accumulationLengths == null) {
                this.accumulationLengths = [];
            } else if (this.accumulationLengths.length === (this.pathData.length / 2)) {
                return this;
            }

            var accumulationLengths = this.accumulationLengths;
            var pathData = this.pathData;
            var prevX, prevY, x, y;
            var d, accumulationLength = 0;
            for (var i = 0, cnt = pathData.length; i < cnt; i += 2) {
                x = pathData[i];
                y = pathData[i + 1];

                d = (prevX === undefined) ? 0 : DistanceBetween(prevX, prevY, x, y);
                accumulationLength += d;
                accumulationLengths.push(accumulationLength);

                prevX = x;
                prevY = y;
            }

            this.totalPathLength = accumulationLength;

            return this;
        },

        setDisplayPathSegment(startT, endT) {
            if (!this.pathDataSaved) {
                this.updateAccumulationLengths();
                this.savePathData();
            }

            this.pathData.length = 0;
            AppendFromPathSegment(this.pathDataSave, this.accumulationLengths, startT, endT, this.pathData);

            return this;
        },

        appendFromPathSegment(src, startT, endT) {
            if (startT === undefined) {
                this.pathData.push(...src.pathData);
            } else {
                src.updateAccumulationLengths();
                AppendFromPathSegment(src.pathData, src.accumulationLengths, startT, endT, this.pathData);
            }

            this.firstPointX = this.pathData[0];
            this.firstPointY = this.pathData[1];
            this.lastPointX = this.pathData[this.pathData.length - 2];
            this.lastPointY = this.pathData[this.pathData.length - 1];
            return this;
        },
    };

    var GraphicsMethods = {
        draw(graphics, isFill, isStroke) {
            var points = this.toPoints();
            if (isFill) {
                graphics.fillPoints(points, this.closePath, this.closePath);
            }
            if (isStroke) {
                graphics.strokePoints(points, this.closePath, this.closePath);
            }

            return this;
        }
    };

    var ToPoints = function (pathData, points) {
        if (points === undefined) {
            points = [];
        }
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            points.push({
                x: pathData[i],
                y: pathData[i + 1]
            });
        }
        return points;
    };

    //import Polygon from '../../utils/geom/polygon/Polygon.js';

    const Polygon = Phaser.Geom.Polygon;

    var ToPolygon = function (pathData, polygon) {
        if (polygon === undefined) {
            polygon = new Polygon();
        }
        polygon.setTo(pathData);
        return polygon;
    };

    class PathDataBuilder {
        constructor(pathData) {
            if (pathData === undefined) {
                pathData = [];
            }

            this.pathData = pathData;
            this.closePath = false;
            this.setIterations(32);

            this.firstPointX = undefined;
            this.firstPointY = undefined;
            this.lastPointX = undefined;
            this.lastPointY = undefined;
            this.accumulationLengths = undefined;
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        toPoints() {
            return ToPoints(this.pathData);
        }

        toPolygon(polygon) {
            return ToPolygon(this.pathData, polygon);
        }

    }

    Object.assign(
        PathDataBuilder.prototype,
        AddPathMethods,
        TransformPointsMethods,
        SavePathDataMethods,
        PathSegmentMethods,
        GraphicsMethods,
    );

    class Lines extends PathBase {
        constructor() {
            super();
            this.builder = new PathDataBuilder(this.pathData);
        }

        get iterations() {
            return this.builder.iterations;
        }

        set iterations(value) {
            this.dirty = this.dirty || (this.builder.iterations !== value);
            this.builder.setIterations(value);
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        get lastPointX() {
            return this.builder.lastPointX;
        }

        get lastPointY() {
            return this.builder.lastPointY;
        }

        start() {
            this.builder.start();

            this.dirty = true;
            return this;
        }

        startAt(x, y) {
            this.builder.startAt(x, y);

            this.dirty = true;
            return this;
        }

        lineTo(x, y, relative) {
            this.builder.lineTo(x, y, relative);

            this.dirty = true;
            return this;
        }

        verticalLineTo(x, relative) {
            this.builder.verticalLineTo(x, relative);

            this.dirty = true;
            return this;
        }

        horizontalLineTo(y, relative) {
            this.builder.horizontalLineTo(y, relative);

            this.dirty = true;
            return this;
        }

        ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise) {
            this.builder.ellipticalArc(centerX, centerY, radiusX, radiusY, startAngle, endAngle, anticlockwise);

            this.dirty = true;
            return this;
        }

        arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise) {
            this.builder.arc(centerX, centerY, radius, startAngle, endAngle, anticlockwise);

            this.dirty = true;
            return this;
        }

        quadraticBezierTo(cx, cy, x, y) {
            this.builder.quadraticBezierTo(cx, cy, x, y);

            this.dirty = true;
            return this;
        }

        cubicBezierTo(cx0, cy0, cx1, cy1, x, y) {
            this.builder.cubicBezierTo(cx0, cy0, cx1, cy1, x, y);

            this.dirty = true;
            return this;
        }

        catmullRomTo(...points) {
            this.builder.catmullRomTo(...points);

            this.dirty = true;
            return this;
        }

        close() {
            this.builder.close();

            this.closePath = this.builder.closePath;
            this.dirty = true;
            return this;
        }

        end() {
            this.builder.end();
            this.dirty = true;
            return this;
        }

        rotateAround(centerX, centerY, angle) {
            this.builder.rotateAround(centerX, centerY, angle);

            this.dirty = true;
            return this;
        }

        scale(centerX, centerY, scaleX, scaleY) {
            this.builder.scale(centerX, centerY, scaleX, scaleY);

            this.dirty = true;
            return this;
        }

        offset(x, y) {
            this.builder.offset(x, y);

            this.dirty = true;
            return this;
        }

        toPolygon(polygon) {
            return this.builder.toPolygon(polygon);
        }

        appendPathFrom(src, startT, endT) {
            this.builder.appendFromPathSegment(src.builder, startT, endT);
            return this;
        }

        copyPathFrom(src, startT, endT) {
            this.builder.clear().appendFromPathSegment(src.builder, startT, endT);
            return this;
        }

        setDisplayPathSegment(startT, endT) {
            this.builder.setDisplayPathSegment(startT, endT);
            return this;
        }
    }

    var Yoyo = function (t, threshold) {
        if (threshold === undefined) {
            threshold = 0.5;
        }
        if (t <= threshold) {
            t = t / threshold;
        } else {
            t = 1 - ((t - threshold) / (1 - threshold));
        }

        return t;
    };

    const DegToRad$2 = Phaser.Math.DegToRad;
    const Linear$a = Phaser.Math.Linear;
    const ExpoIn$4 = Phaser.Math.Easing.Expo.In;

    const DIRMAP = {
        right: 0,
        down: 1,
        left: 2,
        up: 3
    };

    var ArrowPolygon = function (polygon, innerX, outerX, gridWidth, gridHeight, x0, y0, a, b, c, d) {
        var p0 = Transform(innerX, 0, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.startAt(p0.x, p0.y);
        var p1 = Transform(outerX, 0, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p1.x, p1.y);
        var p2 = Transform(outerX, outerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p2.x, p2.y);
        var p3 = Transform(0, outerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p3.x, p3.y);
        var p4 = Transform(0, innerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p4.x, p4.y);
        var p5 = Transform(innerX, innerX, gridWidth, gridHeight, x0, y0, a, b, c, d);
        polygon.lineTo(p5.x, p5.y);
        polygon.close();
    };

    var GlobPoint = {};
    var Transform = function (gridX, gridY, gridWidth, gridHeight, x0, y0, a, b, c, d) {
        var x = gridX * gridWidth;
        var y = gridY * gridHeight;
        GlobPoint.x = a * x + b * y + x0;
        GlobPoint.y = c * x + d * y + y0;
        return GlobPoint;
    };

    var ArrowUpdateShapesMethods = {
        setDirection(direction) {
            if (typeof (direction) === 'string') {
                direction = DIRMAP[direction];
            }
            this.direction = direction;
            return this;
        },

        buildShapes() {
            for (var i = 0; i < 3; i++) {
                this.addShape(new Lines());
            }
        },

        updateShapes() {
            var x0, y0, a, b, c, d;
            switch (this.direction) {
                case 1:
                    x0 = this.centerX;
                    y0 = this.centerY - this.radius;
                    // xt = a*x + b*y
                    var radX = DegToRad$2(315);
                    a = Math.cos(radX);
                    b = Math.sin(radX);
                    // yt = c*x + d*y
                    var radY = DegToRad$2(45);
                    c = Math.cos(radY);
                    d = Math.sin(radY);
                    break;

                case 3:
                    x0 = this.centerX;
                    y0 = this.centerY + this.radius;
                    // xt = a*x + b*y
                    var radX = DegToRad$2(135);
                    a = Math.cos(radX);
                    b = Math.sin(radX);
                    // yt = c*x + d*y
                    var radY = DegToRad$2(225);
                    c = Math.cos(radY);
                    d = Math.sin(radY);
                    break;

                case 2:
                    x0 = this.centerX + this.radius;
                    y0 = this.centerY;
                    // xt = a*x + b*y
                    var radX = DegToRad$2(225);
                    a = Math.cos(radX);
                    b = Math.sin(radX);
                    // yt = c*x + d*y
                    var radY = DegToRad$2(315);
                    c = Math.cos(radY);
                    d = Math.sin(radY);
                    break;

                default:
                    x0 = this.centerX - this.radius;
                    y0 = this.centerY;
                    // xt = a*x + b*y
                    var radX = DegToRad$2(45);
                    a = Math.cos(radX);
                    b = Math.sin(radX);
                    // yt = c*x + d*y
                    var radY = DegToRad$2(135);
                    c = Math.cos(radY);
                    d = Math.sin(radY);
                    break;
            }

            var gridSize = this.radius / 7;

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var shape = shapes[i];

                var t = (this.value + ((cnt - i) * 0.1)) % 1;
                t = ExpoIn$4(Yoyo(t));
                var alpha = Linear$a(0.25, 1, t);

                shape.fillStyle(this.color, alpha);

                var innerX = (i * 3) + 1;
                var outerX = innerX + 2;
                ArrowPolygon(shape, innerX, outerX, gridSize, gridSize, x0, y0, a, b, c, d);
            }
        }
    };

    class Line extends PathBase {
        constructor(x0, y0, x1, y1) {
            if (x0 === undefined) { x0 = 0; }
            if (y0 === undefined) { y0 = 0; }
            if (x1 === undefined) { x1 = 0; }
            if (y1 === undefined) { y1 = 0; }

            super();

            this.setP0(x0, y0);
            this.setP1(x1, y1);
        }

        get x0() {
            return this._x0;
        }

        set x0(value) {
            this.dirty = this.dirty || (this._x0 !== value);
            this._x0 = value;
        }

        get y0() {
            return this._y0;
        }

        set y0(value) {
            this.dirty = this.dirty || (this._y0 !== value);
            this._y0 = value;
        }

        setP0(x, y) {
            this.x0 = x;
            this.y0 = y;
            return this;
        }

        get x1() {
            return this._x1;
        }

        set x1(value) {
            this.dirty = this.dirty || (this._x1 !== value);
            this._x1 = value;
        }

        get y1() {
            return this._y1;
        }

        set y1(value) {
            this.dirty = this.dirty || (this._y1 !== value);
            this._y1 = value;
        }

        setP1(x, y) {
            this.x1 = x;
            this.y1 = y;
            return this;
        }

        updateData() {
            this.pathData.length = 0;
            this.pathData.push(this.x0, this.y0);
            this.pathData.push(this.x1, this.y1);
            this.pathData.push(this.x0, this.y0);

            super.updateData();
            return this;
        }
    }

    const Linear$9 = Phaser.Math.Linear;

    var AudioUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 4; i++) {
                this.addShape(new Line());
            }
            this.prevValue = undefined;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;
            var bottomBound = centerY + radius;
            var maxLineHeight = radius * 2;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            var cellWidth = (radius * 2) / cnt;
            var lineWidth = cellWidth * 0.7;

            // Reset range of value
            if ((this.prevValue === undefined) || (this.prevValue > this.value)) {
                for (var i = 0; i < cnt; i++) {
                    var line = shapes[i];
                    var from = (this.prevValue === undefined) ? Math.random() : line.getData('to');
                    line
                        .setData('from', from)
                        .setData('to', Math.random());
                }
            }
            this.prevValue = this.value;

            for (var i = 0; i < cnt; i++) {
                var line = shapes[i];
                var from = line.getData('from'),
                    to = line.getData('to'),
                    current = Linear$9(from, to, this.value);
                var lineHeight = current * maxLineHeight;
                var x = leftBound + (cellWidth * (i + 0.5));

                line
                    .lineStyle(lineWidth, this.color, 1)
                    .setP0(x, bottomBound)
                    .setP1(x, (bottomBound - lineHeight));

            }
        }
    };

    const DegToRad$1 = Phaser.Math.DegToRad;

    class Arc extends PathBase {
        constructor(x, y, radiusX, radiusY, startAngle, endAngle, anticlockwise, pie) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (radiusX === undefined) { radiusX = 0; }
            if (radiusY === undefined) { radiusY = 0; }
            if (startAngle === undefined) { startAngle = 0; }
            if (endAngle === undefined) { endAngle = 360; }
            if (anticlockwise === undefined) { anticlockwise = false; }
            if (pie === undefined) { pie = false; }

            super();

            this.setCenterPosition(x, y);
            this.setRadius(radiusX, radiusY);
            this.setAngle(startAngle, endAngle, anticlockwise);
            this.setPie(pie);
            this.setIterations(32);
        }

        get x() {
            return this._x;
        }

        set x(value) {
            this.dirty = this.dirty || (this._x !== value);
            this._x = value;
        }

        get y() {
            return this._y;
        }

        set y(value) {
            this.dirty = this.dirty || (this._y !== value);
            this._y = value;
        }

        setCenterPosition(x, y) {
            if (y === undefined) {
                y = x;
            }
            this.x = x;
            this.y = y;
            return this;
        }

        get radiusX() {
            return this._radiusX;
        }

        set radiusX(value) {
            this.dirty = this.dirty || (this._radiusX !== value);
            this._radiusX = value;
        }

        get radiusY() {
            return this._radiusY;
        }

        set radiusY(value) {
            this.dirty = this.dirty || (this._radiusY !== value);
            this._radiusY = value;
        }

        setRadius(radiusX, radiusY) {
            if (radiusY === undefined) {
                radiusY = radiusX;
            }
            this.radiusX = radiusX;
            this.radiusY = radiusY;
            return this;
        }

        get startAngle() {
            return this._startAngle;
        }

        set startAngle(value) {
            this.dirty = this.dirty || (this._startAngle !== value);
            this._startAngle = value;
        }

        get endAngle() {
            return this._endAngle;
        }

        set endAngle(value) {
            this.dirty = this.dirty || (this._endAngle !== value);
            this._endAngle = value;
        }

        get anticlockwise() {
            return this._anticlockwise;
        }

        set anticlockwise(value) {
            this.dirty = this.dirty || (this._anticlockwise !== value);
            this._anticlockwise = value;
        }

        setAngle(startAngle, endAngle, anticlockwise) {
            // startAngle, endAngle in degrees
            if (anticlockwise === undefined) {
                anticlockwise = false;
            }

            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.anticlockwise = anticlockwise;
            return this;
        }

        get pie() {
            return this._pie;
        }

        set pie(value) {
            this.dirty = this.dirty || (this._pie !== value);
            this._pie = value;
        }

        setPie(pie) {
            if (pie === undefined) {
                pie = true;
            }
            this.pie = pie;
            return this;
        }

        get iterations() {
            return this._iterations;
        }

        set iterations(value) {
            this.dirty = this.dirty || (this._iterations !== value);
            this._iterations = value;
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        updateData() {
            this.pathData.length = 0;
            if (this.pie) {
                this.pathData.push(this.x, this.y);
            }
            ArcTo(
                this.x, this.y,
                this.radiusX, this.radiusY,
                this.startAngle, this.endAngle, this.anticlockwise,
                this.iterations,
                this.pathData
            );
            if (this.pie) {
                this.pathData.push(this.x, this.y);
            }
            // Close
            this.pathData.push(this.pathData[0], this.pathData[1]);

            super.updateData();
            return this;
        }

        canvasRender(ctx, dx, dy) {
            ctx.beginPath();
            var x = this.x - dx,
                y = this.y - dy,
                startAngle = DegToRad$1(this.startAngle),
                endAngle = DegToRad$1(this.endAngle);
            if (this.pie) {
                ctx.moveTo(x, y);
                ctx.lineTo(
                    x + Math.cos(startAngle) * this.radiusX,
                    y + Math.sin(startAngle) * this.radiusY
                );
            }
            ctx.ellipse(
                x, y,
                this.radiusX, this.radiusY,
                0,
                startAngle, endAngle, this.anticlockwise
            );
            if (this.pie) {
                ctx.lineTo(x, y);
            }
            if (this.isFilled) {
                FillStyleCanvas(ctx, this);
                ctx.fill();
            }
            if (this.isStroked) {
                LineStyleCanvas(ctx, this);
                ctx.stroke();
            }
        }
    }

    class Circle extends Arc {
        constructor(x, y, radius) {
            super(x, y, radius, radius, 0, 360);
        }
    }

    const Linear$8 = Phaser.Math.Linear;

    var BallUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 3; i++) {
                this.addShape(new Circle());
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var ballRadius = radius * 0.1;
            var lineWidth = Math.ceil(ballRadius * 0.25);

            var t = 1 - Yoyo(this.value);
            var trackRadius = Linear$8(0.3, 0.9, t) * radius;

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var ball = shapes[i];
                var t = (this.value + (i / cnt)) % 1;
                var angle = Math.PI * 2 * t;
                ball
                    .lineStyle(lineWidth, this.color)
                    .setRadius(ballRadius)
                    .setCenterPosition(
                        centerX + Math.cos(angle) * trackRadius,
                        centerY + Math.sin(angle) * trackRadius
                    );
            }
        }
    };

    const Linear$7 = Phaser.Math.Linear;
    const ExpoIn$3 = Phaser.Math.Easing.Expo.In;

    var BarsUpdateShapeMethods = {
        buildShapes() {
            var cnt = 5;
            for (var i = 0; i < cnt; i++) {
                var line = new Line();
                this.addShape(line);
                var offset = Yoyo(i / (cnt - 1)) / 2;
                line.setData('offset', offset);
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;
            var maxLineHeight = radius * 2;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            var cellWidth = (radius * 2) / cnt;
            var lineWidth = cellWidth * 0.7;


            for (var i = 0; i < cnt; i++) {
                var line = shapes[i];
                var t = (this.value + line.getData('offset')) % 1;
                t = ExpoIn$3(Yoyo(t));

                var lineHeight = Linear$7(0.4, 1, t) * maxLineHeight;
                var x = leftBound + (cellWidth * (i + 0.5));

                line
                    .lineStyle(lineWidth, this.color, 1)
                    .setP0(x, (centerY - (lineHeight / 2)))
                    .setP1(x, (centerY + (lineHeight / 2)));

            }
        }
    };

    var BoxUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Lines()).setName('border'));
            this.addShape((new Lines()).setName('fill'));
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;

            var halfWidth = radius * 0.7;
            var left = centerX - halfWidth,
                top = centerY - halfWidth,
                width = halfWidth * 2;

            this.getShape('border')
                .lineStyle(2, this.color, 1)
                .startAt(left, top).lineTo(width, 0, true)
                .lineTo(0, width, true).lineTo(-width, 0, true)
                .lineTo(0, -width, true).close();

            if (this.value < 0.5) {
                var t = (0.5 - this.value) * 2;
                var height = width * t;
                this.getShape('fill')
                    .fillStyle(this.color, 1)
                    .startAt(left, top).lineTo(width, 0, true)
                    .lineTo(0, height, true).lineTo(-width, 0, true)
                    .lineTo(0, -height, true).close();

            } else { // Rotate
                var t = (this.value - 0.5) * 2;
                var angle = 180 * t;

                this.getShape('border').rotateAround(centerX, centerY, angle);
                this.getShape('fill').fillStyle().lineStyle();
            }
        }
    };

    const RadToDeg = Phaser.Math.RadToDeg;
    const WrapDegrees = Phaser.Math.Angle.WrapDegrees;
    const WrapRad = Phaser.Math.Angle.Wrap;
    const ShortestBetween = Phaser.Math.Angle.ShortestBetween;
    const DegToRad = Phaser.Math.DegToRad;
    const Rad270 = Phaser.Math.DegToRad(270);

    var ClockUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Circle()).setName('border'));
            this.addShape((new Line()).setName('minuteHand'));
            this.addShape((new Line()).setName('hourHand'));

            this.minuteHandAngle = 0;
            this.hourHandAngle = 0;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 25);
            var borderRadius = radius - (lineWidth / 2);
            var minuteHandLength = radius * 0.8;
            var hourHandLength = radius * 0.5;

            var prevMinuteHandAngle = this.minuteHandAngle;
            this.minuteHandAngle = Math.PI * 2 * this.value;
            var angle0 = WrapDegrees(RadToDeg(prevMinuteHandAngle));
            var angle1 = WrapDegrees(RadToDeg(this.minuteHandAngle));
            var deltaAngle = ShortestBetween(angle0, angle1);
            this.hourHandAngle = WrapRad(this.hourHandAngle + (DegToRad(deltaAngle) / 12));

            this.getShape('border')
                .lineStyle(lineWidth, this.color)
                .setRadius(borderRadius)
                .setCenterPosition(centerX, centerY);

            var angle = this.minuteHandAngle + Rad270;
            this.getShape('minuteHand')
                .lineStyle(lineWidth, this.color)
                .setP0(centerX, centerY)
                .setP1(
                    centerX + (Math.cos(angle) * minuteHandLength),
                    centerY + (Math.sin(angle) * minuteHandLength)
                );

            var angle = this.hourHandAngle + Rad270;
            this.getShape('hourHand')
                .lineStyle(lineWidth, this.color)
                .setP0(centerX, centerY)
                .setP1(
                    centerX + (Math.cos(angle) * hourHandLength),
                    centerY + (Math.sin(angle) * hourHandLength)
                );
        }
    };

    const Linear$6 = Phaser.Math.Linear;
    const ExpoIn$2 = Phaser.Math.Easing.Expo.In;
    const RowNum$1 = 2;
    const ColNum$1 = 2;

    var CubeUpdateShapeMethods = {
        buildShapes() {
            var cnt = RowNum$1 * ColNum$1;
            for (var i = 0; i < cnt; i++) {
                var line = new Line();
                this.addShape(line);
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;
            var topBound = centerY - radius;
            var cellWidth = (radius * 2) / ColNum$1;
            var cellHeight = (radius * 2) / RowNum$1;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            for (var i = 0; i < cnt; i++) {
                var colIdx = (i % ColNum$1);
                var rowIdx = Math.floor(i / RowNum$1);
                var x = leftBound + (cellWidth * (colIdx + 0.5));
                var y = topBound + (cellHeight * (rowIdx + 0.5));

                var line = shapes[i];
                var t = (this.value + ((cnt - i) * 0.1)) % 1;
                t = ExpoIn$2(Yoyo(t));

                var lineAlpha = (cnt - i) / cnt;
                var lineHeight = Linear$6(0.7, 1, t) * cellHeight;
                var lineWidth = Linear$6(0.7, 1, t) * cellWidth;

                line
                    .lineStyle(lineWidth, this.color, lineAlpha)
                    .setP0(x - (lineHeight / 2), y)
                    .setP1(x + (lineHeight / 2), y);
            }
        }
    };

    const Linear$5 = Phaser.Math.Linear;

    var DotsUpdateShapeMethods = {
        buildShapes() {
            var cnt = 3;
            for (var i = 0; i < cnt; i++) {
                var dot = new Circle();
                this.addShape(dot);

                var offset = Yoyo(i / (cnt - 1)) / 2;
                dot.setData('offset', offset);
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            var cellWidth = (radius * 2) / cnt;
            var maxDotRadius = cellWidth / 2;

            for (var i = 0; i < cnt; i++) {
                var dot = shapes[i];
                var t = (this.value + dot.getData('offset')) % 1;
                t = Yoyo(t);

                var dotAlpha = Linear$5(0.25, 1, t);
                var dotRadius = Linear$5(0.5, 1, t) * maxDotRadius;
                dot
                    .fillStyle(this.color, dotAlpha)
                    .setRadius(dotRadius)
                    .setCenterPosition(
                        leftBound + (cellWidth * (i + 0.5)),
                        centerY
                    );
            }
        }
    };

    const Linear$4 = Phaser.Math.Linear;
    const ExpoIn$1 = Phaser.Math.Easing.Expo.In;

    var FacebookUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 3; i++) {
                var shape = new Line();
                this.addShape(shape);
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var leftBound = centerX - radius;

            var shapes = this.getShapes(),
                cnt = shapes.length;
            var cellWidth = (radius * 2) / cnt;
            var cellHeight = radius * 2;

            for (var i = 0; i < cnt; i++) {
                var line = shapes[i];
                var t = (this.value + ((cnt - i) * 0.1)) % 1;
                t = ExpoIn$1(Yoyo(t));

                var lineAlpha = (i + 1) / cnt;
                var lineHeight = Linear$4(0.7, 1, t) * cellHeight;
                var lineWidth = Linear$4(0.7, 1, t) * cellWidth;
                var x = leftBound + (cellWidth * (i + 0.5));

                line
                    .lineStyle(lineWidth, this.color, lineAlpha)
                    .setP0(x, centerY - (lineHeight / 2))
                    .setP1(x, centerY + (lineHeight / 2));
            }
        }
    };

    const Linear$3 = Phaser.Math.Linear;
    const RowNum = 3;
    const ColNum = 3;

    var GridUpdateShapeMethods = {
        buildShapes() {
            var cnt = RowNum * ColNum;
            for (var i = 0; i < cnt; i++) {
                var dot = new Circle();
                this.addShape(dot);

                dot.setData('offset', Math.random());
            }
            this.isInitialize = true;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var needLayout = this.isInitialize || this.isSizeChanged;

            var leftBound = centerX - radius;
            var topBound = centerY - radius;
            var cellWidth = (radius * 2) / ColNum;
            var cellHeight = (radius * 2) / RowNum;
            var maxDotRadius = (Math.min(cellWidth, cellHeight) / 2) * 0.8;


            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var colIdx = (i % ColNum);
                var rowIdx = Math.floor(i / RowNum);
                var x = leftBound + cellWidth * (colIdx + 0.5);
                var y = topBound + cellHeight * (rowIdx + 0.5);

                var dot = shapes[i];
                var t = (this.value + dot.getData('offset')) % 1;
                t = Yoyo(t);
                dot.fillStyle(this.color, Linear$3(0.25, 1, t));

                if (needLayout) {
                    dot
                        .setRadius(maxDotRadius)
                        .setCenterPosition(x, y);
                }
            }

            this.isInitialize = false;
        }
    };

    var HeartsUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 2; i++) {
                this.addShape(new Lines());
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 25);
            var maxW50 = radius - lineWidth,
                maxW30 = maxW50 * 0.6,
                maxW35 = maxW50 * 0.7,
                maxW60 = maxW50 * 1.2;


            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var heart = shapes[i];
                var t = (this.value + (i / cnt)) % 1;
                var alpha = Yoyo(t);
                var x = centerX,
                    y = centerY - (15 * t);
                var w50 = maxW50 * t,
                    w30 = maxW30 * t,
                    w35 = maxW35 * t,
                    w60 = maxW60 * t;

                heart
                    .lineStyle(lineWidth, this.color, alpha)
                    .startAt(
                        x, y
                    )
                    .cubicBezierTo(
                        x, y - w30,
                        x - w50, y - w30,
                        x - w50, y
                    )
                    .cubicBezierTo(
                        x - w50, y + w30,
                        x, y + w35,
                        x, y + w60
                    )
                    .cubicBezierTo(
                        x, y + w35,
                        x + w50, y + w30,
                        x + w50, y
                    )
                    .cubicBezierTo(
                        x + w50, y - w30,
                        x, y - w30,
                        x, y
                    )
                    .close();
            }
        }
    };

    const Linear$2 = Phaser.Math.Linear;

    var IosUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 12; i++) {
                this.addShape(new Line());
            }
            this.isInitialize = true;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var needLayout = this.isInitialize || this.isSizeChanged;

            var radius = this.radius;
            var startRadius = radius / 2;
            var lineWidth = Math.ceil(radius / 20);
            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var line = shapes[i];
                var t = i / cnt;
                var angle = Math.PI * 2 * t;
                var alpha = Linear$2(0.25, 1, (1 - this.value + t) % 1);
                line.lineStyle(lineWidth, this.color, alpha);

                if (needLayout) {
                    line
                        .setP0(
                            centerX + Math.cos(angle) * startRadius,
                            centerY + Math.sin(angle) * startRadius
                        )
                        .setP1(
                            centerX + Math.cos(angle) * radius,
                            centerY + Math.sin(angle) * radius
                        );
                }
            }

            this.isInitialize = false;
        }
    };

    var OribitUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Circle()).setName('track'));
            this.addShape((new Circle()).setName('thumb'));
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var trackRadius = radius * 0.9;
            var trackThickness = Math.ceil(trackRadius / 25);
            var thumbRadius = radius * 0.1;
            var thumbAngle = Math.PI * 2 * this.value;

            this.getShape('track')
                .lineStyle(trackThickness, this.color, 0.7)
                .setRadius(trackRadius)
                .setCenterPosition(centerX, centerY);

            this.getShape('thumb')
                .fillStyle(this.color)
                .setRadius(thumbRadius)
                .setCenterPosition(
                    centerX + Math.cos(thumbAngle) * trackRadius,
                    centerY + Math.sin(thumbAngle) * trackRadius
                );
        }
    };

    var OvalUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Circle()).setName('track'));
            this.addShape((new Arc()).setName('arc'));
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 25);
            var maxRadius = radius - (lineWidth / 2);

            this.getShape('track')
                .lineStyle(lineWidth, this.color, 0.5)
                .setRadius(maxRadius)
                .setCenterPosition(centerX, centerY);

            var startAngle = this.value * 360;
            var endAngle = startAngle + 60;
            this.getShape('arc')
                .lineStyle(lineWidth, this.color, 1)
                .setRadius(maxRadius)
                .setCenterPosition(centerX, centerY)
                .setAngle(startAngle, endAngle);

        }
    };

    const Linear$1 = Phaser.Math.Linear;

    var PieUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 4; i++) {
                var pie = (new Arc()).setPie();
                this.addShape(pie);

                pie.setData('speed', Linear$1(180, 360, Math.random()));
            }
            this.prevValue = undefined;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;

            var deltaValue;
            if (this.prevValue !== undefined) {
                deltaValue = this.value - this.prevValue;
                if (this.prevValue > this.value) {
                    deltaValue += 1;
                }
            }

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var pie = shapes[i];
                var pieAlpha = (i + 1) / cnt;

                if (this.prevValue === undefined) {
                    var startAngle = (i / cnt) * 360;
                    var endAngle = startAngle + 90;
                    pie
                        .fillStyle(this.color, pieAlpha)
                        .setRadius(radius)
                        .setCenterPosition(centerX, centerY)
                        .setAngle(startAngle, endAngle)
                        .setData('angle', startAngle);
                } else {
                    var startAngle = pie.getData('angle') + pie.getData('speed') * deltaValue;
                    startAngle = startAngle % 360;
                    var endAngle = startAngle + 90;
                    pie
                        .fillStyle(this.color, pieAlpha)
                        .setRadius(radius)
                        .setCenterPosition(centerX, centerY)
                        .setAngle(startAngle, endAngle)
                        .setData('angle', startAngle);

                }

            }

            this.prevValue = this.value;

        }
    };

    var PuffUpdateShapeMethods = {
        buildShapes() {
            this.addShape(new Circle());
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var puffRadius = radius * this.value;
            var lineWidth = Math.ceil(radius / 25);
            var alpha = Yoyo(this.value);

            this.getShapes()[0]
                .lineStyle(lineWidth, this.color, alpha)
                .setRadius(puffRadius)
                .setCenterPosition(centerX, centerY);
        }
    };

    const Linear = Phaser.Math.Linear;
    const ExpoIn = Phaser.Math.Easing.Expo.In;

    var RadioUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Circle()).setName('center'));
            this.addShape((new Lines()).setName('arc0'));
            this.addShape((new Lines()).setName('arc1'));
            this.isInitialize = true;
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var needLayout = this.isInitialize || this.isSizeChanged;

            var centerRadius = (radius * 2) / 6;
            var x = centerX - radius + centerRadius;
            var y = centerY + radius - centerRadius;

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var shape = shapes[i];

                var t = (this.value + ((cnt - i) * 0.1)) % 1;
                t = ExpoIn(Yoyo(t));
                var alpha = Linear(0.25, 1, t);

                switch (shape.name) {
                    case 'center':
                        shape.fillStyle(this.color, alpha);

                        if (needLayout) {
                            shape
                                .setRadius(centerRadius)
                                .setCenterPosition(x, y);
                        }
                        break;
                    case 'arc0':
                        shape.fillStyle(this.color, alpha);

                        if (needLayout) {
                            var radius0 = centerRadius * 2,
                                radius1 = centerRadius * 3;
                            shape
                                .startAt(x, y - radius0)
                                .lineTo(x, y - radius1)
                                .setIterations(8).arc(x, y, radius1, 270, 360)
                                .lineTo(x + radius0, y)
                                .setIterations(6).arc(x, y, radius0, 360, 270, true)
                                .close();
                        }
                        break;
                    case 'arc1':
                        shape.fillStyle(this.color, alpha);

                        if (needLayout) {
                            var radius0 = centerRadius * 4,
                                radius1 = centerRadius * 5;
                            shape
                                .startAt(x, y - radius0)
                                .lineTo(x, y - radius1)
                                .setIterations(8).arc(x, y, radius1, 270, 360)
                                .lineTo(x + radius0, y)
                                .setIterations(6).arc(x, y, radius0, 360, 270, true)
                                .close();
                        }
                        break;
                }
            }

            this.isInitialize = false;
        }
    };

    var RingsUpdateShapeMethods = {
        buildShapes() {
            for (var i = 0; i < 2; i++) {
                this.addShape(new Circle());
            }
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 25);
            var maxRingRadius = radius - lineWidth;

            var shapes = this.getShapes();
            for (var i = 0, cnt = shapes.length; i < cnt; i++) {
                var ring = shapes[i];
                var t = (this.value + (i / cnt)) % 1;
                var alpha = Yoyo(t);
                ring
                    .lineStyle(lineWidth, this.color, alpha)
                    .setRadius(t * maxRingRadius)
                    .setCenterPosition(centerX, centerY);
            }
        }
    };

    var SpinnerUpdateShapeMethods = {
        buildShapes() {
            this.addShape((new Arc()).setName('arc'));
        },

        updateShapes() {
            var centerX = this.centerX;
            var centerY = this.centerY;
            var radius = this.radius;
            var lineWidth = Math.ceil(radius / 10);
            var maxRadius = radius - lineWidth;

            var endAngle = this.value * 720;
            var arcAngle = Yoyo(this.value) * 180;
            var startAngle = endAngle - arcAngle;
            this.getShape('arc')
                .lineStyle(lineWidth, this.color, 1)
                .setRadius(maxRadius)
                .setCenterPosition(centerX, centerY)
                .setAngle(startAngle + 315, endAngle + 315);

        }
    };

    Phaser.Utils.Objects.GetValue;

    const AnimationModeMap = {
        leftArrow: ArrowUpdateShapesMethods,
        rightArrow: ArrowUpdateShapesMethods,
        upArrow: ArrowUpdateShapesMethods,
        downArrow: ArrowUpdateShapesMethods,
        audio: AudioUpdateShapeMethods,
        ball: BallUpdateShapeMethods,
        bars: BarsUpdateShapeMethods,
        box: BoxUpdateShapeMethods,
        clock: ClockUpdateShapeMethods,
        cube: CubeUpdateShapeMethods,
        dots: DotsUpdateShapeMethods,
        facebook: FacebookUpdateShapeMethods,
        grid: GridUpdateShapeMethods,
        hearts: HeartsUpdateShapeMethods,
        ios: IosUpdateShapeMethods,
        oribit: OribitUpdateShapeMethods,
        oval: OvalUpdateShapeMethods,
        pie: PieUpdateShapeMethods,
        puff: PuffUpdateShapeMethods,
        radio: RadioUpdateShapeMethods,
        rings: RingsUpdateShapeMethods,
        spinner: SpinnerUpdateShapeMethods
    };

    const AnimationModeList = [];
    for (var name in AnimationModeMap) {
        AnimationModeList.push(name);
    }

    const GetRandomItem = Phaser.Utils.Array.GetRandom;

    var UpdateShapeMethods = {
        setAnimationMode(mode, config) {
            if (!AnimationModeMap.hasOwnProperty(mode)) {
                mode = GetRandomItem(AnimationModeList);
            }
            this.animationMode = mode;
            var updateMethods = AnimationModeMap[mode];

            if (config) {
                this.resetFromConfig(config);
            }

            switch (mode) {
                case 'leftArrow':
                    // ArrowUpdateShapesMethods
                    updateMethods.setDirection.call(this, 'left');
                    break;

                case 'rightArrow':
                    // ArrowUpdateShapesMethods
                    updateMethods.setDirection.call(this, 'right');
                    break;

                case 'upArrow':
                    // ArrowUpdateShapesMethods
                    updateMethods.setDirection.call(this, 'up');
                    break;

                case 'downArrow':
                    // ArrowUpdateShapesMethods
                    updateMethods.setDirection.call(this, 'down');
                    break;
            }

            this.clear();
            updateMethods.buildShapes.call(this);
            this.updateShapes = updateMethods.updateShapes.bind(this);

            this.stop().start();

            return this;
        },

        setRandomAnimationMode(config) {
            var mode = GetRandomItem(AnimationModeList);
            this.setAnimationMode(mode, config);
            return this;
        }
    };

    const GetValue = Phaser.Utils.Objects.GetValue;

    class AIO extends Base {
        constructor(scene, config) {
            super(scene, config);
            this.type = 'rexSpinnerAIO';

            this.setAnimationMode(GetValue(config, 'animationMode'));
        }
    }

    Object.assign(
        AIO.prototype,
        UpdateShapeMethods,
    );

    return AIO;

}));
