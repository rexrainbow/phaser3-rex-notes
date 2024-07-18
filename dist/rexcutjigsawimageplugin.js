(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexcutjigsawimageplugin = factory());
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

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class FrameManager {
        constructor(scene, key, width, height, cellWidth, cellHeight, fillColor, useDynamicTexture) {
            var columns, rows, cellPadding;
            if (IsPlainObject(key)) {
                var config = key;
                key = GetValue(config, 'key');
                width = GetValue(config, 'width');
                height = GetValue(config, 'height');
                cellWidth = GetValue(config, 'cellWidth');
                cellHeight = GetValue(config, 'cellHeight');
                cellPadding = GetValue(config, 'cellPadding', 0);
                columns = GetValue(config, 'columns');
                rows = GetValue(config, 'rows');
                fillColor = GetValue(config, 'fillColor');
                useDynamicTexture = GetValue(config, 'useDynamicTexture');            
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

            this.cellWidth = cellWidth;
            this.cellHeight = cellHeight;
            this.cellPadding = cellPadding;

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

            this.frameNames = Array(this.totalCount);
            for (var i = 0, cnt = this.frameNames.length; i < cnt; i++) {
                this.frameNames[i] = undefined;
            }
        }

        get outerCellWidth() {
            return this.cellWidth + (this.cellPadding * 2);
        }

        get outerCellHeight() {
            return this.cellHeight + (this.cellPadding * 2);
        }

        destroy() {
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
            return this;
        }

    }

    Object.assign(
        FrameManager.prototype,
        methods
    );

    var GenerateEdges = function (columns, rows, callbacks) {

        var getRightEdgeCallback = (callbacks) ? callbacks.getRightEdge : undefined;
        var getBottomEdgeCallback = (callbacks) ? callbacks.getBottomEdge : undefined;

        if (!getRightEdgeCallback) {
            getRightEdgeCallback = DefaultGetEdgeCallback;
        }
        if (!getBottomEdgeCallback) {
            getBottomEdgeCallback = DefaultGetEdgeCallback;
        }

        var edges = [];
        for (var c = 0; c < columns; c++) {
            edges.push(new Array(rows));
        }

        var lastColumnIndex = columns - 1;
        var lastRowIndex = rows - 1;
        var left, right, top, bottom;
        var neighborEdge;
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                // left
                if (c === 0) {
                    left = 0;
                } else {
                    neighborEdge = edges[c - 1][r].right;
                    left = OppositeEdgeMap[neighborEdge] || 0;
                }

                // top
                if (r === 0) {
                    top = 0;
                } else {
                    neighborEdge = edges[c][r - 1].bottom;
                    top = OppositeEdgeMap[neighborEdge] || 0;
                }

                // right
                if (c === lastColumnIndex) {
                    right = 0;
                } else {
                    right = getRightEdgeCallback(c, r);
                }

                // bottom
                if (r === lastRowIndex) {
                    bottom = 0;
                } else {
                    bottom = getBottomEdgeCallback(c, r);
                }

                edges[c][r] = {
                    left,
                    right,
                    top,
                    bottom
                };
            }
        }

        return edges;
    };

    var DefaultGetEdgeCallback = function (c, r) {
        return (Math.random() > 0.5) ? 2 : 1;
    };

    var OppositeEdgeMap = {
        1: 2,
        2: 1
    };

    const DegToRad = Phaser.Math.DegToRad;
    const RAD0 = DegToRad(0);
    const RAD90 = DegToRad(90);
    const RAD180 = DegToRad(180);
    const RAD270 = DegToRad(270);
    const RAD360 = DegToRad(360);

    var DefaultDrawShapeCallback = function (
        // graphics for dynamic texture
        // context for canvas texture
        graphics,

        width, height,
        edgeWidth, edgeHeight,
        edgeMode
    ) {

        var centerX = width / 2, centerY = height / 2;
        var leftX = edgeWidth,
            rightX = width - edgeWidth,
            topY = edgeHeight,
            bottomY = height - edgeHeight;

        graphics.clear();

        graphics.beginPath();

        graphics.moveTo(leftX, topY);

        switch (edgeMode.top) {
            case 1:
                graphics.lineTo(centerX - edgeHeight - 1, topY);
                graphics.arc(centerX, topY, edgeHeight + 1, RAD180, RAD360, false);
                break;
            case 2:
                graphics.lineTo(centerX - edgeHeight + 1, topY);
                graphics.arc(centerX, topY, edgeHeight - 1, RAD180, RAD360, true);
                break;
        }
        graphics.lineTo(rightX, topY);

        switch (edgeMode.right) {
            case 1:
                graphics.arc(rightX, centerY, edgeWidth + 1, RAD270, RAD90, false);
                break;
            case 2:
                graphics.arc(rightX, centerY, edgeWidth - 1, RAD270, RAD90, true);
                break;
        }
        graphics.lineTo(rightX, bottomY);

        switch (edgeMode.bottom) {
            case 1:
                graphics.arc(centerX, bottomY, edgeHeight + 1, RAD0, RAD180, false);
                break;
            case 2:
                graphics.arc(centerX, bottomY, edgeHeight - 1, RAD0, RAD180, true);
                break;
        }
        graphics.lineTo(leftX, bottomY);

        switch (edgeMode.left) {
            case 1:
                graphics.arc(leftX, centerY, edgeWidth + 1, RAD90, RAD270, false);
                break;
            case 2:
                graphics.arc(leftX, centerY, edgeWidth - 1, RAD90, RAD270, true);
                break;
        }
        graphics.lineTo(leftX, topY);

        graphics.closePath();

        graphics.fillPath();
    };

    var JigsawPieceBase = function (GOClass) {
        class BassClass extends (GOClass) {

            init(config) {

                this.setBaseKey(config.key);
                this.setDrawShapeCallback(config.drawShapeCallback);

                var edgeWidth = config.edgeWidth;
                if (edgeWidth === undefined) {
                    edgeWidth = Math.floor(config.width / 7);
                }
                this.edgeWidth = edgeWidth;

                var edgeHeight = config.edgeHeight;
                if (edgeHeight === undefined) {
                    edgeHeight = Math.floor(config.height / 7);
                }
                this.edgeHeight = edgeHeight;

                return this;
            }

            setBaseKey(key) {
                this.sourceKey = key;
                return this;
            }

            setDrawShapeCallback(callback) {
                this.drawShapeCallback = callback;
                return this;
            }

            // Override
            drawPiece({
                scrollX, scrollY,
                edgeMode,
            }) {

            }
        }

        return BassClass;
    };

    var ConvertEdgeMode = function (edgeMode) {
        if (typeof (edgeMode) === 'string') {
            edgeMode = edgeMode.split('').map(function (x) { return parseInt(x) });
            edgeMode = {
                right: edgeMode[0],
                bottom: edgeMode[1],
                left: edgeMode[2],
                top: edgeMode[3]
            };
        }

        return edgeMode;
    };

    /* 
    Sample JigsawPiece, draw to FrameManager
    */

    const RenderTexture = Phaser.GameObjects.RenderTexture;

    class JigsawPieceRenderTexurue extends JigsawPieceBase(RenderTexture) {
        constructor(scene, config) {
            if (!config.drawShapeCallback) {
                config.drawShapeCallback = DefaultDrawShapeCallback;
            }

            super(scene, 0, 0, config.width, config.height);

            this.init(config);

            var maskGraphics = scene.make.graphics({ add: false });
            this.setMask(maskGraphics.createGeometryMask());
            this.maskGraphics = maskGraphics;
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene || this.ignoreDestroy) {
                return;
            }

            super.destroy(fromScene);

            this.maskGraphics.destroy();
            this.maskGraphics = undefined;
        }

        drawPiece({
            scrollX, scrollY,
            edgeMode,
        }) {
            // Convert string to plain object
            edgeMode = ConvertEdgeMode(edgeMode);

            this.clear();

            this.camera.setScroll(scrollX, scrollY);

            this.stamp(this.sourceKey, undefined, 0, 0, {
                originX: 0, originY: 0,
            });

            this.camera.setScroll(0, 0);

            this.maskGraphics.clear();

            this.drawShapeCallback(
                this.maskGraphics,
                this.width, this.height,
                this.edgeWidth, this.edgeHeight,
                edgeMode
            );

            return this;
        }
    }

    var DrawCanvasPieceCallback = function (
        image,
        context,

        sx, sy,
        width, height,
        totalWidth, totalHeight,

        edgeWidth, edgeHeight,
        edgeMode,

        drawShapeCallback
    ) {

        edgeMode = ConvertEdgeMode(edgeMode);

        // Already translate to dx, dy

        // context.save();

        context.clearRect(0, 0, width, height);

        drawShapeCallback(
            context,
            width, height,
            edgeWidth, edgeHeight,
            edgeMode
        );

        context.clip();

        var dx = 0,
            dy = 0,
            dWidth = width,
            dHeight = height;
        if (sx < 0) {
            dx -= sx;
            dWidth += sx;
            sx = 0;
        }
        if (sy < 0) {
            dy -= sy;
            dHeight += sy;
            sy = 0;
        }

        if ((sx + dWidth) > totalWidth) {
            dWidth = totalWidth - sx;
        }
        if ((sy + dHeight) > totalHeight) {
            dHeight = totalHeight - sy;
        }

        context.drawImage(
            image,  // image
            sx, sy, dWidth, dHeight,
            dx, dy, dWidth, dHeight
        );

        // context.restore();
    };

    var NOOP = function () {
        //  NOOP
    };

    var DefaultGetFrameNameCallback = function (c, r) {
        return `${c},${r}`;
    };

    var GenerateFrames = function (scene, {
        sourceKey,
        destinationKey,
        columns, rows,
        framePadding = 1,
        edgeWidth, edgeHeight,
        edges,
        drawShapeCallback = DefaultDrawShapeCallback,
        useDynamicTexture = true,
        getFrameNameCallback = DefaultGetFrameNameCallback
    }) {

        var textureManager = scene.sys.textures;
        var sourceFrame = textureManager.getFrame(sourceKey, '__BASE');
        var sourceFrameWidth = sourceFrame.cutWidth,
            sourceFrameHeight = sourceFrame.height;

        if (edgeWidth === undefined) {
            edgeWidth = Math.floor((sourceFrameWidth / columns) / 7);
        }
        if (edgeHeight === undefined) {
            edgeHeight = Math.floor((sourceFrameHeight / rows) / 7);
        }

        if (Array.isArray(edges)) ; else {
            edges = GenerateEdges(columns, rows, edges);
        }

        if (destinationKey === undefined) {
            destinationKey = `${sourceKey}_pieces`;
        }

        if (textureManager.exists(destinationKey)) {
            textureManager.remove(destinationKey);
        }

        var frameWidth = (sourceFrameWidth / columns) + (2 * edgeWidth);
        var frameHeight = (sourceFrameHeight / rows) + (2 * edgeHeight);

        frameWidth = Math.ceil(frameWidth);
        frameHeight = Math.ceil(frameHeight);

        var frameManager = new FrameManager(scene, {
            key: destinationKey,
            cellWidth: frameWidth,
            cellHeight: frameHeight,
            cellPadding: framePadding,
            columns: columns,
            rows: rows,
            useDynamicTexture: useDynamicTexture,
            fillColor: 0x888888,
        });

        var sample, sourceImage;

        if (useDynamicTexture) {
            // Use dynamic-texture
            sample = new JigsawPieceRenderTexurue(scene, {
                width: frameWidth, height: frameHeight,
                edgeWidth: edgeWidth, edgeHeight: edgeHeight,
                key: sourceKey,
                drawShapeCallback
            });
        } else {
            // Use canvas-texture
            sourceImage = sourceFrame.source.image;
            // Align interface of canvas-context with graphics
            frameManager.context.clear = NOOP;
            frameManager.context.fillPath = NOOP;
        }

        var startX = -edgeWidth,
            startY = -edgeHeight;
        var scrollX = startX,
            scrollY = startY;
        var frameName, edgeMode;
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                frameName = getFrameNameCallback(c, r);
                edgeMode = edges[c][r];

                if (useDynamicTexture) {
                    // Use dynamic-texture
                    sample.drawPiece({ scrollX, scrollY, edgeMode });
                    frameManager.paste(frameName, sample);

                } else {
                    // Use canvas-texture
                    frameManager.draw(frameName, function (canvas, context, frameSize) {
                        DrawCanvasPieceCallback(
                            sourceImage,
                            context,

                            scrollX, scrollY,
                            frameWidth, frameHeight,
                            sourceFrameWidth, sourceFrameHeight,

                            edgeWidth, edgeHeight,
                            edgeMode,

                            drawShapeCallback
                        );
                    });
                }

                scrollX += frameWidth - (edgeWidth * 2);
            }

            scrollX = startX;
            scrollY += frameHeight - (edgeHeight * 2);
        }

        frameManager.updateTexture();

        if (useDynamicTexture) {
            // Use dynamic-texture
            sample.destroy();
        } else {
            // Use canvas-texture
            sourceImage = null;
            delete frameManager.context.clear;
            delete frameManager.context.fillPath;
        }

        frameManager.destroy();

        return {
            sourceKey,
            destinationKey,
            columns, rows,

            sourceFrameWidth, sourceFrameHeight,
            frameWidth, frameHeight,
            edgeWidth, edgeHeight,
            getFrameNameCallback,
        }
    };

    const DefaultImageClass = Phaser.GameObjects.Image;
    const RotateAround = Phaser.Math.RotateAround;

    var CreatePieces = function (gameObject, {
        piecesKey,
        columns, rows,
        edgeWidth, edgeHeight,
        drawShapeCallback,
        edges,
        useDynamicTexture = true,

        createImageCallback,
        ImageClass = DefaultImageClass,
        objectPool,
        add = true,
        align = add,

        originX = 0.5,
        originY = 0.5,
    }) {

        var scene = gameObject.scene;

        var sourceKey = gameObject.texture.key;
        var topLeft = gameObject.getTopLeft();
        var topLeftX = topLeft.x;
        var topLeftY = topLeft.y;
        var scaleX = gameObject.scaleX;
        var scaleY = gameObject.scaleY;
        var rotation = gameObject.rotation;

        var result = GenerateFrames(scene, {
            sourceKey,
            destinationKey: piecesKey,
            columns, rows,
            edgeWidth, edgeHeight,
            edges,
            drawShapeCallback,
            useDynamicTexture,
        });

        piecesKey = result.destinationKey;
        var getFrameNameCallback = result.getFrameNameCallback;
        var frameWidth = result.frameWidth,
            frameHeight = result.frameHeight;
        var pieceWidth = (frameWidth - (edgeWidth * 2)) * scaleX,
            pieceHeight = (frameHeight - (edgeHeight * 2)) * scaleY;
        var pieceDisplayOriginX = originX * frameWidth * scaleX,
            pieceDisplayOriginY = originY * frameHeight * scaleY;

        if (!createImageCallback) {
            createImageCallback = function (scene, key, frame) {
                return new ImageClass(scene, 0, 0, key, frame);
            };
        }

        var pieceGameObjects = [];

        topLeftX -= edgeWidth;
        topLeftY -= edgeHeight;
        var pieceTopLeftX = topLeftX,
            pieceTopLeftY = topLeftY;
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                var pieceGameObject;
                var frameName = getFrameNameCallback(c, r);

                if (objectPool && (objectPool.length > 0)) {
                    pieceGameObject = (objectPool.pop()).setTexture(piecesKey, frameName);
                } else {
                    pieceGameObject = createImageCallback(scene, piecesKey, frameName);
                }

                if (add) {
                    scene.add.existing(pieceGameObject);
                }

                if (align) {
                    var pieceX = pieceTopLeftX + pieceDisplayOriginX;
                    var pieceY = pieceTopLeftY + pieceDisplayOriginY;
                    pieceGameObject
                        .setOrigin(originX, originY)
                        .setPosition(pieceX, pieceY)
                        .setScale(scaleX, scaleY)
                        .setRotation(rotation);
                    RotateAround(pieceGameObject, topLeftX, topLeftY, rotation);
                }

                pieceTopLeftX += pieceWidth;

                pieceGameObjects.push(pieceGameObject);
            }

            pieceTopLeftX = topLeftX;
            pieceTopLeftY += pieceHeight;

        }

        return pieceGameObjects;
    };

    class CutJigsawImagePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }

        gridCut(gameObject, config) {
            return CreatePieces(gameObject, config);
        }
    }

    return CutJigsawImagePlugin;

}));
