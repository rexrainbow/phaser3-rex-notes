(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexninepatch2plugin = factory());
})(this, (function () { 'use strict';

    const GetCalcMatrix = Phaser.GameObjects.GetCalcMatrix;

    var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
        var bobs = src.getRenderList();
        if (bobs.length === 0) {
            return;
        }

        camera.addToRenderList(src);

        var pipeline = renderer.pipelines.set(src.pipeline);

        var texture = src.frame.glTexture;

        var textureUnit = pipeline.setGameObject(src);

        var roundPixels = camera.roundPixels;

        var result = GetCalcMatrix(src, camera, parentMatrix);

        var calcMatrix = pipeline.calcMatrix.copyFrom(result.calc);

        var dx = src._displayOriginX;
        var dy = src._displayOriginY;

        var alpha = camera.alpha * src.alpha;

        renderer.pipelines.preBatch(src);

        for (var i = 0, cnt = bobs.length; i < cnt; i++) {
            bobs[i].webglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels);
        }

        renderer.pipelines.postBatch(src);
    };

    const SetTransform = Phaser.Renderer.Canvas.SetTransform;

    var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
        var ctx = renderer.currentContext;

        var bobs = src.getRenderList();
        if ((bobs.length === 0) || (!SetTransform(renderer, ctx, src, camera, parentMatrix))) {
            return;
        }

        camera.addToRenderList(src);

        var roundPixels = camera.roundPixels;

        var dx = -src._displayOriginX,
            dy = -src._displayOriginY;

        ctx.translate(dx, dy);

        for (var i = 0, cnt = bobs.length; i < cnt; i++) {
            bobs[i].canvasRender(ctx, dx, dy, roundPixels);
        }

        //  Restore the context saved in SetTransform
        ctx.restore();
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer

    };

    var SetTexture = function (key, frame) {
        this.texture = this.scene.sys.textures.get(key);
        this.frame = this.texture.get(frame);
        return this;
    };

    var Resize = function (width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        this.width = width;
        this.height = height;

        this.updateDisplayOrigin();

        var input = this.input;

        if (input && !input.customHitArea) {
            input.hitArea.width = width;
            input.hitArea.height = height;
        }

        return this;
    };

    var AddChild = function (bob) {
        this.lastAppendedChildren.length = 0;

        if (Array.isArray(bob)) {
            this.children.add(bob);
            this.lastAppendedChildren.push(...bob);
        } else {
            this.children.add(bob);
            this.lastAppendedChildren.push(bob);
        }

        return this;
    };

    const RemoveItem = Phaser.Utils.Array.Remove;

    var RemoveChild = function (bob) {
        if (this.poolManager) {
            // Free this bob (bob.onFree())
            this.poolManager.free(bob);
        }

        // Remove this bob from blitter
        RemoveItem(this.children.list, bob);
        this.lastAppendedChildren.length = 0;
        this.dirty = true;
        return this;
    };

    var RemoveChildren = function () {
        if (this.poolManager) {
            // Free all bobs (bob.onFree())
            this.poolManager.freeMultiple(this.children.list);
        }

        // Remove all bobs from blitter
        this.children.list.length = 0;
        this.lastAppendedChildren.length = 0;
        this.dirty = true;
        return this;
    };

    var GetLastAppendedChildren = function () {
        return this.lastAppendedChildren;
    };

    var GetChildren = function () {
        return this.children.list;
    };

    var TintMethods = {
        setTint(tint) {
            // 0: Solid tint + texture alpha
            this.tint = tint;
            this.tintFill = false;
            return this;
        },

        setTintFill(tint) {
            // 1: Solid tint, no texture
            this.tint = tint;
            this.tintFill = true;
            return this;
        },

        clearTint() {
            this.setTint(0xffffff);
            return this;
        }
    };

    var methods$1 = {
        setTexture: SetTexture,
        resize: Resize,
        setSize: Resize,
        addChild: AddChild,
        removeChild: RemoveChild,
        removeChildren: RemoveChildren,
        clear: RemoveChildren,
        getLastAppendedChildren: GetLastAppendedChildren,
        getChildren: GetChildren,
    };

    Object.assign(
        methods$1,
        TintMethods
    );

    class Stack {
        constructor() {
            this.items = [];
        }

        destroy() {
            this.clear();
            this.items = undefined;
        }

        pop() {
            return (this.items.length > 0) ? this.items.pop() : null;
        }

        push(l) {
            this.items.push(l);
            return this;
        }

        pushMultiple(arr) {
            this.items.push.apply(this.items, arr);
            arr.length = 0;
            return this;
        }

        clear() {
            this.items.length = 0;
            return this;
        }
    }

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    var Pools = {};
    class PoolManager {
        constructor(config) {
            this.pools = GetValue$5(config, 'pools', Pools);
        }

        destroy() {
            this.pools = undefined;
        }

        free(bob) {
            if (!this.pools) {
                return this;
            }

            var bobType = bob.type;
            if (!this.pools.hasOwnProperty(bobType)) {
                this.pools[bobType] = new Stack();
            }
            this.pools[bobType].push(bob);
            bob.onFree();
            return this;
        }

        freeMultiple(bobs) {
            if (!this.pools) {
                return this;
            }

            for (var i = 0, cnt = bobs.length; i < cnt; i++) {
                this.free(bobs[i]);
            }
            return this;
        }

        allocate(bobType) {
            if (!this.pools || !this.pools.hasOwnProperty(bobType)) {
                return null;
            }
            return this.pools[bobType].pop();
        }
    }

    const MinVersion = 60;

    var IsChecked = false;

    var CheckP3Version = function (minVersion) {
        if (IsChecked) {
            return;
        }

        if (minVersion === undefined) {
            minVersion = MinVersion;
        }
        var version = Phaser.VERSION.split('.');
        var mainVersion = parseInt(version[0]);
        if (mainVersion === 3) {
            var currentVersion = parseInt(version[1]);
            if (currentVersion < minVersion) {
                console.error(`Minimum supported version : ${mainVersion}.${currentVersion}`);
            }
        } else {
            console.error(`Can't supported version : ${mainVersion}`);
        }

        IsChecked = true;
    };

    CheckP3Version();

    const GameObject = Phaser.GameObjects.GameObject;
    const IsPlainObject$3 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$4 = Phaser.Utils.Objects.GetValue;
    const List = Phaser.Structs.List;
    const StableSort = Phaser.Utils.Array.StableSort;

    class Blitter extends GameObject {
        constructor(scene, x, y, texture, frame, config) {
            if (IsPlainObject$3(x)) {
                config = x;
                x = GetValue$4(config, 'x', 0);
                y = GetValue$4(config, 'y', 0);
                texture = GetValue$4(config, 'texture');
                frame = GetValue$4(config, 'frame');
            }

            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }

            super(scene, 'rexBlitter');

            this.children = new List();
            this.renderList = [];
            this.displayListDirty = false;
            this.lastAppendedChildren = [];

            var reuseBob = GetValue$4(config, 'reuseBob', true);
            this.poolManager = (reuseBob) ? (new PoolManager(config)) : undefined;

            this.setTexture(texture, frame);
            this.setPosition(x, y);
            this.setOrigin(0, 0);
            this.clearTint();
            this.initPipeline();
            this.initPostPipeline();

        }

        preDestroy() {
            this.removeChildren();
            this.children.destroy();
            this.renderList.length = 0;

            if (this.poolManager) {
                this.poolManager.destroy();
            }
        }

        getRenderList() {
            if (this.displayListDirty) {
                this.renderList.length = 0;
                var needDepthSort = false;

                var children = this.children.list;
                for (var i = 0, cnt = children.length; i < cnt; i++) {
                    var child = children[i];
                    if (ChildCanRender(child)) {
                        this.renderList.push(child);

                        if (!needDepthSort) {
                            needDepthSort = (child.depth !== 0);
                        }
                    }
                }

                if (needDepthSort) {
                    StableSort(this.renderList, SortByDepth);
                }

                this.displayListDirty = false;
            }

            return this.renderList;
        }
    }

    var ChildCanRender = function (child) {
        return (child.active && child.visible && (child.alpha > 0));
    };

    var SortByDepth = function (childA, childB) {
        return childA._depth - childB._depth;
    };

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Blitter,
        [
            Components.Alpha,
            Components.BlendMode,
            Components.ComputedSize,
            Components.Depth,
            Components.GetBounds,
            Components.Mask,
            Components.Origin,
            Components.Pipeline,
            Components.PostPipeline,
            Components.ScrollFactor,
            Components.Transform,
            Components.Visible,
            Render,

            methods$1
        ]
    );

    var SetGetFrameNameCallback = function(callback) {
        if (callback === undefined) {
            callback = DefaultGetFrameNameCallback;
        }
        this.getFrameNameCallback = callback;
        return this;
    };

    var DefaultGetFrameNameCallback = function (colIndex, rowIndex, baseFrameName) {
        if (baseFrameName === '__BASE') {
            return `${colIndex},${rowIndex}`;
        } else {
            return `${baseFrameName}:${colIndex},${rowIndex}`;
        }
    };

    function DeepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            // If obj is a primitive value or null, return it directly
            return obj;
        }

        if (Array.isArray(obj)) {
            // If obj is an array, create a new array and clone each element
            return obj.map(item => DeepClone(item));
        }

        if (obj instanceof Date) {
            // If obj is a Date object, create a new Date object with the same value
            return new Date(obj);
        }

        if (obj instanceof RegExp) {
            // If obj is a RegExp object, create a new RegExp object with the same pattern and flags
            return new RegExp(obj);
        }

        if (Object.getPrototypeOf(obj) !== Object.prototype) {
            // If obj is a custom object, return a reference to it
            return obj;
        }

        // If obj is a plain object, create a new object and clone each property
        const clonedObj = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = DeepClone(obj[key]);
            }
        }
        return clonedObj;
    }

    var SetBaseTexture = function (key, baseFrameName, columns, rows) {
        if (Array.isArray(baseFrameName)) {
            rows = columns;
            columns = baseFrameName;
            baseFrameName = undefined;
        }

        if (baseFrameName == null) {
            baseFrameName = '__BASE';
        }

        if ((typeof (columns) === 'number') && (arguments.length >= 6)) {
            columns = [arguments[2], undefined, arguments[3]];
            rows = [arguments[4], undefined, arguments[5]];
        } else if (
            (columns === undefined) &&
            (rows === undefined) &&
            (this.columns.data !== undefined) &&
            (this.rows.data !== undefined)
        ) {
            columns = this.columns.data;
            rows = this.rows.data;
        } else {
            columns = DeepClone(columns);
            rows = DeepClone(rows);
        }

        this.textureKey = key;
        this.baseFrameName = baseFrameName;
        this.columns.data = columns;
        this.columns.count = (columns) ? columns.length : 0;
        this.columns.stretch = 0;
        this.columns.minWidth = 0;
        this.columns.scale = 1;
        this.rows.data = rows;
        this.rows.count = (rows) ? rows.length : 0;
        this.rows.stretch = 0;
        this.rows.minHeight = 0;
        this.rows.scale = 1;

        var texture = this.scene.sys.textures.get(key);
        if (!texture) {
            this.clear();
            return this;
        }
        if (!columns || !rows) {
            this.clear();
            return this;
        }

        // Get remainder width/height for unknown width/height
        var baseFrame = texture.get(baseFrameName);
        var remainderTextureWidth = baseFrame.width;
        var unknownColumnWidthCount = 0;
        for (var i = 0, cnt = columns.length; i < cnt; i++) {
            if (columns[i] === undefined) {
                unknownColumnWidthCount++;
            } else if (typeof (columns[i]) === 'number') {
                remainderTextureWidth -= columns[i];
            } else {
                remainderTextureWidth -= columns[i].width;
            }
        }
        var unknownColumnWidth = (unknownColumnWidthCount > 0) ? (remainderTextureWidth / unknownColumnWidthCount) : 0;

        var remainderTextureHeight = baseFrame.height;
        var unknownRowHeightCount = 0;
        for (var i = 0, cnt = rows.length; i < cnt; i++) {
            if (rows[i] === undefined) {
                unknownRowHeightCount++;
            } else if (typeof (rows[i]) === 'number') {
                remainderTextureHeight -= rows[i];
            } else {
                remainderTextureHeight -= rows[i].width;
            }
        }
        var unknownRowHeight = (unknownRowHeightCount) ? (remainderTextureHeight / unknownRowHeightCount) : 0;

        var row, col, rowHeight, colWidth, frameName;
        var offsetX = 0, offsetY = 0;
        for (var j = 0, jcnt = rows.length; j < jcnt; j++) {
            // Unknown height
            if (rows[j] === undefined) {
                rows[j] = unknownRowHeight;
            }

            if (typeof (rows[j]) === 'number') {
                rows[j] = {
                    height: rows[j],
                    stretch: (j % 2),
                };
            }

            row = rows[j];
            rowHeight = row.height;

            this.rows.stretch += (row.stretch | 0);
            this.rows.minHeight += (row.stretch > 0) ? 0 : rowHeight;

            offsetX = 0;
            for (var i = 0, icnt = columns.length; i < icnt; i++) {
                // Unknown width
                if (columns[i] === undefined) {
                    columns[i] = unknownColumnWidth;
                }

                if (typeof (columns[i]) === 'number') {
                    columns[i] = {
                        width: columns[i],
                        stretch: (i % 2),
                    };
                }

                col = columns[i];
                colWidth = col.width;

                if (j === 0) {
                    this.columns.stretch += (col.stretch | 0);
                    this.columns.minWidth += (col.stretch > 0) ? 0 : colWidth;
                }

                if ((colWidth >= 1) && (rowHeight >= 1)) {
                    frameName = this.getFrameNameCallback(i, j, baseFrameName);
                    var frameNameType = typeof (frameName);
                    if ((frameNameType === 'string') || (frameNameType === 'number')) {
                        texture.add(
                            frameName, 0,
                            (offsetX + baseFrame.cutX), (offsetY + baseFrame.cutY),
                            colWidth, rowHeight
                        );
                        // Do nothing if frameName is existed
                    }
                }
                offsetX += colWidth;
            }
            offsetY += rowHeight;
        }

        this.updateTexture();
        return this;
    };

    var UpdateTexture = function () {
        this.clear();

        if (this.textureKey === undefined) {
            return this;
        }
        var texture = this.scene.sys.textures.get(this.textureKey);
        if (!texture) {
            return this;
        }

        var minWidth = this.columns.minWidth * this.maxFixedPartScaleX;  // Fixed-part width
        var minHeight = this.rows.minHeight * this.maxFixedPartScaleY;   // Fixed-part height
        var stretchWidth = this.width - minWidth;
        var stretchHeight = this.height - minHeight;
        var fixedPartScaleX = (stretchWidth >= 0) ? this.maxFixedPartScaleX : (this.width / minWidth);
        var fixedPartScaleY = (stretchHeight >= 0) ? this.maxFixedPartScaleY : (this.height / minHeight);

        if (this.preserveRatio) {
            var minScale = Math.min(fixedPartScaleX, fixedPartScaleY);
            if (fixedPartScaleX > minScale) {
                var compensationWidth = (fixedPartScaleX - minScale) * minWidth;
                if (stretchWidth >= 0) {
                    stretchWidth += compensationWidth;
                } else {
                    stretchWidth = compensationWidth;
                }
                fixedPartScaleX = minScale;
            }
            if (fixedPartScaleY > minScale) {
                var compensationHeight = (fixedPartScaleY - minScale) * minHeight;
                if (stretchHeight >= 0) {
                    stretchHeight += compensationHeight;
                } else {
                    stretchHeight = compensationHeight;
                }
                fixedPartScaleY = minScale;
            }
        }
        this.columns.scale = fixedPartScaleX;
        this.rows.scale = fixedPartScaleY;

        var proportionWidth;
        if (stretchWidth > 0) {
            proportionWidth = (this.columns.stretch > 0) ? (stretchWidth / this.columns.stretch) : 0;
        } else {
            proportionWidth = 0;
        }

        var proportionHeight;
        if (stretchHeight > 0) {
            proportionHeight = (this.rows.stretch > 0) ? (stretchHeight / this.rows.stretch) : 0;
        } else {
            proportionHeight = 0;
        }

        var frameName, col, row, colWidth, rowHeight;
        var offsetX = 0, offsetY = 0;
        var imageType;

        this._beginDraw();
        for (var j = 0, jcnt = this.rows.count; j < jcnt; j++) {
            row = this.rows.data[j];
            rowHeight = (row.stretch === 0) ? (row.height * fixedPartScaleY) : (proportionHeight * row.stretch);

            offsetX = 0;
            for (var i = 0, icnt = this.columns.count; i < icnt; i++) {
                col = this.columns.data[i];
                colWidth = (col.stretch === 0) ? (col.width * fixedPartScaleX) : (proportionWidth * col.stretch);

                frameName = this.getFrameNameCallback(i, j, this.baseFrameName);
                if (texture.has(frameName) && (colWidth > 0) && (rowHeight > 0)) {
                    if ((row.stretch === 0) && (col.stretch === 0)) { // Fixed parts
                        imageType = 0; // Draw image
                    } else { // Stretchable parts
                        if (this.getStretchMode(i, j) === 0) { // Scaled image
                            imageType = 0; // Draw scaled image
                        } else { // Repeat tile-sprite
                            imageType = 1; // Draw tile-sprite
                        }
                    }

                    if (imageType === 0) {
                        this._drawImage(
                            this.textureKey, frameName,
                            offsetX, offsetY,
                            colWidth, rowHeight
                        );
                    } else {
                        this._drawTileSprite(
                            this.textureKey, frameName,
                            offsetX, offsetY,
                            colWidth, rowHeight
                        );
                    }
                }

                offsetX += colWidth;
            }

            offsetY += rowHeight;
        }
        this._endDraw();
    };

    const IsPlainObject$2 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    var SetStretchMode = function(mode) {
        if (IsPlainObject$2(mode)) {
            this.stretchMode.edge = parseMode(GetValue$3(mode, 'edge', 0));
            this.stretchMode.internal = parseMode(GetValue$3(mode, 'internal', 0));
        } else {
            mode = parseMode(mode);
            this.stretchMode.edge = mode;
            this.stretchMode.internal = mode;
        }
        return this;
    };

    var parseMode = function (mode) {
        if (typeof (mode) === 'string') {
            mode = EXTENDMODE[mode];
        }
        return mode;
    };

    const EXTENDMODE = {
        scale: 0,
        repeat: 1,
    };

    var IsEdge = function (colIndex, rowIndex) {
        return (colIndex === 0) || (colIndex === (this.columns.count - 1)) ||
            (rowIndex === 0) || (rowIndex === (this.rows.count - 1));
    };

    var GetStretchMode = function(colIndex, rowIndex) {
        return (IsEdge.call(this, colIndex, rowIndex)) ? this.stretchMode.edge : this.stretchMode.internal;
    };

    var SetPreserveRatio = function (enable) {
        if (enable == undefined) {
            enable = true;
        }

        this.preserveRatio = enable;
        return this;
    };

    var SetMaxFixedPartScale = function (scaleX, scaleY) {
        if (scaleY === undefined) {
            scaleY = scaleX;
        }

        this.maxFixedPartScaleX = scaleX;
        this.maxFixedPartScaleY = scaleY;
        return this;
    };

    var NOOP = function () {
        //  NOOP
    };

    var Methods$1 = {
        _beginDraw: NOOP,
        _drawImage: NOOP,
        _drawTileSprite: NOOP,
        _endDraw: NOOP,

        setGetFrameNameCallback: SetGetFrameNameCallback,
        setBaseTexture: SetBaseTexture,
        updateTexture: UpdateTexture,
        setStretchMode: SetStretchMode,
        getStretchMode: GetStretchMode,
        setPreserveRatio: SetPreserveRatio,
        setMaxFixedPartScale: SetMaxFixedPartScale,
    };

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    var NinePatchBase = function (GOClass, type) {
        class NinePatch extends GOClass {
            constructor(scene, x, y, width, height, key, baseFrame, columns, rows, config) {
                if (IsPlainObject$1(x)) {
                    config = x;
                    x = GetValue$2(config, 'x', 0);
                    y = GetValue$2(config, 'y', 0);
                    width = GetValue$2(config, 'width', 1);
                    height = GetValue$2(config, 'height', 1);
                    key = GetValue$2(config, 'key', undefined);
                    baseFrame = GetValue$2(config, 'baseFrame', undefined);
                    columns = GetValue$2(config, 'columns', undefined);
                    rows = GetValue$2(config, 'rows', undefined);
                } else if (IsPlainObject$1(width)) {
                    config = width;
                    width = GetValue$2(config, 'width', 1);
                    height = GetValue$2(config, 'height', 1);
                    key = GetValue$2(config, 'key', undefined);
                    baseFrame = GetValue$2(config, 'baseFrame', undefined);
                    columns = GetValue$2(config, 'columns', undefined);
                    rows = GetValue$2(config, 'rows', undefined);
                } else if (IsPlainObject$1(key)) {
                    config = key;
                    key = GetValue$2(config, 'key', undefined);
                    baseFrame = GetValue$2(config, 'baseFrame', undefined);
                    columns = GetValue$2(config, 'columns', undefined);
                    rows = GetValue$2(config, 'rows', undefined);
                } else if (IsPlainObject$1(baseFrame)) {
                    config = baseFrame;
                    baseFrame = GetValue$2(config, 'baseFrame', undefined);
                    columns = GetValue$2(config, 'columns', undefined);
                    rows = GetValue$2(config, 'rows', undefined);
                } else if (Array.isArray(baseFrame)) {
                    config = rows;
                    rows = columns;
                    columns = baseFrame;
                    baseFrame = GetValue$2(config, 'baseFrame', undefined);
                } else if (IsPlainObject$1(columns)) {
                    config = columns;
                    columns = GetValue$2(config, 'columns', undefined);
                    rows = GetValue$2(config, 'rows', undefined);
                }

                if (baseFrame === undefined) {
                    baseFrame = GetValue$2(config, 'frame', undefined);
                }

                if (columns === undefined) {
                    var leftWidth = GetValue$2(config, 'leftWidth', undefined);
                    var rightWidth = GetValue$2(config, 'rightWidth', undefined);
                    if ((leftWidth !== undefined) && (rightWidth !== undefined)) {
                        columns = [leftWidth, undefined, rightWidth];
                    }
                }

                if (rows === undefined) {
                    var topHeight = GetValue$2(config, 'topHeight', undefined);
                    var bottomHeight = GetValue$2(config, 'bottomHeight', undefined);
                    if ((topHeight !== undefined) && (bottomHeight !== undefined)) {
                        rows = [topHeight, undefined, bottomHeight];
                    }
                }

                super(scene);
                this.type = type;
                this
                    .setPosition(x, y)
                    .setSize(width, height)
                    .setOrigin(0.5, 0.5);

                this.columns = {};
                this.rows = {};
                this.stretchMode = {};
                this._tileSprite = undefined; // Reserved for drawing image
                this._image = undefined; // Reserved for drawing image

                this.setGetFrameNameCallback(GetValue$2(config, 'getFrameNameCallback', undefined));
                this.setStretchMode(GetValue$2(config, 'stretchMode', 0));
                this.setPreserveRatio(GetValue$2(config, 'preserveRatio', true));

                var maxFixedPartScale = GetValue$2(config, 'maxFixedPartScale', 1);
                var maxFixedPartScaleX = GetValue$2(config, 'maxFixedPartScaleX', maxFixedPartScale);
                var maxFixedPartScaleY = GetValue$2(config, 'maxFixedPartScaleY', undefined);
                this.setMaxFixedPartScale(maxFixedPartScaleX, maxFixedPartScaleY);

                this.setBaseTexture(key, baseFrame, columns, rows);
            }

            get minWidth() {
                return this.columns.minWidth;
            }

            get minHeight() {
                return this.rows.minHeight;
            }

            get fixedPartScaleX() {
                return this.columns.scale;
            }

            get fixedPartScaleY() {
                return this.rows.scale;
            }

            resize(width, height) {
                if ((this.width === width) && (this.height === height)) {
                    return this;
                }

                if (super.resize) {
                    super.resize(width, height);
                } else {
                    // Use setSize method for alternative 
                    super.setSize(width, height);
                }
                this.updateTexture();

                return this;
            }

            get leftWidth() {
                return this.columns.data[0];
            }

            get rightWidth() {
                return this.columns.data[this.columns.count - 1];
            }

            get topHeight() {
                return this.rows.data[0];
            }

            get bottomHeight() {
                return this.rows.data[this.rows.count - 1];
            }

        }

        Object.assign(
            NinePatch.prototype,
            Methods$1
        );

        return NinePatch;
    };

    const ImageTypeName = 'image';

    var GetValue$1 = function (source, key, defaultValue) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        }

        if (typeof (key) === 'string') {
            if (source.hasOwnProperty(key)) {
                return source[key];
            }
            if (key.indexOf('.') !== -1) {
                key = key.split('.');
            } else {
                return defaultValue;
            }
        }

        var keys = key;
        var parent = source;
        var value = defaultValue;

        //  Use for loop here so we can break early
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (parent.hasOwnProperty(key)) {
                //  Yes it has a key property, let's carry on down
                value = parent[key];

                parent = value;
            }
            else {
                //  Can't go any further, so reset to default
                value = defaultValue;
                break;
            }
        }

        return value;
    };

    var Clear = function (obj) {
        if ((typeof (obj) !== 'object') || (obj === null)) {
            return obj;
        }

        if (Array.isArray(obj)) {
            obj.length = 0;
        } else {
            for (var key in obj) {
                delete obj[key];
            }
        }

        return obj;
    };

    var DataMethods = {
        enableData() {
            if (this.data === undefined) {
                this.data = {};
            }
            return this;
        },

        setData(key, value) {
            this.enableData();
            if (arguments.length === 1) {
                var data = key;
                for (key in data) {
                    this.data[key] = data[key];
                }
            } else {
                this.data[key] = value;
            }
            return this;
        },

        getData(key, defaultValue) {
            this.enableData();
            return (key === undefined) ? this.data : GetValue$1(this.data, key, defaultValue);
        },

        incData(key, inc, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) + inc);
            return this;
        },

        mulData(key, mul, defaultValue) {
            if (defaultValue === undefined) {
                defaultValue = 0;
            }
            this.enableData();
            this.setData(key, this.getData(key, defaultValue) * mul);
            return this;
        },

        clearData() {
            if (this.data) {
                Clear(this.data);
            }
            return this;
        },
    };

    class Base {
        constructor(parent, type) {
            this.type = type;

            this.data = undefined;

            this
                .setParent(parent)
                .reset()
                .setActive();

        }

        destroy() {
            if (this.parent) {
                this.parent.removeChild(this);
                // Remove this bob from blitter, and free it (bob.onFree())
                // Will set this.parent to undefined
            }
        }

        setParent(parent) {
            this.parent = parent;
            return this;
        }

        // get scene() {
        //     if (this.parent) {
        //         return this.parent.scene;
        //     } else {
        //         return null;
        //     }
        // }

        setDisplayListDirty(displayListDirty) {
            if (displayListDirty && this.parent) {
                this.parent.displayListDirty = true;
            }
            return this;
        }

        get active() {
            return this._active;
        }

        set active(value) {
            this.setDisplayListDirty(this._active != value);
            this._active = value;
        }

        setActive(active) {
            if (active === undefined) {
                active = true;
            }
            this.active = active;
            return this;
        }

        modifyPorperties(o) {
            return this;
        }

        // Override
        reset() {
            this.clearData();
        }

        // Override
        onFree() {
            this.reset().setActive(false).setParent();
        }
    }

    Object.assign(
        Base.prototype,
        DataMethods
    );

    const DegToRad = Phaser.Math.DegToRad;
    const RadToDeg = Phaser.Math.RadToDeg;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class RenderBase extends Base {

        get visible() {
            return this._visible;
        }

        set visible(value) {
            this.setDisplayListDirty(this._visible != value);
            this._visible = value;
        }

        setVisible(visible) {
            if (visible === undefined) {
                visible = true;
            }

            this.visible = visible;
            return this;
        }

        get alpha() {
            return this._alpha;
        }

        set alpha(value) {
            this.setDisplayListDirty(!!this._alpha !== !!value);
            this._alpha = value;
        }

        setAlpha(alpha) {
            this.alpha = alpha;
            return this;
        }

        setX(x) {
            this.x = x;
            return this;
        }

        setY(y) {
            this.y = y;
            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setRotation(rotation) {
            this.rotation = rotation;
            return this;
        }

        get angle() {
            return RadToDeg(this.rotation);
        }

        set angle(value) {
            this.rotation = DegToRad(value);
        }

        setAngle(angle) {
            this.angle = angle;
            return this;
        }

        setScaleX(scaleX) {
            this.scaleX = scaleX;
            return this;
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this._width = value;
        }

        setWidth(width, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }
            this.width = width;

            if (keepAspectRatio) {
                this.scaleY = this.scaleX;
            }
            return this;
        }

        setScaleY(scaleY) {
            this.scaleY = scaleY;
            return this;
        }

        setScale(scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            return this;
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this._height = value;
        }

        setHeight(height, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }
            this.height = height;

            if (keepAspectRatio) {
                this.scaleX = this.scaleY;
            }
            return this;
        }

        setScale(scaleX, scaleY) {
            if (scaleY === undefined) {
                scaleY = scaleX;
            }

            this.scaleX = scaleX;
            this.scaleY = scaleY;
            return this;
        }

        get displayWidth() {
            return this._width * this.scaleX;
        }

        set displayWidth(value) {
            this.scaleX = value / this._width;
        }

        setDisplayWidth(width, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }

            this.displayWidth = width;

            if (keepAspectRatio) {
                this.scaleY = this.scaleX;
            }
            return this;
        }

        get displayHeight() {
            return this._height * this.scaleY;
        }

        set displayHeight(value) {
            this.scaleY = value / this._height;
        }

        setDisplayHeight(height, keepAspectRatio) {
            if (keepAspectRatio === undefined) {
                keepAspectRatio = false;
            }

            this.displayHeight = height;

            if (keepAspectRatio) {
                this.scaleX = this.scaleY;
            }
            return this;
        }

        setOriginX(originX) {
            this.originX = originX;
            this._displayOriginX = this.width * originX;
            return this;
        }

        setOriginY(originY) {
            this.originY = originY;
            this._displayOriginY = this.height * originY;
            return this;
        }

        setOrigin(originX, originY) {
            if (originY === undefined) {
                originY = originX;
            }
            this.setOriginX(originX).setOriginY(originY);
            return this;
        }

        get depth() {
            return this._depth;
        }

        set depth(value) {
            this.setDisplayListDirty(this._depth != value);
            this._depth = value;
        }

        setDepth(depth) {
            if (depth === undefined) {
                depth = 0;
            }

            this.depth = depth;
            return this;
        }

        modifyPorperties(o) {
            if (!o) {
                return this;
            }

            if (o.hasOwnProperty('x')) {
                this.setX(o.x);
            }
            if (o.hasOwnProperty('y')) {
                this.setY(o.y);
            }

            if (o.hasOwnProperty('rotation')) {
                this.setRotation(o.rotation);
            } else if (o.hasOwnProperty('angle')) {
                this.setAngle(o.angle);
            }

            if (o.hasOwnProperty('alpha')) {
                this.setAlpha(o.alpha);
            }

            // ScaleX, ScaleY
            var width = GetValue(o, 'width', undefined);
            var height = GetValue(o, 'height', undefined);
            var scale = GetValue(o, 'scale', undefined);
            var scaleX = GetValue(o, 'scaleX', scale);
            var scaleY = GetValue(o, 'scaleY', scale);

            if (width !== undefined) {
                if ((height === undefined) && (scaleY === undefined)) {
                    this.setWidth(width, true);
                } else {
                    this.setWidth(width);
                }
            } else if (scaleX !== undefined) {
                this.setScaleX(scaleX);
            } else if (o.hasOwnProperty('displayWidth')) {
                this.setDisplayWidth(o.displayWidth);
            }

            if (height !== undefined) {
                if ((width === undefined) && (scaleX === undefined)) {
                    this.setHeight(height, true);
                } else {
                    this.setHeight(height);
                }
            } else if (scaleY !== undefined) {
                this.setScaleY(scaleY);
            } else if (o.hasOwnProperty('displayHeight')) {
                this.setDisplayHeight(o.displayHeight);
            }

            var origin = GetValue(o, 'origin', undefined);
            if (origin !== undefined) {
                this.setOrigin(origin);
            } else {
                if (o.hasOwnProperty('originX')) {
                    this.setOriginX(o.originX);
                }
                if (o.hasOwnProperty('originY')) {
                    this.setOriginY(o.originY);
                }
            }

            if (o.hasOwnProperty('depth')) {
                this.setDepth(o.depth);
            }

            return this;
        }

        reset() {
            super.reset();

            this
                .setVisible()
                .setAlpha(1)
                .setPosition(0, 0)
                .setRotation(0)
                .setScale(1, 1)
                .setOrigin(0)
                .setDepth(0);

            return this;
        }

        // Override
        webglRender(pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels) {
        }
        // Override
        canvasRender(ctx, dx, dy, roundPixels) {
        }
    }

    const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;
    const GetTint = Phaser.Renderer.WebGL.Utils.getTintAppendFloatAlpha;

    var FrameMatrix = new TransformMatrix();

    var WebglRender = function (pipeline, calcMatrix, alpha, dx, dy, texture, textureUnit, roundPixels) {
        var frame = this.frame;
        if (!frame) {
            return;
        }

        var width = this._width,
            height = this._height;
        var displayOriginX = width * this.originX,
            displayOriginY = height * this.originY;
        var x = this.x - dx,
            y = this.y - dy;

        var u0, v0, u1, v1;
        var frameX, frameY;
        var frameWidth, frameHeight;
        if (this.isCropped) {
            var crop = this._crop;

            if (crop.flipX !== this.flipX || crop.flipY !== this.flipY) {
                frame.updateCropUVs(crop, this.flipX, this.flipY);
            }

            u0 = crop.u0;
            v0 = crop.v0;
            u1 = crop.u1;
            v1 = crop.v1;

            frameWidth = crop.width;
            frameHeight = crop.height;

            frameX = crop.x;
            frameY = crop.y;

        } else {
            u0 = this.frame.u0;
            v0 = this.frame.v0;
            u1 = this.frame.u1;
            v1 = this.frame.v1;

            frameWidth = width;
            frameHeight = height;

            frameX = 0;
            frameY = 0;
        }

        var flipX = 1;
        var flipY = 1;

        if (this.flipX) {
            x += width - (displayOriginX * 2);
            flipX = -1;
        }
        if (this.flipY) {
            y += height - (displayOriginY * 2);
            flipY = -1;
        }

        FrameMatrix.applyITRS(x, y, this.rotation, this.scaleX * flipX, this.scaleY * flipY);
        calcMatrix.multiply(FrameMatrix, FrameMatrix);

        var tx = -displayOriginX + frameX;
        var ty = -displayOriginY + frameY;
        var tw = tx + frameWidth;
        var th = ty + frameHeight;

        var quad = FrameMatrix.setQuad(tx, ty, tw, th, roundPixels);

        var tint = GetTint(this.tint, this.alpha * alpha);

        pipeline.batchQuad(
            this.parent,
            quad[0], quad[1], quad[2], quad[3], quad[4], quad[5], quad[6], quad[7],
            u0, v0,
            u1, v1,
            tint, tint, tint, tint,
            this.tintFill,
            texture,
            textureUnit
        );
    };

    var CanvasRender = function (ctx, dx, dy, roundPixels) {
        var frame = this.frame;
        if (!frame) {
            return;
        }

        ctx.save();

        var width = this._width,
            height = this._height;
        var displayOriginX = width * this.originX,
            displayOriginY = height * this.originY;
        var x = this.x - displayOriginX,
            y = this.y - displayOriginY;

        var frameX, frameY;
        var frameWidth, frameHeight;
        if (this.isCropped) {
            var crop = this._crop;

            if (crop.flipX !== this.flipX || crop.flipY !== this.flipY) {
                frame.updateCropUVs(crop, this.flipX, this.flipY);
            }

            frameWidth = crop.cw;
            frameHeight = crop.ch;

            frameX = crop.cx;
            frameY = crop.cy;
        } else {
            frameWidth = frame.cutWidth;
            frameHeight = frame.cutHeight;

            frameX = frame.cutX;
            frameY = frame.cutY;
        }

        var flipX = 1;
        var flipY = 1;

        if (this.flipX) {
            x += width;
            flipX = -1;
        }
        if (this.flipY) {
            y += height;
            flipY = -1;
        }

        var res = frame.source.resolution;
        var fw = frameWidth / res;
        var fh = frameHeight / res;

        if (roundPixels) {
            x = Math.floor(x + 0.5);
            y = Math.floor(y + 0.5);

            fw += 0.5;
            fh += 0.5;
        }

        ctx.translate(x, y);

        ctx.rotate(this.rotation);

        ctx.scale(this.scaleX * flipX, this.scaleY * flipY);

        ctx.drawImage(
            frame.source.image,
            frameX, frameY, frameWidth, frameHeight,
            0, 0, fw, fh,
        );

        ctx.restore();

    };

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

    class ImageData extends RenderBase {
        constructor(parent, frame) {
            super(parent, ImageTypeName);

            this._crop = ResetCropObject();
            this.setFrame(frame);
        }

        get width() {
            return this._width;
        }

        set width(value) {
        }

        get height() {
            return this._height;
        }

        set height(value) {
        }

        setFrame(frame) {
            if (arguments.length > 0 && !IsPlainObject(frame)) {
                frame = this.parent.texture.get(frame);
            }
            this.frame = frame;

            if (frame) {
                this._width = frame.realWidth;
                this._height = frame.realHeight;
            } else {
                this._width = 0;
                this._height = 0;
            }

            return this;
        }

        setFlipX(flipX) {
            if (flipX === undefined) {
                flipX = true;
            }
            this.flipX = flipX;
            return this;
        }

        setFlipY(flipY) {
            if (flipY === undefined) {
                flipY = true;
            }
            this.flipY = flipY;
            return this;
        }

        resetFlip() {
            this.flipX = false;
            this.flipY = false;
            return this;
        }

        get tint() {
            if (this._tint === undefined) {
                return this.parent.tint;
            } else {
                return this._tint;
            }
        }

        set tint(value) {
            this._tint = value;
        }


        setTint(value) {
            this.tint = value;
            this.tintFill = false;
            return this;
        }

        setTintFill(value) {
            this.tint = value;
            this.tintFill = true;
            return this;
        }

        clearTint() {
            this.setTint(0xffffff);
            return this;
        }

        resetTint() {
            this.tint = undefined;
            this.tintFill = undefined;
            return this;
        }

        get tintFill() {
            if (this._tintFill === undefined) {
                return this.parent.tintFill;
            } else {
                return this._tintFill;
            }
        }

        set tintFill(value) {
            this._tintFill = value;
        }

        setCrop(x, y, width, height) {
            if (x === undefined) {
                this.isCropped = false;
                return this;
            }

            if (!this.frame) {
                return this;
            }

            if ((x === 0) && (y === 0) && (width === this._width) && (height === this._height)) {
                this.isCropped = false;
                return this;
            }

            this.frame.setCropUVs(this._crop, x, y, width, height, this.flipX, this.flipY);
            this.isCropped = true;

            return this;
        }

        reset() {
            super.reset();

            this
                .resetFlip()
                .resetTint()
                .setFrame()
                .setCrop();

            return this;
        }

        modifyPorperties(o) {
            if (!o) {
                return this;
            }

            // Size of Image is equal to frame size,
            // Move width, height properties to displayWidth,displayHeight
            if (o.hasOwnProperty('width')) {
                o.displayWidth = o.width;
                delete o.width;
            }
            if (o.hasOwnProperty('height')) {
                o.displayHeight = o.height;
                delete o.height;
            }

            if (o.hasOwnProperty('frame')) {
                this.setFrame(o.frame);
            }

            super.modifyPorperties(o);

            if (o.hasOwnProperty('flipX')) {
                this.setFlipX(o.flipX);
            }
            if (o.hasOwnProperty('flipY')) {
                this.setFlipY(o.flipY);
            }

            if (o.hasOwnProperty('tint')) {
                this.setTint(o.tint);
            }

            if (o.hasOwnProperty('tintFill')) {
                this.setTintFill(o.tintFill);
            }

            return this;
        }

    }

    var ResetCropObject = function (out) {
        if (out === undefined) {
            out = {};
        }
        out.u0 = 0; out.v0 = 0; out.u1 = 0; out.v1 = 0;
        out.x = 0; out.y = 0; out.width = 0; out.height = 0;
        out.flipX = false; out.flipY = false;
        out.cx = 0; out.cy = 0; out.cw = 0, out.ch = 0;
        return out;
    };

    var methods = {
        webglRender: WebglRender,
        canvasRender: CanvasRender,
    };

    Object.assign(
        ImageData.prototype,
        methods
    );

    var AddImage = function (blitter, config) {
        if (typeof (config) === 'string') {
            config = {
                frame: config
            };
        }

        var bob = (blitter.poolManager) ? blitter.poolManager.allocate(ImageTypeName) : null;
        if (bob === null) {
            bob = new ImageData(blitter);
        } else {
            bob.setParent(blitter).setActive();
        }
        bob.modifyPorperties(config);

        blitter.addChild(bob);

        return bob;
    };

    var DrawImage = function (key, frame, x, y, width, height) {
        AddImage(this, {
            frame: frame,
            x: x,
            y: y,
            width: width,
            height: height
        });
    };

    var DrawTileSprite = function (key, frame, x, y, width, height) {
        var frameObj = this.texture.get(frame);

        var frameWidth = frameObj.width,
            frameHeight = frameObj.height;

        var lastFrameWidth = width % frameWidth,
            lastFrameHeight = height % frameHeight;

        if (lastFrameWidth === 0) {
            lastFrameWidth = frameWidth;
        }
        if (lastFrameHeight === 0) {
            lastFrameHeight = frameHeight;
        }

        var colCount = Math.ceil(width / frameWidth),
            rowCount = Math.ceil(height / frameHeight);
        var lastColCount = colCount - 1,
            lastRowCount = rowCount - 1;

        for (var colIndex = 0; colIndex < colCount; colIndex++) {
            for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                let bob = AddImage(this, {
                    frame: frame,
                    x: x + (colIndex * frameWidth),
                    y: y + (rowIndex * frameHeight),
                });

                var cropWidth = (colIndex === lastColCount) ? lastFrameWidth : frameWidth;
                var cropHeight = (rowIndex === lastRowCount) ? lastFrameHeight : frameHeight;
                if ((cropWidth !== frameWidth) || (cropHeight !== frameHeight)) {
                    bob.setCrop(0, 0, cropWidth, cropHeight);
                }
            }
        }

    };

    var Methods = {
        _drawImage: DrawImage,
        _drawTileSprite: DrawTileSprite,
    };

    class NinePatch extends NinePatchBase(Blitter, 'rexNinePatch2') {
        setBaseTexture(key, baseFrameName, columns, rows) {
            this.setTexture(key, baseFrameName);
            super.setBaseTexture(key, baseFrameName, columns, rows);
            return this;
        }
    }

    Object.assign(
        NinePatch.prototype,
        Methods
    );

    function Factory (x, y, width, height, key, baseFrame, columns, rows, config) {
        var gameObject = new NinePatch(this.scene, x, y, width, height, key, baseFrame, columns, rows, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new NinePatch(this.scene, config);
        BuildGameObject(this.scene, gameObject, config);
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

    class NinePatchPlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexNinePatch2', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.NinePatch2', NinePatch);

    return NinePatchPlugin;

}));
