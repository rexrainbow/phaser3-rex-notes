import { Game, Scene, GameObjects, Renderer, Utils, Filters, Plugins } from 'phaser';

const GameClass = Game;
var IsGame = function (object) {
    return (object instanceof GameClass);
};

const SceneClass = Scene;
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
    var FilterListComponent = GameObjects.Components.FilterList.prototype;
    if (FilterListComponent[name]) {
        return;
    }

    FilterListComponent[name] = callback;
};

const FilterName$2 = 'FilterP3Circle';

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

class CircleFilter extends Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName$2;

    constructor(manager) {
        super(FilterName$2, manager, null, frag$2);
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

const GetValue$2 = Utils.Objects.GetValue;

class CircleController extends Filters.Controller {
    static FilterName = FilterName$2;

    constructor(camera, config) {
        super(camera, FilterName$2);

        this.thickness = 8;
        this.scale = 1;
        this.feather = 0.005;
        this.glcolor = [1, 0.2, 0.7];
        this.glcolor2 = [1, 0, 0, 0.4];

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setThickness(GetValue$2(o, 'thickness', 8));
        this.setScale(GetValue$2(o, 'scale', 1));
        this.setFeather(GetValue$2(o, 'feather', 0.005));
        this.setColor(GetValue$2(o, 'color', 0xFF33B2));
        this.setBackgroundColor(GetValue$2(o, 'backgroundColor', 0xFF0000));
        this.setBackgroundAlpha(GetValue$2(o, 'backgroundAlpha', 0.4));

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

const FilterName$1 = 'FilterP3Gradient';

// Built-in fx in phaser3

const frag$1 = `\
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

class GradientFilter extends Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName$1;

    constructor(manager) {
        super(FilterName$1, manager, null, frag$1);
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

const GetValue$1 = Utils.Objects.GetValue;

class GradientController extends Filters.Controller {
    static FilterName = FilterName$1;

    constructor(camera, config) {
        super(camera, FilterName$1);

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
        this.setAlpha(GetValue$1(o, 'alpha', 0.2));
        this.setFromPosition(GetValue$1(o, 'fromX', 0), GetValue$1(o, 'fromY', 0));
        this.setToPosition(GetValue$1(o, 'toX', 0), GetValue$1(o, 'toY', 1));
        this.setColor1(GetValue$1(o, 'color1', 0xff0000));
        this.setColor2(GetValue$1(o, 'color2', 0x00ff00));
        this.setSize(GetValue$1(o, 'size', 0));

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

const FilterName = 'FilterP3Shine';

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

class ShineFilter extends Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, frag);
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

const GetValue = Utils.Objects.GetValue;

class ShineController extends Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.now = 0;

        this.speed = 0.5;
        this.lineWidth = 0.5;
        this.gradient = 3;
        this.reveal = false;

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setSpeed(GetValue(o, 'speed', 0.5));
        this.setLineWidth(GetValue(o, 'lineWidth', 0.5));
        this.setGradient(GetValue(o, 'gradient', 3));
        this.setReveal(GetValue(o, 'reveal', false));

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

var InstallCallbacks = [
    InstallCircleFX,
    InstallGradientFX,
    InstallShineFX,
];

var InstallP3FX = function (game) {
    var success = false;
    for (var i = 0, cnt = InstallCallbacks.length; i < cnt; i++) {
        success = InstallCallbacks[i](game) | success;
    }
    return success;
};

class P3FXPlugin extends Plugins.BasePlugin {
    constructor(pluginManager) {
        super(pluginManager);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);

        if (this.game.isRunning) {
            InstallP3FX(this.game);

        } else {
            eventEmitter.once('ready', function () {
                InstallP3FX(this.game);
            }, this);

        }

    }
}

export { P3FXPlugin as default };
