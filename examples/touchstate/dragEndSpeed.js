'use strict'

import TouchStatePlugin from 'rexPlugins/touchstate-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {}

    create() {
        var bg = this.add.graphics()
            .fillStyle(0x333333, 1)
            .fillRect(0, 0, 800, 600)
            .setInteractive(new Phaser.Geom.Rectangle(0, 0, 800, 600),
                Phaser.Geom.Rectangle.Contains);
        var txtSpeed = this.add.text(0, 0, '-');
        var touchState = this.plugins.get('rexTouchState').add(bg, {
                traceDragEndSpeed: true
            })
            .on('touchstart', function (pointer) {
                txtSpeed.setText('-');
            })
            .on('touchend', function (pointer) {
                txtSpeed.setText(touchState.speed + '\n' +
                    Math.floor(touchState.preX) + ',' +
                    Math.floor(touchState.preY) + ' -> ' +
                    Math.floor(touchState.x) + ',' +
                    Math.floor(touchState.y));
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
            key: 'rexTouchState',
            plugin: TouchStatePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);