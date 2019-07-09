// copy from Phaser.GameObjects.Text

import Render from './CanvasRender.js';
import CanvasMethods from './CanvasMethods.js';
import TextureMethods from './TextureMethods.js';

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
        Components.ScrollFactor,
        Components.Tint,
        Components.Transform,
        Components.Visible,
        Render,
        CanvasMethods,
        TextureMethods,
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
                width = 1;
            }
            if (height === undefined) {
                height = 1;
            }

            GameObject.call(this, scene, 'rexCanvas');

            this.renderer = scene.sys.game.renderer;

            this.resolution = scene.sys.game.config.resolution;
            this.canvas = CanvasPool.create(this, this.resolution * width, this.resolution * height);
            this.context = this.canvas.getContext('2d');
            this.dirty = false;

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

            if (this.renderer && this.renderer.gl) {
                //  Clear the default 1x1 glTexture, as we override it later
                this.renderer.deleteTexture(this.frame.source.glTexture);
                this.frame.source.glTexture = null;
            }

            if (scene.sys.game.config.renderType === Phaser.WEBGL) {
                scene.sys.game.renderer.onContextRestored(function () {
                    this.dirty = true;
                }, this);
            }

            this.dirty = true;
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

    preDestroy: function () {
        CanvasPool.remove(this.canvas);
    },

    resize: function (width, height) {
        if ((this.width === width) && (this.height === height)) {
            return this;
        }

        this
            .setSize(width, height)
            .updateDisplayOrigin();

        width *= this.resolution;
        height *= this.resolution;
        width = Math.max(Math.ceil(width), 1);
        height = Math.max(Math.ceil(height), 1);
        this.canvas.width = width;
        this.canvas.height = height;

        this.dirty = true;
        return this;
    }
});

export default Canvas;