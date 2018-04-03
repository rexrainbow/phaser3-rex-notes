'use strict'

import FadePlugin from './../../plugins/fade-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
        this.blitter;
    }

    preload() {
        this.load.image('dot', 'assets/images/white-dot.png');
    }

    create() {
        this.txt = this.add.text(0, 0, '????');
        this.blitter = this.add.blitter(0, 0, 'dot');
    }

    update() {
        var pointer = this.input.activePointer;
        var dot = this.blitter.create(pointer.x, pointer.y);
        dot.fadeOut = new FadePlugin(dot, {
            duration: 2000
        });

        this.txt.setText(this.blitter.children.length.toString());
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