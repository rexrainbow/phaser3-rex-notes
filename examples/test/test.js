'use strict'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() {}

    create() {
        this.txt = this.add.text(100, 100, 'ABCD123\nDEF\nG', {
                fontSize: '28px',
                color: 'blue',
                backgroundColor: 'yellow'
            })
            .setOrigin(0)
            .setPadding(10);

        this.graphics = this.add.graphics()
            .lineStyle(4, 0xff0000, 1)
            .strokeRectShape(this.txt);
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