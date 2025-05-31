(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexeffectpropertiesplugin = factory());
})(this, (function () { 'use strict';

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

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

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
            this.setOffset(GetValue$6(o, 'offsetX', 1), GetValue$6(o, 'offsetY', 1));
            this.setStrength(GetValue$6(o, 'strength', 1));
            this.setColor(GetValue$6(o, 'color', 0xFFFFFF));

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

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

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
            this.setOffset(GetValue$5(o, 'offsetX', 1), GetValue$5(o, 'offsetY', 1));
            this.setBlurStrength(GetValue$5(o, 'blurStrength', 1));
            this.setColor(GetValue$5(o, 'color', 0xFFFFFF));
            this.setStrength(GetValue$5(o, 'strength', 1));
            this.setSteps(GetValue$5(o, 'steps', 4));

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

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

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
            this.setThickness(GetValue$4(o, 'thickness', 8));
            this.setScale(GetValue$4(o, 'scale', 1));
            this.setFeather(GetValue$4(o, 'feather', 0.005));
            this.setColor(GetValue$4(o, 'color', 0xFF33B2));
            this.setBackgroundColor(GetValue$4(o, 'backgroundColor', 0xFF0000));
            this.setBackgroundAlpha(GetValue$4(o, 'backgroundAlpha', 0.4));

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

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

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
            this.setAlpha(GetValue$3(o, 'alpha', 0.2));
            this.setFromPosition(GetValue$3(o, 'fromX', 0), GetValue$3(o, 'fromY', 0));
            this.setToPosition(GetValue$3(o, 'toX', 0), GetValue$3(o, 'toY', 1));
            this.setColor1(GetValue$3(o, 'color1', 0xff0000));
            this.setColor2(GetValue$3(o, 'color2', 0x00ff00));
            this.setSize(GetValue$3(o, 'size', 0));

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

    const GetValue$2 = Phaser.Utils.Objects.GetValue;
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
            this.setProgress(GetValue$2(o, 'progress', 0));
            this.setWipeWidth(GetValue$2(o, 'wipeWidth', 0.1));
            this.setDirection(GetValue$2(o, 'direction', 0));
            this.setAxis(GetValue$2(o, 'axis', 0));

            var reveal = GetValue$2(o, 'reveal', undefined);
            if (reveal === undefined) {
                reveal = !GetValue$2(o, 'wipe', true);
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

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

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
            this.setSpeed(GetValue$1(o, 'speed', 0.5));
            this.setLineWidth(GetValue$1(o, 'lineWidth', 0.5));
            this.setGradient(GetValue$1(o, 'gradient', 3));
            this.setReveal(GetValue$1(o, 'reveal', false));

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

    const GetValue = Phaser.Utils.Objects.GetValue;

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
            this.setPosition(GetValue(o, 'x', 0.5), GetValue(o, 'y', 0.5));
            this.setRadius(GetValue(o, 'radius', 0.5));
            this.setStrength(GetValue(o, 'strength', 0.5));

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

    class EffectPropertiesPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(gameObject, config) {
            return AddEffectProperties(gameObject, config);
        }
    }

    return EffectPropertiesPlugin;

}));
