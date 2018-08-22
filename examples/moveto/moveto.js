'use strict'

import MoveToPlugin from 'rexPlugins/moveto-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var dot = this.add.graphics()
            .fillStyle(0xffffff, 1)
            .fillPoint(0, 0, 20)
            .setPosition(100, 100);
        dot.moveTo = this.plugins.get('rexMoveTo').add(dot, {
            speed: 400
        }).on('complete', function(){
            console.log('Reach target');
        })
        this.input.on('pointerdown', function (pointer) {
            var touchX = pointer.x;
            var touchY = pointer.y;
            dot.moveTo.moveTo(touchX, touchY);
        });
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexMoveTo',
            plugin: MoveToPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);