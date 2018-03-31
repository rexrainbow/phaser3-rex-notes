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
        var img = this.add.image(300, 300, 'arrow');
        img.drag = new DragPlugin(img);

        img.on('pointerdown', img.drag.dragend, img.drag);
        img.on('dragend', function(){console.log('dragend')});
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