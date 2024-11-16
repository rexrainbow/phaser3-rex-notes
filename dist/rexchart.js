(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.rexchart = factory());
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

    const CanvasPool = Phaser.Display.Canvas.CanvasPool;
    const GameObject = Phaser.GameObjects.GameObject;
    const UUID = Phaser.Utils.String.UUID;

    let Canvas$1 = class Canvas extends GameObject {
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
            this.canvas = CanvasPool.create(this, width, height);
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
            CanvasPool.remove(this.canvas);

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
    };

    const Components = Phaser.GameObjects.Components;
    Phaser.Class.mixin(Canvas$1,
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

    var LoadImageMethods = {
        loadFromURL(url, callback) {
            var self = this;
            var img = new Image();
            img.onload = function () {
                if ((self.width !== img.width) || (self.height !== img.height)) {
                    self.resize(img.width, img.height);
                } else {
                    self.clear();
                }
                self.context.drawImage(img, 0, 0);
                self.updateTexture();

                if (callback) {
                    callback();
                }

                img.onload = null;
                img.src = '';
                img.remove();
            };
            img.src = url;
            return this;
        },

        loadFromURLPromise(url) {
            var self = this;
            return new Promise(function (resolve, reject) {
                self.loadFromURL(url, resolve);
            });
        },

        loadFromFile(file, callback) {
            var url = URL.createObjectURL(file);
            this.loadFromURL(url, function () {
                URL.revokeObjectURL(url);
                if (callback) {
                    callback();
                }
            });

            return this;
        },

        loadFromFilePromise(file) {
            var self = this;
            return new Promise(function (resolve, reject) {
                self.loadFromFile(file, resolve);
            });
        }
    };

    class Canvas extends Canvas$1 {

    }

    Object.assign(
        Canvas.prototype,
        LoadImageMethods,
    );

    var SetChart = function (config) {
        if (!window.Chart) {
            var msg = `Can not find chartjs! Load chartjs in preload stage.
scene.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/Chart.min.js');`;
            console.error(msg);
            return this;
        }

        if (this.chart) {
            this.chart.destroy();        
        }
        this.chart = new Chart(this.context, FillConfig(this, config));
        return this;
    };

    var FillConfig = function (canvas, config) {
        // Get options
        if (config === undefined) {
            config = {};
        }
        if (config.options === undefined) {
            config.options = {};
        }
        var options = config.options;

        // Fill options
        options.responsive = false;
        options.maintainAspectRatio = false;
        if (!options.hasOwnProperty('devicePixelRatio')) {
            options.devicePixelRatio = 1;
        }

        // Get animation config
        var noAnimation = false;
        if (options.animation === undefined) {
            options.animation = {};
        } else if (options.animation === false) {
            noAnimation = true;
            options.animation = {};
        }
        var animationConfig = options.animation;

        // Fill animation config
        if (noAnimation) {
            animationConfig.duration = 0;
        }

        var onProgress = animationConfig.onProgress;
        animationConfig.onProgress = function (animation) {
            if (onProgress) {
                onProgress(animation);
            }
            canvas.needRedraw();
        };

        var onComplete = animationConfig.onComplete;
        animationConfig.onComplete = function (animation) {
            if (onComplete) {
                onComplete(animation);
            }
            canvas.needRedraw();
        };
        return config;
    };

    var GetChartDataset = function (datasetIndex) {
        if (this.chart === undefined) {
            return undefined;
        }

        if (typeof (datasetIndex) === 'string') {
            var datasets = this.chart.data.datasets, dataset;
            for (var i = 0, cnt = datasets.length; i < cnt; i++) {
                dataset = datasets[i];
                if (dataset.label === datasetIndex) {
                    return dataset;
                }
            }
        } else {
            return this.chart.data.datasets[datasetIndex];
        }

        return undefined;
    };

    var GetChartData = function (datasetIndex, dataIndex) {
        var dataset = this.getChartDataset(datasetIndex);
        if (dataset === undefined) {
            return undefined;
        }
        if (typeof (dataIndex) === 'string') {
            var labels = this.chart.data.labels;
            dataIndex = labels.indexOf(dataIndex);
            if (dataIndex === -1) {
                return undefined;
            }
        }
        return dataset.data[dataIndex];
    };

    var SetChartData = function (datasetIndex, dataIndex, value) {
        if (this.chart === undefined) {
            return this;
        }

        var dataset = this.getChartDataset(datasetIndex);
        if (typeof (dataIndex) === 'string') {
            var labels = this.chart.data.labels;
            dataIndex = labels.indexOf(dataIndex);
            if (dataIndex === -1) {
                return this;
            }
        }
        dataset.data[dataIndex] = value;
        return this;
    };

    var UpdateChart = function () {
        if (this.chart === undefined) {
            return this;
        }
        this.chart.update();
        return this;
    };

    // This plugin does not contain chart.js
    // Load chart.js in preload stage -
    // scene.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/Chart.min.js');

    let Chart$1 = class Chart extends Canvas {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height);
            this.type = 'rexChart';
            this.chart = undefined;

            if (config !== undefined) {
                this.setChart(config);
            }
        }

        destroy(fromScene) {
            //  This Game Object has already been destroyed
            if (!this.scene) {
                return;
            }
            if (this.chart) {
                this.chart.destroy();
                this.chart = undefined;
            }
            super.destroy(fromScene);
        }

        resize(width, height) {
            if ((width === this.width) && (height === this.height)) {
                return this;
            }

            super.resize(width, height);

            if (this.chart) {
                var chart = this.chart;
                chart.height = this.canvas.height;
                chart.width = this.canvas.width;
                chart.aspectRatio = (chart.height) ? chart.width / chart.height : null;
                chart.update();
            }
            return this;
        }
    };

    var methods = {
        setChart: SetChart,
        getChartDataset: GetChartDataset,
        getChartData: GetChartData,
        setChartData: SetChartData,
        updateChart: UpdateChart,
    };
    Object.assign(
        Chart$1.prototype,
        methods
    );

    return Chart$1;

}));
