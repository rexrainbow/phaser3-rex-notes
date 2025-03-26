(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlegacyp3fxplugin = factory());
})(this, (function () { 'use strict';

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

    const FilterName$2 = 'FilterP3Shine';

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
        static FilterName = FilterName$2;

        constructor(manager) {
            super(FilterName$2, manager, null, frag$2);
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

    const FilterName$1 = 'FilterP3Vignette';

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
        static FilterName = FilterName$1;

        constructor(manager) {
            super(FilterName$1, manager, null, frag$1);
        }

        // This method sets up the uniforms for the shader.
        setupUniforms(controller, drawingContext) {
            const programManager = this.programManager;

            programManager.setUniform('config', [controller.radius, controller.strength]);
            programManager.setUniform('position', [controller.x, controller.y]);
        }

    }

    const FilterName = 'FilterP3Wipe';

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
        static FilterName = FilterName;

        constructor(manager) {
            super(FilterName, manager, null, frag);
        }

        // This method sets up the uniforms for the shader.
        setupUniforms(controller, drawingContext) {
            const programManager = this.programManager;

            programManager.setUniform('config', [controller.progress, controller.wipeWidth, controller.direction, controller.axis]);
            programManager.setUniform('reveal', controller.reveal);
        }

    }

    var RegisterFilter = function (game, FilterClass) {
        var filterName = FilterClass.FilterName;
        var renderNodes = GetGame(game).renderer.renderNodes;
        if (renderNodes.hasNode(filterName)) {
            return;
        }

        renderNodes.addNodeConstructor(filterName, FilterClass);
    };

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

    class BloomController extends Phaser.Filters.ParallelFilters {
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

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    class ShineController extends Phaser.Filters.Controller {
        static FilterName = FilterName$2;

        constructor(camera, config) {
            super(camera, FilterName$2);

            this.now = 0;

            this.speed = 0.5;
            this.lineWidth = 0.5;
            this.gradient = 3;
            this.reveal = false;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setSpeed(GetValue$2(o, 'speed', 0.5));
            this.setLineWidth(GetValue$2(o, 'lineWidth', 0.5));
            this.setGradient(GetValue$2(o, 'gradient', 3));
            this.setReveal(GetValue$2(o, 'reveal', false));

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

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class VignetteController extends Phaser.Filters.Controller {
        static FilterName = FilterName$1;

        constructor(camera, config) {
            super(camera, FilterName$1);

            this.x = 0.5;
            this.y = 0.5;
            this.radius = 0.5;
            this.strength = 0.5;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setPosition(GetValue$1(o, 'x', 0.5), GetValue$1(o, 'y', 0.5));
            this.setRadius(GetValue$1(o, 'radius', 0.5));
            this.setStrength(GetValue$1(o, 'strength', 0.5));

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

    const GetValue = Phaser.Utils.Objects.GetValue;
    const Clamp = Phaser.Math.Clamp;

    class WipeController extends Phaser.Filters.Controller {
        static FilterName = FilterName;

        constructor(camera, config) {
            super(camera, FilterName);

            this.progress = 0;
            this.wipeWidth = 0.1;
            this.direction = 0;
            this.axis = 0;
            this.reveal = false;

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setProgress(GetValue(o, 'progress', 0));
            this.setWipeWidth(GetValue(o, 'wipeWidth', 0.1));
            this.setDirection(GetValue(o, 'direction', 0));
            this.setAxis(GetValue(o, 'axis', 0));

            var reveal = GetValue(o, 'reveal', undefined);
            if (reveal === undefined) {
                reveal = !GetValue(o, 'wipe', true);
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

    var InstallFilters = function (game) {
        RegisterFilter(game, BloomStepFilter);
        RegisterFilter(game, CircleFilter);
        RegisterFilter(game, GradientFilter);
        RegisterFilter(game, ShineFilter);
        RegisterFilter(game, VignetteFilter);
        RegisterFilter(game, WarpFilter);

        var FilterListComponent = Phaser.GameObjects.Components.FilterList.prototype;
        console.log(FilterListComponent);

        FilterListComponent.addBloom = function (color, offsetX, offsetY, blurStrength, strength, steps) {
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
        };

        FilterListComponent.addCircle = function (thickness, color, backgroundColor, scale, feather) {
            if (thickness === undefined) { thickness = 8; }
            if (color === undefined) { color = 0xFF33B2; }
            if (backgroundColor === undefined) { backgroundColor = 0xFF0000; }
            if (scale === undefined) { scale = 1; }
            if (feather === undefined) { feather = 0.005; }

            return this.add(new CircleController(
                this.camera,
                { thickness, color, backgroundColor, scale, feather }
            ));
        };

        FilterListComponent.addGradient = function (color1, color2, alpha, fromX, fromY, toX, toY, size) {
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
        };

        FilterListComponent.addShine = function (speed, lineWidth, gradient, reveal) {
            if (speed === undefined) { speed = 0.5; }
            if (lineWidth === undefined) { lineWidth = 0.5; }
            if (gradient === undefined) { gradient = 3; }
            if (reveal === undefined) { reveal = false; }

            return this.add(new ShineController(
                this.camera,
                { speed, lineWidth, gradient, reveal }
            ));
        };

        FilterListComponent.addVignette = function (x, y, radius, strength) {
            if (x === undefined) { x = 0.5; }
            if (y === undefined) { y = 0.5; }
            if (radius === undefined) { radius = 0.5; }
            if (strength === undefined) { strength = 0.5; }

            return this.add(new VignetteController(
                this.camera,
                { x, y, radius, strength }
            ));
        };

        FilterListComponent.addWipe = function (wipeWidth, direction, axis) {
            if (wipeWidth === undefined) { wipeWidth = 0.1; }
            if (direction === undefined) { direction = 0; }
            if (axis === undefined) { axis = 0; }

            return this.add(new WipeController(
                this.camera,
                { wipeWidth, direction, axis }
            ));
        };

        FilterListComponent.addReveal = function (wipeWidth, direction, axis) {
            if (wipeWidth === undefined) { wipeWidth = 0.1; }
            if (direction === undefined) { direction = 0; }
            if (axis === undefined) { axis = 0; }

            return this.add(new WipeController(
                this.camera,
                { wipeWidth, direction, axis, reveal: true }
            ));
        };
    };

    class LegacyP3FXPlugin extends Phaser.Plugins.BasePlugin {
        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);

            eventEmitter.once('ready', function () {
                InstallFilters(this.game);
            }, this);
        }
    }

    return LegacyP3FXPlugin;

}));
