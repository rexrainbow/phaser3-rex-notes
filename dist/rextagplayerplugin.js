(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextagplayerplugin = factory());
})(this, (function () { 'use strict';

    var EventEmitterMethods$1 = {
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

    const EventEmitter$2 = Phaser.Events.EventEmitter;

    var MonitorViewport = function (viewport) {
        // Don't monitor properties again
        if (viewport.events) {
            return viewport;
        }

        var events = new EventEmitter$2();

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

    const RemoveItem$2 = Phaser.Utils.Array.Remove;

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
                    RemoveItem$2(this.removedGOs, gameObject);
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

    const GetValue$k = Phaser.Utils.Objects.GetValue;

    var DrawBounds = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$k(config, 'color');
            lineWidth = GetValue$k(config, 'lineWidth');
            fillColor = GetValue$k(config, 'fillColor');
            fillAlpha = GetValue$k(config, 'fillAlpha', 1);
            padding = GetValue$k(config, 'padding', 0);
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

    var Methods$4 = {
        drawGameObjectsBounds: DrawGameObjectsBounds,
    };

    Object.assign(
        Methods$4,
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

    const GetValue$j = Phaser.Utils.Objects.GetValue;

    class GOManager {
        constructor(scene, config) {
            this.scene = scene;

            this.BobClass = GetValue$j(config, 'BobClass', BobBase);
            this.setCreateGameObjectCallback(
                GetValue$j(config, 'createGameObject'),
                GetValue$j(config, 'createGameObjectScope')
            );
            this.setEventEmitter(GetValue$j(config, 'eventEmitter', undefined));

            this.setGameObjectDepth(GetValue$j(config, 'depth', undefined));

            var fadeConfig = GetValue$j(config, 'fade', 500);
            if (typeof (fadeConfig) === 'number') {
                this.setGOFadeMode();
                this.setGOFadeTime(fadeConfig);
            } else {
                this.setGOFadeMode(GetValue$j(fadeConfig, 'mode'));
                this.setGOFadeTime(GetValue$j(fadeConfig, 'time', 500));
            }

            var viewportCoordinateConfig = GetValue$j(config, 'viewportCoordinate', false);
            if (viewportCoordinateConfig !== false) {
                this.setViewportCoordinateEnable(GetValue$j(config, 'enable', true));
                this.setViewport(GetValue$j(viewportCoordinateConfig, 'viewport'));
            } else {
                this.setViewportCoordinateEnable(false);
            }

            var effectPropertiesConfig = GetValue$j(config, 'effectProperties', false);
            this.setEffectPropertiesConfig(effectPropertiesConfig);

            this.setSymbols(GetValue$j(config, 'symbols'));

            this.bobs = {};
            this.removedGOs = [];
            this._timeScale = 1;

            this.name = GetValue$j(config, 'name');
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
        EventEmitterMethods$1,
        Methods$4
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

    var methods$2 = {

    };

    Object.assign(
        methods$2,
        LayerMethods,
        ScrollFactorMethods,
        DepthMethods,
        CameraMethods,
    );

    const GetValue$i = Phaser.Utils.Objects.GetValue;

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

            var rootLayer = GetValue$i(config, 'rootLayer');
            this.setRootLayer(rootLayer);

            var initLayers = GetValue$i(config, 'layers');
            if (initLayers) {
                for (var i = 0, cnt = initLayers.length; i < cnt; i++) {
                    var layerConfig = initLayers[i];
                    if (typeof (layerConfig) === 'string') {
                        this.add(layerConfig);
                    } else {
                        var layerName = layerConfig.name;

                        this.add(layerName);

                        var scrollFactor = layerConfig.scrollFactor;
                        var scrollFactorX = GetValue$i(layerConfig, 'scrollFactorX', scrollFactor);
                        var scrollFactorY = GetValue$i(layerConfig, 'scrollFactorY', scrollFactor);
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
        methods$2
    );

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
    };

    var GetSoundManager = function (game) {
        if (IsSceneObject(game)) {
            return game.sys.sound;
        }
        return game.sound;
    };

    var HasaAudio = function (key) {
        return this.sound.game.cache.audio.has(key);
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

    const GetValue$h = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$h(config, 'eventEmitter', true));

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
        EventEmitterMethods$1
    );

    const GetValue$g = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$g(config, 'tickingMode', 1));
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

    const GetValue$f = Phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$f(config, 'tickEventName', defaultEventName);
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

    const GetValue$e = Phaser.Utils.Objects.GetValue;
    const Clamp$1 = Phaser.Math.Clamp;

    let Timer$1 = class Timer {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.state = GetValue$e(o, 'state', IDLE);
            this.timeScale = GetValue$e(o, 'timeScale', 1);
            this.delay = GetValue$e(o, 'delay', 0);
            this.repeat = GetValue$e(o, 'repeat', 0);
            this.repeatCounter = GetValue$e(o, 'repeatCounter', 0);
            this.repeatDelay = GetValue$e(o, 'repeatDelay', 0);
            this.duration = GetValue$e(o, 'duration', 0);
            this.nowTime = GetValue$e(o, 'nowTime', 0);
            this.justRestart = GetValue$e(o, 'justRestart', false);
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

    };

    const IDLE = 0;
    const DELAY = 1;
    const COUNTDOWN = 2;
    const REPEATDELAY = 3;
    const DONE = -1;

    class TimerTickTask extends SceneUpdateTickTask {
        constructor(parent, config) {
            super(parent, config);
            this.timer = new Timer$1();
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

    const GetValue$d = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

    class EaseValueTaskBase extends TimerTickTask {
        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$d(o, 'timer'));
            this.setEnable(GetValue$d(o, 'enable', true));
            this.setTarget(GetValue$d(o, 'target', this.parent));
            this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
            this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
            this.setEase(GetValue$d(o, 'ease', 'Linear'));
            this.setRepeat(GetValue$d(o, 'repeat', 0));

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

    const SoundObjectClass = Phaser.Sound.BaseSound;
    var IsSoundObject = function (object) {
        return (object instanceof SoundObjectClass);
    };

    const GetValue$c = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const Linear = Phaser.Math.Linear;

    class Fade extends EaseValueTaskBase {
        constructor(scene, sound, config) {
            if (IsSoundObject(scene)) {
                config = sound;
                sound = scene;
                scene = undefined;
            }

            sound.active = true;
            sound.scene = scene;
            sound.game = sound.manager.game;

            super(sound, config);
            // this.parent = parent
            // this.timer

            this.volume = {};
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            super.resetFromJSON(o);
            this.setMode(GetValue$c(o, 'mode', 0));
            this.setEnable(GetValue$c(o, 'enable', true));
            this.setVolumeRange(
                GetAdvancedValue(o, 'volume.start', this.parent.volume),
                GetAdvancedValue(o, 'volume.end', 0)
            );
            return this;
        }

        setMode(m) {
            if (typeof (m) === 'string') {
                m = MODE[m];
            }
            this.mode = m;
            return this;
        }

        setVolumeRange(start, end) {
            this.volume.start = start;
            this.volume.end = end;
            return this;
        }

        start() {
            if (this.timer.isRunning) {
                return this;
            }

            this.parent.setVolume(this.volume.start);

            this.timer
                .setDelay(this.delay)
                .setDuration(this.duration);

            super.start();
            return this;
        }

        updateTarget(parent, timer) {
            parent.volume = Linear(this.volume.start, this.volume.end, timer.t);
        }

        complete() {
            super.complete();

            switch (this.mode) {
                case 1:
                    this.parent.stop();
                    break;
                case 2:
                    this.parent.stop();
                    this.parent.destroy();
                    break;
            }

            return this;
        }
    }

    const MODE = {
        stop: 1,
        destroy: 2
    };

    var FadeIn = function (scene, sound, duration, endVolume, startVolume) {
        if (IsSoundObject(scene)) {
            startVolume = endVolume;
            endVolume = duration;
            duration = sound;
            sound = scene;
            scene = undefined;
        }

        if (endVolume === undefined) {
            endVolume = 1;
        }
        if (startVolume === undefined) {
            startVolume = 0;
        }

        var config = {
            mode: 0,
            volume: {
                start: startVolume,
                end: endVolume
            },
            duration: duration
        };

        // create sound instance by key
        if (typeof (sound) === 'string') {
            sound = scene.sys.sound.add(sound);
        }

        var fade;
        if (sound.hasOwnProperty('_fade')) {
            fade = sound._fade;
            fade.stop().resetFromJSON(config);
        } else {
            fade = new Fade(scene, sound, config);
            sound._fade = fade;
        }

        fade.start();
        if (!sound.isPlaying) {
            sound.setVolume(startVolume).play();
        }
        return sound;
    };

    var FadeOut = function (scene, sound, duration, destroy) {
        if (IsSoundObject(scene)) {
            destroy = duration;
            duration = sound;
            sound = scene;
            scene = undefined;
        }

        if (destroy === undefined) {
            destroy = true;
        }

        var config = {
            mode: ((destroy) ? 2 : 1), // 1: stop, 2: destroy
            volume: {
                start: sound.volume,
                end: 0
            },
            duration: duration
        };

        var fade;
        if (sound.hasOwnProperty('_fade')) {
            fade = sound._fade;
            fade.stop().resetFromJSON(config);
        } else {
            fade = new Fade(scene, sound, config);
            sound._fade = fade;
        }

        fade.start();
        if (!sound.isPlaying) {
            sound.play();
        }
        return sound;
    };

    const GetValue$b = Phaser.Utils.Objects.GetValue;

    var BackgroundMusicMethods = {
        setBackgroundMusicLoop(value) {
            if (value === undefined) {
                value = true;
            }

            this.backgroundMusicLoop = value;
            return this;
        },

        setBackgroundMusicFadeTime(time) {
            this.backgroundMusicFadeTime = time;
            return this;
        },

        getBackgroundMusic() {
            return this.backgroundMusic;
        },

        // Internal method
        setCurrentBackgroundMusic(music) {
            this.backgroundMusic = music;

            if (music) {
                music
                    .once('complete', function () {
                        if (this.backgroundMusic === music) {
                            this.backgroundMusic.destroy();
                            this.backgroundMusic = undefined;
                        }
                    }, this)
                    .once('destroy', function () {
                        if (this.backgroundMusic === music) {
                            this.backgroundMusic = undefined;
                        }
                    }, this);

                if (!music.isPlaying) {
                    music.play();
                }
            }
            return this;
        },

        playBackgroundMusic(key, config) {
            if (!this.hasAudio(key)) {
                console.error(`[Sound manager] Audio key'${key}' is not existed`);
                return this;
            }

            // Don't re-play the same background music
            if (this.backgroundMusic && (this.backgroundMusic.key === key)) {
                return this;
            }

            this.stopBackgroundMusic(); // Stop previous background music

            var music = this.sound.add(key, {
                loop: GetValue$b(config, 'loop', this.backgroundMusicLoop),
                mute: GetValue$b(config, 'mute', this.backgroundMusicMute),
                volume: GetValue$b(config, 'volume', this.backgroundMusicVolume),
                detune: GetValue$b(config, 'detune', 0),
                rate: GetValue$b(config, 'rate', 1),
            });

            this.setCurrentBackgroundMusic(music);

            // Fade volume
            if (this.backgroundMusicFadeTime > 0) {
                this.fadeInBackgroundMusic(this.backgroundMusicFadeTime);
            }
            return this;
        },

        pauseBackgroundMusic() {
            if (this.backgroundMusic) {
                this.backgroundMusic.pause();
            }
            return this;
        },

        resumeBackgroundMusic() {
            if (this.backgroundMusic) {
                this.backgroundMusic.resume();
            }
            return this;
        },

        stopBackgroundMusic() {
            if (this.backgroundMusic) {
                if (this.backgroundMusicFadeTime > 0) {
                    this.fadeOutBackgroundMusic(this.backgroundMusicFadeTime, true);

                } else {
                    this.backgroundMusic.stop();
                    this.backgroundMusic.destroy();
                    this.backgroundMusic = undefined;
                }
            }
            return this;
        },

        fadeInBackgroundMusic(time) {
            if (this.backgroundMusic) {
                FadeIn(this.backgroundMusic, time, this.backgroundMusicVolume, 0);
            }

            return this;
        },

        fadeOutBackgroundMusic(time, isStopped) {
            if (this.backgroundMusic) {
                FadeOut(this.backgroundMusic, time, isStopped);
            }

            return this;
        },

        crossFadeBackgroundMusic(key, time) {
            if (!this.hasAudio(key)) {
                console.error(`[Sound manager] Audio key'${key}' is not existed`);
                return this;
            }

            var backgroundMusicFadeTimeSave = this.backgroundMusicFadeTime;
            this.backgroundMusicFadeTime = 0;

            this
                .fadeOutBackgroundMusic(time, true)
                .playBackgroundMusic(key)
                .fadeInBackgroundMusic(time);

            this.backgroundMusicFadeTime = backgroundMusicFadeTimeSave;

            return this;
        },

        setBackgroundMusicMute(mute) {
            if (mute === undefined) {
                mute = true;
            }

            this.backgroundMusicMute = mute;
            return this;
        },


        setBackgroundMusicVolume(volume) {
            this.backgroundMusicVolume = volume;
            return this;
        },

        setBackgroundMusicRate(rate) {
            if (this.backgroundMusic) {
                this.backgroundMusic.setRate(rate);
            }
            return this;
        },

        setBackgroundMusicDetune(detune) {
            if (this.backgroundMusic) {
                this.backgroundMusic.setDetune(detune);
            }
            return this;
        },



    };

    const GetValue$a = Phaser.Utils.Objects.GetValue;

    var BackgroundMusic2Methods = {
        setBackgroundMusic2Loop(value) {
            if (value === undefined) {
                value = true;
            }

            this.backgroundMusic2Loop = value;
            return this;
        },

        setBackgroundMusic2FadeTime(time) {
            this.backgroundMusic2FadeTime = time;
            return this;
        },

        getBackgroundMusic2() {
            return this.backgroundMusic2;
        },

        // Internal method
        setCurrentBackgroundMusic2(music) {
            this.backgroundMusic2 = music;

            if (music) {
                music
                    .once('complete', function () {
                        if (this.backgroundMusic2 === music) {
                            this.backgroundMusic2.destroy();
                            this.backgroundMusic2 = undefined;
                        }
                    }, this)
                    .once('destroy', function () {
                        if (this.backgroundMusic2 === music) {
                            this.backgroundMusic2 = undefined;
                        }
                    }, this);

                if (!music.isPlaying) {
                    music.play();
                }
            }
            return this;
        },

        playBackgroundMusic2(key, config) {
            if (!this.hasAudio(key)) {
                console.error(`[Sound manager] Audio key'${key}' is not existed`);
                return this;
            }

            // Don't re-play the same background music
            if (this.backgroundMusic2 && (this.backgroundMusic2.key === key)) {
                return this;
            }

            this.stopBackgroundMusic2(); // Stop previous background music

            var music = this.sound.add(key, {
                loop: GetValue$a(config, 'loop', this.backgroundMusicLoop),
                mute: GetValue$a(config, 'mute', this.backgroundMusic2Mute),
                volume: GetValue$a(config, 'volume', this.backgroundMusic2Volume),
                detune: GetValue$a(config, 'detune', 0),
                rate: GetValue$a(config, 'rate', 1),
            });

            this.setCurrentBackgroundMusic2(music);

            // Fade volume
            if (this.backgroundMusic2FadeTime > 0) {
                this.fadeInBackgroundMusic2(this.backgroundMusic2FadeTime);
            }
            return this;
        },

        pauseBackgroundMusic2() {
            if (this.backgroundMusic2) {
                this.backgroundMusic2.pause();
            }
            return this;
        },

        resumeBackgroundMusic2() {
            if (this.backgroundMusic2) {
                this.backgroundMusic2.resume();
            }
            return this;
        },

        stopBackgroundMusic2() {
            if (this.backgroundMusic2) {
                if (this.backgroundMusic2FadeTime > 0) {
                    this.fadeOutBackgroundMusic2(this.backgroundMusic2FadeTime, true);

                } else {
                    this.backgroundMusic2.stop();
                    this.backgroundMusic2.destroy();
                    this.backgroundMusic2 = undefined;
                }
            }
            return this;
        },

        fadeInBackgroundMusic2(time) {
            if (this.backgroundMusic2) {
                FadeIn(this.backgroundMusic2, time, this.backgroundMusic2Volume, 0);
            }

            return this;
        },

        fadeOutBackgroundMusic2(time, isStopped) {
            if (this.backgroundMusic2) {
                FadeOut(this.backgroundMusic2, time, isStopped);
            }

            return this;
        },

        crossFadeBackgroundMusic2(key, time) {
            if (!this.hasAudio(key)) {
                console.error(`[Sound manager] Audio key'${key}' is not existed`);
                return this;
            }

            var backgroundMusic2FadeTimeSave = this.backgroundMusic2FadeTime;
            this.backgroundMusic2FadeTime = 0;

            this
                .fadeOutBackgroundMusic2(time, true)
                .playBackgroundMusic2(key)
                .fadeInBackgroundMusic2(time);

            this.backgroundMusic2FadeTime = backgroundMusic2FadeTimeSave;

            return this;
        },

        setBackgroundMusic2Mute(mute) {
            if (mute === undefined) {
                mute = true;
            }

            this.backgroundMusic2Mute = mute;
            return this;
        },

        setBackgroundMusic2Volume(volume) {
            this.backgroundMusic2Volume = volume;
            return this;
        },

        setBackgroundMusic2Rate(rate) {
            if (this.backgroundMusic2) {
                this.backgroundMusic2.setRate(rate);
            }
            return this;
        },

        setBackgroundMusic2Detune(detune) {
            if (this.backgroundMusic2) {
                this.backgroundMusic2.setDetune(detune);
            }
            return this;
        },

    };

    const RemoveItem$1 = Phaser.Utils.Array.Remove;
    const GetValue$9 = Phaser.Utils.Objects.GetValue;

    var SoundEffectsMethods = {

        getSoundEffects() {
            return this.soundEffects;
        },

        getLastSoundEffect() {
            return this.soundEffects[this.soundEffects.length - 1];
        },

        playSoundEffect(key, config) {
            if (!this.hasAudio(key)) {
                console.error(`[Sound manager] Audio key'${key}' is not existed`);
                return this;
            }

            var music = this.sound.add(key, {
                mute: GetValue$9(config, 'mute', this.soundEffectsMute),
                volume: GetValue$9(config, 'volume', this.soundEffectsVolume),
                detune: GetValue$9(config, 'detune', 0),
                rate: GetValue$9(config, 'rate', 1),
            });


            this.soundEffects.push(music);

            music
                .once('complete', function () {
                    music.destroy();

                    // SoundManager has been destroyed
                    if (!this.sound) {
                        return;
                    }
                    RemoveItem$1(this.soundEffects, music);
                }, this)
                .once('destroy', function () {
                    // SoundManager has been destroyed
                    if (!this.sound) {
                        return;
                    }
                    RemoveItem$1(this.soundEffects, music);
                }, this)
                .play();

            return this;
        },

        stopAllSoundEffects() {
            for (var i = this.soundEffects.length - 1; i >= 0; i--) {
                var soundEffect = this.soundEffects[i];
                soundEffect.stop();
                soundEffect.destroy();
            }

            return this;
        },

        fadeInSoundEffect(time) {
            var soundEffect = this.getLastSoundEffect();
            if (soundEffect) {
                FadeIn(soundEffect, time, this.soundEffectsVolume, 0);
            }

            return this;
        },

        fadeOutSoundEffect(time, isStopped) {
            var soundEffect = this.getLastSoundEffect();
            if (soundEffect) {
                FadeOut(soundEffect, time, isStopped);
            }

            return this;
        },

        fadeOutAllSoundEffects(time, isStopped) {
            for (var i = this.soundEffects.length - 1; i >= 0; i--) {
                FadeOut(this.soundEffects[i], time, isStopped);
            }

            return this;
        },

        setSoundEffectMute(mute, lastSoundEffect) {
            if (mute === undefined) {
                mute = true;
            }
            if (lastSoundEffect === undefined) {
                lastSoundEffect = false;
            }

            if (lastSoundEffect) {
                // Set volume of last sound effect
                var soundEffect = this.getLastSoundEffect();
                if (soundEffect) {
                    soundEffect.setMute(mute);
                }

            } else {
                // Set volume of all sound effects
                this.soundEffectsMute = mute;
            }

            return this;
        },

        setSoundEffectVolume(volume, lastSoundEffect) {
            if (lastSoundEffect === undefined) {
                lastSoundEffect = false;
            }

            if (lastSoundEffect) {
                // Set volume of last sound effect
                var soundEffect = this.getLastSoundEffect();
                if (soundEffect) {
                    soundEffect.setVolume(volume);
                }

            } else {
                // Set volume of all sound effects
                this.soundEffectsVolume = volume;
            }

            return this;
        },

        setSoundEffectDetune(detune, lastSoundEffect) {
            if (lastSoundEffect === undefined) {
                lastSoundEffect = false;
            }

            var soundEffects;
            if (lastSoundEffect) {
                soundEffects = [this.getLastSoundEffect()];
            } else {
                soundEffects = this.soundEffects;
            }

            for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
                soundEffects[i].setDetune(detune);
            }

            return this;
        },

        setSoundEffectRate(rate, lastSoundEffect) {
            if (lastSoundEffect === undefined) {
                lastSoundEffect = false;
            }

            var soundEffects;
            if (lastSoundEffect) {
                soundEffects = [this.getLastSoundEffect()];
            } else {
                soundEffects = this.soundEffects;
            }

            for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
                soundEffects[i].setRate(rate);
            }

            return this;
        },
    };

    const RemoveItem = Phaser.Utils.Array.Remove;
    const GetValue$8 = Phaser.Utils.Objects.GetValue;

    var SoundEffects2Methods = {

        getSoundEffects2() {
            return this.soundEffects2;
        },

        getLastSoundEffect2() {
            return this.soundEffects2[this.soundEffects2.length - 1];
        },

        playSoundEffect2(key, config) {
            if (!this.hasAudio(key)) {
                console.error(`[Sound manager] Audio key'${key}' is not existed`);
                return this;
            }

            var music = this.sound.add(key, {
                mute: GetValue$8(config, 'mute', this.soundEffects2Mute),
                volume: GetValue$8(config, 'volume', this.soundEffects2Volume),
                detune: GetValue$8(config, 'detune', 0),
                rate: GetValue$8(config, 'rate', 1),
            });

            this.soundEffects2.push(music);

            music
                .once('complete', function () {
                    music.destroy();

                    // SoundManager has been destroyed
                    if (!this.sound) {
                        return;
                    }
                    RemoveItem(this.soundEffects2, music);
                }, this)
                .once('destroy', function () {
                    // SoundManager has been destroyed
                    if (!this.sound) {
                        return;
                    }
                    RemoveItem(this.soundEffects2, music);
                }, this)
                .play();

            return this;
        },

        stopAllSoundEffects2() {
            for (var i = this.soundEffects.length - 1; i >= 0; i--) {
                var soundEffect = this.soundEffects[i];
                soundEffect.stop();
                soundEffect.destroy();
            }

            return this;
        },

        fadeInSoundEffect2(time) {
            var soundEffect = this.getLastSoundEffect2();
            if (soundEffect) {
                FadeIn(soundEffect, time, this.soundEffects2Volume, 0);
            }

            return this;
        },

        fadeOutSoundEffect2(time, isStopped) {
            var soundEffect = this.getLastSoundEffect2();
            if (soundEffect) {
                FadeOut(soundEffect, time, isStopped);
            }

            return this;
        },

        fadeOutAllSoundEffects2(time, isStopped) {
            for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
                FadeOut(this.soundEffects2[i], time, isStopped);
            }

            return this;
        },

        setSoundEffect2Mute(mute, lastSoundEffect) {
            if (mute === undefined) {
                mute = true;
            }
            if (lastSoundEffect === undefined) {
                lastSoundEffect = false;
            }

            if (lastSoundEffect) {
                // Set volume of last sound effect
                var soundEffect = this.getLastSoundEffect2();
                if (soundEffect) {
                    soundEffect.setMute(mute);
                }

            } else {
                // Set volume of all sound effects
                this.soundEffects2Mute = mute;
            }

            return this;
        },

        setSoundEffect2Volume(volume, lastSoundEffect) {
            if (lastSoundEffect === undefined) {
                lastSoundEffect = false;
            }

            if (lastSoundEffect) {
                // Set volume of last sound effect
                var soundEffect = this.getLastSoundEffect2();
                if (soundEffect) {
                    soundEffect.setVolume(volume);
                }

            } else {
                // Set volume of all sound effects
                this.soundEffects2Volume = volume;
            }

            return this;
        },

        setSoundEffect2Detune(detune, lastSoundEffect) {
            if (lastSoundEffect === undefined) {
                lastSoundEffect = false;
            }

            var soundEffects;
            if (lastSoundEffect) {
                soundEffects = [this.getLastSoundEffect2()];
            } else {
                soundEffects = this.soundEffects2;
            }

            for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
                soundEffects[i].setDetune(detune);
            }

            return this;
        },

        setSoundEffect2Rate(rate, lastSoundEffect) {
            if (lastSoundEffect === undefined) {
                lastSoundEffect = false;
            }

            var soundEffects;
            if (lastSoundEffect) {
                soundEffects = [this.getLastSoundEffect2()];
            } else {
                soundEffects = this.soundEffects2;
            }

            for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
                soundEffects[i].setRate(rate);
            }

            return this;
        },
    };

    var Methods$3 = {
        hasAudio: HasaAudio
    };

    Object.assign(
        Methods$3,
        BackgroundMusicMethods,
        BackgroundMusic2Methods,
        SoundEffectsMethods,
        SoundEffects2Methods,
    );

    const GetValue$7 = Phaser.Utils.Objects.GetValue;

    class SoundManager {
        constructor(game, config) {
            this.sound = GetSoundManager(game);

            // Background music will be (fade out)destroyed when play next one.
            this.backgroundMusic = undefined;
            this._backgroundMusicVolume = GetValue$7(config, 'bgm.volume', 1);
            this._backgroundMusicMute = GetValue$7(config, 'bgm.mute', false);

            this.setBackgroundMusicLoop(GetValue$7(config, 'bgm.loop', true));
            this.setBackgroundMusicFadeTime(GetValue$7(config, 'bgm.fade', 500));

            this.backgroundMusic2 = undefined;
            this._backgroundMusic2Volume = GetValue$7(config, 'bgm2.volume', 1);
            this._backgroundMusic2Mute = GetValue$7(config, 'bgm2.mute', false);

            this.setBackgroundMusic2Loop(GetValue$7(config, 'bgm2.loop', true));
            this.setBackgroundMusic2FadeTime(GetValue$7(config, 'bgm2.fade', 500));

            // Sound effect will be destroyed when completed
            this.soundEffects = [];
            this._soundEffectsVolume = GetValue$7(config, 'soundEffect.volume', 1);

            this.soundEffects2 = [];
            this._soundEffects2Volume = GetValue$7(config, 'soundEffect2.volume', 1);


            var initialBackgroundMusic = GetValue$7(config, 'bgm.initial', undefined);
            if (initialBackgroundMusic) {
                this.setCurrentBackgroundMusic(initialBackgroundMusic);
            }

            var initialBackgroundMusic2 = GetValue$7(config, 'bgm2.initial', undefined);
            if (initialBackgroundMusic2) {
                this.setCurrentBackgroundMusic2(initialBackgroundMusic2);
            }
        }

        destroy() {
            if (this.backgroundMusic) {
                this.backgroundMusic.destroy();
            }
            this.backgroundMusic = undefined;

            if (this.backgroundMusic2) {
                this.backgroundMusic2.destroy();
            }
            this.backgroundMusic2 = undefined;

            if (this.soundEffects.length) {
                for (var i = this.soundEffects.length - 1; i >= 0; i--) {
                    this.soundEffects[i].destroy();
                }
            }
            this.soundEffects.length = 0;

            if (this.soundEffects2.length) {
                for (var i = this.soundEffects2.length - 1; i >= 0; i--) {
                    this.soundEffects2[i].destroy();
                }
            }
            this.soundEffects2.length = 0;

            this.sound = undefined;

            return this;
        }

        // backgroundMusic
        // mute
        get backgroundMusicMute() {
            return this._backgroundMusicMute;
        }

        set backgroundMusicMute(value) {
            this._backgroundMusicMute = value;
            if (this.backgroundMusic) {
                this.backgroundMusic.setMute(mute);
            }
        }

        // volume
        get backgroundMusicVolume() {
            return this._backgroundMusicVolume;
        }

        set backgroundMusicVolume(value) {
            this._backgroundMusicVolume = value;
            if (this.backgroundMusic) {
                this.backgroundMusic.setVolume(value);
            }
        }

        // backgroundMusic2
        // mute
        get backgroundMusic2Mute() {
            return this._backgroundMusic2Mute;
        }

        set backgroundMusic2Mute(value) {
            this._backgroundMusic2Mute = value;
            if (this.backgroundMusic2) {
                this.backgroundMusic2.setMute(mute);
            }
        }

        // volume
        get backgroundMusic2Volume() {
            return this._backgroundMusic2Volume;
        }

        set backgroundMusic2Volume(value) {
            this._backgroundMusic2Volume = value;
            if (this.backgroundMusic2) {
                this.backgroundMusic2.setVolume(value);
            }
        }

        // soundEffects
        // mute
        get soundEffectsMute() {
            return this._soundEffectsMute;
        }

        set soundEffectsMute(value) {
            this._soundEffectsMute = value;
            var soundEffects = this.soundEffects;
            for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
                soundEffects[i].setMute(value);
            }
        }

        // volume
        get soundEffectsVolume() {
            return this._soundEffectsVolume;
        }

        set soundEffectsVolume(value) {
            this._soundEffectsVolume = value;
            var soundEffects = this.soundEffects;
            for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
                soundEffects[i].setVolume(value);
            }
        }

        // soundEffects2
        // mute
        get soundEffects2Mute() {
            return this._soundEffects2Mute;
        }

        set soundEffects2Mute(value) {
            this._soundEffects2Mute = value;
            var soundEffects = this.soundEffects;
            for (var i = 0, cnt = soundEffects2.length; i < cnt; i++) {
                soundEffects[i].setMute(value);
            }
        }

        // volume
        get soundEffects2Volume() {
            return this._soundEffects2Volume;
        }

        set soundEffects2Volume(value) {
            this._soundEffects2Volume = value;
            var soundEffects = this.soundEffects2;
            for (var i = 0, cnt = soundEffects.length; i < cnt; i++) {
                soundEffects[i].setVolume(value);
            }
        }

    }

    Object.assign(
        SoundManager.prototype,
        Methods$3
    );

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    class BaseClock extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.isRunning = GetValue$6(o, 'isRunning', false);
            this.timeScale = GetValue$6(o, 'timeScale', 1);
            this.now = GetValue$6(o, 'now', 0);
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

    const Clamp = Phaser.Math.Clamp;

    class Timer {
        constructor(timeline, config) {
            this
                .setTimeline(timeline)
                .reset(config);
        }

        setTimeline(timeline) {
            this.timeline = timeline;
            return this;
        }

        setName(name) {
            this.name = name;
            return this;
        }

        setCallbacks(target, onStart, onProgress, onComplete) {
            this.target = target;
            this.onStart = onStart;
            this.onProgress = onProgress;
            this.onComplete = onComplete;
            return this;
        }

        setDuration(duration, yoyo) {
            if (yoyo === undefined) {
                yoyo = false;
            }
            this.duration = duration;
            this.remainder = duration;
            this.t = 0;
            this.yoyo = yoyo;
            return this;
        }

        setPaused(state) {
            this.isPaused = state;
            return this;
        }

        pause() {
            this.isPaused = true;
            return this;
        }

        resume() {
            this.isPaused = false;
            return this;
        }

        setRemoved(state) {
            this.removed = state;
            return this;
        }

        remove() {
            this.removed = true;
            return this;
        }

        seek(t) {
            this.remainder = this.duration * (1 - t);
            return this;
        }

        reset(o) {
            this
                .setName(o.name)
                .setDuration(o.duration, o.yoyo)
                .setCallbacks(o.target, o.onStart, o.onProgress, o.onComplete)
                .setPaused(false)
                .setRemoved(false);
            return this;
        }

        onFree() {
            this
                .setTimeline()
                .setCallbacks();
        }

        getProgress() {
            var value = 1 - (this.remainder / this.duration);
            value = Clamp(value, 0, 1);
            if (this.yoyo) {
                value = Yoyo(value);
            }
            return value;
        }

        setProgress(value) {
            value = Clamp(value, 0, 1);
            this.remainder = this.duration * (1 - value);
        }

        runCallback(callback) {
            if (!callback) {
                return;
            }
            callback(this.target, this.t, this);
        }

        update(time, delta) {
            if (this.removed) {
                return true;
            } else if (this.isPaused) {
                return false;
            }

            this.remainder -= delta;
            this.t = this.getProgress();
            this.runCallback(this.onProgress);

            var isCompleted = (this.remainder <= 0);
            if (isCompleted) {
                this.runCallback(this.onComplete);
            }
            return isCompleted;
        }
    }

    class Stack {
        constructor() {
            this.items = [];
        }

        destroy() {
            this.clear();
            this.items = undefined;
        }

        pop() {
            return (this.items.length > 0) ? this.items.pop() : null;
        }

        push(l) {
            this.items.push(l);
            return this;
        }

        pushMultiple(arr) {
            this.items.push.apply(this.items, arr);
            arr.length = 0;
            return this;
        }

        clear() {
            this.items.length = 0;
            return this;
        }
    }

    let TimerPool$1 = class TimerPool extends Stack {
        allocate() {
            return this.pop();
        }

        free(timer) {
            timer.onFree();
            this.push(timer);
        }

        freeMultiple(arr) {
            for (var i = 0, cnt = arr.length; i < cnt; i++) {
                this.free(arr[i]);
            }
            return this;
        }
    };

    const GetValue$5 = Phaser.Utils.Objects.GetValue;
    const TimerPool = new TimerPool$1();

    class Timeline extends Clock {
        constructor(parent, config) {
            super(parent, config);

            this.addedTimers = [];
            this.timers = [];
            this.timerPool = GetValue$5(config, 'pool', TimerPool);
        }

        shutdown() {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.timerPool
                .freeMultiple(this.addedTimers)
                .freeMultiple(this.timers);

            this.timerPool = undefined;
            this.addedTimers = undefined;
            this.timers = undefined;

            super.shutdown();
        }

        addTimer(config) {
            var timer = this.timerPool.allocate();
            if (!timer) {
                timer = new Timer(this, config);
            } else {
                timer
                    .setTimeline(this)
                    .reset(config);
            }
            this.addedTimers.push(timer);
            timer.runCallback(timer.onStart);

            if (!this.isRunning) {
                this.start();
            }
            return timer;
        }

        delayCall(delay, callback, args, scope) {
            var timer = this.addTimer({
                duration: delay,
                onComplete: function (target, t, timer) {
                    if (args === undefined) {
                        args = [];
                    }
                    args.push(timer);
                    callback.apply(scope, args);
                }
            });
            return timer;
        }

        delayEvent(delay, eventName) {       
            this.removeDelayEvent(eventName);
            // Clear existed event

            var timer = this.delayCall(delay, function () {
                this.removeDelayEvent(eventName);  // Clear this timer
                this.emit(eventName);           
            }, [], this);

            this.once(`_remove.${eventName}`, function () {
                timer.remove();
                timer = undefined;
            });
            return this;
        }

        removeDelayEvent(eventName) {
            this.emit(`_remove.${eventName}`);
            return this;
        }

        getTimers(name) {
            var timers = [];

            var timerQueues = [this.addedTimers, this.timers];
            for (var ti = 0, tcnt = timerQueues.length; ti < tcnt; ti++) {
                var timerQueue = timerQueues[ti];
                for (var i = 0, cnt = timerQueue.length; i < cnt; i++) {
                    var timer = timerQueue[i];
                    if (timer.name === name) {
                        timers.push(timer);
                    }
                }
            }
            return timers;
        }

        update(time, delta) {
            super.update(time, delta);

            if (!this.isRunning) {
                return;
            }

            this.timers.push(...this.addedTimers);
            this.addedTimers.length = 0;
            var pendingTimers = [];
            for (var i = 0, cnt = this.timers.length; i < cnt; i++) {
                var timer = this.timers[i];
                var isStopped = timer.update(this.now, this.delta);
                if (isStopped) {
                    this.timerPool.free(timer);  // Free timer
                } else {
                    pendingTimers.push(timer);  // Add to timer queue
                }
            }
            this.timers = pendingTimers;

            if ((this.timers.length === 0) && (this.addedTimers.length === 0)) {
                this.complete(); // Emit 'complete' event
            }
        }
    }

    const WaitCompleteEvent = '_wait.complete';
    const RemoveWaitEvents = '_remove.wait';

    var PreUpdateDelayCall = function (gameObject, delay, callback, scope, args) {
        // Invoke callback under scene's 'preupdate' event
        var scene = GetSceneObject(gameObject);
        var timer = scene.time.delayedCall(delay, function () {
            scene.sys.events.once('preupdate', function () {
                callback.call(scope, args);
            });
        });
        return timer;
    };

    let WaitEvent$1 = class WaitEvent {
        constructor(parent) {
            if (!parent) {
                this.setEventEmitter(true);
                parent = this;
            }
            this.parent = parent;

            this.waitId = 0;

            // Override it
            this.waitCompleteEventName = WaitCompleteEvent;
            this.removeWaitEventsEventName = RemoveWaitEvents;
        }

        destroy() {
            this.removeWaitEvents();
            this.clearWaitCompleteCallbacks();
            this.parent = null;
        }

        // Emit completeEvent (default value is 'complete') when eventEmitter firing eventName
        waitEvent(eventEmitter, eventName, completeNextTick) {
            var callback = this.getWaitCompleteTriggerCallback(completeNextTick);
            eventEmitter.once(eventName, callback, this);
            // Once completeEvent firing, remove pending eventName from eventEmitter
            this.parent.once(this.removeWaitEventsEventName, function () {
                eventEmitter.off(eventName, callback, this);
            });
            // All pending eventName from eventEmitter will be removed at last
            return this.parent;
        }

        getWaitCompleteTriggerCallback(completeNextTick) {
            if (completeNextTick === undefined) {
                completeNextTick = true;
            }

            var waitId = this.waitId;
            var self = this;
            var completeCallback = function () {
                if (waitId < self.waitId) {
                    return;
                }
                self.waitId++;
                self.removeWaitEvents();
                self.parent.emit(self.waitCompleteEventName);
            };

            if (completeNextTick) {
                var completeCallbackNextTick = function () {
                    PreUpdateDelayCall(self.parent, 0, completeCallback);
                };
                return completeCallbackNextTick;
            } else {
                return completeCallback;
            }
        }

        removeWaitEvents() {
            this.parent.emit(this.removeWaitEventsEventName);
            return this;
        }

        addWaitCompleteCallback(callback, scope) {
            this.parent.on(this.waitCompleteEventName, callback, scope);
            return this;
        }

        clearWaitCompleteCallbacks() {
            this.parent.off(this.waitCompleteEventName);
            return this;
        }
    };

    Object.assign(
        WaitEvent$1.prototype,
        EventEmitterMethods$1
    );

    var WaitTimeMethods = {
        waitTime(duration) {
            var timeline = this.parent.timeline;
            timeline.delayEvent(duration, 'delay');

            // Clear delay event on timeline manually
            this.parent.once(this.removeWaitEventsEventName, function () {
                timeline.removeDelayEvent('delay');
            });
            return this.waitEvent(timeline, 'delay');
        },
    };

    var Split = function (s, delimiter) {
        var regexString = `(?<!\\\\)\\${delimiter}`;
        var escapeString = `\\${delimiter}`;
        return s.split(new RegExp(regexString, 'g')).map(function (s) {
            return s.replace(escapeString, delimiter);
        })
    };

    var WaitInputMethods = {
        setClickTarget(target) {
            this.clickTarget = target;

            if (!target) {
                this.touchEE = null;
            } else if (IsSceneObject(target)) {
                this.touchEE = target.input;
            } else {  // Assume that target is a gameObject
                this.touchEE = target.setInteractive();
            }
            return this;
        },

        clearClickTarget() {
            this.setClickTarget();
            return this;
        },

        setClickShortcutKeys(keys) {
            this.clickShortcutKeys = keys;
            return this;
        },

        clearClickShortcutKeys() {
            this.setClickShortcutKeys();
            return this;
        },

        waitClick() {
            var touchEE = this.touchEE;
            var clickShortcutKeys = this.clickShortcutKeys;
            if (touchEE || clickShortcutKeys) {
                if (touchEE) {
                    this.waitEvent(touchEE, 'pointerdown');
                }
                if (clickShortcutKeys) {
                    this.waitKeyDown(clickShortcutKeys);
                }
            } else {
                this.waitTime(0);
            }

            return this;
        },

        waitKeyDown(key) {
            var eventEmitter = this.scene.input.keyboard;
            if (typeof (key) === 'string') {
                if (key.indexOf('|') === -1) {
                    return this.waitEvent(eventEmitter, `keydown-${key.toUpperCase()}`)
                } else {
                    var keys = Split(key, '|');
                    for (var i = 0, cnt = keys.length; i < cnt; i++) {
                        this.waitEvent(eventEmitter, `keydown-${keys[i].toUpperCase()}`);
                    }
                    return this.parent;
                }
            } else {
                return this.waitEvent(eventEmitter, 'keydown');
            }
        }
    };

    var WaitGameObjectMethods = {
        waitGameObjectTweenComplete(goType, name, property) {
            var tweenTask = this.parent.getGameObjectTweenTask(goType, name, property);
            if (tweenTask) {
                return this.waitEvent(tweenTask, 'complete');
            }
            return this.waitTime(0);
        },

        waitGameObjectDataFlag(goType, name, dataKey, trueFlag) {
            var gameObject = this.parent.getGameObject(goType, name);
            if (!gameObject) {
                return this.waitTime(0);
            }

            if (gameObject.getData(dataKey) === trueFlag) {
                return this.waitTime(0);
            }

            var eventName = `changedata-${dataKey}`;
            var callback = function (gameObject, value, previousValue) {
                value = !!value;
                if (value === trueFlag) {
                    gameObject.emit('_dataFlagMatch');
                }
            };
            gameObject.on(eventName, callback);
            // Clear changedata event on gameobject manually
            this.parent.once(this.removeWaitEventsEventName, function () {
                gameObject.off(eventName, callback);
            });

            return this.waitEvent(gameObject, '_dataFlagMatch');
        },

        waitGameObjectDestroy(goType, name) {
            var gameObject = this.parent.getGameObject(goType, name);
            if (!gameObject) {
                return this.waitTime(0);
            }
            return this.waitEvent(gameObject, 'destroy');
        },

        waitGameObjectManagerEmpty(goType) {
            if (goType) {
                var gameObjectManager = this.parent.getGameObjectManager(goType);
                if (!gameObjectManager) {
                    return this.waitTime(0);
                }
                return this.waitEvent(gameObjectManager, 'empty');

            } else {
                var gameObjectManagers = this.parent.gameObjectManagers;
                var hasAnyWaitEvent = false;
                for (var name in gameObjectManagers) {
                    hasAnyWaitEvent = true;
                    this.waitEvent(gameObjectManagers[name], 'empty');
                }
                if (!hasAnyWaitEvent) {
                    return this.waitTime(0);
                }
                return this.parent;
            }
        }
    };

    var WaitCameraMethods = {
        setCameraTarget(camera) {
            this.cameraTarget = camera;
            return this;
        },

        clearCameraTarget() {
            this.setCameraTarget();
            return this;
        },

        waitCameraEffectComplete(effectName, cameraName) {
            var camera;
            if (cameraName) {
                camera = this.scene.cameras.getCamera(cameraName);
            } else {
                camera = this.cameraTarget;
            }

            if (!camera) {
                return this.waitTime(0);
            }

            var effect, completeEventName;
            switch (effectName) {
                case 'camera.fadein':
                    effect = camera.fadeEffect;
                    completeEventName = 'camerafadeincomplete';
                    break;

                case 'camera.fadeout':
                    effect = camera.fadeEffect;
                    completeEventName = 'camerafadeoutcomplete';
                    break;

                case 'camera.flash':
                    effect = camera.flashEffect;
                    completeEventName = 'cameraflashcomplete';
                    break;

                case 'camera.shake':
                    effect = camera.shakeEffect;
                    completeEventName = 'camerashakecomplete';
                    break;

                case 'camera.zoom':
                    effect = camera.zoomEffect;
                    completeEventName = 'camerazoomcomplete';
                    break;

                case 'camera.rotate':
                    effect = camera.rotateToEffect;
                    completeEventName = 'camerarotatecomplete';
                    break;

                case 'camera.scroll':
                    effect = camera.panEffect;
                    completeEventName = 'camerapancomplete';
                    break;
            }

            if (!effect.isRunning) {
                return this.waitTime(0);
            }

            return this.waitEvent(camera, completeEventName);
        },
    };

    var WaitMusicMethods = {
        waitSoundEffectComplete() {
            if (!this.parent.soundManager) {
                return this.waitTime(0);
            }
            var music = this.parent.soundManager.getLastSoundEffect();
            if (!music) {
                return this.waitTime(0);
            }
            return this.waitEvent(music, 'complete');
        },

        waitSoundEffect2Complete() {
            if (!this.parent.soundManager) {
                return this.waitTime(0);
            }
            var music = this.parent.soundManager.getLastSoundEffect2();
            if (!music) {
                return this.waitTime(0);
            }
            return this.waitEvent(music, 'complete');
        },

        waitBackgroundMusicComplete() {
            if (!this.parent.soundManager) {
                return this.waitTime(0);
            }
            var music = this.parent.soundManager.getBackgroundMusic();
            if (!music) {
                return this.waitTime(0);
            }
            return this.waitEvent(music, 'complete');
        },

        waitBackgroundMusic2Complete() {
            if (!this.parent.soundManager) {
                return this.waitTime(0);
            }
            var music = this.parent.soundManager.getBackgroundMusic2();
            if (!music) {
                return this.waitTime(0);
            }
            return this.waitEvent(music, 'complete');
        },
    };

    var WaitAny$1 = function (config) {
        if (!config) {
            return this.waitTime(0);
        }

        var hasAnyWaitEvent = false;
        for (var name in config) {
            switch (name) {
                case 'time':
                    hasAnyWaitEvent = true;
                    this.waitTime(config.time);
                    break;

                case 'click':
                    hasAnyWaitEvent = true;
                    this.waitClick();
                    break;


                case 'key':
                    hasAnyWaitEvent = true;
                    this.waitKeyDown(config.key);
                    break;

                case 'bgm':
                    hasAnyWaitEvent = true;
                    this.waitBackgroundMusicComplete();
                    break;

                case 'bgm2':
                    hasAnyWaitEvent = true;
                    this.waitBackgroundMusic2Complete();
                    break;

                case 'se':
                    hasAnyWaitEvent = true;
                    this.waitSoundEffectComplete();
                    break;

                case 'se2':
                    hasAnyWaitEvent = true;
                    this.waitSoundEffect2Complete();
                    break;

                case 'camera':
                    hasAnyWaitEvent = true;
                    this.waitCameraEffectComplete(`camera.${config.camera.toLowerCase()}`, config.cameraName);
                    break;

                default:
                    var names = name.split('.');
                    if (names.length === 2) {
                        // GONAME.destroy, GONAME.PROPNAME, GONAME.DATAKEY, GONAME.EVTNAME

                        var gameObjectName = names[0];
                        var propName = names[1];
                        var gameObjectManager = this.parent.getGameObjectManager(undefined, gameObjectName);
                        if (!gameObjectManager) {
                            continue;
                        }

                        // GONAME.destroy
                        if (propName === 'destroy') {
                            return this.waitGameObjectDestroy(undefined, gameObjectName);
                        }

                        // GONAME.PROPNAME (tween.complete)
                        var value = gameObjectManager.getProperty(gameObjectName, propName);
                        if (typeof (value) === 'number') {
                            hasAnyWaitEvent = true;
                            this.waitGameObjectTweenComplete(undefined, gameObjectName, propName);
                            continue;

                        }

                        // GONAME.DATAKEY (boolean)
                        var dataKey = propName;
                        var matchFalseFlag = dataKey.startsWith('!');
                        if (matchFalseFlag) {
                            dataKey = dataKey.substring(1);
                        }
                        if (gameObjectManager.hasData(gameObjectName, propName)) {
                            hasAnyWaitEvent = true;
                            this.waitGameObjectDataFlag(undefined, gameObjectName, dataKey, !matchFalseFlag);
                            continue;
                        }

                        // GONAME.EVTNAME
                        this.waitEvent(gameObject, propName);
                        continue;

                    } else if (names.length === 1) ;

                    break;

            }
        }

        if (!hasAnyWaitEvent) {
            this.waitTime(0);
        }

        return this.parent;
    };

    var methods$1 = {
        waitAny: WaitAny$1,
    };
    Object.assign(
        methods$1,
        WaitTimeMethods,
        WaitInputMethods,
        WaitGameObjectMethods,
        WaitCameraMethods,
        WaitMusicMethods,
    );

    var GetValue$4 = function (source, key, defaultValue) {
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

    class WaitEventManager extends WaitEvent$1 {
        constructor(parent, config) {
            super(parent);

            this.waitCompleteEventName = GetValue$4(config, 'completeEventName', this.waitCompleteEventName);

            this.setClickTarget(GetValue$4(config, 'clickTarget', this.scene));
            this.setClickShortcutKeys(GetValue$4(config, 'clickShortcutKeys', undefined));
            this.setCameraTarget(GetValue$4(config, 'camera', this.scene.cameras.main));
        }

        get clickTarget() {
            return this.parent.clickTarget;
        }

        set clickTarget(value) {
            this.parent.clickTarget = value;
        }

        get clickShortcutKeys() {
            return this.parent.clickShortcutKeys;
        }

        set clickShortcutKeys(value) {
            this.parent.clickShortcutKeys = value;
        }

        get cameraTarget() {
            return this.parent.cameraTarget;
        }

        set cameraTarget(value) {
            this.parent.cameraTarget = value;
        }

        destroy() {
            this.clearClickTarget();
            this.clearClickShortcutKeys();
            this.clearCameraTarget();
            super.destroy();
        }

        get scene() {
            return this.parent.managersScene;
        }
    }

    Object.assign(
        WaitEventManager.prototype,
        methods$1,
    );

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    var InitManagers = function (scene, config) {
        this.clickTarget = undefined;
        this.clickShortcutKeys = undefined;
        this.cameraTarget = undefined;

        this.managersScene = scene;

        this.gameObjectManagers = {};

        var layerNames = GetValue$3(config, 'layers', false);
        if (layerNames !== false) {
            var layerManager = new LayerManager(scene, {
                name: 'LAYER',
                layers: layerNames,
                rootLayer: GetValue$3(config, 'rootLayer', undefined),
                depth: GetValue$3(config, 'layerDepth', undefined)
            });
            this.addGameObjectManager(layerManager);
            this.layerManager = layerManager;
        }

        var soundManagerConfig = GetValue$3(config, 'sounds');
        if (soundManagerConfig !== false) {
            this.soundManager = new SoundManager(scene, soundManagerConfig);
        }

        this.timeline = new Timeline(this);

        this.waitEventManager = new WaitEventManager(this, config);

        return this;
    };

    var SetTimeScale = function (value) {
        this.timeline.timeScale = value;
        for (var name in this.gameObjectManagers) {
            this.gameObjectManagers[name].setTimeScale(value);
        }
        return this;
    };

    var GetTimeScale = function () {
        return this.timeline.timeScale;
    };

    var DestroyManagers = function (fromScene) {
        this.waitEventManager.destroy();
        this.waitEventManager = undefined;

        // Destroy layerManager at last
        delete this.gameObjectManagers.layer;

        for (var name in this.gameObjectManagers) {
            this.gameObjectManagers[name].destroy(fromScene);
            delete this.gameObjectManagers[name];
        }

        if (this.layerManager) {
            this.layerManager.destroy(fromScene);
            this.layerManager = undefined;
        }

        if (this.soundManager) {
            this.soundManager.destroy();
            this.soundManager = undefined;
        }

        if (this.timeline) {
            this.timeline.destroy();
            this.timeline = undefined;
        }

        this.clickTarget = undefined;
        this.clickShortcutKeys = undefined;
        this.cameraTarget = undefined;
        this.managersScene = undefined;
    };

    var GameObjectManagerMethods$1 = {
        addGameObjectManager(config, GameObjectManagerClass) {
            var gameobjectManager;

            if (config instanceof (GOManager)) {
                gameobjectManager = config;

            } else if (typeof (config) === 'string') {
                gameobjectManager = GameObjectManagerClass;
                gameobjectManager.name = config;

            } else {
                if (config === undefined) {
                    config = {};
                }
                if (GameObjectManagerClass === undefined) {
                    GameObjectManagerClass = GOManager;
                }

                if (!config.createGameObjectScope) {
                    config.createGameObjectScope = this;
                }

                gameobjectManager = new GameObjectManagerClass(this.managersScene, config);
            }


            this.gameObjectManagers[gameobjectManager.name] = gameobjectManager;

            return this;
        },

        getGameObjectManager(managerName, gameObjectName) {
            if (managerName) {
                var manager = this.gameObjectManagers[managerName];
                return manager;
            } else {
                if (gameObjectName && (gameObjectName.charAt(0) === '!')) {
                    gameObjectName = gameObjectName.substring(1);
                }

                for (var managerName in this.gameObjectManagers) {
                    var manager = this.gameObjectManagers[managerName];
                    if (manager.has(gameObjectName)) {
                        return manager;
                    }
                }
            }
        },

        getGameObjectManagerNames() {
            var names = [];
            for (var name in this.gameObjectManagers) {
                names.push(name);
            }
            return names;
        },

        getGameObjectManagerName(gameObjectName) {
            var gameObjectManager = this.getGameObjectManager(undefined, gameObjectName);
            if (!gameObjectManager) {
                return undefined;
            }
            return gameObjectManager.name;
        },

        hasGameObjectMananger(managerName) {
            return managerName in this.gameObjectManagers;
        }
    };

    var GameObjectMethods = {
        createGameObject(goType, name, ...params) {
            this.getGameObjectManager(goType, name).add(name, ...params);
            return this;
        },

        destroyGameObject(goType, name) {
            var gameObjectManager = this.getGameObjectManager(goType, name);
            if (name === undefined) {
                gameObjectManager.removeAll();
            } else {
                gameObjectManager.remove(name);
            }
            return this;
        },

        hasGameObject(goType, name) {
            return !!this.getGameObjectManager(goType, name);
        },

        callGameObjectMethod(goType, name, methodName, ...params) {
            this.getGameObjectManager(goType, name).call(name, methodName, ...params);
            return this;
        },

        setGameObjectProperty(goType, name, prop, value) {
            this.getGameObjectManager(goType, name).setProperty(name, prop, value);
            return this;
        },

        easeGameObjectProperty(goType, name, config) {
            this.getGameObjectManager(goType, name).easeProperty(name, config);
            return this;
        },

        getGameObjectTweenTask(goType, name, property) {
            return this.getGameObjectManager(goType, name).getTweenTask(name, property);
        },

        getGameObject(goType, name, out) {
            var gameobjectManager = this.getGameObjectManager(goType, name);
            if (!gameobjectManager) {
                return out;
            }
            if (typeof (name) === 'string') {
                return gameobjectManager.getGO(name);
            } else {
                if (out === undefined) {
                    out = [];
                }

                var names = name;
                if (names === undefined) {
                    names = Object.keys(gameobjectManager.bobs);
                }

                var isArrayOutput = Array.isArray(out);
                for (var i = 0, cnt = names.length; i < cnt; i++) {
                    name = names[i];
                    var gameObject = gameobjectManager.getGO(name);
                    if (!gameObject) {
                        continue;
                    }

                    if (isArrayOutput) {
                        out.push(gameObject);
                    } else {
                        out[name] = gameObject;
                    }

                }

                return out;
            }
        },

        addGameObject(goType, name, gameObject) {
            var gameobjectManager = this.getGameObjectManager(goType, name);
            if (typeof (name) === 'string') {
                gameobjectManager.addGO(name, gameObject);
            } else {
                var names = name;
                for (name in names) {
                    gameobjectManager.addGO(name, names[name]);
                }
            }
            return this;
        },

        drawGameObjectsBounds(goTypes, graphics, config) {
            if (goTypes instanceof Phaser.GameObjects.Graphics) {
                config = graphics;
                graphics = goTypes;
                goTypes = undefined;
            }

            if (goTypes === undefined) {
                goTypes = this.getGameObjectManagerNames();
            }

            if (!Array.isArray(goTypes)) {
                goTypes = [goTypes];
            }
            for (var i = 0, cnt = goTypes.length; i < cnt; i++) {
                this.getGameObjectManager(goTypes[i]).drawGameObjectsBounds(graphics, config);
            }

            return this;
        }

    };

    var Extend = function (BaseClass) {
        class Managers extends BaseClass { }

        var Methods = {
            initManagers: InitManagers,
            setTimeScale: SetTimeScale,
            getTimeScale: GetTimeScale,
            destroyManagers: DestroyManagers,
        };

        Object.assign(
            Managers.prototype,
            Methods,
            GameObjectManagerMethods$1,
            GameObjectMethods,
        );

        return Managers;
    };

    function getDefaultExportFromCjs (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    var eventemitter3 = {exports: {}};

    (function (module) {

    	var has = Object.prototype.hasOwnProperty
    	  , prefix = '~';

    	/**
    	 * Constructor to create a storage for our `EE` objects.
    	 * An `Events` instance is a plain object whose properties are event names.
    	 *
    	 * @constructor
    	 * @private
    	 */
    	function Events() {}

    	//
    	// We try to not inherit from `Object.prototype`. In some engines creating an
    	// instance in this way is faster than calling `Object.create(null)` directly.
    	// If `Object.create(null)` is not supported we prefix the event names with a
    	// character to make sure that the built-in object properties are not
    	// overridden or used as an attack vector.
    	//
    	if (Object.create) {
    	  Events.prototype = Object.create(null);

    	  //
    	  // This hack is needed because the `__proto__` property is still inherited in
    	  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
    	  //
    	  if (!new Events().__proto__) prefix = false;
    	}

    	/**
    	 * Representation of a single event listener.
    	 *
    	 * @param {Function} fn The listener function.
    	 * @param {*} context The context to invoke the listener with.
    	 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
    	 * @constructor
    	 * @private
    	 */
    	function EE(fn, context, once) {
    	  this.fn = fn;
    	  this.context = context;
    	  this.once = once || false;
    	}

    	/**
    	 * Add a listener for a given event.
    	 *
    	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
    	 * @param {(String|Symbol)} event The event name.
    	 * @param {Function} fn The listener function.
    	 * @param {*} context The context to invoke the listener with.
    	 * @param {Boolean} once Specify if the listener is a one-time listener.
    	 * @returns {EventEmitter}
    	 * @private
    	 */
    	function addListener(emitter, event, fn, context, once) {
    	  if (typeof fn !== 'function') {
    	    throw new TypeError('The listener must be a function');
    	  }

    	  var listener = new EE(fn, context || emitter, once)
    	    , evt = prefix ? prefix + event : event;

    	  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    	  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    	  else emitter._events[evt] = [emitter._events[evt], listener];

    	  return emitter;
    	}

    	/**
    	 * Clear event by name.
    	 *
    	 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
    	 * @param {(String|Symbol)} evt The Event name.
    	 * @private
    	 */
    	function clearEvent(emitter, evt) {
    	  if (--emitter._eventsCount === 0) emitter._events = new Events();
    	  else delete emitter._events[evt];
    	}

    	/**
    	 * Minimal `EventEmitter` interface that is molded against the Node.js
    	 * `EventEmitter` interface.
    	 *
    	 * @constructor
    	 * @public
    	 */
    	function EventEmitter() {
    	  this._events = new Events();
    	  this._eventsCount = 0;
    	}

    	/**
    	 * Return an array listing the events for which the emitter has registered
    	 * listeners.
    	 *
    	 * @returns {Array}
    	 * @public
    	 */
    	EventEmitter.prototype.eventNames = function eventNames() {
    	  var names = []
    	    , events
    	    , name;

    	  if (this._eventsCount === 0) return names;

    	  for (name in (events = this._events)) {
    	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    	  }

    	  if (Object.getOwnPropertySymbols) {
    	    return names.concat(Object.getOwnPropertySymbols(events));
    	  }

    	  return names;
    	};

    	/**
    	 * Return the listeners registered for a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @returns {Array} The registered listeners.
    	 * @public
    	 */
    	EventEmitter.prototype.listeners = function listeners(event) {
    	  var evt = prefix ? prefix + event : event
    	    , handlers = this._events[evt];

    	  if (!handlers) return [];
    	  if (handlers.fn) return [handlers.fn];

    	  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    	    ee[i] = handlers[i].fn;
    	  }

    	  return ee;
    	};

    	/**
    	 * Return the number of listeners listening to a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @returns {Number} The number of listeners.
    	 * @public
    	 */
    	EventEmitter.prototype.listenerCount = function listenerCount(event) {
    	  var evt = prefix ? prefix + event : event
    	    , listeners = this._events[evt];

    	  if (!listeners) return 0;
    	  if (listeners.fn) return 1;
    	  return listeners.length;
    	};

    	/**
    	 * Calls each of the listeners registered for a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @returns {Boolean} `true` if the event had listeners, else `false`.
    	 * @public
    	 */
    	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    	  var evt = prefix ? prefix + event : event;

    	  if (!this._events[evt]) return false;

    	  var listeners = this._events[evt]
    	    , len = arguments.length
    	    , args
    	    , i;

    	  if (listeners.fn) {
    	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    	    switch (len) {
    	      case 1: return listeners.fn.call(listeners.context), true;
    	      case 2: return listeners.fn.call(listeners.context, a1), true;
    	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
    	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
    	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
    	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    	    }

    	    for (i = 1, args = new Array(len -1); i < len; i++) {
    	      args[i - 1] = arguments[i];
    	    }

    	    listeners.fn.apply(listeners.context, args);
    	  } else {
    	    var length = listeners.length
    	      , j;

    	    for (i = 0; i < length; i++) {
    	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

    	      switch (len) {
    	        case 1: listeners[i].fn.call(listeners[i].context); break;
    	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
    	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
    	        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
    	        default:
    	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
    	            args[j - 1] = arguments[j];
    	          }

    	          listeners[i].fn.apply(listeners[i].context, args);
    	      }
    	    }
    	  }

    	  return true;
    	};

    	/**
    	 * Add a listener for a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @param {Function} fn The listener function.
    	 * @param {*} [context=this] The context to invoke the listener with.
    	 * @returns {EventEmitter} `this`.
    	 * @public
    	 */
    	EventEmitter.prototype.on = function on(event, fn, context) {
    	  return addListener(this, event, fn, context, false);
    	};

    	/**
    	 * Add a one-time listener for a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @param {Function} fn The listener function.
    	 * @param {*} [context=this] The context to invoke the listener with.
    	 * @returns {EventEmitter} `this`.
    	 * @public
    	 */
    	EventEmitter.prototype.once = function once(event, fn, context) {
    	  return addListener(this, event, fn, context, true);
    	};

    	/**
    	 * Remove the listeners of a given event.
    	 *
    	 * @param {(String|Symbol)} event The event name.
    	 * @param {Function} fn Only remove the listeners that match this function.
    	 * @param {*} context Only remove the listeners that have this context.
    	 * @param {Boolean} once Only remove one-time listeners.
    	 * @returns {EventEmitter} `this`.
    	 * @public
    	 */
    	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    	  var evt = prefix ? prefix + event : event;

    	  if (!this._events[evt]) return this;
    	  if (!fn) {
    	    clearEvent(this, evt);
    	    return this;
    	  }

    	  var listeners = this._events[evt];

    	  if (listeners.fn) {
    	    if (
    	      listeners.fn === fn &&
    	      (!once || listeners.once) &&
    	      (!context || listeners.context === context)
    	    ) {
    	      clearEvent(this, evt);
    	    }
    	  } else {
    	    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
    	      if (
    	        listeners[i].fn !== fn ||
    	        (once && !listeners[i].once) ||
    	        (context && listeners[i].context !== context)
    	      ) {
    	        events.push(listeners[i]);
    	      }
    	    }

    	    //
    	    // Reset the array, or remove it completely if we have no more listeners.
    	    //
    	    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    	    else clearEvent(this, evt);
    	  }

    	  return this;
    	};

    	/**
    	 * Remove all listeners, or those of the specified event.
    	 *
    	 * @param {(String|Symbol)} [event] The event name.
    	 * @returns {EventEmitter} `this`.
    	 * @public
    	 */
    	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    	  var evt;

    	  if (event) {
    	    evt = prefix ? prefix + event : event;
    	    if (this._events[evt]) clearEvent(this, evt);
    	  } else {
    	    this._events = new Events();
    	    this._eventsCount = 0;
    	  }

    	  return this;
    	};

    	//
    	// Alias methods names because people roll like that.
    	//
    	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
    	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

    	//
    	// Expose the prefix.
    	//
    	EventEmitter.prefixed = prefix;

    	//
    	// Allow `EventEmitter` to be imported as module namespace.
    	//
    	EventEmitter.EventEmitter = EventEmitter;

    	//
    	// Expose the module.
    	//
    	{
    	  module.exports = EventEmitter;
    	} 
    } (eventemitter3));

    var eventemitter3Exports = eventemitter3.exports;
    var EE = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

    let EventEmitter$1 = class EventEmitter extends EE {
        shutdown() {
            this.removeAllListeners();
        }
        destroy() {
            this.removeAllListeners();
        }
    };

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = EventEmitter$1;
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

        on: function () {
            if (this._eventEmitter) {
                this._eventEmitter.on.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        once: function () {
            if (this._eventEmitter) {
                this._eventEmitter.once.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        off: function () {
            if (this._eventEmitter) {
                this._eventEmitter.off.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        emit: function (event) {
            if (this._eventEmitter && event) {
                this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        addListener: function () {
            if (this._eventEmitter) {
                this._eventEmitter.addListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeListener: function () {
            if (this._eventEmitter) {
                this._eventEmitter.removeListener.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        removeAllListeners: function () {
            if (this._eventEmitter) {
                this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments);
            }
            return this;
        },

        listenerCount: function () {
            if (this._eventEmitter) {
                return this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments);
            }
            return 0;
        },

        listeners: function () {
            if (this._eventEmitter) {
                return this._eventEmitter.listeners.apply(this._eventEmitter, arguments);
            }
            return [];
        },

        eventNames: function () {
            if (this._eventEmitter) {
                return this._eventEmitter.eventNames.apply(this._eventEmitter, arguments);
            }
            return [];
        },
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

    // https://github.com/sindresorhus/escape-string-regexp/blob/master/index.js

    var EscapeRegex = function (s) {
        return s
            .replace(re0, '\\$&')
            .replace(re1, '\\x2d');
    };

    var re0 = /[|\\{}()[\]^$+*?.]/g;
    var re1 = /-/g;

    // This class might be used standalone

    let BracketParser$1 = class BracketParser {
        constructor(config) {
            // Event emitter
            this.setEventEmitter(GetValue$4(config, 'eventEmitter', undefined));

            // Value convert
            this.setValueConverter(GetValue$4(config, 'valueConvert', true));
            // Loop
            this.setLoopEnable(GetValue$4(config, 'loop', false));

            // Brackets and generate regex
            this.setMultipleLinesTagEnable(GetValue$4(config, 'multipleLinesTag', false));
            var delimiters = GetValue$4(config, 'delimiters', '<>');
            this.setDelimiters(delimiters[0], delimiters[1]);

            // Translate tagName callback
            this.setTranslateTagNameCallback(GetValue$4(config, 'translateTagNameCallback'));

            this.isRunning = false;
            this.isPaused = false;
            this.skipEventFlag = false;
            this.justCompleted = false;
            this.lastTagStart = null;
            this.lastTagEnd = null;
            this.lastContent = null;
        }

        shutdown() {
            this.destroyEventEmitter();
        }

        destroy() {
            this.shutdown();
        }

        setMultipleLinesTagEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.multipleLinesTagEnable = enable;
            return this;
        }

        // Override
        setDelimiters(delimiterLeft, delimiterRight) {
            if (delimiterRight === undefined) {
                delimiterRight = delimiterLeft[1];
                delimiterLeft = delimiterLeft[0];
            }
            this.delimiterLeft = delimiterLeft;
            this.delimiterRight = delimiterRight;

            delimiterLeft = EscapeRegex(this.delimiterLeft);
            delimiterRight = EscapeRegex(this.delimiterRight);

            var flag = (this.multipleLinesTagEnable) ? 'gs' : 'gi';
            this.reSplit = RegExp(`${delimiterLeft}(.+?)${delimiterRight}`, flag);

            return this;
        }

        setTranslateTagNameCallback(callback) {
            this.translateTagNameCallback = callback;
            return this;
        }

        setValueConverter(converter) {
            if (converter === true) {
                converter = TypeConvert;
            } else if (!converter) {
                converter = BypassValueConverter;
            }
            this.valueConverter = converter;
            return this;
        }

        setLoopEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.loopEnable = enable;
            return this;
        }

        setSource(source) {
            this.source = source;
            return this;
        }

        resetIndex(index) {
            if (index === undefined) {
                index = 0;
            }
            this.progressIndex = index;
            this.reSplit.lastIndex = index;
            this.lastTagStart = null;
            this.lastTagEnd = null;
            this.lastContent = null;
            this.justCompleted = false;
            this.isRunning = false;
            return this;
        }

        start(source) {
            this
                .setSource(source)
                .restart();
            return this;
        }

        restart() {
            this
                .resetIndex()
                .next();
        }

        next() {
            if (this.isPaused) {
                this.onResume();
            }

            // Don't re-enter this method
            if (this.isRunning) {
                return this;
            }

            this.isRunning = true;

            if (this.justCompleted) {
                this.isRunning = false;
                return this;
            }

            if (this.reSplit.lastIndex === 0) {
                this.onStart();
            }

            var text = this.source,
                lastIndex = text.length;

            this.reSplit.lastIndex = this.progressIndex;
            while (true) {
                var regexResult = this.reSplit.exec(text);
                // No tag found, complete
                if (!regexResult) {
                    if (this.progressIndex < lastIndex) {
                        this.onContent(text.substring(this.progressIndex, lastIndex));
                        // Might pause here
                        if (this.isPaused) {
                            this.progressIndex = lastIndex;
                            break;
                        }
                    }
                    this.onComplete();
                    this.isRunning = false;
                    return;
                }

                var matchEnd = this.reSplit.lastIndex;
                var matchStart = matchEnd - regexResult[0].length;

                // Process content between previous tag and current tag            
                if (this.progressIndex < matchStart) {
                    this.onContent(text.substring(this.progressIndex, matchStart));
                    // Might pause here
                    if (this.isPaused) {
                        this.progressIndex = matchStart;
                        break;
                    }
                }

                // Process current tag
                this.lastTagSource = regexResult[0];
                this.onTag(regexResult[1]);
                this.lastTagSource = undefined;

                this.progressIndex = matchEnd;
                // Might pause here
                if (this.isPaused) {
                    break;
                }

            }

            this.isRunning = false;
            return this;
        }

        skipEvent() {
            this.skipEventFlag = true;
            return this;
        }

        pause() {
            if (!this.isPaused) {
                this.onPause();
            }
            return this;
        }

        pauseUntilEvent(eventEmitter, eventName) {
            if (this.isPaused) {
                return this;
            }

            this.pause();
            eventEmitter.once(eventName, function () {
                this.next();
            }, this);
            return this;
        }

        onContent(content) {
            this.skipEventFlag = false;
            this.emit('content', content);
            this.lastContent = content;
        }

        // Override
        onTag(tagContent) {

        }

        onStart() {
            this.isRunning = true;
            this.emit('start', this);
        }

        onComplete() {
            this.isRunning = false;
            this.justCompleted = true;
            this.emit('complete', this);
            if (this.loopEnable) {
                this.resetIndex();
            }
        }

        onPause() {
            this.isPaused = true;
            this.emit('pause', this);
        }

        onResume() {
            this.isPaused = false;
            this.emit('resume', this);
        }

    };

    const BypassValueConverter = function (s) { return s; };

    Object.assign(
        BracketParser$1.prototype,
        EventEmitterMethods,
    );

    var StringToValues = function (text, valueConverter, delimiter) {
        if (text == null) {
            return [];
        }
        if (valueConverter === undefined) {
            valueConverter = TypeConvert;
        }
        if (delimiter === undefined) {
            delimiter = ',';
        }

        var values = text.split(delimiter);
        for (var i = 0, cnt = values.length; i < cnt; i++) {
            values[i] = valueConverter(values[i]);
        }
        return values;
    };

    class BracketParser extends BracketParser$1 {
        constructor(config) {
            if (config === undefined) {
                config = {};
            }

            if (!config.hasOwnProperty('multipleLinesTag')) {
                config.multipleLinesTag = false;
            }

            super(config);

            // Parameters for regex
            this.setTagExpression(GetValue$4(config, 'regex.tag', undefined));
            this.setValueExpression(GetValue$4(config, 'regex.value', undefined));
            // Brackets and generate regex
            var delimiters = GetValue$4(config, 'delimiters', '<>');
            this.setDelimiters(delimiters[0], delimiters[1]);
        }

        setTagExpression(express) {
            if (!express) {
                express = DefaultTokenExpression;
            }
            this.tagExpression = express;
            return this;
        }

        setValueExpression(express) {
            if (!express) {
                express = DefaultTokenExpression;
            }
            this.valueExpression = express;
            return this;
        }

        setDelimiters(delimiterLeft, delimiterRight) {
            super.setDelimiters(delimiterLeft, delimiterRight);

            var tag = `(${this.tagExpression})(=(${this.valueExpression}))?`;
            this.reTag = RegExp(tag, 'i');

            if ((this.tagExpression !== DefaultTokenExpression) || (this.valueExpression !== DefaultTokenExpression)) {
                var startTagExpression = `${this.tagExpression}(=${this.valueExpression})?`;
                var endTagExpression = `/${this.tagExpression}`;

                delimiterLeft = EscapeRegex(this.delimiterLeft);
                delimiterRight = EscapeRegex(this.delimiterRight);

                var flag = (this.multipleLinesTagEnable) ? 'gs' : 'gi';
                this.reSplit = RegExp(`${delimiterLeft}((${startTagExpression})|(${endTagExpression}))${delimiterRight}`, flag);
            }

            return this;
        }

        onTag(tagContent) {
            var regexResult = tagContent.match(this.reTag);
            var tagName = regexResult[1];
           
            var isEndTag = (tagName.charAt(0) === '/');
            if (isEndTag) {
                tagName = tagName.substring(1, tagName.length);
            }

            if (this.translateTagNameCallback) {
                tagName = this.translateTagNameCallback(tagName);
            }

            this.skipEventFlag = false;
            if (!isEndTag) {
                var values = StringToValues(regexResult[3], this.valueConverter);
                this.emit(`+${tagName}`, ...values);
                if (!this.skipEventFlag) {
                    this.emit('+', tagName, ...values);
                }
                this.lastTagStart = tagName;
            } else {
                this.emit(`-${tagName}`);
                if (!this.skipEventFlag) {
                    this.emit('-', tagName);
                }
                this.lastTagEnd = tagName;
            }
        }
    }

    const DefaultTokenExpression = `[^=]+`;

    var OnParseWaitTag = function (tagPlayer, parser, config) {
        var tagWait = 'wait';
        var tagClick = 'click';
        parser
            .on(`+${tagWait}`, function (name) {
                tagPlayer.wait(name);
                parser.skipEvent();
            })
            .on(`-${tagWait}`, function () {
                parser.skipEvent();
            })
            .on(`+${tagClick}`, function () {  // Equal to [wait=click]
                tagPlayer.wait('click');
                parser.skipEvent();
            })
            .on(`-${tagClick}`, function () {  // Equal to [/wait]
                parser.skipEvent();
            });
    };

    var OnParsePlaySoundEffectTag = function (tagPlayer, parser, config) {
        var tagName = 'se';
        parser
            .on(`+${tagName}`, function (name, fadeInTime) {
                if (this.skipSoundEffect) {
                    return;
                }

                tagPlayer.soundManager.playSoundEffect(name);  // this: tagPlayer
                if (fadeInTime) {
                    tagPlayer.soundManager.fadeInSoundEffect(fadeInTime);
                }

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2';
        parser
            .on(`+${tagName}`, function (name, fadeInTime) {
                if (this.skipSoundEffect) {
                    return;
                }

                tagPlayer.soundManager.playSoundEffect2(name);  // this: tagPlayer
                if (fadeInTime) {
                    tagPlayer.soundManager.fadeInSoundEffect2(fadeInTime);
                }

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseFadeInSoundEffectTag = function (tagPlayer, parser, config) {
        var tagName = 'se.fadein';
        parser
            .on(`+${tagName}`, function (time) {
                tagPlayer.soundManager.fadeInSoundEffect(time);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.fadein';
        parser
            .on(`+${tagName}`, function (time) {
                tagPlayer.soundManager.fadeInSoundEffect2(time);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseFadeOutSoundEffectTag = function (tagPlayer, parser, config) {
        var tagName = 'se.fadeout';
        parser
            .on(`+${tagName}`, function (time, isStopped) {
                isStopped = (isStopped === 'stop');
                tagPlayer.soundManager.fadeOutSoundEffect(time, isStopped);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.fadeout';
        parser
            .on(`+${tagName}`, function (time, isStopped) {
                isStopped = (isStopped === 'stop');
                tagPlayer.soundManager.fadeOutSoundEffect2(time, isStopped);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseSetSoundEffectVolumeTag = function (tagPlayer, parser, config) {
        var tagName = 'se.volume';
        parser
            .on(`+${tagName}`, function (volume) {
                tagPlayer.soundManager.setSoundEffectVolume(volume, true);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.volume';
        parser
            .on(`+${tagName}`, function (volume) {
                tagPlayer.soundManager.setSoundEffectVolume2(volume, true);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseSetSoundEffectMuteTag = function (tagPlayer, parser, config) {
        var tagName = 'se.mute';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.setSoundEffectMute(true);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.mute';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.setSoundEffect2Mute(true);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });

        var tagName = 'se.unmute';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.setSoundEffectMute(false);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.unmute';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.setSoundEffect2Mute(false);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParsePlayBackgroundMusicTag = function (tagPlayer, parser, config) {
        var tagName = 'bgm';
        parser
            .on(`+${tagName}`, function (name, fadeInTime) {
                tagPlayer.soundManager.playBackgroundMusic(name);
                if (fadeInTime) {
                    tagPlayer.soundManager.fadeInBackgroundMusic(fadeInTime);
                }

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                tagPlayer.soundManager.stopBackgroundMusic();

                parser.skipEvent();
            });


        var tagName = 'bgm2';
        parser
            .on(`+${tagName}`, function (name, fadeInTime) {
                tagPlayer.soundManager.playBackgroundMusic2(name);
                if (fadeInTime) {
                    tagPlayer.soundManager.fadeInBackgroundMusic2(fadeInTime);
                }

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                tagPlayer.soundManager.stopBackgroundMusic2();

                parser.skipEvent();
            });
    };

    var OnParseFadeInBackgroundMusicTag = function (tagPlayer, parser, config) {
        var tagName = 'bgm.fadein';
        parser
            .on(`+${tagName}`, function (time) {
                tagPlayer.soundManager.fadeInBackgroundMusic(time);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.fadein';
        parser
            .on(`+${tagName}`, function (time) {
                tagPlayer.soundManager.fadeInBackgroundMusic2(time);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseFadeOutBackgroundMusicTag = function (tagPlayer, parser, config) {
        var tagName = 'bgm.fadeout';
        parser
            .on(`+${tagName}`, function (time, isStopped) {
                isStopped = (isStopped === 'stop');
                tagPlayer.soundManager.fadeOutBackgroundMusic(time, isStopped);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.fadeout';
        parser
            .on(`+${tagName}`, function (time, isStopped) {
                isStopped = (isStopped === 'stop');
                tagPlayer.soundManager.fadeOutBackgroundMusic2(time, isStopped);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseCrossFadeBackgroundMusicTag = function (tagPlayer, parser, config) {
        var tagName = 'bgm.cross';
        parser
            .on(`+${tagName}`, function (name, fadeTime) {
                tagPlayer.soundManager.crossFadeBackgroundMusic(name, fadeTime);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.cross';
        parser
            .on(`+${tagName}`, function (name, fadeTime) {
                tagPlayer.soundManager.crossFadeBackgroundMusic2(name, fadeTime);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParsePauseBackgroundMusicTag = function (tagPlayer, parser, config) {
        var tagName = 'bgm.pause';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.pauseBackgroundMusic();

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                tagPlayer.soundManager.resumeBackgroundMusic();

                parser.skipEvent();
            });


        var tagName = 'bgm2.pause';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.pauseBackgroundMusic2();

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                tagPlayer.soundManager.resumeBackgroundMusic2();

                parser.skipEvent();
            });
    };

    var OnParseSetBackgroundMusicVolumeTag = function (tagPlayer, parser, config) {
        var tagName = 'bgm.volume';
        parser
            .on(`+${tagName}`, function (volume) {
                tagPlayer.soundManager.setBackgroundMusicVolume(volume);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.volume';
        parser
            .on(`+${tagName}`, function (volume) {
                tagPlayer.soundManager.setBackgroundMusicVolume2(volume);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseSetBackgroundMusicMuteTag = function (tagPlayer, parser, config) {
        var tagName = 'bgm.mute';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.setBackgroundMusicMute(true);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.mute';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.setBackgroundMusic2Mute(true);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });

        var tagName = 'bgm.unmute';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.setBackgroundMusicMute(false);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.unmute';
        parser
            .on(`+${tagName}`, function () {
                tagPlayer.soundManager.setBackgroundMusic2Mute(false);

                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseFadeInCameraTag = function (tagPlayer, parser, config) {
        var tagName = 'camera.fadein';
        parser
            .on(`+${tagName}`, function (duration, red, green, blue) {
                tagPlayer.cameraTarget.fadeIn(duration, red, green, blue);

                parser.skipEvent();
            });
    };

    var OnParseFadeOutCameraTag = function (tagPlayer, parser, config) {
        var tagName = 'camera.fadeout';
        parser
            .on(`+${tagName}`, function (duration, red, green, blue) {
                tagPlayer.cameraTarget.fadeOut(duration, red, green, blue);

                parser.skipEvent();
            });
    };

    var OnParseShakeCameraTag = function (tagPlayer, parser, config) {
        var tagName = 'camera.shake';
        parser
            .on(`+${tagName}`, function (duration, intensity) {
                tagPlayer.cameraTarget.shake(duration, intensity);

                parser.skipEvent();
            });
    };

    var OnParseFlashCameraTag = function (tagPlayer, parser, config) {
        var tagName = 'camera.flash';
        parser
            .on(`+${tagName}`, function (duration, red, green, blue) {
                tagPlayer.cameraTarget.flash(duration, red, green, blue);

                parser.skipEvent();
            });
    };

    var OnParseZoomCameraTag = function (tagPlayer, parser, config) {
        var tagName = 'camera.zoom';
        parser
            .on(`+${tagName}`, function (value) {
                tagPlayer.cameraTarget.setZoom(value);

                parser.skipEvent();
            })
            .on(`+${tagName}.to`, function (value, duration, ease) {
                tagPlayer.cameraTarget.zoomTo(value, duration, ease);

                parser.skipEvent();
            });
    };

    const DegToRad = Phaser.Math.DegToRad;

    var OnParseRotateCameraTag = function (tagPlayer, parser, config) {
        var tagName = 'camera.rotate';
        parser
            .on(`+${tagName}`, function (value) {
                tagPlayer.cameraTarget.setRotation(DegToRad(value));

                parser.skipEvent();
            })
            .on(`+${tagName}.to`, function (value, duration, ease) {
                value = DegToRad(value);
                tagPlayer.cameraTarget.rotateTo(DegToRad(value), false, duration, ease);

                parser.skipEvent();
            });
    };

    var OnParseScrollCameraTag = function (tagPlayer, parser, config) {
        var tagName = 'camera.scroll';
        parser
            .on(`+${tagName}`, function (x, y) {
                tagPlayer.cameraTarget.setScroll(x, y);

                parser.skipEvent();
            })
            .on(`+${tagName}.to`, function (x, y, duration, ease) {
                // this: tagPlayer
                var camera = tagPlayer.cameraTarget;
                var xSave = camera.scrollX;
                var ySave = camera.scrollY;
                camera.setScroll(x, y);
                x += camera.centerX;
                y += camera.centerY;
                camera.setScroll(xSave, ySave);

                // x,y in pan() is the centerX, centerY
                camera.pan(x, y, duration, ease);

                parser.skipEvent();
            });
    };

    var OnParseContent = function (tagPlayer, parser, config) {
        parser
            .on('content', function (content) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                if (content === '\n') {
                    return;
                }

                content = content.replaceAll('\\n', '\n');

                var callback = tagPlayer.contentCallback;
                if (callback) {
                    var scope = tagPlayer.contentCallbackScope;
                    if (scope) {
                        callback.call(scope, content);
                    } else {
                        callback(content);
                    }
                    parser.skipEvent();
                }

                tagPlayer.emit(`+${parser.lastTagStart}#content`, content);

                // Route 'content' event to tagPlayer
                tagPlayer.emit('content', content);
            });
    };

    var OnParseCustomTag = function (tagPlayer, parser, config) {
        parser
            .on('+', function (tagName, ...params) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                tagPlayer.emit(`+${tagName}`, parser, ...params);
            })
            .on('-', function (tagName) {
                if (parser.skipEventFlag) {
                    return;
                }

                tagPlayer.emit(`-${tagName}`, parser);
            });
    };

    const ParseCallbacks$3 = [

        OnParseWaitTag,

        OnParsePlaySoundEffectTag, OnParseFadeInSoundEffectTag, OnParseFadeOutSoundEffectTag,
        OnParseSetSoundEffectVolumeTag, OnParseSetSoundEffectMuteTag,
        OnParsePlayBackgroundMusicTag, OnParseFadeInBackgroundMusicTag, OnParseFadeOutBackgroundMusicTag, OnParseCrossFadeBackgroundMusicTag, OnParsePauseBackgroundMusicTag,
        OnParseSetBackgroundMusicVolumeTag, OnParseSetBackgroundMusicMuteTag,

        OnParseFadeInCameraTag, OnParseFadeOutCameraTag, OnParseShakeCameraTag, OnParseFlashCameraTag, OnParseZoomCameraTag, OnParseRotateCameraTag, OnParseScrollCameraTag,

        OnParseContent,

        OnParseCustomTag,
    ];

    var AddParseCallbacks = function (tagPlayer, parser, config) {
        for (var i = 0, cnt = ParseCallbacks$3.length; i < cnt; i++) {
            ParseCallbacks$3[i](tagPlayer, parser, config);
        }

        parser
            .on('start', function () {
                tagPlayer.emit('start', parser);
            })
            .on('complete', function () {
                tagPlayer.emit('complete', parser);
            });

    };

    /*
    Skip line
    - An empty line, only has space
    - A comment line, start with commentLineStart ('//')
    */

    var PreProcess = function (parser, source) {
        var comentLineStart = parser.commentLineStart;
        var lines = source.split('\n');
        for (var i = 0, cnt = lines.length; i < cnt; i++) {
            var line = lines[i];
            if (line === '') ; else if (line.trim().length === 0) {
                // An empty line, only has space
                lines[i] = '';

            } else if (comentLineStart && line.startsWith(comentLineStart)) {
                // A comment line, start with commentLineStart ('//')
                lines[i] = '';
            }
        }

        return lines.join('');
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    class Parser extends BracketParser {
        constructor(tagPlayer, config) {
            if (config === undefined) {
                config = {};
            }
            if (!config.hasOwnProperty('delimiters')) {
                config.delimiters = '[]';
            }
            super(config);

            AddParseCallbacks(tagPlayer, this, config);

            this.setCommentLineStartSymbol(GetValue$2(config, 'comment', '//'));
        }

        setCommentLineStartSymbol(symbol) {
            this.commentLineStart = symbol;
            return this;
        }

        start(source) {
            super.start(PreProcess(this, source));
            return this;
        }
    }

    class SpriteBob extends BobBase {
        playAnimation(key) {
            this.gameObject.anims.timeScale = this.timeScale;
            this.gameObject.play(key);
            return this;
        }

        stopAnimation() {
            this.gameObject.stop();
            return this;
        }

        chainAnimation(keys) {
            this.gameObject.chain(keys);
            return this;
        }

        pauseAnimation() {
            this.gameObject.anims.pause();
            return this;
        }

        setTimeScale(timeScale) {
            super.setTimeScale(timeScale);

            if (this.gameObject.anims) {
                this.gameObject.anims.timeScale = timeScale;
            }

            return this;
        }
    }

    var AnimationMethods = {
        playAnimation(name, key) {
            if (!this.has(name)) {
                this.add(name);
            }

            this.get(name).playAnimation(key);
            return this;
        },

        stopAnimation(name) {
            if (!this.has(name)) {
                return this;
            }

            this.get(name).stopAnimation();
            return this;
        },

        chainAnimation(name, keys) {
            if (!this.has(name)) {
                return this;
            }

            this.get(name).chainAnimation(keys);
            return this;
        },

        pauseAnimation(name) {
            if (!this.has(name)) {
                return this;
            }

            this.get(name).pauseAnimation();
            return this;
        },
    };

    var Methods$2 = {};
    Object.assign(
        Methods$2,
        AnimationMethods
    );

    var GetCreateGameObjectCallback = function (callback) {
        if (!callback || (callback === 'sprite')) {
            callback = CreateSprite;
        } else if (callback === 'image') {
            callback = CreateImage;
        }
        return callback;
    };

    var CreateSprite = function (scene, textureKey, frameName) {
        if ((typeof (frameName) !== 'string') && (typeof (frameName) !== 'number')) {
            frameName = undefined;
        }
        return scene.add.sprite(0, 0, textureKey, frameName);
    };

    var CreateImage = function (scene, textureKey, frameName) {
        if ((typeof (frameName) !== 'string') && (typeof (frameName) !== 'number')) {
            frameName = undefined;
        }
        return scene.add.image(0, 0, textureKey, frameName);
    };

    class SpriteManager extends GOManager {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            config.BobClass = SpriteBob;

            super(scene, config);
        }

        setCreateGameObjectCallback(callback, scope) {
            callback = GetCreateGameObjectCallback(callback);
            super.setCreateGameObjectCallback(callback, scope);
            return this;
        }

    }

    Object.assign(
        SpriteManager.prototype,
        Methods$2
    );

    var IsPlayAnimationTag = function (tags, goType) {
        // goType.name.play
        return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'play');
    };

    var IsStopAnimationTag = function (tags, goType) {
        // goType.name.stop
        return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'stop');
    };

    var OnParsePlayAnimationTag = function (tagPlayer, parser, config) {
        var goType = config.name;
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);
        parser
            .on('+', function (tag) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [goType.name.play=key], or [goType.name.play=key0,key1,...]
                var tags = tag.split('.');
                var name;
                if (IsPlayAnimationTag(tags, goType)) {
                    name = tags[1];
                } else {
                    return;
                }
                var keys = Array.prototype.slice.call(arguments, 1);
                var firstKey = keys.shift();
                gameObjectManager.playAnimation(name, firstKey);
                if (keys.length > 0) {
                    gameObjectManager.chainAnimation(name, keys);
                }

                parser.skipEvent();
            })
            .on('+', function (tag) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [goType.name.stop]
                var tags = tag.split('.');
                var name;
                if (IsStopAnimationTag(tags, goType)) {
                    name = tags[1];
                } else {
                    return;
                }
                gameObjectManager.stopAnimation(name);

                parser.skipEvent();
            })
            .on('-', function (tag) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [/goType.name.play]
                var tags = tag.split('.');
                var name;
                if (IsPlayAnimationTag(tags, goType)) {
                    name = tags[1];
                } else {
                    return;
                }
                gameObjectManager.stopAnimation(name);

                parser.skipEvent();
            });
    };

    var IsPauseAnimationTag = function (tags, goType) {
        // goType.name.pause 
        return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'pause');
    };

    var OnParsePauseAnimationTag = function (tagPlayer, parser, config) {
        var goType = config.name;
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);
        parser
            .on('+', function (tag) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [goType.name.pause=key]
                var tags = tag.split('.');
                var name;
                if (IsPauseAnimationTag(tags, goType)) {
                    name = tags[1];
                } else {
                    return;
                }
                gameObjectManager.pauseAnimation(name);

                parser.skipEvent();
            });
    };

    var IsChainAnimationTag = function (tags, goType) {
        // goType.name.chain 
        return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'chain');
    };

    var OnParseChainAnimationTag = function (tagPlayer, parser, config) {
        var goType = config.name;
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);
        parser
            .on('+', function (tag) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [goType.name.chain=key]
                var tags = tag.split('.');
                var name;
                if (IsChainAnimationTag(tags, goType)) {
                    name = tags[1];
                } else {
                    return;
                }
                var keys = Array.prototype.slice.call(arguments, 1);
                gameObjectManager.chainAnimation(name, keys);

                parser.skipEvent();
            });
    };

    const ParseCallbacks$2 = [
        OnParsePlayAnimationTag,
        OnParsePauseAnimationTag,
        OnParseChainAnimationTag,
    ];

    var AddSpriteManager = function (config) {
        if (config === undefined) {
            config = {};
        }

        config.name = 'sprite';
        config.parseCallbacks = ParseCallbacks$2;
        config.createGameObject = GetCreateGameObjectCallback(config.createGameObject);

        this.addGameObjectManager(config, SpriteManager);
    };

    var GetString = function (value) {
        if (value == null) {
            value = '';
        } else if (Array.isArray(value)) {
            value = value.join('\n');
        } else if (typeof (value) === 'number') {
            value = value.toString();
        }
        return value;
    };

    const TextClass = Phaser.GameObjects.Text;

    var IsTextGameObject = function (gameObject) {
        return (gameObject instanceof TextClass);
    };

    const BitmapTextClass = Phaser.GameObjects.BitmapText;

    var IsBitmapTextGameObject = function (gameObject) {
        return (gameObject instanceof BitmapTextClass);
    };

    const TextType = 0;
    const TagTextType = 1;
    const BitmapTextType = 2;

    var GetTextObjectType = function (textObject) {
        var textObjectType;
        if (IsBitmapTextGameObject(textObject)) {
            textObjectType = BitmapTextType;
        } else if (IsTextGameObject(textObject)) {
            textObjectType = TextType;
        } else {
            textObjectType = TagTextType;
        }

        return textObjectType;
    };

    var SetNoWrapText = function (textObject, text) {
        var textObjectType = GetTextObjectType(textObject);
        switch (textObjectType) {
            case TextType:
                // Store wrap properties
                var style = textObject.style;
                var wordWrapWidth = style.wordWrapWidth;
                var wordWrapCallback = style.wordWrapCallback;
                // Disable wrap
                style.wordWrapWidth = 0;
                style.wordWrapCallback = undefined;
                // Set text
                textObject.setText(text);
                // Restore wrap
                style.wordWrapWidth = wordWrapWidth;
                style.wordWrapCallback = wordWrapCallback;
                break;

            case TagTextType:
                // Store wrap properties
                var style = textObject.style;
                var wrapMode = style.wrapMode;
                // Disable wrap
                style.wrapMode = 0;
                // Set text
                textObject.setText(text);
                // Restore wrap
                style.wrapMode = wrapMode;
                break;

            case BitmapTextType:
                // Store wrap properties
                var maxWidth = textObject._maxWidth;
                // Disable wrap
                textObject._maxWidth = 0;
                // Set text
                textObject.setText(text);
                // Restore wrap
                textObject._maxWidth = maxWidth;
                break;
        }
    };

    var SetTextMethods$1 = {
        setText(text) {
            if (this.setTextCallback) {
                if (this.setTextCallbackScope) {
                    text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIndex);
                } else {
                    text = this.setTextCallback(text, this.isLastChar, this.insertIndex);
                }
            }

            if (this.textWrapEnable) {
                SetNoWrapText(this.parent, text);
            } else {
                this.parent.setText(text);
            }
        },

        appendText(text) {
            var newText = this.text.concat(GetString(text));
            if (this.isTyping) {
                this.setTypingContent(newText);
            } else {
                this.start(newText, undefined, this.textLength);
            }

            return this;
        }

    };

    var StartTyping = function (text, speed, startIndex, timerStartAt) {
        if (text !== undefined) {
            this.setTypingContent(text);
        }
        if (speed !== undefined) {
            this.speed = speed;
        }
        if (startIndex === undefined) {
            startIndex = 0;
        }

        this.typingIndex = startIndex + 1;
        if (this.speed === 0) {
            this.stop(true);
        } else {
            this.setText('');
            this.startTimer(timerStartAt);
        }

        return this;
    };

    var GetPlainText = function (textObject, text) {
        if (textObject.getPlainText) {
            text = textObject.getPlainText(text);
        }

        return text;
    };

    var StartTypingFromLine = function (text, lineIndex, speed, offsetIndex, timerStartAt) {
        var startIdx;
        if (lineIndex > 0) {
            if (offsetIndex === undefined) {
                offsetIndex = 0;
            }

            var plainText = GetPlainText(this.parent, text);
            startIdx = GetNewLineIndex(plainText, lineIndex) + offsetIndex;
        }
        return this.start(text, speed, startIdx, timerStartAt);
    };

    var GetNewLineIndex = function (s, n) {
        var index = undefined;
        for (var i = 0; i < n; i++) {
            index = s.indexOf('\n', index + 1);
            if (index === -1) {
                break;
            }
        }
        return index;
    };

    var GetSubString = function (textObject, text, startIdx, endIdx) {
        var result;
        if (textObject.getSubString) {
            result = textObject.getSubString(text, startIdx, endIdx);
        } else {
            result = text.slice(startIdx, endIdx);
        }

        return result;
    };

    var GetTypingString = function (text, typeIdx, textLength, typeMode) {
        var textObject = this.parent;
        var result;
        if (typeMode === 0) { //left-to-right
            var startIdx = 0;
            var endIdx = typeIdx;
            this.insertIndex = endIdx;
            result = GetSubString(textObject, text, startIdx, endIdx);

        } else if (typeMode === 1) { //right-to-left
            var endIdx = textLength;
            var startIdx = endIdx - typeIdx;
            this.insertIndex = 0;
            result = GetSubString(textObject, text, startIdx, endIdx);

        } else if (typeMode === 2) { //middle-to-sides
            var midIdx = textLength / 2;
            var startIdx = Math.floor(midIdx - (typeIdx / 2));
            var endIdx = startIdx + typeIdx;
            this.insertIndex = (typeIdx % 2) ? typeIdx : 0;
            result = GetSubString(textObject, text, startIdx, endIdx);

        } else if (typeMode === 3) { //sides-to-middle
            var lowerLen = Math.floor(typeIdx / 2);
            var lowerResult;
            if (lowerLen > 0) {
                var endIdx = textLength;
                var startIdx = endIdx - lowerLen;
                lowerResult = GetSubString(textObject, text, startIdx, endIdx);
            } else {
                lowerResult = "";
            }

            var upperLen = typeIdx - lowerLen;
            var upperResult;
            if (upperLen > 0) {
                var startIdx = 0;
                var endIdx = startIdx + upperLen;
                this.insertIndex = endIdx;
                upperResult = GetSubString(textObject, text, startIdx, endIdx);
            } else {
                upperResult = "";
                this.insertIndex = 0;
            }
            result = upperResult + lowerResult;
        }

        this.insertChar = result.charAt(this.insertIndex - 1);

        return result;
    };

    var StopTyping = function (showAllText) {
        var timer = this.getTimer();
        if (timer) {
            this.freeTimer();
        }
        if (showAllText) {
            // Fire 'type' event for remainder characters until lastChar
            while (!this.isLastChar) {
                GetTypingString.call(this, this.text, this.typingIndex, this.textLength, this.typeMode);
                this.emit('typechar', this.insertChar);
                this.typingIndex++;
            }
            // Display all characters on text game object
            this.setText(this.text);
            this.emit('type');
            this.emit('complete', this, this.parent);
        }

        return this;
    };

    var PauseTyping = function () {
        var timer = this.getTimer();
        if (timer) {
            timer.paused = true;
        }
        return this;
    };

    var ResumeTyping = function () {
        var timer = this.getTimer();
        if (timer) {
            timer.paused = false;
        }
        return this;
    };

    var methods = {
        start: StartTyping,
        startFromLine: StartTypingFromLine,
        stop: StopTyping,
        pause: PauseTyping,
        resumeTyping: ResumeTyping,
    };

    Object.assign(
        methods,
        SetTextMethods$1
    );

    var GetWrapText = function (textObject, text) {
        var textObjectType = GetTextObjectType(textObject);
        switch (textObjectType) {
            case TextType:
                textObject.style.syncFont(textObject.canvas, textObject.context);
                text = textObject.runWordWrap(text);
                break;
            case TagTextType:
                text = textObject.getText(text, undefined, undefined, true);
                break;
            case BitmapTextType:
                text = textObject.setText(text).getTextBounds().wrappedText;
                break;
        }
        return text;
    };

    const GetFastValue = Phaser.Utils.Objects.GetFastValue;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class TextTyping extends ComponentBase {
        constructor(gameObject, config) {
            super(gameObject, config);
            // this.parent = gameObject;

            this.timer = null;
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setTextWrapEnable(GetValue$1(o, 'wrap', false));
            this.setTypeMode(GetValue$1(o, 'typeMode', 0));
            this.setTypingSpeed(GetValue$1(o, 'speed', 333));
            this.setTextCallback = GetFastValue(o, 'setTextCallback', null);
            this.setTextCallbackScope = GetFastValue(o, 'setTextCallbackScope', null);

            this.setTypingContent(GetFastValue(o, 'text', ''));
            this.typingIndex = GetFastValue(o, 'typingIndex', 0);
            this.insertIndex = null;
            this.insertChar = null;

            var elapsed = GetFastValue(o, 'elapsed', null);
            if (elapsed !== null) {
                this.start(undefined, undefined, this.typingIndex, elapsed);
            }

            return this;
        }

        shutdown(fromScene) {
            // Already shutdown
            if (this.isShutdown) {
                return;
            }

            this.freeTimer();

            super.shutdown(fromScene);
        }

        setTypeMode(m) {
            if (typeof (m) === 'string') {
                m = TYPEMODE[m];
            }
            this.typeMode = m;
            return this;
        }

        setTypeSpeed(speed) {
            this.speed = speed;
            return this;
        }

        setTypingSpeed(speed) {
            this.speed = speed;
            return this;
        }

        setTextWrapEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.textWrapEnable = enable;
            return this;
        }

        set text(value) {
            var text = GetString(value);
            if (this.textWrapEnable) {
                text = GetWrapText(this.parent, text);
            }

            this._text = text;
        }

        get text() {
            return this._text;
        }

        get isTyping() {
            return (this.getTimer() !== null);
        }

        get isLastChar() {
            return (this.typingIndex === this.textLength);
        }

        setTypingContent(text) {
            this.text = text;
            this.textLength = GetPlainText(this.parent, this.text).length;
            return this;
        }

        onTyping() {
            var newText = GetTypingString.call(this, this.text, this.typingIndex, this.textLength, this.typeMode);

            this.setText(newText);

            this.emit('typechar', this.insertChar);
            this.emit('type');

            if (this.isLastChar) {
                this.freeTimer();
                // Fire 'complete' next tick, to render last character on screen
                this.scene.sys.events.once('preupdate', function () {
                    this.emit('complete', this, this.parent);
                }, this);
            } else {
                this.timer.delay = this.speed; // delay of next typing            
                this.typingIndex++;
            }
        }

        startTimer(timerStartAt) {
            if (this.timer) {
                this.freeTimer();
            }
            var startAt;
            if (timerStartAt === undefined) {
                startAt = 0;
            } else {
                this.speed;
                startAt = timerStartAt;
            }

            this.timer = this.scene.time.addEvent({
                delay: 0.0001,
                startAt: startAt,
                loop: true,
                callback: this.onTyping,
                callbackScope: this
            });
            // Note: Throw error message if delay is 0 with repeat/loop

            return this;
        }

        getTimer() {
            return this.timer;
        }

        freeTimer() {
            if (this.timer) {
                this.timer.remove();
                this.timer = null;
            }

            return this;
        }

        setText(text) {
            if (this.setTextCallback) {
                if (this.setTextCallbackScope) {
                    text = this.setTextCallback.call(this.setTextCallbackScope, text, this.isLastChar, this.insertIndex);
                } else {
                    text = this.setTextCallback(text, this.isLastChar, this.insertIndex);
                }
            }

            if (this.textWrapEnable) {
                SetNoWrapText(this.parent, text);
            } else {
                this.parent.setText(text);
            }
        }
    }

    const TYPEMODE = {
        'left-to-right': 0,
        'right-to-left': 1,
        'middle-to-sides': 2,
        'sides-to-middle': 3
    };

    Object.assign(
        TextTyping.prototype,
        methods
    );

    const IsTyping = false;

    class TextBob extends BobBase {
        setGO(gameObject, name) {
            super.setGO(gameObject, name);
            gameObject.setData('typing', !IsTyping);
            return this;
        }

        clearText() {
            this.gameObject.setText('');
            return this;
        }

        appendText(text) {
            this.gameObject.setText(this.gameObject.text + text);
            return this;
        }

        setTypingSpeed(speed) {
            var gameObject = this.gameObject;
            if (!gameObject.typing) {
                gameObject.typing = new TextTyping(gameObject);
            }
            gameObject.typing.setTypingSpeed(speed);
            return this;
        }

        clearTyping() {
            var gameObject = this.gameObject;
            if (!gameObject.typing) {
                gameObject.typing = new TextTyping(gameObject);
            } else {
                gameObject.typing.start('');
            }
            return this;
        }

        typing(text, speed) {
            var gameObject = this.gameObject;
            if (!gameObject.typing) {
                gameObject.typing = new TextTyping(gameObject);
            }

            if (speed !== undefined) {
                gameObject.typing.setTypingSpeed(speed);
            }

            gameObject.setData('typing', IsTyping);
            gameObject.typing
                .once('complete', function () {
                    gameObject.setData('typing', !IsTyping);
                })
                .appendText(text);

            return this;
        }
    }

    var SetTextMethods = {
        clearText(name) {
            if (!this.has(name)) {
                return this;
            }

            this.get(name).clearText();
            return this;
        },

        appendText(name, text) {
            if (!this.has(name)) {
                return this;
            }

            this.get(name).appendText(text);
            return this;
        },

        clearTyping(name) {
            if (!this.has(name)) {
                return this;
            }

            this.get(name).clearTyping();
            return this;
        },

        typing(name, text) {
            if (!this.has(name)) {
                return this;
            }

            this.get(name).typing(text);
            return this;
        },

        appendTyping(name, text) {
            if (!this.has(name)) {
                return this;
            }

            this.get(name).appendTyping(text);
            return this;
        },

        setTypingSpeed(name, speed) {
            if (!this.has(name)) {
                return this;
            }

            this.get(name).setTypingSpeed(speed);
            return this;
        },
    };

    var Methods$1 = {};
    Object.assign(
        Methods$1,
        SetTextMethods
    );

    class TextManager extends GOManager {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            config.BobClass = TextBob;

            super(scene, config);
        }

        setCreateGameObjectCallback(callback, scope) {
            if ((!callback) || (callback === 'text')) {
                callback = CreateTextObject;
            }
            super.setCreateGameObjectCallback(callback, scope);
            return this;
        }

    }

    var CreateTextObject = function (scene) {
        return scene.add.text(0, 0, '');
    };

    Object.assign(
        TextManager.prototype,
        Methods$1
    );

    var OnParseSetTextTag = function (tagPlayer, parser, config) {
        var goType = config.name;
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);

        // [goType.name.text] -> event : 'goType.text'    
        tagPlayer.on(`${goType}.text`, function (name) {
            // Clear text
            gameObjectManager.clearText(name);
            // Append text
            tagPlayer.setContentCallback(function (content) {
                gameObjectManager.appendText(name, content);
            });
        });
    };

    var OnParseTypingTextTag = function (tagPlayer, parser, config) {
        var goType = config.name;
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);

        // [goType.name.typing] -> event : 'goType.typing'    
        tagPlayer.on(`${goType}.typing`, function (name, speed) {
            // Clear text
            gameObjectManager.clearTyping(name);
            // Append text
            tagPlayer.setContentCallback(function (content) {
                if (speed !== undefined) {
                    gameObjectManager.setTypingSpeed(name, speed);
                }
                gameObjectManager.typing(name, content);
            });
        });
    };

    const ParseCallbacks$1 = [
        OnParseSetTextTag,
        OnParseTypingTextTag
    ];

    var AddTextManager = function (config) {
        if (config === undefined) {
            config = {};
        }
        config.name = 'text';
        config.parseCallbacks = ParseCallbacks$1;
        this.addGameObjectManager(config, TextManager);
    };

    var IsAddGameObjectTag = function (tags, goType) {
        // goType.name
        return (tags.length === 2) && (tags[0] === goType)
    };

    var OnParseAddGameObjectTag = function (tagPlayer, parser, config) {
        var goType = config.name;
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);
        parser
            .on('+', function (tag, ...args) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [goType.name=key,frame], or [goType.name]
                var tags = tag.split('.');
                var name;
                if (IsAddGameObjectTag(tags, goType)) {
                    name = tags[1];                
                } else {
                    return;
                }
                gameObjectManager.add(name, ...args);

                parser.skipEvent();
            })
            .on('-', function (tag) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [/goType.name]
                var tags = tag.split('.');
                var name;
                if (IsAddGameObjectTag(tags, goType)) {
                    name = tags[1];                
                } else {
                    return;
                }
                gameObjectManager.remove(name);

                parser.skipEvent();
            });
    };

    var OnParseRemoveAllGameObjectsTag = function (tagPlayer, parser, config) {
        var goType = config.name;
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);
        parser
            .on('-', function (tag) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [/goType]
                if (tag === goType) ; else {
                    return;
                }

                gameObjectManager.removeAll();
                parser.skipEvent();
            });
    };

    var IsPropTag = function (tags, goType) {
        // goType.name.prop
        return (tags.length === 3) && (tags[0] === goType);
    };

    var OnParseCallGameObjectMethodTag = function (tagPlayer, parser, config) {
        var goType = config.name;
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);
        parser
            .on(`+`, function (tag, ...parameters) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [goType.name.methodName=value0,value1,value2...]
                // [goType.name.prop=value]
                var tags = tag.split('.');
                var name, prop;
                if (IsPropTag(tags, goType)) {
                    name = tags[1];
                    prop = tags[2];
                } else {
                    return;
                }

                var eventName = `${goType}.${prop}`;
                tagPlayer.emit(
                    eventName,
                    name, ...parameters
                );
                if (tagPlayer.listenerCount(eventName) > 0) {
                    parser.skipEvent();
                    return;
                }

                if (gameObjectManager.hasMethod(name, prop)) {
                    // Is method
                    gameObjectManager.call(name, prop, ...parameters);
                } else {
                    // Is property
                    gameObjectManager.setProperty(name, prop, parameters[0]);
                }

                parser.skipEvent();
            });
    };

    var EaseMode = {
        to: true, yoyo: true, from: true,
        toLeft: true, toRight: true, toUp: true, toDown: true,
        yoyoLeft: true, yoyoRight: true, yoyoUp: true, yoyoDown: true,
        fromLeft: true, fromRight: true, fromUp: true, fromDown: true,
    };

    var IsEasePropertyTag = function (tags, goType) {
        // goType.name.prop.to
        return (tags.length === 4) && (tags[0] === goType) && EaseMode[tags[3]];
    };

    var OnParseEaseGameObjectPropertyTag = function (tagPlayer, parser, config) {
        var goType = config.name;
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);
        parser
            .on(`+`, function (tag, value, duration, ease, repeat) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [goType.name.prop.to=value,duration]
                // [goType.name.prop.to=value,duration,ease,repeat]
                // [goType.name.prop.to=value,duration,repeat]
                var tags = tag.split('.');
                var name, property, currentValue, easeMode;
                if (IsEasePropertyTag(tags, goType)) {
                    name = tags[1];
                    property = tags[2];
                    currentValue = gameObjectManager.getProperty(name, property);
                    // Only can tween number property
                    if (typeof (currentValue) !== 'number') {
                        return;
                    }

                    easeMode = tags[3];
                } else {
                    return;
                }

                if (typeof (ease) === 'number') {
                    repeat = ease;
                    ease = undefined;
                }

                if (easeMode.endsWith('Left') || easeMode.endsWith('Up')) {
                    if (easeMode.startsWith('to') || easeMode.startsWith('yoyo')) {
                        value = currentValue - value;
                    } else if (easeMode.startsWith('from')) {
                        gameObjectManager.setProperty(name, property, (currentValue - value));
                        value = currentValue;
                    }
                } else if (easeMode.endsWith('Right') || easeMode.endsWith('Down')) {
                    if (easeMode.startsWith('to') || easeMode.startsWith('yoyo')) {
                        value = currentValue + value;
                    } else if (easeMode.startsWith('from')) {
                        gameObjectManager.setProperty(name, property, (currentValue + value));
                        value = currentValue;
                    }
                } else if (easeMode === 'from') {
                    gameObjectManager.setProperty(name, property, value);
                    value = currentValue;
                }

                var isYoyo = easeMode.startsWith('yoyo');

                gameObjectManager.easeProperty(
                    name,
                    {
                        property: property,
                        value: value,
                        duration: duration,
                        ease: ease,
                        repeat: repeat,
                        yoyo: isYoyo
                    }
                );

                parser.skipEvent();
            });
    };

    const ParseCallbacks = [
        OnParseAddGameObjectTag, OnParseRemoveAllGameObjectsTag,
        OnParseCallGameObjectMethodTag,
        OnParseEaseGameObjectPropertyTag
    ];

    const AddGameObjectManager = GameObjectManagerMethods$1.addGameObjectManager;

    var GameObjectManagerMethods = {
        addGameObjectManager(config, GameObjectManagerClass) {
            if (config === undefined) {
                config = {};
            }
            var name = config.name;
            if (!name) {
                console.warn(`[TagPlayer] Parameter 'name' is required in addGameObjectManager(config) method`);
            }

            var defaultLayer = config.defaultLayer;
            var createGameObject = config.createGameObject;
            var layerManager = this.layerManager;
            config.createGameObject = function (scene, ...args) {
                var gameObject = createGameObject.call(this, scene, ...args);
                // this: config.createGameObjectScope

                if (defaultLayer && layerManager) {
                    layerManager.addToLayer(defaultLayer, gameObject);
                }

                return gameObject;
            };

            AddGameObjectManager.call(this, config, GameObjectManagerClass);

            // Register parse callbacks
            var customParseCallbacks = config.parseCallbacks;
            if (!customParseCallbacks) {
                customParseCallbacks = ParseCallbacks;
            } else {
                customParseCallbacks = [
                    ...customParseCallbacks, // customParseCallbacks have higher priority
                    ...ParseCallbacks
                ];
            }
            for (var i = 0, cnt = customParseCallbacks.length; i < cnt; i++) {
                customParseCallbacks[i](this, this.parser, config);
            }

            return this;
        },
    };

    var SetClickTarget = function (target) {
        this.clickTarget = target;

        if (!target) {
            this.clickEE = null;
        } else if (IsSceneObject(target)) {
            this.clickEE = target.input;
        } else {  // Assume that target is a gameObject
            this.clickEE = target.setInteractive();
        }

        return this;
    };

    var SetCameraTarget = function (camera) {
        this.waitEventManager.setCameraTarget(camera);
        return this;
    };

    var SetSkipSoundEffect = function (value) {
        if (value === undefined) {
            value = true;
        }
        this.skipSoundEffect = value;

        if (value) {
            var soundManager = this._soundManager;
            if (soundManager) {
                soundManager.fadeOutAllSoundEffects(100, true);
            }
        }
        return this;
    };

    var WaitEvent = function (eventEmitter, eventName) {
        return new Promise(function (resolve, reject) {
            eventEmitter.once(eventName, function () {
                resolve();
            });
        });
    };

    var WaitComplete = function (eventEmitter) {
        return WaitEvent(eventEmitter, 'complete');
    };

    var PlayMethods = {
        play(content) {
            this.parser.start(content);
            return this;
        },

        playPromise(content) {
            var promise = WaitComplete(this);
            this.play(content);
            return promise;
        },

    };

    var PauseMethods = {
        pause() {
            this.parser.pause();
            return this;
        },

        pauseUntilEvent(eventEmitter, eventName) {
            this.parser.pauseUntilEvent(eventEmitter, eventName);
            return this;
        }
    };

    var ResumeMethods = {
        resume() {
            this.parser.next();
            return this;
        }
    };

    var IsWaitCameraEffect = function (name) {
        switch (name) {
            case 'camera.fadein':
            case 'camera.fadeout':
            case 'camera.flash':
            case 'camera.shake':
            case 'camera.zoom':
            case 'camera.rotate':
            case 'camera.scroll':
                return true;
            default:
                return false;
        }
    };

    var IsWaitGameObject = function (tagPlayer, name) {
        var names = name.split('.');
        return tagPlayer.gameObjectManagers.hasOwnProperty(names[0]);
    };

    var WaitGameObject = function (tagPlayer, tag, callback, scope) {
        var waitEventManager = tagPlayer.waitEventManager;
        var tags = tag.split('.');
        var goType = tags[0];
        var gameObjectManager = tagPlayer.getGameObjectManager(goType);
        var waitEventName = `wait.${goType}`;
        switch (tags.length) {
            case 1:  // 'goType' : wait all sprites has beeen destroyed
                waitEventManager.waitGameObjectManagerEmpty(goType);
                tagPlayer.emit(waitEventName);
                return;

            case 2:  // 'goType.name' : wait goType.name has been destroyed
                var name = tags[1];
                waitEventManager.waitGameObjectDestroy(goType, name);
                tagPlayer.emit(waitEventName, name);
                return;

            case 3:  // 'goType.name.prop' : wait ease goType.name.prop has been completed
                var name = tags[1],
                    prop = tags[2];

                var value = gameObjectManager.getProperty(name, prop);
                // Can start tween task for a number property
                if (typeof (value) === 'number') {
                    waitEventManager.waitGameObjectTweenComplete(goType, name, prop);
                    tagPlayer.emit(waitEventName, name, prop);
                    return;
                }

                var dataKey = prop;
                var matchFalseFlag = dataKey.startsWith('!');
                if (matchFalseFlag) {
                    dataKey = dataKey.substring(1);
                }
                // Wait until flag is true/false
                if (gameObjectManager.hasData(name, dataKey)) {
                    waitEventManager.waitGameObjectDataFlag(goType, name, dataKey, !matchFalseFlag);
                    tagPlayer.emit(waitEventName, name, dataKey);
                    return;
                } else {
                    waitEventManager.waitTime(0);
                    return;
                }

        }

    };

    const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

    var WaitAny = function (tagPlayer, names, callback, scope) {
        var waitEventManager = tagPlayer.waitEventManager;
        waitEventManager
            .clearWaitCompleteCallbacks()
            .addWaitCompleteCallback(callback, scope);

        if ((typeof (names) === 'string') && (names.length > 1) && (names.indexOf('|') !== -1)) {
            names = names.split('|');
        } else {
            names = [names];
        }

        for (var i = 0, cnt = names.length; i < cnt; i++) {
            var name = names[i];

            if ((name == null) || (name === 'wait')) {  // Wait event
                var waitCompleteTriggerCallback = tagPlayer.waitEventManager.getWaitCompleteTriggerCallback();
                tagPlayer.emit('wait', waitCompleteTriggerCallback);

            } else if ((typeof (name) === 'number') || !isNaN(name)) { // A number, or a number string
                var time = parseFloat(name);
                waitEventManager.waitTime(time);
                tagPlayer.emit('wait.time', time);

            } else if (name === 'click') {  // 'click'
                waitEventManager.waitClick();
                tagPlayer.emit('wait.click');

            } else if (name === 'se') {
                waitEventManager.waitSoundEffectComplete();
                var music = tagPlayer.soundManager.getLastSoundEffect();
                tagPlayer.emit('wait.music', music);

            } else if (name === 'se2') {
                waitEventManager.waitSoundEffect2Complete();
                var music = tagPlayer.soundManager.getLastSoundEffect2();
                tagPlayer.emit('wait.music', music);

            } else if (name === 'bgm') {
                waitEventManager.waitBackgroundMusicComplete();
                var music = tagPlayer.soundManager.getBackgroundMusic();
                tagPlayer.emit('wait.music', music);

            } else if (name === 'bgm2') {
                waitEventManager.waitBackgroundMusic2Complete();
                var music = tagPlayer.soundManager.getBackgroundMusic2();
                tagPlayer.emit('wait.music', music);

            } else if (KeyCodes.hasOwnProperty(name.toUpperCase())) {
                waitEventManager.waitKeyDown(name);
                tagPlayer.emit('wait.keydown', name);

            } else if (IsWaitCameraEffect(name)) {
                waitEventManager.waitCameraEffectComplete(name);
                tagPlayer.emit('wait.camera', name);

            } else if (IsWaitGameObject(tagPlayer, name)) {
                WaitGameObject(tagPlayer, name);

            } else {
                var waitCompleteTriggerCallback = tagPlayer.waitEventManager.getWaitCompleteTriggerCallback();
                tagPlayer.emit(`wait.${name}`, waitCompleteTriggerCallback);

            }
        }
    };

    var Wait = function (name) {
        // Already in typingPaused state, or ignore any wait
        if (this.ignoreWait) {
            return this;
        }

        this.pause();
        WaitAny(this, name, this.resume, this);

        return this;
    };

    var SpriteMethods = {
        getSprite(name) {
            return this.getGameObject('sprite', name);
        },

        addSprite(name, gameObject) {
            this.addGameObject('sprite', name, gameObject);
            return this;
        }

    };

    var TextMethods = {
        getTextGameObject(name) {
            return this.getGameObject('text', name);
        },

        addTextGameObject(name, gameObject) {
            this.addGameObject('text', name, gameObject);
            return this;
        }

    };

    var ContentMethods = {
        setContentCallback(callback, scope) {
            this.contentCallback = callback;
            this.contentCallbackScope = scope;
            return this;
        }
    };

    const DataManager = Phaser.Data.DataManager;

    var DataManagerMethods = {
        // this.data
        destroyDataManager() {
            if (this.data) {
                this.data.destroy();
                this.data = undefined;
            }
        },

        setDataEnabled() {
            if (!this.data) {
                this.data = new DataManager(this);
            }

            return this;
        },

        setData(key, value) {
            if (!this.data) {
                this.data = new DataManager(this);
            }

            this.data.set(key, value);

            return this;
        },

        incData(key, value) {
            if (!this.data) {
                this.data = new DataManager(this);
            }

            this.data.inc(key, value);

            return this;
        },

        toggleData(key) {
            if (!this.data) {
                this.data = new DataManager(this);
            }

            this.data.toggle(key);

            return this;
        },

        getData(key) {
            if (!this.data) {
                this.data = new DataManager(this);
            }

            return this.data.get(key);
        },
    };

    var Methods = {
        setClickTarget: SetClickTarget,
        setCameraTarget: SetCameraTarget,
        setSkipSoundEffect: SetSkipSoundEffect,
        wait: Wait,
    };

    Object.assign(
        Methods,
        PlayMethods,
        PauseMethods,
        ResumeMethods,
        GameObjectManagerMethods,
        SpriteMethods,
        TextMethods,
        ContentMethods,
        DataManagerMethods,
    );

    const EventEmitter = Phaser.Events.EventEmitter;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class TagPlayer extends Extend(EventEmitter) {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }
            super();

            this.scene = scene;

            this.initManagers(scene, config);

            this.parser = new Parser(this, GetValue(config, 'parser', undefined));

            var spriteManagerConfig = GetValue(config, 'sprites');
            if ((spriteManagerConfig !== false) && (spriteManagerConfig !== null)) {
                AddSpriteManager.call(this, spriteManagerConfig);
            }

            var textManagerConfig = GetValue(config, 'texts');
            if ((textManagerConfig !== false) && (textManagerConfig !== null)) {
                AddTextManager.call(this, textManagerConfig);
            }
        }

        get isPlaying() {
            return this.parser.isRunning;
        }

        get spriteManager() {
            return this.getGameObjectManager('sprite');
        }

        get textManager() {
            return this.getGameObjectManager('text');
        }

        get gameObjectManagerNames() {
            var names = [];
            for (var name in this.gameObjectManagers) {
                names.push(name);
            }
            return names;
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene) {
                return;
            }

            super.destroy();

            this.destroyManagers(fromScene);

            this.scene = undefined;
        }

        set timeScale(value) {
            this.setTimeScale(value);
        }

        get timeScale() {
            return this.getTimeScale();
        }

    }

    Object.assign(
        TagPlayer.prototype,
        Methods
    );

    class TagPlayerPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, config) {
            return new TagPlayer(scene, config);
        }
    }

    return TagPlayerPlugin;

}));
