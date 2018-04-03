'use strict'

import fadeOutDestroy from './../../plugins/fade-out-destroy.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
        this.group;
    }

    preload() {
        this.load.image('dot', 'assets/images/white-dot.png');        
    }

    create() {
        this.txt = this.add.text(0, 0, '????');
        this.group = this.add.group();
    }

    update() {
        var pointer = this.input.activePointer;
        var img = this.add.image(pointer.x, pointer.y, 'dot');
        fadeOutDestroy(img, 2000);

        this.group.add(img);        
        this.txt.setText(this.group.getLength().toString());
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