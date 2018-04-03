'use strict'

import FadePlugin from './../../plugins/fade-plugin.js';

const Between = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.blitter;
    }

    preload() {
        this.load.image('dot', 'assets/images/white-dot.png');
    }

    create() {
        this.blitter = this.add.blitter(0, 0, 'dot');
        this.blitter.createFromCallback(function (bob, i) {
            bob.x = Between(50, 750);
            bob.y = Between(50, 550);
            bob.alpha = 0;
            bob.fade = new FadePlugin(bob, {
                delay: Between(0, 100),
                duration: Between(500, 1000),
                alpha: {
                    start: Between(0, 1),
                    end: Between(0, 1)
                },
                mode: 'yoyo'
            })
        }, 500);
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