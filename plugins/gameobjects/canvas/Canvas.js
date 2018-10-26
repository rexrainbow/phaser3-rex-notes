// copy from Phaser.GameObjects.Text

import Render from './CanvasRender.js';

const CanvasPool = Phaser.Display.Canvas.CanvasPool;
const Components = Phaser.GameObjects.Components;
const GameObject = Phaser.GameObjects.GameObject;

var Canvas = new Phaser.Class({

    Extends: GameObject,

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Crop,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Mask,
        Components.Origin,
        Components.Pipeline,
        Components.ScaleMode,
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render
    ],

    initialize:

        function Canvas(scene, x, y, width, height) {
            if (x === undefined) {
                x = 0;
            }
            if (y === undefined) {
                y = 0;
            }
            if (width === undefined) {
                width = 0;
            }
            if (height === undefined) {
                height = 0;
            }

            GameObject.call(this, scene, 'rexCanvas');

            this.renderer = scene.sys.game.renderer;

            this.resolution = scene.sys.game.config.resolution;
            this.canvas = CanvasPool.create(this, this.resolution * width, this.resolution * height);
            this.context = this.canvas.getContext('2d');
            this.dirty = true;

            this.setPosition(x, y);
            this.setSize(width, height);
            this.setOrigin(0.5, 0.5);
            this.initPipeline();

            this._crop = this.resetCropObject();

            //  Create a Texture for this Text object
            this.texture = scene.sys.textures.addCanvas(null, this.canvas, true);

            //  Get the frame
            this.frame = this.texture.get();

            //  Set the resolution
            this.frame.source.resolution = this.resolution;

            if (this.renderer.gl) {
                if ((width > 0) && (height > 0)) {
                    this.updateTexture();
                } else {
                    //  Clear the default glTexture, as we override it later
                    this.renderer.deleteTexture(this.frame.source.glTexture);
                    this.frame.source.glTexture = null;
                }
            }

            if (scene.sys.game.config.renderType === Phaser.WEBGL) {
                scene.sys.game.renderer.onContextRestored(function () {
                    this.dirty = true;
                }, this);
            }
        },

    getCanvas: function (readOnly) {
        if (!readOnly) {
            this.dirty = true;
        }
        return this.canvas;
    },

    needRedraw: function () {
        this.dirty = true;
        return this;
    },

    clear: function () {
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.dirty = true;
        return this;
    },

    fill: function (color) {
        var canvas = this.canvas;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.dirty = true;
        return this;
    },

    preDestroy: function () {
        CanvasPool.remove(this.canvas);
    },

    updateTexture: function (callback, scope) {
        if (callback) {
            if (scope) {
                callback.call(scope, this.canvas, this.context);
            } else {
                callback(this.canvas, this.context);
            }
        }
        if (this.renderer.gl) {
            this.frame.source.glTexture = this.renderer.canvasToTexture(this.canvas, this.frame.source.glTexture, true);
            this.frame.glTexture = this.frame.source.glTexture;
        }
        this.dirty = false;
        return this;
    },

    generateTexture: function (key, x, y, width, height) {
        var srcCanvas = this.canvas;
        var sys = this.scene.sys;
        var renderer = sys.game.renderer;
        var texture;

        if (x === undefined) {
            x = 0;
        }

        if (y === undefined) {
            y = 0;
        }

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


        if (sys.textures.exists(key)) {
            texture = sys.textures.get(key);
        } else {
            texture = sys.textures.createCanvas(key, width, height);
        }

        var destCanvas = texture.getSourceImage();
        if (destCanvas.width !== width) {
            destCanvas.width = width;
        }
        if (destCanvas.height !== height) {
            destCanvas.height = height;
        }

        var destCtx = destCanvas.getContext('2d');
        destCtx.clearRect(0, 0, width, height);
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (renderer.gl && texture) {
            texture.source[0].glTexture = renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
        }

        return this;
    },

    loadTexture: function (key, resize) {
        var sys = this.scene.sys;
        if (!sys.textures.exists(key)) {
            return this;
        }

        if (resize === undefined) {
            resize = true;
        }
        var srcCanvas = sys.textures.get(key).getSourceImage();
        var srcCtx = srcCanvas.getContext('2d');
        var destCanvas = this.canvas;
        if (destCanvas.width !== srcCanvas.width) {
            destCanvas.width = srcCanvas.width;
        }
        if (destCanvas.height !== srcCanvas.height) {
            destCanvas.height = srcCanvas.height;
        }
        var destCtx = destCanvas.getContext('2d');
        destCtx.clearRect(0, 0, destCanvas.width, destCanvas.height);
        destCtx.drawImage(srcCanvas, 0, 0, destCanvas.width, destCanvas.height);
        this.updateTexture();

        if (resize) {
            this.setSize(destCanvas.width / this.resolution, destCanvas.height / this.resolution);
        }
        return this;
    },

    resize: function (width, height) {
        this.canvas.width = this.resolution * width;
        this.canvas.height = this.resolution * height;
        this.setSize(width, height);
        this.updateDisplayOrigin();
        return this;
    }
});

export default Canvas;