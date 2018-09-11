'use strict'

import FlashPlugin from 'rexPlugins/flash-plugin.js';

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
            .fillPoint(0, 0, 40)
            .setPosition(100, 100);
        dot.flash = this.plugins.get('rexFlash').add(dot, {
            duration: 1000,
            repeat: 2
        }).on('complete', function () {
            console.log('complete');
        })
        this.input.on('pointerdown', function (pointer) {
            dot.flash.flash();
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
            key: 'rexFlash',
            plugin: FlashPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);