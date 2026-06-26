import CheckP3Version from '../../../utils/system/CheckP3Version.js';
CheckP3Version();

import { GameObjects as PhaserGameObjects, Utils as PhaserUtils } from 'phaser';
const Layer = PhaserGameObjects.Layer;
const Container = PhaserGameObjects.Container;
const Stencil = PhaserGameObjects.Stencil;
const StencilReference = PhaserGameObjects.StencilReference;
const IsPlainObject = PhaserUtils.Objects.IsPlainObject;

var StencilLayersBase = function (GOClass, defaultUseContainer, canAddLayer) {
    if (canAddLayer === undefined) {
        canAddLayer = true;
    }

    return class Base extends GOClass {
        constructor(scene, ...args) {
            super(scene, ...args);

            this.defaultUseContainer = defaultUseContainer;
            this.canAddLayer = canAddLayer;

            this.stencils = new Map();
            this.layers = new Map();
        }

        addStencil(stencilName, layerName, config) {
            var args = GetStencilArgs(this.defaultUseContainer, stencilName, layerName, config);
            stencilName = args.stencilName;
            layerName = args.layerName;
            config = args.config;

            CheckName(stencilName, 'stencil');
            CheckName(layerName, 'layer');
            CheckUniqueName(this.stencils, stencilName, 'stencil');
            CheckUniqueName(this.layers, layerName, 'layer');

            var useContainer = args.useContainer;
            var stencilConfig = CreateStencilConfig(config, 'addLayer');
            var stencil = new Stencil(this.scene, 0, 0, undefined, stencilConfig);
            var layer = CreateLayerObject(this.scene, useContainer, this.canAddLayer);

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
            var args = GetStencilArgs(this.defaultUseContainer, stencilName, layerName, config);
            stencilName = args.stencilName;
            layerName = args.layerName;
            config = args.config;

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

            var useContainer = args.useContainer;
            var referenceConfig = CreateStencilReferenceConfig(record.stencilConfig, config);
            var stencilReference = new StencilReference(this.scene, record.stencil, referenceConfig);
            var layer = CreateLayerObject(this.scene, useContainer, this.canAddLayer);

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

        getContainer(name) {
            return this.getLayer(name);
        }
    };
};

var GetStencilArgs = function (defaultUseContainer, stencilName, layerName, config) {
    var useContainer;

    if (
        layerName === undefined &&
        config === undefined &&
        IsPlainObject(stencilName)
    ) {
        config = CloneConfig(stencilName);
        stencilName = config.stencilName;
        useContainer = GetUseContainer(config, defaultUseContainer);
        layerName = config.layerName || config.containerName;

        delete config.stencilName;
        delete config.layerName;
        delete config.containerName;
        delete config.useContainer;

    } else {
        config = CloneConfig(config);
        useContainer = GetUseContainer(config, defaultUseContainer);
        layerName = layerName || config.layerName || config.containerName;

        delete config.layerName;
        delete config.containerName;
        delete config.useContainer;
    }

    return {
        stencilName: stencilName,
        layerName: layerName,
        useContainer: useContainer,
        config: config
    };
};

var GetUseContainer = function (config, defaultUseContainer) {
    if (config.useContainer !== undefined) {
        return config.useContainer;
    }

    return defaultUseContainer;
};

var CreateLayerObject = function (scene, useContainer, canAddLayer) {
    if (!useContainer && !canAddLayer) {
        throw new Error('StencilLayers: A Layer section cannot be added to a Container-based StencilLayers object.');
    }

    return (useContainer) ? new Container(scene, 0, 0) : new Layer(scene);
};

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

export default StencilLayersBase;
