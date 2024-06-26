import phaser from 'phaser/src/phaser.js';
import HitTest from '../../plugins/utils/input/HitTest.js';

const RandimInt = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0x333333)
            .setInteractive()

        for (var i = 0; i < 20; i++) {
            this.add.circle(RandimInt(0, 800), RandimInt(0, 600), 20, RandimInt(0, 0x1000000))
                .setInteractive({ draggable: true })
                .on('drag', function (pointer, dragX, dragY) {
                    this.setPosition(dragX, dragY);
                });
        }

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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);