(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexoutlineeffectlayerplugin = factory());
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

    // Reference: https://github.com/pixijs/pixi-filters/blob/master/filters/outline/src/outline.frag

    const frag = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define highmedp highp
#else
#define highmedp mediump
#endif
precision highmedp float;

// Scene buffer
uniform sampler2D iChannel0; 
varying vec2 fragCoord;
uniform vec2 resolution;

// Effect parameters
uniform bool knockout;
uniform vec2 thickness;
uniform vec3 outlineColor; // (0, 0, 0);

const float DOUBLE_PI = 3.14159265358979323846264 * 2.;

void main() {
  vec2 uv = fragCoord / resolution;
  if ((thickness.x > 0.0) || (thickness.y > 0.0)) {
    vec4 front = texture2D(iChannel0, uv);
    vec2 mag = thickness/resolution;
    vec4 curColor;
    float maxAlpha = 0.;
    vec2 offset;
    for (float angle = 0.; angle <= DOUBLE_PI; angle += #{angleStep}) {
        offset = vec2(mag.x * cos(angle), mag.y * sin(angle));        
        curColor = texture2D(iChannel0, uv + offset);
        maxAlpha = max(maxAlpha, curColor.a);
    }
    float resultAlpha = max(maxAlpha, front.a);
    vec4 resultColor = vec4((front.rgb + (outlineColor.rgb * (1. - front.a) * resultAlpha)), resultAlpha);

    if (knockout && (resultColor == front)) {
      gl_FragColor = vec4(0);
    } else {
      gl_FragColor = resultColor;
    }

  } else {
    if (knockout) {
      gl_FragColor = vec4(0);
    } else {
      gl_FragColor = texture2D(iChannel0, uv);
    }

  }

}`;


    const MAX_SAMPLES = 100;
    const MIN_SAMPLES = 1;
    function GetFrag({ quality = 0.1 }) {
      var samples = Math.max((quality * MAX_SAMPLES), MIN_SAMPLES);
      var angleStep = (Math.PI * 2 / samples).toFixed(7);
      return frag.replace(/\#\{angleStep\}/, angleStep);
    }

    const BaseShader = Phaser.Display.BaseShader;
    const GetValue = Phaser.Utils.Objects.GetValue;
    const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
    const Color = Phaser.Display.Color;

    class OutlineEffectLayer extends EffectLayer {
        constructor(scene, config) {
            if (config === undefined) {
                config = {};
            }

            // Note: quality can't be changed during runtime
            var frag = GetFrag(config); // GLSL shader
            var uniforms = {
                knockout: { type: '1f', value: true },
                thickness: { type: '2f', value: { x: 0, y: 0 } },
                outlineColor: { type: '3f', value: { x: 0, y: 0, z: 0 } }
            };
            var baseShader = new BaseShader('Outline', frag, undefined, uniforms);
            super(scene, baseShader, config);
            this.type = 'rexOutlineEffectLayer';

            this._knockout = 0;
            this._thickness = 0;
            this._outlineColor = new Color();

            this.resetFromJSON(config);
        }

        resetFromJSON(o) {
            this.setKnockout(GetValue(o, 'knockout', false));
            this.setThickness(GetValue(o, 'thickness', 3));
            this.setOutlineColor(GetValue(o, 'outlineColor', 0xffffff));
            return this;
        }

        // knockout
        get knockout() {
            return this._knockout;
        }

        set knockout(value) {
            value = !!value;
            if (this._knockout === value) {
                return;
            }

            this._knockout = value;
            this.set1f('knockout', value);
        }

        setKnockout(value) {
            this.knockout = value;
            return this;
        }

        // thickness
        get thickness() {
            return this._thickness;
        }

        set thickness(value) {
            if (this._thickness === value) {
                return;
            }

            this._thickness = value;
            this.set2f('thickness', value, value);
        }

        setThickness(value) {
            this.thickness = value;
            return this;
        }

        // outlineColor
        get outlineColor() {
            return this._outlineColor;
        }

        set outlineColor(value) {
            if (typeof (value) === 'number') {
                value = IntegerToRGB(value);
            }
            // value: {r, g, b}
            var color = this._outlineColor;
            color.setFromRGB(value);
            this.set3f('outlineColor', color.redGL, color.greenGL, color.blueGL);
        }

        setOutlineColor(value) {
            this.outlineColor = value;
            return this;
        }
    }

    function Factory (config) {
        var gameObject = new OutlineEffectLayer(this.scene, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new OutlineEffectLayer(this.scene, config);
        this.scene.add.existing(gameObject);
        return gameObject;
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

    class OutlineEffectLayerPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexOutlineEffectLayer', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.OutlineEffectLayer', OutlineEffectLayer);

    return OutlineEffectLayerPlugin;

}));
