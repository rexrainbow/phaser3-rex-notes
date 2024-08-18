(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdissolvepipelineplugin = factory());
})(this, (function () { 'use strict';

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
    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, 1.0 - uv.y) - 0.5) * vec2(min(fromRatio / toRatio, 1.0), min((toRatio / fromRatio), 1.0)));
  } else if (resizeMode == 1) {
    //  contain
    return texture2D(uMainSampler2, 0.5 + (vec2(uv.x, 1.0 - uv.y) - 0.5) * vec2(max(fromRatio / toRatio, 1.0), max((toRatio / fromRatio), 1.0)));
  } else {
    //  stretch
    return texture2D(uMainSampler2, vec2(uv.x, 1.0 - uv.y));
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

void main () {
  vec2 uv = outFragCoord;
  gl_FragColor = transition(uv);
}
`;

    const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
    const GetValue = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class DissolvePostFxPipeline extends PostFXPipeline {
        constructor(game) {
            super({
                name: 'rexDissolvePostFx',
                game: game,
                renderTarget: true,
                fragShader: frag
            });

            this._progress = 0;
            this.toFrame = null;
            this.targetTexture = null;
            this.resizeMode = 1;
            this.toRatio = 1;

            this.noiseX = 0;
            this.noiseY = 0;
            this.noiseZ = 0;
            this.fromEdgeStart = 0.01;
            this.fromEdgeWidth = 0.05;
            this.toEdgeStart = 0.01;
            this.toEdgeWidth = 0.05;
        }

        resetFromJSON(o) {
            this.setProgress(GetValue(o, 'progress', 0));
            this.setTransitionTargetTexture(GetValue(o, 'toTexture', '__DEFAULT'), GetValue(o, 'toFrame', undefined), GetValue(o, 'resizeMode', 1));
            this.setNoise(GetValue(o, 'noiseX', undefined), GetValue(o, 'noiseY', undefined), GetValue(o, 'noiseZ', undefined));
            this.setFromEdge(GetValue(o, 'fromEdgeStart', 0.01), GetValue(o, 'fromEdgeWidth', 0.05));
            this.setToEdge(GetValue(o, 'toEdgeStart', 0.01), GetValue(o, 'toEdgeWidth', 0.05));
            return this;
        }

        onBoot() {

        }

        onPreRender() {
            this.set1f('progress', this.progress);
            this.set1i('resizeMode', this.resizeMode);

            this.set1f('noiseX', this.noiseX);
            this.set1f('noiseY', this.noiseY);
            this.set1f('noiseZ', this.noiseZ);
            this.set1f('fromEdgeStart', this.fromEdgeStart);
            this.set1f('fromEdgeWidth', this.fromEdgeWidth);
            this.set1f('toEdgeStart', this.toEdgeStart);
            this.set1f('toEdgeWidth', this.toEdgeWidth);
        }

        onDraw(renderTarget) {
            this.set1f('fromRatio', renderTarget.width / renderTarget.height);

            this.set1f('toRatio', this.toRatio);

            this.set1i('uMainSampler2', 1);

            this.bindTexture(this.targetTexture, 1);

            this.bindAndDraw(renderTarget);
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

        setTransitionTargetTexture(key, frame, resizeMode) {
            if (key === undefined) {
                key = '__DEFAULT';
            }
            var phaserTexture = this.game.textures.getFrame(key, frame);

            if (!phaserTexture) {
                phaserTexture = this.game.textures.getFrame('__DEFAULT');
            }

            this.toRatio = phaserTexture.width / phaserTexture.height;

            this.toFrame = phaserTexture;
            this.targetTexture = phaserTexture.glTexture;

            if (resizeMode !== undefined) {
                this.resizeMode = resizeMode;
            }

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
    var ResizeMode = {
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

    var RegisterPostPipeline = function (game, postFxPipelineName, PostFxPipelineClass) {
        GetGame(game).renderer.pipelines.addPostPipeline(postFxPipelineName, PostFxPipelineClass);
    };

    var AddPostFxPipelineInstance = function (gameObject, PostFxPipelineClass, config) {
        if (config === undefined) {
            config = {};
        }

        gameObject.setPostPipeline(PostFxPipelineClass);
        var pipeline = gameObject.postPipelines[gameObject.postPipelines.length - 1];
        pipeline.resetFromJSON(config);

        if (config.name) {
            pipeline.name = config.name;
        }

        return pipeline;
    };

    const SpliceOne = Phaser.Utils.Array.SpliceOne;

    var RemovePostFxPipelineInstance = function (gameObject, PostFxPipelineClass, name) {
        if (name === undefined) {
            var pipelines = gameObject.postPipelines;
            for (var i = (pipelines.length - 1); i >= 0; i--) {
                var instance = pipelines[i];
                if (instance instanceof PostFxPipelineClass) {
                    instance.destroy();
                    SpliceOne(pipelines, i);
                }
            }
        } else {
            var pipelines = gameObject.postPipelines;
            for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
                var instance = pipelines[i];
                if ((instance instanceof PostFxPipelineClass) && (instance.name === name)) {
                    instance.destroy();
                    SpliceOne(pipelines, i);
                }
            }
        }

        gameObject.hasPostPipeline = (gameObject.postPipelines.length > 0);

    };

    var GetPostFxPipelineInstance = function (gameObject, PostFxPipelineClass, name) {    
        if (name === undefined) {
            var result = [];
            var pipelines = gameObject.postPipelines;
            for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
                var instance = pipelines[i];
                if (instance instanceof PostFxPipelineClass) {
                    result.push(instance);
                }
            }
            return result;
        } else {
            var pipelines = gameObject.postPipelines;
            for (var i = 0, cnt = pipelines.length; i < cnt; i++) {
                var instance = pipelines[i];
                if ((instance instanceof PostFxPipelineClass) && (instance.name === name)) {
                    return instance;
                }
            }
        }
    };

    class BasePostFxPipelinePlugin extends Phaser.Plugins.BasePlugin {
        setPostPipelineClass(PostFxPipelineClass, postFxPipelineName) {
            this.PostFxPipelineClass = PostFxPipelineClass;
            this.postFxPipelineName = postFxPipelineName;
            return this;
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.once('destroy', this.destroy, this);

            RegisterPostPipeline(this.game, this.postFxPipelineName, this.PostFxPipelineClass);
        }

        add(gameObject, config) {
            return AddPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, config);
        }

        remove(gameObject, name) {
            RemovePostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
            return this;
        }

        get(gameObject, name) {
            return GetPostFxPipelineInstance(gameObject, this.PostFxPipelineClass, name);
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

    class DissolvePipelinePlugin extends BasePostFxPipelinePlugin {
        constructor(pluginManager) {
            super(pluginManager);
            this.setPostPipelineClass(DissolvePostFxPipeline, 'rexDissolvePostFx');
        }
    }

    SetValue(window, 'RexPlugins.Pipelines.DissolvePostFx', DissolvePostFxPipeline);

    return DissolvePipelinePlugin;

}));
