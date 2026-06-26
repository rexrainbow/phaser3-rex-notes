(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('phaser')) :
    typeof define === 'function' && define.amd ? define(['phaser'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexstencillayersplugin = factory(global.Phaser));
})(this, (function (phaser) { 'use strict';

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
        var version = phaser.VERSION.split('.');
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
    const Layer$1 = phaser.GameObjects.Layer;
    const Container$1 = phaser.GameObjects.Container;
    const Stencil = phaser.GameObjects.Stencil;
    const StencilReference = phaser.GameObjects.StencilReference;
    const IsPlainObject = phaser.Utils.Objects.IsPlainObject;

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

        return (useContainer) ? new Container$1(scene, 0, 0) : new Layer$1(scene);
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

    const Layer = phaser.GameObjects.Layer;

    class StencilLayers extends StencilLayersBase(Layer, false, true) {
        constructor(scene) {
            super(scene);
            this.type = 'rexStencilLayers';
        }
    }

    function StencilLayersFactory () {
        var gameObject = new StencilLayers(this.scene);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const BuildGameObject$1 = phaser.GameObjects.BuildGameObject;

    function StencilLayersCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        var gameObject = new StencilLayers(this.scene);
        BuildGameObject$1(this.scene, gameObject, config);
        return gameObject;
    }

    const Container = phaser.GameObjects.Container;

    class StencilContainers extends StencilLayersBase(Container, true, false) {
        constructor(scene, x, y, children) {
            super(scene, x, y, children);
            this.type = 'rexStencilContainers';
        }
    }

    function StencilContainersFactory (x, y, children) {
        var gameObject = new StencilContainers(this.scene, x, y, children);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const BuildGameObject = phaser.GameObjects.BuildGameObject;
    const GetAdvancedValue = phaser.Utils.Objects.GetAdvancedValue;

    function StencilContainersCreator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }

        var x = GetAdvancedValue(config, 'x', 0);
        var y = GetAdvancedValue(config, 'y', 0);
        var children = GetAdvancedValue(config, 'children');
        var gameObject = new StencilContainers(this.scene, x, y, children);

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

    class StencilLayersPlugin extends phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexStencilLayers', StencilLayersFactory, StencilLayersCreator);
            pluginManager.registerGameObject('rexStencilContainers', StencilContainersFactory, StencilContainersCreator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.StencilLayers', StencilLayers);
    SetValue(window, 'RexPlugins.GameObjects.StencilContainers', StencilContainers);

    return StencilLayersPlugin;

}));
