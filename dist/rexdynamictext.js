(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexdynamictext = factory());
})(this, (function () { 'use strict';

    // copy from Phaser.GameObjects.Text

    const Utils = Phaser.Renderer.WebGL.Utils;

    var WebGLRenderer = function (renderer, src, camera, parentMatrix) {
        if (src.dirty) {
            src.updateTexture();
            src.dirty = false;
        }

        if ((src.width === 0) || (src.height === 0)) {
            return;
        }

        camera.addToRenderList(src);

        var frame = src.frame;
        var width = frame.width;
        var height = frame.height;
        var getTint = Utils.getTintAppendFloatAlpha;
        var pipeline = renderer.pipelines.set(src.pipeline, src);
        var textureUnit = pipeline.setTexture2D(frame.glTexture, src);

        renderer.pipelines.preBatch(src);

        pipeline.batchTexture(
            src,
            frame.glTexture,
            width, height,
            src.x, src.y,
            width / src.resolution, height / src.resolution,
            src.scaleX, src.scaleY,
            src.rotation,
            src.flipX, src.flipY,
            src.scrollFactorX, src.scrollFactorY,
            src.displayOriginX, src.displayOriginY,
            0, 0, width, height,
            getTint(src.tintTopLeft, camera.alpha * src._alphaTL),
            getTint(src.tintTopRight, camera.alpha * src._alphaTR),
            getTint(src.tintBottomLeft, camera.alpha * src._alphaBL),
            getTint(src.tintBottomRight, camera.alpha * src._alphaBR),
            src.tintFill,
            0, 0,
            camera,
            parentMatrix,
            false,
            textureUnit
        );

        renderer.pipelines.postBatch(src);
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
            if (callback) {
                var scale = this.resolution;
                if (scale !== 1) {
                    this.context.save();
                    this.context.scale(scale, scale);
                }

                if (scope) {
                    callback.call(scope, this.canvas, this.context);
                } else {
                    callback(this.canvas, this.context);
                }

                if (scale !== 1) {
                    this.context.restore();
                }
            }

            if ((this.canvas.width !== this.frame.width) || (this.canvas.height !== this.frame.height)) {
                this.frame.setSize(this.canvas.width, this.canvas.height);
            }
            if (this.renderer && this.renderer.gl) {
                this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
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

    const CanvasPool$1 = Phaser.Display.Canvas.CanvasPool;
    const GameObject$1 = Phaser.GameObjects.GameObject;
    const UUID = Phaser.Utils.String.UUID;

    class Canvas extends GameObject$1 {
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
            this.context = this.canvas.getContext('2d', { willReadFrequently: true });

            this.dirty = false;

            this.setPosition(x, y);
            this.setOrigin(0.5, 0.5);
            this.initPipeline();
            this.initPostPipeline(true);

            this._crop = this.resetCropObject();

            //  Create a Texture for this Text object
            this._textureKey = UUID();

            this.texture = scene.sys.textures.addCanvas(this._textureKey, this.canvas);

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
            Components.Mask,
            Components.Origin,
            Components.Pipeline,
            Components.PostPipeline,
            Components.ScrollFactor,
            Components.Tint,
            Components.Transform,
            Components.Visible,
            Render,
            CanvasMethods,
            TextureMethods,
        ]
    );

    const GetValue$a = Phaser.Utils.Objects.GetValue;

    var GetPadding$1 = function (padding, key) {
        if (key === undefined) {
            return padding;
        }
        return padding[key];
    };

    var SetPadding$1 = function (padding, key, value) {
        if (padding === undefined) {
            padding = {};
        }
        if (key === undefined) {
            key = 0;
        }

        var keyType = typeof (key);
        if (keyType === 'string') {
            padding[key] = value;
        } else if (keyType === 'number') {
            padding.left = key;
            padding.right = key;
            padding.top = key;
            padding.bottom = key;
        } else {
            padding.left = GetValue$a(key, 'left', 0);
            padding.right = GetValue$a(key, 'right', 0);
            padding.top = GetValue$a(key, 'top', 0);
            padding.bottom = GetValue$a(key, 'bottom', 0);
        }
        return padding;
    };

    var GetValue$9 = function (source, key, defaultValue) {
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
            return (key === undefined) ? this.data : GetValue$9(this.data, key, defaultValue);
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
            this.setParent(parent);
            this.type = type;
            this.renderable = false;

            this.reset().setActive();
        }

        destroy() {
            this.parent.removeChild(this);
        }

        setParent(parent) {
            this.parent = parent;
            return this;
        }

        get scene() {
            return this.parent.scene;
        }

        get canvas() {
            return (this.parent) ? this.parent.canvas : null;
        }

        get context() {
            return (this.parent) ? this.parent.context : null;
        }

        setDirty(dirty) {
            if (dirty && this.parent) {
                this.parent.dirty = true;
            }
            return this;
        }

        get active() {
            return this._active;
        }

        set active(value) {
            this.setDirty(this._active != value);
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
        onFree() {
            this.reset().setParent();
        }

        // Override
        reset() {
            return this;
        }

        // Override
        render() { }

        // Override
        contains(x, y) {
            return false;
        }
    }

    Object.assign(
        Base.prototype,
        DataMethods
    );

    var RenderMethods = {
        // Override
        renderContent() {

        },

        // Override
        render() {
            if (!this.willRender) {
                return this;
            }

            var context = this.context;
            context.save();
            context.globalAlpha = this.alpha;

            if (this.toLocalPosition) {
                var x = this.drawX, y = this.drawY;
                if (this.autoRound) {
                    x = Math.round(x);
                    y = Math.round(y);
                }

                context.translate(x, y);
                context.scale(this.scaleX, this.scaleY);
                context.rotate(this.rotation);
            }

            if (this.drawBelowCallback) {
                this.drawBelowCallback(this);
            }

            this.renderContent();

            if (this.drawAboveCallback) {
                this.drawAboveCallback(this);
            }

            context.restore();

            return this;
        },
    };

    const RotateAround$1 = Phaser.Math.RotateAround;

    var CanvasPositionToBobPosition = function (canvasX, canvasY, bob, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            if (globPoint$1 === undefined) {
                globPoint$1 = {};
            }
            out = globPoint$1;
        }

        out.x = (canvasX - bob.drawX) / bob.scaleX;
        out.y = (canvasY - bob.drawY) / bob.scaleY;

        if (bob.rotation !== 0) {
            RotateAround$1(out, 0, 0, -bob.rotation);
        }
        return out;
    };

    var globPoint$1;

    const Rectangle = Phaser.Geom.Rectangle;

    var Contains = function (canvasX, canvasY) {
        if ((this.width === 0) || (this.height === 0)) {
            return false;
        }

        var bobPosition = CanvasPositionToBobPosition(canvasX, canvasY, this, true);
        return GetBobBounds(this).contains(bobPosition.x, bobPosition.y);
    };

    var GetBobBounds = function (bob) {
        if (bobBounds === undefined) {
            bobBounds = new Rectangle();
        }

        var x = bob.drawTLX,
            y = bob.drawTLY;
        bobBounds.setTo(x, y, (bob.drawTRX - x), (bob.drawBLY - y));

        return bobBounds;
    };

    var bobBounds;

    const RotateAround = Phaser.Math.RotateAround;

    var BobPositionToCanvasPosition = function (bob, bobX, bobY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            if (globPoint === undefined) {
                globPoint = {};
            }
            out = globPoint;
        }

        out.x = bobX;
        out.y = bobY;

        if (bob.rotation !== 0) {
            RotateAround(out, 0, 0, bob.rotation);
        }

        out.x = (out.x * bob.scaleX) + bob.drawX;
        out.y = (out.y * bob.scaleY) + bob.drawY;

        return out;
    };

    var globPoint;

    const TransformMatrix = Phaser.GameObjects.Components.TransformMatrix;

    var GameObjectLocalXYToWorldXY = function (gameObject, localX, localY, out) {
        if (out === undefined) {
            out = {};
        } else if (out === true) {
            out = globOut;
        }

        var px = localX - (gameObject.width * gameObject.originX);
        var py = localY - (gameObject.height * gameObject.originY);

        if (tempMatrix === undefined) {
            tempMatrix = new TransformMatrix();
            parentMatrix = new TransformMatrix();
        }

        if (gameObject.parentContainer) {
            gameObject.getWorldTransformMatrix(tempMatrix, parentMatrix);
        }
        else {
            tempMatrix.applyITRS(gameObject.x, gameObject.y, gameObject.rotation, gameObject.scaleX, gameObject.scaleY);
        }

        tempMatrix.transformPoint(px, py, out);

        return out;
    };

    var tempMatrix, parentMatrix;
    var globOut = {};

    var BobPositionToWorldPosition = function (dynamicText, bob, bobX, bobY, out) {
        var localXY = BobPositionToCanvasPosition(bob, bobX, bobY, true);
        var worldXY = GameObjectLocalXYToWorldXY(dynamicText, localXY.x, localXY.y, out);
        return worldXY;
    };

    var GetBobWorldPosition = function (dynamicText, bob, offsetX, offsetY, out) {
        if (typeof (offsetX) !== 'number') {
            out = offsetX;
            offsetX = 0;
            offsetY = 0;
        }
        var bobX = bob.drawCenterX + offsetX;
        var bobY = bob.drawCenterY + offsetY;
        return BobPositionToWorldPosition(dynamicText, bob, bobX, bobY, out);
    };

    var GetWorldPosition = function (offsetX, offsetY, out) {
        return GetBobWorldPosition(this.parent, this, offsetX, offsetY, out);
    };

    var Methods$1 = {
        contains: Contains,
        getWorldPosition: GetWorldPosition,
    };

    Object.assign(
        Methods$1,
        RenderMethods
    );

    const DegToRad$1 = Phaser.Math.DegToRad;
    const RadToDeg = Phaser.Math.RadToDeg;
    const GetValue$8 = Phaser.Utils.Objects.GetValue;

    class RenderBase extends Base {
        constructor(parent, type) {
            super(parent, type);

            this.renderable = true;
            this.scrollFactorX = 1;
            this.scrollFactorY = 1;
            this.toLocalPosition = true;
            this.originX = 0;
            this.offsetX = 0;  // Override
            this.offsetY = 0;  // Override
        }

        get visible() {
            return this._visible;
        }

        set visible(value) {
            this.setDirty(this._visible != value);
            this._visible = value;
        }

        setVisible(visible) {
            if (visible === undefined) {
                visible = true;
            }

            this.visible = visible;
            return this;
        }

        get alpha() { return this._alpha; }

        set alpha(value) {
            this.setDirty(this._alpha != value);
            this._alpha = value;
        }

        setAlpha(alpha) {
            this.alpha = alpha;
            return this;
        }

        get x() { return this._x; }

        set x(value) {
            this.setDirty(this._x != value);
            this._x = value;
        }

        setX(x) {
            this.x = x;
            return this;
        }

        get y() { return this._y; }

        set y(value) {
            this.setDirty(this._y != value);
            this._y = value;
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

        setInitialPosition(x, y) {
            this.x0 = x;
            this.y0 = y;
            return this;
        }

        setScrollFactorX(x) {
            this.scrollFactorX = x;
            return this;
        }

        setScrollFactorY(y) {
            this.scrollFactorY = y;
            return this;
        }

        setScrollFactor(x, y) {
            if (y === undefined) {
                y = x;
            }
            this.scrollFactorX = x;
            this.scrollFactorY = y;
            return this;
        }

        get rotation() { return this._rotation; }

        set rotation(value) {
            this.setDirty(this._rotation != value);
            this._rotation = value;
        }

        setRotation(rotation) {
            this.rotation = rotation;
            return this;
        }

        get angle() { return RadToDeg(this._rotation); }

        set angle(value) {
            this.rotation = DegToRad$1(value);
        }

        setAngle(angle) {
            this.angle = angle;
            return this;
        }

        get scaleX() { return this._scaleX; }

        set scaleX(value) {
            this.setDirty(this._scaleX !== value);
            this._scaleX = value;
        }

        setScaleX(scaleX) {
            this.scaleX = scaleX;
            return this;
        }

        // Override
        get width() { return 0; }

        // Override
        set width(value) { }

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

        get leftSpace() { return this._leftSpace; }

        set leftSpace(value) {
            this.setDirty(this._leftSpace !== value);
            this._leftSpace = value;
        }

        setLeftSpace(value) {
            this.leftSpace = value;
            return this;
        }

        get rightSpace() { return this._rightSpace; }

        set rightSpace(value) {
            this.setDirty(this._rightSpace !== value);
            this._rightSpace = value;
        }

        setRightSpace(value) {
            this.rightSpace = value;
            return this;
        }

        get outerWidth() {
            return this.width + this.leftSpace + this.rightSpace;
        }

        get scaleY() { return this._scaleY; }

        set scaleY(value) {
            this.setDirty(this._scaleY !== value);
            this._scaleY = value;
        }

        setScaleY(scaleY) {
            this.scaleY = scaleY;
            return this;
        }

        // Override
        get height() { return 0; }

        // Override
        set height(value) { }

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

        setOrigin(x) {
            this.originX = x;
            return this;
        }

        setAlign(align) {
            this.align = align;
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
            var width = GetValue$8(o, 'width', undefined);
            var height = GetValue$8(o, 'height', undefined);
            var scaleX = GetValue$8(o, 'scaleX', undefined);
            var scaleY = GetValue$8(o, 'scaleY', undefined);

            if (width !== undefined) {
                if ((height === undefined) && (scaleY === undefined)) {
                    this.setWidth(width, true);
                } else {
                    this.setWidth(width);
                }
            } else if (scaleX !== undefined) {
                this.setScaleX(scaleX);
            }
            if (height !== undefined) {
                if ((width === undefined) && (scaleX === undefined)) {
                    this.setHeight(height, true);
                } else {
                    this.setHeight(height);
                }
            } else if (scaleY !== undefined) {
                this.setScaleY(scaleY);
            }

            if (o.hasOwnProperty('leftSpace')) {
                this.setLeftSpace(o.leftSpace);
            }
            if (o.hasOwnProperty('rightSpace')) {
                this.setRightSpace(o.rightSpace);
            }

            if (o.hasOwnProperty('align')) {
                this.setAlign(o.align);
            }

            return this;
        }

        setDrawBelowCallback(callback) {
            this.drawBelowCallback = callback;
            return this;
        }

        setDrawAboveCallback(callback) {
            this.drawAboveCallback = callback;
            return this;
        }

        reset() {
            this
                .setVisible()
                .setAlpha(1)
                .setPosition(0, 0)
                .setRotation(0)
                .setScale(1, 1)
                .setLeftSpace(0).setRightSpace(0)
                .setOrigin(0)
                .setAlign()
                .setDrawBelowCallback()
                .setDrawAboveCallback();
            return this;
        }

        // Override
        get willRender() {
            return this.visible && (this.alpha > 0);
        }

        get drawX() {
            var x = this.x + this.leftSpace + this.offsetX - (this.originX * this.width);
            return (this.parent._textOX * this.scrollFactorX) + x;
        }
        get drawY() {
            var y = this.y + this.offsetY;
            return (this.parent._textOY * this.scrollFactorY) + y;
        }

        // Override
        get drawTLX() { return 0; }
        get drawTLY() { return 0; }
        get drawBLX() { return 0; }
        get drawBLY() { return 0; }
        get drawTRX() { return 0; }
        get drawTRY() { return 0; }
        get drawBRX() { return 0; }
        get drawBRY() { return 0; }

        get drawCenterX() {
            return (this.drawTRX + this.drawTLX) / 2;
        }
        get drawCenterY() {
            return (this.drawBLY + this.drawTLY) / 2;
        }
    }

    Object.assign(
        RenderBase.prototype,
        Methods$1,
    );

    const Pad = Phaser.Utils.String.Pad;
    var GetStyle = function (style, canvas, context) {
        if (style == null) {
            return style;
        }

        switch (typeof (style)) {
            case 'string': return style;
            case 'number': return `#${Pad(Math.floor(style).toString(16), 6, '0', 1)}`;
            case 'function': return style(canvas, context);
            case 'object':
                if (style.hasOwnProperty('r')) {
                    if (style.hasOwnProperty('a')) {  // rgba
                        return `rgba(${style.r},${style.g},${style.b},${style.a})`;
                    } else {  // rgb
                        return `rgb(${style.r},${style.g},${style.b})`;
                    }
                } else if (style.hasOwnProperty('h')) {
                    if (style.hasOwnProperty('a')) {  // hsla
                        return `hsla(${style.h},${style.s},${style.l},${style.a})`;
                    } else {  // hsl
                        return `hsl(${style.h},${style.s},${style.l})`;
                    }
                } else {
                    return style; // Not a valid input
                }
            default: return style;
        }
    };

    var GetProperty = function (name, config, defaultConfig) {
        if (config.hasOwnProperty(name)) {
            return config[name];
        } else {
            return defaultConfig[name];
        }
    };

    const GetValue$7 = Phaser.Utils.Objects.GetValue;

    class RoundRectangle {
        constructor(x, y, width, height, radiusConfig) {
            if (x === undefined) { x = 0; }
            if (y === undefined) { y = x; }
            if (width === undefined) { width = 0; }
            if (height === undefined) { height = 0; }
            if (radiusConfig === undefined) { radiusConfig = 0; }

            this.cornerRadius = {};
            this._width = 0;
            this._height = 0;
            this.setTo(x, y, width, height, radiusConfig);
        }

        setTo(x, y, width, height, radiusConfig) {
            this.setPosition(x, y);
            this.setRadius(radiusConfig);
            this.setSize(width, height);
            return this;
        }

        setPosition(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }

        setRadius(value) {
            if (value === undefined) {
                value = 0;
            }
            this.radius = value;
            return this;
        }

        setSize(width, height) {
            this.width = width;
            this.height = height;
            return this;
        }

        get minWidth() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.x + radius.tr.x, radius.bl.x + radius.br.x);
        }

        get minHeight() {
            var radius = this.cornerRadius;
            return Math.max(radius.tl.y + radius.bl.y, radius.tr.y + radius.br.y);
        }

        get width() {
            return this._width;
        }

        set width(value) {
            if (value == null) {
                value = 0;
            }
            this._width = Math.max(value, this.minWidth);
        }

        get height() {
            return this._height;
        }

        set height(value) {
            if (value == null) {
                value = 0;
            }
            this._height = Math.max(value, this.minHeight);
        }

        get radius() {
            var radius = this.cornerRadius;
            return Math.max(
                radius.tl.x, radius.tl.y,
                radius.tr.x, radius.tr.y,
                radius.bl.x, radius.bl.y,
                radius.br.x, radius.br.y
            );
        }

        set radius(value) {
            var defaultRadiusX, defaultRadiusY;
            if (typeof (value) === 'number') {
                defaultRadiusX = value;
                defaultRadiusY = value;
            } else {
                defaultRadiusX = GetValue$7(value, 'x', 0);
                defaultRadiusY = GetValue$7(value, 'y', 0);
            }

            var radius = this.cornerRadius;
            radius.tl = GetRadius(GetValue$7(value, 'tl', undefined), defaultRadiusX, defaultRadiusY);
            radius.tr = GetRadius(GetValue$7(value, 'tr', undefined), defaultRadiusX, defaultRadiusY);
            radius.bl = GetRadius(GetValue$7(value, 'bl', undefined), defaultRadiusX, defaultRadiusY);
            radius.br = GetRadius(GetValue$7(value, 'br', undefined), defaultRadiusX, defaultRadiusY);
        }

        get radiusTL() {
            var radius = this.cornerRadius.tl;
            return Math.max(radius.x, radius.y);
        }

        set radiusTL(value) {
            SetRadius(this.cornerRadius.tl, value);
        }

        get radiusTR() {
            var radius = this.cornerRadius.tr;
            return Math.max(radius.x, radius.y);
        }

        set radiusTR(value) {
            SetRadius(this.cornerRadius.tr, value);
        }

        get radiusBL() {
            var radius = this.cornerRadius.bl;
            return Math.max(radius.x, radius.y);
        }

        set radiusBL(value) {
            SetRadius(this.cornerRadius.bl, value);
        }

        get radiusBR() {
            var radius = this.cornerRadius.br;
            return Math.max(radius.x, radius.y);
        }

        set radiusBR(value) {
            SetRadius(this.cornerRadius.br, value);
        }
    }

    var GetRadius = function (radius, defaultRadiusX, defaultRadiusY) {
        if (radius === undefined) {
            radius = {
                x: defaultRadiusX,
                y: defaultRadiusY
            };
        } else if (typeof (radius) === 'number') {
            radius = {
                x: radius,
                y: radius
            };
        }

        SetConvex(radius);
        return radius;

    };

    var SetRadius = function (radius, value) {
        if (typeof (value) === 'number') {
            radius.x = value;
            radius.y = value;
        } else {
            radius.x = GetValue$7(value, 'x', 0);
            radius.y = GetValue$7(value, 'y', 0);
        }

        SetConvex(radius);
    };

    var SetConvex = function (radius) {
        radius.convex = (radius.x >= 0) || (radius.y >= 0);

        radius.x = Math.abs(radius.x);
        radius.y = Math.abs(radius.y);
    };

    const DegToRad = Phaser.Math.DegToRad;

    var AddRoundRectanglePath = function (context, x, y, width, height, radiusConfig, iteration) {
        var geom = new RoundRectangle(x, y, width, height, radiusConfig),
            minWidth = geom.minWidth,
            minHeight = geom.minHeight,
            scaleRX = (width >= minWidth) ? 1 : (width / minWidth),
            scaleRY = (height >= minHeight) ? 1 : (height / minHeight);

        var cornerRadius = geom.cornerRadius;
        var radius, radiusX, radiusY, centerX, centerY;
        var startX, startY;

        context.save();
        context.beginPath();

        context.translate(x, y);

        // Top-left
        radius = cornerRadius.tl;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = radiusX;
                centerY = radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 270, false, iteration);
            } else {
                centerX = 0;
                centerY = 0;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 0, true, iteration);
            }

            startX = 0;
            startY = radiusY;
        } else {
            context.lineTo(0, 0);

            startX = 0;
            startY = 0;
        }

        // Top-right
        radius = cornerRadius.tr;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = width - radiusX;
                centerY = radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 360, false, iteration);
            } else {
                centerX = width;
                centerY = 0;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 180, 90, true, iteration);
            }
        } else {
            context.lineTo(width, 0);
        }

        // Bottom-right
        radius = cornerRadius.br;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = width - radiusX;
                centerY = height - radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 0, 90, false, iteration);
            } else {
                centerX = width;
                centerY = height;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 270, 180, true, iteration);
            }
        } else {
            context.lineTo(width, height);
        }

        // Bottom-left
        radius = cornerRadius.bl;
        if (IsArcCorner(radius)) {
            radiusX = radius.x * scaleRX;
            radiusY = radius.y * scaleRY;
            if (IsConvexArc(radius)) {
                centerX = radiusX;
                centerY = height - radiusY;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 90, 180, false, iteration);
            } else {
                centerX = 0;
                centerY = height;
                ArcTo(context, centerX, centerY, radiusX, radiusY, 360, 270, true, iteration);
            }
        } else {
            context.lineTo(0, height);
        }

        context.lineTo(startX, startY);
        context.closePath();
        context.restore();
    };

    var IsConvexArc = function (radius) {
        return (!radius.hasOwnProperty('convex')) ||  // radius does not have convex property
            radius.convex;
    };

    var IsArcCorner = function (radius) {
        return ((radius.x > 0) && (radius.y > 0));
    };

    var ArcTo = function (
        context,
        centerX, centerY,
        radiusX, radiusY,
        startAngle, endAngle,
        antiClockWise,
        iteration
    ) {

        // startAngle, endAngle: 0 ~ 360
        if (antiClockWise && (endAngle > startAngle)) {
            endAngle -= 360;
        } else if (!antiClockWise && (endAngle < startAngle)) {
            endAngle += 360;
        }

        startAngle = DegToRad(startAngle);
        endAngle = DegToRad(endAngle);

        if (iteration == null) {  // undefined, or null
            context.ellipse(centerX, centerY, radiusX, radiusY, 0, startAngle, endAngle, antiClockWise);
        } else {
            iteration += 1;
            var x, y, angle;
            var step = (endAngle - startAngle) / iteration;
            for (var i = 0; i <= iteration; i++) {
                angle = startAngle + (step * i);
                x = centerX + (radiusX * Math.cos(angle));
                y = centerY + (radiusY * Math.sin(angle));
                context.lineTo(x, y);
            }
        }
    };

    var DrawRoundRectangle = function (
        canvas, context,
        x, y,
        width, height, radiusConfig,
        fillStyle, strokeStyle, lineWidth, fillColor2, isHorizontalGradient,
        iteration
    ) {

        AddRoundRectanglePath(context, x, y, width, height, radiusConfig, iteration);

        if (fillStyle != null) {
            if (fillColor2 != null) {
                var grd;
                if (isHorizontalGradient) {
                    grd = context.createLinearGradient(0, 0, width, 0);
                } else {
                    grd = context.createLinearGradient(0, 0, 0, height);
                }
                grd.addColorStop(0, fillStyle);
                grd.addColorStop(1, fillColor2);
                fillStyle = grd;
            }

            context.fillStyle = fillStyle;
            context.fill();
        }

        if ((strokeStyle != null) && (lineWidth > 0)) {
            context.strokeStyle = strokeStyle;
            context.lineWidth = lineWidth;
            context.stroke();
        }
    };

    var DrawRoundRectangleBackground = function (
        canvasObject,
        color,
        strokeColor, strokeLineWidth,
        radius,
        color2, isHorizontalGradient,
        iteration
    ) {

        if ((color == null) && (strokeColor == null)) {
            return;
        }

        var width = canvasObject.canvas.width,
            height = canvasObject.canvas.height;

        if (strokeColor == null) {
            strokeLineWidth = 0;
        }
        var x = strokeLineWidth / 2;
        width = Math.max(1, width - strokeLineWidth);   // Min width is 1
        height = Math.max(1, height - strokeLineWidth); // Min height is 1
        DrawRoundRectangle(canvasObject.canvas, canvasObject.context,
            x, x,
            width, height,
            radius,
            color,
            strokeColor, strokeLineWidth,
            color2, isHorizontalGradient,
            iteration
        );
    };

    const GetValue$6 = Phaser.Utils.Objects.GetValue;

    class Background extends RenderBase {
        constructor(parent, config) {
            super(parent, 'background');

            this.setScrollFactor(0);

            this.setColor(
                GetValue$6(config, 'color', null),
                GetValue$6(config, 'color2', null),
                GetValue$6(config, 'horizontalGradient', true)
            );

            this.setStroke(
                GetValue$6(config, 'stroke', null),
                GetValue$6(config, 'strokeThickness', 2)
            );

            this.setCornerRadius(
                GetValue$6(config, 'cornerRadius', 0),
                GetValue$6(config, 'cornerIteration', null)
            );
        }

        set color(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color != value);
            this._color = value;
        }

        get color() {
            return this._color;
        }

        set color2(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color2 != value);
            this._color2 = value;
        }

        get color2() {
            return this._color2;
        }

        set horizontalGradient(value) {
            this.setDirty(this._horizontalGradient != value);
            this._horizontalGradient = value;
        }

        get horizontalGradient() {
            return this._horizontalGradient;
        }

        setColor(color, color2, isHorizontalGradient) {
            if (isHorizontalGradient === undefined) {
                isHorizontalGradient = true;
            }

            this.color = color;
            this.color2 = color2;
            this.horizontalGradient = isHorizontalGradient;
            return this;
        }

        set stroke(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._stroke != value);
            this._stroke = value;
        }

        get stroke() {
            return this._stroke;
        }

        set strokeThickness(value) {
            this.setDirty(this._strokeThickness != value);
            this._strokeThickness = value;
        }

        get strokeThickness() {
            return this._strokeThickness;
        }

        setStroke(color, lineWidth) {
            if (color != null) {
                if (lineWidth === undefined) {
                    lineWidth = 2;
                }
            }
            this.stroke = color;
            this.strokeThickness = lineWidth;
            return this;
        }

        set cornerRadius(value) {
            this.setDirty(this._cornerRadius != value);
            this._cornerRadius = value;
        }

        get cornerRadius() {
            return this._cornerRadius;
        }

        set cornerIteration(value) {
            this.setDirty(this._cornerIteration != value);
            this._cornerIteration = value;
        }

        get cornerIteration() {
            return this._cornerIteration;
        }

        modifyStyle(o) {
            if (o.hasOwnProperty('color')) {
                this.setColor(
                    o.color,
                    GetProperty('color2', o, this),
                    GetProperty('horizontalGradient', o, this),
                );
            }
            if (o.hasOwnProperty('stroke')) {
                this.setStroke(
                    o.stroke,
                    GetProperty('strokeThickness', o, this),
                );
            }
            if (o.hasOwnProperty('cornerRadius')) {
                this.setCornerRadius(
                    o.cornerRadius,
                    GetProperty('cornerIteration', o, this),
                );
            }

            return this;
        }

        modifyPorperties(o) {
            super.modifyPorperties(o);

            this.modifyStyle(o);

            return this;
        }

        setCornerRadius(radius, iteration) {
            this.cornerRadius = radius;
            this.cornerIteration = iteration;
            return this;
        }

        renderContent() {
            DrawRoundRectangleBackground(
                this.parent,
                this.color,
                this.stroke,
                this.strokeThickness,
                this.cornerRadius,
                this.color2,
                this.horizontalGradient,
                this.cornerIteration
            );
        }
    }

    const GetValue$5 = Phaser.Utils.Objects.GetValue;

    class InnerBounds extends RenderBase {
        constructor(parent, config) {
            super(parent, 'innerbounds');

            this.setScrollFactor(0);

            this.setColor(
                GetValue$5(config, 'color', null),
                GetValue$5(config, 'color2', null),
                GetValue$5(config, 'horizontalGradient', true)
            );

            this.setStroke(
                GetValue$5(config, 'stroke', null),
                GetValue$5(config, 'strokeThickness', 2)
            );
        }

        set color(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color != value);
            this._color = value;
        }

        get color() {
            return this._color;
        }

        set color2(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._color2 != value);
            this._color2 = value;
        }

        get color2() {
            return this._color2;
        }

        set horizontalGradient(value) {
            this.setDirty(this._horizontalGradient != value);
            this._horizontalGradient = value;
        }

        get horizontalGradient() {
            return this._horizontalGradient;
        }

        setColor(color, color2, isHorizontalGradient) {
            if (isHorizontalGradient === undefined) {
                isHorizontalGradient = true;
            }

            this.color = color;
            this.color2 = color2;
            this.horizontalGradient = isHorizontalGradient;
            return this;
        }

        set stroke(value) {
            value = GetStyle(value, this.canvas, this.context);
            this.setDirty(this._stroke != value);
            this._stroke = value;
        }

        get stroke() {
            return this._stroke;
        }

        set strokeThickness(value) {
            this.setDirty(this._strokeThickness != value);
            this._strokeThickness = value;
        }

        get strokeThickness() {
            return this._strokeThickness;
        }

        setStroke(color, lineWidth) {
            if (color != null) {
                if (lineWidth === undefined) {
                    lineWidth = 2;
                }
            }
            this.stroke = color;
            this.strokeThickness = lineWidth;
            return this;
        }

        modifyPorperties(o) {
            super.modifyPorperties(o);

            if (o.hasOwnProperty('color')) {
                this.setColor(
                    o.color,
                    GetValue$5(o, 'color2', null),
                    GetValue$5(o, 'horizontalGradient', true)
                );
            }
            if (o.hasOwnProperty('stroke')) {
                this.setStroke(
                    o.stroke,
                    GetValue$5(o, 'strokeThickness', 2)
                );
            }
        }

        renderContent() {
            var padding = this.parent.padding;
            var x = padding.left,
                y = padding.top,
                width = this.parent.width - padding.left - padding.right,
                height = this.parent.height - padding.top - padding.bottom;
            var context = this.context;
            if (this.color != null) {
                var fillStyle;
                if (this.color2 != null) {
                    var grd;
                    if (this.horizontalGradient) {
                        grd = context.createLinearGradient(0, 0, width, 0);
                    } else {
                        grd = context.createLinearGradient(0, 0, 0, height);
                    }
                    grd.addColorStop(0, this.color);
                    grd.addColorStop(1, this.color2);
                    fillStyle = grd;
                } else {
                    fillStyle = this.color;
                }

                context.fillStyle = fillStyle;
                context.fillRect(x, y, width, height);
            }

            if ((this.stroke != null) && (this.strokeThickness > 0)) {
                context.strokeStyle = this.stroke;
                context.lineWidth = this.strokeThickness;
                context.strokeRect(x, y, width, height);
            }
        }
    }

    const GetValue$4 = Phaser.Utils.Objects.GetValue;

    class TextStyle {
        constructor(parent, config) {
            this.parent = parent;
            this.set(config);
        }

        toJSON() {
            return {
                bold: this.bold,
                italic: this.italic,
                fontSize: this.fontSize,
                fontFamily: this.fontFamily,
                color: this.color,
                stroke: this.stroke,
                strokeThickness: this.strokeThickness,
                shaodwColor: this.shadowColor,
                shadowBlur: this.shadowBlur,
                shadowOffsetX: this.shadowOffsetX,
                shadowOffsetY: this.shadowOffsetY,
                offsetX: this.offsetX,
                offsetY: this.offsetY,
                leftSpace: this.leftSpace,
                rightSpace: this.rightSpace,
                backgroundHeight: this.backgroundHeight,
                backgroundBottomY: this.backgroundBottomY,
                align: this.align
            }
        }

        set(o) {
            this.setBold(GetValue$4(o, 'bold', false));
            this.setItalic(GetValue$4(o, 'italic', false));
            this.setFontSize(GetValue$4(o, 'fontSize', '16px'));
            this.setFontFamily(GetValue$4(o, 'fontFamily', 'Courier'));
            this.setColor(GetValue$4(o, 'color', '#fff'));
            this.setStrokeStyle(
                GetValue$4(o, 'stroke', null),
                GetValue$4(o, 'strokeThickness', 0)
            );
            this.setShadow(
                GetValue$4(o, 'shadowColor', null),
                GetValue$4(o, 'shadowOffsetX', 0),
                GetValue$4(o, 'shadowOffsetY', 0),
                GetValue$4(o, 'shadowBlur', 0)
            );
            this.setOffset(
                GetValue$4(o, 'offsetX', 0),
                GetValue$4(o, 'offsetY', 0)
            );
            this.setSpace(
                GetValue$4(o, 'leftSpace', 0),
                GetValue$4(o, 'rightSpace', 0)
            );
            this.setAlign(GetValue$4(o, 'align', undefined));
            this.setBackgroundColor(GetValue$4(o, 'backgroundColor', null));
            this.setBackgroundHeight(GetValue$4(o, 'backgroundHeight', undefined));
            this.setBackgroundBottomY(GetValue$4(o, 'backgroundBottomY', undefined));
            this.setBackgroundLeftX(GetValue$4(o, 'backgroundLeftX', 0));
            this.setBackgroundRightX(GetValue$4(o, 'backgroundRightX', 0));

            return this;
        }

        modify(o) {
            if (o.hasOwnProperty('bold')) {
                this.setBold(o.bold);
            }
            if (o.hasOwnProperty('italic')) {
                this.setItalic(o.italic);
            }
            if (o.hasOwnProperty('fontSize')) {
                this.setFontSize(o.fontSize);
            }
            if (o.hasOwnProperty('fontFamily')) {
                this.setFontFamily(o.fontFamily);
            }
            if (o.hasOwnProperty('color')) {
                this.setColor(o.color);
            }
            if (o.hasOwnProperty('stroke') || o.hasOwnProperty('strokeThickness')) {
                this.setStrokeStyle(
                    GetProperty('stroke', o, this),
                    GetProperty('strokeThickness', o, this)
                );
            }

            if (o.hasOwnProperty('shadowColor')) {
                this.setShadowColor(o.shadowColor);
            }

            if (o.hasOwnProperty('shadowOffsetX') || o.hasOwnProperty('shadowOffsetY')) {
                this.setShadowOffset(
                    GetProperty('shadowOffsetX', o, this),
                    GetProperty('shadowOffsetY', o, this),
                );
            }

            if (o.hasOwnProperty('shadowBlur')) {
                this.setShadowBlur(o.shaodwBlur);
            }

            if (o.hasOwnProperty('offsetX')) {
                this.setOffsetX(o.offsetX);
            }
            if (o.hasOwnProperty('offsetY')) {
                this.setOffsetY(o.offsetY);
            }

            if (o.hasOwnProperty('leftSpace')) {
                this.setLeftSpace(o.leftSpace);
            }
            if (o.hasOwnProperty('rightSpace')) {
                this.setRightSpace(o.rightSpace);
            }

            if (o.hasOwnProperty('align')) {
                this.setAlign(o.align);
            }

            if (o.hasOwnProperty('backgroundColor')) {
                this.setBackgroundColor(o.backgroundColor);
            }

            if (o.hasOwnProperty('backgroundHeight')) {
                this.setBackgroundHeight(o.backgroundHeight);
            }
            if (o.hasOwnProperty('backgroundBottomY')) {
                this.setBackgroundBottomY(o.backgroundBottomY);
            }
            if (o.hasOwnProperty('backgroundLeftX')) {
                this.setBackgroundLeftX(o.backgroundLeftX);
            }
            if (o.hasOwnProperty('backgroundRightX')) {
                this.setBackgroundRightX(o.backgroundRightX);
            }        

            return this;
        }

        setUpdateTextFlag() {
            if (this.parent) {
                this.parent.updateTextFlag = true;
            }
            return this;
        }

        clone() {
            return new TextStyle(null, this.toJSON());
        }

        copyFrom(sourceTextStyle) {
            this.set(sourceTextStyle.toJSON());
            return this;
        }

        copyTo(targetTextStyle) {
            targetTextStyle.set(this.toJSON());
            return this;
        }

        setBold(value) {
            if (value === undefined) {
                value = true;
            }
            this.bold = value;
            this.setUpdateTextFlag();
            return this;
        }

        setItalic(value) {
            if (value === undefined) {
                value = true;
            }
            this.italic = value;
            this.setUpdateTextFlag();
            return this;
        }

        get fontStyle() {
            if (this.bold && this.italic) {
                return 'bold italic';
            } else if (this.bold) {
                return 'bold';
            } else if (this.italic) {
                return 'italic';
            } else {
                return '';
            }
        }

        setFontSize(fontSize) {
            if (typeof (fontSize) === 'number') {
                fontSize = `${fontSize}px`;
            }
            this.fontSize = fontSize;
            this.setUpdateTextFlag();
            return this;
        }

        setFontFamily(fontFamily) {
            this.fontFamily = fontFamily;
            this.setUpdateTextFlag();
            return this;
        }

        get font() {
            return `${this.fontStyle} ${this.fontSize} ${this.fontFamily}`;
        }

        setColor(color) {
            this.color = GetStyle(color);
            return this;
        }

        get hasFill() {
            return this.color != null;
        }

        setStrokeStyle(stroke, strokeThickness) {
            this.stroke = GetStyle(stroke);
            if (strokeThickness !== undefined) {
                this.strokeThickness = strokeThickness;
            }
            return this;
        }

        setStrokeThickness(strokeThickness) {
            this.strokeThickness = strokeThickness;
            return this;
        }

        get hasStroke() {
            return (this.stroke != null) && (this.strokeThickness > 0);
        }

        setShadowColor(color) {
            this.shadowColor = GetStyle(color);
            return this;
        }

        setShadowOffset(offsetX, offsetY) {
            if (offsetX === undefined) {
                offsetX = 0;
            }
            if (offsetY === undefined) {
                offsetY = 0;
            }

            this.shadowOffsetX = offsetX;
            this.shadowOffsetY = offsetY;
            return this;
        }

        setShadowBlur(blur) {
            if (blur === undefined) {
                blur = 0;
            }

            this.shaodwBlur = blur;
            return this;
        }

        setShadow(color, offsetX, offsetY, blur) {
            this
                .setShadowColor(color)
                .setShadowOffset(offsetX, offsetY)
                .setShadowBlur(blur);
            return this;
        }

        setBackgroundColor(color) {
            this.backgroundColor = GetStyle(color);
            return this;
        }

        get hasBackgroundColor() {
            return this.backgroundColor != null;
        }

        setBackgroundHeight(height) {
            this.backgroundHeight = height;
            return this;
        }

        setBackgroundBottomY(y) {
            this.backgroundBottomY = y;
            return this;
        }

        setBackgroundLeftX(x) {
            this.backgroundLeftX = x;
            return this;
        }

        setBackgroundRightX(x) {
            this.backgroundRightX = x;
            return this;
        }

        setOffsetX(offsetX) {
            if (offsetX === undefined) {
                offsetX = 0;
            }

            this.offsetX = offsetX;
            return this;
        }

        setOffsetY(offsetY) {
            if (offsetY === undefined) {
                offsetY = 0;
            }

            this.offsetY = offsetY;
            return this;
        }

        setOffset(offsetX, offsetY) {
            this
                .setOffsetX(offsetX)
                .setOffsetY(offsetY);
            return this;
        }

        setLeftSpace(space) {
            if (space === undefined) {
                space = 0;
            }

            this.leftSpace = space;
            return this;
        }

        setRightSpace(space) {
            if (space === undefined) {
                space = 0;
            }

            this.rightSpace = space;
            return this;
        }

        setSpace(leftSpace, rightSpace) {
            this
                .setLeftSpace(leftSpace)
                .setRightSpace(rightSpace);
            return this;
        }

        setAlign(align) {
            this.align = align;
            return this;
        }

        syncFont(context) {
            context.font = this.font;
            return this;
        }

        syncStyle(context) {
            context.textBaseline = 'alphabetic';

            var hasFill = this.hasFill;
            var hasStroke = this.hasStroke;
            context.fillStyle = (hasFill) ? this.color : '#000';

            context.strokeStyle = (hasStroke) ? this.stroke : '#000';
            context.lineWidth = (hasStroke) ? this.strokeThickness : 0;
            context.lineCap = 'round';
            context.lineJoin = 'round';

            return this;
        }

        syncShadow(context) {
            if (context.shadowColor != null) {
                context.shadowColor = this.shadowColor;
                context.shadowOffsetX = this.shadowOffsetX;
                context.shadowOffsetY = this.shadowOffsetY;
                context.shadowBlur = this.shadowBlur;
            } else {
                context.shadowColor = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 0;
            }
        }

        getTextMetrics(context, text) {
            this.syncFont(context).syncStyle(context);
            return context.measureText(text);
        }

    }

    var SetFixedSize = function (width, height) {
        if (width === undefined) {
            width = 0;
        }
        if (height === undefined) {
            height = 0;
        }

        if ((this.fixedWidth === width) && (this.fixedHeight === height)) {
            return this;
        }

        this.fixedWidth = width;
        this.fixedHeight = height;
        this.dirty = true;  // -> this.updateTexture();

        this.setCanvasSize(
            (width > 0) ? width : this.width,
            (height > 0) ? height : this.height
        );

        return this;
    };

    var SetPadding = function (key, value) {
        var padding = this.padding;
        var paddingLeft = padding.left,
            paddingRight = padding.right,
            paddingTop = padding.top,
            paddingBottom = padding.bottom;

        SetPadding$1(padding, key, value);

        this.dirty = this.dirty ||
            (paddingLeft != padding.left) ||
            (paddingRight != padding.right) ||
            (paddingTop != padding.top) ||
            (paddingBottom != padding.bottom)
            ;
        return this;
    };

    var GetPadding = function (key) {
        return GetPadding$1(this.padding, key);
    };

    var ModifyTextStyle = function (style) {
        this.textStyle.modify(style);
        return this;
    };

    var ModifyDefaultTextStyle = function (style) {
        this.defaultTextStyle.modify(style);
        return this;
    };

    var ResetTextStyle = function () {
        this.textStyle.copyFrom(this.defaultTextStyle);
        return this;
    };

    var SetTestString = function (testString) {
        this.testString = testString;
        return this;
    };

    const RemoveItem$1 = Phaser.Utils.Array.Remove;

    var RemoveChild = function (child) {
        this.poolManager.free(child);
        RemoveItem$1(this.children, child);
        this.lastAppendedChildren.length = 0;
        this.lastOverChild = null;
        this.dirty = true;
        return this;
    };

    var RemoveChildren = function () {
        this.poolManager.freeMultiple(this.children);
        this.children.length = 0;
        this.lastAppendedChildren.length = 0;
        this.lastOverChild = null;
        this.dirty = true;
        return this;
    };

    const RemoveItem = Phaser.Utils.Array.Remove;

    var PopChild = function (child) {
        RemoveItem(this.children, child);
        this.lastAppendedChildren.length = 0;
        this.lastOverChild = null;
        this.dirty = true;
        return this;
    };

    var ClearContent = function() {
        this.setText();
        return this;
    };

    // const RemoveItem = Phaser.Utils.Array.Remove;

    var AddChild = function (child, index) {
        var areChildren = Array.isArray(child);

        // Remove existed child(s)
        // RemoveItem(this.children, child);

        if ((index === undefined) || (index === this.children.length)) {
            if (areChildren) {
                this.children.push(...child);
            } else {
                this.children.push(child);
            }
        } else {
            if (areChildren) {
                this.children.splice(index, 0, ...child);
            } else {
                this.children.splice(index, 0, child);
            }
        }

        this.lastAppendedChildren.length = 0;
        if (areChildren) {
            this.lastAppendedChildren.push(...child);
        } else {
            this.lastAppendedChildren.push(child);
        }

        return this;
    };

    const CharTypeName = 'text';
    const ImageTypeName = 'image';
    const DrawerTypeName = 'drawer';
    const SpaceTypeName = 'space';
    const CmdTypeName = 'command';

    var IsNewLineChar = function (bob) {
        return (bob.type === CharTypeName) && (bob.text === '\n');
    };

    var IsPageBreakChar = function (bob) {
        return (bob.type === CharTypeName) && (bob.text === '\f');
    };

    var IsChar = function (bob) {
        return (bob.type === CharTypeName);
    };

    class CharData extends RenderBase {
        constructor(
            parent,
            text,
            style
        ) {
            super(parent, CharTypeName);
            this.updateTextFlag = false;
            this.style = new TextStyle(this, style);
            this.setText(text);
        }

        get autoRound() {
            return this.parent.autoRound;
        }

        get offsetX() {
            return this.style.offsetX;
        }

        set offsetX(value) {
            if (this.style) {
                this.style.offsetX = value;
            }
        }

        get offsetY() {
            return this.style.offsetY;
        }

        set offsetY(value) {
            if (this.style) {
                this.style.offsetY = value;
            }
        }

        get leftSpace() {
            return this.style.leftSpace * this.scaleX;
        }

        set leftSpace(value) {
            if (this.style) {
                this.style.leftSpace = value;
            }
            super.leftSpace = value;
        }

        get rightSpace() {
            return this.style.rightSpace * this.scaleX;
        }

        set rightSpace(value) {
            if (this.style) {
                this.style.rightSpace = value;
            }
            super.rightSpace = value;
        }

        get align() {
            return this.style.align;
        }

        set align(value) {
            if (this.style) {
                this.style.align = value;
            }
        }

        modifyStyle(style) {
            this.setDirty(true);
            this.style.modify(style);

            if (this.updateTextFlag) {
                this.updateTextSize();
            }
            return this;
        }

        modifyPorperties(o) {
            if (!o) {
                return this;
            }

            this.modifyStyle(o);
            super.modifyPorperties(o);
            return this;
        }

        setText(text) {
            this.setDirty(this.text != text);
            this.text = text;

            this.updateTextSize();

            return this;
        }

        updateTextSize() {
            var text = this.text;
            // Is new-line, page-break, or empty character
            if ((text === '\n') || (text === '\f') || (text === '')) {
                this.clearTextSize();

            } else {
                var metrics = this.style.getTextMetrics(this.context, this.text);
                this.textWidth = metrics.width;

                var ascent, descent;
                if ('actualBoundingBoxAscent' in metrics) {
                    ascent = metrics.actualBoundingBoxAscent;
                    descent = metrics.actualBoundingBoxDescent;
                } else {
                    ascent = 0;
                    descent = 0;
                }

                this.textHeight = ascent + descent;
                this.ascent = ascent;
                this.descent = descent;
            }

            this.updateTextFlag = false;
            return this;
        }

        clearTextSize() {
            this.textWidth = 0;
            this.textHeight = 0;
            this.ascent = 0;
            this.descent = 0;
            return this;
        }

        copyTextSize(child) {
            this.textWidth = child.textWidth;
            this.textHeight = child.textHeight;
            this.ascent = child.ascent;
            this.descent = child.descent;
            return this;
        }

        get width() {
            return this.textWidth * this.scaleX;
        }

        set width(value) {
            if (this.textWidth > 0) {
                this.scaleX = value / this.textWidth;
            } else {
                this.scaleX = 1;
            }
        }

        get height() {
            return this.textHeight * this.scaleY;
        }

        set height(value) {
            if (this.textHeight > 0) {
                this.scaleY = value / this.textHeight;
            } else {
                this.scaleY = 1;
            }
        }

        get willRender() {
            if (this.textWidth === 0) {
                return false;
            }

            return super.willRender;
        }

        renderContent() {
            var context = this.context;
            var textStyle = this.style;

            if (textStyle.hasBackgroundColor) {
                context.fillStyle = textStyle.backgroundColor;

                var leftX = this.drawTLX + textStyle.backgroundLeftX;
                var rightX = this.drawTRX + textStyle.backgroundRightX;
                var x = leftX;
                var width = rightX - leftX + 1; // Add extra 1 pixel width

                if (width > 0) {
                    var bottomY = textStyle.backgroundBottomY;
                    if (bottomY == null) {
                        bottomY = this.drawBLY;
                    }
                    var height = textStyle.backgroundHeight;
                    if (height == null) {
                        height = bottomY - this.drawTLY;
                    }
                    var y = bottomY - height;

                    context.fillRect(x, y, width, height);
                }
            }

            var hasFill = textStyle.hasFill,
                hasStroke = textStyle.hasStroke;

            if (!hasFill && !hasStroke) {
                return;
            }

            textStyle.syncFont(context).syncStyle(context);
            // textBaseline = 'alphabetic'

            if (hasStroke) {
                textStyle.syncShadow(context);
                context.strokeText(this.text, 0, 0);
            }

            if (hasFill) {
                textStyle.syncShadow(context);
                context.fillText(this.text, 0, 0);
            }
        }

        get drawTLX() { return -this.leftSpace; }
        get drawTLY() { return -this.ascent; }
        get drawBLX() { return -this.leftSpace; }
        get drawBLY() { return this.descent; }
        get drawTRX() { return this.textWidth + this.rightSpace; }
        get drawTRY() { return -this.ascent; }
        get drawBRX() { return this.textWidth + this.rightSpace; }
        get drawBRY() { return this.descent; }

    }

    var CreateCharChild = function (text, style) {
        if (style) {
            this.textStyle.modify(style);
        }

        var child = this.poolManager.allocate(CharTypeName);
        if (child === null) {
            child = new CharData(
                this,               // parent
                text,               // text
                this.textStyle,     // style
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .modifyStyle(this.textStyle)
                .setText(text);
        }

        return child;
    };

    var CreateCharChildren = function (text, style) {
        if (style) {
            this.textStyle.modify(style);
        }

        var children = [];
        for (var i = 0, cnt = text.length; i < cnt; i++) {
            var char = text.charAt(i);
            var child = this.poolManager.allocate(CharTypeName);
            if (child === null) {
                child = new CharData(
                    this,               // parent
                    char,               // text
                    this.textStyle,     // style
                );
            } else {
                child
                    .setParent(this)
                    .setActive()
                    .modifyStyle(this.textStyle)
                    .setText(char);
            }
            // child.modifyPorperties(properties);  // Warning: Will modify text-style twice

            children.push(child);
        }

        return children;
    };

    var AppendText = function (text, style) {
        var children = this.createCharChildren(text, style);
        this.addChild(children);
        return this;
    };

    var SetText = function (text, style) {
        if (text === undefined) {
            text = '';
        }

        this.removeChildren();
        AppendText.call(this, text, style);  // this.appendText might be override

        this.dirty = true;
        return this;
    };

    var InsertText = function (index, text, style) {
        var children = this.createCharChildren(text, style);
        index = this.getCharChildIndex(index, true);
        this.addChild(children, index);

        return this;
    };

    var RemoveText = function (index, length) {
        if (length === undefined) {
            length = 1;
        }

        for (var i = 0; i < length; i++) {
            var childIndex = this.getCharChildIndex(index, true);
            if (childIndex === undefined) {
                break;
            }
            this.removeChild(this.children[childIndex]);
        }
        return this;
    };

    var GetText = function (activeOnly) {
        var text = '';
        this.forEachCharChild(function (child) {
            text += child.text;
        }, undefined, activeOnly);
        return text;
    };

    const CanvasPool = Phaser.Display.Canvas.CanvasPool;

    var DrawFrameToCanvas = function (frame, canvas, x, y, width, height, color, autoRound) {
        if (x === undefined) { x = 0; }
        if (y === undefined) { y = 0; }
        if (width === undefined) { width = frame.cutWidth; }
        if (height === undefined) { height = frame.cutHeight; }
        if (autoRound === undefined) { autoRound = false; }
        if (autoRound) {
            x = Math.round(x);
            y = Math.round(y);
        }

        var context = canvas.getContext('2d', { willReadFrequently: true });

        if (color) {
            // Draw image at tempCanvas

            // Get tempCanvas
            var tempCanvas = CanvasPool.create(null, width, height, Phaser.CANVAS, true);

            var tempContext = tempCanvas.getContext('2d', { willReadFrequently: true });

            tempContext.drawImage(
                frame.source.image,
                frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
                0, 0, width, height
            );

            // Tint-fill
            tempContext.globalCompositeOperation = 'source-in';
            tempContext.fillStyle = color;
            tempContext.fillRect(0, 0, width, height);

            // Draw tempCanvas at context
            context.drawImage(
                tempCanvas,
                0, 0, width, height,
                x, y, width, height
            );

            // Release tempCanvas
            CanvasPool.remove(tempCanvas);
        } else {
            context.drawImage(
                frame.source.image,
                frame.cutX, frame.cutY, frame.cutWidth, frame.cutHeight,
                x, y, width, height
            );
        }
    };

    Phaser.Display.Canvas.CanvasPool;

    class ImageData extends RenderBase {
        constructor(
            parent,
            key, frame
        ) {
            super(parent, ImageTypeName);
            this.setTexture(key, frame);
            this.color = undefined;
        }

        get frameWidth() {
            return (this.frameObj) ? this.frameObj.cutWidth : 0;
        }

        get frameHeight() {
            return (this.frameObj) ? this.frameObj.cutHeight : 0;
        }

        get offsetY() {
            return -this.height;
        }

        set offsetY(value) { }

        get key() {
            return this._key;
        }

        set key(value) {
            this.setDirty(this._key != value);
            this._key = value;
        }

        get frame() {
            return this._frame;
        }

        set frame(value) {
            this.setDirty(this._frame != value);
            this._frame = value;
        }

        setTexture(key, frame) {
            this.key = key;
            this.frame = frame;

            this.frameObj = this.scene.sys.textures.getFrame(key, frame);
            return this;
        }

        get width() {
            return this.frameWidth * this.scaleX;
        }

        set width(value) {
            this.setDirty(this.width !== value);
            this.scaleX = value / this.frameWidth;
        }

        get height() {
            return this.frameHeight * this.scaleY;
        }

        set height(value) {
            this.setDirty(this.height !== value);
            this.scaleY = value / this.frameHeight;
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

        setColor(color) {
            this.color = color;
            return this;
        }

        modifyPorperties(o) {
            if (o.hasOwnProperty('color')) {
                this.setColor(o.color);
            }

            super.modifyPorperties(o);
            return this;
        }

        renderContent() {
            DrawFrameToCanvas(
                this.frameObj, this.canvas,
                0, 0, this.frameWidth, this.frameHeight,
                this.color, false
            );

        }

        get drawTLX() { return -this.leftSpace; }
        get drawTLY() { return 0; }
        get drawBLX() { return -this.leftSpace; }
        get drawBLY() { return this.frameHeight; }
        get drawTRX() { return this.frameWidth + this.rightSpace; }
        get drawTRY() { return 0; }
        get drawBRX() { return this.frameWidth + this.rightSpace; }
        get drawBRY() { return this.frameHeight; }
    }

    var CreateImageChild = function(key, frame, properties) {
        var child = this.poolManager.allocate(ImageTypeName);

        if (child === null) {
            child = new ImageData(
                this,               // parent
                key,
                frame
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setTexture(key, frame);
        }
        child.modifyPorperties(properties);

        return child;
    };

    var AppendImage = function (key, frame, properties) {
        var child = this.createImageChild(key, frame, properties);
        this.addChild(child);

        return this;
    };

    class Drawer extends RenderBase {
        constructor(parent, renderCallback, width, height) {
            super(parent, DrawerTypeName);

            this.setRenderCallback(renderCallback);
            this.setDrawerSize(width, height);
        }

        setRenderCallback(callback) {
            if (callback) {
                this.renderContent = callback.bind(this);
            } else {
                delete this.renderContent;
            }
            return this;
        }

        setDrawerSize(width, height) {
            // Whole canvas
            if (width === true) {
                this.toLocalPosition = false;
                width = undefined;
                height = undefined;
            } else {
                this.toLocalPosition = true;
            }

            if (width === undefined) {
                width = 0;
            }
            if (height === undefined) {
                height = width;
            }

            this.drawerWidth = width;
            this.drawerHeight = height;

            return this;
        }

        onFree() {
            super.onFree();
            this
                .setRenderCallback();
        }

        get width() {
            return this.drawerWidth * this.scaleX;
        }

        set width(value) {
            this.setDirty(this.width !== value);
            this.scaleX = (this.drawerWidth > 0) ? value / this.drawerWidth : 1;
        }

        get height() {
            return this.drawerHeight * this.scaleY;
        }

        set height(value) {
            this.setDirty(this.height !== value);
            this.scaleY = (this.drawerHeight > 0) ? value / this.drawerHeight : 1;
        }

        get offsetY() {
            return -this.height;
        }

        set offsetY(value) { }

        get drawTLX() { return -this.leftSpace; }
        get drawTLY() { return 0; }
        get drawBLX() { return -this.leftSpace; }
        get drawBLY() { return this.drawerHeight; }
        get drawTRX() { return this.drawerWidth + this.rightSpace; }
        get drawTRY() { return 0; }
        get drawBRX() { return this.drawerWidth + this.rightSpace; }
        get drawBRY() { return this.drawerHeight; }

    }

    var CreateDrawerChild = function (renderCallback, width, height) {
        var child = this.poolManager.allocate(DrawerTypeName);

        if (child === null) {
            child = new Drawer(
                this,               // parent
                renderCallback,
                width, height
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setRenderCallback(renderCallback)
                .setDrawerSize(width, height);
        }

        return child;
    };

    var AppendDrawer = function (renderCallback, width, height) {
        var child = this.createDrawerChild(renderCallback, width, height);
        this.addChild(child);

        return this;
    };

    class Space extends RenderBase {
        constructor(
            parent,
            width
        ) {
            super(parent, SpaceTypeName);
            this.setSpaceWidth(width);
        }

        get width() {
            return this.spaceWidth * this.scaleX;
        }

        set width(value) {
            if (this.spaceWidth > 0) {
                this.scaleX = value / this.spaceWidth;
            } else {
                this.scaleX = 1;
            }
        }

        setSpaceWidth(width) {
            this.spaceWidth = width;
            return this;
        }

    }

    var CreateSpaceChild = function (width) {
        var child = this.poolManager.allocate(SpaceTypeName);

        if (child === null) {
            child = new Space(
                this,               // parent
                width
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setSpaceWidth(width);
        }
        return child;
    };

    var AppendSpace = function (width) {
        var child = this.createSpaceChild(width);
        this.addChild(child);

        return this;
    };

    class Command extends Base {
        constructor(parent, name, callback, param, scope) {
            super(parent, CmdTypeName);

            this
                .setName(name)
                .setParameter(param)
                .setCallback(callback, scope);
        }

        setName(name) {
            this.name = name;
            return this;
        }

        setParameter(param) {
            this.param = param;
            return this;
        }

        setCallback(callback, scope) {
            this.callback = callback;
            this.scope = scope;
            return this;
        }

        exec() {
            var result;
            if (this.scope) {
                result = this.callback.call(this.scope, this.param, this.name);
            } else {
                result = this.callback(this.param, this.name);
            }
            return result;
        }

        onFree() {
            super.onFree();
            this
                .setName()
                .setCallback()
                .setParameter();
        }
    }

    var CreateCommandChild = function (name, callback, param, scope) {
        var child = this.poolManager.allocate(CmdTypeName);

        if (child === null) {
            child = new Command(
                this,               // parent
                name,
                callback, param, scope,
            );
        } else {
            child
                .setParent(this)
                .setActive()
                .setName(name)
                .setCallback(callback, scope)
                .setParameter(param);

        }

        return child;
    };

    var AppendCommand = function (name, callback, param, scope) {
        var child = this.createCommandChild(name, callback, param, scope);
        this.addChild(child);

        return this;
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

    var SetWrapConfig = function (config) {
        if (config === undefined) {
            config = {};
        } else if (typeof (config) === 'object') {
            config = DeepClone(config);
        }

        this.wrapConfig = config;
        return this;
    };

    var CreateWrapResultData = function (config) {
        var data = {
            callback: undefined,
            start: 0,  // Next start index
            isLastPage: false,  // Is last page
            maxLines: undefined,
            padding: undefined,
            letterSpacing: undefined,
            hAlign: undefined,
            vAlign: undefined,
            children: [],       // Wrap result
            lines: [],          // Wrap result in lines

            // WordWrap
            maxLineWidth: 0,
            linesHeight: 0,
            lineHeight: undefined,

            // VerticalWrap
            maxLineHeight: 0,
            linesWidth: 0,
            lineWidth: undefined,
        };

        return Object.assign(data, config);
    };

    const WRAPMODE = {
        none: 0,
        word: 1,
        char: 2,
        character: 2,
        mix: 3
    };

    var RE_ASCII = /^[\x00-\x7F]+$/;
    var IsASCIIString = function (s) {
        return RE_ASCII.test(s);
    };

    var GetWord = function (children, startIndex, wrapMode, result) {
        if (result === undefined) {
            result = { word: [], width: 0 };
        }

        result.word.length = 0;

        var isCharWrap = (wrapMode === 2);
        var isMixWrap = (wrapMode === 3);
        var isWordWrap = !isCharWrap && !isMixWrap;

        var endIndex = children.length;
        var currentIndex = startIndex;
        var word = result.word;
        var wordWidth = 0;
        var hasAnyASCIICharacter = false;
        while (currentIndex < endIndex) {
            var child = children[currentIndex];
            // Can't render (command child), put into output directly
            if (!child.renderable) {
                word.push(child);
                currentIndex++;
                continue;
            }

            var text = (child.type === CharTypeName) ? child.text : null;
            // Get image child, a new-line, or page-break
            if ((text === null) || (text === '\n') || (text === '\f')) {
                if (currentIndex === startIndex) { // Single child
                    word.push(child);
                    wordWidth += child.outerWidth;
                }
                break;
            }

            if (isWordWrap) {
                word.push(child);
                wordWidth += child.outerWidth;
                if (text === ' ') { // Word is end with a space character
                    break;
                }

                currentIndex++;

            } else if (isCharWrap) {  // Word only contains 1 character
                word.push(child);
                wordWidth += child.outerWidth;
                // Flush this 1 character
                break;

            } else if (isMixWrap) {
                if (!IsASCIIString(text)) {
                    if (!hasAnyASCIICharacter) {
                        word.push(child);
                        wordWidth += child.outerWidth;

                        // Is next child a space character?
                        var nextChild = children[currentIndex + 1];
                        if (nextChild &&
                            (nextChild.type === CharTypeName) &&
                            (nextChild.text === ' ')) {
                            word.push(nextChild);
                            wordWidth += nextChild.outerWidth;
                            // Include this space character
                        }
                        // Flush this 1 non-ascii character
                        break;

                    } else {
                        // Flush remainder children (all ascii character), except current child
                        break;

                    }
                } else {
                    word.push(child);
                    wordWidth += child.outerWidth;
                    if (text === ' ') { // Word is end with a space character
                        break;
                    }

                    currentIndex++;
                    hasAnyASCIICharacter = true;
                    // Test next child until ...
                }

            }
        }

        result.width = wordWidth;
        return result;
    };

    var GetChildrenAlign = function (children) {
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (child.align !== undefined) {
                return child.align;
            }
        }

        return undefined;
    };

    var OffsetChildren = function (children, offsetX, offsetY) {
        if ((offsetX === 0) && (offsetY === 0)) {
            return;
        }

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.renderable) {
                continue;
            }

            child.x += offsetX;
            child.y += offsetY;
        }
    };

    var AlignLines$1 = function (result, width, height) {
        var hAlign = result.hAlign,
            vAlign = result.vAlign,
            justifyPercentage = result.justifyPercentage;

        var lines = result.lines;
        var offsetX, offsetY;
        for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
            var line = lines[li];
            var lineWidth = line.width,
                children = line.children;

            var lineHAlign = GetChildrenAlign(children);
            if (lineHAlign === undefined) {
                lineHAlign = hAlign;
            }

            switch (lineHAlign) {
                case 0:
                case 'left':
                    offsetX = 0;
                    break;

                case 1:  // center
                case 'center':
                    var remainderWidth = width - lineWidth;
                    offsetX = remainderWidth / 2;
                    break;

                case 2:  // right
                case 'right':
                    var remainderWidth = width - lineWidth;
                    offsetX = remainderWidth;
                    break;

                case 3:
                case 'justify':
                case 'justify-left':
                    var remainderWidth = width - lineWidth;
                    var remainderPercentage = remainderWidth / width;
                    if (remainderPercentage < justifyPercentage) {
                        JustifyChildren(children, remainderWidth);
                        offsetX = 0;
                    } else {
                        offsetX = 0;
                    }
                    break;

                case 4:
                case 'justify-center':
                    var remainderWidth = width - lineWidth;
                    var remainderPercentage = remainderWidth / width;
                    if (remainderPercentage < justifyPercentage) {
                        JustifyChildren(children, remainderWidth);
                        offsetX = 0;
                    } else {
                        offsetX = remainderWidth / 2;
                    }
                    break;

                case 5:
                case 'justify-right':
                    var remainderWidth = width - lineWidth;
                    var remainderPercentage = remainderWidth / width;
                    if (remainderPercentage < justifyPercentage) {
                        JustifyChildren(children, remainderWidth);
                        offsetX = 0;
                    } else {
                        offsetX = remainderWidth;
                    }
                    break;

                default:
                    offsetX = 0;
                    break;
            }

            var linesHeight = result.linesHeight;
            switch (vAlign) {
                case 1: // center
                case 'center':
                    offsetY = (height - linesHeight) / 2;
                    break;

                case 2: // bottom
                case 'bottom':
                    offsetY = height - linesHeight;
                    break;

                default:
                    offsetY = 0;
                    break;
            }

            OffsetChildren(children, offsetX, offsetY);

        }

    };

    var JustifyChildren = function (children, remainderWidth) {
        var offset = remainderWidth / children.length;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.renderable) {
                continue;
            }

            child.x += offset * i;
        }
    };

    var GetDefaultTextHeight = function () {
        var metrics = this.defaultTextStyle.getTextMetrics(this.context, this.testString);
        var ascent, descent;
        if ('actualBoundingBoxAscent' in metrics) {
            ascent = metrics.actualBoundingBoxAscent;
            descent = metrics.actualBoundingBoxDescent;
        } else {
            ascent = 0;
            descent = 0;
        }
        
        Result.ascent = ascent;
        Result.descent = descent;
        Result.height = ascent + descent;

        return Result;
    };

    var Result = {};

    const GetValue$3 = Phaser.Utils.Objects.GetValue;

    var RunWordWrap$1 = function (config) {
        // Parse parameters
        var startIndex = GetValue$3(config, 'start', 0);

        SetPadding$1(this.wrapPadding, GetValue$3(config, 'padding', 0));
        var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
        var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

        // Get lineHeight, maxLines
        var lineHeight = GetValue$3(config, 'lineHeight');
        var ascent = GetValue$3(config, 'ascent', lineHeight);
        var maxLines;
        if (lineHeight === undefined) {
            // Calculate lineHeight
            var useDefaultTextHeight = GetValue$3(config, 'useDefaultTextHeight', false);
            maxLines = GetValue$3(config, 'maxLines', 0);
            if ((this.fixedHeight > 0) && (!useDefaultTextHeight)) {
                var innerHeight = this.fixedHeight - paddingVertical;
                if (maxLines > 0) {
                    // Calculate lineHeight via maxLines, in fixedHeight mode
                    lineHeight = innerHeight / maxLines;
                } else {
                    var textHeightResult = GetDefaultTextHeight.call(this);
                    lineHeight = textHeightResult.height;
                    ascent = textHeightResult.ascent;
                    // Calculate maxLines via (ascent, lineHeight), in fixedHeight mode
                    maxLines = Math.floor((innerHeight - ascent) / lineHeight);
                }
            } else {
                var textHeightResult = GetDefaultTextHeight.call(this);
                lineHeight = textHeightResult.height;
                ascent = textHeightResult.ascent;
            }

        } else {
            // Calculate maxLines
            if (this.fixedHeight > 0) {
                // Calculate maxLines via lineHeight, in fixedHeight mode
                maxLines = GetValue$3(config, 'maxLines');
                if (maxLines === undefined) {
                    var innerHeight = this.fixedHeight - paddingVertical;
                    maxLines = Math.floor(innerHeight / lineHeight);
                }
            } else {
                maxLines = GetValue$3(config, 'maxLines', 0); // Default is show all lines
            }

        }

        // If ascent is undefined, assign to lineHeight
        if (ascent === undefined) {
            ascent = lineHeight;
        }

        var showAllLines = (maxLines === 0);

        var wrapMode = GetValue$3(config, 'wrapMode');
        if (wrapMode === undefined) {
            var charWrap = GetValue$3(config, 'charWrap', false);
            wrapMode = (charWrap) ? 'char' : 'word';
        }
        if (typeof (wrapMode) === 'string') {
            wrapMode = WRAPMODE[wrapMode];
        }

        // Get wrapWidth
        var wrapWidth = GetValue$3(config, 'wrapWidth', undefined);
        if (wrapWidth === undefined) {
            if (this.fixedWidth > 0) {
                wrapWidth = this.fixedWidth - paddingHorizontal;
            } else {
                wrapWidth = Infinity; // No word-wrap
                wrapMode = 0;
            }
        }

        var letterSpacing = GetValue$3(config, 'letterSpacing', 0);

        var hAlign = GetValue$3(config, 'hAlign', 0);
        var vAlign = GetValue$3(config, 'vAlign', 0);
        var justifyPercentage = GetValue$3(config, 'justifyPercentage', 0.25);

        var result = CreateWrapResultData({
            // Override properties
            callback: 'runWordWrap',
            start: startIndex,  // Next start index
            padding: this.wrapPadding,
            letterSpacing: letterSpacing,
            maxLines: maxLines,
            hAlign: hAlign,
            vAlign: vAlign,
            justifyPercentage: justifyPercentage,

            // Specific properties
            ascent: ascent,
            lineHeight: lineHeight,
            wrapWidth: wrapWidth,
            wrapMode: wrapMode,
        });

        // Set all children to inactive
        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setActive(false);
        }

        // Layout children
        wrapWidth += letterSpacing;
        var startX = this.padding.left + this.wrapPadding.left,
            startY = this.padding.top + this.wrapPadding.top + ascent,  // Start(baseline) from ascent, not 0
            x = startX,
            y = startY;
        var remainderWidth = wrapWidth,
            childIndex = startIndex,
            lastChildIndex = children.length;
        var resultChildren = result.children;
        var resultLines = result.lines,
            lastLine = [], lastLineWidth = 0, maxLineWidth = 0;
        var wordResult;
        var isPageBreakChar = false;
        while (childIndex < lastChildIndex) {
            wordResult = GetWord(children, childIndex, wrapMode, wordResult);
            var word = wordResult.word;
            var charCnt = word.length;
            var wordWidth = wordResult.width + (charCnt * letterSpacing);

            childIndex += charCnt;
            // Next line
            var isNewLineChar = IsNewLineChar(word[0]);
            isPageBreakChar = IsPageBreakChar(word[0]);
            var isControlChar = isNewLineChar || isPageBreakChar;
            if ((remainderWidth < wordWidth) || isControlChar) {
                // Add to result
                if (isControlChar) {
                    var char = word[0];
                    char.setActive().setPosition(x, y);
                    resultChildren.push(char);
                    lastLine.push(char);
                }

                // Move cursor
                x = startX;
                y += lineHeight;
                remainderWidth = wrapWidth;
                resultLines.push({ children: lastLine, width: lastLineWidth });
                maxLineWidth = Math.max(maxLineWidth, lastLineWidth);

                lastLineWidth = 0;
                lastLine = [];

                var isPageEnd = isPageBreakChar ||
                    (!showAllLines && (resultLines.length === maxLines)); // Exceed maxLines
                if (isPageEnd) {
                    break;
                } else if (isControlChar) {  // Already add to result
                    continue;
                }
            }
            remainderWidth -= wordWidth;
            lastLineWidth += wordWidth;

            for (var i = 0, cnt = word.length; i < cnt; i++) {
                var child = word[i];
                child.setActive();
                resultChildren.push(child);
                lastLine.push(child);

                if (child.renderable) {
                    child.setPosition(x, y);
                    x += (child.outerWidth + letterSpacing);
                }
            }
        }

        if (lastLine.length > 0) {
            resultLines.push({ children: lastLine, width: lastLineWidth });
            maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
        }

        result.start += resultChildren.length;
        result.isLastPage = (!isPageBreakChar) && (result.start === lastChildIndex);
        result.maxLineWidth = maxLineWidth;
        result.linesHeight = (resultLines.length * lineHeight);

        // Calculate size of game object
        var width = (this.fixedWidth > 0) ? this.fixedWidth : (result.maxLineWidth + paddingHorizontal);
        var height = (this.fixedHeight > 0) ? this.fixedHeight : (result.linesHeight + paddingVertical);

        // Size might be changed after wrapping
        var innerWidth = width - paddingHorizontal;
        var innerHeight = height - paddingVertical;
        AlignLines$1(result, innerWidth, innerHeight);

        // Resize
        this.setCanvasSize(width, height);

        // Set initial position
        for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
            var child = resultChildren[i];
            if (!child.renderable) {
                continue;
            }
            child.x0 = child.x;
            child.y0 = child.y;
        }

        return result;
    };

    const Merge$1 = Phaser.Utils.Objects.Merge;

    var RunWordWrap = function (config) {
        if (config === undefined) {
            config = {};
        }

        return RunWordWrap$1.call(this, Merge$1(config, this.wrapConfig));
    };

    var AlignLines = function (result, width, height) {
        var hAlign = result.hAlign,
            vAlign = result.vAlign;

        var offsetX, offsetY;

        var rtl = result.rtl;
        var lines = result.lines,
            lineWidth = result.lineWidth,
            linesWidth = result.linesWidth;
        switch (hAlign) {
            case 1:  // center
            case 'center':
                offsetX = (width - linesWidth) / 2;
                break;

            case 2:  // right
            case 'right':
                offsetX = width - linesWidth;
                break;

            default:  // left
                offsetX = 0;
                break;
        }
        if (rtl) {
            offsetX += lineWidth;
        }

        for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
            var line = lines[(rtl) ? (lcnt - li - 1) : li];
            var children = line.children;
            var lineHeight = line.height;

            var lineVAlign = GetChildrenAlign(children);
            if (lineVAlign === undefined) {
                lineVAlign = vAlign;
            }

            switch (lineVAlign) {
                case 1: // center
                case 'center':
                    offsetY = (height - lineHeight) / 2;
                    break;

                case 2: // bottom
                case 'bottom':
                    offsetY = height - lineHeight;
                    break;

                default: // top
                    offsetY = 0;
                    break;
            }

            OffsetChildren(children, offsetX, offsetY);

            offsetX += lineWidth;
        }
    };

    const GetValue$2 = Phaser.Utils.Objects.GetValue;

    var RunVerticalWrap$1 = function (config) {
        // Parse parameters
        var startIndex = GetValue$2(config, 'start', 0);

        SetPadding$1(this.wrapPadding, GetValue$2(config, 'padding', 0));
        var paddingVertical = this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;
        var paddingHorizontal = this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;

        var lineWidth = GetValue$2(config, 'lineWidth', undefined);
        var maxLines;
        if (lineWidth === undefined) {
            // Calculate lineWidth via maxLines, in fixedWidth mode
            maxLines = GetValue$2(config, 'maxLines', 0);
            if (this.fixedWidth > 0) {
                var innerWidth = this.fixedWidth - paddingHorizontal;
                lineWidth = innerWidth / maxLines;
            } else {
                lineWidth = 0;
            }
        } else {
            if (this.fixedWidth > 0) {
                // Calculate maxLines via lineWidth, in fixedWidth mode
                maxLines = GetValue$2(config, 'maxLines', undefined);
                if (maxLines === undefined) {
                    var innerWidth = this.fixedWidth - paddingHorizontal;
                    maxLines = Math.floor(innerWidth / lineWidth) + 1;
                }
            } else {
                maxLines = GetValue$2(config, 'maxLines', 0); // Default is show all lines
            }

        }
        var showAllLines = (maxLines === 0);

        // Get fixedCharacterHeight
        var fixedCharacterHeight = GetValue$2(config, 'fixedCharacterHeight', undefined);
        if (fixedCharacterHeight === undefined) {
            var charPerLine = GetValue$2(config, 'charPerLine', undefined);
            if (charPerLine !== undefined) {
                var innerHeight = this.fixedHeight - paddingVertical;
                fixedCharacterHeight = Math.floor(innerHeight / charPerLine);
            }
        }

        // Get wrapHeight
        var wrapHeight = GetValue$2(config, 'wrapHeight', undefined);
        if (wrapHeight === undefined) {
            if (this.fixedHeight > 0) {
                wrapHeight = this.fixedHeight - paddingVertical;
            } else {
                wrapHeight = Infinity; // No word-wrap
            }
        }

        var letterSpacing = GetValue$2(config, 'letterSpacing', 0);

        var rtl = GetValue$2(config, 'rtl', true);
        var hAlign = GetValue$2(config, 'hAlign', rtl ? 2 : 0);
        var vAlign = GetValue$2(config, 'vAlign', 0);

        var result = CreateWrapResultData({
            // Override properties
            callback: 'runVerticalWrap',
            start: startIndex,  // Next start index
            padding: this.wrapPadding,
            letterSpacing: letterSpacing,
            maxLines: maxLines,
            hAlign: hAlign,
            vAlign: vAlign,

            // Specific properties
            lineWidth: lineWidth,
            fixedCharacterHeight: fixedCharacterHeight,
            wrapHeight: wrapHeight,        
            rtl: rtl,
        });

        // Set all children to active
        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            children[i].setActive(false);
        }

        // Layout children
        wrapHeight += letterSpacing;
        var startX = this.padding.left + this.wrapPadding.left,  // Reset x of each character in AlignLines method
            startY = this.padding.top + this.wrapPadding.top,
            x = startX,
            y = startY;
        var remainderHeight = wrapHeight,
            childIndex = startIndex,
            lastChildIndex = children.length;
        var resultChildren = result.children;
        var resultLines = result.lines,
            lastLine = [], lastLineHeight = 0, maxLineHeight = 0;
        while (childIndex < lastChildIndex) {
            // Append non-typeable child directly
            var child = children[childIndex];
            childIndex++;
            if (!child.renderable) {
                child.setActive();
                resultChildren.push(child);
                lastLine.push(child);
                continue;
            }

            var childHeight = ((fixedCharacterHeight !== undefined) ? fixedCharacterHeight : child.height) + letterSpacing;
            // Next line
            var isNewLineChar = IsNewLineChar(child);
            var isPageBreakChar = IsPageBreakChar(child);
            var isControlChar = isNewLineChar || isPageBreakChar;
            if ((remainderHeight < childHeight) || isControlChar) {
                // Add to result
                if (isNewLineChar) {
                    child.setActive().setPosition(x, y).setOrigin(0.5);
                    resultChildren.push(child);
                    lastLine.push(child);
                }

                // Move cursor
                x = startX;
                y = startY;
                remainderHeight = wrapHeight;
                resultLines.push({ children: lastLine, height: lastLineHeight });
                maxLineHeight = Math.max(maxLineHeight, lastLineHeight);

                lastLineHeight = 0;
                lastLine = [];

                var isPageEnd = isPageBreakChar ||
                    (!showAllLines && (resultLines.length === maxLines)); // Exceed maxLines
                if (isPageEnd) {
                    break;
                } else if (isControlChar) {  // Already add to result                
                    continue;
                }
            }
            remainderHeight -= childHeight;
            lastLineHeight += childHeight;

            child.setActive().setPosition(x, y).setOrigin(0.5);
            resultChildren.push(child);
            lastLine.push(child);
            y += childHeight;
        }

        if (lastLine.length > 0) {
            resultLines.push({ children: lastLine, height: lastLineHeight });
            maxLineHeight = Math.max(maxLineHeight, lastLineHeight);
        }

        result.start += resultChildren.length;
        result.isLastPage = (result.start === lastChildIndex);
        result.maxLineHeight = maxLineHeight;
        result.linesWidth = (resultLines.length * lineWidth);

        // Calculate size of game object
        var width = (this.fixedWidth > 0) ? this.fixedWidth : (result.linesWidth + paddingHorizontal);
        var height = (this.fixedHeight > 0) ? this.fixedHeight : (result.maxLineHeight + paddingVertical);

        // Size might be changed after wrapping
        var innerWidth = width - paddingHorizontal;
        var innerHeight = height - paddingVertical;
        AlignLines(result, innerWidth, innerHeight);

        // Resize
        this.setCanvasSize(width, height);

        // Set initial position
        for (var i = 0, cnt = resultChildren.length; i < cnt; i++) {
            var child = resultChildren[i];
            if (!child.renderable) {
                continue;
            }
            child.x0 = child.x;
            child.y0 = child.y;
        }

        return result;
    };

    const Merge = Phaser.Utils.Objects.Merge;

    var RunVerticalWrap = function (config) {
        if (config === undefined) {
            config = {};
        }

        return RunVerticalWrap$1.call(this, Merge(config, this.wrapConfig));
    };

    const GetValue$1 = Phaser.Utils.Objects.GetValue;

    var RunWrap = function (config) {
        var wrapCallback = GetValue$1(this.wrapConfig, 'callback');
        if (!wrapCallback) {
            wrapCallback = GetValue$1(config, 'callback', this.runWordWrap);
        }
        if (typeof (wrapCallback) === 'string') {
            wrapCallback = this[wrapCallback];
        }

        return wrapCallback.call(this, config);
    };

    var SetAlignMethods = {
        setVAlign(align) {
            this.wrapConfig.vAlign = align;
            return this;
        },

        setHAlign(align) {
            this.wrapConfig.hAlign = align;
            return this;
        }
    };

    var SetTextOXYMethods = {
        setTextOX(ox) {
            if (ox === this._textOX) {
                return this;
            }

            this._textOX = ox;
            return this;
        },

        setTextOY(oy) {
            if (oy === this._textOY) {
                return this;
            }

            this._textOY = oy;
            return this;
        },

        setTextOXY(ox, oy) {
            if ((ox === this._textOX) && (oy === this._textOY)) {
                return;
            }

            this._textOX = ox;
            this._textOY = oy;
            return this;
        },

        addTextOX(incX) {
            this.setTextOX(this._textOX + incX);
            return this;
        },

        addTextOY(incY) {
            this.setTextOY(this._textOY + incY);
            return this;
        },

        addTextOXY(incX, incY) {
            this.setTextOXY(this._textOX + incX, this._textOY + incY);
            return this;
        }

    };

    var RenderContent = function () {
        this.clear();

        this.setCanvasSize(this.width, this.height);

        if (this.background.active) {
            this.background.render();
        }

        var child;
        for (var i = 0, cnt = this.children.length; i < cnt; i++) {
            child = this.children[i];
            if (child.active) {
                child.render();
            }
        }

        if (this.innerBounds.active) {
            this.innerBounds.render();
        }
    };

    var ForEachChild = function (callback, scope, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children.filter(function (child) {
            if (activeOnly && !child.active) {
                return false;
            }
            return true;
        });

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, i, children);
            } else {
                isBreak = callback(child, i, children);
            }

            if (isBreak) {
                break;
            }
        }

        return this;
    };

    var ForEachRenderableChild = function (callback, scope, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children.filter(function (child) {
            if (activeOnly && !child.active) {
                return false;
            }
            if (!child.renderable || child.removed) {
                return false;
            }

            return true;
        });

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, i, children);
            } else {
                isBreak = callback(child, i, children);
            }

            if (isBreak) {
                break;
            }
        }

        return this;
    };

    var ForEachCharChild = function (callback, scope, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children.filter(function (child) {
            if (activeOnly && !child.active) {
                return false;
            }
            if (!IsChar(child) || child.removed) {
                return false;
            }

            return true;
        });

        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];

            var isBreak;
            if (scope) {
                isBreak = callback.call(this, child, i, children);
            } else {
                isBreak = callback(child, i, children);
            }

            if (isBreak) {
                break;
            }
        }

        return this;
    };

    var GetChildren = function () {
        return this.children;
    };

    const GetAll = Phaser.Utils.Array.GetAll;

    var GetActiveChildren = function () {
        return GetAll(this.children, 'active', true);
    };

    var GetCharChildren = function (activeOnly, out) {
        if (out === undefined) {
            out = [];
        }

        this.forEachCharChild(function (child) {
            out.push(child);
        }, undefined, activeOnly);

        return out;
    };

    var GetLastAppendedChildren = function () {
        return this.lastAppendedChildren;
    };

    var GetBobCenterPosition = function (bob, offsetX, offsetY, out) {
        if (typeof (offsetX) !== 'number') {
            out = offsetX;
            offsetX = 0;
            offsetY = 0;
        }
        var bobX = bob.drawCenterX + offsetX;
        var bobY = bob.drawCenterY + offsetY;
        return BobPositionToCanvasPosition(bob, bobX, bobY, out);
    };

    const GetDistance = Phaser.Math.Distance.BetweenPointsSquared;

    var GetNearestChild = function (canvasX, canvasY) {
        var pointA = { x: canvasX, y: canvasY };

        var minDistance = Infinity;
        var nearestChild = null;
        this.forEachRenderableChild(function (child) {
            var distance = GetDistance(pointA, GetBobCenterPosition(child, true));
            if (minDistance > distance) {
                minDistance = distance;
                nearestChild = child;
            }
        });

        return nearestChild;
    };

    var GetCharWorldPosition = function (child, offsetX, offsetY, out) {
        if (typeof (child) === 'number') {
            child = this.getCharChild(child, true);
        }

        return GetBobWorldPosition(this, child, offsetX, offsetY, out);
    };

    var SetToMinSize = function () {
        var children = this.children;
        var maxX = 0,
            maxY = 0;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.renderable || !child.active || !child.visible) {
                continue;
            }

            var x0 = (child.x0 !== undefined) ? child.x0 : child.x;
            var y0 = (child.y0 !== undefined) ? child.y0 : child.y;
            maxX = Math.max(maxX, x0);
            maxY = Math.max(maxY, y0);
        }

        var width = maxX + this.padding.left + this.padding.right + this.wrapPadding.left + this.wrapPadding.right;
        var height = maxY + this.padding.top + this.padding.bottom + this.wrapPadding.top + this.wrapPadding.bottom;

        // Ignore fixedWidth, and fixedHeight
        if ((this.width !== width) || (this.height !== height)) {
            this.dirty = true;
            this.setCanvasSize(width, height);
        }
        return this;
    };

    var GetCharChildIndex = function (charIndex, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (activeOnly && !child.active) {
                continue;
            }

            if (IsChar(child) && !child.removed) {
                if (charIndex === 0) {
                    return i;
                } else {
                    charIndex--;
                }
            }
        }

        return undefined;
    };

    var GetCharChild = function (charIndex, activeOnly) {
        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (activeOnly && !child.active) {
                continue;
            }

            if (IsChar(child) && !child.removed) {
                if (charIndex === 0) {
                    return child;
                } else {
                    charIndex--;
                }
            }
        }

        return undefined;
    };

    var GetCharIndex = function (childIndex, activeOnly) {
        if (typeof (childIndex) !== 'number') {
            childIndex = this.children.indexOf(childIndex);
            if (childIndex < 0) {
                return null;
            }
        }

        if (activeOnly === undefined) {
            activeOnly = true;
        }

        var children = this.children;
        if (childIndex >= children.length) {
            childIndex = children.length;
        }
        var charIndex = 0;
        for (var i = 0; i < childIndex; i++) {
            var child = children[i];
            if (activeOnly && !child.active) {
                continue;
            }

            if (IsChar(child) && !child.removed) {
                charIndex++;
            }
        }

        return charIndex;
    };

    var SetChildrenInteractiveEnable = function (enable) {
        if (enable === undefined) {
            enable = true;
        }

        if (this.childrenInteractiveEnable !== enable) {
            this.lastOverChild = null;
        }

        this.childrenInteractiveEnable = enable;

        return this;
    };

    var GetFirstChildContains = function (children, x, y) {
        var children = children;
        for (var i = 0, cnt = children.length; i < cnt; i++) {
            var child = children[i];
            if (!child.active || !child.renderable) {
                continue;
            }
            if (child.contains(x, y)) {
                return child;
            }
        }
        return null;
    };

    var SetChildrenInteractive = function () {
        this
            .on('pointerdown', OnPointerDown, this)

            .on('pointerdown', OnPointerUp, this)

            .on('pointermove', OnPointOverOut, this)
            .on('pointerover', OnPointOverOut, this)
            .on('pointerout', function (pointer, event) {
                OnPointOverOut.call(this, pointer, null, null, event);
            }, this);

        return this;
    };

    var OnPointerDown = function (pointer, localX, localY, event) {
        if (!this.childrenInteractiveEnable) {
            return;
        }

        var child = GetFirstChildContains(this.children, localX, localY);
        if (!child) {
            return;
        }

        this.emit('child.pointerdown', child, pointer, localX, localY, event);
    };

    var OnPointerUp = function (pointer, localX, localY, event) {
        if (!this.childrenInteractiveEnable) {
            return;
        }

        var child = GetFirstChildContains(this.children, localX, localY);
        if (!child) {
            return;
        }

        this.emit('child.pointerup', child, pointer, localX, localY, event);
    };

    var OnPointOverOut = function (pointer, localX, localY, event) {
        if (!this.childrenInteractiveEnable) {
            return;
        }

        if (localX === null) {  // Case of pointerout
            if (this.lastOverChild !== null) {
                this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
                this.lastOverChild = null;
            }
            return;
        }

        var child = GetFirstChildContains(this.children, localX, localY);
        if (child === this.lastOverChild) {
            return;
        }

        if (this.lastOverChild !== null) {
            this.emit('child.pointerout', this.lastOverChild, pointer, localX, localY, event);
        }

        if (child !== null) {
            this.emit('child.pointerover', child, pointer, localX, localY, event);
        }

        this.lastOverChild = child;
    };

    const GameObject = Phaser.GameObjects.GameObject;

    var SetInteractive = function (hitArea, hitAreaCallback, dropZone) {
        var isInteractived = !!this.input;

        GameObject.prototype.setInteractive.call(this, hitArea, hitAreaCallback, dropZone);

        if (!isInteractived) {
            SetChildrenInteractive.call(this);
        }

        return this;
    };

    const BringToTop = Phaser.Utils.Array.BringToTop;
    const SendToBack = Phaser.Utils.Array.SendToBack;
    const MoveUp = Phaser.Utils.Array.MoveUp;
    const MoveDown = Phaser.Utils.Array.MoveDown;
    const MoveAbove = Phaser.Utils.Array.MoveAbove;
    const MoveBelow = Phaser.Utils.Array.MoveBelow;

    var MoveChildMethods = {
        moveChildToFist(child) {
            SendToBack(this.children, child);
            return this;
        },

        moveChildToLast(child) {
            BringToTop(this.children, child);
            return this;
        },
        movechildUp(child) {
            MoveUp(this.children, child);
            return this;
        },

        movechildDown(child) {
            MoveDown(this.children, child);
            return this;
        },

        movechildAbove(child, baseChild) {
            MoveAbove(this.children, child, baseChild);
            return this;
        },

        movechildBelow(child, baseChild) {
            MoveBelow(this.children, child, baseChild);
            return this;
        },

    };

    var BackgroundMethods = {
        setBackgroundColor(color, color2, isHorizontalGradient) {
            this.background.setColor(color, color2, isHorizontalGradient);
            return this;
        },

        setBackgroundStroke(color, lineWidth) {
            this.background.setStroke(color, lineWidth);
            return this;
        },

        setBackgroundCornerRadius(radius, iteration) {
            this.background.setCornerRadius(radius, iteration);
            return this;
        }
    };

    var InnerBoundsMethods = {
        setInnerBoundsColor(color, color2, isHorizontalGradient) {
            this.innerBounds.setColor(color, color2, isHorizontalGradient);
            return this;
        },

        setInnerBoundsStroke(color, lineWidth) {
            this.innerBounds.setStroke(color, lineWidth);
            return this;
        },
    };

    var Methods = {
        setFixedSize: SetFixedSize,
        setPadding: SetPadding,
        getPadding: GetPadding,
        modifyTextStyle: ModifyTextStyle,
        modifyDefaultTextStyle: ModifyDefaultTextStyle,
        resetTextStyle: ResetTextStyle,
        setTestString: SetTestString,

        removeChild: RemoveChild,
        removeChildren: RemoveChildren,
        popChild: PopChild,
        clearContent: ClearContent,
        addChild: AddChild,
        createCharChild: CreateCharChild,
        createCharChildren: CreateCharChildren,
        setText: SetText,
        appendText: AppendText,
        insertText: InsertText,
        removeText: RemoveText,
        getText: GetText,
        createImageChild: CreateImageChild,
        appendImage: AppendImage,
        createDrawerChild: CreateDrawerChild,
        appendDrawer: AppendDrawer,
        createSpaceChild: CreateSpaceChild,
        appendSpace: AppendSpace,
        createCommandChild: CreateCommandChild,
        appendCommand: AppendCommand,

        setWrapConfig: SetWrapConfig,
        runWordWrap: RunWordWrap,
        runVerticalWrap: RunVerticalWrap,
        runWrap: RunWrap,
        renderContent: RenderContent,

        forEachChild: ForEachChild,
        forEachRenderableChild: ForEachRenderableChild,
        forEachCharChild: ForEachCharChild,
        getChildren: GetChildren,
        getActiveChildren: GetActiveChildren,
        getCharChildren: GetCharChildren,
        getLastAppendedChildren: GetLastAppendedChildren,
        getNearestChild: GetNearestChild,
        getCharWorldPosition: GetCharWorldPosition,

        setToMinSize: SetToMinSize,

        getCharChildIndex: GetCharChildIndex,
        getCharChild: GetCharChild,
        getCharIndex: GetCharIndex,


        setChildrenInteractiveEnable: SetChildrenInteractiveEnable,
        setInteractive: SetInteractive,
    };

    Object.assign(
        Methods,

        MoveChildMethods,
        BackgroundMethods,
        InnerBoundsMethods,
        SetAlignMethods,
        SetTextOXYMethods,

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

    const GetFastValue = Phaser.Utils.Objects.GetFastValue;

    var Pools = {};
    class PoolManager {
        constructor(config) {
            this.pools = GetFastValue(config, 'pools', Pools);
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

        freeMultiple(arr) {
            if (!this.pools) {
                return this;
            }

            for (var i = 0, cnt = arr.length; i < cnt; i++) {
                this.free(arr[i]);
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

    const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
    const GetValue = Phaser.Utils.Objects.GetValue;

    class DynamicText extends Canvas {
        constructor(scene, x, y, fixedWidth, fixedHeight, resolution, config) {
            if (IsPlainObject(x)) {
                config = x;
                x = GetValue(config, 'x', 0);
                y = GetValue(config, 'y', 0);
                fixedWidth = GetValue(config, 'width', 0);
                fixedHeight = GetValue(config, 'height', 0);
                resolution = GetValue(config, 'resolution', 1);
            } else if (IsPlainObject(fixedWidth)) {
                config = fixedWidth;
                fixedWidth = GetValue(config, 'width', 0);
                fixedHeight = GetValue(config, 'height', 0);
                resolution = GetValue(config, 'resolution', 1);
            } else if (IsPlainObject(resolution)) {
                config = resolution;
                resolution = GetValue(config, 'resolution', 1);
            }

            var width = (fixedWidth === 0) ? 1 : fixedWidth;
            var height = (fixedHeight === 0) ? 1 : fixedHeight;
            super(scene, x, y, width, height, resolution);
            this.type = 'rexDynamicText';
            this.autoRound = true;
            this.padding = SetPadding$1();
            this.wrapPadding = SetPadding$1();

            var textStyleConfig = GetValue(config, 'style', undefined);
            this.defaultTextStyle = new TextStyle(null, textStyleConfig);
            this.textStyle = this.defaultTextStyle.clone();
            this.setTestString(GetValue(config, 'testString', '|MÉqgy'));

            this._textOX = 0;
            this._textOY = 0;
            this.background = new Background(this, GetValue(config, 'background', undefined));
            this.innerBounds = new InnerBounds(this, GetValue(config, 'innerBounds', undefined));
            this.children = [];
            this.lastAppendedChildren = [];
            this.lastOverChild = null;
            this.poolManager = new PoolManager(config);

            this.setFixedSize(fixedWidth, fixedHeight);
            this.setPadding(GetValue(config, 'padding', 0));
            this.setWrapConfig(GetValue(config, 'wrap', undefined));
            this.setChildrenInteractiveEnable(GetValue(config, 'childrenInteractive', false));

            var text = GetValue(config, 'text', undefined);
            if (text) {
                this.setText(text);
            }
        }

        updateTexture() {
            super.updateTexture(function () {
                this.renderContent();
            }, this);
            return this;
        }

        get text() {
            return this.getText(true);
        }

        set text(value) {
            this.setText(value);
        }

        setSize(width, height) {
            this.setFixedSize(width, height);
            return this;
        }

        get textOX() {
            return this._textOX;
        }

        set textOX(value) {
            this.setTextOX(value);
        }

        get textOY() {
            return this._textOY;
        }

        set textOY(value) {
            this.setTextOY(value);
        }
    }

    Object.assign(
        DynamicText.prototype,
        Methods
    );

    return DynamicText;

}));
