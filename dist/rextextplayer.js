(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rextextplayer = factory());
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

    var DataMethods$2 = {
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
        DataMethods$2,
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

    const EventEmitter$1 = Phaser.Events.EventEmitter;

    var MonitorViewport = function (viewport) {
        // Don't monitor properties again
        if (viewport.events) {
            return viewport;
        }

        var events = new EventEmitter$1();

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

    const RemoveItem$4 = Phaser.Utils.Array.Remove;

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
                    RemoveItem$4(this.removedGOs, gameObject);
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

    var DataMethods$1 = {
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
    const RotateAround$2 = Phaser.Math.RotateAround;
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
            RotateAround$2(output, gameObject.x, gameObject.y, gameObject.rotation);
        }

        if (includeParent && gameObject.parentContainer) {
            var parentMatrix = gameObject.parentContainer.getBoundsTransformMatrix();

            parentMatrix.transformPoint(output.x, output.y, output);
        }

        return output;
    };

    const GetValue$v = Phaser.Utils.Objects.GetValue;

    var DrawBounds = function (gameObjects, graphics, config) {
        var strokeColor, lineWidth, fillColor, fillAlpha, padding;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$v(config, 'color');
            lineWidth = GetValue$v(config, 'lineWidth');
            fillColor = GetValue$v(config, 'fillColor');
            fillAlpha = GetValue$v(config, 'fillAlpha', 1);
            padding = GetValue$v(config, 'padding', 0);
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

    var Methods$6 = {
        drawGameObjectsBounds: DrawGameObjectsBounds,
    };

    Object.assign(
        Methods$6,
        GetMethods,
        AddMethods,
        RemoveMethods,
        PropertyMethods,
        CallMethods,
        DataMethods$1,
        FadeMethods,
        CameraMethods$1,
    );

    const CameraClass = Phaser.Cameras.Scene2D.BaseCamera;

    var IsCameraObject = function (object) {
        return (object instanceof CameraClass);
    };

    const Rectangle$1 = Phaser.Geom.Rectangle;

    var GetViewport = function (scene, camera, out) {
        if (!IsCameraObject(camera)) {
            out = camera;
            camera = undefined;
        }

        if (out === undefined) {
            out = new Rectangle$1();
        } else if (out === true) {
            out = globRect;
        }

        if (camera) {
            return scene.scale.getViewPort(camera, out);
        } else {
            return scene.scale.getViewPort(out);
        }
    };

    var globRect = new Rectangle$1();

    const GetValue$u = Phaser.Utils.Objects.GetValue;

    class GOManager {
        constructor(scene, config) {
            this.scene = scene;

            this.BobClass = GetValue$u(config, 'BobClass', BobBase);
            this.setCreateGameObjectCallback(
                GetValue$u(config, 'createGameObject'),
                GetValue$u(config, 'createGameObjectScope')
            );
            this.setEventEmitter(GetValue$u(config, 'eventEmitter', undefined));

            this.setGameObjectDepth(GetValue$u(config, 'depth', undefined));

            var fadeConfig = GetValue$u(config, 'fade', 500);
            if (typeof (fadeConfig) === 'number') {
                this.setGOFadeMode();
                this.setGOFadeTime(fadeConfig);
            } else {
                this.setGOFadeMode(GetValue$u(fadeConfig, 'mode'));
                this.setGOFadeTime(GetValue$u(fadeConfig, 'time', 500));
            }

            var viewportCoordinateConfig = GetValue$u(config, 'viewportCoordinate', false);
            if (viewportCoordinateConfig !== false) {
                this.setViewportCoordinateEnable(GetValue$u(config, 'enable', true));
                this.setViewport(GetValue$u(viewportCoordinateConfig, 'viewport'));
            } else {
                this.setViewportCoordinateEnable(false);
            }

            var effectPropertiesConfig = GetValue$u(config, 'effectProperties', false);
            this.setEffectPropertiesConfig(effectPropertiesConfig);

            this.setSymbols(GetValue$u(config, 'symbols'));

            this.bobs = {};
            this.removedGOs = [];
            this._timeScale = 1;

            this.name = GetValue$u(config, 'name');
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
        Methods$6
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

    const GetValue$t = Phaser.Utils.Objects.GetValue;

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

            var rootLayer = GetValue$t(config, 'rootLayer');
            this.setRootLayer(rootLayer);

            var initLayers = GetValue$t(config, 'layers');
            if (initLayers) {
                for (var i = 0, cnt = initLayers.length; i < cnt; i++) {
                    var layerConfig = initLayers[i];
                    if (typeof (layerConfig) === 'string') {
                        this.add(layerConfig);
                    } else {
                        var layerName = layerConfig.name;

                        this.add(layerName);

                        var scrollFactor = layerConfig.scrollFactor;
                        var scrollFactorX = GetValue$t(layerConfig, 'scrollFactorX', scrollFactor);
                        var scrollFactorY = GetValue$t(layerConfig, 'scrollFactorY', scrollFactor);
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

    const GetValue$s = Phaser.Utils.Objects.GetValue;

    class ComponentBase {
        constructor(parent, config) {
            this.setParent(parent);  // gameObject, scene, or game

            this.isShutdown = false;

            // Event emitter, default is private event emitter
            this.setEventEmitter(GetValue$s(config, 'eventEmitter', true));

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

    const GetValue$r = Phaser.Utils.Objects.GetValue;

    class TickTask extends ComponentBase {
        constructor(parent, config) {
            super(parent, config);

            this._isRunning = false;
            this.isPaused = false;
            this.tickingState = false;
            this.setTickingMode(GetValue$r(config, 'tickingMode', 1));
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

    const GetValue$q = Phaser.Utils.Objects.GetValue;

    class SceneUpdateTickTask extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            // scene update : update, preupdate, postupdate, prerender, render
            // game update : step, poststep, 

            // If this.scene is not available, use game's 'step' event
            var defaultEventName = (this.scene) ? 'update' : 'step';
            this.tickEventName = GetValue$q(config, 'tickEventName', defaultEventName);
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

    const GetValue$p = Phaser.Utils.Objects.GetValue;
    const Clamp$1 = Phaser.Math.Clamp;

    let Timer$1 = class Timer {
        constructor(config) {
            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.state = GetValue$p(o, 'state', IDLE);
            this.timeScale = GetValue$p(o, 'timeScale', 1);
            this.delay = GetValue$p(o, 'delay', 0);
            this.repeat = GetValue$p(o, 'repeat', 0);
            this.repeatCounter = GetValue$p(o, 'repeatCounter', 0);
            this.repeatDelay = GetValue$p(o, 'repeatDelay', 0);
            this.duration = GetValue$p(o, 'duration', 0);
            this.nowTime = GetValue$p(o, 'nowTime', 0);
            this.justRestart = GetValue$p(o, 'justRestart', false);
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

    const GetValue$o = Phaser.Utils.Objects.GetValue;
    const GetAdvancedValue$1 = Phaser.Utils.Objects.GetAdvancedValue;
    const GetEaseFunction = Phaser.Tweens.Builders.GetEaseFunction;

    class EaseValueTaskBase extends TimerTickTask {
        resetFromJSON(o) {
            this.timer.resetFromJSON(GetValue$o(o, 'timer'));
            this.setEnable(GetValue$o(o, 'enable', true));
            this.setTarget(GetValue$o(o, 'target', this.parent));
            this.setDelay(GetAdvancedValue$1(o, 'delay', 0));
            this.setDuration(GetAdvancedValue$1(o, 'duration', 1000));
            this.setEase(GetValue$o(o, 'ease', 'Linear'));
            this.setRepeat(GetValue$o(o, 'repeat', 0));

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

    const GetValue$n = Phaser.Utils.Objects.GetValue;
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
            this.setMode(GetValue$n(o, 'mode', 0));
            this.setEnable(GetValue$n(o, 'enable', true));
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

    const GetValue$m = Phaser.Utils.Objects.GetValue;

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
                loop: GetValue$m(config, 'loop', this.backgroundMusicLoop),
                mute: GetValue$m(config, 'mute', this.backgroundMusicMute),
                volume: GetValue$m(config, 'volume', this.backgroundMusicVolume),
                detune: GetValue$m(config, 'detune', 0),
                rate: GetValue$m(config, 'rate', 1),
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

    const GetValue$l = Phaser.Utils.Objects.GetValue;

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
                loop: GetValue$l(config, 'loop', this.backgroundMusicLoop),
                mute: GetValue$l(config, 'mute', this.backgroundMusic2Mute),
                volume: GetValue$l(config, 'volume', this.backgroundMusic2Volume),
                detune: GetValue$l(config, 'detune', 0),
                rate: GetValue$l(config, 'rate', 1),
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

    const RemoveItem$3 = Phaser.Utils.Array.Remove;
    const GetValue$k = Phaser.Utils.Objects.GetValue;

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
                mute: GetValue$k(config, 'mute', this.soundEffectsMute),
                volume: GetValue$k(config, 'volume', this.soundEffectsVolume),
                detune: GetValue$k(config, 'detune', 0),
                rate: GetValue$k(config, 'rate', 1),
            });


            this.soundEffects.push(music);

            music
                .once('complete', function () {
                    music.destroy();

                    // SoundManager has been destroyed
                    if (!this.sound) {
                        return;
                    }
                    RemoveItem$3(this.soundEffects, music);
                }, this)
                .once('destroy', function () {
                    // SoundManager has been destroyed
                    if (!this.sound) {
                        return;
                    }
                    RemoveItem$3(this.soundEffects, music);
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

    const RemoveItem$2 = Phaser.Utils.Array.Remove;
    const GetValue$j = Phaser.Utils.Objects.GetValue;

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
                mute: GetValue$j(config, 'mute', this.soundEffects2Mute),
                volume: GetValue$j(config, 'volume', this.soundEffects2Volume),
                detune: GetValue$j(config, 'detune', 0),
                rate: GetValue$j(config, 'rate', 1),
            });

            this.soundEffects2.push(music);

            music
                .once('complete', function () {
                    music.destroy();

                    // SoundManager has been destroyed
                    if (!this.sound) {
                        return;
                    }
                    RemoveItem$2(this.soundEffects2, music);
                }, this)
                .once('destroy', function () {
                    // SoundManager has been destroyed
                    if (!this.sound) {
                        return;
                    }
                    RemoveItem$2(this.soundEffects2, music);
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

    var Methods$5 = {
        hasAudio: HasaAudio
    };

    Object.assign(
        Methods$5,
        BackgroundMusicMethods,
        BackgroundMusic2Methods,
        SoundEffectsMethods,
        SoundEffects2Methods,
    );

    const GetValue$i = Phaser.Utils.Objects.GetValue;

    class SoundManager {
        constructor(game, config) {
            this.sound = GetSoundManager(game);

            // Background music will be (fade out)destroyed when play next one.
            this.backgroundMusic = undefined;
            this._backgroundMusicVolume = GetValue$i(config, 'bgm.volume', 1);
            this._backgroundMusicMute = GetValue$i(config, 'bgm.mute', false);

            this.setBackgroundMusicLoop(GetValue$i(config, 'bgm.loop', true));
            this.setBackgroundMusicFadeTime(GetValue$i(config, 'bgm.fade', 500));

            this.backgroundMusic2 = undefined;
            this._backgroundMusic2Volume = GetValue$i(config, 'bgm2.volume', 1);
            this._backgroundMusic2Mute = GetValue$i(config, 'bgm2.mute', false);

            this.setBackgroundMusic2Loop(GetValue$i(config, 'bgm2.loop', true));
            this.setBackgroundMusic2FadeTime(GetValue$i(config, 'bgm2.fade', 500));

            // Sound effect will be destroyed when completed
            this.soundEffects = [];
            this._soundEffectsVolume = GetValue$i(config, 'soundEffect.volume', 1);

            this.soundEffects2 = [];
            this._soundEffects2Volume = GetValue$i(config, 'soundEffect2.volume', 1);


            var initialBackgroundMusic = GetValue$i(config, 'bgm.initial', undefined);
            if (initialBackgroundMusic) {
                this.setCurrentBackgroundMusic(initialBackgroundMusic);
            }

            var initialBackgroundMusic2 = GetValue$i(config, 'bgm2.initial', undefined);
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
        Methods$5
    );

    const GetValue$h = Phaser.Utils.Objects.GetValue;

    class BaseClock extends TickTask {
        constructor(parent, config) {
            super(parent, config);

            this.resetFromJSON(config);
            this.boot();
        }

        resetFromJSON(o) {
            this.isRunning = GetValue$h(o, 'isRunning', false);
            this.timeScale = GetValue$h(o, 'timeScale', 1);
            this.now = GetValue$h(o, 'now', 0);
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

    const GetValue$g = Phaser.Utils.Objects.GetValue;
    const TimerPool = new TimerPool$1();

    class Timeline extends Clock {
        constructor(parent, config) {
            super(parent, config);

            this.addedTimers = [];
            this.timers = [];
            this.timerPool = GetValue$g(config, 'pool', TimerPool);
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

    var GetValue$f = function (source, key, defaultValue) {
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

            this.waitCompleteEventName = GetValue$f(config, 'completeEventName', this.waitCompleteEventName);

            this.setClickTarget(GetValue$f(config, 'clickTarget', this.scene));
            this.setClickShortcutKeys(GetValue$f(config, 'clickShortcutKeys', undefined));
            this.setCameraTarget(GetValue$f(config, 'camera', this.scene.cameras.main));
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

    const GetValue$e = Phaser.Utils.Objects.GetValue;

    var InitManagers = function (scene, config) {
        this.clickTarget = undefined;
        this.clickShortcutKeys = undefined;
        this.cameraTarget = undefined;

        this.managersScene = scene;

        this.gameObjectManagers = {};

        var layerNames = GetValue$e(config, 'layers', false);
        if (layerNames !== false) {
            var layerManager = new LayerManager(scene, {
                name: 'LAYER',
                layers: layerNames,
                rootLayer: GetValue$e(config, 'rootLayer', undefined),
                depth: GetValue$e(config, 'layerDepth', undefined)
            });
            this.addGameObjectManager(layerManager);
            this.layerManager = layerManager;
        }

        var soundManagerConfig = GetValue$e(config, 'sounds');
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

    // copy from Phaser.GameObjects.Text

    const Utils = Phaser.Renderer.WebGL.Utils;

    var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
        if (src.dirty) {
            src.updateTexture();
            src.dirty = false;
        }

        if ((src.width === 0) || (src.height === 0)) {
            return;
        }

        camera.addToRenderList(src);

        var frame = src.frame;
        var width = frame.width;
        var height = frame.height;
        var getTint = Utils.getTintAppendFloatAlpha;
        var pipeline = renderer.pipelines.set(src.pipeline, src);
        var textureUnit = pipeline.setTexture2D(frame.glTexture, src);

        renderer.pipelines.preBatch(src);

        pipeline.batchTexture(
            src,
            frame.glTexture,
            width, height,
            src.x, src.y,
            width / src.resolution, height / src.resolution,
            src.scaleX, src.scaleY,
            src.rotation,
            src.flipX, src.flipY,
            src.scrollFactorX, src.scrollFactorY,
            src.displayOriginX, src.displayOriginY,
            0, 0, width, height,
            getTint(src.tintTopLeft, camera.alpha * src._alphaTL),
            getTint(src.tintTopRight, camera.alpha * src._alphaTR),
            getTint(src.tintBottomLeft, camera.alpha * src._alphaBL),
            getTint(src.tintBottomRight, camera.alpha * src._alphaBR),
            src.tintFill,
            0, 0,
            camera,
            parentMatrix,
            false,
            textureUnit
        );

        renderer.pipelines.postBatch(src);
    };

    // copy from Phaser.GameObjects.Text

    var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
        if (src.dirty) {
            src.updateTexture();
            src.dirty = false;
        }

        if ((src.width === 0) || (src.height === 0)) {
            return;
        }

        camera.addToRenderList(src);

        renderer.batchSprite(src, src.frame, camera, parentMatrix);
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer

    };

    const Color = Phaser.Display.Color;

    var CanvasMethods = {
        clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.dirty = true;
            return this;
        },

        fill(color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.dirty = true;
            return this;
        },

        drawFrame(key, frame, dx, dy, dWidth, dHeight, sxOffset, syOffset, sWidth, sHeight) {

            var textureFrame = this.scene.sys.textures.getFrame(key, frame);
            if (!textureFrame) {
                return this;
            }

            var frameWidth = textureFrame.cutWidth,
                frameHeight = textureFrame.cutHeight;

            if (dx === undefined) { dx = 0; }
            if (dy === undefined) { dy = 0; }
            if (dWidth === undefined) { dWidth = frameWidth; }
            if (dHeight === undefined) { dHeight = frameHeight; }
            if (sxOffset === undefined) { sxOffset = 0; }
            if (syOffset === undefined) { syOffset = 0; }
            if (sWidth === undefined) { sWidth = frameWidth; }
            if (sHeight === undefined) { sHeight = frameHeight; }

            var sx = textureFrame.cutX + sxOffset;
            var sy = textureFrame.cutY + syOffset;

            this.context.drawImage(
                textureFrame.source.image,  // image
                sx, sy, sWidth, sHeight,
                dx, dy, dWidth, dHeight
            );

            this.dirty = true;

            return this;
        },

        getDataURL(type, encoderOptions) {
            return this.canvas.toDataURL(type, encoderOptions);
        },

        getPixel(x, y, out) {
            if (out === undefined) {
                out = new Color();
            }
            var rgb = this.context.getImageData(x, y, 1, 1);
            out.setTo(rgb.data[0], rgb.data[1], rgb.data[2], rgb.data[3]);
            return out;
        },

        setPixel(x, y, r, g, b, a) {
            if (typeof (r) !== 'number') {
                var color = r;
                r = color.red;
                g = color.green;
                b = color.blue;
                a = color.alpha;
            }

            if (a === undefined) {
                a = ((r !== 0) || (g !== 0) || (b !== 0)) ? 255 : 0;
            }

            var imgData = this.context.createImageData(1, 1);
            imgData.data[0] = r;
            imgData.data[1] = g;
            imgData.data[2] = b;
            imgData.data[3] = a;
            this.context.putImageData(imgData, x, y);
            this.dirty = true;
            return this;
        }
    };

    var CopyCanvasToTexture = function (scene, srcCanvas, key, x, y, width, height) {
        var textures = scene.sys.textures;
        var renderer = scene.renderer;

        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = srcCanvas.width;
        }
        if (height === undefined) {
            height = srcCanvas.height;
        }

        var texture;
        if (textures.exists(key)) {
            texture = textures.get(key);
        } else {
            texture = textures.createCanvas(key, width, height);
        }

        var destCanvas = texture.getSourceImage();
        if (destCanvas.width !== width) {
            destCanvas.width = width;
        }
        if (destCanvas.height !== height) {
            destCanvas.height = height;
        }

        var destCtx = destCanvas.getContext('2d', { willReadFrequently: true });
        destCtx.clearRect(0, 0, width, height);
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (renderer.gl && texture) {
            renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
        }
    };

    var TextureMethods = {
        updateTexture(callback, scope) {
            if (callback) {
                var scale = this.resolution;
                if (scale !== 1) {
                    this.context.save();
                    this.context.scale(scale, scale);
                }

                if (scope) {
                    callback.call(scope, this.canvas, this.context);
                } else {
                    callback(this.canvas, this.context);
                }

                if (scale !== 1) {
                    this.context.restore();
                }
            }

            if ((this.canvas.width !== this.frame.width) || (this.canvas.height !== this.frame.height)) {
                this.frame.setSize(this.canvas.width, this.canvas.height);
            }
            if (this.renderer && this.renderer.gl) {
                this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
                if (typeof WEBGL_DEBUG) {
                    this.frame.glTexture.spectorMetadata = { textureKey: 'Canvas Game Object' };
                }
            }
            this.dirty = false;

            var input = this.input;
            if (input && !input.customHitArea) {
                input.hitArea.width = this.width;
                input.hitArea.height = this.height;
            }
            return this;
        },

        generateTexture(key, x, y, width, height) {
            var srcCanvas = this.canvas;
            if (width === undefined) {
                width = srcCanvas.width;
            } else {
                width *= this.resolution;
            }
            if (height === undefined) {
                height = srcCanvas.height;
            } else {
                height *= this.resolution;
            }

            CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);

            return this;
        },

        loadTexture(key, frame) {
            var textureFrame = this.scene.sys.textures.getFrame(key, frame);
            if (!textureFrame) {
                return this;
            }

            if ((this.width !== textureFrame.cutWidth) || (this.height !== textureFrame.cutHeight)) {
                this.setSize(textureFrame.cutWidth, textureFrame.cutHeight);
            } else {
                this.clear();
            }

            this.drawFrame(key, frame);
            this.dirty = true;
            return this;
        }

    };

    const MinVersion = 60;

    var IsChecked = false;

    var CheckP3Version = function (minVersion) {
        if (IsChecked) {
            return;
        }

        if (minVersion === undefined) {
            minVersion = MinVersion;
        }
        var version = Phaser.VERSION.split('.');
        var mainVersion = parseInt(version[0]);
        if (mainVersion === 3) {
            var currentVersion = parseInt(version[1]);
            if (currentVersion < minVersion) {
                console.error(`Minimum supported version : ${mainVersion}.${currentVersion}`);
            }
        } else {
            console.error(`Can't supported version : ${mainVersion}`);
        }

        IsChecked = true;
    };

    CheckP3Version();

    const CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;
    const GameObject$1 = Phaser.GameObjects.GameObject;
    const UUID = Phaser.Utils.String.UUID;

    class Canvas extends GameObject$1 {
        constructor(scene, x, y, width, height, resolution) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 1;
            }
            if (height === undefined) {
                height = 1;
            }
            if (resolution === undefined) {
                resolution = 1;
            }

            super(scene, 'rexCanvas');

            this.renderer = scene.sys.game.renderer;

            this._width = width;
            this._height = height;
            this.resolution = resolution;

            width = Math.max(Math.ceil(width * this.resolution), 1);
            height = Math.max(Math.ceil(height * this.resolution), 1);
            this.canvas = CanvasPool$1.create(this, width, height);
            this.context = this.canvas.getContext('2d', { willReadFrequently: true });

            this.dirty = false;

            this.setPosition(x, y);
            this.setOrigin(0.5, 0.5);
            this.initPipeline();
            this.initPostPipeline(true);

            this._crop = this.resetCropObject();

            //  Create a Texture for this Text object
            this._textureKey = UUID();

            this.texture = scene.sys.textures.addCanvas(this._textureKey, this.canvas);

            //  Get the frame
            this.frame = this.texture.get();

            //  Set the resolution
            this.frame.source.resolution = this.resolution;

            if (this.renderer && this.renderer.gl) {
                //  Clear the default 1x1 glTexture, as we override it later
                this.renderer.deleteTexture(this.frame.source.glTexture);
                this.frame.source.glTexture = null;
            }

            this.dirty = true;
        }

        preDestroy() {
            CanvasPool$1.remove(this.canvas);

            this.canvas = null;
            this.context = null;

            var texture = this.texture;

            if (texture) {
                texture.destroy();
            }
        }

        setResolution(resolution) {
            if (this.resolution === resolution) {
                return this;
            }

            this.resolution = resolution;

            var width = Math.max(Math.ceil(this.width * resolution), 1);
            var height = Math.max(Math.ceil(this.height * resolution), 1);
            this.canvas.width = width;
            this.canvas.height = height;

            this.frame.source.resolution = resolution;
            this.dirty = true;

            return this;
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

        setCanvasSize(width, height) {
            if ((this._width === width) && (this._height === height)) {
                return this;
            }

            this._width = width;
            this._height = height;

            this.updateDisplayOrigin();

            width = Math.max(Math.ceil(width * this.resolution), 1);
            height = Math.max(Math.ceil(height * this.resolution), 1);
            this.canvas.width = width;
            this.canvas.height = height;

            this.frame.setSize(width, height);

            this.dirty = true;
            return this;
        }

        // setSize might be override
        setSize(width, height) {
            this.setCanvasSize(width, height);
            return this;
        }

        get displayWidth() {
            return this.scaleX * this._width;
        }

        set displayWidth(value) {
            this.scaleX = value / this._width;
        }

        get displayHeight() {
            return this.scaleY * this._height;
        }

        set displayHeight(value) {
            this.scaleY = value / this._height;
        }

        setDisplaySize(width, height) {
            this.displayWidth = width;
            this.displayHeight = height;
            return this;
        }

        getCanvas(readOnly) {
            if (!readOnly) {
                this.dirty = true;
            }
            return this.canvas;
        }

        getContext(readOnly) {
            if (!readOnly) {
                this.dirty = true;
            }
            return this.context;
        }

        needRedraw() {
            this.dirty = true;
            return this;
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }
    }

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Canvas,
        [
            Components.Alpha,
            Components.BlendMode,
            Components.Crop,
            Components.Depth,
            Components.Flip,
            Components.GetBounds,
            Components.Mask,
            Components.Origin,
            Components.Pipeline,
            Components.PostPipeline,
            Components.ScrollFactor,
            Components.Tint,
            Components.Transform,
            Components.Visible,
            Render,
            CanvasMethods,
            TextureMethods,
        ]
    );

    const GetValue$d = Phaser.Utils.Objects.GetValue;

    var GetPadding$1 = function (padding, key) {
        if (key === undefined) {
            return padding;
        }
        return padding[key];
    };

    var SetPadding$1 = function (padding, key, value) {
        if (padding === undefined) {
            padding = {};
        }
        if (key === undefined) {
            key = 0;
        }

        var keyType = typeof (key);
        if (keyType === 'string') {
            padding[key] = value;
        } else if (keyType === 'number') {
            padding.left = key;
            padding.right = key;
            padding.top = key;
            padding.bottom = key;
        } else {
            padding.left = GetValue$d(key, 'left', 0);
            padding.right = GetValue$d(key, 'right', 0);
            padding.top = GetValue$d(key, 'top', 0);
            padding.bottom = GetValue$d(key, 'bottom', 0);
        }
        return padding;
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
            return (key === undefined) ? this.data : GetValue$f(this.data, key, defaultValue);
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

    class Base {
        constructor(parent, type) {
            this.setParent(parent);
            this.type = type;
            this.renderable = false;

            this.reset().setActive();
        }

        destroy() {
            this.parent.removeChild(this);
        }

        setParent(parent) {
            this.parent = parent;
            return this;
        }

        get scene() {
            return this.parent.scene;
        }

        get canvas() {
            return (this.parent) ? this.parent.canvas : null;
        }

        get context() {
            return (this.parent) ? this.parent.context : null;
        }

        setDirty(dirty) {
            if (dirty && this.parent) {
                this.parent.dirty = true;
            }
            return this;
        }

        get active() {
            return this._active;
        }

        set active(value) {
            this.setDirty(this._active != value);
            this._active = value;
        }

        setActive(active) {
            if (active === undefined) {
                active = true;
            }
            this.active = active;
            return this;
        }

        modifyPorperties(o) {
            return this;
        }

        // Override
        onFree() {
            this.reset().setParent();
        }

        // Override
        reset() {
            return this;
        }

        // Override
        render() { }

        // Override
        contains(x, y) {
            return false;
        }
    }

    Object.assign(
        Base.prototype,
        DataMethods
    );

    var RenderMethods = {
        // Override
        renderContent() {

        },

        // Override
        render() {
            if (!this.willRender) {
                return this;
            }

            var context = this.context;
            context.save();
            context.globalAlpha = this.alpha;

            if (this.toLocalPosition) {
                var x = this.drawX, y = this.drawY;
                if (this.autoRound) {
                    x = Math.round(x);
                    y = Math.round(y);
                }

                context.translate(x, y);
                context.scale(this.scaleX, this.scaleY);
                context.rotate(this.rotation);
            }

            if (this.drawBelowCallback) {
                this.drawBelowCallback(this);
            }

            this.renderContent();

            if (this.drawAboveCallback) {
                this.drawAboveCallback(this);
            }

            context.restore();

            return this;
        },
    };

    const RotateAround$1 = Phaser.Math.RotateAround;

    var CanvasPositionToBobPosition = function (canvasX, canvasY, bob, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            if (globPoint$1 === undefined) {
                globPoint$1 = {};
            }
            out = globPoint$1;
        }

        out.x = (canvasX - bob.drawX) / bob.scaleX;
        out.y = (canvasY - bob.drawY) / bob.scaleY;

        if (bob.rotation !== 0) {
            RotateAround$1(out, 0, 0, -bob.rotation);
        }
        return out;
    };

    var globPoint$1;

    const Rectangle = Phaser.Geom.Rectangle;

    var Contains = function (canvasX, canvasY) {
        if ((this.width === 0) || (this.height === 0)) {
            return false;
        }

        var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
        return GetBobBounds(this).contains(bobPosition.x, bobPosition.y);
    };

    var GetBobBounds = function (bob) {
        if (bobBounds === undefined) {
            bobBounds = new Rectangle();
        }

        var x = bob.drawTLX,
            y = bob.drawTLY;
        bobBounds.setTo(x, y, (bob.drawTRX - x), (bob.drawBLY - y));

        return bobBounds;
    };

    var bobBounds;

    const RotateAround = Phaser.Math.RotateAround;

    var BobPositionToCanvasPosition = function (bob, bobX, bobY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            if (globPoint === undefined) {
                globPoint = {};
            }
            out = globPoint;
        }

        out.x = bobX;
        out.y = bobY;

        if (bob.rotation !== 0) {
            RotateAround(out, 0, 0, bob.rotation);
        }

        out.x = (out.x * bob.scaleX) + bob.drawX;
        out.y = (out.y * bob.scaleY) + bob.drawY;

        return out;
    };

    var globPoint;

    const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;

    var GameObjectLocalXYToWorldXY = function (gameObject, localX, localY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut;
        }

        var px = localX - (gameObject.width * gameObject.originX);
        var py = localY - (gameObject.height * gameObject.originY);

        if (tempMatrix === undefined) {
            tempMatrix = new TransformMatrix();
            parentMatrix = new TransformMatrix();
        }

        if (gameObject.parentContainer) {
            gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
        }
        else {
            tempMatrix.applyITRS(gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY);
        }

        tempMatrix.transformPoint(px, py, out);

        return out;
    };

    var tempMatrix, parentMatrix;
    var globOut = {};

    var BobPositionToWorldPosition = function (dynamicText, bob, bobX, bobY, out) {
        var localXY = BobPositionToCanvasPosition(bob, bobX, bobY, true);
        var worldXY = GameObjectLocalXYToWorldXY(dynamicText, localXY.x, localXY.y, out);
        return worldXY;
    };

    var GetBobWorldPosition = function (dynamicText, bob, offsetX, offsetY, out) {
        if (typeof (offsetX) !== 'number') {
            out = offsetX;
            offsetX = 0;
            offsetY = 0;
        }
        var bobX = bob.drawCenterX + offsetX;
        var bobY = bob.drawCenterY + offsetY;
        return BobPositionToWorldPosition(dynamicText, bob, bobX, bobY, out);
    };

    var GetWorldPosition = function (offsetX, offsetY, out) {
        return GetBobWorldPosition(this.parent, this, offsetX, offsetY, out);
    };

    var Methods$4 = {
        contains: Contains,
        getWorldPosition: GetWorldPosition,
    };

    Object.assign(
        Methods$4,
        RenderMethods
    );

    const DegToRad$2 = Phaser.Math.DegToRad;
    const RadToDeg = Phaser.Math.RadToDeg;
    const GetValue$c = Phaser.Utils.Objects.GetValue;

    class RenderBase extends Base {
        constructor(parent, type) {
            super(parent, type);

            this.renderable = true;
            this.scrollFactorX = 1;
            this.scrollFactorY = 1;
            this.toLocalPosition = true;
            this.originX = 0;
            this.offsetX = 0;  // Override
            this.offsetY = 0;  // Override
        }

        get visible() {
            return this._visible;
        }

        set visible(value) {
            this.setDirty(this._visible != value);
            this._visible = value;
        }

        setVisible(visible) {
            if (visible === undefined) {
                visible = true;
            }

            this.visible = visible;
            return this;
        }

        get alpha() { return this._alpha; }

        set alpha(value) {
            this.setDirty(this._alpha != value);
            this._alpha = value;
        }

        setAlpha(alpha) {
            this.alpha = alpha;
            return this;
        }

        get x() { return this._x; }

        set x(value) {
            this.setDirty(this._x != value);
            this._x = value;
        }

        setX(x) {
            this.x = x;
            return this;
        }

        get y() { return this._y; }

        set y(value) {
            this.setDirty(this._y != value);
            this._y = value;
        }

        setY(y) {
            this.y = y;
            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setInitialPosition(x, y) {
            this.x0 = x;
            this.y0 = y;
            return this;
        }

        setScrollFactorX(x) {
            this.scrollFactorX = x;
            return this;
        }

        setScrollFactorY(y) {
            this.scrollFactorY = y;
            return this;
        }

        setScrollFactor(x, y) {
            if (y === undefined) {
                y = x;
            }
            this.scrollFactorX = x;
            this.scrollFactorY = y;
            return this;
        }

        get rotation() { return this._rotation; }

        set rotation(value) {
            this.setDirty(this._rotation != value);
            this._rotation = value;
        }

        setRotation(rotation) {
            this.rotation = rotation;
            return this;
        }

        get angle() { return RadToDeg(this._rotation); }

        set angle(value) {
            this.rotation = DegToRad$2(value);
        }

        setAngle(angle) {
            this.angle = angle;
            return this;
        }

        get scaleX() { return this._scaleX; }

        set scaleX(value) {
            this.setDirty(this._scaleX !== value);
            this._scaleX = value;
        }

        setScaleX(scaleX) {
            this.scaleX = scaleX;
            return this;
        }

        // Override
        get width() { return 0; }

        // Override
        set width(value) { }

        setWidth(width, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }
            this.width = width;

            if (keepAspectRatio) {
                this.scaleY = this.scaleX;
            }
            return this;
        }

        get leftSpace() { return this._leftSpace; }

        set leftSpace(value) {
            this.setDirty(this._leftSpace !== value);
            this._leftSpace = value;
        }

        setLeftSpace(value) {
            this.leftSpace = value;
            return this;
        }

        get rightSpace() { return this._rightSpace; }

        set rightSpace(value) {
            this.setDirty(this._rightSpace !== value);
            this._rightSpace = value;
        }

        setRightSpace(value) {
            this.rightSpace = value;
            return this;
        }

        get outerWidth() {
            return this.width + this.leftSpace + this.rightSpace;
        }

        get scaleY() { return this._scaleY; }

        set scaleY(value) {
            this.setDirty(this._scaleY !== value);
            this._scaleY = value;
        }

        setScaleY(scaleY) {
            this.scaleY = scaleY;
            return this;
        }

        // Override
        get height() { return 0; }

        // Override
        set height(value) { }

        setHeight(height, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }
            this.height = height;

            if (keepAspectRatio) {
                this.scaleX = this.scaleY;
            }
            return this;
        }

        setScale(scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }

            this.scaleX = scaleX;
            this.scaleY = scaleY;
            return this;
        }

        setOrigin(x) {
            this.originX = x;
            return this;
        }

        setAlign(align) {
            this.align = align;
            return this;
        }

        modifyPorperties(o) {
            if (!o) {
                return this;
            }

            if (o.hasOwnProperty('x')) {
                this.setX(o.x);
            }
            if (o.hasOwnProperty('y')) {
                this.setY(o.y);
            }

            if (o.hasOwnProperty('rotation')) {
                this.setRotation(o.rotation);
            } else if (o.hasOwnProperty('angle')) {
                this.setAngle(o.angle);
            }

            if (o.hasOwnProperty('alpha')) {
                this.setAlpha(o.alpha);
            }

            // ScaleX, ScaleY
            var width = GetValue$c(o, 'width', undefined);
            var height = GetValue$c(o, 'height', undefined);
            var scaleX = GetValue$c(o, 'scaleX', undefined);
            var scaleY = GetValue$c(o, 'scaleY', undefined);

            if (width !== undefined) {
                if ((height === undefined) && (scaleY === undefined)) {
                    this.setWidth(width, true);
                } else {
                    this.setWidth(width);
                }
            } else if (scaleX !== undefined) {
                this.setScaleX(scaleX);
            }
            if (height !== undefined) {
                if ((width === undefined) && (scaleX === undefined)) {
                    this.setHeight(height, true);
                } else {
                    this.setHeight(height);
                }
            } else if (scaleY !== undefined) {
                this.setScaleY(scaleY);
            }

            if (o.hasOwnProperty('leftSpace')) {
                this.setLeftSpace(o.leftSpace);
            }
            if (o.hasOwnProperty('rightSpace')) {
                this.setRightSpace(o.rightSpace);
            }

            if (o.hasOwnProperty('align')) {
                this.setAlign(o.align);
            }

            return this;
        }

        setDrawBelowCallback(callback) {
            this.drawBelowCallback = callback;
            return this;
        }

        setDrawAboveCallback(callback) {
            this.drawAboveCallback = callback;
            return this;
        }

        reset() {
            this
                .setVisible()
                .setAlpha(1)
                .setPosition(0, 0)
                .setRotation(0)
                .setScale(1, 1)
                .setLeftSpace(0).setRightSpace(0)
                .setOrigin(0)
                .setAlign()
                .setDrawBelowCallback()
                .setDrawAboveCallback();
            return this;
        }

        // Override
        get willRender() {
            return this.visible && (this.alpha > 0);
        }

        get drawX() {
            var x = this.x + this.leftSpace + this.offsetX - (this.originX * this.width);
            return (this.parent._textOX * this.scrollFactorX) + x;
        }
        get drawY() {
            var y = this.y + this.offsetY;
            return (this.parent._textOY * this.scrollFactorY) + y;
        }

        // Override
        get drawTLX() { return 0; }
        get drawTLY() { return 0; }
        get drawBLX() { return 0; }
        get drawBLY() { return 0; }
        get drawTRX() { return 0; }
        get drawTRY() { return 0; }
        get drawBRX() { return 0; }
        get drawBRY() { return 0; }

        get drawCenterX() {
            return (this.drawTRX + this.drawTLX) / 2;
        }
        get drawCenterY() {
            return (this.drawBLY + this.drawTLY) / 2;
        }
    }

    Object.assign(
        RenderBase.prototype,
        Methods$4,
    );

    const Pad = Phaser.Utils.String.Pad;
    var GetStyle = function (style, canvas, context) {
        if (style == null) {
            return style;
        }

        switch (typeof (style)) {
            case 'string': return style;
            case 'number': return `#${Pad(Math.floor(style).toString(16), 6, '0', 1)}`;
            case 'function': return style(canvas, context);
            case 'object':
                if (style.hasOwnProperty('r')) {
                    if (style.hasOwnProperty('a')) {  // rgba
                        return `rgba(${style.r},${style.g},${style.b},${style.a})`;
                    } else {  // rgb
                        return `rgb(${style.r},${style.g},${style.b})`;
                    }
                } else if (style.hasOwnProperty('h')) {
                    if (style.hasOwnProperty('a')) {  // hsla
                        return `hsla(${style.h},${style.s},${style.l},${style.a})`;
                    } else {  // hsl
                        return `hsl(${style.h},${style.s},${style.l})`;
                    }
                } else {
                    return style; // Not a valid input
                }
            default: return style;
        }
    };

    var GetProperty = function (name, config, defaultConfig) {
        if (config.hasOwnProperty(name)) {
            return config[name];
        } else {
            return defaultConfig[name];
        }
    };

    const GetValue$b = Phaser.Utils.Objects.GetValue;

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
                defaultRadiusX = GetValue$b(value, 'x', 0);
                defaultRadiusY = GetValue$b(value, 'y', 0);
            }

            var radius = this.cornerRadius;
            radius.tl = GetRadius(GetValue$b(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
            radius.tr = GetRadius(GetValue$b(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
            radius.bl = GetRadius(GetValue$b(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
            radius.br = GetRadius(GetValue$b(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
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
            radius.x = GetValue$b(value, 'x', 0);
            radius.y = GetValue$b(value, 'y', 0);
        }

        SetConvex(radius);
    };

    var SetConvex = function (radius) {
        radius.convex = (radius.x >= 0) || (radius.y >= 0);

        radius.x = Math.abs(radius.x);
        radius.y = Math.abs(radius.y);
    };

    const DegToRad$1 = Phaser.Math.DegToRad;

    var AddRoundRectanglePath = function (context, x, y, width, height, radiusConfig, iteration) {
        var geom = new RoundRectangle(x, y, width, height, radiusConfig),
            minWidth = geom.minWidth,
            minHeight = geom.minHeight,
            scaleRX = (width >= minWidth) ? 1 : (width / minWidth),
            scaleRY = (height >= minHeight) ? 1 : (height / minHeight);

        var cornerRadius = geom.cornerRadius;
        var radius, radiusX, radiusY, centerX, centerY;
        var startX, startY;

        context.save();
        context.beginPath();

        context.translate(x, y);

        // Top-left
        radius = cornerRadius.tl;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = radiusX;
                centerY = radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 270, false, iteration);
            } else {
                centerX = 0;
                centerY = 0;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 0, true, iteration);
            }

            startX = 0;
            startY = radiusY;
        } else {
            context.lineTo(0, 0);

            startX = 0;
            startY = 0;
        }

        // Top-right
        radius = cornerRadius.tr;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = width - radiusX;
                centerY = radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 360, false, iteration);
            } else {
                centerX = width;
                centerY = 0;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 90, true, iteration);
            }
        } else {
            context.lineTo(width, 0);
        }

        // Bottom-right
        radius = cornerRadius.br;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = width - radiusX;
                centerY = height - radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 0, 90, false, iteration);
            } else {
                centerX = width;
                centerY = height;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 180, true, iteration);
            }
        } else {
            context.lineTo(width, height);
        }

        // Bottom-left
        radius = cornerRadius.bl;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = radiusX;
                centerY = height - radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 180, false, iteration);
            } else {
                centerX = 0;
                centerY = height;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 360, 270, true, iteration);
            }
        } else {
            context.lineTo(0, height);
        }

        context.lineTo(startX, startY);
        context.closePath();
        context.restore();
    };

    var IsConvexArc = function (radius) {
        return (!radius.hasOwnProperty('convex')) ||  // radius does not have convex property
            radius.convex;
    };

    var IsArcCorner = function (radius) {
        return ((radius.x > 0) && (radius.y > 0));
    };

    var ArcTo = function (
        context,
        centerX, centerY,
        radiusX, radiusY,
        startAngle, endAngle,
        antiClockWise,
        iteration
    ) {

        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        startAngle = DegToRad$1(startAngle);
        endAngle = DegToRad$1(endAngle);

        if (iteration == null) {  // undefined, or null
            context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle, antiClockWise);
        } else {
            iteration += 1;
            var x, y, angle;
            var step = (endAngle - startAngle) / iteration;
            for (var i = 0; i <= iteration; i++) {
                angle = startAngle + (step * i);
                x = centerX + (radiusX * Math.cos(angle));
                y = centerY + (radiusY * Math.sin(angle));
                context.lineTo(x, y);
            }
        }
    };

    var DrawRoundRectangle = function (
        canvas, context,
        x, y,
        width, height, radiusConfig,
        fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient,
        iteration
    ) {

        AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration);

        if (fillStyle != null) {
            if (fillColor2 != null) {
                var grd;
                if (isHorizontalGradient) {
                    grd = context.createLinearGradient(0, 0, width, 0);
                } else {
                    grd = context.createLinearGradient(0, 0, 0, height);
                }
                grd.addColorStop(0, fillStyle);
                grd.addColorStop(1, fillColor2);
                fillStyle = grd;
            }

            context.fillStyle = fillStyle;
            context.fill();
        }

        if ((strokeStyle != null) && (lineWidth > 0)) {
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.stroke();
        }
    };

    var DrawRoundRectangleBackground = function (
        canvasObject,
        color,
        strokeColor, strokeLineWidth,
        radius,
        color2, isHorizontalGradient,
        iteration
    ) {

        if ((color == null) && (strokeColor == null)) {
            return;
        }

        var width = canvasObject.canvas.width,
            height = canvasObject.canvas.height;

        if (strokeColor == null) {
            strokeLineWidth = 0;
        }
        var x = strokeLineWidth / 2;
        width = Math.max(1, width - strokeLineWidth);   // Min width is 1
        height = Math.max(1, height - strokeLineWidth); // Min height is 1
        DrawRoundRectangle(canvasObject.canvas, canvasObject.context,
            x, x,
            width, height,
            radius,
            color,
            strokeColor, strokeLineWidth,
            color2, isHorizontalGradient,
            iteration
        );
    };

    const GetValue$a = Phaser.Utils.Objects.GetValue;

    class Background extends RenderBase {
        constructor(parent, config) {
            super(parent, 'background');

            this.setScrollFactor(0);

            this.setColor(
                GetValue$a(config, 'color', null),
                GetValue$a(config, 'color2', null),
                GetValue$a(config, 'horizontalGradient', true)
            );

            this.setStroke(
                GetValue$a(config, 'stroke', null),
                GetValue$a(config, 'strokeThickness', 2)
            );

            this.setCornerRadius(
                GetValue$a(config, 'cornerRadius', 0),
                GetValue$a(config, 'cornerIteration', null)
            );
        }

        set color(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color != value);
            this._color = value;
        }

        get color() {
            return this._color;
        }

        set color2(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color2 != value);
            this._color2 = value;
        }

        get color2() {
            return this._color2;
        }

        set horizontalGradient(value) {
            this.setDirty(this._horizontalGradient != value);
            this._horizontalGradient = value;
        }

        get horizontalGradient() {
            return this._horizontalGradient;
        }

        setColor(color, color2, isHorizontalGradient) {
            if (isHorizontalGradient === undefined) {
                isHorizontalGradient = true;
            }

            this.color = color;
            this.color2 = color2;
            this.horizontalGradient = isHorizontalGradient;
            return this;
        }

        set stroke(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._stroke != value);
            this._stroke = value;
        }

        get stroke() {
            return this._stroke;
        }

        set strokeThickness(value) {
            this.setDirty(this._strokeThickness != value);
            this._strokeThickness = value;
        }

        get strokeThickness() {
            return this._strokeThickness;
        }

        setStroke(color, lineWidth) {
            if (color != null) {
                if (lineWidth === undefined) {
                    lineWidth = 2;
                }
            }
            this.stroke = color;
            this.strokeThickness = lineWidth;
            return this;
        }

        set cornerRadius(value) {
            this.setDirty(this._cornerRadius != value);
            this._cornerRadius = value;
        }

        get cornerRadius() {
            return this._cornerRadius;
        }

        set cornerIteration(value) {
            this.setDirty(this._cornerIteration != value);
            this._cornerIteration = value;
        }

        get cornerIteration() {
            return this._cornerIteration;
        }

        modifyStyle(o) {
            if (o.hasOwnProperty('color')) {
                this.setColor(
                    o.color,
                    GetProperty('color2', o, this),
                    GetProperty('horizontalGradient', o, this),
                );
            }
            if (o.hasOwnProperty('stroke')) {
                this.setStroke(
                    o.stroke,
                    GetProperty('strokeThickness', o, this),
                );
            }
            if (o.hasOwnProperty('cornerRadius')) {
                this.setCornerRadius(
                    o.cornerRadius,
                    GetProperty('cornerIteration', o, this),
                );
            }

            return this;
        }

        modifyPorperties(o) {
            super.modifyPorperties(o);

            this.modifyStyle(o);

            return this;
        }

        setCornerRadius(radius, iteration) {
            this.cornerRadius = radius;
            this.cornerIteration = iteration;
            return this;
        }

        renderContent() {
            DrawRoundRectangleBackground(
                this.parent,
                this.color,
                this.stroke,
                this.strokeThickness,
                this.cornerRadius,
                this.color2,
                this.horizontalGradient,
                this.cornerIteration
            );
        }
    }

    const GetValue$9 = Phaser.Utils.Objects.GetValue;

    class InnerBounds extends RenderBase {
        constructor(parent, config) {
            super(parent, 'innerbounds');

            this.setScrollFactor(0);

            this.setColor(
                GetValue$9(config, 'color', null),
                GetValue$9(config, 'color2', null),
                GetValue$9(config, 'horizontalGradient', true)
            );

            this.setStroke(
                GetValue$9(config, 'stroke', null),
                GetValue$9(config, 'strokeThickness', 2)
            );
        }

        set color(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color != value);
            this._color = value;
        }

        get color() {
            return this._color;
        }

        set color2(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color2 != value);
            this._color2 = value;
        }

        get color2() {
            return this._color2;
        }

        set horizontalGradient(value) {
            this.setDirty(this._horizontalGradient != value);
            this._horizontalGradient = value;
        }

        get horizontalGradient() {
            return this._horizontalGradient;
        }

        setColor(color, color2, isHorizontalGradient) {
            if (isHorizontalGradient === undefined) {
                isHorizontalGradient = true;
            }

            this.color = color;
            this.color2 = color2;
            this.horizontalGradient = isHorizontalGradient;
            return this;
        }

        set stroke(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._stroke != value);
            this._stroke = value;
        }

        get stroke() {
            return this._stroke;
        }

        set strokeThickness(value) {
            this.setDirty(this._strokeThickness != value);
            this._strokeThickness = value;
        }

        get strokeThickness() {
            return this._strokeThickness;
        }

        setStroke(color, lineWidth) {
            if (color != null) {
                if (lineWidth === undefined) {
                    lineWidth = 2;
                }
            }
            this.stroke = color;
            this.strokeThickness = lineWidth;
            return this;
        }

        modifyPorperties(o) {
            super.modifyPorperties(o);

            if (o.hasOwnProperty('color')) {
                this.setColor(
                    o.color,
                    GetValue$9(o, 'color2', null),
                    GetValue$9(o, 'horizontalGradient', true)
                );
            }
            if (o.hasOwnProperty('stroke')) {
                this.setStroke(
                    o.stroke,
                    GetValue$9(o, 'strokeThickness', 2)
                );
            }
        }

        renderContent() {
            var padding = this.parent.padding;
            var x = padding.left,
                y = padding.top,
                width = this.parent.width - padding.left - padding.right,
                height = this.parent.height - padding.top - padding.bottom;
            var context = this.context;
            if (this.color != null) {
                var fillStyle;
                if (this.color2 != null) {
                    var grd;
                    if (this.horizontalGradient) {
                        grd = context.createLinearGradient(0, 0, width, 0);
                    } else {
                        grd = context.createLinearGradient(0, 0, 0, height);
                    }
                    grd.addColorStop(0, this.color);
                    grd.addColorStop(1, this.color2);
                    fillStyle = grd;
                } else {
                    fillStyle = this.color;
                }

                context.fillStyle = fillStyle;
                context.fillRect(x, y, width, height);
            }

            if ((this.stroke != null) && (this.strokeThickness > 0)) {
                context.strokeStyle = this.stroke;
                context.lineWidth = this.strokeThickness;
                context.strokeRect(x, y, width, height);
            }
        }
    }

    const GetValue$8 = Phaser.Utils.Objects.GetValue;

    class TextStyle {
        constructor(parent, config) {
            this.parent = parent;
            this.set(config);
        }

        toJSON() {
            return {
                bold: this.bold,
                italic: this.italic,
                fontSize: this.fontSize,
                fontFamily: this.fontFamily,
                color: this.color,
                stroke: this.stroke,
                strokeThickness: this.strokeThickness,
                shaodwColor: this.shadowColor,
                shadowBlur: this.shadowBlur,
                shadowOffsetX: this.shadowOffsetX,
                shadowOffsetY: this.shadowOffsetY,
                offsetX: this.offsetX,
                offsetY: this.offsetY,
                leftSpace: this.leftSpace,
                rightSpace: this.rightSpace,
                backgroundHeight: this.backgroundHeight,
                backgroundBottomY: this.backgroundBottomY,
                align: this.align
            }
        }

        set(o) {
            this.setBold(GetValue$8(o, 'bold', false));
            this.setItalic(GetValue$8(o, 'italic', false));
            this.setFontSize(GetValue$8(o, 'fontSize', '16px'));
            this.setFontFamily(GetValue$8(o, 'fontFamily', 'Courier'));
            this.setColor(GetValue$8(o, 'color', '#fff'));
            this.setStrokeStyle(
                GetValue$8(o, 'stroke', null),
                GetValue$8(o, 'strokeThickness', 0)
            );
            this.setShadow(
                GetValue$8(o, 'shadowColor', null),
                GetValue$8(o, 'shadowOffsetX', 0),
                GetValue$8(o, 'shadowOffsetY', 0),
                GetValue$8(o, 'shadowBlur', 0)
            );
            this.setOffset(
                GetValue$8(o, 'offsetX', 0),
                GetValue$8(o, 'offsetY', 0)
            );
            this.setSpace(
                GetValue$8(o, 'leftSpace', 0),
                GetValue$8(o, 'rightSpace', 0)
            );
            this.setAlign(GetValue$8(o, 'align', undefined));
            this.setBackgroundColor(GetValue$8(o, 'backgroundColor', null));
            this.setBackgroundHeight(GetValue$8(o, 'backgroundHeight', undefined));
            this.setBackgroundBottomY(GetValue$8(o, 'backgroundBottomY', undefined));
            this.setBackgroundLeftX(GetValue$8(o, 'backgroundLeftX', 0));
            this.setBackgroundRightX(GetValue$8(o, 'backgroundRightX', 0));

            return this;
        }

        modify(o) {
            if (o.hasOwnProperty('bold')) {
                this.setBold(o.bold);
            }
            if (o.hasOwnProperty('italic')) {
                this.setItalic(o.italic);
            }
            if (o.hasOwnProperty('fontSize')) {
                this.setFontSize(o.fontSize);
            }
            if (o.hasOwnProperty('fontFamily')) {
                this.setFontFamily(o.fontFamily);
            }
            if (o.hasOwnProperty('color')) {
                this.setColor(o.color);
            }
            if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
                this.setStrokeStyle(
                    GetProperty('stroke', o, this),
                    GetProperty('strokeThickness', o, this)
                );
            }

            if (o.hasOwnProperty('shadowColor')) {
                this.setShadowColor(o.shadowColor);
            }

            if (o.hasOwnProperty('shadowOffsetX') || o.hasOwnProperty('shadowOffsetY')) {
                this.setShadowOffset(
                    GetProperty('shadowOffsetX', o, this),
                    GetProperty('shadowOffsetY', o, this),
                );
            }

            if (o.hasOwnProperty('shadowBlur')) {
                this.setShadowBlur(o.shaodwBlur);
            }

            if (o.hasOwnProperty('offsetX')) {
                this.setOffsetX(o.offsetX);
            }
            if (o.hasOwnProperty('offsetY')) {
                this.setOffsetY(o.offsetY);
            }

            if (o.hasOwnProperty('leftSpace')) {
                this.setLeftSpace(o.leftSpace);
            }
            if (o.hasOwnProperty('rightSpace')) {
                this.setRightSpace(o.rightSpace);
            }

            if (o.hasOwnProperty('align')) {
                this.setAlign(o.align);
            }

            if (o.hasOwnProperty('backgroundColor')) {
                this.setBackgroundColor(o.backgroundColor);
            }

            if (o.hasOwnProperty('backgroundHeight')) {
                this.setBackgroundHeight(o.backgroundHeight);
            }
            if (o.hasOwnProperty('backgroundBottomY')) {
                this.setBackgroundBottomY(o.backgroundBottomY);
            }
            if (o.hasOwnProperty('backgroundLeftX')) {
                this.setBackgroundLeftX(o.backgroundLeftX);
            }
            if (o.hasOwnProperty('backgroundRightX')) {
                this.setBackgroundRightX(o.backgroundRightX);
            }        

            return this;
        }

        setUpdateTextFlag() {
            if (this.parent) {
                this.parent.updateTextFlag = true;
            }
            return this;
        }

        clone() {
            return new TextStyle(null, this.toJSON());
        }

        copyFrom(sourceTextStyle) {
            this.set(sourceTextStyle.toJSON());
            return this;
        }

        copyTo(targetTextStyle) {
            targetTextStyle.set(this.toJSON());
            return this;
        }

        setBold(value) {
            if (value === undefined) {
                value = true;
            }
            this.bold = value;
            this.setUpdateTextFlag();
            return this;
        }

        setItalic(value) {
            if (value === undefined) {
                value = true;
            }
            this.italic = value;
            this.setUpdateTextFlag();
            return this;
        }

        get fontStyle() {
            if (this.bold && this.italic) {
                return 'bold italic';
            } else if (this.bold) {
                return 'bold';
            } else if (this.italic) {
                return 'italic';
            } else {
                return '';
            }
        }

        setFontSize(fontSize) {
            if (typeof (fontSize) === 'number') {
                fontSize = `${fontSize}px`;
            }
            this.fontSize = fontSize;
            this.setUpdateTextFlag();
            return this;
        }

        setFontFamily(fontFamily) {
            this.fontFamily = fontFamily;
            this.setUpdateTextFlag();
            return this;
        }

        get font() {
            return `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`;
        }

        setColor(color) {
            this.color = GetStyle(color);
            return this;
        }

        get hasFill() {
            return this.color != null;
        }

        setStrokeStyle(stroke, strokeThickness) {
            this.stroke = GetStyle(stroke);
            if (strokeThickness !== undefined) {
                this.strokeThickness = strokeThickness;
            }
            return this;
        }

        setStrokeThickness(strokeThickness) {
            this.strokeThickness = strokeThickness;
            return this;
        }

        get hasStroke() {
            return (this.stroke != null) && (this.strokeThickness > 0);
        }

        setShadowColor(color) {
            this.shadowColor = GetStyle(color);
            return this;
        }

        setShadowOffset(offsetX, offsetY) {
            if (offsetX === undefined) {
                offsetX = 0;
            }
            if (offsetY === undefined) {
                offsetY = 0;
            }

            this.shadowOffsetX = offsetX;
            this.shadowOffsetY = offsetY;
            return this;
        }

        setShadowBlur(blur) {
            if (blur === undefined) {
                blur = 0;
            }

            this.shaodwBlur = blur;
            return this;
        }

        setShadow(color, offsetX, offsetY, blur) {
            this
                .setShadowColor(color)
                .setShadowOffset(offsetX, offsetY)
                .setShadowBlur(blur);
            return this;
        }

        setBackgroundColor(color) {
            this.backgroundColor = GetStyle(color);
            return this;
        }

        get hasBackgroundColor() {
            return this.backgroundColor != null;
        }

        setBackgroundHeight(height) {
            this.backgroundHeight = height;
            return this;
        }

        setBackgroundBottomY(y) {
            this.backgroundBottomY = y;
            return this;
        }

        setBackgroundLeftX(x) {
            this.backgroundLeftX = x;
            return this;
        }

        setBackgroundRightX(x) {
            this.backgroundRightX = x;
            return this;
        }

        setOffsetX(offsetX) {
            if (offsetX === undefined) {
                offsetX = 0;
            }

            this.offsetX = offsetX;
            return this;
        }

        setOffsetY(offsetY) {
            if (offsetY === undefined) {
                offsetY = 0;
            }

            this.offsetY = offsetY;
            return this;
        }

        setOffset(offsetX, offsetY) {
            this
                .setOffsetX(offsetX)
                .setOffsetY(offsetY);
            return this;
        }

        setLeftSpace(space) {
            if (space === undefined) {
                space = 0;
            }

            this.leftSpace = space;
            return this;
        }

        setRightSpace(space) {
            if (space === undefined) {
                space = 0;
            }

            this.rightSpace = space;
            return this;
        }

        setSpace(leftSpace, rightSpace) {
            this
                .setLeftSpace(leftSpace)
                .setRightSpace(rightSpace);
            return this;
        }

        setAlign(align) {
            this.align = align;
            return this;
        }

        syncFont(context) {
            context.font = this.font;
            return this;
        }

        syncStyle(context) {
            context.textBaseline = 'alphabetic';

            var hasFill = this.hasFill;
            var hasStroke = this.hasStroke;
            context.fillStyle = (hasFill) ? this.color : '#000';

            context.strokeStyle = (hasStroke) ? this.stroke : '#000';
            context.lineWidth = (hasStroke) ? this.strokeThickness : 0;
            context.lineCap = 'round';
            context.lineJoin = 'round';

            return this;
        }

        syncShadow(context) {
            if (context.shadowColor != null) {
                context.shadowColor = this.shadowColor;
                context.shadowOffsetX = this.shadowOffsetX;
                context.shadowOffsetY = this.shadowOffsetY;
                context.shadowBlur = this.shadowBlur;
            } else {
                context.shadowColor = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 0;
            }
        }

        getTextMetrics(context, text) {
            this.syncFont(context).syncStyle(context);
            return context.measureText(text);
        }

    }

    var SetFixedSize = function (width, height) {
        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = 0;
        }

        if ((this.fixedWidth === width) && (this.fixedHeight === height)) {
            return this;
        }

        this.fixedWidth = width;
        this.fixedHeight = height;
        this.dirty = true;  // -> this.updateTexture();

        this.setCanvasSize(
            (width > 0) ? width : this.width,
            (height > 0) ? height : this.height
        );

        return this;
    };

    var SetPadding = function (key, value) {
        var padding = this.padding;
        var paddingLeft = padding.left,
            paddingRight = padding.right,
            paddingTop = padding.top,
            paddingBottom = padding.bottom;

        SetPadding$1(padding, key, value);

        this.dirty = this.dirty ||
            (paddingLeft != padding.left) ||
            (paddingRight != padding.right) ||
            (paddingTop != padding.top) ||
            (paddingBottom != padding.bottom)
            ;
        return this;
    };

    var GetPadding = function (key) {
        return GetPadding$1(this.padding, key);
    };

    var ModifyTextStyle = function (style) {
        this.textStyle.modify(style);
        return this;
    };

    var ModifyDefaultTextStyle = function (style) {
        this.defaultTextStyle.modify(style);
        return this;
    };

    var ResetTextStyle = function () {
        this.textStyle.copyFrom(this.defaultTextStyle);
        return this;
    };

    var SetTestString = function (testString) {
        this.testString = testString;
        return this;
    };

    const RemoveItem$1 = Phaser.Utils.Array.Remove;

    var RemoveChild = function (child) {
        this.poolManager.free(child);
        RemoveItem$1(this.children, child);
        this.lastAppendedChildren.length = 0;
        this.lastOverChild = null;
        this.dirty = true;
        return this;
    };

    var RemoveChildren = function () {
        this.poolManager.freeMultiple(this.children);
        this.children.length = 0;
        this.lastAppendedChildren.length = 0;
        this.lastOverChild = null;
        this.dirty = true;
        return this;
    };

    const RemoveItem = Phaser.Utils.Array.Remove;

    var PopChild = function (child) {
        RemoveItem(this.children, child);
        this.lastAppendedChildren.length = 0;
        this.lastOverChild = null;
        this.dirty = true;
        return this;
    };

    var ClearContent = function() {
        this.setText();
        return this;
    };

    // const RemoveItem = Phaser.Utils.Array.Remove;

    var AddChild = function (child, index) {
        var areChildren = Array.isArray(child);

        // Remove existed child(s)
        // RemoveItem(this.children, child);

        if ((index === undefined) || (index === this.children.length)) {
            if (areChildren) {
                this.children.push(...child);
            } else {
                this.children.push(child);
            }
        } else {
            if (areChildren) {
                this.children.splice(index, 0, ...child);
            } else {
                this.children.splice(index, 0, child);
            }
        }

        this.lastAppendedChildren.length = 0;
        if (areChildren) {
            this.lastAppendedChildren.push(...child);
        } else {
            this.lastAppendedChildren.push(child);
        }

        return this;
    };

    const CharTypeName = 'text';
    const ImageTypeName = 'image';
    const DrawerTypeName = 'drawer';
    const SpaceTypeName = 'space';
    const CmdTypeName = 'command';

    var IsNewLineChar = function (bob) {
        return (bob.type === CharTypeName) && (bob.text === '\n');
    };

    var IsPageBreakChar = function (bob) {
        return (bob.type === CharTypeName) && (bob.text === '\f');
    };

    var IsSpaceChar = function (bob) {
        return (bob.type === CharTypeName) && (bob.text === ' ');
    };

    var IsChar = function (bob) {
        return (bob.type === CharTypeName);
    };

    var IsCommand = function (bob) {
        return bob.type === CmdTypeName;
    };

    class CharData extends RenderBase {
        constructor(
            parent,
            text,
            style
        ) {
            super(parent, CharTypeName);
            this.updateTextFlag = false;
            this.style = new TextStyle(this, style);
            this.setText(text);
        }

        get autoRound() {
            return this.parent.autoRound;
        }

        get offsetX() {
            return this.style.offsetX;
        }

        set offsetX(value) {
            if (this.style) {
                this.style.offsetX = value;
            }
        }

        get offsetY() {
            return this.style.offsetY;
        }

        set offsetY(value) {
            if (this.style) {
                this.style.offsetY = value;
            }
        }

        get leftSpace() {
            return this.style.leftSpace * this.scaleX;
        }

        set leftSpace(value) {
            if (this.style) {
                this.style.leftSpace = value;
            }
            super.leftSpace = value;
        }

        get rightSpace() {
            return this.style.rightSpace * this.scaleX;
        }

        set rightSpace(value) {
            if (this.style) {
                this.style.rightSpace = value;
            }
            super.rightSpace = value;
        }

        get align() {
            return this.style.align;
        }

        set align(value) {
            if (this.style) {
                this.style.align = value;
            }
        }

        modifyStyle(style) {
            this.setDirty(true);
            this.style.modify(style);

            if (this.updateTextFlag) {
                this.updateTextSize();
            }
            return this;
        }

        modifyPorperties(o) {
            if (!o) {
                return this;
            }

            this.modifyStyle(o);
            super.modifyPorperties(o);
            return this;
        }

        setText(text) {
            this.setDirty(this.text != text);
            this.text = text;

            this.updateTextSize();

            return this;
        }

        updateTextSize() {
            var text = this.text;
            // Is new-line, page-break, or empty character
            if ((text === '\n') || (text === '\f') || (text === '')) {
                this.clearTextSize();

            } else {
                var metrics = this.style.getTextMetrics(this.context, this.text);
                this.textWidth = metrics.width;

                var ascent, descent;
                if ('actualBoundingBoxAscent' in metrics) {
                    ascent = metrics.actualBoundingBoxAscent;
                    descent = metrics.actualBoundingBoxDescent;
                } else {
                    ascent = 0;
                    descent = 0;
                }

                this.textHeight = ascent + descent;
                this.ascent = ascent;
                this.descent = descent;
            }

            this.updateTextFlag = false;
            return this;
        }

        clearTextSize() {
            this.textWidth = 0;
            this.textHeight = 0;
            this.ascent = 0;
            this.descent = 0;
            return this;
        }

        copyTextSize(child) {
            this.textWidth = child.textWidth;
            this.textHeight = child.textHeight;
            this.ascent = child.ascent;
            this.descent = child.descent;
            return this;
        }

        get width() {
            return this.textWidth * this.scaleX;
        }

        set width(value) {
            if (this.textWidth > 0) {
                this.scaleX = value / this.textWidth;
            } else {
                this.scaleX = 1;
            }
        }

        get height() {
            return this.textHeight * this.scaleY;
        }

        set height(value) {
            if (this.textHeight > 0) {
                this.scaleY = value / this.textHeight;
            } else {
                this.scaleY = 1;
            }
        }

        get willRender() {
            if (this.textWidth === 0) {
                return false;
            }

            return super.willRender;
        }

        renderContent() {
            var context = this.context;
            var textStyle = this.style;

            if (textStyle.hasBackgroundColor) {
                context.fillStyle = textStyle.backgroundColor;

                var leftX = this.drawTLX + textStyle.backgroundLeftX;
                var rightX = this.drawTRX + textStyle.backgroundRightX;
                var x = leftX;
                var width = rightX - leftX + 1; // Add extra 1 pixel width

                if (width > 0) {
                    var bottomY = textStyle.backgroundBottomY;
                    if (bottomY == null) {
                        bottomY = this.drawBLY;
                    }
                    var height = textStyle.backgroundHeight;
                    if (height == null) {
                        height = bottomY - this.drawTLY;
                    }
                    var y = bottomY - height;

                    context.fillRect(x, y, width, height);
                }
            }

            var hasFill = textStyle.hasFill,
                hasStroke = textStyle.hasStroke;

            if (!hasFill && !hasStroke) {
                return;
            }

            textStyle.syncFont(context).syncStyle(context);
            // textBaseline = 'alphabetic'

            if (hasStroke) {
                textStyle.syncShadow(context);
                context.strokeText(this.text, 0, 0);
            }

            if (hasFill) {
                textStyle.syncShadow(context);
                context.fillText(this.text, 0, 0);
            }
        }

        get drawTLX() { return -this.leftSpace; }
        get drawTLY() { return -this.ascent; }
        get drawBLX() { return -this.leftSpace; }
        get drawBLY() { return this.descent; }
        get drawTRX() { return this.textWidth + this.rightSpace; }
        get drawTRY() { return -this.ascent; }
        get drawBRX() { return this.textWidth + this.rightSpace; }
        get drawBRY() { return this.descent; }

    }

    var CreateCharChild = function (text, style) {
        if (style) {
            this.textStyle.modify(style);
        }

        var child = this.poolManager.allocate(CharTypeName);
        if (child === null) {
            child = new CharData(
                this,               // parent
                text,               // text
                this.textStyle,     // style
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .modifyStyle(this.textStyle)
                .setText(text);
        }

        return child;
    };

    var CreateCharChildren = function (text, style) {
        if (style) {
            this.textStyle.modify(style);
        }

        var children = [];
        for (var i = 0, cnt = text.length; i < cnt; i++) {
            var char = text.charAt(i);
            var child = this.poolManager.allocate(CharTypeName);
            if (child === null) {
                child = new CharData(
                    this,               // parent
                    char,               // text
                    this.textStyle,     // style
                );
            } else {
                child
                    .setParent(this)
                    .setActive()
                    .modifyStyle(this.textStyle)
                    .setText(char);
            }
            // child.modifyPorperties(properties);  // Warning: Will modify text-style twice

            children.push(child);
        }

        return children;
    };

    var AppendText = function (text, style) {
        var children = this.createCharChildren(text, style);
        this.addChild(children);
        return this;
    };

    var SetText = function (text, style) {
        if (text === undefined) {
            text = '';
        }

        this.removeChildren();
        AppendText.call(this, text, style);  // this.appendText might be override

        this.dirty = true;
        return this;
    };

    var InsertText = function (index, text, style) {
        var children = this.createCharChildren(text, style);
        index = this.getCharChildIndex(index, true);
        this.addChild(children, index);

        return this;
    };

    var RemoveText = function (index, length) {
        if (length === undefined) {
            length = 1;
        }

        for (var i = 0; i < length; i++) {
            var childIndex = this.getCharChildIndex(index, true);
            if (childIndex === undefined) {
                break;
            }
            this.removeChild(this.children[childIndex]);
        }
        return this;
    };

    var GetText = function (activeOnly) {
        var text = '';
        this.forEachCharChild(function (child) {
            text += child.text;
        }, undefined, activeOnly);
        return text;
    };

    const CanvasPool = Phaser.Display.Canvas.CanvasPool;

    var DrawFrameToCanvas = function (frame, canvas, x, y, width, height, color, autoRound) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = frame.cutWidth; }
        if (height === undefined) { height = frame.cutHeight; }
        if (autoRound === undefined) { autoRound = false; }
        if (autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = canvas.getContext('2d', { willReadFrequently: true });

        if (color) {
            // Draw image at tempCanvas

            // Get tempCanvas
            var tempCanvas = CanvasPool.create(null, width, height, Phaser.CANVAS, true);

            var tempContext = tempCanvas.getContext('2d', { willReadFrequently: true });

            tempContext.drawImage(
                frame.source.image,
                frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
                0, 0, width, height
            );

            // Tint-fill
            tempContext.globalCompositeOperation = 'source-in';
            tempContext.fillStyle = color;
            tempContext.fillRect(0, 0, width, height);

            // Draw tempCanvas at context
            context.drawImage(
                tempCanvas,
                0, 0, width, height,
                x, y, width, height
            );

            // Release tempCanvas
            CanvasPool.remove(tempCanvas);
        } else {
            context.drawImage(
                frame.source.image,
                frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
                x, y, width, height
            );
        }
    };

    Phaser.Display.Canvas.CanvasPool;

    class ImageData extends RenderBase {
        constructor(
            parent,
            key, frame
        ) {
            super(parent, ImageTypeName);
            this.setTexture(key, frame);
            this.color = undefined;
        }

        get frameWidth() {
            return (this.frameObj) ? this.frameObj.cutWidth : 0;
        }

        get frameHeight() {
            return (this.frameObj) ? this.frameObj.cutHeight : 0;
        }

        get offsetY() {
            return -this.height;
        }

        set offsetY(value) { }

        get key() {
            return this._key;
        }

        set key(value) {
            this.setDirty(this._key != value);
            this._key = value;
        }

        get frame() {
            return this._frame;
        }

        set frame(value) {
            this.setDirty(this._frame != value);
            this._frame = value;
        }

        setTexture(key, frame) {
            this.key = key;
            this.frame = frame;

            this.frameObj = this.scene.sys.textures.getFrame(key, frame);
            return this;
        }

        get width() {
            return this.frameWidth * this.scaleX;
        }

        set width(value) {
            this.setDirty(this.width !== value);
            this.scaleX = value / this.frameWidth;
        }

        get height() {
            return this.frameHeight * this.scaleY;
        }

        set height(value) {
            this.setDirty(this.height !== value);
            this.scaleY = value / this.frameHeight;
        }

        setHeight(height, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }
            this.height = height;

            if (keepAspectRatio) {
                this.scaleX = this.scaleY;
            }
            return this;
        }

        setColor(color) {
            this.color = color;
            return this;
        }

        modifyPorperties(o) {
            if (o.hasOwnProperty('color')) {
                this.setColor(o.color);
            }

            super.modifyPorperties(o);
            return this;
        }

        renderContent() {
            DrawFrameToCanvas(
                this.frameObj, this.canvas,
                0, 0, this.frameWidth, this.frameHeight,
                this.color, false
            );

        }

        get drawTLX() { return -this.leftSpace; }
        get drawTLY() { return 0; }
        get drawBLX() { return -this.leftSpace; }
        get drawBLY() { return this.frameHeight; }
        get drawTRX() { return this.frameWidth + this.rightSpace; }
        get drawTRY() { return 0; }
        get drawBRX() { return this.frameWidth + this.rightSpace; }
        get drawBRY() { return this.frameHeight; }
    }

    var CreateImageChild = function(key, frame, properties) {
        var child = this.poolManager.allocate(ImageTypeName);

        if (child === null) {
            child = new ImageData(
                this,               // parent
                key,
                frame
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setTexture(key, frame);
        }
        child.modifyPorperties(properties);

        return child;
    };

    var AppendImage = function (key, frame, properties) {
        var child = this.createImageChild(key, frame, properties);
        this.addChild(child);

        return this;
    };

    class Drawer extends RenderBase {
        constructor(parent, renderCallback, width, height) {
            super(parent, DrawerTypeName);

            this.setRenderCallback(renderCallback);
            this.setDrawerSize(width, height);
        }

        setRenderCallback(callback) {
            if (callback) {
                this.renderContent = callback.bind(this);
            } else {
                delete this.renderContent;
            }
            return this;
        }

        setDrawerSize(width, height) {
            // Whole canvas
            if (width === true) {
                this.toLocalPosition = false;
                width = undefined;
                height = undefined;
            } else {
                this.toLocalPosition = true;
            }

            if (width === undefined) {
                width = 0;
            }
            if (height === undefined) {
                height = width;
            }

            this.drawerWidth = width;
            this.drawerHeight = height;

            return this;
        }

        onFree() {
            super.onFree();
            this
                .setRenderCallback();
        }

        get width() {
            return this.drawerWidth * this.scaleX;
        }

        set width(value) {
            this.setDirty(this.width !== value);
            this.scaleX = (this.drawerWidth > 0) ? value / this.drawerWidth : 1;
        }

        get height() {
            return this.drawerHeight * this.scaleY;
        }

        set height(value) {
            this.setDirty(this.height !== value);
            this.scaleY = (this.drawerHeight > 0) ? value / this.drawerHeight : 1;
        }

        get offsetY() {
            return -this.height;
        }

        set offsetY(value) { }

        get drawTLX() { return -this.leftSpace; }
        get drawTLY() { return 0; }
        get drawBLX() { return -this.leftSpace; }
        get drawBLY() { return this.drawerHeight; }
        get drawTRX() { return this.drawerWidth + this.rightSpace; }
        get drawTRY() { return 0; }
        get drawBRX() { return this.drawerWidth + this.rightSpace; }
        get drawBRY() { return this.drawerHeight; }

    }

    var CreateDrawerChild = function (renderCallback, width, height) {
        var child = this.poolManager.allocate(DrawerTypeName);

        if (child === null) {
            child = new Drawer(
                this,               // parent
                renderCallback,
                width, height
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setRenderCallback(renderCallback)
                .setDrawerSize(width, height);
        }

        return child;
    };

    var AppendDrawer = function (renderCallback, width, height) {
        var child = this.createDrawerChild(renderCallback, width, height);
        this.addChild(child);

        return this;
    };

    class Space extends RenderBase {
        constructor(
            parent,
            width
        ) {
            super(parent, SpaceTypeName);
            this.setSpaceWidth(width);
        }

        get width() {
            return this.spaceWidth * this.scaleX;
        }

        set width(value) {
            if (this.spaceWidth > 0) {
                this.scaleX = value / this.spaceWidth;
            } else {
                this.scaleX = 1;
            }
        }

        setSpaceWidth(width) {
            this.spaceWidth = width;
            return this;
        }

    }

    var CreateSpaceChild = function (width) {
        var child = this.poolManager.allocate(SpaceTypeName);

        if (child === null) {
            child = new Space(
                this,               // parent
                width
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setSpaceWidth(width);
        }
        return child;
    };

    var AppendSpace = function (width) {
        var child = this.createSpaceChild(width);
        this.addChild(child);

        return this;
    };

    class Command extends Base {
        constructor(parent, name, callback, param, scope) {
            super(parent, CmdTypeName);

            this
                .setName(name)
                .setParameter(param)
                .setCallback(callback, scope);
        }

        setName(name) {
            this.name = name;
            return this;
        }

        setParameter(param) {
            this.param = param;
            return this;
        }

        setCallback(callback, scope) {
            this.callback = callback;
            this.scope = scope;
            return this;
        }

        exec() {
            var result;
            if (this.scope) {
                result = this.callback.call(this.scope, this.param, this.name);
            } else {
                result = this.callback(this.param, this.name);
            }
            return result;
        }

        onFree() {
            super.onFree();
            this
                .setName()
                .setCallback()
                .setParameter();
        }
    }

    var CreateCommandChild = function (name, callback, param, scope) {
        var child = this.poolManager.allocate(CmdTypeName);

        if (child === null) {
            child = new Command(
                this,               // parent
                name,
                callback, param, scope,
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setName(name)
                .setCallback(callback, scope)
                .setParameter(param);

        }

        return child;
    };

    var AppendCommand$3 = function (name, callback, param, scope) {
        var child = this.createCommandChild(name, callback, param, scope);
        this.addChild(child);

        return this;
    };

    function DeepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            // If obj is a primitive value or null, return it directly
            return obj;
        }

        if (Array.isArray(obj)) {
            // If obj is an array, create a new array and clone each element
            return obj.map(item => DeepClone(item));
        }

        if (obj instanceof Date) {
            // If obj is a Date object, create a new Date object with the same value
            return new Date(obj);
        }

        if (obj instanceof RegExp) {
            // If obj is a RegExp object, create a new RegExp object with the same pattern and flags
            return new RegExp(obj);
        }

        if (Object.getPrototypeOf(obj) !== Object.prototype) {
            // If obj is a custom object, return a reference to it
            return obj;
        }

        // If obj is a plain object, create a new object and clone each property
        const clonedObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = DeepClone(obj[key]);
            }
        }
        return clonedObj;
    }

    var SetWrapConfig = function (config) {
        if (config === undefined) {
            config = {};
        } else if (typeof (config) === 'object') {
            config = DeepClone(config);
        }

        this.wrapConfig = config;
        return this;
    };

    var CreateWrapResultData = function (config) {
        var data = {
            callback: undefined,
            start: 0,  // Next start index
            isLastPage: false,  // Is last page
            maxLines: undefined,
            padding: undefined,
            letterSpacing: undefined,
            hAlign: undefined,
            vAlign: undefined,
            children: [],       // Wrap result
            lines: [],          // Wrap result in lines

            // WordWrap
            maxLineWidth: 0,
            linesHeight: 0,
            lineHeight: undefined,

            // VerticalWrap
            maxLineHeight: 0,
            linesWidth: 0,
            lineWidth: undefined,
        };

        return Object.assign(data, config);
    };

    const WRAPMODE = {
        none: 0,
        word: 1,
        char: 2,
        character: 2,
        mix: 3
    };

    var RE_ASCII = /^[\x00-\x7F]+$/;
    var IsASCIIString = function (s) {
        return RE_ASCII.test(s);
    };

    var GetWord = function (children, startIndex, wrapMode, result) {
        if (result === undefined) {
            result = { word: [], width: 0 };
        }

        result.word.length = 0;

        var isCharWrap = (wrapMode === 2);
        var isMixWrap = (wrapMode === 3);
        var isWordWrap = !isCharWrap && !isMixWrap;

        var endIndex = children.length;
        var currentIndex = startIndex;
        var word = result.word;
        var wordWidth = 0;
        var hasAnyASCIICharacter = false;
        while (currentIndex < endIndex) {
            var child = children[currentIndex];
            // Can't render (command child), put into output directly
            if (!child.renderable) {
                word.push(child);
                currentIndex++;
                continue;
            }

            var text = (child.type === CharTypeName) ? child.text : null;
            // Get image child, a new-line, or page-break
            if ((text === null) || (text === '\n') || (text === '\f')) {
                if (currentIndex === startIndex) { // Single child
                    word.push(child);
                    wordWidth += child.outerWidth;
                }
                break;
            }

            if (isWordWrap) {
                word.push(child);
                wordWidth += child.outerWidth;
                if (text === ' ') { // Word is end with a space character
                    break;
                }

                currentIndex++;

            } else if (isCharWrap) {  // Word only contains 1 character
                word.push(child);
                wordWidth += child.outerWidth;
                // Flush this 1 character
                break;

            } else if (isMixWrap) {
                if (!IsASCIIString(text)) {
                    if (!hasAnyASCIICharacter) {
                        word.push(child);
                        wordWidth += child.outerWidth;

                        // Is next child a space character?
                        var nextChild = children[currentIndex + 1];
                        if (nextChild &&
                            (nextChild.type === CharTypeName) &&
                            (nextChild.text === ' ')) {
                            word.push(nextChild);
                            wordWidth += nextChild.outerWidth;
                            // Include this space character
                        }
                        // Flush this 1 non-ascii character
                        break;

                    } else {
                        // Flush remainder children (all ascii character), except current child
                        break;

                    }
                } else {
                    word.push(child);
                    wordWidth += child.outerWidth;
                    if (text === ' ') { // Word is end with a space character
                        break;
                    }

                    currentIndex++;
                    hasAnyASCIICharacter = true;
                    // Test next child until ...
                }

            }
        }

        result.width = wordWidth;
        return result;
    };

    var GetChildrenAlign = function (children) {
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (child.align !== undefined) {
                return child.align;
            }
        }

        return undefined;
    };

    var OffsetChildren = function (children, offsetX, offsetY) {
        if ((offsetX === 0) && (offsetY === 0)) {
            return;
        }

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.renderable) {
                continue;
            }

            child.x += offsetX;
            child.y += offsetY;
        }
    };

    var AlignLines$1 = function (result, width, height) {
        var hAlign = result.hAlign,
            vAlign = result.vAlign,
            justifyPercentage = result.justifyPercentage;

        var lines = result.lines;
        var offsetX, offsetY;
        for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
            var line = lines[li];
            var lineWidth = line.width,
                children = line.children;

            var lineHAlign = GetChildrenAlign(children);
            if (lineHAlign === undefined) {
                lineHAlign = hAlign;
            }

            switch (lineHAlign) {
                case 0:
                case 'left':
                    offsetX = 0;
                    break;

                case 1:  // center
                case 'center':
                    var remainderWidth = width - lineWidth;
                    offsetX = remainderWidth / 2;
                    break;

                case 2:  // right
                case 'right':
                    var remainderWidth = width - lineWidth;
                    offsetX = remainderWidth;
                    break;

                case 3:
                case 'justify':
                case 'justify-left':
                    var remainderWidth = width - lineWidth;
                    var remainderPercentage = remainderWidth / width;
                    if (remainderPercentage < justifyPercentage) {
                        JustifyChildren(children, remainderWidth);
                        offsetX = 0;
                    } else {
                        offsetX = 0;
                    }
                    break;

                case 4:
                case 'justify-center':
                    var remainderWidth = width - lineWidth;
                    var remainderPercentage = remainderWidth / width;
                    if (remainderPercentage < justifyPercentage) {
                        JustifyChildren(children, remainderWidth);
                        offsetX = 0;
                    } else {
                        offsetX = remainderWidth / 2;
                    }
                    break;

                case 5:
                case 'justify-right':
                    var remainderWidth = width - lineWidth;
                    var remainderPercentage = remainderWidth / width;
                    if (remainderPercentage < justifyPercentage) {
                        JustifyChildren(children, remainderWidth);
                        offsetX = 0;
                    } else {
                        offsetX = remainderWidth;
                    }
                    break;

                default:
                    offsetX = 0;
                    break;
            }

            var linesHeight = result.linesHeight;
            switch (vAlign) {
                case 1: // center
                case 'center':
                    offsetY = (height - linesHeight) / 2;
                    break;

                case 2: // bottom
                case 'bottom':
                    offsetY = height - linesHeight;
                    break;

                default:
                    offsetY = 0;
                    break;
            }

            OffsetChildren(children, offsetX, offsetY);

        }

    };

    var JustifyChildren = function (children, remainderWidth) {
        var offset = remainderWidth / children.length;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.renderable) {
                continue;
            }

            child.x += offset * i;
        }
    };

    var GetDefaultTextHeight = function () {
        var metrics = this.defaultTextStyle.getTextMetrics(this.context, this.testString);
        var ascent, descent;
        if ('actualBoundingBoxAscent' in metrics) {
            ascent = metrics.actualBoundingBoxAscent;
            descent = metrics.actualBoundingBoxDescent;
        } else {
            ascent = 0;
            descent = 0;
        }
        
        Result.ascent = ascent;
        Result.descent = descent;
        Result.height = ascent + descent;

        return Result;
    };

    var Result = {};

    const GetValue$7 = Phaser.Utils.Objects.GetValue;

    var RunWordWrap$1 = function (config) {
        // Parse parameters
        var startIndex = GetValue$7(config, 'start', 0);

        SetPadding$1(this.wrapPadding, GetValue$7(config, 'padding', 0));
        var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
        var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

        // Get lineHeight, maxLines
        var lineHeight = GetValue$7(config, 'lineHeight');
        var ascent = GetValue$7(config, 'ascent', lineHeight);
        var maxLines;
        if (lineHeight === undefined) {
            // Calculate lineHeight
            var useDefaultTextHeight = GetValue$7(config, 'useDefaultTextHeight', false);
            maxLines = GetValue$7(config, 'maxLines', 0);
            if ((this.fixedHeight > 0) && (!useDefaultTextHeight)) {
                var innerHeight = this.fixedHeight - paddingVertical;
                if (maxLines > 0) {
                    // Calculate lineHeight via maxLines, in fixedHeight mode
                    lineHeight = innerHeight / maxLines;
                } else {
                    var textHeightResult = GetDefaultTextHeight.call(this);
                    lineHeight = textHeightResult.height;
                    ascent = textHeightResult.ascent;
                    // Calculate maxLines via (ascent, lineHeight), in fixedHeight mode
                    maxLines = Math.floor((innerHeight - ascent) / lineHeight);
                }
            } else {
                var textHeightResult = GetDefaultTextHeight.call(this);
                lineHeight = textHeightResult.height;
                ascent = textHeightResult.ascent;
            }

        } else {
            // Calculate maxLines
            if (this.fixedHeight > 0) {
                // Calculate maxLines via lineHeight, in fixedHeight mode
                maxLines = GetValue$7(config, 'maxLines');
                if (maxLines === undefined) {
                    var innerHeight = this.fixedHeight - paddingVertical;
                    maxLines = Math.floor(innerHeight / lineHeight);
                }
            } else {
                maxLines = GetValue$7(config, 'maxLines', 0); // Default is show all lines
            }

        }

        // If ascent is undefined, assign to lineHeight
        if (ascent === undefined) {
            ascent = lineHeight;
        }

        var showAllLines = (maxLines === 0);

        var wrapMode = GetValue$7(config, 'wrapMode');
        if (wrapMode === undefined) {
            var charWrap = GetValue$7(config, 'charWrap', false);
            wrapMode = (charWrap) ? 'char' : 'word';
        }
        if (typeof (wrapMode) === 'string') {
            wrapMode = WRAPMODE[wrapMode];
        }

        // Get wrapWidth
        var wrapWidth = GetValue$7(config, 'wrapWidth', undefined);
        if (wrapWidth === undefined) {
            if (this.fixedWidth > 0) {
                wrapWidth = this.fixedWidth - paddingHorizontal;
            } else {
                wrapWidth = Infinity; // No word-wrap
                wrapMode = 0;
            }
        }

        var letterSpacing = GetValue$7(config, 'letterSpacing', 0);

        var hAlign = GetValue$7(config, 'hAlign', 0);
        var vAlign = GetValue$7(config, 'vAlign', 0);
        var justifyPercentage = GetValue$7(config, 'justifyPercentage', 0.25);

        var result = CreateWrapResultData({
            // Override properties
            callback: 'runWordWrap',
            start: startIndex,  // Next start index
            padding: this.wrapPadding,
            letterSpacing: letterSpacing,
            maxLines: maxLines,
            hAlign: hAlign,
            vAlign: vAlign,
            justifyPercentage: justifyPercentage,

            // Specific properties
            ascent: ascent,
            lineHeight: lineHeight,
            wrapWidth: wrapWidth,
            wrapMode: wrapMode,
        });

        // Set all children to inactive
        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setActive(false);
        }

        // Layout children
        wrapWidth += letterSpacing;
        var startX = this.padding.left + this.wrapPadding.left,
            startY = this.padding.top + this.wrapPadding.top + ascent,  // Start(baseline) from ascent, not 0
            x = startX,
            y = startY;
        var remainderWidth = wrapWidth,
            childIndex = startIndex,
            lastChildIndex = children.length;
        var resultChildren = result.children;
        var resultLines = result.lines,
            lastLine = [], lastLineWidth = 0, maxLineWidth = 0;
        var wordResult;
        var isPageBreakChar = false;
        while (childIndex < lastChildIndex) {
            wordResult = GetWord(children, childIndex, wrapMode, wordResult);
            var word = wordResult.word;
            var charCnt = word.length;
            var wordWidth = wordResult.width + (charCnt * letterSpacing);

            childIndex += charCnt;
            // Next line
            var isNewLineChar = IsNewLineChar(word[0]);
            isPageBreakChar = IsPageBreakChar(word[0]);
            var isControlChar = isNewLineChar || isPageBreakChar;
            if ((remainderWidth < wordWidth) || isControlChar) {
                // Add to result
                if (isControlChar) {
                    var char = word[0];
                    char.setActive().setPosition(x, y);
                    resultChildren.push(char);
                    lastLine.push(char);
                }

                // Move cursor
                x = startX;
                y += lineHeight;
                remainderWidth = wrapWidth;
                resultLines.push({ children: lastLine, width: lastLineWidth });
                maxLineWidth = Math.max(maxLineWidth, lastLineWidth);

                lastLineWidth = 0;
                lastLine = [];

                var isPageEnd = isPageBreakChar ||
                    (!showAllLines && (resultLines.length === maxLines)); // Exceed maxLines
                if (isPageEnd) {
                    break;
                } else if (isControlChar) {  // Already add to result
                    continue;
                }
            }
            remainderWidth -= wordWidth;
            lastLineWidth += wordWidth;

            for (var i = 0, cnt = word.length; i < cnt; i++) {
                var child = word[i];
                child.setActive();
                resultChildren.push(child);
                lastLine.push(child);

                if (child.renderable) {
                    child.setPosition(x, y);
                    x += (child.outerWidth + letterSpacing);
                }
            }
        }

        if (lastLine.length > 0) {
            resultLines.push({ children: lastLine, width: lastLineWidth });
            maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
        }

        result.start += resultChildren.length;
        result.isLastPage = (!isPageBreakChar) && (result.start === lastChildIndex);
        result.maxLineWidth = maxLineWidth;
        result.linesHeight = (resultLines.length * lineHeight);

        // Calculate size of game object
        var width = (this.fixedWidth > 0) ? this.fixedWidth : (result.maxLineWidth + paddingHorizontal);
        var height = (this.fixedHeight > 0) ? this.fixedHeight : (result.linesHeight + paddingVertical);

        // Size might be changed after wrapping
        var innerWidth = width - paddingHorizontal;
        var innerHeight = height - paddingVertical;
        AlignLines$1(result, innerWidth, innerHeight);

        // Resize
        this.setCanvasSize(width, height);

        // Set initial position
        for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
            var child = resultChildren[i];
            if (!child.renderable) {
                continue;
            }
            child.x0 = child.x;
            child.y0 = child.y;
        }

        return result;
    };

    const Merge$1 = Phaser.Utils.Objects.Merge;

    var RunWordWrap = function (config) {
        if (config === undefined) {
            config = {};
        }

        return RunWordWrap$1.call(this, Merge$1(config, this.wrapConfig));
    };

    var AlignLines = function (result, width, height) {
        var hAlign = result.hAlign,
            vAlign = result.vAlign;

        var offsetX, offsetY;

        var rtl = result.rtl;
        var lines = result.lines,
            lineWidth = result.lineWidth,
            linesWidth = result.linesWidth;
        switch (hAlign) {
            case 1:  // center
            case 'center':
                offsetX = (width - linesWidth) / 2;
                break;

            case 2:  // right
            case 'right':
                offsetX = width - linesWidth;
                break;

            default:  // left
                offsetX = 0;
                break;
        }
        if (rtl) {
            offsetX += lineWidth;
        }

        for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
            var line = lines[(rtl) ? (lcnt - li - 1) : li];
            var children = line.children;
            var lineHeight = line.height;

            var lineVAlign = GetChildrenAlign(children);
            if (lineVAlign === undefined) {
                lineVAlign = vAlign;
            }

            switch (lineVAlign) {
                case 1: // center
                case 'center':
                    offsetY = (height - lineHeight) / 2;
                    break;

                case 2: // bottom
                case 'bottom':
                    offsetY = height - lineHeight;
                    break;

                default: // top
                    offsetY = 0;
                    break;
            }

            OffsetChildren(children, offsetX, offsetY);

            offsetX += lineWidth;
        }
    };

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    var RunVerticalWrap$1 = function (config) {
        // Parse parameters
        var startIndex = GetValue$6(config, 'start', 0);

        SetPadding$1(this.wrapPadding, GetValue$6(config, 'padding', 0));
        var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
        var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

        var lineWidth = GetValue$6(config, 'lineWidth', undefined);
        var maxLines;
        if (lineWidth === undefined) {
            // Calculate lineWidth via maxLines, in fixedWidth mode
            maxLines = GetValue$6(config, 'maxLines', 0);
            if (this.fixedWidth > 0) {
                var innerWidth = this.fixedWidth - paddingHorizontal;
                lineWidth = innerWidth / maxLines;
            } else {
                lineWidth = 0;
            }
        } else {
            if (this.fixedWidth > 0) {
                // Calculate maxLines via lineWidth, in fixedWidth mode
                maxLines = GetValue$6(config, 'maxLines', undefined);
                if (maxLines === undefined) {
                    var innerWidth = this.fixedWidth - paddingHorizontal;
                    maxLines = Math.floor(innerWidth / lineWidth) + 1;
                }
            } else {
                maxLines = GetValue$6(config, 'maxLines', 0); // Default is show all lines
            }

        }
        var showAllLines = (maxLines === 0);

        // Get fixedCharacterHeight
        var fixedCharacterHeight = GetValue$6(config, 'fixedCharacterHeight', undefined);
        if (fixedCharacterHeight === undefined) {
            var charPerLine = GetValue$6(config, 'charPerLine', undefined);
            if (charPerLine !== undefined) {
                var innerHeight = this.fixedHeight - paddingVertical;
                fixedCharacterHeight = Math.floor(innerHeight / charPerLine);
            }
        }

        // Get wrapHeight
        var wrapHeight = GetValue$6(config, 'wrapHeight', undefined);
        if (wrapHeight === undefined) {
            if (this.fixedHeight > 0) {
                wrapHeight = this.fixedHeight - paddingVertical;
            } else {
                wrapHeight = Infinity; // No word-wrap
            }
        }

        var letterSpacing = GetValue$6(config, 'letterSpacing', 0);

        var rtl = GetValue$6(config, 'rtl', true);
        var hAlign = GetValue$6(config, 'hAlign', rtl ? 2 : 0);
        var vAlign = GetValue$6(config, 'vAlign', 0);

        var result = CreateWrapResultData({
            // Override properties
            callback: 'runVerticalWrap',
            start: startIndex,  // Next start index
            padding: this.wrapPadding,
            letterSpacing: letterSpacing,
            maxLines: maxLines,
            hAlign: hAlign,
            vAlign: vAlign,

            // Specific properties
            lineWidth: lineWidth,
            fixedCharacterHeight: fixedCharacterHeight,
            wrapHeight: wrapHeight,        
            rtl: rtl,
        });

        // Set all children to active
        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setActive(false);
        }

        // Layout children
        wrapHeight += letterSpacing;
        var startX = this.padding.left + this.wrapPadding.left,  // Reset x of each character in AlignLines method
            startY = this.padding.top + this.wrapPadding.top,
            x = startX,
            y = startY;
        var remainderHeight = wrapHeight,
            childIndex = startIndex,
            lastChildIndex = children.length;
        var resultChildren = result.children;
        var resultLines = result.lines,
            lastLine = [], lastLineHeight = 0, maxLineHeight = 0;
        while (childIndex < lastChildIndex) {
            // Append non-typeable child directly
            var child = children[childIndex];
            childIndex++;
            if (!child.renderable) {
                child.setActive();
                resultChildren.push(child);
                lastLine.push(child);
                continue;
            }

            var childHeight = ((fixedCharacterHeight !== undefined) ? fixedCharacterHeight : child.height) + letterSpacing;
            // Next line
            var isNewLineChar = IsNewLineChar(child);
            var isPageBreakChar = IsPageBreakChar(child);
            var isControlChar = isNewLineChar || isPageBreakChar;
            if ((remainderHeight < childHeight) || isControlChar) {
                // Add to result
                if (isNewLineChar) {
                    child.setActive().setPosition(x, y).setOrigin(0.5);
                    resultChildren.push(child);
                    lastLine.push(child);
                }

                // Move cursor
                x = startX;
                y = startY;
                remainderHeight = wrapHeight;
                resultLines.push({ children: lastLine, height: lastLineHeight });
                maxLineHeight = Math.max(maxLineHeight, lastLineHeight);

                lastLineHeight = 0;
                lastLine = [];

                var isPageEnd = isPageBreakChar ||
                    (!showAllLines && (resultLines.length === maxLines)); // Exceed maxLines
                if (isPageEnd) {
                    break;
                } else if (isControlChar) {  // Already add to result                
                    continue;
                }
            }
            remainderHeight -= childHeight;
            lastLineHeight += childHeight;

            child.setActive().setPosition(x, y).setOrigin(0.5);
            resultChildren.push(child);
            lastLine.push(child);
            y += childHeight;
        }

        if (lastLine.length > 0) {
            resultLines.push({ children: lastLine, height: lastLineHeight });
            maxLineHeight = Math.max(maxLineHeight, lastLineHeight);
        }

        result.start += resultChildren.length;
        result.isLastPage = (result.start === lastChildIndex);
        result.maxLineHeight = maxLineHeight;
        result.linesWidth = (resultLines.length * lineWidth);

        // Calculate size of game object
        var width = (this.fixedWidth > 0) ? this.fixedWidth : (result.linesWidth + paddingHorizontal);
        var height = (this.fixedHeight > 0) ? this.fixedHeight : (result.maxLineHeight + paddingVertical);

        // Size might be changed after wrapping
        var innerWidth = width - paddingHorizontal;
        var innerHeight = height - paddingVertical;
        AlignLines(result, innerWidth, innerHeight);

        // Resize
        this.setCanvasSize(width, height);

        // Set initial position
        for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
            var child = resultChildren[i];
            if (!child.renderable) {
                continue;
            }
            child.x0 = child.x;
            child.y0 = child.y;
        }

        return result;
    };

    const Merge = Phaser.Utils.Objects.Merge;

    var RunVerticalWrap = function (config) {
        if (config === undefined) {
            config = {};
        }

        return RunVerticalWrap$1.call(this, Merge(config, this.wrapConfig));
    };

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    var RunWrap = function (config) {
        var wrapCallback = GetValue$5(this.wrapConfig, 'callback');
        if (!wrapCallback) {
            wrapCallback = GetValue$5(config, 'callback', this.runWordWrap);
        }
        if (typeof (wrapCallback) === 'string') {
            wrapCallback = this[wrapCallback];
        }

        return wrapCallback.call(this, config);
    };

    var SetAlignMethods = {
        setVAlign(align) {
            this.wrapConfig.vAlign = align;
            return this;
        },

        setHAlign(align) {
            this.wrapConfig.hAlign = align;
            return this;
        }
    };

    var SetTextOXYMethods = {
        setTextOX(ox) {
            if (ox === this._textOX) {
                return this;
            }

            this._textOX = ox;
            return this;
        },

        setTextOY(oy) {
            if (oy === this._textOY) {
                return this;
            }

            this._textOY = oy;
            return this;
        },

        setTextOXY(ox, oy) {
            if ((ox === this._textOX) && (oy === this._textOY)) {
                return;
            }

            this._textOX = ox;
            this._textOY = oy;
            return this;
        },

        addTextOX(incX) {
            this.setTextOX(this._textOX + incX);
            return this;
        },

        addTextOY(incY) {
            this.setTextOY(this._textOY + incY);
            return this;
        },

        addTextOXY(incX, incY) {
            this.setTextOXY(this._textOX + incX, this._textOY + incY);
            return this;
        }

    };

    var RenderContent = function () {
        this.clear();

        this.setCanvasSize(this.width, this.height);

        if (this.background.active) {
            this.background.render();
        }

        var child;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            child = this.children[i];
            if (child.active) {
                child.render();
            }
        }

        if (this.innerBounds.active) {
            this.innerBounds.render();
        }
    };

    var ForEachChild = function (callback, scope, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children.filter(function (child) {
            if (activeOnly && !child.active) {
                return false;
            }
            return true;
        });

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, i, children);
            } else {
                isBreak = callback(child, i, children);
            }

            if (isBreak) {
                break;
            }
        }

        return this;
    };

    var ForEachRenderableChild = function (callback, scope, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children.filter(function (child) {
            if (activeOnly && !child.active) {
                return false;
            }
            if (!child.renderable || child.removed) {
                return false;
            }

            return true;
        });

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, i, children);
            } else {
                isBreak = callback(child, i, children);
            }

            if (isBreak) {
                break;
            }
        }

        return this;
    };

    var ForEachCharChild = function (callback, scope, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children.filter(function (child) {
            if (activeOnly && !child.active) {
                return false;
            }
            if (!IsChar(child) || child.removed) {
                return false;
            }

            return true;
        });

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, i, children);
            } else {
                isBreak = callback(child, i, children);
            }

            if (isBreak) {
                break;
            }
        }

        return this;
    };

    var GetChildren = function () {
        return this.children;
    };

    const GetAll = Phaser.Utils.Array.GetAll;

    var GetActiveChildren = function () {
        return GetAll(this.children, 'active', true);
    };

    var GetCharChildren = function (activeOnly, out) {
        if (out === undefined) {
            out = [];
        }

        this.forEachCharChild(function (child) {
            out.push(child);
        }, undefined, activeOnly);

        return out;
    };

    var GetLastAppendedChildren = function () {
        return this.lastAppendedChildren;
    };

    var GetBobCenterPosition = function (bob, offsetX, offsetY, out) {
        if (typeof (offsetX) !== 'number') {
            out = offsetX;
            offsetX = 0;
            offsetY = 0;
        }
        var bobX = bob.drawCenterX + offsetX;
        var bobY = bob.drawCenterY + offsetY;
        return BobPositionToCanvasPosition(bob, bobX, bobY, out);
    };

    const GetDistance = Phaser.Math.Distance.BetweenPointsSquared;

    var GetNearestChild = function (canvasX, canvasY) {
        var pointA = { x: canvasX, y: canvasY };

        var minDistance = Infinity;
        var nearestChild = null;
        this.forEachRenderableChild(function (child) {
            var distance = GetDistance(pointA, GetBobCenterPosition(child, true));
            if (minDistance > distance) {
                minDistance = distance;
                nearestChild = child;
            }
        });

        return nearestChild;
    };

    var GetCharWorldPosition = function (child, offsetX, offsetY, out) {
        if (typeof (child) === 'number') {
            child = this.getCharChild(child, true);
        }

        return GetBobWorldPosition(this, child, offsetX, offsetY, out);
    };

    var SetToMinSize = function () {
        var children = this.children;
        var maxX = 0,
            maxY = 0;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.renderable || !child.active || !child.visible) {
                continue;
            }

            var x0 = (child.x0 !== undefined) ? child.x0 : child.x;
            var y0 = (child.y0 !== undefined) ? child.y0 : child.y;
            maxX = Math.max(maxX, x0);
            maxY = Math.max(maxY, y0);
        }

        var width = maxX + this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
        var height = maxY + this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;

        // Ignore fixedWidth, and fixedHeight
        if ((this.width !== width) || (this.height !== height)) {
            this.dirty = true;
            this.setCanvasSize(width, height);
        }
        return this;
    };

    var GetCharChildIndex = function (charIndex, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (activeOnly && !child.active) {
                continue;
            }

            if (IsChar(child) && !child.removed) {
                if (charIndex === 0) {
                    return i;
                } else {
                    charIndex--;
                }
            }
        }

        return undefined;
    };

    var GetCharChild = function (charIndex, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (activeOnly && !child.active) {
                continue;
            }

            if (IsChar(child) && !child.removed) {
                if (charIndex === 0) {
                    return child;
                } else {
                    charIndex--;
                }
            }
        }

        return undefined;
    };

    var GetCharIndex = function (childIndex, activeOnly) {
        if (typeof (childIndex) !== 'number') {
            childIndex = this.children.indexOf(childIndex);
            if (childIndex < 0) {
                return null;
            }
        }

        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children;
        if (childIndex >= children.length) {
            childIndex = children.length;
        }
        var charIndex = 0;
        for (var i = 0; i < childIndex; i++) {
            var child = children[i];
            if (activeOnly && !child.active) {
                continue;
            }

            if (IsChar(child) && !child.removed) {
                charIndex++;
            }
        }

        return charIndex;
    };

    var SetChildrenInteractiveEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }

        if (this.childrenInteractiveEnable !== enable) {
            this.lastOverChild = null;
        }

        this.childrenInteractiveEnable = enable;

        return this;
    };

    var GetFirstChildContains = function (children, x, y) {
        var children = children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.active || !child.renderable) {
                continue;
            }
            if (child.contains(x, y)) {
                return child;
            }
        }
        return null;
    };

    var SetChildrenInteractive = function () {
        this
            .on('pointerdown', OnPointerDown, this)

            .on('pointerdown', OnPointerUp, this)

            .on('pointermove', OnPointOverOut, this)
            .on('pointerover', OnPointOverOut, this)
            .on('pointerout', function (pointer, event) {
                OnPointOverOut.call(this, pointer, null, null, event);
            }, this);

        return this;
    };

    var OnPointerDown = function (pointer, localX, localY, event) {
        if (!this.childrenInteractiveEnable) {
            return;
        }

        var child = GetFirstChildContains(this.children, localX, localY);
        if (!child) {
            return;
        }

        this.emit('child.pointerdown', child, pointer, localX, localY, event);
    };

    var OnPointerUp = function (pointer, localX, localY, event) {
        if (!this.childrenInteractiveEnable) {
            return;
        }

        var child = GetFirstChildContains(this.children, localX, localY);
        if (!child) {
            return;
        }

        this.emit('child.pointerup', child, pointer, localX, localY, event);
    };

    var OnPointOverOut = function (pointer, localX, localY, event) {
        if (!this.childrenInteractiveEnable) {
            return;
        }

        if (localX === null) {  // Case of pointerout
            if (this.lastOverChild !== null) {
                this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
                this.lastOverChild = null;
            }
            return;
        }

        var child = GetFirstChildContains(this.children, localX, localY);
        if (child === this.lastOverChild) {
            return;
        }

        if (this.lastOverChild !== null) {
            this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
        }

        if (child !== null) {
            this.emit('child.pointerover', child, pointer, localX, localY, event);
        }

        this.lastOverChild = child;
    };

    const GameObject = Phaser.GameObjects.GameObject;

    var SetInteractive = function (hitArea, hitAreaCallback, dropZone) {
        var isInteractived = !!this.input;

        GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

        if (!isInteractived) {
            SetChildrenInteractive.call(this);
        }

        return this;
    };

    const BringToTop = Phaser.Utils.Array.BringToTop;
    const SendToBack = Phaser.Utils.Array.SendToBack;
    const MoveUp = Phaser.Utils.Array.MoveUp;
    const MoveDown = Phaser.Utils.Array.MoveDown;
    const MoveAbove = Phaser.Utils.Array.MoveAbove;
    const MoveBelow = Phaser.Utils.Array.MoveBelow;

    var MoveChildMethods = {
        moveChildToFist(child) {
            SendToBack(this.children, child);
            return this;
        },

        moveChildToLast(child) {
            BringToTop(this.children, child);
            return this;
        },
        movechildUp(child) {
            MoveUp(this.children, child);
            return this;
        },

        movechildDown(child) {
            MoveDown(this.children, child);
            return this;
        },

        movechildAbove(child, baseChild) {
            MoveAbove(this.children, child, baseChild);
            return this;
        },

        movechildBelow(child, baseChild) {
            MoveBelow(this.children, child, baseChild);
            return this;
        },

    };

    var BackgroundMethods = {
        setBackgroundColor(color, color2, isHorizontalGradient) {
            this.background.setColor(color, color2, isHorizontalGradient);
            return this;
        },

        setBackgroundStroke(color, lineWidth) {
            this.background.setStroke(color, lineWidth);
            return this;
        },

        setBackgroundCornerRadius(radius, iteration) {
            this.background.setCornerRadius(radius, iteration);
            return this;
        }
    };

    var InnerBoundsMethods = {
        setInnerBoundsColor(color, color2, isHorizontalGradient) {
            this.innerBounds.setColor(color, color2, isHorizontalGradient);
            return this;
        },

        setInnerBoundsStroke(color, lineWidth) {
            this.innerBounds.setStroke(color, lineWidth);
            return this;
        },
    };

    var Methods$3 = {
        setFixedSize: SetFixedSize,
        setPadding: SetPadding,
        getPadding: GetPadding,
        modifyTextStyle: ModifyTextStyle,
        modifyDefaultTextStyle: ModifyDefaultTextStyle,
        resetTextStyle: ResetTextStyle,
        setTestString: SetTestString,

        removeChild: RemoveChild,
        removeChildren: RemoveChildren,
        popChild: PopChild,
        clearContent: ClearContent,
        addChild: AddChild,
        createCharChild: CreateCharChild,
        createCharChildren: CreateCharChildren,
        setText: SetText,
        appendText: AppendText,
        insertText: InsertText,
        removeText: RemoveText,
        getText: GetText,
        createImageChild: CreateImageChild,
        appendImage: AppendImage,
        createDrawerChild: CreateDrawerChild,
        appendDrawer: AppendDrawer,
        createSpaceChild: CreateSpaceChild,
        appendSpace: AppendSpace,
        createCommandChild: CreateCommandChild,
        appendCommand: AppendCommand$3,

        setWrapConfig: SetWrapConfig,
        runWordWrap: RunWordWrap,
        runVerticalWrap: RunVerticalWrap,
        runWrap: RunWrap,
        renderContent: RenderContent,

        forEachChild: ForEachChild,
        forEachRenderableChild: ForEachRenderableChild,
        forEachCharChild: ForEachCharChild,
        getChildren: GetChildren,
        getActiveChildren: GetActiveChildren,
        getCharChildren: GetCharChildren,
        getLastAppendedChildren: GetLastAppendedChildren,
        getNearestChild: GetNearestChild,
        getCharWorldPosition: GetCharWorldPosition,

        setToMinSize: SetToMinSize,

        getCharChildIndex: GetCharChildIndex,
        getCharChild: GetCharChild,
        getCharIndex: GetCharIndex,


        setChildrenInteractiveEnable: SetChildrenInteractiveEnable,
        setInteractive: SetInteractive,
    };

    Object.assign(
        Methods$3,

        MoveChildMethods,
        BackgroundMethods,
        InnerBoundsMethods,
        SetAlignMethods,
        SetTextOXYMethods,

    );

    const GetFastValue = Phaser.Utils.Objects.GetFastValue;

    var Pools = {};
    class PoolManager {
        constructor(config) {
            this.pools = GetFastValue(config, 'pools', Pools);
        }

        free(bob) {
            if (!this.pools) {
                return this;
            }

            var bobType = bob.type;
            if (!this.pools.hasOwnProperty(bobType)) {
                this.pools[bobType] = new Stack();
            }
            this.pools[bobType].push(bob);
            bob.onFree();
            return this;
        }

        freeMultiple(arr) {
            if (!this.pools) {
                return this;
            }

            for (var i = 0, cnt = arr.length; i < cnt; i++) {
                this.free(arr[i]);
            }
            return this;
        }

        allocate(bobType) {
            if (!this.pools || !this.pools.hasOwnProperty(bobType)) {
                return null;
            }
            return this.pools[bobType].pop();
        }
    }

    const IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    class DynamicText extends Canvas {
        constructor(scene, x, y, fixedWidth, fixedHeight, resolution, config) {
            if (IsPlainObject$2(x)) {
                config = x;
                x = GetValue$4(config, 'x', 0);
                y = GetValue$4(config, 'y', 0);
                fixedWidth = GetValue$4(config, 'width', 0);
                fixedHeight = GetValue$4(config, 'height', 0);
                resolution = GetValue$4(config, 'resolution', 1);
            } else if (IsPlainObject$2(fixedWidth)) {
                config = fixedWidth;
                fixedWidth = GetValue$4(config, 'width', 0);
                fixedHeight = GetValue$4(config, 'height', 0);
                resolution = GetValue$4(config, 'resolution', 1);
            } else if (IsPlainObject$2(resolution)) {
                config = resolution;
                resolution = GetValue$4(config, 'resolution', 1);
            }

            var width = (fixedWidth === 0) ? 1 : fixedWidth;
            var height = (fixedHeight === 0) ? 1 : fixedHeight;
            super(scene, x, y, width, height, resolution);
            this.type = 'rexDynamicText';
            this.autoRound = true;
            this.padding = SetPadding$1();
            this.wrapPadding = SetPadding$1();

            var textStyleConfig = GetValue$4(config, 'style', undefined);
            this.defaultTextStyle = new TextStyle(null, textStyleConfig);
            this.textStyle = this.defaultTextStyle.clone();
            this.setTestString(GetValue$4(config, 'testString', '|MÉqgy'));

            this._textOX = 0;
            this._textOY = 0;
            this.background = new Background(this, GetValue$4(config, 'background', undefined));
            this.innerBounds = new InnerBounds(this, GetValue$4(config, 'innerBounds', undefined));
            this.children = [];
            this.lastAppendedChildren = [];
            this.lastOverChild = null;
            this.poolManager = new PoolManager(config);

            this.setFixedSize(fixedWidth, fixedHeight);
            this.setPadding(GetValue$4(config, 'padding', 0));
            this.setWrapConfig(GetValue$4(config, 'wrap', undefined));
            this.setChildrenInteractiveEnable(GetValue$4(config, 'childrenInteractive', false));

            var text = GetValue$4(config, 'text', undefined);
            if (text) {
                this.setText(text);
            }
        }

        updateTexture() {
            super.updateTexture(function () {
                this.renderContent();
            }, this);
            return this;
        }

        get text() {
            return this.getText(true);
        }

        set text(value) {
            this.setText(value);
        }

        setSize(width, height) {
            this.setFixedSize(width, height);
            return this;
        }

        get textOX() {
            return this._textOX;
        }

        set textOX(value) {
            this.setTextOX(value);
        }

        get textOY() {
            return this._textOY;
        }

        set textOY(value) {
            this.setTextOY(value);
        }
    }

    Object.assign(
        DynamicText.prototype,
        Methods$3
    );

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

    class EventEmitter extends EE {
        shutdown() {
            this.removeAllListeners();
        }
        destroy() {
            this.removeAllListeners();
        }
    }

    var EventEmitterMethods = {
        setEventEmitter(eventEmitter, EventEmitterClass) {
            if (EventEmitterClass === undefined) {
                EventEmitterClass = EventEmitter;
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
            this.setEventEmitter(GetValue$f(config, 'eventEmitter', undefined));

            // Value convert
            this.setValueConverter(GetValue$f(config, 'valueConvert', true));
            // Loop
            this.setLoopEnable(GetValue$f(config, 'loop', false));

            // Brackets and generate regex
            this.setMultipleLinesTagEnable(GetValue$f(config, 'multipleLinesTag', false));
            var delimiters = GetValue$f(config, 'delimiters', '<>');
            this.setDelimiters(delimiters[0], delimiters[1]);

            // Translate tagName callback
            this.setTranslateTagNameCallback(GetValue$f(config, 'translateTagNameCallback'));

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
            this.setTagExpression(GetValue$f(config, 'regex.tag', undefined));
            this.setValueExpression(GetValue$f(config, 'regex.value', undefined));
            // Brackets and generate regex
            var delimiters = GetValue$f(config, 'delimiters', '<>');
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

    var OnParseColorTag = function (textPlayer, parser, config) {
        var tagName = 'color';
        var defaultColor;
        parser
            .on('start', function () {
                defaultColor = textPlayer.textStyle.color;
            })
            .on(`+${tagName}`, function (color) {
                textPlayer.textStyle.setColor(color);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setColor(defaultColor);
                parser.skipEvent();
            })
            .on('complete', function () {
                textPlayer.textStyle.setColor(defaultColor);
            });
    };

    var OnParseStrokeColorTag = function (textPlayer, parser, config) {
        var tagName = 'stroke';
        var defaultStroke;
        parser
            .on('start', function () {
                defaultStroke = textPlayer.textStyle.stroke;
                textPlayer.textStyle.setStrokeStyle(null);
            })
            .on(`+${tagName}`, function (color) {
                if (color === undefined) {
                    color = defaultStroke;
                }
                textPlayer.textStyle.setStrokeStyle(color);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setStrokeStyle(null);
                parser.skipEvent();
            })
            .on('complete', function () {
                textPlayer.textStyle.setStrokeStyle(defaultStroke);
            });
    };

    var OnParseBoldTag = function (textPlayer, parser, config) {
        var tagName = 'b';
        parser
            .on('start', function () {
                textPlayer.textStyle.setBold(false);
            })
            .on(`+${tagName}`, function () {
                textPlayer.textStyle.setBold(true);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setBold(false);
                parser.skipEvent();
            });
    };

    var OnParseItalicTag = function (textPlayer, parser, config) {
        var tagName = 'i';
        parser
            .on('start', function () {
                textPlayer.textStyle.setItalic(false);
            })
            .on(`+${tagName}`, function () {
                textPlayer.textStyle.setItalic(true);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setItalic(false);
                parser.skipEvent();
            });
    };

    var OnParseFontSizeTag = function (textPlayer, parser, config) {
        var tagName = 'size';
        var defaultFontSize;
        parser
            .on('start', function () {
                defaultFontSize = textPlayer.textStyle.fontSize;
            })
            .on(`+${tagName}`, function (fontSize) {
                textPlayer.textStyle.setFontSize(fontSize);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setFontSize(defaultFontSize);
                parser.skipEvent();
            })
            .on('complete', function () {
                textPlayer.textStyle.setFontSize(defaultFontSize);
            });
    };

    var OnParseOffsetYTag = function (textPlayer, parser, config) {
        var tagName = 'y';
        var defaultOffsetY;
        parser
            .on('start', function () {
                defaultOffsetY = textPlayer.textStyle.offsetY;
                textPlayer.textStyle.setOffsetY(0);
            })
            .on(`+${tagName}`, function (y) {
                if (y === undefined) {
                    y = defaultOffsetY;
                }
                textPlayer.textStyle.setOffsetY(y);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setOffsetY(0);
                parser.skipEvent();
            })
            .on('complete', function () {
                textPlayer.textStyle.setOffsetY(0);
            });
    };

    var OnParseOffsetXTag = function (textPlayer, parser, config) {
        var tagName = 'x';
        var defaultOffsetX;
        parser
            .on('start', function () {
                defaultOffsetX = textPlayer.textStyle.offsetY;
                textPlayer.textStyle.setOffsetX(0);
            })
            .on(`+${tagName}`, function (y) {
                if (y === undefined) {
                    y = defaultOffsetX;
                }
                textPlayer.textStyle.setOffsetX(y);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setOffsetX(0);
                parser.skipEvent();
            })
            .on('complete', function () {
                textPlayer.textStyle.setOffsetX(0);
            });
    };

    var OnParseLeftSpaceTag = function (textPlayer, parser, config) {
        var tagName = 'left';
        var defaultLeftSpace;
        parser
            .on('start', function () {
                defaultLeftSpace = textPlayer.textStyle.leftSpace;
                textPlayer.textStyle.setLeftSpace(0);
            })
            .on(`+${tagName}`, function (space) {
                if (space === undefined) {
                    space = defaultLeftSpace;
                }
                textPlayer.textStyle.setLeftSpace(space);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setLeftSpace(0);
                parser.skipEvent();
            })
            .on('complete', function () {
                textPlayer.textStyle.setLeftSpace(0);
            });
    };

    var OnParseRightSpaceTag = function (textPlayer, parser, config) {
        var tagName = 'right';
        var defaultRightSpace;
        parser
            .on('start', function () {
                defaultRightSpace = textPlayer.textStyle.rightSpace;
                textPlayer.textStyle.setRightSpace(0);
            })
            .on(`+${tagName}`, function (space) {
                if (space === undefined) {
                    space = defaultRightSpace;
                }
                textPlayer.textStyle.setRightSpace(space);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setRightSpace(0);
                parser.skipEvent();
            })
            .on('complete', function () {
                textPlayer.textStyle.setRightSpace(0);
            });
    };

    var OnParseShadowColorTag = function (textPlayer, parser, config) {
        var tagName = 'shadow';
        var defaultShadowColor;
        parser
            .on('start', function () {
                defaultShadowColor = textPlayer.textStyle.shadowColor;
                textPlayer.textStyle.setShadowColor(null);
            })
            .on(`+${tagName}`, function (color) {
                if (color === undefined) {
                    color = defaultShadowColor;
                }
                textPlayer.textStyle.setShadowColor(color);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setShadowColor(null);
                parser.skipEvent();
            })
            .on('complete', function () {
                textPlayer.textStyle.setShadowColor(defaultShadowColor);
            });
    };

    var OnParseAlignTag = function (textPlayer, parser, config) {
        var tagName = 'align';
        parser
            .on(`+${tagName}`, function (align) {
                textPlayer.textStyle.setAlign(align);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                textPlayer.textStyle.setAlign();
                parser.skipEvent();
            })
            .on('complete', function () {
                textPlayer.textStyle.setAlign();
            });
    };

    var OnParseImageTag$1 = function (textPlayer, parser, config) {
        var tagName = 'img';
        parser
            .on(`+${tagName}`, function (name) {
                var imgData = textPlayer.imageManager.get(name);
                if (imgData) {
                    AppendImage.call(textPlayer,
                        imgData.key, imgData.frame,
                        {
                            width: imgData.width,
                            hieght: imgData.height,
                            leftSpace: imgData.left,
                            rightSpace: imgData.right,
                            color: (imgData.tintFill) ? textPlayer.textStyle.color : undefined,
                        }
                    );
                }
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseImageTag = function (textPlayer, parser, config) {
        var tagName = 'space';
        parser
            .on(`+${tagName}`, function (width) {
                AppendSpace.call(textPlayer,
                    width
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParseTypingSpeedTag = function (textPlayer, parser, config) {
        var tagName = 'speed';
        parser
            .on(`+${tagName}`, function (speed) {
                AppendCommand$2(textPlayer, speed);
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                AppendCommand$2(textPlayer, undefined);
                parser.skipEvent();
            });
    };

    var SetTypingSpeed = function (speed) {
        this.typeWriter.setTypingSpeed(speed);  // this: textPlayer
    };

    var AppendCommand$2 = function (textPlayer, speed) {
        AppendCommand$3.call(textPlayer,
            'speed',         // name
            SetTypingSpeed,  // callback
            speed,           // params
            textPlayer,      // scope
        );
    };

    var OnParsePlaySoundEffectTag = function (textPlayer, parser, config) {
        var tagName = 'se';
        parser
            .on(`+${tagName}`, function (name, fadeInTime) {
                AppendCommand$3.call(textPlayer,
                    tagName,              // name
                    PlaySoundEffect,      // callback
                    [name, fadeInTime],   // params
                    textPlayer,           // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2';
        parser
            .on(`+${tagName}`, function (name, fadeInTime) {
                AppendCommand$3.call(textPlayer,
                    tagName,              // name
                    PlaySoundEffect2,      // callback
                    [name, fadeInTime],   // params
                    textPlayer,           // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var PlaySoundEffect = function (params) {
        if (this.skipSoundEffect) {
            return;
        }

        var name = params[0];
        var fadeInTime = params[1];

        this.soundManager.playSoundEffect(name);  // this: textPlayer
        if (fadeInTime) {
            this.soundManager.fadeInSoundEffect(fadeInTime);
        }
    };

    var PlaySoundEffect2 = function (params) {
        if (this.skipSoundEffect) {
            return;
        }

        var name = params[0];
        var fadeInTime = params[1];

        this.soundManager.playSoundEffect2(name);  // this: textPlayer
        if (fadeInTime) {
            this.soundManager.fadeInSoundEffect2(fadeInTime);
        }
    };

    var OnParseFadeInSoundEffectTag = function (textPlayer, parser, config) {
        var tagName = 'se.fadein';
        parser
            .on(`+${tagName}`, function (time) {
                AppendCommand$3.call(textPlayer,
                    tagName,             // name
                    FadeInSoundEffect,   // callback
                    time,                // params
                    textPlayer,          // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.fadein';
        parser
            .on(`+${tagName}`, function (time) {
                AppendCommand$3.call(textPlayer,
                    tagName,             // name
                    FadeInSoundEffect2,  // callback
                    time,                // params
                    textPlayer,          // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var FadeInSoundEffect = function (time) {
        // this: textPlayer
        this.soundManager.fadeInSoundEffect(time);
    };

    var FadeInSoundEffect2 = function (time) {
        // this: textPlayer
        this.soundManager.fadeInSoundEffect2(time);
    };

    var OnParseFadeOutSoundEffectTag = function (textPlayer, parser, config) {
        var tagName = 'se.fadeout';
        parser
            .on(`+${tagName}`, function (time, isStopped) {
                isStopped = (isStopped === 'stop');
                AppendCommand$3.call(textPlayer,
                    tagName,             // name
                    FadeOutSoundEffect,  // callback
                    [time, isStopped],   // params
                    textPlayer,          // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.fadeout';
        parser
            .on(`+${tagName}`, function (time, isStopped) {
                isStopped = (isStopped === 'stop');
                AppendCommand$3.call(textPlayer,
                    tagName,             // name
                    FadeOutSoundEffect2,  // callback
                    [time, isStopped],   // params
                    textPlayer,          // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var FadeOutSoundEffect = function (params) {
        // this: textPlayer
        this.soundManager.fadeOutSoundEffect(...params);
    };

    var FadeOutSoundEffect2 = function (params) {
        // this: textPlayer
        this.soundManager.fadeOutSoundEffect2(...params);
    };

    var OnParseSetSoundEffectVolumeTag = function (textPlayer, parser, config) {
        var tagName = 'se.volume';
        parser
            .on(`+${tagName}`, function (volume) {
                AppendCommand$3.call(textPlayer,
                    tagName,               // name
                    SetSoundEffectVolume,  // callback
                    volume,                // params
                    textPlayer,            // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.volume';
        parser
            .on(`+${tagName}`, function (volume) {
                AppendCommand$3.call(textPlayer,
                    tagName,               // name
                    SetSoundEffectVolume2,  // callback
                    volume,                // params
                    textPlayer,            // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var SetSoundEffectVolume = function (volume) {
        // this: textPlayer
        this.soundManager.setSoundEffectVolume(volume, true);
    };

    var SetSoundEffectVolume2 = function (volume) {
        // this: textPlayer
        this.soundManager.setSoundEffectVolume2(volume, true);
    };

    var OnParseSetSoundEffectMuteTag = function (textPlayer, parser, config) {
        var tagName = 'se.mute';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetSoundEffectMute,        // callback
                    undefined,                 // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.mute';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetSoundEffect2Mute,       // callback
                    undefined,                 // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });

        var tagName = 'se.unmute';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetSoundEffectUnMute,      // callback
                    undefined,                 // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'se2.unmute';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetSoundEffect2UnMute,     // callback
                    undefined,                 // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var SetSoundEffectMute = function () {
        // this: textPlayer
        this.soundManager.setSoundEffectMute(true);
    };

    var SetSoundEffect2Mute = function () {
        // this: textPlayer
        this.soundManager.setSoundEffect2Mute(true);
    };

    var SetSoundEffectUnMute = function () {
        // this: textPlayer
        this.soundManager.setSoundEffectMute(false);
    };

    var SetSoundEffect2UnMute = function () {
        // this: textPlayer
        this.soundManager.setSoundEffect2Mute(false);
    };

    var OnParsePlayBackgroundMusicTag = function (textPlayer, parser, config) {
        var tagName = 'bgm';
        parser
            .on(`+${tagName}`, function (name, fadeInTime) {
                AppendCommand$3.call(textPlayer,
                    tagName,              // name
                    PlayBackgroundMusic,  // callback
                    [name, fadeInTime],   // params
                    textPlayer,           // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    'bgm.stop',           // name
                    StopBackgroundMusic,  // callback
                    undefined,            // params
                    textPlayer,           // scope
                );
                parser.skipEvent();
            });


        var tagName = 'bgm2';
        parser
            .on(`+${tagName}`, function (name, fadeInTime) {
                AppendCommand$3.call(textPlayer,
                    tagName,              // name
                    PlayBackgroundMusic2, // callback
                    [name, fadeInTime],   // params
                    textPlayer,           // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    'bgm2.stop',          // name
                    StopBackgroundMusic2, // callback
                    undefined,            // params
                    textPlayer,           // scope
                );
                parser.skipEvent();
            });
    };

    var PlayBackgroundMusic = function (params) {
        var name = params[0];
        var fadeInTime = params[1];

        // this: textPlayer
        this.soundManager.playBackgroundMusic(name);
        if (fadeInTime) {
            this.soundManager.fadeInBackgroundMusic(fadeInTime);
        }
    };

    var StopBackgroundMusic = function () {
        // this: textPlayer
        this.soundManager.stopBackgroundMusic();
    };

    var PlayBackgroundMusic2 = function (params) {
        var name = params[0];
        var fadeInTime = params[1];

        // this: textPlayer
        this.soundManager.playBackgroundMusic2(name);
        if (fadeInTime) {
            this.soundManager.fadeInBackgroundMusic2(fadeInTime);
        }
    };

    var StopBackgroundMusic2 = function () {
        // this: textPlayer
        this.soundManager.stopBackgroundMusic2();
    };

    var OnParseFadeInBackgroundMusicTag = function (textPlayer, parser, config) {
        var tagName = 'bgm.fadein';
        parser
            .on(`+${tagName}`, function (time) {
                AppendCommand$3.call(textPlayer,
                    tagName,                 // name
                    FadeInBackgroundMusic,   // callback
                    time,                    // params
                    textPlayer,              // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.fadein';
        parser
            .on(`+${tagName}`, function (time) {
                AppendCommand$3.call(textPlayer,
                    tagName,                 // name
                    FadeInBackgroundMusic2,  // callback
                    time,                    // params
                    textPlayer,              // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var FadeInBackgroundMusic = function (time) {
        // this: textPlayer
        this.soundManager.fadeInBackgroundMusic(time);
    };

    var FadeInBackgroundMusic2 = function (time) {
        // this: textPlayer
        this.soundManager.fadeInBackgroundMusic2(time);
    };

    var OnParseFadeOutBackgroundMusicTag = function (textPlayer, parser, config) {
        var tagName = 'bgm.fadeout';
        parser
            .on(`+${tagName}`, function (time, isStopped) {
                isStopped = (isStopped === 'stop');
                AppendCommand$3.call(textPlayer,
                    tagName,                 // name
                    FadeOutBackgroundMusic,  // callback
                    [time, isStopped],       // params
                    textPlayer,              // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.fadeout';
        parser
            .on(`+${tagName}`, function (time, isStopped) {
                isStopped = (isStopped === 'stop');
                AppendCommand$3.call(textPlayer,
                    tagName,                 // name
                    FadeOutBackgroundMusic2, // callback
                    [time, isStopped],       // params
                    textPlayer,              // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var FadeOutBackgroundMusic = function (params) {
        // this: textPlayer
        this.soundManager.fadeOutBackgroundMusic(...params);
    };

    var FadeOutBackgroundMusic2 = function (params) {
        // this: textPlayer
        this.soundManager.fadeOutBackgroundMusic2(...params);
    };

    var OnParseCrossFadeBackgroundMusicTag = function (textPlayer, parser, config) {
        var tagName = 'bgm.cross';
        parser
            .on(`+${tagName}`, function (name, fadeTime) {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    CrossFadeBackgroundMusic,  // callback
                    [name, fadeTime],          // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.cross';
        parser
            .on(`+${tagName}`, function (name, fadeTime) {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    CrossFadeBackgroundMusic2, // callback
                    [name, fadeTime],          // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var CrossFadeBackgroundMusic = function (params) {
        // this: textPlayer
        this.soundManager.crossFadeBackgroundMusic(...params);
    };

    var CrossFadeBackgroundMusic2 = function (params) {
        // this: textPlayer
        this.soundManager.crossFadeBackgroundMusic2(...params);
    };

    var OnParsePauseBackgroundMusicTag = function (textPlayer, parser, config) {
        var tagName = 'bgm.pause';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,               // name
                    PauseBackgroundMusic,  // callback
                    undefined,             // params
                    textPlayer,            // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    'bgm.resume',           // name
                    ResumeBackgroundMusic,  // callback
                    undefined,              // params
                    textPlayer,             // scope
                );
                parser.skipEvent();
            });


        var tagName = 'bgm2.pause';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,               // name
                    PauseBackgroundMusic2, // callback
                    undefined,             // params
                    textPlayer,            // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    'bgm2.resume',          // name
                    ResumeBackgroundMusic2, // callback
                    undefined,              // params
                    textPlayer,             // scope
                );
                parser.skipEvent();
            });
    };

    var PauseBackgroundMusic = function () {
        // this: textPlayer
        this.soundManager.pauseBackgroundMusic();
    };

    var ResumeBackgroundMusic = function () {
        // this: textPlayer
        this.soundManager.resumeBackgroundMusic();
    };

    var PauseBackgroundMusic2 = function () {
        // this: textPlayer
        this.soundManager.pauseBackgroundMusic2();
    };

    var ResumeBackgroundMusic2 = function () {
        // this: textPlayer
        this.soundManager.resumeBackgroundMusic2();
    };

    var OnParseSetBackgroundMusicVolumeTag = function (textPlayer, parser, config) {
        var tagName = 'bgm.volume';
        parser
            .on(`+${tagName}`, function (volume) {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetBackgroundMusicVolume,  // callback
                    volume,                    // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.volume';
        parser
            .on(`+${tagName}`, function (volume) {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetBackgroundMusicVolume2, // callback
                    volume,                    // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var SetBackgroundMusicVolume = function (volume) {
        // this: textPlayer
        this.soundManager.setBackgroundMusicVolume(volume);
    };

    var SetBackgroundMusicVolume2 = function (volume) {
        // this: textPlayer
        this.soundManager.setBackgroundMusicVolume2(volume);
    };

    var OnParseSetBackgroundMusicMuteTag = function (textPlayer, parser, config) {
        var tagName = 'bgm.mute';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetBackgroundMusicMute,    // callback
                    undefined,                 // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.mute';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetBackgroundMusic2Mute,   // callback
                    undefined,                 // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });

        var tagName = 'bgm.unmute';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetBackgroundMusicUnMute,  // callback
                    undefined,                 // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });


        var tagName = 'bgm2.unmute';
        parser
            .on(`+${tagName}`, function () {
                AppendCommand$3.call(textPlayer,
                    tagName,                   // name
                    SetBackgroundMusic2UnMute, // callback
                    undefined,                 // params
                    textPlayer,                // scope
                );
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var SetBackgroundMusicMute = function () {
        // this: textPlayer
        this.soundManager.setBackgroundMusicMute(true);
    };

    var SetBackgroundMusic2Mute = function () {
        // this: textPlayer
        this.soundManager.setBackgroundMusic2Mute(true);
    };

    var SetBackgroundMusicUnMute = function () {
        // this: textPlayer
        this.soundManager.setBackgroundMusicMute(false);
    };

    var SetBackgroundMusic2UnMute = function () {
        // this: textPlayer
        this.soundManager.setBackgroundMusic2Mute(false);
    };

    var OnParseFadeInCameraTag = function (textPlayer, parser, config) {
        var tagName = 'camera.fadein';
        parser
            .on(`+${tagName}`, function (duration, red, green, blue) {
                AppendCommand$3.call(textPlayer,
                    tagName,                       // name
                    PlayFadeInEffect,              // callback
                    [duration, red, green, blue],  // params
                    textPlayer,                    // scope
                );
                parser.skipEvent();
            });
    };

    var PlayFadeInEffect = function (params) {
        // this: textPlayer
        this.cameraTarget.fadeIn(...params);
    };

    var OnParseFadeOutCameraTag = function (textPlayer, parser, config) {
        var tagName = 'camera.fadeout';
        parser
            .on(`+${tagName}`, function (duration, red, green, blue) {
                AppendCommand$3.call(textPlayer,
                    tagName,                       // name
                    PlayFadeOutEffect,             // callback
                    [duration, red, green, blue],  // params
                    textPlayer,                    // scope
                );
                parser.skipEvent();
            });
    };

    var PlayFadeOutEffect = function (params) {
        // this: textPlayer
        this.cameraTarget.fadeOut(...params);
    };

    var OnParseShakeCameraTag = function (textPlayer, parser, config) {
        var tagName = 'camera.shake';
        parser
            .on(`+${tagName}`, function (duration, intensity) {
                AppendCommand$3.call(textPlayer,
                    tagName,                // name
                    PlayShakeEffect,        // callback
                    [duration, intensity],  // params
                    textPlayer,             // scope
                );
                parser.skipEvent();
            });
    };

    var PlayShakeEffect = function (params) {
        // this: textPlayer
        this.cameraTarget.shake(...params);
    };

    var OnParseFlashCameraTag = function (textPlayer, parser, config) {
        var tagName = 'camera.flash';
        parser
            .on(`+${tagName}`, function (duration, red, green, blue) {
                AppendCommand$3.call(textPlayer,
                    tagName,                       // name
                    PlayFlashEffect,               // callback
                    [duration, red, green, blue],  // params
                    textPlayer,                    // scope
                );
                parser.skipEvent();
            });
    };

    var PlayFlashEffect = function (params) {
        // this: textPlayer
        this.cameraTarget.flash(...params);
    };

    var OnParseZoomCameraTag = function (textPlayer, parser, config) {
        var tagName = 'camera.zoom';
        parser
            .on(`+${tagName}`, function (value) {
                AppendCommand$3.call(textPlayer,
                    tagName,         // name
                    Zoom,            // callback
                    value,           // params
                    textPlayer,      // scope
                );
                parser.skipEvent();
            })
            .on(`+${tagName}.to`, function (value, duration, ease) {
                AppendCommand$3.call(textPlayer,
                    'camera.zoom.to',         // name
                    ZoomTo,                   // callback
                    [value, duration, ease],  // params
                    textPlayer,               // scope
                );
                parser.skipEvent();
            });
    };

    var Zoom = function (value) {
        // this: textPlayer
        this.cameraTarget.setZoom(value);
    };

    var ZoomTo = function (params) {
        // this: textPlayer
        this.cameraTarget.zoomTo(...params);
    };

    const DegToRad = Phaser.Math.DegToRad;

    var OnParseRotateCameraTag = function (textPlayer, parser, config) {
        var tagName = 'camera.rotate';
        parser
            .on(`+${tagName}`, function (value) {
                value = DegToRad(value);
                AppendCommand$3.call(textPlayer,
                    tagName,          // name
                    Rotate,           // callback
                    value,            // params
                    textPlayer,       // scope
                );
                parser.skipEvent();
            })
            .on(`+${tagName}.to`, function (value, duration, ease) {
                value = DegToRad(value);
                AppendCommand$3.call(textPlayer,
                    'camera.rotate.to',       // name
                    RotateTo,                 // callback
                    [value, duration, ease],  // params
                    textPlayer,               // scope
                );
                parser.skipEvent();
            });
    };

    var Rotate = function (value) {
        // this: textPlayer
        this.cameraTarget.setRotation(value);
    };

    var RotateTo = function (params) {
        var value = params[0];
        var duration = params[1];
        var ease = params[2];

        // this: textPlayer
        this.cameraTarget.rotateTo(value, false, duration, ease);
    };

    var OnParseScrollCameraTag = function (textPlayer, parser, config) {
        var tagName = 'camera.scroll';
        parser
            .on(`+${tagName}`, function (x, y) {
                AppendCommand$3.call(textPlayer,
                    tagName,          // name
                    Scroll,           // callback
                    [x, y],           // params
                    textPlayer,       // scope
                );
                parser.skipEvent();
            })
            .on(`+${tagName}.to`, function (x, y, duration, ease) {
                AppendCommand$3.call(textPlayer,
                    'camera.scroll.to',       // name
                    ScrollTo,                 // callback
                    [x, y, duration, ease],   // params
                    textPlayer,               // scope
                );
                parser.skipEvent();
            });
    };

    var Scroll = function (params) {
        // this: textPlayer
        this.cameraTarget.setScroll(...params);
    };

    var ScrollTo = function (params) {
        var x = params[0];
        var y = params[1];
        var duration = params[2];
        var ease = params[3];

        // this: textPlayer
        var camera = this.cameraTarget;
        var xSave = camera.scrollX;
        var ySave = camera.scrollY;
        camera.setScroll(x, y);
        x += camera.centerX;
        y += camera.centerY;
        camera.setScroll(xSave, ySave);

        // x,y in pan() is the centerX, centerY
        camera.pan(x, y, duration, ease);
    };

    var OnParseWaitTag = function (textPlayer, parser, config) {
        var tagWait = 'wait';
        var tagClick = 'click';
        parser
            .on(`+${tagWait}`, function (name) {
                AppendCommand$1(textPlayer, name);
                parser.skipEvent();
            })
            .on(`-${tagWait}`, function () {
                parser.skipEvent();
            })
            .on(`+${tagClick}`, function () {  // Equal to [wait=click]
                AppendCommand$1(textPlayer, 'click');
                parser.skipEvent();
            })
            .on(`-${tagClick}`, function () {  // Equal to [/wait]
                parser.skipEvent();
            });
    };

    var Wait$2 = function (name) {
        this.typeWriter.wait(name);  // this: textPlayer
    };

    var AppendCommand$1 = function (textPlayer, name) {
        AppendCommand$3.call(textPlayer,
            'wait',       // name
            Wait$2,         // callback
            name,         // params
            textPlayer,   // scope
        );
    };

    var OnParseNewLineTag = function (textPlayer, parser, config) {
        var tagName = 'r';
        parser
            .on(`+${tagName}`, function () {
                AppendText.call(textPlayer, '\n');
                parser.skipEvent();
            })
            .on(`-${tagName}`, function () {
                parser.skipEvent();
            });
    };

    var OnParsePageBreakTag = function (textPlayer, parser, config) {
        var tagNames = ['pagebreak', 'pb'];
        for (var i = 0, cnt = tagNames.length; i < cnt; i++) {
            var tagName = tagNames[i];
            parser
                .on(`+${tagName}`, function () {
                    AppendText.call(textPlayer, '\f');
                    parser.skipEvent();
                })
                .on(`-${tagName}`, function () {
                    parser.skipEvent();
                });
        }

    };

    var OnParseContentOff = function (textPlayer, parser, config) {
        var tagName = 'content.off';
        parser
            .on(`+${tagName}`, function () {
                parser.setContentOutputEnable(false);
                parser.skipEvent();
            });
    };

    var OnParseContentOn = function (textPlayer, parser, config) {
        var tagName = 'content.on';
        parser
            .on(`+${tagName}`, function () {
                parser.setContentOutputEnable();
                parser.skipEvent();
            });
    };

    var OnParseContent = function (textPlayer, parser, config) {
        parser
            .on('content', function (content) {
                if (parser.contentOutputEnable) {
                    AppendText.call(textPlayer, content);
                } else {
                    var startTag = `+${parser.lastTagStart}`;
                    textPlayer.emit(`parser.${startTag}#content`, parser, content);
                }
            });
    };

    var OnParseCustomTag = function (textPlayer, parser, config) {
        parser
            .on('start', function () {
                textPlayer.emit('parser.start', parser);
            })
            .on('+', function (tagName, ...value) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                var startTag = `+${tagName}`;
                var param = value;
                textPlayer.emit(`parser.${startTag}`, parser, ...value, param);
                AppendCommand(textPlayer, startTag, param);
            })
            .on('-', function (tagName) {
                if (parser.skipEventFlag) {
                    return;
                }

                var endTag = `-${tagName}`;
                var param = [];
                textPlayer.emit(`parser.${endTag}`, parser, param);
                AppendCommand(textPlayer, endTag, param);
            })
            .on('complete', function () {
                textPlayer.emit('parser.complete', parser);
            });
    };

    var FireEvent = function (param, tagName) {
        var eventName = `tag.${tagName}`;
        // this: textPlayer
        if (param == null) {
            this.emit(eventName);
        } else {
            this.emit(eventName, ...param);
        }

    };

    var AppendCommand = function (textPlayer, name, param) {
        AppendCommand$3.call(textPlayer,
            name,         // name
            FireEvent,    // callback
            param,        // params
            textPlayer,   // scope
        );
    };

    const ParseCallbacks$2 = [
        OnParseColorTag, OnParseStrokeColorTag,
        OnParseBoldTag, OnParseItalicTag,
        OnParseFontSizeTag, OnParseShadowColorTag, OnParseAlignTag,
        OnParseOffsetYTag, OnParseOffsetXTag, OnParseLeftSpaceTag, OnParseRightSpaceTag,
        OnParseImageTag$1,
        OnParseImageTag,

        OnParseTypingSpeedTag,

        OnParsePlaySoundEffectTag, OnParseFadeInSoundEffectTag, OnParseFadeOutSoundEffectTag,
        OnParseSetSoundEffectVolumeTag, OnParseSetSoundEffectMuteTag,
        OnParsePlayBackgroundMusicTag, OnParseFadeInBackgroundMusicTag, OnParseFadeOutBackgroundMusicTag, OnParseCrossFadeBackgroundMusicTag, OnParsePauseBackgroundMusicTag,
        OnParseSetBackgroundMusicVolumeTag, OnParseSetBackgroundMusicMuteTag,

        OnParseFadeInCameraTag, OnParseFadeOutCameraTag, OnParseShakeCameraTag, OnParseFlashCameraTag, OnParseZoomCameraTag, OnParseRotateCameraTag, OnParseScrollCameraTag,

        OnParseWaitTag,

        OnParseNewLineTag, OnParsePageBreakTag,
        OnParseContentOff, OnParseContentOn,
        OnParseContent,

        OnParseCustomTag,
    ];

    var AddParseCallbacks = function (textPlayer, parser, config) {
        for (var i = 0, cnt = ParseCallbacks$2.length; i < cnt; i++) {
            ParseCallbacks$2[i](textPlayer, parser, config);
        }
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
        // Use [r] to put \n
        return lines.join('');
    };

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    class Parser extends BracketParser {
        constructor(textPlayer, config) {
            if (config === undefined) {
                config = {};
            }
            if (!config.hasOwnProperty('delimiters')) {
                config.delimiters = '[]';
            }
            super(config);

            AddParseCallbacks(textPlayer, this, config);

            this.setCommentLineStartSymbol(GetValue$3(config, 'comment', '//'));
            this.setContentOutputEnable();
        }

        setCommentLineStartSymbol(symbol) {
            this.commentLineStart = symbol;
            return this;
        }

        setContentOutputEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }
            this.contentOutputEnable = enable;
            return this;
        }

        start(source) {
            super.start(PreProcess(this, source));
            return this;
        }
    }

    var TypingSpeedMethods$1 = {
        setDefaultTypingSpeed(speed) {
            this.defaultSpeed = speed;
            return this;
        },

        setTypingSpeed(speed) {
            if (speed === undefined) {
                speed = this.defaultSpeed;
            }
            this.speed = speed;
            return this;
        },
    };

    // Internal events

    const PageFadeOutCompleteEvent = 'page.fadeout';
    const StopPlayEvent = '_remove.play';

    const ClearEvents$1 = [
        PageFadeOutCompleteEvent,
        StopPlayEvent
    ];

    var FadeOutPage = function () {
        if (!this.fadeOutPageCallback || !this.children) {
            this.emit(PageFadeOutCompleteEvent);
            return this;
        }

        var renderableChildren = this.children.filter(function (child) { return child.renderable });
        var waitObject = this.fadeOutPageCallback(renderableChildren, this.fadeOutPageDuration);
        if (!waitObject) {
            this.emit(PageFadeOutCompleteEvent);
        } else if (waitObject.once) {
            waitObject.once('complete', function () {
                this.emit(PageFadeOutCompleteEvent);
            }, this);
        } else if (waitObject.then) {
            var self = this;
            waitObject.then(function () {
                self.emit(PageFadeOutCompleteEvent);
            });
        } else {
            this.emit(PageFadeOutCompleteEvent);
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

    var Start = function (children) {
        this.children = children;
        this.index = 0;
        this.isPageTyping = true;

        if (this.onTypeStart) {
            this.onTypeStart(children);
        }
        this.typing();

        return WaitComplete(this);  // Promise
    };

    const TypingDelayTimerType = 'delay';
    const TypingAnimationTimerType = 'anim';

    var Typing = function (offsetTime) {
        if (offsetTime === undefined) {
            offsetTime = 0;
        }

        var delay = 0;
        this.inTypingProcessLoop = true;
        while (this.inTypingProcessLoop) {
            var child = this.getNextChild();
            if (!child) {
                if (this.timeline.isRunning) {
                    // Wait until last animationConfig is end
                    this.timeline.once('complete', function () {
                        this.isPageTyping = false;
                        this.emit('complete');
                    }, this);
                } else {
                    this.isPageTyping = false;
                    this.emit('complete');
                }
                break;  // Leave this typing loop
            }

            if (child.renderable) {
                // Typing this char
                var animationConfig = this.animationConfig;
                if (animationConfig.duration > 0) {
                    var animationTimer = this.timeline.addTimer({
                        name: TypingAnimationTimerType,
                        target: child,
                        duration: animationConfig.duration,
                        yoyo: animationConfig.yoyo,
                        onStart: animationConfig.onStart,
                        onProgress: animationConfig.onProgress,
                        onComplete: animationConfig.onComplete,
                    });
                    if (this.skipTypingAnimation) {
                        animationTimer.seek(1);
                    }
                } else {  // No animationConfig, only invoke onStart callback
                    if (animationConfig.onStart) {
                        animationConfig.onStart(child, 0);
                    }
                }

                // Set to min size
                if (this.minSizeEnable) {
                    this.textPlayer.setToMinSize();
                }

                this.textPlayer.emit('typing', child);

                var nextChild = this.nextChild;
                if (nextChild) {
                    if (this.skipSpaceEnable && IsSpaceChar(nextChild)) ; else {
                        delay += (this.speed + offsetTime);
                        offsetTime = 0;
                        if (delay > 0) {
                            // Process next character later
                            this.typingTimer = this.timeline.addTimer({
                                name: TypingDelayTimerType,
                                target: this,
                                duration: delay,
                                onComplete: function (target, t, timer) {
                                    target.typingTimer = undefined;
                                    Typing.call(target, timer.remainder);
                                }
                            });
                            break;  // Leave this typing loop     
                        }
                    }
                }
                // Process next child
            } else if (IsCommand(child)) {
                child.exec();
                // Process next child
            }

        }

        // Set to min size
        if (this.minSizeEnable) {
            this.textPlayer.setToMinSize();
        }

        this.inTypingProcessLoop = false;
    };

    var Pause = function () {
        // Pause typing timer and animation progresses
        this.timeline.pause(); 
        return this;
    };

    var Resume = function () {
        // Resume typing timer and animation progresses
        this.timeline.resume();
        return this;
    };

    var PauseTyping = function () {
        // Already in typingPaused state
        if (this.isTypingPaused) {
            return this;
        }

        if (this.typingTimer) {  // Pause when typing timer is counting
            this.typingTimer.pause();
            this.isTypingPaused = true;
        } else if (this.inTypingProcessLoop) {  // Pause in loop of typing(), by tag
            this.inTypingProcessLoop = false;
            this.isTypingPaused = true;
        }
        return this;
    };

    var ResumeTyping = function (offsetTime) {
        // Already not in typingPaused state
        if (!this.isTypingPaused) {
            return this;
        }
        if (offsetTime === undefined) {
            offsetTime = 0;
        }

        if (this.typingTimer) {  // Pause when typing timer is paused
            this.isTypingPaused = false;
            this.typingTimer.resume();
            this.typingTimer.remainder += offsetTime;
        } else if (this.isTypingPaused) {  // Resume paused by tag
            this.isTypingPaused = false;
            this.typing(offsetTime);
        }
        return this;
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

    var IsWaitGameObject = function (textPlayer, name) {
        var names = name.split('.');
        return textPlayer.gameObjectManagers.hasOwnProperty(names[0]);
    };

    var WaitGameObject = function (textPlayer, tag, callback, scope) {
        var waitEventManager = textPlayer.waitEventManager;
        var tags = tag.split('.');
        var goType = tags[0];
        var gameObjectManager = textPlayer.getGameObjectManager(goType);
        var waitEventName = `wait.${goType}`;
        switch (tags.length) {
            case 1:  // 'goType' : wait all sprites has beeen destroyed
                waitEventManager.waitGameObjectManagerEmpty(goType);
                textPlayer.emit(waitEventName);
                return;

            case 2:  // 'goType.name' : wait goType.name has been destroyed
                var name = tags[1];
                waitEventManager.waitGameObjectDestroy(goType, name);
                textPlayer.emit(waitEventName, name);
                return;

            case 3:  // 'goType.name.prop' : wait ease goType.name.prop has been completed
                var name = tags[1],
                    prop = tags[2];

                var value = gameObjectManager.getProperty(name, prop);
                // Can start tween task for a number property
                if (typeof (value) === 'number') {
                    waitEventManager.waitGameObjectTweenComplete(goType, name, prop);
                    textPlayer.emit(waitEventName, name, prop);
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
                    textPlayer.emit(waitEventName, name, dataKey);
                    return;
                } else {
                    waitEventManager.waitTime(0);
                    return;
                }

        }

    };

    const KeyCodes = Phaser.Input.Keyboard.KeyCodes;

    var WaitAny = function (textPlayer, names, callback, scope) {
        var waitEventManager = textPlayer.waitEventManager;
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
                var waitCompleteTriggerCallback = textPlayer.waitEventManager.getWaitCompleteTriggerCallback();
                textPlayer.emit('wait', waitCompleteTriggerCallback);

            } else if ((typeof (name) === 'number') || !isNaN(name)) { // A number, or a number string
                var time = parseFloat(name);
                waitEventManager.waitTime(time);
                textPlayer.emit('wait.time', time);

            } else if (name === 'click') {  // 'click'
                waitEventManager.waitClick();
                textPlayer.emit('wait.click');

            } else if (name === 'se') {
                waitEventManager.waitSoundEffectComplete();
                var music = textPlayer.soundManager.getLastSoundEffect();
                textPlayer.emit('wait.music', music);

            } else if (name === 'se2') {
                waitEventManager.waitSoundEffect2Complete();
                var music = textPlayer.soundManager.getLastSoundEffect2();
                textPlayer.emit('wait.music', music);

            } else if (name === 'bgm') {
                waitEventManager.waitBackgroundMusicComplete();
                var music = textPlayer.soundManager.getBackgroundMusic();
                textPlayer.emit('wait.music', music);

            } else if (name === 'bgm2') {
                waitEventManager.waitBackgroundMusic2Complete();
                var music = textPlayer.soundManager.getBackgroundMusic2();
                textPlayer.emit('wait.music', music);

            } else if (KeyCodes.hasOwnProperty(name.toUpperCase())) {
                waitEventManager.waitKeyDown(name);
                textPlayer.emit('wait.keydown', name);

            } else if (IsWaitCameraEffect(name)) {
                waitEventManager.waitCameraEffectComplete(name);
                textPlayer.emit('wait.camera', name);

            } else if (IsWaitGameObject(textPlayer, name)) {
                WaitGameObject(textPlayer, name);

            } else {
                var waitCompleteTriggerCallback = textPlayer.waitEventManager.getWaitCompleteTriggerCallback();
                textPlayer.emit(`wait.${name}`, waitCompleteTriggerCallback);

            }
        }
    };

    var Wait$1 = function (name) {
        // Already in typingPaused state, or ignore any wait
        if (this.ignoreWait) {
            return this;
        }

        this.pauseTyping();
        WaitAny(this.textPlayer, name, this.resumeTyping, this);

        return this;
    };

    var SetIgnoreWait$1 = function (value) {
        if (value === undefined) {
            value = true;
        }
        this.ignoreWait = value;
        return this;
    };

    var SetSkipSpaceEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.skipSpaceEnable = enable;
        return this;
    };

    var SetSkipTypingAnimation = function (value) {
        if (value === undefined) {
            value = true;
        }
        this.skipTypingAnimation = value;

        if (value) {
            // Skip current playing typing-animation
            var timers = this.timeline.getTimers(TypingAnimationTimerType);
            for (var i = 0, cnt = timers.length; i < cnt; i++) {
                timers[i].seek(1);
            }
        }
        return this;
    };

    var SetSkipSoundEffect = function (value) {
        if (value === undefined) {
            value = true;
        }
        this.skipSoundEffect = value;

        if (value) {
            var soundManager = this.textPlayer._soundManager;
            if (soundManager) {
                soundManager.fadeOutAllSoundEffects(100, true);
            }
        }
        return this;
    };

    var SkipCurrentTypingDelay = function () {
        if (this.typingTimer) {
            this.typingTimer.seek(1);
        }
        return this;
    };

    var Methods$2 = {
        fadeOutPage: FadeOutPage,
        start: Start,
        typing: Typing,
        pause: Pause,
        resume: Resume,
        pauseTyping: PauseTyping,
        resumeTyping: ResumeTyping,
        wait: Wait$1,
        setIgnoreWait: SetIgnoreWait$1,
        setSkipSpaceEnable: SetSkipSpaceEnable,
        setSkipTypingAnimation: SetSkipTypingAnimation,
        setSkipSoundEffect: SetSkipSoundEffect,
        skipCurrentTypingDelay: SkipCurrentTypingDelay,
    };

    Object.assign(
        Methods$2,
        TypingSpeedMethods$1
    );

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    class TypeWriter {
        constructor(textPlayer, config) {
            this.setEventEmitter();
            this.textPlayer = textPlayer;
            this.isPageTyping = false;
            this.typingTimer = undefined;  // Typing delay
            this.pauseTypingTimer = undefined;  // Wait time
            this.inTypingProcessLoop = false;  // Used in this.typing()
            this.isTypingPaused = false;  // Used in this.wait(), this.pauseTyping(), this.resumeTyping()
            this.setIgnoreWait(false);
            this.setSkipTypingAnimation(false);

            this.setTypingStartCallback(GetValue$2(config, 'onTypingStart', SetChildrenInvisible));
            this.setDefaultTypingSpeed(GetValue$2(config, 'speed', 250));
            this.setTypingSpeed();
            this.setSkipSpaceEnable(GetValue$2(config, 'skipSpace', false));
            this.setAnimationConfig(GetValue$2(config, 'animation', undefined));
            this.setMinSizeEnable(GetValue$2(config, 'minSizeEnable', false));

            this.setFadeOutPageCallback(GetValue$2(config, 'fadeOutPage'));

        }

        destroy() {
            this.destroyEventEmitter();

            this.textPlayer = undefined;

            this.typingTimer = undefined;

            this.pauseTypingTimer = undefined;

            this.onTypeStart = undefined;

            this.animationConfig = undefined;
        }

        get timeline() {
            return this.textPlayer.timeline;
        }

        setTypingStartCallback(callback) {
            this.onTypeStart = callback;
            return this;
        }

        setAnimationConfig(config) {
            if (!config) {
                config = {};
            }

            if (!config.hasOwnProperty('duration')) {
                config.duration = 0;
            }

            if (!config.hasOwnProperty('onStart')) {
                // Apply default onStart callback
                config.onStart = SetChildVisible;
            }

            this.animationConfig = config;
            return this;
        }

        setFadeOutPageCallback(callback) {
            this.fadeOutPageCallback = callback;
            return this;
        }

        setMinSizeEnable(enable) {
            if (enable === undefined) {
                enable = true;
            }

            this.minSizeEnable = enable;
            return this;
        }

        getNextChild() {
            var child = this.nextChild;
            this.index = Math.min(this.index + 1, this.children.length);  // Point to next child
            this._nextChild = undefined;
            return child;
        }

        get nextChild() {
            if (!this._nextChild) {
                this._nextChild = this.children[this.index];
            }
            return this._nextChild;
        }
    }

    var SetChildVisible = function (child) {
        if (child.setVisible) {
            child.setVisible();
        }
    };

    var SetChildrenInvisible = function (children) {
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (child.setVisible) {
                child.setVisible(false);
            }
        }
    };

    Object.assign(
        TypeWriter.prototype,
        EventEmitterMethods$1,
        Methods$2,
    );

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    var AddImage$1 = function (key, config) {
        if (IsPlainObject$1(key)) {
            config = key;
            key = config.key;
        } else if (config === undefined) {
            config = {
                key: key
            };
        }

        if (!config.hasOwnProperty('key')) {
            config.key = key;
        }

        var textureKey = config.key, frameKey = config.frame;
        var width = config.width, height = config.height;

        if ((width === undefined) || (height === undefined)) {
            var frame = this.textureManager.getFrame(textureKey, frameKey);
            var frameWidth = (frame) ? frame.cutWidth : 0;
            var frameHeight = (frame) ? frame.cutHeight : 0;
            if ((width === undefined) && (height === undefined)) {
                width = frameWidth;
                height = frameHeight;
            } else if (width === undefined) {
                width = frameWidth * (height / frameHeight);
            } else if (height === undefined) {
                height = frameHeight * (width / frameWidth);
            }
        }

        this.images[key] = {
            key: textureKey,
            frame: frameKey,
            width: width,
            height: height,
            y: GetValue$1(config, 'y', 0),
            left: GetValue$1(config, 'left', 0),
            right: GetValue$1(config, 'right', 0),
            originX: GetValue$1(config, 'originX', 0),
            originY: GetValue$1(config, 'originY', 0),
            tintFill: GetValue$1(config, 'tintFill', false),
        };
    };

    var DrawImage = function (key, context, x, y, color, autoRound) {
        var imgData = this.get(key);
        if (!imgData) {
            // Invalid key
            return;
        }

        var frame = this.textureManager.getFrame(imgData.key, imgData.frame);

        var width = imgData.width,
            height = imgData.height;
        x += imgData.left - (imgData.originX * width);
        y += imgData.y - (imgData.originY * height);

        if (!imgData.tintFill) {
            color = undefined;
        }

        DrawFrameToCanvas(
            frame, context.canvas,
            x, y, width, height,
            color, autoRound
        );
    };

    class ImageManager {
        constructor(scene) {
            this.textureManager = scene.sys.textures;
            this.images = {};
        }

        destroy() {
            this.textureManager = undefined;
            this.images = undefined;
        }

        add(key, config) {
            if (typeof (key) === 'string') {
                AddImage$1.call(this, key, config);
            } else if (Array.isArray(key)) {
                var data = key;
                for (var i = 0, cnt = data.length; i < cnt; i++) {
                    AddImage$1.call(this, data[i]);
                }
            } else {
                var data = key;
                for (var key in data) {
                    AddImage$1.call(this, key, data[key]);
                }
            }
            return this;
        }

        has(key) {
            return this.images.hasOwnProperty(key);
        }

        remove(key) {
            if (this.has(key)) {
                delete this.images[key];
            }
            return this;
        }

        get(key) {
            if (!this.has(key)) {
                if (this.textureManager.exists(key)) {
                    this.add(key);
                }
            }
            return this.images[key];
        }

        getOuterWidth(key) {
            var data = this.get(key);
            return (data) ? (data.width + data.left + data.right) : 0;
        }

        getFrame(key) {
            var data = this.get(key);
            return (data) ? this.textureManager.getFrame(data.key, data.frame) : undefined;
        }

        hasTexture(key) {
            return !!this.getFrame(key);
        }
    }

    var methods = {
        draw: DrawImage
    };

    Object.assign(
        ImageManager.prototype,
        methods
    );

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

    var Methods$1 = {};
    Object.assign(
        Methods$1,
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
        Methods$1
    );

    var IsPlayAnimationTag = function (tags, goType) {
        // goType.name.play
        return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'play');
    };

    var IsStopAnimationTag = function (tags, goType) {
        // goType.name.stop
        return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'stop');
    };

    var OnParsePlayAnimationTag = function (textPlayer, parser, config) {
        var goType = config.name;
        parser
            .on('+', function (tag, ...keys) {
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

                AppendCommand$3.call(textPlayer,
                    `${goType}.play`,       // name
                    PlayAnimation,          // callback
                    [goType, name, keys],   // params
                    textPlayer,             // scope
                );

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

                AppendCommand$3.call(textPlayer,
                    `${goType}.stop`,   // name
                    StopAnimation,      // callback
                    [goType, name],     // params
                    textPlayer,         // scope
                );

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

                AppendCommand$3.call(textPlayer,
                    `${goType}.stop`,    // name
                    StopAnimation,       // callback
                    [goType, name],      // params
                    textPlayer,          // scope
                );

                parser.skipEvent();
            });
    };

    var PlayAnimation = function (params) {
        var goType, name, keys;
        [goType, name, keys] = params;
        var key = keys.shift();

        // this: textPlayer
        var gameObjectManager = this.getGameObjectManager(goType);
        gameObjectManager.playAnimation(name, key);
        if (keys.length > 0) {
            gameObjectManager.chainAnimation(name, keys);
        }
    };

    var StopAnimation = function (params) {
        var goType, args;
        [goType, ...args] = params;
        // this: textPlayer
        var gameObjectManager = this.getGameObjectManager(goType);
        gameObjectManager.stopAnimation(...args);
    };

    var IsPauseAnimationTag = function (tags, goType) {
        // goType.name.pause 
        return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'pause');
    };

    var OnParsePauseAnimationTag = function (textPlayer, parser, config) {
        var goType = config.name;
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

                AppendCommand$3.call(textPlayer,
                    `${goType}.pause`,  // name
                    PauseAnimation,     // callback
                    [goType, name],     // params
                    textPlayer,         // scope
                );

                parser.skipEvent();
            });
    };

    var PauseAnimation = function (params) {
        var goType, args;
        [goType, ...args] = params;
        // this: textPlayer
        var gameObjectManager = this.getGameObjectManager(goType);
        gameObjectManager.pauseAnimation(...args);
    };

    var IsChainAnimationTag = function (tags, goType) {
        // goType.name.chain 
        return (tags.length === 3) && (tags[0] === goType) && (tags[2] === 'chain');
    };

    var OnParseChainAnimationTag = function (textPlayer, parser, config) {
        var goType = config.name;
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
                AppendCommand$3.call(textPlayer,
                    `${goType}.chain`,     // name
                    ChainAnimation,        // callback
                    [goType, name, keys],  // params
                    textPlayer,            // scope
                );

                parser.skipEvent();
            });
    };

    var ChainAnimation = function (params) {
        var goType, args;
        [goType, ...args] = params;
        // this: textPlayer
        var gameObjectManager = this.getGameObjectManager(goType);
        gameObjectManager.chainAnimation(...args);
    };

    const ParseCallbacks$1 = [
        OnParsePlayAnimationTag,
        OnParsePauseAnimationTag,
        OnParseChainAnimationTag,
    ];

    var AddSpriteManager = function (config) {
        if (config === undefined) {
            config = {};
        }

        config.name = 'sprite';
        config.parseCallbacks = ParseCallbacks$1;
        config.createGameObject = GetCreateGameObjectCallback(config.createGameObject);

        this.addGameObjectManager(config, SpriteManager);
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

    var IsAddGameObjectTag = function (tags, goType) {
        // goType.name
        return (tags.length === 2) && (tags[0] === goType)
    };

    var OnParseAddGameObjectTag = function (textPlayer, parser, config) {
        var goType = config.name;
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

                AppendCommand$3.call(textPlayer,
                    `${goType}.add`,          // name
                    AddGameObject,            // callback
                    [goType, name, ...args],  // params
                    textPlayer,               // scope
                );

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

                AppendCommand$3.call(textPlayer,
                    `${goType}.remove`, // name
                    RemoveGameObject,   // callback
                    [goType, name],     // params
                    textPlayer,         // scope
                );

                parser.skipEvent();
            });
    };

    var AddGameObject = function (params) {
        var goType, args;
        [goType, ...args] = params;
        // this: textPlayer
        var gameObjectManager = this.getGameObjectManager(goType);
        gameObjectManager.add(...args);
    };

    var RemoveGameObject = function (params) {
        var goType, args;
        [goType, ...args] = params;
        // this: textPlayer
        var gameObjectManager = this.getGameObjectManager(goType);
        gameObjectManager.remove(...args);
    };

    var OnParseRemoveAllGameObjectsTag = function (textPlayer, parser, config) {
        var goType = config.name;
        parser
            .on('-', function (tag) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [/goType]
                if (tag === goType) ; else {
                    return;
                }

                AppendCommand$3.call(textPlayer,
                    `${goType}.removeall`,   // name
                    RemoveAllSprites,        // callback
                    goType,                  // params
                    textPlayer,              // scope
                );
                parser.skipEvent();
            });
    };

    var RemoveAllSprites = function (goType) {
        // this: textPlayer
        var gameObjectManager = this.getGameObjectManager(goType);
        gameObjectManager.removeAll();
    };

    var IsPropTag = function (tags, goType) {
        // goType.name.prop
        return (tags.length === 3) && (tags[0] === goType);
    };

    var OnParseCallGameObjectMethodTag = function (textPlayer, parser, config) {
        var goType = config.name;
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

                AppendCommand$3.call(textPlayer,
                    `${goType}.call`,                    // name
                    CallMethod,                          // callback
                    [goType, name, prop, ...parameters], // params
                    textPlayer,                          // scope
                );

                parser.skipEvent();
            });
    };

    var CallMethod = function (params) {
        var goType, name, prop, args;
        [goType, name, prop, ...args] = params;
        // this: textPlayer

        var eventName = `${goType}.${prop}`;
        this.emit(
            eventName,
            name, ...args
        );
        if (this.listenerCount(eventName) > 0) {
            return;
        }

        var gameObjectManager = this.getGameObjectManager(goType);
        if (gameObjectManager.hasMethod(name, prop)) {
            // Is method
            gameObjectManager.call(name, prop, ...args);
        } else {
            // Is property
            gameObjectManager.setProperty(name, prop, args[0]);
        }

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

    var OnParseEaseGameObjectPropertyTag = function (textPlayer, parser, config) {
        var goType = config.name;
        textPlayer.getGameObjectManager(goType);
        parser
            .on(`+`, function (tag, value, duration, ease, repeat) {
                if (parser.skipEventFlag) {  // Has been processed before
                    return;
                }

                // [goType.name.prop.to=value,duration]
                // [goType.name.prop.to=value,duration,ease,repeat]
                // [goType.name.prop.to=value,duration,repeat]
                var tags = tag.split('.');
                var name, property, easeMode;
                if (IsEasePropertyTag(tags, goType)) {
                    name = tags[1];
                    property = tags[2];
                    easeMode = tags[3];
                } else {
                    return;
                }

                if (typeof (ease) === 'number') {
                    repeat = ease;
                    ease = undefined;
                }

                AppendCommand$3.call(textPlayer,
                    `${goType}.ease`,                    // name
                    EaseProperty,                        // callback
                    [
                        goType,
                        name, property, value,
                        duration, ease, repeat, easeMode
                    ],                                    // params
                    textPlayer,                           // scope
                );

                parser.skipEvent();
            });
    };

    var EaseProperty = function (params) {
        var goType, name, property, value, duration, ease, repeat, easeMode;
        [
            goType,
            name, property, value,
            duration, ease, repeat, easeMode
        ] = params;
        // this: textPlayer
        var gameObjectManager = this.getGameObjectManager(goType);

        var currentValue = gameObjectManager.getProperty(name, property);
        // Only can tween number property
        if (typeof (currentValue) !== 'number') {
            return;
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
    };

    const ParseCallbacks = [
        OnParseAddGameObjectTag, OnParseRemoveAllGameObjectsTag,
        OnParseCallGameObjectMethodTag,
        OnParseEaseGameObjectPropertyTag
    ];

    const AddGameObjectManager = GameObjectManagerMethods$1.addGameObjectManager;

    var GameObjectManagerMethods = {
        addGameObjectManager(config, GameObjectManagerClass) {
            config = (config) ? Clone(config) : {};

            var name = config.name;
            if (!name) {
                console.warn(`[TextPlayer] Parameter 'name' is required in addGameObjectManager(config) method`);
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
        this.waitEventManager.setClickTarget(target);
        return this;
    };

    var SetCameraTarget = function (camera) {
        this.waitEventManager.setCameraTarget(camera);
        return this;
    };

    var SetNextPageInput = function (input) {
        var textPlayer = this;
        if (!input) {
            this.nextPageInput = null;

        } else if (typeof (input) === 'function') {
            this.nextPageInput = function (callback, scope) {
                var waitEventManager = textPlayer.waitEventManager;
                waitEventManager
                    .clearWaitCompleteCallbacks()
                    .addWaitCompleteCallback(callback, scope);

                var waitCompleteTriggerCallback = waitEventManager.getWaitCompleteTriggerCallback();
                input.call(textPlayer, waitCompleteTriggerCallback);
            };

        } else {
            this.nextPageInput = function (callback, scope) {
                WaitAny(textPlayer, input, callback, scope);
            };
        }
    };

    var AddImage = function (key, config) {
        this.imageManager.add(key, config);
        return this;
    };

    var PlayMethods = {
        play(content) {
            if (this.isPlaying) {
                return this;
            }

            this.removeChildren();
            this.parser.start(content); // Parse bbcode-content

            this.isPlaying = true;
            this.once('complete', function () {
                this.isPlaying = false;
            }, this);

            this.lastWrapResult = undefined;
            this.typingNextPage();
            return this;
        },

        playPromise(content) {
            var promise = WaitComplete(this);
            this.play(content);
            return promise;
        }
    };

    var TypingNextPage = function () {
        if (!this.isPlaying || this.isPageTyping) {
            return this;
        }

        this.typeWriter
            .once(PageFadeOutCompleteEvent, _TypingNextPage, this)
            .fadeOutPage();
        return this;
    };

    var _TypingNextPage = function () {
        var result = this.runWrap(this.lastWrapResult);
        this.lastWrapResult = result;

        this.emit('page.start');

        var OnTypingPageComplete = function () {
            this.emit(StopPlayEvent);  // Clear registed StopPlayEvent
            if (result.isLastPage) {
                this.emit('complete');
            } else {
                this.emit('page.complete');

                if (this.ignoreNextPageInput) {
                    TypingNextPage.call(this);
                } else if (this.nextPageInput) {
                    this.nextPageInput(TypingNextPage, this);
                } else ;

            }
        };

        // Remove event when typing pages has been canceled
        this.once(StopPlayEvent, function () {
            this.typeWriter.off('complete', OnTypingPageComplete, this);
        }, this);

        this.typeWriter
            .once('complete', OnTypingPageComplete, this)
            .start(result.children);
    };

    var PauseMethods = {
        pauseTyping() {
            // Pause typing
            this.typeWriter.pauseTyping();

            return this;
        },

        pause() {
            this.pauseTyping();
            
            // Pause typing, typing timer and animation progresses
            this.timeline.pause();

            return this;
        },

    };

    var ResumeMethods = {
        resumeTyping(offsetTime) {
            // Resume typing
            this.typeWriter.resumeTyping(offsetTime);

            return this;
        },

        resume() {
            this.resumeTyping();

            // Resume typing timer, animation progresses and typing
            this.timeline.resume();

            return this;
        },

    };

    var Wait = function (name) {
        this.typeWriter.wait(name);
        return this;
    };

    var TypingSpeedMethods = {
        setDefaultTypingSpeed(speed) {
            this.defaultTypingSpeed = speed;
            return this;
        },

        setTypingSpeed(speed) {
            this.typingSpeed = speed;
            return this;
        }
    };

    var SetIgnoreWait = function (value) {
        this.typeWriter.setIgnoreWait(value);
        return this;
    };

    var SetIgnoreNextPageInput = function (enable) {
        if (enable === undefined) {
            enable = true;
        }
        this.ignoreNextPageInput = enable;
        return this;
    };

    var ShowPage = function () {
        // Only can work after playing, and before processing last child
        if (!this.isPlaying || !this.isPageTyping) {
            return this;
        }

        // Save parameters
        var typingSpeedSave = this.typeWriter.speed;
        var ignoreWaitSave = this.typeWriter.ignoreWait;
        var skipTypingAnimationSave = this.typeWriter.skipTypingAnimation;
        var skipSoundEffectSave = this.typeWriter.skipSoundEffect;

        this.typeWriter
            .once('complete', function () {
                // Recover parameters
                this.typeWriter
                    .setTypingSpeed(typingSpeedSave)
                    .setIgnoreWait(ignoreWaitSave)
                    .setSkipTypingAnimation(skipTypingAnimationSave)
                    .setSkipSoundEffect(skipSoundEffectSave);

            }, this)

            .setTypingSpeed(0)
            .skipCurrentTypingDelay()
            .setIgnoreWait(true)
            .setSkipTypingAnimation(true)
            .setSkipSoundEffect(true);

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

    var ContentMethods = {
        setContentOutputEnable(enable) {
            this.parser.setContentOutputEnable(enable);
            return this;
        },

        setContentCallback(callback, scope) {
            this.contentCallback = callback;
            this.contentCallbackScope = scope;
            return this;
        },
    };

    var Methods = {
        setClickTarget: SetClickTarget,
        setCameraTarget: SetCameraTarget,
        setNextPageInput: SetNextPageInput,
        addImage: AddImage,
        typingNextPage: TypingNextPage,
        wait: Wait,
        setIgnoreWait: SetIgnoreWait,
        setIgnoreNextPageInput: SetIgnoreNextPageInput,
        showPage: ShowPage,
    };

    Object.assign(
        Methods,
        GameObjectManagerMethods,
        PlayMethods,
        PauseMethods,
        ResumeMethods,
        TypingSpeedMethods,
        SpriteMethods,
        ContentMethods,
    );

    var ClearEvents = function (textPlayer) {
        for (var i = 0, cnt = ClearEvents$1.length; i < cnt; i++) {
            textPlayer.emit(ClearEvents$1[i]);
        }
    };

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class TextPlayer extends Extend(DynamicText) {
        constructor(scene, x, y, fixedWidth, fixedHeight, config) {
            if (IsPlainObject(x)) {
                config = x;
            } else if (IsPlainObject(fixedWidth)) {
                config = fixedWidth;
            }
            if (config === undefined) {
                config = {};
            }

            // Don't set text in DynamicText's constructor
            var content = config.text;
            delete config.text;

            super(scene, x, y, fixedWidth, fixedHeight, config);
            this.type = 'rexTextPlayer';

            this.initManagers(scene, config);

            this.parser = new Parser(this, GetValue(config, 'parser', undefined));

            this.typeWriter = new TypeWriter(this, GetValue(config, 'typing', undefined));

            this._imageManager = undefined;
            var imageData = GetValue(config, 'images', undefined);
            if (imageData) {
                this.addImage(imageData);
            }

            var spriteManagerConfig = GetValue(config, 'sprites');
            if ((spriteManagerConfig !== false) && (spriteManagerConfig !== null)) {
                AddSpriteManager.call(this, spriteManagerConfig);
            }

            this.setIgnoreNextPageInput(GetValue(config, 'ignoreNextPageInput', false));
            this.setNextPageInput(GetValue(config, 'nextPageInput', null));

            this.isPlaying = false;

            if (content) {
                this.play(content);
            }
        }

        get imageManager() {
            if (this._imageManager === undefined) {
                this._imageManager = new ImageManager(this.scene);
            }
            return this._imageManager;
        }

        get spriteManager() {
            return this.getGameObjectManager('sprite');
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            ClearEvents(this);

            this.parser.destroy();
            this.parser = undefined;

            this.typeWriter.destroy(fromScene);
            this.typeWriter = undefined;

            if (this._imageManager) {
                this._imageManager.destroy(fromScene);
            }
            this._imageManager = undefined;

            this.destroyManagers(fromScene);

            super.destroy(fromScene);
        }

        get isPageTyping() {
            return this.typeWriter.isPageTyping;
        }

        set defaultTypingSpeed(speed) {
            this.typeWriter.setDefaultTypingSpeed(speed);
        }

        get defaultTypingSpeed() {
            return this.typeWriter.defaultTypingSpeed;
        }

        set typingSpeed(speed) {
            this.typeWriter.setTypingSpeed(speed);
        }

        get typingSpeed() {
            return this.typeWriter.speed;
        }

        set timeScale(value) {
            this.setTimeScale(value);
        }

        get timeScale() {
            return this.getTimeScale();
        }
    }

    Object.assign(
        TextPlayer.prototype,
        Methods
    );

    return TextPlayer;

}));
