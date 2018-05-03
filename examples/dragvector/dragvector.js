'use strict'

import DragVectorPlugin from './../../plugins/dragvector-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.image('star', 'assets/images/red-dot.png');
        this.load.image('bg', 'assets/images/white-dot.png');
    }

    create() {        
        var star;
        var bg = this.add.image(400, 300, 'bg').setDisplaySize(300, 300);        
        bg.dragvector = new DragVectorPlugin(bg);
        bg.dragvector.on('dragdelta', function(dx, dy){
            star.x += dx;
            star.y += dy;
        })

        star = this.add.image(400,300, 'star').setDisplaySize(10, 10);  
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);