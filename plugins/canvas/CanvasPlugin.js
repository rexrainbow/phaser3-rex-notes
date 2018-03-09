// copy from Phaser.GameObjects.Text

import Phaser from 'phaser';
import Render from './Render.js';
import GameObject from './../utils/system/GameObject.js'; // TODO:
import BuildGameObject from './../utils/system/BuildGameObject';  // TODO:

const CanvasPool = Phaser.Display.Canvas.Pool;
const Components = Phaser.GameObjects.Components;
// const GameObject = Phaser.GameObjects.GameObject;
const GetAdvancedValue = Phaser.Utils.GetAdvancedValue;

var Canvas = new Phaser.Class({

    Extends: GameObject,

    Mixins: [
        Components.Alpha,
        Components.BlendMode,
        Components.Depth,
        Components.Flip,
        Components.GetBounds,
        Components.Origin,
        Components.Pipeline,
        Components.ScaleMode,
        Components.ScrollFactor,
        Components.Size,
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

            this.setPosition(x, y);
            this.initPipeline('TextureTintPipeline');

            this.canvas = CanvasPool.create(this, width, height);
            this.context = this.canvas.getContext('2d');

            this.resolution = 1; // TODO

            this.width = width;
            this.height = height;
            this.canvasTexture = null;

            this.dirty = false;

            var self = this;
            scene.sys.game.renderer.onContextRestored(function () {
                self.canvasTexture = null;
                self.dirty = true;
            });
        },

    getCanvas: function (readOnly) {
        if (!readOnly) {
            this.dirty = true;
        }
        return this.canvas;
    },

    needRedraw: function () {
        this.dirty = true;
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
        }

        if (height === undefined) {
            height = srcCanvas.height;
        }


        if (sys.textures.exists(key)) {
            texture = sys.textures.get(key);
        } else {
            texture = sys.textures.createCanvas(key, srcCanvas.width, srcCanvas.height);
        }

        var destCanvas = texture.getSourceImage();
        if (destCanvas.width !== width) {
            destCanvas.width = width;
        }
        if (destCanvas.height !== height) {
            destCanvas.height = height;
        }

        var destCtx = destCanvas.getContext('2d');
        destCtx.drawImage(srcCanvas, x, y, width, height);
        if (sys.game.renderer.gl && texture) {
            texture.source[0].glTexture = sys.game.renderer.canvasToTexture(destCanvas, texture.source[0].glTexture, true, 0);
        }

        return this;
    }

});

Phaser.GameObjects.GameObjectFactory.register('rexCanvas', function (x, y, width, height)
{
    return this.displayList.add(new Canvas(this.scene, x, y, width, height));
});

Phaser.GameObjects.GameObjectCreator.register('rexCanvas', function (config)
{
    var width = GetAdvancedValue(config, 'width', 256);
    var height = GetAdvancedValue(config, 'height', 256);
    var canvas = new Canvas(this.scene, 0, 0, width, height)
    BuildGameObject(this.scene, canvas, config);
    return canvas;
});

export default Canvas;