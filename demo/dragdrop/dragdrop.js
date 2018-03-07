'use strict'

import DragDropPlugin from './../../plugins/dragdrop-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'demo'
        })
    }

    preload() {
        this.load.image('mushroom', 'assets/images/mushroom.png');
    }

    create() {
        var inst = this.add.image(400, 300, 'mushroom');
        inst.dragdrop = new DragDropPlugin(inst, {
            // enable: true,
            axis: 1,
            rotation: Phaser.Math.DegToRad(45)
        });
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