(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdissolvefilterplugin = factory());
})(this, (function () { 'use strict';

    const FilterName = 'rexFilterDissolve';

    // Reference: https://medium.com/neosavvy-labs/webgl-with-perlin-noise-part-1-a87b56bbc9fb
    const frag$1 = `\
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
float Perlin(vec3 P) {
    vec3 i0 = mod289(floor(P)), i1 = mod289(i0 + vec3(1.0));
    vec3 f0 = fract(P), f1 = f0 - vec3(1.0), f = fade(f0);
    vec4 ix = vec4(i0.x, i1.x, i0.x, i1.x), iy = vec4(i0.yy, i1.yy);
    vec4 iz0 = i0.zzzz, iz1 = i1.zzzz;
    vec4 ixy = permute(permute(ix) + iy), ixy0 = permute(ixy + iz0), ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 * (1.0 / 7.0), gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    vec4 gx1 = ixy1 * (1.0 / 7.0), gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0); gx1 = fract(gx1);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0), sz0 = step(gz0, vec4(0.0));
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1), sz1 = step(gz1, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5); gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    gx1 -= sz1 * (step(0.0, gx1) - 0.5); gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g0 = vec3(gx0.x,gy0.x,gz0.x), g1 = vec3(gx0.y,gy0.y,gz0.y),
        g2 = vec3(gx0.z,gy0.z,gz0.z), g3 = vec3(gx0.w,gy0.w,gz0.w),
        g4 = vec3(gx1.x,gy1.x,gz1.x), g5 = vec3(gx1.y,gy1.y,gz1.y),
        g6 = vec3(gx1.z,gy1.z,gz1.z), g7 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g0,g0), dot(g2,g2), dot(g1,g1), dot(g3,g3)));
    vec4 norm1 = taylorInvSqrt(vec4(dot(g4,g4), dot(g6,g6), dot(g5,g5), dot(g7,g7)));
    g0 *= norm0.x; g2 *= norm0.y; g1 *= norm0.z; g3 *= norm0.w;
    g4 *= norm1.x; g6 *= norm1.y; g5 *= norm1.z; g7 *= norm1.w;
    vec4 nz = mix(vec4(dot(g0, vec3(f0.x, f0.y, f0.z)), dot(g1, vec3(f1.x, f0.y, f0.z)),
        dot(g2, vec3(f0.x, f1.y, f0.z)), dot(g3, vec3(f1.x, f1.y, f0.z))),
        vec4(dot(g4, vec3(f0.x, f0.y, f1.z)), dot(g5, vec3(f1.x, f0.y, f1.z)),
            dot(g6, vec3(f0.x, f1.y, f1.z)), dot(g7, vec3(f1.x, f1.y, f1.z))), f.z);
    return 2.2 * mix(mix(nz.x,nz.z,f.y), mix(nz.y,nz.w,f.y), f.x);
}
float Perlin(vec2 P) { return Perlin(vec3(P, 0.0)); }
`;

    // https://github.com/ykob/glsl-dissolve/blob/master/src/glsl/dissolve.fs


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
uniform sampler2D uMainSampler2;

uniform int resizeMode;
uniform float progress;
uniform float fromRatio;
uniform float toRatio;
varying vec2 outFragCoord;
// Effect parameters
uniform float noiseX;
uniform float noiseY;
uniform float noiseZ;
uniform float fromEdgeStart;
uniform float fromEdgeWidth;
uniform float toEdgeStart;
uniform float toEdgeWidth;

${frag$1}

vec4 getFromColor (vec2 uv) {
  return texture2D(uMainSampler, uv);
}

vec4 getToColor (vec2 uv) {
  if (resizeMode == 2) {
    //  cover
    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, uv.y) - 0.5) * vec2(min(fromRatio / toRatio, 1.0), min((toRatio / fromRatio), 1.0)));
  } else if (resizeMode == 1) {
    //  contain
    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, uv.y) - 0.5) * vec2(max(fromRatio / toRatio, 1.0), max((toRatio / fromRatio), 1.0)));
  } else {
    //  stretch
    return texture2D(uMainSampler2, vec2(uv.x, uv.y));
  }
}

vec4 transition (vec2 uv) {    
  vec4 colorFront = getFromColor(uv);
  vec4 colorTo = getToColor(uv);

  float noise = (Perlin(vec3(uv.x * noiseX, uv.y * noiseY, noiseZ)) + 1.0) / 2.0
    * (1.0 - (fromEdgeStart + fromEdgeWidth + toEdgeStart + toEdgeWidth))
    + (fromEdgeStart + fromEdgeWidth + toEdgeStart + toEdgeWidth) * 0.5;
  vec4 colorResult = colorFront * smoothstep(progress - (fromEdgeStart + fromEdgeWidth), progress - fromEdgeStart, noise)
    + colorTo * smoothstep((1.0 - progress) - (toEdgeStart + toEdgeWidth), (1.0 - progress) - toEdgeStart, (1.0 - noise));
  return colorResult;
}

#pragma phaserTemplate(fragmentHeader)

void main () {
  vec2 uv = outFragCoord;
  gl_FragColor = transition(uv);
}
`;

    class DissolveFilter extends Phaser.Renderer.WebGL.RenderNodes.BaseFilterShader {
        static FilterName = FilterName;

        constructor(manager) {
            super(FilterName, manager, null, frag);
        }

        setupTextures(controller, textures, drawingContext) {
            textures[1] = controller.toFrame.glTexture;
        }

        // This method sets up the uniforms for the shader.
        setupUniforms(controller, drawingContext) {
            const programManager = this.programManager;

            programManager.setUniform('progress', controller.progress);
            programManager.setUniform('resizeMode', controller.resizeMode);
            programManager.setUniform('noiseX', controller.noiseX);
            programManager.setUniform('noiseY', controller.noiseY);
            programManager.setUniform('noiseZ', controller.noiseZ);
            programManager.setUniform('fromEdgeStart', controller.fromEdgeStart);
            programManager.setUniform('fromEdgeWidth', controller.fromEdgeWidth);
            programManager.setUniform('toEdgeStart', controller.toEdgeStart);
            programManager.setUniform('toEdgeWidth', controller.toEdgeWidth);

            programManager.setUniform('fromRatio', drawingContext.width / drawingContext.height);
            programManager.setUniform('toRatio', controller.toRatio);

            programManager.setUniform('uMainSampler2', 1);

        }
    }

    const GetValue = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class DissolveController extends Phaser.Filters.Controller {
        static FilterName = FilterName;

        constructor(camera, config) {
            super(camera, FilterName);

            this._progress = 0;
            this.resizeMode = 1;
            this.noiseX = 0;
            this.noiseY = 0;
            this.noiseZ = 0;
            this.fromEdgeStart = 0.01;
            this.fromEdgeWidth = 0.05;
            this.toEdgeStart = 0.01;
            this.toEdgeWidth = 0.05;

            this.toFrame = null;
            this.toRatio = 1;

            this.resetFromJSON(config);
        }

        destroy() {
            this.toFrame = null;
            super.destroy();
        }

        resetFromJSON(o) {
            this.setProgress(GetValue(o, 'progress', 0));
            this.setTransitionTargetTexture(GetValue(o, 'toTexture', '__DEFAULT'), GetValue(o, 'toFrame', undefined), GetValue(o, 'resizeMode', 1));
            this.setNoise(GetValue(o, 'noiseX', undefined), GetValue(o, 'noiseY', undefined), GetValue(o, 'noiseZ', undefined));
            this.setFromEdge(GetValue(o, 'fromEdgeStart', 0.01), GetValue(o, 'fromEdgeWidth', 0.05));
            this.setToEdge(GetValue(o, 'toEdgeStart', 0.01), GetValue(o, 'toEdgeWidth', 0.05));
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

        setResizeMode(mode) {
            if (typeof (mode) === 'string') {
                mode = ResizeMode[mode];
            }
            this.resizeMode = mode;
            return this;
        }

        setNoise(x, y, z) {
            if (x === undefined) {
                x = 4 + Math.random() * 6;
            }
            if (y === undefined) {
                y = 4 + Math.random() * 6;
            }
            if (z === undefined) {
                z = Math.random() * 10;
            }
            this.noiseX = x;
            this.noiseY = y;
            this.noiseZ = z;
            return this;
        }

        setFromEdge(edgeStart, edgeWidth) {
            this.fromEdgeStart = edgeStart;
            this.fromEdgeWidth = edgeWidth;
            return this;
        }

        setToEdge(edgeStart, edgeWidth) {
            this.toEdgeStart = edgeStart;
            this.toEdgeWidth = edgeWidth;
        }

        setTransitionTargetTexture(key, frame, resizeMode) {
            if (key === undefined) {
                key = '__DEFAULT';
            }
            var textures = this.camera.scene.sys.textures;
            var phaserTexture = textures.getFrame(key, frame);

            if (!phaserTexture) {
                phaserTexture = textures.getFrame('__DEFAULT');
            }

            this.toRatio = phaserTexture.width / phaserTexture.height;

            this.toFrame = phaserTexture;

            if (resizeMode !== undefined) {
                this.resizeMode = resizeMode;
            }

            return this;
        }
    }

    /**
     * Set the resize mode of the target texture.
     * 
     * Can be either:
     * 
     * 0 - Stretch. The target texture is stretched to the size of the source texture.
     * 1 - Contain. The target texture is resized to fit the source texture. This is the default.
     * 2 - Cover. The target texture is resized to cover the source texture.
     * 
     * If the source and target textures are the same size, then use a resize mode of zero
     * for speed.
     *
     */
    const ResizeMode = {
        stretch: 0,
        contain: 1,
        cover: 2
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

    var AddController = function (gameObject, ControllerClass, config, external) {
        if (config === undefined) {
            config = {};
        }

        var filterList = GetFilterList(gameObject, external);

        var controller = filterList.add(
            new ControllerClass(filterList.camera, config)
        );

        if (config.name) {
            controller.name = config.name;
        }

        return controller;
    };

    const SpliceOne = Phaser.Utils.Array.SpliceOne;

    var RemoveController = function (gameObject, ControllerClass, name, external) {
        var list = GetFilterList(gameObject, external).list;
        if (name === undefined) {
            for (var i = (list.length - 1); i >= 0; i--) {
                var controller = list[i];
                if (controller instanceof ControllerClass) {
                    controller.destroy();
                    SpliceOne(controller, i);
                }
            }
        } else {
            for (var i = 0, cnt = list.length; i < cnt; i++) {
                var controller = list[i];
                if ((controller instanceof ControllerClass) && (controller.name === name)) {
                    controller.destroy();
                    SpliceOne(controller, i);
                }
            }
        }

    };

    var GetController = function (gameObject, ControllerClass, name, external) {
        var list = GetFilterList(gameObject, external).list;
        if (name === undefined) {
            var result = [];
            for (var i = 0, cnt = list.length; i < cnt; i++) {
                var controller = list[i];
                if (controller instanceof ControllerClass) {
                    result.push(controller);
                }
            }
            return result;
        } else {
            for (var i = 0, cnt = list.length; i < cnt; i++) {
                var controller = list[i];
                if ((controller instanceof ControllerClass) && (controller.name === name)) {
                    return controller;
                }
            }
        }
    };

    class FilterPluginBase extends Phaser.Plugins.BasePlugin {
        setFilterClass(FilterClass, ControllerClass) {
            this.FilterClass = FilterClass;
            this.ControllerClass = ControllerClass;
            return this;
        }

        setFilterListMethod(name, callback) {
            AddFilterListMethod(name, callback);
            return this;
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.once('destroy', this.destroy, this);

            if (this.game.isRunning) {
                RegisterFilter(this.game, this.FilterClass);

            } else {
                eventEmitter.once('ready', function () {
                    RegisterFilter(this.game, this.FilterClass);
                }, this);

            }

        }

        add(gameObject, config, external = false) {
            return AddController(gameObject, this.ControllerClass, config, external);
        }

        remove(gameObject, name, external = false) {
            RemoveController(gameObject, this.ControllerClass, name, external);
            return this;
        }

        get(gameObject, name, external = false) {
            return GetController(gameObject, this.ControllerClass, name, external);
        }
    }

    var IsInValidKey = function (keys) {
        return (keys == null) || (keys === '') || (keys.length === 0);
    };

    var GetEntry = function (target, keys, defaultEntry) {
        var entry = target;
        if (IsInValidKey(keys)) ; else {
            if (typeof (keys) === 'string') {
                keys = keys.split('.');
            }

            var key;
            for (var i = 0, cnt = keys.length; i < cnt; i++) {
                key = keys[i];
                if ((entry[key] == null) || (typeof (entry[key]) !== 'object')) {
                    var newEntry;
                    if (i === cnt - 1) {
                        if (defaultEntry === undefined) {
                            newEntry = {};
                        } else {
                            newEntry = defaultEntry;
                        }
                    } else {
                        newEntry = {};
                    }

                    entry[key] = newEntry;
                }

                entry = entry[key];
            }
        }

        return entry;
    };

    var SetValue = function (target, keys, value, delimiter) {
        if (delimiter === undefined) {
            delimiter = '.';
        }

        // no object
        if (typeof (target) !== 'object') {
            return;
        }

        // invalid key
        else if (IsInValidKey(keys)) {
            // don't erase target
            if (value == null) {
                return;
            }
            // set target to another object
            else if (typeof (value) === 'object') {
                target = value;
            }
        } else {
            if (typeof (keys) === 'string') {
                keys = keys.split(delimiter);
            }

            var lastKey = keys.pop();
            var entry = GetEntry(target, keys);
            entry[lastKey] = value;
        }

        return target;
    };

    class DissolveFilterPlugin extends FilterPluginBase {
        constructor(pluginManager) {
            super(pluginManager);
            this.setFilterClass(DissolveFilter, DissolveController);

            this.setFilterListMethod(
                'addRexDissolve',
                function (config) {
                    return this.add(new DissolveController(this.camera, config));
                }
            );
        }
    }

    SetValue(window, 'RexPlugins.Filters.DisolveFilter', DissolveFilter);
    SetValue(window, 'RexPlugins.Filters.DissolveController', DissolveController);

    return DissolveFilterPlugin;

}));
