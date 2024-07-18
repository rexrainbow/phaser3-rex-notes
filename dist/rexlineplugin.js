(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexlineplugin = factory());
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

    const DistanceBetween = Phaser.Math.Distance.Between;
    const AngleBetween = Phaser.Math.Angle.Between;

    var UpdateTexture = function () {
        if (!this.redraw) {
            return this;
        }
        this.redraw = false;

        // Note: Don't use clear method here
        // this.clear();  // this.setSize(w,h) will clear content

        var lineStartFrame = this.lineStartFrame;
        var lineEndFrame = this.lineEndFrame;
        var lineBodyFrame = this.lineBodyFrame;
        var lineStartOffset = 0;
        var width = DistanceBetween(this.x0, this.y0, this.x1, this.y1),
            height = 0,
            rotation = AngleBetween(this.x0, this.y0, this.x1, this.y1);
        if (lineStartFrame) {
            lineStartOffset = this.lineStartOrigin * lineStartFrame.cutWidth;
            width += lineStartOffset;
            height = lineStartFrame.cutHeight;
        }
        if (lineEndFrame) {
            width += ((1 - this.lineEndOrigin) * lineEndFrame.cutWidth);
            height = Math.max(height, lineEndFrame.cutHeight);
        }
        if (lineBodyFrame) {
            var lineBodyHeight = (this.lineBodyWidth !== undefined) ? this.lineBodyWidth : lineBodyFrame.cutHeight;
            height = Math.max(height, lineBodyHeight);
        }

        width = Math.floor(width);
        height = Math.floor(height);

        // no line
        if ((width <= 0) || (height <= 0)) {
            this
                .setPosition(this.x0, this.y0)
                .setSize(1, 1)
                .setRotation(rotation);
            return this;
        }

        if ((this.width === width) && (this.height === height)) {
            this.setSize(width + 1, height + 1); // Force size changing, to clear content
        }

        this
            .setSize(width, height)
            .setPosition(this.x0, this.y0)
            .setRotation(rotation)
            .setOrigin(0, 0); // Set origin to (0,0) before pasting textures

        var offsetX, offsetY;
        var remainderWidth = this.width;

        // Draw line start
        if (lineStartFrame) {
            offsetX = 0;
            offsetY = (this.height - lineStartFrame.cutHeight) / 2;
            this.drawFrame(this.lineStartTexture, this.lineStartFrameName, offsetX, offsetY);
            remainderWidth -= lineStartFrame.cutWidth;
        }
        // Draw line end
        if (lineEndFrame) {
            offsetX = this.width - lineEndFrame.cutWidth;
            offsetY = (this.height - lineEndFrame.cutHeight) / 2;
            this.drawFrame(this.lineEndTexture, this.lineEndFrameName, offsetX, offsetY);
            remainderWidth -= lineEndFrame.cutWidth;
        }

        // Draw line body
        if (lineBodyFrame && (remainderWidth > 0) && (lineBodyHeight > 0)) {
            offsetX = (lineStartFrame) ? lineStartFrame.cutWidth : 0;
            offsetY = (this.height - lineBodyHeight) / 2;

            if (this.lineBodyExtendMode === 0) {
                DrawImage.call(this,
                    this.lineBodyTexture, this.lineBodyFrameName,
                    offsetX, offsetY,
                    remainderWidth, lineBodyHeight
                );
            } else {
                DrawTileSprite.call(this,
                    this.lineBodyTexture, this.lineBodyFrameName,
                    offsetX, offsetY,
                    remainderWidth, lineBodyHeight
                );
            }
        }

        var originX = 1 - ((width - lineStartOffset) / width);
        this.setOrigin(originX, 0.5);
    };

    const RenderTexture = Phaser.GameObjects.RenderTexture;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class Line extends RenderTexture {
        constructor(scene, config) {
            super(scene);
            this.redraw = false;
            this._tileSprite = undefined; // Reserved for drawing image
            this._image = undefined; // Reserved for drawing image

            var lineStart = GetValue(config, 'start', undefined);
            if (typeof (lineStart) === 'string') {
                this.setLineStartPosition(0, 0);
                this.setLineStartTexture(lineStart, undefined);
                this.setLineStartOrigin(undefined);
            } else {
                this.setLineStartPosition(GetValue(lineStart, 'x', 0), GetValue(lineStart, 'y', 0));
                this.setLineStartTexture(GetValue(lineStart, 'key', undefined), GetValue(lineStart, 'frame', undefined));
                this.setLineStartOrigin(GetValue(lineStart, 'origin', undefined));
            }

            var lineEnd = GetValue(config, 'end', undefined);
            if (typeof (lineEnd) === 'string') {
                this.setLineEndPosition(0, 0);
                this.setLineEndTexture(lineEnd, undefined);
                this.setLineEndOrigin(undefined);
            } else {
                this.setLineEndPosition(GetValue(lineEnd, 'x', 0), GetValue(lineEnd, 'y', 0));
                this.setLineEndTexture(GetValue(lineEnd, 'key', undefined), GetValue(lineEnd, 'frame', undefined));
                this.setLineEndOrigin(GetValue(lineEnd, 'origin', undefined));
            }

            var lineBody = GetValue(config, 'body', undefined);
            if (typeof (lineBody) === 'string') {
                this.setLineBodyTexture(lineBody, undefined);
                this.setLineBodyExtendMode(0);
                this.setLineBodyWidth(undefined);
            } else {
                this.setLineBodyTexture(GetValue(lineBody, 'key', undefined), GetValue(lineBody, 'frame', undefined));
                this.setLineBodyExtendMode(GetValue(lineBody, 'extendMode', 1));
                this.setLineBodyWidth(GetValue(lineBody, 'width', undefined));
            }
        }

        get x0() {
            return this._x0;
        }

        set x0(value) {
            this.redraw |= (this._x0 !== value);
            this._x0 = value;
        }

        get y0() {
            return this._y0;
        }

        set y0(value) {
            this.redraw |= (this._y0 !== value);
            this._y0 = value;
        }

        get x1() {
            return this._x1;
        }

        set x1(value) {
            this.redraw |= (this._x1 !== value);
            this._x1 = value;
        }

        get y1() {
            return this._y1;
        }

        set y1(value) {
            this.redraw |= (this._y1 !== value);
            this._y1 = value;
        }

        setLineStartPosition(x, y) {
            this.x0 = x;
            this.y0 = y;
            return this;
        }

        setLineEndPosition(x, y) {
            this.x1 = x;
            this.y1 = y;
            return this;
        }

        setLineStartTexture(key, frame) {
            this.lineStartTexture = key;
            this.lineStartFrameName = frame;
            this.redraw = true;
            return this;
        }

        setLineStartOrigin(origin) {
            if (origin === undefined) {
                origin = 0;
            }
            this.lineStartOrigin = origin;
            this.redraw = true;
            return this;
        }

        get lineStartFrame() {
            return this.scene.sys.textures.getFrame(this.lineStartTexture, this.lineStartFrameName);
        }

        setLineEndTexture(key, frame) {
            this.lineEndTexture = key;
            this.lineEndFrameName = frame;
            this.redraw = true;
            return this;
        }

        setLineEndOrigin(origin) {
            if (origin === undefined) {
                origin = 1;
            }
            this.lineEndOrigin = origin;
            this.redraw = true;
            return this;
        }

        get lineEndFrame() {
            return this.scene.sys.textures.getFrame(this.lineEndTexture, this.lineEndFrameName);
        }

        setLineBodyTexture(key, frame) {
            this.lineBodyTexture = key;
            this.lineBodyFrameName = frame;
            this.redraw = true;
            return this;
        }

        setLineBodyWidth(width) {
            this.lineBodyWidth = width;
            this.redraw = true;
            return this;
        }

        setLineBodyExtendMode(mode) {
            if (typeof (mode) === 'string') {
                mode = EXTENDMODE[mode];
            }
            this.lineBodyExtendMode = mode;
            return this;
        }

        get lineBodyFrame() {
            return this.scene.sys.textures.getFrame(this.lineBodyTexture, this.lineBodyFrameName);
        }

        renderWebGL(renderer, src,  camera, parentMatrix) {
            this.updateTexture();
            super.renderWebGL(renderer, src,  camera, parentMatrix);
        }

        renderCanvas(renderer, src,  camera, parentMatrix) {
            this.updateTexture();
            super.renderCanvas(renderer, src,  camera, parentMatrix);
        }
    }

    const EXTENDMODE = {
        scale: 0,
        repeat: 1,
    };

    var methods = {
        updateTexture: UpdateTexture,
    };
    Object.assign(
        Line.prototype,
        methods
    );

    function Factory (config) {
        var gameObject = new Line(this.scene, config);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var gameObject = new Line(this.scene, config);
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

    class LinePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexLine', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.Line', Line);

    return LinePlugin;

}));
