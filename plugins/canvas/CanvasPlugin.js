// copy from Phaser.GameObjects.Text

import Render from './CanvasRender.js';

const CanvasPool = Phaser.Display.Canvas.Pool;
const Components = Phaser.GameObjects.Components;
const GameObject = Phaser.GameObjects.GameObject;
const BuildGameObject = Phaser.GameObjects.BuildGameObject;
const GetValue = Phaser.Utils.Objects.GetValue;

var Canvas = new Phaser.Class({

    Extends: GameObject,

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.ComputedSize,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
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
                width = 256;
            }
            if (height === undefined) {
                height = 256;
            }

            GameObject.call(this, scene, 'Canvas');

            this.resolution = 1;
            this.canvas = CanvasPool.create(this, this.resolution * width, this.resolution * height);
            this.context = this.canvas.getContext('2d');
            this.canvasTexture = null;
            this.dirty = true;

            this.setPosition(x, y);
            this.setSize(width, height);
            this.setOrigin();
            this.initPipeline('TextureTintPipeline');

            if (scene.sys.game.config.renderType === Phaser.WEBGL) {
                scene.sys.game.renderer.onContextRestored(function () {
                    this.canvasTexture = null;
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

    generateTexture: function (key, x, y, width, height) {
        var srcCanvas = this.canvas;
        var sys = this.scene.sys;
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
        destCtx.clearRect(0, 0, width, height)
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (sys.game.renderer.gl && texture) {
            texture.source[0].glTexture = sys.game.renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
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
        destCtx.clearRect(0, 0, destCanvas.width, destCanvas.height);
        destCtx.drawImage(srcCanvas, 0, 0, destCanvas.width, destCanvas.height);
        this.dirty = true;

        if (resize) {            
            this.setSize(destCanvas.width/this.resolution, destCanvas.height/this.resolution);
        }
        return this;
    }

});

Phaser.GameObjects.GameObjectFactory.register('rexCanvas', function (x, y, width, height) {
    return this.displayList.add(new Canvas(this.scene, x, y, width, height));
});

Phaser.GameObjects.GameObjectCreator.register('rexCanvas', function (config) {
    var width = GetValue(config, 'width', 256);
    var height = GetValue(config, 'height', 256);
    var canvas = new Canvas(this.scene, 0, 0, width, height);
    BuildGameObject(this.scene, canvas, config);
    var fillColor = GetValue(config, 'fill', null);
    canvas.fill(fillColor);
    return canvas;
});

export default Canvas;