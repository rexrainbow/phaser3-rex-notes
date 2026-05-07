(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('phaser')) :
    typeof define === 'function' && define.amd ? define(['phaser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexroundrectangleprogress = factory(global.Phaser));
})(this, (function (phaser) { 'use strict';

    const GetCalcMatrix = phaser.GameObjects.GetCalcMatrix;

    var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
        src.updateData();

        var camera = drawingContext.camera;
        camera.addToRenderList(src);

        var calcMatrix = GetCalcMatrix(src, camera, parentMatrix, !drawingContext.useCanvas).calc;

        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var alpha = src.alpha;

        var submitter = src.customRenderNodes.Submitter || src.defaultRenderNodes.Submitter;

        var shapes = src.geom,
            shape;
        for (var i = 0, cnt = shapes.length; i < cnt; i++) {
            shape = shapes[i];
            if (shape.visible) {
                shape.webglRender(drawingContext, submitter, calcMatrix, src, alpha, dx, dy);
            }
        }
    };

    const SetTransform = phaser.Renderer.Canvas.SetTransform;

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

    const Shape = phaser.GameObjects.Shape;
    const RemoveItem = phaser.Utils.Array.Remove;

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

    const Linear$2 = phaser.Math.Linear;
    const Percent$1 = phaser.Math.Percent;

    var ProgressValueMethods = {
        setValue(value, min, max) {
            if ((value === undefined) || (value === null)) {
                return this;
            }

            if (min !== undefined) {
                value = Percent$1(value, min, max);
            }
            this.value = value;
            return this;
        },

        addValue(inc, min, max) {
            if (min !== undefined) {
                inc = Percent$1(inc, min, max);
            }
            this.value += inc;
            return this;
        },

        getValue(min, max) {
            var value = this.value;
            if ((min !== undefined) && (max !== undefined)) {
                value = Linear$2(min, max, value);
            }
            return value;
        }
    };

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = phaser.Events.EventEmitter; // Use built-in EventEmitter class by default
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

    const SceneClass = phaser.Scene;
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

    const GameClass = phaser.Game;
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

    const GetValue$9 = phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$9(config, 'eventEmitter', true));

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

    const GetValue$8 = phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$8(config, 'tickingMode', 1));
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

    const GetValue$7 = phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$7(config, 'tickEventName', defaultEventName);
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

    const GetValue$6 = phaser.Utils.Objects.GetValue;
    const Clamp$1 = phaser.Math.Clamp;

    class Timer {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.state = GetValue$6(o, 'state', IDLE);
            this.timeScale = GetValue$6(o, 'timeScale', 1);
            this.delay = GetValue$6(o, 'delay', 0);
            this.repeat = GetValue$6(o, 'repeat', 0);
            this.repeatCounter = GetValue$6(o, 'repeatCounter', 0);
            this.repeatDelay = GetValue$6(o, 'repeatDelay', 0);
            this.duration = GetValue$6(o, 'duration', 0);
            this.nowTime = GetValue$6(o, 'nowTime', 0);
            this.justRestart = GetValue$6(o, 'justRestart', false);
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
            return Clamp$1(t, 0, 1);
        }

        set t(value) {
            value = Clamp$1(value, -1, 1);
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

    const GetValue$5 = phaser.Utils.Objects.GetValue;
    const GetAdvancedValue = phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = phaser.Tweens.Builders.GetEaseFunction;

    class EaseValueTaskBase extends TimerTickTask {
        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$5(o, 'timer'));
            this.setEnable(GetValue$5(o, 'enable', true));
            this.setTarget(GetValue$5(o, 'target', this.parent));
            this.setDelay(GetAdvancedValue(o, 'delay', 0));
            this.setDuration(GetAdvancedValue(o, 'duration', 1000));
            this.setEase(GetValue$5(o, 'ease', 'Linear'));
            this.setRepeat(GetValue$5(o, 'repeat', 0));

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

    const GetValue$4 = phaser.Utils.Objects.GetValue;
    const Linear$1 = phaser.Math.Linear;

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
            this.propertyKey = GetValue$4(config, 'key', 'value');
            var currentValue = target[this.propertyKey];
            this.fromValue = GetValue$4(config, 'from', currentValue);
            this.toValue = GetValue$4(config, 'to', currentValue);

            this.setEase(GetValue$4(config, 'ease', this.ease));
            this.setDuration(GetValue$4(config, 'duration', this.duration));
            this.setRepeat(GetValue$4(config, 'repeat', 0));
            this.setDelay(GetValue$4(config, 'delay', 0));
            this.setRepeatDelay(GetValue$4(config, 'repeatDelay', 0));

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

            target[this.propertyKey] = Linear$1(this.fromValue, this.toValue, t);
        }
    }

    const Percent = phaser.Math.Percent;

    var EaseValueMethods = {
        setEaseValuePropName(name) {
            this.easeValuePropName = name;
            return this;
        },

        setEaseValueDuration(duration) {
            this.easeValueDuration = duration;
            return this;
        },

        setEaseValueFunction(ease) {
            this.easeFunction = ease;
            return this;
        },

        stopEaseValue() {
            if (this.easeValueTask) {
                this.easeValueTask.stop();
            }
            return this;
        },

        easeValueTo(value, min, max) {
            if ((value === undefined) || (value === null)) {
                return this;
            }

            if (min !== undefined) {
                value = Percent(value, min, max);
            }

            if (this.easeValueTask === undefined) {
                this.easeValueTask = new EaseValueTask(this, { eventEmitter: null });
            }

            this.easeValueTask.restart({
                key: this.easeValuePropName,
                to: value,
                duration: this.easeValueDuration,
                ease: this.easeFunction,
            });

            return this;
        },

        easeValueRepeat(from, to, repeat, repeatDelay) {
            if (repeat === undefined) {
                repeat = -1;
            }
            if (repeatDelay === undefined) {
                repeatDelay = 0;
            }

            if (this.easeValueTask === undefined) {
                this.easeValueTask = new EaseValueTask(this, { eventEmitter: null });
            }

            this.easeValueTask.restart({
                key: this.easeValuePropName,
                from: from, to: to,
                duration: this.easeValueDuration,
                ease: this.easeFunction,
                repeat: repeat, repeatDelay: repeatDelay,
            });

            return this;
        },
    };

    const GetValue$3 = phaser.Utils.Objects.GetValue;
    const Clamp = phaser.Math.Clamp;

    function ProgressBase (BaseClass) {
        class ProgressBase extends BaseClass {
            bootProgressBase(config) {
                this.eventEmitter = GetValue$3(config, 'eventEmitter', this);

                var callback = GetValue$3(config, 'valuechangeCallback', null);
                if (callback !== null) {
                    var scope = GetValue$3(config, 'valuechangeCallbackScope', undefined);
                    this.eventEmitter.on('valuechange', callback, scope);
                }

                this
                    .setEaseValuePropName('value')
                    .setEaseValueDuration(GetValue$3(config, 'easeValue.duration', 0))
                    .setEaseValueFunction(GetValue$3(config, 'easeValue.ease', 'Linear'));

                return this;
            }

            get value() {
                return this._value;
            }

            set value(value) {
                value = Clamp(value, 0, 1);

                var oldValue = this._value;
                var valueChanged = (oldValue != value);
                this.dirty = this.dirty || valueChanged;
                this._value = value;

                if (valueChanged) {
                    this.eventEmitter.emit('valuechange', this._value, oldValue, this.eventEmitter);
                }
            }
        }

        Object.assign(
            ProgressBase.prototype,
            ProgressValueMethods,
            EaseValueMethods
        );

        return ProgressBase;
    }

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

    var GetValue$2 = function (source, key, defaultValue, altSource) {
        var isValidSource = source && (typeof source === 'object' || typeof source === 'function');
        var isValidAltSource = altSource && (typeof altSource === 'object' || typeof altSource === 'function');

        if (!isValidSource && !isValidAltSource) {
            return defaultValue;
        }

        var keyPath = String(key);

        // Shortcut:
        // If obj[keyPath] can be read (including prototype chain), return it directly.
        // This also supports literal keys like "a.b".
        if (isValidSource && (keyPath in source)) {
            return source[keyPath];
        }
        if (isValidAltSource && (keyPath in altSource)) {
            return altSource[keyPath];
        }

        // If there is no dot, we already know it's missing.
        if (keyPath.indexOf('.') === -1) {
            return defaultValue;
        }

        var keys = keyPath.split('.');

        // 1) Try source path first
        if (isValidSource) {
            var sourceResult = WalkPath(source, keys, defaultValue);
            if (sourceResult.found) {
                return sourceResult.value;
            }
        }

        // 2) Then try altSource path
        if (isValidAltSource) {
            var altSourceResult = WalkPath(altSource, keys, defaultValue);
            if (altSourceResult.found) {
                return altSourceResult.value;
            }
        }

        return defaultValue;
    };


    var WalkPath = function (source, keys, defaultValue) {
        var parent = source;
        var value = defaultValue;

        var found;
        for (var index = 0, cnt = keys.length; index < cnt; index++) {
            var partKey = keys[index];

            if (parent && (typeof parent === 'object' || typeof parent === 'function')) {
                found = (partKey in parent);
            } else {
                found = false;
            }

            if (!found) {
                WalkPathResult.found = false;
                return WalkPathResult;
            }

            value = parent[partKey];
            parent = value;
        }

        WalkPathResult.found = true;
        WalkPathResult.value = value;
        return WalkPathResult;
    };

    var WalkPathResult = {};

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
            return (key === undefined) ? this.data : GetValue$2(this.data, key, defaultValue);
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

        webglRender(drawingContext, submitter, gameObject, calcMatrix, alpha, dx, dy) {

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
    shapeData: {
        fillColor, 
        fillAlpha, 
        pathData, 
        pathIndexes  // Earcut(pathData)
    }
    */

    var Utils$2 = phaser.Renderer.WebGL.Utils;

    var FillPathWebGL = function (drawingContext, submitter, calcMatrix, gameObject, shapeData, alpha, dx, dy) {
        // This is very similar to the FillPath RenderNode, but it already
        // has access to the Earcut indexes, so it doesn't need to calculate them.

        var fillTintColor = Utils$2.getTintAppendFloatAlpha(shapeData.fillColor, shapeData.fillAlpha * alpha);

        var path = shapeData.pathData;
        var pathIndexes = shapeData.pathIndexes;

        var length = path.length;
        var pathIndex, pointX, pointY, x, y;

        var vertices = Array(length * 2);
        var colors = Array(length);

        var verticesIndex = 0;
        var colorsIndex = 0;

        for (pathIndex = 0; pathIndex < length; pathIndex += 2) {
            pointX = path[pathIndex] - dx;
            pointY = path[pathIndex + 1] - dy;

            // Transform the point.
            x = calcMatrix.getX(pointX, pointY);
            y = calcMatrix.getY(pointX, pointY);

            vertices[verticesIndex++] = x;
            vertices[verticesIndex++] = y;
            colors[colorsIndex++] = fillTintColor;
        }

        submitter.batch(
            drawingContext,
            pathIndexes,
            vertices,
            colors,
            gameObject.lighting
        );
    };

    /*
    shapeData: {
        strokeColor,
        strokeAlpha,
        pathData,
        lineWidth,
        closePath,
        isDashed,
        strokePathData,
        strokePathMask
    }
    */
    var Utils$1 = phaser.Renderer.WebGL.Utils;

    var StrokePathWebGL = function (drawingContext, submitter, calcMatrix, gameObject, shapeData, alpha, dx, dy) {
        var strokeTintColor = Utils$1.getTintAppendFloatAlpha(shapeData.strokeColor, shapeData.strokeAlpha * alpha);
        var strokePath = gameObject.customRenderNodes.StrokePath || gameObject.defaultRenderNodes.StrokePath;

        var lineWidth = shapeData.lineWidth;
        var openPath = !shapeData.closePath;
        var isDashed = shapeData.isDashed && !!shapeData.strokePathData && !!shapeData.strokePathMask;

        // Helper method
        var RunStrokePath = function (pointPath, pathIsOpen) {
            if (pointPath.length < 2) {
                return;
            }

            strokePath.run(
                drawingContext,
                submitter,
                pointPath,
                lineWidth,
                pathIsOpen,
                calcMatrix,
                strokeTintColor, strokeTintColor, strokeTintColor, strokeTintColor,
                undefined,
                gameObject.lighting
            );
        };

        if (!isDashed) {
            // Default behavior
            var path = shapeData.pathData;
            if (!path || path.length < 4) {
                return;
            }
            var pathLength = path.length - 1;

            // Don't add the last point to open paths.
            if (openPath) {
                pathLength -= 2;
            }

            var pointPath = [];
            for (var i = 0; i < pathLength; i += 2) {
                pointPath.push({
                    x: path[i] - dx,
                    y: path[i + 1] - dy,
                    width: lineWidth
                });
            }

            RunStrokePath(pointPath, openPath);

        } else {
            // Dashed path data is a sequence of segment endpoints with a per-segment draw mask.
            var dashedPath = shapeData.strokePathData;
            if (!dashedPath || dashedPath.length < 4) {
                return;
            }
            var strokePathMask = shapeData.strokePathMask;
            var dashedPathLength = dashedPath.length - 1;

            if (openPath) {
                dashedPathLength -= 2;
            }

            var px1 = dashedPath[0] - dx;
            var py1 = dashedPath[1] - dy;

            var drawMaskIdx = 0;
            var pointPath = [];

            for (var j = 2; j < dashedPathLength; j += 2) {
                var px2 = dashedPath[j] - dx;
                var py2 = dashedPath[j + 1] - dy;

                // Build continuous line segments (pointPath)
                if (strokePathMask[drawMaskIdx]) {
                    if (
                        pointPath.length === 0 ||
                        pointPath[pointPath.length - 1].x !== px1 ||
                        pointPath[pointPath.length - 1].y !== py1
                    ) {
                        pointPath.push({
                            x: px1,
                            y: py1,
                            width: lineWidth
                        });
                    }

                    pointPath.push({
                        x: px2,
                        y: py2,
                        width: lineWidth
                    });
                } else {
                    RunStrokePath(pointPath, true);
                    pointPath = [];

                }

                px1 = px2;
                py1 = py2;
                drawMaskIdx++;
            }

            RunStrokePath(pointPath, true);
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

    /*
    src: {
        fillColor,
        fillAlpha,
        pathData,
        closePath
    }
    */
    var FillPathCanvas = function (ctx, src, dx, dy) {
        var path = src.pathData;
        if (!path || (path.length < 4)) {
            return;
        }

        var pathLength = path.length - 1;
        var px1 = path[0] - dx;
        var py1 = path[1] - dy;

        ctx.beginPath();
        ctx.moveTo(px1, py1);

        if (!src.closePath) {
            pathLength -= 2;
        }

        for (var i = 2; i < pathLength; i += 2) {
            var px2 = path[i] - dx;
            var py2 = path[i + 1] - dy;
            ctx.lineTo(px2, py2);
        }

        if (src.closePath) {
            ctx.closePath();
        }

        FillStyleCanvas(ctx, src);
        ctx.fill();
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

    /*
    src: {
        strokeColor,
        strokeAlpha,
        pathData,
        lineWidth,
        closePath,
        isDashed,
        strokePathData,
        strokePathMask
    }
    */
    var StrokePathCanvas = function (ctx, src, dx, dy) {
        var isDashed = src.isDashed && !!src.strokePathData;
        var path = (!isDashed) ? src.pathData : src.strokePathData;
        if (!path || (path.length < 4)) {
            return;
        }

        var pathLength = path.length - 1;
        var px1 = path[0] - dx;
        var py1 = path[1] - dy;

        LineStyleCanvas(ctx, src);
        ctx.beginPath();

        if (!src.closePath) {
            pathLength -= 2;
        }

        if (!isDashed) {
            // Default behavior
            ctx.moveTo(px1, py1);
            for (var i = 2; i < pathLength; i += 2) {
                var px2 = path[i] - dx;
                var py2 = path[i + 1] - dy;
                ctx.lineTo(px2, py2);
            }

            if (src.closePath) {
                ctx.closePath();
            }

        } else {
            // Draw dashed line
            var strokePathMask = src.strokePathMask;
            var drawMaskIdx = 0;

            for (var i = 2; i < pathLength; i += 2) {
                var px2 = path[i] - dx;
                var py2 = path[i + 1] - dy;

                if (strokePathMask[drawMaskIdx]) {
                    ctx.moveTo(px1, py1);
                    ctx.lineTo(px2, py2);
                }

                px1 = px2;
                py1 = py2;
                drawMaskIdx++;
            }
        }

        ctx.stroke();
    };

    const EPSILON = 1e-6;
    const DEFAULT_SEGMENT_COUNT = 10;
    const DEFAULT_DRAW_RATIO = 0.5;

    var NormalizeDashArray = function (dashPattern) {
        if (!Array.isArray(dashPattern)) {
            return null;
        }

        var normalized = [];
        for (var i = 0, cnt = dashPattern.length; i < cnt; i++) {
            var d = Number(dashPattern[i]);
            if (isFinite(d) && (d > 0)) {
                normalized.push(d);
            }
        }

        return (normalized.length > 0) ? normalized : null;
    };

    var BuildAutoDashPattern = function (dashPattern, totalPathLength) {
        var {
            segments = DEFAULT_SEGMENT_COUNT,
            drawRatio = DEFAULT_DRAW_RATIO
        } = dashPattern;

        segments = Math.round(segments);
        if (!isFinite(segments) || (segments <= 0)) {
            return null;
        }

        if (!(totalPathLength > EPSILON)) {
            return null;
        }

        var segmentLength = totalPathLength / segments;
        if (!(segmentLength > EPSILON)) {
            return null;
        }

        drawRatio = Math.max(0, Math.min(1, drawRatio));

        if (drawRatio >= (1 - EPSILON)) {
            // 100% draw ratio becomes a solid stroke.
            return null;
        }

        var drawLength = segmentLength * drawRatio;
        if (drawLength <= EPSILON) {
            drawLength = EPSILON;
        }

        var gapLength = segmentLength - drawLength;
        if (gapLength <= EPSILON) {
            return null;
        }

        return [drawLength, gapLength];
    };

    var NormalizeDashPattern = function (dashPattern, totalPathLength) {
        return NormalizeDashArray(dashPattern) || BuildAutoDashPattern(dashPattern, totalPathLength);
    };

    var WrapOffset = function (offset, totalLength) {
        if (!isFinite(offset)) {
            offset = 0;
        }

        offset = offset % totalLength;
        if (offset < 0) {
            offset += totalLength;
        }

        return offset;
    };

    var ForEachStrokeSegment = function (pathData, closePath, callback) {
        if ((!pathData) || (pathData.length < 4)) {
            return;
        }

        var pathLength = pathData.length - 1;
        if (!closePath) {
            pathLength -= 2;
        }

        if (pathLength < 2) {
            return;
        }

        var px1 = pathData[0];
        var py1 = pathData[1];

        for (var i = 2; i < pathLength; i += 2) {
            var px2 = pathData[i];
            var py2 = pathData[i + 1];

            callback(px1, py1, px2, py2);

            px1 = px2;
            py1 = py2;
        }
    };

    var GetTotalPathLength = function (pathData, closePath) {
        var totalLength = 0;
        ForEachStrokeSegment(pathData, closePath, function (x0, y0, x1, y1) {
            var dx = x1 - x0;
            var dy = y1 - y0;
            totalLength += Math.sqrt((dx * dx) + (dy * dy));
        });
        return totalLength;
    };

    var BuildDashStroke = function (pathData, config, out) {
        if (config === undefined) {
            config = {};
        }
        if (out === undefined) {
            out = {};
        }

        var {
            closePath = false,
            dashPattern,
            dashOffset = 0,
        } = config;

        var totalPathLength = GetTotalPathLength(pathData, closePath);
        dashPattern = NormalizeDashPattern(dashPattern, totalPathLength);

        // No valid dash pattern -> keep original stroke path, disable mask.
        if (dashPattern === null) {
            return null;
        }

        var strokePathData = [];
        var strokePathMask = [];

        var totalPatternLength = 0;
        for (var i = 0, cnt = dashPattern.length; i < cnt; i++) {
            totalPatternLength += dashPattern[i];
        }

        if (totalPatternLength <= EPSILON) {
            out.strokePathData = (pathData) ? pathData.slice() : [];
            out.strokePathMask = undefined;
            return out;
        }

        var patternIndex = 0;
        var draw = true;  // Pattern starts from a draw segment.
        var patternRemain = dashPattern[patternIndex];

        var AdvancePattern = function () {
            patternIndex = (patternIndex + 1) % dashPattern.length;
            draw = !draw;
            patternRemain = dashPattern[patternIndex];
        };

        var offset = WrapOffset(dashOffset, totalPatternLength);
        while (offset > EPSILON) {
            if (offset < (patternRemain - EPSILON)) {
                patternRemain -= offset;
                offset = 0;
            } else {
                offset -= patternRemain;
                AdvancePattern();
            }
        }

        var PushSegment = function (x0, y0, x1, y1, drawState) {
            if (strokePathData.length === 0) {
                strokePathData.push(x0, y0);
            } else {
                var lastX = strokePathData[strokePathData.length - 2];
                var lastY = strokePathData[strokePathData.length - 1];
                if ((lastX !== x0) || (lastY !== y0)) {
                    strokePathData.push(x0, y0);
                }
            }

            strokePathData.push(x1, y1);
            strokePathMask.push(drawState ? 1 : 0);
        };

        ForEachStrokeSegment(pathData, closePath, function (x0, y0, x1, y1) {
            var dx = x1 - x0;
            var dy = y1 - y0;
            var segLength = Math.sqrt((dx * dx) + (dy * dy));

            if (segLength <= EPSILON) {
                return;
            }

            var traveled = 0;
            while (traveled < (segLength - EPSILON)) {
                var step = Math.min(patternRemain, segLength - traveled);
                if (step <= EPSILON) {
                    AdvancePattern();
                    continue;
                }

                var t0 = traveled / segLength;
                var t1 = (traveled + step) / segLength;

                var sx = x0 + (dx * t0);
                var sy = y0 + (dy * t0);
                var ex = x0 + (dx * t1);
                var ey = y0 + (dy * t1);

                PushSegment(sx, sy, ex, ey, draw);

                traveled += step;
                patternRemain -= step;
                if (patternRemain <= EPSILON) {
                    AdvancePattern();
                }
            }
        });

        // Keep the existing open-path convention in StrokePathWebGL:
        // an extra tail point is ignored by the renderer when closePath=false.
        if (!closePath && (strokePathData.length >= 2)) {
            strokePathData.push(
                strokePathData[strokePathData.length - 2],
                strokePathData[strokePathData.length - 1]
            );
        }

        out.strokePathData = strokePathData;
        out.strokePathMask = strokePathMask;

        return out;
    };

    var SetDashPattern = function (dashPattern, dashOffset) {
        // dashPattern: [draw, gap] , or {segments, drawRatio}
        this.dashPattern = dashPattern;
        this.dashOffset = dashOffset || 0;
        this.isDashed = !!dashPattern;
        return this;
    };

    var ClearDashPattern = function () {
        this.setDashPattern();
        return this;
    };

    var SetDashed = function (enable) {
        if (enable === undefined) {
            enable = true;
        }

        this.isDashed = enable;
        return this;
    };

    var BuildStrokePath = function () {
        if (this.isDashed) {
            var result = BuildDashStroke(this.pathData, {
                closePath: this.closePath,
                dashPattern: this.dashPattern,
                dashOffset: this.dashOffset
            }, this);

            if (result) {
                this.strokePathData = result.strokePathData;
                this.strokePathMask = result.strokePathMask;
            } else {
                this.isDashed = false;
            }

        }

        return this;
    };

    var StrokePathConfigMethods = {
        setDashPattern: SetDashPattern,
        clearDashPattern: ClearDashPattern,
        setDashed: SetDashed
    };

    var Methods$1 = {
        buildStrokePath: BuildStrokePath
    };
    Object.assign(
        Methods$1,
        StrokePathConfigMethods,
    );

    const Earcut$1 = phaser.Geom.Polygon.Earcut;

    class PathBase extends BaseGeom {
        constructor() {
            super();

            this.pathData = [];

            this.isDashed = false;
            this.strokePathData = undefined;
            this.strokePathMask = undefined;
            this.dashPattern = undefined;
            this.dashOffset = 0;

            this.pathIndexes = [];
            this.closePath = false;
        }

        updateData() {
            this.pathIndexes = Earcut$1(this.pathData);

            super.updateData();

            this.buildStrokePath();
            return this;
        }

        webglRender(drawingContext, submitter, calcMatrix, gameObject, alpha, dx, dy) {
            if (this.isFilled) {
                FillPathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
            }

            if (this.isStroked) {
                StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
            }
        }

        canvasRender(ctx, dx, dy) {
            if (this.isFilled) {
                FillPathCanvas(ctx, this, dx, dy);
            }

            if (this.isStroked) {
                StrokePathCanvas(ctx, this, dx, dy);
            }
        }
    }

    Object.assign(
        PathBase.prototype,
        Methods$1,
    );

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

    const DegToRad$1 = phaser.Math.DegToRad;

    var ArcTo = function (centerX, centerY, radiusX, radiusY, startAngle, endAngle, antiClockWise, iteration, pathData) {
        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        var deltaAngle = endAngle - startAngle;
        var step = DegToRad$1(deltaAngle) / iteration;
        startAngle = DegToRad$1(startAngle);
        for (var i = 0; i <= iteration; i++) {
            var angle = startAngle + (step * i);
            var x = centerX + (radiusX * Math.cos(angle));
            var y = centerY + (radiusY * Math.sin(angle));
            LineTo(x, y, pathData);
        }
        return pathData;
    };

    phaser.Math.DegToRad;

    var StartAt = function (x, y, pathData) {
        pathData.length = 0;

        if (x != null) {
            pathData.push(x, y);
        }

        return pathData;
    };

    //import QuadraticBezierInterpolation from '../../utils/math/interpolation/QuadraticBezierInterpolation.js';

    const QuadraticBezierInterpolation = phaser.Math.Interpolation.QuadraticBezier;

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

    const CubicBezierInterpolation = phaser.Math.Interpolation.CubicBezier;

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

    const CatmullRomInterpolation = phaser.Math.Interpolation.CatmullRom;

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

    const ControlTypeQuadratic = 'quadratic';
    const ControlTypeCubic = 'cubic';

    var WarnPathTypeMismatch = function (methodName, expectedControlType) {
        if (!this.pathTypeMismatchWarningEnable) {
            return;
        }

        if ((typeof console === 'undefined') || !console.warn) {
            return;
        }

        console.warn(
            methodName +
            ' path type mismatch: expected previous control type to be ' +
            expectedControlType +
            ', got ' +
            (this.lastControlType || 'none') +
            '. Falling back to current point as control point.'
        );
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
            this.resetControlPoint();

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
            this.resetControlPoint();
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
            this.resetControlPoint();
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
            this.lastCX = cx;
            this.lastCY = cy;
            this.lastControlType = ControlTypeQuadratic;
            return this;
        },

        smoothQuadraticBezierTo(x, y) {
            var cx, cy;
            if (this.lastControlType === ControlTypeQuadratic) {
                cx = this.lastPointX * 2 - this.lastCX;
                cy = this.lastPointY * 2 - this.lastCY;
            } else {
                WarnPathTypeMismatch.call(
                    this,
                    'smoothQuadraticBezierTo()',
                    ControlTypeQuadratic
                );
                cx = this.lastPointX;
                cy = this.lastPointY;
            }

            this.quadraticBezierTo(cx, cy, x, y);
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
            this.lastCX = cx1;
            this.lastCY = cy1;
            this.lastControlType = ControlTypeCubic;
            return this;
        },

        smoothCubicBezierTo(cx1, cy1, x, y) {
            var cx0, cy0;
            if (this.lastControlType === ControlTypeCubic) {
                cx0 = this.lastPointX * 2 - this.lastCX;
                cy0 = this.lastPointY * 2 - this.lastCY;
            } else {
                WarnPathTypeMismatch.call(
                    this,
                    'smoothCubicBezierTo()',
                    ControlTypeCubic
                );
                cx0 = this.lastPointX;
                cy0 = this.lastPointY;
            }

            this.cubicBezierTo(cx0, cy0, cx1, cy1, x, y);
            return this;
        },

        catmullRomTo(...points) {
            CatmullRomTo(
                points,
                this.iterations,
                this.pathData
            );

            this.lastPointX = points[points.length - 2];
            this.lastPointY = points[points.length - 1];
            this.resetControlPoint();
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
            this.resetControlPoint();
            return this;
        },

        end() {
            DuplicateLast(this.pathData);
            this.resetControlPoint();
            return this;
        },

    };

    //import PointRotateAround from '../../utils/math/RotateAround.js';

    const PointRotateAround$1 = phaser.Math.RotateAround;

    var RotateAround = function (centerX, centerY, angle, pathData) {
        var point = { x: 0, y: 0 };
        for (var i = 0, cnt = pathData.length - 1; i < cnt; i += 2) {
            point.x = pathData[i];
            point.y = pathData[i + 1];
            PointRotateAround$1(point, centerX, centerY, angle);
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

    const DegToRad = phaser.Math.DegToRad;
    const PointRotateAround = phaser.Math.RotateAround;

    var TransformPointsMethods = {
        rotateAround(centerX, centerY, angle) {
            if (this.pathData.length === 0) {
                return this;
            }

            angle = DegToRad(angle);

            RotateAround(centerX, centerY, angle, this.pathData);

            var pathDataCnt = this.pathData.length;
            this.lastPointX = this.pathData[pathDataCnt - 2];
            this.lastPointY = this.pathData[pathDataCnt - 1];

            if (this.lastCX !== undefined) {
                var point = { x: this.lastCX, y: this.lastCY };
                PointRotateAround(point, centerX, centerY, angle);
                this.lastCX = point.x;
                this.lastCY = point.y;
            }

            return this;
        },

        scale(centerX, centerY, scaleX, scaleY) {
            if (this.pathData.length === 0) {
                return this;
            }

            Scale(centerX, centerY, scaleX, scaleY, this.pathData);
            var pathDataCnt = this.pathData.length;
            this.lastPointX = this.pathData[pathDataCnt - 2];
            this.lastPointY = this.pathData[pathDataCnt - 1];

            if (this.lastCX !== undefined) {
                this.lastCX = ((this.lastCX - centerX) * scaleX) + centerX;
                this.lastCY = ((this.lastCY - centerY) * scaleY) + centerY;
            }

            return this;
        },

        offset(x, y) {
            if (this.pathData.length === 0) {
                return this;
            }

            Offset(x, y, this.pathData);
            var pathDataCnt = this.pathData.length;
            this.lastPointX = this.pathData[pathDataCnt - 2];
            this.lastPointY = this.pathData[pathDataCnt - 1];

            if (this.lastCX !== undefined) {
                this.lastCX += x;
                this.lastCY += y;
            }

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
            this.firstPointX = this.pathData[0];
            this.firstPointY = this.pathData[1];
            this.lastPointX = this.pathData[this.pathData.length - 2];
            this.lastPointY = this.pathData[this.pathData.length - 1];
            this.resetControlPoint();
            return this;
        },
    };

    const DistanceBetween = phaser.Math.Distance.Between;
    const Wrap = phaser.Math.Wrap;
    const Linear = phaser.Math.Linear;

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
        return Linear(p0, p1, t);
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

            this.firstPointX = this.pathData[0];
            this.firstPointY = this.pathData[1];
            this.lastPointX = this.pathData[this.pathData.length - 2];
            this.lastPointY = this.pathData[this.pathData.length - 1];
            this.resetControlPoint();
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
            this.resetControlPoint();
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

    const Polygon = phaser.Geom.Polygon;

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
            this.lastCX = undefined;
            this.lastCY = undefined;
            this.lastControlType = undefined;
            this.pathTypeMismatchWarningEnable = true;
            this.accumulationLengths = undefined;
        }

        setIterations(iterations) {
            this.iterations = iterations;
            return this;
        }

        setPathTypeMismatchWarningEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.pathTypeMismatchWarningEnable = enable;
            return this;
        }

        resetControlPoint() {
            this.lastCX = this.lastPointX;
            this.lastCY = this.lastPointY;
            this.lastControlType = undefined;
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

        setPathTypeMismatchWarningEnable(enable) {
            this.builder.setPathTypeMismatchWarningEnable(enable);
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

        smoothQuadraticBezierTo(x, y) {
            this.builder.smoothQuadraticBezierTo(x, y);

            this.dirty = true;
            return this;
        }

        cubicBezierTo(cx0, cy0, cx1, cy1, x, y) {
            this.builder.cubicBezierTo(cx0, cy0, cx1, cy1, x, y);

            this.dirty = true;
            return this;
        }

        smoothCubicBezierTo(cx1, cy1, x, y) {
            this.builder.smoothCubicBezierTo(cx1, cy1, x, y);

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

    var Utils = phaser.Renderer.WebGL.Utils;

    class Rectangle extends BaseGeom {
        constructor(x, y, width, height) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (width === undefined) { width = 0; }
            if (height === undefined) { height = width; }

            super();

            this.pathData = [];

            this.isDashed = false;
            this.strokePathData = undefined;
            this.strokePathMask = undefined;
            this.dashPattern = undefined;
            this.dashOffset = 0;

            this.closePath = true;

            this.setTopLeftPosition(x, y);
            this.setSize(width, height);
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

        setTopLeftPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this.dirty = this.dirty || (this._width !== value);
            this._width = value;
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this.dirty = this.dirty || (this._height !== value);
            this._height = value;
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        get centerX() {
            return this.x + (this.width / 2);
        }

        set centerX(value) {
            this.x = value - (this.width / 2);
        }

        get centerY() {
            return this.y + (this.height / 2);
        }

        set centerY(value) {
            this.y = value - (this.height / 2);
        }

        setCenterPosition(x, y) {
            this.centerX = x;
            this.centerY = y;
            return this;
        }

        updateData() {
            this.pathData.length = 0;
            var x0 = this.x,
                x1 = x0 + this.width,
                y0 = this.y,
                y1 = y0 + this.height;
            this.pathData.push(x0, y0);
            this.pathData.push(x1, y0);
            this.pathData.push(x1, y1);
            this.pathData.push(x0, y1);
            this.pathData.push(x0, y0);

            super.updateData();

            this.buildStrokePath();
            return this;
        }

        webglRender(drawingContext, submitter, calcMatrix, gameObject, alpha, dx, dy) {
            if (this.isFilled) {
                var fillTintColor = Utils.getTintAppendFloatAlpha(this.fillColor, this.fillAlpha * alpha);

                var FillRect = gameObject.customRenderNodes.FillRect || gameObject.defaultRenderNodes.FillRect;

                FillRect.run(
                    drawingContext,
                    calcMatrix,
                    submitter,
                    -dx + this.x,
                    -dy + this.y,
                    this.width,
                    this.height,
                    fillTintColor,
                    fillTintColor,
                    fillTintColor,
                    fillTintColor
                );
            }

            if (this.isStroked) {
                StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
            }
        }

        canvasRender(ctx, dx, dy) {
            if (this.isFilled) {
                FillStyleCanvas(ctx, this);
                ctx.fillRect(-dx, -dy, this.width, this.height);
            }

            if (this.isStroked) {
                StrokePathCanvas(ctx, this, dx, dy);
            }
        }
    }

    Object.assign(
        Rectangle.prototype,
        Methods$1,
    );

    phaser.Utils.Objects.GetValue;

    const Earcut = phaser.Geom.Polygon.Earcut;

    class Triangle extends BaseGeom {
        constructor(x0, y0, x1, y1, x2, y2) {
            if (x0 === undefined) { x0 = 0; }
            if (y0 === undefined) { y0 = 0; }
            if (x1 === undefined) { x1 = 0; }
            if (y1 === undefined) { y1 = 0; }
            if (x2 === undefined) { x2 = 0; }
            if (y2 === undefined) { y2 = 0; }

            super();

            this.pathData = [];

            this.isDashed = false;
            this.strokePathData = undefined;
            this.strokePathMask = undefined;
            this.dashPattern = undefined;
            this.dashOffset = 0;

            this.pathIndexes = [];
            this.closePath = true;

            this.setP0(x0, y0);
            this.setP1(x1, y1);
            this.setP2(x2, y2);
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

        get x2() {
            return this._x2;
        }

        set x2(value) {
            this.dirty = this.dirty || (this._x2 !== value);
            this._x2 = value;
        }

        get y2() {
            return this._y2;
        }

        set y2(value) {
            this.dirty = this.dirty || (this._y2 !== value);
            this._y2 = value;
        }

        setP2(x, y) {
            this.dirty = this.dirty || (this.x2 !== x) || (this.y2 !== y);
            this.x2 = x;
            this.y2 = y;
            return this;
        }

        updateData() {
            this.pathData.length = 0;
            this.pathData.push(this.x0, this.y0);
            this.pathData.push(this.x1, this.y1);
            this.pathData.push(this.x2, this.y2);
            this.pathData.push(this.x0, this.y0);
            this.pathIndexes = Earcut(this.pathData);

            super.updateData();

            this.buildStrokePath();
            return this;
        }

        webglRender(drawingContext, submitter, calcMatrix, gameObject, alpha, dx, dy) {
            if (this.isFilled) {
                FillPathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
            }

            if (this.isStroked) {
                StrokePathWebGL(drawingContext, submitter, calcMatrix, gameObject, this, alpha, dx, dy);
            }
        }

        canvasRender(ctx, dx, dy) {
            if (this.isFilled) {
                FillPathCanvas(ctx, this, dx, dy);
            }

            if (this.isStroked) {
                StrokePathCanvas(ctx, this, dx, dy);
            }
        }
    }

    Object.assign(
        Triangle.prototype,
        Methods$1,
    );

    var IsArcCorner = function (radius) {
        return ((radius.x > 0) && (radius.y > 0));
    };

    var BuildRoundRectangle = function (
        lines,
        width, height, cornerRadius,
        iteration
    ) {

        lines
            .setIterations(iteration)
            .start();

        // Top-left
        var radius = cornerRadius.tl;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = radius.x;
                var centerY = radius.y;
                lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180, 270, false);
            } else {
                var centerX = 0;
                var centerY = 0;
                lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90, 0, true);
            }
        } else {
            lines.lineTo(0, 0);
        }

        // Top-right
        var radius = cornerRadius.tr;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = width - radius.x;
                var centerY = radius.y;
                lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270, 360, false);
            } else {
                var centerX = width;
                var centerY = 0;
                lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180, 90, true);
            }
        } else {
            lines.lineTo(width, 0);
        }

        // Bottom-right
        var radius = cornerRadius.br;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = width - radius.x;
                var centerY = height - radius.y;
                lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 0, 90, false);
            } else {
                var centerX = width;
                var centerY = height;
                lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270, 180, true);
            }
        } else {
            lines.lineTo(width, height);
        }

        // Bottom-left
        var radius = cornerRadius.bl;
        if (IsArcCorner(radius)) {
            if (radius.convex) {
                var centerX = radius.x;
                var centerY = height - radius.y;
                lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90, 180, false);
            } else {
                var centerX = 0;
                var centerY = height;
                lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 360, 270, true);
            }
        } else {
            lines.lineTo(0, height);
        }

        lines.close();

        return lines;
    };

    var RadToDeg$3 = phaser.Math.RadToDeg;

    var BuildRoundRectangleBarDirection0 = function (
        lines,
        width, height, cornerRadius,
        value,
    ) {
        var barWidth = width * value;

        // Top-left
        var radius = cornerRadius.tl;
        if (IsArcCorner(radius)) {
            var theta;
            if (barWidth > radius.x) {
                theta = 90;
            } else {
                theta = RadToDeg$3(Math.acos((radius.x - barWidth) / radius.x));
            }
            var centerX = radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180, 180 + theta, false);
        } else {
            lines.lineTo(0, 0);
        }

        // Top-right
        var radius = cornerRadius.tr;
        if (IsArcCorner(radius) && (barWidth > (width - radius.x))) {
            var theta = 90 - RadToDeg$3(Math.acos((barWidth - (width - radius.x)) / radius.x));
            var centerX = width - radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270, 270 + theta, false);
        } else {
            lines.lineTo(barWidth, 0);
        }

        // Bottom-right
        var radius = cornerRadius.br;
        if (IsArcCorner(radius) && (barWidth > (width - radius.x))) {
            var theta = 90 - RadToDeg$3(Math.acos((barWidth - (width - radius.x)) / radius.x));
            var centerX = width - radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90 - theta, 90, false);
        } else {
            lines.lineTo(barWidth, height);
        }

        // Bottom-left
        var radius = cornerRadius.bl;
        if (IsArcCorner(radius)) {
            var theta;
            if (barWidth > radius.x) {
                theta = 90;
            } else {
                theta = RadToDeg$3(Math.acos((radius.x - barWidth) / radius.x));
            }
            var centerX = radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180 - theta, 180, false);
        } else {
            lines.lineTo(0, height);
        }
    };

    var RadToDeg$2 = phaser.Math.RadToDeg;

    var BuildRoundRectangleBarDirection1 = function (
        lines,
        width, height, cornerRadius,
        value,
    ) {
        var barHeight = height * value;

        // Top-left
        var radius = cornerRadius.tl;
        if (IsArcCorner(radius)) {
            var theta;
            if (barHeight > radius.y) {
                theta = 90;
            } else {
                theta = RadToDeg$2(Math.acos((radius.y - barHeight) / radius.y));
            }
            var centerX = radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270 - theta, 270, false);
        } else {
            lines.lineTo(0, 0);
        }

        // Top-right
        var radius = cornerRadius.tr;
        if (IsArcCorner(radius)) {
            var theta;
            if (barHeight > radius.y) {
                theta = 90;
            } else {
                theta = RadToDeg$2(Math.acos((radius.y - barHeight) / radius.y));
            }
            var centerX = width - radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270, 270 + theta, false);
        } else {
            lines.lineTo(width, 0);
        }

        // Bottom-right
        var radius = cornerRadius.br;
        if (IsArcCorner(radius) && (barHeight > (height - radius.y))) {
            var theta = 90 - RadToDeg$2(Math.acos((barHeight - (height - radius.y)) / radius.y));
            var centerX = width - radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 0, 0 + theta, false);
        } else {
            lines.lineTo(width, barHeight);
        }

        // Bottom-left
        var radius = cornerRadius.bl;
        if (IsArcCorner(radius) && (barHeight > (height - radius.y))) {
            var theta = 90 - RadToDeg$2(Math.acos((barHeight - (height - radius.y)) / radius.y));
            var centerX = radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180 - theta, 180, false);
        } else {
            lines.lineTo(0, barHeight);
        }
    };

    var RadToDeg$1 = phaser.Math.RadToDeg;

    var BuildRoundRectangleBarDirection2 = function (
        lines,
        width, height, cornerRadius,
        value,
    ) {
        var barWidth = width * value;

        // Top-right
        var radius = cornerRadius.tr;
        if (IsArcCorner(radius)) {
            var theta;
            if (barWidth > radius.x) {
                theta = 90;
            } else {
                theta = RadToDeg$1(Math.acos((radius.x - barWidth) / radius.x));
            }
            var centerX = width - radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 360 - theta, 360, false);
        } else {
            lines.lineTo(width, 0);
        }

        // Bottom-right
        var radius = cornerRadius.br;
        if (IsArcCorner(radius)) {
            var theta;
            if (barWidth > radius.x) {
                theta = 90;
            } else {
                theta = RadToDeg$1(Math.acos((radius.x - barWidth) / radius.x));
            }
            var centerX = width - radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 0, 0 + theta, false);
        } else {
            lines.lineTo(width, height);
        }

        // Bottom-left
        var radius = cornerRadius.bl;
        if (IsArcCorner(radius) && (barWidth > (width - radius.x))) {
            var theta = 90 - RadToDeg$1(Math.acos((barWidth - (width - radius.x)) / radius.x));
            var centerX = radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90, 90 + theta, false);
        } else {
            lines.lineTo(width - barWidth, height);
        }

        // Top-left
        var radius = cornerRadius.tl;
        if (IsArcCorner(radius) && (barWidth > (width - radius.x))) {
            var theta = 90 - RadToDeg$1(Math.acos((barWidth - (width - radius.x)) / radius.x));
            var centerX = radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 270 - theta, 270, false);
        } else {
            lines.lineTo(width - barWidth, 0);
        }

    };

    var RadToDeg = phaser.Math.RadToDeg;

    var BuildRoundRectangleBarDirection3 = function (
        lines,
        width, height, cornerRadius,
        value,
    ) {
        var barHeight = height * value;

        // Bottom-right
        var radius = cornerRadius.br;
        if (IsArcCorner(radius)) {
            if (barHeight > radius.y) {
                theta = 90;
            } else {
                theta = RadToDeg(Math.acos((radius.y - barHeight) / radius.y));
            }
            var centerX = width - radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90 - theta, 90, false);
        } else {
            lines.lineTo(width, height);
        }

        // Bottom-left
        var radius = cornerRadius.bl;
        if (IsArcCorner(radius)) {
            if (barHeight > radius.y) {
                theta = 90;
            } else {
                theta = RadToDeg(Math.acos((radius.y - barHeight) / radius.y));
            }
            var centerX = radius.x;
            var centerY = height - radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 90, 90 + theta, false);
        } else {
            lines.lineTo(0, height);
        }

        // Top-left
        var radius = cornerRadius.tl;
        if (IsArcCorner(radius) && (barHeight > (height - radius.y))) {
            var theta = 90 - RadToDeg(Math.acos((barHeight - (height - radius.y)) / radius.y));
            var centerX = radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 180, 180 + theta, false);
        } else {
            lines.lineTo(0, height - barHeight);
        }

        // Top-right
        var radius = cornerRadius.tr;
        if (IsArcCorner(radius) && (barHeight > (height - radius.y))) {
            var theta = 90 - RadToDeg(Math.acos((barHeight - (height - radius.y)) / radius.y));
            var centerX = width - radius.x;
            var centerY = radius.y;
            lines.ellipticalArc(centerX, centerY, radius.x, radius.y, 360 - theta, 360, false);
        } else {
            lines.lineTo(width, height - barHeight);
        }

    };

    var BuildRoundRectangleBar = function (
        lines,
        width, height, cornerRadius,
        value, orientation, rtl,
        iteration
    ) {

        lines
            .setIterations(iteration)
            .start();

        if (value === 0) {
            return lines;
        } else if (value === 1) {
            return BuildRoundRectangle(lines, width, height, cornerRadius, iteration);
        }

        var callback;
        if (orientation === 0) {
            callback = (rtl) ? BuildRoundRectangleBarDirection2 : BuildRoundRectangleBarDirection0;
        } else {
            callback = (rtl) ? BuildRoundRectangleBarDirection3 : BuildRoundRectangleBarDirection1;
        }

        callback(lines, width, height, cornerRadius, value);

        lines.close();

        return lines;
    };

    var UpdateShapes = function () {
        var width = this.width;
        var height = this.height;
        var cornerRadius = this.rrGeom.cornerRadius;
        var value = this.value;
        var orientation = this.orientation;
        var rtl = this.rtl;
        var iteration = this.iteration + 1;

        var trackFill = this.getShape('trackFill');
        trackFill.fillStyle(this.trackColor);
        if (trackFill.isFilled) {
            BuildRoundRectangle(
                trackFill,
                width, height, cornerRadius,
                iteration
            );
        }

        var bar = this.getShape('bar');
        bar.fillStyle(this.barColor);
        if (bar.isFilled) {
            BuildRoundRectangleBar(
                bar,
                width, height, cornerRadius,
                value, orientation, rtl,
                iteration
            );
        }

        var trackStroke = this.getShape('trackStroke');
        trackStroke.lineStyle(this.trackStrokeThickness, this.trackStrokeColor);
        if (trackStroke.isStroked) {
            BuildRoundRectangle(
                trackStroke,     // lines  
                width, height, cornerRadius,
                iteration
            );
        }
    };

    const GetValue$1 = phaser.Utils.Objects.GetValue;

    class RoundRectangle {
        constructor(x, y, width, height, radiusConfig) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = x; }
            if (width === undefined) { width = 0; }
            if (height === undefined) { height = 0; }
            if (radiusConfig === undefined) { radiusConfig = 0; }

            this.cornerRadius = {};
            this._width = 0;
            this._height = 0;
            this.setTo(x, y, width, height, radiusConfig);
        }

        setTo(x, y, width, height, radiusConfig) {
            this.setPosition(x, y);
            this.setRadius(radiusConfig);
            this.setSize(width, height);
            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setRadius(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radius = value;
            return this;
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        get minWidth() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
        }

        get minHeight() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
        }

        get width() {
            return this._width;
        }

        set width(value) {
            if (value == null) {
                value = 0;
            }
            this._width = Math.max(value, this.minWidth);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            if (value == null) {
                value = 0;
            }
            this._height = Math.max(value, this.minHeight);
        }

        get radius() {
            var radius = this.cornerRadius;
            return Math.max(
                radius.tl.x, radius.tl.y,
                radius.tr.x, radius.tr.y,
                radius.bl.x, radius.bl.y,
                radius.br.x, radius.br.y
            );
        }

        set radius(value) {
            var defaultRadiusX, defaultRadiusY;
            if (typeof (value) === 'number') {
                defaultRadiusX = value;
                defaultRadiusY = value;
            } else {
                defaultRadiusX = GetValue$1(value, 'x', 0);
                defaultRadiusY = GetValue$1(value, 'y', 0);
            }

            var radius = this.cornerRadius;
            radius.tl = GetRadius(GetValue$1(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
            radius.tr = GetRadius(GetValue$1(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
            radius.bl = GetRadius(GetValue$1(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
            radius.br = GetRadius(GetValue$1(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
        }

        get radiusTL() {
            var radius = this.cornerRadius.tl;
            return Math.max(radius.x, radius.y);
        }

        set radiusTL(value) {
            SetRadius(this.cornerRadius.tl, value);
        }

        get radiusTR() {
            var radius = this.cornerRadius.tr;
            return Math.max(radius.x, radius.y);
        }

        set radiusTR(value) {
            SetRadius(this.cornerRadius.tr, value);
        }

        get radiusBL() {
            var radius = this.cornerRadius.bl;
            return Math.max(radius.x, radius.y);
        }

        set radiusBL(value) {
            SetRadius(this.cornerRadius.bl, value);
        }

        get radiusBR() {
            var radius = this.cornerRadius.br;
            return Math.max(radius.x, radius.y);
        }

        set radiusBR(value) {
            SetRadius(this.cornerRadius.br, value);
        }
    }

    var GetRadius = function (radius, defaultRadiusX, defaultRadiusY) {
        if (radius === undefined) {
            radius = {
                x: defaultRadiusX,
                y: defaultRadiusY
            };
        } else if (typeof (radius) === 'number') {
            radius = {
                x: radius,
                y: radius
            };
        }

        SetConvex(radius);
        return radius;

    };

    var SetRadius = function (radius, value) {
        if (typeof (value) === 'number') {
            radius.x = value;
            radius.y = value;
        } else {
            radius.x = GetValue$1(value, 'x', 0);
            radius.y = GetValue$1(value, 'y', 0);
        }

        SetConvex(radius);
    };

    var SetConvex = function (radius) {
        radius.convex = (radius.x >= 0) || (radius.y >= 0);

        radius.x = Math.abs(radius.x);
        radius.y = Math.abs(radius.y);
    };

    var OrientationMode = {
        x: 0,
        h: 0,
        horizontal: 0,
        'left-to-right': 0,

        y: 1,
        v: 1,
        vertical: 1,
        'top-to-bottom': 1
    };

    var GetOrientationMode = function (orientation) {
        if (typeof (orientation) === 'string') {
            orientation = OrientationMode[orientation];
        }
        return orientation;
    };

    const GetValue = phaser.Utils.Objects.GetValue;
    const IsPlainObject = phaser.Utils.Objects.IsPlainObject;

    class RoundRectangleProgress extends ProgressBase(BaseShapes) {
        constructor(scene, x, y, width, height, radiusConfig, barColor, value, config) {
            if (IsPlainObject(x)) {
                config = x;

                x = config.x;
                y = config.y;
                width = config.width;
                height = config.height;
                radiusConfig = config.radius;
                barColor = config.barColor;
                value = config.value;
            } else if (IsPlainObject(width)) {
                config = width;

                width = config.width;
                height = config.height;
                radiusConfig = config.radius;
                barColor = config.barColor;
                value = config.value;
            } else if (IsPlainObject(radiusConfig)) {
                config = radiusConfig;

                radiusConfig = config.radius;
                barColor = config.barColor;
                value = config.value;
            }

            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (width === undefined) { width = 1; }
            if (height === undefined) { height = width; }
            if (radiusConfig === undefined) { radiusConfig = 0; }
            if (value === undefined) { value = 0; }

            super(scene, x, y, width, height, config);
            this.type = 'rexRoundRectangleProgress';
            this.rrGeom = new RoundRectangle();  // For radiusConfig only

            this.bootProgressBase(config);

            this
                .addShape((new Lines()).setName('trackFill'))
                .addShape((new Lines()).setName('bar'))
                .addShape((new Lines()).setName('trackStroke'));

            this.setTrackColor(GetValue(config, 'trackColor', undefined));
            this.setBarColor(barColor);
            this.setTrackStroke(GetValue(config, 'trackStrokeThickness', 2), GetValue(config, 'trackStrokeColor', undefined));

            this.setOrientation(GetValue(config, 'orientation', 0));
            this.setRTL(GetValue(config, 'rtl', false));

            this.setRadius(radiusConfig);

            this.setIteration(GetValue(radiusConfig, 'iteration', undefined));

            this.setValue(value);
        }

        get trackColor() {
            return this._trackColor;
        }

        set trackColor(value) {
            this.dirty = this.dirty || (this._trackColor != value);
            this._trackColor = value;
        }

        setTrackColor(color) {
            this.trackColor = color;
            return this;
        }

        get trackStrokeColor() {
            return this._trackStrokeColor;
        }

        set trackStrokeColor(value) {
            this.dirty = this.dirty || (this._trackStrokeColor != value);
            this._trackStrokeColor = value;
        }

        get trackStrokeThickness() {
            return this._trackStrokeThickness;
        }

        set trackStrokeThickness(value) {
            this.dirty = this.dirty || (this._trackStrokeThickness != value);
            this._trackStrokeThickness = value;
        }

        setTrackStroke(lineWidth, color) {
            this.trackStrokeThickness = lineWidth;
            this.trackStrokeColor = color;
            return this;
        }

        get barColor() {
            return this._barColor;
        }

        set barColor(value) {
            this.dirty = this.dirty || (this._barColor != value);
            this._barColor = value;
        }

        setBarColor(color) {
            this.barColor = color;
            return this;
        }

        get orientation() {
            return this._orientation;
        }

        set orientation(value) {
            value = GetOrientationMode(value);
            this.dirty = this.dirty || (this._orientation != value);
            this._orientation = value;
        }

        setOrientation(value) {
            this.orientation = value;
            return this;
        }

        get rtl() {
            return this._rtl;
        }

        set rtl(value) {
            value = !!value;
            this.dirty = this.dirty || (this._rtl != value);
            this._rtl = value;
        }

        setRTL(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.rtl = enable;
            return this;
        }

        get radius() {
            return this.rrGeom.radius;
        }

        set radius(value) {
            this.rrGeom.setRadius(value);
            this.dirty = true;
        }

        get radiusTL() {
            return this.rrGeom.radiusTL;
        }

        set radiusTL(value) {
            this.rrGeom.radiusTL = value;
            this.dirty = true;
        }

        get radiusTR() {
            return this.rrGeom.radiusTR;
        }

        set radiusTR(value) {
            this.rrGeom.radiusTR = value;
            this.dirty = true;
        }

        get radiusBL() {
            return this.rrGeom.radiusBL;
        }

        set radiusBL(value) {
            this.rrGeom.radiusBL = value;
            this.dirty = true;
        }

        get radiusBR() {
            return this.rrGeom.radiusBR;
        }

        set radiusBR(value) {
            this.rrGeom.radiusBR = value;
            this.dirty = true;
        }

        setRadius(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radius = value;
            return this;
        }

        setRadiusTL(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusTL = value;
            return this;
        }

        setRadiusTR(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusTR = value;
            return this;
        }

        setRadiusBL(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusBL = value;
            return this;
        }

        setRadiusBR(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radiusBR = value;
            return this;
        }

        get cornerRadius() {
            return this.rrGeom.cornerRadius;
        }

        set cornerRadius(value) {
            this.radius = value;
        }

        setCornerRadius(value) {
            return this.setRadius(value);
        }

        get iteration() {
            return this._iteration;
        }

        set iteration(value) {
            // Set iteration first time
            if (this._iteration === undefined) {
                this._iteration = value;
                return;
            }

            // Change iteration value
            if (this._iteration === value) {
                return;
            }

            this._iteration = value;
            this.dirty = true;
        }

        setIteration(iteration) {
            if (iteration === undefined) {
                iteration = 6;
            }
            this.iteration = iteration;
            return this;
        }
    }

    var Methods = {
        updateShapes: UpdateShapes,
    };

    Object.assign(
        RoundRectangleProgress.prototype,
        Methods,
    );

    return RoundRectangleProgress;

}));
