(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexrepeatimageplugin = factory());
})(this, (function () { 'use strict';

    // copy from Phaser.GameObjects.Text
    var WebGLRenderer = function (renderer, src, drawingContext, parentMatrix) {
        if (src.dirty) {
            src.updateTexture();
            src.dirty = false;
        }

        if ((src.width === 0) || (src.height === 0)) {
            return;
        }

        drawingContext.camera.addToRenderList(src);

        var customRenderNodes = src.customRenderNodes;
        var defaultRenderNodes = src.defaultRenderNodes;

        (customRenderNodes.Submitter || defaultRenderNodes.Submitter).run(
            drawingContext,
            src,
            parentMatrix,
            0,
            customRenderNodes.Texturer || defaultRenderNodes.Texturer,
            customRenderNodes.Transformer || defaultRenderNodes.Transformer
        );
    };

    // copy from Phaser.GameObjects.Text

    var CanvasRenderer = function (renderer, src, camera, parentMatrix) {
        if (src.dirty) {
            src.updateTexture();
            src.dirty = false;
        }

        if ((src.width === 0) || (src.height === 0)) {
            return;
        }

        camera.addToRenderList(src);

        renderer.batchSprite(src, src.frame, camera, parentMatrix);
    };

    var Render = {
        renderWebGL: WebGLRenderer,
        renderCanvas: CanvasRenderer

    };

    const Color = Phaser.Display.Color;

    var CanvasMethods = {
        clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.dirty = true;
            return this;
        },

        fill(color) {
            this.context.fillStyle = color;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.dirty = true;
            return this;
        },

        drawFrame(key, frame, dx, dy, dWidth, dHeight, sxOffset, syOffset, sWidth, sHeight) {

            var textureFrame = this.scene.sys.textures.getFrame(key, frame);
            if (!textureFrame) {
                return this;
            }

            var frameWidth = textureFrame.cutWidth,
                frameHeight = textureFrame.cutHeight;

            if (dx === undefined) { dx = 0; }
            if (dy === undefined) { dy = 0; }
            if (dWidth === undefined) { dWidth = frameWidth; }
            if (dHeight === undefined) { dHeight = frameHeight; }
            if (sxOffset === undefined) { sxOffset = 0; }
            if (syOffset === undefined) { syOffset = 0; }
            if (sWidth === undefined) { sWidth = frameWidth; }
            if (sHeight === undefined) { sHeight = frameHeight; }

            var sx = textureFrame.cutX + sxOffset;
            var sy = textureFrame.cutY + syOffset;

            this.context.drawImage(
                textureFrame.source.image,  // image
                sx, sy, sWidth, sHeight,
                dx, dy, dWidth, dHeight
            );

            this.dirty = true;

            return this;
        },

        getDataURL(type, encoderOptions) {
            return this.canvas.toDataURL(type, encoderOptions);
        },

        getPixel(x, y, out) {
            if (out === undefined) {
                out = new Color();
            }
            var rgb = this.context.getImageData(x, y, 1, 1);
            out.setTo(rgb.data[0], rgb.data[1], rgb.data[2], rgb.data[3]);
            return out;
        },

        setPixel(x, y, r, g, b, a) {
            if (typeof (r) !== 'number') {
                var color = r;
                r = color.red;
                g = color.green;
                b = color.blue;
                a = color.alpha;
            }

            if (a === undefined) {
                a = ((r !== 0) || (g !== 0) || (b !== 0)) ? 255 : 0;
            }

            var imgData = this.context.createImageData(1, 1);
            imgData.data[0] = r;
            imgData.data[1] = g;
            imgData.data[2] = b;
            imgData.data[3] = a;
            this.context.putImageData(imgData, x, y);
            this.dirty = true;
            return this;
        }
    };

    var CopyCanvasToTexture = function (scene, srcCanvas, key, x, y, width, height) {
        var textures = scene.sys.textures;
        var renderer = scene.renderer;

        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        if (width === undefined) {
            width = srcCanvas.width;
        }
        if (height === undefined) {
            height = srcCanvas.height;
        }

        var texture;
        if (textures.exists(key)) {
            texture = textures.get(key);
        } else {
            texture = textures.createCanvas(key, width, height);
        }

        var destCanvas = texture.getSourceImage();
        if (destCanvas.width !== width) {
            destCanvas.width = width;
        }
        if (destCanvas.height !== height) {
            destCanvas.height = height;
        }

        var destCtx = destCanvas.getContext('2d', { willReadFrequently: true });
        destCtx.clearRect(0, 0, width, height);
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (renderer.gl && texture) {
            renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
        }
    };

    var TextureMethods = {
        updateTexture(callback, scope) {
            var canvas = this.canvas;
            var context = this.context;

            if (callback) {
                var scale = this.resolution;
                if (scale !== 1) {
                    this.context.save();
                    this.context.scale(scale, scale);
                }

                if (scope) {
                    callback.call(scope, canvas, context);
                } else {
                    callback(canvas, context);
                }

                if (scale !== 1) {
                    this.context.restore();
                }
            }

            var newWidth = canvas.width,
                newHeight = canvas.height;
            if ((newWidth !== this.frame.width) || (newHeight !== this.frame.height)) {
                this.frame.setSize(newWidth, newHeight);
                this.frame.source.updateSize(newWidth, newHeight);
                this.frame.updateUVs();
            }
            if (this.renderer && this.renderer.gl) {
                this.frame.source.glTexture = this.renderer.canvasToTexture(canvas, this.frame.source.glTexture, true);
                if (typeof WEBGL_DEBUG) {
                    this.frame.glTexture.spectorMetadata = { textureKey: 'Canvas Game Object' };
                }
            }

            this.dirty = false;

            var input = this.input;
            if (input && !input.customHitArea) {
                input.hitArea.width = this.width;
                input.hitArea.height = this.height;
            }
            return this;
        },

        generateTexture(key, x, y, width, height) {
            var srcCanvas = this.canvas;
            if (width === undefined) {
                width = srcCanvas.width;
            } else {
                width *= this.resolution;
            }
            if (height === undefined) {
                height = srcCanvas.height;
            } else {
                height *= this.resolution;
            }

            CopyCanvasToTexture(this.scene, srcCanvas, key, x, y, width, height);

            return this;
        },

        loadTexture(key, frame) {
            var textureFrame = this.scene.sys.textures.getFrame(key, frame);
            if (!textureFrame) {
                return this;
            }

            if ((this.width !== textureFrame.cutWidth) || (this.height !== textureFrame.cutHeight)) {
                this.setSize(textureFrame.cutWidth, textureFrame.cutHeight);
            } else {
                this.clear();
            }

            this.drawFrame(key, frame);
            this.dirty = true;
            return this;
        }

    };

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
        var version = Phaser.VERSION.split('.');
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

    const CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;
    const GameObject = Phaser.GameObjects.GameObject;
    const UUID = Phaser.Utils.String.UUID;
    const DefaultImageNodes = Phaser.Renderer.WebGL.RenderNodes.Defaults.DefaultImageNodes;

    class Canvas extends GameObject {
        constructor(scene, x, y, width, height, resolution) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 1;
            }
            if (height === undefined) {
                height = 1;
            }
            if (resolution === undefined) {
                resolution = 1;
            }

            super(scene, 'rexCanvas');

            this.renderer = scene.sys.game.renderer;

            this._width = width;
            this._height = height;
            this.resolution = resolution;

            width = Math.max(Math.ceil(width * this.resolution), 1);
            height = Math.max(Math.ceil(height * this.resolution), 1);
            this.canvas = CanvasPool$1.create(this, width, height);

            this.dirty = false;

            this.setPosition(x, y);
            this.setOrigin(0.5, 0.5);
            this.initRenderNodes(this._defaultRenderNodesMap);

            this._crop = this.resetCropObject();

            //  Create a Texture for this Text object
            this._textureKey = UUID();

            this.texture = scene.sys.textures.addCanvas(this._textureKey, this.canvas);

            //  Set the context to be the CanvasTexture context
            this.context = this.texture.context;

            //  Get the frame
            this.frame = this.texture.get();

            //  Set the resolution
            this.frame.source.resolution = this.resolution;

            if (this.renderer && this.renderer.gl) {
                //  Clear the default 1x1 glTexture, as we override it later
                this.renderer.deleteTexture(this.frame.source.glTexture);
                this.frame.source.glTexture = null;
            }

            this.dirty = true;
        }

        preDestroy() {
            CanvasPool$1.remove(this.canvas);

            this.canvas = null;
            this.context = null;

            var texture = this.texture;

            if (texture) {
                texture.destroy();
            }
        }

        get _defaultRenderNodesMap() {
            return DefaultImageNodes;
        }

        setResolution(resolution) {
            if (this.resolution === resolution) {
                return this;
            }

            this.resolution = resolution;

            var width = Math.max(Math.ceil(this.width * resolution), 1);
            var height = Math.max(Math.ceil(this.height * resolution), 1);
            this.canvas.width = width;
            this.canvas.height = height;

            this.frame.source.resolution = resolution;
            this.dirty = true;

            return this;
        }

        get width() {
            return this._width;
        }

        set width(value) {
            this.setSize(value, this._height);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            this.setSize(this._width, value);
        }

        setCanvasSize(width, height) {
            if ((this._width === width) && (this._height === height)) {
                return this;
            }

            this._width = width;
            this._height = height;

            this.updateDisplayOrigin();

            width = Math.max(Math.ceil(width * this.resolution), 1);
            height = Math.max(Math.ceil(height * this.resolution), 1);
            this.canvas.width = width;
            this.canvas.height = height;

            this.frame.setSize(width, height);
            this.frame.source.updateSize(width, height);
            this.frame.updateUVs();

            this.dirty = true;
            return this;
        }

        // setSize might be override
        setSize(width, height) {
            this.setCanvasSize(width, height);
            return this;
        }

        get displayWidth() {
            return this.scaleX * this._width;
        }

        set displayWidth(value) {
            this.scaleX = value / this._width;
        }

        get displayHeight() {
            return this.scaleY * this._height;
        }

        set displayHeight(value) {
            this.scaleY = value / this._height;
        }

        setDisplaySize(width, height) {
            this.displayWidth = width;
            this.displayHeight = height;
            return this;
        }

        getCanvas(readOnly) {
            if (!readOnly) {
                this.dirty = true;
            }
            return this.canvas;
        }

        getContext(readOnly) {
            if (!readOnly) {
                this.dirty = true;
            }
            return this.context;
        }

        needRedraw() {
            this.dirty = true;
            return this;
        }

        resize(width, height) {
            this.setSize(width, height);
            return this;
        }
    }

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Canvas,
        [
            Components.Alpha,
            Components.BlendMode,
            Components.Crop,
            Components.Depth,
            Components.Flip,
            Components.GetBounds,
            Components.Lighting,
            Components.Mask,
            Components.Origin,
            Components.RenderNodes,
            Components.ScrollFactor,
            Components.Tint,
            Components.Transform,
            Components.Visible,
            Render,
            CanvasMethods,
            TextureMethods,
        ]
    );

    var CopyFrameToCanvas = function (frame, canvas) {
        canvas.width = frame.cutWidth;
        canvas.height = frame.cutHeight;
        var context = canvas.getContext('2d', { willReadFrequently: true });
        context.drawImage(frame.source.image, frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight);
        return canvas;
    };

    const CanvasPool = Phaser.Display.Canvas.CanvasPool;

    var CreateFillPattern = function (textureFrame) {
        var canvas = CanvasPool.create(this);
        CopyFrameToCanvas(textureFrame, canvas);
        var fillPattern = this.context.createPattern(canvas, 'repeat');
        CanvasPool.remove(canvas);
        return fillPattern;
    };

    var DrawContent = function () {
        if (!this.fillPattern) {
            return;
        }

        this.canvas;
            var context = this.context;

        var positionX = this.tilePositionX,
            positionY = this.tilePositionY;
        var scaleX = this.tileScaleX,
            scaleY = this.tileScaleY;

        context.save();

        context.scale(scaleX, scaleY);
        context.translate(-positionX, -positionY);
        context.fillStyle = this.fillPattern;
        context.fillRect(positionX, positionY, this.width / scaleX, this.height / scaleY);

        context.restore();

    };

    class RepeatImage extends Canvas {
        constructor(scene, x, y, width, height, textureKey, frameKey) {
            var displayTexture = scene.sys.textures.get(textureKey);
            var displayFrame = displayTexture.get(frameKey);

            if (displayFrame.source.compressionAlgorithm) {
                console.warn('RepeatImage cannot use compressed texture');
                displayTexture = scene.sys.textures.get('__MISSING');
                displayFrame = displayTexture.get();
            }

            if (displayTexture.type === 'DynamicTexture') {
                console.warn('RepeatImage cannot use Dynamic Texture');
                displayTexture = scene.sys.textures.get('__MISSING');
                displayFrame = displayTexture.get();
            }

            if (!width || !height) {
                width = displayFrame.width;
                height = displayFrame.height;
            }
            else {
                width = Math.floor(width);
                height = Math.floor(height);
            }

            super(scene, x, y, width, height);
            this.type = 'rexRepeatImage';

            this._tilePositionX = 0;
            this._tilePositionY = 0;
            this._tileScaleX = 1;
            this._tileScaleY = 1;
            this.fillPattern = null;

            this.setTexture(textureKey, frameKey);

        }

        setTexture(key, frame) {
            if ((this._textureKey === key) && (this._frameName === frame)) {
                return this;
            }

            this.dirty = true;
            this._textureKey = key;
            this._frameName = frame;

            var textureFrame = this.scene.sys.textures.getFrame(key, frame);
            if (!textureFrame) {
                this.fillPattern = null;
                return this;
            }

            this.fillPattern = CreateFillPattern.call(this, textureFrame);

            return this;
        }

        setFrame(frame) {
            this.setTexture(this._textureKey, frame);
            return this;
        }

        get tilePositionX() {
            return this._tilePositionX;
        }

        set tilePositionX(value) {
            if (this._tilePositionX === value) {
                return;
            }
            this.dirty = true;
            this._tilePositionX = value;
        }

        get tilePositionY() {
            return this._tilePositionY;
        }

        set tilePositionY(value) {
            if (this._tilePositionY === value) {
                return;
            }
            this.dirty = true;
            this._tilePositionY = value;
        }

        setTilePosition(x, y) {
            this.tilePositionX = x;
            this.tilePositionY = y;

            return this;
        }

        get tileScaleX() {
            return this._tileScaleX;
        }

        set tileScaleX(value) {
            if (this._tileScaleX === value) {
                return;
            }
            this.dirty = true;
            this._tileScaleX = value;
        }

        get tileScaleY() {
            return this._tileScaleY;
        }

        set tileScaleY(value) {
            if (this._tileScaleY === value) {
                return;
            }
            this.dirty = true;
            this._tileScaleY = value;
        }

        setTileScale(x, y) {
            if (y === undefined) {
                y = x;
            }

            this.tileScaleX = x;
            this.tileScaleY = y;

            return this;
        }

        updateTexture() {
            this.clear();
            DrawContent.call(this);
            super.updateTexture();
            return this;
        }

        preDestroy() {
            this.fillPattern = null;
            super.preDestroy();
        }
    }

    function Factory (x, y, width, height, key, frame) {
        var gameObject = new RepeatImage(this.scene, x, y, width, height, key, frame);
        this.scene.add.existing(gameObject);
        return gameObject;
    }

    const GetAdvancedValue = Phaser.Utils.Objects.GetAdvancedValue;
    const BuildGameObject = Phaser.GameObjects.BuildGameObject;

    function Creator (config, addToScene) {
        if (config === undefined) { config = {}; }
        if (addToScene !== undefined) {
            config.add = addToScene;
        }
        var width = GetAdvancedValue(config, 'width', undefined);
        var height = GetAdvancedValue(config, 'height', undefined);
        var key = GetAdvancedValue(config, 'key', undefined);
        var frame = GetAdvancedValue(config, 'frame', undefined);
        var gameObject = new RepeatImage(this.scene, 0, 0, width, height, key, frame);
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

    class RepeatImagePlugin extends Phaser.Plugins.BasePlugin {

        constructor(pluginManager) {
            super(pluginManager);

            //  Register our new Game Object type
            pluginManager.registerGameObject('rexRepeatImage', Factory, Creator);
        }

        start() {
            var eventEmitter = this.game.events;
            eventEmitter.on('destroy', this.destroy, this);
        }
    }

    SetValue(window, 'RexPlugins.GameObjects.RepeatImage', RepeatImage);

    return RepeatImagePlugin;

}));
