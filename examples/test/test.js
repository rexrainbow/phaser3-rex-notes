'use strict'

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
        var bg = this.add.image(400, 300, 'bg')
            .setDisplaySize(150, 150)
            .setTint(0xcccccc)
            .setInteractive({
                draggable: true
            })
            .on('drag', function (pointer, dragX, dragY) {
                this.x = dragX;
                this.y = dragY;
            });
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