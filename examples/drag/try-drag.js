'use strict'

import DragPlugin from './../../plugins/drag-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('arrow', 'assets/images/arrow.png');
    }

    create() {
        this.input.on('pointerdown', this.createImg, this);
    }

    createImg(pointer) {
        var img = this.add.image(pointer.x, pointer.y, 'arrow');
        img.drag = new DragPlugin(img);
        img.drag.drag();

        img.on('dragend', img.destroy, img);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);