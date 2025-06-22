(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexframemanagerplugin = factory());
})(this, (function () { 'use strict';

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

    var GetWhiteFrame = function (game) {
        return GetGame(game).textures.getFrame('__WHITE');
    };

    var DynamicTextureClearRectangle = function (texture, x, y, width, height) {
        if (WhiteFrameWidth === undefined) {
            var whiteFrame = GetWhiteFrame(texture.manager.game);
            WhiteFrameWidth = whiteFrame.cutWidth;
            WhiteFrameHeight = whiteFrame.cutHeight;
        }

        texture.stamp('__WHITE', undefined, x, y, {
            scaleX: width / WhiteFrameWidth,
            scaleY: height / WhiteFrameHeight,
            originX: 0,
            originY: 0,
            erase: true,
        });

        return texture;
    };

    var WhiteFrameWidth;
    var WhiteFrameHeight;

    var Draw = function (frameName, callback, scope) {
        var index = this.getFrameIndex(frameName);
        if (index === -1) {
            index = this.getFrameIndex(undefined);
        }
        if (index === -1) {
            console.warn('Does not have free space.');
            return this;
        }

        var tl = this.getTopLeftPosition(index),
            outerX = tl.x,
            outerY = tl.y,
            cellPadding = this.cellPadding,
            innerX = outerX + cellPadding,
            innerY = outerY + cellPadding;

        ClearFrame.call(this, outerX, outerY, this.outerCellWidth, this.outerCellHeight);

        var frameSize = {
            width: this.cellWidth,
            height: this.cellHeight
        };

        var drawCallback = (this.useDynamicTexture) ? DrawDynamicTexture : DrawCanvasTexture;
        drawCallback.call(this, innerX, innerY, frameSize, callback, scope);
        // frameSize might be changed

        this.texture.add(frameName, 0, innerX, innerY, frameSize.width, frameSize.height);
        this.addFrameName(index, frameName);
        this.dirty = true;

        return this;
    };

    var ClearFrame = function (x, y, width, height) {
        if (this.useDynamicTexture) {
            DynamicTextureClearRectangle(this.texture, x, y, width, height);
        } else {
            this.context.clearRect(x, y, width, height);
        }
    };

    var DrawCanvasTexture = function (x, y, frameSize, callback, scope) {
        var context = this.context;

        context.save();
        context.translate(x, y);

        // Draw cell
        if (scope) {
            callback.call(scope, this.canvas, context, frameSize);
        } else {
            callback(this.canvas, context, frameSize);
        }
        // frameSize might be changed

        context.restore();
    };

    var DrawDynamicTexture = function (x, y, frameSize, callback, scope) {
        var texture = this.texture;

        // Draw cell
        texture.camera.setScroll(-x, -y);
        if (scope) {
            callback.call(scope, texture, frameSize);
        } else {
            callback(texture, frameSize);
        }
        texture.camera.setScroll(0, 0);
        // frameSize might be changed
    };

    var GetDisplayWidth = function (gameObject) {
        if (gameObject.displayWidth !== undefined) {
            return gameObject.displayWidth;
        } else {
            return gameObject.width;
        }
    };

    var GetDisplayHeight = function (gameObject) {
        if (gameObject.displayHeight !== undefined) {
            return gameObject.displayHeight;
        } else {
            return gameObject.height;
        }
    };

    var Paste = function (frameName, gameObject) {
        var drawCallback;
        if (this.useDynamicTexture) {
            var srcWidth = GetDisplayWidth(gameObject),
                srcHeight = GetDisplayHeight(gameObject);

            var scale;
            if ((srcWidth <= this.cellWidth) && (srcHeight <= this.cellHeight)) {
                scale = 1;
            } else {
                // Scale down and keep ratio
                scale = Math.max((srcWidth / this.cellWidth), (srcHeight / this.cellHeight));
            }

            drawCallback = function (texture, frameSize) {
                var originXSave = gameObject.originX,
                    originYSave = gameObject.originY;
                var scaleXSave = gameObject.scaleX,
                    scaleYSave = gameObject.scaleY;

                gameObject
                    .setOrigin(0, 0)
                    .setScale(scale, scale);

                texture.draw(gameObject);

                gameObject
                    .setOrigin(originXSave, originYSave)
                    .setScale(scaleXSave, scaleYSave);

                frameSize.width = srcWidth / scale;
                frameSize.height = srcHeight / scale;
            };

        } else {
            var srcCanvas = gameObject.canvas;
            if (!srcCanvas) {
                console.warn(`Can't get canvas of game object.`);
                return this;
            }

            var srcWidth = srcCanvas.width,
                srcHeight = srcCanvas.height;
            var dWidth, dHeight;
            if ((srcWidth <= this.cellWidth) && (srcHeight <= this.cellHeight)) {
                dWidth = srcWidth;
                dHeight = srcHeight;
            } else {
                // Scale down and keep ratio
                var scale = Math.max((srcWidth / this.cellWidth), (srcHeight / this.cellHeight));
                dWidth = srcWidth / scale;
                dHeight = srcHeight / scale;
            }

            drawCallback = function (canvas, context, frameSize) {
                context.drawImage(srcCanvas, 0, 0, dWidth, dHeight);

                frameSize.width = dWidth;
                frameSize.height = dHeight;
            };
        }

        this.draw(frameName, drawCallback);

        return this;
    };

    var AddEmptyFrame = function (frameName, width, height) {
        if (width === undefined) {
            width = this.cellWidth;
        }
        if (height === undefined) {
            height = this.cellHeight;
        }

        var drawCallback;
        if (this.useDynamicTexture) {
            drawCallback = function (texture, frameSize) {
                frameSize.width = width;
                frameSize.height = height;
            };
        } else {
            drawCallback = function (canvas, context, frameSize) {
                frameSize.width = width;
                frameSize.height = height;
            };
        }
        this.draw(frameName, drawCallback);

        return this;
    };

    var RemoveMethods = {
        // Remove a frame
        remove(frameName) {
            var index = this.getFrameIndex(frameName);
            if (index === -1) {
                return this;
            }

            this.addFrameName(index, undefined);
            this.texture.remove(frameName);

            // Don't clear canvas

            return this;
        },

        // Remove all frames
        clear() {
            for (var i, cnt = this.frameNames.length; i < cnt; i++) {
                var frameName = this.frameNames[i];
                if (frameName !== undefined) {
                    this.addFrameName(index, undefined);
                    this.texture.remove(frameName);
                }
            }

            return this;
        }
    };

    var AddToBitmapFont = function () {
        var textureKey = this.texture.key;
        // Don't add a new font data, reuse current font data
        var cacheData = this.bitmapFontCache.get(textureKey);
        if (!cacheData) {
            cacheData = {
                data: {
                    retroFont: true,
                    font: textureKey,
                    size: this.cellWidth,
                    lineHeight: this.cellHeight,
                    chars: {}
                },
                texture: textureKey,
                frame: null,
            };
            this.bitmapFontCache.add(textureKey, cacheData);
        }
        var charData = cacheData.data.chars;    

        var letters = this.frameNames;
        for (var i = 0, cnt = letters.length; i < cnt; i++) {
            var char = letters[i];
            if (char === undefined) {
                continue;
            }

            var frame = this.texture.get(char);
            var x = frame.cutX,
                y = frame.cutY,
                width = frame.cutWidth,
                height = frame.cutHeight;

            charData[char.charCodeAt(0)] = {
                x: x, y: y,
                width: width, height: height,
                centerX: x + (width / 2),
                centerY: y + (height / 2),
                xOffset: 0,
                yOffset: 0,
                xAdvance: width,
                data: {},
                kerning: {},
                u0: frame.u0,
                v0: frame.v0,
                u1: frame.u1,
                v1: frame.v1
            };
        }

        return this;
    };

    var methods = {
        draw: Draw,
        paste: Paste,
        addEmptyFrame: AddEmptyFrame,

        addToBitmapFont: AddToBitmapFont,
    };

    Object.assign(
        methods,
        RemoveMethods
    );

    var CreateTexture = function (game, key, width, height, useDynamicTexture) {
        game = GetGame(game);

        if (useDynamicTexture === undefined) {
            useDynamicTexture = false;
        }

        var textureManager = game.textures;

        if (textureManager.exists(key)) {
            textureManager.remove(key);
        }

        var methodName = (useDynamicTexture) ? 'addDynamicTexture' : 'createCanvas';

        return textureManager[methodName](key, width, height);
    };

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    class FrameManager {
        constructor(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
            var columns, rows, cellPadding;
            if (IsPlainObject$1(key)) {
                var config = key;
                key = GetValue$1(config, 'key');
                width = GetValue$1(config, 'width');
                height = GetValue$1(config, 'height');
                cellWidth = GetValue$1(config, 'cellWidth');
                cellHeight = GetValue$1(config, 'cellHeight');
                cellPadding = GetValue$1(config, 'cellPadding', 0);
                columns = GetValue$1(config, 'columns');
                rows = GetValue$1(config, 'rows');
                fillColor = GetValue$1(config, 'fillColor');
                useDynamicTexture = GetValue$1(config, 'useDynamicTexture');
            } else {
                if (typeof (fillColor) === 'boolean') {
                    useDynamicTexture = fillColor;
                    fillColor = undefined;
                }
            }

            if (cellWidth === undefined) {
                cellWidth = 64;
            }

            if (cellHeight === undefined) {
                cellHeight = 64;
            }

            if (cellPadding === undefined) {
                cellPadding = 0;
            }

            this.scene = scene;
            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;
            this.cellPadding = cellPadding;
            this.outerCellWidth = cellWidth + (cellPadding * 2);
            this.outerCellHeight = cellHeight + (cellPadding * 2);

            if (columns) {
                width = this.outerCellWidth * columns;
            } else {
                if (width === undefined) {
                    width = 4096;
                }
                columns = Math.floor(width / this.outerCellWidth);
            }

            if (rows) {
                height = this.outerCellHeight * rows;
            } else {
                if (height === undefined) {
                    height = 4096;
                }
                rows = Math.floor(height / this.outerCellHeight);
            }

            if (useDynamicTexture === undefined) {
                useDynamicTexture = false;
            }

            var game = GetGame(scene);

            this.useDynamicTexture = useDynamicTexture;
            this.texture = CreateTexture(game, key, width, height, useDynamicTexture);
            this.canvas = (useDynamicTexture) ? undefined : this.texture.getCanvas();
            this.context = (useDynamicTexture) ? undefined : this.texture.getContext();
            this.bitmapFontCache = game.cache.bitmapFont;

            if (fillColor !== undefined) {
                if (useDynamicTexture) {
                    this.texture.fill(fillColor);

                } else {
                    var context = this.context;
                    context.fillStyle = fillColor;
                    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                }
            }

            this.key = key;
            this.width = width;
            this.height = height;
            this.columns = columns;
            this.rows = rows;
            this.totalCount = this.columns * this.rows;
            this.fillColor = fillColor;

            this.frameNames = Array(this.totalCount);
            for (var i = 0, cnt = this.frameNames.length; i < cnt; i++) {
                this.frameNames[i] = undefined;
            }

            this.dirty = false;
        }

        destroy() {
            this.scene = undefined;
            this.texture = undefined;
            this.canvas = undefined;
            this.context = undefined;
            this.frameNames = undefined;
            this.bitmapFontCache = undefined;
        }

        getFrameIndex(frameName) {
            return this.frameNames.indexOf(frameName);
        }

        contains(frameName) {
            return this.getFrameIndex(frameName) !== -1;
        }

        addFrameName(index, frameName) {
            this.frameNames[index] = frameName;
            return this;
        }

        get isFull() {
            return this.getFrameIndex(undefined) === -1;
        }

        getTopLeftPosition(frameIndex, out) {
            if (out === undefined) {
                out = {};
            }

            var columnIndex = frameIndex % this.columns;
            var rowIndex = Math.floor(frameIndex / this.columns);
            out.x = columnIndex * (this.cellWidth + (this.cellPadding * 2));
            out.y = rowIndex * (this.cellHeight + (this.cellPadding * 2));
            return out;
        }

        updateTexture() {
            if (this.useDynamicTexture) ; else {
                this.texture.refresh();
            }

            this.dirty = false;

            return this;
        }

    }

    Object.assign(
        FrameManager.prototype,
        methods
    );

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class FrameManagerPool {
        constructor(scene, keyGenerator, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
            this.list = [];

            var config;
            if (IsPlainObject(keyGenerator)) {
                config = keyGenerator;
                keyGenerator = GetValue(config, 'key');
            }
            this.keyGenerator = keyGenerator;

            var key = this.generateKey();
            if (config) {
                config.key = key;
                key = config;
            }

            // Store properties in firstItem
            this.firstItem = new FrameManager(
                scene, key,
                width, height, cellWidth, cellHeight,
                fillColor, useDynamicTexture
            );

            this.list.push(this.firstItem);
            this.lastKey = undefined;
        }

        get scene() {
            return this.firstItem.scene;
        }

        get useDynamicTexture() {
            return this.firstItem.useDynamicTexture;
        }

        get cellWidth() {
            return this.firstItem.cellWidth;
        }

        get cellHeight() {
            return this.firstItem.cellHeight;
        }

        get cellPadding() {
            return this.firstItem.cellPadding;
        }

        get outerCellWidth() {
            return this.firstItem.outerCellWidth;
        }

        get outerCellHeight() {
            return this.firstItem.outerCellHeight;
        }

        get width() {
            return this.firstItem.width;
        }

        get height() {
            return this.firstItem.height;
        }

        get columns() {
            return this.firstItem.columns;
        }

        get rows() {
            return this.firstItem.rows;
        }

        get totalCount() {
            return this.firstItem.totalCount;
        }

        get fillColor() {
            return this.firstItem.fillColor;
        }

        // Internal
        generateKey() {
            var keyGenerator = this.keyGenerator;
            var index = this.list.length;
            if (typeof (keyGenerator) === 'string') {
                return `${keyGenerator}_${index}`;
            }
            return keyGenerator(index);
        }

        getFrameManager(frameName) {
            var items = this.list;
            for (var i = 0, cnt = this.list.length; i < cnt; i++) {
                var item = items[i];
                if (item.contains(frameName)) {
                    return item;
                }
            }

            return undefined;
        }

        getAvailableFrameManager() {
            var items = this.list;
            var item;
            for (var i = 0, cnt = this.list.length; i < cnt; i++) {
                item = items[i];
                if (!item.isFull) {
                    return item;
                }
            }

            // Does not have available item, create a new one
            item = new FrameManager(
                this.scene, this.generateKey(),
                this.width, this.height, this.cellWidth, this.cellHeight,
                this.fillColor, this.useDynamicTexture
            );

            items.push(item);

            this.lastKey = item.key;

            return item;
        }

        // Interface
        destroy() {
            var items = this.list;
            for (var i = 0, cnt = this.list.length; i < cnt; i++) {
                items[i].destroy();
            }

            return this;
        }

        draw(frameName, callback, scope) {
            var item = this.getAvailableFrameManager();
            item.draw(frameName, callback, scope);
            return this;
        }

        paste(frameName, gameObject) {
            var item = this.getAvailableFrameManager();
            item.paste(frameName, gameObject);
            return this;
        }

        addEmptyFrame(frameName, width, height) {
            var item = this.getAvailableFrameManager();
            item.addEmptyFrame(frameName, width, height);
            return this;
        }

        updateTexture() {
            var items = this.list;
            for (var i = 0, cnt = this.list.length; i < cnt; i++) {
                var item = items[i];
                if (item.dirty) {
                    item.updateTexture();
                }
            }

            return this;
        }

        remove(frameName) {
            var items = this.list;
            for (var i = 0, cnt = this.list.length; i < cnt; i++) {
                var item = items[i];
                if (item.contains(frameName)) {
                    item.remove(frameName);
                    return this;
                }
            }

            return this;
        }

        clear() {
            var items = this.list;
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                items[i].clear();
            }

            return this;
        }

        contains(frameName) {
            var items = this.list;
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                if (items[i].contains(frameName)) {
                    return true;
                }
            }

            return false;
        }

        getKey(frameName) {
            var item = this.getFrameManager(frameName);
            if (item) {
                return item.key;
            }

            return undefined;
        }

        get keys() {
            return this.getKeys();
        }

        getKeys() {
            var keys = [];
            var items = this.list;
            for (var i = 0, cnt = items.length; i < cnt; i++) {
                keys.push(items[i].key);
            }

            return keys;
        }

        getTexture(frameName) {
            var item = this.getFrameManager(frameName);
            if (item) {
                return item.texture;
            }

            return undefined;
        }

        getCanvas(frameName) {
            var item = this.getFrameManager(frameName);
            if (item) {
                return item.canvas;
            }

            return undefined;
        }

        getContext(frameName) {
            var item = this.getFrameManager(frameName);
            if (item) {
                return item.context;
            }

            return undefined;
        }
    }

    class FrameManagerPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        add(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
            return new FrameManager(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture);
        }

        addPool(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
            return new FrameManagerPool(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture);
        }

    }

    return FrameManagerPlugin;

}));
