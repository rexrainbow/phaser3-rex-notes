'use strict'

import Phaser from 'phaser';

var prefix = '#rex-canvas-', sn = 0;
class Canvas extends Phaser.GameObjects.Image {
    constructor(scene, x, y, width, height) {
        var key;
        if (typeof (width) === 'string') {
            key = width;
        } else {
            key = getAssetName();
            while (scene.textures.exists(key)) {
                key = getAssetName();
            }
            var texture = scene.textures.createCanvas(key, width, height);
        }
        super(scene, x, y, key);
        this.canvas = texture.getSourceImage();
        this.dirty = false;
    }

    getCanvas(readOnly) {
        if (readOnly === undefined) { readOnly = false; }
        this.dirty |= (!readOnly);
        return this.canvas;
    }

    getTextureKey() {
        return this.texture.key;
    }

    updateGLTexture() {
        var renderer = this.scene.sys.game.renderer;
        var texture = this.texture;
        texture.source[0].glTexture = renderer.canvasToTexture(this.canvas, texture.source[0].glTexture, true, 0);
    }

    preUpdate() {
        if (this.dirty) {
            this.updateGLTexture();
            this.dirty = false;
        }
    }
}

var getAssetName = function () {
    var name = prefix + sn.toString();
    sn++;
    return name;
}

export default Canvas;