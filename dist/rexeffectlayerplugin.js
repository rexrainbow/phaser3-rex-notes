(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexeffectlayerplugin = factory());
})(this, (function () { 'use strict';

    var NearestPowerOf2 = function (value) {
        value--;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value++;
        return value;
    };

    const Shader = Phaser.GameObjects.Shader;
    const AddItem = Phaser.Utils.Array.Add;
    const RemoveItem = Phaser.Utils.Array.Remove;

    class EffectLayer extends Shader {
        constructor(scene, key, x, y, width, height) {
            // gameObjects -> render-texture -> shader

            if (typeof (x) === 'object') {
                var config = x;
                ({ x, y, width, height } = config);
            }

            if (x === undefined) { x = 0; }
            if (y === undefined) { y = 0; }
            if (width === undefined) { width = scene.sys.scale.width; }
            if (height === undefined) { height = scene.sys.scale.height; }

            // render-texture -> shader
            width = NearestPowerOf2(width);
            height = NearestPowerOf2(height);
            var rt = scene.make.renderTexture({ x: x, y: y, width: width, height: height, add: false });

            super(scene, key, x, y, width, height);
            this.type = 'rexEffectLayer';

            this
                .setSampler2DBuffer('iChannel0', rt.frame.glTexture, width, height, 0)
                .setScrollFactor(0)
                .setOrigin(0);

            this.rt = rt;

            this.children = [];

            this.boot();
        }

        boot() {
            this.scene.game.events.on('prerender', this.drawTargets, this);
            this.scene.sys.scale.on('resize', this.onWindowResize, this);
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            this.scene.game.events.off('prerender', this.drawTargets, this);
            this.scene.sys.scale.off('resize', this.onWindowResize, this);
            // Private texture will be removed by shader game object
            this.clear();

            super.destroy(fromScene);

            this.rt.destroy(fromScene);
            this.rt = null;
        }

        drawTargets() {
            // Assume that game objects are displayed on main camera.
            var camera = this.scene.sys.cameras.main;
            var offsetX = camera.scrollX + this.x;
            var offsetY = camera.scrollY + this.y;

            var rt = this.rt;
            rt.clear();
            var child;
            for (var i = 0, cnt = this.children.length; i < cnt; i++) {
                child = this.children[i];
                rt
                    .draw(
                        child,
                        child.x - offsetX,
                        child.y - offsetY
                    );
            }
        }

        set1f(key, value) {
            this.setUniform(`${key}.value`, value);
            return this;
        }

        set2f(key, x, y) {
            this.setUniform(`${key}.value.x`, x);
            this.setUniform(`${key}.value.y`, y);
            return this;
        }

        set3f(key, x, y, z) {
            this.setUniform(`${key}.value.x`, x);
            this.setUniform(`${key}.value.y`, y);
            this.setUniform(`${key}.value.z`, z);
            return this;
        }

        setFloat4(key, x, y, z, w) {
            this.setUniform(`${key}.value.x`, x);
            this.setUniform(`${key}.value.y`, y);
            this.setUniform(`${key}.value.z`, z);
            this.setUniform(`${key}.value.w`, w);
            return this;
        }

        contains(gameObject) {
            return (this.children.indexOf(gameObject) !== -1);
        }

        add(gameObjects) {
            AddItem(this.children, gameObjects, 0,
                // Callback of item added
                function (gameObject) {
                    gameObject.once('destroy', this.onChildDestroy, this);
                }, this);
            return this;
        }

        remove(gameObjects, destroyChild) {
            if (destroyChild === undefined) {
                destroyChild = false;
            }
            RemoveItem(this.children, gameObjects,
                // Callback of item removed
                function (gameObject) {
                    gameObject.off('destroy', this.onChildDestroy, this);
                    if (destroyChild) {
                        gameObject.destroy();
                    }
                }
            );
            return this;
        }

        clear(destroyChild) {
            var gameObject;
            for (var i = 0, cnt = this.children.length; i < cnt; i++) {
                gameObject = this.children[i];
                gameObject.off('destroy', this.onChildDestroy, this);
                if (destroyChild) {
                    gameObject.destroy();
                }
            }
            this.children.length = 0;
            return this;
        }

        onChildDestroy(child, fromScene) {
            this.remove(child, !fromScene);
        }

        resize(width, height) {
            width = NearestPowerOf2(width);
            height = NearestPowerOf2(height);

            var rt = this.rt;

            // Set size of render texture
            rt.setSize(width, height);
            this.setSampler2DBuffer('iChannel0', rt.frame.glTexture, width, height, 0);

            // Set size of shader
            this.setSize(width, height);
            return this;
        }

        onWindowResize() {

            // Get new window size
            var width = this.scene.sys.scale.width;
            var height = this.scene.sys.scale.height;
            this.resize(width, height);
        }
    }

    function Factory (key, x, y, width, height) {
        var gameObject = new EffectLayer(this.scene, key, x, y, width, height);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var key = GetAdvancedValue(config, 'key', undefined);
        var x = GetAdvancedValue(config, 'x', undefined);
        var y = GetAdvancedValue(config, 'y', undefined);
        var width = GetAdvancedValue(config, 'width', undefined);
        var height = GetAdvancedValue(config, 'height', undefined);
        var gameObject = new EffectLayer(this.scene, key, x, y, width, height);
        this.scene.add.existing(gameObject);
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
        if (typeof keys === 'string' && keys.indexOf(delimiter) === -1) {
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

    class EffectLayerPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexEffectLayer', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.EffectLayer', EffectLayer);

    return EffectLayerPlugin;

}));
