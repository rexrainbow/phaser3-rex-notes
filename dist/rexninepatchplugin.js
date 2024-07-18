(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexninepatchplugin = factory());
})(this, (function () { 'use strict';

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

    const IsPlainObject$1 = Phaser.Utils.Objects.IsPlainObject;
    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    var SetStretchMode = function(mode) {
        if (IsPlainObject$1(mode)) {
            this.stretchMode.edge = parseMode(GetValue$1(mode, 'edge', 0));
            this.stretchMode.internal = parseMode(GetValue$1(mode, 'internal', 0));
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

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    var NinePatchBase = function (GOClass, type) {
        class NinePatch extends GOClass {
            constructor(scene, x, y, width, height, key, baseFrame, columns, rows, config) {
                if (IsPlainObject(x)) {
                    config = x;
                    x = GetValue(config, 'x', 0);
                    y = GetValue(config, 'y', 0);
                    width = GetValue(config, 'width', 1);
                    height = GetValue(config, 'height', 1);
                    key = GetValue(config, 'key', undefined);
                    baseFrame = GetValue(config, 'baseFrame', undefined);
                    columns = GetValue(config, 'columns', undefined);
                    rows = GetValue(config, 'rows', undefined);
                } else if (IsPlainObject(width)) {
                    config = width;
                    width = GetValue(config, 'width', 1);
                    height = GetValue(config, 'height', 1);
                    key = GetValue(config, 'key', undefined);
                    baseFrame = GetValue(config, 'baseFrame', undefined);
                    columns = GetValue(config, 'columns', undefined);
                    rows = GetValue(config, 'rows', undefined);
                } else if (IsPlainObject(key)) {
                    config = key;
                    key = GetValue(config, 'key', undefined);
                    baseFrame = GetValue(config, 'baseFrame', undefined);
                    columns = GetValue(config, 'columns', undefined);
                    rows = GetValue(config, 'rows', undefined);
                } else if (IsPlainObject(baseFrame)) {
                    config = baseFrame;
                    baseFrame = GetValue(config, 'baseFrame', undefined);
                    columns = GetValue(config, 'columns', undefined);
                    rows = GetValue(config, 'rows', undefined);
                } else if (Array.isArray(baseFrame)) {
                    config = rows;
                    rows = columns;
                    columns = baseFrame;
                    baseFrame = GetValue(config, 'baseFrame', undefined);
                } else if (IsPlainObject(columns)) {
                    config = columns;
                    columns = GetValue(config, 'columns', undefined);
                    rows = GetValue(config, 'rows', undefined);
                }

                if (baseFrame === undefined) {
                    baseFrame = GetValue(config, 'frame', undefined);
                }

                if (columns === undefined) {
                    var leftWidth = GetValue(config, 'leftWidth', undefined);
                    var rightWidth = GetValue(config, 'rightWidth', undefined);
                    if ((leftWidth !== undefined) && (rightWidth !== undefined)) {
                        columns = [leftWidth, undefined, rightWidth];
                    }
                }

                if (rows === undefined) {
                    var topHeight = GetValue(config, 'topHeight', undefined);
                    var bottomHeight = GetValue(config, 'bottomHeight', undefined);
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

                this.setGetFrameNameCallback(GetValue(config, 'getFrameNameCallback', undefined));
                this.setStretchMode(GetValue(config, 'stretchMode', 0));
                this.setPreserveRatio(GetValue(config, 'preserveRatio', true));

                var maxFixedPartScale = GetValue(config, 'maxFixedPartScale', 1);
                var maxFixedPartScaleX = GetValue(config, 'maxFixedPartScaleX', maxFixedPartScale);
                var maxFixedPartScaleY = GetValue(config, 'maxFixedPartScaleY', undefined);
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

    const GameObjectClasses = Phaser.GameObjects;

    var GameObjects = undefined;

    var GetStampGameObject = function (gameObject, className) {
        if (!GameObjects) {
            GameObjects = {};

            GetGame(gameObject).events.once('destroy', function () {
                for (var name in GameObjects) {
                    GameObjects[name].destroy();
                }
                GameObjects = undefined;
            });
        }

        if (!GameObjects.hasOwnProperty(className)) {
            var scene = GetGame(gameObject).scene.systemScene;
            var gameObject = new GameObjectClasses[className](scene);
            gameObject.setOrigin(0);

            GameObjects[className] = gameObject;
        }

        return GameObjects[className];
    };

    var DrawImage = function (key, frame, x, y, width, height) {
        var gameObject = GetStampGameObject(this, 'Image')
            .setTexture(key, frame)
            .setDisplaySize(width, height);

        this.draw(gameObject, x, y);
    };

    var DrawTileSprite = function (key, frame, x, y, width, height) {
        var gameObject = GetStampGameObject(this, 'TileSprite')
            .setTexture(key, frame)
            .setSize(width, height);

        this.draw(gameObject, x, y);
    };

    const RenderTexture = Phaser.GameObjects.RenderTexture;

    class NinePatch extends NinePatchBase(RenderTexture, 'rexNinePatch') {
    }

    var Methods = {
        _drawImage: DrawImage,
        _drawTileSprite: DrawTileSprite,
    };
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
            pluginManager.registerGameObject('rexNinePatch', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.NinePatch', NinePatch);

    return NinePatchPlugin;

}));
