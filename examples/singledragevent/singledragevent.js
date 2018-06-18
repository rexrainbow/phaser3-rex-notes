'use strict'

import SingleDragEventPlugin from 'rexPlugins/singledragevent-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('bg', 'assets/images/white-dot.png');
    }

    create() {
        this.input.addPointer(3);
        var bg0 = this.add.image(100, 100, 'bg')
            .setDisplaySize(200, 200)
            .setTint(0xcccccc)
            .setInteractive({
                draggable: true
            })
            .on('drag', function (pointer, dragX, dragY) {
                this.x = dragX;
                this.y = dragY;
            });

        var bg1 = this.add.image(500, 500, 'bg')
            .setDisplaySize(200, 200)
            .setTint(0x0000ff)
            .setInteractive({
                draggable: true
            });
        this.plugins.get('rexSingleDragEvent').add(bg1);
        bg1.on('rexdrag', function (pointer, dragX, dragY) {
            bg1.x = dragX;
            bg1.y = dragY;
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
            key: 'rexSingleDragEvent',
            plugin: SingleDragEventPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);