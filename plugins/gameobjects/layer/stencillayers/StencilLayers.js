import CheckP3Version from '../../../utils/system/CheckP3Version.js';
CheckP3Version();

import { GameObjects as PhaserGameObjects } from 'phaser';
const Layer = PhaserGameObjects.Layer;
const Stencil = PhaserGameObjects.Stencil;
const StencilReference = PhaserGameObjects.StencilReference;

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

export default StencilLayers;
