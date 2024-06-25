import phaser from 'phaser/src/phaser.js';
import HitTest from '../../plugins/utils/input/HitTest.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.add.circle(400, 300, 20, 0xff0000)
            .setInteractive({ draggable: true })
            .on('drag', function (pointer, dragX, dragY) {
                this.setPosition(dragX, dragY);
            });
    }

    update(time, delta) {
    }
}


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);