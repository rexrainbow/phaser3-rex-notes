'use strict'

import DragDeltaPlugin from './../../plugins/dragdelta-plugin.js';
const getDist = Phaser.Math.Distance.Power;

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
        var star;
        var bg = this.add.image(400, 300, 'bg')
            .setDisplaySize(300, 300)
            .setTint(0xcccccc);
        var dragDelta = this.plugins.get('rexDragDelta').add(bg);
        dragDelta.on('dragdelta', function (pointer) {
            console.log(pointer.speed);
            star.x += pointer.dx;
            star.y += pointer.dy;            
        });

        star = this.add.image(400, 300, 'bg')
            .setDisplaySize(10, 10)
            .setTint(0xff0000);
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
            key: 'rexDragDelta',
            plugin: DragDeltaPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);