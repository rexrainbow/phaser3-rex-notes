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

    var GetFilterList = function (gameObject, external) {
        if (external === undefined) {
            external = false;
        }

        if (!gameObject.filters) {
            gameObject.enableFilters().focusFilters();
        }

        var filterList = (!external) ? gameObject.filters.internal : gameObject.filters.external;

        return filterList;
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

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._barrelEffect);
                        gameObject._barrelEffect = undefined;
                    }
                } else {
                    if (!gameObject._barrelEffect) {
                        gameObject._barrelEffect = filterList.addBarrel();
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

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject[EffectInstancePropertyName]);
                        gameObject[EffectInstancePropertyName] = undefined;
                    }
                } else {
                    if (!gameObject[EffectInstancePropertyName]) {
                        gameObject[EffectInstancePropertyName] = filterList.addColorMatrix();
                    }
                    var effectInstance = gameObject[EffectInstancePropertyName];
                    effectInstance.colorMatrix[effectName]((inputMode === 1) ? value : undefined);
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

    var AddBlockyProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'blockySize')) {
            return gameObject;
        }

        var filterList = GetFilterList(gameObject);

        var blockySize,
            blockyOffsetX = 0,
            blockyOffsetY = 0;
        Object.defineProperty(gameObject, 'blockySize', {
            get: function () {
                return blockySize;
            },
            set: function (value) {
                if (blockySize === value) {
                    return;
                }

                blockySize = value;

                if ((blockySize === null) || (blockySize === false)) {
                    if (gameObject._blockyEffect) {
                        filterList.remove(gameObject._blockyEffect);
                        gameObject._blockyEffect = undefined;
                    }
                } else {
                    if (!gameObject._blockyEffect) {
                        gameObject._blockyEffect = filterList.addBlocky({
                            size: blockySize,
                            offset: { x: blockyOffsetX, y: blockyOffsetY },
                        });
                    }
                    gameObject._blockyEffect.size.x = blockySize;
                    gameObject._blockyEffect.size.y = blockySize;
                }

            },
        });

        Object.defineProperty(gameObject, 'blockyOffsetX', {
            get: function () {
                return blockyOffsetX;
            },
            set: function (value) {
                if (blockyOffsetX === value) {
                    return;
                }

                blockyOffsetX = value;

                if (gameObject._blockyEffect) {
                    gameObject._blockyEffect.offset.x = blockyOffsetX;
                }
            },
        });
            Object.defineProperty(gameObject, 'blockyOffsetY', {
            get: function () {
                return blockyOffsetY;
            },
            set: function (value) {
                if (blockyOffsetY === value) {
                    return;
                }

                blockyOffsetY = value;

                if (gameObject._blockyEffect) {
                    gameObject._blockyEffect.offset.y = blockyOffsetY;
                }
            },
        });

        AddClearEffectCallback(gameObject, 'blockySize');

        return gameObject;
    };

    const GameClass = Phaser.Game;
    var IsGame = function (object) {
        return (object instanceof GameClass);
    };

    const SceneClass = Phaser.Scene;
    var IsSceneObject = function (object) {
        return (object instanceof SceneClass);
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

    var RegisterFilter = function (game, FilterClass) {
        var filterName = FilterClass.FilterName;
        var renderNodes = GetGame(game).renderer.renderNodes;
        if (renderNodes.hasNode(filterName)) {
            return false;
        }

        renderNodes.addNodeConstructor(filterName, FilterClass);
        return true;
    };

    var AddFilterListMethod = function (name, callback) {
        var FilterListComponent = Phaser.GameObjects.Components.FilterList.prototype;
        if (FilterListComponent[name]) {
            return;
        }

        FilterListComponent[name] = callback;
    };

    const StepFilterName = 'FilterP3BloomStep';

    // Built-in fx in phaser3

    const frag$5 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec2 offset;
uniform float strength;
uniform vec3 color;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    vec4 sum = texture2D(uMainSampler, outTexCoord) * 0.204164 * strength;

    sum = sum + texture2D(uMainSampler, outTexCoord + offset * 1.407333) * 0.304005;
    sum = sum + texture2D(uMainSampler, outTexCoord - offset * 1.407333) * 0.304005;
    sum = sum + texture2D(uMainSampler, outTexCoord + offset * 3.294215) * 0.093913;
    sum = sum + texture2D(uMainSampler, outTexCoord - offset * 3.294215) * 0.093913;

    gl_FragColor = sum * vec4(color, 1);
}
`;

    class BloomStepFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
        static FilterName = StepFilterName;

        constructor(manager) {
            super(StepFilterName, manager, null, frag$5);
        }

        // This method sets up the uniforms for the shader.
        setupUniforms(controller, drawingContext) {
            const programManager = this.programManager;

            var x = (2 / drawingContext.width) * controller.offsetX;
            var y = (2 / drawingContext.height) * controller.offsetY;
            programManager.setUniform('offset', [x, y]);

            programManager.setUniform('strength', controller.strength);
            programManager.setUniform('color', controller.glcolor);

        }

    }

    const GetValue$9 = Phaser.Utils.Objects.GetValue;

    class BloomStepController extends Phaser.Filters.Controller {
        static FilterName = StepFilterName;

        constructor(camera, config) {
            super(camera, StepFilterName);

            this.offsetX = 1;
            this.offsetY = 1;
            this.strength = 1;
            this.glcolor = [1, 1, 1];

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setOffset(GetValue$9(o, 'offsetX', 1), GetValue$9(o, 'offsetY', 1));
            this.setStrength(GetValue$9(o, 'strength', 1));
            this.setColor(GetValue$9(o, 'color', 0xFFFFFF));

            return this;
        }

        get color() {
            var color = this.glcolor;

            return (((color[0] * 255) << 16) + ((color[1] * 255) << 8) + (color[2] * 255 | 0));
        }

        set color(value) {
            var color = this.glcolor;

            color[0] = ((value >> 16) & 0xFF) / 255;
            color[1] = ((value >> 8) & 0xFF) / 255;
            color[2] = (value & 0xFF) / 255;
        }

        setOffset(x, y) {
            this.offsetX = x;
            this.offsetY = y;
            return this;
        }

        setStrength(strength) {
            this.strength = strength;
            return this;
        }

        setColor(color) {
            this.color = color;
            return this;
        }

    }

    const GetValue$8 = Phaser.Utils.Objects.GetValue;

    let BloomController$1 = class BloomController extends Phaser.Filters.ParallelFilters {
        constructor(camera, config) {
            super(camera);

            this.steps = 0;
            this.offsetX = 1;
            this.offsetY = 1;
            this.blurStrength = 1;
            this.color = 0xffffff;
            this.strength = 1;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setOffset(GetValue$8(o, 'offsetX', 1), GetValue$8(o, 'offsetY', 1));
            this.setBlurStrength(GetValue$8(o, 'blurStrength', 1));
            this.setColor(GetValue$8(o, 'color', 0xFFFFFF));
            this.setStrength(GetValue$8(o, 'strength', 1));
            this.setSteps(GetValue$8(o, 'steps', 4));

            return this;
        }

        forEachController(callback, scope) {
            this.top.list.forEach(callback, scope);
        }

        get steps() {
            return this._steps;
        }

        set steps(value) {
            if (this._steps === value) {
                return;
            }

            var camera = this.camera;
            if (this.steps < value) {
                var filters = this.top;
                var startIndex = this.steps * 2;
                var stopIndex = value * 2;
                for (var i = startIndex; i < stopIndex; i++) {
                    filters.add(new BloomStepController(camera));
                }
            } else { // this.steps > value
                var filtersList = this.top.list;
                var startIndex = this.steps * 2;
                var stopIndex = value * 2;
                for (var i = startIndex - 1; i >= stopIndex; i--) {
                    filtersList[i].destroy();
                }
                filtersList.length = stopIndex;
            }

            this._steps = value;

            this.setOffset(this.offsetX, this.offsetY);
            this.setBlurStrength(this.strength);
            this.setColor(this.color);
        }

        setSteps(steps) {
            this.steps = steps;
            return this;
        }

        get offsetX() {
            return this._offsetX;
        }

        set offsetX(value) {
            this._offsetX = value;
            this.forEachController(function (bloomStepController, i) {
                bloomStepController.offsetX = (i % 2 === 0) ? value : 0;
            });
        }

        get offsetY() {
            return this._offsetY;
        }

        set offsetY(value) {
            this._offsetY = value;
            this.forEachController(function (bloomStepController, i) {
                bloomStepController.offsetY = (i % 2 === 1) ? value : 0;
            });
        }

        setOffset(x, y) {
            this.offsetX = x;
            this.offsetY = y;
            return this;
        }

        get blurStrength() {
            return this._blurStrength;
        }

        set blurStrength(value) {
            this._blurStrength = value;
            this.forEachController(function (bloomStepController) {
                bloomStepController.strength = value;
            });
        }

        setBlurStrength(blurStrength) {
            this.blurStrength = blurStrength;
            return this;
        }

        get color() {
            return this._color;
        }

        set color(value) {
            this._color = value;
            this.forEachController(function (bloomStepController) {
                bloomStepController.color = value;
            });
        }

        setColor(color) {
            this.color = color;
            return this;
        }

        get strength() {
            return this._strength;
        }

        set strength(value) {
            this._strength = value;
            this.blend.amount = value;
        }

        setStrength(strength) {
            this.strength = strength;
            return this;
        }

    };

    var InstallBloomFX = function (game) {
        game = GetGame(game);

        var success = RegisterFilter(game, BloomStepFilter);
        if (!success) {
            return false;
        }

        AddFilterListMethod(
            'addP3Bloom',
            function (color, offsetX, offsetY, blurStrength, strength, steps) {
                if (color === undefined) { color = 0xFFFFFF; }
                if (offsetX === undefined) { offsetX = 1; }
                if (offsetY === undefined) { offsetY = 1; }
                if (blurStrength === undefined) { blurStrength = 1; }
                if (strength === undefined) { strength = 1; }
                if (steps === undefined) { steps = 4; }

                return this.add(new BloomController$1(
                    this.camera,
                    { color, offsetX, offsetY, blurStrength, strength, steps }
                ));
            }
        );

        return true;
    };

    var AddBloomProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'bloomColor')) {
            return gameObject;
        }

        InstallBloomFX(gameObject);

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._bloom);
                        gameObject._bloom = undefined;
                    }
                } else {
                    if (!gameObject._bloom) {
                        gameObject._bloom = filterList.addBloom(bloomColor, bloomOffsetX, bloomOffsetY, bloomBlurStrength, bloomStrength, bloomSteps);
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

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._blur);
                        gameObject._blur = undefined;
                    }
                } else {
                    if (!gameObject._blur) {
                        gameObject._blur = filterList.addBlur(blurQuality, blurX, blurY, blurStrength, blurColor, blurSteps);
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

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._bokeh);
                        gameObject._bokeh = undefined;
                    }
                } else {
                    if (!gameObject._bokeh) {
                        gameObject._bokeh = filterList.addBokeh(bokehRadius, bokehAmount, bokehContrast);
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

    const FilterName$4 = 'FilterP3Circle';

    // Built-in fx in phaser3

    const frag$4 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec2 texSize;
uniform vec3 color;
uniform vec4 backgroundColor;
uniform vec3 config;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    float thickness = config.x;
    float scale = config.y;
    float feather = config.z;

    vec4 texture = texture2D(uMainSampler, outTexCoord);

    vec2 position = (gl_FragCoord.xy / texSize.xy) * 2.0 - 1.0;

    float aspectRatio = texSize.x / texSize.y;

    position.x *= aspectRatio;

    float grad = length(position);

    //  height > width
    float outer = aspectRatio;
    float inner = outer - (thickness * 2.0 / texSize.y);

    //  width > height
    if (aspectRatio >= 1.0)
    {
        float f = 2.0 + (texSize.y / texSize.x);
        outer = 1.0;
        inner = 1.0 - (thickness * f / texSize.x);
    }

    outer *= scale;
    inner *= scale;

    float circle = smoothstep(outer, outer - 0.01, grad);

    float ring = circle - smoothstep(inner, inner - feather, grad);

    texture = mix(backgroundColor * backgroundColor.a, texture, texture.a);

    texture = (texture * (circle - ring));

    gl_FragColor = vec4(texture.rgb + (ring * color), texture.a);
}
`;

    class CircleFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
        static FilterName = FilterName$4;

        constructor(manager) {
            super(FilterName$4, manager, null, frag$4);
        }

        // This method sets up the uniforms for the shader.
        setupUniforms(controller, drawingContext) {
            const programManager = this.programManager;

            programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
            programManager.setUniform('color', controller.glcolor);
            programManager.setUniform('backgroundColor', controller.glcolor2);
            programManager.setUniform('config', [controller.thickness, controller.scale, controller.feather]);
        }

    }

    const GetValue$7 = Phaser.Utils.Objects.GetValue;

    class CircleController extends Phaser.Filters.Controller {
        static FilterName = FilterName$4;

        constructor(camera, config) {
            super(camera, FilterName$4);

            this.thickness = 8;
            this.scale = 1;
            this.feather = 0.005;
            this.glcolor = [1, 0.2, 0.7];
            this.glcolor2 = [1, 0, 0, 0.4];

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setThickness(GetValue$7(o, 'thickness', 8));
            this.setScale(GetValue$7(o, 'scale', 1));
            this.setFeather(GetValue$7(o, 'feather', 0.005));
            this.setColor(GetValue$7(o, 'color', 0xFF33B2));
            this.setBackgroundColor(GetValue$7(o, 'backgroundColor', 0xFF0000));
            this.setBackgroundAlpha(GetValue$7(o, 'backgroundAlpha', 0.4));

            return this;
        }

        get color() {
            var color = this.glcolor;

            return (((color[0] * 255) << 16) + ((color[1] * 255) << 8) + (color[2] * 255 | 0));
        }

        set color(value) {
            var color = this.glcolor;

            color[0] = ((value >> 16) & 0xFF) / 255;
            color[1] = ((value >> 8) & 0xFF) / 255;
            color[2] = (value & 0xFF) / 255;
        }

        get backgroundColor() {
            var color = this.glcolor2;

            return (((color[0] * 255) << 16) + ((color[1] * 255) << 8) + (color[2] * 255 | 0));
        }

        set backgroundColor(value) {
            var color = this.glcolor2;

            color[0] = ((value >> 16) & 0xFF) / 255;
            color[1] = ((value >> 8) & 0xFF) / 255;
            color[2] = (value & 0xFF) / 255;
        }

        get backgroundAlpha() {
            var color = this.glcolor2;
            return color[3];
        }

        set backgroundAlpha(value) {
            var color = this.glcolor2;
            color[3] = value;
        }


        setThickness(thickness) {
            this.thickness = thickness;
            return this;
        }

        setScale(scale) {
            this.scale = scale;
            return this;
        }

        setFeather(feather) {
            this.feather = feather;
            return this;
        }

        setColor(color) {
            this.color = color;
            return this;
        }

        setBackgroundColor(color) {
            this.backgroundColor = color;
            return this;
        }

        setBackgroundAlpha(alpha) {
            this.backgroundAlpha = alpha;
            return this;
        }

    }

    var InstallCircleFX = function (game) {
        game = GetGame(game);

        var success = RegisterFilter(game, CircleFilter);
        if (!success) {
            return false;
        }

        AddFilterListMethod(
            'addP3Bloom',
            function (color, offsetX, offsetY, blurStrength, strength, steps) {
                if (color === undefined) { color = 0xFFFFFF; }
                if (offsetX === undefined) { offsetX = 1; }
                if (offsetY === undefined) { offsetY = 1; }
                if (blurStrength === undefined) { blurStrength = 1; }
                if (strength === undefined) { strength = 1; }
                if (steps === undefined) { steps = 4; }

                return this.add(new BloomController(
                    this.camera,
                    { color, offsetX, offsetY, blurStrength, strength, steps }
                ));
            }
        );

        AddFilterListMethod(
            'addP3Circle',
            function (thickness, color, backgroundColor, scale, feather) {
                if (thickness === undefined) { thickness = 8; }
                if (color === undefined) { color = 0xFF33B2; }
                if (backgroundColor === undefined) { backgroundColor = 0xFF0000; }
                if (scale === undefined) { scale = 1; }
                if (feather === undefined) { feather = 0.005; }

                return this.add(new CircleController(
                    this.camera,
                    { thickness, color, backgroundColor, scale, feather }
                ));
            }
        );

        return true;
    };

    var AddCircleProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'circleColor')) {
            return gameObject;
        }

        InstallCircleFX(gameObject);

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._circle);
                        gameObject._circle = undefined;
                    }
                } else {
                    if (!gameObject._circle) {
                        gameObject._circle = filterList.addP3Circle(circleThickness, circleColor, circleBackgroundColor, circleScale, circleFeather);
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

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._displacement);
                        gameObject._displacement = undefined;
                    }
                } else {
                    if (!gameObject._displacement) {
                        gameObject._displacement = filterList.addDisplacement(displacementKey, displacementX, displacementY);
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

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._glow);
                        gameObject._glow = undefined;
                    }
                } else {
                    if (!gameObject._glow) {
                        gameObject._glow = filterList.addGlow(glowColor, glowOuterStrength, glowInnerStrength);
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

    const FilterName$3 = 'FilterP3Gradient';

    // Built-in fx in phaser3

    const frag$3 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

#define SRGB_TO_LINEAR(c) pow((c), vec3(2.2))
#define LINEAR_TO_SRGB(c) pow((c), vec3(1.0 / 2.2))
#define SRGB(r, g, b) SRGB_TO_LINEAR(vec3(float(r), float(g), float(b)) / 255.0)

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform float alpha;
uniform vec2 positionFrom;
uniform vec2 positionTo;
uniform vec3 color1;
uniform vec3 color2;
uniform int size;

#pragma phaserTemplate(fragmentHeader)

float gradientNoise(in vec2 uv)
{
    const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
    return fract(magic.z * fract(dot(uv, magic.xy)));
}

float stepped (in float s, in float scale, in int steps)
{
    return steps > 0 ? floor( s / ((1.0 * scale) / float(steps))) * 1.0 / float(steps - 1) : s;
}

void main ()
{
    vec2 a = positionFrom;
    vec2 b = positionTo;
    vec2 ba = b - a;

    float d = dot(outTexCoord - a, ba) / dot(ba, ba);
    float t = size > 0 ? stepped(d, 1.0, size) : d;

    t = smoothstep(0.0, 1.0, clamp(t, 0.0, 1.0));

    vec3 color = mix(SRGB(color1.r, color1.g, color1.b), SRGB(color2.r, color2.g, color2.b), t);

    color = LINEAR_TO_SRGB(color);
    color += (1.0 / 255.0) * gradientNoise(outTexCoord) - (0.5 / 255.0);

    vec4 texture = texture2D(uMainSampler, outTexCoord);

    gl_FragColor = vec4(mix(color.rgb, texture.rgb, alpha), 1.0) * texture.a;
}
`;

    class GradientFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
        static FilterName = FilterName$3;

        constructor(manager) {
            super(FilterName$3, manager, null, frag$3);
        }

        // This method sets up the uniforms for the shader.
        setupUniforms(controller, drawingContext) {
            const programManager = this.programManager;

            programManager.setUniform('alpha', controller.alpha);

            programManager.setUniform('positionFrom', [controller.fromX, controller.fromY]);
            programManager.setUniform('positionTo', [controller.toX, controller.toY]);
            programManager.setUniform('color1', controller.glcolor1);
            programManager.setUniform('color2', controller.glcolor2);
            programManager.setUniform('size', controller.size);
        }

    }

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    class GradientController extends Phaser.Filters.Controller {
        static FilterName = FilterName$3;

        constructor(camera, config) {
            super(camera, FilterName$3);

            this.alpha = 0.2;
            this.fromX = 0;
            this.fromY = 0;
            this.toX = 0;
            this.toY = 1;
            this.glcolor1 = [255, 0, 0];
            this.glcolor2 = [0, 255, 0];
            this.size = 0;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setAlpha(GetValue$6(o, 'alpha', 0.2));
            this.setFromPosition(GetValue$6(o, 'fromX', 0), GetValue$6(o, 'fromY', 0));
            this.setToPosition(GetValue$6(o, 'toX', 0), GetValue$6(o, 'toY', 1));
            this.setColor1(GetValue$6(o, 'color1', 0xff0000));
            this.setColor2(GetValue$6(o, 'color2', 0x00ff00));
            this.setSize(GetValue$6(o, 'size', 0));

            return this;
        }

        get color1() {
            var color = this.glcolor1;
            return (((color[0]) << 16) + ((color[1]) << 8) + (color[2] | 0));
        }

        set color1(value) {
            var color = this.glcolor1;
            color[0] = ((value >> 16) & 0xFF);
            color[1] = ((value >> 8) & 0xFF);
            color[2] = (value & 0xFF);
        }

        get color2() {
            var color = this.glcolor2;
            return (((color[0]) << 16) + ((color[1]) << 8) + (color[2] | 0));
        }

        set color2(value) {
            var color = this.glcolor2;
            color[0] = ((value >> 16) & 0xFF);
            color[1] = ((value >> 8) & 0xFF);
            color[2] = (value & 0xFF);
        }

        setAlpha(alpha) {
            this.alpha = alpha;
            return this;
        }

        setFromPosition(x, y) {
            this.fromX = x;
            this.fromY = y;
            return this;
        }

        setToPosition(x, y) {
            this.toX = x;
            this.toY = y;
            return this;
        }

        setColor1(color1) {
            this.color1 = color1;
            return this;
        }

        setColor2(color2) {
            this.color2 = color2;
            return this;
        }

        setSize(size) {
            this.size = size;
            return this;
        }

    }

    var InstallGradientFX = function (game) {
        game = GetGame(game);

        var success = RegisterFilter(game, GradientFilter);    if (!success) {
            return false;
        }

        AddFilterListMethod(
            'addP3Gradient',
            function (color1, color2, alpha, fromX, fromY, toX, toY, size) {
                if (color1 === undefined) { color1 = 0xff0000; }
                if (color2 === undefined) { color2 = 0x00ff00; }
                if (alpha === undefined) { alpha = 0.2; }
                if (fromX === undefined) { fromX = 0; }
                if (fromY === undefined) { fromY = 0; }
                if (toX === undefined) { toX = 0; }
                if (toY === undefined) { toY = 1; }
                if (size === undefined) { size = 0; }

                return this.add(new GradientController(
                    this.camera,
                    { color1, color2, alpha, fromX, fromY, toX, toY, size }
                ));
            }
        );

        return true;
    };

    var AddGradientProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'gradientColor')) {
            return gameObject;
        }

        InstallGradientFX(gameObject);

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._gradient);
                        gameObject._gradient = undefined;
                    }
                } else {
                    if (!gameObject._gradient) {
                        gameObject._gradient = filterList.addP3Gradient(gradientColor1, gradientColor2, gradientAlpha, gradientFromX, gradientFromY, gradientToX, gradientToY, gradientSize);
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

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._pixelateEffect);
                        gameObject._pixelateEffect = undefined;
                    }
                } else {
                    if (!gameObject._pixelateEffect) {
                        gameObject._pixelateEffect = filterList.addPixelate();
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

    const FilterName$2 = 'FilterP3Wipe';

    // Built-in fx in phaser3

    const frag$2 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec4 config;
uniform bool reveal;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    vec2 uv = outTexCoord;

    vec4 color0;
    vec4 color1;

    if (reveal) {
        color0 = vec4(0);
        color1 = texture2D(uMainSampler, uv);
    } else {
        color0 = texture2D(uMainSampler, uv);
        color1 = vec4(0);
    }

    float distance = config.x;
    float width = config.y;
    float direction = config.z;
    float axis = uv.x;

    if (config.w == 1.0) {
        axis = uv.y;
    }

    float adjust = mix(width, -width, distance);
    float value = smoothstep(distance - width, distance + width, abs(direction - axis) + adjust);
    gl_FragColor = mix(color1, color0, value);
}
`;

    class WarpFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
        static FilterName = FilterName$2;

        constructor(manager) {
            super(FilterName$2, manager, null, frag$2);
        }

        // This method sets up the uniforms for the shader.
        setupUniforms(controller, drawingContext) {
            const programManager = this.programManager;

            programManager.setUniform('config', [controller.progress, controller.wipeWidth, controller.direction, controller.axis]);
            programManager.setUniform('reveal', controller.reveal);
        }

    }

    const GetValue$5 = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class WipeController extends Phaser.Filters.Controller {
        static FilterName = FilterName$2;

        constructor(camera, config) {
            super(camera, FilterName$2);

            this.progress = 0;
            this.wipeWidth = 0.1;
            this.direction = 0;
            this.axis = 0;
            this.reveal = false;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setProgress(GetValue$5(o, 'progress', 0));
            this.setWipeWidth(GetValue$5(o, 'wipeWidth', 0.1));
            this.setDirection(GetValue$5(o, 'direction', 0));
            this.setAxis(GetValue$5(o, 'axis', 0));

            var reveal = GetValue$5(o, 'reveal', undefined);
            if (reveal === undefined) {
                reveal = !GetValue$5(o, 'wipe', true);
            }
            if (reveal) {
                this.enableRevealMode();
            } else {
                this.enableWipeMode();
            }

            return this;
        }

        get progress() {
            return this._progress;
        }

        set progress(value) {
            this._progress = Clamp(value, 0, 1);
        }

        setProgress(value) {
            this.progress = value;
            return this;
        }

        get wipeWidth() {
            return this._wipeWidth;
        }

        set wipeWidth(value) {
            this._wipeWidth = Clamp(value, 0, 1);
        }

        setWipeWidth(wipeWidth) {
            this.wipeWidth = wipeWidth;
            return this;
        }

        setDirection(direction) {
            this.direction = direction;
            return this;
        }

        setAxis(axis) {
            this.axis = axis;
            return this;
        }

        enableWipeMode() {
            this.reveal = false;
            return this;
        }

        enableRevealMode() {
            this.reveal = true;
            return this;
        }

    }

    var InstallWipeFX = function (game) {
        game = GetGame(game);

        var success = RegisterFilter(game, WarpFilter);
        if (!success) {
            return false;
        }

        AddFilterListMethod(
            'addP3Wipe',
            function (wipeWidth, direction, axis) {
                if (wipeWidth === undefined) { wipeWidth = 0.1; }
                if (direction === undefined) { direction = 0; }
                if (axis === undefined) { axis = 0; }

                return this.add(new WipeController(
                    this.camera,
                    { wipeWidth, direction, axis }
                ));
            }
        );

        AddFilterListMethod(
            'addP3Reveal',
            function (wipeWidth, direction, axis) {
                if (wipeWidth === undefined) { wipeWidth = 0.1; }
                if (direction === undefined) { direction = 0; }
                if (axis === undefined) { axis = 0; }

                return this.add(new WipeController(
                    this.camera,
                    { wipeWidth, direction, axis, reveal: true }
                ));
            }
        );

        return true;
    };

    var AddRevealProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'revealLeft')) {
            return gameObject;
        }

        InstallWipeFX(gameObject);

        var filterList = GetFilterList(gameObject);

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
                filterList.remove(gameObject._revealEffect);
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
                        gameObject._revealEffect = filterList.addP3Reveal(revealWidth, 0, 0);
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
                        gameObject._revealEffect = filterList.addP3Reveal(revealWidth, 0, 0);
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
                        gameObject._revealEffect = filterList.addP3Reveal(revealWidth, 0, 0);
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
                        gameObject._revealEffect = filterList.addP3Reveal(revealWidth, 0, 0);
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

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._shadow);
                        gameObject._shadow = undefined;
                    }
                } else {
                    if (!gameObject._shadow) {
                        gameObject._shadow = filterList.addShadow(shadowX, shadowY, shadowDecay, shadowPower, shadowColor, shadowSamples, shadowIntensity);
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

    const FilterName$1 = 'FilterP3Shine';

    // Built-in fx in phaser3

    const frag$1 = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec4 config;
uniform bool reveal;
uniform vec2 texSize;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    float speed = config.x;
    float time = config.y;
    float lineWidth = config.z;
    float gradient = config.w;

	vec2 uv = gl_FragCoord.xy / texSize;

    vec4 tex = texture2D(uMainSampler, outTexCoord);

    vec4 col1 = vec4(0.3, 0.0, 0.0, 1.0);
    vec4 col2 = vec4(0.85, 0.85, 0.85, 1.0);

    uv.x = uv.x - mod(time * speed, 2.0) + 0.5;
    float y = uv.x * gradient;

    float s = smoothstep(y - lineWidth, y, uv.y) - smoothstep(y, y + lineWidth, uv.y);

    gl_FragColor = (((s * col1) + (s * col2)) * tex);

    if (!reveal)
    {
        //  Apply the shine effect
        gl_FragColor += tex;
    }
}
`;

    var GetTickDelta = function (game) {
        return GetGame(game).loop.delta;
    };

    const MaxPeriod = 60 * 60 * 1000;

    var GetCurrentTime = function (scene, prevTime) {
        var tickDelta = GetTickDelta(scene);
        var currentTime = prevTime + tickDelta;
        if (currentTime >= MaxPeriod) {
            currentTime -= MaxPeriod;
        }

        return currentTime;
    };

    class ShineFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
        static FilterName = FilterName$1;

        constructor(manager) {
            super(FilterName$1, manager, null, frag$1);
        }

        // This method sets up the uniforms for the shader.
        setupUniforms(controller, drawingContext) {
            const programManager = this.programManager;

            controller.now = GetCurrentTime(this.manager.renderer.game, controller.now);
            programManager.setUniform('config', [controller.speed, controller.now, controller.lineWidth, controller.gradient]);
            programManager.setUniform('reveal', controller.reveal);
            programManager.setUniform('texSize', [drawingContext.width, drawingContext.height]);
        }

    }

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    class ShineController extends Phaser.Filters.Controller {
        static FilterName = FilterName$1;

        constructor(camera, config) {
            super(camera, FilterName$1);

            this.now = 0;

            this.speed = 0.5;
            this.lineWidth = 0.5;
            this.gradient = 3;
            this.reveal = false;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setSpeed(GetValue$4(o, 'speed', 0.5));
            this.setLineWidth(GetValue$4(o, 'lineWidth', 0.5));
            this.setGradient(GetValue$4(o, 'gradient', 3));
            this.setReveal(GetValue$4(o, 'reveal', false));

            return this;
        }

        setSpeed(speed) {
            this.speed = speed;
            return this;
        }

        setLineWidth(lineWidth) {
            this.lineWidth = lineWidth;
            return this;
        }

        setGradient(gradient) {
            this.gradient = gradient;
            return this;
        }

        setReveal(reveal) {
            this.reveal = reveal;
            return this;
        }
    }

    var InstallShineFX = function (game) {
        game = GetGame(game);

        var success = RegisterFilter(game, ShineFilter);
        if (!success) {
            return false;
        }

        AddFilterListMethod(
            'addP3Shine',
            function (speed, lineWidth, gradient, reveal) {
                if (speed === undefined) { speed = 0.5; }
                if (lineWidth === undefined) { lineWidth = 0.5; }
                if (gradient === undefined) { gradient = 3; }
                if (reveal === undefined) { reveal = false; }

                return this.add(new ShineController(
                    this.camera,
                    { speed, lineWidth, gradient, reveal }
                ));
            }
        );

        return true;
    };

    var AddShineProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'shineSpeed')) {
            return gameObject;
        }

        InstallShineFX(gameObject);

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._shine);
                        gameObject._shine = undefined;
                    }
                } else {
                    if (!gameObject._shine) {
                        gameObject._shine = filterList.addP3Shine(shineSpeed, shineLineWidth, shineGradient);
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

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._tiltShift);
                        gameObject._tiltShift = undefined;
                    }
                } else {
                    if (!gameObject._tiltShift) {
                        gameObject._tiltShift = filterList.addTiltShift(tiltShiftRadius, tiltShiftAmount, tiltShiftContrast, tiltShiftBlurX, tiltShiftBlurY, tiltShiftStrength);
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

    const FilterName = 'FilterP3Vignette';

    // Built-in fx in phaser3

    const frag = `\
#pragma phaserTemplate(shaderName)

#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D uMainSampler; 
varying vec2 outTexCoord;

// Effect parameters
uniform vec2 config;
uniform vec2 position;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
    float radius = config.x;
    float strength = config.y;

    vec4 col = vec4(1.0);

    float d = length(outTexCoord - position);

    if (d <= radius)
    {
        float g = d / radius;
        g = sin(g * 3.14 * strength);
    	col = vec4(g * g * g);
    }

    vec4 texture = texture2D(uMainSampler, outTexCoord);

    gl_FragColor = texture * (1.0 - col);
}
`;

    class VignetteFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
        static FilterName = FilterName;

        constructor(manager) {
            super(FilterName, manager, null, frag);
        }

        // This method sets up the uniforms for the shader.
        setupUniforms(controller, drawingContext) {
            const programManager = this.programManager;

            programManager.setUniform('config', [controller.radius, controller.strength]);
            programManager.setUniform('position', [controller.x, controller.y]);
        }

    }

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    class VignetteController extends Phaser.Filters.Controller {
        static FilterName = FilterName;

        constructor(camera, config) {
            super(camera, FilterName);

            this.x = 0.5;
            this.y = 0.5;
            this.radius = 0.5;
            this.strength = 0.5;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setPosition(GetValue$3(o, 'x', 0.5), GetValue$3(o, 'y', 0.5));
            this.setRadius(GetValue$3(o, 'radius', 0.5));
            this.setStrength(GetValue$3(o, 'strength', 0.5));

            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setRadius(radius) {
            this.radius = radius;
            return this;
        }

        setStrength(strength) {
            this.strength = strength;
            return this;
        }
    }

    var InstallVignetteFX = function (game) {
        game = GetGame(game);

        var success = RegisterFilter(game, VignetteFilter);
        if (!success) {
            return false;
        }

        AddFilterListMethod(
            'addP3Vignette',
            function (x, y, radius, strength) {
                if (x === undefined) { x = 0.5; }
                if (y === undefined) { y = 0.5; }
                if (radius === undefined) { radius = 0.5; }
                if (strength === undefined) { strength = 0.5; }

                return this.add(new VignetteController(
                    this.camera,
                    { x, y, radius, strength }
                ));
            }
        );

        return true;
    };

    var AddVignetteProperties = function (gameObject) {
        // Don't attach properties again
        if (HasProperty(gameObject, 'vignetteRadius')) {
            return gameObject;
        }

        InstallVignetteFX(gameObject);

        var filterList = GetFilterList(gameObject);

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
                        filterList.remove(gameObject._vignette);
                        gameObject._vignette = undefined;
                    }
                } else {
                    if (!gameObject._vignette) {
                        gameObject._vignette = filterList.addP3Vignette(vignetteX, vignetteY, vignetteRadius, vignetteStrength);
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

        InstallWipeFX(gameObject);

        var filterList = GetFilterList(gameObject);

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
                filterList.remove(gameObject._wipeEffect);
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
                        gameObject._wipeEffect = filterList.addP3Wipe(wipeWidth, 0, 0);
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
                        gameObject._wipeEffect = filterList.addP3Wipe(wipeWidth, 0, 0);
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
                        gameObject._wipeEffect = filterList.addP3Wipe(wipeWidth, 0, 0);
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
                        gameObject._wipeEffect = filterList.addP3Wipe(wipeWidth, 0, 0);
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
        blocky: AddBlockyProperties,
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
            return gameObject.getTopLeft(output, includeParent);
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
            return gameObject.getTopRight(output, includeParent);
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
            return gameObject.getBottomLeft(output, includeParent);
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
            return gameObject.getBottomRight(output, includeParent);
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
        var strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent;
        if (typeof (config) === 'number') {
            strokeColor = config;
        } else {
            strokeColor = GetValue$2(config, 'color');
            lineWidth = GetValue$2(config, 'lineWidth');
            fillColor = GetValue$2(config, 'fillColor');
            fillAlpha = GetValue$2(config, 'fillAlpha');
            padding = GetValue$2(config, 'padding');
            includeParent = GetValue$2(config, 'includeParent');
        }

        if (strokeColor === undefined) { strokeColor = 0xffffff; }
        if (lineWidth === undefined) { lineWidth = 1; }
        if (fillColor === undefined) { fillColor = null; }    if (fillAlpha === undefined) { fillAlpha = 1; }    if (padding === undefined) { padding = 0; }
        if (includeParent === undefined) { includeParent = true; }

        if (Array.isArray(gameObjects)) {
            for (var i = 0, cnt = gameObjects.length; i < cnt; i++) {
                Draw(gameObjects[i], graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent);
            }
        } else {
            Draw(gameObjects, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent);
        }
    };

    var Draw = function (gameObject, graphics, strokeColor, lineWidth, fillColor, fillAlpha, padding, includeParent) {
        var canDrawBound = gameObject.getBounds ||
            ((gameObject.width !== undefined) && (gameObject.height !== undefined));
        if (!canDrawBound) {
            return;
        }

        var p0 = GetTopLeft(gameObject, Points[0], includeParent);
        p0.x -= padding;
        p0.y -= padding;

        var p1 = GetTopRight(gameObject, Points[1], includeParent);
        p1.x += padding;
        p1.y -= padding;

        var p2 = GetBottomRight(gameObject, Points[2], includeParent);
        p2.x += padding;
        p2.y += padding;

        var p3 = GetBottomLeft(gameObject, Points[3], includeParent);
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
    const LayerClass$1 = Phaser.GameObjects.Layer;

    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass) || (object instanceof LayerClass$1);
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
