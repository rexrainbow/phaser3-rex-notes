(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcanvasdataplugin = factory());
})(this, (function () { 'use strict';

    const Linear = Phaser.Math.Linear;

    var InterpolateColor32 = function (color0, color1, t) {
        var r0 = (color0 >> 16) & 0xff;
        var g0 = (color0 >> 8) & 0xff;
        var b0 = color0 & 0xff;
        var a0 = (color0 >> 24) & 0xff;

        var r1 = (color1 >> 16) & 0xff;
        var g1 = (color1 >> 8) & 0xff;
        var b1 = color1 & 0xff;
        var a1 = (color1 >> 24) & 0xff;

        var r = Linear(r0, r1, t);
        var g = Linear(g0, g1, t);
        var b = Linear(b0, b1, t);
        var a = Linear(a0, a1, t);

        return (a << 24) | (r << 16) | (g << 8) | b;
    };

    const Color = Phaser.Display.Color;

    var Color32Methods = {
        rgbaToColor32(r, g, b, a) {
            return (a << 24) | (r << 16) | (g << 8) | b;
        },

        color32ToColorInt(color32) {
            return color32 & 0xffffff;
        },

        color32ToAlpha(color32) {
            return color32 >>> 24;
        },

        color32ToColorObject(color32, out) {
            var r = (color32 >> 16) & 0xff;
            var g = (color32 >> 8) & 0xff;
            var b = color32 & 0xff;
            var a = (color32 >> 24) & 0xff;
            if (out === undefined) {
                out = new Color(r, b, g, a);
            } else {
                out.setTo(r, b, g, a);
            }
            return out;
        },

        interpolateColor32: InterpolateColor32,
    };

    class CanvasData {
        constructor(BufferClass, width, height) {
            if (width === undefined) {
                width = 0;
            }
            if (height === undefined) {
                height = width;
            }

            this.width = width;
            this.height = height;
            this.buffer = new BufferClass(width * height);
        }

        destroy() {
            this.buffer.destroy();
            this.buffer = undefined;
        }

        getOffset(x, y) {
            return y * this.width + x;
        }

        get(x, y) {
            var offset;
            if (arguments.length === 2) {
                offset = this.getOffset(x, y);
            } else {
                offset = x;
            }
            return this.buffer.get(offset);
        }

        set(x, y, value) {
            var offset;
            if (arguments.length === 3) {
                offset = this.getOffset(x, y);
            } else {
                offset = x;
                value = y;
            }
            this.buffer.set(offset, value);
            return this;
        }

        fill(canvas, x, y, width, height, callback, scope) {
            if (typeof (canvas) === 'number') {
                var value = canvas;
                this.buffer.fill(value);

            } else {
                if (x === undefined) {
                    x = 0;
                }
                if (y === undefined) {
                    y = 0;
                }
                if (width === undefined) {
                    width = canvas.width - x;
                }
                if (height === undefined) {
                    height = canvas.height - y;
                }
                this.resize(width, height);
                var context = canvas.getContext('2d', { willReadFrequently: true });
                var imgData = context.getImageData(x, y, width, height).data;
                var pixels = imgData.length, imgDataIndex;
                var value;
                for (var i = 0, cnt = pixels / 4; i < cnt; i++) {
                    imgDataIndex = i * 4;
                    if (scope) {
                        value = callback.call(scope, imgData, imgDataIndex);
                    } else {
                        value = callback(imgData, imgDataIndex);
                    }
                    this.set(i, value);
                }
            }

            return this;
        }

        clear() {
            this.fill(0);
            return this;
        }

        resize(width, height) {
            if ((this.width === width) && (this.height === height)) {
                return this;
            }

            this.width = width;
            this.height = height;
            this.buffer.resize(width * height);
            return this;
        }

        forEach(callback, scope, skipZero) {
            if (skipZero === undefined) {
                skipZero = false;
            }
            var value;
            for (var y = 0, h = this.height; y < h; y++) {
                for (var x = 0, w = this.width; x < w; x++) {
                    value = this.get(x, y);
                    if (skipZero &&
                        ((value === 0) || (value === false))
                    ) {
                        continue;
                    }

                    if (scope) {
                        callback.call(scope, value, x, y, this);
                    } else {
                        callback(value, x, y, this);
                    }
                }
            }
            return this;
        }

        forEachNonZero(callback, scope) {
            this.forEach(callback, scope, true);
            return this;
        }
    }
    Object.assign(
        CanvasData.prototype,
        Color32Methods
    );

    var CanvasToData = function (canvas, x, y, width, height, BufferClass, fillCallback, fillCallbackScope, out) {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = canvas.width - x;
        }
        if (height === undefined) {
            height = canvas.height - y;
        }
        if (out === undefined) {
            out = new CanvasData(BufferClass, width, height);
        }

        out.fill(canvas, x, y, width, height, fillCallback, fillCallbackScope);
        return out;
    };

    const COLS = 8;
    const SHIFT = 3;

    class BooleanBuffer {
        constructor(size) {
            this.resize(size);
        }

        destroy() {
            this._rows = undefined;
            this._buf = undefined;
            this._bin = undefined;
        }

        get(offset) {
            var row = offset >> SHIFT;
            var col = offset % COLS;
            var bit = 1 << col;
            return (this._bin[row] & bit) > 0;
        }

        set(offset, value) {
            var row = offset >> SHIFT;
            var col = offset % COLS;
            var bit = 1 << col;
            if (value) {
                this._bin[row] |= bit;
            } else {
                bit = 255 ^ bit;
                this._bin[row] &= bit;
            }
            return this;
        }

        fill(value) {
            value = (value) ? 255 : 0;
            for (var i = 0, cnt = this._rows; i < cnt; i++) {
                this._bin[i] = value;
            }
            return this;
        }

        resize(size) {
            var rows = (size >> SHIFT) + 1;
            if (rows !== this._rows) {
                this._rows = rows;
                this._buf = new ArrayBuffer(this._rows);
                this._bin = new Uint8Array(this._buf);
            }
            return this;
        }
    }

    var FillCallback$1 = function (imgData, imgDataIndex) {
        return (imgData[imgDataIndex + 3] > 0);
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    var CanvasObjectToBitmap = function (canvasObject, config, out) {
        if (config instanceof CanvasData) {
            out = config;
            config = undefined;
        }

        var x = GetValue$1(config, 'x', undefined);
        var y = GetValue$1(config, 'y', undefined);
        var width = GetValue$1(config, 'width', undefined);
        var height = GetValue$1(config, 'height', undefined);

        return CanvasToData(
            canvasObject.canvas, // canvas
            x, y, width, height, // x, y, width, height
            BooleanBuffer, FillCallback$1, undefined, // BufferClass, fillCallback, fillCallbackScope
            out);
    };

    class FourBytesBuffer {
        constructor(size) {
            this.resize(size);
        }

        destroy() {
            this._rows = undefined;
            this._buf = undefined;
            this._colors = undefined;
        }

        get(offset) {
            return this._colors[offset];
        }

        set(offset, value) {
            this._colors[offset] = value;
            return this;
        }

        fill(value) {
            for (var i = 0, cnt = this._rows; i < cnt; i++) {
                this._colors[i] = value;
            }
            return this;
        }

        resize(size) {
            if (size !== this._rows) {
                this._rows = size;
                this._buf = new ArrayBuffer(this._rows * 4);
                this._colors = new Uint32Array(this._buf);
            }
            return this;
        }
    }

    var FillCallback = function (imgData, imgDataIndex) {
        return (imgData[imgDataIndex + 3] << 24) |
            (imgData[imgDataIndex + 0] << 16) |
            (imgData[imgDataIndex + 1] << 8) |
            imgData[imgDataIndex + 2];
    };

    const GameObjectClass = Phaser.GameObjects.GameObject;
    var IsGameObject = function (object) {
        return (object instanceof GameObjectClass);
    };

    var CopyFrameToCanvas = function (frame, canvas) {
        canvas.width = frame.cutWidth;
        canvas.height = frame.cutHeight;
        var context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight);
        return canvas;
    };

    const GetValue = Phaser.Utils.Objects.GetValue;
    const CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;

    var TextureTColorMap = function (key, frameName, config, out) {
        var frame;
        if (typeof (key) === 'string') {
            if (typeof (frameName) !== 'string') {
                out = config;
                config = frameName;
                frameName = undefined;
            }
            frame = this.textureManager.getFrame(key, frameName);
        } else {
            frame = (IsGameObject(key)) ? key.frame : key;
            out = config;
            config = frameName;
        }

        if (config instanceof CanvasData) {
            out = config;
            config = undefined;
        }

        var hasDefaultCanvas = (this._tmpCanvas !== undefined);
        var canvas = (hasDefaultCanvas) ?
            this._tmpCanvas :
            CanvasPool$1.create2D(this, undefined, undefined, undefined, true);

        var x = GetValue(config, 'x', undefined);
        var y = GetValue(config, 'y', undefined);
        var width = GetValue(config, 'width', undefined);
        var height = GetValue(config, 'height', undefined);

        out = CanvasToData(
            CopyFrameToCanvas(frame, canvas), // canvas
            x, y, width, height, // x, y, width, height
            FourBytesBuffer, FillCallback, undefined, // BufferClass, fillCallback, fillCallbackScope
            out);

        if (!hasDefaultCanvas) {
            CanvasPool$1.remove(canvas);
        } else {
            canvas.width = 1;
            canvas.height = 1;
        }
        return out;
    };

    var Methods = {
        textObjectToBitmap: CanvasObjectToBitmap,
        canvasObjectToBitmap: CanvasObjectToBitmap,
        textureTColorMap: TextureTColorMap,
    };

    const CanvasPool = Phaser.Display.Canvas.CanvasPool;

    class CanvasDataPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);

            this._tmpCanvas = CanvasPool.create2D(this);
        }

        destroy() {
            CanvasPool.remove(this._tmpCanvas);
            this._tmpCanvas = undefined;
            super.destroy();
        }

        get textureManager() {
            return this.game.textures;
        }
    }

    Object.assign(
        CanvasDataPlugin.prototype,
        Methods
    );

    return CanvasDataPlugin;

}));
