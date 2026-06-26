import { VERSION, GameObjects, Utils, Plugins } from 'phaser';

const MainVersionNumber = 4;
const SubVersionNumber = 0;

var IsChecked = false;

var CheckP3Version = function (minVersion) {
    if (IsChecked) {
        return;
    }

    if (minVersion === undefined) {
        minVersion = SubVersionNumber;
    }
    var version = VERSION.split('.');
    var mainVersion = parseInt(version[0]);
    if (mainVersion === MainVersionNumber) {
        var subVersion = parseInt(version[1]);
        if (subVersion < minVersion) {
            console.error(`Minimum supported version : ${mainVersion}.${subVersion}`);
        }
    } else {
        console.error(`Can't supported version : ${mainVersion}`);
    }

    IsChecked = true;
};

CheckP3Version();
const Layer = GameObjects.Layer;
const Stencil = GameObjects.Stencil;
const StencilReference = GameObjects.StencilReference;

class StencilLayers extends Layer {
    constructor(scene) {
        super(scene);
        this.type = 'rexStencilLayers';

        this.stencils = new Map();
        this.layers = new Map();
    }

    addStencil(stencilName, layerName, config) {
        CheckName(stencilName, 'stencil');
        CheckName(layerName, 'layer');
        CheckUniqueName(this.stencils, stencilName, 'stencil');
        CheckUniqueName(this.layers, layerName, 'layer');

        var stencilConfig = CreateStencilConfig(config, 'addLayer');
        var stencil = new Stencil(this.scene, 0, 0, undefined, stencilConfig);
        var layer = new Layer(this.scene);

        stencil.name = stencilName;
        layer.name = layerName;

        this.stencils.set(stencilName, {
            name: stencilName,
            stencil: stencil,
            reference: undefined,
            stencilConfig: stencilConfig,
            addLayerName: layerName,
            removeLayerName: undefined,
            open: true
        });
        this.layers.set(layerName, layer);

        this.add([stencil, layer]);
        return this;
    }

    removeStencil(stencilName, layerName, config) {
        CheckName(stencilName, 'stencil');
        CheckName(layerName, 'layer');
        CheckUniqueName(this.layers, layerName, 'layer');

        var record = this.stencils.get(stencilName);
        if (!record) {
            throw new Error(`StencilLayers: stencil '${stencilName}' does not exist.`);
        }
        if (!record.open) {
            throw new Error(`StencilLayers: stencil '${stencilName}' has already been removed.`);
        }

        var referenceConfig = CreateStencilReferenceConfig(record.stencilConfig, config);
        var stencilReference = new StencilReference(this.scene, record.stencil, referenceConfig);
        var layer = new Layer(this.scene);

        stencilReference.name = `${stencilName}.reference`;
        stencilReference.setAlpha = NoopSetAlpha;  // monkey patch
        layer.name = layerName;

        record.reference = stencilReference;
        record.removeLayerName = layerName;
        record.open = false;
        this.layers.set(layerName, layer);

        this.add([stencilReference, layer]);
        return this;
    }

    end() {
        var openStencilNames = [];

        this.stencils.forEach(function (record, name) {
            if (record.open) {
                openStencilNames.push(name);
            }
        });

        if (openStencilNames.length > 0) {
            throw new Error(`StencilLayers: unremoved stencil(s): ${openStencilNames.join(', ')}.`);
        }

        return this;
    }

    getStencil(name) {
        var record = this.stencils.get(name);
        return (record) ? record.stencil : undefined;
    }

    getLayer(name) {
        return this.layers.get(name);
    }

}

var CheckUniqueName = function (map, name, type) {
    if (map.has(name)) {
        throw new Error(`StencilLayers: ${type} name '${name}' already exists.`);
    }
};

var CheckName = function (name, type) {
    if (name === undefined || name === null || name === '') {
        throw new Error(`StencilLayers: ${type} name is required.`);
    }
};

var CreateStencilConfig = function (config, stencilLayerMode) {
    config = CloneConfig(config);
    CheckForbiddenConfig(config, 'stencilLayerMode');

    config.stencilLayerMode = stencilLayerMode;

    return config;
};

var CreateStencilReferenceConfig = function (stencilConfig, config) {
    config = CloneConfig(config);
    CheckForbiddenConfig(config, 'stencilLayerMode');
    CheckForbiddenConfig(config, 'stencilInvert');

    var referenceConfig = Object.assign({}, stencilConfig, config);
    referenceConfig.stencilLayerMode = 'subtractLayer';

    return referenceConfig;
};

var CloneConfig = function (config) {
    if (config === undefined) {
        config = {};
    }

    return Object.assign({}, config);
};

var CheckForbiddenConfig = function (config, key) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        throw new Error(`StencilLayers: '${key}' is managed internally.`);
    }
};

var NoopSetAlpha = function () {
    return this;
};

function Factory () {
    var gameObject = new StencilLayers(this.scene);
    this.scene.add.existing(gameObject);
    return gameObject;
}

Utils.Objects.GetAdvancedValue;
const BuildGameObject = GameObjects.BuildGameObject;

function Creator (config, addToScene) {
    if (config === undefined) { config = {}; }
    if (addToScene !== undefined) {
        config.add = addToScene;
    }

    var gameObject = new StencilLayers(this.scene);
    BuildGameObject(this.scene, gameObject, config);
    return gameObject;
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

class StencilLayersPlugin extends Plugins.BasePlugin {

    constructor(pluginManager) {
        super(pluginManager);

        //  Register our new Game Object type
        pluginManager.registerGameObject('rexStencilLayers', Factory, Creator);
    }

    start() {
        var eventEmitter = this.game.events;
        eventEmitter.on('destroy', this.destroy, this);
    }
}

SetValue(window, 'RexPlugins.GameObjects.StencilLayers', StencilLayers);

export { StencilLayersPlugin as default };
