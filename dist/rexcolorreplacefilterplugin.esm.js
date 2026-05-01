import { Renderer, Utils, Display, Filters, Game, Scene, GameObjects, Plugins } from 'phaser';

const FilterName = 'rexFilterColorReplace';

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
uniform float epsilon;
uniform vec3 originalColor;
uniform vec3 newColor;

#pragma phaserTemplate(fragmentHeader)

void main (void) {
  vec4 currentColor = texture2D(uMainSampler, outTexCoord);
  vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));
  float colorDistance = length(colorDiff);
  float doReplace = step(colorDistance, epsilon);
  gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);
}
`;

class ColorReplaceFilter extends Renderer.WebGL.RenderNodes.BaseFilterShader {
    static FilterName = FilterName;

    constructor(manager) {
        super(FilterName, manager, null, frag);
    }

    // This method sets up the uniforms for the shader.
    setupUniforms(controller, drawingContext) {
        const programManager = this.programManager;

        programManager.setUniform('epsilon', controller.epsilon);
        programManager.setUniform('originalColor', [controller._originalColor.redGL, controller._originalColor.greenGL, controller._originalColor.blueGL]);
        programManager.setUniform('newColor', [controller._newColor.redGL, controller._newColor.greenGL, controller._newColor.blueGL]);
    }
}

const GetValue = Utils.Objects.GetValue;
const IntegerToRGB = Display.Color.IntegerToRGB;
const Color = Display.Color;

class ColorReplaceController extends Filters.Controller {
    static FilterName = FilterName;

    constructor(camera, config) {
        super(camera, FilterName);

        this.epsilon = 0.4;
        this._originalColor = new Color();
        this._newColor = new Color();

        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setEpsilon(GetValue(o, 'epsilon', 0.4));
        this.setOriginalColor(GetValue(o, 'originalColor', 0xff0000));
        this.setNewColor(GetValue(o, 'newColor', 0x000000));
        return this;
    }

    setEpsilon(value) {
        this.epsilon = value;
        return this;
    }

    get originalColor() {
        return this._originalColor;
    }

    set originalColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._originalColor.setFromRGB(value);
    }

    setOriginalColor(value) {
        this.originalColor = value;
        return this;
    }

    get newColor() {
        return this._newColor;
    }

    set newColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        this._newColor.setFromRGB(value);
    }

    setNewColor(value) {
        this.newColor = value;
        return this;
    }
}

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

const SpliceOne = Utils.Array.SpliceOne;

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

class FilterPluginBase extends Plugins.BasePlugin {
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

var IsNil = function (value) {
    return value === null || value === undefined;
};

var IsObjectLike = function (value) {
    return value !== null && typeof value === 'object';
};

var NormalizePath = function (path, delimiter) {
    if (Array.isArray(path)) ; else if (typeof path !== 'string') {
        path = [];
    } else if (path.trim() === '') {
        path = [];
    } else {
        path = path.split(delimiter).filter(Boolean);
    }
    return path;
};

/**
 * Set a nested value into target by path (mutates target).
 *
 * - If keys is a string and does NOT contain delimiter, write directly.
 * - Intermediate non-plain-object values are always overwritten with {}.
 *
 * @param {object} target
 * @param {string|string[]} keys
 * @param {*} value
 * @param {string} [delimiter='.']
 * @returns {object} the same target reference
 */
var SetValue = function (target, keys, value, delimiter = '.') {
    if (!IsObjectLike(target)) {
        return target;
    }

    // Invalid key: no-op; don't replace root
    if (IsNil(keys) || keys === '' || (Array.isArray(keys) && keys.length === 0)) {
        return target;
    }

    // Fast path: single key
    if (
        (typeof keys === 'string' && keys.indexOf(delimiter) === -1) ||
        (typeof keys === 'number')
    ) {
        target[keys] = value;
        return target;
    }

    var pathSegments = NormalizePath(keys, delimiter);
    if (pathSegments.length === 0) {
        return target;
    }

    var cursor = target;
    var pathSegmentsCount = pathSegments.length;

    for (var index = 0; index < pathSegmentsCount - 1; index++) {
        var segment = pathSegments[index];
        var next = cursor[segment];

        if (!IsObjectLike(next)) {
            // Force overwrite intermediates
            cursor[segment] = {};
        }

        cursor = cursor[segment];
    }

    cursor[pathSegments[pathSegmentsCount - 1]] = value;
    return target;
};

class ColorReplaceFilterPlugin extends FilterPluginBase {
    constructor(pluginManager) {
        super(pluginManager);
        this.setFilterClass(ColorReplaceFilter, ColorReplaceController);

        this.setFilterListMethod(
            'addRexColorReplace',
            function (config) {
                return this.add(new ColorReplaceController(this.camera, config));
            }
        );
    }
}

SetValue(window, 'RexPlugins.Filters.ColorReplaceFilter', ColorReplaceFilter);
SetValue(window, 'RexPlugins.Filters.ColorReplaceController', ColorReplaceController);

export { ColorReplaceFilterPlugin as default };
