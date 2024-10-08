(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlayermanagerplugin = factory());
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

    var PropertyMethods$1 = {
        hasProperty(property) {
            var gameObject = this.gameObject;
            if (gameObject.hasOwnProperty(property)) {
                return true;
            } else {
                var value = gameObject[property];
                return (value !== undefined);
            }
        },

        getProperty(property) {
            return this.gameObject[property];
        },

        setProperty(property, value) {
            this.gameObject[property] = value;
            return this;
        },

        easeProperty(config) {
            var property = config.property;
            var value = config.value;
            var duration = config.duration;
            var delay = config.delay;
            var ease = config.ease;
            var repeat = config.repeat;
            var isYoyo = config.yoyo;
            var isFrom = config.from;
            var onComplete = config.complete;
            var target = config.target;

            if (duration === undefined) {
                duration = 1000;
            }
            if (delay === undefined) {
                delay = 0;
            }
            if (ease === undefined) {
                ease = 'Linear';
            }
            if (repeat === undefined) {
                repeat = 0;
            }
            if (isYoyo === undefined) {
                isYoyo = false;
            }
            if (target === undefined) {
                target = this.gameObject;
            }
            if (isFrom) {
                var startValue = value;
                value = target[property];
                target[property] = startValue;
            }

            var config = {
                targets: target,
                duration: duration,
                delay: delay,
                ease: ease,
                repeat: repeat,
                yoyo: isYoyo,
                onComplete: onComplete,
            };
            config[property] = value;

            this.addTweenTask(property, config);

            return this;
        },

        addTweenTask(name, config) {
            var tweenTasks = this.tweens;
            var tweenTask = tweenTasks[name];
            if (tweenTask) {
                tweenTask.remove();
            }

            var onComplete = config.onComplete;
            config.onComplete = function () {
                tweenTasks[name].remove();
                tweenTasks[name] = null;
                if (onComplete) {
                    onComplete(config.targets, name);
                }
            };

            tweenTask = this.scene.tweens.add(config);
            tweenTask.timeScale = this.timeScale;
            tweenTasks[name] = tweenTask;
            return this;
        },

        getTweenTask(property) {
            return this.tweens[property];
        },

        freeTweens() {
            var tweenTasks = this.tweens,
                tweenTask;
            for (var propName in tweenTasks) {
                tweenTask = tweenTasks[propName];
                if (tweenTask) {
                    tweenTask.remove();
                }
                tweenTasks[propName] = null;
            }
            return this;
        }

    };

    var CallMethods$1 = {
        hasMethod(methodName) {
            return typeof (this.gameObject[methodName]) === 'function';
        },

        call(methodName, ...parameters) {
            if (!this.hasMethod(methodName)) {
                console.warn(`[GameObjectManager] Game object '${this.name}' does not have method '${methodName}'`);
                return this;
            }

            var gameObject = this.gameObject;
            gameObject[methodName].apply(gameObject, parameters);

            return this;
        }
    };

    var DataMethods$1 = {
        hasData(dataKey) {
            var gameObject = this.gameObject;
            return (gameObject.data) ? gameObject.data.has(dataKey) : false;
        },

        getData(dataKey) {
            return this.gameObject.getData(dataKey);
        },

        setData(dataKey, value) {
            this.gameObject.setData(dataKey, value);
            return this;
        },
    };

    class BobBase {
        constructor(GOManager, gameObject, name) {
            this.GOManager = GOManager;
            this.tweens = {};
            this.effects = {};
            this.setGO(gameObject, name);
        }

        get scene() {
            return this.GOManager.scene;
        }

        get timeScale() {
            return this.GOManager.timeScale;
        }

        destroy() {
            this.freeGO();
            this.GOManager = undefined;
        }

        freeGO() {
            this.freeTweens();
            this.gameObject.bob = undefined;
            this.gameObject.destroy();
            this.gameObject = undefined;
            return this;
        }

        setGO(gameObject, name) {
            gameObject.goName = name;
            gameObject.goType = this.GOManager.name;
            gameObject.bob = this;
            this.gameObject = gameObject;
            this.name = name;
            this.freeTweens();
            return this;
        }

        setTimeScale(timeScale) {
            var tweenTasks = this.tweens;
            for (var key in tweenTasks) {
                var tweenTask = tweenTasks[key];
                if (tweenTask) {
                    tweenTask.timeScale = timeScale;
                }
            }

            return this;
        }

    }

    Object.assign(
        BobBase.prototype,
        PropertyMethods$1,
        CallMethods$1,
        DataMethods$1,
    );

    var IsEmpty = function (source) {
        for (var k in source) {
            return false;
        }
        return true;
    };

    var IsSingleBob = function (name) {
        return name && (name.charAt(0) !== '!');
    };

    var GetMethods = {
        has(name) {
            return this.bobs.hasOwnProperty(name);
        },

        exists(name) {
            return this.bobs.hasOwnProperty(name);
        },

        get(name, out) {
            if (IsSingleBob(name)) {
                return this.bobs[name];

            } else {
                if (out === undefined) {
                    out = [];
                }

                if (name) {
                    name = name.substring(1);
                }

                for (var key in this.bobs) {
                    if (name && (key === name)) {
                        continue;
                    }

                    out.push(this.bobs[key]);
                }

                return out;
            }
        },

        getFitst(excluded) {
            if (excluded && (excluded.charAt(0) === '!')) {
                excluded = excluded.substring(1);
            }

            for (var name in this.bobs) {
                if (excluded && (excluded === name)) {
                    continue;
                }

                return this.bobs[name];
            }
            return null;
        },

        getGO(name, out) {
            var bob = this.get(name);
            if (!bob) {
                return null;

            } else if (!Array.isArray(bob)) {
                return bob.gameObject;

            } else {
                if (out === undefined) {
                    out = [];
                }
                var bobs = bob;
                bobs.forEach(function (bob) {
                    out.push(bob.gameObject);
                });

                return out;

            }
        },

        forEachGO(callback, scope) {
            for (var name in this.bobs) {
                var gameObject = this.bobs[name].gameObject;
                var stopLoop;
                if (scope) {
                    stopLoop = callback.call(scope, gameObject, name, this);
                } else {
                    stopLoop = callback(gameObject, name, this);
                }

                if (stopLoop) {
                    break;
                }
            }
            return this;
        },

        getAllGO(out) {
            if (out === undefined) {
                out = [];
            }

            for (var name in this.bobs) {
                var gameObject = this.bobs[name].gameObject;
                out.push(gameObject);
            }

            return out;
        }
    };

    var GetR = function (colorInt) {
        return (colorInt >> 16) & 0xff;
    };

    var GetG = function (colorInt) {
        return (colorInt >> 8) & 0xff;
    };

    var GetB = function (colorInt) {
        return (colorInt) & 0xff;
    };

    const MaskR = (~(0xff << 16) & 0xffffff);
    const MaskG = (~(0xff << 8) & 0xffffff);
    const MaskB = (~(0xff) & 0xffffff);

    var SetR = function (colorInt, r) {
        return ((r & 0xff) << 16) | (colorInt & MaskR);
    };

    var SetG = function (colorInt, g) {
        return ((g & 0xff) << 8) | (colorInt & MaskG);
    };

    var SetB = function (colorInt, b) {
        return (b & 0xff) | (colorInt & MaskB);
    };

    var SetRGB = function (colorInt, r, g, b) {
        return ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff));
    };

    var AddTintRGBProperties = function (gameObject, tintRGB) {
        // Don't attach properties again
        if (gameObject.hasOwnProperty('tintR')) {
            return gameObject;
        }

        if (tintRGB === undefined) {
            tintRGB = 0xffffff;
        }

        var tintR = GetR(tintRGB);
        var tintG = GetG(tintRGB);
        var tintB = GetB(tintRGB);

        // Override tint property
        Object.defineProperty(gameObject, 'tint', {
            get: function () {
                return tintRGB;
            },
            set: function (value) {
                value = Math.floor(value) & 0xffffff;
                if (gameObject.setTint) {
                    gameObject.setTint(value);
                }
                if (tintRGB !== value) {
                    tintRGB = value;
                    tintR = GetR(tintRGB);
                    tintG = GetG(tintRGB);
                    tintB = GetB(tintRGB);
                    // gameObject.emit('_tintchange', value, tintR, tintG, tintB);
                }
            }
        });

        Object.defineProperty(gameObject, 'tintR', {
            get: function () {
                return tintR;
            },
            set: function (value) {
                value = Math.floor(value) & 0xff;
                if (tintR !== value) {
                    tintR = value;
                    gameObject.tint = SetR(tintRGB, value);
                }
            },
        });
        Object.defineProperty(gameObject, 'tintG', {
            get: function () {
                return tintG;
            },
            set: function (value) {
                value = Math.floor(value) & 0xff;
                if (tintG !== value) {
                    tintG = value;
                    gameObject.tint = SetG(tintRGB, value);
                }
            },
        });
        Object.defineProperty(gameObject, 'tintB', {
            get: function () {
                return tintB;
            },
            set: function (value) {
                value = Math.floor(value) & 0xff;
                if (tintB !== value) {
                    tintB = value;
                    gameObject.tint = SetB(tintRGB, value);
                }
            },
        });
        Object.defineProperty(gameObject, 'tintGray', {
            get: function () {
                return Math.floor((tintR + tintG + tintB) / 3);
            },
            set: function (value) {
                value = Math.floor(value) & 0xff;
                if ((tintR !== value) || (tintG !== value) || (tintB !== value)) {
                    tintR = value;
                    tintG = value;
                    tintB = value;
                    gameObject.tint = SetRGB(tintRGB, value, value, value);
                }
            },
        });

        gameObject.tint = tintRGB;

        return gameObject;
    };

    const EventEmitter = Phaser.Events.EventEmitter;

    var MonitorViewport = function (viewport) {
        // Don't monitor properties again
        if (viewport.events) {
            return viewport;
        }

        var events = new EventEmitter();

        var x = viewport.x;
        Object.defineProperty(viewport, 'x', {
            get: function () {
                return x;
            },

            set: function (value) {
                if (x !== value) {
                    x = value;
                    events.emit('update', viewport);
                }
            },
        });

        var y = viewport.y;
        Object.defineProperty(viewport, 'y', {
            get: function () {
                return y;
            },

            set: function (value) {
                if (y !== value) {
                    y = value;
                    events.emit('update', viewport);
                }
            },
        });

        var width = viewport.width;
        Object.defineProperty(viewport, 'width', {
            get: function () {
                return width;
            },

            set: function (value) {
                if (width !== value) {
                    width = value;
                    events.emit('update', viewport);
                }
            },
        });

        var height = viewport.height;
        Object.defineProperty(viewport, 'height', {
            get: function () {
                return height;
            },

            set: function (value) {
                if (height !== value) {
                    height = value;
                    events.emit('update', viewport);
                }
            },
        });

        viewport.events = events;

        return viewport;
    };

    var VPXYToXY = function (vpx, vpy, vpxOffset, vpyOffset, viewport, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = GlobXY;
        }

        if (typeof (vpxOffset) !== 'number') {
            vpxOffset = 0;
            vpyOffset = 0;
        }

        out.x = viewport.x + (viewport.width * vpx) + vpxOffset;
        out.y = viewport.y + (viewport.height * vpy) + vpyOffset;
        return out;
    };

    var GlobXY = {};

    var AddViewportCoordinateProperties = function (gameObject, viewport, vpx, vpy, vpxOffset, vpyOffset, transformCallback) {
        // Don't attach properties again
        if (gameObject.hasOwnProperty('vp')) {
            return gameObject;
        }

        if (typeof (vpx) === 'function') {
            transformCallback = vpx;
            vpx = undefined;
        }

        if (typeof (vpxOffset) === 'function') {
            transformCallback = vpxOffset;
            vpxOffset = undefined;
        }


        if (vpx === undefined) { vpx = 0.5; }
        if (vpy === undefined) { vpy = 0.5; }
        if (vpxOffset === undefined) { vpxOffset = 0; }
        if (vpyOffset === undefined) { vpyOffset = 0; }

        if (transformCallback === undefined) {
            transformCallback = VPXYToXY;
        }

        MonitorViewport(viewport);
        var events = viewport.events;

        gameObject.vp = viewport;

        // Set position of game object when view-port changed.
        var Transform = function () {
            transformCallback(vpx, vpy, vpxOffset, vpyOffset, viewport, gameObject);
        };

        events.on('update', Transform);
        gameObject.once('destroy', function () {
            events.off('update', Transform);
            gameObject.vp = undefined;
        });

        Object.defineProperty(gameObject, 'vpx', {
            get: function () {
                return vpx;
            },
            set: function (value) {
                if (vpx !== value) {
                    vpx = value;
                    Transform();
                }
            },
        });

        Object.defineProperty(gameObject, 'vpy', {
            get: function () {
                return vpy;
            },
            set: function (value) {
                if (vpy !== value) {
                    vpy = value;
                    Transform();
                }
            },
        });

        Object.defineProperty(gameObject, 'vpxOffset', {
            get: function () {
                return vpxOffset;
            },
            set: function (value) {
                if (vpxOffset !== value) {
                    vpxOffset = value;
                    Transform();
                }
            },
        });

        Object.defineProperty(gameObject, 'vpyOffset', {
            get: function () {
                return vpyOffset;
            },
            set: function (value) {
                if (vpyOffset !== value) {
                    vpyOffset = value;
                    Transform();
                }
            },
        });

        Transform();
    };

    var HasProperty = function (obj, prop) {
        if (!obj) {
            return false;
        }

        if (obj.hasOwnProperty(prop)) {
            return true;
        }

        while (obj) {
            if (Object.getOwnPropertyDescriptor(obj, prop)) {
                return true;
            }
            obj = obj.__proto__;
        }

        return false;
    };

    var GetFXFactory = function (gameObject) {
        if (gameObject.preFX) {
            return gameObject.preFX;
        }
        if (gameObject.postFX) {
            return gameObject.postFX;
        }
        return null;
    };

    var AddClearEffectCallback = function (gameObject, effectSwitchName) {
        if (!gameObject._effectSwitchNames) {
            gameObject._effectSwitchNames = [];

            gameObject.clearAllEffects = function () {
                var effectSwitchNames = gameObject._effectSwitchNames;
                for (var i = 0, cnt = effectSwitchNames.length; i < cnt; i++) {
                    gameObject[effectSwitchNames[i]] = null;
                }

                return gameObject;
            };
            gameObject.on('destroy', gameObject.clearAllEffects, gameObject);
        }

        gameObject._effectSwitchNames.push(effectSwitchName);
    };

    var AddBarrelProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'barrel')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var barrel;
        Object.defineProperty(gameObject, 'barrel', {
            get: function () {
                return barrel;
            },
            set: function (value) {
                if (barrel === value) {
                    return;
                }

                barrel = value;

                if ((barrel === null) || (barrel === false)) {
                    if (gameObject._barrelEffect) {
                        fxFactory.remove(gameObject._barrelEffect);
                        gameObject._barrelEffect = undefined;
                    }
                } else {
                    if (!gameObject._barrelEffect) {
                        gameObject._barrelEffect = fxFactory.addBarrel();
                    }
                    gameObject._barrelEffect.amount = barrel;
                }

            },
        });

        gameObject.barrel = null;

        AddClearEffectCallback(gameObject, 'barrel');

        return gameObject;
    };

    var AddColorMatrixEffectPropertiesBase = function (gameObject, effectName, inputMode) {
        // Don't attach properties again
        if (HasProperty(gameObject, effectName)) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var EffectInstancePropertyName = `_${effectName}Effect`;

        var currentValue;
        Object.defineProperty(gameObject, effectName, {
            get: function () {
                return currentValue;
            },
            set: function (value) {
                if (currentValue === value) {
                    return;
                }

                currentValue = value;

                if ((currentValue === null) || (currentValue === false)) {
                    if (gameObject[EffectInstancePropertyName]) {
                        fxFactory.remove(gameObject[EffectInstancePropertyName]);
                        gameObject[EffectInstancePropertyName] = undefined;
                    }
                } else {
                    if (!gameObject[EffectInstancePropertyName]) {
                        gameObject[EffectInstancePropertyName] = fxFactory.addColorMatrix();
                    }
                    var effectInstance = gameObject[EffectInstancePropertyName];
                    effectInstance[effectName]((inputMode === 1) ? value : undefined);
                }

            },
        });

        gameObject[effectName] = null;

        AddClearEffectCallback(gameObject, effectName);

        return gameObject;
    };

    var AddBlackWhiteProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'blackWhite');
        return gameObject;
    };

    var AddBloomProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'bloomColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var bloomColor,
            bloomOffsetX = 1,
            bloomOffsetY = 1,
            bloomBlurStrength = 1,
            bloomStrength = 1,
            bloomSteps = 4;
        Object.defineProperty(gameObject, 'bloomColor', {
            get: function () {
                return bloomColor;
            },
            set: function (value) {
                if (bloomColor === value) {
                    return;
                }

                bloomColor = value;

                if ((bloomColor === null) || (bloomColor === false)) {
                    if (gameObject._bloom) {
                        fxFactory.remove(gameObject._bloom);
                        gameObject._bloom = undefined;
                        fxFactory.setPadding(0);
                    }
                } else {
                    if (!gameObject._bloom) {
                        gameObject._bloom = fxFactory.addBloom(bloomColor, bloomOffsetX, bloomOffsetY, bloomBlurStrength, bloomStrength, bloomSteps);
                        fxFactory.setPadding(Math.max(bloomOffsetX, bloomOffsetY) + 1);
                    }

                    gameObject._bloom.color = bloomColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'bloomOffsetX', {
            get: function () {
                return bloomOffsetX;
            },
            set: function (value) {
                if (bloomOffsetX === value) {
                    return;
                }

                bloomOffsetX = value;

                if (gameObject._bloom) {
                    var offset = Math.max(bloomOffsetX, bloomOffsetY);
                    fxFactory.setPadding(offset + 1);
                    gameObject._bloom.offsetX = bloomOffsetX;
                }
            },
        });

        Object.defineProperty(gameObject, 'bloomOffsetY', {
            get: function () {
                return bloomOffsetY;
            },
            set: function (value) {
                if (bloomOffsetY === value) {
                    return;
                }

                bloomOffsetY = value;

                if (gameObject._bloom) {
                    var offset = Math.max(bloomOffsetX, bloomOffsetY);
                    fxFactory.setPadding(offset + 1);
                    gameObject._bloom.offsetY = bloomOffsetY;
                }
            },
        });

        Object.defineProperty(gameObject, 'bloomBlurStrength', {
            get: function () {
                return bloomBlurStrength;
            },
            set: function (value) {
                if (bloomBlurStrength === value) {
                    return;
                }

                bloomBlurStrength = value;

                if (gameObject._bloom) {
                    gameObject._bloom.blurStrength = bloomBlurStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'bloomStrength', {
            get: function () {
                return bloomStrength;
            },
            set: function (value) {
                if (bloomStrength === value) {
                    return;
                }

                bloomStrength = value;

                if (gameObject._bloom) {
                    gameObject._bloom.strength = bloomStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'bloomSteps', {
            get: function () {
                return bloomSteps;
            },
            set: function (value) {
                if (bloomSteps === value) {
                    return;
                }

                bloomSteps = value;

                if (gameObject._bloom) {
                    gameObject._bloom.steps = bloomSteps;
                }
            },
        });

        gameObject.bloomColor = null;

        AddClearEffectCallback(gameObject, 'bloomColor');

        return gameObject;
    };

    var AddBlurProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'blurColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var blurColor,
            blurQuality = 0,
            blurX = 1,
            blurY = 1,
            blurStrength = 1,
            blurSteps = 4;
        Object.defineProperty(gameObject, 'blurColor', {
            get: function () {
                return blurColor;
            },
            set: function (value) {
                if (blurColor === value) {
                    return;
                }

                blurColor = value;

                if ((blurColor === null) || (blurColor === false)) {
                    if (gameObject._blur) {
                        fxFactory.remove(gameObject._blur);
                        gameObject._blur = undefined;
                        fxFactory.setPadding(0);
                    }
                } else {
                    if (!gameObject._blur) {
                        gameObject._blur = fxFactory.addBlur(blurQuality, blurX, blurY, blurStrength, blurColor, blurSteps);
                        fxFactory.setPadding(Math.max(blurX, blurY) + 1);
                    }

                    gameObject._blur.color = blurColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'blurQuality', {
            get: function () {
                return blurQuality;
            },
            set: function (value) {
                if (blurQuality === value) {
                    return;
                }

                blurQuality = value;

                if (gameObject._blur) {
                    gameObject._blur.quality = blurQuality;
                }

            },
        });

        Object.defineProperty(gameObject, 'blurX', {
            get: function () {
                return blurX;
            },
            set: function (value) {
                if (blurX === value) {
                    return;
                }

                blurX = value;

                if (gameObject._blur) {
                    var offset = Math.max(blurX, blurY);
                    fxFactory.setPadding(offset + 1);
                    gameObject._blur.x = blurX;
                }
            },
        });

        Object.defineProperty(gameObject, 'blurY', {
            get: function () {
                return blurY;
            },
            set: function (value) {
                if (blurY === value) {
                    return;
                }

                blurY = value;

                if (gameObject._blur) {
                    var offset = Math.max(blurX, blurY);
                    fxFactory.setPadding(offset + 1);
                    gameObject._blur.y = blurY;
                }
            },
        });

        Object.defineProperty(gameObject, 'blurStrength', {
            get: function () {
                return blurStrength;
            },
            set: function (value) {
                if (blurStrength === value) {
                    return;
                }

                blurStrength = value;

                if (gameObject._blur) {
                    gameObject._blur.strength = blurStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'blurSteps', {
            get: function () {
                return blurSteps;
            },
            set: function (value) {
                if (blurSteps === value) {
                    return;
                }

                blurSteps = value;

                if (gameObject._blur) {
                    gameObject._blur.steps = blurSteps;
                }
            },
        });

        gameObject.blurColor = null;

        AddClearEffectCallback(gameObject, 'blurColor');

        return gameObject;
    };

    var AddBokehProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'bokehRadius')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var bokehRadius,
            bokehAmount = 1,
            bokehContrast = 0.2;
        Object.defineProperty(gameObject, 'bokehRadius', {
            get: function () {
                return bokehRadius;
            },
            set: function (value) {
                if (bokehRadius === value) {
                    return;
                }

                bokehRadius = value;

                if ((bokehRadius === null) || (bokehRadius === false)) {
                    if (gameObject._bokeh) {
                        fxFactory.remove(gameObject._bokeh);
                        gameObject._bokeh = undefined;
                    }
                } else {
                    if (!gameObject._bokeh) {
                        gameObject._bokeh = fxFactory.addBokeh(bokehRadius, bokehAmount, bokehContrast);
                    }

                    gameObject._bokeh.radius = bokehRadius;
                }

            },
        });

        Object.defineProperty(gameObject, 'bokehAmount', {
            get: function () {
                return bokehAmount;
            },
            set: function (value) {
                if (bokehAmount === value) {
                    return;
                }

                bokehAmount = value;

                if (gameObject._bokeh) {
                    gameObject._bokeh.amount = bokehAmount;
                }
            },
        });

        Object.defineProperty(gameObject, 'bokehContrast', {
            get: function () {
                return bokehContrast;
            },
            set: function (value) {
                if (bokehContrast === value) {
                    return;
                }

                bokehContrast = value;

                if (gameObject._bokeh) {
                    gameObject._bokeh.contrast = bokehContrast;
                }
            },
        });

        gameObject.bokehRadius = null;

        AddClearEffectCallback(gameObject, 'bokehRadius');

        return gameObject;
    };

    var AddBrightnessProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'brightness', 1);
        return gameObject;
    };

    var AddBrownProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'brown');
        return gameObject;
    };

    var AddCircleProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'circleColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var circleColor,
            circleThickness = 8,
            circleBackgroundColor = 0x000000,
            circleBackgroundAlpha = 0.4,
            circleScale = 1,
            circleFeather = 0.005;
        Object.defineProperty(gameObject, 'circleColor', {
            get: function () {
                return circleColor;
            },
            set: function (value) {
                if (circleColor === value) {
                    return;
                }

                circleColor = value;

                if ((circleColor === null) || (circleColor === false)) {
                    if (gameObject._circle) {
                        fxFactory.remove(gameObject._circle);
                        gameObject._circle = undefined;
                    }
                } else {
                    if (!gameObject._circle) {
                        gameObject._circle = fxFactory.addCircle(circleThickness, circleColor, circleBackgroundColor, circleScale, circleFeather);
                        gameObject.circleBackgroundAlpha = circleBackgroundAlpha;
                    }

                    gameObject._circle.color = circleColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'circleThickness', {
            get: function () {
                return circleThickness;
            },
            set: function (value) {
                if (circleThickness === value) {
                    return;
                }

                circleThickness = value;

                if (gameObject._circle) {
                    gameObject._circle.thickness = circleThickness;
                }
            },
        });

        Object.defineProperty(gameObject, 'circleBackgroundColor', {
            get: function () {
                return circleBackgroundColor;
            },
            set: function (value) {
                if (circleBackgroundColor === value) {
                    return;
                }

                circleBackgroundColor = value;

                if (gameObject._circle) {
                    gameObject._circle.backgroundColor = circleBackgroundColor;
                }
            },
        });

        Object.defineProperty(gameObject, 'circleBackgroundAlpha', {
            get: function () {
                return circleBackgroundAlpha;
            },
            set: function (value) {
                if (circleBackgroundAlpha === value) {
                    return;
                }

                circleBackgroundAlpha = value;

                if (gameObject._circle) {
                    gameObject._circle.glcolor2[3] = circleBackgroundAlpha;
                }
            },
        });


        Object.defineProperty(gameObject, 'circleScale', {
            get: function () {
                return circleScale;
            },
            set: function (value) {
                if (circleScale === value) {
                    return;
                }

                circleScale = value;

                if (gameObject._circle) {
                    gameObject._circle.scale = circleScale;
                }
            },
        });

        Object.defineProperty(gameObject, 'circleFeather', {
            get: function () {
                return circleFeather;
            },
            set: function (value) {
                if (circleFeather === value) {
                    return;
                }

                circleFeather = value;

                if (gameObject._circle) {
                    gameObject._circle.feather = circleFeather;
                }
            },
        });

        gameObject.circleColor = null;

        AddClearEffectCallback(gameObject, 'circleColor');

        return gameObject;
    };

    var AddContrastProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'contrast', 1);
        return gameObject;
    };

    var AddDesaturateProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'desaturate', 1);
        return gameObject;
    };

    var AddDesaturateLuminanceProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'desaturateLuminance');
        return gameObject;
    };

    var AddDisplacementProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'displacementKey')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var displacementKey,
            displacementX = 0.005,
            displacementY = 0.005;
        Object.defineProperty(gameObject, 'displacementKey', {
            get: function () {
                return displacementKey;
            },
            set: function (value) {
                if (displacementKey === value) {
                    return;
                }

                displacementKey = value;

                if ((displacementKey === null) || (displacementKey === false)) {
                    if (gameObject._displacement) {
                        fxFactory.remove(gameObject._displacement);
                        gameObject._displacement = undefined;
                    }
                } else {
                    if (!gameObject._displacement) {
                        gameObject._displacement = fxFactory.addDisplacement(displacementKey, displacementX, displacementY);
                    }

                    gameObject._displacement.setTexture(displacementKey);
                }

            },
        });

        Object.defineProperty(gameObject, 'displacementX', {
            get: function () {
                return displacementX;
            },
            set: function (value) {
                if (displacementX === value) {
                    return;
                }

                displacementX = value;

                if (gameObject._displacement) {
                    gameObject._displacement.x = displacementX;
                }
            },
        });

        Object.defineProperty(gameObject, 'displacementY', {
            get: function () {
                return displacementY;
            },
            set: function (value) {
                if (displacementY === value) {
                    return;
                }

                displacementY = value;

                if (gameObject._displacement) {
                    gameObject._displacement.y = displacementY;
                }
            },
        });

        gameObject.displacementKey = null;

        AddClearEffectCallback(gameObject, 'displacementKey');

        return gameObject;
    };

    var AddGlowProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'glowColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var glowColor,
            glowOuterStrength = 4,
            glowInnerStrength = 0;
        Object.defineProperty(gameObject, 'glowColor', {
            get: function () {
                return glowColor;
            },
            set: function (value) {
                if (glowColor === value) {
                    return;
                }

                glowColor = value;

                if ((glowColor === null) || (glowColor === false)) {
                    if (gameObject._glow) {
                        fxFactory.remove(gameObject._glow);
                        gameObject._glow = undefined;
                        fxFactory.setPadding(0);
                    }
                } else {
                    if (!gameObject._glow) {
                        gameObject._glow = fxFactory.addGlow(glowColor, glowOuterStrength, glowInnerStrength);
                        fxFactory.setPadding(glowOuterStrength + 1);
                    }

                    gameObject._glow.color = glowColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'glowOuterStrength', {
            get: function () {
                return glowOuterStrength;
            },
            set: function (value) {
                if (glowOuterStrength === value) {
                    return;
                }

                glowOuterStrength = value;

                if (gameObject._glow) {
                    fxFactory.setPadding(glowOuterStrength + 1);
                    gameObject._glow.outerStrength = glowOuterStrength;
                }
            },
        });

        Object.defineProperty(gameObject, 'glowInnerStrength', {
            get: function () {
                return glowInnerStrength;
            },
            set: function (value) {
                if (glowInnerStrength === value) {
                    return;
                }

                glowInnerStrength = value;

                if (gameObject._glow) {
                    gameObject._glow.innerStrength = glowInnerStrength;
                }
            },
        });

        gameObject.glowColor = null;

        AddClearEffectCallback(gameObject, 'glowColor');

        return gameObject;
    };

    var AddGradientProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'gradientColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var gradientColor1,
            gradientColor2,
            gradientAlpha = 0.5,
            gradientFromX = 0,
            gradientFromY = 0,
            gradientToX = 0,
            gradientToY = 1,
            gradientSize = 0;
        Object.defineProperty(gameObject, 'gradientColor', {
            get: function () {
                return [gradientColor1, gradientColor2];
            },

            set: function (value) {
                var color1, color2;
                if ((value === null) || (value === false)) {
                    color1 = null;
                    color2 = null;
                } else {
                    color1 = value[0];
                    color2 = value[1];
                }

                if ((gradientColor1 === color1) && (gradientColor2 === color2)) {
                    return;
                }

                gradientColor1 = color1;
                gradientColor2 = color2;

                if ((gradientColor1 === null) || (gradientColor1 === false)) {
                    if (gameObject._gradient) {
                        fxFactory.remove(gameObject._gradient);
                        gameObject._gradient = undefined;
                    }
                } else {
                    if (!gameObject._gradient) {
                        gameObject._gradient = fxFactory.addGradient(gradientColor1, gradientColor2, gradientAlpha, gradientFromX, gradientFromY, gradientToX, gradientToY, gradientSize);
                    }

                    gameObject._gradient.color1 = gradientColor1;
                    gameObject._gradient.color2 = gradientColor2;
                }

            },
        });

        Object.defineProperty(gameObject, 'gradientColor1', {
            get: function () {
                return gradientColor1;
            },
            set: function (value) {
                if ((value === null) || (value === false)) {
                    gameObject.gradientColor = value;
                    return;
                }

                if (gradientColor1 === value) {
                    return;
                }

                gradientColor1 = value;

                if (gameObject._gradient) {
                    gameObject._gradient.color1 = gradientColor1;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientColor2', {
            get: function () {
                return gradientColor2;
            },
            set: function (value) {
                if ((value === null) || (value === false)) {
                    gameObject.gradientColor = value;
                    return;
                }

                if (gradientColor2 === value) {
                    return;
                }

                gradientColor2 = value;

                if (gameObject._gradient) {
                    gameObject._gradient.color2 = gradientColor2;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientAlpha', {
            get: function () {
                return gradientAlpha;
            },
            set: function (value) {
                if (gradientAlpha === value) {
                    return;
                }

                gradientAlpha = value;

                if (gameObject._gradient) {
                    gameObject._gradient.alpha = gradientAlpha;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientFromX', {
            get: function () {
                return gradientFromX;
            },
            set: function (value) {
                if (gradientFromX === value) {
                    return;
                }

                gradientFromX = value;

                if (gameObject._gradient) {
                    gameObject._gradient.fromX = gradientFromX;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientFromY', {
            get: function () {
                return gradientFromY;
            },
            set: function (value) {
                if (gradientFromY === value) {
                    return;
                }

                gradientFromY = value;

                if (gameObject._gradient) {
                    gameObject._gradient.fromY = gradientFromY;
                }
            },
        });


        Object.defineProperty(gameObject, 'gradientToX', {
            get: function () {
                return gradientToX;
            },
            set: function (value) {
                if (gradientToX === value) {
                    return;
                }

                gradientToX = value;

                if (gameObject._gradient) {
                    gameObject._gradient.toX = gradientToX;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientToY', {
            get: function () {
                return gradientToY;
            },
            set: function (value) {
                if (gradientToY === value) {
                    return;
                }

                gradientToY = value;

                if (gameObject._gradient) {
                    gameObject._gradient.toY = gradientToY;
                }
            },
        });

        Object.defineProperty(gameObject, 'gradientSize', {
            get: function () {
                return gradientSize;
            },
            set: function (value) {
                if (gradientSize === value) {
                    return;
                }

                gradientSize = value;

                if (gameObject._gradient) {
                    gameObject._gradient.size = gradientSize;
                }
            },
        });

        gameObject.gradientColor = null;

        AddClearEffectCallback(gameObject, 'gradientColor');

        return gameObject;
    };

    var AddGrayscaleProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'grayscale', 1);
        return gameObject;
    };

    var AddHueProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'hue', 1);
        return gameObject;
    };

    var AddKodachromeProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'kodachrome');
        return gameObject;
    };

    var AddLSDProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'lsd');
        return gameObject;
    };

    var AddNegativeProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'negative');
        return gameObject;
    };

    var AddPixelateProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'pixelate')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var pixelate;
        Object.defineProperty(gameObject, 'pixelate', {
            get: function () {
                return pixelate;
            },
            set: function (value) {
                if (pixelate === value) {
                    return;
                }

                pixelate = value;

                if ((pixelate === null) || (pixelate === false)) {
                    if (gameObject._pixelateEffect) {
                        fxFactory.remove(gameObject._pixelateEffect);
                        gameObject._pixelateEffect = undefined;
                    }
                } else {
                    if (!gameObject._pixelateEffect) {
                        gameObject._pixelateEffect = fxFactory.addPixelate();
                    }
                    gameObject._pixelateEffect.amount = pixelate;
                }

            },
        });

        gameObject.pixelate = null;

        AddClearEffectCallback(gameObject, 'pixelate');

        return gameObject;
    };

    var AddPolaroidProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'polaroid');
        return gameObject;
    };

    var AddRevealProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'revealLeft')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var revealLeft,
            revealRight,
            revealUp,
            revealDown,
            revealWidth = 0.1;

        var ClearRevealFlags = function () {
            revealLeft = null;
            revealRight = null;
            revealUp = null;
            revealDown = null;
        };

        var RemoveEffect = function (gameObject) {
            if (gameObject._revealEffect) {
                fxFactory.remove(gameObject._revealEffect);
                gameObject._revealEffect = undefined;
            }
        };

        Object.defineProperty(gameObject, 'revealLeft', {
            get: function () {
                return revealLeft;
            },
            set: function (value) {
                if (revealLeft === value) {
                    return;
                }

                ClearRevealFlags();

                revealLeft = value;

                if ((revealLeft === null) || (revealLeft === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._revealEffect) {
                        gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                    }

                    gameObject._revealEffect.direction = 1;
                    gameObject._revealEffect.axis = 0;
                    gameObject._revealEffect.progress = revealLeft;
                }

            },
        });

        Object.defineProperty(gameObject, 'revealRight', {
            get: function () {
                return revealRight;
            },
            set: function (value) {
                if (revealRight === value) {
                    return;
                }

                ClearRevealFlags();

                revealRight = value;

                if ((revealRight === null) || (revealRight === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._revealEffect) {
                        gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                    }
                    gameObject._revealEffect.direction = 0;
                    gameObject._revealEffect.axis = 0;
                    gameObject._revealEffect.progress = revealRight;
                }

            },
        });

        Object.defineProperty(gameObject, 'revealUp', {
            get: function () {
                return revealUp;
            },
            set: function (value) {
                if (revealUp === value) {
                    return;
                }

                ClearRevealFlags();

                revealUp = value;

                if ((revealUp === null) || (revealUp === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._revealEffect) {
                        gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                    }
                    gameObject._revealEffect.direction = 1;
                    gameObject._revealEffect.axis = 1;
                    gameObject._revealEffect.progress = revealUp;
                }

            },
        });

        Object.defineProperty(gameObject, 'revealDown', {
            get: function () {
                return revealDown;
            },
            set: function (value) {
                if (revealDown === value) {
                    return;
                }

                ClearRevealFlags();

                revealDown = value;

                if ((revealDown === null) || (revealDown === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._revealEffect) {
                        gameObject._revealEffect = fxFactory.addReveal(revealWidth, 0, 0);
                    }
                    gameObject._revealEffect.direction = 0;
                    gameObject._revealEffect.axis = 1;
                    gameObject._revealEffect.progress = revealDown;
                }

            },
        });

        Object.defineProperty(gameObject, 'revealWidth', {
            get: function () {
                return revealWidth;
            },
            set: function (value) {
                if (revealWidth === value) {
                    return;
                }

                revealWidth = value;

                if (gameObject._revealEffect) {
                    gameObject._revealEffect.wipeWidth = revealWidth;
                }
            },
        });

        gameObject.revealLeft = null;

        AddClearEffectCallback(gameObject, 'revealLeft');
        AddClearEffectCallback(gameObject, 'revealRight');
        AddClearEffectCallback(gameObject, 'revealUp');
        AddClearEffectCallback(gameObject, 'revealDown');

        return gameObject;
    };

    var AddSaturateProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'saturate', 1);
        return gameObject;
    };

    var AddSepiaProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'sepia');
        return gameObject;
    };

    var AddShadowProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'shadowColor')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var shadowColor,
            shadowX = 0,
            shadowY = 0,
            shadowDecay = 0.1,
            shadowPower = 1,
            shadowSamples = 6,
            shadowIntensity = 1;
        Object.defineProperty(gameObject, 'shadowColor', {
            get: function () {
                return shadowColor;
            },
            set: function (value) {
                if (shadowColor === value) {
                    return;
                }

                shadowColor = value;

                if ((shadowColor === null) || (shadowColor === false)) {
                    if (gameObject._shadow) {
                        fxFactory.remove(gameObject._shadow);
                        gameObject._shadow = undefined;
                    }
                } else {
                    if (!gameObject._shadow) {
                        gameObject._shadow = fxFactory.addShadow(shadowX, shadowY, shadowDecay, shadowPower, shadowColor, shadowSamples, shadowIntensity);
                    }

                    gameObject._shadow.color = shadowColor;
                }

            },
        });

        Object.defineProperty(gameObject, 'shadowX', {
            get: function () {
                return shadowX;
            },
            set: function (value) {
                if (shadowX === value) {
                    return;
                }

                shadowX = value;

                if (gameObject._shadow) {
                    gameObject._shadow.x = shadowX;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowY', {
            get: function () {
                return shadowY;
            },
            set: function (value) {
                if (shadowY === value) {
                    return;
                }

                shadowY = value;

                if (gameObject._shadow) {
                    gameObject._shadow.y = shadowY;
                }
            },
        });

        Object.defineProperty(gameObject, 'decay', {
            get: function () {
                return shadowDecay;
            },
            set: function (value) {
                if (shadowDecay === value) {
                    return;
                }

                shadowDecay = value;

                if (gameObject._shadow) {
                    gameObject._shadow.decay = shadowDecay;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowPower', {
            get: function () {
                return shadowPower;
            },
            set: function (value) {
                if (shadowPower === value) {
                    return;
                }

                shadowPower = value;

                if (gameObject._shadow) {
                    gameObject._shadow.power = shadowPower;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowSamples', {
            get: function () {
                return shadowSamples;
            },
            set: function (value) {
                if (shadowSamples === value) {
                    return;
                }

                shadowSamples = value;

                if (gameObject._shadow) {
                    gameObject._shadow.samples = shadowSamples;
                }
            },
        });

        Object.defineProperty(gameObject, 'shadowIntensity', {
            get: function () {
                return shadowIntensity;
            },
            set: function (value) {
                if (shadowIntensity === value) {
                    return;
                }

                shadowIntensity = value;

                if (gameObject._shadow) {
                    gameObject._shadow.intensity = shadowIntensity;
                }
            },
        });

        gameObject.shadowColor = null;

        AddClearEffectCallback(gameObject, 'shadowColor');

        return gameObject;
    };

    var AddShiftToBGRProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'shiftToBGR');
        return gameObject;
    };

    var AddShineProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'shineSpeed')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var shineSpeed,
            shineLineWidth = 0.5,
            shineGradient = 3;
        Object.defineProperty(gameObject, 'shineSpeed', {
            get: function () {
                return shineSpeed;
            },
            set: function (value) {
                if (shineSpeed === value) {
                    return;
                }

                shineSpeed = value;

                if ((shineSpeed === null) || (shineSpeed === false)) {
                    if (gameObject._shine) {
                        fxFactory.remove(gameObject._shine);
                        gameObject._shine = undefined;
                    }
                } else {
                    if (!gameObject._shine) {
                        gameObject._shine = fxFactory.addShine(shineSpeed, shineLineWidth, shineGradient);
                    }

                    gameObject._shine.speed = shineSpeed;
                }

            },
        });

        Object.defineProperty(gameObject, 'shineLineWidth', {
            get: function () {
                return shineLineWidth;
            },
            set: function (value) {
                if (shineLineWidth === value) {
                    return;
                }

                shineLineWidth = value;

                if (gameObject._shine) {
                    gameObject._shine.lineWidth = shineLineWidth;
                }
            },
        });

        Object.defineProperty(gameObject, 'shineGradient', {
            get: function () {
                return shineGradient;
            },
            set: function (value) {
                if (shineGradient === value) {
                    return;
                }

                shineGradient = value;

                if (gameObject._shine) {
                    gameObject._shine.gradient = shineGradient;
                }
            },
        });

        gameObject.shineSpeed = null;

        AddClearEffectCallback(gameObject, 'shineSpeed');

        return gameObject;
    };

    var AddTechnicolorProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'technicolor');
        return gameObject;
    };

    var AddTiltShiftProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'tiltShiftRadius')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var tiltShiftRadius,
            tiltShiftAmount = 1,
            tiltShiftContrast = 0.2,
            tiltShiftBlurX = 1,
            tiltShiftBlurY = 1,
            tiltShiftStrength = 1;
        Object.defineProperty(gameObject, 'tiltShiftRadius', {
            get: function () {
                return tiltShiftRadius;
            },
            set: function (value) {
                if (tiltShiftRadius === value) {
                    return;
                }

                tiltShiftRadius = value;

                if ((tiltShiftRadius === null) || (tiltShiftRadius === false)) {
                    if (gameObject._tiltShift) {
                        fxFactory.remove(gameObject._tiltShift);
                        gameObject._tiltShift = undefined;
                    }
                } else {
                    if (!gameObject._tiltShift) {
                        gameObject._tiltShift = fxFactory.addTiltShift(tiltShiftRadius, tiltShiftAmount, tiltShiftContrast, tiltShiftBlurX, tiltShiftBlurY, tiltShiftStrength);
                    }

                    gameObject._tiltShift.radius = tiltShiftRadius;
                }

            },
        });

        Object.defineProperty(gameObject, 'tiltShiftAmount', {
            get: function () {
                return tiltShiftAmount;
            },
            set: function (value) {
                if (tiltShiftAmount === value) {
                    return;
                }

                tiltShiftAmount = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.amount = tiltShiftAmount;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftContrast', {
            get: function () {
                return tiltShiftContrast;
            },
            set: function (value) {
                if (tiltShiftContrast === value) {
                    return;
                }

                tiltShiftContrast = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.contrast = tiltShiftContrast;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftBlurX', {
            get: function () {
                return tiltShiftBlurX;
            },
            set: function (value) {
                if (tiltShiftBlurX === value) {
                    return;
                }

                tiltShiftBlurX = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.blurX = tiltShiftBlurX;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftBlurY', {
            get: function () {
                return tiltShiftBlurY;
            },
            set: function (value) {
                if (tiltShiftBlurY === value) {
                    return;
                }

                tiltShiftBlurY = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.blurY = tiltShiftBlurY;
                }
            },
        });

        Object.defineProperty(gameObject, 'tiltShiftStrength', {
            get: function () {
                return tiltShiftStrength;
            },
            set: function (value) {
                if (tiltShiftStrength === value) {
                    return;
                }

                tiltShiftStrength = value;

                if (gameObject._tiltShift) {
                    gameObject._tiltShift.strength = tiltShiftStrength;
                }
            },
        });

        gameObject.tiltShiftRadius = null;

        AddClearEffectCallback(gameObject, 'tiltShiftRadius');

        return gameObject;
    };

    var AddVignetteProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'vignetteRadius')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var vignetteRadius,
            vignetteX = 0.5,
            vignetteY = 0.5,
            vignetteStrength = 0.5;
        Object.defineProperty(gameObject, 'vignetteRadius', {
            get: function () {
                return vignetteRadius;
            },
            set: function (value) {
                if (vignetteRadius === value) {
                    return;
                }

                vignetteRadius = value;

                if ((vignetteRadius === null) || (vignetteRadius === false)) {
                    if (gameObject._vignette) {
                        fxFactory.remove(gameObject._vignette);
                        gameObject._vignette = undefined;
                    }
                } else {
                    if (!gameObject._vignette) {
                        gameObject._vignette = fxFactory.addVignette(vignetteX, vignetteY, vignetteRadius, vignetteStrength);
                    }

                    gameObject._vignette.radius = vignetteRadius;
                }

            },
        });

        Object.defineProperty(gameObject, 'vignetteX', {
            get: function () {
                return vignetteX;
            },
            set: function (value) {
                if (vignetteX === value) {
                    return;
                }

                vignetteX = value;

                if (gameObject._vignette) {
                    gameObject._vignette.x = vignetteX;
                }
            },
        });

        Object.defineProperty(gameObject, 'vignetteY', {
            get: function () {
                return vignetteY;
            },
            set: function (value) {
                if (vignetteY === value) {
                    return;
                }

                vignetteY = value;

                if (gameObject._vignette) {
                    gameObject._vignette.y = vignetteY;
                }
            },
        });

        Object.defineProperty(gameObject, 'vignetteStrength', {
            get: function () {
                return vignetteStrength;
            },
            set: function (value) {
                if (vignetteStrength === value) {
                    return;
                }

                vignetteStrength = value;

                if (gameObject._vignette) {
                    gameObject._vignette.strength = vignetteStrength;
                }
            },
        });

        gameObject.vignetteRadius = null;

        AddClearEffectCallback(gameObject, 'vignetteRadius');

        return gameObject;
    };

    var AddVintagePinholeProperties = function (gameObject) {
        AddColorMatrixEffectPropertiesBase(gameObject, 'vintagePinhole');
        return gameObject;
    };

    var AddWipeProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'wipeLeft')) {
            return gameObject;
        }

        var fxFactory = GetFXFactory(gameObject);
        if (!fxFactory) {
            return gameObject;
        }

        var wipeLeft,
            wipeRight,
            wipeUp,
            wipeDown,
            wipeWidth = 0.1;

        var ClearWipeFlags = function () {
            wipeLeft = null;
            wipeRight = null;
            wipeUp = null;
            wipeDown = null;
        };

        var RemoveEffect = function (gameObject) {
            if (gameObject._wipeEffect) {
                fxFactory.remove(gameObject._wipeEffect);
                gameObject._wipeEffect = undefined;
            }
        };

        Object.defineProperty(gameObject, 'wipeLeft', {
            get: function () {
                return wipeLeft;
            },
            set: function (value) {
                if (wipeLeft === value) {
                    return;
                }

                ClearWipeFlags();

                wipeLeft = value;

                if ((wipeLeft === null) || (wipeLeft === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._wipeEffect) {
                        gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                    }

                    gameObject._wipeEffect.direction = 1;
                    gameObject._wipeEffect.axis = 0;
                    gameObject._wipeEffect.progress = wipeLeft;
                }

            },
        });

        Object.defineProperty(gameObject, 'wipeRight', {
            get: function () {
                return wipeRight;
            },
            set: function (value) {
                if (wipeRight === value) {
                    return;
                }

                ClearWipeFlags();

                wipeRight = value;

                if ((wipeRight === null) || (wipeRight === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._wipeEffect) {
                        gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                    }
                    gameObject._wipeEffect.direction = 0;
                    gameObject._wipeEffect.axis = 0;
                    gameObject._wipeEffect.progress = wipeRight;
                }

            },
        });

        Object.defineProperty(gameObject, 'wipeUp', {
            get: function () {
                return wipeUp;
            },
            set: function (value) {
                if (wipeUp === value) {
                    return;
                }

                ClearWipeFlags();

                wipeUp = value;

                if ((wipeUp === null) || (wipeUp === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._wipeEffect) {
                        gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                    }
                    gameObject._wipeEffect.direction = 1;
                    gameObject._wipeEffect.axis = 1;
                    gameObject._wipeEffect.progress = wipeUp;
                }

            },
        });

        Object.defineProperty(gameObject, 'wipeDown', {
            get: function () {
                return wipeDown;
            },
            set: function (value) {
                if (wipeDown === value) {
                    return;
                }

                ClearWipeFlags();

                wipeDown = value;

                if ((wipeDown === null) || (wipeDown === false)) {
                    RemoveEffect(gameObject);
                } else {
                    if (!gameObject._wipeEffect) {
                        gameObject._wipeEffect = fxFactory.addWipe(wipeWidth, 0, 0);
                    }
                    gameObject._wipeEffect.direction = 0;
                    gameObject._wipeEffect.axis = 1;
                    gameObject._wipeEffect.progress = wipeDown;
                }

            },
        });

        Object.defineProperty(gameObject, 'wipeWidth', {
            get: function () {
                return wipeWidth;
            },
            set: function (value) {
                if (wipeWidth === value) {
                    return;
                }

                wipeWidth = value;

                if (gameObject._wipeEffect) {
                    gameObject._wipeEffect.wipeWidth = wipeWidth;
                }
            },
        });

        gameObject.wipeLeft = null;

        AddClearEffectCallback(gameObject, 'wipeLeft');
        AddClearEffectCallback(gameObject, 'wipeRight');
        AddClearEffectCallback(gameObject, 'wipeUp');
        AddClearEffectCallback(gameObject, 'wipeDown');

        return gameObject;
    };

    const EffectMap = {
        barrel: AddBarrelProperties,
        blackWhite: AddBlackWhiteProperties,
        bloom: AddBloomProperties,
        blur: AddBlurProperties,
        bokeh: AddBokehProperties,
        brightness: AddBrightnessProperties,
        brown: AddBrownProperties,
        circle: AddCircleProperties,
        contrast: AddContrastProperties,
        desaturate: AddDesaturateProperties,
        desaturateLuminance: AddDesaturateLuminanceProperties,
        displacement: AddDisplacementProperties,
        glow: AddGlowProperties,
        gradient: AddGradientProperties,
        grayscale: AddGrayscaleProperties,
        hue: AddHueProperties,
        kodachrome: AddKodachromeProperties,
        lsd: AddLSDProperties,
        negative: AddNegativeProperties,
        pixelate: AddPixelateProperties,
        polaroid: AddPolaroidProperties,
        reveal: AddRevealProperties,
        saturate: AddSaturateProperties,
        sepia: AddSepiaProperties,
        shadow: AddShadowProperties,
        shiftToBGR: AddShiftToBGRProperties,
        shine: AddShineProperties,
        technicolor: AddTechnicolorProperties,
        tiltShift: AddTiltShiftProperties,
        vignette: AddVignetteProperties,
        vintagePinhole: AddVintagePinholeProperties,
        wipe: AddWipeProperties
    };

    var AddEffectProperties = function (gameObject, config) {
        if (config === undefined) {
            config = true;
        } else if (typeof (config) === 'string') {
            config = { config: true };
        } else if (Array.isArray(config)) {
            var nameList = config;
            var config = {};
            for (var i = 0, cnt = nameList.length; i < cnt; i++) {
                config[nameList[i]] = true;
            }
        }

        if (config === true) {
            // Enable all effect properties
            for (var name in EffectMap) {
                EffectMap[name](gameObject);
            }
        } else {
            for (var name in config) {
                if (config[name] && EffectMap[name]) {
                    EffectMap[name](gameObject);
                }
            }
        }

        return gameObject;
    };

    const RemoveItem = Phaser.Utils.Array.Remove;

    var AddMethods = {
        addGO(name, gameObject) {
            this.remove(name, true);

            if (this.useTintFadeEffect(gameObject)) {
                AddTintRGBProperties(gameObject);
            }

            if (this.viewportCoordinateEnable) {
                AddViewportCoordinateProperties(gameObject, this.viewport);
            }

            if (this.effectPropertiesConfig) {
                AddEffectProperties(gameObject, this.effectPropertiesConfig);
            }

            gameObject
                .setName(name)
                .once('destroy', function () {
                    RemoveItem(this.removedGOs, gameObject);
                    if (this.isEmpty) {
                        this.emit('empty');
                    }
                }, this);

            var bob = new this.BobClass(this, gameObject, name);
            this.bobs[name] = bob;

            return this;
        },

        add(name, ...args) {
            var callback = this.createGameObjectCallback;
            var scope = this.createGameObjectScope;
            var gameObject = callback.call(scope, this.scene, ...args);
            this.addGO(name, gameObject);

            if (this.gameObjectDepth != null) { // Not undefined, null
                gameObject.setDepth(this.gameObjectDepth);
            }

            var bob = this.get(name);
            this.fadeBob(bob, 0, 1);

            return this;
        },
    };

    var RemoveMethods = {
        remove(name, ignoreFade) {
            var bobs = this.get(name);
            if (!bobs) {
                return this;
            } else if (!Array.isArray(bobs)) {
                bobs = [bobs];
            }

            var self = this;
            bobs.forEach(function (bob) {
                delete self.bobs[bob.name];

                var gameObject = bob.gameObject;
                self.removedGOs.push(gameObject);
                gameObject.setName();

                if (!ignoreFade) {
                    self.fadeBob(
                        bob,                  // bob
                        undefined,            // fromValue
                        0,                    // toValue
                        function () {         // onComplete
                            bob.destroy();
                        }
                    );
                } else {
                    bob.destroy();
                }
            });

            return this;
        },

        removeAll() {
            var bobs = this.bobs;
            for (var name in bobs) {
                this.remove(name);
            }
            return this;
        },

        clear(destroyChild) {
            if (destroyChild === undefined) {
                destroyChild = true;
            }
            var bobs = this.bobs;
            for (var name in bobs) {
                if (destroyChild) {
                    bobs[name].destroy();
                }
                delete bobs[name];
            }
            this.removedGOs.length = 0;
            return this;
        }
    };

    var PropertyMethods = {
        hasProperty(name, property) {
            var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
            if (!bob) {
                return false;
            }

            return bob.hasProperty(property);
        },

        getProperty(name, property) {
            var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
            if (!bob) {
                return undefined;
            }

            return bob.getProperty(property);
        },

        isNumberProperty(name, property) {
            var value = this.getProperty(name, property);
            return typeof (value) === 'number';
        },

        setProperty(name, property, value) {
            var bobs = this.get(name);
            if (!bobs) {
                return this;
            } else if (!Array.isArray(bobs)) {
                bobs = [bobs];
            }

            if (this.symbols &&
                (typeof (value) === 'string') &&
                this.isNumberProperty(name, property)
            ) {
                if (value in this.symbols) {
                    value = this.symbols[value];
                } else {
                    console.warn(`Can't find symbol ${value}`);
                }
            }

            bobs.forEach(function (bob) {
                bob.setProperty(property, value);
            });

            return this;
        },

        easeProperty(name, config) {
            var bobs = this.get(name);
            if (!bobs) {
                return this;
            } else if (!Array.isArray(bobs)) {
                bobs = [bobs];
            }

            var value = config.value;
            var property = config.property;

            if (this.symbols &&
                (typeof (value) === 'string') &&
                this.isNumberProperty(name, property) &&
                (value in this.symbols)
            ) {
                config.value = this.symbols[value];
            }

            bobs.forEach(function (bob) {
                bob.easeProperty(config);
            });

            return this;
        },

        hasTweenTask(name, property) {
            var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
            if (!bob) {
                return false;
            }

            return bob.tweens.hasOwnProperty(property);
        },

        getTweenTask(name, property) {
            var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
            if (!bob) {
                return null;
            }

            return bob.tweens[property] || null;
        }
    };

    var CallMethods = {
        hasMethod(name, methodName) {
            var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
            if (!bob) {
                return false;
            }

            return bob.hasMethod(methodName);
        },


        call(name, methodName, ...parameters) {
            var bobs = this.get(name);
            if (!bobs) {
                return this;
            } else if (!Array.isArray(bobs)) {
                bobs = [bobs];
            }

            bobs.forEach(function (bob) {
                bob.call(methodName, ...parameters);
            });

            return this;
        },
    };

    var DataMethods = {
        hasData(name, dataKey) {
            var bob = IsSingleBob(name) ? this.get(name) : this.getFitst(name);
            if (!bob) {
                return false;
            }

            return bob.hasData(dataKey);
        },

        getData(name, dataKey) {
            if (!this.has(name)) {
                return undefined;
            }
            return this.get(name).getData(dataKey);
        },

        setData(name, dataKey, value) {
            var bobs = this.get(name);
            if (!bobs) {
                return this;
            } else if (!Array.isArray(bobs)) {
                bobs = [bobs];
            }

            bobs.forEach(function (bob) {
                bob.setData(dataKey, value);
            });

            return this;
        },
    };

    const FadeTint = 0;
    const FadeAlpha = 1;
    const FadeRevealUp = 2;
    const FadeRevealDown = 3;
    const FadeRevealLeft = 4;
    const FadeRevealRight = 5;

    const FadeMode = {
        tint: FadeTint,
        alpha: FadeAlpha,
        revealUp: FadeRevealUp,
        revealDown: FadeRevealDown,
        revealLeft: FadeRevealLeft,
        revealRight: FadeRevealRight,
    };

    var FadeMethods = {
        setGOFadeMode(fadeMode) {
            if (typeof (fadeMode) === 'string') {
                fadeMode = FadeMode[fadeMode];
            }

            this.fadeMode = fadeMode;
            return this;
        },

        setGOFadeTime(time) {
            this.fadeTime = time;
            return this;
        },

        useTintFadeEffect(gameObject) {
            return ((this.fadeMode === undefined) || (this.fadeMode === FadeTint)) &&
                (this.fadeTime > 0) && (gameObject.setTint !== undefined);
        },

        useAlphaFadeEffect(gameObject) {
            return ((this.fadeMode === undefined) || (this.fadeMode === FadeAlpha)) &&
                (this.fadeTime > 0) && (gameObject.setAlpha !== undefined);
        },

        useRevealEffect(gameObject) {
            return ((this.fadeMode >= FadeRevealUp) && (this.fadeMode <= FadeRevealRight)) &&
                (this.fadeTime > 0) && (gameObject.preFX || gameObject.postFX);
        },

        fadeBob(bob, fromValue, toValue, onComplete) {
            var gameObject = bob.gameObject;
            if (this.useTintFadeEffect(gameObject)) {
                if (fromValue !== undefined) {
                    bob.setProperty('tintGray', 255 * fromValue);
                }
                bob.easeProperty({
                    property: 'tintGray',
                    value: Math.floor(255 * toValue),
                    duration: this.fadeTime,
                    delay: 0,
                    ease: 'Linear',
                    repeat: 0,
                    yoyo: false,
                    from: false,
                    complete: onComplete
                });

            } else if (this.useAlphaFadeEffect(gameObject)) {
                if (fromValue !== undefined) {
                    bob.setProperty('alpha', fromValue);
                }
                bob.easeProperty({
                    property: 'alpha',
                    value: toValue,
                    duration: this.fadeTime,
                    delay: 0,
                    ease: 'Linear',
                    repeat: 0,
                    yoyo: false,
                    from: false,
                    complete: onComplete
                });

            } else if (this.useRevealEffect(gameObject)) {
                AddEffectProperties(gameObject, 'reveal');
                var propertyName;
                switch (this.fadeMode) {
                    case FadeRevealUp: propertyName = 'revealUp'; break;
                    case FadeRevealDown: propertyName = 'revealDown'; break;
                    case FadeRevealLeft: propertyName = 'revealLeft'; break;
                    case FadeRevealRight: propertyName = 'revealRight'; break;
                }

                if (fromValue === undefined) {
                    fromValue = 0;
                }
                gameObject[propertyName] = fromValue;
                bob.easeProperty({
                    property: propertyName,
                    value: toValue,
                    duration: this.fadeTime,
                    delay: 0,
                    ease: 'Linear',
                    repeat: 0,
                    yoyo: false,
                    from: false,
                    complete: onComplete
                });

                bob.getTweenTask(propertyName).once('complete', function () {
                    gameObject[propertyName] = null;
                });

            } else {
                if (onComplete) {
                    onComplete(gameObject);
                }

            }

            return this;
        }

    };

    var GetDisplayWidth = function (gameObject) {
        if (gameObject.displayWidth !== undefined) {
            return gameObject.displayWidth;
        } else {
            return gameObject.width;
        }
    };

    var GetDisplayHeight = function (gameObject) {
        if (gameObject.displayHeight !== undefined) {
            return gameObject.displayHeight;
        } else {
            return gameObject.height;
        }
    };

    Phaser.Geom.Rectangle;
    const Vector2 = Phaser.Math.Vector2;
    const RotateAround = Phaser.Math.RotateAround;
    Phaser.GameObjects.Container;

    var GetTopLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopLeft) {
            return gameObject.getTopLeft(output);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetTopRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getTopRight) {
            return gameObject.getTopRight(output);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomLeft = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomLeft) {
            return gameObject.getBottomLeft(output);
        }

        output.x = gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GetBottomRight = function (gameObject, output, includeParent) {
        if (output === undefined) {
            output = new Vector2();
        } else if (output === true) {
            if (GlobVector === undefined) {
                GlobVector = new Vector2();
            }
            output = GlobVector;
        }

        if (gameObject.getBottomRight) {
            return gameObject.getBottomRight(output);
        }

        output.x = (gameObject.x - (GetDisplayWidth(gameObject) * gameObject.originX)) + GetDisplayWidth(gameObject);
        output.y = (gameObject.y - (GetDisplayHeight(gameObject) * gameObject.originY)) + GetDisplayHeight(gameObject);

        return PrepareBoundsOutput(gameObject, output, includeParent);
    };

    var GlobVector = undefined;

    var PrepareBoundsOutput = function (gameObject, output, includeParent) {
        if (includeParent === undefined) { includeParent = false; }

        if (gameObject.rotation !== 0) {
            RotateAround(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    var DrawBounds = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$2(config, 'color');
            lineWidth = GetValue$2(config, 'lineWidth');
            fillColor = GetValue$2(config, 'fillColor');
            fillAlpha = GetValue$2(config, 'fillAlpha', 1);
            padding = GetValue$2(config, 'padding', 0);
        }

        if (Array.isArray(gameObjects)) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Draw(gameObjects[i], graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
            }
        } else {
            Draw(gameObjects, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding);
        }
    };

    var Draw = function (gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding) {
        var canDrawBound = gameObject.getBounds ||
            ((gameObject.width !== undefined) && (gameObject.height !== undefined));
        if (!canDrawBound) {
            return;
        }

        if (strokeColor === undefined) { strokeColor = 0xffffff; }
        if (lineWidth === undefined) { lineWidth = 1; }
        if (fillColor === undefined) { fillColor = null; }    if (fillAlpha === undefined) { fillAlpha = 1; }    if (padding === undefined) { padding = 0; }

        var p0 = GetTopLeft(gameObject, Points[0]);
        p0.x -= padding;
        p0.y -= padding;

        var p1 = GetTopRight(gameObject, Points[1]);
        p1.x += padding;
        p1.y -= padding;

        var p2 = GetBottomRight(gameObject, Points[2]);
        p2.x += padding;
        p2.y += padding;

        var p3 = GetBottomLeft(gameObject, Points[3]);
        p3.x -= padding;
        p3.y += padding;

        if (fillColor !== null) {
            graphics
                .fillStyle(fillColor, fillAlpha)
                .fillPoints(Points, true, true);
        }
        if (strokeColor !== null) {
            graphics
                .lineStyle(lineWidth, strokeColor)
                .strokePoints(Points, true, true);
        }

    };

    var Points = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];

    var DrawGameObjectsBounds = function (graphics, config) {
        this.forEachGO(function (gameObject) {
            if (gameObject.drawBounds) {
                gameObject.drawBounds(graphics, config);
            } else {
                DrawBounds(gameObject, graphics, config);
            }
        });
        return this;
    };

    var GetCameraByName = function (scene, name) {
        var cameraManager = scene.cameras;
        var camera;
        if (name === undefined) {
            camera = cameraManager.main;
        } else {
            var cameraNameType = typeof (name);
            switch (cameraNameType) {
                case 'string':
                    camera = cameraManager.getCamera(name);
                    break;

                case 'number':
                    camera = cameraManager.cameras[name];
                    break;

                default:
                    camera = name;
                    break;
            }
        }

        return camera;
    };

    var CameraMethods$1 = {
        setCamera(goName, cameraName) {
            var bob = this.get(goName);
            if (!bob) {
                return this;
            }

            var camera = GetCameraByName(this.scene, cameraName);
            if (!camera) {
                return this;
            }

            bob.gameObject.cameraFilter = 0xffffffff ^ camera.id;
            bob.camera = camera;

            return this;
        },

        getCamera(goName) {
            var bob = this.get(goName);
            if (!bob) {
                return null;
            }

            return bob.camera;
        }
    };

    var Methods = {
        drawGameObjectsBounds: DrawGameObjectsBounds,
    };

    Object.assign(
        Methods,
        GetMethods,
        AddMethods,
        RemoveMethods,
        PropertyMethods,
        CallMethods,
        DataMethods,
        FadeMethods,
        CameraMethods$1,
    );

    const CameraClass = Phaser.Cameras.Scene2D.BaseCamera;

    var IsCameraObject = function (object) {
        return (object instanceof CameraClass);
    };

    const Rectangle = Phaser.Geom.Rectangle;

    var GetViewport = function (scene, camera, out) {
        if (!IsCameraObject(camera)) {
            out = camera;
            camera = undefined;
        }

        if (out === undefined) {
            out = new Rectangle();
        } else if (out === true) {
            out = globRect;
        }

        if (camera) {
            return scene.scale.getViewPort(camera, out);
        } else {
            return scene.scale.getViewPort(out);
        }
    };

    var globRect = new Rectangle();

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class GOManager {
        constructor(scene, config) {
            this.scene = scene;

            this.BobClass = GetValue$1(config, 'BobClass', BobBase);
            this.setCreateGameObjectCallback(
                GetValue$1(config, 'createGameObject'),
                GetValue$1(config, 'createGameObjectScope')
            );
            this.setEventEmitter(GetValue$1(config, 'eventEmitter', undefined));

            this.setGameObjectDepth(GetValue$1(config, 'depth', undefined));

            var fadeConfig = GetValue$1(config, 'fade', 500);
            if (typeof (fadeConfig) === 'number') {
                this.setGOFadeMode();
                this.setGOFadeTime(fadeConfig);
            } else {
                this.setGOFadeMode(GetValue$1(fadeConfig, 'mode'));
                this.setGOFadeTime(GetValue$1(fadeConfig, 'time', 500));
            }

            var viewportCoordinateConfig = GetValue$1(config, 'viewportCoordinate', false);
            if (viewportCoordinateConfig !== false) {
                this.setViewportCoordinateEnable(GetValue$1(config, 'enable', true));
                this.setViewport(GetValue$1(viewportCoordinateConfig, 'viewport'));
            } else {
                this.setViewportCoordinateEnable(false);
            }

            var effectPropertiesConfig = GetValue$1(config, 'effectProperties', false);
            this.setEffectPropertiesConfig(effectPropertiesConfig);

            this.setSymbols(GetValue$1(config, 'symbols'));

            this.bobs = {};
            this.removedGOs = [];
            this._timeScale = 1;

            this.name = GetValue$1(config, 'name');
        }

        destroy(fromScene) {
            this.clear(!fromScene);
            this.createGameObjectCallback = undefined;
            this.viewport = undefined;
            this.scene = undefined;
        }

        set timeScale(timeScale) {
            if (this._timeScale === timeScale) {
                return;
            }

            this._timeScale = timeScale;

            var bobs = this.bobs;
            for (var name in bobs) {
                bobs[name].setTimeScale(timeScale);
            }
        }

        get timeScale() {
            return this._timeScale;
        }

        setTimeScale(timeScale) {
            this.timeScale = timeScale;
            return this;
        }

        setCreateGameObjectCallback(callback, scope) {
            this.createGameObjectCallback = callback;
            this.createGameObjectScope = scope;
            return this;
        }

        setGameObjectDepth(depth) {
            this.gameObjectDepth = depth;
            return this;
        }

        setViewportCoordinateEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.viewportCoordinateEnable = enable;
            return this;
        }

        setEffectPropertiesConfig(config) {
            if (config === undefined) {
                config = true;
            }

            this.effectPropertiesConfig = config;
            return this;
        }

        setViewport(viewport) {
            if (viewport === undefined) {
                viewport = GetViewport(this.scene, this.scene.cameras.main);
            }

            this.viewport = viewport;
            return this;
        }

        setSymbols(symbols) {
            this.symbols = symbols;
            return this;
        }

        get isEmpty() {
            return IsEmpty(this.bobs) && (this.removedGOs.length === 0);
        }

    }

    Object.assign(
        GOManager.prototype,
        EventEmitterMethods,
        Methods
    );

    const GameObjectClass = Phaser.GameObjects.GameObject;
    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass);
    };

    const LayerClass = Phaser.GameObjects.Layer;

    var IsLayerGameObject = function (gameObject) {
        return (gameObject instanceof LayerClass);
    };

    var GetLayer = function (gameObject) {
        var layer = gameObject.displayList;
        if (!IsLayerGameObject(layer)) {
            return null;
        }

        return layer;

    };

    var SortGameObjectsByDepth = function (gameObjects, descending) {
        if (gameObjects.length <= 1) {
            return gameObjects;
        }

        if (descending === undefined) {
            descending = false;
        }

        var itemList;
        for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
            var gameObject = gameObjects[i];
            if (gameObject.displayList) {
                // Inside a scene or a layer
                itemList = gameObject.displayList; // displayList
            } else if (gameObject.parentContainer) {
                // Inside a container
                itemList = gameObject.parentContainer.list; // array
            }

            if (itemList) {
                break;
            }
        }

        if (!itemList) {
            itemList = gameObject.scene.sys.displayList;  // displayList
            // ??
        }

        if (itemList.depthSort) {
            // Is a displayList object
            itemList.depthSort();
            itemList = itemList.list;
            // itemList is an array now
        }

        // itemList is an array
        if (descending) {
            gameObjects.sort(function (childA, childB) {
                return itemList.indexOf(childB) - itemList.indexOf(childA);
            });

        } else {
            gameObjects.sort(function (childA, childB) {
                return itemList.indexOf(childA) - itemList.indexOf(childB);
            });

        }

        return gameObjects;
    };

    var LayerMethods = {
        getLayer(name) {
            return this.getGO(name);
        },

        getLayers(out) {
            if (out === undefined) {
                out = [];
            }
            this.forEachGO(function (gameObject) {
                out.push(gameObject);
            });
            SortGameObjectsByDepth(out, false);
            return out;
        },

        addToLayer(name, gameObjects) {
            var layer = this.getGO(name);
            if (!layer) {
                console.warn(`[LayerManager] Can't get layer "${name}"`);
                return;
            }

            if (!Array.isArray(gameObjects)) {
                gameObjects = [gameObjects];
            }

            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                var gameObject = gameObjects[i];
                if (gameObject.isRexContainerLite) {
                    gameObject.addToLayer(layer);
                } else {
                    layer.add(gameObject);
                }
            }

            if (layer.scrollFactorX !== undefined) {
                gameObject.setScrollFactor(layer.scrollFactorX, layer.scrollFactorY);
            }

            return this;
        },

        addToBottomLayer(gameObjects) {
            var bottomLayer = this.getLayers()[0];
            this.addToLayer(bottomLayer.goName, gameObjects);
            return this;
        },

        addToTopLayer(gameObjects) {
            var layers = this.getLayers();
            var topLayer = layers[layers.length - 1];
            this.addToLayer(topLayer.goName, gameObjects);
            return this;
        },

        removeFromLayer(name, gameObject, addToScene) {
            var layer = this.getGO(name);
            if (!layer) {
                console.warn(`[LayerManager] Can't get layer "${name}"`);
                return;
            }

            if (addToScene === undefined) {
                addToScene = true;
            }

            if (gameObject.isRexContainerLite) {
                gameObject.removeFromLayer(layer, addToScene);
            } else {
                layer.remove(gameObject);
                if (addToScene) {
                    gameObject.addToDisplayList();
                }
            }

            return this;
        },

        clearLayer(name, destroyChildren) {
            if (destroyChildren === undefined) {
                destroyChildren = true;
            }

            var layer = this.getGO(name);
            if (!layer) {
                console.warn(`Can't get layer "${name}"`);
                return;
            }

            if (destroyChildren) {
                var children = layer.getAll();
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    children[i].destroy();
                }
            } else {
                layer.removeAll();
            }

            return this;
        },

    };

    var ScrollFactorMethods = {
        setScrollFactor(name, scrollFactorX, scrollFactorY) {
            if (scrollFactorY === undefined) {
                scrollFactorY = scrollFactorX;
            }

            var layer = this.getLayer(name);
            if (!layer) {
                return this;
            }
            layer.scrollFactorX = scrollFactorX;
            layer.scrollFactorY = scrollFactorY;
            var children = layer.getAll();
            for (var i = 0, cnt = children.length; i < cnt; i++) {
                children[i].setScrollFactor(scrollFactorX, scrollFactorY);
            }

            return this;
        }
    };

    const ArrayUtils = Phaser.Utils.Array;

    const BringMeToTop = function () {
        var list;
        if (this.parentContainer) {
            list = this.parentContainer.list;
        } else if (this.displayList) {
            list = this.displayList.list;
        }
        if (!list) {
            return this;
        }

        ArrayUtils.BringToTop(list, this);

        return this;
    };

    const SendMeToBack = function () {
        var list;
        if (this.parentContainer) {
            list = this.parentContainer.list;
        } else if (this.displayList) {
            list = this.displayList.list;
        }
        if (!list) {
            return this;
        }

        ArrayUtils.SendToBack(list, this);

        return this;
    };

    const MoveMyDepthBelow = function (gameObject) {
        var list;
        if (gameObject.parentContainer) {
            list = gameObject.parentContainer.list;
            if (list.indexOf(this) === -1) {
                gameObject.parentContainer.add(this);
            }
        } else if (gameObject.displayList) {
            list = gameObject.displayList.list;
            if (list.indexOf(this) === -1) {
                gameObject.displayList.add(this);
            }
        }
        if (!list) {
            return this;
        }

        ArrayUtils.MoveBelow(list, this, gameObject);

        return this;
    };

    const MoveMyDepthAbove = function (gameObject) {
        var list;
        if (gameObject.parentContainer) {
            list = gameObject.parentContainer.list;
            if (list.indexOf(this) === -1) {
                if (gameObject.isRexContainerLite) {
                    gameObject.addToContainer(gameObject.parentContainer);
                } else {
                    gameObject.parentContainer.add(gameObject);
                }
            }
        } else if (gameObject.displayList) {
            list = gameObject.displayList.list;
            if (list.indexOf(this) === -1) {
                if (gameObject.isRexContainerLite) {
                    gameObject.addToLayer(gameObject.displayList);
                } else {
                    gameObject.displayList.add(gameObject);
                }
            }
        }
        if (!list) {
            return this;
        }

        ArrayUtils.MoveAbove(list, this, gameObject);

        return this;
    };

    var DisplayListMethods = {
        bringMeToTop: BringMeToTop,

        sendMeToBack: SendMeToBack,

        moveMyDepthBelow: MoveMyDepthBelow,

        moveMyDepthAbove: MoveMyDepthAbove,
    };

    var DepthMethods = {

        bringLayerToTop(layerName) {
            var layer = this.getLayer(layerName);
            if(!layer) {
                return this;
            }

            DisplayListMethods.bringMeToTop.call(layer);

            return this;
        },

        sendLayerToBack(layerName) {
            var layer = this.getLayer(layerName);
            if(!layer) {
                return this;
            }

            DisplayListMethods.sendMeToBack.call(layer);

            return this;
        },

        moveLayerBelow(layerName, baseLayerName) {
            if (layerName === baseLayerName) {
                return this;
            }

            var layer = this.getLayer(layerName);
            var baseLayer = this.getLayer(baseLayerName);
            if (!layer || !baseLayer) {
                return this;
            }

            DisplayListMethods.moveMyDepthBelow.call(layer, baseLayer);

            return this;
        },

        moveLayerAbove(layerName, baseLayerName) {
            if (layerName === baseLayerName) {
                return this;
            }

            var layer = this.getLayer(layerName);
            var baseLayer = this.getLayer(baseLayerName);
            if (!layer || !baseLayer) {
                return this;
            }

            DisplayListMethods.moveMyDepthAbove.call(layer, baseLayer);

            return this;
        },

    };

    const SetCamera = GOManager.prototype.setCamera;
    var CameraMethods = {
        setCamera(layerName, cameraName) {
            // Add a new camera if target camera is not existing
            var camera = GetCameraByName(this.scene, cameraName);
            if (!camera) {
                camera = this.scene.cameras.add(undefined, undefined, undefined, undefined, false, cameraName);
            }
            SetCamera.call(this, layerName, camera);
            return this;
        },
    };

    var methods = {

    };

    Object.assign(
        methods,
        LayerMethods,
        ScrollFactorMethods,
        DepthMethods,
        CameraMethods,
    );

    const GetValue = Phaser.Utils.Objects.GetValue;

    class LayerManager extends GOManager {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            } else if (Array.isArray(config)) {
                config = {
                    layers: config
                };
            }

            if (!config.hasOwnProperty('fade')) {
                config.fade = 0;
            }

            config.viewportCoordinate = false;

            super(scene, config);

            var rootLayer = GetValue(config, 'rootLayer');
            this.setRootLayer(rootLayer);

            var initLayers = GetValue(config, 'layers');
            if (initLayers) {
                for (var i = 0, cnt = initLayers.length; i < cnt; i++) {
                    var layerConfig = initLayers[i];
                    if (typeof (layerConfig) === 'string') {
                        this.add(layerConfig);
                    } else {
                        var layerName = layerConfig.name;

                        this.add(layerName);

                        var scrollFactor = layerConfig.scrollFactor;
                        var scrollFactorX = GetValue(layerConfig, 'scrollFactorX', scrollFactor);
                        var scrollFactorY = GetValue(layerConfig, 'scrollFactorY', scrollFactor);
                        if (scrollFactorX !== undefined) {
                            this.setScrollFactor(layerName, scrollFactorX, scrollFactorY);
                        }

                        this.setCamera(layerName, layerConfig.cameraName);

                    }
                }
            }
        }

        setCreateGameObjectCallback(callback, scope) {
            if (!callback) {
                callback = CreateLayer;
            }
            super.setCreateGameObjectCallback(callback, scope);
            return this;
        }

        setRootLayer(rootLayer) {
            if (rootLayer === this.rootLayer) {
                return this;
            }

            var currentLayers = this.getAllGO();
            if (rootLayer) {
                rootLayer.add(currentLayers);
            } else {
                this.scene.displayList.add(currentLayers);
            }

            this.rootLayer = rootLayer;

            return this;
        }

        // Override
        addGO(name, gameObject) {
            super.addGO(name, gameObject);
            gameObject.name = name;

            if (this.rootLayer) {
                this.rootLayer.add(gameObject);
            }

            return this;
        }

        // Override
        get(name, out) {
            if (IsGameObject(name)) {
                var layer = GetLayer(name);
                if (!layer) {
                    return undefined;
                }
                name = layer.name;
                if (!name) {
                    return undefined;
                }
            }

            return super.get(name, out);
        }

    }

    var CreateLayer = function (scene, depth) {
        var layer = scene.add.layer();
        if (depth !== undefined) {
            layer.setDepth(depth);
        }
        return layer;
    };

    Object.assign(
        LayerManager.prototype,
        methods
    );

    class LayerManagerPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new LayerManager(scene, config);
        }
    }

    return LayerManagerPlugin;

}));
