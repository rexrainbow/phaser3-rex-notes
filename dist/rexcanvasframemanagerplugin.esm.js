import { Game, Scene, Utils, Plugins } from 'phaser';

var Draw = function (frameName, callback, scope) {
    var index = this.getFrameIndex(frameName);
    if (index === -1) {
        index = this.getFrameIndex(undefined);
    }
    if (index === -1) {
        console.warn('Does not have free space.');
        return this;
    }

    // Clear frame space
    var tl = this.getTopLeftPosition(index),
        outerX = tl.x,
        outerY = tl.y,
        cellPadding = this.cellPadding,
        innerX = outerX + cellPadding,
        innerY = outerY + cellPadding;

    ClearFrame.call(this, outerX, outerY, this.outerCellWidth, this.outerCellHeight);

    // Draw frame
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
        this.texture.clear(x, y, width, height);
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
    // frameSize might be changed

    texture.render();

    texture.camera.setScroll(0, 0);

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

var PI2 = Math.PI * 2;
var RIGHT_ANGLE_EPSILON = 0.000001;

var NormalizeRotation = function (rotation) {
    if (rotation === undefined) {
        rotation = 0;
    }

    rotation = rotation % PI2;
    if (rotation < 0) {
        rotation += PI2;
    }

    return rotation;
};

var NeedRotatedBounds = function (rotation) {
    rotation = NormalizeRotation(rotation);

    return (
        (Math.abs(Math.sin(rotation)) > RIGHT_ANGLE_EPSILON) &&
        (Math.abs(Math.cos(rotation)) > RIGHT_ANGLE_EPSILON)
    );
};

var GetAxisAlignedBounds = function (width, height, originX, originY, rotation, out) {
    if (out === undefined) {
        out = {};
    }

    rotation = NormalizeRotation(rotation);

    var sin = Math.sin(rotation);
    var cos = Math.cos(rotation);

    if (Math.abs(sin) <= RIGHT_ANGLE_EPSILON) {
        out.width = width;
        out.height = height;

        if (cos >= 0) {
            out.x = originX * width;
            out.y = originY * height;
        } else {
            out.x = (1 - originX) * width;
            out.y = (1 - originY) * height;
        }
    } else {
        out.width = height;
        out.height = width;

        if (sin > 0) {
            out.x = (1 - originY) * height;
            out.y = originX * width;
        } else {
            out.x = originY * height;
            out.y = (1 - originX) * width;
        }
    }

    return out;
};

var GetRotatedBounds = function (width, height, originX, originY, rotation, out) {
    if (out === undefined) {
        out = {};
    }

    var left = -originX * width;
    var right = left + width;
    var top = -originY * height;
    var bottom = top + height;

    var cos = Math.cos(rotation);
    var sin = Math.sin(rotation);

    var x0 = (left * cos) - (top * sin);
    var y0 = (left * sin) + (top * cos);
    var x1 = (right * cos) - (top * sin);
    var y1 = (right * sin) + (top * cos);
    var x2 = (right * cos) - (bottom * sin);
    var y2 = (right * sin) + (bottom * cos);
    var x3 = (left * cos) - (bottom * sin);
    var y3 = (left * sin) + (bottom * cos);

    var minX = Math.min(x0, x1, x2, x3);
    var minY = Math.min(y0, y1, y2, y3);
    var maxX = Math.max(x0, x1, x2, x3);
    var maxY = Math.max(y0, y1, y2, y3);

    out.x = -minX;
    out.y = -minY;
    out.width = maxX - minX;
    out.height = maxY - minY;

    return out;
};

var Paste = function (frameName, gameObject) {
    var srcWidth = Math.abs(GetDisplayWidth(gameObject)),
        srcHeight = Math.abs(GetDisplayHeight(gameObject));
    var rotation = (gameObject.rotation !== undefined) ? gameObject.rotation : 0;
    var originX = (gameObject.originX !== undefined) ? gameObject.originX : 0;
    var originY = (gameObject.originY !== undefined) ? gameObject.originY : 0;
    var alpha = (gameObject.alpha !== undefined) ? gameObject.alpha : 1;
    var flipX = !!gameObject.flipX;
    var flipY = !!gameObject.flipY;
    var needRotatedBounds = NeedRotatedBounds(rotation);

    var bounds = {};
    if (needRotatedBounds) {
        GetRotatedBounds(srcWidth, srcHeight, originX, originY, rotation, bounds);
    } else {
        GetAxisAlignedBounds(srcWidth, srcHeight, originX, originY, rotation, bounds);
    }

    var fitScale = Math.max((bounds.width / this.cellWidth), (bounds.height / this.cellHeight), 1);
    var drawWidth = srcWidth / fitScale;
    var drawHeight = srcHeight / fitScale;

    if (needRotatedBounds) {
        GetRotatedBounds(drawWidth, drawHeight, originX, originY, rotation, bounds);
    } else {
        GetAxisAlignedBounds(drawWidth, drawHeight, originX, originY, rotation, bounds);
    }

    var drawCallback;
    if (this.useDynamicTexture) {
        var scaleX = ((gameObject.scaleX !== undefined) ? gameObject.scaleX : 1) / fitScale;
        var scaleY = ((gameObject.scaleY !== undefined) ? gameObject.scaleY : 1) / fitScale;
        if (flipX) {
            scaleX *= -1;
        }
        if (flipY) {
            scaleY *= -1;
        }

        drawCallback = function (texture, frameSize) {
            frameSize.width = bounds.width;
            frameSize.height = bounds.height;

            texture.capture(gameObject, {
                x: bounds.x,
                y: bounds.y,
                rotation: rotation,
                originX: originX,
                originY: originY,
                scaleX: scaleX,
                scaleY: scaleY
            });
        };

    } else {
        var drawX = bounds.x;
        var drawY = bounds.y;
        var left = -originX * drawWidth;
        var top = -originY * drawHeight;
        var flipScaleX = (((gameObject.scaleX !== undefined) && (gameObject.scaleX < 0)) !== flipX) ? -1 : 1;
        var flipScaleY = (((gameObject.scaleY !== undefined) && (gameObject.scaleY < 0)) !== flipY) ? -1 : 1;

        var srcCanvas = gameObject.canvas;
        var srcFrame = gameObject.frame;
        if (srcCanvas || srcFrame) {
            drawCallback = function (canvas, context, frameSize) {
                frameSize.width = bounds.width;
                frameSize.height = bounds.height;

                context.save();
                context.globalAlpha = alpha;
                context.translate(drawX, drawY);
                context.rotate(rotation);
                context.scale(flipScaleX, flipScaleY);

                if (srcCanvas) {
                    context.drawImage(srcCanvas, left, top, drawWidth, drawHeight);
                } else {
                    context.drawImage(
                        srcFrame.source.image,
                        srcFrame.cutX, srcFrame.cutY, srcFrame.cutWidth, srcFrame.cutHeight,
                        left, top, drawWidth, drawHeight
                    );
                }

                context.restore();
            };

        } else {
            console.warn(`Can't get content from game object.`);
            return this;
        }

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

const IsPlainObject$1 = Utils.Objects.IsPlainObject;
const GetValue$1 = Utils.Objects.GetValue;

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
                this.texture.fill(fillColor).render();

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
        if (this.useDynamicTexture) {
            this.texture.render();
        } else {
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

const IsPlainObject = Utils.Objects.IsPlainObject;
const GetValue = Utils.Objects.GetValue;

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

class FrameManagerPlugin extends Plugins.BasePlugin {

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

export { FrameManagerPlugin as default };
